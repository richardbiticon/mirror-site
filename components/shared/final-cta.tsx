import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ScrollHeadline } from "@/components/ui/scroll-headline";

/**
 * Shared final-CTA pattern used by the homepage, /pricing, and /method.
 * Generous 192px desktop padding (the closing moment per brief §4.9.1).
 * Three-line oversized headline animates character-by-character on scroll
 * into view; lg primary button fires after the headline finishes; ash
 * caption follows.
 *
 * Reveal delays are tuned to wait for the character animation. The
 * headline character stagger totals roughly N * 30ms where N is the
 * combined character count, so the default 1.5s is right for ~50-char
 * copy. Override via headlineDuration if you write longer headlines.
 */
interface FinalCtaProps {
  /** Three short lines, character-animated. */
  headlineLines: readonly string[];
  /** The button label, e.g. "Book your diagnostic call". */
  ctaLabel: string;
  /** The button href, defaults to /book. */
  ctaHref?: string;
  /** Caption beneath the button (caps Ash). */
  caption: string;
  /**
   * Approximate seconds the headline animation needs before the CTA
   * should fire. Default 1.5s.
   */
  headlineDuration?: number;
}

export function FinalCTA({
  headlineLines,
  ctaLabel,
  ctaHref = "/book",
  caption,
  headlineDuration = 1.5,
}: FinalCtaProps) {
  return (
    <Section rhythm="generous">
      <Container width="prose">
        <div className="text-center">
          <ScrollHeadline lines={headlineLines} />
          <Reveal
            delay={headlineDuration}
            className="mt-12 flex justify-center"
          >
            <Button asChild size="lg">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          </Reveal>
          <Reveal delay={headlineDuration + 0.3}>
            <p className="text-eyebrow text-ash mt-6">{caption}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
