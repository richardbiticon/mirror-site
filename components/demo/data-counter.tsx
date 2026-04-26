"use client";

import { useEffect, useState } from "react";

/**
 * Calibration data counter per brief §5.2.
 * Animates from 0 to the target over 30s on the visitor's first visit
 * (tracked via localStorage), then stays static. Subsequent visits jump
 * straight to the final value.
 *
 * Initial render value is the target so SSR matches the most-common
 * client state (returning visitor) and there is no hydration jump. The
 * first-visit animation kicks off inside a requestAnimationFrame callback
 * so setState calls happen outside the effect body.
 */

const DURATION_MS = 30_000;
const STORAGE_KEY = "mirror.demo.counter.seen";

interface Props {
  target: number;
}

export function DataCounter({ target }: Props) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    const seen = window.localStorage.getItem(STORAGE_KEY) === "1";
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (seen || reduced) {
      window.localStorage.setItem(STORAGE_KEY, "1");
      return;
    }

    const start = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / DURATION_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        window.localStorage.setItem(STORAGE_KEY, "1");
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <span aria-live="off" suppressHydrationWarning>
      {value.toLocaleString("en-US")}
    </span>
  );
}
