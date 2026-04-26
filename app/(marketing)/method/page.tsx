import type { Metadata } from "next";
import { Fragment } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { FinalCTA } from "@/components/shared/final-cta";
import {
  StageSection,
  type StageContent,
} from "@/components/method/stage-section";
import { VerticalStageConnector } from "@/components/method/vertical-stage-connector";

export const metadata: Metadata = {
  title: "Method",
  description:
    "Four stages. Sixty days. One asset that compounds. The full Mirror build methodology.",
};

/**
 * Locked stage content from brief §7.4. Verbatim.
 */
const STAGES: readonly StageContent[] = [
  {
    number: "01",
    name: "INGEST",
    range: "DAYS 1-14",
    description:
      "We pull in your customer data from every available source. CRM exports tell us who buys. Sales call recordings tell us how they buy. Support tickets tell us where they hurt. Reviews and NPS tell us what they say in public. Then we run 8 customer interviews ourselves to fill the gaps your data can't.",
    whatWeDo: [
      "CRM and transactional data ingestion",
      "Sales call transcript analysis (12 months of recordings)",
      "Support ticket review and tagging",
      "Public review and social listening pull",
      "8 first-party customer interviews conducted by us",
      "Data normalization into a single structured corpus",
    ],
    whatYouGet: [
      "A confidential Data Inventory document",
      "Anonymized interview transcripts",
    ],
  },
  {
    number: "02",
    name: "CALIBRATE",
    range: "DAYS 15-35",
    description:
      "We identify the 3 to 5 distinct sub-personas inside your customer base and build a calibration brief for each. Then we train the multi-persona architecture, where the personas debate, vote, and converge on every Mirror response. We test the model against held-out data until it stops surprising us.",
    whatWeDo: [
      "Sub-persona identification and naming",
      "Calibration Brief written per sub-persona",
      "Multi-persona voting architecture deployed",
      "Held-out testing across 200+ test scenarios",
      "Iterative tuning based on misses",
    ],
    whatYouGet: [
      "Calibration Briefs for each sub-persona",
      "A Calibration Report showing test accuracy",
    ],
  },
  {
    number: "03",
    name: "INSTALL",
    range: "DAYS 36-50",
    description:
      "We deploy your Mirror into your stack with a custom-branded interface. Your team gets unlimited access. We hand over the IP transfer documents. From this day forward, the asset is yours.",
    whatWeDo: [
      "Custom Mirror interface deployment",
      "Branded UI matching your visual identity",
      "Team access provisioning",
      "Integration with your tools (Slack, Notion, etc., as scoped)",
      "IP transfer and ownership documentation",
    ],
    whatYouGet: [
      "A live, branded Mirror interface",
      "Team training session (90 minutes)",
      "IP transfer documents",
    ],
  },
  {
    number: "04",
    name: "OPERATE",
    range: "DAY 51 AND BEYOND",
    description:
      "The Mirror is yours, but it needs feeding. We retrain monthly with new data. We deliver a Weekly Mirror Report surfacing the insights it generated. You use it daily to brief your team, test campaigns, and pre-empt decisions before they cost you.",
    whatWeDo: [
      "Monthly retraining with new customer data",
      "Weekly Mirror Report delivery",
      "Quarterly recalibration sessions",
      "Async support for your team",
    ],
    whatYouGet: [
      "A Mirror that gets sharper every month",
      "A Weekly Mirror Report",
      "Quarterly insight reviews",
    ],
  },
] as const;

export default function MethodPage() {
  return (
    <main id="main" className="relative z-10 pt-24">
      <Section rhythm="compact">
        <Container width="prose">
          <Reveal>
            <p className="text-eyebrow text-signal">THE METHOD</p>
            <h1 className="text-display-l text-bone mt-6">
              How a Mirror gets built.
            </h1>
            <p className="text-body-l text-bone/70 mt-8">
              Four stages. Sixty days. One asset that compounds.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section rhythm="compact">
        <Container width="prose">
          {STAGES.map((stage, i) => (
            <Fragment key={stage.number}>
              <StageSection stage={stage} />
              {i < STAGES.length - 1 ? <VerticalStageConnector /> : null}
            </Fragment>
          ))}
        </Container>
      </Section>

      <FinalCTA
        headlineLines={["See the method", "work on", "your data."]}
        ctaLabel="Book your diagnostic call"
        caption="20 MINUTES. NO PITCH. WE'LL TELL YOU IF YOU'RE A FIT."
      />
    </main>
  );
}
