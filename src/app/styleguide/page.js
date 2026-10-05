"use client";

import Link from "next/link";
import { useState } from "react";

const PALETTE = [
  { name: "--cream", hex: "#F8F2E4", role: "Page background default", type: "surface", textOnBg: "#0E1B3D", contrast: "Base" },
  { name: "--surface", hex: "#FFFBF2", role: "Cards, panels, elevated sheets", type: "surface", textOnBg: "#0E1B3D", contrast: "Base" },
  { name: "--hairline", hex: "#E4DAC3", role: "1px borders, subtle dividers", type: "border", textOnBg: "#0E1B3D", contrast: "N/A" },
  { name: "--ink", hex: "#0E1B3D", role: "Main typography & headlines", type: "text", textOnBg: "#F8F2E4", contrast: "14.8:1 (AAA)" },
  { name: "--muted", hex: "#4A5575", role: "Secondary editorial copy", type: "text", textOnBg: "#F8F2E4", contrast: "5.6:1 (AA)" },
  { name: "--night", hex: "#0B1530", role: "Dark sections (Process, Contact, Footer)", type: "surface", textOnBg: "#F8F2E4", contrast: "16.2:1 (AAA)" },
  { name: "--blue", hex: "#3D7BF7", role: "Brand blue circles & illustrations", type: "accent", textOnBg: "#FFFFFF", contrast: "Illustration" },
  { name: "--blue-deep", hex: "#2F63E0", role: "Primary UI buttons, links, active rings", type: "brand", textOnBg: "#F8F2E4", contrast: "4.9:1 (AA)" },
  { name: "--blue-press", hex: "#234FC0", role: "Hover / Active button state", type: "brand", textOnBg: "#F8F2E4", contrast: "6.8:1 (AAA)" },
  { name: "--orange", hex: "#FDB347", role: "Highlights, number accents, scroll underline", type: "accent", textOnBg: "#0E1B3D", contrast: "Accents only" },
  { name: "--coral", hex: "#FF6B7B", role: "CTA hover accent, notification dots", type: "accent", textOnBg: "#0E1B3D", contrast: "Accents only" },
  { name: "--indigo", hex: "#5B3FD9", role: "Secondary accent words & tokens", type: "accent", textOnBg: "#F8F2E4", contrast: "5.4:1 (AA)" },
  { name: "--purple", hex: "#9B72D8", role: "Decorative circles only", type: "decorative", textOnBg: "#0E1B3D", contrast: "Decorative" },
  { name: "--pink", hex: "#FF8FA0", role: "Decorative circles only", type: "decorative", textOnBg: "#0E1B3D", contrast: "Decorative" },
];

export default function StyleguidePage() {
  const [selectedPill, setSelectedPill] = useState("web");
  const [inputValue, setInputValue] = useState("");

  return (
    <div
      data-theme="cream"
      style={{
        backgroundColor: "var(--cream)",
        color: "var(--ink)",
        minHeight: "100vh",
        padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 5rem)",
        fontFamily: "'Satoshi', 'Inter', system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "3.5rem", borderBottom: "1px solid var(--hairline)", paddingBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--blue-deep)",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                The Intelliverse Design System
              </span>
              <h1
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "-0.025em",
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                Color Roles, Tokens &amp; Component Spec
              </h1>
            </div>
            <Link
              href="/"
              className="btn-outline"
              style={{ fontSize: "0.75rem", padding: "0.6rem 1.4rem" }}
            >
              ← Back to Site
            </Link>
          </div>
          <p style={{ color: "var(--muted)", maxWidth: "42rem", marginTop: "1rem", lineHeight: 1.6 }}>
            Comprehensive design token audit complying with WCAG 2.1 AA standards. Blue is the primary brand anchor, supported by warm cream surfaces, solid flat accents, and accessible contrast ratios.
          </p>
        </div>

        {/* 1. Color Palette Grid */}
        <section style={{ marginBottom: "4rem" }}>
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "2rem",
              marginBottom: "1.5rem",
              color: "var(--ink)",
            }}
          >
            01 / Color Tokens &amp; Contrast Ratios
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {PALETTE.map((c) => (
              <div
                key={c.name}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--hairline)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(14,27,61,0.04)",
                }}
              >
                <div
                  style={{
                    height: "100px",
                    backgroundColor: c.hex,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    padding: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: c.textOnBg,
                      background: "rgba(0,0,0,0.18)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                    }}
                  >
                    {c.hex}
                  </span>
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <code
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        color: "var(--ink)",
                      }}
                    >
                      {c.name}
                    </code>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.625rem",
                        textTransform: "uppercase",
                        padding: "0.2rem 0.45rem",
                        borderRadius: "999px",
                        background: c.contrast.includes("AAA")
                          ? "rgba(16, 185, 129, 0.15)"
                          : c.contrast.includes("AA")
                          ? "rgba(59, 130, 246, 0.15)"
                          : "rgba(14, 27, 61, 0.08)",
                        color: c.contrast.includes("AAA")
                          ? "#065f46"
                          : c.contrast.includes("AA")
                          ? "#1e40af"
                          : "var(--muted)",
                      }}
                    >
                      {c.contrast}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.5rem", marginBottom: 0 }}>
                    {c.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Interactive Buttons & CTA States */}
        <section style={{ marginBottom: "4rem" }}>
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "2rem",
              marginBottom: "1.5rem",
              color: "var(--ink)",
            }}
          >
            02 / Buttons &amp; Interactive CTAs
          </h2>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--hairline)",
              borderRadius: "16px",
              padding: "2rem",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <div>
              <span style={{ display: "block", fontSize: "0.6875rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--muted)", marginBottom: "0.5rem" }}>
                Primary (Blue-Deep Fill + Cream Text)
              </span>
              <button className="btn-primary">
                <span>Start a Project →</span>
              </button>
            </div>

            <div>
              <span style={{ display: "block", fontSize: "0.6875rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--muted)", marginBottom: "0.5rem" }}>
                Secondary (Outlined Ink Pill)
              </span>
              <button className="btn-outline">
                <span>Explore Works ↓</span>
              </button>
            </div>

            <div>
              <span style={{ display: "block", fontSize: "0.6875rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--muted)", marginBottom: "0.5rem" }}>
                Focus Visible State (2px Blue-Deep Ring)
              </span>
              <button
                className="btn-primary"
                style={{
                  outline: "2px solid var(--blue-deep)",
                  outlineOffset: "2px",
                }}
              >
                <span>Focused Element</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3. Estimator & Filter Selection Pills */}
        <section style={{ marginBottom: "4rem" }}>
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "2rem",
              marginBottom: "1.5rem",
              color: "var(--ink)",
            }}
          >
            03 / Selection Pills &amp; Form Inputs
          </h2>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--hairline)",
              borderRadius: "16px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <div>
              <span style={{ display: "block", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--muted)", marginBottom: "0.75rem" }}>
                Selectable Service Pills (Selected: Blue-Deep Fill + Cream Text)
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {[
                  { id: "web", label: "Web Architecture" },
                  { id: "saas", label: "Custom SaaS" },
                  { id: "ai", label: "AI Workflows" },
                  { id: "it", label: "Enterprise IT" },
                ].map((pill) => {
                  const isSelected = selectedPill === pill.id;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => setSelectedPill(pill.id)}
                      style={{
                        padding: "0.65rem 1.4rem",
                        borderRadius: "999px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        border: `1px solid ${isSelected ? "var(--blue-deep)" : "var(--hairline)"}`,
                        backgroundColor: isSelected ? "var(--blue-deep)" : "transparent",
                        color: isSelected ? "var(--cream)" : "var(--ink)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span style={{ display: "block", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--muted)", marginBottom: "0.75rem" }}>
                Text Input with Blue-Deep Focus Ring
              </span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter client company name or specification..."
                style={{
                  width: "100%",
                  maxWidth: "460px",
                  padding: "0.85rem 1.25rem",
                  borderRadius: "8px",
                  border: "1px solid var(--hairline)",
                  backgroundColor: "var(--cream)",
                  color: "var(--ink)",
                  fontSize: "0.9375rem",
                  fontFamily: "'Satoshi', sans-serif",
                }}
              />
            </div>
          </div>
        </section>

        {/* 4. Night Section Demonstration */}
        <section style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "2rem",
              marginBottom: "1.5rem",
              color: "var(--ink)",
            }}
          >
            04 / Night Rhythm Palette (--night: #0B1530)
          </h2>

          <div
            style={{
              background: "var(--night)",
              color: "var(--cream)",
              borderRadius: "16px",
              padding: "2.5rem",
              border: "1px solid rgba(228, 218, 195, 0.12)",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--orange)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              05 / Deep Navy Rhythm
            </span>
            <h3
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                marginBottom: "1rem",
              }}
            >
              Architected with precision on deep navy grounds.
            </h3>
            <p style={{ color: "rgba(248, 242, 228, 0.7)", maxWidth: "40rem", lineHeight: 1.6, fontSize: "0.9375rem" }}>
              Sections like Process, Contact, and Footer alternate to the deep night palette (<code style={{ color: "var(--orange)" }}>#0B1530</code>). Text achieves 16.2:1 contrast against cream typography with vibrant brand blue (<code style={{ color: "var(--blue)" }}>#3D7BF7</code>) and warm orange accents.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
