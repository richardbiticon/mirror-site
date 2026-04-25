import * as React from "react";
import { cn } from "@/lib/utils";

const widths = {
  /** 1280px. Default content cap. */
  default: "max-w-[1280px]",
  /** 760px. Centered prose, e.g. "What Mirror is" explainer. */
  prose: "max-w-[760px]",
  /** 720px. The /book Cal.com page wrapper. */
  book: "max-w-[720px]",
  /** 640px. Tightest copy column for body paragraphs. */
  copy: "max-w-[640px]",
  /** No cap. For full-bleed surfaces inside a Section. */
  full: "max-w-none",
} as const;

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: keyof typeof widths;
}

/**
 * Container per the locked layout caps in /docs/02-brand-guide.md §Spacing and Layout.
 * Horizontal padding is 16px on mobile, 24px on desktop (matches the brand guide gutters).
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, width = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("w-full mx-auto px-4 sm:px-6", widths[width], className)}
      {...props}
    />
  ),
);
Container.displayName = "Container";
