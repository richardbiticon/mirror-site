/**
 * Mirror brand design tokens.
 * Locked. Source of truth for any code that needs to read brand values.
 * Visual changes require a Chair Brief — see /docs/02-brand-guide.md.
 */

export const color = {
  void: "#0A0A0B",
  bone: "#F4F2EE",
  smoke: "#1A1A1D",
  ash: "#6B6B70",
  signal: "#00FF9D",
  warning: "#FFB000",
  error: "#FF3B30",
} as const;

export type ColorName = keyof typeof color;

/**
 * Locked spacing scale, in pixels. No arbitrary values elsewhere in the codebase.
 */
export const spacing = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192] as const;

export type SpacingStep = (typeof spacing)[number];

/**
 * Type scale. Sizes in pixels. lineHeight unitless. tracking in em.
 * Display family is JetBrains Mono until Berkeley Mono is purchased.
 */
export const type = {
  displayXL: { size: 72, lineHeight: 0.95, tracking: "-0.03em", family: "display" },
  displayL: { size: 56, lineHeight: 1.0, tracking: "-0.02em", family: "display" },
  h1: { size: 44, lineHeight: 1.05, tracking: "-0.02em", family: "display" },
  h2: { size: 32, lineHeight: 1.1, tracking: "-0.01em", family: "display" },
  h3: { size: 22, lineHeight: 1.3, tracking: "0", family: "display" },
  eyebrow: { size: 12, lineHeight: 1.0, tracking: "0.12em", family: "display", uppercase: true },
  bodyL: { size: 18, lineHeight: 1.6, tracking: "0", family: "body" },
  body: { size: 16, lineHeight: 1.6, tracking: "0", family: "body" },
  bodyS: { size: 14, lineHeight: 1.5, tracking: "0", family: "body" },
  caption: { size: 12, lineHeight: 1.4, tracking: "0", family: "body" },
} as const;

export type TypeToken = keyof typeof type;

/**
 * Locked easing curve. Used for entrances, hovers, page transitions.
 */
export const easing = {
  mirror: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

/**
 * Locked animation durations, in ms.
 */
export const duration = {
  hover: 400,
  buttonFill: 300,
  reveal: 800,
  pageTransition: 200,
  cursorTrail: 200,
  thinkingPulse: 1200,
  scrollReveal: 800,
  charStagger: 30,
  headlineTotal: 1200,
} as const;

/**
 * Section rhythm.
 */
export const section = {
  paddingDesktop: 128,
  paddingMobile: 64,
} as const;

/**
 * Layout caps.
 */
export const layout = {
  maxContent: 1280,
  maxProse: 760,
  maxCopy: 640,
  maxBookEmbed: 720,
} as const;
