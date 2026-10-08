"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateNumber } from "motion-number";
import { springs, ease } from "@/lib/motion";

const STUDIO_LOGS = [
  { ts: "05 OCT 10:42", pr: "vrix", col: "#9A7A45", msg: "currency switch cut to one request" },
  { ts: "05 OCT 09:15", pr: "appointory", col: "#0F7A57", msg: "lab reports reach patients live" },
  { ts: "04 OCT 18:30", pr: "studio", col: "#5B3FD9", msg: "new brief: logistics dashboard" },
  { ts: "03 OCT 21:04", pr: "site", col: "#2F63E0", msg: "v0.7: Vrix journal published" },
  { ts: "03 OCT 16:20", pr: "appointory", col: "#0F7A57", msg: "doctor pause states shipped" },
];

const STREAM_EVENTS = [
  { tag: "SECURITY", msg: "zero-trust edge tokens rotated", status: "VERIFIED", col: "var(--orange)" },
  { tag: "DEPLOY", msg: "vrix-edge-proxy online [18ms]", status: "OK", col: "var(--blue)" },
  { tag: "CACHE", msg: "appointory-core: 99.8% cache hit", status: "PASS", col: "var(--live)" },
  { tag: "OPTIMIZE", msg: "next/image AVIF pipeline loaded", status: "SYNC", col: "var(--indigo)" },
  { tag: "QUEUE", msg: "token pause states re-flowed", status: "LIVE", col: "var(--coral)" },
];

const BARS_DATA = [
  { day: "M", name: "Monday", val: 45, col: "#5B3FD9", grad: "linear-gradient(180deg, #7A5AF8 0%, #5B3FD9 100%)" },
  { day: "T", name: "Tuesday", val: 68, col: "#3D7BF7", grad: "linear-gradient(180deg, #5992FF 0%, #3D7BF7 100%)" },
  { day: "W", name: "Wednesday", val: 82, col: "#FF6B7B", grad: "linear-gradient(180deg, #FF8F9C 0%, #FF6B7B 100%)" },
  { day: "T", name: "Thursday", val: 54, col: "#FDB347", grad: "linear-gradient(180deg, #FED07E 0%, #FDB347 100%)" },
  { day: "F", name: "Friday", val: 91, col: "#10B981", grad: "linear-gradient(180deg, #34D399 0%, #10B981 100%)" },
  { day: "S", name: "Saturday", val: 74, col: "#8B5CF6", grad: "linear-gradient(180deg, #A78BFA 0%, #8B5CF6 100%)" },
  { day: "S", name: "Sunday", val: 96, col: "#2F63E0", grad: "linear-gradient(180deg, #4A7BFA 0%, #2F63E0 100%)" },
];

export default function StudioTelemetryCard({
  className = "",
  initialCount = 302,
  showFullLogs = true,
}) {
  const [deployCount, setDeployCount] = useState(initialCount);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [streamIndex, setStreamIndex] = useState(0);
  const [hoveredBar, setHoveredBar] = useState(null);

  // Typewriting effect for current studio log row
  useEffect(() => {
    const currentMsg = STUDIO_LOGS[activeLogIndex].msg;
    setTypedChars(0);

    const typeInterval = setInterval(() => {
      setTypedChars((prev) => {
        if (prev < currentMsg.length) {
          return prev + 1;
        } else {
          clearInterval(typeInterval);
          return prev;
        }
      });
    }, 38);

    const switchTimeout = setTimeout(() => {
      setActiveLogIndex((prev) => (prev + 1) % STUDIO_LOGS.length);
    }, 4500);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(switchTimeout);
    };
  }, [activeLogIndex]);

  // Rotating verified event stream
  useEffect(() => {
    const timer = setInterval(() => {
      setStreamIndex((prev) => (prev + 1) % STREAM_EVENTS.length);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  // Subtle live counter bump
  useEffect(() => {
    const timer = setInterval(() => {
      setDeployCount((prev) => prev + Math.floor(Math.random() * 2));
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  const currentLog = STUDIO_LOGS[activeLogIndex];
  const currentStream = STREAM_EVENTS[streamIndex];

  return (
    <div
      className={`studio-telemetry-card ${className}`}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(18px)",
        border: "1px solid var(--line-2)",
        borderRadius: "20px",
        padding: "1.5rem",
        boxShadow: "0 25px 50px -18px rgba(14, 27, 61, 0.12)",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* ── CARD HEADER: Live Feed & On the Bench ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--line)",
          paddingBottom: "0.85rem",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "var(--live)",
              boxShadow: "0 0 10px rgba(34, 165, 91, 0.8)",
              display: "inline-block",
            }}
            className="animate-pulse"
          />
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ink)",
            }}
          >
            Studio Telemetry
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.625rem",
              color: "var(--blue-deep)",
              letterSpacing: "0.06em",
              fontWeight: 600,
            }}
          >
            LIVE FEED
          </span>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.625rem",
              color: "var(--ink-3)",
            }}
          >
            · W41
          </span>
        </div>
      </div>

      {/* ── TYPEWRITING STUDIO LOG ROW (Open Workshop Journal Log) ── */}
      {showFullLogs && (
        <div
          style={{
            padding: "0.65rem 0.85rem",
            backgroundColor: "rgba(14, 27, 61, 0.03)",
            backgroundImage: "repeating-linear-gradient(transparent 0 28px, rgba(14,27,61,0.06) 28px 29px)",
            borderRadius: "10px",
            border: "1px solid var(--line-2)",
            marginBottom: "1.15rem",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "78px 84px 1fr",
              gap: "8px",
              alignItems: "center",
              width: "100%",
              fontFamily: "var(--mono)",
              fontSize: "0.6875rem",
              whiteSpace: "nowrap",
            }}
          >
            {/* Timestamp */}
            <span style={{ color: "var(--ink-3)", fontSize: "0.625rem" }}>
              {currentLog.ts}
            </span>

            {/* Project Badge */}
            <span
              style={{
                color: currentLog.col,
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "0.65rem",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "currentColor",
                }}
              />
              {currentLog.pr}
            </span>

            {/* Typewritten message with blinking terminal caret */}
            <span
              style={{
                color: "var(--ink)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "flex",
                alignItems: "center",
                fontWeight: 500,
              }}
            >
              <span style={{ color: "var(--blue-deep)", marginRight: "4px" }}>▸</span>
              {currentLog.msg.slice(0, typedChars)}
              <span
                style={{
                  display: "inline-block",
                  width: "5px",
                  height: "12px",
                  backgroundColor: "var(--blue-deep)",
                  marginLeft: "3px",
                  verticalAlign: "middle",
                }}
                className="animate-pulse"
              />
            </span>
          </div>
        </div>
      )}

      {/* ── METRIC & SPARKLINE BARS ── */}
      <div style={{ marginBottom: "1.15rem" }}>
        <div className="flex justify-between items-baseline mb-1">
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.625rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
            }}
          >
            Active Deployments · Q1
          </span>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.6875rem",
              color: "var(--live)",
              fontWeight: 700,
            }}
          >
            ↑ 18.4%
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
          <span
            style={{
              fontFamily: "var(--serif)",
              fontSize: "2.75rem",
              lineHeight: 1,
              color: "var(--ink)",
              fontWeight: 400,
            }}
          >
            <AnimateNumber>{deployCount}</AnimateNumber>
          </span>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.6875rem",
              letterSpacing: "0.06em",
              color: "var(--ink-3)",
              textTransform: "uppercase",
            }}
          >
            total live
          </span>
        </div>
      </div>

      {/* ── 7-DAY ACTIVITY SPARKLINE BARS WITH VIBRANT COLORS & ANIMATION ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          padding: "0.65rem 0.85rem 0.55rem",
          backgroundColor: "rgba(14, 27, 61, 0.035)",
          border: "1px solid var(--line-2)",
          borderRadius: "12px",
          marginBottom: "1.15rem",
          transition: "border-color 0.25s ease",
        }}
      >
        {/* Dynamic Activity Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.5625rem",
              color: "var(--ink-3)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {hoveredBar !== null
              ? `${BARS_DATA[hoveredBar].name.toUpperCase()} · ${BARS_DATA[hoveredBar].val}% EDGE ACTIVITY`
              : "7-DAY ACTIVITY · PEAK 96%"}
          </span>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.5625rem",
              fontWeight: 700,
              color: hoveredBar !== null ? BARS_DATA[hoveredBar].col : "var(--live)",
              transition: "color 0.2s ease",
            }}
          >
            {hoveredBar !== null ? `${BARS_DATA[hoveredBar].val}% ACTIVE` : "HEALTHY"}
          </span>
        </div>

        {/* The Animated Colored Bars */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "0.45rem",
            height: "46px",
            paddingTop: "4px",
          }}
          aria-hidden="true"
        >
          {BARS_DATA.map((item, idx) => {
            const isHovered = hoveredBar === idx;
            return (
              <motion.div
                key={idx}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.85,
                  delay: 0.15 + idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scaleY: 1.14,
                  transition: { duration: 0.18 },
                }}
                onMouseEnter={() => setHoveredBar(idx)}
                onMouseLeave={() => setHoveredBar(null)}
                title={`${item.name}: ${item.val}% Edge Activity`}
                style={{
                  flex: "1 1 0%",
                  height: `${item.val}%`,
                  transformOrigin: "center bottom",
                  borderRadius: "4px 4px 1px 1px",
                  background: item.grad,
                  cursor: "pointer",
                  position: "relative",
                  boxShadow: isHovered
                    ? `0 0 14px ${item.col}99, 0 2px 6px ${item.col}44`
                    : `0 2px 6px ${item.col}25`,
                  transition: "box-shadow 0.25s ease, filter 0.25s ease",
                  filter: hoveredBar !== null && !isHovered ? "opacity(0.55)" : "none",
                }}
              >
                {/* Luminous Top Cap Bead */}
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80%",
                    height: "2.5px",
                    borderRadius: "999px",
                    backgroundColor: "#ffffff",
                    opacity: isHovered ? 1 : 0.75,
                    boxShadow: `0 0 6px ${item.col}`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Day Labels below bars */}
        <div
          style={{
            display: "flex",
            gap: "0.45rem",
            justifyContent: "space-between",
          }}
        >
          {BARS_DATA.map((item, idx) => {
            const isHovered = hoveredBar === idx;
            return (
              <span
                key={idx}
                style={{
                  flex: "1 1 0%",
                  textAlign: "center",
                  fontFamily: "var(--mono)",
                  fontSize: "0.5625rem",
                  color: isHovered ? item.col : "var(--ink-3)",
                  fontWeight: isHovered ? 700 : 500,
                  transition: "color 0.2s ease, font-weight 0.2s ease",
                }}
              >
                {item.day}
              </span>
            );
          })}
        </div>
      </div>

      {/* ── EVENT STREAM CONSOLE ── */}
      <div
        style={{
          minHeight: "54px",
          padding: "0.75rem 0.85rem",
          backgroundColor: "var(--night)",
          color: "#F6F7FC",
          borderRadius: "10px",
          fontFamily: "var(--mono)",
          fontSize: "0.6875rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(246, 247, 252, 0.5)",
            fontSize: "0.5625rem",
            marginBottom: "0.25rem",
            letterSpacing: "0.08em",
          }}
        >
          <span>EVENT_STREAM</span>
          <span style={{ color: "var(--live)" }}>{currentStream.status}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={streamIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25, ease: ease.expo }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: currentStream.col, fontWeight: 700 }}>
              [{currentStream.tag}]
            </span>
            <span
              style={{
                color: "rgba(255, 255, 255, 0.92)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {currentStream.msg}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
