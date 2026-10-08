import { siteConfig } from "@/content/site";
import { BLOG_POSTS } from "@/content/blog";

/**
 * Next.js App Router Sitemap Generator
 * Dynamically serves /sitemap.xml conforming to the sitemaps.org 0.9 XML protocol.
 * Includes all canonical, indexable URLs with accurate lastModified, changeFrequency,
 * priority, and Google Image Search references.
 *
 * @type {() => Promise<import('next').MetadataRoute.Sitemap> | import('next').MetadataRoute.Sitemap}
 */
export default async function sitemap() {
  const baseUrl = (siteConfig.url || "https://intelliverse.io").replace(/\/+$/, "");
  const currentReleaseDate = new Date("2026-10-08T00:00:00.000Z");

  /** @type {import('next').MetadataRoute.Sitemap} */
  const staticRoutes = [
    // ── Primary Landing & Core Discovery ───────────────────────
    {
      url: `${baseUrl}`,
      lastModified: currentReleaseDate,
      changeFrequency: "daily",
      priority: 1.0,
      images: [
        `${baseUrl}/og-image.png`,
        `${baseUrl}/the-intelliverse-logo.jpg`,
      ],
    },
    {
      url: `${baseUrl}/software-development-company-ahmedabad`,
      lastModified: currentReleaseDate,
      changeFrequency: "weekly",
      priority: 0.95,
      images: [`${baseUrl}/og-image.png`],
    },

    // ── Core Service Architecture ──────────────────────────────
    {
      url: `${baseUrl}/services/web-development`,
      lastModified: currentReleaseDate,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${baseUrl}/og-image.png`],
    },
    {
      url: `${baseUrl}/services/software-engineering`,
      lastModified: currentReleaseDate,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${baseUrl}/og-image.png`],
    },
    {
      url: `${baseUrl}/services/it-architecture-support`,
      lastModified: currentReleaseDate,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${baseUrl}/og-image.png`],
    },
    {
      url: `${baseUrl}/services/ai-data-robotics-iot`,
      lastModified: currentReleaseDate,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${baseUrl}/og-image.png`],
    },

    // ── Case Studies & Production Proof ────────────────────────
    {
      url: `${baseUrl}/work/appointory`,
      lastModified: currentReleaseDate,
      changeFrequency: "monthly",
      priority: 0.85,
      images: [`${baseUrl}/og-image.png`],
    },
    {
      url: `${baseUrl}/work/vrix`,
      lastModified: currentReleaseDate,
      changeFrequency: "monthly",
      priority: 0.85,
      images: [`${baseUrl}/og-image.png`],
    },

    // ── Company & Knowledge Hub ────────────────────────────────
    {
      url: `${baseUrl}/about`,
      lastModified: currentReleaseDate,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        `${baseUrl}/founder_dhruvil.jpg`,
        `${baseUrl}/founder_jal.jpg`,
        `${baseUrl}/founder_rudra.jpg`,
      ],
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentReleaseDate,
      changeFrequency: "monthly",
      priority: 0.85,
      images: [`${baseUrl}/og-image.png`],
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentReleaseDate,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${baseUrl}/og-image.png`],
    },

    // ── Engineering Journal / Blog Index ───────────────────────
    {
      url: `${baseUrl}/blog`,
      lastModified: currentReleaseDate,
      changeFrequency: "daily",
      priority: 0.85,
      images: [`${baseUrl}/og-image.png`],
    },

    // ── Legal & Policies ───────────────────────────────────────
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-10-05T00:00:00.000Z"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-10-05T00:00:00.000Z"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ── Dynamic Engineering Journal Articles ───────────────────
  /** @type {import('next').MetadataRoute.Sitemap} */
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.updatedDate || post.publishedDate}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: post.slug === "what-is-the-intelliverse" ? 0.8 : 0.75,
    images: [`${baseUrl}/og-image.png`],
  }));

  return [...staticRoutes, ...blogRoutes];
}
