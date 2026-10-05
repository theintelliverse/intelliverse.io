import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";

const config = seoConfig.locationAhmedabad;

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  keywords: config.keywords,
  alternates: {
    canonical: `${siteConfig.url}${config.canonicalPath}`,
  },
  openGraph: {
    title: config.title,
    description: config.description,
    url: `${siteConfig.url}${config.canonicalPath}`,
    siteName: siteConfig.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description,
    images: ["/opengraph-image"],
  },
};

export default function SoftwareDevelopmentCompanyAhmedabadPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}${config.canonicalPath}/#localbusiness`,
    name: "The Intelliverse — Software Development Company in Ahmedabad",
    description: config.description,
    url: `${siteConfig.url}${config.canonicalPath}`,
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
    areaServed: [
      { "@type": "City", name: "Ahmedabad" },
      { "@type": "AdministrativeArea", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
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
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (config.faqs || []).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd schema={[localBusinessSchema, faqSchema]} />
      <InnerPageHeader />

      <main id="main-content" data-theme="cream" className="min-h-screen" style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}>
        <Breadcrumbs items={[{ name: "Ahmedabad Studio", url: config.canonicalPath }]} />

        {/* Hero */}
        <section className="py-12 md:py-20 px-4 sm:px-6 container-site" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="space-y-6">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
              style={{
                backgroundColor: "rgba(253, 179, 71, 0.15)",
                color: "#b45309",
                borderColor: "rgba(253, 179, 71, 0.35)",
              }}
            >
              Headquarters · Ahmedabad, Gujarat, India (23.0225° N, 72.5714° E)
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight font-serif"
              style={{ color: "var(--ink)", lineHeight: 1.1 }}
            >
              {config.h1}
            </h1>

            {/* AEO Answer-First Summary Block */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--hairline)",
              }}
            >
              <p className="text-base sm:text-lg leading-relaxed font-sans" style={{ color: "var(--ink)" }}>
                <strong>Direct Answer: </strong>
                {config.heroAnswer}
              </p>
              <p className="text-xs font-mono mt-3" style={{ color: "var(--muted)" }}>
                Updated October 2026 · Official Headquarters: Ahmedabad, Gujarat 380009
              </p>
            </div>
          </div>
        </section>

        {/* Genuine Local Context & Industries */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-3" style={{ color: "var(--ink)" }}>
                Why choose an Ahmedabad-based engineering studio?
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                Ahmedabad has emerged as India&apos;s leading Western innovation hub, with top engineering institutes and a thriving entrepreneurial business ecosystem. Unlike traditional IT agencies that juggle hundreds of low-cost projects with rotating junior interns, The Intelliverse operates with a tight-knit core of senior architects. You communicate directly with our technical founders, ensuring zero translation loss between business requirements and production software.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <h3 className="text-base font-bold font-mono uppercase text-[var(--blue-deep)] mb-3">
                  Local Ahmedabad &amp; Gujarat Industries We Empower
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-[var(--muted)]">
                  <li>
                    <strong className="text-[var(--ink)]">Healthcare Clinics &amp; Diagnostic Networks: </strong>
                    Specialized queue synchronization, patient appointment portals, and HIPAA-compliant health lockers (like our live case study, Appointory).
                  </li>
                  <li>
                    <strong className="text-[var(--ink)]">Luxury Gems, Diamond &amp; Jewellery Exporters: </strong>
                    Ultra-fast headless e-commerce platforms engineered with multi-currency dynamic checkout for international buyers in the US, UAE, and UK (like Vrix Jewellery).
                  </li>
                  <li>
                    <strong className="text-[var(--ink)]">Pharmaceutical &amp; Chemical Manufacturers: </strong>
                    Batch tracking databases, quality assurance workflows, and automated ERP data pipelines.
                  </li>
                  <li>
                    <strong className="text-[var(--ink)]">B2B SaaS &amp; Digital Commerce Startups: </strong>
                    Full-cycle MVP to scale-up architecture with Next.js 15, PostgreSQL, and AWS.
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <h3 className="text-base font-bold font-mono uppercase text-[var(--orange)] mb-3">
                  How We Collaborate Locally &amp; Globally
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-[var(--muted)]">
                  <li>
                    <strong className="text-[var(--ink)]">In-Person Technical Discovery in Ahmedabad: </strong>
                    Meet with CTO Dhruvil Thummar and our architects for whiteboard planning, requirements mapping, and technical roadmaps.
                  </li>
                  <li>
                    <strong className="text-[var(--ink)]">Direct Founder Communication: </strong>
                    Direct communication with technical founders on dedicated Slack or WhatsApp channels. No non-technical account managers in between.
                  </li>
                  <li>
                    <strong className="text-[var(--ink)]">Fortnightly Sprint Deployments: </strong>
                    Continuous delivery with live staging previews every 2 weeks so you can test features before they hit production.
                  </li>
                  <li>
                    <strong className="text-[var(--ink)]">100% Code Ownership: </strong>
                    Full copyright and source code assignment transferred immediately upon project completion.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Core Services Summary Grid */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
              Core Technical Capabilities Provided in Ahmedabad
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/services/web-development" className="p-5 rounded-xl border hover:border-[var(--blue-deep)] transition" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono text-[var(--blue-deep)]">Pillar 01</span>
                <h4 className="font-bold text-sm mt-1 mb-1">Web Development</h4>
                <p className="text-xs text-[var(--muted)]">Next.js 15 App Router websites with sub-second page loads and mobile-first responsive architecture.</p>
              </Link>

              <Link href="/services/software-engineering" className="p-5 rounded-xl border hover:border-[var(--blue-deep)] transition" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono text-[var(--blue-deep)]">Pillar 02</span>
                <h4 className="font-bold text-sm mt-1 mb-1">Custom SaaS Software</h4>
                <p className="text-xs text-[var(--muted)]">Multi-tenant product engineering, scalable APIs, and role-based permissions.</p>
              </Link>

              <Link href="/services/it-architecture-support" className="p-5 rounded-xl border hover:border-[var(--blue-deep)] transition" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono text-[var(--blue-deep)]">Pillar 03</span>
                <h4 className="font-bold text-sm mt-1 mb-1">IT Services &amp; DevOps</h4>
                <p className="text-xs text-[var(--muted)]">AWS cloud migrations, Kubernetes clusters, Dockerized CI/CD, and 24/7 reliability monitoring.</p>
              </Link>

              <Link href="/services/ai-data-robotics-iot" className="p-5 rounded-xl border hover:border-[var(--blue-deep)] transition" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono text-[var(--blue-deep)]">Pillar 04</span>
                <h4 className="font-bold text-sm mt-1 mb-1">Applied AI Workflows</h4>
                <p className="text-xs text-[var(--muted)]">Enterprise RAG knowledge assistants and autonomous process automation.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
              Frequently Asked Questions About Software Development in Ahmedabad
            </h2>
            <div className="space-y-4">
              {(config.faqs || []).map((faq, idx) => (
                <div key={idx} className="p-5 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                  <h3 className="font-bold text-sm font-sans mb-2" style={{ color: "var(--ink)" }}>
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 text-center border-t" style={{ borderColor: "var(--hairline)" }}>
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif">Building software from Ahmedabad for the world?</h2>
            <p className="text-sm text-[var(--muted)]">Schedule an in-person or virtual consultation with our founding engineering team.</p>
            <div className="pt-2">
              <Link
                href="/#contact"
                data-cursor="link"
                data-cursor-magnetic
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold font-mono transition"
                style={{ backgroundColor: "var(--blue-deep)", color: "var(--cream)" }}
              >
                <span>Initiate Consultation</span>
                <i className="fas fa-arrow-right text-[10px]"></i>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
