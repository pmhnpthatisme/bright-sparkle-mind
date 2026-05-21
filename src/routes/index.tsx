import { createFileRoute } from "@tanstack/react-router";
import chelseaImg from "@/assets/chelsea.jpg";
import waImg from "@/assets/wa-landscape.jpg";
import tnImg from "@/assets/tn-landscape.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lumen Telepsych — Bring back your sparkle | Virtual Psychiatry in WA & TN" },
      {
        name: "description",
        content:
          "Virtual telepsychiatry with PMHNP Chelsea Johnson. Collaborative, casual, brilliant care across the lifespan in Washington and Tennessee. Text 615-588-4249.",
      },
      { property: "og:title", content: "Lumen Telepsych — Bring back your sparkle" },
      {
        property: "og:description",
        content:
          "Virtual psychiatric care that feels like texting your smartest friend. WA + TN. Aetna + self-pay.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const TREATMENTS = [
  { label: "Depression", color: "bg-lumen-purple/15 text-lumen-purple" },
  { label: "Anxiety", color: "bg-lumen-teal/15 text-teal-700" },
  { label: "Hoarding Disorder", color: "bg-lumen-orange/20 text-orange-700" },
  { label: "Sleep Problems", color: "bg-indigo-100 text-indigo-700" },
  { label: "Weight Loss Consultation", color: "bg-emerald-100 text-emerald-700" },
  { label: "Psychosexual Evaluation", color: "bg-lumen-pink/20 text-pink-700" },
  { label: "Young Adult Issues", color: "bg-lumen-yellow/40 text-amber-800" },
  { label: "New Patient Visit", color: "bg-rose-100 text-rose-700" },
  { label: "Psychiatry Consultation", color: "bg-fuchsia-100 text-fuchsia-700" },
  { label: "Adolescent Mood", color: "bg-cyan-100 text-cyan-700" },
  { label: "Geriatric Care", color: "bg-amber-100 text-amber-800" },
  { label: "ADHD Management", color: "bg-violet-100 text-violet-700" },
  { label: "Bipolar Disorder", color: "bg-lime-100 text-lime-800" },
  { label: "Medication Management", color: "bg-sky-100 text-sky-700" },
  { label: "Postpartum Support", color: "bg-pink-100 text-pink-700" },
  { label: "LGBTQ+ Affirming Care", color: "bg-purple-100 text-purple-700" },
];

const REVIEWS = [
  {
    quote:
      "Chelsea is amazing! She took the time to really listen and made me feel seen and understood. I love her vibe. Relatable and easy to talk to — the whole experience felt safe and supportive.",
    name: "KE",
    tag: "Verified patient",
  },
  {
    quote:
      "Name one other doctor that they let you text them? She will literally send you a meme as a reply and it will answer your question and make you laugh. You will never feel silly for the questions that you have.",
    name: "VS",
    tag: "Verified patient",
  },
  {
    quote:
      "I came to her honestly a total insufferable wreck. She could have sent me inpatient but she was comfortable working with me in another way, and to this day I am doing much better only because of what she did.",
    name: "TH",
    tag: "Verified patient",
  },
  {
    quote:
      "It was comforting to talk with a professional who doesn't talk and act like a robot. Felt like I was talking to a friend with great advice!",
    name: "Jacob M.",
    tag: "Verified patient",
  },
  {
    quote:
      "I felt value, I felt like Chelsea understood me and helped me come up with a plan. I'm looking forward to our next session.",
    name: "Evelyn G.",
    tag: "Verified patient",
  },
  {
    quote:
      "Chelsea is my hero in scrubs. Thank you for coming up with suggestions that I could actually do, and making a plan with me that I can follow. No-one else has ever done that for me.",
    name: "CM",
    tag: "Verified patient",
  },
];

const FAQS = [
  {
    q: "Where do you practice?",
    a: "100% virtually across Washington state and Tennessee. Sessions are HIPAA-secure video visits — meet from your couch, your car, or your closet floor. No judgment.",
  },
  {
    q: "Do you accept insurance?",
    a: "Yes — we're in-network with Aetna. Self-pay is also available, and sliding scale options are offered for qualifying clients.",
  },
  {
    q: "How fast can I be seen?",
    a: "Same-day and next-week appointments are usually available. Text 615-588-4249 and we'll find you a time that works.",
  },
  {
    q: "What does membership include?",
    a: "Direct 24/7 text access to your PMHNP, one monthly wellness follow-up, medication management and refills, and consistent care with the same provider every visit.",
  },
  {
    q: "What ages do you treat?",
    a: "Care across the lifespan — adolescents through geriatric. Chelsea has practiced in adolescent, adult, and geriatric settings (inpatient and outpatient) across the country.",
  },
];

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0l1.8 8.4L22 10.2l-8.2 1.8L12 24l-1.8-12L2 10.2l8.2-1.8L12 0z" />
    </svg>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-surface font-sans text-slate-900 overflow-x-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-50 px-6 md:px-10 py-5 flex justify-between items-center bg-surface/85 backdrop-blur-md border-b border-slate-900/5">
        <a href="#top" className="flex items-center gap-2.5">
          <div className="size-9 rounded-full bg-gradient-to-tr from-lumen-purple via-lumen-pink to-lumen-orange shadow-md shadow-lumen-purple/30" />
          <span className="font-display text-xl font-extrabold tracking-tight">LUMEN</span>
          <span className="hidden sm:inline text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 ml-1">Telepsych</span>
        </a>
        <div className="hidden md:flex gap-9 font-medium text-sm">
          <a href="#vibe" className="hover:text-lumen-orange transition-colors">The Vibe</a>
          <a href="#treatments" className="hover:text-lumen-purple transition-colors">What We Treat</a>
          <a href="#chelsea" className="hover:text-lumen-teal transition-colors">About Chelsea</a>
          <a href="#reviews" className="hover:text-lumen-pink transition-colors">Reviews</a>
          <a href="#faq" className="hover:text-lumen-orange transition-colors">FAQ</a>
        </div>
        <a
          href="sms:+16155884249"
          className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-semibold hover:scale-[1.03] transition-transform"
        >
          Text to book
        </a>
      </nav>

      {/* Hero */}
      <header id="top" className="relative px-6 md:px-10 pt-12 md:pt-16 pb-24 overflow-hidden">
        <div className="absolute -top-20 -left-20 size-[500px] bg-lumen-purple/25 blur-[120px] rounded-full -z-10" />
        <div className="absolute top-40 -right-20 size-[400px] bg-lumen-orange/25 blur-[120px] rounded-full -z-10" />
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-lumen-yellow rounded-full text-xs font-bold tracking-wider mb-6 uppercase">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-orange-500" />
                </span>
                Now serving WA + TN
              </span>
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.92] mb-8 tracking-tight">
                Bring back{" "}
                <span className="italic">your</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumen-purple via-lumen-pink to-lumen-orange">
                  sparkle.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                Virtual telepsychiatry that feels like texting your smartest friend.
                Collaborative, intuitive, lifespan-wide care from a PMHNP who actually listens —
                and isn't afraid to say what needs to be said.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="sms:+16155884249"
                  className="px-7 py-4 bg-gradient-to-r from-lumen-purple to-lumen-orange text-white rounded-2xl font-bold text-base md:text-lg shadow-xl shadow-lumen-purple/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                >
                  Text 615-588-4249
                </a>
                <div className="flex items-center gap-3 px-5 py-3.5 bg-white border-2 border-slate-100 rounded-2xl">
                  <div className="flex -space-x-2">
                    <div className="size-8 rounded-full bg-lumen-teal border-2 border-white" />
                    <div className="size-8 rounded-full bg-lumen-yellow border-2 border-white" />
                    <div className="size-8 rounded-full bg-lumen-pink border-2 border-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold leading-tight">5.0 · 47 reviews</p>
                    <p className="text-xs text-slate-500 leading-tight">Verified patients</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-md">
              <div className="absolute -top-10 -right-10 size-64 bg-lumen-purple/30 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 size-64 bg-lumen-orange/30 blur-3xl rounded-full" />
              <div className="relative rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl rotate-2">
                <img
                  src={chelseaImg}
                  alt="Chelsea Johnson, PMHNP-BC, founder of Lumen Telepsych"
                  width={1024}
                  height={1280}
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              <div className="absolute -top-3 -left-4 bg-white px-4 py-3 rounded-2xl shadow-xl -rotate-6 border border-slate-100">
                <p className="text-[10px] font-bold text-lumen-purple uppercase tracking-widest">
                  Mood Bloom
                </p>
                <div className="flex gap-1 mt-1.5">
                  <div className="h-1.5 w-6 bg-lumen-teal rounded-full" />
                  <div className="h-1.5 w-3 bg-lumen-pink rounded-full" />
                  <div className="h-1.5 w-4 bg-lumen-yellow rounded-full" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white px-4 py-3 rounded-2xl shadow-xl rotate-3 border border-slate-100 flex items-center gap-2">
                <Sparkle className="size-4 text-lumen-orange" />
                <p className="text-xs font-bold">PMHNP-BC · ANCC</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* The Vibe / Patient as Main Character */}
      <section id="vibe" className="py-24 px-6 md:px-10 bg-slate-900 text-white relative overflow-hidden">
        <Sparkle className="absolute top-12 left-12 size-6 text-lumen-yellow opacity-60" />
        <Sparkle className="absolute bottom-20 right-20 size-8 text-lumen-pink opacity-50" />
        <Sparkle className="absolute top-1/2 right-10 size-4 text-lumen-teal opacity-60" />
        <div className="max-w-5xl mx-auto text-center">
          <span className="font-display text-xs tracking-[0.3em] uppercase text-lumen-yellow font-bold">
            The Approach
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-extrabold mt-4 mb-8 leading-tight">
            You are the{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lumen-pink to-lumen-orange">
              main character.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-14 max-w-3xl mx-auto">
            Treatment plans shouldn't be handed down from a mountain. They're built side-by-side, while
            you drive. Chelsea brings a toolkit forged in detox units, forensic settings, mood disorder
            clinics, adolescent wards, and geriatric care — you bring the expertise on your own life.
            Together you make the plan.
          </p>

          <div className="grid md:grid-cols-3 gap-5 text-left">
            <div className="p-7 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
              <div className="size-11 bg-lumen-teal/20 rounded-xl flex items-center justify-center text-lumen-teal mb-5">
                <Sparkle className="size-5" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Casual safety</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Patients often share things they hadn't planned to — because for the first time it feels
                safe enough to put it down. That's where real treatment begins.
              </p>
            </div>
            <div className="p-7 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
              <div className="size-11 bg-lumen-purple/30 rounded-xl flex items-center justify-center text-lumen-purple mb-5">
                <Sparkle className="size-5" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Collaborative, not handed down</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your goals lead. Brilliant clinical instinct fills in the map. No black-box prescribing,
                no being left in the dark about your own care.
              </p>
            </div>
            <div className="p-7 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
              <div className="size-11 bg-lumen-orange/20 rounded-xl flex items-center justify-center text-lumen-orange mb-5">
                <Sparkle className="size-5" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Real talk, real accountability</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A friend who happens to be a brilliant clinician. Warmth, humor, and the willingness
                to say the hard thing when it'll actually move you forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Treat */}
      <section id="treatments" className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-display text-xs tracking-[0.3em] uppercase text-lumen-purple font-bold">
              What We Treat
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-extrabold mt-4 mb-5 leading-tight">
              Support for every <span className="italic underline decoration-lumen-orange decoration-4 underline-offset-8">season</span> of life.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              From the obvious to the things you've never told anyone — psychiatric care for the
              full range of what humans go through.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {TREATMENTS.map((t) => (
              <span
                key={t.label}
                className={`px-5 py-3 rounded-full font-semibold text-sm md:text-base ring-1 ring-black/5 hover:scale-105 transition-transform cursor-default ${t.color}`}
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Chelsea */}
      <section id="chelsea" className="py-24 px-6 md:px-10 bg-gradient-to-b from-surface to-lumen-purple/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src={waImg}
                    alt="Washington state sunset"
                    loading="lazy"
                    width={768}
                    height={960}
                    className="w-full aspect-[4/5] object-cover rounded-3xl shadow-md"
                  />
                  <div className="p-5 bg-lumen-yellow/40 rounded-3xl">
                    <p className="font-bold text-base">Forensic & Competency</p>
                    <p className="text-xs opacity-70 mt-1">High-acuity clinical experience</p>
                  </div>
                  <div className="p-5 bg-lumen-teal/20 rounded-3xl">
                    <p className="font-bold text-base">Detox & Inpatient</p>
                    <p className="text-xs opacity-70 mt-1">Every level of care</p>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="p-5 bg-lumen-purple/25 rounded-3xl">
                    <p className="font-bold text-base">Adolescent Care</p>
                    <p className="text-xs opacity-70 mt-1">Compassionate youth guidance</p>
                  </div>
                  <img
                    src={tnImg}
                    alt="Tennessee skyline at golden hour"
                    loading="lazy"
                    width={768}
                    height={960}
                    className="w-full aspect-[4/5] object-cover rounded-3xl shadow-md"
                  />
                  <div className="p-5 bg-lumen-orange/25 rounded-3xl">
                    <p className="font-bold text-base">Geriatric Psych</p>
                    <p className="text-xs opacity-70 mt-1">Across the full lifespan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <span className="font-display text-xs tracking-[0.3em] uppercase text-lumen-orange font-bold">
                Meet your guide
              </span>
              <h2 className="font-display text-5xl font-extrabold mt-4 mb-7 leading-tight">
                She traveled the country so she could{" "}
                <span className="italic underline decoration-lumen-pink decoration-4 underline-offset-8">
                  see the full picture.
                </span>
              </h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Chelsea Johnson, PMHNP-BC, is the founder of Lumen Telepsych. She didn't just study
                psychiatry — she lived it in every corner of the field. As a travel psych nurse she
                worked across detox, forensic and criminal competency settings, mood disorder clinics,
                adolescent and geriatric units, and inpatient and outpatient programs nationwide.
              </p>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                The slogan isn't just for patients — it's her story too. Nobody believed in her, and
                here she is. Nobody dimmed her light. She's here to help you protect yours.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Certification</p>
                  <p className="font-bold mt-1">ANCC PMHNP-BC</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Education</p>
                  <p className="font-bold mt-1">Univ. of South Alabama</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Member</p>
                  <p className="font-bold mt-1">American Psychiatric Assn.</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">NPI</p>
                  <p className="font-bold mt-1">1194572719</p>
                </div>
              </div>

              <blockquote className="p-6 bg-gradient-to-br from-lumen-purple/15 to-lumen-orange/15 rounded-3xl border-l-4 border-lumen-pink">
                <p className="font-display italic text-xl text-slate-800 leading-snug">
                  "Patients tell me all the time they didn't plan to share something — but they did,
                  because they finally felt safe. That info is usually the key to a plan that actually works."
                </p>
                <p className="text-sm font-bold mt-3 text-slate-600">— Chelsea, PMHNP</p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-display text-xs tracking-[0.3em] uppercase text-lumen-teal font-bold">
              How it works
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-extrabold mt-4 leading-tight">
              Three steps. No phone trees.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                bg: "bg-lumen-purple/15",
                t: "text-lumen-purple",
                title: "Text to start",
                body: "Send a text to 615-588-4249. A human writes back. No 14-tab intake form to fight through.",
              },
              {
                n: "02",
                bg: "bg-lumen-orange/20",
                t: "text-orange-700",
                title: "Meet on video",
                body: "HIPAA-secure visit from anywhere in WA or TN. We build your plan together — no surprises.",
              },
              {
                n: "03",
                bg: "bg-lumen-teal/20",
                t: "text-teal-700",
                title: "Stay in touch 24/7",
                body: "Direct text access to your provider between visits. Same Chelsea, every time.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="p-8 bg-white rounded-3xl border border-slate-100 hover:-translate-y-1 transition-transform shadow-sm"
              >
                <div
                  className={`size-14 rounded-2xl ${s.bg} ${s.t} flex items-center justify-center font-display font-extrabold text-xl mb-5`}
                >
                  {s.n}
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 px-6 md:px-10 bg-gradient-to-br from-lumen-yellow/30 via-lumen-pink/15 to-lumen-purple/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Sparkle key={i} className="size-6 text-lumen-orange" />
              ))}
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-extrabold leading-tight">
              5.0 across <span className="italic text-lumen-pink">47</span> verified reviews.
            </h2>
            <p className="text-slate-700 mt-4 max-w-2xl mx-auto">
              Bedside manner: 5.00 · Wait time: 4.97. Providers can't pay to alter or remove reviews.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="p-7 bg-white rounded-3xl border border-white shadow-sm hover:-translate-y-1 transition-transform"
              >
                <Sparkle className="size-5 text-lumen-orange mb-4" />
                <p className="text-slate-700 leading-relaxed mb-5">"{r.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="size-10 rounded-full bg-gradient-to-br from-lumen-purple to-lumen-orange flex items-center justify-center text-white font-bold text-sm">
                    {r.name.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{r.name}</p>
                    <p className="text-xs text-slate-500">{r.tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-display text-xs tracking-[0.3em] uppercase text-lumen-pink font-bold">
              Care plans
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-extrabold mt-4 leading-tight">
              Care that <span className="italic">fits your life.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-9 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Pay-as-you-go</p>
              <h3 className="font-display text-3xl font-bold mb-5">Standard visits</h3>
              <ul className="space-y-3 text-slate-700 mb-8">
                <li className="flex gap-3"><Sparkle className="size-4 text-lumen-orange shrink-0 mt-1.5" /> Initial psychiatric consultation</li>
                <li className="flex gap-3"><Sparkle className="size-4 text-lumen-orange shrink-0 mt-1.5" /> Medication management & refills</li>
                <li className="flex gap-3"><Sparkle className="size-4 text-lumen-orange shrink-0 mt-1.5" /> Aetna in-network or self-pay</li>
                <li className="flex gap-3"><Sparkle className="size-4 text-lumen-orange shrink-0 mt-1.5" /> Sliding scale for qualifying clients</li>
              </ul>
              <a href="sms:+16155884249" className="block w-full text-center py-3.5 bg-slate-100 rounded-2xl font-bold hover:bg-slate-200 transition-colors">
                Ask about rates
              </a>
            </div>

            <div className="p-9 rounded-[2rem] bg-gradient-to-br from-lumen-purple via-lumen-pink to-lumen-orange text-white shadow-2xl shadow-lumen-purple/30 relative overflow-hidden">
              <span className="absolute top-5 right-5 bg-lumen-yellow text-slate-900 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full">
                Most popular
              </span>
              <p className="text-xs uppercase tracking-widest text-white/80 font-bold mb-3">Membership</p>
              <h3 className="font-display text-3xl font-bold mb-5">The Sparkle Plan</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3"><Sparkle className="size-4 text-lumen-yellow shrink-0 mt-1.5" /> Direct 24/7 text access to your PMHNP</li>
                <li className="flex gap-3"><Sparkle className="size-4 text-lumen-yellow shrink-0 mt-1.5" /> One monthly wellness follow-up</li>
                <li className="flex gap-3"><Sparkle className="size-4 text-lumen-yellow shrink-0 mt-1.5" /> Medication management & refills</li>
                <li className="flex gap-3"><Sparkle className="size-4 text-lumen-yellow shrink-0 mt-1.5" /> Personalized lifestyle & treatment planning</li>
                <li className="flex gap-3"><Sparkle className="size-4 text-lumen-yellow shrink-0 mt-1.5" /> Same provider every time</li>
              </ul>
              <a href="sms:+16155884249" className="block w-full text-center py-3.5 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-colors">
                Start your membership
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 md:px-10 bg-surface">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-display text-xs tracking-[0.3em] uppercase text-lumen-purple font-bold">FAQ</span>
            <h2 className="font-display text-5xl md:text-6xl font-extrabold mt-4 leading-tight">
              Good questions, <span className="italic">honest answers.</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details
                key={i}
                className="group bg-white p-6 rounded-2xl border border-slate-100 open:shadow-md transition-shadow"
              >
                <summary className="flex justify-between items-center cursor-pointer font-display font-bold text-lg list-none">
                  {f.q}
                  <span className="size-8 rounded-full bg-lumen-yellow/60 flex items-center justify-center text-slate-900 group-open:rotate-45 transition-transform shrink-0 ml-4">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-lumen-purple via-lumen-pink to-lumen-orange rounded-[3rem] p-12 md:p-20 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-lumen-purple/30">
          <Sparkle className="absolute top-10 left-10 size-6 text-white/40" />
          <Sparkle className="absolute bottom-10 right-12 size-8 text-white/40" />
          <Sparkle className="absolute top-1/2 right-1/4 size-4 text-lumen-yellow" />
          <div className="absolute top-0 right-0 size-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 size-96 bg-lumen-yellow/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold mb-7 tracking-tighter italic leading-none">
              Ready to glow?
            </h2>
            <p className="text-lg md:text-2xl mb-10 font-medium max-w-2xl mx-auto text-white/95">
              Same-day appointments often available. Reach out with any questions —
              start bringing back your sparkle today.
            </p>
            <a
              href="sms:+16155884249"
              className="inline-block px-10 py-5 bg-white text-slate-900 rounded-full font-extrabold text-lg md:text-xl shadow-2xl hover:bg-lumen-yellow hover:scale-[1.03] transition-all"
            >
              Text 615-588-4249
            </a>
            <p className="mt-6 text-white/80 text-sm">
              or email{" "}
              <a href="mailto:lumentelepsych@gmail.com" className="underline font-bold">
                lumentelepsych@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 pb-12 pt-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-8 border-t border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-full bg-gradient-to-tr from-lumen-purple via-lumen-pink to-lumen-orange" />
            <div>
              <p className="font-display font-extrabold tracking-tight">LUMEN TELEPSYCH</p>
              <p className="text-xs text-slate-500">Women-owned · Licensed in WA & TN</p>
            </div>
          </div>
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} Lumen Telepsych LLC · Chelsea Johnson, PMHNP-BC
          </div>
          <div className="flex gap-6 text-sm font-semibold text-slate-600">
            <a href="sms:+16155884249" className="hover:text-lumen-purple">615-588-4249</a>
            <a href="mailto:lumentelepsych@gmail.com" className="hover:text-lumen-orange">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
