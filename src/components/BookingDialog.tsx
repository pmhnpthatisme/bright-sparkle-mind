import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// TODO: Replace these placeholder URLs with your real portal links.
// (Paste them here and every Book Now / Get Started button updates automatically.)
const SELFPAY_URL = "https://www.therapynotes.com/patient-portal/"; // TherapyNotes patient portal
const INSURANCE_URL = "https://www.therapynotes.com/patient-portal/"; // Direct in-network intake
const HEADWAY_URL = "https://headway.co/"; // Your Headway provider profile

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
    subtitle: "No insurance — paying out of pocket",
    body: "Book and complete intake directly through our secure HIPAA-compliant patient portal.",
    href: SELFPAY_URL,
    cardBg: "bg-lumen-purple/15 hover:bg-lumen-purple/25",
    accent: "text-lumen-royal",
    pill: "bg-lumen-royal text-white",
    emoji: "✦",
  },
  {
    label: "Insurance (in-network direct)",
    subtitle: "Using your insurance through Lumen directly",
    body: "Verify benefits and schedule through our patient portal — we'll bill your insurance for you.",
    href: INSURANCE_URL,
    cardBg: "bg-lumen-pink/20 hover:bg-lumen-pink/30",
    accent: "text-pink-700",
    pill: "bg-lumen-pink text-white",
    emoji: "✦",
  },
  {
    label: "Headway",
    subtitle: "Using your insurance through Headway",
    body: "Schedule through Headway's platform — they handle benefits, billing, and copays.",
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-[#F5F0FA] via-white to-[#FBF4EC] border-2 border-lumen-royal/30 rounded-3xl p-6 md:p-8">
        <DialogHeader className="text-left">
          <span className="font-display text-xs tracking-[0.3em] uppercase text-lumen-orange font-bold">
            Let's get you booked
          </span>
          <DialogTitle className="font-display text-3xl md:text-4xl font-extrabold text-lumen-royal leading-tight mt-2">
            How are you paying?
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-base mt-2">
            Pick the option that matches you — each one takes you straight to the right intake portal.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {OPTIONS.map((o) => (
            <a
              key={o.label}
              href={o.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-5 rounded-2xl ${o.cardBg} transition-colors group`}
            >
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
            </a>
          ))}
        </div>

        <p className="text-xs text-slate-500 mt-4 text-center">
          Not sure which to pick? Text <a href="tel:+13606372104" className="font-bold text-lumen-royal underline">(360) 637-2104</a> and we'll help you choose.
        </p>
      </DialogContent>
    </Dialog>
  );
}