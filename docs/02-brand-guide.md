# 02 — Mirror Brand Guide

**Owner:** Richard
**Version:** v2
**Last updated:** 2026-04-27
**Status:** Locked. Visual changes require a Chair Brief.

**v2 changelog:** Repositioning per /docs/mirror-rebuild-brief-v2.md. §Application Examples updated to the v2 hero copy. §Forbidden Phrases expanded from five to nine. Visual system, color, typography, motion, components, and anti-patterns are unchanged from v1. v1 brand guide preserved at git commit 6a2ee19.

---

## The One-Sentence Aesthetic

Mirror looks like an intelligence agency that hires designers from Berlin.

That's the entire brief. If a design choice would feel at home inside Palantir, Linear, or Bloomberg Terminal but with one ounce of warmth and weirdness, it's right. If it would feel at home inside a generic SaaS template, agency portfolio, or "AI startup" Webflow site, it's wrong.

---

## The Conceptual Direction

**Aesthetic:** Surveillance-grade minimalism with one moment of strangeness per surface.

**Mood:** Slightly unnerving. Premium. Quiet. Confident. Watching.

**Differentiation:** Most AI startup sites in 2026 try to look friendly, soft, and approachable, with pastel gradients, rounded blob shapes, and Inter everywhere. Mirror does the opposite. We look like we know something you don't. We use sharp edges, cold colors, monospace headlines, and one signature "moment" per page that makes the visitor pause.

**The one thing visitors will remember:** The live Mirror. Talking to a clone of a customer they recognize. Everything else in the brand exists to set up that moment.

---

## Color System

### Primary Palette

| Role | Value | Use |
|---|---|---|
| **Void** | `#0A0A0B` | Primary background. Near-black with the faintest blue tint. Never pure black. |
| **Bone** | `#F4F2EE` | Primary text on Void. Warm off-white. Never pure white. |
| **Smoke** | `#1A1A1D` | Secondary surface (cards, sections). Slightly elevated from Void. |
| **Ash** | `#6B6B70` | Muted text, borders, captions. |

### The Signal (accent color, used sparingly)

| Role | Value | Use |
|---|---|---|
| **Signal** | `#00FF9D` | The one accent color. Acid green with a slight cyan lean. |

Signal is used for: links on hover, primary CTAs, the cursor on the hero animation, status indicators, the moment in any UI where Mirror is "thinking" or speaking. Used **sparingly.** If the page has more than 5% Signal coverage, you're using it wrong. It should feel like a flare in a dark room.

### Functional Colors

| Role | Value | Use |
|---|---|---|
| **Warning** | `#FFB000` | Amber. Used only in product UI. |
| **Error** | `#FF3B30` | Used only in product UI. |
| **Success** | `#00FF9D` | Same as Signal. Reuse, don't add a separate green. |

### What Not To Use

- No purple anywhere. No purple gradients especially.
- No pink anywhere.
- No teal-to-purple gradients (the most common AI slop signature).
- No multi-color gradients of any kind on backgrounds.
- No pastels.
- No #FFFFFF, no #000000. Always Bone and Void.

---

## Typography System

### Display (headlines, the brand voice in type form)

**Berkeley Mono** if budget allows ($75 license, worth it).
**JetBrains Mono** as the free fallback.

Used for: all headlines (h1, h2, h3), all numbers, all UI labels, all "moments" of typographic emphasis. Always tracked tight, sometimes set in all-caps for small labels.

### Body

**Söhne** if budget allows (premium).
**Geist** as the free fallback (free, made by Vercel, distinctive enough to not feel default).

**Never Inter.** Inter is the single most overused font in AI startup sites and instantly signals AI slop. Geist looks similar but reads as more deliberate.

Used for: all body copy, paragraph text, longer-form content.

### Type Scale (the locked sizes)

```
Display XL    72px / 0.95 line / -0.03em tracking    Berkeley Mono
Display L     56px / 1.0 / -0.02em                    Berkeley Mono
H1            44px / 1.05 / -0.02em                   Berkeley Mono
H2            32px / 1.1 / -0.01em                    Berkeley Mono
H3            22px / 1.3 / 0                          Berkeley Mono
Eyebrow       12px / 1 / 0.12em uppercase             Berkeley Mono
Body L        18px / 1.6 / 0                          Geist
Body          16px / 1.6 / 0                          Geist
Body S        14px / 1.5 / 0                          Geist
Caption       12px / 1.4 / 0                          Geist
```

### Typography Rules

- Headlines never wrap awkwardly. Manually break them with `<br>` if needed.
- Numbers in headlines (prices, stats) get extra emphasis: same size, slightly heavier weight.
- All-caps only at 12px (eyebrows, labels). Never headline-sized all caps, that's 2018 startup design.
- Mix of serif anywhere is forbidden. Mono + sans only.
- Italic is forbidden everywhere. Use weight or color for emphasis instead.

---

## Spacing and Layout

### The Grid

**12-column grid** at desktop, **4-column** at mobile, with **24px gutters** at desktop and **16px** at mobile.

**Max content width: 1280px.** Sections can break this for full-bleed moments but text always sits inside the max-width.

### Spacing Scale (multiples of 4px, locked)

```
4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192
```

No arbitrary values. If you need 20px, use 16 or 24. The discipline is what makes the site feel premium.

### Section Rhythm

Vertical padding between sections: **128px desktop, 64px mobile.**

This is generous. Resist the urge to compress. Whitespace is what separates Mirror from a busy AI startup template.

### The Asymmetry Rule

Every page must have at least one moment of intentional asymmetry. Examples: a headline that breaks the grid and bleeds into the margin. A sidebar that's offset by 100px from where you'd expect it. A photo or graphic that runs past the content edge. **Symmetry is comfort. Asymmetry is signal.**

---

## Iconography

**Lucide icons only.** Stroke weight: 1.5px. Size: 16px or 20px in body, 24px in feature contexts.

No custom illustrations. No 3D characters. No animated mascots. No emoji as UI elements. The product is the protagonist, not decoration.

---

## Imagery and Texture

### What we use

- **Grain overlay** on dark surfaces (subtle SVG noise texture, 2-3% opacity). This is what makes Void feel like film, not screen.
- **Data visualizations** rendered in our own typography and color (charts that look like Bloomberg Terminal, not Apple Numbers).
- **Live UI screenshots** of the Mirror product itself (eventually, when we have it).
- **The hero animation** (one per page max, see below).

### What we never use

- Stock photography of any kind. No people in headsets. No diverse smiling teams. No laptops on white desks. None of it.
- AI-generated imagery in the brand. Hard rule. (We're an AI company, generating our own brand images would be embarrassingly meta and would look generic.)
- Illustration packs (unDraw, Storyset, Blush). Instant credibility loss.
- Stock 3D characters (the Spline character library that every Webflow site uses).
- Floating laptop mockups.

---

## The Hero Moment

Every Mirror site page gets exactly one "hero moment", a single piece of motion or visual interest that makes the visitor pause. **One per page.** Not three. One.

**For the homepage:** A face, abstracted as data points, slowly resolving and dissolving in real-time. WebGL or canvas-based. Looks like a thermal imaging readout of a person who isn't quite there. The cursor disturbs the particles when it moves nearby.

**For the demo page:** The Mirror chat interface itself is the hero. No additional motion needed.

**For the pricing page:** The three tiers presented as physical objects, slightly rotating in space, like museum specimens.

**For the method page:** A live-drawing animation that traces the four-stage methodology (Ingest, Calibrate, Install, Operate) as connected nodes pulsing with data flow.

**For all other pages:** A single typographic moment. The headline animates in character-by-character. That's the hero. Less is more.

---

## Motion Language

### Principles

**Slow.** Mirror animations are deliberately slower than typical web animations. 600-800ms ease for most transitions, not 200-300ms. The brand should feel like it's taking its time, watching, then responding.

**Few.** One animated moment per fold. Not a cascade of micro-interactions. The site should feel like it's mostly still, with occasional intentional movement.

**Respond, don't perform.** Animations react to the user (hover, scroll, cursor proximity), they don't loop forever to grab attention.

### The Easing Curve

`cubic-bezier(0.16, 1, 0.3, 1)` for entrances. This is "ease-out-expo" feel, fast start, long graceful settle.

### Specific Animations

- **Scroll-triggered reveals:** 800ms, 60px slide-up + opacity 0 to 1, staggered 60ms between siblings.
- **Hover on cards:** 400ms, translateY -2px, border color shifts to Signal at 30% opacity.
- **Hover on buttons:** 300ms, background fills from left to right with Signal.
- **Hero animation:** continuous slow undulation, ~30fps cap to feel deliberate.
- **Page transitions:** 400ms fade through Void.

---

## Components

### Buttons

**Primary:** Signal background, Void text, Berkeley Mono, 14px, all-caps, 0.08em tracking, 16px vertical / 24px horizontal padding, no border-radius (sharp corners), hover: subtle Signal-bright glow.

**Secondary:** Transparent background, Bone text, 1px Bone border, otherwise identical to primary.

**Ghost:** No background, no border, Bone text with underline on hover in Signal.

No three-tier button hierarchy beyond this. No ghost-secondary-tertiary sprawl.

### Cards

Smoke background, 1px Ash border at 30% opacity, no border-radius (or very subtle 2px), 32px internal padding, no shadow (we don't use shadows, we use borders).

### Forms

Inputs: transparent background, 1px Ash bottom border only (no full border), Bone text, Signal underline on focus. Minimal, terminal-like.

### Navigation

Top nav: 64px tall, Void background with 1px Ash bottom border, logo left, 3-4 nav items right in Berkeley Mono 12px all-caps. CTA button at far right.

---

## Voice and Verbal Style

This section duplicates parts of the Glossary intentionally because designers will read this doc, not the Glossary.

### Tone

Confident. Cold. Brief. Slightly cryptic. We never explain too much. We let the product do the work. Think the way a senior intelligence officer would write a briefing, not the way a startup founder writes a pitch.

### Sentence Rhythm

Short sentences. Then occasionally a longer one that explains the consequence. Then short again. The rhythm itself signals confidence.

### The Nine Forbidden Phrases

The original five (locked at the company level since v1):

1. "AI-powered" (lazy, generic)
2. "Revolutionize" (empty)
3. "Game-changer" (cringe)
4. "Unlock" (overused)
5. "Leverage" as a verb (corporate slop)

Plus four added in v2 because they collapse the Decision Engine repositioning back into v1 metaphor or industry jargon:

6. "Clone of your customer" (the v1 metaphor; cut everywhere)
7. "Talk to your customer" (the v1 hero; replaced)
8. "Voice of customer" (industry jargon, generic)
9. "Customer insights" (vague, every research firm uses this)

### The Em Dash Rule

No em dashes. Ever. Use periods, commas, or colons. This is locked.

### Headline Style

Headlines are statements, not questions. They make a claim, then dare you to disagree. "Make every customer decision 30 minutes faster." Not "What if your team could decide faster?"

---

## Application Examples

### Homepage hero (locked structure, v2 form)

- Eyebrow: `MIRROR · DECISION ENGINE` in Berkeley Mono 12px all-caps, Signal-tinted
- Headline (three lines, Berkeley Mono Display XL Bone, manually broken):
  `Make every customer decision`
  `30 minutes faster.`
  `Without guessing.`
- Subhead (Body L, Geist, Bone at 70% opacity, max width 540px):
  `Mirror is a private decision engine for marketing teams. Pre-test your creative, brief your team, and ship campaigns with measurable confidence. Built on your data. Owned by you.`
- Two CTAs side by side: Primary `RUN A FREE PRE-TEST` and Secondary `BOOK A CALL`
- Below-CTAs caption (Berkeley Mono 12px caps, Ash): `USED BY MARKETING TEAMS AT COMPANIES BETWEEN $5M AND $200M.`
- Hero animation: the canvas particle field with cursor repulsion (current implementation; the brand guide §Hero Moment originally described a "resolving face" thermal-imaging variant that has not been built and is not on the v2 roadmap).

### Section header pattern

- Eyebrow (12px mono caps, Ash, Signal-tinted)
- Headline (H1 or H2, Bone)
- Subhead (Body L, Bone 70%)
- Content
- 128px space below

### "Mirror is thinking" indicator

A single Signal-colored dot that pulses at 1.2s interval. Used in the chat UI. This is a brand moment, not a generic loader.

---

## Anti-Patterns (the things we will never do)

This list exists because every one of these is a thing AI startup sites do that makes them look identical. We are explicitly not doing them.

1. Purple-to-pink gradient hero backgrounds
2. Floating 3D blobs as decoration
3. Generic "AI brain" or "neural network" iconography
4. Carousel of customer logos with greyscale filter
5. "Trusted by" section with fake-looking logos
6. Animated number counters ("10,000+ users!")
7. Webflow's default scroll animations
8. Glassmorphism (frosted glass cards)
9. Hero image of a person at a laptop pointing at the screen
10. The phrase "We use AI to" anywhere
11. Multi-column "Features" grid with three icons and three paragraphs
12. Hero video of an abstract dashboard nobody can read
13. Testimonial cards with stock-photo headshots
14. "How it works" with three numbered steps and three big icons
15. Inter font for any reason
16. Pure white backgrounds anywhere
17. Bouncing arrow CTAs ("scroll down!")
18. Cookie banners that take up half the screen
19. "Powered by AI" badges
20. The exact railway.com layout (every AI startup is cloning it right now, including the video Richard sent)

---

## How to Use This Guide

When working with Claude Code or any designer:

1. Load this entire document into the conversation.
2. State the rule: "Read this brand guide before any design decision. If a choice you're about to make conflicts with this guide, stop and ask."
3. After any output, scan against the Anti-Patterns list. If any are present, the output is wrong.

The guide is meant to be restrictive. The restrictions are what create the brand. Loosening them produces generic output.
