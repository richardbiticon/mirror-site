import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Proof section per brief §4.3. Smoke surface, 60/40 desktop split.
 * Faux chat preview is static: real interactivity lives on /demo. The
 * pulsing Signal dot under the most recent Mirror response is the brand
 * "alive" moment that ties this preview to the real chat.
 */

const exchanges = [
  {
    you: "Why did you cancel your subscription?",
    mirror:
      "Three of us would say the same thing. The product worked. The relationship didn't. We felt like a line item, not a customer.",
  },
  {
    you: "What would have kept you?",
    mirror:
      "A founder check-in at month four. We don't need more features. We needed to feel seen.",
  },
] as const;

export function ProofSection() {
  return (
    <Section surface="smoke">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-3">
            <p className="text-eyebrow text-signal">LIVE DEMO</p>
            <h2 className="text-h1 text-bone mt-6">
              Talk to a Mirror right now.
            </h2>
            <p className="text-body-l text-bone/70 mt-8 max-w-[540px]">
              We built a Mirror of a company you&apos;ve heard of. Ask it
              about pricing, objections, or what would make their best
              customers churn. The answers will surprise you.
            </p>
            <div className="mt-8">
              <Button asChild>
                <Link href="/demo">Open the demo →</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <ChatPreview />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function ChatPreview() {
  return (
    <div className="border border-ash/30 p-4 bg-void/40 font-display text-[14px] leading-relaxed">
      {exchanges.map((ex, i) => (
        <div key={i} className={i > 0 ? "mt-6" : undefined}>
          <p>
            <span className="text-ash">You: </span>
            <span className="text-bone">{ex.you}</span>
          </p>
          <p className="mt-3">
            <span className="text-signal">Mirror: </span>
            <span className="text-bone">{ex.mirror}</span>
          </p>
        </div>
      ))}
      <div className="mt-3 flex items-center gap-2">
        <span
          className="size-1.5 rounded-full bg-signal animate-pulse"
          aria-hidden
        />
        <span className="text-ash text-[12px] tracking-[0.08em] uppercase">
          Mirror is thinking
        </span>
      </div>
    </div>
  );
}
