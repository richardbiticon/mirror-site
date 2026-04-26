import { FinalCTA } from "@/components/shared/final-cta";

/**
 * Homepage final CTA per brief §4.9. Closing moment.
 * Locked copy from §4.9.2.
 */
export function FinalCTASection() {
  return (
    <FinalCTA
      headlineLines={[
        "The next 20 minutes",
        "could change",
        "how you sell.",
      ]}
      ctaLabel="Book your diagnostic call"
      caption="20 MINUTES. NO PITCH. WE'LL TELL YOU IF YOU'RE A FIT."
    />
  );
}
