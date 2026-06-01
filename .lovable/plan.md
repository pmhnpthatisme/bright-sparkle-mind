## Plan: Booking router, working contact form, copy + design polish

### A. Copy & content edits (`src/routes/index.tsx`)

1. **Flexible Support card** — replace fairy garden / trap house lines with three fresh, on-brand humorous examples (dry-witty default):
   > "Meet from your parked car, the corner of the closet that gets the best Wi-Fi, or wherever your nervous system is willing to sit still for 50 minutes."

2. **Move practice intro into Meet Your Provider.** Pull the "serving patients in Washington and Tennessee… full-lifespan…" paragraph out of the upper section and place it as the lead-in to the provider bio. Replace the upper section's intro with a tighter, more emotional one-liner so the page still flows.

3. **Meet Your Provider — replace "Bring whatever you're carrying"** (duplicated language) with:
   > "Whatever brought you here today is welcome — we'll work through it at your pace, not anyone else's."

4. **Contact section crisis line** — remove the duplicated 911/988 sentence (still acknowledged via the required checkbox and the top-of-page banner). Replace with a softer redirect + a *new* resource:
   > "This form isn't monitored in real time. If you need to speak with someone right now, the **Crisis Text Line** is available 24/7 — text **HOME to 741741** — or call/text **988**."

5. **Bottom footer** — remove the "we do not provide emergency care" line per request.

6. **Phone number** — replace every instance of `615-588-4249` with `360-637-2104` (display `(360) 637-2104`, `tel:+13606372104`). Update the bottom "Book Now" CTA helper line that currently shows the phone to read **"Text 360-637-2104"** as previously requested.

### B. Hours of operation update

Replace current week with:
- Monday — By appointment only
- Tuesday — By appointment only
- Wednesday — By appointment only
- Thursday — 8:00 AM – 8:00 PM CT
- Friday — 8:00 AM – 8:00 PM CT
- Saturday — 8:00 AM – 8:00 PM CT
- Sunday — Closed

Keep the existing "All hours listed in Central Time…" note.

### C. Booking router (new shared component)

Create `src/components/BookingDialog.tsx` — a styled dialog (shadcn `Dialog`, royal/lavender theme, same rounded card aesthetic) that opens whenever the patient clicks any of:
- "Book Now" (hero + bottom CTA)
- "Get Started"
- "Don't see it? Reach out anyway"
- The new **clickable Step 1 ("Reach out & book")** and **Step 2 ("Complete your packet")** cards in *How It Works*

The dialog shows three large, idiot-proof cards stacked vertically (one-tap on mobile), each with an icon, short label, and one-line plain-English description:

| Card | Label | Subtext |
|---|---|---|
| 1 | **Self-Pay** | "Book and complete intake directly through our secure patient portal." → opens TherapyNotes patient portal in new tab |
| 2 | **Insurance (in-network direct)** | "Verify benefits and schedule." → opens insurance intake URL |
| 3 | **Headway** | "Use your insurance through Headway's scheduling platform." → opens Headway provider page |

Because you didn't share the exact URLs, the file will define them at the top as clearly-marked constants (`SELFPAY_URL`, `INSURANCE_URL`, `HEADWAY_URL`) with placeholder TherapyNotes/Headway URLs and a `TODO: replace with your portal links` comment. You can paste your real links into that one file and every button updates.

Each link opens in a new tab with `rel="noopener noreferrer"`. TherapyNotes' patient portal flow is HIPAA-compliant by default, so directing patients there satisfies the HIPAA requirement without our site handling PHI.

### D. Working contact-form email delivery

Static sites can't send email, so this requires a small backend. Defaulting to **Lovable Cloud + Resend** (most reliable; submissions emailed to `lumentelepsych@gmail.com`; also stored in a `contact_submissions` table for backup).

Steps:
1. Enable Lovable Cloud.
2. Connect Resend connector.
3. Create `contact_submissions` table (name, email, phone, message, consents, created_at) + RLS (insert-only for anon; select for service role).
4. Public server route `src/routes/api/public/contact.ts`:
   - Zod-validates input (length limits, email/phone format, all 3 consent booleans required).
   - Simple in-memory rate-limit (5/min per IP).
   - Inserts row via service-role client.
   - Sends email to `lumentelepsych@gmail.com` via Resend gateway with formatted patient details + a `reply-to` set to the patient's email so you can reply directly.
5. Update the contact form `handleContactSubmit` to `POST` to `/api/public/contact` and show success/error toast.

### E. "Send a Message" visual treatment

Wrap the contact form card in a royal-purple border (`border-2 border-lumen-royal`) on a soft `bg-lumen-purple/5` background, matching the wrapped-color pattern used on the other sections.

### F. Make How It Works steps actionable

- Step 1 card → button "Reach out & book" → opens `BookingDialog`
- Step 2 card → button "Start your intake packet" → opens `BookingDialog`
- Steps 3 & 4 remain visual only (already non-interactive in user flow)
- Keep existing border-color theming intact (purple/orange/teal/pink wraps).

### Files touched
- `src/routes/index.tsx` — all copy edits, phone update, hours, contact-form wiring, Step 1/2 buttons, "Send a Message" wrapper.
- `src/components/BookingDialog.tsx` — new shared dialog.
- `src/lib/contact.ts` — small client helper for the POST.
- `src/routes/api/public/contact.ts` — new server route.
- Migration: `contact_submissions` table + RLS + grants.

### Things you'll want to give me after approval
- The three real booking URLs (Self-pay TherapyNotes portal, Insurance intake, Headway profile) — I'll wire them into one file in seconds.
- (Resend free-tier API key will be requested at the moment we need it.)
