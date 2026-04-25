import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "20 minutes. We will ask 5 questions, show you a live demo, and tell you whether you are a fit.",
};

export default function BookPage() {
  return (
    <ComingSoon
      eyebrow="BOOK A CALL"
      headline="Booking opens shortly."
      subhead="The Cal.com embed wires up in Phase 6 once the Diagnostic Call event is live. Check back shortly."
      ctaLabel="Back to home"
      ctaHref="/"
    />
  );
}
