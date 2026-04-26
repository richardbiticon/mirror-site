import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Three ways to install a Mirror. From a 14-day diagnostic to a fully operated growth function.",
};

export default function PricingPage() {
  return (
    <ComingSoon
      eyebrow="PRICING"
      headline="Three ways to install a Mirror."
      subhead="Mirror/Recon, Mirror/Install, Mirror/Operate. Detailed pricing ships in Phase 6. Until then, the Diagnostic Call walks you through the right tier for your situation."
      ctaLabel="Book a call"
      ctaHref="/book"
    />
  );
}
