import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";

const config = seoConfig.faq;

export const metadata: Metadata = {
  title: "Frequently Asked Questions | The Intelliverse, Ahmedabad",
  description:
    "Official FAQ for The Intelliverse: software development, web architecture, SaaS engineering, pricing, founders, and contact info in Ahmedabad, India.",
  keywords: [
    "The Intelliverse FAQ",
    "What is The Intelliverse",
    "Where is The Intelliverse located",
    "The Intelliverse Ahmedabad",
    "TheIntelliverse",
    "Intelliverse Ahmedabad",
    "software development company Ahmedabad",
  ],
  alternates: {
    canonical: `${siteConfig.url}/faq`,
  },
  openGraph: {
    title: "Frequently Asked Questions | The Intelliverse, Ahmedabad",
    description:
      "Official FAQ for The Intelliverse: software development, web architecture, SaaS engineering, pricing, founders, and contact info in Ahmedabad, India.",
    url: `${siteConfig.url}/faq`,
    siteName: siteConfig.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | The Intelliverse, Ahmedabad",
    description:
      "Official FAQ for The Intelliverse: software development, web architecture, SaaS engineering, pricing, founders, and contact info in Ahmedabad, India.",
    images: ["/opengraph-image"],
  },
};

const GLOBAL_FAQS = [
  {
    category: "Brand & Identity",
    question: "What is The Intelliverse?",
    answer:
      "The Intelliverse (also searched as TheIntelliverse or Intelliverse Ahmedabad) is an independent engineering-first software development, web architecture, and IT services company based in Ahmedabad, Gujarat, India. We design, engineer, and deploy high-performance custom SaaS platforms, modern Next.js web systems, and secure cloud infrastructure for startups and modern businesses worldwide.",
  },
  {
    category: "Brand & Identity",
    question: "Where is The Intelliverse located?",
    answer:
      "The Intelliverse is based in Ahmedabad, Gujarat, India (Coordinates: 23.0225° N, 72.5714° E). We operate our engineering studio in Ahmedabad and collaborate with clients locally in Gujarat, across India, and globally across the United States, United Kingdom, Europe, and the Middle East.",
  },
  {
    category: "Brand & Identity",
    question: "What services does The Intelliverse offer?",
    answer:
      "The Intelliverse provides four foundational engineering services: 1) Web Development & Next.js Architecture; 2) Custom Software & SaaS Product Engineering; 3) Cloud Infrastructure, DevOps & IT Services; and 4) Applied AI, Data & Automation Systems.",
  },
  {
    category: "Brand & Identity",
    question: "Who founded The Intelliverse?",
    answer:
      "The Intelliverse was founded by Dhruvil Thummar (Co-founder & CTO), Rudra Kankotiya (Co-founder & CMO), and Jal Anghan (Founder & Director). Clients communicate directly with our technical leadership without non-technical account intermediaries.",
  },
  {
    category: "Brand & Identity",
    question: "How can I contact The Intelliverse?",
    answer:
      "You can contact The Intelliverse by emailing theintelliverse@gmail.com, submitting a brief through our website contact form at intelliverse.io/contact, or connecting directly with our founders on LinkedIn (linkedin.com/company/the-intelliverse).",
  },
  {
    category: "Services & Capabilities",
    question: "What core technology services does The Intelliverse provide?",
    answer:
      "The Intelliverse provides four foundational engineering services: 1) High-performance Next.js web application development; 2) Custom multi-tenant SaaS and enterprise software engineering; 3) Cloud architecture, Kubernetes, Docker, and DevOps infrastructure support; and 4) Applied AI agent workflows and enterprise RAG systems.",
  },
  {
    category: "Services & Capabilities",
    question: "Which technology stack does your engineering team specialize in?",
    answer:
      "Our core production stack includes Next.js 15 (React 19), TypeScript 5, Node.js, Python, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS, and Cloudflare edge networks.",
  },
  {
    category: "Location & Geography",
    question: "Where is The Intelliverse based, and do you work with international clients?",
    answer:
      "The Intelliverse is headquartered in Ahmedabad, Gujarat, India (Coordinates: 23.0225° N, 72.5714° E). We serve clients locally in Ahmedabad and Gujarat, across major Indian tech hubs, and internationally across North America, the UK, Europe, and the Middle East.",
  },
  {
    category: "Pricing & Timelines",
    question: "How much does it cost to build custom software or a web application with The Intelliverse?",
    answer:
      "Indicative project pricing starts from ₹15,000 for focused landing page architectures, ₹45,000 to ₹1.5L for full Next.js web applications, and ₹1.5L to ₹8L+ for multi-tenant SaaS platforms or complex cloud systems. Exact pricing is determined transparently during initial technical scoping based on specifications and integrations.",
  },
  {
    category: "Pricing & Timelines",
    question: "What are the typical project delivery timelines?",
    answer:
      "Focused web platforms typically take 2–4 weeks. Custom web applications and SaaS MVPs generally launch within 6–10 weeks. Enterprise software systems and complex multi-service architectures take 12–16 weeks. We work in 2-week agile sprints with continuous staging deliveries.",
  },
  {
    category: "Engagement & Communication",
    question: "How do clients communicate with The Intelliverse during development?",
    answer:
      "Clients communicate directly with technical founders and lead engineers via private Slack or WhatsApp channels, bi-weekly sprint review video calls, and live staging URLs. There are no non-technical sales intermediaries or account managers.",
  },
  {
    category: "Intellectual Property & Code Ownership",
    question: "Who owns the intellectual property (IP) and source code?",
    answer:
      "The client retains 100% intellectual property ownership of all custom source code, designs, database schemas, and documentation. All assets are transferred to the client's version control repository upon project completion.",
  },
  {
    category: "Quality & Performance",
    question: "How do you ensure Core Web Vitals and search engine optimization (SEO)?",
    answer:
      "Every web build is engineered to pass Core Web Vitals targets: Largest Contentful Paint (LCP) < 2.5s, Cumulative Layout Shift (CLS) < 0.1, and Interaction to Next Paint (INP) < 200ms. We integrate semantic HTML5 landmarks, server-side rendering, JSON-LD structured data, and automated sitemaps as standard deliverables.",
  },
  {
    category: "Security & Reliability",
    question: "How does The Intelliverse handle application and cloud security?",
    answer:
      "We implement zero-trust access principles: role-based access control (RBAC), environment variable encryption, SQL injection and XSS defenses, automated point-in-time database backups, and TLS encryption in transit and at rest.",
  },
  {
    category: "Post-Launch Support",
    question: "What post-launch support and maintenance do you offer?",
    answer:
      "Every project includes 30 days of complimentary hypercare support post-deployment. Afterwards, clients can opt for monthly SLA retainers covering 24/7 server monitoring, dependency updates, security patches, and incremental feature sprints.",
  },
  {
    category: "Hiring & Getting Started",
    question: "What is the process to get started on a project with The Intelliverse?",
    answer:
      "The onboarding process involves four simple steps: 1) Initial discovery call or technical RFC submission; 2) Architecture scoping and fixed-sprint proposal; 3) Agreement execution and repository setup; 4) Sprint 1 kickoff within 5–7 business days.",
  },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GLOBAL_FAQS.map((faq) => ({
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
      <JsonLd schema={faqSchema} />
      <InnerPageHeader />

      <main id="main-content" className="min-h-screen" data-theme="cream" style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}>
        <Breadcrumbs items={[{ name: "FAQ", url: config.canonicalPath }]} />

        {/* Hero */}
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
              Knowledge Base &amp; FAQ
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight font-serif"
              style={{ color: "var(--ink)", lineHeight: 1.1 }}
            >
              {config.h1}
            </h1>

            {/* AEO Answer-First Summary */}
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
              <p className="text-base sm:text-lg leading-relaxed font-sans" style={{ color: "var(--ink)" }}>
                <strong>Direct Summary: </strong>
                {config.heroAnswer}
              </p>
              <p className="text-xs font-mono mt-3" style={{ color: "var(--muted)" }}>
                Updated October 2026 · Transparent Engineering Standards by The Intelliverse
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion / Grid */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className="space-y-6">
              {GLOBAL_FAQS.map((faq, idx) => (
                <article
                  key={idx}
                  className="p-6 rounded-2xl border"
                  style={{
                    borderColor: "var(--hairline)",
                    backgroundColor: "var(--cream)",
                  }}
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--blue-deep)] block mb-1">
                    {faq.category}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold font-sans mb-3" style={{ color: "var(--ink)" }}>
                    {faq.question}
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 text-center border-t" style={{ borderColor: "var(--hairline)" }}>
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif">Have a question not listed here?</h2>
            <p className="text-sm text-[var(--muted)]">Send your inquiry directly to our engineering desk in Ahmedabad.</p>
            <div className="pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold font-mono transition"
                style={{ backgroundColor: "var(--blue-deep)", color: "var(--cream)" }}
                data-cursor="link"
                data-cursor-magnetic
              >
                <span>Ask Us Directly</span>
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
