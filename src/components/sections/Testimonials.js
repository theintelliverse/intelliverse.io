"use client";

import { useRef } from "react";

const FALLBACK_TESTIMONIALS = [
  { text: "The Intelliverse delivered an outstanding product on time and on budget. Highly recommended!", author: "Client A" },
  { text: "A fantastic team to work with. Professional, creative, and highly skilled.", author: "Client B" },
  { text: "Our new website has seen a significant increase in traffic thanks to their expertise.", author: "Client C" },
  { text: "They transformed our vision into a reality. Exceptional work!", author: "Client D" },
  { text: "The Intelliverse delivered an outstanding product on time and on budget. Highly recommended!", author: "Client E" },
  { text: "A fantastic team to work with. Professional, creative, and highly skilled.", author: "Client F" },
  { text: "Our new website has seen a significant increase in traffic thanks to their expertise.", author: "Client G" }
];

export default function Testimonials({ data }) {
  const scrollRef = useRef(null);
  const testimonials = data && data.length > 0 ? data : FALLBACK_TESTIMONIALS;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section
      id="testimonials"
      data-theme="cream"
      style={{
        background: "var(--cream)",
        borderTop: "1px solid var(--hairline)",
        paddingTop: "clamp(4.5rem, 8vh, 6.5rem)",
        paddingBottom: "clamp(4.5rem, 8vh, 6.5rem)",
        position: "relative",
      }}
    >
      <div className="container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Header with Title and Scroll Controls */}
        <div
          style={{
            marginBottom: "3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--orange)",
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              What clients say
            </span>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              Client Endorsements.
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={scrollLeft}
              aria-label="Scroll left"
              data-cursor="link"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid var(--hairline)",
                backgroundColor: "var(--surface)",
                color: "var(--ink)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              }}
            >
              ←
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll right"
              data-cursor="link"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid var(--hairline)",
                backgroundColor: "var(--surface)",
                color: "var(--ink)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              }}
            >
              →
            </button>
          </div>
        </div>

        {/* Scrollable Testimonials Gallery */}
        <div
          ref={scrollRef}
          data-cursor="drag"
          data-cursor-label="Drag"
          style={{
            display: "flex",
            gap: "1.5rem",
            overflowX: "auto",
            paddingBottom: "1.5rem",
            paddingTop: "0.25rem",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
          role="list"
          aria-label="Client testimonials"
        >
          {testimonials.map((testimonial, i) => {
            const indexStr = i < 9 ? `0${i + 1}` : `${i + 1}`;
            const text = testimonial.text || testimonial.quote || "";

            return (
              <div
                key={i}
                role="listitem"
                style={{
                  flexShrink: 0,
                  width: "clamp(300px, 78vw, 420px)",
                  scrollSnapAlign: "start",
                  border: "1px solid var(--hairline)",
                  borderRadius: "16px",
                  padding: "clamp(1.75rem, 3vw, 2.25rem)",
                  background: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 20px rgba(14, 27, 61, 0.05)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div>
                  {/* Top Bar: Index + 5 Stars */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "var(--orange)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {indexStr}
                    </span>

                    {/* 5 Stars */}
                    <div style={{ color: "var(--orange)", fontSize: "0.875rem", letterSpacing: "2px" }} aria-label="5 stars">
                      ★★★★★
                    </div>
                  </div>

                  {/* Quote */}
                  <p
                    className="testimonial-quote"
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
                      letterSpacing: "-0.015em",
                      lineHeight: 1.45,
                      color: "var(--ink)",
                      fontStyle: "italic",
                      margin: 0,
                      marginBottom: "1.75rem",
                    }}
                  >
                    &ldquo;{text}&rdquo;
                  </p>
                </div>

                {/* Attribution & Status */}
                <div
                  style={{
                    borderTop: "1px solid var(--hairline)",
                    paddingTop: "1.25rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.75rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--ink)",
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    — {testimonial.author}
                  </p>

                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.625rem",
                      letterSpacing: "0.05em",
                      color: "#10b981",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#10b981",
                        display: "inline-block",
                      }}
                    />
                    Verified Client
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
