import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Input per /docs/02-brand-guide.md §Components / Forms.
 * Transparent background, 1px Ash bottom border only (no full border),
 * Bone text, Signal underline on focus. Terminal-like.
 *
 * Override the global :focus-visible outline because the bottom border
 * already serves as the focus indicator. The Ash → Signal transition is
 * the locked visual cue (brief §12.6).
 */
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "w-full bg-transparent text-bone",
      "border-0 border-b border-ash/40 rounded-none",
      "px-0 py-3 text-body font-body",
      "transition-[border-color,border-bottom-width] duration-200 ease-mirror",
      "placeholder:text-ash",
      "focus:outline-none focus-visible:outline-none focus:border-signal focus:border-b-2",
      "disabled:opacity-40 disabled:cursor-not-allowed",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
