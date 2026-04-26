import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CalEmbed } from "@/components/book/cal-embed";
import { WhatToExpect } from "@/components/book/what-to-expect";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "20 minutes. We ask 5 questions, show you a live demo, and tell you whether you are a fit. No pitch.",
};

const calLink = process.env.NEXT_PUBLIC_CAL_EVENT;

/**
 * /book per brief §8.
 *
 * Page header with locked copy, then the Cal.com embed (gated on the
 * NEXT_PUBLIC_CAL_EVENT env var per Richard's PLAN §4.5 answer; if
 * unset, a placeholder banner appears in the embed slot), then the
 * "What to expect" 4-item numbered list.
 */
export default function BookPage() {
  return (
    <main id="main" className="relative z-10 pt-24">
      <Section rhythm="compact">
        <Container width="book">
          <Reveal>
            <p className="text-eyebrow text-signal">BOOK A CALL</p>
            <h1 className="text-display-l text-bone mt-6">20 minutes.</h1>
            <p className="text-body-l text-bone/70 mt-8">
              We&apos;ll ask 5 questions, show you a live demo, and tell you
              whether you&apos;re a fit. No pitch.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section rhythm="compact">
        <Container width="book">
          <Reveal delay={0.1}>
            {calLink ? (
              <CalEmbed calLink={calLink} />
            ) : (
              <BookingPlaceholder />
            )}
          </Reveal>
        </Container>
      </Section>

      <Section rhythm="compact">
        <Container width="book">
          <Reveal>
            <WhatToExpect />
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}

function BookingPlaceholder() {
  return (
    <div className="border border-ash/30 bg-smoke p-12 text-center">
      <p className="text-eyebrow text-signal">BOOKING OPENS SHORTLY</p>
      <p className="text-body text-bone mt-6 max-w-[480px] mx-auto">
        The Diagnostic Call calendar is being scheduled. The embed wires
        up as soon as the booking link is live. Check back in a day or
        two.
      </p>
    </div>
  );
}
