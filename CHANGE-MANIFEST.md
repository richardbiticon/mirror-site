# Mirror v2 Change Manifest

**Author:** Claude Code (Phase 2)
**Date:** 2026-05-18
**Supersedes:** nothing (new artifact)
**Authority:** /docs/mirror-rebuild-brief-v2.md is the constitution. This manifest is descriptive, not prescriptive: when this document and the brief disagree, the brief wins.

This file is the read-only output of Phase 2. It walks every user-facing file in the current v1 codebase, records what is there now, what must change for v2, why, and which phase will handle it. It also lists drift risks (v1 language buried in places the phase scopes do not obviously touch) and the new files v2 will create.

No code changes were made in Phase 2. The next session executes Phase 3 with `/clear` first.

---

## 1. Reading guide

The manifest is split into four parts:

1. **The change table.** Every file with user-facing strings, grouped by the phase that touches it. For each file: what is there now (one line), what must change, why, and which phase owns the change.
2. **Drift risks.** Places where v1 language survives in a file the phase scope does not obviously touch, or in a file marked "same as v1" but containing copy that quietly contradicts the v2 repositioning.
3. **Scope discrepancies.** Real path-and-name mismatches between the brief's stated file scopes and what actually exists in the repo. Flagged so the executing session can resolve them at the start of the phase instead of mid-execution.
4. **New files v2 will create.** The full list, by phase.

Files with no user-facing strings (UI primitives, hooks, design tokens, the particle field, cursor) are excluded. They survive v2 unchanged unless a phase explicitly touches them.

---

## 2. The change table

Columns: **File · What's there now · What must change · Why · Phase**

### Phase 3: Homepage hero and opening fold

| File | What's there now | What must change | Why | Phase |
|---|---|---|---|---|
| `app/(marketing)/page.tsx` | Composes 8 home sections in v1 order. | No insertion in P3; this file is touched in P4 (insert Pre-Test feature), P12 (insert Outcomes), and possibly P3 if hero section is restructured. | Brief §Phase 3 lists this file for the "hero section block only," but the page only renders `<HeroSection />`; all hero copy is inside the component. No edit needed in P3 unless a wrapper changes. | 3 (touch is likely zero) |
| `components/home/hero-section.tsx` | Eyebrow `MIRROR / M1`. Subhead "Mirror builds you a private AI clone of your highest-value customer segment." CTAs `Try a live Mirror` and `Book a call`. Caption `CURRENTLY BUILDING MIRRORS FOR COMPANIES BETWEEN $5M AND $200M.` | Replace eyebrow with `MIRROR · DECISION ENGINE`. Replace subhead with v2 locked subhead ("a private decision engine for marketing teams..."). Replace CTAs with `RUN A FREE PRE-TEST` (primary, links to /pretest) and `BOOK A CALL`. Replace caption with `USED BY MARKETING TEAMS AT COMPANIES BETWEEN $5M AND $200M.` Pull copy from the new `/lib/copy/home.ts`. | The current hero leads with "clone of your highest-value customer segment" (banned phrase #6) and "Try a live Mirror." v2 leads with the Decision Engine repositioning and pushes Pre-Test as the primary verb. | 3 |
| `components/hero/headline.tsx` | Hardcoded `const LINES = ["Talk to your customer.", "Before you sell to them."]`. | Parameterize: accept `lines: readonly string[]` as a prop, default to the v2 three-line hero (`Make every customer decision`, `30 minutes faster.`, `Without guessing.`). Wrapping h1 stays the same; per-character stagger stays the same; reduced-motion handling stays the same. | The v1 headline contains banned phrase #7 ("Talk to your customer"). It is also wired directly into the component, so changing copy requires a code change every time. Parameterizing makes the component reusable for any future hero. | 3 |
| `components/home/proof-section.tsx` | Eyebrow `LIVE DEMO`. Headline "Talk to a Mirror right now." Subhead "We built a Mirror of a company you've heard of. Ask it about pricing, objections..." Single CTA "Open the demo →". `ChatPreview` shows two v1-voiced exchanges ("Why did you cancel...", "What would have kept you..."). | Replace eyebrow with `LIVE`. Replace headline with `Test a real Mirror in 30 seconds.` Replace subhead with v2 locked subhead about Pre-Test + chat running on the same engine. Replace the single CTA with two side-by-side CTAs: `RUN A PRE-TEST` (links to /pretest) and `OPEN THE CHAT DEMO` (links to /demo). The `ChatPreview` static exchanges should be reframed to read as a Decision Engine moment, not a "tell me how your customer feels" moment, OR replaced with a Pre-Test-shaped preview. **Open question for Richard.** | The current section leads with the chat as the only product surface. v2 sells Pre-Test as the parallel and primary verb. The current `ChatPreview` exchanges ("we felt like a line item") read as v1 voice-of-customer; they survive but feel off-tone next to the new framing. | 3 |
| `lib/copy/home.ts` | Does not exist. | Create. Export named constants: `HERO_COPY`, `PROOF_COPY`. P4 will extend with `WHAT_MIRROR_IS_COPY`, `WHO_ITS_FOR_COPY`, `TIERS_PREVIEW_COPY`, `PRETEST_FEATURE_COPY`. P5 will extend with `METHODOLOGY_PREVIEW_COPY`, `FAQ_COPY`, `FINAL_CTA_COPY`. P12 will extend with `OUTCOMES_COPY`. | The brief calls for copy extracted to constants so all homepage rewrites in P3 to P12 happen in one file. Currently every homepage component holds its own strings, which is fine for a one-off but obstructs the v2 sweep. | 3 (created), 4 / 5 / 12 (extended) |

### Phase 4: Homepage middle sections

| File | What's there now | What must change | Why | Phase |
|---|---|---|---|---|
| `app/(marketing)/page.tsx` | Renders 8 components in this order: Hero, Proof, WhatMirrorIs, WhoItsFor, TiersPreview, MethodologyPreview, FAQ, FinalCTA. | Insert `<PretestFeatureSection />` between `<WhatMirrorIsSection />` and `<WhoItsForSection />` (i.e. 9 sections total after P4; 10 after P12 inserts Outcomes). | The Pre-Test feature is the v2 hero verb and earns its own section in the homepage flow. | 4 |
| `components/home/what-mirror-is-section.tsx` | Eyebrow `WHAT MIRROR IS`. Headline "Not a chatbot. Not a research firm. A new kind of asset." Body three paragraphs leading with "Mirror is a private AI clone of your best customer..." | Replace headline with `A decision engine, not a chatbot.` Replace body with the two locked v2 paragraphs ("Mirror is a private system that turns your customer data into faster, more confident marketing decisions..." + "You don't ask Mirror what your customer thinks. You ask Mirror what to ship."). Pull from `/lib/copy/home.ts`. | The current body opens with banned phrase #6 ("private AI clone of your best customer"). The current headline frames Mirror as a category absent ("not a chatbot, not a research firm") instead of a category present ("a decision engine"). v2 names the thing. | 4 |
| `components/home/pretest-feature-section.tsx` | Does not exist. | Create. Eyebrow `THE NEW VERB`. Headline `Pre-test your creative before you spend a dollar.` Body two paragraphs (locked). Two CTAs: `RUN A PRE-TEST NOW` (primary, to /pretest) and `SEE HOW IT WORKS →` (secondary, to /method#pretest; the anchor target is added in P7). | This is the v2 "pays for the retainer in week one" section. It does not exist in v1 because Pre-Test does not exist in v1. | 4 (new) |
| `components/home/who-its-for-section.tsx` | Eyebrow `WHO MIRROR IS FOR`. Headline "If three of these are true, we should talk." Checklist of 5 items. CTA `Check your fit in a 20-min call`. | Headline becomes two-line: `If three of these are true, / we should talk.` Replace checklist items 3 and 4 with sharper v2 form: "Your team makes 30+ customer decisions a week, mostly by guessing." and "You've outgrown surveys and quarterly research." Items 1, 2, 5 stay materially the same (v2 brief restates them with negligible wording shifts). CTA copy stays. | The v2 checklist replaces vague "decisions feel like guesses" and "focus groups" with falsifiable counts (30+ decisions a week) and a sharper category (quarterly research). The headline gets a hard line break to land the rhythm. | 4 |
| `components/home/tiers-preview-section.tsx` | Three tier cards with v1 descriptions, inclusions, and prices. Mirror/Install carries "MOST CHOSEN" eyebrow. | Replace each tier's `description` and `inclusions` with v2 locked copy (Brief §Phase 4, Tiers preview section). Notable shifts: Mirror/Recon inclusions add "Refund if you don't get 3 specific 30%+ improvement decisions" (replacing the soft "Full refund if you don't get 3 actionable insights"). Mirror/Install inclusions add "Pre-Test feature unlimited for your team" and replace the soft guarantee line with "90-day measurable-outcome guarantee or 3 months free." Mirror/Operate inclusions add "Daily Pre-Test runs across all your campaigns." | The v1 cards sell the chat. v2 cards sell decisions with measurable guarantees and surface Pre-Test inside every tier. | 4 |

### Phase 5: Homepage closing sections

| File | What's there now | What must change | Why | Phase |
|---|---|---|---|---|
| `components/home/methodology-preview-section.tsx` | Eyebrow `THE METHOD`. Headline "Four stages. Sixty days. One Mirror." Four stage cards with v1 one-liners. CTA `See the full method →`. | Headline becomes `Four stages. Sixty days. One decision engine.` Stage one-liners shift (per Brief §Phase 5): INGEST gains "support tickets, plus 8 customer interviews"; CALIBRATE becomes "We build the multi-persona model that powers every Mirror decision"; INSTALL keeps the deployment line but stays; OPERATE becomes "We retrain weekly. Your team Pre-Tests daily. The asset compounds." CTA stays. | "One Mirror" reads as a chat. "One decision engine" lands the v2 thesis. OPERATE one-liner is the only one that adds Pre-Test as the user-facing verb. | 5 |
| `components/home/faq-section.tsx` | 8 Q&A entries with v1 voice ("Mirror is calibrated on your CRM...with multi-persona voting and weekly retraining"). Headline "The questions you're already asking." | Replace all 8 answers with v2 locked copy (Brief §Phase 5, FAQ section). Two questions change as well: "How long does a Mirror stay accurate?" is replaced by "How does Pre-Test actually work?" (Q2) and "How do I know it's accurate?" (Q5). "What if we don't have clean customer data?" is replaced by "What does the guarantee actually cover?" (Q8). Eyebrow `OBJECTIONS, ANSWERED` and headline both stay. | The current FAQ defends the chat as the product. v2 FAQ defends the decision engine, names Pre-Test explicitly, and tightens the guarantee question to match the new pricing page. | 5 |
| `components/home/final-cta-section.tsx` | Three-line headline "The next 20 minutes / could change / how you sell." CTA `Book your diagnostic call`. Caption stays. | Replace last line of headline with `how your team ships.` Other lines and CTA stay. | "How you sell" is founder voice. "How your team ships" is the buyer's verb (the marketing team's verb), which is the v2 voice. | 5 |
| `components/shared/final-cta.tsx` | Already parameterized via `headlineLines`, `ctaLabel`, `caption`. No copy of its own. | No change. Already accepts the v2 lines passed in from the home, pricing, and method final-CTA wrappers. | This component was built for exactly this use case in v1. v2 inherits it. | not touched |

### Phase 6: Pricing page rebuild

| File | What's there now | What must change | Why | Phase |
|---|---|---|---|---|
| `app/(marketing)/pricing/page.tsx` | Page header eyebrow `PRICING`, headline "Three ways to install a Mirror.", subhead "From a 14-day diagnostic to a fully operated growth function. Every Mirror is built for one company. Yours." Three tier cards. Comparison header `COMPARE THE TIERS` / `Side by side.` FAQ header `PRICING QUESTIONS` / `The questions about money.` Final CTA. | Replace headline with `Three ways to install your decision engine.` Replace subhead with `From a 14-day diagnostic to a fully operated decision engine. Every Mirror is built for one company. Yours.` (one word change, "growth function" to "decision engine"). Update the page `metadata.description` accordingly. Comparison and FAQ headers stay. Final CTA already gets v2 copy via `<FinalCTA>` props. | "Growth function" is the v1 way to describe Operate. v2 reframes everything as "decision engine." | 6 |
| `components/pricing/pricing-data.ts` | `PRICING_TIERS` with v1 inclusion lists, soft guarantee strings ("If you don't surface at least 3 actionable insights..."), and `bestFor` text containing banned phrase #8 ("voice-of-customer asset") in both Install and Operate entries. `COMPARISON_ROWS` with 12 rows. `PRICING_FAQS` with 6 v1 answers, all `locked: false`. | Replace each tier's `whatsIncluded`, `whatsNotIncluded`, `bestFor`, and `guarantee` with v2 locked copy (Brief §Phase 6, Three full tier cards). Replace each tier's `bestFor` to remove "voice-of-customer asset" (banned phrase #8). Add a per-tier `measurableOutcome` field with the locked language (this is the new "MEASURABLE OUTCOME" block per Brief §Phase 6). Update `PricingTier` interface to include `measurableOutcome: string`. Add two new rows to `COMPARISON_ROWS`: "Pre-Test access" (Recon: 10 included; Install: Unlimited; Operate: Daily by Mirror team) and "Measurable outcome guarantee" (✓ for all three). The current `boolean` cell shape doesn't accommodate string values; the `ComparisonRow` shape needs widening to support string-valued cells, or the Pre-Test row needs a different rendering path. Replace `PRICING_FAQS` with the 6 v2 locked Q&As (Brief §Phase 6, Pricing FAQ). Set all 6 `locked: true`. | The current pricing-data file is the single largest carrier of v1 language. The guarantees are soft. "Voice-of-customer asset" is a banned phrase. The FAQs are explicitly placeholder. The MEASURABLE OUTCOME block is new. The Pre-Test row in the comparison table requires extending the data shape. | 6 |
| `components/pricing/pricing-tier-card.tsx` | Renders name, price, duration, included list, not-included list, `bestFor`, `guarantee`, and a `startLabel` button. | Add a "MEASURABLE OUTCOME" block at the bottom of the card, rendering the new `tier.measurableOutcome` field with the same eyebrow + body shape as the existing `GUARANTEE` block. Order: WHAT'S INCLUDED → NOT INCLUDED → BEST FOR → THE GUARANTEE → MEASURABLE OUTCOME → CTA. Update the import to include the new field. | The brief calls out a new MEASURABLE OUTCOME block on every tier card. This is a small additive change but it changes the card's visual rhythm: confirm with Richard that GUARANTEE and MEASURABLE OUTCOME both render or whether MEASURABLE OUTCOME replaces GUARANTEE. **Open question.** | 6 |
| `components/pricing/comparison-table.tsx` | Renders `COMPARISON_ROWS` as a real `<table>` with check / dash cells. All cells are boolean. | If `ComparisonRow` widens to support string-valued cells (for the "Pre-Test access" row), update the `Cell` component to render a string when one is present, otherwise the existing check/dash. Header row stays. | The new Pre-Test access row contains "10 included", "Unlimited", "Daily by Mirror team" instead of a boolean. The cell shape needs to accept either. | 6 |
| `components/pricing/pricing-faq.tsx` | Renders `PRICING_FAQS` array. No copy of its own. | No change. Already reads from the data file. | The data file rewrite carries the FAQ content. | not touched |

### Phase 7: Method page reframe

| File | What's there now | What must change | Why | Phase |
|---|---|---|---|---|
| `app/(marketing)/method/page.tsx` | Page header headline "How a Mirror gets built." Subhead "Four stages. Sixty days. One asset that compounds." Four stages defined inline in a `STAGES` const, each with `description`, `whatWeDo`, `whatYouGet`. Final CTA with `["See the method", "work on", "your data."]`. | Replace headline with `How Mirror builds your decision engine.` Replace subhead with `Four stages. Sixty days. One asset that compounds and pre-tests every decision your team makes.` Replace each stage's `description`, `whatWeDo`, `whatYouGet` with v2 locked content (Brief §Phase 7, Four stages rewritten). Notable v2 additions: stage 02 CALIBRATE gains "Pre-Test scoring model calibrated against your historical campaign performance" in whatWeDo and "Pre-Test baseline scoring methodology" in whatYouGet. Stage 03 INSTALL gains "Pre-Test feature deployment with unlimited team access" in whatWeDo and "A live, branded Mirror interface with chat and Pre-Test" in whatYouGet. Stage 04 OPERATE gains "Pre-Test prediction vs. actual performance tracking" in whatWeDo and "A Weekly Mirror Report with prediction accuracy data" in whatYouGet. Stage descriptions reframed to lead with decisions, not personas. Final CTA headline becomes `["See your decision engine", "scored against", "your data."]`. Update `metadata.description` accordingly. | The current method page describes a customer-research engagement. v2 describes a decision-engine build with Pre-Test integrated into every stage past Ingest. The CALIBRATE description in particular currently says "personas debate, vote, and converge on every Mirror response" which is the chat framing; v2 says "every decision." | 7 |
| `components/method/stage-section.tsx` | Renders one stage: number, name, range, description, whatWeDo, whatYouGet, horizontal rule. No copy of its own. | No change. | Component already supports the v2 stage shape. | not touched |
| `components/method/vertical-stage-connector.tsx` | The vertical dotted line + traveling Signal dot between stages. No copy. | No change. | Visual primitive. | not touched |
| Anchor target for `/method#pretest` | Not present. | The P4 Pre-Test feature section CTA links to `/method#pretest`. The method page needs an element with `id="pretest"` somewhere coherent (e.g. on Stage 02 CALIBRATE or Stage 03 INSTALL, whichever introduces Pre-Test first). | The cross-link from the homepage Pre-Test section into the method page only works if the anchor exists. Brief §Phase 4 explicitly notes "will be added in Phase 7." Confirm placement with Richard if unclear. **Open question.** | 7 |

### Phase 8: Demo page reframe

| File | What's there now | What must change | Why | Phase |
|---|---|---|---|---|
| `app/demo/page.tsx` | Renders `<DemoShell />`. Metadata: title "Demo", description "Talk to a Mirror right now. Calibrated on real data. The answers will surprise you." | Update `metadata.description` to a v2-voiced one-liner that does not contain "Talk to a Mirror" (banned phrase #7). Suggested: "Pre-test a real piece of copy, or chat with a calibrated Mirror. Both run on the same engine." (final wording to be confirmed in P8). | The current description leads with "Talk to a Mirror" which is the v1 hero phrase repurposed. v2 description should mirror the new framing on the demo page itself. | 8 |
| `components/demo/demo-shell.tsx` | Just composes TopBar + Chat. No copy. | No change. | Pass-through. | not touched |
| `components/demo/top-bar.tsx` | Left: `MIRROR / DEMO`. Center status: thinking dot + `ONLINE · MULTI-PERSONA · CALIBRATED ON {n} DATA POINTS`. Right: `Book a call` button. | Left stays. Center status stays. Right: add a new secondary button before "Book a call": `TRY PRE-TEST INSTEAD →` (links to /pretest). The brief specifies a two-button right side. The current `Link`-as-button approach is fine; add a second ghost-styled link. | The brief positions Pre-Test as the parallel demo path. The top bar surfaces both. | 8 |
| `components/demo/chat.tsx` | Contains the EmptyState, the streaming chat loop, the SoftLimitPrompt (at message 5), and the HardLimitPanel (at message 10). EmptyState body: "Ask anything. The Mirror is calibrated on {n} data points from this brand's customers." SoftLimitPrompt: "ENJOYING THIS? BOOK A CALL TO SEE YOUR OWN MIRROR." HardLimitPanel: "DEMO LIMIT REACHED. BOOK A CALL TO CONTINUE." | EmptyState eyebrow becomes `MIRROR · DEMO CHAT · READY`. EmptyState body becomes the v2 locked copy: "Ask anything. The Mirror is calibrated on 1,243 data points from a brand you'd recognize." Add a second body line in Ash: "Or run a Pre-Test on a real piece of copy →" (link to /pretest). Replace SoftLimitPrompt text with `ENJOYING THIS? PRE-TEST A REAL PIECE OF COPY.` and button `OPEN PRE-TEST →`. Replace HardLimitPanel text with `DEMO LIMIT REACHED. PRE-TEST A REAL PIECE OF COPY OR BOOK A CALL.` and two buttons: `OPEN PRE-TEST →` and `BOOK A CALL`. **Scope note:** Brief §Phase 8 explicitly says don't touch chat logic and lists only `chat-interface.tsx`, `chat-message.tsx`, `chat-input.tsx` as out of scope. The SoftLimitPrompt and HardLimitPanel functions live inside `chat.tsx` itself (which the brief refers to under the wrong filename); the edits are copy-only but touch the file. **Confirm with Richard at P8 start that the file is in scope for copy-only edits.** | The whole point of P8 is to reframe the chat as one of two demo paths and surface Pre-Test as the other. The soft and hard limits currently push the visitor to "book a call to see your own Mirror"; v2 pushes them to Pre-Test first, book second. | 8 |
| `components/demo/suggested-questions.tsx` | Renders `SUGGESTED_QUESTIONS` from `lib/demo-mirror/prompts.ts` (6 v1 questions). Sidebar caption: "THIS IS A DEMO MIRROR BUILT FROM PUBLIC DATA. YOUR MIRROR WILL BE 10X SHARPER." | Sidebar caption becomes: "THIS IS A DEMO MIRROR BUILT FROM PUBLIC DATA. YOUR MIRROR WILL BE 10X SHARPER AND PRE-TEST EVERY DECISION YOUR TEAM MAKES." Below that, a new ghost CTA: `RUN A PRE-TEST →` (links to /pretest). The mobile horizontal-scroll layout needs the same caption update; currently it has no caption in the mobile branch, so add one. | The v2 caption ties the demo to the broader Decision Engine value, and the new CTA gives the visitor a parallel path. | 8 |
| `lib/demo-mirror/prompts.ts` | Exports `DEMO_BRAND`, `SYSTEM_PROMPT`, `DEMO_CONFIG`, `SUGGESTED_QUESTIONS`. `SUGGESTED_QUESTIONS` contains 6 v1 entries ("Why do customers choose you over the alternative?" etc.). | Replace `SUGGESTED_QUESTIONS` with the 6 v2 locked questions (Brief §Phase 8, Suggested questions: "What ad copy would convert your best customer this quarter?" through "What landing page copy would your skeptics click on?"). Leave `DEMO_BRAND`, `SYSTEM_PROMPT`, and `DEMO_CONFIG` untouched (Brief §Phase 8 excludes the chat logic / API, and `SYSTEM_PROMPT` is not visible to users so banned-phrase rules don't apply directly; see Drift Risks for the nuance). | The v1 suggested questions ask "what would customers do." v2 questions ask "what should we ship." Lead with verbs, not nouns. | 8 |

### Phase 9: Pre-Test feature scaffold + nav update

| File | What's there now | What must change | Why | Phase |
|---|---|---|---|---|
| `components/layout/nav.tsx` | Desktop nav items: DEMO, METHOD, PRICING (in that order). Plus "Book a call" CTA. Mobile overlay matches. | Insert PRE-TEST as the fourth item (between DEMO and METHOD, or between PRICING and the Book a call CTA — confirm placement). The brief calls it "a fourth nav item" but doesn't specify order. **Recommended:** PRE-TEST, DEMO, METHOD, PRICING (Pre-Test first because it's the new v2 hero verb). **Open question for Richard.** Update both desktop and mobile overlay. | The /pretest route is created in P9 and the nav must point to it. | 9 |
| `app/sitemap.ts` | 7 routes (/, /method, /pricing, /book, /manifesto, /privacy, /terms). | Add `/pretest` with priority 0.9 (same as /method, /pricing, /book). The brief doesn't explicitly call this out in P9, but it's the obvious place; if missed it gets caught in P13. | The new public route needs to be in the sitemap for SEO. | 9 (or 13 fallback) |
| `app/(marketing)/pretest/page.tsx` | Does not exist. | Create per Brief §Phase 9, Page structure. Server Component (no interactivity at the page level; the form is its own Client Component). Locked copy throughout. Pulls form, empty state, results, history list, and the bottom CTA from the new components. | The Pre-Test feature lives here. P9 scaffolds, P10 wires the form to the API, P11 builds out the results UI. | 9 (new) |
| `components/pretest/pretest-empty-state.tsx`, `pretest-input-form.tsx`, `pretest-results.tsx`, `lib/pretest/types.ts` | Do not exist. | Create. Scaffolds only; the form's submit handler is a placeholder click handler, the results component renders nothing by default. Types define the input shape and the result shape (locked schema from Brief §Phase 10). | P9 is structural. The brief explicitly defers logic to P10 and P11. | 9 (new) |

### Phase 10: Pre-Test API + form wiring

| File | What's there now | What must change | Why | Phase |
|---|---|---|---|---|
| `app/api/pretest/route.ts`, `lib/pretest/client.ts`, `lib/pretest/prompts.ts`, `components/pretest/pretest-thinking.tsx` | Do not exist. | Create. The API stubs a structured placeholder JSON response (Brief §Phase 10 locked schema). The client wraps fetch with SSE streaming or fetch-and-parse (Brief is agnostic, but the chat uses SSE; recommend the same pattern for consistency). The form submits, transitions to a thinking state, and pipes the JSON into the results component. | Wires the form so submit produces a real (placeholder) response by P10 end. | 10 (new) |
| `components/pretest/pretest-input-form.tsx` | (Will be the P9 placeholder.) | Real implementation: textarea, type dropdown, submit button, validation (don't submit if empty), submit handler that calls the new client, button transitions to `ANALYZING…` + thinking indicator. | P10 turns the scaffold into a working form. | 10 |
| `components/pretest/pretest-results.tsx` | (Will be the P9 placeholder.) | Show "analyzing" state when the form is in flight. Render the placeholder JSON in the existing scaffolded layout. Full results UI ships in P11. | P10 plumbs the data through; P11 polishes the rendering. | 10 |

### Phase 11: Pre-Test results + export + rate limiting

| File | What's there now | What must change | Why | Phase |
|---|---|---|---|---|
| `components/pretest/pretest-score-display.tsx`, `pretest-persona-reactions.tsx`, `pretest-sharpest-objection.tsx`, `pretest-suggested-edits.tsx`, `pretest-export-button.tsx`, `lib/pretest/export-pdf.ts` | Do not exist. | Create. Render the full results layout per Brief §Phase 11 spec. Export-as-brief generates a PDF via @react-pdf/renderer (or jsPDF fallback). | P11 ships the feature end to end. | 11 (new) |
| `components/pretest/pretest-results.tsx` | (Will be the P10 wiring.) | Compose the new score / persona / objection / edits / export components into the final layout. | P11 finalizes. | 11 |
| `lib/pretest/prompts.ts` | (Will be the P10 placeholder.) | Replace with the real Pre-Test system prompt. Reads from the Liquid Death personas (or the placeholders in `lib/demo-mirror/personas.ts` for v1 public demo). Returns strict JSON. | P11 wires the real model call. | 11 |
| `app/api/pretest/route.ts` | (Will be the P10 placeholder.) | Call the real prompt when `ANTHROPIC_API_KEY` is set; fall back to placeholder when not. | Same fallback pattern as the chat API. | 11 |
| Rate limiting | Does not exist. | Add localStorage-based limiter on the Pre-Test page: 5 per session, then soft wall. Similar pattern to the chat's existing `useLocalStorageNumber("mirror.demo.count")`. New key: `mirror.pretest.count`. | The brief locks this at 5 per session (Richard's PLAN.md Q14 override of the brief's original 3). | 11 |
| New dependency: `@react-pdf/renderer` | Not installed. | Install. **Phase 11 must ask Richard before adding the dependency per the brief's "decisions you must ask" rule.** PLAN.md already pre-approved this; confirm at P11 start. | PDF generation needs a renderer. jsPDF is the fallback. | 11 |

### Phase 12: Outcomes section

| File | What's there now | What must change | Why | Phase |
|---|---|---|---|---|
| `app/(marketing)/page.tsx` | After P4: Hero, Proof, WhatMirrorIs, PretestFeature, WhoItsFor, TiersPreview, MethodologyPreview, FAQ, FinalCTA. | Insert `<OutcomesSection />` between `<PretestFeatureSection />` and `<WhoItsForSection />`. Final order: Hero, Proof, WhatMirrorIs, PretestFeature, Outcomes, WhoItsFor, TiersPreview, MethodologyPreview, FAQ, FinalCTA. 10 sections. | The Outcomes section lands the four locked outcomes immediately after the Pre-Test verb. | 12 |
| `components/home/outcomes-section.tsx` | Does not exist. | Create. Four cards in 2x2 desktop / stacked mobile. Each card: large numeric value (Display L mono), metric name (Signal eyebrow caps), one-sentence description. Footnote: `TARGETS ENGINEERED INTO MIRROR'S METHODOLOGY. ACTUAL RESULTS REPORTED PER ENGAGEMENT STARTING Q3 2026.` | This is the new section that makes the four locked outcomes visible on the homepage. The honest footnote replaces the original brief's stronger numbers per Richard's PLAN.md Q12. | 12 (new) |

### Phase 13: QA pass + launch

| File | What's there now | What must change | Why | Phase |
|---|---|---|---|---|
| `app/layout.tsx` | `metadata.description`: "Mirror builds you a private AI clone of your best customer, so you can sell to them before you sell to anyone else." | Replace with a v2 site-level description. Suggested: "Mirror is a private decision engine for marketing teams. Pre-test your creative, brief your team, and ship campaigns with measurable confidence." Final wording confirmed in P13. | The root metadata description appears in search results and social previews on routes that don't define their own. It is currently pure v1 (contains banned phrases #6 and #7). | 13 |
| `app/opengraph-image.tsx` | Renders "Talk to your customer. / Before you sell to them." with the strapline "Mirror builds you a private AI clone of your best customer." | Replace the headline lines with the v2 hero headline or a shortened OG-friendly version. Replace the strapline with the v2 site description. Update the `alt` text accordingly. | The OG image is the site's social card. Currently it ships v1 hero copy verbatim. Two banned phrases. | 13 |
| `app/demo/page.tsx` metadata | (Already flagged for P8 above.) | (Either P8 or P13 catches it.) | Same reason as `app/layout.tsx`. | 8 (primary) / 13 (fallback) |
| `components/home/proof-section.tsx` `ChatPreview` exchanges | Two v1-voiced exchanges hardcoded inside the component. | If P3 doesn't replace them, P13 should reframe to read as a Decision Engine moment, or excise the preview entirely if the new Proof section sells the parallel demo path well enough without the inline chat snippet. **Open question for P3 and again for P13.** | The exchanges sell the chat as the only product surface. v2 may want to swap one for a Pre-Test-shaped snippet. | 3 (primary) / 13 (fallback) |
| `app/(marketing)/book/page.tsx` and `components/book/what-to-expect.tsx` | Book page metadata description says "show you a live demo." `WhatToExpect` item 2: "We show you a live Mirror of a recognizable brand." | Reframe item 2 to acknowledge both paths: e.g. "We show you a live Mirror and run a Pre-Test against your own copy." or similar. The brief marks /book "same as v1" in the site structure, but item 2's "live demo" language is now stale. **Recommended:** P13 catches this with a one-line edit, since /book is not in any earlier phase scope. **Open question for Richard.** | The Diagnostic Call promise now includes Pre-Test, and the page should set that expectation. | 13 |
| Privacy / Terms / Manifesto | All placeholder. No v1 banned-phrase leakage. | No change in v2 unless P13 catches something. | These are flagged as "Same as v1" in Brief §6 Site Structure. | not touched |
| `app/(marketing)/manifesto/page.tsx` | Placeholder "Coming soon" page. | No change. | "Same as v1." | not touched |
| `app/dev/page.tsx` | Internal QA reference; renders the type-scale sample using the literal "Talk to your customer." (the v1 hero line, used as familiar reference text). | Update the sample string in P13 to use a v2 line, or leave (this page is `robots: { index: false, follow: false }` and is not in the public sitemap). **Recommendation:** update for consistency, very low priority. | Internal-only, but a passing visual reference for the team. | 13 (optional) |
| `lib/demo-mirror/prompts.ts` `SYSTEM_PROMPT` | Contains "You are a Mirror, a private AI clone of a company's highest-value customer segment." | Strictly speaking, this is a system prompt sent to the model and not visible to visitors. The banned-phrase rule from Brief §3 applies to copy on the site. However the spirit of the v2 repositioning suggests reframing to "decision engine" language too, so the model's voice aligns with the visible product. **Open question for P13:** does Richard want the system prompt aligned with the v2 brand, even though it's invisible? Recommended: yes, one-line rewrite. | The system prompt shapes how the chat answers. If it tells the model "you are a private AI clone," the chat may keep producing v1-voiced answers. | 13 (recommended) |
| `components/layout/footer.tsx` | Footer brand mark says `MIRROR/M1 ONLINE`. | No change. "M1" is a brand identifier; the brief doesn't replace it with a v2 equivalent (no "M2" mentioned). | Brand mark, not v1 copy. | not touched |
| `components/demo/top-bar.tsx` after P8 | (Will have v2 right-side buttons.) | Confirm in P13 that the brand mark left side still reads `MIRROR / DEMO` (or whatever P8 lands on); the v2 brief shows `MIRROR · DEMO CHAT` with a middle dot, not a slash. **Open question for P8:** dot vs slash. | Visual consistency. | 8 (primary) / 13 (fallback) |
| `V2-LAUNCH-REPORT.md` | Does not exist. | Create per Brief §Phase 13 spec. 10-item launch readiness report. | This is the P13 deliverable. | 13 (new) |

### Files with no v2 changes (mostly infrastructure)

These survive untouched unless P13 catches drift. Listed for completeness.

| File | Reason untouched |
|---|---|
| `components/ui/accordion.tsx`, `button.tsx`, `card.tsx`, `container.tsx`, `dialog.tsx`, `input.tsx`, `reveal.tsx`, `scroll-headline.tsx`, `section.tsx` | UI primitives. No copy beyond aria-labels ("Close") and class strings. |
| `components/hero/particle-field.tsx`, `custom-cursor.tsx` | Visual primitives. No copy. |
| `components/home/stage-connector.tsx`, `components/method/stage-section.tsx`, `vertical-stage-connector.tsx` | Visual primitives or pure renderers of data. Stage-section's data comes from the method page const, which P7 rewrites. |
| `components/layout/coming-soon.tsx` | Generic placeholder shell. Currently unused by any route (manifesto, privacy, terms each render their own); v2 doesn't add a new route that needs it. |
| `components/legal/legal-page.tsx` | Shell for /privacy and /terms. No copy of its own. |
| `components/demo/chat-input.tsx`, `message.tsx`, `data-counter.tsx`, `thinking-indicator.tsx` | Chat logic and visual primitives. Brief §Phase 8 explicitly excludes these. |
| `lib/demo-mirror/personas.ts`, `stream.ts` | Backend prompt scaffold and SSE stream parser. Brief §Phase 8 excludes. |
| `lib/design.ts`, `utils.ts`, `use-local-storage-number.ts` | Tokens and utilities. No copy. |
| `app/api/mirror/route.ts` | Chat API. Brief §Phase 8 excludes. |
| `app/icon.tsx` | Favicon. No copy. |
| `app/robots.ts`, `template.tsx` | Config / transitions. No copy. |
| `app/not-found.tsx` | 404 page with "This page doesn't exist." headline. No v1 banned phrases. Survives. |
| `app/(marketing)/privacy/page.tsx`, `terms/page.tsx`, `manifesto/page.tsx` | Placeholder legal + manifesto. Same as v1. |

---

## 3. Drift risks

Places where v1 language survives in files the phase scope does not obviously touch, or in files marked "same as v1" but containing copy that quietly contradicts the v2 repositioning. Numbered by descending severity.

1. **`app/layout.tsx` `metadata.description`.** Contains "Mirror builds you a private AI clone of your best customer, so you can sell to them before you sell to anyone else." Triggers banned phrases #6 ("clone of your customer") and #7 ("Talk to your customer" in spirit). This is the site-level description that appears in search results for pages without their own `metadata.description`. It is not in any P3-P12 scope. **P13 catches it; consider updating earlier.**

2. **`app/opengraph-image.tsx`.** Renders the v1 hero headline and the v1 strapline verbatim. The OG image is the social card visitors see when the site URL is shared. Same two banned phrases as #1. Not in any P3-P12 scope; **P13 catches it.**

3. **`app/demo/page.tsx` `metadata.description`.** Contains "Talk to a Mirror right now." Not in P8's stated scope (which is the demo *chrome*, not the route's metadata). **P8 should catch it; otherwise P13.**

4. **`lib/demo-mirror/prompts.ts` `SYSTEM_PROMPT`.** Contains "You are a Mirror, a private AI clone of a company's highest-value customer segment." This is sent to the model, not displayed to the user, so banned-phrase rules don't strictly apply. But the model's voice is shaped by this prompt; if the system prompt says "you are a clone," the chat will keep producing v1-voiced responses. **P13 should consider rewriting** even though Brief §Phase 8 excludes the prompts file.

5. **`components/home/proof-section.tsx` `ChatPreview` exchanges.** Two static exchanges hardcoded in the component. They read as voice-of-customer: "we felt like a line item, not a customer." P3 rewrites the section's eyebrow, headline, subhead, and CTAs but is ambiguous on whether the inline ChatPreview's content updates too. Brief §Phase 3 says "the Proof section" in scope; reasonable to read that as including the preview. **P3 should make a call; flag for Richard.**

6. **`components/pricing/pricing-data.ts` `bestFor` strings for Install and Operate.** Both use "voice-of-customer asset" (banned phrase #8). Install: "calibrated voice-of-customer asset they own outright." Operate: "owning the most calibrated voice-of-customer asset in their category." **P6 rewrites both as part of the tier card rebuild.** Listed here so P6 doesn't miss it inside the larger pricing rewrite.

7. **`components/method/page.tsx` Stage 02 CALIBRATE description.** Currently says "the personas debate, vote, and converge on every Mirror response." That's the chat framing. v2 reframes to "every decision." **P7 handles it as part of the stage rewrite; flagged here so the executor doesn't paste-replace and miss the verb shift.**

8. **`components/home/methodology-preview-section.tsx` headline.** "Four stages. Sixty days. One Mirror." reads as if the chat is the deliverable. v2 says "...one decision engine." **P5 handles it.**

9. **`components/book/what-to-expect.tsx` item 2.** "We show you a live Mirror of a recognizable brand." v2 broadens to include Pre-Test. Brief marks /book "same as v1" so this is technically out of scope, but the language now sells one of two demo paths. **P13 should catch it with a one-line edit.**

10. **`app/dev/page.tsx` type-scale sample.** Uses "Talk to your customer." as the literal reference string. Internal-only (`robots: { index: false, follow: false }`), so this is a low-priority hygiene fix. **P13 optional.**

11. **`components/demo/chat.tsx` `SoftLimitPrompt` and `HardLimitPanel`.** These are inside chat.tsx, which Brief §Phase 8 paints as "logic, don't touch." But the copy at message 5 and message 10 is explicitly listed for replacement in Brief §Phase 8. The file boundary doesn't match the scope boundary. **P8 must touch chat.tsx for copy-only edits;** flag at P8 start to confirm with Richard.

12. **Anchor target `/method#pretest`.** Referenced from the P4 Pre-Test section's secondary CTA. The anchor doesn't exist anywhere in `/method`. **P7 must add an `id="pretest"` element on the method page** when it adds Pre-Test references to CALIBRATE / INSTALL / OPERATE. If P7 misses it, the link 404s into a no-scroll behavior (the page loads, the anchor doesn't exist).

13. **Sitemap missing `/pretest`.** P9 creates the route. The brief doesn't explicitly call out the sitemap update in P9 scope, only in P13. **P9 should add it as part of the route creation; P13 catches as fallback.**

---

## 4. Scope discrepancies between the brief and the actual repo

These are real path-and-name mismatches. Surfacing them now means the executing session can resolve them at phase start instead of mid-execution.

1. **Phase 7 scope lists `/components/method/stage-connector.tsx`.** Actual file is `/components/method/vertical-stage-connector.tsx`. (There is a `stage-connector.tsx` but it lives under `/components/home/`, and it's the horizontal one used on the homepage methodology preview.) **P7 should treat `vertical-stage-connector.tsx` as the in-scope file; no changes expected to either connector since they're visual primitives.**

2. **Phase 6 scope lists `/lib/pricing-data.ts`.** Actual file is `/components/pricing/pricing-data.ts`. The path is wrong in the brief. **P6 should use the actual path.**

3. **Phase 8 scope lists `/components/demo/chat-interface.tsx`, `chat-message.tsx`, `chat-input.tsx` as out of scope.** Actual files are `chat.tsx` and `message.tsx` (chat-input.tsx exists with that name). The brief intended to fence off the chat logic, but it named files that don't exist. **The intent is clear: do not touch chat state, streaming, or the input wiring. Do touch copy.** The copy at empty state, soft limit (message 5), and hard limit (message 10) lives inside `chat.tsx` itself, so P8 must touch `chat.tsx` for copy-only edits despite the brief's filename list.

4. **Brief refers to `components/method/stage-connector.tsx` and `components/home/stage-connector.tsx` interchangeably in places.** The home one is `stage-connector.tsx` (horizontal). The method one is `vertical-stage-connector.tsx`. The brief is loose about this; the executor should look up actual filenames.

5. **No `lib/copy/` directory exists yet.** P3 creates `lib/copy/home.ts`. Make the directory in the same edit.

---

## 5. Open questions for Richard (to answer before / at the start of the phase)

Listed by phase. P3 is next.

**Before P3:**

- (Q1) `ChatPreview` exchanges in `proof-section.tsx`: do we (a) rewrite the two exchanges to read as a Decision Engine moment, (b) swap one exchange for a Pre-Test-shaped snippet (e.g. "score: 67 — sharpest objection: ..."), or (c) remove the inline preview entirely? Recommend (b) for the highest signal.

**Before P4:**

- (Q2) `WhoItsForSection` checklist: keep the v2 brief's exact phrasing ("Your team makes 30+ customer decisions a week, mostly by guessing.") or soften to match the v1 cadence? Recommend exact brief phrasing.

**Before P6:**

- (Q3) Pricing tier card: render both `GUARANTEE` and the new `MEASURABLE OUTCOME` blocks, or does MEASURABLE OUTCOME replace GUARANTEE? Brief §Phase 6 reads as if both are present. Recommend both.

**Before P7:**

- (Q4) `/method#pretest` anchor placement: on Stage 02 CALIBRATE (which trains the Pre-Test scoring model) or Stage 03 INSTALL (which deploys the Pre-Test feature)? Recommend CALIBRATE because it's where Pre-Test methodology is introduced.

**Before P8:**

- (Q5) Top bar brand mark: `MIRROR / DEMO CHAT` (slash, current v1 style) or `MIRROR · DEMO CHAT` (middle dot, the style the v2 brief writes)? Recommend middle dot for v2 consistency.
- (Q6) Confirm `chat.tsx` is in scope for copy-only edits to `SoftLimitPrompt` and `HardLimitPanel`. The brief's filename list excludes other chat files but doesn't explicitly include chat.tsx; the intent (replace soft/hard limit copy) requires touching it.

**Before P9:**

- (Q7) Nav order: PRE-TEST as the first item (before DEMO) or as the last item before "Book a call"? Recommend first.

**Before P13:**

- (Q8) Update `lib/demo-mirror/prompts.ts` `SYSTEM_PROMPT` to remove "private AI clone" language, even though it's never user-visible? Recommend yes.
- (Q9) Update `app/(marketing)/book/page.tsx` `WhatToExpect` item 2 to acknowledge both demo paths (chat + Pre-Test)? Recommend yes.

---

## 6. New files v2 will create

Listed by phase. Path conventions match the existing repo (`/components/` for React components, `/lib/` for utilities and types, `/app/api/` for route handlers).

**Phase 2 (this phase):**
- `/CHANGE-MANIFEST.md` (this file)

**Phase 3:**
- `/lib/copy/home.ts`

**Phase 4:**
- `/components/home/pretest-feature-section.tsx`

**Phase 9:**
- `/app/(marketing)/pretest/page.tsx`
- `/components/pretest/pretest-input-form.tsx` (scaffolded)
- `/components/pretest/pretest-results.tsx` (scaffolded)
- `/components/pretest/pretest-empty-state.tsx`
- `/lib/pretest/types.ts`

**Phase 10:**
- `/app/api/pretest/route.ts`
- `/lib/pretest/client.ts`
- `/lib/pretest/prompts.ts` (placeholder, real prompt in P11)
- `/components/pretest/pretest-thinking.tsx`

**Phase 11:**
- `/components/pretest/pretest-score-display.tsx`
- `/components/pretest/pretest-persona-reactions.tsx`
- `/components/pretest/pretest-sharpest-objection.tsx`
- `/components/pretest/pretest-suggested-edits.tsx`
- `/components/pretest/pretest-export-button.tsx`
- `/lib/pretest/export-pdf.ts`

**Phase 12:**
- `/components/home/outcomes-section.tsx`

**Phase 13:**
- `/V2-LAUNCH-REPORT.md`

Total new files: 17 (excluding this manifest and the launch report).

---

## 7. Summary

The v2 rebuild touches roughly 25 existing files for copy or structure changes and creates 17 new files. The majority of the work is copy replacement against locked text in the brief; the genuinely new code is the Pre-Test feature (P9-P11) and the Outcomes section (P12).

Three things to verify before P3 starts:

1. **Hero headline parameterization.** `headline.tsx` currently hardcodes the v1 lines. P3 must parameterize it or rewrite it. Either is fine; parameterizing is cleaner and lets future hero changes happen without a component edit. Recommend parameterize.

2. **`ChatPreview` exchanges in `proof-section.tsx`.** Open question 1 above. The cleanest v2 read is a Pre-Test-shaped preview, not a chat-shaped one.

3. **Scope discrepancies.** Section 4. None are blocking; they need a 30-second resolution at the start of each affected phase.

End of manifest. Stopping for Richard's review.
