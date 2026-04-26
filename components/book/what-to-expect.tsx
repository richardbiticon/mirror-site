/**
 * "What to expect" 4-item numbered list per brief §8.4.
 * Berkeley Mono numbers (display font), Body Bone text.
 * Locked content from §8.4 verbatim.
 */
const ITEMS = [
  "We ask 5 qualifying questions.",
  "We show you a live Mirror of a recognizable brand.",
  "We tell you, honestly, whether Mirror fits your situation.",
  "If yes, we send a proposal within 24 hours. If no, we tell you what would.",
] as const;

export function WhatToExpect() {
  return (
    <div>
      <p className="text-eyebrow text-signal">WHAT TO EXPECT</p>
      <ol className="mt-8 space-y-6">
        {ITEMS.map((item, i) => (
          <li
            key={item}
            className="grid grid-cols-[auto_1fr] items-baseline gap-6"
          >
            <span className="font-display text-eyebrow text-ash">
              {(i + 1).toString().padStart(2, "0")}.
            </span>
            <span className="text-body text-bone">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
