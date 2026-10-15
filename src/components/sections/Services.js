"use client";

import { useState } from "react";
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

  return (
    <section
      id="services"
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
            Four Core Disciplines · Full-Stack Longevity
          </p>
        </div>

        {/* Full-Width Interactive Directory List */}
        <ul className="list-none p-0 m-0 border-t border-[var(--line)]">
          {servicesList.map((svc, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <motion.li
                key={svc.id || svc.index || `svc-${i}`}
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
                          x: isHovered ? 10 : 0,
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
                  </div>

                  {/* Architecture Overview Line (Placed cleanly underneath, never covers chips) */}
                  {svc.previewText && (
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "0.9375rem",
                        lineHeight: 1.6,
                        color: isHovered ? "rgba(246,247,252,0.85)" : "var(--ink-2)",
                        margin: "0.75rem 0 0.85rem 0",
                        maxWidth: "850px",
                        transition: "color 0.25s ease",
                      }}
                      className="pl-7 md:pl-16"
                    >
                      {svc.previewText}
                    </p>
                  )}

                  {/* Sub-item capabilities pills */}
                  <div className="mt-2 pl-7 md:pl-16">
                    <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                      {svc.sub.map((item, subIdx) => (
                        <li key={`${svc.id || i}-${item}-${subIdx}`}>
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
    </section>
  );
}
