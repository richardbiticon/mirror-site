import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

/**
 * "What Mirror is" explainer per brief §4.4.
 * Centered headline, left-aligned body. No icons, no three-column features.
 * The discipline of letting words carry weight is the brand.
 */
export function WhatMirrorIsSection() {
  return (
    <Section>
      <Container width="prose">
        <Reveal>
          <p className="text-eyebrow text-signal text-center">WHAT MIRROR IS</p>
          <h2 className="text-h1 text-bone text-center mt-6">
            Not a chatbot. Not a research firm.
            <br />
            A new kind of asset.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 max-w-[640px] mx-auto text-body-l text-bone space-y-6">
            <p>
              Mirror is a private AI clone of your best customer, calibrated
              on your CRM, your sales calls, your reviews, and your support
              tickets. It speaks the way they speak. It objects the way they
              object. It buys the way they buy.
            </p>
            <p>
              You talk to it like a focus group of one. You test creative
              against it before you spend on media. You hand it to your
              agency as the brief.
            </p>
            <p>
              The Mirror lives in your stack. You own it. We built the
              methodology. You own the asset.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
