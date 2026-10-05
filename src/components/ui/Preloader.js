"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Preloader
 * - Wordmark draw-in via clip-path
 * - 000 → 100 counter
 * - Split-panel exit animation
 * - Skipped on repeat visits (sessionStorage)
 */
export default function Preloader() {
  const [visible, setVisible]   = useState(true);
  const [exiting, setExiting]   = useState(false);
  const [counter, setCounter]   = useState(0);
  const [wordmark, setWordmark] = useState(false);

  useEffect(() => {
    let visitedFrame = null;
    try {
      if (typeof window !== "undefined" && window.sessionStorage?.getItem("iv-visited")) {
        visitedFrame = requestAnimationFrame(() => setVisible(false));
        return () => {
          if (visitedFrame) cancelAnimationFrame(visitedFrame);
        };
      }
    } catch {
      // Ignore storage restrictions
    }

    // Phase 1: reveal wordmark
    const t0 = setTimeout(() => setWordmark(true), 60);

    // Safety fallback: guaranteed exit after 600ms
    const safety = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setVisible(false);
        try {
          if (typeof window !== "undefined") window.sessionStorage?.setItem("iv-visited", "1");
        } catch {}
      }, 300);
    }, 600);

    return () => {
      clearTimeout(t0);
      clearTimeout(safety);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="preloader"
      aria-label="Loading The Intelliverse"
      role="status"
      className={exiting ? "preloader-exit" : ""}
    >
      {/* Split panels for exit */}
      <div className="preloader-panel-top"  aria-hidden="true" />
      <div className="preloader-panel-bottom" aria-hidden="true" />

      {/* Content layer */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          opacity: exiting ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Wordmark */}
        <div
          className={`preloader-wordmark${wordmark ? " revealed" : ""}`}
          aria-hidden="true"
        >
          The Intelliverse
        </div>

        {/* Counter */}
        <div className="preloader-counter" aria-hidden="true">
          {String(counter).padStart(3, "0")}
        </div>

        {/* Mono caption */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.5625rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(244,243,240,0.25)",
          }}
        >
          Ahmedabad, India · Engineering your ideas
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="preloader-bar"
        aria-hidden="true"
        style={{ transform: `scaleX(${counter / 100})` }}
      />
    </div>
  );
}
