import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Zero-Trust Security for Modern Web Applications: Auth, Secrets, and API Hardening | The Intelliverse",
  description:
    "Defending modern cloud web applications against credential stuffing, token forgery, SSRF, and data leaks using zero-trust network boundaries and cryptographic verification.",
  keywords: [
    "zero trust security web apps",
    "web application security 2026",
    "API security hardening",
    "OAuth2 JWT security best practices",
    "SSRF prevention cloud",
    "The Intelliverse cybersecurity",
    "Dhruvil Thummar",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/zero-trust-security-architecture-for-modern-web-apps`,
  },
  openGraph: {
    title: "Zero-Trust Security for Modern Web Applications: Auth, Secrets, and API Hardening",
    description: "Enterprise web application hardening blueprint from The Intelliverse SecOps.",
    url: `${siteConfig.url}/blog/zero-trust-security-architecture-for-modern-web-apps`,
    siteName: siteConfig.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero-Trust Security for Modern Web Applications: Auth, Secrets, and API Hardening",
    description: "Zero-trust defensive web engineering by The Intelliverse.",
    images: ["/og-image.png"],
  },
};

export default function ZeroTrustSecurityPost() {
  const postUrl = `${siteConfig.url}/blog/zero-trust-security-architecture-for-modern-web-apps`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    headline: "Zero-Trust Security for Modern Web Applications: Auth, Secrets, and API Hardening",
    description:
      "Defending modern cloud web applications against credential stuffing, token forgery, SSRF, and data leaks using zero-trust network boundaries and cryptographic verification.",
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
            { name: "Zero-Trust Security for Web Apps", url: "/blog/zero-trust-security-architecture-for-modern-web-apps" },
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
                Cybersecurity & SecOps
              </span>
              <span className="text-sm font-mono text-[var(--ink-muted)]">October 31, 2026 · 11 min read</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[var(--ink)] leading-tight">
              Zero-Trust Security for Modern Web Applications: Auth, Secrets, and API Hardening
            </h1>

            <p className="text-lg sm:text-xl text-[var(--ink-muted)] leading-relaxed font-sans">
              Why perimeter defenses are dead: practical security patterns for securing user tokens, enforcing cryptographically signed API boundaries, and protecting internal cloud networks.
            </p>

            <div className="flex items-center gap-4 pt-4 border-t border-[var(--hairline)]">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--blue-deep)] flex items-center justify-center font-bold text-white text-base">
                DT
              </div>
              <div>
                <div className="font-bold text-[var(--ink)]">Dhruvil Thummar</div>
                <div className="text-xs font-mono text-[var(--ink-muted)]">Co-founder & CTO · The Intelliverse</div>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-[var(--ink)] space-y-8 leading-relaxed">
            <p>
              In traditional web engineering, teams relied on a &quot;castle-and-moat&quot; paradigm: once a request made it past Cloudflare or an API Gateway, internal services communicated without verification over unencrypted VPC networks. In 2026, with sophisticated credential stuffing bots, compromised NPM dependencies, and Server-Side Request Forgery (SSRF) exploits, that model is a liability.
            </p>

            <h2 className="text-2xl font-bold font-serif mt-8 mb-4">1. Core Tenet: Never Trust, Always Verify</h2>
            <p>
              Zero-Trust architecture assumes that malicious actors are already present inside the network. Every individual request must carry cryptographic proof of who is asking, what permissions they hold, and whether the payload has been tampered with.
            </p>

            <h2 className="text-2xl font-bold font-serif mt-8 mb-4">2. Token Security: Eliminating LocalStorage Vulnerabilities</h2>
            <p>
              Storing JWT access tokens in <code>window.localStorage</code> exposes user accounts to Cross-Site Scripting (XSS) extraction from any rogue third-party tracking pixel or CDN script.
            </p>
            <p>
              At The Intelliverse, we implement short-lived access tokens (15-minute expiry) and store refresh tokens exclusively in <code>HttpOnly, Secure, SameSite=Strict</code> cookies:
            </p>
            <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--hairline)] font-mono text-sm overflow-x-auto my-4">
              <pre>{`// Next.js Route Handler Secure Cookie Example
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { sessionToken } = await authService.authenticate(req);

  cookies().set('session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return Response.json({ success: true });
}`}</pre>
            </div>

            <h2 className="text-2xl font-bold font-serif mt-8 mb-4">3. Mutual TLS (mTLS) for Microservices</h2>
            <p>
              Internal service-to-service communications must never rely solely on private VPC IPs. By enforcing mutual TLS with rotating certificates, every microservice verifies the cryptographic identity of the caller before handling requests.
            </p>

            <h2 className="text-2xl font-bold font-serif mt-8 mb-4">4. Defending Against SSRF in AI and Webhook Services</h2>
            <p>
              Whenever your application accepts an external URL (such as webhooks, file imports, or AI ingestion pipelines), you must validate that the target IP does not resolve to local AWS metadata endpoints (e.g. <code>169.254.169.254</code>) or internal private subnets (<code>10.0.0.0/8</code>, <code>192.168.0.0/16</code>).
            </p>
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-[var(--surface)] border border-[var(--hairline)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold font-serif mb-2">Want to audit or harden your cloud architecture?</h3>
              <p className="text-sm text-[var(--ink-muted)]">Engage The Intelliverse security engineers for vulnerability assessments and zero-trust implementation.</p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full font-mono text-sm font-bold text-white bg-[var(--blue-deep)] hover:opacity-90 transition shrink-0"
            >
              Request Security Audit →
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
