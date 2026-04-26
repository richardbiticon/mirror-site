import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";

/**
 * FAQ per brief §4.8 with the locked 8-item Q&A from §4.8.2.
 * Body text exact as specified.
 */

const faqs = [
  {
    q: "Couldn't I just use ChatGPT for this?",
    a: "ChatGPT will roleplay a generic customer. Mirror is calibrated on your CRM, your call recordings, your reviews, with multi-persona voting and weekly retraining. The output gap is enormous, and we demonstrate it on every Diagnostic Call.",
  },
  {
    q: "Who owns the Mirror?",
    a: "You do. The Mirror lives in your stack. We deliver IP transfer documents at the end of every Install. You can fire us and keep the asset.",
  },
  {
    q: "What data do you need from us?",
    a: "Ideally: CRM exports, recorded sales calls, support tickets, customer reviews, NPS data, and access to schedule 8 customer interviews. The more you give, the sharper the Mirror.",
  },
  {
    q: "How is this different from a focus group?",
    a: "A focus group is 8 people, twice a year, telling you what they think they think. A Mirror is 8 calibrated personas, available 24/7, telling you what your actual best customers actually do.",
  },
  {
    q: "How long does a Mirror stay accurate?",
    a: "Mirror/Install includes monthly retraining. As long as you keep feeding it new data, it stays sharp. Without retraining, accuracy degrades meaningfully after 3-4 months.",
  },
  {
    q: "What if our customer base is too niche?",
    a: "That's usually when Mirror is most valuable. The narrower your ICP, the harder it is for off-the-shelf research to help. Mirror specializes in narrow.",
  },
  {
    q: "Can we start with Mirror/Recon and upgrade?",
    a: "That's how most clients enter. Recon is the diagnostic. Install is the build. Operate is when you want us in the seat with you.",
  },
  {
    q: "What if we don't have clean customer data?",
    a: "We've built Mirrors from messier inputs than yours. The Calibrate stage exists exactly to handle this. We'll tell you on the Diagnostic Call whether you have what we need.",
  },
] as const;

export function FAQSection() {
  return (
    <Section>
      <Container width="prose">
        <Reveal>
          <p className="text-eyebrow text-signal">OBJECTIONS, ANSWERED</p>
          <h2 className="text-h1 text-bone mt-6">
            The questions you&apos;re already asking.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </Section>
  );
}
