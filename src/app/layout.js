import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "@/components/ui/SmoothScroll";
import JsonLd from "@/components/seo/JsonLd";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import CursorWrapper from "@/components/cursor/CursorWrapper";
import CookieConsentBanner from "@/components/analytics/CookieConsentBanner";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";

/* ── Fonts (Local woff2 — zero CDN latency) ───────────────────────────── */
const instrumentSerif = localFont({
  src: [
    { path: "../../fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
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
    default: "The Intelliverse | Custom Software & SaaS in Ahmedabad",
    template: "%s | The Intelliverse, Ahmedabad",
  },
  description:
    "The Intelliverse is an engineering-first software & SaaS studio in Ahmedabad, India. We engineer high-performance Next.js web systems & cloud software.",
  keywords: [
    "The Intelliverse",
    "Intelliverse",
    "TheIntelliverse",
    "theintelliverse.tech",
    "Intelliverse Tech",
    "Intelliverse Software",
    "The Intelliverse Ahmedabad",
    "Intelliverse Ahmedabad",
    "software development company in Ahmedabad",
    "top software development companies in Ahmedabad",
    "web development company Ahmedabad",
    "IT services Ahmedabad",
    "best IT company in Ahmedabad",
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-precomposed.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
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
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "The Intelliverse | Custom Software & SaaS in Ahmedabad",
    description:
      "The Intelliverse is an engineering-first software & SaaS studio in Ahmedabad, India. We engineer high-performance Next.js web systems & cloud software.",
    emails: [siteConfig.email],
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        secureUrl: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "The Intelliverse — Custom Software & SaaS Architecture Studio in Ahmedabad",
      },
      {
        url: `${siteConfig.url}/logo-512.png`,
        secureUrl: `${siteConfig.url}/logo-512.png`,
        width: 512,
        height: 512,
        type: "image/png",
        alt: "The Intelliverse Official Brand Logo",
      },
      {
        url: `${siteConfig.url}/the-intelliverse-mark.png`,
        secureUrl: `${siteConfig.url}/the-intelliverse-mark.png`,
        width: 800,
        height: 800,
        type: "image/png",
        alt: "The Intelliverse Brand Mark",
      },
      {
        url: `${siteConfig.url}/the-intelliverse-logo.png`,
        secureUrl: `${siteConfig.url}/the-intelliverse-logo.png`,
        width: 281,
        height: 299,
        type: "image/png",
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
    site: "@theintelliverse",
    creator: "@theintelliverse",
    title: "The Intelliverse | Custom Software & SaaS in Ahmedabad",
    description:
      "The Intelliverse is an engineering-first software & SaaS studio in Ahmedabad, India. We engineer high-performance Next.js web systems & cloud software.",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "The Intelliverse — Custom Software & SaaS Architecture Studio in Ahmedabad",
      },
    ],
  },
  verification: {
    google: [
      "_bBKjibzbtCllmNG_idI9G98RKmAUWOYhREw9eoQXQY",
      "VokGQwH0xmoTvEfJqEn5787EY10aWuIuYa6tKNazEBw",
      "s7Q6LYBnHQrQ8R0SPIZdfs84RFJyiCmwhY6WgEqxAXA",
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
    "image": `${siteConfig.url}/og-image.png`,
    "thumbnail": `${siteConfig.url}/logo-512.png`,
    "og:image:secure_url": `${siteConfig.url}/og-image.png`,
    "og:logo": `${siteConfig.url}/logo-512.png`,
    "twitter:image:alt": "The Intelliverse — Custom Software & SaaS Architecture Studio in Ahmedabad",
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
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
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
    "@id": `${siteConfig.url}/#logo`,
    url: `${siteConfig.url}/logo-512.png`,
    caption: siteConfig.name,
    width: 512,
    height: 512,
  },
  image: {
    "@type": "ImageObject",
    "@id": `${siteConfig.url}/#primaryimage`,
    url: `${siteConfig.url}/og-image.png`,
    width: 1200,
    height: 630,
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
    siteConfig.socialLinks.twitter,
  ].filter(Boolean),
  foundingLocation: {
    "@type": "Place",
    name: "Ahmedabad, Gujarat, India",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
  },
  knowsLanguage: ["en", "hi", "gu"],
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
        {/* Instant visited state detection to eliminate preloader flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('iv-visited')){document.documentElement.classList.add('iv-visited');}}catch(e){}`,
          }}
        />

        {/* Preconnect to external CDN to eliminate connection latency */}
        <link key="fa-preconnect" rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link key="fa-dns-prefetch" rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

        {/* Preload hero LCP image with highest priority */}
        <link
          key="lcp-image-preload"
          rel="preload"
          as="image"
          href="/the-intelliverse-mark.png"
          fetchPriority="high"
          type="image/png"
        />

        {/* Font Awesome 6 Icons */}
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

        {/* Google & Multi-Platform Favicon Suite */}
        <link key="fav-ico" rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
        <link key="fav-48" rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link key="fav-192" rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link key="fav-512" rel="icon" type="image/png" sizes="512x512" href="/logo-512.png" />
        <link key="fav-svg" rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link key="apple-touch-icon" rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* JSON-LD Structured Data via Reusable Server Component */}
        <JsonLd key="json-ld-structured-data" schema={[websiteSchema, orgSchema, localBizSchema, homeFaqSchema]} />
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) — via first-party gateway */}
        <noscript>
          <iframe
            src="/ns.html?id=GTM-55LNSWG7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Skip to content for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        {/* Google Consent Mode v2 Default (Must execute before any Google tags fire) */}
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;

            // Enable URL Passthrough for tracking when ad_storage is denied
            gtag('set', 'url_passthrough', true);

            // Set default consent to 'denied' as placeholder / check existing preference
            var storedConsent = null;
            try {
              storedConsent = localStorage.getItem('cookie_consent');
            } catch (e) {}

            if (storedConsent === 'granted') {
              gtag('consent', 'default', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
              });
            } else {
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied'
              });
            }

            function allConsentGranted() {
              gtag('consent', 'update', {
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'ad_storage': 'granted',
                'analytics_storage': 'granted'
              });
              try {
                localStorage.setItem('cookie_consent', 'granted');
              } catch (e) {}
            }
            window.allConsentGranted = allConsentGranted;

            function allConsentDenied() {
              gtag('consent', 'update', {
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'ad_storage': 'denied',
                'analytics_storage': 'denied'
              });
              try {
                localStorage.setItem('cookie_consent', 'denied');
              } catch (e) {}
            }
            window.allConsentDenied = allConsentDenied;
          `}
        </Script>

        {/* Google Tag Manager — loaded via first-party gateway */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            '/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-55LNSWG7');
          `}
        </Script>

        {/* Google Analytics 4 — loaded via first-party gateway */}
        <Script
          key="ga4-script"
          strategy="afterInteractive"
          src="/gtag/js?id=G-9G65ML1LNR"
        />
        <Script key="ga4-init" id="google-analytics" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', 'G-9G65ML1LNR', {
              page_path: window.location.pathname,
              send_page_view: true,
              server_container_url: 'https://theintelliverse.tech'
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

        <CookieConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
