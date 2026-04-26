import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Tiers preview per brief §4.6 with locked content from §4.6.3.
 * Three Smoke cards in equal columns desktop, stacked mobile.
 * Mirror/Install gets the "MOST CHOSEN" eyebrow above its card.
 */

const tiers = [
  {
    slug: "recon",
    name: "MIRROR/RECON",
    price: "$4,500",
    priceSuffix: "ONE-TIME",
    duration: "14 DAYS",
    description:
      "A diagnostic Mirror, built from public and lightly-shared data.",
    inclusions: [
      "Lightweight Mirror calibrated to your customer base",
      "The Truth Report (20 pages of synthesized customer insight)",
      "60-minute live session interviewing your own Mirror",
      "Full refund if you don't get 3 actionable insights",
    ],
    featured: false,
  },
  {
    slug: "install",
    name: "MIRROR/INSTALL",
    price: "$18,000 + $6,500",
    priceSuffix: "/MO",
    duration: "60 DAYS TO BUILD, ONGOING",
    description:
      "A fully calibrated Mirror, deployed in your stack, owned by you.",
    inclusions: [
      "Full Mirror built from CRM, calls, reviews, support, and 8 customer interviews",
      "Custom-branded interface, multi-persona architecture",
      "Weekly Mirror Reports",
      "Unlimited team access, monthly retraining",
    ],
    featured: true,
  },
  {
    slug: "operate",
    name: "MIRROR/OPERATE",
    price: "FROM $15,000",
    priceSuffix: "/MO",
    duration: "QUARTERLY ENGAGEMENTS",
    description: "We install Mirror, then we operate it for you.",
    inclusions: [
      "Everything in Mirror/Install",
      "Daily use of Mirror to pre-test all your campaigns",
      "Briefs delivered to your team or agency",
      "Monthly Strategic Foresight document",
      "Quarterly KPI agreement",
    ],
    featured: false,
  },
] as const;

export function TiersPreviewSection() {
  return (
    <Section>
      <Container>
        <Reveal>
          <p className="text-eyebrow text-signal text-center">THREE WAYS IN</p>
          <h2 className="text-h1 text-bone text-center mt-6">
            Pick your depth.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16">
          {tiers.map((tier, i) => (
            <Reveal
              key={tier.slug}
              delay={i * 0.1}
              className="relative"
            >
              {tier.featured ? (
                <p className="text-eyebrow text-signal absolute -top-6 left-0">
                  MOST CHOSEN
                </p>
              ) : null}
              <Card
                className={cn(
                  "h-full flex flex-col",
                  tier.featured && "border-signal/30",
                )}
              >
                <p className="font-display uppercase text-[14px] tracking-[0.08em] text-signal">
                  {tier.name}
                </p>
                <div className="mt-4 flex items-baseline gap-2 flex-wrap">
                  <span className="font-display text-[32px] leading-none text-bone">
                    {tier.price}
                  </span>
                  <span className="text-eyebrow text-ash">
                    {tier.priceSuffix}
                  </span>
                </div>
                <p className="text-eyebrow text-ash mt-2">{tier.duration}</p>
                <p className="text-body text-bone mt-6">{tier.description}</p>
                <hr className="my-4 border-ash/30" />
                <ul className="space-y-3 flex-1">
                  {tier.inclusions.map((inc) => (
                    <li
                      key={inc}
                      className="flex items-start gap-3 text-body-s text-bone"
                    >
                      <span
                        className="size-1.5 rounded-full bg-signal mt-2 shrink-0"
                        aria-hidden
                      />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button asChild variant="ghost">
                    <Link href={`/pricing#${tier.slug}`}>Learn more →</Link>
                  </Button>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
