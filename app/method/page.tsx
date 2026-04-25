import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Method",
  description:
    "Four stages. Sixty days. One Mirror. The full methodology, calibrated on your data.",
};

export default function MethodPage() {
  return (
    <ComingSoon
      eyebrow="THE METHOD"
      headline="Four stages. Sixty days. One Mirror."
      subhead="The full methodology page ships in Phase 6. The summary: Ingest, Calibrate, Install, Operate."
      ctaLabel="Book a call"
      ctaHref="/book"
    />
  );
}
