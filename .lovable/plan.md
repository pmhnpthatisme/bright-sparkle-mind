## Plan: Content & Trust Updates

### 1. Hours of Operation — Simplify timezone wording
Replace the current dual-timezone explanation with clear Central Time wording plus a helpful note for Washington patients.

Current: "Hours are listed in Pacific and Central time zones for our Washington and Tennessee patients."

Proposed: "All hours are listed in **Central Time**. Patients in Washington: please adjust accordingly (for example, 9 AM CT = 7 AM PT)."

This is cleaner, less cluttered, and still inclusive.

### 2. Contact & Book section — Add email alongside phone
In the paragraph under the "Send a message" heading (currently only shows phone), add the email `lumentelepsych@gmail.com` styled the same way as the phone number (`text-lumen-royal underline font-bold`).

### 3. Meet Your Provider — Add welcoming quote
Insert the requested quote in a visually distinct block within the provider section:

> "Come as you are—no version of you is too much or not enough here."

Placement: after the main bio paragraph (the one ending "...we'll find a way forward."), before the personal/interests paragraph. Styled as an italic pull-quote with a left accent border or soft background to differentiate it from body text.

### 4. Contact form — Recommend two additional trust/compliance checkboxes

For a telehealth practice, adding these two required checkboxes improves legal protection, SEO trust signals, and patient clarity without hurting conversion:

| Checkbox | Purpose |
|---|---|
| **Crisis acknowledgment** | "I understand this form is for general inquiries and scheduling only, and is not monitored for emergencies. If I am in crisis, I will call 911 or 988." |
| **Privacy/communication consent** | "I consent to receive communications (including unencrypted email and text) at the contact details I provided, and I understand that messaging via this form is not a substitute for clinical advice." |

Why these matter:
- **Crisis checkbox**: Protects the practice legally and reiterates the emergency protocol. Repeating it as an interactive checkbox (vs. static text) increases patient awareness and reduces liability.
- **Communication consent**: Covers telehealth privacy basics and sets expectations. Google and patients both look for transparency signals on healthcare sites.

Also add a short line of text above the submit button: "We typically reply within 1–2 business days."

This keeps the form human (warm language), luxurious (clear, uncluttered), and aligned with conversion goals (trust = more bookings).

### Files to edit
- `src/routes/index.tsx` — all changes above.

No new dependencies needed.