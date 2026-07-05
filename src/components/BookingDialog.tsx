import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { IntakeWizard } from "@/components/intake/IntakeWizard";

const THERAPYNOTES_URL = "https://therapyportal.com/p/lumentelepsych2025/";
const HEADWAY_URL = "https://care.headway.co/providers/chelsea-johnson-5?state=TENNESSEE";
const ZOCDOC_URL = "https://www.zocdoc.com/booking-link/doctor/chelsea-johnson-aprn-rn-pmhnp-bc-np-msn-685897";

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
    subtitle: "In network with: Aetna · First Choice Health Network · Cigna",
    body: "If you live in Washington and have Aetna, First Choice Health Network, or Cigna, book directly through our patient portal — we bill your insurance for you.",
    href: THERAPYNOTES_URL,
    cardBg: "bg-lumen-pink/20 hover:bg-lumen-pink/30",
    accent: "text-pink-700",
    pill: "bg-lumen-pink text-white",
    emoji: "✦",
  },
  {
    label: "Tennessee Insurance",
    subtitle: "In network with: Ascension · Independence Blue Cross · Cigna · Horizon Blue Cross of NJ · Aetna · Carelon Behavioral Health",
    body: "If you live in Tennessee and have one of these plans, you'll book through Headway, which handles benefits, billing, and copays.",
    href: HEADWAY_URL,
    cardBg: "bg-lumen-orange/25 hover:bg-lumen-orange/35",
    accent: "text-orange-700",
    pill: "bg-lumen-orange text-white",
    emoji: "✦",
  },
];

const ZOCDOC_OPTION: Option = {
  label: "Book via Zocdoc",
  subtitle: "Self-pay (WA/TN) or WA insurance",
  body: "Prefer Zocdoc? You can book and complete intake right inside Zocdoc — great for self-pay clients in Washington or Tennessee, and for Washington clients using insurance. (Tennessee insurance clients: please use Headway above.) Please note: Zocdoc charges the practice a per-booking fee. To keep this option available for everyone, appointments cancelled with less than 24 hours' notice or missed as a no-show will be billed the equivalent Zocdoc booking fee.",
  href: ZOCDOC_URL,
  cardBg: "bg-slate-100 hover:bg-slate-200",
  accent: "text-slate-700",
  pill: "bg-slate-700 text-white",
  emoji: "✦",
};

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
          <a
            href={ZOCDOC_OPTION.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-5 rounded-2xl ${ZOCDOC_OPTION.cardBg} transition-colors group border-t-2 border-dashed border-slate-300 mt-4 pt-5`}
          >
            <CardInner o={ZOCDOC_OPTION} />
          </a>
        </div>

        <p className="text-xs text-slate-500 mt-4 text-center">
          Not sure which to pick? Text <a href="tel:+13608723435" className="font-bold text-lumen-royal underline">(360) 872-3435</a> and we'll help you choose.
        </p>
          </>
        ) : (
          <IntakeWizard
            flavor={view === "selfpay" ? "selfpay" : "wa_insurance"}
            onBack={() => setView("options")}
            onComplete={() => { setView("options"); onOpenChange(false); }}
          />
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