import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import TrackCaseStudyView from "@/components/analytics/TrackCaseStudyView";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";

const config = seoConfig.workVrix;

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
    images: [{ url: "/gardens-by-the-bay.png", width: 1200, height: 630, alt: "Vrix Jewellery Plate" }],
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description,
    images: ["/gardens-by-the-bay.png"],
  },
};

export default function VrixCaseStudyPage() {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteConfig.url}${config.canonicalPath}/#software`,
    name: "Vrix Jewellery Headless Storefront",
    applicationCategory: "ShoppingApplication",
    operatingSystem: "Web-based (Cloud SaaS)",
    description: config.description,
    url: "https://vrix.in",
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
    datePublished: "2026-03-01T00:00:00Z",
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
        url: `${siteConfig.url}/the%20intelliverse%20logo.jpg`,
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
      <TrackCaseStudyView slug="Vrix Luxury E-commerce" />
      <InnerPageHeader />

      <main id="main-content" data-theme="cream" className="min-h-screen" style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}>
        <Breadcrumbs items={[{ name: "Case Studies", url: "/#projects" }, { name: "Vrix Jewellery", url: config.canonicalPath }]} />

        {/* Hero */}
        <section className="py-12 md:py-16 px-4 sm:px-6 container-site" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
                style={{
                  backgroundColor: "rgba(155, 114, 216, 0.12)",
                  color: "#6b21a8",
                  borderColor: "rgba(155, 114, 216, 0.28)",
                }}
              >
                Production Case Study · Luxury E-Commerce
              </span>
              <span className="text-xs font-mono text-[var(--muted)]">
                Live URL: <a href="https://vrix.in" target="_blank" rel="noopener noreferrer" className="text-[var(--blue-deep)] underline">vrix.in ↗</a>
              </span>
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
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono mt-4 pt-3 border-t" style={{ borderColor: "var(--hairline)", color: "var(--muted)" }}>
                <span>Lead Architect: <strong>Dhruvil Thummar (CTO)</strong></span>
                <span>·</span>
                <span>Published: March 2026 · Updated: October 2026</span>
                <span>·</span>
                <span>Engineering HQ: Ahmedabad, Gujarat</span>
              </div>
            </div>
          </div>
        </section>

        {/* Problem & Approach */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif mb-3" style={{ color: "var(--ink)" }}>
                  What commercial challenge did Vrix Jewellery face?
                </h2>
                <p className="text-sm leading-relaxed text-[var(--muted)] mb-4">
                  Vrix exports high-end certified diamond and luxury jewellery to high-net-worth buyers in North America, Dubai, and the United Kingdom. Their previous standard e-commerce platform suffered from slow international page loads (&gt; 4 seconds on mobile), clumsy currency conversions, and limited ability to filter complex carat, cut, clarity, and metal attributes smoothly.
                </p>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  In luxury retail, slow loading speeds destroy customer trust and diminish brand prestige.
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-serif mb-3" style={{ color: "var(--ink)" }}>
                  How did The Intelliverse engineer the headless solution?
                </h2>
                <p className="text-sm leading-relaxed text-[var(--muted)] mb-4">
                  We detached the visual customer frontend from traditional monolithic e-commerce engines. We engineered a headless Next.js App Router frontend powered by the Shopify Storefront GraphQL API.
                </p>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  Pages are pre-rendered at the edge with Cloudflare CDN, dropping Time-to-First-Byte (TTFB) to under 120ms globally. Geolocation detection automatically adjusts local currencies (USD, GBP, AED, INR) and tax rules at checkout without jarring page reloads.
                </p>
              </div>
            </div>

            {/* Technical Stack Specifications */}
            <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
              <h3 className="text-sm font-bold font-mono uppercase text-[var(--blue-deep)] mb-3">
                Verified Technical Architecture Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js App Router", "Shopify Storefront GraphQL API", "Tailwind CSS", "Cloudflare Edge Caching", "Multi-Currency Geolocation Routing", "Sub-Second Diamond Filter Engine"].map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded bg-[var(--surface)] border border-[var(--hairline)] text-xs font-mono text-[var(--ink)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features & Verified Review */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)" }}>
          <div className="container-site space-y-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
              Technical Breakthroughs &amp; Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-2xl font-mono font-bold text-[var(--blue-deep)]">60%+</span>
                <h4 className="font-bold text-sm mt-1 mb-2">Faster Global TTFB</h4>
                <p className="text-xs text-[var(--muted)]">Time-to-first-byte dropped by over 60% across overseas visitors in the US, UK, and UAE.</p>
              </div>
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-2xl font-mono font-bold text-[var(--blue-deep)]">100%</span>
                <h4 className="font-bold text-sm mt-1 mb-2">Mobile Core Web Vitals Pass</h4>
                <p className="text-xs text-[var(--muted)]">Achieved green status across all Core Web Vitals metrics on Google PageSpeed Insights.</p>
              </div>
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                <span className="text-2xl font-mono font-bold text-[var(--blue-deep)]">Dynamic</span>
                <h4 className="font-bold text-sm mt-1 mb-2">Multi-Currency Routing</h4>
                <p className="text-xs text-[var(--muted)]">Automated currency and duties calculation eliminates cart abandonment caused by unexpected checkout fees.</p>
              </div>
            </div>

            {/* Client Testimonial (Verified from local database) */}
            <div className="p-6 rounded-2xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
              <p className="text-sm sm:text-base italic text-[var(--ink)] leading-relaxed">
                &ldquo;Exceptional UI speed and international conversion rate optimization.&rdquo;
              </p>
              <p className="text-xs font-mono font-bold text-[var(--blue-deep)] mt-3">
                — Verified Product Review · Vrix Jewellery Team
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
              Frequently Asked Questions About Vrix Headless Commerce
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
            <h2 className="text-3xl sm:text-4xl font-serif">Planning a headless e-commerce transformation?</h2>
            <p className="text-sm text-[var(--muted)]">Build a storefront that loads in milliseconds for international customers.</p>
            <div className="pt-2">
              <Link
                href="/#contact"
                data-cursor="link"
                data-cursor-magnetic
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold font-mono transition"
                style={{ backgroundColor: "var(--blue-deep)", color: "var(--cream)" }}
              >
                <span>Request Headless Commerce Consultation</span>
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
