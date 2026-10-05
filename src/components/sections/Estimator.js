"use client";

import { useState } from "react";
import { trackEstimatorComplete } from "@/lib/analytics";

/**
 * Project Estimator widget
 * ─ Pills with hairline border
 * ─ Selected = blue-deep fill + cream text
 * ─ Result card on --surface with blue-deep focus ring
 * ─ Success state with a small blue circle check
 */
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
    { id: "asap", label: "High Priority (Sprint Delivery)" },
    { id: "1month", label: "4–6 Weeks (Rapid Launch)" },
    { id: "3months", label: "2–3 Months (Full Architecture)" },
    { id: "flexible", label: "Flexible Ongoing Retainer" },
  ],
};

export default function Estimator({ data }) {
  const types = data?.types && data.types.length > 0 ? data.types : DEFAULT_TYPES;
  const startingPrice = data?.startingPrice || "₹15,000";

  const [step, setStep] = useState(1);
  const [type, setType] = useState(types[0]?.id || "starter");
  const [features, setFeatures] = useState(["auth", "payments"]);
  const [timeline, setTimeline] = useState("1month");
  const [sent, setSent] = useState(false);

  const selectedType = types.find((t) => t.id === type) || types[0];

  const toggleFeature = (id) => {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const prefillContact = () => {
    trackEstimatorComplete(selectedType?.label || "Unknown", selectedType?.baseRange || "N/A");
    const summaryEl = document.getElementById("contact-message");
    if (summaryEl) {
      const text = `Project Scope: ${selectedType?.label}\nKey Modules: ${features.join(", ")}\nTimeline: ${ESTIMATOR_CONFIG.timelines.find((t) => t.id === timeline)?.label}\nIndicative Estimate: ${selectedType?.baseRange}`;
      summaryEl.value = text;
    }
    const contactEl = document.getElementById("contact");
    if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
    setSent(true);
  };

  return (
    <section
      id="estimator"
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
        <div style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span className="section-label" style={{ color: "var(--muted)" }}>
            Scoping Estimator
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              background: "rgba(253, 179, 71, 0.18)",
              color: "var(--ink)",
              border: "1px solid var(--hairline)",
              fontWeight: 700,
            }}
          >
            Starting From {startingPrice}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(2.5rem, 5vw, 4.5rem)",
            alignItems: "start",
          }}
          className="lg:grid-cols-2"
        >
          {/* Left: Heading & Indicative Range Card */}
          <div>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(2.25rem, 4.8vw, 3.85rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "var(--ink)",
                marginBottom: "1.25rem",
              }}
            >
              What are we{" "}
              <em style={{ fontStyle: "italic", color: "var(--blue-deep)" }}>
                building together?
              </em>
            </h2>
            <p
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.7,
                color: "var(--muted)",
                maxWidth: "32rem",
                marginBottom: "2rem",
              }}
            >
              Configure your requirements in three intuitive steps. We will formulate an honest indicative architectural range — then you can forward the brief directly to our founders.
            </p>

            {/* Range Card */}
            {selectedType && (
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--hairline)",
                  borderRadius: "14px",
                  padding: "1.75rem 2rem",
                  boxShadow: "0 8px 24px rgba(14,27,61,0.04)",
                  marginTop: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--blue-deep)",
                    fontWeight: 700,
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Indicative Scope Range
                </span>
                <div
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    color: "var(--ink)",
                  }}
                >
                  {selectedType.baseRange}
                </div>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6875rem",
                    color: "var(--muted)",
                    marginTop: "0.5rem",
                    marginBottom: 0,
                  }}
                >
                  Subject to exact modules &amp; integrations
                </p>
              </div>
            )}
          </div>

          {/* Right: Steps & Selectable Pills */}
          <div
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--hairline)",
              borderRadius: "16px",
              padding: "clamp(1.75rem, 4vw, 2.75rem)",
              boxShadow: "0 10px 30px rgba(14,27,61,0.04)",
            }}
          >
            {/* Step Indicators */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
              {[1, 2, 3].map((s) => (
                <button
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
                    border: `1px solid ${step === s ? "var(--blue-deep)" : "var(--hairline)"}`,
                    backgroundColor: step === s ? "var(--blue-deep)" : "transparent",
                    color: step === s ? "var(--cream)" : "var(--muted)",
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
                  color: "var(--muted)",
                  marginLeft: "0.5rem",
                }}
              >
                Step {step} of 3
              </span>
            </div>

            {/* Step 1: Project Type */}
            {step === 1 && (
              <div>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "1rem",
                  }}
                >
                  Select Architecture Type
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {types.map((t) => {
                    const isSelected = type === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setType(t.id);
                          setStep(2);
                        }}
                        style={{
                          padding: "0.85rem 1.25rem",
                          borderRadius: "10px",
                          fontFamily: "'Satoshi', sans-serif",
                          fontSize: "0.9375rem",
                          fontWeight: 500,
                          textAlign: "left",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: `1px solid ${isSelected ? "var(--blue-deep)" : "var(--hairline)"}`,
                          backgroundColor: isSelected ? "var(--blue-deep)" : "var(--cream)",
                          color: isSelected ? "var(--cream)" : "var(--ink)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <span>{t.label}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", opacity: 0.85 }}>
                          {t.baseRange}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Features */}
            {step === 2 && (
              <div>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "1rem",
                  }}
                >
                  Key Capabilities (Select All That Apply)
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1.75rem" }}>
                  {ESTIMATOR_CONFIG.features.map((f) => {
                    const isSelected = features.includes(f.id);
                    return (
                      <button
                        key={f.id}
                        onClick={() => toggleFeature(f.id)}
                        style={{
                          padding: "0.65rem 1.15rem",
                          borderRadius: "999px",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          border: `1px solid ${isSelected ? "var(--blue-deep)" : "var(--hairline)"}`,
                          backgroundColor: isSelected ? "var(--blue-deep)" : "var(--cream)",
                          color: isSelected ? "var(--cream)" : "var(--ink)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {isSelected ? "✓ " : "+ "}
                        {f.label}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    onClick={() => setStep(1)}
                    className="btn-outline"
                    style={{ fontSize: "0.75rem", padding: "0.55rem 1.25rem" }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn-primary"
                    style={{ fontSize: "0.75rem", padding: "0.55rem 1.4rem" }}
                  >
                    <span>Next: Timeline →</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Timeline */}
            {step === 3 && (
              <div>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "1rem",
                  }}
                >
                  Desired Launch Timeline
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
                  {ESTIMATOR_CONFIG.timelines.map((t) => {
                    const isSelected = timeline === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTimeline(t.id)}
                        style={{
                          padding: "0.85rem 1.25rem",
                          borderRadius: "10px",
                          fontFamily: "'Satoshi', sans-serif",
                          fontSize: "0.9375rem",
                          textAlign: "left",
                          border: `1px solid ${isSelected ? "var(--blue-deep)" : "var(--hairline)"}`,
                          backgroundColor: isSelected ? "var(--blue-deep)" : "var(--cream)",
                          color: isSelected ? "var(--cream)" : "var(--ink)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={() => setStep(2)}
                    className="btn-outline"
                    style={{ fontSize: "0.75rem", padding: "0.55rem 1.25rem" }}
                  >
                    ← Back
                  </button>

                  {!sent ? (
                    <button
                      onClick={prefillContact}
                      className="btn-primary"
                    >
                      <span>Send Brief to Contact Form →</span>
                    </button>
                  ) : (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--blue-deep)",
                      }}
                    >
                      {/* Small blue circle check */}
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          backgroundColor: "var(--blue)",
                          color: "white",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                        }}
                      >
                        ✓
                      </span>
                      Copied to Contact Form Below!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
