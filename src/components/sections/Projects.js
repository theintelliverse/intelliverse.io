"use client";

import Link from "next/link";

const REAL_PROJECTS = [
  {
    num: "01",
    name: "Appointory",
    category: "Healthcare SaaS Platform",
    role: "Full-Stack Product Architecture & Real-Time Cloud Integration",
    stack: ["Next.js 15", "Node.js", "MongoDB", "Cloud Messaging API", "Tailwind CSS"],
    impact: "Clinic Queue Coordination · Real-Time Consultation Dispatch",
    link: "https://appointory.in",
    summary:
      "Automated clinic queue coordination with automated real-time dispatch triggers so patients know exact arrival times. Backed by an end-to-end encrypted health records locker.",
  },
  {
    num: "02",
    name: "Vrix Jewellery",
    category: "Luxury Jewellery E-Commerce",
    role: "Headless E-Commerce Architecture & AI Product Concierge",
    stack: ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Multi-Currency"],
    impact: "Fast Global Delivery · Multi-Currency Storefront",
    link: "https://vrix.in",
    summary:
      "International luxury storefront engineered for overseas buyers. Features geolocation-aware dynamic pricing, personal AI curation, and instantaneous catalog filtering.",
  },
];

export default function Projects({ data, caseStudies }) {
  const displayCaseStudies =
    caseStudies && caseStudies.length > 0
      ? caseStudies
      : data && data.length > 0
      ? data
      : REAL_PROJECTS;

  return (
    <section
      id="projects"
      data-theme="cream"
      className="sketchbook-section section-gap"
      style={{
        borderTop: "1px solid var(--hairline)",
        backgroundColor: "var(--paper)", // slightly warmer cream #F3EAD6
        color: "var(--ink)",
        position: "relative",
        paddingTop: "clamp(4.5rem, 8vh, 6.5rem)",
        paddingBottom: "clamp(4.5rem, 8vh, 6.5rem)",
      }}
      aria-label="Works & Sketchbook"
    >
      <div className="container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Section Header */}
        <div
          style={{
            marginBottom: "3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <span className="section-label" style={{ color: "var(--muted)" }}>
                Works &amp; Sketchbook
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6875rem",
                  color: "var(--blue-deep)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                / PRODUCTION ARCHITECTURES
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "var(--ink)",
                maxWidth: "46rem",
                margin: 0,
              }}
            >
              Tactile craft meets engineering precision.
            </h2>
            <p
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.65,
                color: "var(--muted)",
                maxWidth: "40rem",
                marginTop: "0.85rem",
                marginBottom: 0,
              }}
            >
              Browse our verified production software systems and engineering plates directly inside this tactile sketchbook. Turn the leaves, drag the loupe across the mockups, or inspect the specifications below.
            </p>
          </div>

          {/* Quick Action Link */}
          <div>
            <a
              href="/landing-pages/meng-to-sketchbook.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{
                fontSize: "0.75rem",
                padding: "0.6rem 1.4rem",
              }}
            >
              <span>Fullscreen Book ↗</span>
            </a>
          </div>
        </div>

        {/* ── Main Feature: Interactive Embedded Sketchbook ───────────────── */}
        <div
          data-cursor="drag"
          data-cursor-label="Flip"
          style={{
            position: "relative",
            marginBottom: "4.5rem",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--hairline)",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 14px 40px rgba(14,27,61,0.06)",
          }}
        >
          {/* Top HUD Frame Meta */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              padding: "0.85rem 1.5rem",
              backgroundColor: "rgba(14,27,61,0.03)",
              borderBottom: "1px solid var(--hairline)",
              fontSize: "0.75rem",
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--muted)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  boxShadow: "0 0 6px #10b981",
                }}
              />
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                Active Production Plates: Appointory &amp; Vrix
              </span>
            </div>
            <div className="sketchbook-meta-pills" style={{ display: "flex", gap: "1.25rem", color: "var(--muted)" }}>
              <span data-cursor="drag" data-cursor-label="Turn" style={{ cursor: "pointer" }}>Curled Page Turn Physics</span>
              <span data-cursor="loupe" data-cursor-label="Inspect" style={{ cursor: "pointer" }}>Blue-Deep Magnifier</span>
              <span data-cursor="pencil" data-cursor-label="Draft" style={{ cursor: "pointer" }}>Corner Tape Frames</span>
            </div>
          </div>

          {/* Embedded Sketchbook Frame */}
          <iframe
            src="/landing-pages/meng-to-sketchbook.html?embedded=true"
            title="The Intelliverse — Project Sketchbook"
            style={{
              width: "100%",
              height: "clamp(520px, 75vh, 760px)",
              border: "none",
              display: "block",
              backgroundColor: "transparent",
            }}
          />

          {/* Interaction hints */}
          <div
            style={{
              padding: "0.85rem 1.25rem",
              borderTop: "1px solid var(--hairline)",
              backgroundColor: "rgba(14,27,61,0.02)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.75rem",
              fontSize: "0.75rem",
              color: "var(--muted)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span>
              Tip: Drag the page edge to turn · Drag the glass magnifier across the plates.
            </span>
            <span style={{ color: "var(--blue-deep)", fontWeight: 600 }}>
              Verified Production Works
            </span>
          </div>
        </div>

        {/* ── Production Case Studies Deep-Dives ── */}
        {displayCaseStudies && displayCaseStudies.length > 0 && (
          <div style={{ borderTop: "1px solid var(--hairline)", paddingTop: "3.5rem" }}>
            <div
              style={{
                marginBottom: "2.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--blue-deep)",
                    display: "block",
                    marginBottom: "0.35rem",
                    fontWeight: 700,
                  }}
                >
                  Production Deployments
                </span>
                <h3
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: "clamp(2rem, 3.8vw, 2.75rem)",
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  Case Studies &amp; Engineering Specifications
                </h3>
              </div>
              <Link
                href="/#contact"
                className="btn-outline"
                style={{ fontSize: "0.75rem", padding: "0.55rem 1.3rem" }}
              >
                Commission a Project Like These →
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
                gap: "1.75rem",
              }}
            >
              {displayCaseStudies.map((p, idx) => {
                const category = p.category || p.type;
                const summary = p.summary || p.description;
                const stack =
                  p.stack && p.stack.length > 0
                    ? p.stack
                    : p.techTags && p.techTags.length > 0
                    ? p.techTags
                    : [];

                return (
                  <div
                    key={p.id || p._id || idx}
                    data-cursor="view"
                    data-cursor-label="View"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--hairline)",
                      borderRadius: "14px",
                      padding: "2rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "1.5rem",
                      boxShadow: "0 8px 24px rgba(14,27,61,0.04)",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                  >
                    <div>
                      {/* Plate Badge */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.85rem",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.75rem",
                            color: "var(--blue-deep)",
                            fontWeight: 700,
                          }}
                        >
                          PLATE 0{idx + 1}
                        </span>
                        {category && (
                           <span
                             style={{
                               fontSize: "0.6875rem",
                               fontFamily: "'JetBrains Mono', monospace",
                               padding: "0.25rem 0.6rem",
                               backgroundColor: "var(--cream)",
                               border: "1px solid var(--hairline)",
                               borderRadius: "999px",
                               color: "var(--muted)",
                               maxWidth: "160px",
                               overflow: "hidden",
                               textOverflow: "ellipsis",
                               whiteSpace: "nowrap",
                               display: "inline-block",
                             }}
                           >
                             {category}
                           </span>
                         )}
                      </div>

                      {/* Project Title */}
                      <h4
                        style={{
                          fontFamily: "'Instrument Serif', Georgia, serif",
                          fontSize: "2.1rem",
                          color: "var(--ink)",
                          marginBottom: "0.6rem",
                          lineHeight: 1.15,
                        }}
                      >
                        {p.name}
                      </h4>

                      {/* Summary */}
                      {summary && (
                        <p
                          style={{
                            fontSize: "0.9375rem",
                            lineHeight: 1.65,
                            color: "var(--muted)",
                            marginBottom: "1.25rem",
                          }}
                        >
                          {summary}
                        </p>
                      )}

                      {/* Impact Metric */}
                      {p.impact && (
                        <div
                          style={{
                            padding: "0.65rem 0.95rem",
                            backgroundColor: "rgba(61,123,247,0.07)",
                            borderLeft: "3px solid var(--blue-deep)",
                            borderRadius: "0 6px 6px 0",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.75rem",
                            color: "var(--ink)",
                            marginBottom: "1.25rem",
                          }}
                        >
                          <strong>Impact:</strong> {p.impact}
                        </div>
                      )}
                    </div>

                    {/* Tech Chips & Live Link Button */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                        paddingTop: "1.25rem",
                        borderTop: "1px solid var(--hairline)",
                      }}
                    >
                      {stack.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                          {stack.map((tech) => (
                            <span
                              key={tech}
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "0.6875rem",
                                padding: "0.25rem 0.6rem",
                                backgroundColor: "var(--cream)",
                                border: "1px solid var(--hairline)",
                                borderRadius: "4px",
                                color: "var(--ink)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {p.link && (
                         <a
                           href={p.link}
                           target="_blank"
                           rel="noopener noreferrer"
                           data-cursor="link"
                           data-cursor-magnetic
                           className="btn-primary"
                           style={{
                             fontSize: "0.6875rem",
                             padding: "0.45rem 1rem",
                           }}
                         >
                           <span>Visit Live Project ↗</span>
                         </a>
                       )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
