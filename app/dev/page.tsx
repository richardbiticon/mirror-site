import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Dev Reference",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "Void", hex: "#0A0A0B", className: "bg-void", text: "text-bone" },
  { name: "Bone", hex: "#F4F2EE", className: "bg-bone", text: "text-void" },
  { name: "Smoke", hex: "#1A1A1D", className: "bg-smoke", text: "text-bone" },
  { name: "Ash", hex: "#6B6B70", className: "bg-ash", text: "text-bone" },
  { name: "Signal", hex: "#00FF9D", className: "bg-signal", text: "text-void" },
  { name: "Warning", hex: "#FFB000", className: "bg-warning", text: "text-void" },
  { name: "Error", hex: "#FF3B30", className: "bg-error", text: "text-bone" },
] as const;

const spacingScale = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192] as const;

const typeSamples = [
  { token: "text-display-xl", label: "Display XL · 72 / 0.95 / -0.03em" },
  { token: "text-display-l", label: "Display L · 56 / 1.0 / -0.02em" },
  { token: "text-h1", label: "H1 · 44 / 1.05 / -0.02em" },
  { token: "text-h2", label: "H2 · 32 / 1.1 / -0.01em" },
  { token: "text-h3", label: "H3 · 22 / 1.3 / 0" },
  { token: "text-eyebrow", label: "EYEBROW · 12 / 1 / 0.12em" },
  { token: "text-body-l", label: "Body L · 18 / 1.6 / 0", body: true },
  { token: "text-body", label: "Body · 16 / 1.6 / 0", body: true },
  { token: "text-body-s", label: "Body S · 14 / 1.5 / 0", body: true },
  { token: "text-caption", label: "Caption · 12 / 1.4 / 0", body: true },
] as const;

function SectionHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <header className="mb-8">
      <p className="text-eyebrow text-signal">{title}</p>
      {hint ? <p className="text-caption text-ash mt-2">{hint}</p> : null}
    </header>
  );
}

export default function DevPage() {
  return (
    <main className="relative z-10 pt-24 pb-32">
      <Container>
        <header className="mb-24">
          <p className="text-eyebrow text-signal">DEV / REFERENCE</p>
          <h1 className="text-display-l text-bone mt-4">Primitives.</h1>
          <p className="text-body-l text-bone/70 mt-6 max-w-[640px]">
            Internal QA surface. Every primitive in every state. Tab through
            to see focus rings; hover with a real cursor to see the locked
            transitions. Not indexed, not linked from anywhere.
          </p>
        </header>

        {/* Colors ----------------------------------------------------------- */}
        <Section rhythm="compact">
          <SectionHeader
            title="01 / COLOR"
            hint="Always reference by token (bg-void, text-signal). Never inline hex."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {colors.map((c) => (
              <div
                key={c.name}
                className={`${c.className} ${c.text} aspect-square p-4 flex flex-col justify-between border border-ash/30`}
              >
                <span className="text-eyebrow">{c.name}</span>
                <span className="text-caption font-mono opacity-80">
                  {c.hex}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Type scale ------------------------------------------------------- */}
        <Section rhythm="compact">
          <SectionHeader
            title="02 / TYPE SCALE"
            hint="Locked sizes. Use these utilities, never ad-hoc text-* classes."
          />
          <ul className="space-y-6 border-t border-ash/30 pt-8">
            {typeSamples.map((t) => (
              <li
                key={t.token}
                className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 items-baseline"
              >
                <span className="text-caption text-ash font-mono">
                  {t.label}
                </span>
                <span className={`${t.token} text-bone`}>
                  Talk to your customer.
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Spacing scale ---------------------------------------------------- */}
        <Section rhythm="compact">
          <SectionHeader
            title="03 / SPACING SCALE"
            hint="4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192. No arbitrary values."
          />
          <ul className="space-y-2">
            {spacingScale.map((px) => (
              <li
                key={px}
                className="flex items-center gap-4 border-b border-ash/20 pb-2"
              >
                <span className="text-caption font-mono text-ash w-12">
                  {px}px
                </span>
                <span
                  className="bg-signal h-2"
                  style={{ width: `${px}px` }}
                  aria-hidden
                />
              </li>
            ))}
          </ul>
        </Section>

        {/* Buttons ---------------------------------------------------------- */}
        <Section rhythm="compact">
          <SectionHeader
            title="04 / BUTTON"
            hint="Default size = 14px / 16y / 24x. Large size = 18px / 24y / 48x for hero/final-CTA."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-caption text-ash mb-4">DEFAULT SIZE</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Try a live Mirror</Button>
                <Button variant="secondary">Book a call</Button>
                <Button variant="ghost">Learn more</Button>
              </div>
              <p className="text-caption text-ash mt-8 mb-4">DISABLED</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" disabled>
                  Try a live Mirror
                </Button>
                <Button variant="secondary" disabled>
                  Book a call
                </Button>
                <Button variant="ghost" disabled>
                  Learn more
                </Button>
              </div>
            </div>

            <div>
              <p className="text-caption text-ash mb-4">LARGE SIZE</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  Book your diagnostic call
                </Button>
              </div>
              <p className="text-caption text-ash mt-8 mb-4">
                HOVER STATES (interact)
              </p>
              <ul className="text-body-s text-bone/70 space-y-2 list-none">
                <li>
                  <span className="text-ash">Primary:</span> 24px Signal-bright
                  glow, 300ms
                </li>
                <li>
                  <span className="text-ash">Secondary:</span> Signal fills L→R,
                  text + border invert, 300ms
                </li>
                <li>
                  <span className="text-ash">Ghost:</span> Signal underline,
                  300ms
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Card ------------------------------------------------------------- */}
        <Section rhythm="compact">
          <SectionHeader
            title="05 / CARD"
            hint="Smoke surface, 1px Ash 30% border, sharp corners, no shadow. Interactive variant lifts -2px and shifts border to Signal/30 on hover."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <p className="text-eyebrow text-signal">DEFAULT</p>
              <h3 className="text-h3 text-bone mt-4">Static surface.</h3>
              <p className="text-body text-bone/70 mt-3">
                A non-interactive Smoke panel. Used for the homepage tier
                preview cards in their default state.
              </p>
            </Card>
            <Card interactive>
              <p className="text-eyebrow text-signal">INTERACTIVE</p>
              <h3 className="text-h3 text-bone mt-4">Hover me.</h3>
              <p className="text-body text-bone/70 mt-3">
                Used for cards that link somewhere. Lifts on hover with the
                400ms locked transition.
              </p>
            </Card>
          </div>
        </Section>

        {/* Input ------------------------------------------------------------ */}
        <Section rhythm="compact">
          <SectionHeader
            title="06 / INPUT"
            hint="Transparent bg, Ash bottom border only. Signal underline on focus. Tab through to see."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-[760px]">
            <label className="flex flex-col gap-2">
              <span className="text-caption text-ash">DEFAULT</span>
              <Input placeholder="company.com" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-caption text-ash">FILLED</span>
              <Input defaultValue="Patagonia" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-caption text-ash">DISABLED</span>
              <Input disabled defaultValue="Locked field" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-caption text-ash">EMAIL</span>
              <Input type="email" placeholder="you@company.com" />
            </label>
          </div>
        </Section>

        {/* Accordion -------------------------------------------------------- */}
        <Section rhythm="compact">
          <SectionHeader
            title="07 / ACCORDION"
            hint='Item 2 is open by default. The "+" rotates 45° to "×" and shifts to Signal over 400ms.'
          />
          <Accordion type="single" collapsible defaultValue="item-2">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Couldn&apos;t I just use ChatGPT for this?
              </AccordionTrigger>
              <AccordionContent>
                ChatGPT will roleplay a generic customer. Mirror is calibrated
                on your CRM, your call recordings, your reviews, with
                multi-persona voting and weekly retraining.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Who owns the Mirror?</AccordionTrigger>
              <AccordionContent>
                You do. The Mirror lives in your stack. We deliver IP transfer
                documents at the end of every Install. You can fire us and keep
                the asset.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What data do you need from us?</AccordionTrigger>
              <AccordionContent>
                Ideally: CRM exports, recorded sales calls, support tickets,
                customer reviews, NPS data, and access to schedule 8 customer
                interviews. The more you give, the sharper the Mirror.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        {/* Dialog ----------------------------------------------------------- */}
        <Section rhythm="compact">
          <SectionHeader
            title="08 / DIALOG"
            hint="Void overlay at 80%, Smoke surface, sharp corners. Fade in 400ms / fade out 200ms."
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <p className="text-eyebrow text-signal">MIRROR / DIALOG</p>
                <DialogTitle>This is a Mirror dialog.</DialogTitle>
                <DialogDescription>
                  Void overlay, Smoke panel, sharp corners, no shadow.
                  Close with the × in the corner, the Esc key, or by clicking
                  the overlay.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Section>

        {/* Container widths ------------------------------------------------- */}
        <Section rhythm="compact">
          <SectionHeader
            title="09 / CONTAINER WIDTHS"
            hint="Layout caps from /docs/02-brand-guide.md."
          />
          <ul className="space-y-2 text-body-s text-bone/70">
            <li>
              <span className="text-eyebrow text-ash mr-3">DEFAULT</span>
              1280px · primary content cap
            </li>
            <li>
              <span className="text-eyebrow text-ash mr-3">PROSE</span>
              760px · centered explainer copy
            </li>
            <li>
              <span className="text-eyebrow text-ash mr-3">BOOK</span>
              720px · Cal.com embed wrapper
            </li>
            <li>
              <span className="text-eyebrow text-ash mr-3">COPY</span>
              640px · tight body column
            </li>
          </ul>
        </Section>
      </Container>
    </main>
  );
}
