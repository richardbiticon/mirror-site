import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { PRICING_FAQS } from "./pricing-data";

/**
 * Pricing FAQ per brief §6.5.
 * Same Accordion primitive as the homepage FAQ. Six questions are
 * locked; the answers are placeholder per brief direction and are
 * marked with TODO(richard) in pricing-data.ts.
 */
export function PricingFAQ() {
  return (
    <Accordion type="single" collapsible>
      {PRICING_FAQS.map((faq, i) => (
        <AccordionItem key={i} value={`pricing-${i}`}>
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          <AccordionContent>{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
