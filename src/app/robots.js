import { siteConfig } from "@/content/site";

export default function robots() {
  const baseUrl = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/", "/_next/image/"],
        disallow: ["/admin", "/admin/", "/api/admin", "/api/content"],
      },
      ...siteConfig.allowedBots.map((bot) => ({
        userAgent: bot,
        allow: ["/", "/_next/static/", "/_next/image/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/admin", "/admin/", "/api/admin", "/api/content"],
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
