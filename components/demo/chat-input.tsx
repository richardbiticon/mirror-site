"use client";

import { useState, type FormEvent } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Sticky chat input per brief §5.5.
 * Single-line transparent input with Ash bottom border, Signal underline
 * on focus. Right-side Signal arrow as the send affordance. Disabled
 * during streaming and when rate-limited.
 */
interface Props {
  onSubmit: (text: string) => void;
  disabled: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSubmit,
  disabled,
  placeholder = "Ask the Mirror.",
}: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 border-t border-ash/30 px-4 py-3 bg-void shrink-0"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        aria-label="Ask the Mirror"
        className="flex-1 bg-transparent text-bone font-display text-[14px] focus:outline-none placeholder:text-ash disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!text.trim() || disabled}
        aria-label="Send"
        className="text-signal hover:text-bone transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed p-2"
      >
        <ArrowUp className="size-5" strokeWidth={1.5} />
      </button>
    </form>
  );
}
