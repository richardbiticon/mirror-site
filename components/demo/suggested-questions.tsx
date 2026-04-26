"use client";

import { SUGGESTED_QUESTIONS } from "@/lib/demo-mirror/prompts";

/**
 * Sidebar suggested questions per brief §5.4.
 * Six placeholder ghost-style buttons. On click, the question is sent
 * to the chat. Below the list, a brand caption setting visitor expectations.
 *
 * On mobile this renders as a horizontal scroll strip; the brief calls
 * for a dropdown but a horizontal pill row reads cleaner with the chat
 * still visible. If Richard wants the dropdown specifically, swap to
 * shadcn Select wrapped in /components/ui.
 */
interface Props {
  onSelect: (question: string) => void;
  disabled: boolean;
}

export function SuggestedQuestions({ onSelect, disabled }: Props) {
  return (
    <aside className="border-r border-ash/30 lg:w-[280px] lg:shrink-0 lg:overflow-y-auto lg:p-6">
      {/* Desktop layout */}
      <div className="hidden lg:block">
        <p className="text-eyebrow text-ash">TRY ASKING:</p>
        <ul className="flex flex-col gap-3 mt-4">
          {SUGGESTED_QUESTIONS.map((q) => (
            <li key={q}>
              <button
                type="button"
                onClick={() => onSelect(q)}
                disabled={disabled}
                className="w-full text-left border border-ash/30 p-3 font-display text-[14px] text-bone hover:border-signal/60 transition-colors duration-200 ease-mirror disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {q}
              </button>
            </li>
          ))}
        </ul>
        <p className="text-eyebrow text-ash mt-8 leading-relaxed">
          THIS IS A DEMO MIRROR BUILT FROM PUBLIC DATA. YOUR MIRROR WILL
          BE 10X SHARPER.
        </p>
      </div>

      {/* Mobile layout: horizontal scroll strip */}
      <div className="lg:hidden border-b border-ash/30 px-4 py-3">
        <p className="text-eyebrow text-ash mb-3">TRY ASKING:</p>
        <ul className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 snap-x">
          {SUGGESTED_QUESTIONS.map((q) => (
            <li key={q} className="snap-start shrink-0">
              <button
                type="button"
                onClick={() => onSelect(q)}
                disabled={disabled}
                className="border border-ash/30 px-3 py-2 font-display text-[12px] text-bone whitespace-nowrap hover:border-signal/60 transition-colors duration-200 ease-mirror disabled:opacity-50"
              >
                {q}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
