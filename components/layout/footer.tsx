import Link from "next/link";
import { Container } from "@/components/ui/container";

/**
 * Footer per /docs/mirror-website-build-brief.md §3.5.
 * Single row on desktop, stacked on mobile. 64px top padding, 32px bottom.
 * Right-side status indicator is a brand moment hinting the demo Mirror is always available.
 */

const links = [
  { label: "PRIVACY", href: "/privacy" },
  { label: "TERMS", href: "/terms" },
  { label: "MANIFESTO", href: "/manifesto" },
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 pt-16 pb-8 mt-32">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-eyebrow text-bone hover:text-signal transition-colors duration-200"
            >
              MIRROR
            </Link>
            <span className="text-eyebrow text-ash">© 2026 MIRROR</span>
          </div>

          <nav className="flex flex-wrap items-center gap-6 sm:gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-eyebrow text-ash hover:text-bone transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span
              className="size-1.5 rounded-full bg-signal animate-pulse"
              aria-hidden
            />
            <span className="text-eyebrow text-bone">MIRROR/M1 ONLINE</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
