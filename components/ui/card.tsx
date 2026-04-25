import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When true the card lifts and shifts its border to Signal on hover.
   * Use only on cards that link somewhere. Per brief §2.5: 400ms translateY -2px,
   * border to Signal at 30% opacity.
   */
  interactive?: boolean;
}

/**
 * Card per /docs/02-brand-guide.md §Components / Cards.
 * Smoke background, 1px Ash 30% border, 32px internal padding, sharp corners,
 * no shadow.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-smoke border border-ash/30 p-8",
        "rounded-none shadow-none",
        interactive &&
          "transition-[transform,border-color] duration-[400ms] ease-mirror hover:-translate-y-0.5 hover:border-signal/30 cursor-pointer",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";
