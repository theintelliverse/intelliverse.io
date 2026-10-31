import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Case Study: How We Engineered Vrix Jewellery — Sub-Second Headless Storefront with Next.js & Shopify | The Intelliverse",
  description:
    "How The Intelliverse built vrixjewels.com: Next.js 15 headless architecture, dynamic multi-currency geolocation checkout, WebGL luxury diamond visualizers, and 99 Core Web Vitals in Ahmedabad, India.",
  keywords: [
    "Vrix Jewellery case study",
    "headless Shopify Next.js",
    "luxury e-commerce web architecture",
    "Next.js headless storefront",
    "Shopify Storefront API",
    "The Intelliverse",
    "Dhruvil Thummar",
    "Ahmedabad web development",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/vrix-jewels-headless-shopify-nextjs-case-study`,
  },
  openGraph: {
    title: "Case Study: How We Engineered Vrix Jewellery — Sub-Second Headless Storefront with Next.js & Shopify",
    description: "Engineering sub-second luxury e-commerce with Next.js 15, Shopify Storefront API, and multi-currency edge routing.",
    url: `${siteConfig.url}/blog/vrix-jewels-headless-shopify-nextjs-case-study`,
    siteName: siteConfig.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Study: How We Engineered Vrix Jewellery — Sub-Second Headless Storefront with Next.js & Shopify",
    description: "An architectural deep-dive into building a headless luxury storefront that delivers 3.4x overseas checkout growth.",
    images: ["/opengraph-image"],
  },
};

export default function VrixCaseStudyBlogPost() {
  const postUrl = `${siteConfig.url}/blog/vrix-jewels-headless-shopify-nextjs-case-study`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    headline: "Case Study: How We Engineered Vrix Jewellery — Sub-Second Headless Storefront with Next.js & Shopify",
    description:
      "How The Intelliverse built vrixjewels.com: Next.js headless architecture, dynamic multi-currency geolocation checkout, WebGL luxury visualizers, and 99 Core Web Vitals.",
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
            { name: "Vrix Jewellery Architecture Case Study", url: postUrl },
          ]}
        />

        {/* Post Hero */}
        <section
          className="pt-10 pb-12 md:py-16 px-4 sm:px-6 container-site"
          style={{ maxWidth: "900px", margin: "0 auto" }}
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
                Project Deep-Dive · Headless E-Commerce
              </span>
              <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
                · 11 min read · Live Platform:{" "}
                <a
                  href="https://vrixjewels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-[var(--blue-deep)]"
                >
                  vrixjewels.com ↗
                </a>
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight leading-tight"
              style={{ color: "var(--ink)" }}
            >
              How We Engineered Vrix Jewellery: Building a Sub-Second Headless Storefront with Next.js &amp; Shopify
            </h1>

            <p className="text-base sm:text-lg leading-relaxed font-sans" style={{ color: "var(--muted)" }}>
              Selling five-figure luxury diamond rings online requires flawless tactile design and zero latency. When standard Shopify themes bloated mobile page loads past 4.2 seconds, The Intelliverse decoupled the frontend into a custom Next.js 15 edge architecture that delivered 99 Core Web Vitals and 3.4x overseas conversions.
            </p>

            {/* Author bar */}
            <div className="pt-4 flex items-center justify-between flex-wrap gap-4 border-t" style={{ borderColor: "var(--hairline)" }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs"
                  style={{ backgroundColor: "var(--blue-deep)", color: "var(--cream)" }}
                >
                  DT
                </div>
                <div>
                  <div className="font-mono text-xs font-bold" style={{ color: "var(--ink)" }}>
                    Dhruvil Thummar
                  </div>
                  <div className="text-[11px] font-mono" style={{ color: "var(--muted)" }}>
                    Co-founder &amp; CTO · Head of Architecture on Vrix
                  </div>
                </div>
              </div>
              <div className="text-xs font-mono" style={{ color: "var(--muted)" }}>
                Published October 31, 2026 · Verified Field Notes
              </div>
            </div>
          </div>
        </section>

        {/* Project KPI Highlights */}
        <section className="px-4 sm:px-6 container-site pb-12" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {[
              { label: "Mobile LCP", val: "740ms", note: "Sub-second load" },
              { label: "Conversion Bump", val: "+ 42%", note: "Launch day lift" },
              { label: "Overseas Sales", val: "3.4x", note: "Multi-currency checkout" },
              { label: "PageSpeed Score", val: "99 / 100", note: "Core Web Vitals" },
            ].map((kpi, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--hairline)",
                }}
              >
                <div className="text-xl sm:text-2xl font-mono font-black" style={{ color: "var(--blue-deep)" }}>
                  {kpi.val}
                </div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider mt-1" style={{ color: "var(--ink)" }}>
                  {kpi.label}
                </div>
                <div className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>
                  {kpi.note}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Post Content */}
        <article className="pb-16 px-4 sm:px-6 container-site space-y-10" style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Executive Overview */}
          <div
            className="p-6 rounded-2xl border space-y-3"
            style={{
              backgroundColor: "rgba(47, 99, 224, 0.05)",
              borderColor: "rgba(47, 99, 224, 0.2)",
            }}
          >
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-blue-900">
              The Architecture at a Glance
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
              <strong>Vrix Jewellery</strong> is an international direct-to-consumer luxury brand selling certified lab-grown and natural diamond collections across the US, UK, UAE, and India. The platform pairs a decoupled <strong>Next.js 15 React 19</strong> frontend deployed across global edge networks with a robust <strong>Shopify Plus Storefront GraphQL</strong> commerce backend.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold tracking-tight" style={{ color: "var(--ink)" }}>
              1. The Bottleneck: Why Standard Shopify Themes Fail High-Jewellery
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--ink-2)" }}>
              Luxury e-commerce has uniquely punishing performance constraints:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
              <li>
                <strong>Image weight vs clarity:</strong> High-ticket jewellery shoppers demand micro-macro zoom on diamond cut, clarity, and pavé prong settings. Standard Liquid themes loaded unoptimized 4K JPEGs, bringing total page weights over 8MB.
              </li>
              <li>
                <strong>Global currency friction:</strong> When an American buyer in New York saw INR prices converting with awkward decimals or unexpected checkout surcharges, cart abandonment soared to 68%.
              </li>
              <li>
                <strong>App bloat:</strong> A typical Shopify theme with 14 third-party apps injected over 60 external JavaScript tags, delaying Largest Contentful Paint (LCP) to 4.2 seconds on mobile devices.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold tracking-tight" style={{ color: "var(--ink)" }}>
              2. The Headless Solution: Zero-Bloat Edge Architecture
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--ink-2)" }}>
              We rebuilt Vrix from first principles using a fully decoupled headless architecture:
            </p>

            <div
              className="p-5 rounded-2xl border font-mono text-xs overflow-x-auto"
              style={{
                backgroundColor: "rgba(11, 21, 48, 0.95)",
                color: "#e4dac3",
                borderColor: "rgba(228, 218, 195, 0.15)",
              }}
            >
              <div style={{ color: "rgba(248, 242, 228, 0.45)" }}>// GraphQL Storefront Edge Query (Next.js 15 Server Component)</div>
              <span style={{ color: "#34d399" }}>export async function</span> <span style={{ color: "#60a5fa" }}>getProductWithLocalizedPricing</span>(handle, countryCode) &#123;<br />
              &nbsp;&nbsp;<span style={{ color: "#fdb347" }}>const</span> query = <span style={{ color: "#34d399" }}>`</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;query GetProduct($handle: String!, $country: CountryCode) @inContext(country: $country) &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;product(handle: $handle) &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priceRange &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minVariantPrice &#123; amount currencyCode &#125;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;images(first: 8) &#123; nodes &#123; url altText &#125; &#125;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
              &nbsp;&nbsp;<span style={{ color: "#34d399" }}>`</span>;<br />
              &nbsp;&nbsp;<span style={{ color: "#34d399" }}>return</span> shopifyFetch(&#123; query, variables: &#123; handle, country: countryCode &#125;, cache: <span style={{ color: "#fdb347" }}>&quot;force-cache&quot;</span> &#125;);<br />
              &#125;
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
              By evaluating the visitor&apos;s Cloudflare IP geolocation headers at the edge, product pages stream pre-rendered HTML in under 40 milliseconds with the buyer&apos;s native currency (USD, GBP, EUR, AED, or INR) already populated.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold tracking-tight" style={{ color: "var(--ink)" }}>
              3. Micro-Interaction Design &amp; WebGL Visualizers
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--ink-2)" }}>
              To replicate the tactile experience of walking into a luxury Mayfair or Fifth Avenue diamond salon, we engineered bespoke interaction details:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl border bg-white/70">
                <span className="font-bold text-blue-600 block mb-1">Instant Gemstone Filter:</span>
                <span>Zero-latency facet sorting (Round, Oval, Emerald, Radiant) powered by in-memory client indexes.</span>
              </div>
              <div className="p-3.5 rounded-xl border bg-white/70">
                <span className="font-bold text-purple-600 block mb-1">Adaptive WebP/AVIF:</span>
                <span>Dynamically serves the exact viewport resolution, keeping individual image weights under 42KB.</span>
              </div>
              <div className="p-3.5 rounded-xl border bg-white/70">
                <span className="font-bold text-emerald-600 block mb-1">Frictionless 1-Click Pay:</span>
                <span>Apple Pay &amp; Google Pay integrated directly into the product drawer, bypassing cart pages.</span>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold tracking-tight" style={{ color: "var(--ink)" }}>
              4. Commercial Results
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--ink-2)" }}>
              The performance engineering directly translated into business returns:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
              <li><strong>+42% launch conversion rate:</strong> Sub-second responsiveness created instant buyer trust for high-ticket transactions.</li>
              <li><strong>3.4x overseas revenue:</strong> US and Middle East orders grew substantially once localized currency pricing and native payments launched.</li>
              <li><strong>740ms Largest Contentful Paint (LCP):</strong> Scored a near-perfect 99 on Google Lighthouse Mobile audit.</li>
            </ul>
          </section>

          {/* Project CTA Banner */}
          <div
            className="p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{
              backgroundColor: "rgba(11, 21, 48, 0.95)",
              color: "var(--cream)",
              borderColor: "rgba(228, 218, 195, 0.16)",
            }}
          >
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-500/30">
                Live Production Case Study
              </span>
              <h3 className="text-xl md:text-2xl font-serif font-bold tracking-tight">
                Ready to engineer a sub-second headless e-commerce experience?
              </h3>
              <p className="text-xs md:text-sm font-sans text-white/70">
                The Intelliverse designs bespoke Next.js headless storefronts that drive measurable commercial conversion. Let&apos;s build together.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://vrixjewels.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl text-xs font-mono font-bold transition text-center"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "var(--cream)",
                  border: "1px solid rgba(228, 218, 195, 0.2)",
                  textDecoration: "none",
                }}
              >
                Visit VrixJewels.com ↗
              </a>
              <Link
                href="/work/vrix"
                className="px-5 py-3 rounded-xl text-xs font-mono font-bold transition text-center"
                style={{
                  backgroundColor: "var(--blue-deep)",
                  color: "var(--cream)",
                  boxShadow: "0 4px 18px rgba(47, 99, 224, 0.4)",
                  textDecoration: "none",
                }}
              >
                View Work Spec →
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
