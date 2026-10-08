"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { springs, ease, scaleIn, fadeUp, staggerContainer } from "@/lib/motion";
import SplitTextReveal from "@/components/ui/SplitTextReveal";

const DEFAULT_PROJECTS = [
  {
    num: "01",
    letter: "A",
    bandColor: "var(--blue-deep)",
    name: "Appointory",
    category: "Healthcare SaaS · Clinic OS",
    role: "Full-Stack Product Architecture & Real-Time Cloud Integration",
    stack: ["Next.js 15", "Node.js", "MongoDB", "Cloud Messaging", "Tailwind CSS"],
    problem: "Clinic queues were chaotic and uncoordinated, causing high patient walkouts.",
    broke: "Legacy polling sockets choked on peak Monday morning appointment rushes.",
    result: "Sub-50ms dispatch queues, zero dropped alerts, 100% secure health records.",
    link: "https://appointory.in",
    caseStudyLink: "/work/appointory",
  },
  {
    num: "02",
    letter: "V",
    bandColor: "var(--coral)",
    name: "Vrix Jewellery",
    category: "Luxury E-Commerce · Headless",
    role: "Headless E-Commerce Architecture & AI Product Concierge",
    stack: ["Next.js", "Shopify Storefront", "Multi-Currency", "Tailwind CSS"],
    problem: "Global luxury buyers abandoned carts due to static currency & slow image pipelines.",
    broke: "Monolithic e-commerce template bloated first contentful paint past 4.2 seconds.",
    result: "Instant headless edge routing, 99 Core Web Vitals, 3.4x overseas checkout growth.",
    link: "https://vrix.in",
    caseStudyLink: "/work/vrix",
  },
];

export default function Projects({ data, caseStudies }) {
  const [activeView, setActiveView] = useState("journals"); // "journals" | "sketchbook"

  // Slot 03 Inline Commission Form State
  const [isSlotCommissionOpen, setIsSlotCommissionOpen] = useState(false);
  const [slotName, setSlotName] = useState("");
  const [slotEmail, setSlotEmail] = useState("");
  const [slotMessage, setSlotMessage] = useState(
    `COMMISSION BRIEF · SLOT 03 RESERVATION:\n• Target Window: Upcoming Quarter\n• Delivery Model: Direct Founder Engineering Sprint (Fixed Milestones)\n\nProject Scope / Technical Roadblock:\n[Describe your software application, SaaS platform, or engineering challenge here...]`
  );
  const [slotConsent, setSlotConsent] = useState(true);
  const [slotSubmitting, setSlotSubmitting] = useState(false);
  const [slotSuccess, setSlotSuccess] = useState(false);
  const [slotError, setSlotError] = useState("");

  const handleSlotCommissionSubmit = async (e) => {
    e.preventDefault();
    if (!slotName.trim() || !slotEmail.trim() || !slotMessage.trim()) {
      setSlotError("Please fill out your name, email, and project scope.");
      return;
    }
    if (!slotConsent) {
      setSlotError("Consent under the DPDP Act, 2023 is required to process this commission.");
      return;
    }

    setSlotSubmitting(true);
    setSlotError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: slotName.trim(),
          email: slotEmail.trim(),
          message: slotMessage.trim(),
          dpdpConsent: true,
          consentTimestamp: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSlotSuccess(true);
      } else {
        setSlotError(data.error || "Failed to submit commission request. Please try again.");
      }
    } catch (err) {
      setSlotError("Network error. Please try again.");
    } finally {
      setSlotSubmitting(false);
    }
  };

  const displayProjects =
    caseStudies && caseStudies.length > 0
      ? caseStudies
      : data && data.length > 0
      ? data
      : DEFAULT_PROJECTS;

  return (
    <section
      id="projects"
      data-theme="cream"
      className="sketchbook-section relative border-t border-[var(--line)]"
      style={{
        backgroundColor: "var(--paper)",
        color: "var(--ink)",
        paddingTop: "clamp(5rem, 9vh, 7.5rem)",
        paddingBottom: "clamp(5rem, 9vh, 7.5rem)",
      }}
      aria-label="Works & Case Studies"
    >
      <div className="container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>
        
        {/* Section Heading & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
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
                Production Case Studies &amp; Works
              </span>
            </div>

            <SplitTextReveal
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--ink)] tracking-tight leading-none"
            >
              Tactile craft meets engineering precision.
            </SplitTextReveal>

            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: "1.0625rem",
                lineHeight: 1.65,
                color: "var(--ink-2)",
                maxWidth: "42rem",
                marginTop: "0.85rem",
              }}
            >
              Every engagement is documented as an open technical journal: what was broken, how we designed the system, and the empirical production metrics that followed.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 bg-[rgba(14,27,61,0.06)] p-1.5 rounded-full self-start md:self-auto border border-[var(--line)]">
            <button
              onClick={() => setActiveView("journals")}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.75rem",
                padding: "0.45rem 1rem",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                backgroundColor: activeView === "journals" ? "var(--night)" : "transparent",
                color: activeView === "journals" ? "#F6F7FC" : "var(--ink-2)",
                transition: "all 0.2s ease",
              }}
            >
              Technical Journals
            </button>
            <button
              onClick={() => setActiveView("sketchbook")}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.75rem",
                padding: "0.45rem 1rem",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                backgroundColor: activeView === "sketchbook" ? "var(--night)" : "transparent",
                color: activeView === "sketchbook" ? "#F6F7FC" : "var(--ink-2)",
                transition: "all 0.2s ease",
              }}
            >
              Tactile Sketchbook ↗
            </button>
          </div>
        </div>

        {/* ── VIEW 1: TECHNICAL JOURNALS (3-Column Editorial Grid) ──── */}
        {activeView === "journals" && (
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Project 1 & 2 Cards */}
            {displayProjects.map((p, idx) => {
              const letter = p.letter || (p.name ? p.name.charAt(0) : "P");
              const band = p.bandColor || (idx === 0 ? "var(--blue-deep)" : "var(--coral)");
              const stack = p.stack || p.techTags || [];
              const caseStudyUrl =
                p.caseStudyLink ||
                p.caseStudyUrl ||
                (p.name?.toLowerCase().includes("appointory")
                  ? "/work/appointory"
                  : p.name?.toLowerCase().includes("vrix")
                  ? "/work/vrix"
                  : null);

              return (
                <motion.article
                  key={p.num || idx}
                  variants={scaleIn}
                  whileHover={{ y: -8, transition: springs.snappy }}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.85)",
                    border: "1px solid var(--line-2)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    boxShadow: "0 12px 30px -10px rgba(14,27,61,0.06)",
                  }}
                >
                  {/* Top Color Band */}
                  <div style={{ height: "6px", backgroundColor: band }} />

                  {/* Watermark Ghost Letter */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "1.5rem",
                      right: "1.5rem",
                      fontFamily: "var(--serif)",
                      fontSize: "7.5rem",
                      lineHeight: 0.8,
                      color: "rgba(14,27,61,0.04)",
                      pointerEvents: "none",
                      fontWeight: 400,
                      userSelect: "none",
                    }}
                  >
                    {letter}
                  </span>

                  <div style={{ padding: "2rem" }}>
                    {/* Header: Number & Category */}
                    <div className="flex justify-between items-baseline mb-3">
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "var(--blue-deep)",
                        }}
                      >
                        JOURNAL 0{idx + 1}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "0.6875rem",
                          color: "var(--ink-3)",
                          textTransform: "uppercase",
                        }}
                      >
                        {p.category || "Web Architecture"}
                      </span>
                    </div>

                    {/* Project Title with Link to Case Study */}
                    <div className="flex justify-between items-start gap-3 mb-4">
                      <h3
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: "2.35rem",
                          lineHeight: 1.1,
                          letterSpacing: "-0.02em",
                          color: "var(--ink)",
                          margin: 0,
                        }}
                      >
                        {caseStudyUrl ? (
                          <Link
                            href={caseStudyUrl}
                            className="hover:text-[var(--blue-deep)] transition"
                            style={{ textDecoration: "none", color: "inherit" }}
                            title={`View ${p.name} In-Depth Case Study`}
                          >
                            {p.name}
                          </Link>
                        ) : (
                          p.name
                        )}
                      </h3>

                      {caseStudyUrl && (
                        <Link
                          href={caseStudyUrl}
                          className="shrink-0 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[rgba(47,99,224,0.08)] text-[var(--blue-deep)] border border-[rgba(47,99,224,0.2)] hover:bg-[var(--blue-deep)] hover:text-white transition mt-1"
                          style={{ textDecoration: "none" }}
                          title={`Read ${p.name} Case Study`}
                        >
                          Study ↗
                        </Link>
                      )}
                    </div>

                    {/* Problem / Broke / Result Rows */}
                    <div className="space-y-3 mb-6">
                      <div
                        style={{
                          backgroundColor: "var(--bg-2)",
                          padding: "0.75rem 1rem",
                          borderRadius: "8px",
                          borderLeft: "3px solid var(--ink-3)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "0.5625rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--ink-3)",
                            display: "block",
                            marginBottom: "0.2rem",
                            fontWeight: 700,
                          }}
                        >
                          PROBLEM
                        </span>
                        <p
                          style={{
                            fontFamily: "var(--sans)",
                            fontSize: "0.8125rem",
                            color: "var(--ink-2)",
                            margin: 0,
                            lineHeight: 1.5,
                          }}
                        >
                          {p.problem || p.summary || "Legacy workflow needed complete modern cloud refactoring."}
                        </p>
                      </div>

                      <div
                        style={{
                          backgroundColor: "rgba(255, 107, 123, 0.08)",
                          padding: "0.75rem 1rem",
                          borderRadius: "8px",
                          borderLeft: "3px solid var(--coral)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "0.5625rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--coral)",
                            display: "block",
                            marginBottom: "0.2rem",
                            fontWeight: 700,
                          }}
                        >
                          BOTTLENECK
                        </span>
                        <p
                          style={{
                            fontFamily: "var(--sans)",
                            fontSize: "0.8125rem",
                            color: "var(--ink)",
                            margin: 0,
                            lineHeight: 1.5,
                          }}
                        >
                          {p.broke || "Previous architecture choked under peak concurrency."}
                        </p>
                      </div>

                      <div
                        style={{
                          backgroundColor: "rgba(34, 165, 91, 0.08)",
                          padding: "0.75rem 1rem",
                          borderRadius: "8px",
                          borderLeft: "3px solid var(--live)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "0.5625rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--live)",
                            display: "block",
                            marginBottom: "0.2rem",
                            fontWeight: 700,
                          }}
                        >
                          RESULT
                        </span>
                        <p
                          style={{
                            fontFamily: "var(--sans)",
                            fontSize: "0.8125rem",
                            color: "var(--ink)",
                            margin: 0,
                            lineHeight: 1.5,
                            fontWeight: 500,
                          }}
                        >
                          {p.result || p.impact || "Zero downtime, high throughput, and seamless UX."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Tech Stack & Live Link */}
                  <div
                    style={{
                      padding: "1.25rem 2rem",
                      borderTop: "1px solid var(--line)",
                      backgroundColor: "rgba(255,255,255,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.75rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {stack.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "0.625rem",
                            padding: "0.2rem 0.5rem",
                            backgroundColor: "var(--cream)",
                            border: "1px solid var(--line)",
                            borderRadius: "4px",
                            color: "var(--ink)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2.5">
                      {caseStudyUrl && (
                        <Link
                          href={caseStudyUrl}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--night)] hover:bg-[var(--blue-deep)] text-white transition duration-200 shadow-sm"
                          style={{
                            fontFamily: "var(--sans)",
                            textDecoration: "none",
                          }}
                        >
                          <span>Case Study</span>
                          <span>→</span>
                        </Link>
                      )}

                      {p.link && (
                        <motion.a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 3 }}
                          transition={springs.snappy}
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "0.6875rem",
                            fontWeight: 600,
                            color: "var(--ink-2)",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                          className="hover:text-[var(--blue-deep)] transition"
                          title={`Visit live site for ${p.name}`}
                        >
                          <span>Live Site</span>
                          <span>↗</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}

            {/* Card 3: Commission Slot 03 ("Yours") */}
            <motion.article
              variants={scaleIn}
              whileHover={{ y: -8, transition: springs.snappy }}
              style={{
                backgroundColor: "var(--night)",
                color: "#F6F7FC",
                border: "1px solid rgba(246, 247, 252, 0.15)",
                borderRadius: "20px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                boxShadow: "0 14px 34px -10px rgba(14,27,61,0.25)",
              }}
            >
              {/* Amber top band */}
              <div style={{ height: "6px", backgroundColor: "var(--orange)" }} />

              {/* Decorative Floating Mini Orbs */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  width: "70px",
                  height: "70px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    backgroundColor: "var(--blue)",
                    opacity: 0.35,
                    animation: "float 6s ease-in-out infinite",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "var(--orange)",
                    opacity: 0.4,
                    animation: "float 7s ease-in-out infinite reverse",
                  }}
                />
              </div>

              {isSlotCommissionOpen ? (
                slotSuccess ? (
                  <div
                    style={{
                      padding: "2.5rem 2rem",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      minHeight: "440px",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(235, 94, 40, 0.15)",
                        color: "var(--orange)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.75rem",
                        fontWeight: 700,
                        marginBottom: "1rem",
                      }}
                    >
                      ✓
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: "2rem",
                        color: "#F6F7FC",
                        marginBottom: "0.5rem",
                        lineHeight: 1.15,
                      }}
                    >
                      Commission Brief Received!
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "0.875rem",
                        color: "rgba(246,247,252,0.75)",
                        lineHeight: 1.6,
                        maxWidth: "22rem",
                        marginBottom: "1.5rem",
                      }}
                    >
                      Thank you, <strong>{slotName || "there"}</strong>. Founders Dhruvil &amp; Rudra have received your Slot 03 reservation and will review your technical scope within 24 hours at <strong>{slotEmail}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSlotSuccess(false);
                        setIsSlotCommissionOpen(false);
                      }}
                      style={{
                        padding: "0.75rem 1.5rem",
                        borderRadius: "999px",
                        backgroundColor: "var(--orange)",
                        color: "var(--ink)",
                        fontFamily: "var(--sans)",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 8px 20px -6px rgba(235,94,40,0.5)",
                      }}
                    >
                      ← Back to Slot Overview
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "1.75rem 2rem",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      {/* Header with Close */}
                      <div className="flex justify-between items-baseline mb-2">
                        <span
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: "var(--orange)",
                          }}
                        >
                          SLOT 03 · DIRECT COMMISSION
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsSlotCommissionOpen(false)}
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "0.6875rem",
                            color: "rgba(246,247,252,0.5)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                          className="hover:text-white transition"
                        >
                          ✕ Close
                        </button>
                      </div>

                      <h3
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: "1.85rem",
                          color: "#F6F7FC",
                          lineHeight: 1.15,
                          margin: "0 0 0.35rem 0",
                        }}
                      >
                        Commission This Slot.
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--sans)",
                          fontSize: "0.8125rem",
                          color: "rgba(246,247,252,0.7)",
                          margin: "0 0 1rem 0",
                        }}
                      >
                        Direct founder engineering · Fixed sprint milestones · Zero agency bloat
                      </p>

                      {slotError && (
                        <div
                          style={{
                            padding: "0.55rem 0.75rem",
                            borderRadius: "6px",
                            backgroundColor: "rgba(239,68,68,0.15)",
                            border: "1px solid rgba(239,68,68,0.3)",
                            color: "#fca5a5",
                            fontSize: "0.75rem",
                            marginBottom: "0.75rem",
                            fontFamily: "var(--mono)",
                          }}
                        >
                          {slotError}
                        </div>
                      )}

                      <form onSubmit={handleSlotCommissionSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                        <div>
                          <label
                            style={{
                              display: "block",
                              fontFamily: "var(--mono)",
                              fontSize: "0.625rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                              color: "rgba(246,247,252,0.6)",
                              marginBottom: "0.2rem",
                            }}
                          >
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={slotName}
                            onChange={(e) => setSlotName(e.target.value)}
                            placeholder="e.g. Dhruvil Patel"
                            style={{
                              width: "100%",
                              padding: "0.5rem 0.75rem",
                              borderRadius: "8px",
                              backgroundColor: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(246,247,252,0.15)",
                              color: "#FFFFFF",
                              fontSize: "0.8125rem",
                              outline: "none",
                            }}
                          />
                        </div>

                        <div>
                          <label
                            style={{
                              display: "block",
                              fontFamily: "var(--mono)",
                              fontSize: "0.625rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                              color: "rgba(246,247,252,0.6)",
                              marginBottom: "0.2rem",
                            }}
                          >
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={slotEmail}
                            onChange={(e) => setSlotEmail(e.target.value)}
                            placeholder="e.g. founder@company.com"
                            style={{
                              width: "100%",
                              padding: "0.5rem 0.75rem",
                              borderRadius: "8px",
                              backgroundColor: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(246,247,252,0.15)",
                              color: "#FFFFFF",
                              fontSize: "0.8125rem",
                              outline: "none",
                            }}
                          />
                        </div>

                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.2rem" }}>
                            <label
                              style={{
                                fontFamily: "var(--mono)",
                                fontSize: "0.625rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "rgba(246,247,252,0.6)",
                              }}
                            >
                              Commission Scope (Editable) *
                            </label>
                            <span style={{ fontFamily: "var(--mono)", fontSize: "0.5625rem", color: "var(--orange)" }}>Editable</span>
                          </div>
                          <textarea
                            required
                            rows={4}
                            value={slotMessage}
                            onChange={(e) => setSlotMessage(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "0.5rem 0.75rem",
                              borderRadius: "8px",
                              backgroundColor: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(246,247,252,0.15)",
                              color: "#FFFFFF",
                              fontSize: "0.75rem",
                              fontFamily: "var(--mono)",
                              outline: "none",
                              resize: "none",
                              lineHeight: 1.45,
                            }}
                          />
                        </div>

                        <label style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", cursor: "pointer", marginTop: "0.1rem" }}>
                          <input
                            type="checkbox"
                            checked={slotConsent}
                            onChange={(e) => setSlotConsent(e.target.checked)}
                            required
                            style={{ marginTop: "2px" }}
                          />
                          <span style={{ fontSize: "0.6875rem", color: "rgba(246,247,252,0.6)", lineHeight: 1.3 }}>
                            I consent under DPDP Act, 2023 to process this commission inquiry.
                          </span>
                        </label>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginTop: "0.5rem" }}>
                          <button
                            type="submit"
                            disabled={slotSubmitting}
                            style={{
                              width: "100%",
                              padding: "0.75rem 1.25rem",
                              borderRadius: "999px",
                              backgroundColor: "var(--orange)",
                              color: "var(--ink)",
                              fontFamily: "var(--sans)",
                              fontWeight: 700,
                              fontSize: "0.8125rem",
                              border: "none",
                              cursor: "pointer",
                              boxShadow: "0 8px 20px -6px rgba(235,94,40,0.5)",
                              opacity: slotSubmitting ? 0.6 : 1,
                            }}
                          >
                            {slotSubmitting ? "Submitting Commission..." : "Transmit Commission Brief →"}
                          </button>

                          <button
                            type="button"
                            onClick={() => setIsSlotCommissionOpen(false)}
                            style={{
                              width: "100%",
                              background: "none",
                              border: "none",
                              color: "rgba(246,247,252,0.6)",
                              fontFamily: "var(--mono)",
                              fontSize: "0.6875rem",
                              cursor: "pointer",
                              padding: "0.25rem",
                            }}
                            className="hover:text-white transition"
                          >
                            ← Back to Slot Overview
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )
              ) : (
                <>
                  <div style={{ padding: "2rem" }}>
                    <div className="flex justify-between items-baseline mb-4">
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "var(--orange)",
                        }}
                      >
                        SLOT 03 · RESERVED
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "0.6875rem",
                          color: "rgba(246,247,252,0.5)",
                        }}
                      >
                        OPEN FOR COMMISSIONS
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: "2.35rem",
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        color: "#F6F7FC",
                        margin: "0 0 1.25rem 0",
                      }}
                    >
                      Your Software Here.
                    </h3>

                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "0.9375rem",
                        lineHeight: 1.65,
                        color: "rgba(246,247,252,0.78)",
                        marginBottom: "1.5rem",
                      }}
                    >
                      Bring us your most demanding technical roadblock. Whether building a full-stack SaaS from napkin sketch or rescuing a struggling legacy platform, we engineer for longevity.
                    </p>

                    <div
                      style={{
                        backgroundColor: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(246, 247, 252, 0.12)",
                        borderRadius: "8px",
                        padding: "1rem",
                        fontFamily: "var(--mono)",
                        fontSize: "0.6875rem",
                        color: "var(--orange)",
                        lineHeight: 1.5,
                      }}
                    >
                      ✦ TAKING 2 NEW CLIENTS FOR UPCOMING QUARTER
                      <br />
                      <span style={{ color: "rgba(246,247,252,0.55)", fontSize: "0.625rem" }}>
                        Direct founder engineering · Fixed sprint milestones · Zero agency bloat
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "1.25rem 2rem",
                      borderTop: "1px solid rgba(246, 247, 252, 0.12)",
                      backgroundColor: "rgba(0,0,0,0.25)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setIsSlotCommissionOpen(true)}
                      className="btn-primary w-full text-center block cursor-pointer"
                      style={{
                        backgroundColor: "var(--orange)",
                        color: "var(--ink)",
                        fontFamily: "var(--sans)",
                        fontWeight: 700,
                        padding: "0.75rem 1.25rem",
                        borderRadius: "999px",
                        border: "none",
                      }}
                    >
                      Commission This Slot →
                    </button>
                  </div>
                </>
              )}
            </motion.article>
          </motion.div>
        )}

        {/* ── VIEW 2: INTERACTIVE SKETCHBOOK EMBED ───────────────────── */}
        {activeView === "sketchbook" && (
          <div
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--line-2)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 18px 45px rgba(14,27,61,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 1.5rem",
                backgroundColor: "rgba(14,27,61,0.03)",
                borderBottom: "1px solid var(--line)",
                fontFamily: "var(--mono)",
                fontSize: "0.75rem",
                color: "var(--ink-2)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--live)] animate-ping" />
                <span className="font-semibold text-[var(--ink)]">
                  Tactile MengTo Sketchbook View
                </span>
              </div>
              <a
                href="/landing-pages/meng-to-sketchbook.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-[var(--blue-deep)] font-medium"
              >
                Open Fullscreen ↗
              </a>
            </div>

            <iframe
              src="/landing-pages/meng-to-sketchbook.html?embedded=true"
              title="The Intelliverse — Project Sketchbook"
              style={{
                width: "100%",
                height: "clamp(540px, 75vh, 760px)",
                border: "none",
                display: "block",
              }}
            />
          </div>
        )}

      </div>
    </section>
  );
}
