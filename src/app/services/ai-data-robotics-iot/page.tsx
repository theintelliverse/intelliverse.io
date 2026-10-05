import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";

const config = seoConfig.servicesAI;

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

export default function AIDataRoboticsPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}${config.canonicalPath}/#service`,
    name: "Applied AI, Data & Automation Workflows",
    serviceType: "ArtificialIntelligenceServices",
    description: config.description,
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: ["Ahmedabad", "Gujarat", "India", "Worldwide"],
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
        <Breadcrumbs items={[{ name: "Services", url: "/#services" }, { name: "Applied AI & Automation", url: config.canonicalPath }]} />

        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 container-site" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="space-y-6">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
              style={{
                backgroundColor: "rgba(155, 114, 216, 0.12)",
                color: "#6b21a8",
                borderColor: "rgba(155, 114, 216, 0.25)",
              }}
            >
              Engineering Pillar 04 · Applied AI Workflows
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
                Updated October 2026 · AI Systems Engineering Group based in Ahmedabad, Gujarat
              </p>
            </div>
          </div>
        </section>

        {/* Real-World Systems */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-3" style={{ color: "var(--ink)" }}>
                How do we deploy applied AI into production software?
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                We avoid speculative AI hype. Every AI integration we build connects directly into your existing business software stack: pulling data from your SQL database, validating actions through human-in-the-loop workflows, and logging every model inference for latency and cost tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <h3 className="text-base font-bold font-mono uppercase text-[var(--blue-deep)] mb-2">
                  01 / Enterprise RAG Workflows
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Hybrid dense-sparse vector search (pgvector, Pinecone) connecting internal documentation, product catalogs, and PDFs directly to LLMs with strict source citation.
                </p>
              </div>

              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <h3 className="text-base font-bold font-mono uppercase text-[var(--orange)] mb-2">
                  02 / Autonomous Triage Agents
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Function-calling agents that parse incoming support emails, classify intent, verify user identities, and trigger automated webhook mutations safely.
                </p>
              </div>

              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <h3 className="text-base font-bold font-mono uppercase text-[var(--blue-deep)] mb-2">
                  03 / Real-Time Telemetry
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Token budget throttling, semantic caching with Redis to cut LLM inference costs by 30-50%, and comprehensive tracing for model accuracy drift.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Scoping */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
              AI Integration Timelines &amp; Indicative Pricing
            </h2>
            <div className="p-5 rounded-xl border bg-purple-500/10 border-purple-500/20 text-xs font-mono">
              <strong>Indicative Project Ranges: </strong>
              Private Internal RAG Search Assistant: ₹40,000 – ₹1.2L (Timeline: 3–5 weeks). Custom Multi-Agent Automation Pipeline with CRM / ERP Integration: ₹1.2L – ₹2.5L+ (Timeline: 6–10 weeks). All ranges are indicative and scoped transparently with fixed milestone deliveries.
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
              Frequently Asked Questions About AI Workflows
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
            <h2 className="text-3xl sm:text-4xl font-serif">Have an operational workflow you want to automate?</h2>
            <p className="text-sm text-[var(--muted)]">Explore pragmatic AI implementations with our engineering team in Ahmedabad.</p>
            <div className="pt-2">
              <Link
                href="/#contact"
                data-cursor="link"
                data-cursor-magnetic
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold font-mono transition"
                style={{ backgroundColor: "var(--blue-deep)", color: "var(--cream)" }}
              >
                <span>Schedule AI Scoping Session</span>
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
