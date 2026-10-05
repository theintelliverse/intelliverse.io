import { Metadata } from "next";
import Link from "next/link";
import InnerPageHeader from "@/components/ui/InnerPageHeader";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";

const config = seoConfig.about;

export const metadata: Metadata = {
  title: "About Our Studio & Founders | The Intelliverse, Ahmedabad",
  description:
    "Learn about The Intelliverse: an independent software, web and IT services company founded in Ahmedabad, Gujarat, India by Dhruvil Thummar, Rudra Kankotiya, and Jal Anghan.",
  keywords: [
    "About The Intelliverse",
    "The Intelliverse",
    "The Intelliverse Ahmedabad",
    "TheIntelliverse",
    "Intelliverse Ahmedabad",
    "software company Ahmedabad",
    "Dhruvil Thummar",
    "Rudra Kankotiya",
    "Jal Anghan",
  ],
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: "About Our Studio & Founders | The Intelliverse, Ahmedabad",
    description:
      "Learn about The Intelliverse: an independent software, web and IT services company founded in Ahmedabad, Gujarat, India by Dhruvil Thummar, Rudra Kankotiya, and Jal Anghan.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Our Studio & Founders | The Intelliverse, Ahmedabad",
    description:
      "Learn about The Intelliverse: an independent software, web and IT services company founded in Ahmedabad, Gujarat, India by Dhruvil Thummar, Rudra Kankotiya, and Jal Anghan.",
    images: ["/opengraph-image"],
  },
};

export default function AboutPage() {
  const personSchemas = siteConfig.founders.map((f) => {
    const sameAsList = [
      f.linkedin,
      f.portfolio,
      f.instagram,
      f.github,
      f.youtube,
      f.facebook,
      f.twitter,
      ...(f.customLinks || []).map((cl) => cl.url),
    ].filter(Boolean) as string[];

    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: f.name,
      jobTitle: f.role,
      description: f.tagline,
      worksFor: {
        "@id": siteConfig.organizationId,
      },
      sameAs: sameAsList.length > 0 ? (sameAsList.length === 1 ? sameAsList[0] : sameAsList) : undefined,
    };
  });

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteConfig.url}/about/#webpage`,
    name: "About Our Studio & Founders | The Intelliverse, Ahmedabad",
    description: config.description,
    mainEntity: {
      "@id": siteConfig.organizationId,
    },
  };

  return (
    <>
      <JsonLd schema={[aboutSchema, ...personSchemas]} />
      <InnerPageHeader />

      <main id="main-content" data-theme="cream" className="min-h-screen" style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}>
        <Breadcrumbs items={[{ name: "About", url: config.canonicalPath }]} />

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
              Studio Manifesto &amp; Origins
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight font-serif"
              style={{ color: "var(--ink)", lineHeight: 1.1 }}
            >
              {config.h1}
            </h1>

            {/* AEO Answer-First Summary */}
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--hairline)" }}>
              <p className="text-base sm:text-lg leading-relaxed font-sans" style={{ color: "var(--ink)" }}>
                <strong>Direct Summary: </strong>
                {config.heroAnswer}
              </p>
              <p className="text-xs font-mono mt-3" style={{ color: "var(--muted)" }}>
                Updated October 2026 · Ahmedabad, Gujarat, India
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy & Manifesto */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="container-site space-y-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-3" style={{ color: "var(--ink)" }}>
                Why do we treat software like an engineering craft?
              </h2>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                Most agencies treat software like factory assembly lines: rush an under-tested template out the door, hand it over, and leave the client to face security vulnerabilities and crushing tech debt. We started The Intelliverse to do the opposite. We write clean, typed, modular code that your future engineering hires will actually appreciate reading.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <span className="text-xs font-mono text-[var(--blue-deep)] font-bold">Principle 01</span>
                <h4 className="font-bold text-base mt-1 mb-2">Zero Speculative Bloat</h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  We don&apos;t install twenty random third-party npm packages when clean native JavaScript or standard web APIs do the job better and faster.
                </p>
              </div>

              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <span className="text-xs font-mono text-[var(--orange)] font-bold">Principle 02</span>
                <h4 className="font-bold text-base mt-1 mb-2">Architectural Longevity</h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  We design data models and system boundaries so your team can scale from 100 to 100,000 active users without rewriting the foundational code.
                </p>
              </div>

              <div className="p-6 rounded-xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--cream)" }}>
                <span className="text-xs font-mono text-[var(--blue-deep)] font-bold">Principle 03</span>
                <h4 className="font-bold text-base mt-1 mb-2">Founder-to-Founder Delivery</h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  You work directly with the architects who actually build and deploy your software. No junior outsourcing, no non-technical sales intermediaries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Founders */}
        <section className="py-12 px-4 sm:px-6 border-t" style={{ borderColor: "var(--hairline)" }}>
          <div className="container-site space-y-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-2" style={{ color: "var(--ink)" }}>
                Founding Leadership Team
              </h2>
              <p className="text-sm text-[var(--muted)]">
                The technical and strategic directors driving every architecture engagement at The Intelliverse.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {siteConfig.founders.map((founder, idx) => (
                <div key={idx} className="p-6 rounded-2xl border" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={founder.image || "/founder_dhruvil.jpg"}
                      alt={founder.name}
                      width={52}
                      height={52}
                      className="rounded-xl object-cover border"
                      style={{ borderColor: "var(--hairline)" }}
                    />
                    <div>
                      <h4 className="font-bold text-base text-[var(--ink)]">{founder.name}</h4>
                      <p className="text-xs font-mono text-[var(--blue-deep)]">{founder.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">
                    {founder.tagline}
                  </p>
                  {/* Multi-links */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t" style={{ borderColor: "var(--hairline)" }}>
                    {founder.portfolio && (
                      <a
                        href={founder.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${founder.name} Portfolio`}
                        aria-label={`${founder.name} Portfolio`}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-[var(--blue-deep)] border hover:bg-[var(--blue-deep)] hover:text-white transition"
                        style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}
                      >
                        <i className="fas fa-globe text-[11px]"></i>
                      </a>
                    )}
                    {founder.linkedin && (
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${founder.name} LinkedIn`}
                        aria-label={`${founder.name} LinkedIn`}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-[var(--blue-deep)] border hover:bg-[var(--blue-deep)] hover:text-white transition"
                        style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}
                      >
                        <i className="fab fa-linkedin-in text-[11px]"></i>
                      </a>
                    )}
                    {founder.instagram && (
                      <a
                        href={founder.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${founder.name} Instagram`}
                        aria-label={`${founder.name} Instagram`}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-[var(--blue-deep)] border hover:bg-[var(--blue-deep)] hover:text-white transition"
                        style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}
                      >
                        <i className="fab fa-instagram text-[11px]"></i>
                      </a>
                    )}
                    {founder.github && (
                      <a
                        href={founder.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${founder.name} GitHub`}
                        aria-label={`${founder.name} GitHub`}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-[var(--blue-deep)] border hover:bg-[var(--blue-deep)] hover:text-white transition"
                        style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}
                      >
                        <i className="fab fa-github text-[11px]"></i>
                      </a>
                    )}
                    {founder.youtube && (
                      <a
                        href={founder.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${founder.name} YouTube`}
                        aria-label={`${founder.name} YouTube`}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-[var(--blue-deep)] border hover:bg-[var(--blue-deep)] hover:text-white transition"
                        style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}
                      >
                        <i className="fab fa-youtube text-[11px]"></i>
                      </a>
                    )}
                    {founder.facebook && (
                      <a
                        href={founder.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${founder.name} Facebook`}
                        aria-label={`${founder.name} Facebook`}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-[var(--blue-deep)] border hover:bg-[var(--blue-deep)] hover:text-white transition"
                        style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}
                      >
                        <i className="fab fa-facebook-f text-[11px]"></i>
                      </a>
                    )}
                    {founder.twitter && (
                      <a
                        href={founder.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${founder.name} X / Twitter`}
                        aria-label={`${founder.name} X / Twitter`}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-[var(--blue-deep)] border hover:bg-[var(--blue-deep)] hover:text-white transition"
                        style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}
                      >
                        <i className="fab fa-x-twitter text-[11px]"></i>
                      </a>
                    )}
                    {(founder.customLinks || []).map((cl, clIdx) => (
                      <a
                        key={clIdx}
                        href={cl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={cl.name || "Link"}
                        aria-label={`${founder.name} - ${cl.name || "Link"}`}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-[var(--blue-deep)] border hover:bg-[var(--blue-deep)] hover:text-white transition"
                        style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}
                      >
                        <i className={`${cl.icon || "fas fa-link"} text-[10px]`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 text-center border-t" style={{ borderColor: "var(--hairline)", backgroundColor: "var(--surface)" }}>
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif">Want to collaborate with an engineering-first studio?</h2>
            <p className="text-sm text-[var(--muted)]">Reach out directly to schedule a technical architecture discussion.</p>
            <div className="pt-2">
              <Link
                href="/#contact"
                data-cursor="link"
                data-cursor-magnetic
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold font-mono transition"
                style={{ backgroundColor: "var(--blue-deep)", color: "var(--cream)" }}
              >
                <span>Initiate Contact</span>
                <i className="fas fa-arrow-right text-[10px]"></i>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
