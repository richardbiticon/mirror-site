import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Section rhythms per /docs/02-brand-guide.md §Section Rhythm.
 * Default is the locked 128/64 (desktop/mobile) vertical padding.
 * Compact and generous are explicit overrides for sections that demand it
 * (e.g. final CTA uses 192px on desktop per brief §4.9.1).
 */
const rhythmMap = {
  default: "py-16 sm:py-32",
  compact: "py-12 sm:py-24",
  generous: "py-32 sm:py-48",
} as const;

const surfaceMap = {
  void: "",
  smoke: "bg-smoke",
} as const;

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  rhythm?: keyof typeof rhythmMap;
  surface?: keyof typeof surfaceMap;
}

export function Section({
  className,
  rhythm = "default",
  surface = "void",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(rhythmMap[rhythm], surfaceMap[surface], className)}
      {...props}
    />
  );
}
