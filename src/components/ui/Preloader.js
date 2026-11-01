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
  const [visible, setVisible]   = useState(false);
  const [exiting, setExiting]   = useState(false);
  const [counter, setCounter]   = useState(0);
  const [wordmark, setWordmark] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage?.getItem("iv-visited")) {
        return;
      }
    } catch {
      return;
    }

    setVisible(true);

    const t0 = setTimeout(() => setWordmark(true), 40);

    const start = Date.now();
    const duration = 400;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setCounter(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 20);

    const safety = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setVisible(false);
        try {
          if (typeof window !== "undefined") window.sessionStorage?.setItem("iv-visited", "1");
        } catch {}
      }, 400);
    }, 550);

    return () => {
      clearTimeout(t0);
      clearInterval(interval);
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
