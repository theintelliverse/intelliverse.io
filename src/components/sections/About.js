"use client";

import { useEffect, useRef, useState } from "react";

/**
 * About / Manifesto section
 * ─ Editorial two-column layout on Cream background
 * ─ Pull-quote in --ink with orange underline on scroll for highlighted words
 * ─ Body text max-width 65ch
 */
export default function About({ data }) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      data-theme="cream"
      ref={sectionRef}
      className="section-gap"
      style={{
        borderTop: "1px solid var(--hairline)",
        backgroundColor: "var(--cream)",
        color: "var(--ink)",
      }}
    >
      <div className="container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Section label */}
        <div
          style={{
            marginBottom: "3.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            className="section-label"
            style={{ color: "var(--muted)" }}
          >
            Studio Manifesto
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            FIG. 01 · EST. 2024 · AHMEDABAD
          </span>
        </div>

        {/* Two-column editorial layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(2.5rem, 5vw, 5rem)",
          }}
          className="lg:grid-cols-2"
        >
          {/* Left: Big pull-quote */}
          <div>
            <blockquote
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                margin: 0,
                fontWeight: 400,
              }}
            >
              {data?.pullQuote ? (
                <span>{data.pullQuote}</span>
              ) : (
                <>
                  We treat every project as a{" "}
                  <span
                    style={{
                      textDecoration: "underline",
                      textDecorationColor: inView ? "var(--orange)" : "transparent",
                      textUnderlineOffset: "8px",
                      textDecorationThickness: "3px",
                      transition: "text-decoration-color 0.8s ease-in-out",
                    }}
                  >
                    genuine collaboration
                  </span>
                  , not an anonymous transaction. Real problems deserve{" "}
                  <span
                    style={{
                      fontStyle: "italic",
                      color: "var(--blue-deep)",
                    }}
                  >
                    architectural precision
                  </span>
                  .
                </>
              )}
            </blockquote>
          </div>

          {/* Right: Paragraphs + mission (max-width 65ch) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", maxWidth: "65ch" }}>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--muted)", margin: 0 }}>
              {data?.p1 || (
                <>
                  The Intelliverse is an engineering-first software and web architecture company based in Ahmedabad,
                  Gujarat. We build resilient digital platforms, custom SaaS architectures, and high-performance
                  applications for businesses that refuse to settle for off-the-shelf templates.
                </>
              )}
            </p>

            <p style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--muted)", margin: 0 }}>
              {data?.modelsText || (
                <>
                  We engineer with{" "}
                  <strong style={{ color: "var(--ink)" }}>Next.js, Cloud Edge Architecture, and AI Automations</strong>{" "}
                  - not as buzzwords, but as dependable tools built from first principles. A project begins with clear discovery, matures into an architectural blueprint, and ships as software people rely on.
                </>
              )}
            </p>

            {/* Mission block */}
            <div
              style={{
                borderLeft: "3px solid var(--blue-deep)",
                paddingLeft: "1.5rem",
                marginTop: "0.5rem",
                backgroundColor: "var(--surface)",
                padding: "1.25rem 1.5rem",
                borderRadius: "0 8px 8px 0",
                border: "1px solid var(--hairline)",
                borderLeftWidth: "4px",
                borderLeftColor: "var(--blue-deep)",
              }}
            >
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--blue-deep)",
                  marginBottom: "0.4rem",
                }}
              >
                Our Mission
              </p>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: "var(--ink)", margin: 0 }}>
                {data?.mission || "To solve problems worth solving with teams who care about excellence - building the kind of software that remains fast, secure, and maintainable long after deployment."}
              </p>
            </div>

            {/* Capability chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
              {[
                "Web Architecture",
                "Custom SaaS",
                "Cloud & DevOps",
                "Applied AI",
                "Headless Commerce",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6875rem",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "999px",
                    background: "var(--surface)",
                    border: "1px solid var(--hairline)",
                    color: "var(--ink)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div
          style={{
            borderTop: "1px solid var(--hairline)",
            marginTop: "4.5rem",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--muted)" }}>
            Ahmedabad Studio Team
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Ahmedabad · Gujarat · India
          </span>
        </div>
      </div>
    </section>
  );
}
