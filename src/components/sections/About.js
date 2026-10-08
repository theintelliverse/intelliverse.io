"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, springs, ease } from "@/lib/motion";

/**
 * About / Studio Manifesto — The Intelliverse
 * ─ Editorial typography with high-impact pull quote & hand-drawn SVG underline
 * ─ 3 Core Architectural Tenets / Manifesto Principles
 * ─ Tactile Mission specification card + Live coordinates & studio stats
 * ─ Framer-motion scroll-triggered reveals and interactive hover states
 */

const MANIFESTO_TENETS = [
  {
    num: "01",
    tag: "FIRST PRINCIPLES",
    title: "Architectural Integrity",
    desc: "We don't build disposable prototypes or fragile templates. Every database schema, edge route, and interface component is engineered for sub-second performance and long-term maintainability.",
  },
  {
    num: "02",
    tag: "DIRECT DIALOGUE",
    title: "Radical Transparency",
    desc: "No layers of non-technical account managers. You collaborate directly with senior architects and engineers who understand your domain from day one through launch.",
  },
  {
    num: "03",
    tag: "CRAFT & RIGOR",
    title: "Edge-First Scalability",
    desc: "Modern web architecture demands global edge CDNs, zero-trust security, and reactive data layers that scale gracefully from launch day to millions of requests.",
  },
];

const STATS = [
  {
    value: "2024",
    label: "Studio Founded",
    note: "Ahmedabad, India · Worldwide",
    badge: "ORIGIN",
    serif: false,
  },
  {
    value: "100%",
    label: "Custom Architecture",
    note: "Zero Generic Templates",
    badge: "BESPOKE",
    serif: false,
  },
  {
    value: "∞",
    label: "Commitment to Quality",
    note: "Zero Technical Debt · Built to Scale",
    badge: "UNCOMPROMISING",
    isInfinity: true,
    serif: true,
  },
];

const CAPABILITIES = [
  "Next.js App Router",
  "Headless Commerce",
  "High-Concurrency APIs",
  "Cloud Edge & DevOps",
  "Applied AI & RAG",
  "Zero-Trust Auth",
];

export default function About({ data }) {
  const [underlineKey, setUnderlineKey] = useState(0);

  const pullQuoteText = data?.pullQuote || (
    <>
      We treat every project as a{" "}
      <span
        style={{
          position: "relative",
          display: "inline-block",
          color: "var(--ink)",
        }}
        onMouseEnter={() => setUnderlineKey((k) => k + 1)}
      >
        <span style={{ position: "relative", zIndex: 1 }}>genuine collaboration</span>
        {/* Animated Hand-Drawn SVG Underline */}
        <motion.svg
          key={underlineKey}
          aria-hidden="true"
          viewBox="0 0 260 14"
          fill="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            bottom: "-4px",
            left: 0,
            width: "100%",
            height: "14px",
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <motion.path
            d="M3 10 C 65 2, 160 1, 257 8"
            stroke="var(--coral)"
            strokeWidth="4.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              pathLength: { duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
              opacity: { duration: 0.15, delay: 0.25 },
            }}
          />
        </motion.svg>
      </span>
      , not an anonymous transaction. Real problems deserve{" "}
      <em
        style={{
          fontStyle: "italic",
          color: "var(--blue-deep)",
          fontWeight: 400,
        }}
      >
        architectural precision
      </em>
      .
    </>
  );

  return (
    <section
      id="about"
      data-theme="cream"
      className="section-gap relative"
      style={{
        borderTop: "1px solid var(--line)",
        backgroundColor: "var(--cream)",
        color: "var(--ink)",
        overflow: "hidden",
        paddingTop: "clamp(5rem, 9vh, 7.5rem)",
        paddingBottom: "clamp(5rem, 9vh, 7.5rem)",
      }}
    >
      <div className="container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>
        
        {/* ── Section Eyebrow Header ────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer(0.08, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-between items-center flex-wrap gap-4 mb-14"
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
              STUDIO MANIFESTO &amp; PHILOSOPHY
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
            <span>AHMEDABAD · 23.0225° N, 72.5714° E</span>
          </motion.div>
        </motion.div>

        {/* ── Headline Pull-Quote Banner ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: ease.expo }}
          className="mb-16 lg:mb-20"
          style={{ maxWidth: "1280px" }}
        >
          <blockquote
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(2.35rem, 5.2vw, 4.4rem)",
              lineHeight: 1.14,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              margin: 0,
              fontWeight: 400,
            }}
          >
            {pullQuoteText}
          </blockquote>
        </motion.div>

        {/* ── 2-Column Editorial Grid: Story & Mission Spec Sheet ───────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Column: Narrative Story + Overview */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--sans)",
                fontSize: "clamp(1.05rem, 1.4vw, 1.18rem)",
                lineHeight: 1.8,
                color: "var(--ink-2)",
                margin: 0,
              }}
            >
              {data?.p1 || (
                <>
                  The Intelliverse is an engineering-first software studio based in
                  Ahmedabad, Gujarat. We build resilient digital platforms, custom SaaS architectures,
                  and lightning-fast web applications for founders and enterprises that refuse to settle
                  for fragile off-the-shelf templates.
                </>
              )}
            </motion.p>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--sans)",
                fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
                lineHeight: 1.8,
                color: "var(--ink-3)",
                margin: 0,
              }}
            >
              {data?.modelsText || (
                <>
                  We engineer with modern distributed paradigms — Next.js 15, zero-trust cloud infrastructure,
                  and edge telemetry. We treat these not as fleeting buzzwords, but as fundamental building blocks.
                  Every engagement starts with rigorous architectural discovery and culminates in software your users
                  actually enjoy using.
                </>
              )}
            </motion.p>

            {/* Core Capability Tags */}
            <motion.div
              variants={fadeUp}
              className="pt-4"
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  display: "block",
                  marginBottom: "0.75rem",
                  fontWeight: 700,
                }}
              >
                CORE SPECIALIZATIONS
              </span>
              <div className="flex flex-wrap gap-2">
                {CAPABILITIES.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.04, y: -1 }}
                    transition={springs.snappy}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      padding: "0.4rem 0.85rem",
                      borderRadius: "999px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid var(--line-2)",
                      color: "var(--ink)",
                      cursor: "default",
                      boxShadow: "0 2px 6px rgba(14,27,61,0.03)",
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Tactile Studio Mission Specification Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: ease.expo }}
            className="lg:col-span-5"
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                border: "1px solid var(--line-2)",
                borderRadius: "16px",
                padding: "2.25rem 2rem",
                boxShadow: "0 18px 40px -15px rgba(14, 27, 61, 0.08)",
                position: "relative",
              }}
            >
              {/* Studio Stamp Badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px dashed var(--line-2)",
                  paddingBottom: "1rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.625rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--blue-deep)",
                      fontWeight: 700,
                      display: "block",
                    }}
                  >
                    STUDIO PURPOSE
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "1.35rem",
                      color: "var(--ink)",
                      fontWeight: 400,
                    }}
                  >
                    Our Core Mission
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.625rem",
                    padding: "0.25rem 0.55rem",
                    borderRadius: "4px",
                    backgroundColor: "rgba(47, 99, 224, 0.08)",
                    color: "var(--blue-deep)",
                    fontWeight: 700,
                  }}
                >
                  DOC // 02
                </span>
              </div>

              <p
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "var(--ink)",
                  margin: "0 0 1.5rem 0",
                  fontStyle: "italic",
                }}
              >
                &ldquo;
                {data?.mission ||
                  "To solve problems worth solving with partners who care about craft — architecting software that remains exceptionally fast, secure, and maintainable long after deployment."}
                &rdquo;
              </p>

              {/* Studio Founding Footnote */}
              <div
                style={{
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--line-2)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "var(--mono)",
                  fontSize: "0.6875rem",
                  color: "var(--ink-3)",
                }}
              >
                <span>Founders &amp; Core Team</span>
                <span style={{ fontWeight: 600, color: "var(--ink)" }}>Ahmedabad · Worldwide</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── 3 Core Manifesto Principles / Tenets ────────────────────────── */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="pt-6 mb-16"
        >
          <div className="flex justify-between items-baseline mb-8">
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
              }}
            >
              FOUNDATIONAL TENETS
            </span>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                color: "var(--ink-3)",
              }}
            >
              HOW WE ENGINEER
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MANIFESTO_TENETS.map((tenet) => (
              <motion.div
                key={tenet.num}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={springs.snappy}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.65)",
                  border: "1px solid var(--line-2)",
                  borderRadius: "14px",
                  padding: "1.75rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 25px -10px rgba(14, 27, 61, 0.05)",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "var(--blue-deep)",
                      }}
                    >
                      {tenet.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "0.5625rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--ink-3)",
                        fontWeight: 600,
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        backgroundColor: "rgba(14, 27, 61, 0.04)",
                      }}
                    >
                      {tenet.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "1.5rem",
                      color: "var(--ink)",
                      marginBottom: "0.65rem",
                      fontWeight: 400,
                      lineHeight: 1.25,
                    }}
                  >
                    {tenet.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: "var(--ink-2)",
                      margin: 0,
                    }}
                  >
                    {tenet.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Stats Strip Row ───────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            borderTop: "1px solid var(--line-2)",
            borderBottom: "1px solid var(--line-2)",
            paddingTop: "2.5rem",
            paddingBottom: "2.5rem",
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              transition={springs.snappy}
              style={{
                backgroundColor: s.isInfinity ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.65)",
                border: s.isInfinity ? "1px solid rgba(47, 99, 224, 0.25)" : "1px solid var(--line-2)",
                borderRadius: "16px",
                padding: "1.65rem 1.75rem",
                boxShadow: s.isInfinity
                  ? "0 12px 30px -10px rgba(47, 99, 224, 0.08)"
                  : "0 6px 20px -8px rgba(14, 27, 61, 0.04)",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {!s.isInfinity && (
                      <span
                        style={{
                          fontFamily: s.serif ? "var(--serif)" : "var(--mono)",
                          fontSize: s.serif ? "clamp(2.6rem, 4.2vw, 3.4rem)" : "clamp(2rem, 3.5vw, 2.75rem)",
                          fontWeight: s.serif ? 400 : 700,
                          color: "var(--ink)",
                          lineHeight: 1,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {s.value}
                      </span>
                    )}

                    {/* Animated Lemniscate Beam Loop for Infinity / Quality */}
                    {s.isInfinity && (
                      <div className="relative flex items-center justify-center py-1">
                        <svg viewBox="0 0 72 36" fill="none" style={{ width: "56px", height: "28px", overflow: "visible" }}>
                          <defs>
                            <linearGradient id="infGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="var(--blue-deep)" />
                              <stop offset="50%" stopColor="var(--coral)" />
                              <stop offset="100%" stopColor="var(--orange)" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 36,18 C 45,6 63,6 63,18 C 63,30 45,30 36,18 C 27,6 9,6 9,18 C 9,30 27,30 36,18 Z"
                            stroke="rgba(47, 99, 224, 0.16)"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                          />
                          <motion.path
                            d="M 36,18 C 45,6 63,6 63,18 C 63,30 45,30 36,18 C 27,6 9,6 9,18 C 9,30 27,30 36,18 Z"
                            stroke="url(#infGrad)"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0.35, pathOffset: 0 }}
                            animate={{ pathOffset: [0, 1] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {s.badge && (
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "0.5625rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "999px",
                        backgroundColor: s.isInfinity ? "rgba(34, 165, 91, 0.1)" : "rgba(14, 27, 61, 0.05)",
                        color: s.isInfinity ? "#168744" : "var(--ink-2)",
                        border: s.isInfinity ? "1px solid rgba(34, 165, 91, 0.25)" : "1px solid var(--line)",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      {s.isInfinity && (
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#22A55B", display: "inline-block" }} />
                      )}
                      {s.badge}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginTop: "0.5rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.label}
                </div>
              </div>

              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  marginTop: "0.5rem",
                }}
              >
                {s.note}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom Micro-Footer / Location Verification ───────────────── */}
        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontFamily: "var(--mono)",
            fontSize: "0.6875rem",
            color: "var(--ink-3)",
          }}
        >
          <span style={{ letterSpacing: "0.06em" }}>
            The Intelliverse Studio · Architecture &amp; Development
          </span>
          <span style={{ letterSpacing: "0.14em", textTransform: "uppercase" }}>
            AHMEDABAD · GUJARAT · INDIA · WORLDWIDE
          </span>
        </div>

      </div>
    </section>
  );
}
