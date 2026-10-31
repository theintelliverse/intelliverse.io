import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";
import { BLOG_POSTS, BlogPostMeta } from "@/content/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Blog Post Not Found | The Intelliverse" };

  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: `${post.title} | The Intelliverse`,
    description: post.description,
    keywords: [
      post.category,
      "software development company Ahmedabad",
      "The Intelliverse",
      "Next.js engineering",
      post.author,
      "enterprise cloud architecture",
    ],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: `${post.publishedDate}T00:00:00Z`,
      modifiedTime: `${post.updatedDate}T00:00:00Z`,
      authors: [post.author],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function DynamicBlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    headline: post.title,
    description: post.description,
    datePublished: `${post.publishedDate}T00:00:00Z`,
    dateModified: `${post.updatedDate}T00:00:00Z`,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/the-intelliverse-mark.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <>
      <JsonLd schema={articleSchema} />
      <InnerPageHeader />

      <main
        id="main-content"
        className="min-h-screen"
        data-theme="cream"
        style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}
      >
        <Breadcrumbs
          items={[
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]}
        />

        {/* Post Header Hero */}
        <section
          className="pt-10 pb-12 md:py-16 px-4 sm:px-6 container-site"
          style={{ maxWidth: "880px", margin: "0 auto" }}
        >
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
                style={{
                  backgroundColor: "rgba(47, 99, 224, 0.12)",
                  color: "var(--blue-deep)",
                  borderColor: "rgba(47, 99, 224, 0.25)",
                }}
              >
                {post.category}
              </span>
              <span
                className="text-xs font-mono"
                style={{ color: "var(--muted)" }}
              >
                · {post.readTime}
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight leading-tight"
              style={{ color: "var(--ink)" }}
            >
              {post.title}
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed font-sans"
              style={{ color: "var(--muted)" }}
            >
              {post.description}
            </p>

            {/* Author bar */}
            <div
              className="pt-4 flex items-center justify-between flex-wrap gap-4 border-t"
              style={{ borderColor: "var(--hairline)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs"
                  style={{
                    backgroundColor: "var(--blue-deep)",
                    color: "var(--cream)",
                  }}
                >
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div
                    className="font-mono text-xs font-bold"
                    style={{ color: "var(--ink)" }}
                  >
                    {post.author}
                  </div>
                  <div
                    className="text-[11px] font-mono"
                    style={{ color: "var(--muted)" }}
                  >
                    {post.authorRole} · The Intelliverse
                  </div>
                </div>
              </div>

              <div
                className="text-xs font-mono"
                style={{ color: "var(--muted)" }}
              >
                Published {post.publishedDate} · Updated {post.updatedDate}
              </div>
            </div>
          </div>
        </section>

        {/* Post Article Body */}
        <article
          className="pb-16 px-4 sm:px-6 container-site"
          style={{ maxWidth: "880px", margin: "0 auto" }}
        >
          {/* Key Takeaways Card */}
          <div
            className="p-6 rounded-2xl mb-10 border shadow-sm space-y-3"
            style={{
              backgroundColor: "rgba(47, 99, 224, 0.05)",
              borderColor: "rgba(47, 99, 224, 0.2)",
            }}
          >
            <div className="flex items-center gap-2">
              <i className="fas fa-bookmark text-xs" style={{ color: "var(--blue-deep)" }}></i>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: "var(--blue-deep)" }}>
                Executive Architecture Takeaway
              </h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
              Modern engineering demands strict separation between presentation layers and core state synchronization. At The Intelliverse, we engineer resilient software architectures by prioritizing deterministic event delivery, zero-trust cryptographic validations, and sub-100ms response latencies from day one.
            </p>
          </div>

          {/* Structured Deep Dive Sections */}
          <div className="space-y-8 text-base leading-relaxed" style={{ color: "var(--ink-2)" }}>
            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-bold tracking-tight" style={{ color: "var(--ink)" }}>
                1. The Engineering Challenge &amp; Problem Space
              </h2>
              <p>
                When engineering systems that manage hundreds of thousands of concurrent transactions or complex multi-tenant data pipelines, default monolithic patterns inevitably experience compounding latency bottlenecks and unpredictable state drift.
              </p>
              <p>
                Legacy stacks frequently struggle with resource contention, unbounded database query locks, and cascading connection timeouts. To build for long-term scalability, engineering teams must evaluate data consistency guarantees, cache invalidation boundaries, and distributed failure modes before writing client interfaces.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-bold tracking-tight" style={{ color: "var(--ink)" }}>
                2. Architectural Blueprint &amp; Core Patterns
              </h2>
              <p>
                Our production blueprint enforces modular domain boundaries. By isolating transactional workloads from analytical reads through CQRS (Command Query Responsibility Segregation) and event streams, systems remain performant under aggressive burst loads.
              </p>
              <div
                className="p-4 rounded-xl border font-mono text-xs overflow-x-auto"
                style={{
                  backgroundColor: "rgba(11, 21, 48, 0.95)",
                  color: "#e4dac3",
                  borderColor: "rgba(228, 218, 195, 0.15)",
                }}
              >
                <div style={{ color: "rgba(248, 242, 228, 0.5)" }}>// Production Architectural Specification</div>
                <div style={{ color: "#34d399" }}>const</div> architecture = &#123;<br />
                &nbsp;&nbsp;runtime: <span style={{ color: "#fdb347" }}>&quot;Next.js 15 + Edge Workers&quot;</span>,<br />
                &nbsp;&nbsp;persistence: <span style={{ color: "#fdb347" }}>&quot;PostgreSQL + pgvector / Redis Cluster&quot;</span>,<br />
                &nbsp;&nbsp;eventPipeline: <span style={{ color: "#fdb347" }}>&quot;Event-Driven Pub/Sub &amp; Temporal Workflows&quot;</span>,<br />
                &nbsp;&nbsp;slaGuarantees: &#123;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;p99Latency: <span style={{ color: "#3D7BF7" }}>&quot;&lt; 85ms&quot;</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;availability: <span style={{ color: "#3D7BF7" }}>&quot;99.99% Uptime&quot;</span><br />
                &nbsp;&nbsp;&#125;<br />
                &#125;;
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-bold tracking-tight" style={{ color: "var(--ink)" }}>
                3. Production Hardening &amp; Zero-Downtime Deployment
              </h2>
              <p>
                Shipping high-impact software requires rigorous automated verification. Every build must pass strict TypeScript compilation, automated integration stress tests, and automated edge canary deployments to verify zero regressions before live traffic migration.
              </p>
              <p>
                With continuous observability, distributed OpenTelemetry trace collectors, and health telemetry probing, engineering leadership retains complete real-time visibility into edge latency percentiles and system throughput.
              </p>
            </section>
          </div>

          {/* Author CTA Box */}
          <div
            className="mt-14 p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{
              backgroundColor: "rgba(18, 30, 68, 0.95)",
              color: "var(--cream)",
              borderColor: "rgba(228, 218, 195, 0.16)",
            }}
          >
            <div className="space-y-2 max-w-xl">
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(47, 99, 224, 0.25)",
                  color: "var(--blue)",
                  border: "1px solid rgba(61, 123, 247, 0.35)",
                }}
              >
                Collaborate with The Intelliverse
              </span>
              <h3 className="text-xl md:text-2xl font-serif font-bold tracking-tight">
                Building an ambitious software system or scaling an existing platform?
              </h3>
              <p className="text-xs md:text-sm font-sans" style={{ color: "rgba(248, 242, 228, 0.7)" }}>
                Partner directly with our engineering founders in Ahmedabad. We design, architect, and deploy software platforms that solve problems worth solving.
              </p>
            </div>
            <Link
              href="/#contact"
              className="px-6 py-3.5 rounded-xl text-xs font-mono font-bold transition shrink-0 active:scale-95 text-center"
              style={{
                backgroundColor: "var(--blue-deep)",
                color: "var(--cream)",
                border: "1px solid rgba(228, 218, 195, 0.25)",
                boxShadow: "0 4px 18px rgba(47, 99, 224, 0.4)",
                textDecoration: "none",
              }}
            >
              Start Engineering Consultation →
            </Link>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-10 border-t space-y-6" style={{ borderColor: "var(--hairline)" }}>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                More from Engineering Journal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="p-5 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 block"
                    style={{
                      backgroundColor: "var(--surface)",
                      borderColor: "var(--hairline)",
                      textDecoration: "none",
                    }}
                  >
                    <span
                      className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-2"
                      style={{ color: "var(--blue-deep)" }}
                    >
                      {rel.category}
                    </span>
                    <h4
                      className="font-serif font-bold text-sm leading-snug group-hover:text-[var(--blue-deep)] transition-colors"
                      style={{ color: "var(--ink)" }}
                    >
                      {rel.title}
                    </h4>
                    <span
                      className="text-[10px] font-mono mt-3 block"
                      style={{ color: "var(--muted)" }}
                    >
                      {rel.readTime} · {rel.publishedDate}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
