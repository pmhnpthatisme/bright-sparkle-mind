import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import dpcPdf from "@/assets/intake/dpc.pdf.asset.json";
import billingPdf from "@/assets/intake/billing.pdf.asset.json";
import intakePdf from "@/assets/intake/intake.pdf.asset.json";
import narcoticPdf from "@/assets/intake/narcotic.pdf.asset.json";
import crisisPdf from "@/assets/intake/crisis.pdf.asset.json";
import insurancePdf from "@/assets/intake/insurance.pdf.asset.json";

const SELFPAY_PACKET = [
  { label: "1. DPC Agreement", desc: "Direct primary-care membership terms.", file: dpcPdf },
  { label: "2. Billing Form", desc: "Payment authorization and fee acknowledgment.", file: billingPdf },
  { label: "3. Patient Intake Form", desc: "Demographics, history, and clinical background.", file: intakePdf },
  { label: "4. Narcotic Policy", desc: "Controlled-substance prescribing policy and consent.", file: narcoticPdf },
  { label: "5. Crisis Prevention Info", desc: "Safety plan and after-hours/emergency resources.", file: crisisPdf },
];

const WA_INSURANCE_PACKET = [
  { label: "Insurance Intake Packet", desc: "Complete this packet before your first appointment so we can verify benefits and bill your plan.", file: insurancePdf },
];

// TODO: Replace these placeholder URLs with your real portal links.
// The user mentioned a TherapyNotes intake link but didn't paste the URL —
// once provided, set THERAPYNOTES_URL below and every Self-Pay / WA Insurance
// button updates automatically. HEADWAY_URL is for TN insurance clients and
// will be provided later.
const THERAPYNOTES_URL = "https://www.therapynotes.com/patient-portal/"; // PLACEHOLDER — replace with your TherapyNotes intake link
const HEADWAY_URL = "https://headway.co/"; // PLACEHOLDER — replace with your Headway provider profile

type Option = {
  label: string;
  subtitle: string;
  body: string;
  href: string;
  cardBg: string;
  accent: string;
  pill: string;
  emoji: string;
};

const OPTIONS: Option[] = [
  {
    label: "Self-Pay",
    subtitle: "Paying out of pocket (WA or TN)",
    body: "Book and complete intake directly through our secure HIPAA-compliant patient portal.",
    href: THERAPYNOTES_URL,
    cardBg: "bg-lumen-purple/15 hover:bg-lumen-purple/25",
    accent: "text-lumen-royal",
    pill: "bg-lumen-royal text-white",
    emoji: "✦",
  },
  {
    label: "Washington Insurance",
    subtitle: "Optum · Premera · Cigna · Aetna",
    body: "If you live in Washington and have one of these plans, book directly through our patient portal — we bill your insurance for you.",
    href: THERAPYNOTES_URL,
    cardBg: "bg-lumen-pink/20 hover:bg-lumen-pink/30",
    accent: "text-pink-700",
    pill: "bg-lumen-pink text-white",
    emoji: "✦",
  },
  {
    label: "Tennessee Insurance",
    subtitle: "Cigna · Aetna · Carelon · Ascension · Optum",
    body: "If you live in Tennessee and have one of these plans, you'll book through Headway, which handles benefits, billing, and copays.",
    href: HEADWAY_URL,
    cardBg: "bg-lumen-orange/25 hover:bg-lumen-orange/35",
    accent: "text-orange-700",
    pill: "bg-lumen-orange text-white",
    emoji: "✦",
  },
];

export function BookingDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [view, setView] = useState<"options" | "selfpay" | "wainsurance">("options");

  const handleOpenChange = (next: boolean) => {
    if (!next) setView("options");
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#F5F0FA] via-white to-[#FBF4EC] border-2 border-lumen-royal/30 rounded-3xl p-6 md:p-8">
        {view === "options" ? (
          <>
        <DialogHeader className="text-left">
          <span className="font-display text-xs tracking-[0.3em] uppercase text-lumen-orange font-bold">
            Let's get you booked
          </span>
          <DialogTitle className="font-display text-3xl md:text-4xl font-extrabold text-lumen-royal leading-tight mt-2">
            Which option best fits your care?
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-base mt-2">
            Choose the path that matches your situation and we'll guide you to the right intake.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {OPTIONS.map((o) => (
            o.label === "Self-Pay" || o.label === "Washington Insurance" ? (
              <button
                key={o.label}
                type="button"
                onClick={() => setView(o.label === "Self-Pay" ? "selfpay" : "wainsurance")}
                className={`block w-full text-left p-5 rounded-2xl ${o.cardBg} transition-colors group`}
              >
                <CardInner o={o} />
              </button>
            ) : (
              <a
                key={o.label}
                href={o.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-5 rounded-2xl ${o.cardBg} transition-colors group`}
              >
                <CardInner o={o} />
              </a>
            )
          ))}
        </div>

        <p className="text-xs text-slate-500 mt-4 text-center">
          Not sure which to pick? Text <a href="tel:+13606372104" className="font-bold text-lumen-royal underline">(360) 637-2104</a> and we'll help you choose.
        </p>
          </>
        ) : view === "selfpay" ? (
          <>
            <DialogHeader className="text-left">
              <button
                type="button"
                onClick={() => setView("options")}
                className="text-xs font-bold text-lumen-royal hover:underline self-start mb-2"
              >
                ← Back to options
              </button>
              <span className="font-display text-xs tracking-[0.3em] uppercase text-lumen-orange font-bold">
                Self-Pay Intake Packet
              </span>
              <DialogTitle className="font-display text-3xl md:text-4xl font-extrabold text-lumen-royal leading-tight mt-2">
                Complete these forms in order.
              </DialogTitle>
              <DialogDescription className="text-slate-600 text-base mt-2">
                Self-pay clients in <strong>Washington</strong> or <strong>Tennessee</strong>: download,
                complete, and return all five forms before your initial appointment, then continue to the booking portal.
              </DialogDescription>
            </DialogHeader>

            <ol className="space-y-3 mt-2">
              {SELFPAY_PACKET.map((doc) => (
                <li key={doc.label}>
                  <a
                    href={doc.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-start gap-4 p-4 rounded-2xl bg-lumen-purple/10 hover:bg-lumen-purple/20 border-2 border-transparent hover:border-lumen-royal/30 transition-colors group"
                  >
                    <div className="size-10 shrink-0 rounded-full bg-lumen-royal text-white flex items-center justify-center font-extrabold text-xs">
                      PDF
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-base font-extrabold text-lumen-royal leading-tight">
                        {doc.label}
                      </p>
                      <p className="text-sm text-slate-700 mt-1">{doc.desc}</p>
                    </div>
                    <span className="text-lumen-royal font-bold text-2xl group-hover:translate-x-1 transition-transform">↓</span>
                  </a>
                </li>
              ))}
            </ol>

            <a
              href={THERAPYNOTES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full text-center p-4 rounded-2xl bg-lumen-royal text-white font-display font-extrabold text-lg hover:bg-lumen-royal/90 transition-colors"
            >
              Continue to booking portal →
            </a>
          </>
        ) : (
          <>
            <DialogHeader className="text-left">
              <button
                type="button"
                onClick={() => setView("options")}
                className="text-xs font-bold text-lumen-royal hover:underline self-start mb-2"
              >
                ← Back to options
              </button>
              <span className="font-display text-xs tracking-[0.3em] uppercase text-lumen-orange font-bold">
                Washington Insurance Intake
              </span>
              <DialogTitle className="font-display text-3xl md:text-4xl font-extrabold text-lumen-royal leading-tight mt-2">
                Complete your insurance intake packet.
              </DialogTitle>
              <DialogDescription className="text-slate-600 text-base mt-2">
                Washington clients using <strong>Optum, Premera, Cigna, or Aetna</strong>: download
                and complete the intake packet below, then continue to the booking portal.
              </DialogDescription>
            </DialogHeader>

            <ol className="space-y-3 mt-2">
              {WA_INSURANCE_PACKET.map((doc) => (
                <li key={doc.label}>
                  <a
                    href={doc.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-start gap-4 p-4 rounded-2xl bg-lumen-pink/15 hover:bg-lumen-pink/25 border-2 border-transparent hover:border-lumen-royal/30 transition-colors group"
                  >
                    <div className="size-10 shrink-0 rounded-full bg-lumen-royal text-white flex items-center justify-center font-extrabold text-xs">
                      PDF
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-base font-extrabold text-lumen-royal leading-tight">
                        {doc.label}
                      </p>
                      <p className="text-sm text-slate-700 mt-1">{doc.desc}</p>
                    </div>
                    <span className="text-lumen-royal font-bold text-2xl group-hover:translate-x-1 transition-transform">↓</span>
                  </a>
                </li>
              ))}
            </ol>

            <a
              href={THERAPYNOTES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full text-center p-4 rounded-2xl bg-lumen-royal text-white font-display font-extrabold text-lg hover:bg-lumen-royal/90 transition-colors"
            >
              Continue to booking portal →
            </a>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CardInner({ o }: { o: Option }) {
  return (
              <div className="flex items-start gap-4">
                <div className={`size-10 shrink-0 rounded-full ${o.pill} flex items-center justify-center font-bold text-lg`}>
                  {o.emoji}
                </div>
                <div className="flex-1">
                  <p className={`font-display text-xl font-extrabold ${o.accent} leading-tight`}>
                    {o.label}
                  </p>
                  <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mt-0.5">
                    {o.subtitle}
                  </p>
                  <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                    {o.body}
                  </p>
                </div>
                <span className={`${o.accent} font-bold text-2xl group-hover:translate-x-1 transition-transform`}>→</span>
              </div>
  );
}