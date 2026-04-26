import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/**
 * Shared shell for /privacy and /terms per brief §10.1.
 * Single column 720px ("book" width). Eyebrow plus Display L headline
 * top, generous prose middle, last-updated stamp at bottom.
 *
 * Long-form content is passed as children. The shell applies typography
 * via compound selectors so consumers can write semantic markup
 * (<h2>, <p>, <ul>, <li>) without per-element classes.
 */
interface Props {
  eyebrow: string;
  title: string;
  /** Display string, e.g. "April 26, 2026". Brief wants caps; component up-cases. */
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPage({ eyebrow, title, lastUpdated, children }: Props) {
  return (
    <main id="main" className="relative z-10 pt-24 pb-32">
      <Container width="book">
        <Reveal>
          <p className="text-eyebrow text-signal">{eyebrow}</p>
          <h1 className="text-display-l text-bone mt-6">{title}</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className={[
              "mt-16",
              "[&_h2]:font-display [&_h2]:text-h3 [&_h2]:text-bone [&_h2]:uppercase [&_h2]:tracking-[-0.01em] [&_h2]:mt-16 [&_h2:first-child]:mt-0 [&_h2]:mb-6",
              "[&_h3]:font-display [&_h3]:text-eyebrow [&_h3]:text-ash [&_h3]:mt-8 [&_h3]:mb-3",
              "[&_p]:text-body-s [&_p]:text-bone [&_p]:leading-relaxed [&_p]:mt-4",
              "[&_ul]:mt-4 [&_ul]:space-y-2",
              "[&_li]:text-body-s [&_li]:text-bone [&_li]:pl-6 [&_li]:relative [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-2 [&_li]:before:size-1.5 [&_li]:before:rounded-full [&_li]:before:bg-signal",
              "[&_a]:text-signal [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-1 hover:[&_a]:text-bone [&_a]:transition-colors",
            ].join(" ")}
          >
            {children}
          </div>
        </Reveal>

        <Reveal>
          <p className="text-eyebrow text-ash mt-24">
            LAST UPDATED · {lastUpdated.toUpperCase()}
          </p>
        </Reveal>
      </Container>
    </main>
  );
}
