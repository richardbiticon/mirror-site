import { Fragment } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StageConnector } from "./stage-connector";

/**
 * Methodology preview per brief §4.7 with locked stage content from §4.7.2.
 * Horizontal timeline desktop, vertical stack mobile. The traveling Signal
 * dot in StageConnector is the "second hero moment" of the page.
 */

const stages = [
  {
    number: "01",
    name: "INGEST",
    range: "DAYS 1-14",
    description:
      "We pull in your CRM, calls, reviews, support tickets, and run 8 customer interviews.",
  },
  {
    number: "02",
    name: "CALIBRATE",
    range: "DAYS 15-35",
    description:
      "We build the multi-persona model and tune the voting against your data.",
  },
  {
    number: "03",
    name: "INSTALL",
    range: "DAYS 36-50",
    description:
      "We deploy your Mirror into your stack with a custom-branded interface.",
  },
  {
    number: "04",
    name: "OPERATE",
    range: "DAYS 51+",
    description:
      "We retrain weekly. You use it daily. The asset compounds.",
  },
] as const;

export function MethodologyPreviewSection() {
  return (
    <Section>
      <Container>
        <Reveal className="max-w-[960px] mx-auto">
          <p className="text-eyebrow text-signal">THE METHOD</p>
          <h2 className="text-h1 text-bone mt-6">
            Four stages. Sixty days. One Mirror.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 max-w-[960px] mx-auto">
          {/* Desktop: horizontal timeline with traced connectors */}
          <div className="hidden md:flex items-start">
            {stages.map((stage, i) => (
              <Fragment key={stage.number}>
                <div className="flex flex-col w-[180px] shrink-0">
                  <p className="text-eyebrow text-ash">{stage.number}</p>
                  <h3 className="text-h3 text-bone mt-2 font-display uppercase tracking-[-0.01em]">
                    {stage.name}
                  </h3>
                  <p className="text-eyebrow text-ash mt-2">{stage.range}</p>
                  <p className="text-body-s text-bone/70 mt-4">
                    {stage.description}
                  </p>
                </div>
                {i < stages.length - 1 ? (
                  <div className="flex-1 pt-6 px-4">
                    <StageConnector />
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>

          {/* Mobile: stacked */}
          <div className="md:hidden flex flex-col gap-12">
            {stages.map((stage) => (
              <div key={stage.number}>
                <p className="text-eyebrow text-ash">{stage.number}</p>
                <h3 className="text-h3 text-bone mt-2 font-display uppercase tracking-[-0.01em]">
                  {stage.name}
                </h3>
                <p className="text-eyebrow text-ash mt-2">{stage.range}</p>
                <p className="text-body-s text-bone/70 mt-4">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="text-center mt-16">
          <Button asChild variant="ghost">
            <Link href="/method">See the full method →</Link>
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
