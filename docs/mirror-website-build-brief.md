# Mirror Website — Full Build Brief for Claude Code

**Project:** mirror-site (or whatever the repo is named)
**Owner:** Richard
**Build target:** Production-ready v1, deployed to Vercel, by end of session
**Reference docs:** /docs/01-company-charter.md, /docs/00-glossary.md, /docs/02-brand-guide.md

---

## How To Use This Document

This is the complete brief. Read it top to bottom before writing a single line of code. The build sequence at the end of this document is the order of operations. Do not skip ahead.

After reading this, your first action is to read the three reference docs in /docs/. Then create a build plan as a comment in `/PLAN.md` summarizing what you understood, and ask me to confirm before building.

When you are uncertain about a decision, the priority order for resolving it is: brand-guide.md, then charter.md, then this document, then ask the user. Never invent a brand or visual decision. Never use defaults from any framework or library without explicitly checking against the brand guide.

---

## Section 1 — Project Context and Constraints

### 1.1 What we are building

A four-to-five-page marketing website for Mirror, an AI company that builds private AI clones of a company's highest-value customer segments. The site's job is to make a $5M-$50M company founder or marketing executive book a 20-minute Diagnostic Call within 90 seconds of landing.

The site is not a content site. Not a blog. Not a documentation site. It is a precision sales surface. Every section either advances the booking goal or gets cut.

### 1.2 What this site is competing against

This site lives in a category where every other site looks identical right now. Generic AI startup sites in 2026 share the following signatures: purple-blue gradient hero backgrounds, Spline 3D objects in the hero, Inter typography, glassmorphism cards, three-column "Features" grids with icons, customer logo carousels with greyscale filter, animated number counters, and bouncy scroll-triggered cascades. Mirror's site must look nothing like this. If at any point in the build you produce something that resembles a generic AI startup site, you have failed and must restart that section.

The aesthetic reference is not other AI startups. It is intelligence-grade software interfaces: Linear, Anthropic, Palantir, Vercel, Bloomberg Terminal, Arc Browser. Cold. Editorial. Confident. Spare.

### 1.3 Tech stack (locked)

- Next.js 14 with App Router and TypeScript
- Tailwind CSS v4 with custom config matching brand tokens
- Motion (formerly Framer Motion) for all animations
- shadcn/ui ONLY for unstyled primitive logic (Dialog, Accordion, Tabs). Every primitive must be restyled to brand spec before use. Default shadcn styling is forbidden.
- Lucide for icons (1.5px stroke weight only)
- Cal.com embed for the booking widget
- Plausible for analytics (snippet only, no cookie banner needed)
- Resend for transactional email (signup confirmations only at launch)
- Deployed to Vercel, custom domain connected, SSL active

Do not add any other libraries without checking with me first. Specifically: do not add framer-motion separately (use Motion), do not add any animation library beyond Motion, do not add a UI kit beyond shadcn/ui, do not add Storybook, do not add a CMS.

### 1.4 Performance budget

- Lighthouse Performance: 90+ on mobile and desktop
- Largest Contentful Paint: under 2.5s on 4G
- Cumulative Layout Shift: under 0.05
- Total page weight: under 1.5MB on the homepage
- No render-blocking scripts
- Fonts: self-hosted, preloaded, font-display: swap
- All images: next/image with proper sizes, AVIF/WebP

If a fancy animation or 3D element pushes the page past these budgets, the animation gets simplified or cut. Performance is not optional.

### 1.5 Accessibility requirements

- WCAG AA color contrast minimum (verify the Bone-on-Void combination meets this)
- All interactive elements keyboard-navigable
- All animations respect `prefers-reduced-motion` (replace motion with instant transitions)
- All images have meaningful alt text
- Form inputs have visible labels
- Focus rings are visible and brand-styled (Signal color, 2px outline, 4px offset)

### 1.6 Browser support

Latest two versions of Chrome, Safari, Firefox, Edge. Mobile Safari iOS 16+. Mobile Chrome Android 12+. Do not use any feature without a fallback for these targets.

---

## Section 2 — The Eight Techniques (Adapted)

These are the techniques from the YouTube video Richard sent, translated and overridden for Mirror specifically. Use these as a methodology guide. The overrides are critical.

### 2.1 CLAUDE.md as instruction layer

A `CLAUDE.md` file lives in the repo root with the following contents (you will create it):

- A summary of the brand-guide.md anti-patterns (the explicit "never do" list)
- A pointer to read /docs/02-brand-guide.md, /docs/01-company-charter.md, /docs/00-glossary.md before any decision
- The hard rules: no purple, no Inter, no gradient backgrounds, no Spline community 3D objects, no em dashes, slow animations only
- The visual reference list: linear.app, anthropic.com, palantir.com, vercel.com (read structure, not specific elements)

### 2.2 Inspiration from real sites

Reference structurally, never copy directly. Look at how Linear paces its sections. Look at how Anthropic's editorial copy sits in the layout. Look at how Palantir uses density and negative space together. Do not clone any layout one-to-one. Do not copy any specific component. Reference for rhythm and confidence, build originals.

### 2.3 Tailwind + shadcn (with discipline)

Tailwind config must be customized to brand tokens (colors, spacing, typography, easing). No use of arbitrary Tailwind values like `bg-[#1234]`, all colors must be in the config and referenced as `bg-void`, `text-bone`, `text-signal`, etc. This is enforced.

shadcn/ui primitives are imported headlessly and restyled in /components/ui/ with brand-matching components. Every shadcn import must be wrapped in a Mirror-branded component before use anywhere on a page. Default shadcn styling never reaches a page.

### 2.4 Backgrounds (override the video)

The video recommends gradient backgrounds. We do not use them. Mirror's background is always Void (#0A0A0B) with a subtle grain overlay (SVG noise texture at 2-3% opacity, applied as a fixed-position pseudo-element on the body). No exceptions on the homepage. Specific sections may use Smoke (#1A1A1D) for elevated surfaces. Never gradients.

### 2.5 Animations (override the video)

The video recommends fast cascading scroll animations. We do not use them. Mirror's animation language is slow (600-800ms), rare (one or two intentional moments per fold), and respectful of `prefers-reduced-motion`. Easing curve is locked: `cubic-bezier(0.16, 1, 0.3, 1)`.

The animations we build:
- Hero: a single canvas-based particle field (described in detail in Section 4)
- Scroll reveals: 800ms slide-up + fade, triggered by IntersectionObserver, never on every element, only on section headlines and feature blocks
- Hover on cards: 400ms translateY -2px, border color transitions to Signal at 30% opacity
- Hover on primary buttons: 300ms background fill from left to right with Signal
- "Mirror is thinking" indicator: single Signal dot pulsing at 1.2s interval
- Typography reveals on hero: character-by-character entrance, total duration 1200ms, staggered 30ms per character

Nothing else animates by default. If you want to animate something, ask first.

### 2.6 3D and signature visuals (override the video)

The video recommends Spline community library 3D objects. We do not use them. Mirror's signature visual is a custom canvas-based particle field on the homepage hero (described in 4.2.3) that responds to cursor movement. Three.js is acceptable only if it is required for a specific custom build, not for importing pre-made objects.

For v1 tonight: build the canvas particle field. Do not attempt the "resolving face" version yet. The face is v2.

### 2.7 Typography (use this technique fully)

Berkeley Mono for display, JetBrains Mono as the free fallback. Geist for body. Never Inter, never Roboto, never system fonts as a primary choice. Self-host all fonts in /public/fonts/. Preload the most-used weights. Use font-display: swap.

If Berkeley Mono is not available (we may not have purchased it tonight), use JetBrains Mono as primary display. Do not substitute any other monospace. Do not use Space Grotesk, do not use IBM Plex Mono, do not use Fira Code. Only those two for display, and only Geist for body.

### 2.8 Screenshot QA loop

After each section ships and is deployed to Vercel preview, screenshot it on desktop and mobile. Compare against the anti-patterns list in brand-guide.md. List any anti-patterns present. Fix them before moving to the next section. This is not optional.

---

## Section 3 — Information Architecture

### 3.1 Sitemap (v1, locked)

```
/                  Homepage (one-page anchor scroll for most sections)
/demo              Live Mirror demo (full-screen chat interface)
/method            How a Mirror gets built (4-stage methodology)
/pricing           Three tiers detail
/book              Cal.com embed for Diagnostic Call
/manifesto         Founding story (lower priority, can be v1.1)
/privacy           Legal
/terms             Legal
404                Custom error page
```

### 3.2 Pages we are NOT building tonight

No /blog. No /case-studies (we have no clients yet). No /about (the manifesto covers this). No /careers (we are two people). No /contact (booking is the contact). No documentation. No knowledge base.

### 3.3 URL structure

All paths are lowercase, hyphen-separated, no trailing slashes. Slugs match the page name exactly.

### 3.4 Global navigation

**Desktop nav (64px height, Void background, 1px Ash border bottom):**

Left: Mirror wordmark in Berkeley Mono, 16px, Bone color, links to /
Right (in order, separated by 32px):
- DEMO (links to /demo)
- METHOD (links to /method)
- PRICING (links to /pricing)
- A primary button "BOOK A CALL" (links to /book)

All nav text: Berkeley Mono, 12px, all caps, 0.08em tracking, Bone color, Signal color on hover.

**Mobile nav (56px height):**

Left: Mirror wordmark
Right: Hamburger icon (Lucide menu, 24px)
Tapping hamburger opens a full-screen overlay (Void background, 100% width and height, 400ms fade in) with the same nav items stacked vertically, 32px font size, 32px gaps. Close icon (X) top right.

### 3.5 Global footer

Minimal. Single row on desktop, stacked on mobile. Padded 64px top, 32px bottom.

Left: Mirror wordmark, smaller (12px), with "© 2026 Mirror" in Ash color
Center: Three text links: PRIVACY, TERMS, MANIFESTO (Berkeley Mono, 12px, all caps, Ash color, Bone on hover)
Right: One small status indicator: a Signal dot pulsing slowly with text "MIRROR/M1 ONLINE" in 12px mono caps. This is a brand moment that hints the demo Mirror is always available.

---

## Section 4 — The Homepage (the most important page)

The homepage is the single most important surface. Most visitors will see only this page. Every section below is locked unless I approve a change.

### 4.1 Page structure (top to bottom)

1. Nav (global, see 3.4)
2. Hero (4.2)
3. The Proof section: Try the demo (4.3)
4. The "What Mirror is" explainer (4.4)
5. The "Who Mirror is for" qualifier (4.5)
6. The Three Tiers preview (4.6)
7. The Methodology preview (4.7)
8. FAQ (4.8)
9. Final CTA (4.9)
10. Footer (global, see 3.5)

Vertical spacing between sections: 128px on desktop, 64px on mobile. No exceptions.

### 4.2 Hero section

#### 4.2.1 Layout

Full viewport height (100vh, capped at 900px). Centered content vertically and horizontally. Max content width 960px. Left-aligned text inside that container (not center-aligned, that is a generic SaaS pattern).

#### 4.2.2 Content (locked copy, do not modify)

Eyebrow (12px Berkeley Mono caps, Signal color, 0.12em tracking):
`MIRROR / M1`

Headline (Display XL, Berkeley Mono, Bone, line height 0.95):
`Talk to your customer.`
`Before you sell to them.`

Two lines, manually broken with `<br>`. The period after "customer" is intentional. Do not remove.

Subhead (Body L, Geist, Bone at 70% opacity, max width 540px):
`Mirror builds you a private AI clone of your highest-value customer segment. Calibrated on your data. Deployed in your stack. Owned by you.`

CTAs (32px above subhead, side by side, 16px gap):
- Primary button: `TRY A LIVE MIRROR` (links to /demo)
- Secondary button: `BOOK A CALL` (links to /book)

Below CTAs, 48px down, in 12px Berkeley Mono caps Ash color:
`CURRENTLY BUILDING MIRRORS FOR COMPANIES BETWEEN $5M AND $200M.`

#### 4.2.3 The hero animation

Behind the typography, a custom canvas-based particle field. Specs:

- 80-120 particles, randomly distributed across the viewport
- Each particle is a 2px Signal-colored dot
- Particles drift slowly in random directions at 0.2-0.4 px/frame
- Particles within 80px of each other are connected by 1px lines, opacity scaled to inverse distance, color Signal at max 30% opacity
- The cursor (when over the hero) is treated as an additional invisible particle, repelling nearby particles within 120px radius with a soft easing
- Particle field renders behind the typography (z-index lower)
- A 60% opacity Void overlay sits between the canvas and the typography to ensure text legibility
- Total CPU usage: under 5% on a mid-range laptop. Cap framerate at 30fps using requestAnimationFrame timing
- On mobile: reduce particle count to 40, disable cursor interaction, run at 24fps
- Respect `prefers-reduced-motion`: render the particles as a static field with no movement and no cursor interaction

Build this as a React component `<HeroParticleField />` in `/components/hero/`. It should be reusable but is only used on the homepage hero in v1.

#### 4.2.4 Hero animations

The typography enters character-by-character on first paint:
- Eyebrow appears at 0ms, 400ms fade in
- Headline characters fade in starting at 200ms, staggered 30ms per character, total ~1200ms
- Subhead fades in at 1400ms, 600ms duration
- CTAs slide up + fade in at 1800ms, 600ms duration
- Below-CTAs caption fades in at 2200ms, 400ms duration

After the initial paint, no further hero animations except the particle field's continuous slow movement and the cursor interaction.

### 4.3 The Proof section: Try the demo

This is the second-most-important section on the page. Its job is to convert curiosity into demo engagement.

#### 4.3.1 Layout

Full bleed background (Smoke #1A1A1D), inside a 1280px max-width container. 96px vertical padding inside the section.

Left column (60% width on desktop, full on mobile): Text content.
Right column (40% width on desktop, full on mobile, stacked below text): A live preview frame.

#### 4.3.2 Content

Eyebrow: `LIVE DEMO`
Headline (H1): `Talk to a Mirror right now.`
Subhead (Body L, Bone 70%):
`We built a Mirror of a company you've heard of. Ask it about pricing, objections, or what would make their best customers churn. The answers will surprise you.`

Below subhead, 32px down, primary button: `OPEN THE DEMO →` (links to /demo)

#### 4.3.3 The preview frame (right column)

A faux chat interface preview, static (no real interactivity here, the real interactivity is on /demo). Shows three example exchanges in the Mirror chat UI. Styled exactly like the real chat on /demo so visitors know what they will get.

Examples to show (these are placeholder examples, will be customized when we pick the demo brand):

```
You: Why did you cancel your subscription?
Mirror: Three of us would say the same thing. The product
        worked. The relationship didn't. We felt like a
        line item, not a customer.

You: What would have kept you?
Mirror: A founder check-in at month four. We don't need
        more features. We needed to feel seen.
```

Frame styling: 1px Ash border at 30% opacity, 16px padding, monospace font (Berkeley Mono) inside the chat at 14px, "You" labels in Ash, "Mirror" labels in Signal.

A subtle Signal pulse appears under the most recent Mirror response, suggesting it is "thinking" in real time, then disappears after 2s and the next message appears. This loops every 12s.

### 4.4 The "What Mirror is" explainer

#### 4.4.1 Layout

Centered, max width 760px. Generous 96px vertical padding.

#### 4.4.2 Content

Eyebrow: `WHAT MIRROR IS`
Headline (H1, centered):
`Not a chatbot. Not a research firm.`
`A new kind of asset.`

Three short paragraphs (Body L, Bone, max width 640px, left-aligned even though the headline is centered):

`Mirror is a private AI clone of your best customer, calibrated on your CRM, your sales calls, your reviews, and your support tickets. It speaks the way they speak. It objects the way they object. It buys the way they buy.`

`You talk to it like a focus group of one. You test creative against it before you spend on media. You hand it to your agency as the brief.`

`The Mirror lives in your stack. You own it. We built the methodology. You own the asset.`

No icons. No three-column "features." Just clean prose. The discipline of letting words carry weight is the brand.

### 4.5 The "Who Mirror is for" qualifier

#### 4.5.1 Layout

Two-column on desktop (50/50), stacked on mobile.

Left column: Headline + intro text.
Right column: A simple checklist component with five items.

#### 4.5.2 Content

Left column:
Eyebrow: `WHO MIRROR IS FOR`
Headline (H2): `If three of these are true, we should talk.`

Right column (the checklist):
Each item is a row with a 16px Lucide check icon (Signal color) and Body L Bone text. 24px gap between items.

```
You're doing $5M to $200M in annual revenue.
You spend $30K+ per month on paid acquisition.
Your decisions about customers feel like guesses.
You've outgrown surveys and focus groups.
You want to own the asset, not rent the tool.
```

Below the checklist, 48px down, secondary button: `CHECK YOUR FIT IN A 20-MIN CALL` (links to /book)

### 4.6 The Three Tiers preview

#### 4.6.1 Layout

Three-column on desktop (equal widths, 24px gaps), stacked on mobile (24px gaps between cards). Cards: Smoke background, 1px Ash 30% border, 32px internal padding, no border radius.

Section header above the grid:
Eyebrow: `THREE WAYS IN`
Headline (H1, centered): `Pick your depth.`

#### 4.6.2 Card structure (each card)

Tier name (Berkeley Mono, 14px, all caps, Signal color)
Price (Berkeley Mono, 32px, Bone, no commas, with " ONE-TIME " or " /MO " suffix in 12px Ash)
Duration (12px Berkeley Mono caps, Ash color)
A single sentence description (Body, Bone)
A horizontal Ash 30% rule (16px above and below)
A bulleted list of 3-4 inclusions (Body S, Bone, custom bullet using Signal-colored dot)
At the bottom of the card, a ghost-style button "LEARN MORE" linking to /pricing#[tier]

#### 4.6.3 The three cards (locked content)

**Card 1: Mirror/Recon**
- Price: $4,500 ONE-TIME
- Duration: 14 DAYS
- Description: A diagnostic Mirror, built from public and lightly-shared data.
- Inclusions:
  - Lightweight Mirror calibrated to your customer base
  - The Truth Report (20 pages of synthesized customer insight)
  - 60-minute live session interviewing your own Mirror
  - Full refund if you don't get 3 actionable insights

**Card 2: Mirror/Install** (visually emphasized as "most chosen", a small Signal-colored eyebrow above the card reading "MOST CHOSEN")
- Price: $18,000 + $6,500 /MO
- Duration: 60 DAYS TO BUILD, ONGOING
- Description: A fully calibrated Mirror, deployed in your stack, owned by you.
- Inclusions:
  - Full Mirror built from CRM, calls, reviews, support, and 8 customer interviews
  - Custom-branded interface, multi-persona architecture
  - Weekly Mirror Reports
  - Unlimited team access, monthly retraining

**Card 3: Mirror/Operate**
- Price: FROM $15,000 /MO
- Duration: QUARTERLY ENGAGEMENTS
- Description: We install Mirror, then we operate it for you.
- Inclusions:
  - Everything in Mirror/Install
  - Daily use of Mirror to pre-test all your campaigns
  - Briefs delivered to your team or agency
  - Monthly Strategic Foresight document
  - Quarterly KPI agreement

### 4.7 The Methodology preview

#### 4.7.1 Layout

Full width, centered, max content width 960px. The four stages are presented as a horizontal timeline on desktop, stacked vertically on mobile.

#### 4.7.2 Content

Eyebrow: `THE METHOD`
Headline (H1): `Four stages. Sixty days. One Mirror.`

Below the headline, the four-stage timeline:

```
INGEST     →     CALIBRATE     →     INSTALL     →     OPERATE
Days 1-14        Days 15-35           Days 36-50        Days 51+
```

Each stage is a vertical column with:
- Stage number (12px Berkeley Mono caps, Ash, "01" "02" "03" "04")
- Stage name (H3, Bone)
- Date range (12px Berkeley Mono caps, Ash)
- One-line description (Body S, Bone 70%)

Stage descriptions:
- INGEST: We pull in your CRM, calls, reviews, support tickets, and run 8 customer interviews.
- CALIBRATE: We build the multi-persona model and tune the voting against your data.
- INSTALL: We deploy your Mirror into your stack with a custom-branded interface.
- OPERATE: We retrain weekly. You use it daily. The asset compounds.

Between stages on desktop: a horizontal 1px Ash dotted line with a slow Signal dot animating left to right along it (8s duration, looping). Subtle. This is the second hero moment of the page.

Below the timeline, 48px down, ghost button: `SEE THE FULL METHOD →` (links to /method)

### 4.8 FAQ section

#### 4.8.1 Layout

Centered, max width 760px. 96px padding.

#### 4.8.2 Content

Eyebrow: `OBJECTIONS, ANSWERED`
Headline (H1, left-aligned): `The questions you're already asking.`

Below the headline, an Accordion (built on shadcn Accordion primitive, fully restyled). 8 items.

Accordion item styling:
- Question: Body L, Bone, with a "+" icon on the right (Lucide plus, 20px, Ash, rotates 45deg to become × when expanded, 400ms transition)
- 1px Ash 30% bottom border on each item
- 24px vertical padding per item
- Answer: Body, Bone 70%, max width 640px, 16px top padding when expanded
- Smooth expand/collapse, 400ms

The 8 questions and answers (locked content, write exactly):

1. **Q: Couldn't I just use ChatGPT for this?**
A: ChatGPT will roleplay a generic customer. Mirror is calibrated on your CRM, your call recordings, your reviews, with multi-persona voting and weekly retraining. The output gap is enormous, and we demonstrate it on every Diagnostic Call.

2. **Q: Who owns the Mirror?**
A: You do. The Mirror lives in your stack. We deliver IP transfer documents at the end of every Install. You can fire us and keep the asset.

3. **Q: What data do you need from us?**
A: Ideally: CRM exports, recorded sales calls, support tickets, customer reviews, NPS data, and access to schedule 8 customer interviews. The more you give, the sharper the Mirror.

4. **Q: How is this different from a focus group?**
A: A focus group is 8 people, twice a year, telling you what they think they think. A Mirror is 8 calibrated personas, available 24/7, telling you what your actual best customers actually do.

5. **Q: How long does a Mirror stay accurate?**
A: Mirror/Install includes monthly retraining. As long as you keep feeding it new data, it stays sharp. Without retraining, accuracy degrades meaningfully after 3-4 months.

6. **Q: What if our customer base is too niche?**
A: That's usually when Mirror is most valuable. The narrower your ICP, the harder it is for off-the-shelf research to help. Mirror specializes in narrow.

7. **Q: Can we start with Mirror/Recon and upgrade?**
A: That's how most clients enter. Recon is the diagnostic. Install is the build. Operate is when you want us in the seat with you.

8. **Q: What if we don't have clean customer data?**
A: We've built Mirrors from messier inputs than yours. The Calibrate stage exists exactly to handle this. We'll tell you on the Diagnostic Call whether you have what we need.

### 4.9 Final CTA section

#### 4.9.1 Layout

Full bleed Void background. Centered content, max width 760px. 192px vertical padding (extra generous, this is the closing moment).

#### 4.9.2 Content

A single oversized headline (Display XL, Berkeley Mono, Bone, centered):
`The next 20 minutes`
`could change`
`how you sell.`

Three lines, manually broken with `<br>`. Each line on its own row. Animated character-by-character on scroll into view.

Below the headline, 48px down, a single primary button (oversized: 24px vertical / 48px horizontal padding, 18px text):
`BOOK YOUR DIAGNOSTIC CALL`

Below the button, 24px down, in 12px Berkeley Mono caps Ash color:
`20 MINUTES. NO PITCH. WE'LL TELL YOU IF YOU'RE A FIT.`

---

## Section 5 — The /demo Page

### 5.1 Purpose

The single most important page after the homepage hero. This is the page that closes deals before sales calls. The demo is the product proof.

### 5.2 Layout

Full viewport, no global nav (replaced with a minimal top bar). The chat interface is the entire page.

Top bar (48px height, Smoke background, 1px Ash bottom border):
- Left: Mirror wordmark (12px) + "MIRROR / [DemoBrandName]" label in Berkeley Mono caps, Ash color
- Center: A live status indicator. Signal dot pulsing slowly with "ONLINE · MULTI-PERSONA · CALIBRATED ON 1,243 DATA POINTS" in 12px caps Ash. The number animates up over 30s on first visit (counts from 0 to 1,243), then stays static.
- Right: A "BOOK A CALL" small primary button

### 5.3 Chat interface (main content area)

Two columns on desktop:
- Left sidebar (280px, fixed): Suggested questions
- Right (flex): The chat itself

On mobile, sidebar collapses into a top dropdown.

### 5.4 Sidebar: Suggested questions

Eyebrow: `TRY ASKING:`

A vertical stack of 6 suggested question buttons. Each is a left-aligned ghost button with:
- 1px Ash 30% border
- 12px padding
- Berkeley Mono 14px Bone
- On hover: border becomes Signal at 60% opacity, text stays Bone
- On click: question is sent to the chat

Suggested questions (customize per demo brand, these are placeholders):
1. Why do customers choose you over the alternative?
2. What would make a high-value customer churn?
3. Is your pricing too high, too low, or correct?
4. What's the strongest objection during the buying process?
5. What product would your best customers buy next?
6. What does your worst review have in common with your best?

Below the questions, a small caption:
`THIS IS A DEMO MIRROR BUILT FROM PUBLIC DATA. YOUR MIRROR WILL BE 10X SHARPER.`

### 5.5 Chat interface

Full height, bottom-anchored.

Message styling:
- User messages: right-aligned, Smoke background, 1px Ash 30% border, 16px padding, max width 560px, Berkeley Mono 14px Bone
- Mirror messages: left-aligned, no background, max width 640px, Berkeley Mono 14px Bone
- Mirror messages have a 12px caps eyebrow above showing which sub-persona is responding (e.g., "MIRROR · LOYALIST" in Signal color)
- Multi-persona responses show the voting briefly (e.g., "3 OF 5 PERSONAS AGREE" in Ash, fades in after the response completes)
- Reasoning toggle: a small "[ + SHOW REASONING ]" button below each Mirror response. When clicked, expands a section showing the multi-persona internal reasoning in 12px Berkeley Mono Ash color.

Input bar (bottom, sticky):
- Full width inside the chat container
- Single-line input (Berkeley Mono 14px Bone, transparent background, 1px Ash bottom border, Signal underline on focus)
- Right side: a small Signal-colored "SEND" button (or the input arrow icon)
- Above the input, when Mirror is generating: the "thinking" indicator (single Signal dot pulsing at 1.2s) with caption "MIRROR IS THINKING"

Rate limiting:
- Cap at 10 messages per visitor per session (use localStorage)
- After message 5: show a soft inline prompt "ENJOYING THIS? BOOK A CALL TO SEE YOUR OWN MIRROR." with a Cal.com link
- After message 10: replace input with "DEMO LIMIT REACHED. BOOK A CALL TO CONTINUE." with a primary button

### 5.6 API integration

The /demo page calls the Anthropic API on the server (Next.js Route Handler at `/app/api/mirror/route.ts`). System prompt and persona architecture are stored in `/lib/demo-mirror/prompts.ts`. The actual prompt content will be added separately, build the integration to accept a configurable system prompt and 3-5 sub-persona prompts.

Stream responses using Server-Sent Events to the client. Render token-by-token.

Log every demo interaction (timestamp, question asked, response generated, anonymous session id) to a Vercel KV store or Supabase table. This is sales intelligence: knowing what visitors ask the demo tells us what to put on the homepage.

### 5.7 Empty state

When the page first loads with no messages:

Centered in the chat area, a gentle message:
- Eyebrow: `MIRROR / [BRANDNAME] · READY`
- Body L Bone: `Ask anything. The Mirror is calibrated on 1,243 data points from this brand's customers.`
- Below: `Try one of the suggested questions, or ask your own.`

The "thinking" dot pulses softly even in empty state, suggesting the Mirror is "alive."

---

## Section 6 — The /pricing Page

### 6.1 Layout

Standard global nav at top. Centered content, 1280px max width. 96px top padding.

### 6.2 Page header

Eyebrow: `PRICING`
Headline (Display L): `Three ways to install a Mirror.`
Subhead (Body L, max 640px, Bone 70%): `From a 14-day diagnostic to a fully operated growth function. Every Mirror is built for one company. Yours.`

### 6.3 The three tiers (full detail)

Same three-card layout as the homepage preview (4.6) but with full detail. Each card now expands to include:

- Tier name + price (same as homepage)
- "What's included" section: 8-12 specific items per tier, with Signal-dot bullets
- "What's not included" section: 2-4 items in Ash text
- "Best for" section: 1-2 sentences describing the ideal client
- "The guarantee" section: the locked guarantee language for that tier
- A primary button: `START [TIER NAME]` linking to /book with a query param indicating tier interest

Card heights are equal (use CSS grid with `align-items: stretch`).

### 6.4 The comparison table

Below the cards, a clean comparison table:

Columns: Feature | Recon | Install | Operate
Rows (each feature, with check or dash):

```
Custom Mirror built                ✓        ✓        ✓
Public data only                   ✓        -        -
First-party CRM/calls/reviews      -        ✓        ✓
8 customer interviews              -        ✓        ✓
The Truth Report (20 pages)        ✓        -        -
Custom-branded interface           -        ✓        ✓
Weekly Mirror Reports              -        ✓        ✓
Monthly retraining                 -        ✓        ✓
Daily operated by Mirror team      -        -        ✓
Monthly Strategic Foresight        -        -        ✓
Quarterly KPI agreement            -        -        ✓
You own the asset                  ✓        ✓        ✓
```

Table styling:
- 1px Ash 30% borders between rows
- Header row: 12px Berkeley Mono caps
- Body rows: Body S Geist
- Checks: Lucide check icon, Signal color, 16px
- Dashes: 1px Ash 60% line, 16px wide
- Hover row highlight: Smoke background

### 6.5 Pricing FAQ

A second Accordion below the table, with pricing-specific questions (5-6 items):

1. Do you offer monthly billing on Install?
2. What happens after the 12-month minimum?
3. Can we pause Operate engagements?
4. What if we need a custom scope?
5. Do you do annual prepay discounts?
6. Are there setup fees beyond the build fee?

Answer content can be drafted in placeholder form for v1, marked with a comment for me to write.

### 6.6 Final CTA

Same as homepage final CTA (4.9) but with copy:
`Three tiers. One next step.`
`A 20-minute Diagnostic Call.`

---

## Section 7 — The /method Page

### 7.1 Layout

Standard global nav. Centered, 960px max width.

### 7.2 Page header

Eyebrow: `THE METHOD`
Headline (Display L): `How a Mirror gets built.`
Subhead: `Four stages. Sixty days. One asset that compounds.`

### 7.3 The four stages (detailed)

For each stage (Ingest, Calibrate, Install, Operate), a full section with:

- Large stage number (Display L Berkeley Mono Signal color, "01" "02" "03" "04")
- Stage name (Display L Bone)
- Date range (Body L Ash caps)
- Description paragraph (Body L Bone, 2-3 sentences)
- "What we do" subsection: 4-6 bulleted items
- "What you get" subsection: 2-3 bulleted items
- A horizontal Ash 30% rule below each stage (96px below)

Sections are full width within the 960px container. Generous 96px vertical spacing between stages.

Between stages, a small connecting visual: a thin Ash dotted vertical line (96px tall, centered) with a single Signal dot animating downward along it (4s duration, triggered when the next section enters viewport).

### 7.4 Stage content (locked, write exactly)

**01 INGEST · Days 1-14**

We pull in your customer data from every available source. CRM exports tell us who buys. Sales call recordings tell us how they buy. Support tickets tell us where they hurt. Reviews and NPS tell us what they say in public. Then we run 8 customer interviews ourselves to fill the gaps your data can't.

What we do:
- CRM and transactional data ingestion
- Sales call transcript analysis (12 months of recordings)
- Support ticket review and tagging
- Public review and social listening pull
- 8 first-party customer interviews conducted by us
- Data normalization into a single structured corpus

What you get:
- A confidential Data Inventory document
- Anonymized interview transcripts

**02 CALIBRATE · Days 15-35**

We identify the 3 to 5 distinct sub-personas inside your customer base and build a calibration brief for each. Then we train the multi-persona architecture, where the personas debate, vote, and converge on every Mirror response. We test the model against held-out data until it stops surprising us.

What we do:
- Sub-persona identification and naming
- Calibration Brief written per sub-persona
- Multi-persona voting architecture deployed
- Held-out testing across 200+ test scenarios
- Iterative tuning based on misses

What you get:
- Calibration Briefs for each sub-persona
- A Calibration Report showing test accuracy

**03 INSTALL · Days 36-50**

We deploy your Mirror into your stack with a custom-branded interface. Your team gets unlimited access. We hand over the IP transfer documents. From this day forward, the asset is yours.

What we do:
- Custom Mirror interface deployment
- Branded UI matching your visual identity
- Team access provisioning
- Integration with your tools (Slack, Notion, etc., as scoped)
- IP transfer and ownership documentation

What you get:
- A live, branded Mirror interface
- Team training session (90 minutes)
- IP transfer documents

**04 OPERATE · Day 51 and beyond**

The Mirror is yours, but it needs feeding. We retrain monthly with new data. We deliver a Weekly Mirror Report surfacing the insights it generated. You use it daily to brief your team, test campaigns, and pre-empt decisions before they cost you.

What we do:
- Monthly retraining with new customer data
- Weekly Mirror Report delivery
- Quarterly recalibration sessions
- Async support for your team

What you get:
- A Mirror that gets sharper every month
- A Weekly Mirror Report
- Quarterly insight reviews

### 7.5 Final CTA on /method

Same final CTA pattern as homepage, with copy:
`See the method`
`work on your data.`

---

## Section 8 — The /book Page

### 8.1 Layout

Standard global nav. Centered, max width 720px. 96px top padding.

### 8.2 Page content

Eyebrow: `BOOK A CALL`
Headline (Display L): `20 minutes.`
Subhead (Body L): `We'll ask 5 questions, show you a live demo, and tell you whether you're a fit. No pitch.`

Below the subhead, 48px down, the Cal.com embed.

### 8.3 Cal.com embed

Use Cal.com's React embed (`@calcom/embed-react`). Configure inline embed mode. Pass our brand colors as theme overrides:
- background: Void
- text: Bone
- accent: Signal
- border: Ash 30%

Calendar height: 720px. Width: 100%.

Pre-call form fields (configured in Cal.com, not in our code, but listed here for reference):
- Name
- Company
- Annual revenue band (dropdown: <$5M, $5M-$20M, $20M-$50M, $50M-$200M, $200M+)
- Current monthly ad spend (dropdown: <$10K, $10K-$30K, $30K-$100K, $100K-$300K, $300K+)
- What's your biggest customer insight gap right now? (textarea)
- How did you hear about Mirror? (dropdown: LinkedIn, Twitter/X, Referral, Outbound, Other)

### 8.4 Below the embed

A small section, 96px below the embed:

Eyebrow: `WHAT TO EXPECT`
A 4-item numbered list (Berkeley Mono numbers, Body Bone text):

```
01.  We ask 5 qualifying questions.
02.  We show you a live Mirror of a recognizable brand.
03.  We tell you, honestly, whether Mirror fits your situation.
04.  If yes, we send a proposal within 24 hours. If no, we tell you what would.
```

---

## Section 9 — The /manifesto Page (optional v1.1)

If time permits tonight, build a placeholder. Otherwise, this can ship next week.

A long-form editorial page, single column, max width 680px, generous typography. Tells the founding story. Voice: founder-written, slightly philosophical, no marketing speak.

Defer full content for now. Ship a placeholder with eyebrow `MANIFESTO`, headline `Coming soon.`, and a link back home.

---

## Section 10 — Legal Pages

### 10.1 /privacy and /terms

Use a generator (e.g., Termly, GetTerms, or iubenda). Drop the generated text into the page. Style it to match brand:
- Single column, max width 720px
- Body S Geist Bone for paragraphs
- H3 Berkeley Mono Bone for sections
- Eyebrow + Display L headline at top ("PRIVACY POLICY" / "TERMS OF SERVICE")
- Last updated date at bottom in 12px Ash caps

No fancy layout. Legal pages are utilitarian. Just style the typography to brand.

---

## Section 11 — 404 Page

A custom error page, full viewport, centered:

Eyebrow: `404`
Headline (Display XL): `This page doesn't exist.`
Subhead (Body L): `It might never have. The Mirror would know.`
Two buttons: `BACK TO HOME` (primary) and `TRY THE DEMO` (secondary)

A subtle background: a smaller version of the homepage particle field, lower density (40 particles), no cursor interaction.

---

## Section 12 — Global Behaviors

### 12.1 Smooth scroll

Enable smooth scrolling for anchor links on the homepage. Use CSS `scroll-behavior: smooth` with a 64px scroll padding to account for the sticky nav.

### 12.2 Sticky nav behavior

Nav stays at top on scroll, but adds a 1px Ash 60% bottom border and a slight Smoke background tint (5% opacity) when scrolled past 64px. 200ms transition. Nav itself doesn't shrink or move.

### 12.3 Cursor

On the homepage hero only: a custom cursor. Default cursor is hidden, replaced with a 12px Signal-colored circle outline (1px stroke). The circle follows the actual cursor position with a 200ms ease-out trailing motion. On hover over interactive elements, the circle expands to 24px and fills with Signal at 30% opacity. Disabled on mobile and when `prefers-reduced-motion` is set.

### 12.4 Page transitions

When navigating between pages, fade through Void: 200ms fade-out current page, route change, 200ms fade-in new page. Use Next.js App Router with a layout-level transition wrapper.

### 12.5 Scroll-triggered reveals

Section headlines and feature blocks (not every element) animate on scroll into view. IntersectionObserver triggers at 20% visibility. Animation: 800ms slide-up 60px + opacity 0 to 1, eased with the locked easing curve. Triggered once, not on every scroll past.

Respect `prefers-reduced-motion`: replace with instant appearance.

### 12.6 Form behaviors

Any form inputs (none in v1 except the Cal.com embed) should:
- Use the brand input styling (transparent bg, Ash bottom border, Signal underline on focus)
- Show inline validation errors below the input in 12px Error color
- Disable submit buttons during submission, show "..." text

### 12.7 Loading states

Page-level loading: a single Signal dot pulsing at center of viewport. No spinners, no skeletons in v1.

Section-level loading (e.g., demo Mirror generating): the "thinking" indicator from 5.5.

### 12.8 Error states

Network errors on the demo: a small inline message in Error color, "Mirror is unreachable. Try again in a moment." Do not show a full error page unless the route itself is broken.

---

## Section 13 — File and Folder Structure

```
/
├── CLAUDE.md                          (instruction file for future Claude Code sessions)
├── PLAN.md                            (your build plan, written before coding starts)
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── /docs/
│   ├── charter.md                     (Company Charter, provided)
│   ├── glossary.md                    (Glossary, provided)
│   └── brand-guide.md                 (Brand Guide, provided)
├── /public/
│   ├── /fonts/                        (Berkeley Mono / JetBrains Mono / Geist)
│   ├── /images/
│   ├── favicon.ico
│   ├── og-image.png
│   └── grain.svg                      (the noise texture overlay)
├── /app/
│   ├── layout.tsx                     (root layout, fonts, global styles, nav, footer)
│   ├── page.tsx                       (homepage)
│   ├── globals.css                    (CSS variables, base styles)
│   ├── /demo/
│   │   └── page.tsx
│   ├── /method/
│   │   └── page.tsx
│   ├── /pricing/
│   │   └── page.tsx
│   ├── /book/
│   │   └── page.tsx
│   ├── /manifesto/
│   │   └── page.tsx                   (placeholder)
│   ├── /privacy/
│   │   └── page.tsx
│   ├── /terms/
│   │   └── page.tsx
│   ├── not-found.tsx                  (custom 404)
│   └── /api/
│       └── /mirror/
│           └── route.ts               (Anthropic API integration for demo)
├── /lib/
│   ├── design.ts                      (design tokens: colors, typography, spacing, easing)
│   ├── analytics.ts                   (Plausible setup)
│   └── /demo-mirror/
│       ├── prompts.ts                 (system prompt + sub-persona prompts)
│       └── personas.ts                (persona definitions)
├── /components/
│   ├── /ui/                           (restyled shadcn primitives)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── accordion.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── container.tsx
│   ├── /layout/
│   │   ├── nav.tsx
│   │   ├── footer.tsx
│   │   └── page-transition.tsx
│   ├── /hero/
│   │   ├── particle-field.tsx
│   │   ├── headline.tsx               (character-by-character animation)
│   │   └── custom-cursor.tsx
│   ├── /home/
│   │   ├── hero-section.tsx
│   │   ├── proof-section.tsx
│   │   ├── what-mirror-is-section.tsx
│   │   ├── who-its-for-section.tsx
│   │   ├── tiers-preview-section.tsx
│   │   ├── methodology-preview-section.tsx
│   │   ├── faq-section.tsx
│   │   └── final-cta-section.tsx
│   ├── /demo/
│   │   ├── chat-interface.tsx
│   │   ├── chat-message.tsx
│   │   ├── chat-input.tsx
│   │   ├── suggested-questions.tsx
│   │   ├── thinking-indicator.tsx
│   │   └── persona-eyebrow.tsx
│   ├── /pricing/
│   │   ├── tier-card.tsx
│   │   ├── comparison-table.tsx
│   │   └── pricing-faq.tsx
│   └── /method/
│       ├── stage-section.tsx
│       └── stage-connector.tsx
└── /styles/
    └── (any additional CSS modules if needed)
```

---

## Section 14 — Build Sequence

This is the order. Do not deviate without asking.

### Phase 1: Foundation (build before any pages)

1. Initialize Next.js project with TypeScript and Tailwind v4
2. Install Motion, Lucide, Cal.com embed, Plausible, Resend, shadcn/ui CLI
3. Set up self-hosted fonts in /public/fonts/ (JetBrains Mono and Geist for v1 since Berkeley Mono requires purchase)
4. Configure Tailwind with brand tokens from brand-guide.md
5. Create `/lib/design.ts` exporting all tokens as TypeScript constants
6. Create `/app/globals.css` with CSS variables, base styles, grain overlay implementation
7. Create CLAUDE.md with anti-patterns and reference doc pointers
8. Initialize Git repo, create GitHub repo, connect to Vercel, deploy "Hello Mirror" placeholder

**Stop here. Show me design.ts, globals.css, and the deployed placeholder URL. I need to confirm fonts and colors render correctly before building anything else.**

### Phase 2: UI primitives

9. Install shadcn primitives: button, card, accordion, dialog, input
10. Restyle each in /components/ui/ matching brand guide spec
11. Create Container and Section utility components in /components/ui/
12. Build a simple `/dev` route that renders one of each primitive in all states (default, hover, focus, disabled). This is your QA reference.

**Deploy. Show me the /dev route. I need to approve the primitives before pages use them.**

### Phase 3: Layout shell

13. Build `/components/layout/nav.tsx` with desktop and mobile variants
14. Build `/components/layout/footer.tsx`
15. Build `/components/layout/page-transition.tsx` with Motion fade through Void
16. Wire all three into `/app/layout.tsx`
17. Verify nav stickiness, mobile hamburger overlay, and page transition between two placeholder pages

**Deploy. Test on mobile. Approve.**

### Phase 4: Homepage (the long one)

18. Build the hero particle field component (`/components/hero/particle-field.tsx`)
19. Build the character-by-character headline animation
20. Build the custom cursor (homepage hero only, with prefers-reduced-motion fallback)
21. Build the hero section with all sub-elements (4.2)
22. Test hero section in isolation: desktop, mobile, prefers-reduced-motion

**Deploy. Show me the hero. This is the make-or-break section.**

23. Build the Proof section (4.3) with the looping faux chat preview
24. Build the What Mirror Is section (4.4)
25. Build the Who It's For section (4.5)
26. Build the Tiers Preview section (4.6)
27. Build the Methodology Preview section (4.7) with the dot animation along the connector
28. Build the FAQ Accordion section (4.8)
29. Build the Final CTA section (4.9)
30. Wire all sections into `/app/page.tsx` with proper spacing

**Deploy the full homepage. Take screenshots on desktop and mobile. Run through the brand-guide.md anti-pattern list. Fix anything flagged. Show me before moving on.**

### Phase 5: /demo page

31. Build the demo page layout with top bar
32. Build the suggested questions sidebar
33. Build the chat interface (messages, input, thinking indicator)
34. Build the API route at `/app/api/mirror/route.ts` with Anthropic streaming integration
35. Wire prompts from `/lib/demo-mirror/prompts.ts` (use placeholder prompts for now, real prompts to be added later)
36. Implement rate limiting via localStorage
37. Implement the post-message-5 and post-message-10 CTAs
38. Test with several conversations end-to-end

**Deploy. Have me try the demo. Iterate on UI feel before locking.**

### Phase 6: /pricing, /method, /book

39. Build /pricing page with three full tier cards and comparison table
40. Build /method page with four detailed stage sections and connectors
41. Build /book page with Cal.com embed and "what to expect" section

**Deploy all three. Cross-link from homepage. Verify routing and transitions.**

### Phase 7: Legal and edge

42. Build /privacy and /terms with generated content
43. Build /manifesto placeholder
44. Build custom 404 page
45. Add OG images, favicon, meta tags for all routes
46. Generate sitemap.xml and robots.txt

### Phase 8: QA

47. Lighthouse audit on all pages, fix anything below 90
48. Test prefers-reduced-motion on every page
49. Test keyboard navigation through every interactive element
50. Test mobile on real iOS Safari and Android Chrome (not just Chrome devtools)
51. Test all Cal.com booking flow end-to-end (book a real test slot, cancel it)
52. Test demo Mirror with 10 different prompt types
53. Verify all internal links work
54. Verify external links open in new tab where appropriate (don't open external for nav, do open external for footer legal)

### Phase 9: Launch prep

55. Connect the production domain
56. Verify SSL
57. Set up redirects (www to apex, http to https)
58. Plausible analytics live
59. Resend transactional setup verified
60. Final lighthouse pass on production URL
61. Hand back to Richard for final approval

---

## Section 15 — Things You Are Allowed to Decide Without Asking

To prevent constant interruption, here are decisions you can make on your own (within brand guide constraints):

- Specific Tailwind class arrangements
- Component file naming within the /components/ structure
- Variable names in TypeScript
- Specific animation timing within the 600-800ms range
- Specific particle counts within stated ranges (e.g., 80-120)
- Minor spacing adjustments within the locked spacing scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192)
- Specific TypeScript types and interfaces
- Whether to extract a sub-component for reusability
- Internal API route structure for the demo
- Whether to use Next.js Server Components or Client Components for any given piece (default to Server unless interactivity is needed)

## Section 16 — Things You Must Ask Before Doing

- Adding any library not listed in 1.3
- Changing any locked color, font, or spacing value
- Modifying any locked copy from this document
- Deviating from the build sequence in Section 14
- Adding a section, page, or feature not in this document
- Removing a section, page, or feature listed in this document
- Substituting any of the visual references in 1.2 with a different inspiration
- Using any pattern from the anti-pattern list in brand-guide.md, even "just for this one case"

---

## Section 17 — How To Ask Me Questions

When you need clarification, structure questions like this:

```
QUESTION: [what you need to know]
CONTEXT: [why you're asking, what you're trying to do]
RECOMMENDATION: [your best guess at the answer, so I can just say "yes" if you're right]
ALTERNATIVES: [any other options you considered]
```

This format respects my time. A bad question is "what should the button color be?" A good question is:

```
QUESTION: For the disabled state of primary buttons, the brand guide doesn't specify a color.
CONTEXT: I'm building the Button primitive and need to handle the disabled state.
RECOMMENDATION: Use Smoke background, Ash text, no hover effect, cursor: not-allowed.
ALTERNATIVES: Could keep Signal background at 30% opacity, but that might look broken.
```

---

## Section 18 — Final Reminders

You are building a sales surface for a premium consulting offering. Every decision should be evaluated against this question: would a skeptical CFO at a $20M company look at this and think "these people are serious"?

If yes, ship it. If no, revise.

The brand guide is the constitution. This document is the construction plan. The Charter is the company's positioning. Read all three before each major section.

Speed matters tonight. Quality matters more. If you have to choose, choose quality. We can ship sections incrementally as long as what ships is excellent.

Now read /docs/01-company-charter.md, /docs/00-glossary.md, and /docs/02-brand-guide.md, then write your build plan to /PLAN.md and ask me to confirm before starting Phase 1.
