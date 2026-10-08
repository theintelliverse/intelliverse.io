"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { springs, ease, scaleIn, staggerContainer } from "@/lib/motion";
import Magnetic from "@/components/ui/Magnetic";

const DEFAULT_TEAM = [
  {
    name: "Dhruvil Thummar",
    role: "Co-founder & CTO",
    badge: "SYSTEMS & CLOUD",
    tagline: "Systems architect & performance engineering lead",
    currently: "Optimizing zero-downtime edge proxies & Appointory real-time messaging pipeline.",
    image: "/founder_dhruvil.jpg",
    linkedin: "https://www.linkedin.com/in/dhruvilthummar",
    circleColor: "var(--blue)",
    order: 1,
  },
  {
    name: "Rudra Kankotiya",
    role: "Co-founder & CMO",
    badge: "GROWTH & PRODUCT",
    tagline: "Growth director, brand strategist & client partnerships",
    currently: "Leading international rollout for Vrix Jewellery headless storefront.",
    image: "/founder_rudra.jpg",
    linkedin: "https://www.linkedin.com/in/rudra-kankotiya-2173ab31a",
    circleColor: "var(--coral)",
    order: 2,
  },
  {
    name: "Jal Anghan",
    role: "Founder & Director",
    badge: "STRATEGY & OPERATIONS",
    tagline: "Corporate governance & strategic business development",
    currently: "Structuring long-term enterprise development partnerships & compliance frameworks.",
    image: "/founder_jal.jpg",
    linkedin: "https://www.linkedin.com/in/jal-anghan-534628309",
    circleColor: "var(--orange)",
    order: 3,
  },
];

export default function Team({ data }) {
  const members =
    data && data.length > 0
      ? data.map((m, idx) => ({
          ...m,
          badge:
            m.badge ||
            (idx === 0
              ? "SYSTEMS & CLOUD"
              : idx === 1
              ? "GROWTH & PRODUCT"
              : "STRATEGY & OPERATIONS"),
          currently:
            m.currently ||
            DEFAULT_TEAM[idx]?.currently ||
            "Spearheading high-performance client architectures.",
          circleColor:
            idx === 0 ? "var(--blue)" : idx === 1 ? "var(--coral)" : "var(--orange)",
        }))
      : DEFAULT_TEAM;

  return (
    <section
      id="team"
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
        
        {/* Eyebrow & Header with Entrance Motion */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: ease.expo }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "var(--blue-deep)",
                  display: "inline-block",
                  boxShadow: "0 0 10px rgba(47, 99, 224, 0.7)",
                }}
                className="animate-pulse"
              />
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--blue-deep)",
                  fontWeight: 700,
                  display: "inline-block",
                }}
              >
                Direct Founder Access
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.5625rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "999px",
                  backgroundColor: "rgba(47, 99, 224, 0.08)",
                  color: "var(--blue-deep)",
                  fontWeight: 600,
                }}
              >
                Live Engineering
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                margin: "0 0 0.85rem 0",
                fontWeight: 400,
              }}
            >
              The founders who build it.
            </h2>

            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: "1.0625rem",
                lineHeight: 1.65,
                color: "var(--ink-2)",
                maxWidth: "40rem",
                margin: 0,
              }}
            >
              No account managers or delegated tiers. You architect and engineer directly alongside the leaders who write the code and shape the product.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: ease.expo, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--live)",
                display: "inline-block",
                boxShadow: "0 0 8px rgba(34, 165, 91, 0.7)",
              }}
              className="animate-pulse"
            />
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.75rem",
                color: "var(--ink-3)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Ahmedabad, India · Worldwide Sprints
            </span>
          </motion.div>
        </div>

        {/* 3-Column Team Cards Grid with Staggered Entrance */}
        <motion.div
          variants={staggerContainer(0.18, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {members.map((member, i) => (
            <TeamCard key={member.id || member._id || member.name || `team-${i}`} member={member} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TeamCard({ member, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const firstName = member.name.split(" ")[0];

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 35, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.8, ease: ease.expo },
        },
      }}
      whileHover={{ y: -10, transition: springs.snappy }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
      style={{
        backgroundColor: "rgba(255,255,255,0.9)",
        border: isHovered ? "1px solid rgba(47,99,224,0.3)" : "1px solid var(--line-2)",
        borderRadius: "20px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: isHovered
          ? "0 22px 45px -12px rgba(14,27,61,0.12), 0 0 0 1px rgba(47,99,224,0.08)"
          : "0 10px 30px -10px rgba(14,27,61,0.06)",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease, background-color 0.35s ease",
      }}
    >
      {/* Top subtle highlight gradient indicator on hover */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, transparent, ${member.circleColor || "var(--blue)"}, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      <div>
        {/* Photo Frame with Offset Brand Circle Behind */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1/0.88",
            borderRadius: "14px",
            margin: "0 auto 1.5rem auto",
            overflow: "hidden",
            backgroundColor: "var(--bg-2)",
          }}
        >
          {/* Floating Solid Brand Disc Behind */}
          <motion.div
            aria-hidden="true"
            animate={{
              scale: isHovered ? 1.15 : 1,
              opacity: isHovered ? 0.38 : 0.25,
            }}
            transition={{ duration: 0.5, ease: ease.expo }}
            style={{
              position: "absolute",
              top: "10%",
              right: "4%",
              width: "75%",
              height: "75%",
              borderRadius: "50%",
              backgroundColor: member.circleColor || "var(--blue)",
              mixBlendMode: "multiply",
              zIndex: 1,
              pointerEvents: "none",
              animation: "float 7s ease-in-out infinite",
            }}
          />

          {/* Portrait Image with synchronized card hover scale and grayscale transition */}
          {member.image ? (
            <motion.img
              src={member.image}
              alt={member.name}
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={springs.snappy}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: `${member.imageX || 50}% ${member.imageY || 20}%`,
                filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                transition: "filter 0.5s ease",
                position: "relative",
                zIndex: 2,
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--serif)",
                fontSize: "3.5rem",
                color: "var(--ink)",
                zIndex: 2,
                position: "relative",
              }}
            >
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}
        </div>

        {/* Role Badge Pill */}
        <div className="flex justify-between items-center mb-3">
          {(member.badge || member.role) && (
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.625rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "0.25rem 0.65rem",
                backgroundColor: isHovered ? "rgba(47,99,224,0.08)" : "var(--bg-2)",
                borderRadius: "999px",
                border: "1px solid var(--line)",
                color: isHovered ? "var(--blue-deep)" : "var(--ink)",
                textTransform: "uppercase",
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
            >
              {member.badge || member.role}
            </span>
          )}

          {member.linkedin && (
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn Profile`}
              data-cursor="link"
              data-cursor-magnetic
              whileHover={{ scale: 1.08, y: -1 }}
              transition={springs.bouncy}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                color: "var(--ink-3)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.2rem 0.55rem",
                borderRadius: "6px",
                backgroundColor: "rgba(14,27,61,0.03)",
                transition: "color 0.2s ease, background-color 0.2s ease",
              }}
              className="hover:text-[var(--blue-deep)] hover:bg-[rgba(47,99,224,0.08)]"
            >
              <span>IN</span>
              <span style={{ transform: isHovered ? "translate(1px, -1px)" : "none", transition: "transform 0.25s ease" }}>↗</span>
            </motion.a>
          )}
        </div>

        {/* Member Name */}
        <h3
          style={{
            fontFamily: "var(--serif)",
            fontSize: "2.1rem",
            letterSpacing: "-0.015em",
            color: "var(--ink)",
            margin: "0 0 0.4rem 0",
            lineHeight: 1.15,
          }}
        >
          {member.name}
        </h3>

        {/* Role Tagline */}
        <p
          style={{
            fontFamily: "var(--sans)",
            fontSize: "0.9375rem",
            color: "var(--ink-2)",
            lineHeight: 1.5,
            marginBottom: "1.25rem",
          }}
        >
          {member.tagline}
        </p>

        {/* "Currently Building" Block with pulsing live telemetry pip */}
        <div
          style={{
            backgroundColor: isHovered ? "rgba(255,255,255,0.95)" : "var(--bg-2)",
            border: isHovered ? "1px solid rgba(239, 107, 46, 0.35)" : "1px solid var(--line)",
            borderRadius: "10px",
            padding: "0.85rem 1rem",
            marginBottom: "1.5rem",
            transition: "border-color 0.3s ease, background-color 0.3s ease",
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--orange)",
                display: "inline-block",
                boxShadow: "0 0 8px rgba(239, 107, 46, 0.8)",
              }}
              className="animate-pulse"
            />
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.5625rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--orange)",
                display: "block",
                fontWeight: 700,
              }}
            >
              CURRENTLY BUILDING
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.75rem",
              color: "var(--ink)",
              margin: 0,
              lineHeight: 1.45,
            }}
          >
            {member.currently}
          </p>
        </div>
      </div>

      {/* Footer "Talk to Founder" Action */}
      <div
        style={{
          paddingTop: "1.25rem",
          borderTop: "1px solid var(--line)",
        }}
      >
        <Magnetic strength={0.3}>
          <Link
            href="/#contact"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: isHovered ? "var(--blue-deep)" : "var(--ink)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "color 0.25s ease",
            }}
          >
            <span>Talk to {firstName}</span>
            <span
              style={{
                color: "var(--orange)",
                fontWeight: 700,
                transform: isHovered ? "translateX(5px)" : "translateX(0)",
                transition: "transform 0.25s ease",
                display: "inline-block",
              }}
            >
              →
            </span>
          </Link>
        </Magnetic>
      </div>
    </motion.article>
  );
}
