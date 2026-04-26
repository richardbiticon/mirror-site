/**
 * Pricing page locked content per brief §6.
 *
 * Tier names, prices, durations, and the comparison table rows are
 * locked verbatim from /docs/01-company-charter.md §The Three Offers and
 * brief §6.4. The expanded "What's included" lists, "What's not
 * included" exclusions, "Best for" descriptions, and per-tier guarantee
 * language are drafted here and marked with TODO(richard) for review.
 * The 6 pricing FAQ answers are explicitly placeholder per brief §6.5.
 */

export interface PricingTier {
  slug: "recon" | "install" | "operate";
  name: string;
  price: string;
  priceSuffix: string;
  duration: string;
  /** 8 to 12 specific items per tier. */
  whatsIncluded: readonly string[];
  /** 2 to 4 items in Ash text. */
  whatsNotIncluded: readonly string[];
  /** 1 to 2 sentences describing the ideal client. */
  bestFor: string;
  /** Locked guarantee language for that tier. */
  guarantee: string;
  /** Primary CTA label, e.g. "Start Mirror/Recon". */
  startLabel: string;
  /** Visually emphasized as "MOST CHOSEN". */
  featured: boolean;
}

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    slug: "recon",
    name: "MIRROR/RECON",
    price: "$4,500",
    priceSuffix: "ONE-TIME",
    duration: "14 DAYS",
    // TODO(richard): refine the included list against the real Recon scope.
    whatsIncluded: [
      "Lightweight Mirror calibrated to your customer base",
      "Public review, social listening, and lightly-shared data ingestion",
      "Multi-persona architecture with 3 to 5 sub-personas",
      "The Truth Report (20 pages of synthesized customer insight)",
      "60-minute live session interviewing your own Mirror",
      "Diagnostic recommendations on where to deepen the work",
      "Confidential Data Inventory document",
      "Full asset transferred to you. You own the Mirror.",
      "Delivered in 14 days from kickoff",
    ],
    whatsNotIncluded: [
      "First-party CRM, sales call, and support ticket ingestion",
      "8 first-party customer interviews",
      "Custom-branded interface",
      "Monthly retraining",
    ],
    bestFor:
      "Companies who want to validate Mirror's value with their own market before committing to a full Install.",
    guarantee:
      "If you don't surface at least 3 actionable insights you didn't have before, we refund the full $4,500.",
    startLabel: "Start Mirror/Recon",
    featured: false,
  },
  {
    slug: "install",
    name: "MIRROR/INSTALL",
    price: "$18,000 + $6,500",
    priceSuffix: "/MO",
    duration: "60 DAYS TO BUILD, ONGOING",
    // TODO(richard): refine the included list against the real Install scope.
    whatsIncluded: [
      "Full Mirror built from CRM exports, sales calls, support tickets, reviews, and NPS data",
      "8 first-party customer interviews conducted by us",
      "Multi-persona architecture with 3 to 5 calibrated sub-personas",
      "Custom-branded interface matching your visual identity",
      "Held-out testing across 200+ scenarios with a Calibration Report",
      "Calibration Briefs written for each sub-persona",
      "Live deployment in your stack",
      "Team training session (90 minutes)",
      "IP transfer and ownership documents",
      "Weekly Mirror Reports",
      "Monthly retraining with new customer data",
      "Unlimited team access",
    ],
    whatsNotIncluded: [
      "Day-to-day operation by the Mirror team",
      "Monthly Strategic Foresight document",
      "Quarterly KPI agreement",
    ],
    bestFor:
      "Companies that want a calibrated voice-of-customer asset they own outright and operate themselves with monthly retraining.",
    guarantee:
      "If we don't deliver a calibrated Mirror by day 60, the build fee is refunded and the retainer doesn't start. 12-month minimum on the retainer.",
    startLabel: "Start Mirror/Install",
    featured: true,
  },
  {
    slug: "operate",
    name: "MIRROR/OPERATE",
    price: "FROM $15,000",
    priceSuffix: "/MO",
    duration: "QUARTERLY ENGAGEMENTS",
    // TODO(richard): refine the included list against the real Operate scope.
    whatsIncluded: [
      "Everything in Mirror/Install",
      "Daily use of Mirror to pre-test your campaigns",
      "Briefs delivered to your team or agency",
      "Monthly Strategic Foresight document",
      "Quarterly recalibration sessions",
      "Weekly Mirror Reports operated by our team",
      "Async Slack and email support",
      "Monthly retraining with new customer data",
      "Quarterly KPI agreement",
      "Quarterly executive review",
    ],
    whatsNotIncluded: [
      "Self-serve operation. We are in the seat with you.",
      "Engagements under $15,000 per month",
    ],
    bestFor:
      "Companies doing $20M+ that want a fractional CMO whose superpower is owning the most calibrated voice-of-customer asset in their category.",
    guarantee:
      "Quarterly KPI agreement. If we miss the quarter's targets, the next quarter is at 50%.",
    startLabel: "Start Mirror/Operate",
    featured: false,
  },
] as const;

/**
 * Comparison table rows per brief §6.4. Locked content.
 */
export interface ComparisonRow {
  feature: string;
  recon: boolean;
  install: boolean;
  operate: boolean;
}

export const COMPARISON_ROWS: readonly ComparisonRow[] = [
  { feature: "Custom Mirror built", recon: true, install: true, operate: true },
  { feature: "Public data only", recon: true, install: false, operate: false },
  {
    feature: "First-party CRM, calls, reviews",
    recon: false,
    install: true,
    operate: true,
  },
  {
    feature: "8 customer interviews",
    recon: false,
    install: true,
    operate: true,
  },
  {
    feature: "The Truth Report (20 pages)",
    recon: true,
    install: false,
    operate: false,
  },
  {
    feature: "Custom-branded interface",
    recon: false,
    install: true,
    operate: true,
  },
  {
    feature: "Weekly Mirror Reports",
    recon: false,
    install: true,
    operate: true,
  },
  {
    feature: "Monthly retraining",
    recon: false,
    install: true,
    operate: true,
  },
  {
    feature: "Daily operated by Mirror team",
    recon: false,
    install: false,
    operate: true,
  },
  {
    feature: "Monthly Strategic Foresight",
    recon: false,
    install: false,
    operate: true,
  },
  {
    feature: "Quarterly KPI agreement",
    recon: false,
    install: false,
    operate: true,
  },
  { feature: "You own the asset", recon: true, install: true, operate: true },
] as const;

/**
 * Pricing FAQ per brief §6.5. The 6 questions are locked; the answers
 * are explicitly placeholder per the brief and need Richard's review
 * before launch. Each entry is tagged with TODO(richard) so a final
 * pre-launch sweep catches them.
 */
export interface PricingFAQ {
  q: string;
  a: string;
  /** Set true once Richard has reviewed and locked the answer. */
  locked: boolean;
}

export const PRICING_FAQS: readonly PricingFAQ[] = [
  {
    q: "Do you offer monthly billing on Install?",
    // TODO(richard): confirm billing cadence and whether quarterly prepay is offered.
    a: "Yes. The $6,500 monthly retainer is billed in advance on the same calendar day each month. We do not lock you into annual prepay; the 12-month minimum is a commitment to the engagement, not to a single invoice.",
    locked: false,
  },
  {
    q: "What happens after the 12-month minimum?",
    // TODO(richard): confirm month-to-month rollover terms.
    a: "Month-to-month from there. Cancel with 30 days notice. The Mirror stays yours either way. The retainer covers ongoing retraining and support; if you choose to operate it without us, you keep the asset and walk.",
    locked: false,
  },
  {
    q: "Can we pause Operate engagements?",
    // TODO(richard): confirm pause policy and whether KPI commitments roll over.
    a: "Yes, with 30 days notice. Pause for up to 90 days and resume at the same rate. Quarterly KPI commitments pause with the engagement.",
    locked: false,
  },
  {
    q: "What if we need a custom scope?",
    // TODO(richard): confirm custom scope process and pricing floor.
    a: "We scope custom engagements above the Operate floor. Common cases are multi-segment Mirrors (more than one customer cohort), white-label deployments to multiple business units, or accelerated builds. Bring it to the Diagnostic Call and we will quote you on the call or within 24 hours after.",
    locked: false,
  },
  {
    q: "Do you do annual prepay discounts?",
    // TODO(richard): confirm whether annual prepay is offered and at what discount.
    a: "Annual prepay on Install retainers gets you 10% off and a Q1 priority retraining slot. We do not discount Operate; the value compounds with us in the seat and the rate reflects that.",
    locked: false,
  },
  {
    q: "Are there setup fees beyond the build fee?",
    // TODO(richard): confirm setup fees, especially for Operate onboarding.
    a: "No hidden fees. The Install build fee covers everything in the build phase. Operate has no separate setup fee on top of the monthly. If your stack requires unusual integrations (custom data warehouse access, on-prem deployment), we will quote those upfront before kickoff.",
    locked: false,
  },
] as const;
