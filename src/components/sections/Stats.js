"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimateNumber } from "motion-number";
import { scaleIn, staggerContainer } from "@/lib/motion";

/**
 * Stats / Telemetry Metrics Section
 * - Uses AnimateNumber from motion-number for smooth digit rolling
 * - Staggered entrance on viewport intersection
 * - Editorial hairline grid with serif figures & mono telemetry labels
 */
export default function Stats({ data }) {
  const [inView, setInView] = useState(false);

  if (!data) return null;

  const stats = [
    { value: Number(data.projects) || 2, label: "Verified Platforms Shipped", suffix: "+" },
    { value: Number(data.satisfaction) || 100, label: "Client SLA & Satisfaction", suffix: "%" },
    { value: Number(data.clients) || 15, label: "Worldwide Engagements", suffix: "+" },
  ];

  return (
    <section
      id="stats"
      data-theme="cream"
      className="section-gap relative border-t border-[var(--line)]"
      style={{
        backgroundColor: "var(--cream)",
        color: "var(--ink)",
        paddingTop: "clamp(4.5rem, 8vh, 6.5rem)",
        paddingBottom: "clamp(4.5rem, 8vh, 6.5rem)",
      }}
      aria-label="Metrics & Telemetry"
    >
      <div className="container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>

        {/* Eyebrow Label */}
        <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex items-center gap-2">
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--blue-deep)",
                fontWeight: 700,
              }}
            >
              TELEMETRY METRICS
            </span>
          </div>

          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.6875rem",
              color: "var(--ink-3)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Audited Production Data
          </span>
        </div>

        {/* 3-Column Metrics Grid */}
        <motion.div
          variants={staggerContainer(0.14, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          onViewportEnter={() => setInView(true)}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
            backgroundColor: "rgba(255,255,255,0.75)",
            border: "1px solid var(--line-2)",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 30px -10px rgba(14,27,61,0.06)",
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              style={{
                padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.75rem, 4vw, 3rem)",
                borderRight: i < stats.length - 1 ? "1px solid var(--line)" : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.15rem" }}>
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(3.25rem, 6.5vw, 5.5rem)",
                    lineHeight: 1,
                    color: "var(--ink)",
                    fontWeight: 400,
                  }}
                >
                  <AnimateNumber>{inView ? stat.value : 0}</AnimateNumber>
                </span>
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
                    color: "var(--blue-deep)",
                    lineHeight: 1,
                    fontWeight: 400,
                  }}
                >
                  {stat.suffix}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink-2)",
                  marginTop: "1.25rem",
                  marginBottom: 0,
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
