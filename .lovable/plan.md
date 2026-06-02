## Problem

The preview is rendering as unstyled HTML because `src/styles.css` fails to compile. Lightning CSS error:

> `@import rules must precede all rules aside from @charset and @layer statements`

Root cause: the Google Fonts `@import url("https://fonts.googleapis.com/...")` is placed *after* `@import "tw-animate-css"`. Tailwind v4 inlines `tw-animate-css`'s rules at that position, which pushes the Google Fonts `@import` after non-`@import` rules and violates the CSS spec.

No design, copy, or content changes — purely a CSS load-order fix.

## Fix

Move the Google Fonts `@import url(...)` line in `src/styles.css` to the **very first line of the file**, above `@import "tailwindcss"` and `@import "tw-animate-css"`. That keeps all `@import` rules contiguous at the top, satisfying Lightning CSS.

No other files change. After the edit, the stylesheet compiles, all Tailwind utilities + design tokens load again, and the site looks like itself.

## Verification

- Confirm dev server log no longer shows the Lightning CSS `@import` error.
- Confirm `/` returns 200 and the page renders with the Lumen purple/orange/pink palette and Syne/Outfit fonts.
