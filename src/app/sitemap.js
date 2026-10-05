import { siteConfig } from "@/content/site";

/**
 * Next.js App Router Sitemap Generator
 * Valid XML sitemap with all indexable canonical URLs (no hash fragments)
 */
export default async function sitemap() {
  const baseUrl = siteConfig.url;
  const lastModified = new Date("2026-10-05T00:00:00Z");

  const routes = [
    { path: "", changeFrequency: "daily", priority: 1.0 },
    { path: "/software-development-company-ahmedabad", changeFrequency: "weekly", priority: 0.95 },
    { path: "/services/web-development", changeFrequency: "weekly", priority: 0.9 },
    { path: "/services/software-engineering", changeFrequency: "weekly", priority: 0.9 },
    { path: "/services/it-architecture-support", changeFrequency: "weekly", priority: 0.9 },
    { path: "/services/ai-data-robotics-iot", changeFrequency: "weekly", priority: 0.9 },
    { path: "/work/appointory", changeFrequency: "monthly", priority: 0.85 },
    { path: "/work/vrix", changeFrequency: "monthly", priority: 0.85 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.85 },
    { path: "/faq", changeFrequency: "weekly", priority: 0.8 },
    { path: "/blog", changeFrequency: "daily", priority: 0.8 },
    { path: "/blog/what-is-the-intelliverse", changeFrequency: "monthly", priority: 0.8 },
    { path: "/blog/how-much-does-custom-software-cost-in-india", changeFrequency: "monthly", priority: 0.75 },
    { path: "/blog/web-app-vs-mobile-app-how-to-choose", changeFrequency: "monthly", priority: 0.75 },
    { path: "/blog/how-to-digitise-a-clinic-appointment-queue", changeFrequency: "monthly", priority: 0.75 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
