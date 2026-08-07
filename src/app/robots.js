/**
 * Next.js 16 App Router Robots.txt Generator
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/private/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: "https://intelliverse.io/sitemap.xml",
    host: "https://intelliverse.io",
  };
}
