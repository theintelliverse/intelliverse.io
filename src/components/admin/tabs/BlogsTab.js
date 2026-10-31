"use client";

import { useState, useMemo } from "react";
import { BLOG_POSTS, BlogPostMeta } from "@/content/blog";

export default function BlogsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedSlug, setCopiedSlug] = useState(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(BLOG_POSTS.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, []);

  // Filter blog posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCat =
        selectedCategory === "all" || post.category === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleCopyLink = (e, slug) => {
    e.stopPropagation();
    const url = `${window.location.origin}/blog/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const totalReadingMins = useMemo(() => {
    return BLOG_POSTS.reduce((sum, p) => {
      const match = p.readTime.match(/\d+/);
      return sum + (match ? parseInt(match[0], 10) : 8);
    }, 0);
  }, []);

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* ── Page Header ────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(61,123,247,0.8)]"
              style={{ backgroundColor: "var(--blue)" }}
            />
            <h2
              className="text-xl md:text-2xl font-bold tracking-tight font-mono uppercase"
              style={{ color: "var(--cream)" }}
            >
              Engineering Journal &amp; Blogs
            </h2>
          </div>
          <p
            className="text-xs md:text-sm mt-1 font-mono"
            style={{ color: "rgba(248, 242, 228, 0.65)" }}
          >
            Manage technical articles, project case studies (Appointory &amp; Vrix), SEO indices, and thought leadership.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition flex items-center justify-center gap-1.5 cursor-pointer"
            style={{
              backgroundColor: "rgba(47, 99, 224, 0.15)",
              color: "var(--blue)",
              border: "1px solid rgba(61, 123, 247, 0.3)",
              textDecoration: "none",
            }}
          >
            <i className="fas fa-external-link-alt text-[10px]"></i>
            <span>View Public /blog ↗</span>
          </a>
        </div>
      </div>

      {/* ── Metric Strip ────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        {[
          {
            label: "Total Articles",
            value: BLOG_POSTS.length,
            icon: "fa-newspaper",
            color: "var(--blue)",
          },
          {
            label: "Project Case Studies",
            value: BLOG_POSTS.filter((p) => p.category.includes("Case Study")).length,
            icon: "fa-layer-group",
            color: "var(--orange)",
          },
          {
            label: "Categories",
            value: categories.length - 1,
            icon: "fa-tags",
            color: "#34d399",
          },
          {
            label: "Total Read Time",
            value: `${totalReadingMins} mins`,
            icon: "fa-clock",
            color: "var(--purple, #9b72d8)",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="admin-console-card p-4 md:p-5 flex items-center gap-3.5"
          >
            <div
              className="p-3 rounded-xl shrink-0"
              style={{
                backgroundColor: `color-mix(in srgb, ${stat.color} 15%, transparent)`,
                border: `1px solid color-mix(in srgb, ${stat.color} 30%, transparent)`,
              }}
            >
              <i className={`fas ${stat.icon} text-base`} style={{ color: stat.color }} />
            </div>
            <div>
              <div
                className="text-xl md:text-2xl font-black font-mono leading-none tracking-tight"
                style={{ color: "var(--cream)" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[9px] font-mono uppercase tracking-wider mt-1"
                style={{ color: "rgba(248, 242, 228, 0.5)" }}
              >
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar & Filter ───────────────────────────── */}
      <div className="admin-console-card overflow-hidden">
        <div
          className="p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{
            borderBottom: "1px solid rgba(228, 218, 195, 0.1)",
            backgroundColor: "rgba(11, 21, 48, 0.6)",
          }}
        >
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <i
              className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-xs"
              style={{ color: "rgba(248, 242, 228, 0.35)" }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search title, slug, author, category..."
              className="admin-input-field pl-9 pr-8 text-xs font-mono w-full"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer"
                style={{ color: "rgba(248, 242, 228, 0.5)" }}
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-mono"
              style={{ color: "rgba(248, 242, 228, 0.5)" }}
            >
              Showing <strong>{filteredPosts.length}</strong> of{" "}
              <strong>{BLOG_POSTS.length}</strong> publications
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div
          className="px-4 md:px-5 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none"
          style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.08)" }}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count =
              cat === "all"
                ? BLOG_POSTS.length
                : BLOG_POSTS.filter((p) => p.category === cat).length;
            const isCaseStudy = cat.includes("Case Study");

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className="px-3 py-1.5 rounded-xl text-[10px] font-bold font-mono transition shrink-0 cursor-pointer flex items-center gap-1.5"
                style={{
                  backgroundColor: isActive
                    ? isCaseStudy
                      ? "rgba(253, 179, 71, 0.2)"
                      : "var(--blue-deep)"
                    : "transparent",
                  color: isActive
                    ? isCaseStudy
                      ? "var(--orange)"
                      : "var(--cream)"
                    : "rgba(248, 242, 228, 0.6)",
                  border: isActive
                    ? isCaseStudy
                      ? "1px solid rgba(253, 179, 71, 0.4)"
                      : "1px solid rgba(61, 123, 247, 0.4)"
                    : "1px solid transparent",
                }}
              >
                <span>{cat === "all" ? "All Categories" : cat}</span>
                <span
                  className="px-1.5 py-0.2 rounded-full text-[8px] font-black"
                  style={{ backgroundColor: "rgba(248, 242, 228, 0.1)" }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Articles List ────────────────────────────── */}
        <div className="p-4 md:p-6 space-y-3.5 max-h-[65vh] overflow-y-auto scrollbar-none">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <i
                className="fas fa-book-open text-4xl mb-3 block"
                style={{ color: "rgba(248, 242, 228, 0.12)" }}
              />
              <p
                className="text-xs font-mono"
                style={{ color: "rgba(248, 242, 228, 0.45)" }}
              >
                No publications found matching your search criteria.
              </p>
            </div>
          ) : (
            filteredPosts.map((post, index) => {
              const isCopied = copiedSlug === post.slug;
              const isCaseStudy = post.category.includes("Case Study");

              return (
                <div
                  key={post.slug}
                  className="p-4 md:p-5 rounded-2xl border transition-all duration-300 group"
                  style={{
                    backgroundColor: isCaseStudy
                      ? "rgba(18, 30, 68, 0.9)"
                      : "rgba(11, 21, 48, 0.75)",
                    borderColor: isCaseStudy
                      ? "rgba(253, 179, 71, 0.3)"
                      : "rgba(228, 218, 195, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = isCaseStudy
                      ? "var(--orange)"
                      : "var(--blue)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 24px rgba(0,0,0,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isCaseStudy
                      ? "rgba(253, 179, 71, 0.3)"
                      : "rgba(228, 218, 195, 0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    {/* Left: Article Details */}
                    <div className="space-y-2 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor: isCaseStudy
                              ? "rgba(253, 179, 71, 0.15)"
                              : "rgba(47, 99, 224, 0.15)",
                            color: isCaseStudy ? "var(--orange)" : "var(--blue)",
                            border: `1px solid ${
                              isCaseStudy
                                ? "rgba(253, 179, 71, 0.3)"
                                : "rgba(61, 123, 247, 0.3)"
                            }`,
                          }}
                        >
                          {post.category}
                        </span>

                        <span
                          className="text-[10px] font-mono"
                          style={{ color: "rgba(248, 242, 228, 0.45)" }}
                        >
                          {post.readTime}
                        </span>

                        <span
                          className="text-[10px] font-mono"
                          style={{ color: "rgba(248, 242, 228, 0.3)" }}
                        >
                          · Published {post.publishedDate}
                        </span>
                      </div>

                      <h3
                        className="text-sm md:text-base font-bold font-serif leading-snug group-hover:text-[var(--cream)] transition-colors"
                        style={{ color: "var(--cream)" }}
                      >
                        {post.title}
                      </h3>

                      <p
                        className="text-xs font-sans leading-relaxed line-clamp-2"
                        style={{ color: "rgba(248, 242, 228, 0.65)" }}
                      >
                        {post.description}
                      </p>

                      <div className="flex items-center gap-3 pt-1 text-[11px] font-mono">
                        <span style={{ color: "var(--orange)" }}>
                          ✍ {post.author} ({post.authorRole})
                        </span>
                        <span style={{ color: "rgba(248, 242, 228, 0.3)" }}>·</span>
                        <span
                          className="truncate max-w-[260px]"
                          style={{ color: "rgba(248, 242, 228, 0.4)" }}
                        >
                          slug: /{post.slug}
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                      <button
                        type="button"
                        onClick={(e) => handleCopyLink(e, post.slug)}
                        className="px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold transition flex items-center gap-1.5 cursor-pointer"
                        style={{
                          backgroundColor: isCopied
                            ? "rgba(16, 185, 129, 0.2)"
                            : "rgba(248, 242, 228, 0.06)",
                          color: isCopied ? "#34d399" : "rgba(248, 242, 228, 0.8)",
                          border: `1px solid ${
                            isCopied
                              ? "rgba(16, 185, 129, 0.4)"
                              : "rgba(228, 218, 195, 0.12)"
                          }`,
                        }}
                      >
                        <i
                          className={`fas ${
                            isCopied ? "fa-check" : "fa-link"
                          } text-[9px]`}
                        />
                        <span>{isCopied ? "Link Copied" : "Copy URL"}</span>
                      </button>

                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl text-[10px] font-mono font-bold transition flex items-center gap-1.5"
                        style={{
                          backgroundColor: "var(--blue-deep)",
                          color: "var(--cream)",
                          border: "1px solid rgba(228, 218, 195, 0.2)",
                          textDecoration: "none",
                        }}
                      >
                        <i className="fas fa-external-link-alt text-[9px]" />
                        <span>Preview ↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
