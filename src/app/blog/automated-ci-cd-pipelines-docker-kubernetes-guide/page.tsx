import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Automated CI/CD Pipelines with Docker, GitHub Actions, and Kubernetes: Production Blueprint | The Intelliverse",
  description:
    "Step-by-step production blueprint for zero-downtime rolling deployments, immutable container registries, Helm charts, and automated testing pipelines.",
  keywords: [
    "automated CI CD pipelines Docker Kubernetes",
    "GitHub Actions deployment blueprint",
    "DevOps engineering company Ahmedabad",
    "Kubernetes rolling deployment zero downtime",
    "Docker multi stage build Next.js",
    "The Intelliverse DevOps",
    "Dhruvil Thummar",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/automated-ci-cd-pipelines-docker-kubernetes-guide`,
  },
  openGraph: {
    title: "Automated CI/CD Pipelines with Docker, GitHub Actions, and Kubernetes: Production Blueprint",
    description: "Production-ready DevOps automation guide from The Intelliverse.",
    url: `${siteConfig.url}/blog/automated-ci-cd-pipelines-docker-kubernetes-guide`,
    siteName: siteConfig.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automated CI/CD Pipelines with Docker, GitHub Actions, and Kubernetes: Production Blueprint",
    description: "DevOps engineering best practices by The Intelliverse.",
    images: ["/og-image.png"],
  },
};

export default function AutomatedCicdPipelinesPost() {
  const postUrl = `${siteConfig.url}/blog/automated-ci-cd-pipelines-docker-kubernetes-guide`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    headline: "Automated CI/CD Pipelines with Docker, GitHub Actions, and Kubernetes: Production Blueprint",
    description:
      "Step-by-step production blueprint for zero-downtime rolling deployments, immutable container registries, Helm charts, and automated testing pipelines.",
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
            { name: "Automated CI/CD Pipelines (K8s & Docker)", url: "/blog/automated-ci-cd-pipelines-docker-kubernetes-guide" },
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
                DevOps & Cloud
              </span>
              <span className="text-sm font-mono text-[var(--ink-muted)]">October 31, 2026 · 10 min read</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[var(--ink)] leading-tight">
              Automated CI/CD Pipelines with Docker, GitHub Actions, and Kubernetes: Production Blueprint
            </h1>

            <p className="text-lg sm:text-xl text-[var(--ink-muted)] leading-relaxed font-sans">
              From git commit to zero-downtime rolling cluster deployment: how to design robust, secure, and lightning-fast deployment pipelines for modern web applications.
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
              Manual deployments via SSH and FTP are relics of the past. Today, reliable engineering teams rely on automated continuous integration and continuous deployment (CI/CD) pipelines to test, containerize, scan, and deploy code in minutes.
            </p>

            <h2 className="text-2xl font-bold font-serif mt-8 mb-4">1. Multi-Stage Dockerfile Optimization for Next.js</h2>
            <p>
              Standard Docker builds often produce bloated 1.5GB container images containing unnecessary dev dependencies and build caches. Multi-stage Docker builds reduce image size to under 120MB, speeding up cluster scale-out events:
            </p>
            <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--hairline)] font-mono text-sm overflow-x-auto my-4">
              <pre>{`# Multi-Stage Production Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]`}</pre>
            </div>

            <h2 className="text-2xl font-bold font-serif mt-8 mb-4">2. GitHub Actions Workflow Architecture</h2>
            <p>
              A robust GitHub Actions pipeline runs stages sequentially with failure gates:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Typecheck & Lint:</strong> Fast execution of <code>tsc --noEmit</code> and ESLint.</li>
              <li><strong>Unit & Integration Tests:</strong> Jest and Playwright e2e suites run against containerized test databases.</li>
              <li><strong>Vulnerability Scanning:</strong> Trivy scans Docker layers for CVEs before push.</li>
              <li><strong>Immutable Artifact Publish:</strong> Tagging images with git SHA rather than mutable <code>latest</code> tags.</li>
            </ul>

            <h2 className="text-2xl font-bold font-serif mt-8 mb-4">3. Zero-Downtime Rolling Updates on Kubernetes</h2>
            <p>
              By defining Kubernetes <code>readinessProbe</code> and <code>livenessProbe</code> with careful <code>maxSurge: 25%</code> and <code>maxUnavailable: 0</code> parameters, clusters can transition users seamlessly to new versions without dropping a single active WebSocket or HTTP connection.
            </p>
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-[var(--surface)] border border-[var(--hairline)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold font-serif mb-2">Automate your DevOps and deployment infrastructure</h3>
              <p className="text-sm text-[var(--ink-muted)]">The Intelliverse DevOps team builds enterprise CI/CD pipelines and cloud clusters.</p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full font-mono text-sm font-bold text-white bg-[var(--blue-deep)] hover:opacity-90 transition shrink-0"
            >
              Consult DevOps Engineers →
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
