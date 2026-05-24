## Copy updates in `src/routes/index.tsx`

**1. "Psychiatric Care That Actually Feels Human" intro paragraph**
- Remove "founded by Chelsea Johnson, PMHNP-BC" → replace with neutral phrasing, e.g. "operated by an experienced psychiatric nurse practitioner".
- Update the final sentence to expand the settings list and end with: "…ensuring a strong clinical understanding and a comfort with whatever is brought to the table."

Proposed paragraph:
> Lumen Telepsych is a virtual psychiatric practice operated by an experienced psychiatric nurse practitioner, serving patients across Washington and Tennessee. We offer thoughtful medication management and lifestyle planning for ages 6 to 106 — in a space that feels less like an appointment and more like a real conversation. Care is collaborative, intuitive, and grounded in years of clinical experience across the full lifespan and acuity spectrum, including inpatient, outpatient, partial hospitalization, intensive outpatient, crisis intervention, emergency room, forensic, detox, mood disorder, co-occurring disorder, adolescent, geriatric, and community-based care settings, ensuring a strong clinical understanding and a comfort with whatever is brought to the table.

**2. "Lifespan Psychiatry" card** — rewrite to remove pessimistic framing ("first hard season", "older years"):
> A genuine commitment to walking with patients through every stage of life — meeting you where you are, with care that grows alongside you from young years through every chapter ahead.

**3. "What We Treat" section** — make it explicit the list isn't exhaustive and that anyone is welcome to reach out:
- Update the subheading to clearly invite anyone, e.g.:
> "These are some of the things people come to Lumen for — but this is not the full list. If what you're carrying isn't here, please still reach out. Care is offered to anyone willing to ask for it, across every diagnosis, season, and acuity level."
- Optionally add a small CTA pill linking to text/booking.

**4. Meet Your Provider section**
- Change "Founder · Psychiatric Medication Management" → "Psychiatric Medication Management" (remove "Founder").
- Update the alt text on Chelsea's photo to remove "founder of Lumen Telepsych".

**5. Optional consolidation (offered, your call):** Remove the "What We Treat" diagnosis chip list entirely and replace with a single warm paragraph emphasizing lifespan training, comfort with low-to-extremely-high acuity, and openness to helping anyone who reaches out. I will keep the section by default and only remove if you confirm — see question below.

## Background color refresh in `src/styles.css`

The current `--surface: #FFFBF7` reads as a flat white. Warm it into a soft, low-glare cream that aligns with the purple/orange/pink palette and doesn't fatigue the eye:

- `--surface`: `#FBF4EC` (warm blush-cream) — softer, lightly peach-tinted, pairs with the gradients without competing.
- Section backgrounds that currently rely on plain white will inherit this automatically.
- Keep the dark "Approach" section as-is for contrast.

## Question before I build

Do you want me to **remove** the "What We Treat" chip list and replace with a single lifespan/acuity statement, or **keep** the chips and just add the "not the full list — please reach out" framing above them? I'll default to keeping the chips + adding the welcoming framing unless you say otherwise.
