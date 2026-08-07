/**
 * Next.js 16 Dynamic Sitemap Generator
 */
export default async function sitemap() {
  const baseUrl = "https://intelliverse.io";

  const routes = [
    "",
    "/#about",
    "/#services",
    "/#projects",
    "/#team",
    "/#contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
