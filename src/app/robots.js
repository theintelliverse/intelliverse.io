import { siteConfig } from "@/content/site";

/**
 * Next.js App Router robots.txt generator
 * Optimizes Googlebot, Bingbot, and AI answer engine crawling directives.
 */
export default function robots() {
  const baseUrl = (siteConfig.url || "https://intelliverse.io").replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/", "/_next/image/"],
        disallow: ["/admin", "/admin/", "/api/admin", "/api/content"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/_next/static/", "/_next/image/", "/sitemap.xml", "/llms.txt", "/llms-full.txt"],
        disallow: ["/admin", "/admin/", "/api/admin", "/api/content"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/_next/static/", "/_next/image/", "/og-image.png", "/*.jpg", "/*.png", "/*.svg"],
        disallow: ["/admin", "/admin/"],
      },
      ...siteConfig.allowedBots
        .filter((bot) => bot !== "Googlebot")
        .map((bot) => ({
          userAgent: bot,
          allow: ["/", "/_next/static/", "/_next/image/", "/llms.txt", "/llms-full.txt"],
          disallow: ["/admin", "/admin/", "/api/admin", "/api/content"],
        })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
