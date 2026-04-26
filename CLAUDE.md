# CLAUDE.md: instructions for any Claude Code session in this repo

You are working on **Mirror's marketing site, v2**. Mirror is a **private decision engine for marketing teams**. Pre-test creative, brief teams, ship campaigns with measurable confidence. v1 sold "a private AI clone of your customer" and that framing is dead. The current rebuild repositions everything around the Decision Engine.

The v2 rebuild is a 13-phase sequence executed one phase per session with `/clear` between phases. Read these before every meaningful decision, in this order:

1. `/docs/mirror-rebuild-brief-v2.md`: the v2 constitution. Wins every conflict.
2. `/docs/02-brand-guide.md`: visual + verbal rules.
3. `/docs/01-company-charter.md`: positioning, ICP, offers.
4. `/docs/00-glossary.md`: locked terminology.
5. `/PLAN.md`: current build plan, phase status, open questions.

Two more if relevant to the current phase:

6. `/docs/mirror-website-build-brief.md`: the v1 brief, superseded but historically useful.
7. `/docs/mirror-liquiddeath-demo-build.md`: the public-demo brand spec when it lands; replaces the placeholder personas in `/lib/demo-mirror/`.

When `/AGENTS.md` exists, follow it before writing any Next-specific code (it warns the local Next.js install diverges from training-data conventions).

---

## The four locked outcomes (the load-bearing claims of v2)

Every Mirror engagement now promises four measurable outcomes. They appear on the homepage, the pricing page, every proposal, every sales call.

1. **Faster Decisions.** Average customer-related decision compressed from 3-7 days to under 30 minutes.
2. **Cheaper Tests.** 30-50% reduction in wasted ad creative spend through Pre-Testing.
3. **Sharper Briefs.** 40%+ reduction in campaign rework cycles.
4. **Compounding Asset.** +18% accuracy improvement on held-out scenarios after 90 days of use.

The Outcomes section ships in v2 Phase 12 with the honest footnote: `TARGETS ENGINEERED INTO MIRROR'S METHODOLOGY. ACTUAL RESULTS REPORTED PER ENGAGEMENT STARTING Q3 2026.`

---

## Hard rules: absolute, no exceptions

### Voice

- **Lead with decisions, not personas.** Hero, every section header, every CTA: frame the value as "make better customer decisions," never "talk to a clone of your customer."
- **Specific over abstract.** "Predict campaign performance within 15% accuracy" beats "get insight into your customer." Numbers wherever possible.
- **The CFO test.** Every paragraph should pass: would a skeptical CFO read this and think "yes, that's a real number / outcome / cost saved"? If no, rewrite.
- **The verb test.** Every section should make the buyer think "I could do X with this." Verbs over nouns.
- **No em dashes, ever.** Use periods, commas, or colons. Locked at the company level.
- **No italics anywhere.** Use weight or color for emphasis.

### The nine forbidden phrases

The original five (locked since v1):
1. "AI-powered"
2. "Revolutionize"
3. "Game-changer"
4. "Unlock"
5. "Leverage" as a verb

Plus four added for v2 (collapse the Decision Engine repositioning back into v1 metaphor or industry jargon):

6. "Clone of your customer"
7. "Talk to your customer"
8. "Voice of customer"
9. "Customer insights"

If your output during a phase contains any of these, the output is wrong.

### Visual + design

- **No purple, no pink, no pastels.** No multi-color background gradients. The most common AI-startup signature is a purple/blue/pink gradient hero. Never ship one.
- **No Inter.** Display is JetBrains Mono (until Berkeley Mono is purchased). Body is Geist. Never Roboto, Space Grotesk, IBM Plex, Fira Code, Helvetica.
- **No `#FFFFFF` and no `#000000`.** Always Bone (`#F4F2EE`) and Void (`#0A0A0B`).
- **No arbitrary Tailwind colors.** Always `bg-void`, `text-bone`, `text-signal`, `border-ash`, etc. Never `bg-[#0a0a0b]`. Tokens come from `lib/design.ts` and the `@theme` block in `app/globals.css`.
- **No arbitrary spacing.** The locked scale is `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192`. Section rhythm is 128 desktop, 64 mobile.
- **Slow animations only.** 600 to 800ms entrances, 300 to 400ms hovers. Easing locked to `cubic-bezier(0.16, 1, 0.3, 1)` (CSS var `--ease-mirror`).
- **Respect `prefers-reduced-motion` everywhere.** The base reset in `globals.css` enforces this.
- **Radix primitives only, restyled in `/components/ui/`.** Default Radix or shadcn cosmetics never reach a page.
- **One hero moment per page.** Not three.

---

## Anti-pattern quarantine list

After every phase, screenshot desktop and mobile and verify **none** are present. If any appear, the phase is not done:

1. Purple-to-pink gradient hero backgrounds
2. Floating 3D blobs as decoration / Spline community objects
3. Generic "AI brain" or "neural network" iconography
4. Customer-logo carousels with greyscale filter
5. "Trusted by" rows with vague logos
6. Animated number counters used decoratively
7. Webflow-default cascading scroll animations
8. Glassmorphism / frosted-glass cards
9. Stock photos of people at laptops, headsets, smiling teams
10. The phrase "We use AI to" or "AI-powered" anywhere
11. Three-column "Features" grid with icons + paragraphs
12. Hero video of an unreadable abstract dashboard
13. Stock-photo headshots in testimonials
14. "How it works" with three big numbered icons
15. Inter font for any reason
16. Pure white backgrounds (`#FFFFFF`)
17. Bouncing "scroll down!" arrow CTAs
18. Cookie banners eating screen real estate
19. "Powered by AI" badges
20. railway.com layout clones

Plus four v2-specific drift risks (per /docs/mirror-rebuild-brief-v2.md §11):

21. "Clone of your customer" language sneaking back in
22. Soft, unfalsifiable claims replacing the four locked outcomes
23. Sectional headers leading with the product instead of the buyer's outcome
24. Decoration that doesn't earn its space

---

## Voice rules (in addition to the nine forbidden phrases)

- Confident. Cold. Brief. Slightly cryptic. Senior intelligence officer writing a briefing, not a startup founder writing a pitch.
- Short sentences. Then occasionally a longer one that explains the consequence. Then short again.
- Headlines are statements, not questions. They make a claim, then dare you to disagree.
- Always: "Mirror/Recon, Mirror/Install, Mirror/Operate" in that exact order. Never "the Recon", "the build", "AI agent", "synergy", "innovative", "cutting-edge", "best-in-class".
- "Diagnostic Call" capitalized. Never "discovery call".
- Numbers under ten written out, ten and above as numerals, except in pricing, statistics, and dates where numerals always.

---

## Visual references

Read for **rhythm, density, confidence**. Never copy specific layouts or components:

- linear.app (pacing, density)
- anthropic.com (editorial copy in layout)
- palantir.com (density and negative space)
- vercel.com (typography discipline)

Bloomberg Terminal and Arc Browser are aesthetic references, not visual templates.

---

## Tech stack (locked, do not add libs without asking)

- Next.js 16 (App Router) plus TypeScript plus React 19.2
- Tailwind v4 via `@tailwindcss/postcss`. Token system in `app/globals.css` `@theme` block.
- Motion (`motion`, formerly framer-motion) for all animations.
- Radix primitives (accordion, dialog, slot) wrapped in branded components in `/components/ui/`. The brand guide refers to these as "shadcn primitives"; we install Radix directly because we override every default style.
- Lucide for icons (1.5px stroke weight only).
- `geist` (Vercel) for body font, `next/font/google` for JetBrains Mono.
- `@calcom/embed-react` for booking.
- `@anthropic-ai/sdk` for the chat demo and Pre-Test.
- `@react-pdf/renderer` for Pre-Test export-as-brief (approved for Phase 11; install when Phase 11 begins).
- `resend` for transactional email.
- Plausible for analytics (script tag in layout, no cookie banner).

Do not add framer-motion separately. Do not add a UI kit beyond Radix. Do not add Storybook. Do not add a CMS.

---

## v2 Phase execution rules

- **Phase 1 only: Opus. Phases 2 to 13: Sonnet.**
- **One phase per session.** Do not chain phases inside one Claude Code session.
- **`/clear` between phases.** Each phase starts fresh, reads only the docs it needs, executes only its scope.
- **Watch the context indicator.** Cross 60% mid-phase, run `/compact`. Cross 80%, stop and report.
- **Do not paste large files into messages.** Reference paths.
- **At phase start, state:** `Executing Phase N. Files in scope: [list]. Files NOT in scope: implicit, everything else. Estimated tokens: [number]. Beginning.`
- **At phase end:** clean build, commit (no em dashes, no AI signatures, no hyphens that should be colons), push, summarize, state `Phase N complete. Stopping. Run /clear before starting Phase N+1.`

---

## Conventions specific to this Next.js install

This repo runs Next 16, not Next 14. Read `/AGENTS.md` and `node_modules/next/dist/docs/` before writing Next-specific code.

- `params` and `searchParams` are `Promise<...>` and must be `await`ed.
- `PageProps<'/path'>` and `LayoutProps<'/path'>` are global type helpers; no imports needed.
- Turbopack is the default for `next dev` and `next build`.
- `cookies()`, `headers()`, `draftMode()` are async.
- Next 16 no longer overrides `scroll-behavior: smooth` during route transitions.
- Use `images.remotePatterns`. The `images.domains` config is deprecated.
- `middleware.ts` is now `proxy.ts`, named export `proxy` (not relevant in v2).

---

## Decisions you may make without asking (inside the current phase's scope)

- Tailwind class arrangements; component file names within `/components/`
- TS variable / type / interface names
- Animation timing within stated ranges (600 to 800ms)
- Spacing within the locked scale
- Whether to extract a sub-component
- Server vs Client Components (default to Server unless interactivity is needed)
- Internal API route structure for the demo or Pre-Test

## Decisions you must ask before doing

- Adding any library not listed above
- Changing any locked color, font, or spacing value
- Modifying any locked copy in /docs/mirror-rebuild-brief-v2.md
- Touching files outside the current phase's stated scope
- Deviating from the v2 phase order
- Adding features, sections, or pages not in the v2 brief
- Removing v1 features or content not explicitly marked for removal in a phase
- Anything requiring a paid service signup (API keys aside)

---

## Standing reminders before any phase

Before executing any phase, re-read:

1. The repositioning thesis (`/docs/mirror-rebuild-brief-v2.md` §1)
2. The four locked outcomes (`/docs/mirror-rebuild-brief-v2.md` §2)
3. The nine forbidden phrases (above; mirrors brand guide §Forbidden Phrases)

If your output contradicts any of these, the output is wrong.
