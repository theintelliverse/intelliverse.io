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

  const [isMounted, setIsMounted] = useState(true);
  const [underlineKey, setUnderlineKey] = useState(0);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [gyroOffset, setGyroOffset] = useState({ x: 0, y: 0 });

  // Gyroscope / DeviceOrientation Listener for Mobile Devices
  useEffect(() => {
    let initialBeta = null;
    let initialGamma = null;

    const handleOrientation = (e) => {
      const { beta, gamma } = e;
      if (beta === null || gamma === null) return;

      // Calibrate reference point when user opens the page in their posture
      if (initialBeta === null) {
        initialBeta = beta;
        initialGamma = gamma;
      }

      // Calculate smooth tilt delta relative to initial hold (-30 to +30 degrees)
      const deltaX = Math.max(-30, Math.min(30, gamma - initialGamma));
      const deltaY = Math.max(-30, Math.min(30, beta - initialBeta));

      // Normalized to range [-1, 1]
      const nx = deltaX / 30;
      const ny = deltaY / 30;

      setGyroOffset({ x: nx, y: ny });
    };

    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      // iOS 13+ permission protocol
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        const requestIOSPermission = async () => {
          try {
            const res = await DeviceOrientationEvent.requestPermission();
            if (res === "granted") {
              window.addEventListener("deviceorientation", handleOrientation, { passive: true });
            }
          } catch (_) {}
          window.removeEventListener("touchstart", requestIOSPermission);
          window.removeEventListener("click", requestIOSPermission);
        };
        window.addEventListener("touchstart", requestIOSPermission, { once: true });
        window.addEventListener("click", requestIOSPermission, { once: true });
      } else {
        // Direct event listener for Android & modern browsers
        window.addEventListener("deviceorientation", handleOrientation, { passive: true });
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  const totalOffsetX = Math.max(-1.5, Math.min(1.5, mouseOffset.x + gyroOffset.x));
  const totalOffsetY = Math.max(-1.5, Math.min(1.5, mouseOffset.y + gyroOffset.y));

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



      {/* ── Main Hero Content ───────────────────────────────────────── */}
      <div
        className="container-site relative z-10 w-full"
        style={{ maxWidth: "1440px", margin: "0 auto" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Eyebrow + Clipped Headline + Bio + CTAs */}
          <div className="lg:col-span-8">
            
            {/* Eyebrow status row */}
            <div
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
            </div>

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
                  overflow: "visible",
                  paddingBottom: "0.08em",
                }}
              >
                {/* Word 1: "Innovation." */}
                <span style={{ display: "inline-block" }}>
                  <motion.span
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={springs.snappy}
                    style={{ display: "inline-block" }}
                  >
                    {word1}
                  </motion.span>
                </span>

                {/* Word 2: "Create." */}
                {word2 && (
                  <span style={{ display: "inline-block" }}>
                    <motion.span
                      whileHover={{ y: -3, scale: 1.01 }}
                      transition={springs.snappy}
                      style={{ display: "inline-block" }}
                    >
                      {word2}
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
                  <span style={{ display: "inline-block" }}>
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
                  </span>

                  {/* Coral Hand-Drawn Underline SVG */}
                  <svg
                    key={underlineKey}
                    aria-hidden="true"
                    viewBox="0 0 280 20"
                    fill="none"
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
                    <path
                      d="M4 14 C 70 3, 160 2, 276 11"
                      stroke="var(--coral)"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
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

          {/* Right Column: Floating Interactive Official Brand Mark (Gyro + Mouse 3D Tilt) */}
          <div
            className="lg:col-span-4 mt-8 lg:mt-0 relative flex items-center justify-center min-h-[320px] sm:min-h-[400px]"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              animate={{
                x: totalOffsetX * 32,
                y: totalOffsetY * 32 + (isMounted ? 4 : 0),
                rotateX: totalOffsetY * -22,
                rotateY: totalOffsetX * 22,
                rotateZ: [0, 1.5, -1.5, 0],
              }}
              transition={{
                x: { type: "spring", stiffness: 95, damping: 20 },
                y: { type: "spring", stiffness: 95, damping: 20 },
                rotateX: { type: "spring", stiffness: 95, damping: 20 },
                rotateY: { type: "spring", stiffness: 95, damping: 20 },
                rotateZ: { duration: 9, repeat: Infinity, ease: "easeInOut" },
              }}
              className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] select-none flex items-center justify-center"
              style={{
                opacity: 0.95,
                transformOrigin: "center center",
                transformStyle: "preserve-3d",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/the-intelliverse-mark.png"
                alt="The Intelliverse Brand Mark"
                width={420}
                height={420}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain pointer-events-none"
                style={{
                  filter: `drop-shadow(${totalOffsetX * -14}px ${25 + totalOffsetY * -14}px 45px rgba(61, 123, 247, 0.26))`,
                  transition: "filter 0.15s ease-out",
                }}
              />
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
