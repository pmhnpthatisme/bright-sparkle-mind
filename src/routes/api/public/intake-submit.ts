import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const FormSchema = z.object({
  legalName: z.string().trim().min(1).max(200),
  preferredName: z.string().max(200).optional().default(""),
  pronouns: z.string().max(80).optional().default(""),
  dob: z.string().max(40),
  sexAtBirth: z.string().max(80).optional().default(""),
  phone: z.string().trim().min(7).max(40),
  okToText: z.boolean(),
  email: z.string().trim().email().max(320),
  mailingAddress: z.string().max(600).optional().default(""),
  state: z.string().trim().min(1).max(80),
  preferredContact: z.string().max(40).optional().default(""),
  emergencyName: z.string().trim().min(1).max(200),
  emergencyRelationship: z.string().max(120).optional().default(""),
  emergencyPhone: z.string().trim().min(7).max(40),
  pcp: z.string().max(300).optional().default(""),
  pharmacy: z.string().max(300).optional().default(""),
  reasonForVisit: z.string().min(1).max(4000),
  symptoms: z.array(z.string().max(120)).max(60),
  otherSymptoms: z.string().max(500).optional().default(""),
  pastDiagnoses: z.string().max(4000).optional().default(""),
  pastTreatment: z.string().max(4000).optional().default(""),
  hospitalizations: z.string().max(2000).optional().default(""),
  pastAttempts: z.string().max(2000).optional().default(""),
  medications: z.string().max(4000).optional().default(""),
  medicalConditions: z.string().max(4000).optional().default(""),
  allergies: z.string().max(2000).optional().default(""),
  substanceUse: z.string().max(2000).optional().default(""),
  familyHistory: z.string().max(2000).optional().default(""),
  currentSI: z.enum(["yes", "no"]),
  siPlan: z.string().max(2000).optional().default(""),
  thoughtsHarmOthers: z.enum(["yes", "no"]),
  insuranceCompany: z.string().max(200).optional().default(""),
  planName: z.string().max(200).optional().default(""),
  memberId: z.string().max(120).optional().default(""),
  groupNumber: z.string().max(120).optional().default(""),
  policyholderSameAsPatient: z.boolean().optional().default(true),
  subscriberName: z.string().max(200).optional().default(""),
  subscriberDob: z.string().max(40).optional().default(""),
  subscriberRelationship: z.string().max(120).optional().default(""),
  insuranceFront: z.string().max(8_500_000).nullable().optional(),
  insuranceBack: z.string().max(8_500_000).nullable().optional(),
  ackBilling: z.boolean(),
  ackDPC: z.boolean(),
  ackNarcotic: z.boolean(),
  ackCrisis: z.boolean(),
  ackTelehealth: z.boolean(),
  ackPrivacy: z.boolean(),
  ackInsuranceAuth: z.boolean(),
  consentTreatment: z.boolean(),
  signature: z.string().min(40).max(2_500_000),
  signedDate: z.string().max(40),
});

const PayloadSchema = z.object({
  flavor: z.enum(["selfpay", "wa_insurance"]),
  form: FormSchema,
});

const TO_EMAIL = "lumentelepsych@gmail.com";

// Rate limit (10 per hour per IP). Resets on cold start.
const HITS = new Map<string, { count: number; resetAt: number }>();
const RL_WINDOW_MS = 60 * 60 * 1000;
const RL_MAX = 10;
function rateLimit(ip: string) {
  const now = Date.now();
  const rec = HITS.get(ip);
  if (!rec || rec.resetAt < now) { HITS.set(ip, { count: 1, resetAt: now + RL_WINDOW_MS }); return true; }
  if (rec.count >= RL_MAX) return false;
  rec.count += 1;
  return true;
}

function dataUrlToBytes(dataUrl: string): { bytes: Uint8Array; mime: string } | null {
  const m = /^data:(image\/(?:png|jpeg|jpg));base64,(.+)$/i.exec(dataUrl);
  if (!m) return null;
  const mime = m[1].toLowerCase().replace("jpg", "jpeg");
  const bin = atob(m[2]);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return { bytes, mime };
}

type F = z.infer<typeof FormSchema>;

async function buildPdf(flavor: "selfpay" | "wa_insurance", f: F): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const purple = rgb(0.298, 0.165, 0.553);
  const slate = rgb(0.21, 0.235, 0.302);
  const muted = rgb(0.45, 0.49, 0.58);

  const margin = 50;
  const pageW = 612, pageH = 792;
  let page = pdf.addPage([pageW, pageH]);
  let y = pageH - margin;

  const newPage = () => { page = pdf.addPage([pageW, pageH]); y = pageH - margin; };
  const ensure = (h: number) => { if (y - h < margin) newPage(); };

  const wrap = (text: string, maxW: number, size: number, fnt = font): string[] => {
    if (!text) return [];
    const words = text.replace(/\r\n/g, "\n").split(/(\n| )/);
    const lines: string[] = [];
    let cur = "";
    for (const w of words) {
      if (w === "\n") { lines.push(cur); cur = ""; continue; }
      const test = cur + w;
      if (fnt.widthOfTextAtSize(test, size) > maxW) {
        if (cur.trim()) lines.push(cur.trimEnd());
        cur = w.replace(/^ +/, "");
      } else cur = test;
    }
    if (cur) lines.push(cur);
    return lines;
  };

  const drawText = (text: string, size = 10.5, fnt = font, color = slate, leading = 14) => {
    const lines = wrap(text, pageW - margin * 2, size, fnt);
    for (const ln of lines) {
      ensure(leading);
      page.drawText(ln, { x: margin, y: y - size, size, font: fnt, color });
      y -= leading;
    }
  };

  const heading = (text: string) => {
    ensure(34);
    y -= 8;
    page.drawText(text, { x: margin, y: y - 14, size: 14, font: bold, color: purple });
    y -= 22;
    page.drawLine({ start: { x: margin, y }, end: { x: pageW - margin, y }, thickness: 0.8, color: purple });
    y -= 10;
  };

  const field = (label: string, value: string) => {
    const lblSize = 9, valSize = 10.5;
    const lblLines = wrap(label, pageW - margin * 2, lblSize, bold);
    const valLines = wrap(value || "—", pageW - margin * 2, valSize);
    ensure((lblLines.length + valLines.length) * 13 + 4);
    for (const ln of lblLines) { page.drawText(ln, { x: margin, y: y - lblSize, size: lblSize, font: bold, color: muted }); y -= 12; }
    for (const ln of valLines) { page.drawText(ln, { x: margin, y: y - valSize, size: valSize, font, color: slate }); y -= 14; }
    y -= 4;
  };

  // Cover
  page.drawRectangle({ x: 0, y: pageH - 90, width: pageW, height: 90, color: purple });
  page.drawText("LUMEN TELEPSYCH", { x: margin, y: pageH - 42, size: 18, font: bold, color: rgb(1, 1, 1) });
  page.drawText("Completed Intake Packet", { x: margin, y: pageH - 64, size: 12, font, color: rgb(0.9, 0.88, 0.95) });
  page.drawText(flavor === "wa_insurance" ? "Washington Insurance" : "Self-Pay", { x: margin, y: pageH - 80, size: 10, font: bold, color: rgb(0.95, 0.93, 0.98) });
  y = pageH - 110;

  heading("Patient information");
  field("Full legal name", f.legalName);
  if (f.preferredName) field("Preferred name / pronouns", f.preferredName);
  field("Date of birth", f.dob);
  if (f.sexAtBirth) field("Sex assigned at birth", f.sexAtBirth);
  field("Phone", `${f.phone}${f.okToText ? "  (OK to text)" : ""}`);
  field("Email", f.email);
  field("State of residence", f.state);
  if (f.mailingAddress) field("Mailing address", f.mailingAddress);
  if (f.preferredContact) field("Preferred contact", f.preferredContact);

  heading("Emergency contact");
  field("Name", `${f.emergencyName}${f.emergencyRelationship ? ` (${f.emergencyRelationship})` : ""}`);
  field("Phone", f.emergencyPhone);

  if (f.pcp || f.pharmacy) {
    heading("Primary care & pharmacy");
    if (f.pcp) field("PCP", f.pcp);
    if (f.pharmacy) field("Pharmacy", f.pharmacy);
  }

  heading("Clinical");
  field("Reason for visit", f.reasonForVisit);
  const symptoms = [...f.symptoms, ...(f.otherSymptoms ? [f.otherSymptoms] : [])].join(", ");
  if (symptoms) field("Current symptoms", symptoms);
  if (f.pastDiagnoses) field("Past diagnoses", f.pastDiagnoses);
  if (f.pastTreatment) field("Past treatment", f.pastTreatment);
  if (f.medications) field("Current medications", f.medications);
  if (f.medicalConditions) field("Medical history", f.medicalConditions);
  if (f.allergies) field("Allergies", f.allergies);
  if (f.substanceUse) field("Substance use", f.substanceUse);
  if (f.familyHistory) field("Family history", f.familyHistory);

  heading("Safety & risk");
  field("Currently having thoughts of harming yourself?", f.currentSI.toUpperCase());
  if (f.currentSI === "yes" && f.siPlan) field("Plan / intent", f.siPlan);
  field("Currently having thoughts of harming others?", f.thoughtsHarmOthers.toUpperCase());
  if (f.pastAttempts) field("Past attempts / self-harm", f.pastAttempts);

  if (flavor === "wa_insurance") {
    heading("Insurance");
    field("Insurance company", f.insuranceCompany);
    if (f.planName) field("Plan", f.planName);
    field("Member ID", f.memberId);
    if (f.groupNumber) field("Group number", f.groupNumber);
    field("Policyholder", f.policyholderSameAsPatient ? "Same as patient" : `${f.subscriberName} (${f.subscriberRelationship || "—"}), DOB ${f.subscriberDob || "—"}`);
  }

  // Acknowledgments summary
  heading("Policy acknowledgments");
  const acks: Array<[string, boolean]> = [
    ["Billing & Payment Consent", f.ackBilling],
    ["Narcotic Policy", f.ackNarcotic],
    ["Crisis Prevention & Safety", f.ackCrisis],
    ["Telehealth Consent", f.ackTelehealth],
    ["Notice of Privacy Practices (HIPAA)", f.ackPrivacy],
  ];
  if (flavor === "selfpay") acks.unshift(["DPC Membership", f.ackDPC]);
  if (flavor === "wa_insurance") acks.push(["Authorization to Bill Insurance", f.ackInsuranceAuth]);
  acks.push(["Consent to Treatment", f.consentTreatment]);
  for (const [label, ok] of acks) {
    ensure(16);
    page.drawText(ok ? "[x]" : "[ ]", { x: margin, y: y - 11, size: 11, font: bold, color: ok ? purple : muted });
    page.drawText(label, { x: margin + 22, y: y - 11, size: 11, font, color: slate });
    y -= 16;
  }

  // Signature
  heading("Patient signature");
  drawText(`Signed by: ${f.legalName}`, 11, bold, slate, 16);
  drawText(`Date: ${f.signedDate}`, 10.5, font, slate, 14);
  try {
    const sigBytes = dataUrlToBytes(f.signature);
    if (sigBytes) {
      const sigImg = sigBytes.mime === "image/png"
        ? await pdf.embedPng(sigBytes.bytes)
        : await pdf.embedJpg(sigBytes.bytes);
      const targetW = 280;
      const ratio = sigImg.height / sigImg.width;
      const targetH = targetW * ratio;
      ensure(targetH + 10);
      page.drawImage(sigImg, { x: margin, y: y - targetH, width: targetW, height: targetH });
      y -= targetH + 6;
      page.drawLine({ start: { x: margin, y }, end: { x: margin + targetW, y }, thickness: 0.8, color: muted });
      y -= 14;
    }
  } catch { /* fall through */ }

  // Insurance card images
  if (flavor === "wa_insurance") {
    for (const [label, dataUrl] of [["Insurance card — FRONT", f.insuranceFront], ["Insurance card — BACK", f.insuranceBack]] as const) {
      if (!dataUrl) continue;
      const parsed = dataUrlToBytes(dataUrl);
      if (!parsed) continue;
      try {
        const img = parsed.mime === "image/png" ? await pdf.embedPng(parsed.bytes) : await pdf.embedJpg(parsed.bytes);
        newPage();
        page.drawText(label, { x: margin, y: y - 14, size: 14, font: bold, color: purple });
        y -= 30;
        const maxW = pageW - margin * 2;
        const maxH = y - margin;
        const scale = Math.min(maxW / img.width, maxH / img.height);
        const w = img.width * scale, h = img.height * scale;
        page.drawImage(img, { x: (pageW - w) / 2, y: y - h, width: w, height: h });
      } catch { /* ignore broken images */ }
    }
  }

  return await pdf.save();
}

function bytesToBase64(bytes: Uint8Array): string {
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

async function sendEmail(flavor: "selfpay" | "wa_insurance", f: F, pdfBytes: Uint8Array) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!lovableKey || !resendKey) return { ok: false, error: "Email service not configured (Resend connector missing)" };

  const filenameSafe = f.legalName.replace(/[^a-z0-9]+/gi, "_").slice(0, 60) || "patient";
  const filename = `LumenTelepsych_Intake_${filenameSafe}_${f.signedDate}.pdf`;

  const subject = `New ${flavor === "wa_insurance" ? "WA Insurance" : "Self-Pay"} intake — ${f.legalName}`;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1e293b">
      <h2 style="color:#4c1d95;margin:0 0 14px">New intake packet received</h2>
      <p>A new patient just completed the <strong>${flavor === "wa_insurance" ? "Washington Insurance" : "Self-Pay"}</strong> intake on the website.</p>
      <table style="font-size:14px;border-collapse:collapse">
        <tr><td style="padding:4px 14px 4px 0;color:#64748b">Name</td><td><strong>${escapeHtml(f.legalName)}</strong></td></tr>
        <tr><td style="padding:4px 14px 4px 0;color:#64748b">DOB</td><td>${escapeHtml(f.dob)}</td></tr>
        <tr><td style="padding:4px 14px 4px 0;color:#64748b">State</td><td>${escapeHtml(f.state)}</td></tr>
        <tr><td style="padding:4px 14px 4px 0;color:#64748b">Phone</td><td><a href="tel:${escapeHtml(f.phone)}">${escapeHtml(f.phone)}</a></td></tr>
        <tr><td style="padding:4px 14px 4px 0;color:#64748b">Email</td><td><a href="mailto:${escapeHtml(f.email)}">${escapeHtml(f.email)}</a></td></tr>
      </table>
      <p style="margin-top:18px;font-size:13px;color:#64748b">The complete signed packet is attached as a single PDF${flavor === "wa_insurance" ? " (including insurance card front/back)" : ""}.</p>
    </div>`;

  const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
    },
    body: JSON.stringify({
      from: "Lumen Telepsych <onboarding@resend.dev>",
      to: [TO_EMAIL],
      reply_to: f.email,
      subject,
      html,
      attachments: [{ filename, content: bytesToBase64(pdfBytes) }],
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    return { ok: false, error: `Resend ${res.status}: ${text.slice(0, 300)}` };
  }
  return { ok: true as const };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export const Route = createFileRoute("/api/public/intake-submit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
        if (!rateLimit(ip)) return Response.json({ ok: false, error: "Too many submissions — please try again later." }, { status: 429 });

        let raw: unknown;
        try { raw = await request.json(); } catch { return Response.json({ ok: false, error: "Invalid request body" }, { status: 400 }); }

        const parsed = PayloadSchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json({ ok: false, error: "Some fields are missing or invalid. Please review and try again." }, { status: 400 });
        }
        const { flavor, form } = parsed.data;

        // Required acknowledgments per flavor
        const requiredAcks = flavor === "wa_insurance"
          ? [form.ackBilling, form.ackNarcotic, form.ackCrisis, form.ackTelehealth, form.ackPrivacy, form.ackInsuranceAuth, form.consentTreatment]
          : [form.ackBilling, form.ackDPC, form.ackNarcotic, form.ackCrisis, form.ackTelehealth, form.ackPrivacy, form.consentTreatment];
        if (requiredAcks.some((v) => !v)) return Response.json({ ok: false, error: "All policy acknowledgments are required." }, { status: 400 });
        if (flavor === "wa_insurance" && (!form.insuranceFront || !form.insuranceBack)) {
          return Response.json({ ok: false, error: "Insurance card front and back are required." }, { status: 400 });
        }

        let pdfBytes: Uint8Array;
        try { pdfBytes = await buildPdf(flavor, form); }
        catch (e) { return Response.json({ ok: false, error: `Could not generate packet PDF: ${(e as Error).message}` }, { status: 500 }); }

        const sent = await sendEmail(flavor, form, pdfBytes);
        if (!sent.ok) return Response.json({ ok: false, error: sent.error }, { status: 502 });

        return Response.json({ ok: true });
      },
    },
  },
});