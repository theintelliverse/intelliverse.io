"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Stats / Numbers section
 * Shows verified performance metrics:
 * - 2+ Projects shipped
 * - 100% Client satisfaction
 * - 15+ Happy clients
 */
export default function Stats({ data }) {
  if (!data) return null;

  const stats = [
    { value: Number(data.projects) || 2,     label: "Projects shipped",    suffix: "+" },
    { value: Number(data.satisfaction) || 100, label: "Client satisfaction", suffix: "%" },
    { value: Number(data.clients) || 15,      label: "Happy clients",       suffix: "+" },
  ];

  return (
    <section
      id="stats"
      data-theme="cream"
      className="section-gap"
      style={{
        background: "var(--cream)",
        borderTop: "1px solid var(--hairline)",
        position: "relative",
      }}
    >
      <div className="container-site">
        {/* Label */}
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="section-label">
            <span className="section-dot" />
            Numbers
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            border: "1px solid var(--hairline)",
            background: "var(--surface)",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.75rem, 4vw, 3rem)",
                borderRight: i < stats.length - 1 ? "1px solid var(--hairline)" : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.2rem" }}>
                <CountUp target={stat.value} />
                <span
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: "clamp(2.5rem, 6vw, 4.75rem)",
                    color: "var(--blue-deep)",
                    lineHeight: 1,
                    fontWeight: 400,
                  }}
                >
                  {stat.suffix}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginTop: "1.25rem",
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      const timer = setTimeout(() => setCount(target), 0);
      return () => clearTimeout(timer);
    }

    let started = false;
    let animId = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(1, elapsed / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) {
              animId = requestAnimationFrame(tick);
            } else {
              setCount(target);
            }
          };
          animId = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, [target]);

  return (
    <span ref={ref} className="stat-number" aria-live="polite">
      {count}
    </span>
  );
}
