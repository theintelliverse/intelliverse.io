import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Next.js 15 for Enterprise SaaS: Server Components, Turbopack & Multi-Tenancy | The Intelliverse",
  description:
    "An architectural deep-dive by The Intelliverse CTO on engineering production SaaS platforms with Next.js 15, React 19 Server Components, and edge routing in Ahmedabad, India.",
  keywords: [
    "Next.js 15 SaaS architecture",
    "Next.js 15 enterprise",
    "React 19 Server Components SaaS",
    "Next.js multi-tenancy",
    "The Intelliverse",
    "software development company Ahmedabad",
    "Next.js agency India",
    "Dhruvil Thummar",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/nextjs-15-enterprise-saas-architecture`,
  },
  openGraph: {
    title: "Next.js 15 for Enterprise SaaS: Server Components, Turbopack & Multi-Tenancy",
    description: "An architectural guide to building high-scale multi-tenant SaaS products with Next.js 15.",
    url: `${siteConfig.url}/blog/nextjs-15-enterprise-saas-architecture`,
    siteName: siteConfig.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js 15 for Enterprise SaaS: Server Components, Turbopack & Multi-Tenancy",
    description: "Engineering multi-tenant SaaS architectures from first principles with Next.js 15.",
    images: ["/og-image.png"],
  },
};

export default function Nextjs15EnterpriseSaasPost() {
  const postUrl = `${siteConfig.url}/blog/nextjs-15-enterprise-saas-architecture`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    headline: "Next.js 15 for Enterprise SaaS: Server Components, Turbopack & Multi-Tenancy",
    description:
      "An architectural deep-dive by The Intelliverse CTO on engineering production SaaS platforms with Next.js 15, React 19 Server Components, and edge routing.",
    datePublished: "2026-10-31T00:00:00Z",
    dateModified: "2026-10-31T00:00:00Z",
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

  return (
    <>
      <JsonLd schema={articleSchema} />
      <InnerPageHeader />

      <main id="main-content" className="min-h-screen" data-theme="cream" style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}>
        <Breadcrumbs
          items={[
            { name: "Blog", url: "/blog" },
            { name: "Next.js 15 Enterprise SaaS Architecture", url: "/blog/nextjs-15-enterprise-saas-architecture" },
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
                Web Architecture
              </span>
              <span className="text-sm font-mono text-[var(--ink-muted)]">October 31, 2026 · 11 min read</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-[var(--ink)]">
              Next.js 15 for Enterprise SaaS: Server Components, Turbopack &amp; Multi-Tenancy
            </h1>

            <p className="text-lg md:text-xl text-[var(--ink-muted)] leading-relaxed font-sans">
              Why modern engineering studios choose Next.js 15 Server Components and Turbopack over legacy Single Page Apps (SPAs) for multi-tenant SaaS architecture.
            </p>

            <div className="flex items-center gap-4 pt-4 border-t border-[rgba(26,24,20,0.1)]">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white"
                style={{ backgroundColor: "var(--blue-deep)" }}
              >
                DT
              </div>
              <div>
                <div className="font-bold text-sm text-[var(--ink)]">Dhruvil Thummar</div>
                <div className="text-xs font-mono text-[var(--ink-muted)]">Co-founder &amp; CTO, The Intelliverse</div>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-[var(--ink)] space-y-8 leading-relaxed font-sans">
            <section className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--ink)] mt-8">
                The Architectural Shift in Modern SaaS
              </h2>
              <p>
                For over a decade, the default architecture for web applications was client-heavy Single Page Applications (SPAs) built with Vite, Create React App, or raw webpack bundles. While SPAs made internal state transitions snappy, they introduced massive architectural debt: giant JavaScript bundle payloads, sluggish First Contentful Paint (FCP) on mobile networks, and complex client-side caching waterfalls.
              </p>
              <p>
                With <strong>Next.js 15 and React 19</strong>, the paradigm has decisively shifted to <em>hybrid streaming Server Components</em>. At The Intelliverse, we build all core client platforms on Next.js 15 App Router because it allows us to stream data directly from distributed databases to the client without exposing internal API endpoints or shipping unnecessary bundle weight.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--ink)] mt-8">
                1. Multi-Tenant Domain Routing at the Edge
              </h2>
              <p>
                In an enterprise B2B SaaS platform, every organization expects its own custom subdomain (e.g., <code>acme.platform.com</code>) or white-labeled custom apex domain (<code>portal.acme.com</code>).
              </p>
              <p>
                Next.js 15 edge middleware combined with Cloudflare DNS allows us to resolve tenants in sub-10 milliseconds without a database roundtrip on every static asset:
              </p>
              <div className="p-4 rounded-xl bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto">
                <pre>{`// Edge Middleware: Zero-latency Tenant Resolution
export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const tenant = resolveTenantSlug(hostname);
  
  // Rewrite directly into the multi-tenant app slice
  return NextResponse.rewrite(
    new URL(\`/tenants/\${tenant}\${request.nextUrl.pathname}\`, request.url)
  );
}`}</pre>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--ink)] mt-8">
                2. Server Actions &amp; Zero-API-Boilerplate Data Mutations
              </h2>
              <p>
                Traditional SPA setups require maintaining duplicate TypeScript interfaces across client REST endpoints, Swagger docs, and backend controllers. Next.js 15 Server Actions run securely on the server with direct database connection pooling, cryptographic CSRF verification, and automated optimistic client revalidation.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--ink)] mt-8">
                3. Sub-Second Core Web Vitals Guarantees
              </h2>
              <p>
                Search engines and enterprise users evaluate digital systems by interaction fluidity. By adopting React 19 concurrent features and Turbopack bundler pipelines, our Next.js platforms consistently achieve:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Largest Contentful Paint (LCP):</strong> &lt; 1.2s across global 4G mobile devices.</li>
                <li><strong>Cumulative Layout Shift (CLS):</strong> Exactly 0.000 via server-rendered skeleton boundaries.</li>
                <li><strong>Interaction to Next Paint (INP):</strong> &lt; 50ms via non-blocking concurrent transitions.</li>
              </ul>
            </section>

            <div className="p-8 rounded-2xl bg-[var(--blue-deep)] text-white space-y-4 my-12 shadow-xl">
              <h3 className="font-serif text-2xl md:text-3xl font-bold">
                Planning Your Next Enterprise SaaS Architecture?
              </h3>
              <p className="text-white/90 leading-relaxed">
                Schedule a 1-on-1 architecture review with Dhruvil Thummar and our senior systems team in Ahmedabad.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 rounded-xl font-bold text-sm bg-white text-[var(--blue-deep)] hover:bg-[#F8F2E4] transition-all shadow-md"
                >
                  Consult with Technical Leadership →
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
