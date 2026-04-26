/**
 * Demo Mirror prompt scaffold.
 *
 * Two pieces:
 *   1. DEMO_BRAND: the brand identity the Mirror is calibrated against.
 *      Drives the "MIRROR / {NAME}" labels and the calibration counter.
 *   2. SYSTEM_PROMPT: the orchestration prompt that runs the multi-persona
 *      voting structure described in /docs/01-company-charter.md and the
 *      brief §5.5. It composes with the sub-persona prompts in personas.ts.
 *
 * Both are placeholders for v1. The real Liquid Death build replaces them
 * after Phase 5 via /docs/mirror-liquiddeath-demo-build.md (added to
 * /docs/ before Phase 5 review per Richard's PLAN §4.7 answer).
 */

import { PLACEHOLDER_PERSONAS, type Persona } from "./personas";

export const DEMO_BRAND = {
  /** Used in "MIRROR / DEMO" labels in the top bar and empty state. */
  shortName: "DEMO",
  /** Used in body copy. */
  displayName: "Demo",
  /** Counter target for the top bar status indicator. */
  dataPoints: 1243,
} as const;

/**
 * Orchestration prompt. The model is asked to pick a lead sub-persona,
 * answer in that voice, report how many of the other personas would
 * concur, and surface a brief reasoning trace.
 *
 * The real prompt will be domain-specific (Liquid Death's category, ICP,
 * objection patterns) and considerably longer. This placeholder is enough
 * to demonstrate the voting structure end to end in the UI.
 */
export const SYSTEM_PROMPT = `You are a Mirror, a private AI clone of a company's highest-value customer segment. You are not a generic chatbot. You speak in the voice of a real customer who has lived the brand.

You are composed of multiple sub-personas defined separately. On every question:
1. Pick the single sub-persona whose perspective most directly answers the question. That sub-persona is the lead voice.
2. Generate the answer in that lead voice. Short sentences. Specific detail. No hedging. No corporate softening.
3. Internally consider how the other sub-personas would respond. Count how many of them would broadly agree with the lead.
4. Return a brief reasoning trace explaining why the lead voice was chosen and where the other sub-personas would diverge.

Voice rules that bind every sub-persona:
- No em dashes. Use periods, commas, or colons.
- No corporate language ("revolutionize", "leverage", "synergy", "best-in-class").
- No marketing slogans. Speak as a person describing their own experience.
- Maximum 4 sentences in the lead response.

You are calibrated on real data from this brand's customers. You do not know any other brand. If asked about a brand you were not calibrated on, say so plainly and offer to answer about the brand you do know.`;

export interface MirrorConfig {
  brand: typeof DEMO_BRAND;
  systemPrompt: string;
  personas: readonly Persona[];
}

export const DEMO_CONFIG: MirrorConfig = {
  brand: DEMO_BRAND,
  systemPrompt: SYSTEM_PROMPT,
  personas: PLACEHOLDER_PERSONAS,
} as const;

/**
 * Suggested questions surfaced in the /demo sidebar.
 * Brief §5.4 lists six placeholder questions; these get customized per
 * brand when the real demo Mirror is wired.
 */
export const SUGGESTED_QUESTIONS = [
  "Why do customers choose you over the alternative?",
  "What would make a high-value customer churn?",
  "Is your pricing too high, too low, or correct?",
  "What's the strongest objection during the buying process?",
  "What product would your best customers buy next?",
  "What does your worst review have in common with your best?",
] as const;
