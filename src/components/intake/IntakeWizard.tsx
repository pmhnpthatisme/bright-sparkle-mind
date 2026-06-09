import { useMemo, useRef, useState } from "react";
import { SignaturePad } from "./SignaturePad";

export type IntakeFlavor = "selfpay" | "wa_insurance";

type Props = {
  flavor: IntakeFlavor;
  onBack: () => void;
  onComplete: () => void;
};

const SYMPTOMS = [
  "Sadness / low mood",
  "Loss of interest / pleasure",
  "Anxiety / excessive worry",
  "Panic attacks",
  "Trouble sleeping",
  "Changes in appetite / weight",
  "Low energy / fatigue",
  "Difficulty concentrating / memory",
  "Racing thoughts / pressured speech",
  "Mood swings / irritability",
  "Suicidal thoughts",
  "Hearing voices / seeing things",
  "Paranoia / suspicious thoughts",
  "Elevated mood / decreased need for sleep",
  "Substance use concerns",
];

type Form = {
  // Patient
  legalName: string;
  preferredName: string;
  pronouns: string;
  dob: string;
  sexAtBirth: string;
  phone: string;
  okToText: boolean;
  email: string;
  mailingAddress: string;
  state: string;
  preferredContact: string;
  // Emergency
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  // PCP / Pharmacy
  pcp: string;
  pharmacy: string;
  // Clinical
  reasonForVisit: string;
  symptoms: string[];
  otherSymptoms: string;
  pastDiagnoses: string;
  pastTreatment: string;
  hospitalizations: string;
  pastAttempts: string;
  medications: string;
  medicalConditions: string;
  allergies: string;
  substanceUse: string;
  familyHistory: string;
  // Safety
  currentSI: "yes" | "no" | "";
  siPlan: string;
  thoughtsHarmOthers: "yes" | "no" | "";
  // Insurance (WA only)
  insuranceCompany: string;
  planName: string;
  memberId: string;
  groupNumber: string;
  policyholderSameAsPatient: boolean;
  subscriberName: string;
  subscriberDob: string;
  subscriberRelationship: string;
  insuranceFront: string | null; // base64
  insuranceBack: string | null;
  // Acknowledgments
  ackBilling: boolean;
  ackDPC: boolean;
  ackNarcotic: boolean;
  ackCrisis: boolean;
  ackTelehealth: boolean;
  ackPrivacy: boolean;
  ackInsuranceAuth: boolean; // WA insurance only
  consentTreatment: boolean;
  // Signature
  signature: string | null;
  signedDate: string;
};

const todayIso = () => new Date().toISOString().slice(0, 10);

const initialForm = (): Form => ({
  legalName: "", preferredName: "", pronouns: "", dob: "", sexAtBirth: "",
  phone: "", okToText: false, email: "", mailingAddress: "", state: "",
  preferredContact: "Phone",
  emergencyName: "", emergencyRelationship: "", emergencyPhone: "",
  pcp: "", pharmacy: "",
  reasonForVisit: "", symptoms: [], otherSymptoms: "",
  pastDiagnoses: "", pastTreatment: "", hospitalizations: "", pastAttempts: "",
  medications: "", medicalConditions: "", allergies: "",
  substanceUse: "", familyHistory: "",
  currentSI: "", siPlan: "", thoughtsHarmOthers: "",
  insuranceCompany: "", planName: "", memberId: "", groupNumber: "",
  policyholderSameAsPatient: true, subscriberName: "", subscriberDob: "", subscriberRelationship: "",
  insuranceFront: null, insuranceBack: null,
  ackBilling: false, ackDPC: false, ackNarcotic: false, ackCrisis: false,
  ackTelehealth: false, ackPrivacy: false, ackInsuranceAuth: false,
  consentTreatment: false,
  signature: null, signedDate: todayIso(),
});

const labelCls = "block text-sm font-bold text-lumen-royal mb-1";
const inputCls = "w-full px-3 py-3 rounded-xl border-2 border-slate-200 focus:border-lumen-royal focus:outline-none bg-white text-base";
const textareaCls = inputCls + " min-h-[88px]";

async function compressImage(file: File, maxW = 1400, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function IntakeWizard({ flavor, onBack, onComplete }: Props) {
  const isWAInsurance = flavor === "wa_insurance";
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);

  const steps = useMemo(
    () =>
      isWAInsurance
        ? ["Patient", "Clinical", "Safety", "Insurance", "Policies & Signature", "Review"]
        : ["Patient", "Clinical", "Safety", "Policies & Signature", "Review"],
    [isWAInsurance],
  );

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));
  const toggleSymptom = (s: string) =>
    setForm((f) => ({ ...f, symptoms: f.symptoms.includes(s) ? f.symptoms.filter((x) => x !== s) : [...f.symptoms, s] }));

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const next = () => { setStep((s) => Math.min(s + 1, steps.length - 1)); setTimeout(scrollTop, 50); };
  const prev = () => { setStep((s) => Math.max(s - 1, 0)); setTimeout(scrollTop, 50); };

  const validateStep = (): string | null => {
    if (steps[step] === "Patient") {
      if (!form.legalName.trim()) return "Please enter your full legal name.";
      if (!form.dob) return "Please enter your date of birth.";
      if (!form.phone.trim()) return "Please enter a phone number.";
      if (!form.email.trim()) return "Please enter your email.";
      if (!form.state.trim()) return "Please enter your state of residence.";
      if (!form.emergencyName.trim() || !form.emergencyPhone.trim()) return "Please enter an emergency contact name and phone.";
    }
    if (steps[step] === "Clinical" && !form.reasonForVisit.trim()) {
      return "Please briefly share what brings you in.";
    }
    if (steps[step] === "Safety") {
      if (!form.currentSI) return "Please answer the safety question.";
      if (!form.thoughtsHarmOthers) return "Please answer the second safety question.";
    }
    if (steps[step] === "Insurance") {
      if (!form.insuranceCompany.trim() || !form.memberId.trim()) return "Insurance company and member ID are required.";
      if (!form.insuranceFront || !form.insuranceBack) return "Please upload photos of the front AND back of your insurance card.";
    }
    if (steps[step] === "Policies & Signature") {
      const required = [
        form.ackNarcotic, form.ackCrisis, form.ackTelehealth, form.ackPrivacy, form.consentTreatment,
      ];
      if (!isWAInsurance) required.push(form.ackBilling, form.ackDPC);
      if (isWAInsurance) required.push(form.ackBilling, form.ackInsuranceAuth);
      if (required.some((v) => !v)) return "Please review and check every acknowledgment.";
      if (!form.signature) return "Please sign at the bottom.";
    }
    return null;
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError(null);
    next();
  };

  const submit = async () => {
    setSubmitting(true); setError(null);
    try {
      const res = await fetch("/api/public/intake-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flavor, form }),
      });
      const data = await res.json().catch(() => ({ ok: false, error: "Unexpected response" }));
      if (!res.ok || !data.ok) throw new Error(data.error || `Request failed (${res.status})`);
      setDone(true);
      setTimeout(scrollTop, 50);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="text-center py-6" ref={topRef}>
        <div className="mx-auto size-16 rounded-full bg-lumen-royal text-white flex items-center justify-center text-3xl mb-4">✓</div>
        <h3 className="font-display text-2xl font-extrabold text-lumen-royal">Intake received — thank you!</h3>
        <p className="text-slate-600 mt-2">
          Your completed packet has been sent securely to Lumen Telepsych. We'll follow up shortly to confirm.
        </p>
        <div className="mt-6 space-y-3">
          <a
            href="https://therapyportal.com/p/lumentelepsych2025/"
            target="_blank" rel="noopener noreferrer"
            className="block w-full text-center p-4 rounded-2xl bg-lumen-royal text-white font-display font-extrabold text-lg hover:bg-lumen-royal/90 transition-colors"
          >
            Continue to the booking portal →
          </a>
          <a
            href="sms:+13606372104"
            className="block w-full text-center p-4 rounded-2xl bg-white border-2 border-lumen-royal text-lumen-royal font-display font-extrabold text-base hover:bg-lumen-purple/10 transition-colors"
          >
            Or text the practice at (360) 637-2104 for current availability
          </a>
          <button type="button" onClick={onComplete} className="text-xs font-bold text-lumen-royal hover:underline mt-2">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef}>
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={onBack} className="text-xs font-bold text-lumen-royal hover:underline">
          ← Back to options
        </button>
        <span className="text-xs font-bold text-slate-500">
          Step {step + 1} of {steps.length} · {steps[step]}
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-200 rounded-full mb-4 overflow-hidden">
        <div className="h-full bg-lumen-royal transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-extrabold text-lumen-royal leading-tight">
        {isWAInsurance ? "Washington Insurance Intake" : "Self-Pay Intake"}
      </h2>
      <p className="text-sm text-slate-600 mt-1 mb-5">
        Complete this packet right here — no downloads. Your information is encrypted in transit and emailed securely to Lumen Telepsych.
      </p>

      {steps[step] === "Patient" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full legal name *"><input className={inputCls} value={form.legalName} onChange={(e) => set("legalName", e.target.value)} /></Field>
            <Field label="Preferred name / pronouns"><input className={inputCls} value={form.preferredName} onChange={(e) => set("preferredName", e.target.value)} /></Field>
            <Field label="Date of birth *"><input type="date" className={inputCls} value={form.dob} onChange={(e) => set("dob", e.target.value)} /></Field>
            <Field label="Sex assigned at birth"><input className={inputCls} value={form.sexAtBirth} onChange={(e) => set("sexAtBirth", e.target.value)} /></Field>
            <Field label="Phone *"><input type="tel" className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
            <Field label="Email *"><input type="email" className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
            <Field label="State of residence *"><input className={inputCls} value={form.state} onChange={(e) => set("state", e.target.value)} placeholder="WA or TN" /></Field>
            <Field label="Preferred contact method">
              <select className={inputCls} value={form.preferredContact} onChange={(e) => set("preferredContact", e.target.value)}>
                <option>Phone</option><option>Text</option><option>Email</option><option>Portal</option>
              </select>
            </Field>
          </div>
          <Field label="Mailing address"><textarea className={textareaCls} value={form.mailingAddress} onChange={(e) => set("mailingAddress", e.target.value)} /></Field>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={form.okToText} onChange={(e) => set("okToText", e.target.checked)} className="size-5" />
            <span>OK to text me at the phone above</span>
          </label>

          <h3 className="font-display font-extrabold text-lumen-royal pt-4 border-t border-slate-200">Emergency contact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name *"><input className={inputCls} value={form.emergencyName} onChange={(e) => set("emergencyName", e.target.value)} /></Field>
            <Field label="Relationship"><input className={inputCls} value={form.emergencyRelationship} onChange={(e) => set("emergencyRelationship", e.target.value)} /></Field>
            <Field label="Phone *"><input type="tel" className={inputCls} value={form.emergencyPhone} onChange={(e) => set("emergencyPhone", e.target.value)} /></Field>
          </div>

          <h3 className="font-display font-extrabold text-lumen-royal pt-4 border-t border-slate-200">Primary care & pharmacy</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Primary care provider"><input className={inputCls} value={form.pcp} onChange={(e) => set("pcp", e.target.value)} /></Field>
            <Field label="Preferred pharmacy (name & city)"><input className={inputCls} value={form.pharmacy} onChange={(e) => set("pharmacy", e.target.value)} /></Field>
          </div>
        </div>
      )}

      {steps[step] === "Clinical" && (
        <div className="space-y-4">
          <Field label="What brings you to Lumen Telepsych? *">
            <textarea className={textareaCls} value={form.reasonForVisit} onChange={(e) => set("reasonForVisit", e.target.value)} />
          </Field>
          <div>
            <span className={labelCls}>Current symptoms — check any that apply</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SYMPTOMS.map((s) => (
                <label key={s} className="flex items-start gap-2 p-2 rounded-lg hover:bg-lumen-purple/10 text-sm">
                  <input type="checkbox" className="size-5 mt-0.5" checked={form.symptoms.includes(s)} onChange={() => toggleSymptom(s)} />
                  <span>{s}</span>
                </label>
              ))}
            </div>
            <input className={inputCls + " mt-2"} placeholder="Other (please describe)" value={form.otherSymptoms} onChange={(e) => set("otherSymptoms", e.target.value)} />
          </div>
          <Field label="Past psychiatric diagnoses (with year, if known)">
            <textarea className={textareaCls} value={form.pastDiagnoses} onChange={(e) => set("pastDiagnoses", e.target.value)} />
          </Field>
          <Field label="Past psychiatric treatment (providers, dates, meds, hospitalizations)">
            <textarea className={textareaCls} value={form.pastTreatment} onChange={(e) => set("pastTreatment", e.target.value)} />
          </Field>
          <Field label="Current medications (name, dose, frequency, prescriber)">
            <textarea className={textareaCls} value={form.medications} onChange={(e) => set("medications", e.target.value)} />
          </Field>
          <Field label="Major medical conditions / surgeries">
            <textarea className={textareaCls} value={form.medicalConditions} onChange={(e) => set("medicalConditions", e.target.value)} />
          </Field>
          <Field label="Allergies (medications + reactions)">
            <textarea className={textareaCls} value={form.allergies} onChange={(e) => set("allergies", e.target.value)} />
          </Field>
          <Field label="Substance use (tobacco, alcohol, cannabis, other — frequency)">
            <textarea className={textareaCls} value={form.substanceUse} onChange={(e) => set("substanceUse", e.target.value)} />
          </Field>
          <Field label="Family history of mental health / substance use">
            <textarea className={textareaCls} value={form.familyHistory} onChange={(e) => set("familyHistory", e.target.value)} />
          </Field>
        </div>
      )}

      {steps[step] === "Safety" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-lumen-pink/15 text-sm text-slate-700">
            <strong>If you are in immediate danger, call 911 or 988.</strong> Your honest answers help us care for you safely.
          </div>
          <YesNo label="Are you currently having thoughts of harming yourself? *" value={form.currentSI} onChange={(v) => set("currentSI", v)} />
          {form.currentSI === "yes" && (
            <Field label="Do you have a plan or intent? Brief description:">
              <textarea className={textareaCls} value={form.siPlan} onChange={(e) => set("siPlan", e.target.value)} />
            </Field>
          )}
          <YesNo label="Are you currently having thoughts of harming others? *" value={form.thoughtsHarmOthers} onChange={(v) => set("thoughtsHarmOthers", v)} />
          <Field label="Past suicide attempts or self-harm (if any, brief description and date)">
            <textarea className={textareaCls} value={form.pastAttempts} onChange={(e) => set("pastAttempts", e.target.value)} />
          </Field>
        </div>
      )}

      {steps[step] === "Insurance" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Insurance company *"><input className={inputCls} value={form.insuranceCompany} onChange={(e) => set("insuranceCompany", e.target.value)} placeholder="Optum, Premera, Cigna, Aetna" /></Field>
            <Field label="Plan name"><input className={inputCls} value={form.planName} onChange={(e) => set("planName", e.target.value)} /></Field>
            <Field label="Member ID *"><input className={inputCls} value={form.memberId} onChange={(e) => set("memberId", e.target.value)} /></Field>
            <Field label="Group number"><input className={inputCls} value={form.groupNumber} onChange={(e) => set("groupNumber", e.target.value)} /></Field>
          </div>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={form.policyholderSameAsPatient} onChange={(e) => set("policyholderSameAsPatient", e.target.checked)} className="size-5" />
            <span>The policyholder is the patient (uncheck if someone else holds the policy)</span>
          </label>
          {!form.policyholderSameAsPatient && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Subscriber full name"><input className={inputCls} value={form.subscriberName} onChange={(e) => set("subscriberName", e.target.value)} /></Field>
              <Field label="Subscriber date of birth"><input type="date" className={inputCls} value={form.subscriberDob} onChange={(e) => set("subscriberDob", e.target.value)} /></Field>
              <Field label="Relationship to patient"><input className={inputCls} value={form.subscriberRelationship} onChange={(e) => set("subscriberRelationship", e.target.value)} /></Field>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <CardUpload label="Insurance card — FRONT *" value={form.insuranceFront} onChange={(v) => set("insuranceFront", v)} />
            <CardUpload label="Insurance card — BACK *" value={form.insuranceBack} onChange={(v) => set("insuranceBack", v)} />
          </div>
        </div>
      )}

      {steps[step] === "Policies & Signature" && (
        <div className="space-y-3">
          {!isWAInsurance && (
            <PolicyAck title="Direct Primary Care (DPC) Membership"
              body="Lumen Telepsych offers DPC membership: unlimited access to your psychiatric provider, virtual follow-ups, direct text line Mon–Sat 8a–8p, secure messaging, fast medication management, consistent care, and monthly check-ins. Membership is $100/month, automatically billed, and is optional — you may pay per visit instead."
              checked={form.ackDPC} onChange={(v) => set("ackDPC", v)} />
          )}
          <PolicyAck title="Billing & Payment Consent"
            body={isWAInsurance
              ? "I authorize Lumen Telepsych to keep a valid debit/credit card on file for any copays, coinsurance, deductibles, or charges not covered by my insurance. I understand that a co-payment may be due at the time of service, and that cancellations with less than 24 hours' notice or no-shows may incur a fee."
              : "Intake appointments are $250, non-refundable, due at the first visit. Monthly DPC membership is $100/month, automatically billed if elected. Lumen Telepsych does not bill insurance for self-pay clients (superbills available on request). A valid card must be kept on file. Late cancellations (<24h) and no-shows incur a fee."}
            checked={form.ackBilling} onChange={(v) => set("ackBilling", v)} />
          <PolicyAck title="Narcotic Policy"
            body="Lumen Telepsych is a narcotic-free psychiatric practice. We do not initiate new prescriptions for controlled substances (stimulants, benzodiazepines, sedative-hypnotics, opioids). Existing prescriptions may be temporarily continued only with verified prior records, a clean initial UDS, and agreement to random UDS, lowest effective dose, and shortest necessary duration. Prescriptions may be discontinued at any time for safety concerns or policy violations."
            checked={form.ackNarcotic} onChange={(v) => set("ackNarcotic", v)} />
          <PolicyAck title="Crisis Prevention & Safety"
            body="I acknowledge I have reviewed the crisis resources: 911 for emergencies, 988 Suicide & Crisis Lifeline (call/text), Crisis Text Line (text HOME to 741741), and applicable state lines (WA 988 · TN 1-855-274-7471). Crisis lines are supportive but not a substitute for emergency care; for psychiatric emergencies I will go to the nearest Emergency Department or call 911."
            checked={form.ackCrisis} onChange={(v) => set("ackCrisis", v)} />
          <PolicyAck title="Telehealth Consent"
            body="I understand services are delivered via telehealth, I agree to participate using video/audio from a safe, private location, and I understand telehealth has both benefits and limitations."
            checked={form.ackTelehealth} onChange={(v) => set("ackTelehealth", v)} />
          <PolicyAck title="Notice of Privacy Practices (HIPAA)"
            body="I confirm I have reviewed Lumen Telepsych's Notice of Privacy Practices and understand my health information is protected under HIPAA."
            checked={form.ackPrivacy} onChange={(v) => set("ackPrivacy", v)} />
          {isWAInsurance && (
            <PolicyAck title="Authorization to Bill Insurance"
              body="I authorize Lumen Telepsych to submit claims to the insurance carrier listed above for psychiatric services provided, and I authorize release of any medical information necessary to process those claims. I understand I am financially responsible for any amounts not covered by my plan, including any co-payment that may be due at the time of service."
              checked={form.ackInsuranceAuth} onChange={(v) => set("ackInsuranceAuth", v)} />
          )}
          <PolicyAck highlight title="Consent to Treatment (required)"
            body="I voluntarily consent to psychiatric evaluation and treatment by Lumen Telepsych, including assessment, diagnosis, medication management, and any related care recommended by my provider. I understand the benefits, risks, and alternatives have been or will be explained to me, that I may ask questions at any time, and that I may withdraw this consent in writing at any time except where treatment has already been given in good faith."
            checked={form.consentTreatment} onChange={(v) => set("consentTreatment", v)} />

          <div className="pt-4 border-t border-slate-200">
            <span className={labelCls}>Patient signature *</span>
            <SignaturePad value={form.signature} onChange={(v) => set("signature", v)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <Field label="Typed full legal name (acts as your electronic signature)">
                <input className={inputCls} value={form.legalName} onChange={(e) => set("legalName", e.target.value)} />
              </Field>
              <Field label="Date">
                <input type="date" className={inputCls} value={form.signedDate} onChange={(e) => set("signedDate", e.target.value)} />
              </Field>
            </div>
          </div>
        </div>
      )}

      {steps[step] === "Review" && (
        <div className="space-y-3 text-sm">
          <p className="text-slate-700">
            Please confirm everything looks right. When you tap <strong>Submit</strong>, your full packet (forms{isWAInsurance ? ", insurance card photos," : ""} and signature) is combined into a single PDF and emailed securely to Lumen Telepsych.
          </p>
          <ReviewRow label="Patient" value={`${form.legalName} · DOB ${form.dob} · ${form.state}`} />
          <ReviewRow label="Contact" value={`${form.email} · ${form.phone}`} />
          <ReviewRow label="Emergency" value={`${form.emergencyName} (${form.emergencyRelationship}) · ${form.emergencyPhone}`} />
          <ReviewRow label="Reason" value={form.reasonForVisit} />
          {isWAInsurance && <ReviewRow label="Insurance" value={`${form.insuranceCompany} · ID ${form.memberId}`} />}
          <ReviewRow label="Signed" value={`${form.signedDate} · signature ${form.signature ? "captured ✓" : "MISSING"}`} />
        </div>
      )}

      {error && <p className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">{error}</p>}

      <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-200">
        <button type="button" onClick={step === 0 ? onBack : prev} className="px-4 py-3 rounded-xl border-2 border-slate-300 font-bold text-slate-700 hover:bg-slate-100">
          {step === 0 ? "Cancel" : "← Back"}
        </button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={handleNext} className="px-6 py-3 rounded-xl bg-lumen-royal text-white font-display font-extrabold hover:bg-lumen-royal/90">
            Continue →
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={submitting} className="px-6 py-3 rounded-xl bg-lumen-royal text-white font-display font-extrabold hover:bg-lumen-royal/90 disabled:opacity-60">
            {submitting ? "Submitting…" : "Submit intake packet"}
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
    </label>
  );
}

function YesNo({ label, value, onChange }: { label: string; value: "yes" | "no" | ""; onChange: (v: "yes" | "no") => void }) {
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="flex gap-2">
        {(["yes", "no"] as const).map((opt) => (
          <button key={opt} type="button" onClick={() => onChange(opt)}
            className={`flex-1 py-3 rounded-xl border-2 font-bold capitalize ${value === opt ? "border-lumen-royal bg-lumen-royal text-white" : "border-slate-200 bg-white text-slate-700 hover:border-lumen-royal/50"}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function PolicyAck({ title, body, checked, onChange, highlight }: { title: string; body: string; checked: boolean; onChange: (v: boolean) => void; highlight?: boolean }) {
  return (
    <label className={`block p-4 rounded-xl border-2 cursor-pointer ${highlight ? "border-lumen-royal bg-lumen-purple/15" : "border-slate-200 bg-white"} hover:border-lumen-royal/60`}>
      <div className="flex items-start gap-3">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-5 mt-1 shrink-0" />
        <div>
          <p className="font-display font-extrabold text-lumen-royal">{title}</p>
          <p className="text-sm text-slate-700 mt-1 leading-relaxed">{body}</p>
        </div>
      </div>
    </label>
  );
}

function CardUpload({ label, value, onChange }: { label: string; value: string | null; onChange: (v: string | null) => void }) {
  const [err, setErr] = useState<string | null>(null);
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="rounded-xl border-2 border-dashed border-lumen-royal/40 bg-white p-3 flex flex-col items-center gap-2">
        {value ? (
          <>
            <img src={value} alt="" className="max-h-40 rounded-lg object-contain" />
            <button type="button" className="text-xs font-bold text-lumen-royal hover:underline" onClick={() => onChange(null)}>Replace</button>
          </>
        ) : (
          <label className="cursor-pointer flex flex-col items-center gap-1 py-4 text-center">
            <span className="text-lumen-royal font-bold">📷 Tap to add photo</span>
            <span className="text-xs text-slate-500">JPG or PNG, up to 8MB</span>
            <input type="file" accept="image/*" capture="environment" className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0]; if (!f) return;
                if (f.size > 8 * 1024 * 1024) { setErr("File too large (max 8MB)"); return; }
                try { const data = await compressImage(f); onChange(data); setErr(null); }
                catch { setErr("Couldn't read that image. Try another."); }
              }}
            />
          </label>
        )}
        {err && <p className="text-xs text-red-600">{err}</p>}
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 py-1.5 border-b border-slate-100 last:border-0">
      <span className="font-bold text-lumen-royal w-28 shrink-0">{label}</span>
      <span className="text-slate-700 break-words">{value || <em className="text-slate-400">—</em>}</span>
    </div>
  );
}