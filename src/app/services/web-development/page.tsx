import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";
const config = seoConfig.servicesWeb;

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

export default function WebDevelopmentPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}${config.canonicalPath}/#service`,
    name: "Web Development & Next.js Architecture Services",
    serviceType: "WebDevelopment",
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
      name: "Web Development Offerings",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "High-Performance Next.js Web Applications",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Headless E-Commerce Storefronts",
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
        <Breadcrumbs items={[{ name: "Services", url: "/#services" }, { name: "Web Development", url: config.canonicalPath }]} />

        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 container-site" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="space-y-6">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
              style={{
                backgroundColor: "rgba(61, 123, 247, 0.12)",
                color: "var(--blue-deep)",
                borderColor: "rgba(61, 123, 247, 0.25)",
              }}
            >
              Engineering Pillar 01 · Web Systems
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
                Updated October 2026 · Reviewed by Technical Architecture Team at Ahmedabad HQ
              </p>
            </div>
          </div>
        </section>

        {/* What it is & Who it is for */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-3" style={{ color: "var(--ink)" }}>
                What is bespoke web architecture?
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                Bespoke web architecture replaces bloated website builders and fragile WordPress themes with cleanly decoupled Next.js systems. We engineer every page with server-side rendering (SSR), incremental static regeneration (ISR), and edge caching to ensure instant response times for customers across India and worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <h3 className="text-lg font-bold font-mono uppercase text-[var(--blue-deep)] mb-2">
                  Who It&apos;s For
                </h3>
                <ul className="space-y-2 text-sm text-[var(--muted)] list-disc pl-5">
                  <li>Startups needing a high-conversion digital flagship before raising seed or Series A capital.</li>
                  <li>E-commerce enterprises seeking sub-second checkout speeds and headless Shopify architectures.</li>
                  <li>Healthcare and B2B companies requiring role-based access control, HIPAA/GDPR alignment, and patient portals.</li>
                  <li>Established Ahmedabad companies expanding into overseas markets requiring multilingual localization.</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <h3 className="text-lg font-bold font-mono uppercase text-[var(--orange)] mb-2">
                  Key Technical Deliverables
                </h3>
                <ul className="space-y-2 text-sm text-[var(--muted)] list-disc pl-5">
                  <li>Next.js 15 App Router architecture with strict TypeScript type-safety.</li>
                  <li>Core Web Vitals scores guaranteed: LCP &lt; 2.5s, CLS &lt; 0.1, INP &lt; 200ms.</li>
                  <li>Automated JSON-LD schema generation and dynamic sitemap integration.</li>
                  <li>Zero-downtime CI/CD deployment pipelines on Vercel, AWS, or Cloudflare Pages.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process & Timeline */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)" }}>
          <div className="container-site space-y-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-3" style={{ color: "var(--ink)" }}>
                How does our web development process work?
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                We work in transparent 2-week agile sprints. You receive live staging preview links, daily async Slack/WhatsApp progress logs, and complete access to the Git repository from day one.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono font-bold text-[var(--blue-deep)]">Phase 01</span>
                <h4 className="font-bold text-sm mt-1 mb-2">Scoping &amp; IA</h4>
                <p className="text-xs text-[var(--muted)]">Information architecture, database schema design, and technical specification documentation.</p>
              </div>
              <div className="p-5 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono font-bold text-[var(--blue-deep)]">Phase 02</span>
                <h4 className="font-bold text-sm mt-1 mb-2">Design &amp; Tokens</h4>
                <p className="text-xs text-[var(--muted)]">Design token system, high-fidelity prototypes, and component library creation.</p>
              </div>
              <div className="p-5 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono font-bold text-[var(--blue-deep)]">Phase 03</span>
                <h4 className="font-bold text-sm mt-1 mb-2">Engineering</h4>
                <p className="text-xs text-[var(--muted)]">Next.js full-stack development, API integrations, and edge caching implementation.</p>
              </div>
              <div className="p-5 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono font-bold text-[var(--blue-deep)]">Phase 04</span>
                <h4 className="font-bold text-sm mt-1 mb-2">Audit &amp; Launch</h4>
                <p className="text-xs text-[var(--muted)]">Lighthouse auditing, security penetration checks, DNS routing, and analytics tagging.</p>
              </div>
            </div>

            <div className="p-5 rounded-xl border bg-amber-500/10 border-amber-500/20 text-xs font-mono">
              <strong>Indicative Timelines: </strong>
              Focused product landing pages: 2–3 weeks. Full corporate platforms with headless CMS: 4–6 weeks. Complex web applications with authentication &amp; subscriptions: 8–12 weeks. All ranges are marked indicative and tailored during technical scoping.
            </div>
          </div>
        </section>

        {/* Tech Stack Comparison Table */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
              Technology Stack Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--hairline)" }}>
                    <th className="py-3 px-4 text-[var(--ink)]">Layer</th>
                    <th className="py-3 px-4 text-[var(--ink)]">Technology Selected</th>
                    <th className="py-3 px-4 text-[var(--ink)]">Engineering Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "var(--hairline)" }}>
                  <tr>
                    <td className="py-3 px-4 font-bold text-[var(--blue-deep)]">Framework</td>
                    <td className="py-3 px-4">Next.js 15 (React 19)</td>
                    <td className="py-3 px-4 text-[var(--muted)]">Native Server Components reduce client bundle size to sub-100KB for maximum mobile speed.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-[var(--blue-deep)]">Language</td>
                    <td className="py-3 px-4">TypeScript 5</td>
                    <td className="py-3 px-4 text-[var(--muted)]">Eliminates runtime null reference errors and enforces end-to-end API type safety.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-[var(--blue-deep)]">Styling</td>
                    <td className="py-3 px-4">Vanilla CSS &amp; Tailwind CSS</td>
                    <td className="py-3 px-4 text-[var(--muted)]">Zero runtime CSS parsing overhead with tailored design token variables.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-[var(--blue-deep)]">Edge &amp; Hosting</td>
                    <td className="py-3 px-4">Vercel Edge / Cloudflare</td>
                    <td className="py-3 px-4 text-[var(--muted)]">Global CDN routing delivering assets within 40ms of visitors in India, the US, and Europe.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Related Case Studies & Internal Links */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl font-serif" style={{ color: "var(--ink)" }}>
              Featured Case Studies &amp; Architectural Field Notes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/work/appointory" className="p-5 rounded-xl border hover:border-[var(--blue-deep)] transition" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono text-[var(--blue-deep)]">Case Study 01</span>
                <h4 className="font-bold text-sm mt-1">Appointory Queue System</h4>
                <p className="text-xs text-[var(--muted)] mt-1">Real-time clinic waiting room coordination with Next.js &amp; WebSockets.</p>
              </Link>
              <Link href="/work/vrix" className="p-5 rounded-xl border hover:border-[var(--blue-deep)] transition" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono text-[var(--blue-deep)]">Case Study 02</span>
                <h4 className="font-bold text-sm mt-1">Vrix Headless Storefront</h4>
                <p className="text-xs text-[var(--muted)] mt-1">International luxury jewellery e-commerce with multi-currency checkout.</p>
              </Link>
              <Link href="/software-development-company-ahmedabad" className="p-5 rounded-xl border hover:border-[var(--blue-deep)] transition" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-mono text-[var(--orange)]">Location Hub</span>
                <h4 className="font-bold text-sm mt-1">Ahmedabad Software Studio</h4>
                <p className="text-xs text-[var(--muted)] mt-1">Learn why Gujarat enterprises partner with our local engineering team.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
              Frequently Asked Questions About Web Development
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
            <h2 className="text-3xl sm:text-4xl font-serif">Ready to engineer your next web system?</h2>
            <p className="text-sm text-[var(--muted)]">Discuss your specifications directly with our founding engineering team in Ahmedabad.</p>
            <div className="pt-2">
              <Link
                href="/#contact"
                data-cursor="link"
                data-cursor-magnetic
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold font-mono transition"
                style={{ backgroundColor: "var(--blue-deep)", color: "var(--cream)" }}
              >
                <span>Request Architectural Consultation</span>
                <i className="fas fa-arrow-right text-[10px]"></i>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer/>
    </>
  );
}
