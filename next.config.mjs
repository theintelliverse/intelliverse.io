import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      "@designcodeio/threeui/style.css": "./src/shaders/threeui.css",
      "@designcodeio/threeui": "./src/shaders/landing-pages/LandingPages.tsx",
    },
  },
  webpack: (config) => {
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias["@designcodeio/threeui/style.css"] = path.resolve(__dirname, "src/shaders/threeui.css");
    config.resolve.alias["@designcodeio/threeui"] = path.resolve(__dirname, "src/shaders/landing-pages/LandingPages.tsx");
    return config;
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.theintelliverse.tech" }],
        destination: "https://theintelliverse.tech/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.intelliverse.io" }],
        destination: "https://theintelliverse.tech/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "intelliverse.io" }],
        destination: "https://theintelliverse.tech/:path*",
        permanent: true,
      },
      {
        source: "/robot.txt",
        destination: "/robots.txt",
        permanent: true,
      },
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/llms",
        destination: "/llms.txt",
        permanent: true,
      },
      {
        source: "/llm",
        destination: "/llms.txt",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // ── Google tag gateway for advertisers ─────────────────────────────
      // Proxies Google tag scripts and measurement hits through the first-party
      // domain so they are not blocked by content blockers or ITP.
      // Spec: https://developers.google.com/tag-platform/tag-gateway
      {
        // Google tag JS loader (gtag.js)
        source: "/gtag/js",
        destination: "https://www.googletagmanager.com/gtag/js",
      },
      {
        // Google Tag Manager container script
        source: "/gtm.js",
        destination: "https://www.googletagmanager.com/gtm.js",
      },
      {
        // GTM noscript iframe fallback
        source: "/ns.html",
        destination: "https://www.googletagmanager.com/ns.html",
      },
      {
        // Google measurement / conversion pings (analytics, ads, floodlight)
        source: "/g/collect",
        destination: "https://www.google-analytics.com/g/collect",
      },
      {
        // Universal Analytics fallback collect endpoint
        source: "/collect",
        destination: "https://www.google-analytics.com/collect",
      },
      {
        // Google Ads / DoubleClick ad storage pings
        source: "/pagead/:path*",
        destination: "https://pagead2.googlesyndication.com/pagead/:path*",
      },
      {
        // Tag Manager preview / debug requests
        source: "/gtag/:path*",
        destination: "https://www.googletagmanager.com/gtag/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/api/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
};

export default nextConfig;
