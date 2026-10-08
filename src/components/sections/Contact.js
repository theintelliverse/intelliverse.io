"use client";

import { useState } from "react";
import Link from "next/link";
import { trackContactFormSubmit } from "@/lib/analytics";

/**
 * Contact section — Inquiries & Direct Channels on --night (#0B1530)
 * ─ 3-step guided form (type -> details -> contact) with honeypot
 * ─ DPDP Act, 2023 compliant consent mechanism & statutory notice
 * ─ Form fields on elevated surface with blue-deep focus ring
 * ─ Contact channels: Email, Instagram, LinkedIn (Chatbot assistant removed)
 * ─ Success state with a small blue circle check
 */
export default function Contact({ data = null } = {}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "Web Architecture",
    name: "",
    email: "",
    message: "",
    _hp: "",
    dpdpConsent: false,
  });
  const [showDpdpNotice, setShowDpdpNotice] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const update = (key, val) => setFormData((prev) => ({ ...prev, [key]: val }));

  const submit = async (e) => {
    e.preventDefault();
    if (formData._hp) return; // Honeypot

    // DPDP Act, 2023 Section 6 affirmative consent check
    if (!formData.dpdpConsent) {
      setStatus("error");
      setError("Please acknowledge and provide consent under the DPDP Act, 2023 to dispatch your message.");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `[${formData.type}]\n\n${formData.message}`,
          dpdpConsent: true,
          consentTimestamp: new Date().toISOString(),
        }),
      });
      const json = await res.json();
      if (res.ok) {
        trackContactFormSubmit({ category: formData.type });
        setStatus("success");
        setFormData({ type: "Web Architecture", name: "", email: "", message: "", _hp: "", dpdpConsent: false });
        setShowDpdpNotice(false);
        setStep(1);
      } else {
        setStatus("error");
        setError(json.error || json.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  const CONTACT_TYPES = [
    "Web Architecture",
    "Custom SaaS Platform",
    "Cloud & DevOps",
    "Applied AI / RAG",
    "Exploratory Consultation",
  ];

  return (
    <section
      id="contact"
      data-theme="cream"
      style={{
        backgroundColor: "var(--cream)",
        color: "var(--ink)",
        borderTop: "1px solid var(--hairline)",
        paddingTop: "clamp(5rem, 10vh, 7.5rem)",
        paddingBottom: "clamp(5rem, 10vh, 8rem)",
        position: "relative",
      }}
    >
      <div className="container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Section Label */}
        <div style={{ marginBottom: "3rem" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--blue-deep)",
              fontWeight: 700,
            }}
          >
            Direct Inquiries
          </span>
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--ink)",
            maxWidth: "38rem",
            marginBottom: "4rem",
          }}
        >
          Let&apos;s build something that{" "}
          <em style={{ fontStyle: "italic", color: "var(--blue-deep)" }}>
            actually scales.
          </em>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "start",
          }}
          className="lg:grid-cols-2"
        >
          {/* LEFT: 3-Step Guided Form */}
          <div
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--line-2)",
              borderRadius: "20px",
              padding: "clamp(1.75rem, 4vw, 3rem)",
              boxShadow: "0 20px 45px -15px rgba(14, 27, 61, 0.06), 0 0 0 1px rgba(14, 27, 61, 0.03)",
            }}
          >
            {status === "success" ? (
              <div style={{ paddingBlock: "2rem", textAlign: "center" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "var(--blue-deep)",
                    color: "#FFFFFF",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    marginBottom: "1rem",
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: "2rem",
                    color: "var(--ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Message Dispatched
                </h3>
                <p style={{ color: "var(--ink-2)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                  Thank you! Your project parameters have been delivered to our engineering founders. We respond within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("")}
                  className="btn-primary"
                  style={{ marginTop: "1rem", fontSize: "0.75rem" }}
                >
                  <span>Submit Another Inquiry</span>
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  name="_hp"
                  value={formData._hp}
                  onChange={(e) => update("_hp", e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Step Indicators */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                  {[1, 2, 3].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setStep(s)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        border: `1px solid ${step === s ? "var(--blue-deep)" : "var(--line-2)"}`,
                        backgroundColor: step === s ? "var(--blue-deep)" : "transparent",
                        color: step === s ? "#FFFFFF" : "var(--ink-2)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                      marginLeft: "0.5rem",
                      fontWeight: 600,
                    }}
                  >
                    Step {step} of 3
                  </span>
                </div>

                {/* Step 1: Objective */}
                {step === 1 && (
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.75rem",
                        color: "var(--blue-deep)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      1. Select Project Objective
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
                      {CONTACT_TYPES.map((t) => {
                        const isSelected = formData.type === t;
                        return (
                          <button
                            type="button"
                            key={t}
                            onClick={() => {
                              update("type", t);
                              setStep(2);
                            }}
                            style={{
                              padding: "0.85rem 1.25rem",
                              borderRadius: "10px",
                              fontFamily: "var(--sans)",
                              fontSize: "0.9375rem",
                              fontWeight: isSelected ? 600 : 500,
                              textAlign: "left",
                              border: `1px solid ${isSelected ? "var(--blue-deep)" : "var(--line)"}`,
                              backgroundColor: isSelected ? "var(--blue-deep)" : "rgba(14, 27, 61, 0.02)",
                              color: isSelected ? "#FFFFFF" : "var(--ink)",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              boxShadow: isSelected ? "0 4px 14px rgba(47, 99, 224, 0.25)" : "none",
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.borderColor = "var(--blue-deep)";
                                e.currentTarget.style.backgroundColor = "rgba(47, 99, 224, 0.05)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.borderColor = "var(--line)";
                                e.currentTarget.style.backgroundColor = "rgba(14, 27, 61, 0.02)";
                              }
                            }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: Brief Details */}
                {step === 2 && (
                  <div>
                    <label
                      htmlFor="contact-message"
                      style={{
                        display: "block",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.75rem",
                        color: "var(--blue-deep)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      2. Project Details or Scope
                    </label>
                    <textarea
                      id="contact-message"
                      data-cursor="text"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Outline what you want to build, existing infrastructure, target deadline, or questions..."
                      required
                      style={{
                        width: "100%",
                        padding: "1rem",
                        borderRadius: "10px",
                        border: "1px solid var(--line-2)",
                        backgroundColor: "rgba(14, 27, 61, 0.02)",
                        color: "var(--ink)",
                        fontSize: "0.9375rem",
                        fontFamily: "var(--sans)",
                        lineHeight: 1.6,
                        outline: "none",
                        marginBottom: "1.5rem",
                        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "var(--blue-deep)";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(47, 99, 224, 0.12)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "var(--line-2)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        style={{
                          padding: "0.75rem 1.25rem",
                          borderRadius: "8px",
                          border: "1px solid var(--line-2)",
                          backgroundColor: "transparent",
                          color: "var(--ink)",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(14, 27, 61, 0.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <span>← Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => formData.message.trim() && setStep(3)}
                        className="btn-primary"
                      >
                        <span>Next: Contact Info →</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Info & Dispatch */}
                {step === 3 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div>
                      <label
                        htmlFor="contact-name"
                        style={{
                          display: "block",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--ink-2)",
                          marginBottom: "0.5rem",
                          fontWeight: 600,
                        }}
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        data-cursor="text"
                        value={formData.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="e.g. Alex Mercer"
                        required
                        style={{
                          width: "100%",
                          padding: "0.85rem 1.15rem",
                          borderRadius: "10px",
                          border: "1px solid var(--line-2)",
                          backgroundColor: "rgba(14, 27, 61, 0.02)",
                          color: "var(--ink)",
                          fontSize: "0.9375rem",
                          fontFamily: "var(--sans)",
                          outline: "none",
                          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--blue-deep)";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(47, 99, 224, 0.12)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "var(--line-2)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        style={{
                          display: "block",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--ink-2)",
                          marginBottom: "0.5rem",
                          fontWeight: 600,
                        }}
                      >
                        Work Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        data-cursor="text"
                        value={formData.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="alex@company.com"
                        required
                        style={{
                          width: "100%",
                          padding: "0.85rem 1.15rem",
                          borderRadius: "10px",
                          border: "1px solid var(--line-2)",
                          backgroundColor: "rgba(14, 27, 61, 0.02)",
                          color: "var(--ink)",
                          fontSize: "0.9375rem",
                          fontFamily: "var(--sans)",
                          outline: "none",
                          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--blue-deep)";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(47, 99, 224, 0.12)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "var(--line-2)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    {/* DPDP Act, 2023 Statutory Consent Container */}
                    <div
                      style={{
                        padding: "1rem 1.15rem",
                        borderRadius: "10px",
                        backgroundColor: "rgba(14, 27, 61, 0.03)",
                        border: "1px solid var(--line-2)",
                        marginTop: "0.25rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                        <input
                          id="contact-dpdp-consent"
                          type="checkbox"
                          checked={formData.dpdpConsent}
                          onChange={(e) => update("dpdpConsent", e.target.checked)}
                          required
                          style={{
                            marginTop: "0.22rem",
                            width: "16px",
                            height: "16px",
                            accentColor: "var(--blue-deep)",
                            cursor: "pointer",
                            flexShrink: 0,
                          }}
                        />
                        <label
                          htmlFor="contact-dpdp-consent"
                          style={{
                            fontSize: "0.8125rem",
                            lineHeight: 1.5,
                            color: "var(--ink-2)",
                            cursor: "pointer",
                            userSelect: "none",
                          }}
                        >
                          I provide free, specific, informed and unambiguous consent under the{" "}
                          <strong style={{ color: "var(--ink)" }}>Digital Personal Data Protection (DPDP) Act, 2023</strong>{" "}
                          for The Intelliverse to process my name, email, and project scope solely to evaluate this technical inquiry and communicate proposals. I understand I can withdraw consent anytime.{" "}
                          <Link
                            href="/privacy"
                            target="_blank"
                            style={{
                              color: "var(--blue-deep)",
                              textDecoration: "underline",
                              fontWeight: 600,
                            }}
                          >
                            Privacy Policy
                          </Link>
                        </label>
                      </div>

                      {/* Expandable Statutory Notice (Section 6 DPDP Act) */}
                      <div style={{ marginTop: "0.6rem", paddingLeft: "1.75rem" }}>
                        <button
                          type="button"
                          onClick={() => setShowDpdpNotice(!showDpdpNotice)}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.6875rem",
                            color: "var(--blue-deep)",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            letterSpacing: "0.04em",
                            fontWeight: 600,
                          }}
                        >
                          <span>{showDpdpNotice ? "▾ Hide DPDP Notice Details" : "▸ View DPDP Statutory Notice (Section 6)"}</span>
                        </button>

                        {showDpdpNotice && (
                          <div
                            style={{
                              marginTop: "0.65rem",
                              padding: "0.85rem 1rem",
                              borderRadius: "8px",
                              backgroundColor: "rgba(14, 27, 61, 0.04)",
                              border: "1px solid var(--line)",
                              fontSize: "0.75rem",
                              lineHeight: 1.6,
                              color: "var(--ink-2)",
                              fontFamily: "var(--sans)",
                            }}
                          >
                            <p style={{ margin: "0 0 0.45rem 0" }}>
                              <strong style={{ color: "var(--ink)" }}>Data Fiduciary:</strong> The Intelliverse (Ahmedabad, Gujarat, India).
                            </p>
                            <p style={{ margin: "0 0 0.45rem 0" }}>
                              <strong style={{ color: "var(--ink)" }}>Purpose of Processing:</strong> Scoping project architecture, providing quotes, scheduling technical discussions, and direct business communications. We do not sell personal data or send spam.
                            </p>
                            <p style={{ margin: "0 0 0.45rem 0" }}>
                              <strong style={{ color: "var(--ink)" }}>Data Principal Rights:</strong> You have the right to access a summary of your data, request correction or erasure, withdraw consent at any time, and nominate another individual under Sections 11–14 of the DPDP Act, 2023.
                            </p>
                            <p style={{ margin: 0 }}>
                              <strong style={{ color: "var(--ink)" }}>Grievance Redressal:</strong> To exercise rights or contact our Grievance Officer, write to{" "}
                              <a href="mailto:theintelliverse@gmail.com" style={{ color: "var(--blue-deep)", textDecoration: "underline" }}>
                                theintelliverse@gmail.com
                              </a>.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        style={{
                          padding: "0.75rem 1.25rem",
                          borderRadius: "8px",
                          border: "1px solid var(--line-2)",
                          backgroundColor: "transparent",
                          color: "var(--ink)",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(14, 27, 61, 0.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <span>← Back</span>
                      </button>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn-primary"
                      >
                        <span>{status === "sending" ? "Dispatching…" : "Dispatch Message →"}</span>
                      </button>
                    </div>

                    {status === "error" && (
                      <p style={{ color: "var(--coral)", fontSize: "0.8125rem", marginTop: "0.5rem", fontWeight: 500 }}>
                        {error}
                      </p>
                    )}
                  </div>
                )}
              </form>
            )}
          </div>

          {/* RIGHT: Direct Channels (Email, Instagram, LinkedIn only) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Direct Email */}
            <a
              href={`mailto:${data?.email || "theintelliverse@gmail.com"}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.75rem 2rem",
                borderRadius: "16px",
                backgroundColor: "var(--surface)",
                border: "1px solid var(--line-2)",
                textDecoration: "none",
                color: "var(--ink)",
                boxShadow: "0 10px 25px -10px rgba(14, 27, 61, 0.04)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--blue-deep)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 14px 30px -10px rgba(47, 99, 224, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line-2)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px -10px rgba(14, 27, 61, 0.04)";
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--blue-deep)",
                    fontWeight: 700,
                    display: "block",
                    marginBottom: "0.35rem",
                  }}
                >
                  Direct Founder Inbox
                </span>
                <span style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--ink)" }}>
                  {data?.email || "theintelliverse@gmail.com"}
                </span>
              </div>
              <span style={{ fontSize: "1.25rem", color: "var(--blue-deep)", fontWeight: 600 }}>↗</span>
            </a>

            {/* LinkedIn */}
            <a
              href={data?.linkedin || "https://www.linkedin.com/company/the-intelliverse/"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.75rem 2rem",
                borderRadius: "16px",
                backgroundColor: "var(--surface)",
                border: "1px solid var(--line-2)",
                textDecoration: "none",
                color: "var(--ink)",
                boxShadow: "0 10px 25px -10px rgba(14, 27, 61, 0.04)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--blue-deep)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 14px 30px -10px rgba(47, 99, 224, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line-2)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px -10px rgba(14, 27, 61, 0.04)";
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--blue-deep)",
                    fontWeight: 700,
                    display: "block",
                    marginBottom: "0.35rem",
                  }}
                >
                  Corporate Network
                </span>
                <span style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--ink)" }}>
                  LinkedIn / The Intelliverse
                </span>
              </div>
              <span style={{ fontSize: "1.25rem", color: "var(--blue-deep)", fontWeight: 600 }}>↗</span>
            </a>

            {/* Instagram */}
            <a
              href={data?.instagram || "https://www.instagram.com/the_intelliverse/"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.75rem 2rem",
                borderRadius: "16px",
                backgroundColor: "var(--surface)",
                border: "1px solid var(--line-2)",
                textDecoration: "none",
                color: "var(--ink)",
                boxShadow: "0 10px 25px -10px rgba(14, 27, 61, 0.04)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--blue-deep)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 14px 30px -10px rgba(47, 99, 224, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line-2)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px -10px rgba(14, 27, 61, 0.04)";
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--blue-deep)",
                    fontWeight: 700,
                    display: "block",
                    marginBottom: "0.35rem",
                  }}
                >
                  Studio Work &amp; Culture
                </span>
                <span style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--ink)" }}>
                  @the_intelliverse
                </span>
              </div>
              <span style={{ fontSize: "1.25rem", color: "var(--blue-deep)", fontWeight: 600 }}>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
