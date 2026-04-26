"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Custom cursor per /docs/mirror-website-build-brief.md §12.3.
 *
 * Active only when the mouse is inside the supplied scope element (the
 * homepage hero). Hides the system cursor on the scope, replaces it with
 * a 12px Signal outline circle that trails the actual cursor by 200ms.
 * Expands to 24px filled with Signal at 30% opacity over interactive
 * elements (button, a). Disabled on coarse pointers and when the user
 * has prefers-reduced-motion set.
 *
 * Implementation note: the dot is always rendered but stays at opacity 0
 * until the capability-detection effect adds its listeners, which in turn
 * drive the visible state. On touch or reduced-motion devices the effect
 * bails early, the listeners never fire, the dot never appears, and the
 * scope's system cursor is left untouched.
 */
interface CustomCursorProps {
  scopeRef: RefObject<HTMLElement | null>;
}

export function CustomCursor({ scopeRef }: CustomCursorProps) {
  const [visible, setVisible] = useState(false);
  const [over, setOver] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (coarse || reduced) return;

    const scope = scopeRef.current;
    const dot = dotRef.current;
    if (!scope || !dot) return;

    const previousCursor = scope.style.cursor;
    scope.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      const rect = scope.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      setVisible(inside);
      if (!inside) return;

      // Translate via transform on the dot directly so React state does
      // not fire on every pixel of mouse movement.
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;

      const target = document.elementFromPoint(e.clientX, e.clientY);
      setOver(!!target?.closest("button, a"));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      scope.style.cursor = previousCursor;
      window.removeEventListener("mousemove", onMove);
    };
  }, [scopeRef]);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 rounded-full border border-signal"
      style={{
        width: over ? 24 : 12,
        height: over ? 24 : 12,
        backgroundColor: over ? "rgb(0 255 157 / 0.3)" : "transparent",
        opacity: visible ? 1 : 0,
        transition:
          "transform 200ms cubic-bezier(0.16,1,0.3,1), width 200ms cubic-bezier(0.16,1,0.3,1), height 200ms cubic-bezier(0.16,1,0.3,1), background-color 200ms cubic-bezier(0.16,1,0.3,1), opacity 200ms cubic-bezier(0.16,1,0.3,1)",
        willChange: "transform",
      }}
    />
  );
}
