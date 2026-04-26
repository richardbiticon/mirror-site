"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

/**
 * Reveal wrapper per /docs/mirror-website-build-brief.md §12.5.
 * 800ms slide-up 60px + opacity 0 to 1 when 20% of the element enters viewport.
 * Triggered once. Easing locked to cubic-bezier(0.16, 1, 0.3, 1).
 *
 * Use on section headlines and feature blocks, not every element.
 * prefers-reduced-motion: instant reveal, no slide.
 */
interface RevealProps extends HTMLMotionProps<"div"> {
  /** Optional delay in seconds, applied after viewport enter. */
  delay?: number;
}

export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduced ? 0 : 0.8,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
