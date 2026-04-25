# Mirror Website — Build Plan

**Author:** Claude Code
**Date:** 2026-04-25
**Status:** Draft, awaiting confirmation before Phase 1
**Sources:** `docs/mirror-website-build-brief.md`, `docs/01-company-charter.md`, `docs/00-glossary.md`, `docs/02-brand-guide.md`

---

## 1. What I Understood

Mirror sells private AI clones of a company's highest-value customer segment. The site is a precision sales surface, not a content site. Its single job is to get a $5M-$200M founder or marketing exec to book a 20-minute Diagnostic Call within 90 seconds of landing.

The build is a four-to-five-page marketing site plus a working demo (`/`, `/demo`, `/method`, `/pricing`, `/book`, plus `/manifesto`, `/privacy`, `/terms`, custom 404). Tonight's goal: a production-ready v1 deployed to Vercel.

**The priority order for any decision** (from the brief): brand-guide.md, then charter.md, then the brief, then ask Richard. Brand guide wins ties.

**The thing this site must not look like:** a generic 2026 AI startup. No purple gradients. No Spline 3D. No Inter. No glassmorphism. No three-icon feature grids. No bouncy scroll cascades. No customer-logo carousels. Aesthetic reference is intelligence-grade software (Linear, Anthropic, Palantir, Bloomberg, Arc, Vercel) with one ounce of weirdness.

**The brand in one line:** an intelligence agency that hires designers from Berlin. Surveillance-grade minimalism with one moment of strangeness per surface. Slow animations (600-800ms), few of them, all respecting `prefers-reduced-motion`.

---

## 2. Locked Constraints (non-negotiable)

**Stack:** Next.js 14 App Router + TypeScript, Tailwind v4, Motion (not framer-motion), shadcn/ui primitives only (always restyled before use), Lucide icons (1.5px stroke), Cal.com embed, Plausible, Resend. No other libraries without asking.

**Colors:** Void `#0A0A0B`, Bone `#F4F2EE`, Smoke `#1A1A1D`, Ash `#6B6B70`, Signal `#00FF9D`. Warning `#FFB000`, Error `#FF3B30`. No purple, no pink, no pastels, no `#FFFFFF`, no `#000000`, no multi-color background gradients, no arbitrary Tailwind values like `bg-[#abc]`.

**Type:** Berkeley Mono (or JetBrains Mono fallback) for display. Geist for body. Self-hosted, preloaded, `font-display: swap`. Never Inter.

**Type scale (locked):** Display XL 72/0.95/-0.03em, Display L 56/1.0/-0.02em, H1 44/1.05/-0.02em, H2 32/1.1/-0.01em, H3 22/1.3/0, Eyebrow 12 (caps, 0.12em tracking), Body L 18/1.6, Body 16/1.6, Body S 14/1.5, Caption 12/1.4. No italics, no serif, no all-caps headlines.

**Spacing scale (locked):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192. Section rhythm: 128 desktop, 64 mobile. No arbitrary values.

**Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.

**Performance budget:** Lighthouse 90+, LCP < 2.5s on 4G, CLS < 0.05, total weight < 1.5MB on home, no render-blocking scripts.

**Accessibility:** WCAG AA, full keyboard nav, `prefers-reduced-motion` honoured everywhere, focus rings (Signal, 2px outline, 4px offset), real labels on inputs.

**Voice rules (from glossary):** No em dashes, ever. Use "Mirror/Recon, Mirror/Install, Mirror/Operate" in that exact order. Never "the Recon," "the build," "AI agent," "AI-powered," "leverage" as a verb, "synergy," "innovative," "cutting-edge." Numbers under ten written out except in pricing/stats/dates. Diagnostic Call (capitalized), never "discovery call."

---

## 3. Anti-Pattern Quarantine List (will check after every section ships)

From brand-guide §Anti-Patterns plus brief §1.2. After each section deploys to preview, screenshot desktop+mobile and verify *none* of these appear:

1. Purple/pink gradient backgrounds
2. Floating 3D blobs / Spline community objects
3. "AI brain" / neural-network iconography
4. Customer logo carousels (greyscale or otherwise)
5. "Trusted by" with vague logos
6. Animated number counters used decoratively (the demo's calibration counter is the only allowed exception)
7. Webflow-default scroll animations / cascading micro-interactions
8. Glassmorphism / frosted glass
9. Stock photos of people at laptops
10. The phrase "We use AI to"
11. Three-icon feature grid
12. Hero video of a fake dashboard
13. Stock-photo headshots in testimonials
14. "How it works" with three big icons
15. Inter
16. Pure white background (`#FFFFFF`)
17. Bouncing arrow CTAs
18. Cookie banners eating screen real estate
19. "Powered by AI" badges
20. A railway.com clone

If anything on this list appears, that section gets rebuilt before I move on.

---

## 4. Open Questions (blockers I want resolved before Phase 1 starts)

I need answers to these before, or during, Phase 1. They are blockers in roughly this priority:

**4.1 Reference doc filenames.** The brief references `/docs/charter.md`, `/docs/glossary.md`, `/docs/brand-guide.md`. The actual files are `01-company-charter.md`, `00-glossary.md`, `02-brand-guide.md`. **Recommendation:** keep the numbered names (they encode order) and update the brief + CLAUDE.md to point at the real filenames. Alternative: rename to match the brief.

**4.2 Worktree vs main repo.** The `docs/` folder lives in the main repo (`C:\Users\bitic\mirror-site\docs\`), not in this worktree. Either I work in the main repo, or I copy `docs/` into the worktree first. **Recommendation:** copy `docs/` into the worktree at the start of Phase 1 so the build is self-contained and CLAUDE.md's pointers resolve.

**4.3 Berkeley Mono license.** Brief §2.7 says JetBrains Mono is the v1 fallback if Berkeley Mono hasn't been purchased. **Recommendation:** ship v1 on JetBrains Mono. If you've bought Berkeley Mono, drop the woff2 files into `/public/fonts/berkeley-mono/` before Phase 1 step 3 and I'll wire it instead.

**4.4 Next.js version & "this is NOT the Next.js you know."** The repo `AGENTS.md` warns the Next install in `node_modules/next/dist/docs/` has breaking changes from training-data conventions. I will read those docs before writing any Next-specific code in Phase 1 (App Router routing, route handlers, font loading, image optimization, layout/transitions). **No recommendation needed, this is just a flag.**

**4.5 Cal.com event URL.** `/book` needs the real Cal.com event slug for the Diagnostic Call. **Recommendation:** create an env var `NEXT_PUBLIC_CAL_EVENT` (e.g. `richard/diagnostic-call`) and gate `/book` behind a placeholder until you provide it.

**4.6 Anthropic API key for `/demo`.** Server-side only, via `ANTHROPIC_API_KEY` in Vercel env. **Recommendation:** stub the API route to return a hard-coded streamed response in v1 if the key isn't ready, so the UI can ship and you can fill the prompts later.

**4.7 Demo brand name and prompts.** The brief uses `[DemoBrandName]` as a placeholder and says system prompt + 3-5 sub-persona prompts will be added later. **Recommendation:** scaffold `/lib/demo-mirror/prompts.ts` and `personas.ts` with typed empty exports plus 3 placeholder personas (LOYALIST, SKEPTIC, FORMER), and a generic placeholder system prompt that demonstrates the multi-persona voting structure. You replace later.

**4.8 Demo logging store.** Brief §5.6 says Vercel KV *or* Supabase. **Recommendation:** Vercel KV. Same vendor as hosting, free tier covers v1 traffic, no extra account.

**4.9 Plausible site domain.** I need the production domain to embed the script with the right `data-domain`. **Recommendation:** use `mirror.com` (or whatever domain you've registered) as a placeholder, gated behind `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.

**4.10 Resend at launch.** Brief §1.3 says "signup confirmations only at launch." There are no signup forms in the v1 IA except the Cal.com embed (which sends its own confirmations). **Recommendation:** install the Resend SDK and add an `/api/email/route.ts` stub but do not wire any sending paths in v1. Confirm.

**4.11 Manifesto scope tonight.** Brief §9 says placeholder is acceptable. **Recommendation:** ship the placeholder (`MANIFESTO` eyebrow, "Coming soon." headline, link home), defer real content to v1.1.

**4.12 Visible founder names.** Charter §"Open Questions" item 2 says "Richard primary, Raj supporting, currently yes." **Recommendation:** include both in the manifesto placeholder when it has real content, but neither name appears in v1 marketing copy from the brief, so no action tonight.

**4.13 Production domain & SSL.** Brief Phase 9 connects production domain. **Recommendation:** confirm the domain when we get to Phase 9. Until then, ship to the default `*.vercel.app` URL.

I will pause and ask if any of the recommendations above feel wrong. Otherwise I proceed with them.

---

## 5. Build Sequence (echoing brief §14, with my specific actions)

Each phase ends in a deploy + your sign-off before the next phase starts. Bold items below are explicit "stop and show Richard" moments from the brief.

### Phase 1 — Foundation
- Verify the existing scaffold (`app/`, `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`) and read `node_modules/next/dist/docs/` for any conventions that diverge from training data.
- Copy `/docs/` into the worktree if we agree on §4.2.
- Install: `motion`, `lucide-react`, `@calcom/embed-react`, `resend`, `plausible-tracker`, shadcn CLI deps. Confirm Tailwind v4 is wired (it ships with Next 14 + Tailwind v4 differently than v3 — `@theme` in CSS, not `tailwind.config.ts`).
- Drop self-hosted JetBrains Mono + Geist into `/public/fonts/`. Wire via `next/font/local`. Preload the most-used weights.
- Build `/app/globals.css` with: CSS variables for all brand tokens, `@theme` block, base resets, `body { background: Void }`, the grain SVG fixed-position overlay at 2-3% opacity, `prefers-reduced-motion` media-query overrides.
- Build `/lib/design.ts` exporting tokens as TS constants (colors, spacing scale, type scale, easing, durations).
- Replace the placeholder root `CLAUDE.md` with: anti-patterns list (the 20 from §3 above), pointers to `/docs/`, the hard rules (no purple, no Inter, no gradients, no em dashes, slow animations only), and the visual references (linear.app, anthropic.com, palantir.com, vercel.com — read structure, never copy).
- Connect the repo to Vercel and deploy a "Hello Mirror" placeholder using the real fonts and Void background, so we can verify rendering.

**Stop. Show: `lib/design.ts`, `app/globals.css`, the deployed placeholder URL. Confirm fonts and colors render correctly before I build anything else.**

### Phase 2 — UI primitives
- Install shadcn primitives: button, card, accordion, dialog, input.
- Restyle each in `/components/ui/` to brand spec (Primary/Secondary/Ghost button variants per brand-guide §Components, sharp corners, no shadows, Smoke cards with 1px Ash 30% borders, transparent inputs with bottom-only Ash border + Signal underline on focus, Accordion with `+` rotating to `×` over 400ms).
- Add `Container` and `Section` utility components (max-width 1280, the spacing scale, the section rhythm).
- Build `/dev` route showing every primitive in default/hover/focus/disabled/active states. This is the QA reference for the rest of the build.

**Stop. Show: `/dev` route. Approve primitives.**

### Phase 3 — Layout shell
- `components/layout/nav.tsx` (desktop 64px + mobile 56px hamburger overlay, Berkeley Mono 12px caps, sticky behaviour with the 200ms scrolled-state transition).
- `components/layout/footer.tsx` (single row desktop, stacked mobile, the "MIRROR/M1 ONLINE" Signal pulse on the right).
- `components/layout/page-transition.tsx` (200ms fade-out, route change, 200ms fade-in via Motion + App Router).
- Wire into `/app/layout.tsx`. Verify on two placeholder pages.

**Stop. Test mobile. Approve.**

### Phase 4 — Homepage
The make-or-break work. Built in two halves with a checkpoint between.

**Half A — the hero:**
- `components/hero/particle-field.tsx` — canvas, 80-120 particles desktop / 40 mobile, 2px Signal dots, drift 0.2-0.4 px/frame, lines under 80px distance scaled-opacity Signal at max 30%, cursor as repelling particle within 120px on desktop only, 60% Void overlay between canvas and type, 30fps cap desktop / 24fps mobile, static field for `prefers-reduced-motion`.
- `components/hero/headline.tsx` — character-by-character entrance, 30ms stagger, total 1200ms.
- `components/hero/custom-cursor.tsx` — homepage hero only, 12px Signal outline circle, 200ms ease-out trail, expands to 24px filled at 30% on hover over interactive elements, disabled on touch + `prefers-reduced-motion`.
- `components/home/hero-section.tsx` wiring it all together with the locked copy from brief §4.2.2.
- Test desktop, mobile, reduced-motion.

**Stop. Show the hero. Brief calls this "the make-or-break section."**

**Half B — the rest of the homepage, in order:**
- 4.3 Proof section (Smoke bg, 60/40 split desktop, faux chat preview with 12s loop and Signal pulse).
- 4.4 What Mirror Is (centered headline, 760px max width, three short paragraphs, no icons, no columns).
- 4.5 Who It's For (50/50 split, headline + 5-item Lucide-check list).
- 4.6 Tiers Preview (three Smoke cards, "MOST CHOSEN" eyebrow on Mirror/Install, locked content from §4.6.3).
- 4.7 Methodology Preview (four-stage horizontal timeline desktop, vertical mobile, dotted Ash connector with the 8s Signal-dot animation looping).
- 4.8 FAQ (Accordion, 8 locked items from §4.8.2).
- 4.9 Final CTA (192px vertical padding, oversized Display XL 3-line headline character-animated, oversized button).
- Wire into `/app/page.tsx` with the locked 128/64 spacing.

**Stop. Deploy. Screenshot desktop + mobile. Run §3 anti-pattern checklist. Fix before continuing.**

### Phase 5 — `/demo`
- Page layout with minimal 48px top bar (Mirror wordmark + status indicator with the 1,243-data-points counter animating up over 30s on first visit then static, "BOOK A CALL" small primary button).
- Suggested-questions sidebar (280px desktop, 6 ghost buttons with Signal-on-hover border, the placeholder caption).
- Chat interface (right-aligned Smoke user messages, left-aligned Mirror messages with Berkeley Mono, sub-persona eyebrow above each Mirror response, "3 OF 5 PERSONAS AGREE" voting indicator fading in after the response, "[ + SHOW REASONING ]" toggle).
- Sticky input bar with thinking indicator + "MIRROR IS THINKING" caption.
- `/app/api/mirror/route.ts` — Anthropic streaming via SSE, configurable system prompt + 3-5 sub-persona prompts.
- `/lib/demo-mirror/prompts.ts` and `personas.ts` with placeholder content per §4.7.
- Rate limiting via localStorage (10 cap, soft prompt at 5, hard block at 10).
- Vercel KV logging (timestamp, question, response, anonymous session id).
- Empty state with the pulsing thinking dot.

**Stop. Have Richard try the demo. Iterate before locking.**

### Phase 6 — `/pricing`, `/method`, `/book`
- `/pricing` — three full tier cards (Recon, Install, Operate) with What's Included / What's Not / Best For / Guarantee / `START [TIER]` button passing `?tier=` to `/book`. Comparison table with locked rows from §6.4. Pricing-FAQ Accordion with 5-6 items (placeholder answers with TODO comments for Richard).
- `/method` — four detailed stages (Ingest / Calibrate / Install / Operate, locked content from §7.4) with the Signal-dot dropping down the dotted Ash connector between stages.
- `/book` — Cal.com inline embed with brand theme overrides, "WHAT TO EXPECT" 4-item numbered list below.

**Stop. Cross-link from homepage. Verify routing and transitions.**

### Phase 7 — Legal & edge
- `/privacy` and `/terms` with generated content (Termly or similar) styled to brand.
- `/manifesto` placeholder ("Coming soon.").
- `not-found.tsx` (404) with the locked copy and the lower-density 40-particle field.
- OG images, favicon, meta tags per route.
- `sitemap.xml`, `robots.txt`.

### Phase 8 — QA
- Lighthouse audit each page, fix anything below 90.
- `prefers-reduced-motion` test on every page.
- Keyboard-nav every interactive element.
- Real-device test: iOS Safari, Android Chrome.
- End-to-end Cal.com booking (book a real test slot, cancel).
- 10 different prompt types against the demo Mirror.
- Verify all internal/external link targets.

### Phase 9 — Launch prep
- Connect production domain, verify SSL, set up www→apex and http→https.
- Plausible live with real domain.
- Resend domain verification (even if no sends in v1).
- Final Lighthouse pass on production URL.
- Hand back to Richard for final approval.

---

## 6. Decisions I Will Make Without Asking

Per brief §15, within brand constraints:
- Tailwind class arrangements
- Component file naming inside `/components/`
- TS variable / type / interface names
- Animation timing within stated ranges (e.g. 600-800ms)
- Particle counts within stated ranges (80-120 desktop, 40 mobile)
- Spacing within the locked scale
- Whether to extract a sub-component
- Internal API route structure for the demo
- Server vs Client Components (default to Server unless interactivity needed)

## 7. Decisions I Will *Not* Make Without Asking

Per brief §16:
- New libraries
- Color, font, spacing, copy changes from locked values
- Build sequence deviations
- New sections / pages / features
- Removal of any locked section / page / feature
- Visual reference substitutions
- Any anti-pattern, "just for this one case"

---

## 8. Risks I'm Watching

- **Tailwind v4 + shadcn/ui compatibility.** v4's CSS-first config and `@theme` block changes how shadcn defaults are themed. I'll verify on the `/dev` route in Phase 2 before building any pages.
- **Berkeley Mono fallback feel.** JetBrains Mono is wider and slightly less editorial than Berkeley Mono. The Display XL hero may feel different. Reviewable at the Phase 1 stop.
- **Particle field performance budget.** Brief caps CPU under 5% at 30fps. If we miss, mobile drops to 24fps + 40 particles, and worst case the field becomes static on low-end devices via a `navigator.hardwareConcurrency` heuristic.
- **`/demo` cost.** Anthropic API cost per visitor with a 10-message cap and no auth could be exploited. The 10/session localStorage cap is bypassable by clearing storage. Phase 5 should add a short-lived cookie + IP rate limit on the route handler. Flagging as a v1.1 hardening item, not a launch blocker.
- **Cal.com theming limits.** The embed accepts color overrides but not full custom typography. The `/book` page may have a typography seam between our Berkeley/Geist and Cal.com's defaults. I'll mitigate with generous spacing around the embed.
- **`AGENTS.md` warning about Next.js conventions diverging from training data.** I will read `node_modules/next/dist/docs/` in Phase 1 step 1 before writing any `app/` routing, route handlers, font loading, or transitions. If a brief instruction conflicts with the actual Next docs in this repo, the Next docs win and I'll surface the conflict.

---

## 9. What I'd Like You To Confirm Before Phase 1

Reading the questions in §4 and the recommendations there, please reply with any of:
- "Proceed with all recommendations" (fastest)
- Specific overrides ("4.3: Berkeley Mono is bought, here's the woff2", "4.5: Cal.com slug is X", etc.)
- "Stop, I want to discuss N first"

I will not start Phase 1 until you confirm.
