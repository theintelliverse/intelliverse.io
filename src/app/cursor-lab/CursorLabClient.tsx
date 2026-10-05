"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCursorContext, CursorVariant } from "@/components/cursor/CursorProvider";

export default function CursorLabClient() {
  const {
    variant: activeVariant,
    label: activeLabel,
    theme: activeTheme,
    isEnabled,
    reducedMotion,
    toggleCursor,
    setVariant,
    resetCursor,
  } = useCursorContext();

  const [activeTab, setActiveTab] = useState<"cream" | "night" | "all">("all");
  const [manualVariant, setManualVariant] = useState<CursorVariant | "auto">("auto");
  const [magnetStrength, setMagnetStrength] = useState<number>(0.35);

  const VARIANTS: { id: CursorVariant; name: string; desc: string; sampleLabel?: string }[] = [
    { id: "default", name: "1. Default", desc: "10px solid blue dot + 2 trailing circles (orange 28px, coral 20px)" },
    { id: "link", name: "2. Link / Magnetic", desc: "56px blue-deep at 90% opacity + magnetic pull", sampleLabel: "Explore" },
    { id: "view", name: "3. View (Case Study)", desc: "96px blue circle with cream handwritten label 'View', -6° rotation", sampleLabel: "View" },
    { id: "drag", name: "4. Drag (Sketchbook)", desc: "96px orange circle with label 'Drag' & animated arrows", sampleLabel: "Drag" },
    { id: "pencil", name: "5. Pencil (Drafting)", desc: "Brand pencil SVG rotated -35°, tip at pointer + coral trail", sampleLabel: "Draft" },
    { id: "bulb", name: "6. Bulb (Innovation)", desc: "56px circle with bulb SVG in cream on blue-deep + dash rays", sampleLabel: "Ideas" },
    { id: "text", name: "7. Text (Input/Paragraph)", desc: "2px x 24px vertical bar; native text selection retained", sampleLabel: "Type" },
    { id: "hide", name: "8. Hide (iFrames/Dialogs)", desc: "Fades out custom cursor and restores native cursor immediately" },
    { id: "press", name: "9. Press / Ripple", desc: "On mousedown scales 0.8 and spawns a one-shot 60px ripple ring" },
    { id: "loupe", name: "10. Loupe (Magnifier)", desc: "Thin 2px blue-deep ring matching loupe diameter, hides center dot", sampleLabel: "Inspect" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--cream)", color: "var(--ink)", fontFamily: "'Satoshi', sans-serif" }}>
      {/* Top Banner & Control HUD */}
      <header
        style={{
          borderBottom: "1px solid var(--hairline)",
          backgroundColor: "var(--surface)",
          padding: "1.25rem 2rem",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 4px 20px rgba(14,27,61,0.04)",
        }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.25rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
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
                THE INTELLIVERSE DEV LAB
              </span>
              <span style={{ fontSize: "0.6875rem", padding: "0.15rem 0.5rem", borderRadius: "999px", backgroundColor: "rgba(61,123,247,0.1)", color: "var(--blue-deep)", fontWeight: 600 }}>
                Dev Only
              </span>
            </div>
            <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.75rem", margin: 0, letterSpacing: "-0.02em" }}>
              Overlapping Minds Cursor Lab
            </h1>
          </div>

          {/* Live System Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            {/* Live State Badge */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                padding: "0.4rem 0.85rem",
                borderRadius: "6px",
                backgroundColor: "rgba(14,27,61,0.04)",
                border: "1px solid var(--hairline)",
                display: "flex",
                gap: "0.6rem",
              }}
            >
              <span>Variant: <strong style={{ color: "var(--blue-deep)" }}>{activeVariant}</strong></span>
              <span>Theme: <strong style={{ color: activeTheme === "night" ? "var(--orange)" : "var(--blue)" }}>{activeTheme}</strong></span>
              {activeLabel && <span>Label: <em>&ldquo;{activeLabel}&rdquo;</em></span>}
            </div>

            {/* Toggle Cursor */}
            <button
              onClick={toggleCursor}
              data-cursor="link"
              data-cursor-magnetic
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                cursor: "pointer",
                border: "1px solid var(--hairline)",
                backgroundColor: isEnabled ? "var(--blue-deep)" : "var(--surface)",
                color: isEnabled ? "var(--cream)" : "var(--muted)",
                transition: "all 0.2s ease",
              }}
            >
              Custom Cursor: {isEnabled ? "Active (ON)" : "Disabled (OFF)"}
            </button>

            {/* Reduced Motion Indicator */}
            <div
              style={{
                fontSize: "0.6875rem",
                fontFamily: "'JetBrains Mono', monospace",
                color: reducedMotion ? "var(--coral)" : "var(--muted)",
                padding: "0.4rem 0.6rem",
                borderRadius: "4px",
                border: "1px solid var(--hairline)",
              }}
            >
              Reduced Motion: {reducedMotion ? "Active" : "Normal"}
            </div>

            {/* Back Home */}
            <Link
              href="/"
              data-cursor="link"
              style={{
                fontSize: "0.75rem",
                fontFamily: "'JetBrains Mono', monospace",
                textDecoration: "none",
                color: "var(--ink)",
                border: "1px solid var(--hairline)",
                padding: "0.45rem 0.9rem",
                borderRadius: "6px",
              }}
            >
              ← Back to Site
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ maxWidth: "1440px", margin: "1rem auto 0 auto", display: "flex", gap: "0.5rem" }}>
          {(["all", "cream", "night"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              data-cursor="link"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                padding: "0.35rem 0.85rem",
                borderRadius: "999px",
                border: `1px solid ${activeTab === tab ? "var(--blue-deep)" : "var(--hairline)"}`,
                backgroundColor: activeTab === tab ? "var(--blue-deep)" : "transparent",
                color: activeTab === tab ? "var(--cream)" : "var(--muted)",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {tab === "all" ? "Show Both Themes" : `${tab} Section Demo`}
            </button>
          ))}
        </div>

        {/* Manual Variant Force Switcher */}
        <div style={{ maxWidth: "1440px", margin: "0.75rem auto 0 auto", display: "flex", gap: "0.35rem", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--muted)", marginRight: "0.5rem" }}>
            Force Variant:
          </span>
          <button
            onClick={() => { setManualVariant("auto"); resetCursor(); }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.625rem",
              padding: "0.2rem 0.55rem",
              borderRadius: "4px",
              border: `1px solid ${manualVariant === "auto" ? "var(--blue-deep)" : "var(--hairline)"}`,
              backgroundColor: manualVariant === "auto" ? "var(--blue-deep)" : "transparent",
              color: manualVariant === "auto" ? "var(--cream)" : "var(--ink)",
              cursor: "pointer",
            }}
          >
            Auto (Hover)
          </button>
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                setManualVariant(v.id);
                setVariant(v.id, { label: v.sampleLabel });
              }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.625rem",
                padding: "0.2rem 0.55rem",
                borderRadius: "4px",
                border: `1px solid ${manualVariant === v.id ? "var(--blue-deep)" : "var(--hairline)"}`,
                backgroundColor: manualVariant === v.id ? "var(--blue-deep)" : "transparent",
                color: manualVariant === v.id ? "var(--cream)" : "var(--ink)",
                cursor: "pointer",
              }}
            >
              {v.id}
            </button>
          ))}
        </div>
      </header>

      {/* Main Sandbox Grid */}
      <main style={{ maxWidth: "1440px", margin: "0 auto", padding: "2.5rem 2rem 5rem 2rem" }}>
        {/* SECTION 1: CREAM THEME */}
        {(activeTab === "all" || activeTab === "cream") && (
          <section
            data-theme="cream"
            style={{
              backgroundColor: "var(--cream)",
              border: "1px solid var(--hairline)",
              borderRadius: "20px",
              padding: "clamp(2rem, 4vw, 3.5rem)",
              marginBottom: "3rem",
              boxShadow: "0 10px 30px rgba(14,27,61,0.03)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--blue-deep)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  LIGHT ENVIRONMENT · DATA-THEME=&quot;CREAM&quot;
                </span>
                <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "2.4rem", margin: "0.25rem 0 0 0", color: "var(--ink)" }}>
                  Cream Canvas (mix-blend-mode: multiply)
                </h2>
                <p style={{ margin: "0.25rem 0 0 0", color: "var(--muted)", fontSize: "0.875rem" }}>
                  Primary dot is #3D7BF7; overlaps with trailing orange (#FDB347) and coral (#FF6B7B) multiply into rich brand tones.
                </p>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "var(--muted)" }}>
                Background #F8F2E4
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {/* 1. Default Hover Box */}
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--hairline)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase" }}>
                  Variant 01
                </span>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.5rem", margin: "0.25rem 0 0.5rem 0" }}>
                  Default Follower
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5, marginBottom: "1rem" }}>
                  10px crisp blue dot with rapid follow (0.08s), trailing orange (0.25s) and coral (0.4s) circles. Move fast to observe velocity squash & stretch.
                </p>
                <div
                  style={{
                    height: "80px",
                    borderRadius: "8px",
                    border: "1px dashed var(--hairline)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                  }}
                >
                  Move cursor across this zone
                </div>
              </div>

              {/* 2. Link / Button Magnetic */}
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--hairline)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase" }}>
                  Variant 02
                </span>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.5rem", margin: "0.25rem 0 0.5rem 0" }}>
                  Link / Magnetic Pull
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5, marginBottom: "1rem" }}>
                  Dot expands to 56px blue-deep at 90% opacity, trailing circles tuck behind, and button magnetizes up to 8px.
                </p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                  <button
                    data-cursor="link"
                    data-cursor-magnetic
                    data-magnet-strength={magnetStrength}
                    className="btn-primary"
                    style={{ fontSize: "0.75rem", padding: "0.55rem 1.25rem" }}
                  >
                    <span>Magnetic CTA ↗</span>
                  </button>
                  <a
                    href="#lab"
                    data-cursor="link"
                    style={{ fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--blue-deep)", textDecoration: "none" }}
                  >
                    Standard Nav Link →
                  </a>
                </div>

                <div style={{ marginTop: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.6875rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--muted)" }}>Strength:</span>
                  {[0.2, 0.35, 0.7].map((s) => (
                    <button
                      key={s}
                      onClick={() => setMagnetStrength(s)}
                      style={{
                        fontSize: "0.625rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        padding: "0.15rem 0.45rem",
                        borderRadius: "3px",
                        border: `1px solid ${magnetStrength === s ? "var(--blue-deep)" : "var(--hairline)"}`,
                        backgroundColor: magnetStrength === s ? "rgba(61,123,247,0.12)" : "transparent",
                        color: magnetStrength === s ? "var(--blue-deep)" : "var(--muted)",
                        cursor: "pointer",
                      }}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. View (Case Study Card) */}
              <div
                data-cursor="view"
                data-cursor-label="View"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--hairline)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--blue-deep)", fontWeight: 700, textTransform: "uppercase" }}>
                  Variant 03 · Hover Me
                </span>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.5rem", margin: "0.25rem 0 0.5rem 0" }}>
                  Case Study Card (View)
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
                  Expands into 96px blue circle with centered handwritten label &ldquo;View&rdquo; tilted at -6°. Trailing circles smoothly dock behind.
                </p>
              </div>

              {/* 4. Drag (Sketchbook & Carousel) */}
              <div
                data-cursor="drag"
                data-cursor-label="Drag"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--hairline)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--orange)", fontWeight: 700, textTransform: "uppercase" }}>
                  Variant 04 · Hover Me
                </span>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.5rem", margin: "0.25rem 0 0.5rem 0" }}>
                  Carousel / Sketchbook (Drag)
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
                  Expands into 96px orange circle with &ldquo;Drag&rdquo; label and horizontal navigation arrows. Click and hold to see the 0.9 press scale!
                </p>
              </div>

              {/* 5. Pencil (Drawing / Drafting Areas) */}
              <div
                data-cursor="pencil"
                data-cursor-label="Draft"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--hairline)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--coral)", fontWeight: 700, textTransform: "uppercase" }}>
                  Variant 05 · Hover Me
                </span>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.5rem", margin: "0.25rem 0 0.5rem 0" }}>
                  Corner Tape / Sketch (Pencil)
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
                  Replaces the dot with the brand pencil SVG rotated at -35° with its exact tip positioned at the cursor coordinates, leaving a tiny coral dot trail.
                </p>
              </div>

              {/* 6. Bulb (Innovation & Catalog) */}
              <div
                data-cursor="bulb"
                data-cursor-label="Ideas"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--hairline)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--blue-deep)", fontWeight: 700, textTransform: "uppercase" }}>
                  Variant 06 · Hover Me
                </span>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.5rem", margin: "0.25rem 0 0.5rem 0" }}>
                  Services Catalog (Bulb)
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
                  56px blue-deep circle displaying the light-bulb SVG in cream with pulsing stroke-dash rays.
                </p>
              </div>

              {/* 7. Text Input & Paragraph */}
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--hairline)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase" }}>
                  Variant 07 · Text Selection
                </span>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.5rem", margin: "0.25rem 0 0.5rem 0" }}>
                  Form Field &amp; Text Bar
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                  Custom cursor morphs into a slender 2px × 24px vertical bar. Native text selection remains intact.
                </p>
                <input
                  type="text"
                  data-cursor="text"
                  placeholder="Focus and type here..."
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid var(--hairline)",
                    backgroundColor: "var(--cream)",
                    color: "var(--ink)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.8125rem",
                  }}
                />
              </div>

              {/* 8. Hide (iFrame / Dialog zone) */}
              <div
                data-cursor="hide"
                style={{
                  backgroundColor: "rgba(14,27,61,0.03)",
                  border: "1px dashed var(--hairline)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase" }}>
                  Variant 08 · Restore Native Cursor
                </span>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.5rem", margin: "0.25rem 0 0.5rem 0" }}>
                  Native Cursor Safe Zone (Hide)
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
                  Custom cursor fades out completely; standard OS cursor is restored immediately for iframes, media controls, or system dialogs.
                </p>
              </div>

              {/* 10. Loupe (Magnifier) */}
              <div
                data-cursor="loupe"
                data-cursor-label="Loupe"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--hairline)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--blue-deep)", fontWeight: 700, textTransform: "uppercase" }}>
                  Variant 10 · Hover Me
                </span>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.5rem", margin: "0.25rem 0 0.5rem 0" }}>
                  Tactile Loupe (Magnifier)
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
                  Transforms into a 2px blue-deep glass ring matching the sketchbook magnifier diameter, hiding the center dot.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: NIGHT THEME */}
        {(activeTab === "all" || activeTab === "night") && (
          <section
            data-theme="night"
            style={{
              backgroundColor: "var(--night)", // #0B1530
              color: "var(--cream)",
              border: "1px solid rgba(228, 218, 195, 0.12)",
              borderRadius: "20px",
              padding: "clamp(2rem, 4vw, 3.5rem)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--orange)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  DARK ENVIRONMENT · DATA-THEME=&quot;NIGHT&quot;
                </span>
                <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "2.4rem", margin: "0.25rem 0 0 0", color: "var(--cream)" }}>
                  Night Canvas (mix-blend-mode: screen)
                </h2>
                <p style={{ margin: "0.25rem 0 0 0", color: "rgba(248, 242, 228, 0.6)", fontSize: "0.875rem" }}>
                  Dot automatically turns cream (#F8F2E4), trailing circles shift to luminous screen blend mode.
                </p>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "rgba(248, 242, 228, 0.4)" }}>
                Background #0B1530
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {/* Night Link */}
              <div
                style={{
                  backgroundColor: "rgba(18, 30, 68, 0.7)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--orange)", textTransform: "uppercase" }}>
                  Night Variant 02
                </span>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.5rem", margin: "0.25rem 0 0.5rem 0", color: "var(--cream)" }}>
                  Magnetic Action (Night)
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "rgba(248, 242, 228, 0.6)", lineHeight: 1.5, marginBottom: "1rem" }}>
                  Observe the screen blend mode creating luminous intersections without neon blobs.
                </p>
                <button
                  data-cursor="link"
                  data-cursor-magnetic
                  className="btn-primary"
                  style={{ fontSize: "0.75rem", padding: "0.55rem 1.25rem" }}
                >
                  <span>Commission Project ↗</span>
                </button>
              </div>

              {/* Night View */}
              <div
                data-cursor="view"
                data-cursor-label="Inspect"
                style={{
                  backgroundColor: "rgba(18, 30, 68, 0.7)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--orange)", fontWeight: 700, textTransform: "uppercase" }}>
                  Night Variant 03
                </span>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.5rem", margin: "0.25rem 0 0.5rem 0", color: "var(--cream)" }}>
                  Night Spec Plate (View)
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "rgba(248, 242, 228, 0.6)", lineHeight: 1.5, margin: 0 }}>
                  96px circle with cream handwritten label &ldquo;Inspect&rdquo; rendered against the deep navy backdrop.
                </p>
              </div>

              {/* Night Drag */}
              <div
                data-cursor="drag"
                data-cursor-label="Flywheel"
                style={{
                  backgroundColor: "rgba(18, 30, 68, 0.7)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "var(--orange)", fontWeight: 700, textTransform: "uppercase" }}>
                  Night Variant 04
                </span>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.5rem", margin: "0.25rem 0 0.5rem 0", color: "var(--cream)" }}>
                  Execution Track (Drag)
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "rgba(248, 242, 228, 0.6)", lineHeight: 1.5, margin: 0 }}>
                  Orange drag circle with left/right arrows for navigating horizontal process stages.
                </p>
              </div>

              {/* Night Text Input */}
              <div
                style={{
                  backgroundColor: "rgba(18, 30, 68, 0.7)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6875rem", color: "rgba(248, 242, 228, 0.5)", textTransform: "uppercase" }}>
                  Night Variant 07
                </span>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.5rem", margin: "0.25rem 0 0.5rem 0", color: "var(--cream)" }}>
                  Night Form Input
                </h3>
                <input
                  type="text"
                  data-cursor="text"
                  placeholder="Direct inquiry input..."
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid rgba(228, 218, 195, 0.2)",
                    backgroundColor: "rgba(248, 242, 228, 0.05)",
                    color: "var(--cream)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.8125rem",
                  }}
                />
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
