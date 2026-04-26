import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Mirror",
    template: "%s · Mirror",
  },
  description:
    "Mirror builds you a private AI clone of your best customer, so you can sell to them before you sell to anyone else.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/**
 * Root layout. Establishes the html shell, fonts, viewport, color scheme,
 * Plausible tracking, and the global skip-to-content link. The Nav and
 * Footer live in (marketing)/layout.tsx so they wrap only the public
 * marketing pages and not /demo (chat-only) or /dev (internal QA).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-signal focus:text-void focus:px-4 focus:py-2 focus:text-eyebrow"
        >
          Skip to content
        </a>
        {children}
        {plausibleDomain ? (
          <Script
            defer
            src="https://plausible.io/js/script.js"
            data-domain={plausibleDomain}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
