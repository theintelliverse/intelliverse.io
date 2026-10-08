"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { springs, ease, scaleIn, fadeUp, staggerContainer } from "@/lib/motion";
import Magnetic from "@/components/ui/Magnetic";
import { trackEstimatorComplete } from "@/lib/analytics";

const DEFAULT_TYPES = [
  { id: "starter", label: "Starter Web / Landing Page", baseRange: "₹15,000 – ₹45,000" },
  { id: "web", label: "Web Architecture / Next.js", baseRange: "₹45,000 – ₹1.5L" },
  { id: "mobile", label: "Mobile App (Android / iOS)", baseRange: "₹80,000 – ₹3.5L" },
  { id: "saas", label: "Custom SaaS Platform", baseRange: "₹1.5L – ₹8L+" },
  { id: "it", label: "Cloud & DevOps Architecture", baseRange: "₹25,000 – ₹1.2L" },
  { id: "ai", label: "Applied AI / Agentic Automation", baseRange: "₹40,000 – ₹2.5L+" },
];

const ESTIMATOR_CONFIG = {
  features: [
    { id: "auth", label: "Role-Based Auth & Security" },
    { id: "payments", label: "Multi-Currency Payments" },
    { id: "dashboard", label: "Real-time Telemetry Dashboard" },
    { id: "cms", label: "Headless CMS Management" },
    { id: "api", label: "Third-Party Microservices" },
    { id: "ai", label: "Agentic AI / RAG Workflows" },
  ],
  timelines: [
    { id: "asap", label: "Sprint Priority (2–3 Weeks)" },
    { id: "1month", label: "4–6 Weeks (Rapid Launch)" },
    { id: "3months", label: "2–3 Months (Full Architecture)" },
    { id: "flexible", label: "Ongoing Retainer / Partnership" },
  ],
};

const DEFAULT_INCLUDED_CHARGES = [
  { title: "100% IP & Full Source Code Ownership", badge: "INCLUDED", note: "Zero vendor lock-in; complete repository rights" },
  { title: "Cloud CI/CD & Zero-Downtime Deployment", badge: "INCLUDED", note: "Automated edge staging & production pipelines" },
  { title: "End-to-End Security & QA Audit", badge: "INCLUDED", note: "OWASP best practices & performance stress testing" },
  { title: "30-Day Post-Launch SLA Warranty", badge: "INCLUDED", note: "Dedicated bug resolution & uptime guarantees" },
];

export default function Estimator({ data }) {
  const types = data?.types && data.types.length > 0 ? data.types : DEFAULT_TYPES;
  const startingPrice = data?.startingPrice || "₹15,000";
  const includedCharges = data?.includedCharges && data.includedCharges.length > 0
    ? data.includedCharges
    : DEFAULT_INCLUDED_CHARGES;

  const [type, setType] = useState(types[0]?.id || "starter");
  const [features, setFeatures] = useState(["auth", "payments"]);
  const [timeline, setTimeline] = useState("1month");
  const [painPoint, setPainPoint] = useState("");
  const [copied, setCopied] = useState(false);

  // Inline Contact Form State
  const [isContactMode, setIsContactMode] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactConsent, setContactConsent] = useState(true);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");

  const selectedType = types.find((t) => t.id === type) || types[0];
  const selectedTimeline =
    ESTIMATOR_CONFIG.timelines.find((t) => t.id === timeline) ||
    ESTIMATOR_CONFIG.timelines[1];

  const toggleFeature = (id) => {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const generateBriefText = () => {
    const featureNames = features
      .map((fId) => ESTIMATOR_CONFIG.features.find((f) => f.id === fId)?.label)
      .filter(Boolean)
      .join(", ");

    const includedSummary = includedCharges.map((c) => c.title).join(", ");
    return `PROJECT BRIEF SPECIFICATION:\n• Architecture: ${selectedType?.label || "Custom Architecture"}\n• Scope Modules: ${featureNames || "Standard Stack"}\n• Target Launch Window: ${selectedTimeline?.label || "Standard Sprint"}\n• Core Bottleneck / What Hurts Today: ${painPoint.trim() || "Our team tracks every order in three spreadsheets…"}\n• Indicative Investment: ${selectedType?.baseRange || "N/A"}\n• Predefined Inclusions: ${includedSummary || "Production Inclusions"}\n\nProject Scope & Objectives:\n[Describe your specific requirements, custom integrations, or roadmap here...]`;
  };

  const handleOpenContact = () => {
    trackEstimatorComplete(selectedType?.label || "Unknown", selectedType?.baseRange || "N/A");
    const brief = generateBriefText();
    setContactMessage(brief);
    setContactSuccess(false);
    setContactError("");
    setIsContactMode(true);

    const summaryEl = document.getElementById("contact-message");
    if (summaryEl) {
      summaryEl.value = brief;
    }
  };

  const handleSendBrief = async (e) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError("Please fill out your name, email, and project brief.");
      return;
    }
    if (!contactConsent) {
      setContactError("Consent under the DPDP Act, 2023 is required to process this inquiry.");
      return;
    }

    setContactSubmitting(true);
    setContactError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName.trim(),
          email: contactEmail.trim(),
          message: contactMessage.trim(),
          dpdpConsent: true,
          consentTimestamp: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setContactSuccess(true);
      } else {
        setContactError(data.error || "Failed to transmit brief. Please try again.");
      }
    } catch (err) {
      setContactError("Network error. Please try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <section
      id="estimator"
      data-theme="cream"
      className="section-gap relative border-t border-[var(--line)]"
      style={{
        backgroundColor: "var(--cream)",
        color: "var(--ink)",
        paddingTop: "clamp(5rem, 9vh, 7.5rem)",
        paddingBottom: "clamp(5rem, 9vh, 7.5rem)",
      }}
    >
      <div className="container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>

        {/* Top Eyebrow Header */}
        <div className="flex justify-between items-center flex-wrap gap-4 mb-12">
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
              PROJECT BRIEF &amp; ESTIMATOR
            </span>
          </div>

          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.6875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              backgroundColor: "rgba(253, 179, 71, 0.2)",
              color: "var(--ink)",
              border: "1px solid var(--line-2)",
              fontWeight: 700,
            }}
          >
            Starting From {startingPrice}
          </span>
        </div>

        {/* 2-Column Layout: Left Controls, Right Rotating Paper Brief */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-stretch">

          {/* Left Column: Interactive Scope Chips & Options */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8 h-full">
            <div>
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  color: "var(--ink)",
                  margin: "0 0 1rem 0",
                  fontWeight: 400,
                }}
              >
                What are we building together?
              </h2>
              <p
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.65,
                  color: "var(--ink-2)",
                  maxWidth: "36rem",
                  margin: 0,
                }}
              >
                Select your architectural footprint and key technical modules below. Your live draft brief synchronizes in real time on the paper sheet.
              </p>
            </div>

            {/* Step 1: Architecture Category */}
            <div>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                01 / SELECT ARCHITECTURE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {types.map((t) => {
                  const isSelected = type === t.id;
                  return (
                    <motion.button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={springs.snappy}
                      style={{
                        padding: "0.95rem 1.15rem",
                        borderRadius: "12px",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                        border: `1px solid ${isSelected ? "var(--night)" : "var(--line-2)"}`,
                        backgroundColor: isSelected ? "var(--night)" : "rgba(255,255,255,0.7)",
                        color: isSelected ? "#F6F7FC" : "var(--ink)",
                        cursor: "pointer",
                        boxShadow: isSelected
                          ? "0 8px 20px -6px rgba(11,21,48,0.3)"
                          : "none",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--sans)",
                          fontSize: "0.9375rem",
                          fontWeight: isSelected ? 600 : 500,
                        }}
                      >
                        {t.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "0.6875rem",
                          color: isSelected ? "var(--orange)" : "var(--ink-3)",
                          fontWeight: 600,
                        }}
                      >
                        {t.baseRange}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Capability Modules */}
            <div>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                02 / KEY MODULES &amp; CAPABILITIES
              </span>
              <div className="flex flex-wrap gap-2.5">
                {ESTIMATOR_CONFIG.features.map((f) => {
                  const isSelected = features.includes(f.id);
                  return (
                    <motion.button
                      key={f.id}
                      onClick={() => toggleFeature(f.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={springs.snappy}
                      style={{
                        padding: "0.55rem 1rem",
                        borderRadius: "999px",
                        fontFamily: "var(--mono)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        border: `1px solid ${isSelected ? "var(--blue-deep)" : "var(--line-2)"}`,
                        backgroundColor: isSelected ? "var(--blue-deep)" : "rgba(255,255,255,0.7)",
                        color: isSelected ? "#ffffff" : "var(--ink)",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      <span>{isSelected ? "✓" : "+"}</span>
                      <span>{f.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Timeline */}
            <div>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                03 / DESIRED TIMELINE
              </span>
              <div className="flex flex-wrap gap-2.5">
                {ESTIMATOR_CONFIG.timelines.map((t) => {
                  const isSelected = timeline === t.id;
                  return (
                    <motion.button
                      key={t.id}
                      onClick={() => setTimeline(t.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={springs.snappy}
                      style={{
                        padding: "0.55rem 1rem",
                        borderRadius: "8px",
                        fontFamily: "var(--mono)",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        border: `1px solid ${isSelected ? "var(--night)" : "var(--line-2)"}`,
                        backgroundColor: isSelected ? "var(--night)" : "rgba(255,255,255,0.7)",
                        color: isSelected ? "#F6F7FC" : "var(--ink)",
                        cursor: "pointer",
                      }}
                    >
                      {t.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Core Bottleneck / What Hurts Today */}
            <div>
              <div className="flex items-center justify-between mb-2">
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
                  04 / CORE BOTTLENECK
                </span>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.625rem",
                    color: "var(--coral)",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  DISCOVERY QUESTION
                </span>
              </div>

              <label
                htmlFor="estimator-pain-point"
                style={{
                  display: "block",
                  fontFamily: "var(--serif)",
                  fontSize: "1.35rem",
                  color: "var(--ink)",
                  lineHeight: 1.25,
                  marginBottom: "0.65rem",
                }}
              >
                In one sentence, what hurts today?
              </label>

              <textarea
                id="estimator-pain-point"
                value={painPoint}
                onChange={(e) => setPainPoint(e.target.value)}
                rows={2}
                placeholder="Our team tracks every order in three spreadsheets…"
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255,255,255,0.85)",
                  border: "1px solid var(--line-2)",
                  color: "var(--ink)",
                  fontFamily: "var(--sans)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.5,
                  outline: "none",
                  resize: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s, background-color 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--blue-deep)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(47,99,224,0.12)";
                  e.target.style.backgroundColor = "#ffffff";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--line-2)";
                  e.target.style.boxShadow = "none";
                  e.target.style.backgroundColor = "rgba(255,255,255,0.85)";
                }}
              />
            </div>
          </div>

          {/* Right Column: Tactile Rotating Paper Brief Sheet */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <motion.div
              initial={{ rotate: 0.8, opacity: 0, y: 30 }}
              animate={{ rotate: 0.8, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: ease.expo }}
              className="h-full flex-1 flex flex-col justify-between"
              style={{
                backgroundColor: "#FCFAF4",
                border: "1px solid var(--line-2)",
                borderRadius: "16px",
                padding: isContactMode ? "2rem 1.75rem 1.5rem" : "2.5rem 2rem 2rem",
                boxShadow: "0 22px 50px -15px rgba(14,27,61,0.12)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "100%",
              }}
            >
              {/* Amber Tape Strip at Top (Tape Physics) */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%) rotate(-1deg)",
                  width: "120px",
                  height: "26px",
                  backgroundColor: "rgba(253, 179, 71, 0.75)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  borderRadius: "2px",
                }}
              />

              {/* Watermark Stamp */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: "6.5rem",
                  right: "1.5rem",
                  fontFamily: "var(--mono)",
                  fontSize: "3rem",
                  fontWeight: 800,
                  color: "rgba(14,27,61,0.035)",
                  transform: "rotate(-12deg)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                DRAFT BRIEF
              </div>

              {isContactMode ? (
                  /* ── INLINE CONTACT FORM VIEW ────────────────────────── */
                  contactSuccess ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-4">
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(34, 165, 91, 0.12)",
                          color: "#168744",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.75rem",
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: "1.85rem",
                          color: "var(--ink)",
                          lineHeight: 1.15,
                        }}
                      >
                        Brief Received by Founders
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--sans)",
                          fontSize: "0.875rem",
                          color: "var(--ink-2)",
                          lineHeight: 1.6,
                          maxWidth: "24rem",
                        }}
                      >
                        Thank you, <strong>{contactName || "there"}</strong>. Our founding team has received your project specification for <strong>{selectedType?.label}</strong> and will reach out to <strong>{contactEmail}</strong> within 24 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setContactSuccess(false);
                          setIsContactMode(false);
                        }}
                        style={{
                          marginTop: "1.25rem",
                          padding: "0.85rem 1.75rem",
                          borderRadius: "999px",
                          backgroundColor: "var(--night)",
                          color: "#ffffff",
                          fontFamily: "var(--sans)",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          border: "none",
                          cursor: "pointer",
                          boxShadow: "0 8px 20px -6px rgba(11,21,48,0.3)",
                        }}
                      >
                        ← Configure Another Scope
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Form Header with Close */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px dashed var(--line-2)",
                            paddingBottom: "0.75rem",
                            marginBottom: "0.85rem",
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
                              DIRECT FOUNDER INQUIRY
                            </span>
                            <h3
                              style={{
                                fontFamily: "var(--serif)",
                                fontSize: "1.5rem",
                                color: "var(--ink)",
                                lineHeight: 1.15,
                                marginTop: "0.15rem",
                              }}
                            >
                              Send Project Brief
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsContactMode(false)}
                            className="px-2.5 py-1 rounded text-xs text-[var(--ink-3)] hover:text-[var(--ink)] hover:bg-[rgba(14,27,61,0.05)] font-mono transition cursor-pointer"
                            title="Back to Specifications"
                          >
                            ✕ Close
                          </button>
                        </div>

                        {/* Pre-selected Specification Pill */}
                        <div
                          style={{
                            padding: "0.55rem 0.85rem",
                            backgroundColor: "rgba(47,99,224,0.05)",
                            border: "1px solid rgba(47,99,224,0.18)",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "0.75rem",
                            marginBottom: "0.85rem",
                          }}
                        >
                          <div className="flex items-center gap-1.5 overflow-hidden">
                            <span style={{ color: "var(--blue-deep)", fontSize: "0.75rem", fontWeight: 700 }}>✦</span>
                            <span
                              style={{
                                fontFamily: "var(--mono)",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                color: "var(--blue-deep)",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {selectedType?.label}
                            </span>
                          </div>
                          <span
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: "0.6875rem",
                              fontWeight: 700,
                              color: "var(--orange)",
                              backgroundColor: "rgba(239, 107, 46, 0.1)",
                              padding: "0.15rem 0.5rem",
                              borderRadius: "999px",
                              flexShrink: 0,
                            }}
                          >
                            {selectedType?.baseRange}
                          </span>
                        </div>

                        {contactError && (
                          <div
                            style={{
                              padding: "0.55rem 0.75rem",
                              borderRadius: "8px",
                              backgroundColor: "rgba(239, 68, 68, 0.1)",
                              border: "1px solid rgba(239, 68, 68, 0.25)",
                              color: "#dc2626",
                              fontSize: "0.75rem",
                              fontFamily: "var(--mono)",
                              marginBottom: "0.75rem",
                            }}
                          >
                            {contactError}
                          </div>
                        )}

                        <form onSubmit={handleSendBrief} className="space-y-2.5">
                          {/* 2-Column Responsive Grid for Name & Work Email */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label
                                style={{
                                  display: "block",
                                  fontFamily: "var(--mono)",
                                  fontSize: "0.625rem",
                                  letterSpacing: "0.1em",
                                  textTransform: "uppercase",
                                  color: "var(--ink-3)",
                                  fontWeight: 700,
                                  marginBottom: "0.25rem",
                                }}
                              >
                                Your Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                placeholder="e.g. Dhruvil Patel"
                                style={{
                                  width: "100%",
                                  boxSizing: "border-box",
                                  padding: "0.55rem 0.75rem",
                                  borderRadius: "8px",
                                  backgroundColor: "#ffffff",
                                  border: "1px solid var(--line-2)",
                                  color: "var(--ink)",
                                  fontFamily: "var(--sans)",
                                  fontSize: "0.8125rem",
                                  outline: "none",
                                  transition: "border-color 0.2s, box-shadow 0.2s",
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = "var(--blue-deep)";
                                  e.target.style.boxShadow = "0 0 0 2px rgba(47,99,224,0.12)";
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = "var(--line-2)";
                                  e.target.style.boxShadow = "none";
                                }}
                              />
                            </div>

                            <div>
                              <label
                                style={{
                                  display: "block",
                                  fontFamily: "var(--mono)",
                                  fontSize: "0.625rem",
                                  letterSpacing: "0.1em",
                                  textTransform: "uppercase",
                                  color: "var(--ink-3)",
                                  fontWeight: 700,
                                  marginBottom: "0.25rem",
                                }}
                              >
                                Work Email *
                              </label>
                              <input
                                type="email"
                                required
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                placeholder="founder@company.com"
                                style={{
                                  width: "100%",
                                  boxSizing: "border-box",
                                  padding: "0.55rem 0.75rem",
                                  borderRadius: "8px",
                                  backgroundColor: "#ffffff",
                                  border: "1px solid var(--line-2)",
                                  color: "var(--ink)",
                                  fontFamily: "var(--sans)",
                                  fontSize: "0.8125rem",
                                  outline: "none",
                                  transition: "border-color 0.2s, box-shadow 0.2s",
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = "var(--blue-deep)";
                                  e.target.style.boxShadow = "0 0 0 2px rgba(47,99,224,0.12)";
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = "var(--line-2)";
                                  e.target.style.boxShadow = "none";
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label
                                style={{
                                  fontFamily: "var(--mono)",
                                  fontSize: "0.625rem",
                                  letterSpacing: "0.1em",
                                  textTransform: "uppercase",
                                  color: "var(--ink-3)",
                                  fontWeight: 700,
                                }}
                              >
                                Project Brief &amp; Scope (Editable) *
                              </label>
                              <span
                                style={{
                                  fontFamily: "var(--mono)",
                                  fontSize: "0.5625rem",
                                  color: "var(--blue-deep)",
                                  backgroundColor: "rgba(47,99,224,0.08)",
                                  padding: "0.15rem 0.45rem",
                                  borderRadius: "4px",
                                  fontWeight: 600,
                                }}
                              >
                                Pre-filled &amp; Editable
                              </span>
                            </div>
                            <textarea
                              required
                              rows={5}
                              value={contactMessage}
                              onChange={(e) => setContactMessage(e.target.value)}
                              style={{
                                width: "100%",
                                boxSizing: "border-box",
                                minHeight: "120px",
                                maxHeight: "200px",
                                padding: "0.6rem 0.75rem",
                                borderRadius: "8px",
                                backgroundColor: "#ffffff",
                                border: "1px solid var(--line-2)",
                                color: "var(--ink)",
                                fontFamily: "var(--mono)",
                                fontSize: "0.71875rem",
                                lineHeight: 1.5,
                                outline: "none",
                                resize: "vertical",
                                transition: "border-color 0.2s, box-shadow 0.2s",
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = "var(--blue-deep)";
                                e.target.style.boxShadow = "0 0 0 2px rgba(47,99,224,0.12)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = "var(--line-2)";
                                e.target.style.boxShadow = "none";
                              }}
                            />
                          </div>

                          <label className="flex items-start gap-2.5 cursor-pointer pt-0.5 select-none">
                            <input
                              type="checkbox"
                              checked={contactConsent}
                              onChange={(e) => setContactConsent(e.target.checked)}
                              required
                              className="mt-0.5 w-3.5 h-3.5 accent-[var(--night)] cursor-pointer"
                            />
                            <span
                              style={{
                                fontFamily: "var(--sans)",
                                fontSize: "0.6875rem",
                                color: "var(--ink-2)",
                                lineHeight: 1.35,
                              }}
                            >
                              I consent under DPDP Act, 2023 to transmit this inquiry.
                            </span>
                          </label>

                          <div className="pt-2 flex flex-col items-center gap-2">
                            <motion.button
                              type="submit"
                              disabled={contactSubmitting}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              style={{
                                width: "100%",
                                padding: "0.85rem 1.5rem",
                                borderRadius: "999px",
                                backgroundColor: "var(--night)",
                                color: "#ffffff",
                                fontFamily: "var(--sans)",
                                fontWeight: 600,
                                fontSize: "0.9375rem",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem",
                                boxShadow: "0 10px 25px -8px rgba(11,21,48,0.4)",
                                opacity: contactSubmitting ? 0.65 : 1,
                              }}
                            >
                              <span>{contactSubmitting ? "Transmitting..." : "Send Brief to Founders →"}</span>
                            </motion.button>

                            <button
                              type="button"
                              onClick={() => setIsContactMode(false)}
                              style={{
                                background: "none",
                                border: "none",
                                fontFamily: "var(--mono)",
                                fontSize: "0.6875rem",
                                color: "var(--ink-3)",
                                cursor: "pointer",
                                padding: "0.25rem 0.5rem",
                              }}
                              className="hover:text-[var(--ink)] transition"
                            >
                              ← Back to Specification Sheet
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )
                ) : (
                  <>
                    {/* Top Section wrapper for header & breakdown fields */}
                    <div className="flex-1 flex flex-col justify-between mb-6">
                      {/* Brief Header */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          borderBottom: "1px dashed var(--line-2)",
                          paddingBottom: "1rem",
                          marginBottom: "1.5rem",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: "0.625rem",
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: "var(--ink-3)",
                              display: "block",
                            }}
                          >
                            STUDIO SPECIFICATION SHEET
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--serif)",
                              fontSize: "1.5rem",
                              color: "var(--ink)",
                            }}
                          >
                            Draft Project Scoping
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "0.6875rem",
                            color: "var(--live)",
                            fontWeight: 700,
                          }}
                        >
                          ● LIVE
                        </span>
                      </div>

                      {/* Scope Breakdown Rows */}
                      <div className="space-y-4 mb-8">

                        {/* Architecture Field */}
                        <div>
                          <span
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: "0.5625rem",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: "var(--ink-3)",
                              display: "block",
                            }}
                          >
                            SELECTED ARCHITECTURE
                          </span>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={selectedType.id}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.2 }}
                              style={{
                                fontFamily: "var(--serif)",
                                fontSize: "1.45rem",
                                color: "var(--ink)",
                                lineHeight: 1.2,
                              }}
                            >
                              {selectedType.label}
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* Modules Field */}
                        <div>
                          <span
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: "0.5625rem",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: "var(--ink-3)",
                              display: "block",
                              marginBottom: "0.35rem",
                            }}
                          >
                            INCLUDED MODULES ({features.length})
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {features.length > 0 ? (
                              features.map((fId) => {
                                const feat = ESTIMATOR_CONFIG.features.find((f) => f.id === fId);
                                return (
                                  <span
                                    key={fId}
                                    style={{
                                      fontFamily: "var(--mono)",
                                      fontSize: "0.625rem",
                                      padding: "0.2rem 0.5rem",
                                      backgroundColor: "rgba(14,27,61,0.06)",
                                      borderRadius: "4px",
                                      color: "var(--ink)",
                                    }}
                                  >
                                    {feat?.label}
                                  </span>
                                );
                              })
                            ) : (
                              <span
                                style={{
                                  fontFamily: "var(--mono)",
                                  fontSize: "0.6875rem",
                                  color: "var(--ink-3)",
                                }}
                              >
                                Standard minimal architecture
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Timeline Field */}
                        <div>
                          <span
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: "0.5625rem",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: "var(--ink-3)",
                              display: "block",
                            }}
                          >
                            TARGET LAUNCH WINDOW
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: "0.8125rem",
                              fontWeight: 600,
                              color: "var(--ink)",
                            }}
                          >
                            {selectedTimeline.label}
                          </span>
                        </div>

                        {/* What Hurts Today / Core Pain Point Field */}
                        <div>
                          <span
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: "0.5625rem",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: "var(--ink-3)",
                              display: "block",
                              marginBottom: "0.35rem",
                            }}
                          >
                            WHAT HURTS TODAY (CORE BOTTLENECK)
                          </span>
                          <div
                            style={{
                              fontFamily: "var(--sans)",
                              fontSize: "0.8125rem",
                              color: painPoint.trim() ? "var(--ink)" : "var(--ink-3)",
                              fontStyle: painPoint.trim() ? "normal" : "italic",
                              lineHeight: 1.45,
                              padding: "0.5rem 0.75rem",
                              backgroundColor: "rgba(14,27,61,0.03)",
                              border: "1px solid var(--line)",
                              borderRadius: "6px",
                            }}
                          >
                            {painPoint.trim()
                              ? painPoint.trim()
                              : "“Our team tracks every order in three spreadsheets…”"}
                          </div>
                        </div>

                        {/* Predefined Covered Charges & Deliverables (Manageable via Admin) */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              style={{
                                fontFamily: "var(--mono)",
                                fontSize: "0.5625rem",
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: "var(--ink-3)",
                              }}
                            >
                              PREDEFINED INCLUSIONS ({includedCharges.length})
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--mono)",
                                fontSize: "0.5625rem",
                                color: "var(--live)",
                                fontWeight: 700,
                                letterSpacing: "0.06em",
                              }}
                            >
                              COVERED IN BUDGET
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {includedCharges.map((item, idx) => (
                              <div
                                key={idx}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "0.45rem 0.65rem",
                                  backgroundColor: "rgba(14,27,61,0.03)",
                                  border: "1px solid var(--line)",
                                  borderRadius: "6px",
                                  gap: "0.5rem",
                                }}
                              >
                                <div className="flex items-center gap-1.5 overflow-hidden">
                                  <span
                                    style={{
                                      color: "var(--live)",
                                      fontSize: "0.75rem",
                                      fontWeight: 700,
                                      flexShrink: 0,
                                    }}
                                  >
                                    ✓
                                  </span>
                                  <span
                                    style={{
                                      fontFamily: "var(--mono)",
                                      fontSize: "0.6875rem",
                                      color: "var(--ink)",
                                      fontWeight: 500,
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                    title={item.note ? `${item.title} — ${item.note}` : item.title}
                                  >
                                    {item.title}
                                  </span>
                                </div>

                                <span
                                  style={{
                                    fontFamily: "var(--mono)",
                                    fontSize: "0.5625rem",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    fontWeight: 700,
                                    padding: "0.12rem 0.45rem",
                                    borderRadius: "4px",
                                    backgroundColor: "rgba(34, 165, 91, 0.12)",
                                    color: "#168744",
                                    flexShrink: 0,
                                  }}
                                >
                                  {item.badge || "INCLUDED"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Range Field */}
                        <div
                          style={{
                            padding: "1rem",
                            backgroundColor: "rgba(47,99,224,0.06)",
                            border: "1px solid rgba(47,99,224,0.2)",
                            borderRadius: "10px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: "0.5625rem",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: "var(--blue-deep)",
                              display: "block",
                              fontWeight: 700,
                              marginBottom: "0.2rem",
                            }}
                          >
                            INDICATIVE BUDGET RANGE
                          </span>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={selectedType.baseRange}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              style={{
                                fontFamily: "var(--serif)",
                                fontSize: "2.1rem",
                                lineHeight: 1,
                                color: "var(--blue-deep)",
                                fontWeight: 400,
                              }}
                            >
                              {selectedType.baseRange}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* Action Button: Prefill & Forward to Contact (pinned at bottom) */}
                    <div className="mt-auto pt-2">
                      <Magnetic strength={0.25} className="w-full">
                        <motion.button
                          onClick={handleOpenContact}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={springs.snappy}
                          style={{
                            width: "100%",
                            padding: "0.95rem 1.5rem",
                            borderRadius: "999px",
                            backgroundColor: copied ? "var(--live)" : "var(--night)",
                            color: "#ffffff",
                            fontFamily: "var(--sans)",
                            fontWeight: 600,
                            fontSize: "0.9375rem",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            boxShadow: "0 10px 25px -8px rgba(11,21,48,0.4)",
                            transition: "background-color 0.3s ease",
                          }}
                        >
                          <span>{copied ? "✓ Copied to Contact Form Below!" : "Send Brief to Founders →"}</span>
                        </motion.button>
                      </Magnetic>
                    </div>
                  </>
                )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
