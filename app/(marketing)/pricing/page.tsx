import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { FinalCTA } from "@/components/shared/final-cta";
import { PricingTierCard } from "@/components/pricing/pricing-tier-card";
import { ComparisonTable } from "@/components/pricing/comparison-table";
import { PricingFAQ } from "@/components/pricing/pricing-faq";
import { PRICING_TIERS } from "@/components/pricing/pricing-data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Three ways to install a Mirror. From a 14-day diagnostic to a fully operated growth function. Every Mirror is built for one company. Yours.",
};

export default function PricingPage() {
  return (
    <main id="main" className="relative z-10 pt-24">
      {/* Page header per brief §6.2 */}
      <Section rhythm="compact">
        <Container>
          <Reveal>
            <p className="text-eyebrow text-signal">PRICING</p>
            <h1 className="text-display-l text-bone mt-6">
              Three ways to install a Mirror.
            </h1>
            <p className="text-body-l text-bone/70 mt-8 max-w-[640px]">
              From a 14-day diagnostic to a fully operated growth function.
              Every Mirror is built for one company. Yours.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Tier cards per brief §6.3 */}
      <Section rhythm="compact">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {PRICING_TIERS.map((tier, i) => (
              <Reveal key={tier.slug} delay={i * 0.1}>
                <PricingTierCard tier={tier} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Comparison table per brief §6.4 */}
      <Section rhythm="compact">
        <Container>
          <Reveal>
            <p className="text-eyebrow text-signal">COMPARE THE TIERS</p>
            <h2 className="text-h1 text-bone mt-6">Side by side.</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <ComparisonTable />
          </Reveal>
        </Container>
      </Section>

      {/* Pricing FAQ per brief §6.5 */}
      <Section rhythm="compact">
        <Container width="prose">
          <Reveal>
            <p className="text-eyebrow text-signal">PRICING QUESTIONS</p>
            <h2 className="text-h1 text-bone mt-6">
              The questions about money.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <PricingFAQ />
          </Reveal>
        </Container>
      </Section>

      {/* Final CTA per brief §6.6 */}
      <FinalCTA
        headlineLines={["Three tiers.", "One next step.", "A 20-minute call."]}
        ctaLabel="Book your diagnostic call"
        caption="20 MINUTES. NO PITCH. WE'LL TELL YOU IF YOU'RE A FIT."
      />
    </main>
  );
}
