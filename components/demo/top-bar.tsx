import Link from "next/link";
import { DataCounter } from "./data-counter";
import { ThinkingIndicator } from "./thinking-indicator";
import { DEMO_BRAND } from "@/lib/demo-mirror/prompts";

/**
 * Demo top bar per brief §5.2.
 * 48px tall, Smoke surface, 1px Ash bottom border. Replaces the global
 * Nav on /demo so the chat takes the entire viewport.
 */
export function TopBar() {
  return (
    <header className="h-12 bg-smoke border-b border-ash/30 px-4 flex items-center justify-between gap-4 shrink-0 relative z-10">
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="/"
          className="font-display text-[12px] tracking-[0.08em] uppercase text-bone hover:text-signal transition-colors duration-200"
        >
          MIRROR
        </Link>
        <span
          className="text-eyebrow text-ash"
          aria-label={`Demo Mirror calibrated for ${DEMO_BRAND.displayName}`}
        >
          / {DEMO_BRAND.shortName}
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-2 text-eyebrow text-ash">
        <ThinkingIndicator />
        <span>
          ONLINE · MULTI-PERSONA · CALIBRATED ON{" "}
          <DataCounter target={DEMO_BRAND.dataPoints} /> DATA POINTS
        </span>
      </div>

      <Link
        href="/book"
        className="inline-flex items-center justify-center bg-signal text-void font-display uppercase tracking-[0.08em] text-[12px] px-4 py-2 transition-[box-shadow] duration-300 ease-mirror hover:[box-shadow:0_0_18px_rgb(0_255_157_/_0.45)]"
      >
        Book a call
      </Link>
    </header>
  );
}
