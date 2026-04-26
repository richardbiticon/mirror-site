import { ImageResponse } from "next/og";

/**
 * Site-wide Open Graph image per Next.js metadata file convention.
 * Used as the default OG image on every page that does not define its
 * own opengraph-image. Mirror eyebrow plus the master one-sentence
 * description from /docs/01-company-charter.md.
 *
 * Renders without a custom font; falls back to system fonts in the
 * @vercel/og environment. Brand discipline is preserved through layout
 * and color, not exact typography.
 */
export const alt =
  "Mirror. Talk to your customer. Before you sell to them.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0B",
          color: "#F4F2EE",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            color: "#00FF9D",
            fontSize: 18,
            letterSpacing: 2.5,
            textTransform: "uppercase",
          }}
        >
          MIRROR / M1
        </div>

        <div
          style={{
            fontSize: 84,
            lineHeight: 0.95,
            letterSpacing: -2,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div>Talk to your customer.</div>
          <div>Before you sell to them.</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#6B6B70",
            fontSize: 16,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          <span>Mirror builds you a private AI clone of your best customer.</span>
        </div>
      </div>
    ),
    size,
  );
}
