import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";

const config = seoConfig.servicesSoftware;

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

export default function SoftwareEngineeringPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}${config.canonicalPath}/#service`,
    name: "Custom Software Development & SaaS Engineering",
    serviceType: "CustomSoftwareDevelopment",
    description: config.description,
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: ["Ahmedabad", "Gujarat", "India", "Worldwide"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Engineering Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Multi-Tenant SaaS Product Engineering",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Enterprise Workflow Automation Systems",
          },
        },
      ],
    },
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
      <JsonLd schema={[serviceSchema, faqSchema]} />
      <InnerPageHeader />

      <main id="main-content" data-theme="cream" className="min-h-screen" style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}>
        <Breadcrumbs items={[{ name: "Services", url: "/#services" }, { name: "Custom Software Engineering", url: config.canonicalPath }]} />

        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 container-site" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="space-y-6">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
              style={{
                backgroundColor: "rgba(47, 99, 224, 0.12)",
                color: "var(--blue-deep)",
                borderColor: "rgba(47, 99, 224, 0.25)",
              }}
            >
              Engineering Pillar 02 · Custom Software
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight font-serif"
              style={{ color: "var(--ink)", lineHeight: 1.1 }}
            >
              {config.h1}
            </h1>

            {/* AEO Answer-First Block (40-60 words) */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--hairline)",
              }}
            >
              <p className="text-base sm:text-lg leading-relaxed font-sans" style={{ color: "var(--ink)" }}>
                <strong>Direct Summary: </strong>
                {config.heroAnswer}
              </p>
              <p className="text-xs font-mono mt-3" style={{ color: "var(--muted)" }}>
                Updated October 2026 · Technical Consultation Led by Founders Dhruvil Thummar &amp; Jal Anghan
              </p>
            </div>
          </div>
        </section>

        {/* Scope and Architecture */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-3" style={{ color: "var(--ink)" }}>
                What makes our SaaS and custom software engineering different?
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                Most outsourced software fails not because of visual design, but because of poor data modeling, unindexed queries, and tight coupling. At The Intelliverse, we engineer software from the database schema upwards. We isolate tenant data, enforce atomic database transactions, design idempotent background jobs, and implement zero-trust authentication mechanisms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <h3 className="text-base font-bold font-mono uppercase text-[var(--blue-deep)] mb-2">
                  01 / Multi-Tenant Isolation
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Strict logical or physical tenant boundary enforcement. Row-level security (RLS) and schema-per-tenant patterns to prevent data leakage across commercial clients.
                </p>
              </div>

              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <h3 className="text-base font-bold font-mono uppercase text-[var(--orange)] mb-2">
                  02 / Distributed Job Queues
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Offload heavy reporting, PDF generation, notification delivery, and data syncing to Redis-backed BullMQ or Celery workers without blocking web server request threads.
                </p>
              </div>

              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <h3 className="text-base font-bold font-mono uppercase text-[var(--blue-deep)] mb-2">
                  03 / Auditable Security &amp; RBAC
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Role-based access control, cryptographic password hashing, JWT/session invalidation mechanisms, and comprehensive immutable audit logging for enterprise compliance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables & Indicative Pricing */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
              Deliverables &amp; Indicative Pricing Ranges
            </h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              We provide transparent fixed-sprint pricing. All projects include full Intellectual Property (IP) ownership assignment, source code repository transfer, and 30 days of post-deployment hypercare support.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono font-bold text-[var(--muted)]">Tier A</span>
                <h4 className="text-lg font-bold font-sans mt-1">MVP &amp; Core Portal</h4>
                <p className="text-xs text-[var(--muted)] mt-2">Single-purpose internal tool, booking system, or prototype for user validation.</p>
                <div className="mt-4 pt-3 border-t font-mono text-sm font-bold text-[var(--blue-deep)]">
                  Indicative: ₹45,000 – ₹1.5L
                </div>
                <div className="text-[10px] text-[var(--muted)] font-mono mt-1">Timeline: 3–6 Weeks</div>
              </div>

              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono font-bold text-[var(--blue-deep)]">Tier B · Recommended</span>
                <h4 className="text-lg font-bold font-sans mt-1">Full SaaS Platform</h4>
                <p className="text-xs text-[var(--muted)] mt-2">Multi-tenant architecture, billing integration, analytics dashboard, RBAC permissions.</p>
                <div className="mt-4 pt-3 border-t font-mono text-sm font-bold text-[var(--blue-deep)]">
                  Indicative: ₹1.5L – ₹4.5L
                </div>
                <div className="text-[10px] text-[var(--muted)] font-mono mt-1">Timeline: 8–12 Weeks</div>
              </div>

              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono font-bold text-[var(--orange)]">Tier C</span>
                <h4 className="text-lg font-bold font-sans mt-1">Enterprise System</h4>
                <p className="text-xs text-[var(--muted)] mt-2">High-throughput microservices, legacy data migration, custom compliance integrations.</p>
                <div className="mt-4 pt-3 border-t font-mono text-sm font-bold text-[var(--blue-deep)]">
                  Indicative: ₹4.5L – ₹8L+
                </div>
                <div className="text-[10px] text-[var(--muted)] font-mono mt-1">Timeline: 12–20 Weeks</div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links & Case Study Teaser */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl font-serif" style={{ color: "var(--ink)" }}>
              Explore Related Work &amp; Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/work/appointory" className="p-5 rounded-xl border hover:border-[var(--blue-deep)] transition" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <span className="text-xs font-mono text-[var(--blue-deep)]">Live Production System</span>
                <h4 className="font-bold text-sm mt-1">Appointory Clinic SaaS</h4>
                <p className="text-xs text-[var(--muted)] mt-1">Read how real-time queues cut medical clinic waiting times by 40%.</p>
              </Link>
              <Link href="/blog/how-much-does-custom-software-cost-in-india" className="p-5 rounded-xl border hover:border-[var(--blue-deep)] transition" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <span className="text-xs font-mono text-[var(--orange)]">Pricing Guide</span>
                <h4 className="font-bold text-sm mt-1">Custom Software Cost in India</h4>
                <p className="text-xs text-[var(--muted)] mt-1">Detailed cost breakdown of developing software in India with verified data.</p>
              </Link>
              <Link href="/blog/web-app-vs-mobile-app-how-to-choose" className="p-5 rounded-xl border hover:border-[var(--blue-deep)] transition" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <span className="text-xs font-mono text-[var(--blue-deep)]">Decision Matrix</span>
                <h4 className="font-bold text-sm mt-1">Web App vs Mobile App</h4>
                <p className="text-xs text-[var(--muted)] mt-1">How founders choose between PWA, responsive web, and native mobile apps.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
              Frequently Asked Questions About Software Engineering
            </h2>
            <div className="space-y-4">
              {(config.faqs || []).map((faq, idx) => (
                <div key={idx} className="p-5 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
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
        <section className="py-16 px-4 sm:px-6 text-center border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif">Have a software specification or RFC ready?</h2>
            <p className="text-sm text-[var(--muted)]">Send us your architecture brief or schedule a scoping call with our lead engineers in Ahmedabad.</p>
            <div className="pt-2">
              <Link
                href="/#contact"
                data-cursor="link"
                data-cursor-magnetic
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold font-mono transition"
                style={{ backgroundColor: "var(--blue-deep)", color: "var(--cream)" }}
              >
                <span>Submit Technical Scope</span>
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
