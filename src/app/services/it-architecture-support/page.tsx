import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";

const config = seoConfig.servicesIT;

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

export default function ITArchitectureSupportPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}${config.canonicalPath}/#service`,
    name: "IT Services & Cloud Architecture Support",
    serviceType: "ITConsulting",
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
        <Breadcrumbs items={[{ name: "Services", url: "/#services" }, { name: "IT Services & Cloud Architecture", url: config.canonicalPath }]} />

        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 container-site" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="space-y-6">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.12)",
                color: "#065f46",
                borderColor: "rgba(16, 185, 129, 0.25)",
              }}
            >
              Engineering Pillar 03 · IT Infrastructure
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
                Updated October 2026 · DevOps Infrastructure Team at Ahmedabad Headquarters
              </p>
            </div>
          </div>
        </section>

        {/* Overview & Core Disciplines */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-3" style={{ color: "var(--ink)" }}>
                What are our enterprise IT and cloud architecture services?
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                We provide end-to-end cloud consulting, infrastructure migration, container orchestration, and continuous DevOps support for fast-growing companies in Ahmedabad and international clients. Our goal is to transform cloud spending from an unpredictable overhead into a resilient, automated utility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <h3 className="text-base font-bold font-mono uppercase text-[var(--blue-deep)] mb-2">
                  Cloud Migration &amp; Setup
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Migrate monolithic on-premise servers to AWS or GCP with minimal downtime. VPC subnet segregation, IAM least-privilege policies, and TLS certificate automation.
                </p>
              </div>

              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <h3 className="text-base font-bold font-mono uppercase text-[var(--orange)] mb-2">
                  Docker &amp; Kubernetes
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Containerize applications for reproducible environments across local development and production. Auto-scaling ECS or EKS clusters with health monitoring.
                </p>
              </div>

              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <h3 className="text-base font-bold font-mono uppercase text-[var(--blue-deep)] mb-2">
                  CI/CD &amp; Automated Testing
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  GitHub Actions and GitLab CI pipelines that run linting, static security analysis, unit testing, and blue/green deployments automatically on git push.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disaster Recovery & SLA */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
              Backup Automation, Security Hardening &amp; RTO/RPO Metrics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <h4 className="font-bold text-base mb-2">Point-In-Time Database Recovery (PITR)</h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Continuous write-ahead logging (WAL) archiving allows databases to be restored to any given second in the previous 35 days, protecting against human error and ransomware attacks.
                </p>
              </div>
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <h4 className="font-bold text-base mb-2">Infrastructure-as-Code (Terraform)</h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Your entire network topology, security groups, database instances, and edge routes are codified in version-controlled Terraform modules, enabling total disaster rebuilds in under 20 minutes.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl border bg-blue-500/10 border-blue-500/20 text-xs font-mono">
              <strong>Indicative Retainer Ranges: </strong>
              Cloud Architecture Audit &amp; Hardening: ₹25,000 – ₹60,000. Ongoing 24/7 DevOps &amp; Site Reliability Retainer: ₹30,000 – ₹1.2L / month depending on infrastructure scale. All ranges are indicative and scoped transparently.
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
              Frequently Asked Questions About IT Services
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
            <h2 className="text-3xl sm:text-4xl font-serif">Need your cloud infrastructure audited or automated?</h2>
            <p className="text-sm text-[var(--muted)]">Speak directly with our cloud architecture specialists in Ahmedabad.</p>
            <div className="pt-2">
              <Link
                href="/#contact"
                data-cursor="link"
                data-cursor-magnetic
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold font-mono transition"
                style={{ backgroundColor: "var(--blue-deep)", color: "var(--cream)" }}
              >
                <span>Request Cloud Architecture Audit</span>
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
