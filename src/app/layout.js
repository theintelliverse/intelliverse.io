import "./globals.css";
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  title: "The Intelliverse - Your Innovation Partner in Software & Web Development",
  description: "The Intelliverse is your innovation partner, offering expert software development, web development, and comprehensive IT services to empower your business in the digital age.",
  keywords: "The Intelliverse, software development, web development, IT services, custom software, mobile applications, tech solutions, innovation partner, Ahmedabad, Gujarat",
  authors: [{ name: "The Intelliverse" }],
  alternates: {
    canonical: "https://dhruvilthummar.github.io/The-Intelliverse/",
  },
  robots: "index, follow",
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Ahmedabad",
    "geo.position": "23.0225;72.5714",
    "ICBM": "23.0225, 72.5714",
    "DC.title": "The Intelliverse - Your Innovation Partner",
    "DC.creator": "The Intelliverse",
    "DC.description": "The Intelliverse offers expert software development, web development, and IT services.",
    "DC.language": "en",
    "DC.rights": "Copyright 2024 The Intelliverse",
  },
  openGraph: {
    type: "website",
    siteName: "The Intelliverse",
    url: "https://dhruvilthummar.github.io/The-Intelliverse/",
    title: "The Intelliverse - Your Innovation Partner",
    description: "Expert software development, web development, and IT services to empower your business.",
    images: [
      {
        url: "https://raw.githubusercontent.com/DhruvilThummar/The-Intelliverse/06e4998906bcd13f5d1dd0bdf0ff672bddf85832/the%20intelliverse%20logo.jpg",
        type: "image/jpeg",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Intelliverse - Your Innovation Partner",
    description: "Expert software development, web development, and IT services to empower your business.",
    images: ["https://raw.githubusercontent.com/DhruvilThummar/The-Intelliverse/06e4998906bcd13f5d1dd0bdf0ff672bddf85832/the%20intelliverse%20logo.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#111827" />
        <link rel="icon" href="/the%20intelliverse%20logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/the%20intelliverse%20logo.jpg" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "The Intelliverse",
              "url": "https://dhruvilthummar.github.io/The-Intelliverse/",
              "logo": "https://raw.githubusercontent.com/DhruvilThummar/The-Intelliverse/06e4998906bcd13f5d1dd0bdf0ff672bddf85832/the%20intelliverse%20logo.jpg",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "theintelliverse@gmail.com",
                "contactType": "Customer Service"
              },
              "sameAs": [
                "https://www.linkedin.com/company/the-intelliverse/",
                "https://www.instagram.com/the_intelliverse/"
              ],
              "description": "A dynamic software development company dedicated to providing innovative solutions in web development, mobile applications, and comprehensive IT services.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ahmedabad",
                "addressRegion": "Gujarat",
                "addressCountry": "IN"
              },
              "knowsAbout": ["Software Development", "Web Development", "IT Services", "Mobile Applications"]
            })
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
