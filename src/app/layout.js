import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "@/components/ui/SmoothScroll";
import JsonLd from "@/components/seo/JsonLd";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import CursorWrapper from "@/components/cursor/CursorWrapper";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";

/* ── Fonts (Local woff2 — zero CDN latency) ───────────────────────────── */
const instrumentSerif = localFont({
  src: [
    { path: "../../fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/instrument-serif-latin-400-italic.woff2",  weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});

const jetbrainsMono = localFont({
  src: [
    { path: "../../fonts/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/jetbrains-mono-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

const plusJakartaSans = localFont({
  src: [
    { path: "../../fonts/plus-jakarta-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/plus-jakarta-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/plus-jakarta-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/plus-jakarta-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const caveat = localFont({
  src: [
    { path: "../../fonts/caveat-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/caveat-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-hand",
  display: "swap",
});

/* ── Viewport ─────────────────────────────────────────────────────────── */
export const viewport = {
  themeColor: "#0B1530",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
};

/* ── Metadata ─────────────────────────────────────────────────────────── */
export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "The Intelliverse | Software, Web & IT Services in Ahmedabad, India",
    template: "%s | The Intelliverse, Ahmedabad",
  },
  description:
    "The Intelliverse is an engineering-first software development, web architecture, and IT services company based in Ahmedabad, Gujarat, India. Custom SaaS and cloud systems.",
  keywords: [
    "The Intelliverse",
    "The Intelliverse Ahmedabad",
    "TheIntelliverse",
    "Intelliverse Ahmedabad",
    "software development company in Ahmedabad",
    "web development company Ahmedabad",
    "IT services Ahmedabad",
    "custom software development India",
    "SaaS development Ahmedabad",
    "Next.js agency Ahmedabad",
    "AI automation studio Ahmedabad",
    "cloud DevOps Gujarat",
    "Dhruvil Thummar",
    "Rudra Kankotiya",
    "Jal Anghan",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-IN": siteConfig.url,
      "en-US": siteConfig.url,
      "x-default": siteConfig.url,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "The Intelliverse | Software, Web & IT Services in Ahmedabad, India",
    description:
      "The Intelliverse is an engineering-first software development, web architecture, and IT services company based in Ahmedabad, Gujarat, India. Custom SaaS, Next.js web applications, and cloud systems.",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        secureUrl: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "The Intelliverse — Software, Web & IT Services in Ahmedabad, India",
      },
      {
        url: `${siteConfig.url}/the-intelliverse-logo.jpg`,
        secureUrl: `${siteConfig.url}/the-intelliverse-logo.jpg`,
        width: 500,
        height: 500,
        type: "image/jpeg",
        alt: "The Intelliverse Brand Identity",
      },
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "The Intelliverse — Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Intelliverse | Software, Web & IT Services in Ahmedabad, India",
    description:
      "The Intelliverse is an engineering-first software development, web architecture, and IT services company based in Ahmedabad, Gujarat, India.",
    images: [`${siteConfig.url}/og-image.png`],
    site: "@theintelliverse",
    creator: "@theintelliverse",
  },
  verification: {
    google: [
      "_bBKjibzbtCllmNG_idI9G98RKmAUWOYhREw9eoQXQY",
      "VokGQwH0xmoTvEfJqEn5787EY10aWuIuYa6tKNazEBw",
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? [process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION]
        : []),
    ],
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    },
  },
  appleWebApp: {
    capable: true,
    title: "The Intelliverse",
    statusBarStyle: "black-translucent",
  },
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Ahmedabad",
    "geo.position": `${siteConfig.coordinates.latitude};${siteConfig.coordinates.longitude}`,
    ICBM: `${siteConfig.coordinates.latitude}, ${siteConfig.coordinates.longitude}`,
  },
};

/* ── JSON-LD Schemas (Truth-grounded from siteConfig) ─────────────────── */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": siteConfig.websiteId,
  url: siteConfig.url,
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  description: siteConfig.description,
  inLanguage: "en-IN",
  publisher: {
    "@id": siteConfig.organizationId,
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": siteConfig.organizationId,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  alternateName: siteConfig.alternateName,
  disambiguatingDescription: siteConfig.disambiguatingDescription,
  url: siteConfig.url,
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/the-intelliverse-logo.jpg`,
    width: 500,
    height: 500,
  },
  slogan: siteConfig.tagline,
  description: siteConfig.description,
  email: siteConfig.email,
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: siteConfig.email,
      contactType: "Customer Support & Architecture Consultation",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
  ],
  sameAs: [
    siteConfig.socialLinks.linkedin,
    siteConfig.socialLinks.instagram,
    siteConfig.socialLinks.github,
  ].filter(Boolean),
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country,
    postalCode: siteConfig.address.postalCode,
  },
  founder: siteConfig.founders.map((f) => {
    const sameAsList = [
      f.linkedin,
      f.portfolio,
      f.instagram,
      f.github,
      f.youtube,
      f.facebook,
      f.twitter,
      ...(f.customLinks || []).map((cl) => cl.url),
    ].filter(Boolean);
    return {
      "@type": "Person",
      name: f.name,
      jobTitle: f.role,
      sameAs: sameAsList.length > 0 ? (sameAsList.length === 1 ? sameAsList[0] : sameAsList) : undefined,
    };
  }),
  knowsAbout: [
    "Software Engineering",
    "Web Architecture",
    "Next.js Development",
    "SaaS Platform Architecture",
    "Cloud Infrastructure & DevOps",
    "Applied AI & Automation",
    "Full-Stack Engineering",
  ],
  areaServed: ["India", "Worldwide"],
};

const localBizSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#localbusiness`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  email: siteConfig.email,
  priceRange: "₹₹-₹₹₹",
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country,
    postalCode: siteConfig.address.postalCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.coordinates.latitude,
    longitude: siteConfig.coordinates.longitude,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
  areaServed: ["Ahmedabad", "Gujarat", "India", "Worldwide"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software & Web Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Starter Web Architecture & Landing Pages",
          description: "High-conversion, sub-second landing systems and brand storefronts.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "INR",
          minPrice: "15000",
          maxPrice: "45000",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Web Application & Next.js Systems",
          description: "Full-stack web applications with authentication, databases, and CI/CD.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "INR",
          minPrice: "45000",
          maxPrice: "150000",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Enterprise Multi-Tenant SaaS Platform",
          description: "Scalable cloud SaaS architectures with role-based access control and microservices.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "INR",
          minPrice: "150000",
          maxPrice: "800000",
        },
      },
    ],
  },
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: (seoConfig.home.faqs || []).map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

/* ── Root Layout ──────────────────────────────────────────────────────── */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${instrumentSerif.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} ${caveat.variable}`}
    >
      <head>
        {/* Font Awesome 6 Icons for Admin Console and UI */}
        <link
          key="font-awesome-css"
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* AI & LLM Machine-Readable Link */}
        <link key="llms-txt" rel="alternate" type="text/plain" href="/llms.txt" title="LLM Knowledge Dossier" />

        {/* JSON-LD Structured Data via Reusable Server Component */}
        <JsonLd key="json-ld-structured-data" schema={[websiteSchema, orgSchema, localBizSchema, homeFaqSchema]} />
      </head>
      <body className="font-sans antialiased">
        {/* Skip to content for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        {/* Google Analytics 4 (gtag.js) */}
        <Script
          key="ga4-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-S2ZW1XMDW8"
        />
        <Script key="ga4-init" id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S2ZW1XMDW8', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>

        {/* Microsoft Clarity Tracking */}
        <Script key="clarity-script" id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "w7o4l96z6s");
          `}
        </Script>

        <MotionConfig
          reducedMotion="user"
          transition={{ ease: [0.16, 1, 0.3, 1] }}
        >
          <CursorProvider>
            <SmoothScroll>
              <div className="flex flex-col min-h-screen">
                {children}
              </div>
            </SmoothScroll>
            <CursorWrapper />
          </CursorProvider>
        </MotionConfig>

        <Analytics />
      </body>
    </html>
  );
}
