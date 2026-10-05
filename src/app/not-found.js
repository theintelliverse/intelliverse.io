import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found",
  description: "The requested architectural route does not exist. Explore our core services and engineering case studies.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center p-6 text-center"
      data-theme="cream"
      style={{
        backgroundColor: "var(--cream)",
        color: "var(--ink)",
      }}
    >
      <div className="max-w-xl mx-auto space-y-6">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border"
          style={{
            backgroundColor: "rgba(61, 123, 247, 0.12)",
            color: "var(--blue-deep)",
            borderColor: "rgba(61, 123, 247, 0.25)",
          }}
        >
          404 · Route Not Found
        </span>

        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight font-serif"
          style={{ color: "var(--ink)" }}
        >
          This blueprint hasn&apos;t been drawn yet.
        </h1>

        <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          The page or asset you requested does not exist or has been relocated. Return to our primary engineering index or explore our core capabilities below.
        </p>

        {/* Helpful links grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left p-4 rounded-2xl border"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--hairline)",
          }}
        >
          <Link
            href="/"
            className="p-3 rounded-xl transition hover:bg-black/5 flex flex-col gap-1"
            data-cursor="link"
          >
            <span className="text-xs font-bold font-mono text-[var(--blue-deep)]">01 / Index</span>
            <span className="text-sm font-semibold text-[var(--ink)]">Home &amp; Overview</span>
          </Link>
          <Link
            href="/services/web-development"
            className="p-3 rounded-xl transition hover:bg-black/5 flex flex-col gap-1"
            data-cursor="link"
          >
            <span className="text-xs font-bold font-mono text-[var(--blue-deep)]">02 / Services</span>
            <span className="text-sm font-semibold text-[var(--ink)]">Web &amp; Next.js</span>
          </Link>
          <Link
            href="/services/software-engineering"
            className="p-3 rounded-xl transition hover:bg-black/5 flex flex-col gap-1"
            data-cursor="link"
          >
            <span className="text-xs font-bold font-mono text-[var(--blue-deep)]">03 / Software</span>
            <span className="text-sm font-semibold text-[var(--ink)]">Custom SaaS Engineering</span>
          </Link>
          <Link
            href="/software-development-company-ahmedabad"
            className="p-3 rounded-xl transition hover:bg-black/5 flex flex-col gap-1"
            data-cursor="link"
          >
            <span className="text-xs font-bold font-mono text-[var(--blue-deep)]">04 / Location</span>
            <span className="text-sm font-semibold text-[var(--ink)]">Ahmedabad Studio</span>
          </Link>
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition font-mono"
            style={{
              backgroundColor: "var(--blue-deep)",
              color: "var(--cream)",
            }}
            data-cursor="link"
            data-cursor-magnetic
          >
            <i className="fas fa-arrow-left"></i>
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
