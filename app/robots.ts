import type { MetadataRoute } from "next";

/**
 * robots.txt per Next.js metadata file convention.
 *
 * Allow everything in the public IA. Block /dev (internal QA) and the
 * /api routes (server-only handlers). Point to the sitemap when a base
 * URL is available; otherwise omit the sitemap line so the file is
 * still valid.
 */
export default function robots(): MetadataRoute.Robots {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null;
  const base = explicit ?? vercel;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dev", "/api/"],
      },
    ],
    sitemap: base ? `${base}/sitemap.xml` : undefined,
  };
}
