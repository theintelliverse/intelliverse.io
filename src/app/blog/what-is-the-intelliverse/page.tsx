import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "What is The Intelliverse? Our Story & What We Build | The Intelliverse, Ahmedabad",
  description:
    "An inside look at The Intelliverse: our founding story in Ahmedabad, Gujarat, India, our engineering-first philosophy, the leadership team, and what we build.",
  keywords: [
    "What is The Intelliverse",
    "The Intelliverse",
    "The Intelliverse Ahmedabad",
    "TheIntelliverse",
    "Intelliverse Ahmedabad",
    "software development company Ahmedabad",
    "Dhruvil Thummar",
    "Rudra Kankotiya",
    "Jal Anghan",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/what-is-the-intelliverse`,
  },
  openGraph: {
    title: "What is The Intelliverse? Our Story & What We Build | The Intelliverse, Ahmedabad",
    description:
      "The official story of The Intelliverse: software engineering, web architecture, and IT services built like a craft in Ahmedabad, India.",
    url: `${siteConfig.url}/blog/what-is-the-intelliverse`,
    siteName: siteConfig.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What is The Intelliverse? Our Story & What We Build | The Intelliverse, Ahmedabad",
    description:
      "The official story of The Intelliverse: software engineering, web architecture, and IT services built like a craft in Ahmedabad, India.",
    images: ["/opengraph-image"],
  },
};

export default function WhatIsTheIntelliversePost() {
  const postUrl = `${siteConfig.url}/blog/what-is-the-intelliverse`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    headline: "What is The Intelliverse? Our Story and What We Build",
    description:
      "The official founding story, engineering philosophy, and architectural capabilities of The Intelliverse in Ahmedabad, Gujarat, India.",
    datePublished: "2026-10-05T00:00:00Z",
    dateModified: "2026-10-05T00:00:00Z",
    author: {
      "@type": "Person",
      name: "Dhruvil Thummar",
      jobTitle: "Co-founder & CTO",
      url: "https://www.linkedin.com/in/dhruvilthummar",
    },
    publisher: {
      "@type": "Organization",
      "@id": siteConfig.organizationId,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/the-intelliverse-logo.jpg`,
      },
    },
    mainEntityOfPage: postUrl,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is The Intelliverse?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Intelliverse is an engineering-first software development, web architecture, and IT services company based in Ahmedabad, Gujarat, India.",
        },
      },
      {
        "@type": "Question",
        name: "Who founded The Intelliverse?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Intelliverse was founded by Dhruvil Thummar (Co-founder & CTO), Rudra Kankotiya (Co-founder & CMO), and Jal Anghan (Founder & Director).",
        },
      },
      {
        "@type": "Question",
        name: "Where is The Intelliverse headquartered?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Intelliverse is headquartered in Ahmedabad, Gujarat, India (Coordinates: 23.0225° N, 72.5714° E).",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd schema={[articleSchema, faqSchema]} />
      <InnerPageHeader />

      <main id="main-content" className="min-h-screen" data-theme="cream" style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}>
        <Breadcrumbs
          items={[
            { name: "Blog", url: "/blog" },
            { name: "What is The Intelliverse?", url: "/blog/what-is-the-intelliverse" },
          ]}
        />

        <article className="py-12 md:py-16 px-4 sm:px-6 container-site" style={{ maxWidth: "860px", margin: "0 auto" }}>
          {/* Header */}
          <header className="space-y-6 mb-12">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
                style={{
                  backgroundColor: "rgba(47, 99, 224, 0.12)",
                  color: "var(--blue-deep)",
                  borderColor: "rgba(47, 99, 224, 0.25)",
                }}
              >
                Brand Story &amp; Architecture
              </span>
              <span className="text-xs font-mono text-[var(--muted)]">10 min read · October 2026</span>
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight font-serif"
              style={{ color: "var(--ink)", lineHeight: 1.1 }}
            >
              What is The Intelliverse? Our Story and What We Build.
            </h1>

            {/* Author Block */}
            <div className="flex items-center gap-4 py-4 border-y" style={{ borderColor: "var(--hairline)" }}>
              <div
                className="w-12 h-12 rounded-full overflow-hidden border flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: "var(--blue-deep)", color: "var(--cream)", borderColor: "var(--hairline)" }}
              >
                DT
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "var(--ink)" }}>
                  Dhruvil Thummar
                </p>
                <p className="text-xs text-[var(--muted)] font-mono">
                  Co-founder &amp; CTO, The Intelliverse · Ahmedabad, Gujarat, India
                </p>
              </div>
            </div>

            {/* Answer-First Box */}
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
              <p className="text-base sm:text-lg leading-relaxed font-sans" style={{ color: "var(--ink)" }}>
                <strong>Direct Answer: </strong>
                The Intelliverse is an independent software development, web engineering, and IT services company based in Ahmedabad, Gujarat, India. Founded by Dhruvil Thummar, Rudra Kankotiya, and Jal Anghan, our studio engineers high-performance custom SaaS platforms, modern Next.js web applications, and resilient cloud IT systems from first principles.
              </p>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose max-w-none space-y-8 font-sans leading-relaxed text-[var(--ink)]">
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
                Why did we start The Intelliverse?
              </h2>
              <p className="text-base sm:text-lg text-[var(--muted)]">
                The global software agency market is saturated with assembly-line shops. Non-technical account managers sell low-bid promises, outsource implementation to inexperienced interns, and ship bloated templates stitched together with dozens of fragile npm packages. When the product scales or breaks in production, the original agency is nowhere to be found.
              </p>
              <p className="text-base sm:text-lg text-[var(--muted)]">
                We founded <strong>The Intelliverse</strong> in Ahmedabad to prove that software engineering can be practiced like a master craft. We keep our engineering team tight, senior, and uncompromisingly accountable. When you work with The Intelliverse, you collaborate directly with the technical founders who write and review every commit.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
                Where is The Intelliverse located?
              </h2>
              <p className="text-base sm:text-lg text-[var(--muted)]">
                The Intelliverse is officially headquartered in <strong>Ahmedabad, Gujarat, India</strong> (Geographic coordinates: 23.0225° N, 72.5714° E, PIN 380009). Ahmedabad has grown into one of Western India&apos;s most vital tech corridors, combining world-class engineering talent from premier institutes with a centuries-old tradition of commercial reliability and entrepreneurial grit.
              </p>
              <p className="text-base sm:text-lg text-[var(--muted)]">
                From our Ahmedabad studio, we build software for local Gujarat enterprises and international partners spanning the United States, the United Kingdom, Europe, and the UAE.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
                What does The Intelliverse build?
              </h2>
              <p className="text-base sm:text-lg text-[var(--muted)]">
                Our capabilities span four core pillars of modern engineering:
              </p>
              <div className="space-y-4">
                <div className="p-5 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
                  <h3 className="font-bold text-base mb-1" style={{ color: "var(--blue-deep)" }}>
                    1. Web Development &amp; Architecture
                  </h3>
                  <p className="text-sm text-[var(--muted)]">
                    Next.js 15, React 19, TypeScript, and edge networks engineered for sub-second Core Web Vitals (LCP &lt; 2.5s, 0 CLS, INP &lt; 200ms) and high organic search discoverability.
                  </p>
                </div>

                <div className="p-5 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
                  <h3 className="font-bold text-base mb-1" style={{ color: "var(--blue-deep)" }}>
                    2. Custom Software &amp; SaaS Product Engineering
                  </h3>
                  <p className="text-sm text-[var(--muted)]">
                    Multi-tenant cloud applications, clean REST and GraphQL APIs, distributed database schemas (PostgreSQL, Redis), role-based permissions, and automated billing engines.
                  </p>
                </div>

                <div className="p-5 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
                  <h3 className="font-bold text-base mb-1" style={{ color: "var(--blue-deep)" }}>
                    3. Cloud Infrastructure &amp; DevOps IT Services
                  </h3>
                  <p className="text-sm text-[var(--muted)]">
                    Dockerized microservices, Kubernetes clusters, AWS cloud infrastructure, point-in-time database backups, and zero-downtime CI/CD deployment pipelines.
                  </p>
                </div>

                <div className="p-5 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
                  <h3 className="font-bold text-base mb-1" style={{ color: "var(--blue-deep)" }}>
                    4. Applied AI &amp; Automation Workflows
                  </h3>
                  <p className="text-sm text-[var(--muted)]">
                    Retrieval-Augmented Generation (RAG) knowledge assistants, document ingestion pipelines, and private LLM automations that integrate directly with enterprise databases without compromising confidentiality.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
                Our Production Track Record: Appointory &amp; Vrix
              </h2>
              <p className="text-base sm:text-lg text-[var(--muted)]">
                We believe in verified proof over marketing assertions. Two of our recent flagship deployments showcase our architectural depth:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base text-[var(--muted)]">
                <li>
                  <Link href="/work/appointory" className="font-bold text-[var(--blue-deep)] underline">
                    Appointory (Healthcare SaaS)
                  </Link>
                  : A real-time clinic queue synchronization platform built on Next.js 15, Node.js, MongoDB, and Redis pub/sub. Reduced average patient waiting time by 40% while securing encrypted patient records.
                </li>
                <li>
                  <Link href="/work/vrix" className="font-bold text-[var(--blue-deep)] underline">
                    Vrix Jewellery (Luxury Headless E-Commerce)
                  </Link>
                  : An ultra-fast headless storefront powered by Next.js and the Shopify Storefront API with multi-currency dynamic checkout for international buyers.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif" style={{ color: "var(--ink)" }}>
                Who leads The Intelliverse?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                <div className="p-5 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
                  <h4 className="font-bold text-base">Dhruvil Thummar</h4>
                  <p className="text-xs text-[var(--blue-deep)] font-mono mb-2">Co-founder &amp; CTO</p>
                  <p className="text-xs text-[var(--muted)]">
                    Directs system architecture, technical research, and distributed performance engineering.
                  </p>
                </div>
                <div className="p-5 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
                  <h4 className="font-bold text-base">Rudra Kankotiya</h4>
                  <p className="text-xs text-[var(--orange)] font-mono mb-2">Co-founder &amp; CMO</p>
                  <p className="text-xs text-[var(--muted)]">
                    Leads brand positioning, strategic partnerships, client growth, and product marketing.
                  </p>
                </div>
                <div className="p-5 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
                  <h4 className="font-bold text-base">Jal Anghan</h4>
                  <p className="text-xs text-[var(--ink)] font-mono mb-2">Founder &amp; Director</p>
                  <p className="text-xs text-[var(--muted)]">
                    Oversees corporate governance, international business operations, and organizational scaling.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <div className="p-8 rounded-2xl border text-center space-y-4 mt-12" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
              <h3 className="text-2xl font-serif" style={{ color: "var(--ink)" }}>
                Ready to build with our founding team?
              </h3>
              <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
                Whether you need a full SaaS MVP, an enterprise Next.js refactor, or cloud infrastructure tuning, talk directly with our architects in Ahmedabad.
              </p>
              <div className="pt-2">
                <Link href="/contact" className="btn-primary inline-flex" data-cursor="link" data-cursor-magnetic>
                  <span>Start a Technical Conversation →</span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
