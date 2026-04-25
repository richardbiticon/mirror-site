# CLAUDE.md — instructions for any Claude Code session in this repo

You are working on **Mirror's marketing site**. This is a sales surface, not a content site. The build constitution is in `/docs/`. Read these before every meaningful decision, in this order:

1. `/docs/02-brand-guide.md` — visual + verbal constitution. Wins ties.
2. `/docs/01-company-charter.md` — positioning, ICP, offers, voice.
3. `/docs/00-glossary.md` — locked terminology.
4. `/docs/mirror-website-build-brief.md` — full build brief and section specs.
5. `/PLAN.md` — current build plan.

Follow `AGENTS.md` (Next.js version notice) before writing any Next-specific code.

---

## Hard rules — absolute, no exceptions

- **No purple, no pink, no pastels.** No multi-color background gradients of any kind. The most common AI-startup signature is a purple/blue/pink gradient hero — we never ship one.
- **No Inter.** Display is JetBrains Mono (until Berkeley Mono is purchased). Body is Geist. Never Roboto, Space Grotesk, IBM Plex, Fira Code, Helvetica.
- **No `#FFFFFF` and no `#000000`.** Always Bone (`#F4F2EE`) and Void (`#0A0A0B`). White and black are anti-patterns.
- **No arbitrary Tailwind colors.** Always `bg-void`, `text-bone`, `text-signal`, `border-ash`, etc. Never `bg-[#0a0a0b]`. Tokens come from `lib/design.ts` and the `@theme` block in `app/globals.css`.
- **No arbitrary spacing.** The locked scale is `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192`. Tailwind defaults align. Section rhythm is 128 desktop, 64 mobile.
- **Slow animations only.** 600–800ms for entrances, 300–400ms for hovers. Easing is locked to `cubic-bezier(0.16, 1, 0.3, 1)` (CSS var `--ease-mirror`).
- **Respect `prefers-reduced-motion` everywhere.** Replace motion with instant transitions when the user has set it. The base reset in `globals.css` enforces this; do not bypass it.
- **No em dashes, ever.** Use periods, commas, or colons. This is locked at the company level (charter §What's Locked, glossary §Writing Conventions).
- **No italics anywhere.** Use weight or color for emphasis instead. The base reset normalizes `em`, `i`, `cite`, `address` to `font-style: normal`.
- **shadcn primitives are imported headlessly only.** Every primitive is restyled in `/components/ui/` to brand spec before use. Default shadcn styling never reaches a page.
- **One hero moment per page.** Not three. The brand guide §Hero Moment names which one per page.

---

## Anti-pattern quarantine list

After every section ships, screenshot desktop + mobile and verify **none** of these are present. If any appear, the section is wrong and gets rebuilt:

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
18. Cookie banners that take up half the screen
19. "Powered by AI" badges
20. railway.com layout clones (every AI startup is doing this)

This list comes from `/docs/02-brand-guide.md §Anti-Patterns` and the build brief §1.2. It is not exhaustive — if something feels generic-AI-startup, it probably is.

---

## Voice rules

- Confident. Cold. Brief. Slightly cryptic. Senior intelligence officer writing a briefing, not a startup founder writing a pitch.
- Short sentences. Then occasionally a longer one that explains the consequence. Then short again.
- Headlines are statements, not questions. They make a claim, then dare you to disagree.
- Five forbidden phrases: "AI-powered", "Revolutionize", "Game-changer", "Unlock", "Leverage" as a verb.
- Always: "Mirror/Recon, Mirror/Install, Mirror/Operate" in that exact order. Never "the Recon", "the build", "AI agent", "synergy", "innovative", "cutting-edge", "best-in-class".
- "Diagnostic Call" capitalized. Never "discovery call".
- Numbers under ten written out, ten and above as numerals — except in pricing, statistics, and dates where numerals always.

---

## Visual references

Read for **rhythm, density, confidence** — never copy specific layouts or components:

- linear.app (pacing, density)
- anthropic.com (editorial copy in layout)
- palantir.com (density + negative space)
- vercel.com (typography discipline)

Bloomberg Terminal and Arc Browser are aesthetic references, not visual templates.

---

## Tech stack (locked, do not add libs without asking)

- Next.js 16 (App Router) + TypeScript + React 19.2
- Tailwind v4 via `@tailwindcss/postcss` — token system in `app/globals.css` `@theme` block
- Motion (`motion`, formerly framer-motion) for all animations
- shadcn/ui primitives (Dialog, Accordion, Tabs) — restyled before use
- Lucide for icons (1.5px stroke weight only)
- `geist` (Vercel) for body font, `next/font/google` for JetBrains Mono
- `@calcom/embed-react` for booking
- `@anthropic-ai/sdk` for the demo
- `resend` for transactional email (signup confirmations only at launch)
- Plausible for analytics (script tag in layout, no cookie banner needed)

Do not add framer-motion separately. Do not add a UI kit beyond shadcn. Do not add Storybook. Do not add a CMS.

---

## Conventions specific to this Next.js install

This repo runs Next 16, not Next 14. Read `/AGENTS.md` and the local docs in `node_modules/next/dist/docs/` before writing Next-specific code. Notable Next 16 differences from training-data assumptions:

- `params` and `searchParams` are `Promise<...>` and must be `await`ed.
- `PageProps<'/path'>` and `LayoutProps<'/path'>` are global type helpers — no imports needed.
- Turbopack is the default for `next dev` and `next build`.
- `cookies()`, `headers()`, `draftMode()` are async.
- Next 16 no longer overrides `scroll-behavior: smooth` during route transitions, so anchor smooth-scroll just works.
- Use `images.remotePatterns` (not `images.domains` — deprecated).
- `middleware.ts` is now `proxy.ts`, named export `proxy` (not relevant in v1).

---

## Decisions you may make without asking

- Tailwind class arrangements; component file names within `/components/`
- TS variable / type / interface names
- Animation timing within stated ranges (600–800ms)
- Particle counts within stated ranges (80–120 desktop, 40 mobile)
- Spacing within the locked scale
- Whether to extract a sub-component
- Internal API route structure for the demo
- Server vs Client Components (default to Server unless interactivity is needed)

## Decisions you must ask before doing

- Adding any library not listed above
- Changing any locked color, font, or spacing value
- Modifying any locked copy from the brief
- Adding a section, page, or feature not in the brief
- Removing any locked section or page
- Substituting any of the visual references
- Using anything from the anti-pattern list, even "just for this one case"
