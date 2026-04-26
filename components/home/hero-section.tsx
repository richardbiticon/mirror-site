"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { HeroParticleField } from "@/components/hero/particle-field";
import { HeroHeadline } from "@/components/hero/headline";
import { CustomCursor } from "@/components/hero/custom-cursor";
import { Button } from "@/components/ui/button";

/**
 * Homepage hero per /docs/mirror-website-build-brief.md §4.2.
 *
 * Locked layout:
 * - Section is full viewport height, capped at 900px, content left-aligned
 *   inside a 960px max-width container.
 * - Canvas particle field at z-0, 60% Void overlay at z-1, typography at z-10.
 *
 * Locked entrance timing (§4.2.4):
 * - Eyebrow: 0ms, 400ms fade
 * - Headline: starts at 200ms, character-by-character (HeroHeadline)
 * - Subhead: 1400ms, 600ms fade
 * - CTAs: 1800ms, 600ms slide-up + fade
 * - Caption: 2200ms, 400ms fade
 *
 * Locked copy in §4.2.2 (do not modify).
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  return (
    <section
      id="main"
      ref={sectionRef}
      className="relative h-dvh max-h-[900px] flex items-center overflow-hidden"
    >
      <HeroParticleField />
      <div
        className="absolute inset-0 z-[1] bg-void/60 pointer-events-none"
        aria-hidden
      />
      <CustomCursor scopeRef={sectionRef} />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 pointer-events-none">
        <div className="max-w-[960px]">
          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
            className="text-eyebrow text-signal"
          >
            MIRROR / M1
          </motion.p>

          <HeroHeadline className="mt-6" />

          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduced ? 0 : 0.6,
              delay: reduced ? 0 : 1.4,
              ease: EASE,
            }}
            className="text-body-l text-bone/70 mt-8 max-w-[540px]"
          >
            Mirror builds you a private AI clone of your highest-value
            customer segment. Calibrated on your data. Deployed in your
            stack. Owned by you.
          </motion.p>

          <motion.div
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.6,
              delay: reduced ? 0 : 1.8,
              ease: EASE,
            }}
            className="flex flex-wrap items-center gap-4 mt-10 pointer-events-auto"
          >
            <Button asChild>
              <Link href="/demo">Try a live Mirror</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/book">Book a call</Link>
            </Button>
          </motion.div>

          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduced ? 0 : 0.4,
              delay: reduced ? 0 : 2.2,
              ease: EASE,
            }}
            className="text-eyebrow text-ash mt-12"
          >
            CURRENTLY BUILDING MIRRORS FOR COMPANIES BETWEEN $5M AND $200M.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
