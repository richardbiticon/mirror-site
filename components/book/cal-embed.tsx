"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

/**
 * Cal.com inline embed wrapper per brief §8.3.
 *
 * Renders only when calLink is provided. The /book page passes
 * NEXT_PUBLIC_CAL_EVENT through; if the env var is unset the page
 * renders a placeholder instead of mounting this component.
 *
 * Theme overrides per brief:
 *   background: Void   #0A0A0B
 *   text:       Bone   #F4F2EE
 *   accent:     Signal #00FF9D
 *   border:     Ash 30%
 *
 * The embed-react package does not give full font control, so the
 * Cal interior typography may not be JetBrains Mono / Geist. Brief
 * §8 accepts this constraint; visual continuity is preserved via the
 * surrounding page chrome.
 */
interface Props {
  calLink: string;
}

export function CalEmbed({ calLink }: Props) {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cal = await getCalApi({ namespace: "diagnostic" });
      if (cancelled) return;
      // Brand vars apply to both themes since we force dark and never
      // expose a theme toggle, but the Cal API requires both keys.
      const brandVars = {
        "cal-bg": "#0A0A0B",
        "cal-bg-emphasis": "#1A1A1D",
        "cal-bg-muted": "#1A1A1D",
        "cal-text": "#F4F2EE",
        "cal-text-emphasis": "#F4F2EE",
        "cal-text-muted": "#6B6B70",
        "cal-border": "rgba(107, 107, 112, 0.3)",
        "cal-border-default": "rgba(107, 107, 112, 0.3)",
        "cal-border-emphasis": "rgba(107, 107, 112, 0.6)",
        "cal-border-subtle": "rgba(107, 107, 112, 0.2)",
        "cal-brand": "#00FF9D",
        "cal-brand-emphasis": "#00FF9D",
        "cal-brand-text": "#0A0A0B",
      };
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: brandVars,
          light: brandVars,
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Cal
      namespace="diagnostic"
      calLink={calLink}
      style={{ width: "100%", height: "720px", overflow: "hidden" }}
      config={{ layout: "month_view" }}
    />
  );
}
