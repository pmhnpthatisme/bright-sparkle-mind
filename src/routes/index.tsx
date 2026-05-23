import { createFileRoute } from "@tanstack/react-router";
import chelseaImg from "@/assets/chelsea.jpg";

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
          "Virtual psychiatric care that meets you where you are. WA + TN.",
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
      <nav className="sticky top-0 z-50 px-6 md:px-10 py-4 flex justify-between items-center bg-gradient-to-r from-lumen-purple/95 via-lumen-pink/90 to-lumen-orange/95 backdrop-blur-md text-white">
        <a href="#top" className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-white/25 ring-2 ring-white/60 backdrop-blur flex items-center justify-center">
            <Sparkle className="size-4 text-white" />
          </div>
          <span className="font-display text-xl md:text-2xl font-extrabold tracking-[0.18em]">LUMEN</span>
        </a>
        <div className="hidden md:flex gap-8 font-semibold text-sm tracking-wide uppercase">
          <a href="#about" className="hover:text-lumen-yellow transition-colors">About</a>
          <a href="#approach" className="hover:text-lumen-yellow transition-colors">Approach</a>
          <a href="#treatments" className="hover:text-lumen-yellow transition-colors">Services</a>
          <a href="#chelsea" className="hover:text-lumen-yellow transition-colors">Provider</a>
          <a href="#reviews" className="hover:text-lumen-yellow transition-colors">Reviews</a>
        </div>
        <a
          href="sms:+16155884249"
          className="px-5 py-2.5 bg-white text-lumen-pink rounded-full text-xs md:text-sm font-extrabold uppercase tracking-wider hover:bg-lumen-yellow hover:text-slate-900 transition-colors shadow-lg"
        >
          Get Started
        </a>
      </nav>

      {/* Hero — wide rounded banner with overlay text */}
      <header id="top" className="px-4 md:px-6 pt-4 md:pt-6">
        <div className="relative w-full h-[420px] md:h-[560px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl">
          {/* Vivid mesh background */}
          <div className="absolute inset-0 bg-gradient-to-br from-lumen-purple via-lumen-pink to-lumen-orange" />
          <div className="absolute -top-20 -left-20 size-[480px] bg-lumen-yellow/50 blur-[110px] rounded-full" />
          <div className="absolute -bottom-20 -right-10 size-[460px] bg-lumen-teal/45 blur-[120px] rounded-full" />
          <div className="absolute top-1/3 left-1/2 size-[380px] bg-fuchsia-400/40 blur-[120px] rounded-full -translate-x-1/2" />
          {/* Sparkles */}
          <Sparkle className="absolute top-10 left-10 size-6 text-white/70" />
          <Sparkle className="absolute top-20 right-16 size-4 text-lumen-yellow" />
          <Sparkle className="absolute bottom-16 left-1/4 size-5 text-white/60" />
          <Sparkle className="absolute bottom-24 right-1/3 size-7 text-lumen-yellow/80" />
          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-6">
            <p className="font-display text-sm md:text-base tracking-[0.35em] uppercase mb-5 text-white/90">
              Lumen Telepsych
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] max-w-4xl drop-shadow-md">
              Virtual Psychiatry for{" "}
              <span className="italic font-bold">Washington</span> &{" "}
              <span className="italic font-bold">Tennessee</span>
            </h1>
            <p className="font-display italic text-2xl md:text-4xl mt-6 text-lumen-yellow drop-shadow">
              Bring back your sparkle.
            </p>
          </div>
        </div>
      </header>

      {/* Intro paragraph — She Blooms style */}
      <section id="about" className="py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-3 text-lumen-pink">
            Psychiatric Care That Actually Feels Human.
          </h2>
          <h3 className="font-display text-xl md:text-2xl text-slate-700 italic mb-8">
            You're living through a season most people can't understand. Here, you don't have to explain yourself.
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed">
            Lumen Telepsych is a virtual psychiatric practice founded by Chelsea Johnson, PMHNP-BC,
            serving patients across Washington and Tennessee. We offer thoughtful medication
            management and lifestyle planning for ages 6 to 106 — in a space that feels less like
            an appointment and more like a real conversation. Care is collaborative, intuitive,
            and grounded in years of clinical experience across the lifespan and acuity spectrum,
            including inpatient, outpatient, crisis intervention, emergency room, forensic, detox,
            mood disorder, co-occurring disorder, adolescent, and geriatric care settings, and more.
          </p>
        </div>
      </section>

      {/* Why Choose Lumen — 3 column cards */}
      <section id="approach" className="pb-20 md:pb-28 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-display text-xs tracking-[0.3em] uppercase text-lumen-orange font-bold">
              Why patients choose Lumen
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-4">
              Care that <span className="italic text-lumen-purple">meets you where you are.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Lifespan Psychiatry",
                body: "A deep desire to care for patients through every stage, concern, and need at every juncture of life — from a first hard season as a young person to the wisdom and weight of later years.",
                link: "Services",
                href: "#treatments",
                bg: "bg-lumen-purple/15",
                text: "text-lumen-purple",
                btn: "bg-lumen-purple",
              },
              {
                title: "Collaborative Medication Management",
                body: "Treatment plans aren't ordered for you — they're built side-by-side. Your goals lead. Brilliant clinical instinct fills in the map. Every decision is made with you, not for you.",
                link: "Med Management",
                href: "#chelsea",
                bg: "bg-lumen-pink/20",
                text: "text-pink-700",
                btn: "bg-lumen-pink",
              },
              {
                title: "Flexible Support for Real Life",
                body: "Life is already demanding — mental health care shouldn't add to it. Meet from your couch, your car, or your closet floor. Direct provider access between visits. Same Chelsea, every time.",
                link: "Get Started",
                href: "sms:+16155884249",
                bg: "bg-lumen-orange/25",
                text: "text-orange-700",
                btn: "bg-lumen-orange",
              },
            ].map((c) => (
              <div
                key={c.title}
                className={`p-8 rounded-[2rem] ${c.bg} flex flex-col`}
              >
                <Sparkle className={`size-7 ${c.text} mb-5`} />
                <h3 className="font-display text-2xl font-extrabold mb-4 leading-tight">
                  {c.title}
                </h3>
                <p className="text-slate-700 leading-relaxed mb-7 flex-1">{c.body}</p>
                <a
                  href={c.href}
                  className={`inline-block self-start px-6 py-2.5 ${c.btn} text-white rounded-full text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity`}
                >
                  {c.link}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Approach / Patient as Main Character */}
      <section className="py-24 px-6 md:px-10 bg-slate-900 text-white relative overflow-hidden">
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
            Treatment plans shouldn't be handed down from a mountain — they're built side-by-side.
            Chelsea brings deep clinical experience, expertise, and diagnostic accuracy from years of
            practice across the full lifespan. You bring the expertise on your own life. Together you
            make the plan.
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
                Your goals lead. Brilliant clinical instinct fills in the map. You'll never be left
                in the dark about your own care — every decision is made with you, not for you.
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

      {/* Meet Your Provider — She Blooms-style team section */}
      <section id="chelsea" className="py-24 px-6 md:px-10 bg-gradient-to-b from-surface to-lumen-purple/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-display text-xs tracking-[0.3em] uppercase text-lumen-orange font-bold">
              Meet your provider
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
              The brilliant clinician your friends keep <span className="italic text-lumen-pink">talking about.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute -top-6 -left-6 size-40 bg-lumen-yellow/60 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -right-6 size-40 bg-lumen-teal/40 rounded-full blur-2xl" />
              <div className="relative aspect-square rounded-full overflow-hidden border-[10px] border-white shadow-xl ring-4 ring-lumen-purple/30 max-w-sm mx-auto">
                <img
                  src={chelseaImg}
                  alt="Chelsea Johnson, PMHNP-BC, founder of Lumen Telepsych"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mt-6">
                <p className="font-display text-2xl font-extrabold">Chelsea Johnson, PMHNP-BC</p>
                <p className="text-slate-600 mt-1">Founder · Psychiatric Medication Management</p>
              </div>
            </div>

            <div>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Chelsea didn't just study psychiatry — she lived it in every corner of the field.
                As a travel psych nurse she worked across detox, forensic and criminal competency
                settings, mood disorder clinics, adolescent and geriatric units, and inpatient and
                outpatient programs nationwide.
              </p>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                Bringing back your sparkle is what gets her out of bed in the morning. Watching
                patients reconnect with the version of themselves they were starting to miss —
                that's the whole point. Your light is worth protecting, and she's honored to help
                you do it.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Certification</p>
                  <p className="font-bold mt-1">ANCC PMHNP-BC</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Education</p>
                  <p className="font-bold mt-1">Univ. of South Alabama</p>
                </div>
              </div>

              <a
                href="sms:+16155884249"
                className="inline-block px-7 py-3.5 bg-lumen-pink text-white rounded-full font-extrabold text-sm uppercase tracking-wider hover:bg-lumen-purple transition-colors shadow-lg"
              >
                Get to know Chelsea
              </a>
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
              Simple from day one.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                n: "01",
                bg: "bg-lumen-purple/15",
                t: "text-lumen-purple",
                title: "Reach out & book",
                body: "Text, call, or book directly on our platforms. A human writes back — we'll find a time that works.",
              },
              {
                n: "02",
                bg: "bg-lumen-orange/20",
                t: "text-orange-700",
                title: "Complete your packet",
                body: "Fill out a short informative intake packet so we can prepare to give you the best possible care.",
              },
              {
                n: "03",
                bg: "bg-lumen-teal/20",
                t: "text-teal-700",
                title: "Have your session",
                body: "Meet on a HIPAA-secure video visit where you feel comfortable, prioritized, and actually heard.",
              },
              {
                n: "04",
                bg: "bg-lumen-pink/20",
                t: "text-pink-700",
                title: "Stay in touch",
                body: "Direct provider access between visits. If you need us, we're here — same Chelsea, every time.",
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
              Bedside manner: 5.00 · Wait time: 4.97.
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

          <div className="max-w-2xl mx-auto">
            <div className="p-9 md:p-12 rounded-[2rem] bg-gradient-to-br from-lumen-purple via-lumen-pink to-lumen-orange text-white shadow-2xl shadow-lumen-purple/30 relative overflow-hidden">
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
