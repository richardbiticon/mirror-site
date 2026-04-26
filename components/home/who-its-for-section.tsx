import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * "Who Mirror is for" qualifier per brief §4.5.
 * Two-column desktop (50/50), stacked mobile. The checklist is the
 * qualifier surface.
 */

const checklist = [
  "You're doing $5M to $200M in annual revenue.",
  "You spend $30K+ per month on paid acquisition.",
  "Your decisions about customers feel like guesses.",
  "You've outgrown surveys and focus groups.",
  "You want to own the asset, not rent the tool.",
] as const;

export function WhoItsForSection() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <Reveal>
            <p className="text-eyebrow text-signal">WHO MIRROR IS FOR</p>
            <h2 className="text-h2 text-bone mt-6">
              If three of these are true, we should talk.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="flex flex-col gap-6">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <Check
                    className="size-4 shrink-0 text-signal mt-1.5"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="text-body-l text-bone">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <Button asChild variant="secondary">
                <Link href="/book">Check your fit in a 20-min call</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
