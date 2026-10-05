"use client";

import Link from "next/link";

/**
 * Hero section — Clean Brand Blue & Cream Palette
 * ─ 5 flat drifting circles (bright blue big, indigo medium, orange, coral, small purple/pink dots) with multiply blend
 * ─ Headline "Innovation. Create. Grow." with clamp(56px, 12vw, 190px), tight tracking, mixed roman + italic accent word
 * ─ Tiny mono status line: "Ahmedabad, India / Taking new projects"
 * ─ Primary CTA: blue-deep button | Secondary: outlined ink
 */
export default function Hero({ data = null } = {}) {
  const headline = data?.headline || "Innovation. Create. Grow.";
  const subtitle = data?.subtitle || "Your one-stop solution for software development, web development, and IT services.";
  const status = data?.status || "Ahmedabad, India / Taking new projects";
  const pillarsText = data?.pillarsText || "Web Architecture · Cloud Infrastructure · SaaS · AI Workflows";
  const caseStudiesHighlight = data?.caseStudiesHighlight || "Appointory (Healthcare) & Vrix (Headless E-Commerce)";
  const studioLocation = data?.studioLocation || "Ahmedabad, Gujarat · Collaborating Worldwide";

  const headlineWords = headline.split(" ");
  const lastWord = headlineWords.length > 1 ? headlineWords.pop() : "";
  const mainWords = headlineWords.join(" ");

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-theme="cream"
      className="hero-section"
      aria-labelledby="hero-heading"
      style={{
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        paddingTop: "clamp(5rem, 12vh, 8.5rem)",
        paddingBottom: "clamp(4rem, 8vh, 6.5rem)",
        overflow: "hidden",
        backgroundColor: "var(--cream)",
        color: "var(--ink)",
      }}
    >
      {/* ── 5 Flat Drifting Circles with Multiply Blend ────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {/* 1. Largest Circle: Bright Blue (#3D7BF7) */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "2%",
            width: "clamp(340px, 44vw, 680px)",
            height: "clamp(340px, 44vw, 680px)",
            borderRadius: "50%",
            backgroundColor: "var(--blue)",
            opacity: 0.18,
            mixBlendMode: "multiply",
            transition: "transform 0.8s ease-out",
          }}
        />

        {/* 2. Medium Circle: Indigo (#5B3FD9) */}
        <div
          style={{
            position: "absolute",
            top: "42%",
            right: "24%",
            width: "clamp(180px, 25vw, 380px)",
            height: "clamp(180px, 25vw, 380px)",
            borderRadius: "50%",
            backgroundColor: "var(--indigo)",
            opacity: 0.14,
            mixBlendMode: "multiply",
          }}
        />

        {/* 3. Orange Circle: Warm Highlight (#FDB347) */}
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            left: "8%",
            width: "clamp(160px, 22vw, 320px)",
            height: "clamp(160px, 22vw, 320px)",
            borderRadius: "50%",
            backgroundColor: "var(--orange)",
            opacity: 0.22,
            mixBlendMode: "multiply",
          }}
        />

        {/* 4. Coral Circle: Accent (#FF6B7B) */}
        <div
          style={{
            position: "absolute",
            top: "16%",
            left: "28%",
            width: "clamp(120px, 16vw, 240px)",
            height: "clamp(120px, 16vw, 240px)",
            borderRadius: "50%",
            backgroundColor: "var(--coral)",
            opacity: 0.16,
            mixBlendMode: "multiply",
          }}
        />

        {/* 5. Small Purple / Pink Decorative Dot (#9B72D8 / #FF8FA0) */}
        <div
          style={{
            position: "absolute",
            bottom: "28%",
            right: "12%",
            width: "clamp(48px, 6vw, 84px)",
            height: "clamp(48px, 6vw, 84px)",
            borderRadius: "50%",
            backgroundColor: "var(--pink)",
            opacity: 0.28,
            mixBlendMode: "multiply",
          }}
        />
      </div>

      <div className="container-site relative z-10" style={{ maxWidth: "1440px", margin: "0 auto" }}>
        
        {/* Tiny Mono Status Line */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            marginBottom: "clamp(1.5rem, 3.5vh, 2.5rem)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6875rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 6px #10b981",
            }}
            aria-hidden="true"
          />
          <span style={{ fontWeight: 600, color: "var(--ink)" }}>Ahmedabad, India</span>
          <span style={{ color: "var(--hairline)" }}>/</span>
          <span>Taking new projects</span>
        </div>

        {/* Main Display Headline: Innovation. Create. Grow. */}
        <div style={{ overflow: "hidden", marginBottom: "clamp(1.25rem, 3vh, 2rem)" }}>
          <h1
            id="hero-heading"
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(56px, 12vw, 190px)",
              lineHeight: 0.94,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              margin: 0,
              fontWeight: 400,
            }}
          >
            Innovation. Create.{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--blue-deep)",
                fontWeight: 400,
              }}
            >
              Grow.
            </em>
          </h1>
        </div>

        {/* Subtitle & Value Proposition */}
        <p
          style={{
            fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)",
            color: "var(--muted)",
            maxWidth: "44rem",
            lineHeight: 1.65,
            marginBottom: "clamp(2rem, 4.5vh, 3.25rem)",
            fontFamily: "'Satoshi', 'Inter', system-ui, sans-serif",
          }}
        >
          <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
            The Intelliverse is a software, web and IT services company based in Ahmedabad, India.
          </strong>{" "}
          We engineer resilient custom SaaS platforms, high-speed Next.js web applications, and enterprise cloud infrastructure for startups and modern businesses that refuse to settle for templates.
        </p>

        {/* Primary CTA (blue-deep fill, cream text) & Secondary (outlined ink) */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "clamp(3rem, 6vh, 4.5rem)",
          }}
        >
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "contact")}
            data-cursor="link"
            data-cursor-magnetic
            className="btn-primary"
          >
            <span>Start a Project →</span>
          </a>

          <a
            href="#projects"
            onClick={(e) => scrollTo(e, "projects")}
            data-cursor="link"
            data-cursor-magnetic
            className="btn-outline"
          >
            <span>Explore Sketchbook ↓</span>
          </a>
        </div>

        {/* Real Production Pillars Strip (No fake metrics) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--hairline)",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                color: "var(--blue-deep)",
                fontWeight: 700,
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              Core Pillars
            </span>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: 0 }}>
              Web Architecture · Cloud Infrastructure · SaaS · AI Workflows
            </p>
          </div>

          <div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                color: "var(--blue-deep)",
                fontWeight: 700,
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              Real Case Studies
            </span>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: 0 }}>
              Appointory (Healthcare) &amp; Vrix (Headless E-Commerce)
            </p>
          </div>

          <div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                color: "var(--blue-deep)",
                fontWeight: 700,
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              Studio Base
            </span>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: 0 }}>
              Ahmedabad, Gujarat · Collaborating Worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
