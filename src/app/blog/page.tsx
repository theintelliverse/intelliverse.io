import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";

const config = seoConfig.blog;

export const metadata: Metadata = {
  title: "Engineering Journal & Field Notes | The Intelliverse, Ahmedabad",
  description: config.description,
  keywords: config.keywords,
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: "Engineering Journal & Field Notes | The Intelliverse, Ahmedabad",
    description: config.description,
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Journal & Field Notes | The Intelliverse, Ahmedabad",
    description: config.description,
    images: ["/opengraph-image"],
  },
};

import { BLOG_POSTS } from "@/content/blog";
export { BLOG_POSTS };


export default function BlogIndexPage() {
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.url}${config.canonicalPath}/#blog`,
    name: config.title,
    description: config.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: `${post.publishedDate}T00:00:00Z`,
      dateModified: `${post.updatedDate}T00:00:00Z`,
      author: {
        "@type": "Person",
        name: post.author,
      },
    })),
  };

  return (
    <>
      <JsonLd schema={blogListSchema} />
      <InnerPageHeader />

      <main id="main-content" className="min-h-screen" data-theme="cream" style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}>
        <Breadcrumbs items={[{ name: "Blog", url: config.canonicalPath }]} />

        {/* Hero */}
        <section className="py-12 md:py-20 px-4 sm:px-6 container-site" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="space-y-6">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
              style={{
                backgroundColor: "rgba(47, 99, 224, 0.12)",
                color: "var(--blue-deep)",
                borderColor: "rgba(47, 99, 224, 0.25)",
              }}
            >
              Architectural Field Notes
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight font-serif"
              style={{ color: "var(--ink)", lineHeight: 1.1 }}
            >
              {config.h1}
            </h1>

            <p className="text-base sm:text-lg leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
              {config.heroAnswer}
            </p>
          </div>
        </section>

        {/* Post Grid */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="p-6 rounded-2xl border flex flex-col justify-between hover:border-[var(--blue-deep)] transition group"
                  style={{
                    borderColor: "var(--hairline)",
                    backgroundColor: "var(--cream)",
                  }}
                  data-cursor="view"
                  data-cursor-label="Read"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono" style={{ color: "var(--muted)" }}>
                      <span className="uppercase text-[var(--blue-deep)] font-bold">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-xl font-bold font-serif leading-snug group-hover:text-[var(--blue-deep)] transition">
                      <Link href={`/blog/${post.slug}`} className="block" data-cursor="link">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted)]">
                      {post.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t flex items-center justify-between text-xs font-mono" style={{ borderColor: "var(--hairline)", color: "var(--muted)" }}>
                    <span>By {post.author}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[var(--blue-deep)] font-bold group-hover:underline flex items-center gap-1"
                      data-cursor="link"
                    >
                      <span>Read Guide</span>
                      <i className="fas fa-arrow-right text-[10px]"></i>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
