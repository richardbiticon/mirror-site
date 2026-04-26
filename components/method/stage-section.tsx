import { Reveal } from "@/components/ui/reveal";

/**
 * Single method stage section per brief §7.3.
 * Display L number in Signal, Display L name in Bone, Body L Ash caps
 * date range, Body L Bone description (2 to 3 sentences), then "What we
 * do" and "What you get" subsections. Horizontal Ash 30% rule below.
 */
export interface StageContent {
  number: string;
  name: string;
  range: string;
  description: string;
  whatWeDo: readonly string[];
  whatYouGet: readonly string[];
}

interface Props {
  stage: StageContent;
}

export function StageSection({ stage }: Props) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-6 flex-wrap">
        <span className="font-display text-display-l text-signal leading-none">
          {stage.number}
        </span>
        <h2 className="font-display text-display-l text-bone leading-none uppercase tracking-[-0.02em]">
          {stage.name}
        </h2>
      </div>
      <p className="text-eyebrow text-ash mt-4">{stage.range}</p>

      <p className="text-body-l text-bone mt-8 max-w-[640px]">
        {stage.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <div>
          <p className="text-eyebrow text-signal">WHAT WE DO</p>
          <ul className="mt-4 space-y-3">
            {stage.whatWeDo.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-body text-bone"
              >
                <span
                  className="size-1.5 rounded-full bg-signal mt-2.5 shrink-0"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-eyebrow text-signal">WHAT YOU GET</p>
          <ul className="mt-4 space-y-3">
            {stage.whatYouGet.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-body text-bone"
              >
                <span
                  className="size-1.5 rounded-full bg-signal mt-2.5 shrink-0"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="border-ash/30 mt-24" />
    </Reveal>
  );
}
