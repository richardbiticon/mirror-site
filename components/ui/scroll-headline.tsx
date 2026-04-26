"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Headline that fades in character-by-character when scrolled into view.
 * Same animation language as the hero headline (see /components/hero/headline.tsx)
 * but triggered by viewport entry instead of mount. Used for the homepage
 * final CTA per brief §4.9.2.
 *
 * 30ms stagger, 400ms per character. The wrapping h2 carries an aria-label
 * so screen readers do not enumerate per character.
 */
interface ScrollHeadlineProps {
  lines: readonly string[];
  /** Tailwind class for size, defaults to text-display-xl. */
  className?: string;
  /** Element tag, defaults to h2. */
  as?: "h1" | "h2" | "h3";
}

const STAGGER_S = 0.03;

export function ScrollHeadline({
  lines,
  className,
  as: Tag = "h2",
}: ScrollHeadlineProps) {
  const reduced = useReducedMotion();
  const ariaText = lines.join(" ");

  return (
    <Tag
      aria-label={ariaText}
      className={cn("text-display-xl text-bone", className)}
    >
      {lines.map((line, lineIndex) => {
        const charsBefore = lines.slice(0, lineIndex).reduce(
          (sum, l) => sum + l.length + 1,
          0,
        );
        return (
          <motion.span
            key={lineIndex}
            aria-hidden
            className="block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {Array.from(line).map((char, charIndex) => {
              const globalIndex = charsBefore + charIndex;
              return (
                <motion.span
                  key={charIndex}
                  variants={{
                    hidden: { opacity: reduced ? 1 : 0 },
                    visible: { opacity: 1 },
                  }}
                  transition={{
                    duration: reduced ? 0 : 0.4,
                    delay: reduced ? 0 : globalIndex * STAGGER_S,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {char}
                </motion.span>
              );
            })}
          </motion.span>
        );
      })}
    </Tag>
  );
}
