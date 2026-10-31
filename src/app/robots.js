import { siteConfig } from "@/content/site";

/**
 * Next.js App Router robots.txt generator
 * Optimizes Googlebot, Bingbot, and AI answer engine crawling directives.
 * Note: Admin routes are kept secret and disallow-listed via HTTP response headers
 * (X-Robots-Tag: noindex, nofollow) to avoid endpoint disclosure in public robots.txt.
 */
export default function robots() {
  const baseUrl = (siteConfig.url || "https://theintelliverse.tech").replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/", "/_next/image/", "/sitemap.xml", "/llms.txt", "/llm.txt", "/llms-full.txt"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/_next/static/", "/_next/image/", "/sitemap.xml", "/llms.txt", "/llm.txt", "/llms-full.txt"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/_next/static/", "/_next/image/", "/og-image.png", "/the-intelliverse-logo.jpg", "/*.jpg", "/*.png", "/*.svg"],
      },
      ...siteConfig.allowedBots
        .filter((bot) => bot !== "Googlebot")
        .map((bot) => ({
          userAgent: bot,
          allow: ["/", "/_next/static/", "/_next/image/", "/llms.txt", "/llm.txt", "/llms-full.txt"],
        })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: "theintelliverse.tech",
  };
}
