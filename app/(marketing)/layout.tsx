import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

/**
 * Marketing layout. Wraps every page in /docs IA except /demo (chat-only,
 * full viewport) and /dev (internal QA). The root layout keeps the
 * html/body/font/Plausible scaffolding; this layer adds the global Nav
 * and Footer that visitors see on the public surface.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
