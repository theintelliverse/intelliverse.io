"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { springs, ease, fadeUp, fadeIn, staggerContainer } from "@/lib/motion";

/**
 * Enhanced Model Metadata for the 3 Engagement Tiers
 */
const MODEL_EXTRAS = {
  "01": {
    phaseTag: "TACTICAL SPRINT",
    timeline: "2 – 4 WEEKS · FIXED MILESTONE",
    highlightBadge: "ZERO CONTRACT OVERHEAD",
    circleColor: "var(--blue-deep)",
    glowColor: "rgba(47, 99, 224, 0.15)",
    borderColor: "rgba(47, 99, 224, 0.35)",
    ctaLabel: "Initiate Sprint",
    bestFor: "Focused feature builds, code audits, or high-urgency rescue sprints.",
  },
  "02": {
    phaseTag: "CROSS-FUNCTIONAL BUILD",
    timeline: "6 – 12 WEEKS · DEDICATED SQUAD",
    highlightBadge: "RECOMMENDED ARCHITECTURE",
    circleColor: "var(--indigo)",
    glowColor: "rgba(91, 63, 217, 0.15)",
    borderColor: "rgba(91, 63, 217, 0.35)",
    ctaLabel: "Commission Platform",
    bestFor: "End-to-end web apps, multi-tenant SaaS, and cloud/AI integrations.",
  },
  "03": {
    phaseTag: "EMBEDDED LEADERSHIP",
    timeline: "ONGOING / QUARTERLY RETAINER",
    highlightBadge: "MAXIMUM VELOCITY",
    circleColor: "var(--coral)",
    glowColor: "rgba(255, 107, 123, 0.15)",
    borderColor: "rgba(255, 107, 123, 0.35)",
    ctaLabel: "Partner with Studio",
    bestFor: "High-growth founders needing continuous technical leadership and DevOps.",
  },
};

const DEFAULT_ROWS = [
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

const STUDIO_GUARANTEES = [
  {
    icon: "fa-shield-halved",
    title: "100% IP & Code Ownership",
    desc: "Every database schema, pipeline, and UI component is transferred directly to your organization. Zero proprietary vendor lock-in.",
  },
  {
    icon: "fa-terminal",
    title: "Direct Senior Engineering Access",
    desc: "Collaborate directly with the principal architects writing the code. No non-technical account managers or communication silos.",
  },
  {
    icon: "fa-rocket",
    title: "Weekly Playable Deployments",
    desc: "Continuous CI/CD preview builds with automated test coverage. You inspect working production software at the end of every sprint.",
  },
];

export default function Philosophy({ data }) {
  const rows = Array.isArray(data) && data.length > 0 ? data : DEFAULT_ROWS;
  const [activeModel, setActiveModel] = useState("02");
  const [underlineKey, setUnderlineKey] = useState(0);

  return (
    <section
      id="philosophy"
      data-theme="cream"
      className="section-gap relative overflow-hidden"
      style={{
        borderTop: "1px solid var(--hairline)",
        backgroundColor: "var(--cream)",
        color: "var(--ink)",
        paddingTop: "clamp(5rem, 9vh, 7.5rem)",
        paddingBottom: "clamp(5rem, 9vh, 7.5rem)",
      }}
    >
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[10%] -left-[10%] w-[45vw] h-[45vw] rounded-full blur-[140px] opacity-25"
          style={{ background: "radial-gradient(circle, rgba(47, 99, 224, 0.2) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-[10%] -right-[10%] w-[45vw] h-[45vw] rounded-full blur-[140px] opacity-20"
          style={{ background: "radial-gradient(circle, rgba(253, 179, 71, 0.2) 0%, transparent 70%)" }}
        />
      </div>

      <div className="container-site relative z-10" style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* ── Section Eyebrow Header ────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer(0.08, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-between items-center flex-wrap gap-4 mb-12"
        >
          <div className="inline-flex items-center gap-2">
            <motion.span
              variants={fadeUp}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--blue-deep)",
                fontWeight: 700,
              }}
            >
              ENGAGEMENT PHILOSOPHY &amp; MODELS
            </motion.span>
          </div>

          <motion.div
            variants={fadeIn}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.65rem",
              fontFamily: "var(--mono)",
              fontSize: "0.6875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              border: "1px solid var(--line-2)",
              color: "var(--ink-2)",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "var(--live)",
                display: "inline-block",
              }}
            />
            <span>MODULAR VELOCITY · ZERO VENDOR LOCK-IN</span>
          </motion.div>
        </motion.div>

        {/* ── Headline Banner ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: ease.expo }}
          className="mb-14 lg:mb-18 max-w-4xl"
        >
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(2.5rem, 5.2vw, 4.4rem)",
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
              margin: "0 0 1.25rem 0",
              fontWeight: 400,
            }}
          >
            Start where you need us.{" "}
            <span
              style={{
                position: "relative",
                display: "inline-block",
                fontStyle: "italic",
                color: "var(--blue-deep)",
              }}
              onMouseEnter={() => setUnderlineKey((k) => k + 1)}
            >
              <span>Grow when you&apos;re ready.</span>
              {/* Hand-Drawn SVG Accent */}
              <motion.svg
                key={underlineKey}
                aria-hidden="true"
                viewBox="0 0 280 18"
                fill="none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  bottom: "-6px",
                  left: 0,
                  width: "100%",
                  height: "16px",
                  overflow: "visible",
                  pointerEvents: "none",
                }}
              >
                <motion.path
                  d="M4 12 C 75 3, 170 2, 275 10"
                  stroke="var(--coral)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    pathLength: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
                    opacity: { duration: 0.15, delay: 0.2 },
                  }}
                />
              </motion.svg>
            </span>
          </h2>

          <p
            style={{
              fontFamily: "var(--sans)",
              fontSize: "clamp(1.05rem, 1.4vw, 1.18rem)",
              lineHeight: 1.75,
              color: "var(--ink-2)",
              margin: 0,
              maxWidth: "68ch",
            }}
          >
            We reject bloated, one-size-fits-all agency contracts. Every engagement begins precisely at your team&apos;s
            technical altitude — whether solving an urgent architectural bottleneck or embedding a dedicated engineering engine.
          </p>
        </motion.div>

        {/* ── 3-Card Architectural Bento Grid ───────────────────────────────── */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
        >
          {rows.map((row, idx) => {
            const extras = MODEL_EXTRAS[row.num] || {
              phaseTag: `PHASE // ${row.num}`,
              timeline: "FLEXIBLE MILESTONE",
              highlightBadge: "CUSTOM SCOPE",
              circleColor: row.circleColor || "var(--blue-deep)",
              glowColor: "rgba(47, 99, 224, 0.15)",
              borderColor: "rgba(47, 99, 224, 0.35)",
              ctaLabel: "Initiate Model",
              bestFor: "Tailored software development and technical architecture.",
            };

            const isSelected = activeModel === row.num;

            return (
              <motion.div
                key={row.num}
                variants={fadeUp}
                onClick={() => setActiveModel(row.num)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: ease.expo }}
                className="group relative rounded-2xl flex flex-col justify-between transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.85)",
                  border: isSelected
                    ? `2px solid ${extras.circleColor}`
                    : "1px solid var(--line-2)",
                  boxShadow: isSelected
                    ? `0 24px 50px -15px ${extras.glowColor}, 0 10px 25px rgba(14, 27, 61, 0.06)`
                    : "0 12px 30px -10px rgba(14, 27, 61, 0.04)",
                  padding: "clamp(1.75rem, 3.2vw, 2.35rem)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Top Subtle Color Accent Bar */}
                <div
                  className="absolute top-0 left-6 right-6 h-1 rounded-b-md transition-all duration-300"
                  style={{
                    backgroundColor: extras.circleColor,
                    opacity: isSelected ? 1 : 0.4,
                  }}
                />

                {/* Card Header: Number Circle & Phase Tag */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          backgroundColor: extras.circleColor,
                          color: "var(--cream)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--mono)",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          boxShadow: `0 4px 14px ${extras.glowColor}`,
                        }}
                      >
                        {row.num}
                      </div>
                      <div>
                        <span
                          style={{
                            display: "block",
                            fontFamily: "var(--mono)",
                            fontSize: "0.625rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--ink-3)",
                            fontWeight: 700,
                          }}
                        >
                          {extras.phaseTag}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "0.6875rem",
                            fontWeight: 600,
                            color: isSelected ? extras.circleColor : "var(--ink-2)",
                          }}
                        >
                          {extras.timeline}
                        </span>
                      </div>
                    </div>

                    {/* Popular / Recommended Tag on Tier 02 */}
                    {row.num === "02" && (
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "0.5625rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          padding: "0.25rem 0.55rem",
                          borderRadius: "999px",
                          backgroundColor: "rgba(91, 63, 217, 0.1)",
                          color: "var(--indigo)",
                          fontWeight: 700,
                          border: "1px solid rgba(91, 63, 217, 0.25)",
                        }}
                      >
                        RECOMMENDED
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-5">
                    <h3
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: "clamp(1.75rem, 2.5vw, 2.2rem)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.02em",
                        color: "var(--ink)",
                        margin: "0 0 0.5rem 0",
                        fontWeight: 400,
                      }}
                    >
                      {row.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "var(--ink-2)",
                        margin: 0,
                        lineHeight: 1.45,
                      }}
                    >
                      {row.subtitle}
                    </p>
                  </div>

                  {/* Body Narrative */}
                  <p
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                      color: "var(--ink-2)",
                      margin: "0 0 1.5rem 0",
                    }}
                  >
                    {row.body}
                  </p>

                  {/* Deliverable Scope Chips */}
                  <div className="mb-6">
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--mono)",
                        fontSize: "0.625rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--ink-3)",
                        marginBottom: "0.6rem",
                        fontWeight: 700,
                      }}
                    >
                      DELIVERABLE SPECIFICATIONS:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(row.chips || []).map((chip) => (
                        <span
                          key={chip}
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "0.6875rem",
                            padding: "0.3rem 0.65rem",
                            borderRadius: "6px",
                            backgroundColor: "rgba(14, 27, 61, 0.04)",
                            border: "1px solid var(--line)",
                            color: "var(--ink)",
                            fontWeight: 500,
                            transition: "all 0.2s ease",
                          }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Ideal Use Case & Action Link */}
                <div className="pt-4 border-t border-[var(--hairline)] flex items-center justify-between gap-3">
                  <div className="text-[11px] font-sans text-[var(--ink-3)] line-clamp-1">
                    <strong className="text-[var(--ink-2)]">Best For: </strong>
                    {extras.bestFor}
                  </div>

                  <a
                    href="#contact"
                    className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold transition-transform group-hover:translate-x-1"
                    style={{
                      fontFamily: "var(--mono)",
                      color: extras.circleColor,
                      textDecoration: "none",
                    }}
                  >
                    <span>{extras.ctaLabel}</span>
                    <i className="fas fa-arrow-right text-[10px]"></i>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Studio Guarantees Specifications Strip ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: ease.expo }}
          className="rounded-2xl p-6 md:p-8"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            border: "1px dashed var(--line-2)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[var(--hairline)]">
            {STUDIO_GUARANTEES.map((g, i) => (
              <div key={i} className={`flex items-start gap-4 ${i !== 0 ? "pt-6 md:pt-0 md:pl-8" : ""}`}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(47, 99, 224, 0.08)",
                    color: "var(--blue-deep)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "0.875rem",
                  }}
                >
                  <i className={`fas ${g.icon}`}></i>
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                      margin: "0 0 0.25rem 0",
                    }}
                  >
                    {g.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: "0.8125rem",
                      lineHeight: 1.6,
                      color: "var(--ink-2)",
                      margin: 0,
                    }}
                  >
                    {g.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
