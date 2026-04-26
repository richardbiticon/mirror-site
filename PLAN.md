# Mirror v2 Rebuild Plan

**Author:** Claude Code (Opus, Phases 1 + 1.5)
**Date:** 2026-04-27
**Status:** Phase 1 + Phase 1.5 complete. All 16 open questions answered by Richard. Foundation docs updated. Awaiting Phase 1.5 sign-off, then `/clear` and Phase 2.
**Supersedes:** the v1 PLAN.md (kept in git history at commit 6a2ee19).
**Authority:** /docs/mirror-rebuild-brief-v2.md is the constitution for this rebuild. Priority order on conflict: that brief, then 02-brand-guide.md, then 01-company-charter.md, then ask Richard.

---

## 1. What changed in v2, in one paragraph

Mirror v1 sold "a private AI clone of your customer" with the homepage hero `Talk to your customer. Before you sell to them.` That metaphor doesn't survive a CFO conversation. v2 repositions Mirror as a **decision engine for marketing teams**, anchors every claim to four falsifiable outcomes (faster decisions, cheaper tests, sharper briefs, compounding asset), tightens the three guarantees so they're contract-level instead of vibes, and adds one new product surface called **Pre-Test**: a standalone tool that scores a piece of marketing copy through the multi-persona model and returns a predicted-performance score, the sharpest objection, and three ranked edits. The chat demo stays. The methodology stays. The three offers stay (Recon, Install, Operate) at the same prices. What changes is the language at every visible surface and the addition of `/pretest` as a fourth nav item with its own route, API, and result UI.

---

## 2. Current state of the codebase (post-Phase-8 of v1)

The v1 build shipped Phases 1 through 8 across commits `eee2e8a` (foundation) through `6a2ee19` (QA). Live preview: https://mirror-site-theta.vercel.app/. Sixteen routes total. Build clean, lint clean, all anti-patterns absent.

**Files Richard should know exist for v2 mapping:**

```
docs/
├── 00-glossary.md                       (v1, unchanged)
├── 01-company-charter.md                (v1, unchanged)
├── 02-brand-guide.md                    (v1, unchanged)
├── mirror-website-build-brief.md        (v1 brief, superseded for v2 conflicts)
└── mirror-rebuild-brief-v2.md           (just placed; the v2 constitution)

app/
├── (marketing)/                         (route group with Nav + Footer)
│   ├── layout.tsx
│   ├── page.tsx                         (homepage; composes 8 home/* sections)
│   ├── book/page.tsx
│   ├── manifesto/page.tsx
│   ├── method/page.tsx
│   ├── pricing/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── api/mirror/route.ts                  (chat SSE; stub responses pending real prompts)
├── demo/page.tsx                        (no marketing chrome, full-viewport chat)
├── dev/page.tsx                         (internal QA)
├── globals.css
├── icon.tsx                             (favicon via @vercel/og)
├── layout.tsx                           (root: html/fonts/Plausible/skip-link)
├── not-found.tsx                        (custom 404)
├── opengraph-image.tsx
├── robots.ts
├── sitemap.ts
└── template.tsx                         (page-transition fade)

components/
├── book/                                (cal-embed, what-to-expect)
├── demo/                                (chat, top-bar, suggested-questions, etc.)
├── hero/                                (particle-field, headline, custom-cursor)
├── home/                                (8 homepage sections + stage-connector)
├── layout/                              (nav, footer, coming-soon)
├── legal/legal-page.tsx
├── method/                              (stage-section, vertical-stage-connector)
├── pricing/                             (4 files including pricing-data.ts)
├── shared/final-cta.tsx
└── ui/                                  (10 primitives: button, card, accordion, etc.)

lib/
├── demo-mirror/                         (personas + prompts + stream)
├── design.ts
├── use-local-storage-number.ts
└── utils.ts

CLAUDE.md                                (v1 hard rules; needs v2 update: see open question 1)
```

---

## 3. v1-to-v2 file mapping

Three categories: **survives untouched**, **needs rewrite or update**, **new for v2**.

### Survives untouched (33 files)

These don't carry user-facing copy that v2 changes, or are infrastructure that v2 doesn't touch.

- All ten UI primitives in `components/ui/` (button, card, accordion, dialog, input, container, section, reveal, scroll-headline + the keyframes in globals.css).
- `components/hero/particle-field.tsx`, `custom-cursor.tsx`: pure visual.
- `components/hero/headline.tsx`: currently hardcoded with v1 lines; could either survive with v1 lines AS A COMPONENT and have a new wrapper, or be parameterized. Recommend parameterizing in Phase 3 (single edit). Listed under "needs rewrite" below as a precaution.
- `components/method/stage-section.tsx`, `vertical-stage-connector.tsx`, `components/home/stage-connector.tsx`: visual only.
- `components/layout/nav.tsx`: gets one new item added in Phase 9 (PRE-TEST), otherwise unchanged.
- `components/layout/footer.tsx`, `coming-soon.tsx`: unchanged.
- `components/shared/final-cta.tsx`: already accepts custom lines/labels; v2 just passes new copy.
- `components/legal/legal-page.tsx`: unchanged shell.
- `components/pricing/comparison-table.tsx`: gets new rows passed in via data; component logic unchanged.
- `components/pricing/pricing-faq.tsx`: gets new questions via data; component unchanged.
- `components/pricing/pricing-tier-card.tsx`: gets new content via data; may need a new "MEASURABLE OUTCOME" block (small Phase 6 edit; see below).
- `components/demo/chat.tsx`, `chat-input.tsx`, `message.tsx`, `data-counter.tsx`, `thinking-indicator.tsx`, `demo-shell.tsx`: Phase 8 of v2 explicitly says don't touch chat logic; only chrome and copy change.
- All of `lib/demo-mirror/`, `lib/design.ts`, `lib/utils.ts`, `lib/use-local-storage-number.ts`.
- `app/api/mirror/route.ts`: chat API stays.
- `app/icon.tsx`, `app/opengraph-image.tsx`: unchanged unless OG copy gets updated to v2 phrasing (recommend yes, small change in Phase 13).
- `app/template.tsx`, `app/globals.css`: unchanged.
- `app/(marketing)/manifesto/page.tsx`, `privacy/page.tsx`, `terms/page.tsx`: unchanged for v2 (still placeholders or draft legal).
- `app/(marketing)/book/page.tsx`: unchanged (no v2 changes called out).
- `app/dev/page.tsx`, `app/not-found.tsx`: internal/edge.

### Needs rewrite or update (15 files)

Each entry: file → what changes → which v2 phase covers it.

| File | Change | Phase |
|------|--------|-------|
| `app/(marketing)/page.tsx` | Insert two new sections (Pre-Test feature, Outcomes) into the homepage stack | 4 + 12 |
| `components/home/hero-section.tsx` | New eyebrow, three-line headline, new subhead, CTA labels, below-CTA caption | 3 |
| `components/hero/headline.tsx` | Either parameterize or hardcode v2 lines. Recommend parameterizing so /pricing and /method final CTAs and the hero all share one mechanism. | 3 |
| `components/home/proof-section.tsx` | New eyebrow, headline, subhead, two-CTA pair (`RUN A PRE-TEST` + `OPEN THE CHAT DEMO`) | 3 |
| `components/home/what-mirror-is-section.tsx` | New copy: "A decision engine, not a chatbot." plus rewritten body | 4 |
| `components/home/who-its-for-section.tsx` | Reframed checklist (5 items, decisions-first) | 4 |
| `components/home/tiers-preview-section.tsx` | Updated descriptions and inclusions per v2 brief Phase 4 | 4 |
| `components/home/methodology-preview-section.tsx` | New eyebrow text, "decision engine" headline, reframed stage one-liners | 5 |
| `components/home/faq-section.tsx` | Eight rewritten Q&As (one new question on Pre-Test, others reframed) | 5 |
| `components/home/final-cta-section.tsx` | New three-line headline | 5 |
| `app/(marketing)/pricing/page.tsx` | Header copy + tier card "MEASURABLE OUTCOME" block + new comparison rows + new FAQ + new final CTA | 6 |
| `components/pricing/pricing-tier-card.tsx` | Add a "MEASURABLE OUTCOME" block at the bottom of each card | 6 |
| `components/pricing/pricing-data.ts` | Replace tier inclusions/exclusions/best-fors/guarantees + replace 6 FAQ items + add 2 comparison rows (Pre-Test access, Measurable outcome guarantee) | 6 |
| `app/(marketing)/method/page.tsx` | Header copy, four stage descriptions, final CTA | 7 |
| `app/demo/page.tsx` | Pass new top-bar/empty-state/suggested-questions/sidebar copy through; leave chat logic alone | 8 |
| `components/demo/top-bar.tsx` | Add `TRY PRE-TEST INSTEAD` button before `Book a call` | 8 |
| `components/demo/suggested-questions.tsx` | Six new questions, new sidebar bottom caption + new ghost CTA | 8 |
| `components/demo/chat.tsx` | Soft-prompt and hard-limit copy and CTAs (rewrite the inner SoftLimitPrompt + HardLimitPanel sub-components) | 8 |
| `components/layout/nav.tsx` | Add `PRE-TEST` as fourth nav item, both desktop and mobile overlay | 9 |

### New for v2 (~14 files)

| File | Purpose | Phase |
|------|---------|-------|
| `lib/copy/home.ts` | Homepage copy as exported constants (extracted in Phase 3, expanded in 4, 5, 12) | 3 |
| `components/home/pretest-feature-section.tsx` | The new "Pre-test your creative" homepage section | 4 |
| `components/home/outcomes-section.tsx` | The four-outcome 2x2 grid | 12 |
| `components/home/mirror-reports-preview.tsx` | The Mirror Reports preview block | 12 |
| `app/(marketing)/pretest/page.tsx` | The /pretest route | 9 |
| `components/pretest/pretest-input-form.tsx` | Form scaffold (9), real impl (10), final tweaks (11) | 9-11 |
| `components/pretest/pretest-empty-state.tsx` | Empty state | 9 |
| `components/pretest/pretest-results.tsx` | Results container | 9-11 |
| `components/pretest/pretest-score-display.tsx` | Score + confidence range | 11 |
| `components/pretest/pretest-persona-reactions.tsx` | Reactions list | 11 |
| `components/pretest/pretest-sharpest-objection.tsx` | Single quote | 11 |
| `components/pretest/pretest-suggested-edits.tsx` | Three ranked edits | 11 |
| `components/pretest/pretest-export-button.tsx` | PDF export trigger | 11 |
| `components/pretest/pretest-thinking.tsx` | Loading state | 10 |
| `lib/pretest/types.ts` | TS interfaces | 9 |
| `lib/pretest/client.ts` | Client SSE consumer | 10 |
| `lib/pretest/prompts.ts` | System prompt for Pre-Test | 10-11 |
| `lib/pretest/export-pdf.ts` | PDF generation logic | 11 |
| `app/api/pretest/route.ts` | The Pre-Test API endpoint | 10 |
| `CHANGE-MANIFEST.md` | Phase 2 audit output | 2 |
| `V2-LAUNCH-REPORT.md` | Phase 13 final report | 13 |

---

## 4. Risks I see in the v2 plan

**R1. Liquid Death personas don't exist yet.** Pre-Test (Phases 9-11) is spec'd to run on the same personas the chat demo uses. The chat currently uses three placeholder personas (LOYALIST, SKEPTIC, FORMER) because Richard's note in PLAN.md §4.7 said real Liquid Death personas would arrive "before Phase 5" of v1, and they didn't. v2 brief Phase 11 implies Liquid Death personas are wired. They are not. Pre-Test will ship on the same placeholder personas unless they arrive. Open question 2 below.

**R2. CLAUDE.md is v1.** Loaded into every Claude Code session by default. It still references "v1 hard rules" and the original five forbidden phrases without the v2 additions. If unchanged, future Claude sessions will produce v1 framing on autopilot, drift back to "clone of your customer," and miss the four new banned phrases. Open question 1.

**R3. The glossary, charter, and brand guide still use v1 framing.** The glossary entry for "Mirror (the product)" literally says "AI clone of a client's highest-value customer segment." The charter §What Mirror Is leads with "private AI clones." The brand guide §Application Examples shows the v1 hero `Talk to your customer.` as the LOCKED reference. The v2 brief overrides all three via priority order, but every Claude session reads these docs and gets v1 framing first. Open questions 3-5.

**R4. Path drift between v2 brief and current code.** Brief Phase 6 references `/lib/pricing-data.ts`; actual path is `/components/pricing/pricing-data.ts`. Brief Phase 8 references `/app/(marketing)/demo/page.tsx`; actual path is `/app/demo/page.tsx` (kept outside the marketing route group on purpose because /demo has its own no-nav chrome). Need a ruling: follow brief paths verbatim (and move files), or treat brief paths as approximate (and use the existing structure). Open question 7.

**R5. /pretest placement under (marketing).** Brief Phase 9 places `/pretest` inside the marketing route group, which means it inherits Nav + Footer. That's appropriate for a public marketing tool that wants the standard chrome. But Pre-Test result rendering may want maximum vertical space (full results card sequence is tall). Confirm Pre-Test should ship under standard nav/footer rather than its own minimal chrome like /demo. Open question 8.

**R6. The 90-day Install guarantee is contract-level.** "Within 90 days of Install completion, your team will report at least one of: 30% reduction in creative test costs, 40% reduction in campaign rework, or a measurable lift on a Mirror-pre-tested campaign vs. control. If none, the next 3 months of retainer are free." This is a $19,500 commitment ($6,500 × 3) per Install client per missed quarter. If the methodology hasn't been validated against these specific metrics yet, this could become expensive. Open question 11.

**R7. Outcomes section numbers without engagements.** Phase 12 surfaces four outcome cards with specific numbers (`30 MIN`, `30-50%`, `40%+`, `+18%`). Brief frames them as "what Mirror is engineered to deliver" and adds an honest footnote. The CFO test cuts both ways: the numbers are concrete (good) but if there are zero engagements yet, a sharp prospect will ask "measured against what?" The footnote `MEASURED ACROSS ACTIVE MIRROR/INSTALL AND OPERATE ENGAGEMENTS. NUMBERS UPDATE QUARTERLY.` is fine if engagements exist; it's misleading if they don't. Open question 12.

**R8. Mirror Reports preview shows fake titles.** Phase 12 lists three fake-but-plausible Mirror Report titles with dates. Brief calls this out explicitly: "placeholder until real reports exist." A skeptical visitor following the `READ THE LATEST →` link expecting an essay and landing on the manifesto placeholder may feel misled. Recommend either the section is held until one real Mirror Report exists, or the link goes to a `/mirror-reports` index that says "publishing weekly starting [date]." Open question 13.

**R9. PDF export library installation.** Phase 11 uses `@react-pdf/renderer` (preferred) or `jsPDF` (fallback). Both are fairly heavy (~200-400KB minified). Brief says "if installation needed, ask Richard first." Open question 9.

**R10. Pre-Test rate limit at 3 free runs is aggressive.** Brief Phase 11 caps at 3 per session via localStorage with no time-based reset. A first-time visitor exploring will use them quickly. Compared to chat demo's 10-message limit, 3 feels stingy. The intent (drive booking) is right; the number may be too low. Open question 14.

**R11. Brand guide §Hero Moment specifies a "resolving face" thermal-imaging visual for the homepage.** What we shipped in v1 is a particle field with cursor repulsion (which the brand guide later allows under "the cursor disturbs the particles when it moves nearby"). v2 brief doesn't change the visual. The brand guide still describes the unbuilt "thermal imaging readout of a person who isn't quite there": flagging because if v2 wants to actually build that, it's a Phase-3-or-later cost and the brief doesn't include it. Recommend keeping the current particle field; it satisfies the cursor-repulsion spec.

**R12. Two homepage section insertions, both into the same file.** Phase 4 adds Pre-Test feature section between What-Mirror-Is and Who-It's-For. Phase 12 adds Outcomes section between Pre-Test and Who-It's-For. Both edits target `/app/(marketing)/page.tsx`. Phase 12 must read what Phase 4 actually shipped before inserting. Mitigated by clear phase boundaries; flagging to track.

---

## 5. Open questions: ALL ANSWERED

Richard's answers received. Decisions captured below; full answer text preserved in conversation history. Phase 1.5 was the work of executing these decisions across CLAUDE.md, the three reference docs, and the v2 brief itself.

| # | Question | Decision |
|---|----------|----------|
| 1 | CLAUDE.md update timing | Phase 1.5: bundle with Q3, Q4, Q5 into one foundation-doc update phase. Done. |
| 2 | Liquid Death personas | Pre-Test ships on placeholders. LD swap is one file change later. |
| 3 | Glossary "Mirror (the product)" entry | Updated to v2 Decision Engine framing. Done. |
| 4 | Charter §What Mirror Is + §Mirror/Operate | Both updated to v2 framing. Founding story tweaked too (banned phrase). One-sentence description rewritten. Three guarantees updated to v2 forms. Done. |
| 5 | Brand guide updates | §Application Examples updated to v2 hero. §Forbidden Phrases expanded from 5 to 9. Headline-style example updated. Done. |
| 6 | Liquid Death demo build doc | Richard dropping into /docs/. Not present at end of Phase 1.5. **Phase 2 must verify presence and stop if missing.** |
| 7 | /demo file path | Keep at `/app/demo/page.tsx`. Brief path is approximate. |
| 8 | /pretest chrome | Standard chrome (Nav + Footer) inside `(marketing)/`. |
| 9 | PDF library | Install `@react-pdf/renderer` when Phase 11 begins. |
| 10 | Pricing data file path | Keep at `/components/pricing/pricing-data.ts`. |
| 11 | Install guarantee | SOFTENED. Replaced "next 3 months retainer free" with "extend Operate at no charge until you do." Updated everywhere in v2 brief (§4, Phase 5 FAQ, Phase 6 MEASURABLE OUTCOME block, Phase 6 FAQ) and in charter §The Three Offers. v2.1 reintroduces a harder dollar-back form once the methodology is validated. |
| 12 | Outcomes footnote | Reframed honestly: `TARGETS ENGINEERED INTO MIRROR'S METHODOLOGY. ACTUAL RESULTS REPORTED PER ENGAGEMENT STARTING Q3 2026.` Numbers stay. |
| 13 | Mirror Reports preview | HELD until one real Mirror Report is publishable. Cut from Phase 12 entirely. v2.1 candidate. |
| 14 | Pre-Test free-tier limit | 5 runs per session (override from brief's 3). Brief Phase 11 + Phase 9 spec updated. |
| 15 | Eyebrow style | `MIRROR · DECISION ENGINE` (middle dot). Confirmed. |
| 16 | v1 PLAN.md overwrite | Confirmed. v1 preserved at commit 6a2ee19. |

---

## 5b. Original open questions (preserved for reference)

**1. CLAUDE.md update timing.** The current CLAUDE.md is v1. Should I include CLAUDE.md updates in Phase 2 (the audit), or carve out a Phase 1.5 to update it before Phase 2 starts? Recommendation: carve out a Phase 1.5 (small, ~10K tokens) that updates CLAUDE.md with the v2 hard rules, the four new banned phrases, the four locked outcomes summary, and a pointer to the v2 brief. Otherwise every future Claude session re-reads v1 rules first.

**2. Liquid Death personas and prompts.** They were promised before v1 Phase 5, never arrived, v1 demo shipped on three placeholders. v2 Phase 11 spec assumes they exist for Pre-Test. Two paths: (a) Pre-Test ships on placeholders too; LD personas drop in later as a single replacement; (b) you provide LD personas before Phase 11 begins. Recommendation: (a). Pre-Test UI and API are persona-agnostic; swapping later is one file change. Confirm.

**3. Glossary "Mirror (the product)" entry.** Currently reads "The custom AI clone of a client's highest-value customer segment." v2 banned phrase territory. Update to "The decision engine that runs on a calibrated multi-persona model of a client's highest-value customer segment"? Or treat as internal-only (since glossary defines technical terms, not external copy)? Recommendation: update for consistency. The glossary is loaded by every Claude session and we want it aligned.

**4. Charter §What Mirror Is and §Mirror/Operate description.** Charter line 20 leads with "Mirror builds private AI clones." Charter line 92 calls Mirror "the most calibrated voice-of-customer asset in their category": both banned-phrase territory. Recommendation: update charter §What Mirror Is and §Mirror/Operate to v2 phrasing. The charter has its own amendment process ("Chair Brief, Decision Log entry, version increment"), so this is a real edit, not just a typo fix.

**5. Brand guide updates.** Two areas:
   a. §Application Examples shows the v1 hero `Talk to your customer.` as the locked reference. Update to the v2 hero `Make every customer decision...`?
   b. §The Five Forbidden Phrases lists 5. v2 adds 4. Update the brand guide to list all 9, or keep brand guide at 5 and leave v2's additions in the brief only?
   Recommendation for both: yes update. Same reason as 3.

**6. Mirror-liquiddeath-demo-build.md.** Your Phase 1 prompt referenced this file. It does not exist anywhere on the filesystem (checked /docs/ and Downloads). Was this referenced by mistake, or is there a separate spec doc you intended to share? If it exists, paste it or drop it in /docs/ before Phase 2.

**7. /demo file path.** v2 brief Phase 8 references `/app/(marketing)/demo/page.tsx`. Actual current path is `/app/demo/page.tsx` (kept outside the marketing route group in v1 Phase 5 because /demo has its own minimal top bar instead of the standard Nav+Footer chrome). Two options:
   a. Keep `/app/demo/page.tsx` as-is. Phase 8 just edits in place. Brief path is wrong, treat as drift.
   b. Move /demo into (marketing) group so it inherits Nav+Footer + add the standard chrome.
   Recommendation: (a). The full-viewport chat experience is an intentional design choice that v2 Phase 8 doesn't otherwise contradict.

**8. /pretest file path and chrome.** v2 brief Phase 9 places `/pretest` inside `(marketing)/`, meaning it gets Nav + Footer. Confirm: standard chrome is what we want, not a /demo-style minimal shell. Recommendation: confirm yes (standard chrome). The Pre-Test is a marketing surface, visitors arrive from the homepage, the nav is appropriate.

**9. PDF library for Pre-Test export.** Install `@react-pdf/renderer` (~240KB) for the export-as-brief feature in Phase 11? Alternatives:
   a. `@react-pdf/renderer` (preferred, declarative, browser + server)
   b. `jsPDF` (~190KB, imperative, browser only)
   c. Server-render to HTML, browser prints to PDF (zero new deps, slightly worse UX)
   d. Print stylesheet + browser native print (zero deps, no separate file)
   Recommendation: (a). Brief specifies it as preferred and it gives the cleanest brand-styled PDF. Confirm.

**10. Pricing data file path.** v2 brief Phase 6 references `/lib/pricing-data.ts`. Actual path is `/components/pricing/pricing-data.ts`. Move to `/lib/pricing-data.ts` to match brief, or keep where it is? Recommendation: keep where it is. Pricing data is tightly coupled to the pricing components and lives well next to them. Brief path is approximate.

**11. Install guarantee commitment.** v2 brief Section 4: "If none [of the three measurable outcomes hit by day 90 post-Install], your next 3 months of retainer are free" = $19,500 per missed-target client. Has the methodology been validated against these specific metrics on at least one cohort, or is this an aspirational guarantee that could become expensive if the methodology under-delivers? This is yours to decide; flagging because it's a contract-level promise that ships in v2 marketing.

**12. Outcomes section numbers without engagements.** Phase 12 surfaces `30 MIN`, `30-50%`, `40%+`, `+18%`. Footnote: `MEASURED ACROSS ACTIVE MIRROR/INSTALL AND OPERATE ENGAGEMENTS. NUMBERS UPDATE QUARTERLY.` If the active-engagements count is currently zero, the footnote misleads. Two options:
   a. Ship the section with framing: "Numbers Mirror is engineered to deliver" or similar, with a clearer footnote.
   b. Hold the Outcomes section until at least one engagement reports actuals, then ship it in a v2.1.
   Recommendation: (a). The numbers come from your methodology design, not from imagined client wins. Reframing the footnote is honest and keeps the section.

**13. Mirror Reports preview.** Phase 12 lists three placeholder Mirror Report titles (the Costco DTC margin one, etc.) with a `READ THE LATEST →` link. Where does that link go? Brief says "/manifesto for now; real publishing comes later." A visitor expecting an essay landing on `Coming soon.` will feel misled. Options:
   a. Ship Mirror Reports preview as-is, link to /manifesto. Risk: feels broken.
   b. Ship Mirror Reports preview, link goes to a new `/mirror-reports` index page that says "Publishing weekly starting [date]" plus an email signup.
   c. Hold the Mirror Reports preview until one real Mirror Report exists and is publishable.
   Recommendation: (c). Social proof that doesn't deliver is anti-proof. The Outcomes section alone is enough to carry Phase 12.

**14. Pre-Test free-tier limit.** Brief Phase 11 caps at 3 per session. Compared to chat demo's 10-message cap, this is tight. Three runs is barely enough to test 1 ad + 1 email + 1 landing page. Recommendation: 5 runs per session. Keeps "scarce" feeling, less risk of bouncing curious prospects. Confirm or override.

**15. Eyebrow style for v2 hero.** Brief says `MIRROR · DECISION ENGINE` (middle dot). v1 hero used `MIRROR / M1` (slash). Glossary says client Mirrors are versioned `Mirror/[ClientShortName][Version]` (slash). The slash is reserved for the product/version naming convention; the middle dot for caps separators in eyebrows and labels. v2 brief is consistent with this distinction. No change needed; flagging because Phase 3 should use `·` exactly as the brief says.

**16. v1 PLAN.md.** Currently lives at `/PLAN.md`. This file you are reading replaces it. The v1 PLAN is preserved at commit `6a2ee19`. Confirm OK to overwrite.

---

## 6. Phase-by-phase readiness (updated post-Phase-1.5)

| Phase | Ready to start? | Notes |
|-------|----------------|-------|
| 1 | DONE | Initial PLAN.md written |
| 1.5 | DONE | Foundation docs updated: CLAUDE.md, glossary, charter, brand guide. Brief revisions B/C/D applied. |
| 2 | After Phase 1.5 deploy + Richard sign-off + LD doc presence | Audit now has clean v2 docs to cross-reference. **Phase 2 must verify `/docs/mirror-liquiddeath-demo-build.md` presence and stop if missing.** |
| 3 | After Phase 2 sign-off | Hero + Proof rewrite |
| 4 | After Phase 3 sign-off | Middle sections + Pre-Test feature section |
| 5 | After Phase 4 sign-off | Closing sections |
| 6 | After Phase 5 sign-off | Pricing rebuild with softer Install guarantee per Q11 |
| 7 | After 1 |: |
| 8 | After 1, 7 | Path decision for /demo |
| 9 | After 1, 8 | /pretest placement decision |
| 10 | After 9 |: |
| 7 | After Phase 6 sign-off | Method reframe |
| 8 | After Phase 7 sign-off | /demo chrome rewrite (path stays at `/app/demo/page.tsx` per Q7) |
| 9 | After Phase 8 sign-off | /pretest scaffold + nav update. Standard chrome per Q8. |
| 10 | After Phase 9 sign-off | Pre-Test API + form |
| 11 | After Phase 10 sign-off | Pre-Test results + export. Install `@react-pdf/renderer` at start. 5-run cap per Q14. Personas remain placeholders per Q2. |
| 12 | After Phase 11 sign-off | Outcomes section only (Mirror Reports held per Q13). Honest footnote per Q12. |
| 13 | After Phase 12 sign-off | QA + launch report |

---

## 7. What I will not do without explicit approval

Per v2 brief Section 9 plus my own judgment given the scope:

- Touch any file outside the explicit Phase scope.
- Add any library not in package.json (`@react-pdf/renderer`, anything else).
- Modify the glossary, charter, or brand guide unless you explicitly approve in question 3, 4, or 5.
- Move existing files (the /demo path and pricing-data.ts location) unless you confirm in question 7 or 10.
- Skip the stop-and-approve gate at the end of any phase.
- Chain phases inside one session.

End of Phase 1.

---

## 8. Phase 1.5 changelog

Phase 1.5 added per Richard's directive after his Q1 answer. Goal: clean foundation docs of v1 framing before any source-code rewrites begin. Single deploy, single approval, `/clear` after.

**Files touched (no source code; only docs and instructions):**

- `CLAUDE.md`: full rewrite. New first-line framing: "Mirror is a private decision engine for marketing teams." Reading order updated to lead with v2 brief. Four locked outcomes summary added. Hard rules expanded to include the four v2 voice rules. The "Five Forbidden Phrases" section is now "Nine." Anti-pattern list extended with four v2-specific drift risks. Tech stack notes `@react-pdf/renderer` as approved-for-Phase-11.
- `/docs/00-glossary.md`: bumped to v2. "Mirror (the product)" entry rewritten to lead with "decision engine." Banned phrases noted in the entry itself.
- `/docs/01-company-charter.md`: bumped to v2. §What Mirror Is rewritten. §The One-Sentence Description replaced with v2 form. §Mirror/Operate description updated. All three §Three Offers guarantees updated to v2 forms (Recon: 30%+ improvement decisions; Install: softer extend-into-Operate per Q11; Operate: two-miss exit clause). §Founding Story rewritten to drop "talk to your customer" and "clone a customer" phrasing.
- `/docs/02-brand-guide.md`: bumped to v2. §The Five Forbidden Phrases is now §The Nine Forbidden Phrases. §Headline Style example updated. §Application Examples / Homepage hero updated to v2 locked structure (eyebrow `MIRROR · DECISION ENGINE`, three-line headline, new subhead, new CTAs, Pre-Test framing).
- `/docs/mirror-rebuild-brief-v2.md`: three revisions per Richard's B/C/D directives:
  - **§4** Mirror/Install guarantee softened to "extend Operate at no charge until you do" per Q11. Phase 5 FAQ #8, Phase 6 MEASURABLE OUTCOME block, and Phase 6 FAQ #2 all updated to match.
  - **Phase 11** Pre-Test free-tier cap changed from 3 to 5 per Q14. All references swept (5 places).
  - **Phase 12** Mirror Reports preview removed entirely per Q13. Outcomes footnote reframed per Q12 to: `TARGETS ENGINEERED INTO MIRROR'S METHODOLOGY. ACTUAL RESULTS REPORTED PER ENGAGEMENT STARTING Q3 2026.` Phase title shortened to "Outcomes Section."

**Files NOT touched (verified):** all of `/app/`, `/components/`, `/lib/`. No source-code edits in Phase 1.5.

**Build status:** no source change, no rebuild required. Will run `npm run build` as a sanity check before commit.

**Liquid Death doc still missing.** `/docs/mirror-liquiddeath-demo-build.md` is not present at end of Phase 1.5. Richard said he is dropping it in. Phase 2 must verify presence and stop if missing.

---

## 9. Stop instruction

Phase 1 + Phase 1.5 complete. CLAUDE.md, glossary, charter, brand guide, and v2 brief all updated to v2 framing. PLAN.md updated. All 16 questions answered.

Awaiting:
1. Richard's deploy of the Phase 1.5 commit and visual confirmation that no source-side regressions slipped in.
2. Drop `/docs/mirror-liquiddeath-demo-build.md` into /docs/ before Phase 2.
3. `/clear` before Phase 2 begins.

Phase 2 will: walk every file with user-facing strings, produce `/CHANGE-MANIFEST.md` mapping every line of v1 copy to its v2 phase, flag drift risks, list new files needed.
