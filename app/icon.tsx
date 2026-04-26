import { ImageResponse } from "next/og";

/**
 * Dynamic favicon per Next.js metadata file convention.
 * Signal dot on Void background. The brand "alive" pulse rendered as a
 * static glyph: small enough to read clearly in browser tabs, distinctive
 * enough to recognize at a glance.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            background: "#00FF9D",
            borderRadius: "50%",
          }}
        />
      </div>
    ),
    size,
  );
}
