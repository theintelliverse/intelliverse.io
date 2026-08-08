import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import SmoothScroll from "@/components/ui/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  themeColor: "#111827",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
};

export const metadata = {
  metadataBase: new URL("https://intelliverse.io"),
  title: {
    default: "The Intelliverse | Engineering the Digital Future",
    template: "%s | The Intelliverse",
  },
  description:
    "The Intelliverse is an elite digital engineering agency specializing in high-performance Next.js 16 web applications, 3D WebGL experiences, native mobile apps, and custom multi-tenant enterprise software.",
  keywords: [
    "The Intelliverse",
    "software development",
    "web development agency",
    "Next.js 16",
    "React 19",
    "3D WebGL",
    "mobile app development",
    "custom SaaS",
    "enterprise software",
    "Ahmedabad tech agency",
  ],
  authors: [{ name: "The Intelliverse", url: "https://intelliverse.io" }],
  creator: "The Intelliverse",
  publisher: "The Intelliverse",
  applicationName: "The Intelliverse",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.json",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
  alternates: {
    canonical: "https://intelliverse.io",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://intelliverse.io",
    siteName: "The Intelliverse",
    title: "The Intelliverse | Engineering the Digital Future",
    description:
      "Engineering high-performance Next.js web applications, 3D WebGL experiences, native mobile apps, and custom enterprise software portals.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The Intelliverse - Engineering the Digital Future",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Intelliverse | Engineering the Digital Future",
    description:
      "Engineering high-performance Next.js web applications, 3D WebGL experiences, native mobile apps, and custom enterprise software portals.",
    images: ["/opengraph-image"],
    site: "@theintelliverse",
    creator: "@theintelliverse",
  },
  verification: {
    google: "V9ShBblTx27Z4kLyDmhiU4PPANzjWD_j1O76UrDD40I",
  },
  appleWebApp: {
    capable: true,
    title: "The Intelliverse",
    statusBarStyle: "black-translucent",
  },
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Ahmedabad",
    "geo.position": "23.0225;72.5714",
    "ICBM": "23.0225, 72.5714",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

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
        />

        {/* ProfessionalService / LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "The Intelliverse",
              "description": "Premium software and web development agency providing custom SaaS portals, mobile applications, and comprehensive IT solutions.",
              "url": "https://intelliverse.io/",
              "logo": "https://raw.githubusercontent.com/DhruvilThummar/The-Intelliverse/06e4998906bcd13f5d1dd0bdf0ff672bddf85832/the%20intelliverse%20logo.jpg",
              "image": "https://raw.githubusercontent.com/DhruvilThummar/The-Intelliverse/06e4998906bcd13f5d1dd0bdf0ff672bddf85832/the%20intelliverse%20logo.jpg",
              "priceRange": "$$-$$$",
              "telephone": "+91-9000000000",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ahmedabad",
                "addressRegion": "Gujarat",
                "addressCountry": "IN",
                "postalCode": "380009"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "23.0225",
                "longitude": "72.5714"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "19:00"
              },
              "serviceArea": "IN",
              "areaServed": ["India", "United States", "United Kingdom", "Canada"],
              "knowsAbout": [
                "Software Development",
                "Web Development",
                "SaaS Portals",
                "Mobile Applications",
                "E-commerce Websites",
                "Cloud Services",
                "UI/UX Design"
              ]
            })
          }}
        />

        {/* WebSite Search Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "The Intelliverse",
              "url": "https://intelliverse.io/",
              "inLanguage": "en-IN",
              "description": "Your Innovation Partner in Software & Web Development",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://intelliverse.io/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Services Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Web Development",
                "provider": {
                  "@type": "Organization",
                  "name": "The Intelliverse",
                  "url": "https://intelliverse.io/",
                  "logo": "https://raw.githubusercontent.com/DhruvilThummar/The-Intelliverse/06e4998906bcd13f5d1dd0bdf0ff672bddf85832/the%20intelliverse%20logo.jpg"
                },
                "areaServed": ["IN", "US", "GB", "CA"],
                "description": "Crafting beautiful, responsive, and high-performing websites and web applications tailored to your business needs."
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Software Development",
                "provider": {
                  "@type": "Organization",
                  "name": "The Intelliverse",
                  "url": "https://intelliverse.io/",
                  "logo": "https://raw.githubusercontent.com/DhruvilThummar/The-Intelliverse/06e4998906bcd13f5d1dd0bdf0ff672bddf85832/the%20intelliverse%20logo.jpg"
                },
                "areaServed": ["IN", "US", "GB", "CA"],
                "description": "Building custom software solutions, multi-tenant SaaS platforms, and native mobile applications to streamline operations."
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "IT Services",
                "provider": {
                  "@type": "Organization",
                  "name": "The Intelliverse",
                  "url": "https://intelliverse.io/",
                  "logo": "https://raw.githubusercontent.com/DhruvilThummar/The-Intelliverse/06e4998906bcd13f5d1dd0bdf0ff672bddf85832/the%20intelliverse%20logo.jpg"
                },
                "areaServed": ["IN", "US", "GB", "CA"],
                "description": "Providing reliable IT support, cloud services, DevOps pipelines, and continuous maintenance."
              }
            ])
          }}
        />
      </head>
      <body className={inter.className}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}

