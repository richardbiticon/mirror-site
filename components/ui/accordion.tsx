"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accordion per /docs/mirror-website-build-brief.md §4.8.1 and §Brand Guide.
 * - 1px Ash 30% bottom border per item
 * - 24px vertical padding per item (py-6)
 * - Question: Body L Bone with `+` icon on right (Lucide plus, 20px, Ash, 1.5 stroke)
 * - Icon rotates 45° to become × on open, 400ms transition, color shifts to Signal
 * - Answer: Body Bone 70%, max-w 640px, 16px top padding when expanded
 * - Smooth expand/collapse 400ms via Radix data attributes + keyframes in globals.css
 */
export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-ash/30", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex w-full items-center justify-between gap-6 py-6 text-left",
        "text-body-l text-bone",
        "transition-colors duration-300 ease-mirror",
        "[&[data-state=open]>svg]:rotate-45 [&[data-state=open]>svg]:text-signal",
        className,
      )}
      {...props}
    >
      {children}
      <Plus
        className="size-5 shrink-0 text-ash transition-transform duration-[400ms] ease-mirror"
        strokeWidth={1.5}
        aria-hidden
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-body text-bone/70 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-6 pt-4 max-w-[640px]", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
