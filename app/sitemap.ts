import type { MetadataRoute } from "next";

/**
 * Sitemap per Next.js metadata file convention.
 *
 * Emits absolute URLs for every public route in the IA. Honors
 * NEXT_PUBLIC_SITE_URL when set; falls back to https://VERCEL_URL on
 * Vercel preview deploys; emits an empty sitemap if neither is set so
 * the build never fails for missing config.
 *
 * /demo and /dev are excluded: the demo is the product surface (we want
 * visitors arriving from the homepage, not a search result), and /dev
 * is internal QA.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null;
  const base = explicit ?? vercel;
  if (!base) return [];

  const lastModified = new Date();

  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1.0 },
    { path: "/method", priority: 0.9 },
    { path: "/pricing", priority: 0.9 },
    { path: "/book", priority: 0.9 },
    { path: "/manifesto", priority: 0.5 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
