import { cn } from "@/lib/utils";

/**
 * "Mirror is thinking" indicator per brief §2.5.
 * Single Signal dot pulsing at 1.2s interval. Brand moment, not a generic
 * loader. Used in chat while a response streams, on the empty state to
 * suggest the Mirror is "alive", and elsewhere in the demo top bar.
 */
interface Props {
  caption?: string;
  className?: string;
  /** Slightly larger dot for the empty state. */
  size?: "default" | "lg";
}

export function ThinkingIndicator({
  caption,
  className,
  size = "default",
}: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "rounded-full bg-signal animate-think-pulse shrink-0",
          size === "lg" ? "size-2" : "size-1.5",
        )}
        aria-hidden
      />
      {caption ? (
        <span className="text-eyebrow text-ash">{caption}</span>
      ) : null}
    </div>
  );
}
