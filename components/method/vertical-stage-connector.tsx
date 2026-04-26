"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Vertical connector between method stages per brief §7.3.
 * 96px tall, thin Ash dotted line, with a single Signal dot animating
 * downward over 4s. Triggered once when the next stage scrolls into
 * viewport (not looping like the homepage's horizontal connector).
 *
 * prefers-reduced-motion: dotted line stays, the moving dot is hidden.
 */
export function VerticalStageConnector() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className="relative h-24 w-px mx-auto my-12"
      aria-hidden
    >
      <div className="absolute inset-y-0 left-0 border-l border-dotted border-ash/40" />
      {!reduced ? (
        <motion.span
          className="absolute left-0 -translate-x-1/2 size-1 rounded-full bg-signal"
          initial={{ top: "0%", opacity: 0 }}
          animate={
            inView
              ? {
                  top: ["0%", "0%", "100%", "100%"],
                  opacity: [0, 1, 1, 0],
                }
              : { top: "0%", opacity: 0 }
          }
          transition={{
            duration: 4,
            ease: "linear",
            times: [0, 0.05, 0.95, 1],
          }}
        />
      ) : null}
    </div>
  );
}
