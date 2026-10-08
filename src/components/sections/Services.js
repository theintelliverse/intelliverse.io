"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { springs, ease, fadeUp, staggerContainer } from "@/lib/motion";
import SplitTextReveal from "@/components/ui/SplitTextReveal";

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

export default function Services({ data }) {
  const servicesList = Array.isArray(data) && data.length > 0 ? data : SERVICES;
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });

  const onMouseMove = useCallback((e) => {
    targetPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    let raf = null;
    const animate = () => {
      setTrailPos((prev) => ({
        x: prev.x + (targetPos.current.x - prev.x) * 0.14,
        y: prev.y + (targetPos.current.y - prev.y) * 0.14,
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
      className="section-gap relative border-t border-[var(--line)]"
      style={{
        backgroundColor: "var(--cream)",
        color: "var(--ink)",
        paddingTop: "clamp(5rem, 9vh, 7.5rem)",
        paddingBottom: "clamp(5rem, 9vh, 7.5rem)",
      }}
    >
      <div className="container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>
        
        {/* Eyebrow Label */}
        <div className="mb-4">
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
            SERVICE DIRECTORY &amp; ARCHITECTURE
          </span>
        </div>

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SplitTextReveal
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--ink)] tracking-tight leading-none"
          >
            What we engineer, built like a craft.
          </SplitTextReveal>

          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.75rem",
              color: "var(--ink-2)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Hover service row to inspect architecture
          </p>
        </div>

        {/* Full-Width Interactive Directory List */}
        <ul className="list-none p-0 m-0 border-t border-[var(--line)]">
          {servicesList.map((svc, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <motion.li
                key={svc.id}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                style={{
                  position: "relative",
                  borderBottom: "1px solid var(--line)",
                  overflow: "hidden",
                  borderRadius: "16px",
                  margin: "0.5rem 0",
                  padding: "clamp(1.75rem, 3.2vh, 2.5rem) 1.5rem",
                  cursor: "pointer",
                }}
              >
                {/* Night Background Slide-Up Overlay */}
                <motion.div
                  aria-hidden="true"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: ease.expo }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "var(--night)",
                    borderRadius: "16px",
                    transformOrigin: "bottom",
                    zIndex: 0,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-8 flex-1">
                      
                      {/* Coloured Dot */}
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: svc.dotColor,
                          flexShrink: 0,
                          boxShadow: isHovered ? `0 0 12px ${svc.dotColor}` : "none",
                          transition: "box-shadow 0.3s ease",
                        }}
                      />

                      {/* Mono Index Number */}
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "0.8125rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          color: isHovered ? "var(--orange)" : "var(--ink-3)",
                          transition: "color 0.25s ease",
                        }}
                      >
                        {svc.index}
                      </span>

                      {/* Display Serif Title (Slides right + turns white on hover) */}
                      <motion.h3
                        animate={{
                          x: isHovered ? 12 : 0,
                          color: isHovered ? "#F6F7FC" : "var(--ink)",
                        }}
                        transition={springs.snappy}
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: "clamp(1.85rem, 3.5vw, 3rem)",
                          letterSpacing: "-0.02em",
                          lineHeight: 1.1,
                          margin: 0,
                        }}
                      >
                        {svc.title}
                      </motion.h3>
                    </div>

                    {/* Arrow reveal on right */}
                    <motion.span
                      animate={{
                        x: isHovered ? 0 : -20,
                        opacity: isHovered ? 1 : 0,
                        color: "var(--orange)",
                      }}
                      transition={springs.snappy}
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: "2rem",
                        paddingRight: "1rem",
                      }}
                      aria-hidden="true"
                    >
                      →
                    </motion.span>
                  </div>

                  {/* Sub-item capabilities pills */}
                  <div className="mt-4 pl-7 md:pl-16">
                    <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                      {svc.sub.map((item) => (
                        <li key={item}>
                          <span
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: "0.6875rem",
                              padding: "0.35rem 0.75rem",
                              borderRadius: "999px",
                              backgroundColor: isHovered
                                ? "rgba(255,255,255,0.08)"
                                : "rgba(14,27,61,0.04)",
                              border: `1px solid ${
                                isHovered ? "rgba(255,255,255,0.15)" : "var(--line)"
                              }`,
                              color: isHovered ? "rgba(246,247,252,0.85)" : "var(--ink-2)",
                              display: "inline-block",
                              transition: "all 0.25s ease",
                            }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Floating Cursor-Following Architecture Preview Tooltip */}
      {hoveredIndex !== null && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            left: trailPos.x + 28,
            top: trailPos.y - 70,
            width: "320px",
            pointerEvents: "none",
            zIndex: 7000,
            backgroundColor: "rgba(11, 21, 48, 0.95)",
            border: "1px solid rgba(253, 179, 71, 0.35)",
            borderRadius: "14px",
            padding: "1.25rem",
            boxShadow: "0 20px 45px rgba(0,0,0,0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: servicesList[hoveredIndex]?.dotColor,
              }}
            />
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--orange)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {servicesList[hoveredIndex]?.index} / SYSTEM ARCHITECTURE
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--sans)",
              fontSize: "0.8125rem",
              lineHeight: 1.55,
              color: "rgba(246,247,252,0.9)",
              margin: 0,
            }}
          >
            {servicesList[hoveredIndex]?.previewText}
          </p>
        </div>
      )}
    </section>
  );
}
