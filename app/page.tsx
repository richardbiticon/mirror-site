import { HeroSection } from "@/components/home/hero-section";
import { ProofSection } from "@/components/home/proof-section";
import { WhatMirrorIsSection } from "@/components/home/what-mirror-is-section";
import { WhoItsForSection } from "@/components/home/who-its-for-section";
import { TiersPreviewSection } from "@/components/home/tiers-preview-section";
import { MethodologyPreviewSection } from "@/components/home/methodology-preview-section";
import { FAQSection } from "@/components/home/faq-section";
import { FinalCTASection } from "@/components/home/final-cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProofSection />
      <WhatMirrorIsSection />
      <WhoItsForSection />
      <TiersPreviewSection />
      <MethodologyPreviewSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
