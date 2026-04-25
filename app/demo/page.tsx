import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Demo",
  description:
    "Talk to a Mirror right now. Calibrated on real data. The answers will surprise you.",
};

export default function DemoPage() {
  return (
    <ComingSoon
      eyebrow="LIVE DEMO"
      headline="The demo is being calibrated."
      subhead="The live Mirror surfaces in Phase 5 of the build. Until then, book a Diagnostic Call and we will run the demo for you on a recognizable brand."
      ctaLabel="Book a call"
      ctaHref="/book"
    />
  );
}
