import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button variants per /docs/02-brand-guide.md §Components / Buttons.
 *
 * - primary:   Signal background, Void text. Subtle Signal-bright glow on hover.
 * - secondary: Transparent background, Bone text, 1px Bone border.
 *              On hover the Signal background fills from left to right (300ms),
 *              text and border transition to Void/Signal. (Brand guide §Motion.)
 * - ghost:     No background, no border, Bone text with Signal underline on hover.
 *
 * Sizes follow the brief: default = 14px text / 16y / 24x padding (per brand guide).
 * lg = 18px text / 24y / 48x padding (the homepage final CTA, brief §4.9.2).
 */
const buttonVariants = cva(
  cn(
    "relative inline-flex items-center justify-center gap-2",
    "font-display font-medium uppercase tracking-[0.08em] whitespace-nowrap",
    "rounded-none select-none",
    "transition-[color,background-color,border-color,box-shadow] duration-300 ease-mirror",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
  ),
  {
    variants: {
      variant: {
        primary: cn(
          "bg-signal text-void",
          "hover:[box-shadow:0_0_24px_rgb(0_255_157_/_0.45)]",
        ),
        secondary: cn(
          "bg-transparent text-bone border border-bone",
          "relative overflow-hidden isolate",
          "before:absolute before:inset-0 before:-z-10 before:bg-signal",
          "before:-translate-x-full before:transition-transform before:duration-300 before:ease-mirror",
          "hover:before:translate-x-0",
          "hover:text-void hover:border-signal",
        ),
        ghost: cn(
          "bg-transparent text-bone",
          "hover:underline hover:decoration-signal hover:underline-offset-4 hover:decoration-1",
        ),
      },
      size: {
        default: "px-6 py-4 text-[14px]",
        lg: "px-12 py-6 text-[18px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
