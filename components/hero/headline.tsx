"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Hero headline per /docs/mirror-website-build-brief.md §4.2.4.
 *
 * Two locked lines:
 *   Talk to your customer.
 *   Before you sell to them.
 *
 * Each character fades in with a 30ms stagger starting at 200ms, so the
 * total entrance is ~1200ms. The wrapping h1 carries an aria-label with
 * the full text so screen readers do not see one character per element.
 *
 * prefers-reduced-motion: characters appear instantly.
 */

const LINES = ["Talk to your customer.", "Before you sell to them."] as const;
const ARIA_TEXT = LINES.join(" ");
const STAGGER_S = 0.03;
const START_DELAY_S = 0.2;

interface HeroHeadlineProps {
  className?: string;
}

export function HeroHeadline({ className }: HeroHeadlineProps) {
  const reduced = useReducedMotion();

  return (
    <h1
      aria-label={ARIA_TEXT}
      className={cn("text-display-xl text-bone", className)}
    >
      {LINES.map((line, lineIndex) => {
        const charsBefore = LINES.slice(0, lineIndex).reduce(
          (sum, l) => sum + l.length + 1,
          0,
        );
        return (
          <span key={lineIndex} aria-hidden className="block">
            {Array.from(line).map((char, charIndex) => {
              const globalIndex = charsBefore + charIndex;
              const delay = reduced
                ? 0
                : START_DELAY_S + globalIndex * STAGGER_S;
              return (
                <motion.span
                  key={charIndex}
                  initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: reduced ? 0 : 0.4,
                    delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    display: "inline-block",
                    whiteSpace: "pre",
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
