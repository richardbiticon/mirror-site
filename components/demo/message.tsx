"use client";

import { useState } from "react";

/**
 * Chat message bubbles per brief §5.5.
 *
 * - User messages: right-aligned, Smoke bg, 1px Ash 30% border, 16px
 *   padding, max-w 560, JetBrains Mono 14px Bone.
 * - Mirror messages: left-aligned, no bg, max-w 640, with a 12px caps
 *   eyebrow above showing the responding sub-persona, and a "voting"
 *   line that fades in after the response, plus a "[ + SHOW REASONING ]"
 *   toggle expanding the multi-persona reasoning trace.
 */

interface UserMessageProps {
  text: string;
}

export function UserMessageBubble({ text }: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <div className="bg-smoke border border-ash/30 p-4 max-w-[560px] font-display text-[14px] text-bone whitespace-pre-wrap break-words">
        {text}
      </div>
    </div>
  );
}

interface MirrorMessageProps {
  persona: string;
  text: string;
  voting?: string;
  reasoning?: string;
  done: boolean;
  errored?: boolean;
}

export function MirrorMessageBubble({
  persona,
  text,
  voting,
  reasoning,
  done,
  errored = false,
}: MirrorMessageProps) {
  const [showReasoning, setShowReasoning] = useState(false);

  return (
    <div className="max-w-[640px]">
      {persona ? (
        <p className="text-eyebrow text-signal">
          {errored ? "MIRROR · ERROR" : `MIRROR · ${persona}`}
        </p>
      ) : null}
      <div className="font-display text-[14px] text-bone mt-3 whitespace-pre-wrap break-words leading-relaxed">
        {text}
        {!done && !errored ? (
          <span
            className="inline-block size-1.5 rounded-full bg-signal animate-think-pulse ml-1.5 align-middle"
            aria-hidden
          />
        ) : null}
      </div>
      {voting ? (
        <p className="text-eyebrow text-ash mt-4 animate-fade-in">{voting}</p>
      ) : null}
      {reasoning ? (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowReasoning((s) => !s)}
            className="text-eyebrow text-ash hover:text-bone transition-colors duration-200"
            aria-expanded={showReasoning}
          >
            [ {showReasoning ? "− HIDE" : "+ SHOW"} REASONING ]
          </button>
          {showReasoning ? (
            <p className="font-display text-[12px] text-ash mt-3 leading-relaxed animate-fade-in">
              {reasoning}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
