import "./globals.css";
import { Analytics } from '@vercel/analytics/next'

export const viewport = {
  themeColor: "#111827",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
};

export const metadata = {
  metadataBase: new URL("https://intelliverse.io"),
  title: "The Intelliverse - Your Innovation Partner in Software & Web Development",
  description: "The Intelliverse is your innovation partner, offering expert software development, web development, and comprehensive IT services to empower your business in the digital age.",
  keywords: "The Intelliverse, software development, web development, IT services, custom software, mobile applications, tech solutions, innovation partner, Ahmedabad, Gujarat, software agency, web design, app development, professional software agency, best tech services",
  authors: [{ name: "The Intelliverse", url: "https://intelliverse.io" }],
  creator: "The Intelliverse Team",
  publisher: "The Intelliverse",
  applicationName: "The Intelliverse",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "en-IN": "/en-IN",
    },
    types: {
      "application/rss+xml": "https://intelliverse.io/feed.xml",
    },
  },
  manifest: "/manifest.json",
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
  icons: {
    icon: [
      { url: "/the intelliverse logo.jpg", type: "image/jpeg" },
    ],
    shortcut: "/the intelliverse logo.jpg",
    apple: [
      { url: "/the intelliverse logo.jpg", sizes: "180x180", type: "image/jpeg" },
      { url: "/the intelliverse logo.jpg", sizes: "167x167", type: "image/jpeg" },
      { url: "/the intelliverse logo.jpg", sizes: "152x152", type: "image/jpeg" },
      { url: "/the intelliverse logo.jpg", sizes: "144x144", type: "image/jpeg" },
      { url: "/the intelliverse logo.jpg", sizes: "120x120", type: "image/jpeg" },
      { url: "/the intelliverse logo.jpg", sizes: "114x114", type: "image/jpeg" },
      { url: "/the intelliverse logo.jpg", sizes: "76x76", type: "image/jpeg" },
      { url: "/the intelliverse logo.jpg", sizes: "72x72", type: "image/jpeg" },
      { url: "/the intelliverse logo.jpg", sizes: "60x60", type: "image/jpeg" },
      { url: "/the intelliverse logo.jpg", sizes: "57x57", type: "image/jpeg" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/the intelliverse logo.jpg",
        color: "#111827",
      },
    ],
  },
  verification: {
    google: "V9ShBblTx27Z4kLyDmhiU4PPANzjWD_j1O76UrDD40I",
    yandex: "yandex_verification_placeholder",
    yahoo: "yahoo_verification_placeholder",
    other: {
      me: ["theintelliverse@gmail.com"],
    },
  },
  appleWebApp: {
    capable: true,
    title: "The Intelliverse",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    siteName: "The Intelliverse",
    url: "https://intelliverse.io/",
    title: "The Intelliverse - Your Innovation Partner in Software & Web Development",
    description: "Expert software development, web development, and IT services to empower your business in the digital age.",
    images: [
      {
        url: "https://raw.githubusercontent.com/DhruvilThummar/The-Intelliverse/06e4998906bcd13f5d1dd0bdf0ff672bddf85832/the%20intelliverse%20logo.jpg",
        secureUrl: "https://raw.githubusercontent.com/DhruvilThummar/The-Intelliverse/06e4998906bcd13f5d1dd0bdf0ff672bddf85832/the%20intelliverse%20logo.jpg",
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: "The Intelliverse Logo - Your Software & Web Development Partner",
      }
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Intelliverse | Software & Web Development Partner",
    description: "Expert software development, web development, and IT services to empower your business.",
    images: ["https://raw.githubusercontent.com/DhruvilThummar/The-Intelliverse/06e4998906bcd13f5d1dd0bdf0ff672bddf85832/the%20intelliverse%20logo.jpg"],
    site: "@theintelliverse",
    creator: "@theintelliverse",
  },
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Ahmedabad",
    "geo.position": "23.0225;72.5714",
    "ICBM": "23.0225, 72.5714",
    "DC.title": "The Intelliverse - Your Innovation Partner",
    "DC.creator": "The Intelliverse",
    "DC.description": "The Intelliverse offers expert software development, web development, and IT services.",
    "DC.language": "en",
    "DC.rights": "Copyright 2025 The Intelliverse",
    "mobile-web-app-capable": "yes",
    "yandex": "index, follow",
    "baiduspider": "index, follow",
    "duckduckbot": "index, follow",
    "googlebot": "index, follow, max-snippet:-1",
    "bingbot": "index, follow, max-snippet:-1",
    "whatsapp:image": "https://raw.githubusercontent.com/DhruvilThummar/The-Intelliverse/06e4998906bcd13f5d1dd0bdf0ff672bddf85832/the%20intelliverse%20logo.jpg",
    "whatsapp:link_title": "The Intelliverse - Your Innovation Partner in Software & Web Development",
    "whatsapp:card": "summary_large_image",
    "pinterest:url": "https://intelliverse.io/",
    "instagram:author": "the_intelliverse",
    "linkedin:url": "https://intelliverse.io/",
    "linkedin:title": "The Intelliverse - Your Innovation Partner",
    "language": "English",
    "msapplication-TileColor": "#111827",
    "msapplication-TileImage": "/the intelliverse logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
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
                  "name": "Dhruvil Thummar"
                },
                {
                  "@type": "Person",
                  "name": "Rudra Patel"
                },
                {
                  "@type": "Person",
                  "name": "Jal Patel"
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

