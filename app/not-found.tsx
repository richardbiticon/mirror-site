import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroParticleField } from "@/components/hero/particle-field";

/**
 * Custom 404 per brief §11.
 * Full viewport, content centered. Subtle background is a smaller
 * version of the homepage particle field (40 desktop / 30 mobile, no
 * cursor interaction). Locked copy from §11.
 */
export default function NotFound() {
  return (
    <main className="relative h-dvh flex items-center overflow-hidden">
      <HeroParticleField count={{ desktop: 40, mobile: 30 }} cursor={false} />
      <div
        className="absolute inset-0 z-[1] bg-void/60 pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
        <p className="text-eyebrow text-signal">404</p>
        <h1 className="text-display-xl text-bone mt-6">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-body-l text-bone/70 mt-8 max-w-[520px] mx-auto">
          It might never have. The Mirror would know.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/demo">Try the demo</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
