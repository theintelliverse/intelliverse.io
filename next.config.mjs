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
        has: [{ type: "host", value: "www.intelliverse.io" }],
        destination: "https://intelliverse.io/:path*",
        permanent: true,
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
    ];
  },
};

export default nextConfig;
