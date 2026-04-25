# 00 — Glossary

**Owner:** Richard
**Version:** v1
**Last updated:** 2026-04-25
**Status:** Locked. Changes require a Decision Log entry.

---

## Purpose

This is the single source of truth for every term, name, and label used inside Mirror. If a word is in this document, it is used exactly as written, everywhere: in copy, in conversations with clients, in Council outputs, in internal docs, in code comments. If a word is not in this document and it describes something specific to Mirror, it gets added here before it gets used.

This exists because language drift is the first thing that breaks an AI-augmented company. If "Recon" becomes "the diagnostic" becomes "the audit" across three different documents, every Council role starts producing slightly different outputs and within a month nothing is consistent. The Glossary prevents that.

---

## Company

**Mirror** — The company name. Always capitalized as "Mirror" in body copy. Rendered as "MIRROR" only in display typography (logo, headlines). Never "mirror.ai" in prose unless referring to the domain.

**Mirror (the product)** — The custom AI clone of a client's highest-value customer segment. When ambiguous, refer to it as "a Mirror" (one client's instance) or "the Mirror platform" (the company's underlying methodology). Never "the Mirror tool" or "the Mirror app."

**The Council** — The internal operating system of eight AI roles that Mirror is run through. External-facing only when telling our founding story. Internally, used constantly.

**The Chair** — The meta-role within the Council that convenes the other roles and produces decision briefs. Never "the moderator," "the facilitator," or "the orchestrator."

---

## The Three Offers

These names are locked. Never abbreviate, rephrase, or substitute.

**Mirror/Recon** — The 14-day, $4,500 diagnostic engagement. Never "the Recon," "Recon offer," "the diagnostic," "the audit," or "the trial."

**Mirror/Install** — The 60-day build engagement at $18,000 plus $6,500/month retainer. Never "the Install," "the build," or "the implementation."

**Mirror/Operate** — The fully operated engagement at $15,000 to $25,000 per month. Never "the Operate tier," "managed services," or "the retainer."

When listing all three together: "Mirror/Recon, Mirror/Install, and Mirror/Operate." Always in that order. That order reflects the value ladder.

---

## Client Mirror Naming

Every client's Mirror gets a versioned name. Format: **Mirror/[ClientShortName][Version]**.

Example: Patagonia's first Mirror is **Mirror/Patagonia M1**. If they expand to a second customer segment, that's **Mirror/Patagonia M2**.

Never "Patagonia's Mirror" in formal contexts. Always the versioned name.

---

## Methodology Terms

**Ingest** — The phase where we pull in a client's data sources (CRM, calls, reviews, etc.). Always "Ingest," never "intake," "onboarding," or "data collection."

**Calibrate** — The phase where the multi-persona model is tuned against the client's data. Always "Calibrate," never "train," "tune," or "fit."

**Install** — The phase where the Mirror is deployed into the client's stack. Always "Install," never "deploy," "launch," or "go live."

**Operate** — The ongoing phase where Mirror is used and retrained weekly. Always "Operate," never "maintain," "manage," or "run."

These four words also map directly to the Mirror/Install delivery sequence: Ingest, Calibrate, Install, Operate.

---

## Mirror Internals

**Sub-persona** — One of the 3 to 5 distinct customer archetypes that make up a single Mirror. Never "persona," "segment," or "voice."

**The Voting** — The internal logic where sub-personas converge on a unified Mirror response. Always "the voting," never "consensus," "synthesis," or "aggregation."

**Calibration Brief** — The document we write per sub-persona during the Calibrate phase. Always two words, capitalized.

**Mirror Report** — The weekly intelligence document delivered to Operate clients, and the name of our public newsletter. Same name, different audiences. Always two words, capitalized.

**The Truth Report** — The 20-page deliverable from Mirror/Recon. Always "The Truth Report" or "the Truth Report," never "the report" alone in client-facing copy.

---

## ICP and Sales Terms

**ICP** — Ideal Customer Profile. Acceptable abbreviation. The full ICP definition lives in 04 — Sales / ICP Definition.

**A-tier, B-tier, C-tier** — Our prospect list segmentation. A is hand-researched top 50, B is strong fit 100, C is long tail 100.

**Diagnostic Call** — The 20-minute first call we book with prospects. Always "Diagnostic Call," never "discovery call," "intro call," or "consultation."

**Founder-led** — A qualifier for prospects where the founder is still the primary decision-maker on marketing. Used in ICP filtering.

---

## People and Roles

**Richard** — Co-founder. Owns Sales, Brand, Strategy primary.
**Raj** — Co-founder. Owns Build, Delivery technical, Ops primary.

**The Council Roles** (each a separate Claude Project):
1. **Strategy**
2. **Brand**
3. **Sales**
4. **Build**
5. **Delivery**
6. **Marketing**
7. **Ops**
8. **The Chair**

Always referred to by these exact names, capitalized, when referring to the Project. When referring to the *function* in lowercase prose (e.g. "we need to do the marketing"), no capitalization.

---

## Documents and Artifacts

**Company Charter** — The locked positioning, ICP, and offer document. Lives in 01 — Strategy.
**Council Charter** — The document defining how the Council operates. Lives in 08 — The Council.
**Role Charter** — The constitution for a single Council role. There are eight. Live in 08 — The Council / Role Charters.
**Decision Log** — The append-only record of every meaningful company decision. Lives in 00 — Company OS.
**Chair Brief** — The structured output The Chair produces when convening the Council on a decision. Lives in 08 — The Council / Chair Briefs.
**Open Question** — A decision currently being deliberated by the Council. Tracked in 01 — Strategy / Open Questions.

---

## Writing Conventions

**No em dashes.** Use periods, commas, or colons. This applies to all internal and external writing. Hard rule.

**No "AI-powered."** We don't lead with the AI. We lead with the outcome. If we must reference the technology, we say "calibrated," "trained on," or name the specific capability.

**No "leverage" as a verb.** Use "use."

**No "synergy," "innovative," "cutting-edge," "revolutionary," "best-in-class."** These words signal that we're hiding behind language. We don't.

**Numbers under ten written out, ten and above as numerals,** except in pricing, statistics, and dates where numerals always.

**Dates in ISO format internally** (2026-04-25). External-facing dates can be written naturally ("April 25").

---

## Banned Terms

Terms we never use in any Mirror context, internal or external:

- "AI agent" (use "Council role" or name the specific role)
- "ChatGPT," "GPT," "LLM" in client-facing copy (we say "the model" or "calibrated AI" if needed)
- "Persona" alone (use "sub-persona" for Mirror internals, or "customer segment" for general business talk)
- "Customer journey" (use "buying behavior" or be specific about the stage)
- "Funnel" (use "pipeline" for sales, "sequence" for nurture)
- "Hack," "growth hack," "ninja," "guru"
- "We're like X for Y" (we are not like anything)

---

## How to Update This Document

1. Identify the term that needs adding, changing, or removing.
2. Open a Chair Brief for the change.
3. The Chair convenes Brand and Strategy at minimum.
4. Decision is logged in the Decision Log with the term, the change, and the reasoning.
5. This document is updated, version incremented, date updated.
6. The previous version is moved to 09 — Archive.
7. All eight Council Projects are notified (knowledge base refresh).

The Glossary is the only document where ad-hoc edits are explicitly forbidden. Every change runs through the process above. This is what keeps language stable across the company as it grows.
