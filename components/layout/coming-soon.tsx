import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  /** The eyebrow label, e.g. "DEMO" or "METHOD". */
  eyebrow: string;
  /** The single-sentence headline. */
  headline: string;
  /** Optional supporting line, Body L Bone/70. */
  subhead?: string;
  /** Optional CTA label. Defaults to "BACK TO HOME" linking to /. */
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Shared placeholder used by routes that exist in the IA but ship later.
 * Keeps the nav links honest while the real pages are being built.
 */
export function ComingSoon({
  eyebrow,
  headline,
  subhead,
  ctaLabel = "Back to home",
  ctaHref = "/",
}: ComingSoonProps) {
  return (
    <main id="main" className="relative z-10 min-h-dvh flex items-center pt-24 pb-32">
      <Container width="prose">
        <p className="text-eyebrow text-signal">{eyebrow}</p>
        <h1 className="text-display-l text-bone mt-6">{headline}</h1>
        {subhead ? (
          <p className="text-body-l text-bone/70 mt-8 max-w-[540px]">{subhead}</p>
        ) : null}
        <div className="mt-12">
          <Button asChild variant="secondary">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
