import { DEMO_CONFIG } from "@/lib/demo-mirror/prompts";
import type { Persona } from "@/lib/demo-mirror/personas";

export const runtime = "nodejs";

/**
 * POST /api/mirror
 *
 * Streams a Mirror response back to the client as Server-Sent Events.
 * Per Richard's PLAN §4.6 answer, v1 ships with a hard-coded streamed
 * placeholder regardless of whether ANTHROPIC_API_KEY is set. When the
 * real Liquid Death prompts arrive (PLAN §4.7), this handler swaps to a
 * real Anthropic streaming call. The SSE event shape stays the same so
 * the client does not change.
 *
 * Event shape:
 *   event: persona      data: { name: string }
 *   event: token        data: { text: string }
 *   event: voting       data: { text: string }
 *   event: reasoning    data: { text: string }
 *   event: done         data: {}
 *   event: error        data: { message: string }
 *
 * Demo logging (brief §5.6) is a no-op until Vercel KV is provisioned.
 * The hook is in place; wire KV bindings in Vercel project settings to
 * activate it.
 */
export async function POST(req: Request) {
  let question = "";
  let sessionId = "";
  try {
    const body = (await req.json()) as { question?: unknown; sessionId?: unknown };
    if (typeof body.question !== "string" || body.question.trim().length === 0) {
      return jsonError("Question must be a non-empty string", 400);
    }
    if (body.question.length > 600) {
      return jsonError("Question is too long. Keep it under 600 characters.", 400);
    }
    question = body.question.trim();
    sessionId = typeof body.sessionId === "string" ? body.sessionId : "anon";
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const persona = pickLeadPersona(question);
  const stub = stubResponseFor(question, persona);
  void logInteraction({ sessionId, question, persona: persona.id });

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      const send = (event: string, data: unknown) => {
        controller.enqueue(
          encoder.encode(
            `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`,
          ),
        );
      };

      try {
        send("persona", { name: persona.name });

        for (const chunk of stub.tokens) {
          await sleep(60);
          send("token", { text: chunk });
        }

        send("voting", { text: stub.voting });
        send("reasoning", { text: stub.reasoning });
        send("done", {});
      } catch (err) {
        send("error", {
          message: err instanceof Error ? err.message : "Unknown error",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Deterministic persona picker. Hashes the question so the same question
 * routes to the same lead persona for stable demo behaviour.
 */
function pickLeadPersona(question: string): Persona {
  const personas = DEMO_CONFIG.personas;
  let hash = 0;
  for (let i = 0; i < question.length; i++) {
    hash = (hash * 31 + question.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % personas.length;
  return personas[index];
}

interface StubResponse {
  tokens: string[];
  voting: string;
  reasoning: string;
}

/**
 * Hard-coded placeholder response. Tokenised by space so the client gets
 * a believable streaming feel. Real prompts replace this with a model call.
 */
function stubResponseFor(_question: string, persona: Persona): StubResponse {
  const total = DEMO_CONFIG.personas.length;
  const agree = total - 1;

  const reply: Record<string, string> = {
    loyalist:
      "Three of us would say the same thing. The product worked. The relationship didn't. We felt like a line item, not a customer.",
    skeptic:
      "Two things stopped me. The pricing page asked me to commit before I could see the value. And nothing on the site looked like the kind of customer I am.",
    former:
      "There was a Tuesday in March when I realised the renewal email was the most personal contact I had had from you in six months. I had already decided.",
  };

  const text = reply[persona.id] ?? "Placeholder response.";
  const tokens = tokenise(text);

  const voting = `${agree} OF ${total} PERSONAS AGREE`;

  const reasoning = `The ${persona.name} voice was chosen because it answers the question most directly. The other ${total - 1} personas would broadly agree on the conclusion but emphasise different specifics: each notices the same disconnect from a different vantage point.`;

  return { tokens, voting, reasoning };
}

/**
 * Splits a string into word-shaped chunks while preserving spaces.
 */
function tokenise(text: string): string[] {
  return text.match(/\S+\s*|\s+/g) ?? [text];
}

interface LogPayload {
  sessionId: string;
  question: string;
  persona: string;
}

/**
 * Demo interaction logging. Wires to Vercel KV when env vars are set;
 * otherwise no-op. The KV binding is added in Vercel project settings,
 * which exposes KV_REST_API_URL and KV_REST_API_TOKEN. Until those are
 * present, logging silently skips.
 */
async function logInteraction(payload: LogPayload) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return;

  const entry = {
    ...payload,
    timestamp: new Date().toISOString(),
  };
  const key = `mirror:demo:${entry.timestamp}:${payload.sessionId}`;

  try {
    await fetch(`${url}/set/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });
  } catch {
    // Logging must never break the demo. Swallow the error.
  }
}
