import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PricingTier } from "./pricing-data";

/**
 * Full-detail tier card for /pricing per brief §6.3.
 * Card height is stretched via `h-full` so the grid renders three equal
 * columns regardless of inclusion list length.
 */
interface Props {
  tier: PricingTier;
}

export function PricingTierCard({ tier }: Props) {
  return (
    <div className="relative h-full">
      {tier.featured ? (
        <p className="text-eyebrow text-signal absolute -top-6 left-0">
          MOST CHOSEN
        </p>
      ) : null}
      <Card
        className={cn(
          "h-full flex flex-col",
          tier.featured && "border-signal/30",
        )}
      >
        <p className="font-display uppercase text-[14px] tracking-[0.08em] text-signal">
          {tier.name}
        </p>
        <div className="mt-4 flex items-baseline gap-2 flex-wrap">
          <span className="font-display text-[32px] leading-none text-bone">
            {tier.price}
          </span>
          <span className="text-eyebrow text-ash">{tier.priceSuffix}</span>
        </div>
        <p className="text-eyebrow text-ash mt-2">{tier.duration}</p>

        <hr className="my-6 border-ash/30" />

        <p className="text-eyebrow text-ash">WHAT&apos;S INCLUDED</p>
        <ul className="mt-4 space-y-3 flex-1">
          {tier.whatsIncluded.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-body-s text-bone"
            >
              <span
                className="size-1.5 rounded-full bg-signal mt-2 shrink-0"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-eyebrow text-ash mt-8">NOT INCLUDED</p>
        <ul className="mt-4 space-y-3">
          {tier.whatsNotIncluded.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-body-s text-ash"
            >
              <span
                className="block w-3 h-px bg-ash/60 mt-3 shrink-0"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <hr className="my-8 border-ash/30" />

        <p className="text-eyebrow text-ash">BEST FOR</p>
        <p className="text-body-s text-bone mt-3">{tier.bestFor}</p>

        <p className="text-eyebrow text-ash mt-6">THE GUARANTEE</p>
        <p className="text-body-s text-bone mt-3">{tier.guarantee}</p>

        <div className="mt-8">
          <Button asChild className="w-full">
            <Link href={`/book?tier=${tier.slug}`}>{tier.startLabel}</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
