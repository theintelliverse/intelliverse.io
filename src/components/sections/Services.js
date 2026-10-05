"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Services section — Full-Width Large Type Directory
 * ─ Coloured dot per service (blue, indigo, orange, coral)
 * ─ Hover = blue-deep text + floating preview
 * ─ Large type list across the full width
 */
const SERVICES = [
  {
    id: "web",
    title: "Web Architecture & Frontend",
    index: "01",
    dotColor: "var(--blue)",
    previewText: "Sub-second Next.js 15 apps, headless Shopify storefronts, and tactile WebGL experiences.",
    sub: [
      "Next.js 15 & React 19 Architectures",
      "Headless E-Commerce & Storefronts",
      "Bespoke Interaction Design & Canvas",
      "Core Web Vitals (<800ms LCP)",
      "PWA & Offline Capability",
    ],
  },
  {
    id: "software",
    title: "Custom SaaS & Software Systems",
    index: "02",
    dotColor: "var(--indigo)",
    previewText: "Multi-tenant cloud architectures, role-based security, and high-throughput transactional APIs.",
    sub: [
      "Multi-Tenant SaaS Portals",
      "Node.js, FastAPI & Go Microservices",
      "Distributed Database Engineering",
      "Cryptographic Telemetry & Audit Trails",
      "Stripe / Razorpay Payment Systems",
    ],
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure & DevOps",
    index: "03",
    dotColor: "var(--orange)",
    previewText: "Zero-downtime CI/CD deployment pipelines, multi-region Kubernetes, and edge failover.",
    sub: [
      "AWS, GCP & Cloudflare Edge",
      "Docker & Kubernetes Orchestration",
      "Terraform Infrastructure as Code",
      "Zero-Downtime Deployment Pipelines",
      "24/7 Telemetry & Health Auditing",
    ],
  },
  {
    id: "ai",
    title: "Applied AI & Agentic Workflows",
    index: "04",
    dotColor: "var(--coral)",
    previewText: "Enterprise Agentic RAG workflows, vector intelligence databases, and neural automations.",
    sub: [
      "Enterprise Agentic RAG Workflows",
      "Gemini 2.5 & OpenAI API Integrations",
      "Vector Databases (Qdrant, Pinecone)",
      "Automated Document Processing",
      "Secure On-Premise LLM Pipelines",
    ],
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const trailRef = useRef(null);
  const sectionRef = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });

  const onMouseMove = useCallback((e) => {
    targetPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    let raf = null;
    const animate = () => {
      setTrailPos((prev) => ({
        x: prev.x + (targetPos.current.x - prev.x) * 0.12,
        y: prev.y + (targetPos.current.y - prev.y) * 0.12,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <section
      id="services"
      data-theme="cream"
      ref={sectionRef}
      className="section-gap"
      style={{
        borderTop: "1px solid var(--hairline)",
        backgroundColor: "var(--cream)",
        color: "var(--ink)",
        position: "relative",
      }}
    >
      <div className="container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Label */}
        <div style={{ marginBottom: "3rem" }}>
          <span className="section-label" style={{ color: "var(--muted)" }}>
            Service Catalog
          </span>
        </div>

        {/* Heading */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
        >
          <h2
            data-cursor="bulb"
            data-cursor-label="Ideas"
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--ink)",
              margin: 0,
            }}
          >
            What we engineer,{" "}
            <em style={{ fontStyle: "italic", color: "var(--blue-deep)" }}>
              built like a craft.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Hover service to preview architecture
          </p>
        </div>

        {/* Directory list across full width */}
        <div style={{ borderTop: "1px solid var(--hairline)" }}>
          {SERVICES.map((svc, i) => (
            <ServiceRow
              key={svc.id}
              svc={svc}
              isActive={activeIndex === i}
              onEnter={() => setActiveIndex(i)}
              onLeave={() => setActiveIndex(null)}
            />
          ))}
        </div>
      </div>

      {/* Floating preview badge following cursor */}
      {activeIndex !== null && (
        <div
          ref={trailRef}
          aria-hidden="true"
          style={{
            position: "fixed",
            left: trailPos.x + 28,
            top: trailPos.y - 60,
            width: "300px",
            pointerEvents: "none",
            zIndex: 7000,
            opacity: activeIndex !== null ? 1 : 0,
            transition: "opacity 0.25s ease",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--hairline)",
            borderRadius: "12px",
            padding: "1.25rem",
            boxShadow: "0 12px 32px rgba(14,27,61,0.12)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: SERVICES[activeIndex]?.dotColor,
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--blue-deep)",
                textTransform: "uppercase",
              }}
            >
              {SERVICES[activeIndex]?.index} / Overview
            </span>
          </div>
          <p style={{ fontSize: "0.8125rem", lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
            {SERVICES[activeIndex]?.previewText}
          </p>
        </div>
      )}
    </section>
  );
}

function ServiceRow({ svc, isActive, onEnter, onLeave }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      style={{
        borderBottom: "1px solid var(--hairline)",
        transition: "background-color 0.25s ease",
        backgroundColor: isActive ? "rgba(47, 99, 224, 0.03)" : "transparent",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        data-cursor="bulb"
        data-cursor-label="Explore"
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(1.75rem, 3.5vh, 2.5rem) 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
        aria-expanded={expanded}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(1rem, 2.5vw, 2rem)", flex: 1 }}>
          {/* Coloured Dot per Service */}
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: svc.dotColor,
              flexShrink: 0,
            }}
          />

          {/* Number */}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: "var(--muted)",
              letterSpacing: "0.1em",
            }}
          >
            {svc.index}
          </span>

          {/* Title */}
          <span
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(1.85rem, 3.6vw, 3rem)",
              letterSpacing: "-0.02em",
              color: isActive ? "var(--blue-deep)" : "var(--ink)",
              transition: "color 0.2s ease",
              lineHeight: 1.1,
            }}
          >
            {svc.title}
          </span>
        </div>

        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "1rem",
            color: isActive ? "var(--blue-deep)" : "var(--muted)",
            transform: expanded ? "rotate(45deg)" : "none",
            transition: "all 0.3s ease",
            padding: "0.5rem",
          }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {/* Sub-items */}
      {expanded && (
        <div style={{ paddingBottom: "2rem", paddingLeft: "clamp(2.5rem, 5vw, 4.5rem)" }}>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", listStyle: "none", padding: 0, margin: 0 }}>
            {svc.sub.map((item) => (
              <li key={item}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6875rem",
                    padding: "0.35rem 0.85rem",
                    borderRadius: "999px",
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--hairline)",
                    color: "var(--ink)",
                    display: "inline-block",
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
