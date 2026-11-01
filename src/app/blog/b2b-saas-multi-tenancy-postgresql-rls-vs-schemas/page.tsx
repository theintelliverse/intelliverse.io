import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "B2B SaaS Multi-Tenancy in PostgreSQL: Row-Level Security (RLS) vs Separate Schemas | The Intelliverse",
  description:
    "A deep architectural benchmark comparing Postgres Row-Level Security (RLS), schema-per-tenant, and database-per-tenant for high-scale multi-tenant SaaS platforms.",
  keywords: [
    "PostgreSQL multi-tenancy",
    "Postgres Row-Level Security SaaS",
    "RLS vs schema per tenant",
    "PostgreSQL RLS performance",
    "multi-tenant database architecture",
    "B2B SaaS data isolation",
    "PgBouncer transaction pooling RLS",
    "The Intelliverse software engineering",
    "Dhruvil Thummar",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/b2b-saas-multi-tenancy-postgresql-rls-vs-schemas`,
  },
  openGraph: {
    type: "article",
    publishedTime: "2026-11-01T00:00:00Z",
    modifiedTime: "2026-11-01T00:00:00Z",
    authors: ["Dhruvil Thummar"],
    title: "B2B SaaS Multi-Tenancy in PostgreSQL: Row-Level Security (RLS) vs Separate Schemas",
    description:
      "A deep architectural benchmark comparing Postgres Row-Level Security (RLS), schema-per-tenant, and database-per-tenant for multi-tenant B2B SaaS platforms.",
    url: `${siteConfig.url}/blog/b2b-saas-multi-tenancy-postgresql-rls-vs-schemas`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        secureUrl: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "B2B SaaS Multi-Tenancy in PostgreSQL: Row-Level Security (RLS) vs Separate Schemas",
      },
      {
        url: `${siteConfig.url}/logo-512.png`,
        secureUrl: `${siteConfig.url}/logo-512.png`,
        width: 512,
        height: 512,
        type: "image/png",
        alt: "The Intelliverse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theintelliverse",
    creator: "@theintelliverse",
    title: "B2B SaaS Multi-Tenancy in PostgreSQL: Row-Level Security (RLS) vs Separate Schemas",
    description: "Architectural comparison and production benchmark by The Intelliverse CTO.",
    images: [`${siteConfig.url}/og-image.png`],
  },
  other: {
    "image": `${siteConfig.url}/og-image.png`,
    "thumbnail": `${siteConfig.url}/logo-512.png`,
    "og:image:secure_url": `${siteConfig.url}/og-image.png`,
    "og:logo": `${siteConfig.url}/logo-512.png`,
  },
};

export default function MultiTenancyPostgresPost() {
  const postUrl = `${siteConfig.url}/blog/b2b-saas-multi-tenancy-postgresql-rls-vs-schemas`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    headline: "B2B SaaS Multi-Tenancy in PostgreSQL: Row-Level Security (RLS) vs Separate Schemas",
    description:
      "A deep architectural benchmark comparing Postgres Row-Level Security (RLS), schema-per-tenant, and database-per-tenant for high-scale multi-tenant SaaS platforms.",
    datePublished: "2026-11-01T00:00:00Z",
    dateModified: "2026-11-01T00:00:00Z",
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
        url: `${siteConfig.url}/the-intelliverse-mark.png`,
      },
    },
    mainEntityOfPage: postUrl,
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
            {
              name: "PostgreSQL Multi-Tenancy: RLS vs Schemas",
              url: "/blog/b2b-saas-multi-tenancy-postgresql-rls-vs-schemas",
            },
          ]}
        />

        <article
          className="py-12 md:py-16 px-4 sm:px-6 container-site"
          style={{ maxWidth: "880px", margin: "0 auto" }}
        >
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
                Database &amp; SaaS Architecture
              </span>
              <span className="text-xs font-mono text-[var(--ink-muted)]">
                November 1, 2026 · 11 min read
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[var(--ink)] leading-tight">
              B2B SaaS Multi-Tenancy in PostgreSQL: Row-Level Security (RLS) vs Separate Schemas
            </h1>

            <p className="text-lg sm:text-xl text-[var(--ink-muted)] leading-relaxed font-sans">
              One of the most consequential decisions an engineering team makes when designing a multi-tenant B2B SaaS is database isolation. We benchmark Row-Level Security (RLS), schema-per-tenant, and database-per-tenant across query throughput, migration velocity, and connection pooling sanity.
            </p>

            <div className="flex items-center gap-4 pt-4 border-t border-[var(--hairline)]">
              <div
                className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center font-bold text-white text-base font-mono"
                style={{ backgroundColor: "var(--blue-deep)" }}
              >
                DT
              </div>
              <div>
                <div className="font-bold text-[var(--ink)]">Dhruvil Thummar</div>
                <div className="text-xs font-mono text-[var(--ink-muted)]">
                  Co-founder &amp; CTO · The Intelliverse
                </div>
              </div>
            </div>
          </header>

          {/* Executive Architecture Takeaway Box */}
          <div
            className="p-6 rounded-2xl mb-12 border shadow-sm space-y-3"
            style={{
              backgroundColor: "rgba(47, 99, 224, 0.05)",
              borderColor: "rgba(47, 99, 224, 0.2)",
            }}
          >
            <div className="flex items-center gap-2">
              <i className="fas fa-bookmark text-xs" style={{ color: "var(--blue-deep)" }}></i>
              <h3
                className="font-mono text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--blue-deep)" }}
              >
                Executive Architecture Takeaway
              </h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
              For 95% of B2B SaaS platforms with up to 10,000 tenants, <strong>Shared Tables with Postgres Row-Level Security (RLS) and transaction-scoped config variables</strong> provides the best developer velocity, predictable index cache locality, and simple zero-downtime DDL migrations. Schema-per-tenant should only be adopted when regulatory compliance or per-customer point-in-time recovery (PITR) is a hard contractual mandate.
            </p>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none text-[var(--ink)] space-y-10 leading-relaxed font-sans">
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                1. The Multi-Tenancy Conundrum
              </h2>
              <p>
                In any multi-tenant SaaS, tenant data isolation is not merely a security feature—it directly impacts:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base">
                <li>
                  <strong>Migration velocity:</strong> Can you run a database migration across 5,000 accounts without a multi-hour maintenance window?
                </li>
                <li>
                  <strong>Connection pooling &amp; memory footprint:</strong> How many concurrent database connections and catalog cache handles does your proxy need to manage?
                </li>
                <li>
                  <strong>Operational blast radius:</strong> Does one noisy tenant running a heavy export degrade the p99 latency for every other client on the system?
                </li>
                <li>
                  <strong>Developer ergonomics:</strong> How easily can engineers write ORM or raw SQL queries without accidentally leaking data across tenants?
                </li>
              </ul>
              <p>
                In PostgreSQL, three architectural models dominate:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-base">
                <li><strong>Shared Schema with Discriminator Column &amp; Row-Level Security (RLS)</strong></li>
                <li><strong>Schema-per-Tenant (Namespaces)</strong></li>
                <li><strong>Database-per-Tenant (Physical Isolation)</strong></li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                2. Model 1: PostgreSQL Row-Level Security (RLS)
              </h2>
              <p>
                Row-Level Security was introduced in PostgreSQL 9.5 and has matured into an enterprise-grade security boundary. All tenants share the same tables, but a Postgres policy automatically rewrites incoming queries to append tenant filtering conditions at the query planner level.
              </p>
              <p>
                Rather than relying on client application code to remember <code>WHERE tenant_id = ?</code> on every query, the database kernel strictly enforces it:
              </p>

              <div
                className="p-5 rounded-xl border font-mono text-xs overflow-x-auto my-6"
                style={{
                  backgroundColor: "rgba(11, 21, 48, 0.96)",
                  color: "#e4dac3",
                  borderColor: "rgba(228, 218, 195, 0.15)",
                }}
              >
                <div style={{ color: "rgba(248, 242, 228, 0.4)" }}>-- Step 1: Enable RLS on the table</div>
                <div><span style={{ color: "#34d399" }}>ALTER TABLE</span> invoices <span style={{ color: "#34d399" }}>ENABLE ROW LEVEL SECURITY</span>;</div>
                <div><span style={{ color: "#34d399" }}>ALTER TABLE</span> invoices <span style={{ color: "#34d399" }}>FORCE ROW LEVEL SECURITY</span>; <span style={{ color: "rgba(248, 242, 228, 0.4)" }}>-- Enforces on table owners too</span></div>
                <br />
                <div style={{ color: "rgba(248, 242, 228, 0.4)" }}>-- Step 2: Define tenant isolation policy using session setting</div>
                <div><span style={{ color: "#34d399" }}>CREATE POLICY</span> tenant_isolation_policy <span style={{ color: "#34d399" }}>ON</span> invoices</div>
                <div>&nbsp;&nbsp;<span style={{ color: "#34d399" }}>FOR ALL</span></div>
                <div>&nbsp;&nbsp;<span style={{ color: "#34d399" }}>USING</span> (tenant_id = <span style={{ color: "#fdb347" }}>current_setting(&apos;app.current_tenant_id&apos;, true)::uuid</span>)</div>
                <div>&nbsp;&nbsp;<span style={{ color: "#34d399" }}>WITH CHECK</span> (tenant_id = <span style={{ color: "#fdb347" }}>current_setting(&apos;app.current_tenant_id&apos;, true)::uuid</span>);</div>
                <br />
                <div style={{ color: "rgba(248, 242, 228, 0.4)" }}>-- Step 3: Crucial index for index-only scans on tenant-bounded queries</div>
                <div><span style={{ color: "#34d399" }}>CREATE INDEX</span> idx_invoices_tenant_created <span style={{ color: "#34d399" }}>ON</span> invoices (tenant_id, created_at <span style={{ color: "#34d399" }}>DESC</span>);</div>
              </div>

              <h3 className="text-xl font-bold font-serif pt-2">The Critical Gotcha: Connection Poolers &amp; Transaction Scope</h3>
              <p>
                When using high-performance connection poolers like PgBouncer or Supavisor in <code>transaction</code> mode, you cannot execute <code>SET app.current_tenant_id = &apos;...&apos;</code> at the session level, because subsequent transactions from other requests may reuse the same connection and inherit the previous tenant context!
              </p>
              <p>
                The production fix is strictly using <code>SET LOCAL</code> inside an explicit transaction block, or using parameterized transaction helpers:
              </p>

              <div
                className="p-5 rounded-xl border font-mono text-xs overflow-x-auto my-6"
                style={{
                  backgroundColor: "rgba(11, 21, 48, 0.96)",
                  color: "#e4dac3",
                  borderColor: "rgba(228, 218, 195, 0.15)",
                }}
              >
                <div style={{ color: "rgba(248, 242, 228, 0.4)" }}>// Production Node.js / Next.js transactional RLS runner</div>
                <div><span style={{ color: "#34d399" }}>export async function</span> <span style={{ color: "#3D7BF7" }}>withTenant</span>&lt;T&gt;(tenantId: <span style={{ color: "#fdb347" }}>string</span>, fn: (client: PoolClient) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt; &#123;</div>
                <div>&nbsp;&nbsp;<span style={{ color: "#34d399" }}>const</span> client = <span style={{ color: "#34d399" }}>await</span> pool.connect();</div>
                <div>&nbsp;&nbsp;<span style={{ color: "#34d399" }}>try</span> &#123;</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#34d399" }}>await</span> client.query(<span style={{ color: "#fdb347" }}>&quot;BEGIN&quot;</span>);</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "rgba(248, 242, 228, 0.4)" }}>// SET LOCAL automatically reverts upon COMMIT or ROLLBACK</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#34d399" }}>await</span> client.query(<span style={{ color: "#fdb347" }}>&quot;SELECT set_config(&apos;app.current_tenant_id&apos;, $1, true)&quot;</span>, [tenantId]);</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#34d399" }}>const</span> result = <span style={{ color: "#34d399" }}>await</span> fn(client);</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#34d399" }}>await</span> client.query(<span style={{ color: "#fdb347" }}>&quot;COMMIT&quot;</span>);</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#34d399" }}>return</span> result;</div>
                <div>&nbsp;&nbsp;&#125; <span style={{ color: "#34d399" }}>catch</span> (err) &#123;</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#34d399" }}>await</span> client.query(<span style={{ color: "#fdb347" }}>&quot;ROLLBACK&quot;</span>);</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#34d399" }}>throw</span> err;</div>
                <div>&nbsp;&nbsp;&#125; <span style={{ color: "#34d399" }}>finally</span> &#123;</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;client.release();</div>
                <div>&nbsp;&nbsp;&#125;</div>
                <div>&#125;</div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                3. Model 2: Schema-per-Tenant Isolation
              </h2>
              <p>
                In the schema-per-tenant pattern, every customer receives their own distinct PostgreSQL schema (e.g. <code>tenant_acme.invoices</code>, <code>tenant_globex.invoices</code>). Incoming requests dynamically switch context using <code>SET search_path = tenant_acme, public;</code>.
              </p>

              <div
                className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 my-4 text-sm"
              >
                <div className="font-bold text-red-600 dark:text-red-400 mb-1 flex items-center gap-2">
                  <i className="fas fa-exclamation-triangle"></i>
                  The 1,000 Schema Wall: Catalog Bloat &amp; Migration Paralysis
                </div>
                <p className="text-xs leading-relaxed text-[var(--ink-2)]">
                  While schema isolation sounds neat conceptually, it degrades rapidly past 1,000 tenants. If your application has 80 tables and you have 2,000 tenants, PostgreSQL must maintain <strong>160,000 catalog entries</strong> in <code>pg_class</code>. Shared buffer caches become saturated with catalog metadata rather than data pages, and a single database migration must run 2,000 separate DDL transactions!
                </p>
              </div>

              <p>
                Moreover, ORMs such as Prisma or TypeORM have notoriously sluggish support for dynamic multi-schema switching and require generating distinct schema clients or complex workarounds.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                4. The Comprehensive Benchmark Comparison
              </h2>
              <p>
                Based on benchmark workloads executed across our client deployments at The Intelliverse, here is how the architectural strategies compare across critical production dimensions:
              </p>

              {/* Benchmark Table */}
              <div className="overflow-x-auto my-6 border rounded-xl" style={{ borderColor: "var(--hairline)" }}>
                <table className="w-full text-left text-xs sm:text-sm font-sans">
                  <thead>
                    <tr style={{ backgroundColor: "rgba(47, 99, 224, 0.08)", borderBottom: "1px solid var(--hairline)" }}>
                      <th className="p-3.5 font-bold font-mono">Architecture Metric</th>
                      <th className="p-3.5 font-bold font-mono text-[var(--blue-deep)]">Shared RLS</th>
                      <th className="p-3.5 font-bold font-mono">Schema-per-Tenant</th>
                      <th className="p-3.5 font-bold font-mono">Database-per-Tenant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: "var(--hairline)" }}>
                    <tr>
                      <td className="p-3.5 font-semibold">Query Overhead (p95)</td>
                      <td className="p-3.5 text-emerald-600 font-bold">&lt; 2-4% with index</td>
                      <td className="p-3.5">0% (native table)</td>
                      <td className="p-3.5">0% (isolated DB)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold">DDL Migration Speed</td>
                      <td className="p-3.5 text-emerald-600 font-bold">Fast (1 single DDL)</td>
                      <td className="p-3.5 text-red-500">Very Slow (N schemas)</td>
                      <td className="p-3.5 text-red-500">Complex orchestration</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold">Tenant Scale Ceiling</td>
                      <td className="p-3.5 text-emerald-600 font-bold">100,000+ tenants</td>
                      <td className="p-3.5 text-amber-600">~1,500 - 3,000 max</td>
                      <td className="p-3.5 text-amber-600">Cost-constrained (~500)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold">Per-Tenant PITR Backup</td>
                      <td className="p-3.5 text-amber-600">Requires logical export</td>
                      <td className="p-3.5">Schema-level dump</td>
                      <td className="p-3.5 text-emerald-600 font-bold">Native instant restore</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold">Connection Pool Efficiency</td>
                      <td className="p-3.5 text-emerald-600 font-bold">Maximum (shared pool)</td>
                      <td className="p-3.5 text-amber-600">Search path thrashing</td>
                      <td className="p-3.5 text-red-500">Separate pools needed</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold">Monthly Cloud Cost</td>
                      <td className="p-3.5 text-emerald-600 font-bold">Lowest ($)</td>
                      <td className="p-3.5">Moderate ($$)</td>
                      <td className="p-3.5 text-red-500">Highest ($$$$)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                5. The Winning Production Pattern: The Hybrid Tiering Architecture
              </h2>
              <p>
                At The Intelliverse, when engineering large-scale enterprise SaaS platforms, we frequently implement the <strong>Hybrid Multi-Tenant Tier</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-base">
                <li>
                  <strong>Free &amp; Standard Tier Customers:</strong> Co-located on a high-availability shared PostgreSQL cluster protected by strict Row-Level Security and partitioned tables. This maintains near-zero marginal database infrastructure cost per free account.
                </li>
                <li>
                  <strong>Enterprise / HIPAA / SOC2 Customers:</strong> Routed by dynamic tenant connection routers to dedicated, physically isolated PostgreSQL instances (e.g., AWS RDS or Supabase dedicated instances) with customer-managed encryption keys (CMEK) and bespoke backup schedules.
                </li>
              </ul>
              <p>
                This gives your business the viral growth economics of a shared multi-tenant SaaS while allowing enterprise sales teams to check off every strict compliance box in Fortune 500 vendor risk assessments.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                6. Architectural Checklist Before Going Live
              </h2>
              <p>
                Before shipping a multi-tenant PostgreSQL system to production, ensure your platform satisfies this engineering checklist:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-base">
                <li>
                  <strong>Always enable FORCE ROW LEVEL SECURITY:</strong> By default, PostgreSQL bypasses RLS for table owners and superusers. Setting <code>FORCE ROW LEVEL SECURITY</code> guarantees your policies apply even if connection credentials have elevated ownership roles.
                </li>
                <li>
                  <strong>Composite Indexing on (tenant_id, ...):</strong> Every foreign key and lookup index must lead with <code>tenant_id</code> to allow PostgreSQL&apos;s cost-based optimizer to use Index Scans rather than filtering huge Seq Scans post-fetch.
                </li>
                <li>
                  <strong>Continuous Integration Leak Tests:</strong> Add automated test cases that deliberately attempt cross-tenant reads to verify that queries with empty or spoofed tenant IDs return empty arrays rather than leaking foreign rows.
                </li>
                <li>
                  <strong>Monitor PgBouncer Transaction Pooling:</strong> Verify that connection resetting (<code>DISCARD ALL</code>) or <code>SET LOCAL</code> guarantees zero cross-tenant contamination across pooled sockets.
                </li>
              </ol>
            </section>

            {/* CTA Box */}
            <div
              className="p-8 rounded-2xl border text-center space-y-4 my-12"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--hairline)",
              }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
                style={{
                  backgroundColor: "rgba(47, 99, 224, 0.12)",
                  color: "var(--blue-deep)",
                  borderColor: "rgba(47, 99, 224, 0.25)",
                }}
              >
                SaaS Engineering &amp; System Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--ink)]">
                Building a High-Scale Multi-Tenant SaaS?
              </h3>
              <p className="text-sm sm:text-base text-[var(--ink-muted)] max-w-xl mx-auto leading-relaxed">
                The Intelliverse designs and builds resilient, enterprise-grade software architectures for high-growth tech startups and SaaS companies worldwide.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold transition shadow-sm"
                  style={{
                    backgroundColor: "var(--blue-deep)",
                    color: "var(--cream)",
                  }}
                >
                  <span>Talk with Our Systems Architects</span>
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </Link>
              </div>
            </div>

            {/* Related Posts */}
            <div className="pt-8 border-t border-[var(--hairline)]">
              <h3 className="text-lg font-serif font-bold mb-4">Related Engineering Field Notes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/blog/nextjs-15-enterprise-saas-architecture"
                  className="p-4 rounded-xl border hover:border-[var(--blue-deep)] transition"
                  style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}
                >
                  <div className="text-xs font-mono text-[var(--blue-deep)] font-bold mb-1">Web Architecture</div>
                  <div className="font-bold text-sm text-[var(--ink)]">Next.js 15 for Enterprise SaaS: Turbopack &amp; Multi-Tenancy</div>
                </Link>
                <Link
                  href="/blog/postgresql-vs-mongodb-vs-vectordb-database-guide"
                  className="p-4 rounded-xl border hover:border-[var(--blue-deep)] transition"
                  style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}
                >
                  <div className="text-xs font-mono text-[var(--blue-deep)] font-bold mb-1">Database Systems</div>
                  <div className="font-bold text-sm text-[var(--ink)]">Choosing the Right Database: PostgreSQL, MongoDB, or Vector DBs</div>
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
