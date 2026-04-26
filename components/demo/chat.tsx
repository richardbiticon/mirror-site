"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { streamMirror } from "@/lib/demo-mirror/stream";
import { DEMO_BRAND } from "@/lib/demo-mirror/prompts";
import { useLocalStorageNumber } from "@/lib/use-local-storage-number";
import { SuggestedQuestions } from "./suggested-questions";
import {
  UserMessageBubble,
  MirrorMessageBubble,
} from "./message";
import { ChatInput } from "./chat-input";
import { ThinkingIndicator } from "./thinking-indicator";

/**
 * Demo chat orchestrator per brief §5.3 to §5.7.
 *
 * State machine: each user message kicks off a new Mirror response that
 * streams in over SSE. The mirror message accumulates token-by-token
 * with the persona eyebrow, voting line, and reasoning toggle filled in
 * as their respective events arrive.
 *
 * Rate limiting per §5.5: cap at 10 messages per visitor per session,
 * tracked in localStorage. After message 5: soft inline prompt above the
 * input. After message 10: input replaced with the hard-limit panel.
 */

type UserMessage = {
  id: string;
  role: "user";
  text: string;
};

type MirrorMessage = {
  id: string;
  role: "mirror";
  persona: string;
  text: string;
  voting?: string;
  reasoning?: string;
  done: boolean;
  errored?: boolean;
};

type Message = UserMessage | MirrorMessage;

const COUNT_KEY = "mirror.demo.count";
const SESSION_KEY = "mirror.demo.sessionId";
const SOFT_LIMIT = 5;
const HARD_LIMIT = 10;

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [messageCount, setMessageCount] = useLocalStorageNumber(COUNT_KEY);
  const sessionIdRef = useRef<string>("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Init session id once on mount. sessionIdRef is fine to seed in an
  // effect because refs do not drive rendering and so do not trigger
  // the set-state-in-effect lint rule.
  useEffect(() => {
    let id = window.localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(SESSION_KEY, id);
    }
    sessionIdRef.current = id;
  }, []);

  // Auto-scroll to bottom when messages change.
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Cancel any in-flight stream on unmount.
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const updateLast = useCallback(
    (updater: (m: MirrorMessage) => MirrorMessage) => {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (!last || last.role !== "mirror") return prev;
        return [...prev.slice(0, -1), updater(last)];
      });
    },
    [],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      if (isStreaming) return;
      if (messageCount >= HARD_LIMIT) return;
      if (!text.trim()) return;

      const userMsg: UserMessage = {
        id: crypto.randomUUID(),
        role: "user",
        text,
      };
      const mirrorMsg: MirrorMessage = {
        id: crypto.randomUUID(),
        role: "mirror",
        persona: "",
        text: "",
        done: false,
      };
      setMessages((prev) => [...prev, userMsg, mirrorMsg]);
      setIsStreaming(true);

      // useLocalStorageNumber writes through to localStorage and triggers
      // a re-render via a custom event, so no manual setItem needed here.
      setMessageCount(messageCount + 1);

      const controller = new AbortController();
      abortRef.current = controller;

      await streamMirror(
        text,
        sessionIdRef.current,
        {
          onPersona: (name) =>
            updateLast((m) => ({ ...m, persona: name })),
          onToken: (chunk) =>
            updateLast((m) => ({ ...m, text: m.text + chunk })),
          onVoting: (v) => updateLast((m) => ({ ...m, voting: v })),
          onReasoning: (r) => updateLast((m) => ({ ...m, reasoning: r })),
          onDone: () => updateLast((m) => ({ ...m, done: true })),
          onError: (msg) =>
            updateLast((m) => ({
              ...m,
              persona: m.persona || "ERROR",
              text: msg,
              done: true,
              errored: true,
            })),
        },
        controller.signal,
      );

      setIsStreaming(false);
    },
    [isStreaming, messageCount, setMessageCount, updateLast],
  );

  const atSoftLimit = messageCount >= SOFT_LIMIT && messageCount < HARD_LIMIT;
  const atHardLimit = messageCount >= HARD_LIMIT;

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-0 relative z-10">
      <SuggestedQuestions
        onSelect={sendMessage}
        disabled={isStreaming || atHardLimit}
      />

      <main id="main" className="flex-1 flex flex-col min-h-0">
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-8"
        >
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-8 max-w-[760px] mx-auto">
              {messages.map((m) =>
                m.role === "user" ? (
                  <UserMessageBubble key={m.id} text={m.text} />
                ) : (
                  <MirrorMessageBubble
                    key={m.id}
                    persona={m.persona}
                    text={m.text}
                    voting={m.voting}
                    reasoning={m.reasoning}
                    done={m.done}
                    errored={m.errored}
                  />
                ),
              )}
            </div>
          )}
        </div>

        {isStreaming ? (
          <div className="px-4 sm:px-6 pb-2 max-w-[760px] mx-auto w-full">
            <ThinkingIndicator caption="MIRROR IS THINKING" />
          </div>
        ) : null}

        {atSoftLimit ? <SoftLimitPrompt /> : null}

        {atHardLimit ? (
          <HardLimitPanel />
        ) : (
          <ChatInput
            onSubmit={sendMessage}
            disabled={isStreaming}
            placeholder={
              messages.length === 0
                ? "Try a suggested question, or ask your own."
                : "Ask the Mirror."
            }
          />
        )}
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center max-w-[640px] mx-auto">
      <ThinkingIndicator size="lg" />
      <p className="text-eyebrow text-signal mt-6">
        MIRROR / {DEMO_BRAND.shortName} · READY
      </p>
      <p className="text-body-l text-bone mt-4">
        Ask anything. The Mirror is calibrated on{" "}
        {DEMO_BRAND.dataPoints.toLocaleString("en-US")} data points from
        this brand&apos;s customers.
      </p>
      <p className="text-body-s text-bone/60 mt-3">
        Try one of the suggested questions, or ask your own.
      </p>
    </div>
  );
}

function SoftLimitPrompt() {
  return (
    <div className="border-t border-ash/30 px-4 sm:px-6 py-3 bg-void shrink-0">
      <div className="max-w-[760px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-eyebrow text-ash">
          ENJOYING THIS? BOOK A CALL TO SEE YOUR OWN MIRROR.
        </p>
        <Link
          href="/book"
          className="text-eyebrow text-signal hover:text-bone transition-colors duration-200 underline-offset-4 underline decoration-1"
        >
          BOOK A CALL →
        </Link>
      </div>
    </div>
  );
}

function HardLimitPanel() {
  return (
    <div className="border-t border-ash/30 px-4 sm:px-6 py-6 bg-void shrink-0">
      <div className="max-w-[760px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-eyebrow text-bone">
          DEMO LIMIT REACHED. BOOK A CALL TO CONTINUE.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center justify-center bg-signal text-void font-display uppercase tracking-[0.08em] text-[12px] px-4 py-2 transition-[box-shadow] duration-300 ease-mirror hover:[box-shadow:0_0_18px_rgb(0_255_157_/_0.45)]"
        >
          Book your diagnostic call
        </Link>
      </div>
    </div>
  );
}
