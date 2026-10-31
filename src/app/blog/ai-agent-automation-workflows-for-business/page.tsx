import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Applied AI & Agentic Workflows for Modern Business: Beyond Simple Chatbots | The Intelliverse",
  description:
    "How modern enterprises deploy autonomous AI agent pipelines, Retrieval-Augmented Generation (RAG), and vector databases to automate complex business operations.",
  keywords: [
    "AI agent workflows for business",
    "enterprise RAG systems",
    "applied AI development Ahmedabad",
    "autonomous AI agents India",
    "The Intelliverse",
    "software development company Ahmedabad",
    "Rudra Kankotiya",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/ai-agent-automation-workflows-for-business`,
  },
  openGraph: {
    title: "Applied AI & Agentic Workflows for Modern Business: Beyond Simple Chatbots",
    description: "An architectural guide to implementing autonomous AI agents, enterprise RAG, and vector automation pipelines.",
    url: `${siteConfig.url}/blog/ai-agent-automation-workflows-for-business`,
    siteName: siteConfig.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Applied AI & Agentic Workflows for Modern Business: Beyond Simple Chatbots",
    description: "How enterprises build autonomous AI pipelines with strict privacy boundaries.",
    images: ["/og-image.png"],
  },
};

export default function AiAgentAutomationPost() {
  const postUrl = `${siteConfig.url}/blog/ai-agent-automation-workflows-for-business`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    headline: "Applied AI & Agentic Workflows for Modern Business: Beyond Simple Chatbots",
    description:
      "How modern enterprises deploy autonomous AI agent pipelines, Retrieval-Augmented Generation (RAG), and vector databases to automate complex business operations.",
    datePublished: "2026-10-31T00:00:00Z",
    dateModified: "2026-10-31T00:00:00Z",
    author: {
      "@type": "Person",
      name: "Rudra Kankotiya",
      jobTitle: "Co-founder & CMO",
      url: "https://www.linkedin.com/in/rudra-kankotiya-2173ab31a",
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

  return (
    <>
      <JsonLd schema={articleSchema} />
      <InnerPageHeader />

      <main id="main-content" className="min-h-screen" data-theme="cream" style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}>
        <Breadcrumbs
          items={[
            { name: "Blog", url: "/blog" },
            { name: "Applied AI & Agentic Workflows", url: "/blog/ai-agent-automation-workflows-for-business" },
          ]}
        />

        <article className="py-12 md:py-16 px-4 sm:px-6 container-site" style={{ maxWidth: "860px", margin: "0 auto" }}>
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
                Applied AI &amp; Data
              </span>
              <span className="text-sm font-mono text-[var(--ink-muted)]">October 31, 2026 · 9 min read</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-[var(--ink)]">
              Applied AI &amp; Agentic Workflows for Modern Business: Beyond Simple Chatbots
            </h1>

            <p className="text-lg md:text-xl text-[var(--ink-muted)] leading-relaxed font-sans">
              How modern enterprises deploy autonomous AI agent pipelines, Retrieval-Augmented Generation (RAG), and vector databases to automate complex business operations.
            </p>

            <div className="flex items-center gap-4 pt-4 border-t border-[rgba(26,24,20,0.1)]">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white"
                style={{ backgroundColor: "var(--blue-deep)" }}
              >
                RK
              </div>
              <div>
                <div className="font-bold text-sm text-[var(--ink)]">Rudra Kankotiya</div>
                <div className="text-xs font-mono text-[var(--ink-muted)]">Co-founder &amp; CMO, The Intelliverse</div>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-[var(--ink)] space-y-8 leading-relaxed font-sans">
            <section className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--ink)] mt-8">
                The Evolution from Basic LLM Wrappers to Autonomous Agents
              </h2>
              <p>
                In 2023, the market was flooded with trivial ChatGPT wrappers that did little more than forward user prompts to an API. In 2026, enterprise leaders have realized that raw language models hallucinate without context and cannot execute multi-step operations.
              </p>
              <p>
                The frontier of enterprise productivity lies in <strong>Autonomous Agentic Workflows</strong>: orchestrated software agents capable of breaking down complex objectives, querying private vector databases via Retrieval-Augmented Generation (RAG), calling external APIs (CRMs, ERPs, logistics databases), and executing validated business actions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--ink)] mt-8">
                Architectural Pillar 1: Enterprise RAG with pgvector &amp; Hybrid Search
              </h2>
              <p>
                To provide accurate answers from private proprietary documentation (contracts, invoices, medical records, technical specs), we deploy hybrid retrieval combining dense semantic embeddings with sparse BM25 keyword matching:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Embeddings stored securely in PostgreSQL using <code>pgvector</code> or dedicated Pinecone clusters.</li>
                <li>Cosine similarity retrieval with re-ranking models to filter irrelevant chunks before LLM ingestion.</li>
                <li>Strict data isolation ensuring internal enterprise documents never train public foundation models.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--ink)] mt-8">
                Architectural Pillar 2: Deterministic Human-in-the-Loop Safeguards
              </h2>
              <p>
                Autonomous agents shouldn’t execute destructive operations (such as processing refunds or dispatching shipments) without human sign-off. At The Intelliverse, we engineer <em>dual-confirmation state machines</em> where the agent prepares the payload, conducts automated policy validation, and presents a one-click Slack or dashboard authorization prompt to human supervisors.
              </p>
            </section>

            <div className="p-8 rounded-2xl bg-[var(--blue-deep)] text-white space-y-4 my-12 shadow-xl">
              <h3 className="font-serif text-2xl md:text-3xl font-bold">
                Deploy Custom AI Agents &amp; Automations
              </h3>
              <p className="text-white/90 leading-relaxed">
                Explore how The Intelliverse can engineer secure, production-grade AI pipelines tailored to your business operations.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 rounded-xl font-bold text-sm bg-white text-[var(--blue-deep)] hover:bg-[#F8F2E4] transition-all shadow-md"
                >
                  Schedule an AI Architecture Session →
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
