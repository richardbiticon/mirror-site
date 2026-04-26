"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Methodology stage connector per brief §4.7.2.
 * Horizontal 1px Ash dotted line with a 4px Signal dot tracing left to
 * right over 8s, looping. The brief calls this the "second hero moment"
 * of the page; it is intentionally subtle.
 *
 * prefers-reduced-motion: dotted line stays, the moving dot is hidden.
 */
export function StageConnector() {
  const reduced = useReducedMotion();

  return (
    <div className="relative w-full h-px" aria-hidden>
      <div className="absolute inset-x-0 top-0 border-t border-dotted border-ash/40" />
      {!reduced && (
        <motion.span
          className="absolute top-0 size-1 rounded-full bg-signal -translate-y-1/2"
          initial={{ left: "0%", opacity: 0 }}
          animate={{
            left: ["0%", "0%", "100%", "100%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 8,
            ease: "linear",
            times: [0, 0.05, 0.95, 1],
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );
}
