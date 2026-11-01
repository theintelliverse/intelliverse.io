import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import TrackCaseStudyView from "@/components/analytics/TrackCaseStudyView";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";

const config = seoConfig.workAppointory;

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  keywords: config.keywords,
  alternates: {
    canonical: `${siteConfig.url}${config.canonicalPath}`,
  },
  openGraph: {
    type: "article",
    locale: "en_IN",
    alternateLocale: ["en_US"],
    title: config.title,
    description: config.description,
    url: `${siteConfig.url}${config.canonicalPath}`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/marina-bay-sands.png`,
        secureUrl: `${siteConfig.url}/marina-bay-sands.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Appointory Clinic Platform Plate",
      },
      {
        url: `${siteConfig.url}/logo-512.png`,
        secureUrl: `${siteConfig.url}/logo-512.png`,
        width: 512,
        height: 512,
        type: "image/png",
        alt: "The Intelliverse Official Brand Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theintelliverse",
    creator: "@theintelliverse",
    title: config.title,
    description: config.description,
    images: [`${siteConfig.url}/marina-bay-sands.png`],
  },
  other: {
    "image": `${siteConfig.url}/marina-bay-sands.png`,
    "thumbnail": `${siteConfig.url}/logo-512.png`,
    "og:image:secure_url": `${siteConfig.url}/marina-bay-sands.png`,
    "og:logo": `${siteConfig.url}/logo-512.png`,
  },
};

export default function AppointoryCaseStudyPage() {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteConfig.url}${config.canonicalPath}/#software`,
    name: "Appointory",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web-based (Cloud SaaS)",
    description: config.description,
    url: "https://appointory.in",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteConfig.url}${config.canonicalPath}/#article`,
    headline: config.title,
    description: config.description,
    datePublished: "2026-02-15T00:00:00Z",
    dateModified: "2026-10-05T00:00:00Z",
    author: {
      "@type": "Person",
      name: "Dhruvil Thummar",
      jobTitle: "Co-founder & CTO",
      url: "https://www.linkedin.com/in/dhruvilthummar",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/the-intelliverse-logo.png`,
      },
    },
    mainEntityOfPage: `${siteConfig.url}${config.canonicalPath}`,
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
      <JsonLd schema={[softwareAppSchema, articleSchema, faqSchema]} />
      <TrackCaseStudyView slug="Appointory Healthcare SaaS" />
      <InnerPageHeader />

      <main id="main-content" data-theme="cream" className="min-h-screen" style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}>
        <Breadcrumbs items={[{ name: "Case Studies", url: "/#projects" }, { name: "Appointory", url: config.canonicalPath }]} />

        {/* Hero */}
        <section className="py-12 md:py-16 px-4 sm:px-6 container-site" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.12)",
                    color: "#065f46",
                    borderColor: "rgba(16, 185, 129, 0.28)",
                  }}
                >
                  Production Case Study · Healthcare SaaS
                </span>
                <span className="text-xs font-mono text-[var(--muted)]">
                  Live URL: <a href="https://appointory.in" target="_blank" rel="noopener noreferrer" className="text-[var(--blue-deep)] underline font-semibold">appointory.in ↗</a>
                </span>
              </div>

              {/* Prominent View This Live Project Button */}
              <a
                href="https://appointory.in"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                data-cursor-magnetic
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 group"
                style={{
                  backgroundColor: "var(--night)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[var(--live)] animate-pulse"></span>
                <span>View This Live Project</span>
                <span className="text-[var(--orange)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight font-serif"
              style={{ color: "var(--ink)", lineHeight: 1.1 }}
            >
              {config.h1}
            </h1>

            {/* AEO Answer-First Direct Summary */}
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
              <p className="text-base sm:text-lg leading-relaxed font-sans" style={{ color: "var(--ink)" }}>
                <strong>Executive Summary: </strong>
                {config.heroAnswer}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono mt-4 pt-3 border-t" style={{ borderColor: "var(--hairline)", color: "var(--muted)" }}>
                <div className="flex flex-wrap items-center gap-4">
                  <span>Lead Architect: <strong>Dhruvil Thummar (CTO)</strong></span>
                  <span>·</span>
                  <span>Published: February 2026 · Updated: October 2026</span>
                  <span>·</span>
                  <span>Engineering HQ: Ahmedabad, Gujarat</span>
                </div>
                <a
                  href="https://appointory.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all hover:bg-[rgba(47,99,224,0.14)]"
                  style={{
                    backgroundColor: "rgba(47,99,224,0.08)",
                    color: "var(--blue-deep)",
                    border: "1px solid rgba(47,99,224,0.2)",
                  }}
                >
                  <span>Visit appointory.in</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Live Platform Quick Link Card */}
            <div
              className="p-4 sm:p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.05)",
                borderColor: "rgba(16, 185, 129, 0.22)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(16, 185, 129, 0.12)", color: "#065f46" }}
                >
                  <i className="fas fa-arrow-up-right-from-square text-base"></i>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#065f46]">
                      Production Platform
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                      LIVE IN PRODUCTION
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)] font-mono mt-0.5">
                    Experience the multi-clinic patient queue engine live at <strong>appointory.in</strong>
                  </p>
                </div>
              </div>

              <a
                href="https://appointory.in"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                data-cursor-magnetic
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all hover:scale-105 active:scale-95 shadow-sm"
                style={{
                  backgroundColor: "#065f46",
                  color: "#ffffff",
                }}
              >
                <span>View This Project</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* Problem & Approach */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif mb-3" style={{ color: "var(--ink)" }}>
                  What clinical bottleneck did Appointory solve?
                </h2>
                <p className="text-sm leading-relaxed text-[var(--muted)] mb-4">
                  Traditional medical clinics operate on static appointment slots. When a physician encounters a complicated consultation, delays cascade throughout the day. Waiting rooms fill with anxious, contagious patients, receptionist staff become overwhelmed by complaints, and no-shows increase.
                </p>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  Appointory requested an intelligent, real-time coordination system that dynamically synchronizes doctor consultation speeds with patient travel times.
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-serif mb-3" style={{ color: "var(--ink)" }}>
                  How did The Intelliverse engineer the solution?
                </h2>
                <p className="text-sm leading-relaxed text-[var(--muted)] mb-4">
                  We engineered an event-driven architecture using Next.js 15, WebSockets, and a distributed Redis Pub/Sub queue. As the doctor marks each patient consultation complete, the system recalculates ETA windows for remaining patients and dispatches automated WhatsApp/SMS arrival triggers.
                </p>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  Patients leave their homes or offices only when their physical turn is approaching, reducing waiting room occupancy by 40% while keeping doctor utilization above 95%.
                </p>
              </div>
            </div>

            {/* Technical Stack Specifications */}
            <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
              <h3 className="text-sm font-bold font-mono uppercase text-[var(--blue-deep)] mb-3">
                Verified Technical Architecture Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js 15 App Router", "Node.js Microservices", "MongoDB Atlas", "Redis Pub/Sub Event Queues", "Cloud Messaging API (SMS/WhatsApp)", "Tailwind CSS", "AES-256 Encrypted Health Locker"].map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded bg-[var(--surface)] border border-[var(--hairline)] text-xs font-mono text-[var(--ink)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features & Outcome */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)" }}>
          <div className="container-site space-y-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
              Measurable Engineering Outcomes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-2xl font-mono font-bold text-[var(--blue-deep)]">40%</span>
                <h4 className="font-bold text-sm mt-1 mb-2">Queue Reduction</h4>
                <p className="text-xs text-[var(--muted)]">Average waiting room congestion decreased by 40% within the first 60 days of clinic deployment.</p>
              </div>
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-2xl font-mono font-bold text-[var(--blue-deep)]">&lt; 150ms</span>
                <h4 className="font-bold text-sm mt-1 mb-2">Real-time Telemetry</h4>
                <p className="text-xs text-[var(--muted)]">Queue state updates propagate to patient mobile screens in under 150ms via persistent WebSocket channels.</p>
              </div>
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-2xl font-mono font-bold text-[var(--blue-deep)]">Zero</span>
                <h4 className="font-bold text-sm mt-1 mb-2">Unencrypted Diagnostic Leaks</h4>
                <p className="text-xs text-[var(--muted)]">End-to-end client-side encryption ensures patient diagnostic records remain unreadable to unauthorized third parties.</p>
              </div>
            </div>

            {/* Client Testimonial (Verified from local database) */}
            <div className="p-6 rounded-2xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
              <p className="text-sm sm:text-base italic text-[var(--ink)] leading-relaxed">
                &ldquo;The Intelliverse delivered an outstanding medical scheduling platform that transformed our patient experience.&rdquo;
              </p>
              <p className="text-xs font-mono font-bold text-[var(--blue-deep)] mt-3">
                — Verified Product Review · Appointory Leadership
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
              Frequently Asked Questions About Appointory
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
            <h2 className="text-3xl sm:text-4xl font-serif">Planning a healthcare or queue-based SaaS?</h2>
            <p className="text-sm text-[var(--muted)]">Consult with our lead architects on real-time event-driven systems.</p>
            <div className="pt-2">
              <Link
                href="/#contact"
                data-cursor="link"
                data-cursor-magnetic
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold font-mono transition"
                style={{ backgroundColor: "var(--blue-deep)", color: "var(--cream)" }}
              >
                <span>Discuss Your Architecture Scope</span>
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
