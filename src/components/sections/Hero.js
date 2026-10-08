"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  springs,
  ease,
  fadeUp,
  fadeIn,
  clipUp,
  drawPath,
  staggerContainer,
} from "@/lib/motion";
import { AnimateNumber } from "motion-number";
import Magnetic from "@/components/ui/Magnetic";
import StudioTelemetryCard from "@/components/ui/StudioTelemetryCard";

/**
 * THE INTELLIVERSE — Hero Section
 * ─ 4-Circle Brand Orb Venn Diagram with multiply blend & organic drift
 * ─ Clipped headline with staggered reveal & dynamic SVG coral underline
 * ─ Live Studio Telemetry Log card with bar metrics & animated counters
 * ─ Production pillars grid with hairline dividers
 */
export default function Hero({ data = null, telemetry = null } = {}) {
  const headline = data?.headline || "Innovation. Create. Grow.";
  const subtitle =
    data?.subtitle ||
    "We engineer resilient custom SaaS platforms, high-speed Next.js web applications, and enterprise cloud infrastructure for startups and modern businesses that refuse to settle for templates.";
  const status = data?.status || "Ahmedabad, India / Taking new projects";
  const pillarsText =
    data?.pillarsText ||
    "Web Architecture · Cloud Infrastructure · SaaS · AI Workflows";
  const caseStudiesHighlight =
    data?.caseStudiesHighlight || "Appointory (Healthcare) & Vrix (Headless E-Commerce)";
  const studioLocation =
    data?.studioLocation || "Ahmedabad, Gujarat · Collaborating Worldwide";

  // Parse headline words for individual animated units
  const rawHeadline = (headline || "Innovation. Create. Grow.").trim();
  // Ensure spaces between concatenated words like "Innovation.Create." or "Create.Grow."
  const normalizedHeadline = rawHeadline.replace(/([.!?])([A-Za-z])/g, "$1 $2");
  const words = normalizedHeadline.split(/\s+/).filter(Boolean);
  const word1 = words[0] || "Innovation,";
  const word2 = words[1] || "Create.";
  const word3 = words.length > 2 ? words.slice(2).join(" ") : "Grow.";

  const [isMounted, setIsMounted] = useState(false);
  const [underlineKey, setUnderlineKey] = useState(0);

  useEffect(() => {
    // Wait briefly so entrance animation runs clearly in view
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-theme="cream"
      className="hero-section relative overflow-hidden"
      aria-labelledby="hero-heading"
      onMouseMove={handleMouseMove}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "clamp(6.5rem, 13vh, 9.5rem)",
        paddingBottom: "clamp(2.5rem, 5vh, 4rem)",
        backgroundColor: "var(--cream)",
        color: "var(--ink)",
      }}
    >
      {/* ── Dot-grid technical pattern overlay ───────────────────────── */}
      <div
        className="grid-bg pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          maskImage: "linear-gradient(to bottom, #000 65%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 65%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── 4-Circle Brand Orb Venn Diagram (Multiply Blend with 3D Parallax) ─ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <motion.div
          className="hidden md:block absolute"
          animate={{
            x: mouseOffset.x * 26,
            y: mouseOffset.y * 26,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 25 }}
          style={{
            top: "14%",
            right: "4%",
            width: "clamp(380px, 42vw, 620px)",
            height: "clamp(380px, 42vw, 620px)",
          }}
        >
          {/* Continuous organic float motion container */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 1.5, -1.5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            {/* Orb 1: Electric Blue (#3D7BF7) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isMounted ? { opacity: 0.32, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ ...springs.gentle, delay: 0.15 }}
              style={{
                position: "absolute",
                top: 0,
                left: "12%",
                width: "66%",
                height: "66%",
                borderRadius: "50%",
                backgroundColor: "var(--blue)",
                mixBlendMode: "multiply",
              }}
            />

            {/* Orb 2: Warm Amber (#FDB347) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isMounted ? { opacity: 0.36, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ ...springs.gentle, delay: 0.3 }}
              style={{
                position: "absolute",
                top: "8%",
                right: 0,
                width: "62%",
                height: "62%",
                borderRadius: "50%",
                backgroundColor: "var(--orange)",
                mixBlendMode: "multiply",
              }}
            />

            {/* Orb 3: Deep Indigo (#5B3FD9) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isMounted ? { opacity: 0.28, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ ...springs.gentle, delay: 0.45 }}
              style={{
                position: "absolute",
                bottom: "4%",
                left: "4%",
                width: "64%",
                height: "64%",
                borderRadius: "50%",
                backgroundColor: "var(--indigo)",
                mixBlendMode: "multiply",
              }}
            />

            {/* Orb 4: Vivid Coral (#FF6B7B) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isMounted ? { opacity: 0.34, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ ...springs.gentle, delay: 0.6 }}
              style={{
                position: "absolute",
                bottom: 0,
                right: "8%",
                width: "60%",
                height: "60%",
                borderRadius: "50%",
                backgroundColor: "var(--coral)",
                mixBlendMode: "multiply",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Main Hero Content ───────────────────────────────────────── */}
      <div
        className="container-site relative z-10 w-full"
        style={{ maxWidth: "1440px", margin: "0 auto" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Eyebrow + Clipped Headline + Bio + CTAs */}
          <div className="lg:col-span-8">
            
            {/* Eyebrow status row */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isMounted ? "visible" : "hidden"}
              style={{
                display: "inline-flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.5rem 0.85rem",
                padding: "0.35rem 0.85rem",
                marginBottom: "clamp(1.5rem, 3.5vh, 2.25rem)",
                borderRadius: "999px",
                backgroundColor: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(8px)",
                border: "1px solid var(--line)",
                fontFamily: "var(--mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-2)",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--live)",
                  animation: "pulseDot 2s infinite ease-in-out",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                {status.split("/")[0]?.trim() || "Ahmedabad, India"}
              </span>
              <span style={{ color: "var(--line-2)" }}>·</span>
              <span>{status.split("/")[1]?.trim() || "Taking new projects"}</span>
              <span style={{ color: "var(--line-2)" }}>·</span>
              <span style={{ color: "var(--blue-deep)", fontWeight: 600 }}>
                [STUDIO / 01]
              </span>
            </motion.div>

            {/* Distinct Word-by-Word Headline & Hand-Drawn Animated Underline */}
            <h1
              id="hero-heading"
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(2.5rem, 6.4vw, 7.2rem)",
                lineHeight: 0.94,
                letterSpacing: "-0.035em",
                color: "var(--ink)",
                margin: 0,
                fontWeight: 400,
              }}
            >
              {/* Line 1: Innovation. Create. (Strictly Side-by-Side) */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  whiteSpace: "nowrap",
                  alignItems: "baseline",
                  columnGap: "0.28em",
                  overflow: "hidden",
                  paddingBottom: "0.08em",
                }}
              >
                {/* Word 1: "Innovation." */}
                <span style={{ display: "inline-block", overflow: "hidden" }}>
                  <motion.span
                    initial={{ y: "125%", opacity: 0, rotateZ: 2 }}
                    animate={isMounted ? { y: "0%", opacity: 1, rotateZ: 0 } : { y: "125%", opacity: 0, rotateZ: 2 }}
                    transition={{
                      duration: 0.95,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.1,
                    }}
                    style={{
                      display: "inline-block",
                      transformOrigin: "bottom left",
                    }}
                  >
                    <motion.span
                      whileHover={{ y: -3, scale: 1.01 }}
                      transition={springs.snappy}
                      style={{ display: "inline-block" }}
                    >
                      {word1}
                    </motion.span>
                  </motion.span>
                </span>

                {/* Word 2: "Create." */}
                {word2 && (
                  <span style={{ display: "inline-block", overflow: "hidden" }}>
                    <motion.span
                      initial={{ y: "125%", opacity: 0, rotateZ: -2 }}
                      animate={isMounted ? { y: "0%", opacity: 1, rotateZ: 0 } : { y: "125%", opacity: 0, rotateZ: -2 }}
                      transition={{
                        duration: 0.95,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.25,
                      }}
                      style={{
                        display: "inline-block",
                        transformOrigin: "bottom left",
                      }}
                    >
                      <motion.span
                        whileHover={{ y: -3, scale: 1.01 }}
                        transition={springs.snappy}
                        style={{ display: "inline-block" }}
                      >
                        {word2}
                      </motion.span>
                    </motion.span>
                  </span>
                )}
              </div>

              {/* Line 2: Word 3 ("Grow.") with animated SVG underline */}
              <div
                style={{
                  display: "block",
                  position: "relative",
                  marginTop: "0.04em",
                  overflow: "visible",
                }}
              >
                {/* Anchored wrapper tightly fitted to the third word */}
                <span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    overflow: "visible",
                    paddingBottom: "0.14em",
                  }}
                >
                  <span style={{ display: "inline-block", overflow: "hidden" }}>
                    <motion.span
                      initial={{ y: "125%", opacity: 0, scale: 0.94 }}
                      animate={isMounted ? { y: "0%", opacity: 1, scale: 1 } : { y: "125%", opacity: 0, scale: 0.94 }}
                      transition={{
                        duration: 1.05,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.4,
                      }}
                      style={{
                        display: "inline-block",
                        transformOrigin: "bottom left",
                      }}
                    >
                      <motion.em
                        onHoverStart={() => setUnderlineKey((k) => k + 1)}
                        onClick={() => setUnderlineKey((k) => k + 1)}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={springs.snappy}
                        style={{
                          fontStyle: "italic",
                          color: "var(--blue-deep)",
                          fontWeight: 400,
                          display: "inline-block",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        {word3 || "Grow."}
                      </motion.em>
                    </motion.span>
                  </span>

                  {/* Coral Hand-Drawn Underline SVG with animated path drawing */}
                  <motion.svg
                    key={underlineKey}
                    aria-hidden="true"
                    viewBox="0 0 280 20"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5, duration: 0.2 }}
                    style={{
                      position: "absolute",
                      bottom: "-8px",
                      left: 0,
                      width: "102%",
                      height: "18px",
                      overflow: "visible",
                      pointerEvents: "none",
                    }}
                  >
                    <motion.path
                      d="M4 14 C 70 3, 160 2, 276 11"
                      stroke="var(--coral)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={isMounted ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                      transition={{
                        pathLength: {
                          duration: 1.15,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.55,
                        },
                        opacity: {
                          duration: 0.15,
                          delay: 0.52,
                        },
                      }}
                    />
                  </motion.svg>
                </span>
              </div>
            </h1>

            {/* Subtitle & Value Proposition */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isMounted ? "visible" : "hidden"}
              transition={{ delay: 0.35 }}
              style={{
                fontFamily: "var(--sans)",
                fontSize: "clamp(1.05rem, 1.45vw, 1.25rem)",
                color: "var(--ink-2)",
                maxWidth: "46rem",
                lineHeight: 1.65,
                marginTop: "clamp(1.5rem, 3.2vh, 2.5rem)",
                marginBottom: "clamp(2rem, 4.5vh, 3.25rem)",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                The Intelliverse is an open digital workshop.
              </strong>{" "}
              {subtitle}
            </motion.p>

            {/* CTA Button Actions with Tactile Magnetic Physics */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isMounted ? "visible" : "hidden"}
              transition={{ delay: 0.45 }}
              style={{
                display: "flex",
                gap: "1.15rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Magnetic strength={0.28}>
                <motion.a
                  href="#contact"
                  onClick={(e) => scrollTo(e, "contact")}
                  className="btn-primary group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springs.snappy}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    padding: "0.95rem 2rem",
                    backgroundColor: "var(--blue-deep)",
                    color: "#ffffff",
                    borderRadius: "999px",
                    fontFamily: "var(--sans)",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    textDecoration: "none",
                    boxShadow: "0 10px 25px -8px rgba(47,99,224,0.45)",
                  }}
                >
                  <span>Start a Project</span>
                  <span
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </motion.a>
              </Magnetic>

              <Magnetic strength={0.2}>
                <motion.a
                  href="#projects"
                  onClick={(e) => scrollTo(e, "projects")}
                  className="btn-outline group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springs.snappy}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    padding: "0.95rem 2rem",
                    backgroundColor: "rgba(255,255,255,0.75)",
                    color: "var(--ink)",
                    border: "1px solid var(--line-2)",
                    borderRadius: "999px",
                    fontFamily: "var(--mono)",
                    fontWeight: 600,
                    fontSize: "0.8125rem",
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span>Explore Sketchbook</span>
                  <span
                    className="transition-transform duration-200 group-hover:translate-y-1"
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                </motion.a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right Column: Editorial Studio Telemetry Log Card */}
          <div className="lg:col-span-4 mt-4 lg:mt-0">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isMounted ? "visible" : "hidden"}
              transition={{ delay: 0.55 }}
            >
              <StudioTelemetryCard data={telemetry} initialCount={telemetry?.deployCount || 302} showFullLogs={true} />
            </motion.div>
          </div>

        </div>
      </div>

      {/* ── Real Production Pillars Strip ───────────────────────────── */}
      <div
        className="container-site relative z-10 w-full mt-12"
        style={{ maxWidth: "1440px", margin: "0 auto" }}
      >
        <motion.div
          variants={staggerContainer(0.12, 0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
            gap: "1.25rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--line)",
          }}
        >
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={springs.snappy}
            style={{
              padding: "1.1rem 1.35rem",
              borderRadius: "14px",
              backgroundColor: "rgba(255,255,255,0.6)",
              border: "1px solid var(--line-2)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 6px 20px -8px rgba(14,27,61,0.04)",
            }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.6875rem",
                  color: "var(--blue-deep)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                01 / CORE PILLARS
              </span>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--blue-deep)",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: "0.875rem",
                color: "var(--ink-2)",
                margin: 0,
                lineHeight: 1.55,
              }}
            >
              {pillarsText}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={springs.snappy}
            style={{
              padding: "1.1rem 1.35rem",
              borderRadius: "14px",
              backgroundColor: "rgba(255,255,255,0.6)",
              border: "1px solid var(--line-2)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 6px 20px -8px rgba(14,27,61,0.04)",
            }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.6875rem",
                  color: "var(--orange)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                02 / CASE STUDIES
              </span>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--orange)",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: "0.875rem",
                color: "var(--ink-2)",
                margin: 0,
                lineHeight: 1.55,
              }}
            >
              {caseStudiesHighlight}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={springs.snappy}
            style={{
              padding: "1.1rem 1.35rem",
              borderRadius: "14px",
              backgroundColor: "rgba(255,255,255,0.6)",
              border: "1px solid var(--line-2)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 6px 20px -8px rgba(14,27,61,0.04)",
            }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.6875rem",
                  color: "var(--live)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                03 / STUDIO BASE
              </span>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--live)",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: "0.875rem",
                color: "var(--ink-2)",
                margin: 0,
                lineHeight: 1.55,
              }}
            >
              {studioLocation}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
