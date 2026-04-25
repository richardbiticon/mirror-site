"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Top nav per /docs/mirror-website-build-brief.md §3.4 and §12.2.
 * Desktop: 64px tall, transparent until scrolled past 64px, then Smoke/5 + Ash/60 border with 200ms transition.
 * Mobile: 56px tall, hamburger opens a 400ms-fade Void overlay with stacked links.
 *
 * Sticky behaviour does not shrink or move the nav itself; only background and border change.
 */

const items = [
  { label: "DEMO", href: "/demo" },
  { label: "METHOD", href: "/method" },
  { label: "PRICING", href: "/pricing" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const root = document.documentElement;
    if (open) root.style.overflow = "hidden";
    else root.style.overflow = "";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 h-14 sm:h-16",
          "transition-[background-color,border-color,backdrop-filter] duration-200 ease-mirror",
          "border-b",
          scrolled
            ? "bg-smoke/5 backdrop-blur-[2px] border-ash/60"
            : "bg-transparent border-transparent",
        )}
      >
        <div className="h-full max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-display text-bone text-base hover:text-signal transition-colors duration-200"
          >
            Mirror
          </Link>

          <nav className="hidden sm:flex items-center gap-8">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-eyebrow text-bone hover:text-signal transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild>
              <Link href="/book">Book a call</Link>
            </Button>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="sm:hidden text-bone hover:text-signal transition-colors duration-200 p-2 -mr-2"
          >
            <Menu className="size-6" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-void sm:hidden",
          "transition-opacity duration-[400ms] ease-mirror",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div className="h-14 px-4 flex items-center justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-bone hover:text-signal transition-colors duration-200 p-2 -mr-2"
          >
            <X className="size-6" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex flex-col items-start gap-8 px-6 mt-12">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-bone text-[32px] leading-none hover:text-signal transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="font-display text-signal text-[32px] leading-none mt-4 hover:underline hover:underline-offset-4 hover:decoration-1"
          >
            BOOK A CALL
          </Link>
        </nav>
      </div>
    </>
  );
}
