"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Philosophy section — "Start where you need us. Grow when you're ready."
 * ─ Full-width taller rows
 * ─ Numbers inside solid brand circles (blue, indigo, coral)
 * ─ Open row gets a cream-surface panel with visual accent
 */
const ROWS = [
  {
    num: "01",
    circleColor: "var(--blue-deep)",
    title: "Single Service Engagement",
    subtitle: "Start with one critical objective executed impeccably.",
    body: "Maybe you need an ultra-fast Next.js web application or a headless storefront right now. That's a completely valid place to start. We focus strictly on what creates measurable impact, without bloated scopes or unwanted upsells.",
    chips: ["Next.js Architecture", "Headless Storefront", "Landing Experience", "Code Audit"],
  },
  {
    num: "02",
    circleColor: "var(--indigo)",
    title: "Multi-Service Delivery",
    subtitle: "Web, cloud systems, and AI pipelines synchronized.",
    body: "As your product scope matures, we orchestrate the frontend interfaces, cloud microservices, database schemas, and AI pipelines together — one cohesive team that understands your full architecture from first principles.",
    chips: ["Full-Stack Engineering", "AWS / Edge Cloud", "Agentic AI Pipelines", "API Integrations"],
  },
  {
    num: "03",
    circleColor: "var(--coral)",
    title: "Complete Technical Partner",
    subtitle: "Your embedded engineering leadership.",
    body: "For ambitious founders and growing companies that require continuous technical excellence: we embed into your product roadmap, help hire and mentor internal developers, and guarantee uptime as you scale.",
    chips: ["CTO Advisory", "Dedicated Retainer", "Continuous DevOps", "Enterprise Security"],
  },
];

export default function Philosophy() {
  const [open, setOpen] = useState("01");

  return (
    <section
      id="philosophy"
      data-theme="cream"
      className="section-gap"
      style={{
        borderTop: "1px solid var(--hairline)",
        backgroundColor: "var(--cream)",
        color: "var(--ink)",
      }}
    >
      <div className="container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Label */}
        <div
          style={{
            marginBottom: "3.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <span className="section-label" style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              Engagement Philosophy
            </span>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                letterSpacing: "-0.02em",
                margin: 0,
                color: "var(--ink)",
              }}
            >
              Start where you need us.{" "}
              <em style={{ color: "var(--blue-deep)", fontStyle: "italic" }}>
                Grow when you&apos;re ready.
              </em>
            </h2>
          </div>
          <p
            className="philosophy-flex-hint"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Flexible Engagement Models
          </p>
        </div>

        {/* Accordion rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {ROWS.map((row) => (
            <PhilosophyRow
              key={row.num}
              row={row}
              isOpen={open === row.num}
              onToggle={() => setOpen(open === row.num ? null : row.num)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophyRow({ row, isOpen, onToggle }) {
  return (
    <div
      style={{
        border: `1px solid ${isOpen ? "var(--hairline)" : "var(--hairline)"}`,
        borderRadius: "14px",
        backgroundColor: isOpen ? "var(--surface)" : "transparent",
        boxShadow: isOpen ? "0 10px 30px rgba(14,27,61,0.04)" : "none",
        transition: "all 0.3s ease",
        overflow: "hidden",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        data-cursor="link"
        style={{
          width: "100%",
          padding: "clamp(1.5rem, 3vh, 2.25rem) clamp(1.5rem, 3vw, 2.5rem)",
          display: "flex",
          alignItems: "center",
          gap: "clamp(1rem, 2.5vw, 2rem)",
          background: "none",
          border: "none",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        {/* Brand Solid Circle with Number */}
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            backgroundColor: row.circleColor,
            color: "var(--cream)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.875rem",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {row.num}
        </div>

        {/* Title and Subtitle */}
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
              letterSpacing: "-0.015em",
              color: "var(--ink)",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            {row.title}
          </h3>
          <span
            style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginTop: "0.35rem",
            }}
          >
            {row.subtitle}
          </span>
        </div>

        {/* Toggle icon */}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "1.25rem",
            color: isOpen ? "var(--blue-deep)" : "var(--muted)",
            transform: isOpen ? "rotate(45deg)" : "none",
            transition: "transform 0.3s ease, color 0.3s ease",
            padding: "0.5rem",
          }}
        >
          +
        </span>
      </button>

      {/* Expanded State (Cream Surface Panel) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                padding: "0 clamp(1.5rem, 3vw, 2.5rem) clamp(1.75rem, 3vh, 2.5rem)",
                paddingLeft: "clamp(1.5rem, 3vw, 2.5rem)",
                borderTop: "1px solid var(--hairline)",
                paddingTop: "1.5rem",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "var(--muted)",
                  maxWidth: "58ch",
                  marginBottom: "1.5rem",
                }}
              >
                {row.body}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {row.chips.map((chip) => (
                  <span
                    key={chip}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6875rem",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "999px",
                      background: "var(--cream)",
                      border: "1px solid var(--hairline)",
                      color: "var(--ink)",
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
