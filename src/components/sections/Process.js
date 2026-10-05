"use client";

import { useState, useRef } from "react";

/**
 * Process section — Execution Flywheel on --night (#0B1530)
 * ─ Night background with cream text
 * ─ Horizontal scrollable flywheel cards with snap points
 * ─ Interactive stage selectors, scroll navigation arrows, and live progress
 */
const STAGES = [
  {
    num: "01",
    title: "Discover & Strategize",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      </svg>
    ),
    description:
      "We dive deep into your domain: clarifying system requirements, mapping edge cases, and auditing architectural bottlenecks before a single line of code is committed.",
    deliverables: ["Architectural Spec Document", "Technical Scoping Brief", "Milestone Roadmap"],
  },
  {
    num: "02",
    title: "Architect & Engineer",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    description:
      "Design systems and backend architectures progress in synchronized sprints. We build with production rigor — continuous integration, automated unit testing, and weekly playable demos.",
    deliverables: ["Modular Component Architecture", "REST / GraphQL API Endpoints", "Weekly Interactive Demos"],
  },
  {
    num: "03",
    title: "Deploy & Secure",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      </svg>
    ),
    description:
      "Automated CI/CD pipelines configure zero-downtime rolling deploys, distributed edge caching, TLS security hardening, and database redundancy.",
    deliverables: ["Zero-Downtime Deployment", "Multi-Region Cloud Edge", "Security Posture Verification"],
  },
  {
    num: "04",
    title: "Scale & Optimize",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    description:
      "Post-launch telemetry monitors Core Web Vitals, API latencies, and usage spikes. Features iterate against actual user data with proactive scaling.",
    deliverables: ["24/7 Telemetry & Health Auditing", "Performance Profiling", "Feature Scaling Sprints"],
  },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const firstCard = container.children[0];
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 24; // width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActive(Math.min(Math.max(index, 0), STAGES.length - 1));
  };

  const scrollToStage = (index) => {
    setActive(index);
    if (!scrollContainerRef.current) return;
    const targetCard = scrollContainerRef.current.children[index];
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  };

  const scrollPrev = () => {
    const prevIndex = Math.max(0, active - 1);
    scrollToStage(prevIndex);
  };

  const scrollNext = () => {
    const nextIndex = Math.min(STAGES.length - 1, active + 1);
    scrollToStage(nextIndex);
  };

  return (
    <section
      id="process"
      data-theme="night"
      style={{
        backgroundColor: "var(--night)", // #0B1530 deep navy
        color: "var(--cream)",
        borderTop: "1px solid rgba(228, 218, 195, 0.12)",
        paddingTop: "clamp(4.5rem, 8vh, 6.5rem)",
        paddingBottom: "clamp(5rem, 9vh, 7rem)",
        position: "relative",
      }}
    >
      <div className="container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Label and Section Title */}
        <div
          style={{
            marginBottom: "2.75rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--orange)",
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              Execution Flywheel
            </span>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "var(--cream)",
                margin: 0,
              }}
            >
              From discovery to scale.
            </h2>
          </div>

          {/* Interactive Controls: Stage Tabs + Arrow Scroll Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {STAGES.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() => scrollToStage(i)}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    padding: "0.45rem 0.85rem",
                    borderRadius: "999px",
                    border: `1px solid ${active === i ? "var(--orange)" : "rgba(228, 218, 195, 0.15)"}`,
                    backgroundColor: active === i ? "rgba(253, 179, 71, 0.15)" : "transparent",
                    color: active === i ? "var(--orange)" : "rgba(248, 242, 228, 0.6)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Stage {s.num}
                </button>
              ))}
            </div>

            {/* Left / Right Scroll Buttons */}
            <div style={{ display: "flex", gap: "0.4rem", marginLeft: "0.25rem" }}>
              <button
                onClick={scrollPrev}
                disabled={active === 0}
                aria-label="Previous Stage"
                data-cursor="link"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(228, 218, 195, 0.2)",
                  backgroundColor: "rgba(18, 30, 68, 0.6)",
                  color: active === 0 ? "rgba(248, 242, 228, 0.2)" : "var(--cream)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: active === 0 ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                ←
              </button>
              <button
                onClick={scrollNext}
                disabled={active === STAGES.length - 1}
                aria-label="Next Stage"
                data-cursor="link"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(228, 218, 195, 0.2)",
                  backgroundColor: "rgba(18, 30, 68, 0.6)",
                  color: active === STAGES.length - 1 ? "rgba(248, 242, 228, 0.2)" : "var(--cream)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: active === STAGES.length - 1 ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Track with Snap Points */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          data-cursor="drag"
          data-cursor-label="Drag"
          className="flywheel-scroll-track"
          style={{
            display: "flex",
            gap: "1.5rem",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            paddingBottom: "1.5rem",
            paddingTop: "0.5rem",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {STAGES.map((s, idx) => {
            const isCurrent = active === idx;
            return (
              <div
                key={s.num}
                style={{
                  flex: "0 0 clamp(320px, 78vw, 480px)",
                  scrollSnapAlign: "start",
                  backgroundColor: isCurrent ? "rgba(18, 30, 68, 0.85)" : "rgba(18, 30, 68, 0.45)",
                  border: `1px solid ${isCurrent ? "rgba(253, 179, 71, 0.45)" : "rgba(228, 218, 195, 0.12)"}`,
                  borderRadius: "16px",
                  padding: "clamp(1.75rem, 4vw, 2.5rem)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: isCurrent ? "0 14px 34px -10px rgba(253, 179, 71, 0.12)" : "none",
                  transition: "all 0.3s ease",
                  minHeight: "440px",
                }}
              >
                {/* Stage Header: Number, Icon & Label */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1.5rem",
                      borderBottom: "1px solid rgba(228, 218, 195, 0.08)",
                      paddingBottom: "1rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                      <span
                        style={{
                          fontFamily: "'Instrument Serif', Georgia, serif",
                          fontSize: "clamp(3rem, 5vw, 4.5rem)",
                          lineHeight: 0.9,
                          color: isCurrent ? "var(--orange)" : "rgba(253, 179, 71, 0.65)",
                        }}
                      >
                        {s.num}
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "rgba(248, 242, 228, 0.45)",
                        }}
                      >
                        / 04
                      </span>
                    </div>

                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        backgroundColor: isCurrent ? "rgba(61, 123, 247, 0.22)" : "rgba(61, 123, 247, 0.1)",
                        border: `1px solid ${isCurrent ? "rgba(61, 123, 247, 0.45)" : "rgba(61, 123, 247, 0.2)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {s.icon}
                    </div>
                  </div>

                  {/* Stage Title */}
                  <h3
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: "clamp(1.75rem, 3.2vw, 2.25rem)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                      color: "var(--cream)",
                      margin: "0 0 1rem 0",
                    }}
                  >
                    {s.title}
                  </h3>

                  {/* Stage Description */}
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: "rgba(248, 242, 228, 0.72)",
                      marginBottom: "1.75rem",
                    }}
                  >
                    {s.description}
                  </p>
                </div>

                {/* Stage Deliverables */}
                <div style={{ borderTop: "1px solid rgba(228, 218, 195, 0.08)", paddingTop: "1.25rem" }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.625rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--orange)",
                      display: "block",
                      marginBottom: "0.65rem",
                      fontWeight: 600,
                    }}
                  >
                    Stage Deliverables
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {s.deliverables.map((d) => (
                      <span
                        key={d}
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.6875rem",
                          padding: "0.35rem 0.65rem",
                          borderRadius: "6px",
                          backgroundColor: "rgba(248, 242, 228, 0.06)",
                          border: "1px solid rgba(228, 218, 195, 0.1)",
                          color: "var(--cream)",
                        }}
                      >
                        ✓ {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Progress Bar & Horizontal Scroll Hint */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                color: "var(--blue)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Stage {STAGES[active].num} of 04
            </span>
            <div
              style={{
                width: "120px",
                height: "3px",
                backgroundColor: "rgba(228, 218, 195, 0.12)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${((active + 1) / STAGES.length) * 100}%`,
                  backgroundColor: "var(--blue)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.08em",
              color: "rgba(248, 242, 228, 0.4)",
            }}
          >
            ← Scroll or swipe horizontally to explore all stages →
          </span>
        </div>
      </div>
    </section>
  );
}
