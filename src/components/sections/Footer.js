"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { springs } from "@/lib/motion";
import { useCursorContext } from "@/components/cursor/CursorProvider";

export default function Footer({ data = null } = {}) {
  let isEnabled = true;
  let toggleCursor = () => { };

  try {
    const cursor = useCursorContext();
    isEnabled = cursor.isEnabled;
    toggleCursor = cursor.toggleCursor;
  } catch {
    // Outside CursorProvider safe fallback
  }

  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const wordmarkX = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  const backToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      data-theme="night"
      style={{
        backgroundColor: "var(--night)",
        color: "#F6F7FC",
        borderTop: "1px solid var(--line-2)",
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {/* ── GIANT KINETIC LUXURY WORDMARK MARQUEE ── */}
      <div
        className="relative overflow-hidden group select-none"
        style={{
          paddingTop: "clamp(3rem, 6vh, 5.5rem)",
          paddingBottom: "clamp(2rem, 4vh, 3rem)",
          borderBottom: "1px solid rgba(246, 247, 252, 0.08)",
          background: "radial-gradient(ellipse 75% 85% at 50% 60%, rgba(61, 123, 247, 0.12) 0%, rgba(224, 86, 36, 0.04) 50%, transparent 85%)",
        }}
        aria-hidden="true"
      >
        {/* Subtle architectural background grid */}
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-10" />

        {/* Ambient Top Light Beam */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(61, 123, 247, 0.4), rgba(253, 179, 71, 0.5), rgba(61, 123, 247, 0.4), transparent)",
          }}
        />

        {/* CSS Keyframes for infinite kinetic marquee */}
        <style>{`
          @keyframes footer-wordmark-left {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes footer-ticker-right {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
          .animate-footer-wordmark {
            display: flex;
            width: max-content;
            animation: footer-wordmark-left 48s linear infinite;
          }
          .animate-footer-ticker {
            display: flex;
            width: max-content;
            animation: footer-ticker-right 34s linear infinite;
          }
          .animate-footer-wordmark:hover,
          .animate-footer-ticker:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Primary Row: Monumental Editorial Serif Wordmark */}
        <motion.div
          style={{ x: wordmarkX }}
          className="overflow-hidden whitespace-nowrap will-change-transform"
        >
          <div className="animate-footer-wordmark flex items-center">
            {[1, 2].map((loopIdx) => (
              <div key={loopIdx} className="flex items-center">
                {/* 1. Filled Iridescent Gradient */}
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(5rem, 13vw, 14.5rem)",
                    lineHeight: 0.85,
                    letterSpacing: "-0.04em",
                    backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(61, 123, 247, 0.48) 40%, rgba(253, 179, 71, 0.4) 80%, rgba(255, 255, 255, 0.3) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    padding: "0 2rem",
                    transition: "opacity 0.3s ease",
                  }}
                >
                  The Intelliverse
                </span>

                {/* Separator 1: Studio Badge + Star */}
                <span className="inline-flex items-center gap-3 px-6 opacity-50">
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "clamp(0.75rem, 1.2vw, 1.05rem)",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--orange)",
                      border: "1px solid rgba(253, 179, 71, 0.35)",
                      borderRadius: "999px",
                      padding: "0.35rem 0.85rem",
                    }}
                  >
                    Ahmedabad · Worldwide
                  </span>
                  <span style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.75rem)", color: "var(--orange)" }}>✦</span>
                </span>

                {/* 2. Hollow Outlined Architectural Typography */}
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(5rem, 13vw, 14.5rem)",
                    lineHeight: 0.85,
                    letterSpacing: "-0.04em",
                    color: "transparent",
                    WebkitTextStroke: "1.5px rgba(246, 247, 252, 0.28)",
                    display: "inline-block",
                    padding: "0 2rem",
                  }}
                >
                  The Intelliverse
                </span>

                {/* Separator 2: Glowing Dot Cluster */}
                <span className="inline-flex items-center gap-2 px-6 opacity-60">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3D7BF7] shadow-[0_0_8px_#3D7BF7]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FDB347] shadow-[0_0_8px_#FDB347]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B7B] shadow-[0_0_8px_#FF6B7B]" />
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "clamp(0.75rem, 1.2vw, 1.05rem)",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(246, 247, 252, 0.75)",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Open Workshop
                  </span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Secondary Row: Technical Telemetry Ticker (Reverse Running) */}
        <div className="overflow-hidden whitespace-nowrap mt-4 opacity-60 hover:opacity-100 transition-opacity">
          <div className="animate-footer-ticker flex items-center">
            {[1, 2].map((loopIdx) => (
              <div key={loopIdx} className="flex items-center gap-8 px-4">
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.6875rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(246, 247, 252, 0.65)" }}>
                  <span style={{ color: "var(--orange)", marginRight: "0.5rem" }}>01</span> INNOVATION · CREATE · GROW
                </span>
                <span style={{ color: "var(--orange)", opacity: 0.5 }}>✦</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.6875rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(246, 247, 252, 0.65)" }}>
                  <span style={{ color: "var(--blue)", marginRight: "0.5rem" }}>02</span> SUB-SECOND NEXT.JS &amp; REACT 19 ARCHITECTURES
                </span>
                <span style={{ color: "var(--blue)", opacity: 0.5 }}>✦</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.6875rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(246, 247, 252, 0.65)" }}>
                  <span style={{ color: "var(--coral)", marginRight: "0.5rem" }}>03</span> 100% IP &amp; REPOSITORY OWNERSHIP · ZERO LOCK-IN
                </span>
                <span style={{ color: "var(--coral)", opacity: 0.5 }}>✦</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.6875rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(246, 247, 252, 0.65)" }}>
                  <span style={{ color: "#10b981", marginRight: "0.5rem" }}>04</span> APPOINTOARY · VRIX JEWELLERY · ENTERPRISE CLOUD
                </span>
                <span style={{ color: "#10b981", opacity: 0.5 }}>✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Navigation Grid (5 Columns) */}
      <div
        className="container-site"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          paddingTop: "clamp(3.5rem, 6vh, 5rem)",
          paddingBottom: "clamp(3.5rem, 6vh, 5rem)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Col 1: Brand & Studio Telemetry (4 cols) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "var(--live)",
                  boxShadow: "0 0 8px var(--live)",
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#F6F7FC",
                  fontWeight: 700,
                }}
              >
                The Intelliverse
              </span>
            </div>

            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: "0.9375rem",
                lineHeight: 1.65,
                color: "rgba(246, 247, 252, 0.7)",
                maxWidth: "22rem",
                marginBottom: "1.5rem",
              }}
            >
              Independent software studio, web systems architect &amp; dedicated IT services built with uncompromising craft. Engineered in Ahmedabad, Gujarat, collaborating worldwide.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.35rem 0.75rem",
                borderRadius: "6px",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                color: "var(--orange)",
              }}
            >
              <span>STATUS:</span>
              <span style={{ color: "rgba(246,247,252,0.8)" }}>Taking Q1 / Q2 Projects</span>
            </div>
          </div>

          {/* Col 2: Services (2 cols) */}
          <div className="lg:col-span-2">
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--orange)",
                marginBottom: "1.25rem",
                fontWeight: 700,
              }}
            >
              Services
            </p>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {[
                { label: "Web Architecture", href: "/services/web-development" },
                { label: "Custom SaaS Engines", href: "/services/software-engineering" },
                { label: "Cloud & DevOps IT", href: "/services/it-architecture-support" },
                { label: "Applied AI Workflows", href: "/services/ai-data-robotics-iot" },
              ].map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.75rem",
                      color: "rgba(246, 247, 252, 0.65)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246, 247, 252, 0.65)")}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Case Studies & Works (2 cols) */}
          <div className="lg:col-span-2">
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--orange)",
                marginBottom: "1.25rem",
                fontWeight: 700,
              }}
            >
              Works
            </p>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {[
                { label: "Appointory Case Study", href: "/work/appointory" },
                { label: "Vrix Jewellery Study", href: "/work/vrix" },
                { label: "Interactive Sketchbook", href: "/landing-pages/meng-to-sketchbook.html" },
                { label: "Scoping Estimator", href: "/#estimator" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.75rem",
                      color: "rgba(246, 247, 252, 0.65)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246, 247, 252, 0.65)")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Studio Changelog (2 cols) */}
          <div className="lg:col-span-2">
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--orange)",
                marginBottom: "1.25rem",
                fontWeight: 700,
              }}
            >
              Studio Releases
            </p>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {[
                { tag: "v2.4", note: "Open Workshop Redesign" },
                { tag: "v2.3", note: "Live Telemetry & Flywheel" },
                { tag: "v2.2", note: "Vrix Headless Storefront" },
                { tag: "v2.1", note: "Appointory Real-Time Dispatch" },
              ].map((rel, i) => (
                <li key={i} className="flex items-baseline gap-2">
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.625rem",
                      padding: "0.15rem 0.35rem",
                      backgroundColor: "rgba(61,123,247,0.2)",
                      borderRadius: "3px",
                      color: "var(--blue)",
                      fontWeight: 700,
                    }}
                  >
                    {rel.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.6875rem",
                      color: "rgba(246, 247, 252, 0.6)",
                    }}
                  >
                    {rel.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Connect & Channels (2 cols) */}
          <div className="lg:col-span-2">
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--orange)",
                marginBottom: "1.25rem",
                fontWeight: 700,
              }}
            >
              Connect
            </p>
            <ul className="space-y-2.5 list-none p-0 m-0">
              <li>
                <a
                  href={`mailto:${data?.email || "theintelliverse@gmail.com"}`}
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.75rem",
                    color: "rgba(246, 247, 252, 0.65)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246, 247, 252, 0.65)")}
                >
                  Founder Email ↗
                </a>
              </li>
              <li>
                <a
                  href={data?.linkedin || "https://www.linkedin.com/company/the-intelliverse/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.75rem",
                    color: "rgba(246, 247, 252, 0.65)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246, 247, 252, 0.65)")}
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={data?.instagram || "https://www.instagram.com/the_intelliverse/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.75rem",
                    color: "rgba(246, 247, 252, 0.65)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246, 247, 252, 0.65)")}
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <Link
                  href="/llms.txt"
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.75rem",
                    color: "var(--orange)",
                    textDecoration: "none",
                  }}
                >
                  /llms.txt ↗
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Colophon Bar */}
      <div style={{ borderTop: "1px solid rgba(246, 247, 252, 0.08)" }}>
        <div
          className="container-site flex justify-between items-center flex-wrap gap-4 py-6"
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            fontSize: "0.75rem",
            fontFamily: "var(--mono)",
            color: "rgba(246, 247, 252, 0.5)",
          }}
        >
          <span>© 2026 The Intelliverse. All rights reserved. Zero-Template Open Workshop.</span>

          <div className="flex items-center gap-5 flex-wrap">
            <button
              onClick={toggleCursor}
              data-cursor="link"
              aria-label="Toggle custom cursor system"
              style={{
                background: "transparent",
                border: "1px solid rgba(246, 247, 252, 0.2)",
                borderRadius: "999px",
                padding: "0.3rem 0.85rem",
                color: isEnabled ? "var(--orange)" : "rgba(246, 247, 252, 0.4)",
                cursor: "pointer",
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: isEnabled ? "var(--orange)" : "rgba(246, 247, 252, 0.25)",
                }}
              />
              Cursor: {isEnabled ? "on" : "off"}
            </button>

            <motion.button
              onClick={backToTop}
              data-cursor="link"
              whileHover={{ y: -3 }}
              transition={springs.snappy}
              style={{
                background: "none",
                border: "none",
                color: "#F6F7FC",
                cursor: "pointer",
                fontFamily: "var(--mono)",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Back to Top ↑
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
