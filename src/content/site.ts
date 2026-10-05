/**
 * The Intelliverse — Single Source of Truth for Site & Organization Facts
 * 
 * CRITICAL RULE: Never fabricate addresses, phone numbers, awards, client names,
 * ratings, or statistics. If a field is empty, it MUST remain empty or be omitted from schemas.
 */

export interface Founder {
  name: string;
  role: string;
  tagline: string;
  linkedin?: string;
  portfolio?: string;
  instagram?: string;
  github?: string;
  youtube?: string;
  facebook?: string;
  twitter?: string;
  image?: string;
  imageX?: number;
  imageY?: number;
  order?: number;
  customLinks?: { name: string; url: string; icon?: string }[];
}

export interface SiteConfig {
  name: string;
  legalName: string;
  alternateName: string[];
  disambiguatingDescription: string;
  showDisambiguationNote: boolean;
  disambiguationNote?: string;
  url: string;
  organizationId: string;
  websiteId: string;
  tagline: string;
  shortDescription: string;
  description: string;
  email: string;
  phone: string; // Left empty as none provided; do not fabricate
  address: {
    streetAddress: string; // Left empty; only city/state known
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  socialLinks: {
    linkedin: string;
    instagram: string;
    twitter?: string;
    github?: string;
    youtube?: string;
    clutch?: string;
  };
  founders: Founder[];
  verifiedClients: {
    name: string;
    type: string;
    url: string;
    description: string;
  }[];
  services: {
    slug: string;
    name: string;
    serviceType: string;
    summary: string;
  }[];
  allowedBots: string[];
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://intelliverse.io";

export const siteConfig: SiteConfig = {
  name: "The Intelliverse",
  legalName: "The Intelliverse",
  alternateName: ["TheIntelliverse", "The Intelliverse Ahmedabad", "Intelliverse Ahmedabad"],
  disambiguatingDescription: "Software, web and IT services company based in Ahmedabad, India.",
  showDisambiguationNote: false, // Set to true only if legally reviewed by owner
  disambiguationNote:
    "The Intelliverse is an independent software development, web engineering, and IT services company based in Ahmedabad, Gujarat, India. Not affiliated with any other similarly named telecom or legacy software entities.",
  url: siteUrl,
  organizationId: `${siteUrl}/#organization`,
  websiteId: `${siteUrl}/#website`,
  tagline: "Software, Web & IT Services, Built Like a Craft",
  shortDescription:
    "An engineering-first software development, web architecture, and IT services company in Ahmedabad, Gujarat, India.",
  description:
    "The Intelliverse is an engineering-first software development, web architecture, and dedicated IT services company based in Ahmedabad, Gujarat, India. We architect resilient SaaS platforms, high-throughput digital systems, and custom web infrastructure.",
  email: "theintelliverse@gmail.com",
  phone: "", // Intentionally empty — not published
  address: {
    streetAddress: "", // Intentionally empty — not published
    locality: "Ahmedabad",
    region: "Gujarat",
    postalCode: "380009",
    country: "IN",
  },
  coordinates: {
    latitude: 23.0225,
    longitude: 72.5714,
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/the-intelliverse/",
    instagram: "https://www.instagram.com/the_intelliverse/",
    github: "https://github.com/theintelliverse",
    twitter: "",
    youtube: "",
    clutch: "",
  },
  founders: [
    {
      name: "Dhruvil Thummar",
      role: "Co-founder & CTO",
      tagline: "Engineering scalable systems & leading technical vision",
      linkedin: "https://www.linkedin.com/in/dhruvilthummar",
      image: "/founder_dhruvil.jpg",
    },
    {
      name: "Rudra Kankotiya",
      role: "Co-founder & CMO",
      tagline: "Driving brand strategy & marketing excellence",
      linkedin: "https://www.linkedin.com/in/rudra-kankotiya-2173ab31a",
      image: "/founder_rudra.jpg",
    },
    {
      name: "Jal Anghan",
      role: "Founder & Director",
      tagline: "Visionary leadership & strategic business growth",
      linkedin: "https://www.linkedin.com/in/jal-anghan-534628309",
      image: "/founder_jal.jpg",
    },
  ],
  verifiedClients: [
    {
      name: "Appointory",
      type: "Healthcare SaaS Platform",
      url: "https://appointory.in",
      description:
        "Automated clinic queue coordination with real-time arrival notifications and diagnostic records locker.",
    },
    {
      name: "Vrix Jewellery",
      type: "Luxury E-Commerce",
      url: "https://vrix.in",
      description:
        "International luxury jewellery storefront with multi-currency checkout, dynamic geolocation pricing, and instant filtering.",
    },
  ],
  services: [
    {
      slug: "web-development",
      name: "Web Development & Architecture",
      serviceType: "WebDevelopment",
      summary:
        "Next.js, React, and TypeScript web applications engineered for sub-second page loads, high SEO discoverability, and rock-solid reliability.",
    },
    {
      slug: "software-engineering",
      name: "Custom Software & SaaS Engineering",
      serviceType: "CustomSoftwareDevelopment",
      summary:
        "Full-cycle product engineering from database schema design and microservices to multi-tenant SaaS architecture.",
    },
    {
      slug: "it-architecture-support",
      name: "Cloud Architecture & IT Infrastructure",
      serviceType: "ITConsulting",
      summary:
        "AWS, Docker, Kubernetes, CI/CD pipelines, and proactive security hardening designed to prevent downtime.",
    },
    {
      slug: "ai-data-robotics-iot",
      name: "Applied AI, Data & Automation Workflows",
      serviceType: "ArtificialIntelligenceServices",
      summary:
        "RAG workflows, custom LLM tool-calling agents, automation pipelines, and telemetry dashboards.",
    },
  ],
  allowedBots: [
    // Standard Search Engines
    "Googlebot",
    "Bingbot",
    "Applebot",
    "DuckDuckBot",
    "YandexBot",
    // AI Answer Engines & Search Crawlers
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "PerplexityBot",
    "Google-Extended",
    "FacebookExternalHit",
    "Twitterbot",
    "LinkedInBot",
  ],
};
