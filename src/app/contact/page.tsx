import { Metadata } from "next";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import Contact from "@/components/sections/Contact";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Our Engineering Team | The Intelliverse, Ahmedabad",
  description:
    "Connect directly with the founding engineers at The Intelliverse in Ahmedabad, Gujarat, India. Discuss custom SaaS platforms, Next.js web applications, or cloud architecture.",
  keywords: [
    "Contact The Intelliverse",
    "hire software developers Ahmedabad",
    "The Intelliverse Ahmedabad address",
    "software company Ahmedabad contact",
    "Dhruvil Thummar contact",
  ],
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: "Contact Our Engineering Team | The Intelliverse, Ahmedabad",
    description:
      "Connect directly with the founding engineers at The Intelliverse in Ahmedabad, Gujarat, India. Discuss custom SaaS platforms, Next.js web applications, or cloud architecture.",
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Our Engineering Team | The Intelliverse, Ahmedabad",
    description:
      "Connect directly with the founding engineers at The Intelliverse in Ahmedabad, Gujarat, India. Discuss custom SaaS platforms, Next.js web applications, or cloud architecture.",
    images: ["/opengraph-image"],
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteConfig.url}/contact/#webpage`,
    name: "Contact The Intelliverse",
    description:
      "Contact information for The Intelliverse: software development and IT services company based in Ahmedabad, Gujarat, India.",
    mainEntity: {
      "@id": siteConfig.organizationId,
    },
  };

  return (
    <>
      <JsonLd schema={contactSchema} />
      <InnerPageHeader />

      <main id="main-content" data-theme="cream" className="min-h-screen" style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}>
        <Breadcrumbs items={[{ name: "Contact", url: "/contact" }]} />

        {/* Header & NAP Context */}
        <section className="py-12 md:py-16 px-4 sm:px-6 container-site" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="space-y-6">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
              style={{
                backgroundColor: "rgba(47, 99, 224, 0.12)",
                color: "var(--blue-deep)",
                borderColor: "rgba(47, 99, 224, 0.25)",
              }}
            >
              Direct Technical Line · Ahmedabad Studio
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight font-serif"
              style={{ color: "var(--ink)", lineHeight: 1.1 }}
            >
              Initiate a Technical Conversation.
            </h1>

            {/* Answer-First NAP Summary */}
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
              <p className="text-base sm:text-lg leading-relaxed font-sans" style={{ color: "var(--ink)" }}>
                <strong>Direct Contact: </strong>
                The Intelliverse is located in Ahmedabad, Gujarat, India. To discuss architecture roadmaps, project scoping, or code refactoring, write directly to our founding team at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-bold underline text-[var(--blue-deep)]"
                >
                  {siteConfig.email}
                </a>{" "}
                or submit the brief below. You will hear back directly from our technical founders within 24 business hours.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t font-mono text-xs" style={{ borderColor: "var(--hairline)" }}>
                <div>
                  <span className="text-[var(--muted)] uppercase tracking-wider block mb-1">Entity Name</span>
                  <strong className="text-[var(--ink)]">{siteConfig.name}</strong>
                </div>
                <div>
                  <span className="text-[var(--muted)] uppercase tracking-wider block mb-1">Headquarters</span>
                  <strong className="text-[var(--ink)]">
                    {siteConfig.address.locality}, {siteConfig.address.region} {siteConfig.address.postalCode}, India
                  </strong>
                </div>
                <div>
                  <span className="text-[var(--muted)] uppercase tracking-wider block mb-1">Coordinates</span>
                  <strong className="text-[var(--ink)]">
                    {siteConfig.coordinates.latitude}° N, {siteConfig.coordinates.longitude}° E
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Contact Component */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}
