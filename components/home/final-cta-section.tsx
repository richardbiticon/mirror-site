import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ScrollHeadline } from "@/components/ui/scroll-headline";

/**
 * Final CTA per brief §4.9. The closing moment.
 * Generous 128/192px vertical rhythm, character-by-character headline on
 * scroll into view, oversized primary button.
 *
 * Headline character animation totals ~1.5s for the locked 50-char copy,
 * so the button and caption Reveal delays are tuned to fire after it.
 */
export function FinalCTASection() {
  return (
    <Section rhythm="generous">
      <Container width="prose">
        <div className="text-center">
          <ScrollHeadline
            lines={["The next 20 minutes", "could change", "how you sell."]}
          />
          <Reveal delay={1.5} className="mt-12 flex justify-center">
            <Button asChild size="lg">
              <Link href="/book">Book your diagnostic call</Link>
            </Button>
          </Reveal>
          <Reveal delay={1.8}>
            <p className="text-eyebrow text-ash mt-6">
              20 MINUTES. NO PITCH. WE&apos;LL TELL YOU IF YOU&apos;RE A FIT.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
