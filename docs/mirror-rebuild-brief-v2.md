# Mirror — Master Rebuild Brief (V2 Repositioning)

**Project:** mirror-site
**Owner:** Richard
**Version:** v2 (repositioning rebuild)
**Status:** Active. This brief replaces all prior briefs for the v2 work.
**Reference docs (in /docs/):** 00-glossary.md, 01-company-charter.md, 02-brand-guide.md, mirror-website-build-brief.md (the v1 brief, now superseded for any conflicts), this file.

---

## How To Use This Document

This is the constitution for Mirror's repositioning rebuild. It contains a strategic frame, the new product spec, the operating rules, and a 13-phase execution sequence.

You will execute one phase per Claude Code session. After each phase you will deploy to Vercel preview, summarize what changed, and stop. Richard will approve. Before starting the next phase, Richard will run `/clear` and then point you at this file plus the specific phase number to execute.

Do not attempt to execute multiple phases in one session. Do not skip the stop-and-approve gate. Do not touch files outside the explicit scope of the current phase.

When in doubt, the priority order for resolving uncertainty is: this brief, then 02-brand-guide.md, then 01-company-charter.md, then ask Richard. Never invent a strategic, product, or visual decision.

---

# PART ONE — THE STRATEGIC FRAME

## 1. The Repositioning Thesis

Mirror v1 was sold as "a private AI clone of your customer." That framing is a metaphor and metaphors don't sell six-figure contracts to skeptical CFOs. The clone is how Mirror works under the hood. It is not what Mirror is.

Mirror v2 is repositioned as: **a Decision Engine for marketing teams.**

A Decision Engine is a system that turns customer data into faster, more confident, more measurable marketing decisions. The product still has personas, still has a chat interface, still has the multi-persona voting architecture. None of that disappears. What changes is the language, the proof, the guarantees, and the addition of one critical new feature (Pre-Test).

The v2 site sells outcomes. The chat is the visible part. The compounding asset, the measurable lift, the team velocity, those are the value.

## 2. The Four Locked Outcomes

Every Mirror engagement now promises four measurable outcomes. These appear on the homepage, the pricing page, every proposal, and every sales call. They are non-negotiable and must be falsifiable.

**Outcome 1: Faster Decisions.**
*Mirror compresses the average customer-related decision from 3-7 days to under 30 minutes.* Measured by: time from question raised to decision logged, tracked weekly during Operate engagements.

**Outcome 2: Cheaper Tests.**
*Mirror clients reduce wasted ad creative spend by 30-50% through pre-testing.* Measured by: percentage of pre-tested creatives that survive 7 days in market, compared to baseline.

**Outcome 3: Sharper Briefs.**
*Mirror briefs reduce campaign rework cycles by at least 40%.* Measured by: revision rounds per campaign before approval, tracked across the engagement.

**Outcome 4: Compounding Asset.**
*Every Mirror gets sharper from use. After 90 days, accuracy on held-out test scenarios improves by an average of 18%.* Measured by: monthly recalibration test scores.

These outcomes replace the vague "3 actionable insights" guarantee from v1. The guarantees are now tied to specific outcomes (see Section 4).

## 3. The Copy DNA

Every word on the v2 site obeys these rules.

**Lead with decisions, not personas.** The hero, every section header, every CTA, frames the value as "make better decisions about your customer," not "talk to a clone of your customer."

**Specific over abstract.** "Predict campaign performance within 15% accuracy" beats "get insight into your customer." Numbers wherever possible.

**The CFO test.** Every paragraph should pass this test: would a skeptical CFO reading this think "yes, that's a real number / a real outcome / a real cost saved"? If no, rewrite.

**The verb test.** Every section should make the buyer think "I could do X with this." Verbs over nouns. "Pre-test your creative" beats "creative pre-testing."

**The five forbidden phrases (locked from brand guide):**
1. "AI-powered"
2. "Revolutionize"
3. "Game-changer"
4. "Unlock"
5. "Leverage" as a verb

**Plus four new banned phrases for v2:**
6. "Clone of your customer" (the v1 metaphor; cut everywhere)
7. "Talk to your customer" (the v1 hero; replaced)
8. "Voice of customer" (industry jargon, generic)
9. "Customer insights" (vague, every research firm uses this)

**Em dash rule remains absolute.** Use periods, commas, or colons.

## 4. The New Guarantees

v1 guarantees were soft. v2 guarantees are concrete and tied to the four outcomes.

**Mirror/Recon guarantee:**
*If we don't deliver at least 3 specific decisions you can make this quarter with a 30%+ predicted improvement in outcome, full refund of $4,500.*

**Mirror/Install guarantee:**
*If by day 90 your team hasn't measurably improved on at least one of the four outcomes, we extend Operate at no charge until you do.*

(Note: v2 ships with this softer service-extension form per the Phase 1 PLAN.md Q11 decision. v2.1 will reintroduce a harder dollar-back form once at least one client cohort has validated the methodology against the four outcomes.)

**Mirror/Operate guarantee:**
*Quarterly KPI agreement set in writing at start of each quarter. If we miss the agreed KPIs, next quarter is at 50%. Two consecutive misses, full quarter refund and clean exit.*

These appear on the pricing page, in proposals, and in the FAQ.

## 5. The New Feature: Pre-Test

Mirror v2 adds one new product surface beyond the chat: **Pre-Test.**

**What it is:**
A standalone feature that lets a client paste a piece of marketing copy (ad, email subject line, landing page section, push notification, social post) and get back:
- Multi-persona reactions (the same sub-personas, reacting to the specific copy)
- A predicted-performance score with confidence range
- The single sharpest objection any persona raised
- Three specific suggested edits, ranked by predicted-impact

**Why it matters:**
Pre-Test transforms Mirror from a passive consultation tool into an active decision tool. It's the verb that closes deals on demos. A CMO seeing Pre-Test live will book the call. A CMO seeing only chat might not.

**Where it lives:**
- New top-level route: `/pretest`
- Linked from main navigation as a fourth nav item: `PRE-TEST`
- Linked from /demo page as "Try Pre-Test instead →" in the right rail
- Featured on homepage as its own section between "What Mirror is" and "Who it's for"

**The interface (high-level, full spec in Phase 9-11):**
- Single input box at top: "Paste your ad, email subject, landing page section, or push notification."
- One dropdown: copy type (Ad copy, Email subject, Landing page section, Push notification, Social post)
- Submit button: "Run Pre-Test"
- Results render below in a structured layout: Score (large), Confidence range, Persona Reactions (3-5), Sharpest Objection (1), Suggested Edits (3)
- "Export as brief" button below results, generates a downloadable PDF brief the client can send to their agency

**The prompt architecture (full spec in Phase 11):**
- Same multi-persona system as the chat demo, but with a different system prompt that asks personas to evaluate, score, and critique the input rather than respond conversationally
- Returns structured JSON (parsed and rendered, not streamed text)
- Uses the same Liquid Death personas for the public demo version
- For real client engagements (post-launch), Pre-Test runs on the client's calibrated personas

**The free tier (for the public demo):**
- 5 Pre-Tests per visitor per session (localStorage). v2 ships with 5; Richard's PLAN.md Q14 override of the original brief's 3.
- After 5, soft prompt to book a call
- Each Pre-Test logged for sales intelligence

## 6. The New Site Structure

Compared to v1, the v2 site adds one route and reframes existing routes. Nothing gets deleted.

```
/                  Homepage (reframed around Decision Engine + Pre-Test featured)
/demo              Live Mirror chat (reframed: "test the chat, then try Pre-Test")
/pretest           NEW: Pre-Test feature, public demo against Liquid Death personas
/method            Reframed: how Mirror builds your decision engine (4 stages stay)
/pricing           Rebuilt: new measurable guarantees, same three tiers
/book              Same as v1
/manifesto         Same as v1 (placeholder)
/privacy           Same as v1
/terms             Same as v1
/dev               Internal QA reference (untouched)
404                Same as v1
```

---

# PART TWO — OPERATING RULES

## 7. The Phase Execution Pattern

Every phase follows the same shape. Internalize it.

**At phase start:**
1. Read this brief (mirror-rebuild-brief-v2.md) and any docs explicitly listed in the phase scope.
2. Confirm with Richard which phase you are executing.
3. State: "Executing Phase N. Files in scope: [list]. Files NOT in scope: [implicit, everything else]. Estimated tokens: [number]. Beginning."
4. Execute the phase.

**At phase end:**
1. Run `npm run build` and confirm clean build.
2. Commit changes with a clean message (no em dashes, no AI signatures, no hyphens that should be colons).
3. Push to the branch.
4. Wait for Richard to deploy to Vercel preview.
5. Summarize what shipped: changed files, new components, new copy, any decisions you made within scope.
6. State explicitly: "Phase N complete. Stopping. Run /clear before starting Phase N+1."

**Between phases:**
Richard runs `/clear` in the Claude Code session. This wipes conversation history but preserves the CLAUDE.md and all repo files. Phase N+1 starts fresh, reads only the docs it needs, executes only its scope.

## 8. Decisions You Can Make Without Asking

Inside a phase's scope:
- Specific component names, file structures, variable names
- Tailwind class arrangements that match the design system
- Animation timing inside the locked 600-800ms range
- TypeScript types and interfaces
- Whether to extract a sub-component
- Server vs Client component choice (default Server unless interactivity needed)
- Specific React patterns (hooks, contexts) for the feature being built

## 9. Decisions You Must Ask About

Always:
- Adding any library not already in package.json
- Changing any locked color, font, spacing, or motion value
- Modifying any locked copy in this brief
- Touching files outside the phase's stated scope
- Deviating from the phase order
- Adding features, sections, or pages not in this brief
- Removing v1 features or content not explicitly marked for removal in a phase
- Anything that requires a paid service signup (API keys aside)

## 10. Model and Session Rules

- **Phase 1 only: use Opus** (deep planning). Run `/model opus` before executing.
- **Phases 2-13: use Sonnet** (execution). Default model. Confirm with `/model` if unsure.
- **Each phase is one session.** Do not chain phases inside one Claude Code session.
- **Watch the context indicator.** If you cross 60% during a phase, run `/compact` immediately. If you cross 80%, stop and report to Richard.
- **Do not paste large files into messages.** Reference paths. Let Claude Code read selectively.

## 11. The Anti-Pattern Guard

After every phase, before declaring complete, mentally run through the brand-guide.md anti-pattern list. Any anti-pattern present means the phase isn't done. Common new-phase risks:
- Reverting to "clone of your customer" language
- Soft, unfalsifiable claims slipping back into copy
- Sectional headers that lead with the product instead of the buyer's outcome
- Adding decoration that doesn't earn its space

---

# PART THREE — THE 13 PHASES

Each phase below has: **Goal · Scope · Files · Output · Approval Criteria · Token Estimate.**

---

## PHASE 1: Read, Plan, Stop

**Model:** Opus.
**Goal:** Read every relevant document, understand the v2 repositioning fully, write a fresh PLAN.md mapping the entire 13-phase rebuild against the actual current state of the codebase.
**Scope:** Read-only. No code changes. No file edits except creating PLAN.md.
**Files in scope:** Read /docs/mirror-rebuild-brief-v2.md (this file), /docs/02-brand-guide.md, /docs/01-company-charter.md, /docs/00-glossary.md, the existing CLAUDE.md, the existing PLAN.md, and walk the current site structure (app/, components/, lib/).
**Output:**
- A new file: `/PLAN.md` (overwriting the v1 plan).
- The new PLAN.md should contain: a one-paragraph summary of what changed in v2, a mapping of which v1 files survive untouched vs need rewriting vs are new, an explicit list of risks you see in the v2 plan, any open questions you need Richard to answer before Phase 2 starts.
**Approval criteria:** Richard reads PLAN.md, answers any open questions, and explicitly approves moving to Phase 2.
**Token estimate:** 30-50K tokens. Heaviest read of the rebuild.

**Stop instruction at end:**
"Phase 1 complete. PLAN.md written. Open questions: [list]. Awaiting Richard's approval and answers before Phase 2. Run /clear before starting Phase 2."

---

## PHASE 2: Repositioning Audit

**Model:** Sonnet.
**Goal:** Walk every existing page and component on the live site and produce a comprehensive change manifest: every file, every section, every line of copy that needs to change because of the v2 repositioning.
**Scope:** Read-only audit. No code changes. Output is a single markdown file.
**Files in scope:** Read all of app/, components/, and lib/ that contain user-facing strings. Cross-reference against the v2 brief.
**Output:** `/CHANGE-MANIFEST.md` containing:
- A table organized by file path
- For each file: what's there now, what needs to change, why, which phase will handle it
- A flagged list of "drift risks" (places where v1 language might survive into v2 because it's buried in components)
- A list of new files needed for v2 that don't exist yet
**Approval criteria:** Richard skims the manifest, confirms scope feels right, approves Phase 3.
**Token estimate:** 40-60K tokens. Heavy file reads.

**Stop instruction:**
"Phase 2 complete. CHANGE-MANIFEST.md written. Stopping for review. Run /clear before Phase 3."

---

## PHASE 3: Homepage Hero and Opening Fold

**Model:** Sonnet.
**Goal:** Rewrite the homepage hero and the immediate-following section to lead with the Decision Engine repositioning. The visitor's first 5 seconds must communicate the new value prop.
**Scope:** Hero section, eyebrow, headline, subhead, CTAs, the below-CTAs caption, and the "Proof" section (the live demo callout).
**Files in scope:**
- `/app/(marketing)/page.tsx` (hero section block only)
- `/components/home/hero-section.tsx`
- `/components/home/proof-section.tsx`
- Any copy constants in `/lib/copy/` if they exist; create them if they don't (extract copy to constants for the rewrite)
**Files NOT in scope:** Everything else on the homepage. Other pages. Brand tokens. Components outside hero and proof.
**New copy (locked, use exactly):**

Hero eyebrow: `MIRROR · DECISION ENGINE`

Hero headline:
`Make every customer decision`
`30 minutes faster.`
`Without guessing.`

Hero subhead:
`Mirror is a private decision engine for marketing teams. Pre-test your creative, brief your team, and ship campaigns with measurable confidence. Built on your data. Owned by you.`

Hero CTAs:
- Primary: `RUN A FREE PRE-TEST`
- Secondary: `BOOK A CALL`

Hero below-CTAs:
`USED BY MARKETING TEAMS AT COMPANIES BETWEEN $5M AND $200M.`

Proof section (the live-chat callout):
- Eyebrow: `LIVE`
- Headline: `Test a real Mirror in 30 seconds.`
- Subhead: `Pre-test a piece of copy against a calibrated multi-persona model. Or talk to a Mirror of a brand you know. Both run on the same engine. Yours runs on your data.`
- Two CTAs side by side: `RUN A PRE-TEST` and `OPEN THE CHAT DEMO`

**Output:**
- Updated hero section
- Updated proof section
- New `/lib/copy/home.ts` (or similar) with hero and proof copy as exported constants
- Clean build, deployed to Vercel preview

**Approval criteria:** Richard opens the preview, reads the hero out loud, confirms it lands as a Decision Engine pitch and not a Customer Clone pitch.
**Token estimate:** 25-40K tokens.

**Stop instruction:**
"Phase 3 complete. Hero and Proof updated and deployed. Preview URL: [URL]. Stopping for sign-off. Run /clear before Phase 4."

---

## PHASE 4: Homepage Middle Sections

**Model:** Sonnet.
**Goal:** Rewrite the three middle sections of the homepage: "What Mirror is," "Who it's for," and "Tiers preview."
**Scope:** These three sections only. Plus the new homepage section featuring Pre-Test (placed between "What Mirror is" and "Who it's for").
**Files in scope:**
- `/components/home/what-mirror-is-section.tsx`
- `/components/home/who-its-for-section.tsx`
- `/components/home/tiers-preview-section.tsx`
- New file: `/components/home/pretest-feature-section.tsx`
- The relevant copy in `/lib/copy/home.ts`
- Insertion of the new section into `/app/(marketing)/page.tsx`
**Files NOT in scope:** Hero, Proof, Methodology preview, FAQ, Final CTA. Other pages.

**New copy (locked):**

### What Mirror is section
Eyebrow: `WHAT MIRROR IS`
Headline:
`A decision engine,`
`not a chatbot.`

Body:
`Mirror is a private system that turns your customer data into faster, more confident marketing decisions. It runs on a multi-persona model calibrated to your highest-value customers. It compounds: every decision your team makes feeds it, every Mirror you keep gets sharper.`

`You don't ask Mirror what your customer thinks. You ask Mirror what to ship.`

### Pre-Test feature section (NEW)
Eyebrow: `THE NEW VERB`
Headline:
`Pre-test your creative`
`before you spend a dollar.`

Body:
`Paste an ad, an email subject line, a landing page section. Get back a predicted-performance score, the sharpest objection any persona raised, and three suggested edits ranked by predicted impact.`

`This is the feature that pays for the retainer in week one.`

Two CTAs:
- Primary: `RUN A PRE-TEST NOW`
- Secondary: `SEE HOW IT WORKS →` (links to /method#pretest, will be added in Phase 7)

### Who it's for section
Eyebrow: `WHO MIRROR IS FOR`
Headline:
`If three of these are true,`
`we should talk.`

Checklist (replaces v1 list, all items reframed around decisions):
1. You're doing $5M to $200M in annual revenue.
2. You spend $30K+ per month on paid acquisition.
3. Your team makes 30+ customer decisions a week, mostly by guessing.
4. You've outgrown surveys and quarterly research.
5. You want to own a compounding asset, not rent another tool.

Below the checklist: secondary button `CHECK YOUR FIT IN A 20-MIN CALL`

### Tiers preview section
Eyebrow: `THREE WAYS IN`
Headline: `Pick your depth.`

Each card keeps its v1 structure (Tier name, price, duration, description, inclusions, "Learn more" CTA). The descriptions and inclusions get updated to lead with decisions, not personas:

**Mirror/Recon card:**
Description: `A 14-day diagnostic decision engine, built from public and lightly-shared data.`
Inclusions:
- Lightweight Mirror calibrated to your customer base
- The Truth Report (20 pages of decisions you should make this quarter)
- 60-minute live session running real Pre-Tests against your Mirror
- Refund if you don't get 3 specific 30%+ improvement decisions

**Mirror/Install card** (with "MOST CHOSEN" eyebrow):
Description: `A fully calibrated decision engine, deployed in your stack, owned by you.`
Inclusions:
- Full Mirror built from CRM, calls, reviews, and 8 customer interviews
- Pre-Test feature unlimited for your team
- Custom-branded interface, multi-persona architecture
- Weekly Mirror Reports, monthly retraining
- 90-day measurable-outcome guarantee or 3 months free

**Mirror/Operate card:**
Description: `We install your decision engine, then we operate it for you.`
Inclusions:
- Everything in Mirror/Install
- Daily Pre-Test runs across all your campaigns
- Briefs delivered to your team or agency
- Monthly Strategic Foresight document
- Quarterly KPI agreement with rate guarantee

**Output:**
- All three updated sections plus the new Pre-Test feature section
- Updated copy file
- Clean build and deploy

**Approval criteria:** Richard reads all four sections in order, confirms the flow lands. Specifically checks that the Pre-Test section earns its placement.
**Token estimate:** 30-45K tokens.

**Stop instruction:**
"Phase 4 complete. Middle sections updated and Pre-Test feature section added. Preview URL: [URL]. Run /clear before Phase 5."

---

## PHASE 5: Homepage Closing Sections

**Model:** Sonnet.
**Goal:** Rewrite the closing three sections of the homepage: Methodology preview, FAQ, Final CTA.
**Scope:** These three sections.
**Files in scope:**
- `/components/home/methodology-preview-section.tsx`
- `/components/home/faq-section.tsx`
- `/components/home/final-cta-section.tsx`
- Relevant copy in `/lib/copy/home.ts`
**Files NOT in scope:** Earlier homepage sections, other pages.

**New copy (locked):**

### Methodology preview
Eyebrow: `THE METHOD`
Headline: `Four stages. Sixty days. One decision engine.`

Stage descriptions stay (Ingest / Calibrate / Install / Operate) but reframe one-liners:
- INGEST: We ingest your CRM, calls, reviews, support tickets, plus 8 customer interviews.
- CALIBRATE: We build the multi-persona model that powers every Mirror decision.
- INSTALL: We deploy your decision engine into your stack with a branded interface.
- OPERATE: We retrain weekly. Your team Pre-Tests daily. The asset compounds.

Below: ghost button `SEE THE FULL METHOD →`

### FAQ section (rewrite all 8 answers around decisions, not personas)
Eyebrow: `OBJECTIONS, ANSWERED`
Headline: `The questions you're already asking.`

The 8 questions and answers (locked, use exactly):

1. **Q: Couldn't I just use ChatGPT for this?**
A: ChatGPT will roleplay a generic customer. Mirror is a calibrated decision engine: trained on your CRM, your calls, your reviews, with multi-persona voting and Pre-Test scoring. ChatGPT can't predict creative performance against your buyer. Mirror can.

2. **Q: How does Pre-Test actually work?**
A: You paste a piece of marketing copy. Mirror runs it through 3-5 calibrated sub-personas and returns a predicted-performance score with confidence range, the sharpest objection raised, and three ranked suggested edits. Built for the moment your team is about to ship something they're not sure about.

3. **Q: Who owns the Mirror?**
A: You do. The decision engine lives in your stack. We deliver IP transfer documents at the end of every Install. You can fire us and keep the asset.

4. **Q: How is this different from a focus group?**
A: A focus group is 8 people, twice a year, telling you what they think they think. A Mirror is your decision engine, available 24/7, scoring your creative before you ship it.

5. **Q: How do I know it's accurate?**
A: Every Install includes 200+ held-out test scenarios with a Calibration Report showing accuracy. Every Mirror retrains monthly. Every Pre-Test prediction is logged so you can compare predicted vs. actual performance.

6. **Q: What if our customer base is too niche?**
A: That's usually when Mirror is most valuable. The narrower your ICP, the harder it is for off-the-shelf research to help. Mirror specializes in narrow.

7. **Q: Can we start with Mirror/Recon and upgrade?**
A: That's how most clients enter. Recon is the diagnostic. Install is the build. Operate is when you want our team in the seat with you.

8. **Q: What does the guarantee actually cover?**
A: Mirror/Recon: refund if you don't get 3 decisions with 30%+ predicted improvement. Mirror/Install: 90 days to see measurable improvement on at least one of the four outcomes; if none, we extend the engagement into Operate at no charge until you do. Mirror/Operate: quarterly KPI agreement, miss it and next quarter is half price.

### Final CTA section
Headline:
`The next 20 minutes`
`could change`
`how your team ships.`

Below headline: oversized primary button `BOOK YOUR DIAGNOSTIC CALL`
Below button: `20 MINUTES. NO PITCH. WE'LL TELL YOU IF YOU'RE A FIT.`

**Output:**
- Three updated sections, all copy files updated, deploy.

**Approval criteria:** Richard reads the homepage end-to-end (all 8 sections in v2 form) and confirms it holds together as one coherent Decision Engine pitch.
**Token estimate:** 25-40K tokens.

**Stop instruction:**
"Phase 5 complete. Homepage closing sections updated. Full homepage now in v2. Preview URL: [URL]. Run /clear before Phase 6."

---

## PHASE 6: Pricing Page Rebuild

**Model:** Sonnet.
**Goal:** Rebuild the pricing page with the new measurable guarantees, updated tier descriptions, updated comparison table, and rewritten pricing FAQ.
**Scope:** /pricing page only.
**Files in scope:**
- `/app/(marketing)/pricing/page.tsx`
- `/components/pricing/pricing-tier-card.tsx`
- `/components/pricing/comparison-table.tsx`
- `/components/pricing/pricing-faq.tsx`
- `/lib/pricing-data.ts`
**Files NOT in scope:** Homepage, other pages, brand tokens.

**New content (locked):**

### Page header
Eyebrow: `PRICING`
Headline: `Three ways to install your decision engine.`
Subhead: `From a 14-day diagnostic to a fully operated decision engine. Every Mirror is built for one company. Yours.`

### Three full tier cards
(Use the inclusion lists, exclusion lists, best-fors from the v2 brief Section 4 guarantees and Section 5 Pre-Test integration. Each tier card now includes a "MEASURABLE OUTCOME" block at the bottom showing the specific guarantee.)

Detailed inclusion lists for each tier:

**Mirror/Recon — $4,500 ONE-TIME, 14 DAYS**
WHAT'S INCLUDED:
- Lightweight Mirror calibrated to your customer base
- Public review, social listening, and lightly-shared data ingestion
- Multi-persona architecture with 3 to 5 sub-personas
- The Truth Report (20 pages of decisions you should make this quarter)
- 60-minute live session running Pre-Tests against your Mirror
- 10 Pre-Test runs included
- Confidential Data Inventory document
- Full asset transferred to you. You own the Mirror.
- Delivered in 14 days from kickoff

NOT INCLUDED:
- First-party CRM, sales call, and support ticket ingestion
- 8 first-party customer interviews
- Custom-branded interface
- Monthly retraining
- Unlimited Pre-Tests

BEST FOR:
Companies who want to validate Mirror's value with their own market before committing to a full Install.

MEASURABLE OUTCOME:
At least 3 specific decisions with 30%+ predicted improvement, or full refund.

**Mirror/Install — $18,000 + $6,500/MO, 60 DAYS TO BUILD, ONGOING** (with MOST CHOSEN eyebrow)

WHAT'S INCLUDED:
- Full Mirror built from CRM, sales calls, support tickets, reviews, and NPS
- 8 first-party customer interviews conducted by us
- Multi-persona architecture with 3 to 5 calibrated sub-personas
- Custom-branded interface deployed in your stack
- Pre-Test feature unlimited for your team
- Held-out testing across 200+ scenarios with a Calibration Report
- Calibration Briefs written for each sub-persona
- Team training session (90 minutes)
- IP transfer and ownership documents
- Weekly Mirror Reports
- Monthly retraining with new customer data
- Unlimited team access

NOT INCLUDED:
- Day-to-day operation by the Mirror team
- Monthly Strategic Foresight document
- Quarterly KPI agreement

BEST FOR:
Companies that want a calibrated decision engine they own outright and operate themselves with monthly retraining.

MEASURABLE OUTCOME:
If by day 90 your team hasn't measurably improved on at least one of the four outcomes (faster decisions, cheaper tests, sharper briefs, compounding asset), we extend the engagement into Operate at no additional charge until you do. 12-month minimum on the retainer.

**Mirror/Operate — FROM $15,000/MO, QUARTERLY ENGAGEMENTS**

WHAT'S INCLUDED:
- Everything in Mirror/Install
- Daily Pre-Test runs across your active campaigns
- Briefs delivered to your team or agency
- Monthly Strategic Foresight document
- Quarterly recalibration sessions
- Weekly Mirror Reports operated by our team
- Async Slack and email support
- Quarterly KPI agreement
- Quarterly executive review

NOT INCLUDED:
- Self-serve operation. We are in the seat with you.
- Engagements under $15,000 per month

BEST FOR:
Companies doing $20M+ that want a fractional CMO whose superpower is operating the most calibrated decision engine in their category.

MEASURABLE OUTCOME:
Quarterly KPI agreement set in writing at start of each quarter. If we miss the agreed KPIs, next quarter is at 50%. Two consecutive misses, full quarter refund and clean exit.

### Comparison table
Add a new row for "Pre-Test access":
- Recon: 10 included
- Install: Unlimited
- Operate: Daily by Mirror team

Add a new row for "Measurable outcome guarantee":
- Recon: ✓
- Install: ✓
- Operate: ✓

### Pricing FAQ
Replace the v1 FAQ with these 6 (locked):

1. **Q: How does Pre-Test billing work?**
A: Pre-Test is included in every tier. Recon includes 10 runs; Install is unlimited for your team; Operate is unlimited and we run them for you. There's no per-Pre-Test fee.

2. **Q: What does the 90-day outcome guarantee on Install actually cover?**
A: Measurable improvement on at least one of the four outcomes: faster decisions, cheaper tests, sharper briefs, or compounding-asset accuracy. We define the measurement methodology with you in writing during Install. If none of the four show measurable movement by day 90 post-Install, we extend the engagement into Operate at no additional charge until they do.

3. **Q: What happens after the 12-month minimum on Install?**
A: Month-to-month from there. Cancel with 30 days notice. The Mirror stays yours either way.

4. **Q: Do you do annual prepay discounts?**
A: Annual prepay on Install retainers gets you 10% off. We do not discount Operate; the value compounds with us in the seat and the rate reflects that.

5. **Q: Can we pause Operate engagements?**
A: Yes, with 30 days notice. Pause for up to 90 days and resume at the same rate. Quarterly KPI commitments pause with the engagement.

6. **Q: What if we need a custom scope?**
A: We scope custom engagements above the Operate floor. Common cases: multi-segment Mirrors, white-label deployments to multiple business units, accelerated builds. Bring it to the Diagnostic Call.

### Final CTA on /pricing
Headline:
`Three tiers.`
`One next step.`
`A 20-minute call.`

Primary button: `BOOK YOUR DIAGNOSTIC CALL`

**Output:**
- Pricing page fully rebuilt with v2 content
- Comparison table updated
- Pricing FAQ rewritten

**Approval criteria:** Richard reads the page, confirms the guarantees feel concrete and CFO-defensible, confirms Pre-Test is naturally integrated into all three tiers.
**Token estimate:** 35-50K tokens.

**Stop instruction:**
"Phase 6 complete. Pricing page rebuilt. Preview URL: [URL]. Run /clear before Phase 7."

---

## PHASE 7: Method Page Reframe

**Model:** Sonnet.
**Goal:** Reframe the method page to lead with decisions and integrate Pre-Test as a visible part of the methodology.
**Scope:** /method page.
**Files in scope:**
- `/app/(marketing)/method/page.tsx`
- `/components/method/stage-section.tsx`
- `/components/method/stage-connector.tsx`
**Files NOT in scope:** Other pages.

**New content (locked):**

### Page header
Eyebrow: `THE METHOD`
Headline: `How Mirror builds your decision engine.`
Subhead: `Four stages. Sixty days. One asset that compounds and pre-tests every decision your team makes.`

### Four stages (rewritten)

**01 INGEST · DAYS 1-14**
We pull in your customer data from every available source. CRM exports tell us who buys. Sales call recordings tell us how they buy. Support tickets tell us where they hurt. Reviews and NPS tell us what they say in public. Then we run 8 customer interviews ourselves to fill the gaps your data can't.

WHAT WE DO:
- CRM and transactional data ingestion
- Sales call transcript analysis (12 months of recordings)
- Support ticket review and tagging
- Public review and social listening pull
- 8 first-party customer interviews conducted by us
- Data normalization into a single structured corpus

WHAT YOU GET:
- A confidential Data Inventory document
- Anonymized interview transcripts

**02 CALIBRATE · DAYS 15-35**
We identify the 3 to 5 distinct sub-personas inside your customer base and build a calibration brief for each. Then we train the multi-persona architecture, where the personas debate, vote, and converge on every decision. We test the model against held-out scenarios until it stops surprising us.

WHAT WE DO:
- Sub-persona identification and naming
- Calibration Brief written per sub-persona
- Multi-persona voting architecture deployed
- Held-out testing across 200+ scenarios
- Iterative tuning based on misses
- Pre-Test scoring model calibrated against your historical campaign performance

WHAT YOU GET:
- Calibration Briefs for each sub-persona
- A Calibration Report showing test accuracy
- Pre-Test baseline scoring methodology

**03 INSTALL · DAYS 36-50**
We deploy your decision engine into your stack with a custom-branded interface. Your team gets unlimited access to chat and Pre-Test. We hand over the IP transfer documents. From this day forward, the asset is yours.

WHAT WE DO:
- Custom Mirror interface deployment
- Branded UI matching your visual identity
- Pre-Test feature deployment with unlimited team access
- Team access provisioning
- Integration with your tools (Slack, Notion, etc., as scoped)
- IP transfer and ownership documentation

WHAT YOU GET:
- A live, branded Mirror interface with chat and Pre-Test
- Team training session (90 minutes)
- IP transfer documents

**04 OPERATE · DAY 51 AND BEYOND**
The decision engine is yours, but it needs feeding. We retrain monthly with new data. We deliver a Weekly Mirror Report surfacing the decisions Pre-Test predicted and the outcomes that followed. You use it daily to brief your team, pre-test campaigns, and pre-empt decisions before they cost you.

WHAT WE DO:
- Monthly retraining with new customer data
- Weekly Mirror Report delivery
- Quarterly recalibration sessions
- Pre-Test prediction vs. actual performance tracking
- Async support for your team

WHAT YOU GET:
- A Mirror that gets sharper every month
- A Weekly Mirror Report with prediction accuracy data
- Quarterly insight reviews

### Final CTA
Headline:
`See your decision engine`
`scored against`
`your data.`

Primary button: `BOOK YOUR DIAGNOSTIC CALL`

**Output:**
- Method page fully reframed
- Pre-Test referenced naturally throughout

**Approval criteria:** Richard reads the page, confirms the four stages now read as "we're building you a decision engine" not "we're building you a focus group."
**Token estimate:** 30-45K tokens.

**Stop instruction:**
"Phase 7 complete. Method page reframed. Preview URL: [URL]. Run /clear before Phase 8."

---

## PHASE 8: Demo Page Reframe

**Model:** Sonnet.
**Goal:** Reframe the existing /demo page so the chat is positioned as one of two ways to experience Mirror, with Pre-Test as the parallel option. Update top bar copy, suggested questions, and the right rail.
**Scope:** /demo page chrome only. Do NOT touch the chat logic or the API route.
**Files in scope:**
- `/app/(marketing)/demo/page.tsx` (top bar, sidebar copy, right rail)
- `/components/demo/suggested-questions.tsx`
- Any copy constants for the demo page
**Files NOT in scope:** `/components/demo/chat-interface.tsx`, `/components/demo/chat-message.tsx`, `/components/demo/chat-input.tsx`, `/lib/demo-mirror/`, `/app/api/mirror/route.ts`. Those are stable.

**New content (locked):**

### Top bar
Left: `MIRROR · DEMO CHAT`
Center status: same as v1 (Signal dot + ONLINE · MULTI-PERSONA · CALIBRATED ON 1,243 DATA POINTS)
Right: Add a new secondary button before the "Book a call" button: `TRY PRE-TEST INSTEAD →` (links to /pretest)

### Empty state
Eyebrow: `MIRROR · DEMO CHAT · READY`
Body: `Ask anything. The Mirror is calibrated on 1,243 data points from a brand you'd recognize.`
Body Ash: `Or run a Pre-Test on a real piece of copy →` (link to /pretest)

### Suggested questions (rewritten to lead with decisions)
1. What ad copy would convert your best customer this quarter?
2. What's the strongest objection your team keeps missing?
3. What pricing change would lose your loyalists?
4. What product should you launch next, and what should you kill?
5. What's your churn risk hiding in your reviews?
6. What landing page copy would your skeptics click on?

### Sidebar bottom (where the v1 "this is a demo" caption was)
Replace with:
`THIS IS A DEMO MIRROR BUILT FROM PUBLIC DATA. YOUR MIRROR WILL BE 10X SHARPER AND PRE-TEST EVERY DECISION YOUR TEAM MAKES.`

Below that, a new ghost CTA: `RUN A PRE-TEST →` (links to /pretest)

### Soft prompt at message 5 (replace the v1 wording)
`ENJOYING THIS? PRE-TEST A REAL PIECE OF COPY.` Button: `OPEN PRE-TEST →`

### Hard limit at message 10
`DEMO LIMIT REACHED. PRE-TEST A REAL PIECE OF COPY OR BOOK A CALL.`
Two buttons: `OPEN PRE-TEST →` and `BOOK A CALL`

**Output:**
- Demo page chrome updated
- All references to Pre-Test wired to /pretest (which doesn't exist yet, will return 404; that's expected, fixed in Phase 9)

**Approval criteria:** Richard opens /demo, confirms the chat experience still works (because logic untouched), confirms the framing now positions chat as one of two demo paths.
**Token estimate:** 20-35K tokens.

**Stop instruction:**
"Phase 8 complete. Demo page chrome updated. /pretest links currently 404 as expected. Run /clear before Phase 9."

---

## PHASE 9: Pre-Test Feature - Scaffold and Routes

**Model:** Sonnet.
**Goal:** Build the /pretest route, page shell, navigation entry, empty state, and component scaffolding. No real logic yet; this phase is structural.
**Scope:** New route, new page, new components (empty), nav update.
**Files in scope:**
- New: `/app/(marketing)/pretest/page.tsx`
- New: `/components/pretest/pretest-input-form.tsx` (scaffolded, returns placeholder)
- New: `/components/pretest/pretest-results.tsx` (scaffolded, returns placeholder)
- New: `/components/pretest/pretest-empty-state.tsx`
- New: `/lib/pretest/types.ts` (TypeScript interfaces for the input, the result, the persona reactions)
- Update: `/components/layout/nav.tsx` (add PRE-TEST as fourth nav item)
- Update mobile nav overlay similarly
**Files NOT in scope:** API routes, prompts, real interaction logic. Those are Phase 10 and 11.

**Page structure for /pretest (locked):**

```
[NAV with PRE-TEST highlighted]

PAGE BODY (max width 960px, generous padding):

Eyebrow: PRE-TEST · DEMO
Headline: Pre-test a piece of copy.
          Get back a score, an objection, and three edits.
Subhead: This Pre-Test runs against the same multi-persona model the chat demo uses.
         Your real Pre-Test would run against your calibrated personas.
         5 free runs per session.

[Pre-Test input form component — scaffolded]
[Pre-Test results component — scaffolded, hidden by default]

Below the form:
HOW IT WORKS (small, three-step):
01. Paste your copy.
02. Mirror evaluates it through 3-5 calibrated personas.
03. You get a predicted-performance score, the sharpest objection, and three suggested edits.

Below: a Pre-Test history list (scaffolded for Phase 10)

Bottom: small CTA: WANT THIS RUNNING ON YOUR DATA? BOOK A CALL.
```

**Empty state (when no Pre-Test has been run yet):**
Centered in the form area:
- Eyebrow: `PRE-TEST · READY`
- Body: `Paste a piece of marketing copy below. We'll score it, surface objections, and suggest edits.`
- Below: the empty input form

**Output:**
- /pretest route live
- Page shell with all sections in place
- Empty state rendering
- Form scaffolded but submit doesn't do anything yet (placeholder click handler)
- Nav updated everywhere

**Approval criteria:** Richard navigates to /pretest, sees the page render correctly, sees PRE-TEST in nav. Form is non-functional, that's expected.
**Token estimate:** 35-50K tokens.

**Stop instruction:**
"Phase 9 complete. /pretest route live with empty state and scaffolded components. Form non-functional pending Phase 10. Run /clear before Phase 10."

---

## PHASE 10: Pre-Test Feature - Input and API Flow

**Model:** Sonnet.
**Goal:** Build the input form's real interaction, the API route that calls Anthropic, and the streaming/loading state.
**Scope:** Input form logic, new API route, streaming response handler, loading state.
**Files in scope:**
- `/components/pretest/pretest-input-form.tsx` (real implementation)
- New: `/app/api/pretest/route.ts` (the API endpoint)
- New: `/lib/pretest/client.ts` (client-side fetch wrapper with streaming)
- New: `/lib/pretest/prompts.ts` (the system prompt for Pre-Test, separate from chat prompts)
- Update: `/components/pretest/pretest-results.tsx` to show "analyzing" state
- New: `/components/pretest/pretest-thinking.tsx` (the equivalent of the chat thinking indicator)
**Files NOT in scope:** Result rendering specifics (Phase 11), export-as-brief (Phase 11), rate limiting (Phase 11).

**The form spec:**
- Single textarea: 4-row min, autosizing, max 1000 characters
- Placeholder: `Paste your ad copy, email subject line, landing page section, push notification, or social post.`
- Single dropdown above the textarea: copy type with 5 options (Ad copy, Email subject line, Landing page section, Push notification, Social post). Default: "Ad copy."
- Submit button: `RUN PRE-TEST` (primary button)
- Form validation: don't submit if textarea empty
- On submit: button changes to `ANALYZING…` with the Mirror thinking indicator

**The API route spec:**
- POST /api/pretest with body { copy: string, type: enum }
- Calls Anthropic API with the Pre-Test system prompt + user input
- Streams response back via SSE (same pattern as /api/mirror)
- For this phase: stub the prompt to return a structured placeholder JSON response that exercises the full UI flow (Phase 11 wires the real prompt)

**The placeholder JSON response (use exactly):**
```json
{
  "score": 67,
  "confidenceMin": 58,
  "confidenceMax": 76,
  "personaReactions": [
    {
      "personaName": "LOYALIST",
      "verdict": "Mixed.",
      "quote": "I'd open this. I might not click. The headline tells me what but not why I should care today."
    },
    {
      "personaName": "SKEPTIC",
      "verdict": "Negative.",
      "quote": "Two claims with no proof. I'd assume this is the same offer everyone runs in October."
    },
    {
      "personaName": "FORMER",
      "verdict": "Positive.",
      "quote": "This sounds like the brand I remembered. I'd give it 20 seconds, which is more than I usually give you."
    }
  ],
  "sharpestObjection": "The price comparison feels like every other discount email. The 'why now' isn't earned.",
  "suggestedEdits": [
    {
      "edit": "Lead with the time-bound reason. Not 'limited time,' a specific event.",
      "predictedImpact": "+12 points"
    },
    {
      "edit": "Cut the second claim. One sharp claim outperforms two soft ones for the Skeptic.",
      "predictedImpact": "+8 points"
    },
    {
      "edit": "Move the social proof line above the offer. Loyalists need permission, not pricing.",
      "predictedImpact": "+5 points"
    }
  ]
}
```

**Output:**
- Form submits successfully
- API route returns the structured placeholder
- Loading state with Mirror thinking indicator works
- Response data is passed to the results component (which still shows placeholder UI from Phase 9)

**Approval criteria:** Richard pastes some text, hits submit, sees loading state, sees data flow through to the results area (rendering placeholder is fine for now).
**Token estimate:** 40-55K tokens.

**Stop instruction:**
"Phase 10 complete. Form submits, API returns structured placeholder, data flows to results. Real result rendering is Phase 11. Run /clear before Phase 11."

---

## PHASE 11: Pre-Test Feature - Results, Scoring, Export, Rate Limiting

**Model:** Sonnet.
**Goal:** Build the full results UI (score with confidence range, persona reactions, sharpest objection, suggested edits), the export-as-brief feature, and the rate limiting (5 per session). Also: write the real Pre-Test system prompt and wire it into the API.
**Scope:** Results UI, export, rate limiting, real prompt.
**Files in scope:**
- `/components/pretest/pretest-results.tsx` (full implementation)
- New: `/components/pretest/pretest-score-display.tsx`
- New: `/components/pretest/pretest-persona-reactions.tsx`
- New: `/components/pretest/pretest-sharpest-objection.tsx`
- New: `/components/pretest/pretest-suggested-edits.tsx`
- New: `/components/pretest/pretest-export-button.tsx`
- New: `/lib/pretest/export-pdf.ts` (PDF generation using @react-pdf/renderer or similar; if installation needed, ask Richard first)
- Update: `/lib/pretest/prompts.ts` with the real system prompt
- Update: `/app/api/pretest/route.ts` to call the real prompt (and to fall back to placeholder if no ANTHROPIC_API_KEY)
- New: rate limiting via localStorage (5 per session, then prompt to book a call)

**The results UI spec:**

```
RESULTS LAYOUT (renders below form when complete):

[ Large score display ]
PREDICTED PERFORMANCE SCORE
     67
[Confidence range: 58 — 76]

[Horizontal Ash divider]

PERSONA REACTIONS
[3-5 cards in a vertical stack, each:]
  PERSONA NAME (e.g., LOYALIST) · Verdict (Positive/Negative/Mixed)
  "Quote from the persona about this specific copy."

[Horizontal Ash divider]

SHARPEST OBJECTION
[Single italic quote in larger type, no italic styling per brand rules, just larger and Bone-bright]
"The price comparison feels like every other discount email. The 'why now' isn't earned."

[Horizontal Ash divider]

SUGGESTED EDITS (RANKED BY PREDICTED IMPACT)
01.  Lead with the time-bound reason. Not 'limited time,' a specific event.
     +12 points

02.  Cut the second claim. One sharp claim outperforms two soft ones for the Skeptic.
     +8 points

03.  Move the social proof line above the offer. Loyalists need permission, not pricing.
     +5 points

[ EXPORT AS BRIEF (PDF) ]   [ RUN ANOTHER PRE-TEST ]
```

**The export-as-brief PDF:**
- Header: MIRROR PRE-TEST BRIEF
- Date and copy type
- The original input copy
- The score and confidence range
- All persona reactions
- Sharpest objection
- Three suggested edits
- Footer: "Generated by Mirror. mirror.[domain]"
- Use @react-pdf/renderer (preferred) or fall back to jsPDF if @react-pdf installation fails

**The rate limiting:**
- localStorage key: `mirror_pretest_count`
- Max 5 per session
- Counter increments on successful submit
- After 5th: form replaces with a soft wall: "You've used your 5 free Pre-Tests. Book a call to see Pre-Test on your real data."
- Reset only on clearing localStorage (no time-based reset for simplicity)

**The real Pre-Test system prompt (to be wired in /lib/pretest/prompts.ts):**

This prompt instructs Claude to:
1. Take the input copy and copy type
2. Evaluate it through 3-5 sub-personas (use the same Liquid Death personas referenced from the chat demo lib)
3. For each persona: produce a verdict (Positive/Negative/Mixed) and a 1-2 sentence quote in the persona's voice
4. Produce a single score (0-100) representing predicted performance
5. Produce a confidence range (min, max)
6. Identify the single sharpest objection across all personas
7. Generate exactly 3 suggested edits, each with a predicted point impact
8. Return the result as strict JSON matching the placeholder schema from Phase 10
9. If the input doesn't appear to be marketing copy, return an error: "This doesn't look like marketing copy. Try pasting an ad, email subject, or landing page section."

**Output:**
- Full Pre-Test feature working end-to-end with the placeholder data still flowing if no API key
- Real prompts wired in (will activate once ANTHROPIC_API_KEY env var is set in Vercel)
- Export PDF works
- Rate limiting active

**Approval criteria:** Richard runs 5 Pre-Tests with different inputs, sees results render properly each time, exports a PDF, hits the rate limit on the 6th attempt.
**Token estimate:** 50-70K tokens. This is the heaviest phase. If context fills past 60% mid-phase, run /compact.

**Stop instruction:**
"Phase 11 complete. Pre-Test feature shipped end-to-end. Real prompt wired. Export and rate limiting working. Set ANTHROPIC_API_KEY in Vercel env to activate live AI responses (currently using placeholder). Run /clear before Phase 12."

---

## PHASE 12: Outcomes Section

**Model:** Sonnet.
**Goal:** Add a new "Outcomes" section to the homepage that surfaces the four locked outcomes with engineered targets and an honest footnote about measurement.
**Scope:** New homepage section.
**Files in scope:**
- New: `/components/home/outcomes-section.tsx`
- Update: `/app/(marketing)/page.tsx` to insert outcomes section between Pre-Test feature and Who-it's-for
- Update: `/lib/copy/home.ts`
**Files NOT in scope:** Other homepage sections, other pages.

(Note: the original v2 brief also called for a Mirror Reports preview block in this phase. Per Richard's PLAN.md Q13 decision, that block is held until at least one real Mirror Report is publishable. It will return in v2.1. Phase 12 v2 ships the Outcomes section alone.)

**Outcomes section spec (locked):**

Eyebrow: `WHAT MIRROR DELIVERS`
Headline: `Four outcomes. Measured every quarter.`

Below the headline, four outcome cards in a 2x2 grid on desktop, stacked on mobile. Each card has:
- A large numeric value (Display L mono, Bone)
- The metric name (Berkeley Mono caps, Signal eyebrow)
- A one-sentence description (Body, Bone 70%)

Card 1:
`30 MIN`
FASTER DECISIONS
Average customer-related decision time, down from 3-7 days.

Card 2:
`30-50%`
CHEAPER TESTS
Reduction in wasted ad creative spend through Pre-Testing.

Card 3:
`40%+`
SHARPER BRIEFS
Reduction in campaign rework cycles before approval.

Card 4:
`+18%`
COMPOUNDING ASSET
Average accuracy improvement after 90 days of use.

Below the cards, a small caption (Richard's PLAN.md Q12 reframing for honesty before any engagements have reported actuals):
`TARGETS ENGINEERED INTO MIRROR'S METHODOLOGY. ACTUAL RESULTS REPORTED PER ENGAGEMENT STARTING Q3 2026.`

**Output:**
- Outcomes section rendered between Pre-Test and Who-it's-for

**Approval criteria:** Richard reads the outcomes section, confirms the numbers feel concrete and the footnote stays honest about pre-engagement state.
**Token estimate:** 25-35K tokens.

**Stop instruction:**
"Phase 12 complete. Outcomes section added to homepage. Mirror Reports preview held for v2.1 per Q13. Run /clear before Phase 13."

---

## PHASE 13: Full QA Pass and Launch Checklist

**Model:** Sonnet.
**Goal:** A comprehensive QA pass of the full v2 site against the new positioning, with a launch checklist.
**Scope:** Read-only audit + minor fixes only. No new features.
**Files in scope:** Read everything in /app/, /components/, /lib/, /docs/. Fix only specific drift issues found.
**Output:** A new file `/V2-LAUNCH-REPORT.md` containing:

1. **Positioning consistency check:** Walk every page, confirm zero v1 "clone" language remains, confirm "Decision Engine" positioning is consistent, list any drift found and fix it.

2. **Copy QA:** Confirm no banned phrases (the 9 from Section 3 of this brief), no em dashes, no italics, voice consistency.

3. **Anti-pattern audit:** Run the 20-item brand-guide.md anti-pattern list against every page. List any that crept in.

4. **Pre-Test feature QA:** End-to-end test of Pre-Test, confirm all 4 outcomes (form, API, results, export) work. Confirm rate limiting works.

5. **Cross-page link audit:** Confirm every CTA, every internal link, every navigation entry points to the correct route.

6. **Mobile pass:** Document any mobile issues found by reading the components (no real device testing).

7. **Performance:** Run Lighthouse on /, /pretest, /pricing, /method, /demo. Report scores and list any flagged issues.

8. **Accessibility:** Confirm focus rings, ARIA labels, prefers-reduced-motion, contrast on new sections.

9. **SEO:** Confirm meta tags, OG images, sitemap includes /pretest, robots.txt unchanged.

10. **Launch readiness checklist:** Final pre-launch list of env vars to set (ANTHROPIC_API_KEY, NEXT_PUBLIC_CAL_EVENT, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_PLAUSIBLE_DOMAIN), domain to connect, redirects to set up.

**Output:**
- /V2-LAUNCH-REPORT.md committed
- Any drift issues fixed inline
- Final summary: green light, yellow flags, or red blockers

**Approval criteria:** Richard reads the report, addresses any red blockers, signs off on launch.
**Token estimate:** 50-70K tokens. Heavy reads, many small fixes possible.

**Stop instruction:**
"Phase 13 complete. V2-LAUNCH-REPORT.md written. Mirror v2 is build-complete. Launch readiness: [GREEN/YELLOW/RED]. [If green: ready to deploy production with the env vars listed. If yellow: address [list] before launch. If red: critical issues at [list].] End of v2 rebuild."

---

# APPENDIX

## A. Phase Order at a Glance

| Phase | Focus | Model | Est. tokens | Stop check |
|-------|-------|-------|-------------|------------|
| 1 | Read + plan | Opus | 30-50K | PLAN.md approved |
| 2 | Audit | Sonnet | 40-60K | Manifest approved |
| 3 | Hero + Proof | Sonnet | 25-40K | Visual sign-off |
| 4 | Middle sections | Sonnet | 30-45K | Pre-Test placement reads right |
| 5 | Closing sections | Sonnet | 25-40K | Homepage end-to-end approved |
| 6 | Pricing | Sonnet | 35-50K | Guarantees feel concrete |
| 7 | Method | Sonnet | 30-45K | Decisions over personas |
| 8 | Demo reframe | Sonnet | 20-35K | Chat still works, frame updated |
| 9 | Pre-Test scaffold | Sonnet | 35-50K | /pretest renders empty state |
| 10 | Pre-Test API | Sonnet | 40-55K | Form submits, data flows |
| 11 | Pre-Test results | Sonnet | 50-70K | Full feature working |
| 12 | Outcomes section | Sonnet | 30-45K | Outcomes render |
| 13 | QA + launch | Sonnet | 50-70K | Launch report green |

Total estimated: 440-655K tokens across 13 sessions. With `/clear` between each, no single session exceeds 70K tokens, comfortably within the 200K context window.

## B. The Standing Reminder for Every Phase

Before executing any phase, re-read these three things:
1. The repositioning thesis (Section 1)
2. The four locked outcomes (Section 2)
3. The five forbidden + four new banned phrases (Section 3)

If your output during a phase contradicts any of these, the output is wrong.

## C. When Things Go Wrong

If a phase hits a context wall mid-execution: stop, run `/compact`, summarize what's done, what's left, ask Richard whether to continue or split into Phase Na/Nb.

If a phase produces something off-brand: don't ship. Roll back, ask Richard, retry.

If you encounter a missing dependency, missing API key, or unclear scope: ask Richard, do not invent.

If Richard's approval is unclear: ask explicitly. "Are we approving Phase N as complete and ready for /clear, or do you want changes first?"

End of brief.
