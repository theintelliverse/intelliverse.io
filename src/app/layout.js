import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/ui/SmoothScroll";
import JsonLd from "@/components/seo/JsonLd";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import CursorWrapper from "@/components/cursor/CursorWrapper";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";

/* ── Fonts ────────────────────────────────────────────────────────────── */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
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
    "cloud architecture Gujarat",
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
      "The Intelliverse is an engineering-first software development, web architecture, and IT services company based in Ahmedabad, Gujarat, India.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The Intelliverse — Software, Web & IT Services in Ahmedabad, India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Intelliverse | Software, Web & IT Services in Ahmedabad, India",
    description:
      "The Intelliverse is an engineering-first software development, web architecture, and IT services company based in Ahmedabad, Gujarat, India.",
    images: ["/opengraph-image"],
    site: "@theintelliverse",
    creator: "@theintelliverse",
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "V9ShBblTx27Z4kLyDmhiU4PPANzjWD_j1O76UrDD40I",
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
      className={`${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Google Analytics 4 (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-S2ZW1XMDW8"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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

<<<<<<< HEAD
        {/* Microsoft Clarity Tracking */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "w7o4l96z6s");
          `}
        </Script>

        {/* Preconnect to external font origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />

        {/* Satoshi font */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
=======
    {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-S2ZW1XMDW8" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S2ZW1XMDW8');
            `,
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "The Intelliverse",
              "url": "https://intelliverse.io/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://raw.githubusercontent.com/DhruvilThummar/The-Intelliverse/06e4998906bcd13f5d1dd0bdf0ff672bddf85832/the%20intelliverse%20logo.jpg",
                "width": 800,
                "height": 800
              },
              "image": "https://raw.githubusercontent.com/DhruvilThummar/The-Intelliverse/06e4998906bcd13f5d1dd0bdf0ff672bddf85832/the%20intelliverse%20logo.jpg",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "email": "theintelliverse@gmail.com",
                  "contactType": "Customer Service",
                  "availableLanguage": "en-IN"
                },
                {
                  "@type": "ContactPoint",
                  "email": "theintelliverse@gmail.com",
                  "contactType": "Technical Support",
                  "availableLanguage": "en-IN"
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/company/the-intelliverse/",
                "https://www.instagram.com/the_intelliverse/",
                "https://twitter.com/theintelliverse",
                "https://www.facebook.com/theintelliverse"
              ],
              "description": "A dynamic software development company dedicated to providing innovative solutions in web development, mobile applications, and comprehensive IT services.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ahmedabad",
                "addressRegion": "Gujarat",
                "addressCountry": "IN",
                "postalCode": "380009"
              },
              "founder": [
                {
                  "@type": "Person",
                  "name": "Dhruvil Thummar",
                  "jobTitle": "Co-founder & CTO",
                  "sameAs": "https://www.linkedin.com/in/dhruvilthummar"
                },
                {
                  "@type": "Person",
                  "name": "Rudra Kankotiya",
                  "jobTitle": "Co-founder & CMO",
                  "sameAs": "https://www.linkedin.com/in/rudra-kankotiya-2173ab31a"
                },
                {
                  "@type": "Person",
                  "name": "Jal Anghan",
                  "jobTitle": "Founder & Director",
                  "sameAs": "https://www.linkedin.com/in/jal-anghan-534628309"
                }
              ],
              "knowsAbout": ["Software Development", "Web Development", "IT Services", "Mobile Applications", "AI Solutions", "SaaS Portals"]
            })
          }}
>>>>>>> 904708b290cb714b9f1b041c4de1906e03d3037c
        />

        {/* AI & LLM Machine-Readable Link */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Knowledge Dossier" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" title="Sitemap" />

        {/* JSON-LD Structured Data via Reusable Server Component */}
        <JsonLd schema={[websiteSchema, orgSchema, localBizSchema, homeFaqSchema]} />
      </head>
      <body className="font-sans antialiased">
        {/* Skip to content for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <CursorProvider>
          <SmoothScroll>
            <div className="flex flex-col min-h-screen">
              {children}
            </div>
          </SmoothScroll>
          <CursorWrapper />
        </CursorProvider>

        <Analytics />
      </body>
    </html>
  );
}
