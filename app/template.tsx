"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Page transition per /docs/mirror-website-build-brief.md §12.4.
 * Each navigation creates a fresh template instance; the new page fades in
 * from opacity 0 over 200ms using the locked easing curve. The Void background
 * sits underneath, so the transition reads as "fade through Void".
 *
 * Respects prefers-reduced-motion by skipping the animation entirely.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: reduced ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduced ? 0 : 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
}
