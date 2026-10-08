import fs from "fs";
import path from "path";

/**
 * Standalone XML Generator / Exporter for sitemap.xml
 * Run: node scripts/export-sitemap-xml.mjs
 */

const BASE_URL = "https://intelliverse.io";
const CURRENT_DATE = "2026-10-08";

const staticUrls = [
  { loc: `${BASE_URL}`, lastmod: CURRENT_DATE, changefreq: "daily", priority: "1.0", images: [`${BASE_URL}/og-image.png`, `${BASE_URL}/the-intelliverse-logo.jpg`] },
  { loc: `${BASE_URL}/software-development-company-ahmedabad`, lastmod: CURRENT_DATE, changefreq: "weekly", priority: "0.95", images: [`${BASE_URL}/og-image.png`] },
  { loc: `${BASE_URL}/services/web-development`, lastmod: CURRENT_DATE, changefreq: "weekly", priority: "0.90", images: [`${BASE_URL}/og-image.png`] },
  { loc: `${BASE_URL}/services/software-engineering`, lastmod: CURRENT_DATE, changefreq: "weekly", priority: "0.90", images: [`${BASE_URL}/og-image.png`] },
  { loc: `${BASE_URL}/services/it-architecture-support`, lastmod: CURRENT_DATE, changefreq: "weekly", priority: "0.90", images: [`${BASE_URL}/og-image.png`] },
  { loc: `${BASE_URL}/services/ai-data-robotics-iot`, lastmod: CURRENT_DATE, changefreq: "weekly", priority: "0.90", images: [`${BASE_URL}/og-image.png`] },
  { loc: `${BASE_URL}/work/appointory`, lastmod: CURRENT_DATE, changefreq: "monthly", priority: "0.85", images: [`${BASE_URL}/og-image.png`] },
  { loc: `${BASE_URL}/work/vrix`, lastmod: CURRENT_DATE, changefreq: "monthly", priority: "0.85", images: [`${BASE_URL}/og-image.png`] },
  { loc: `${BASE_URL}/about`, lastmod: CURRENT_DATE, changefreq: "monthly", priority: "0.80", images: [`${BASE_URL}/founder_dhruvil.jpg`, `${BASE_URL}/founder_jal.jpg`, `${BASE_URL}/founder_rudra.jpg`] },
  { loc: `${BASE_URL}/contact`, lastmod: CURRENT_DATE, changefreq: "monthly", priority: "0.85", images: [`${BASE_URL}/og-image.png`] },
  { loc: `${BASE_URL}/faq`, lastmod: CURRENT_DATE, changefreq: "weekly", priority: "0.80", images: [`${BASE_URL}/og-image.png`] },
  { loc: `${BASE_URL}/blog`, lastmod: CURRENT_DATE, changefreq: "daily", priority: "0.85", images: [`${BASE_URL}/og-image.png`] },
  { loc: `${BASE_URL}/blog/what-is-the-intelliverse`, lastmod: "2026-10-05", changefreq: "monthly", priority: "0.80", images: [`${BASE_URL}/og-image.png`] },
  { loc: `${BASE_URL}/blog/how-much-does-custom-software-cost-in-india`, lastmod: "2026-10-05", changefreq: "monthly", priority: "0.75", images: [`${BASE_URL}/og-image.png`] },
  { loc: `${BASE_URL}/blog/web-app-vs-mobile-app-how-to-choose`, lastmod: "2026-10-05", changefreq: "monthly", priority: "0.75", images: [`${BASE_URL}/og-image.png`] },
  { loc: `${BASE_URL}/blog/how-to-digitise-a-clinic-appointment-queue`, lastmod: "2026-10-05", changefreq: "monthly", priority: "0.75", images: [`${BASE_URL}/og-image.png`] },
  { loc: `${BASE_URL}/privacy`, lastmod: "2026-10-05", changefreq: "yearly", priority: "0.30" },
  { loc: `${BASE_URL}/terms`, lastmod: "2026-10-05", changefreq: "yearly", priority: "0.30" },
];

function buildXml(entries) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  for (const entry of entries) {
    xml += `  <url>\n`;
    xml += `    <loc>${entry.loc}</loc>\n`;
    if (entry.lastmod) xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    if (entry.changefreq) xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    if (entry.priority) xml += `    <priority>${entry.priority}</priority>\n`;
    if (entry.images && entry.images.length > 0) {
      for (const img of entry.images) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${img}</image:loc>\n`;
        xml += `    </image:image>\n`;
      }
    }
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

const xmlOutput = buildXml(staticUrls);
console.log(`Generated sitemap XML with ${staticUrls.length} canonical URLs.`);
console.log(xmlOutput);
