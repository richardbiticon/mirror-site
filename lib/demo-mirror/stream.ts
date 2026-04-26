/**
 * Client-side SSE consumer for the /api/mirror stream.
 * Emits typed callbacks for each event the server sends; matches the
 * event shape documented in /app/api/mirror/route.ts.
 */

export interface MirrorStreamHandlers {
  onPersona: (name: string) => void;
  onToken: (text: string) => void;
  onVoting: (text: string) => void;
  onReasoning: (text: string) => void;
  onDone: () => void;
  onError: (message: string) => void;
}

export async function streamMirror(
  question: string,
  sessionId: string,
  handlers: MirrorStreamHandlers,
  signal?: AbortSignal,
): Promise<void> {
  let response: Response;
  try {
    response = await fetch("/api/mirror", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, sessionId }),
      signal,
    });
  } catch (err) {
    if ((err as Error).name === "AbortError") return;
    handlers.onError("Mirror is unreachable. Try again in a moment.");
    return;
  }

  if (!response.ok || !response.body) {
    handlers.onError("Mirror is unreachable. Try again in a moment.");
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let terminated = false;

  // Wrap handlers so we can detect whether the server explicitly ended
  // the stream (via "done" or "error"). If neither fires before the
  // reader closes, we synthesize an onDone so the chat never gets stuck
  // showing the streaming indicator after the connection has ended.
  const wrapped: MirrorStreamHandlers = {
    ...handlers,
    onDone: () => {
      terminated = true;
      handlers.onDone();
    },
    onError: (msg) => {
      terminated = true;
      handlers.onError(msg);
    },
  };

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const blocks = buffer.split("\n\n");
      buffer = blocks.pop() ?? "";
      for (const block of blocks) {
        dispatchSseBlock(block, wrapped);
      }
    }
    if (buffer.trim().length > 0) dispatchSseBlock(buffer, wrapped);
    if (!terminated) handlers.onDone();
  } catch (err) {
    if ((err as Error).name !== "AbortError" && !terminated) {
      handlers.onError("Stream interrupted.");
    }
  }
}

function dispatchSseBlock(block: string, handlers: MirrorStreamHandlers) {
  let event = "";
  let data = "";
  for (const line of block.split("\n")) {
    if (line.startsWith("event: ")) event = line.slice(7).trim();
    else if (line.startsWith("data: ")) data += line.slice(6);
  }
  if (!event) return;

  let parsed: unknown = {};
  if (data.length > 0) {
    try {
      parsed = JSON.parse(data);
    } catch {
      return;
    }
  }
  const payload = parsed as Record<string, string>;

  switch (event) {
    case "persona":
      handlers.onPersona(payload.name ?? "");
      break;
    case "token":
      handlers.onToken(payload.text ?? "");
      break;
    case "voting":
      handlers.onVoting(payload.text ?? "");
      break;
    case "reasoning":
      handlers.onReasoning(payload.text ?? "");
      break;
    case "done":
      handlers.onDone();
      break;
    case "error":
      handlers.onError(payload.message ?? "Unknown error.");
      break;
  }
}
