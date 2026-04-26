import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "The founding story behind Mirror. Coming soon.",
};

/**
 * /manifesto placeholder per brief §9.
 *
 * v1 ships a placeholder. The full long-form editorial page is deferred
 * to a later phase per brief direction. The placeholder uses the brand
 * voice: confident, brief, slightly cryptic. No marketing speak.
 */
export default function ManifestoPage() {
  return (
    <main id="main" className="relative z-10 min-h-dvh flex items-center pt-24 pb-32">
      <Container width="prose">
        <Reveal>
          <p className="text-eyebrow text-signal">MANIFESTO</p>
          <h1 className="text-display-l text-bone mt-6">Coming soon.</h1>
          <p className="text-body-l text-bone/70 mt-8 max-w-[540px]">
            The founding story will live here. For now, the work is the
            argument. Come back when the writing is ready.
          </p>
          <div className="mt-12">
            <Button asChild variant="secondary">
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </main>
  );
}
