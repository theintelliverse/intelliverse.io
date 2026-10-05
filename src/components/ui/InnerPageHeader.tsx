import Link from "next/link";

export default function InnerPageHeader() {
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{
        backgroundColor: "rgba(248, 242, 228, 0.92)",
        borderColor: "var(--hairline)",
      }}
    >
      <div
        className="container-site flex items-center justify-between py-3.5 px-4 sm:px-6"
        style={{ maxWidth: "1440px", margin: "0 auto" }}
      >
        {/* Brand Link */}
        <Link href="/" data-cursor="link" className="flex items-center gap-3 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/the-intelliverse-logo.jpg"
            alt="The Intelliverse"
            width={32}
            height={32}
            className="rounded object-cover border"
            style={{ borderColor: "var(--hairline)" }}
          />
          <div className="flex flex-col">
            <span
              className="text-xs font-bold uppercase tracking-widest font-mono"
              style={{ color: "var(--ink)" }}
            >
              The Intelliverse
            </span>
            <span
              className="text-[10px] uppercase tracking-wider font-mono"
              style={{ color: "var(--muted)" }}
            >
              Ahmedabad · India
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 text-xs font-mono"
        >
          <Link
            href="/services/web-development"
            data-cursor="link"
            className="hover:text-[var(--blue-deep)] transition uppercase tracking-wider"
            style={{ color: "var(--ink)" }}
          >
            Web Architecture
          </Link>
          <Link
            href="/services/software-engineering"
            data-cursor="link"
            className="hover:text-[var(--blue-deep)] transition uppercase tracking-wider"
            style={{ color: "var(--ink)" }}
          >
            SaaS &amp; Software
          </Link>
          <Link
            href="/software-development-company-ahmedabad"
            data-cursor="link"
            className="hover:text-[var(--blue-deep)] transition uppercase tracking-wider"
            style={{ color: "var(--ink)" }}
          >
            Ahmedabad
          </Link>
          <Link
            href="/work/appointory"
            data-cursor="link"
            className="hover:text-[var(--blue-deep)] transition uppercase tracking-wider"
            style={{ color: "var(--ink)" }}
          >
            Case Studies
          </Link>
          <Link
            href="/blog"
            data-cursor="link"
            className="hover:text-[var(--blue-deep)] transition uppercase tracking-wider"
            style={{ color: "var(--ink)" }}
          >
            Blog
          </Link>
          <Link
            href="/about"
            data-cursor="link"
            className="hover:text-[var(--blue-deep)] transition uppercase tracking-wider"
            style={{ color: "var(--ink)" }}
          >
            About
          </Link>
          <Link
            href="/faq"
            data-cursor="link"
            className="hover:text-[var(--blue-deep)] transition uppercase tracking-wider"
            style={{ color: "var(--ink)" }}
          >
            FAQ
          </Link>
        </nav>

        {/* CTA */}
        <div>
          <Link
            href="/contact"
            data-cursor="link"
            data-cursor-magnetic
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition"
            style={{
              backgroundColor: "var(--blue-deep)",
              color: "var(--cream)",
            }}
          >
            <span>Start a Project</span>
            <i className="fas fa-arrow-right text-[10px]"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}
