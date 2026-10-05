"use client";

import Link from "next/link";
import { useCursorContext } from "@/components/cursor/CursorProvider";

export default function Footer({ data = null } = {}) {
  let isEnabled = true;
  let toggleCursor = () => {};

  try {
    const cursor = useCursorContext();
    isEnabled = cursor.isEnabled;
    toggleCursor = cursor.toggleCursor;
  } catch {
    // Outside CursorProvider safe fallback
  }

  const scrollTo = (e, id) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const backToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      data-theme="night"
      style={{
        backgroundColor: "var(--night)", // #0B1530
        color: "var(--cream)",
        borderTop: "1px solid rgba(228, 218, 195, 0.12)",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Giant wordmark in blue at ~25% opacity (still visible) */}
      <div
        style={{
          overflow: "hidden",
          paddingTop: "3rem",
          paddingBottom: "1rem",
        }}
        aria-hidden="true"
      >
        <div className="footer-wordmark container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>
          The Intelliverse
        </div>
      </div>

      {/* Hairline Divider */}
      <div style={{ borderTop: "1px solid rgba(228, 218, 195, 0.1)" }} />

      {/* Main footer grid */}
      <div
        className="container-site footer-nav-grid"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          paddingTop: "3.5rem",
          paddingBottom: "3.5rem",
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/the%20intelliverse%20logo.jpg"
              alt="The Intelliverse"
              width={32}
              height={32}
              style={{ borderRadius: "4px", border: "1px solid rgba(228, 218, 195, 0.15)" }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--cream)",
                fontWeight: 600,
              }}
            >
              The Intelliverse
            </span>
          </div>
          <p style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: "rgba(248, 242, 228, 0.65)", maxWidth: "20rem" }}>
            Software development, web systems &amp; dedicated IT services built like a craft. Based in Ahmedabad, Gujarat, India.
          </p>
          {/* Status */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1.25rem" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#10b981",
                display: "inline-block",
                boxShadow: "0 0 6px #10b981",
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(248, 242, 228, 0.5)",
              }}
            >
              Ahmedabad Studio Operational · 2026
            </span>
          </div>
        </div>

        {/* Services Links */}
        <div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--orange)",
              marginBottom: "1.25rem",
              fontWeight: 700,
            }}
          >
            Services
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { label: "Web Architecture", href: "/services/web-development" },
              { label: "Custom SaaS Software", href: "/services/software-engineering" },
              { label: "Cloud & DevOps IT", href: "/services/it-architecture-support" },
              { label: "Applied AI Workflows", href: "/services/ai-data-robotics-iot" },
            ].map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.06em",
                    color: "rgba(248, 242, 228, 0.75)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248, 242, 228, 0.75)")}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Work & Locations */}
        <div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--orange)",
              marginBottom: "1.25rem",
              fontWeight: 700,
            }}
          >
            Work &amp; Location
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { label: "Appointory Case Study", href: "/work/appointory" },
              { label: "Vrix Jewellery Case Study", href: "/work/vrix" },
              { label: "Ahmedabad Studio", href: "/software-development-company-ahmedabad" },
              { label: "Project Estimator", href: "/#estimator" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.06em",
                    color: "rgba(248, 242, 228, 0.75)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248, 242, 228, 0.75)")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company & Resources */}
        <div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--orange)",
              marginBottom: "1.25rem",
              fontWeight: 700,
            }}
          >
            Company
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { label: "About Studio", href: "/about" },
              { label: "Engineering Blog", href: "/blog" },
              { label: "Knowledge FAQ", href: "/faq" },
              { label: "Contact & Scoping", href: "/#contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.06em",
                    color: "rgba(248, 242, 228, 0.75)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248, 242, 228, 0.75)")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Standards */}
        <div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--orange)",
              marginBottom: "1.25rem",
              fontWeight: 700,
            }}
          >
            Standards
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Link
                href="/llms.txt"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "var(--orange)",
                  textDecoration: "none",
                }}
              >
                /llms.txt (AI Spec) ↗
              </Link>
            </li>
            <li>
              <Link
                href="/styleguide"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "var(--blue)",
                  textDecoration: "none",
                }}
              >
                Styleguide &amp; Tokens ↗
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "rgba(248, 242, 228, 0.75)",
                  textDecoration: "none",
                }}
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "rgba(248, 242, 228, 0.75)",
                  textDecoration: "none",
                }}
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect / Socials */}
        <div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--orange)",
              marginBottom: "1.25rem",
              fontWeight: 700,
            }}
          >
            Connect
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <a
                href={`mailto:${data?.email || "theintelliverse@gmail.com"}`}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "rgba(248, 242, 228, 0.75)",
                  textDecoration: "none",
                }}
              >
                Founder Email ↗
              </a>
            </li>
            <li>
              <a
                href={data?.linkedin || "https://www.linkedin.com/company/the-intelliverse/"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "rgba(248, 242, 228, 0.75)",
                  textDecoration: "none",
                }}
              >
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a
                href={data?.instagram || "https://www.instagram.com/the_intelliverse/"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "rgba(248, 242, 228, 0.75)",
                  textDecoration: "none",
                }}
              >
                Instagram ↗
              </a>
            </li>
            <li>
              <a
                href="https://github.com/theintelliverse"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "rgba(248, 242, 228, 0.75)",
                  textDecoration: "none",
                }}
              >
                GitHub ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Colophon Bar */}
      <div style={{ borderTop: "1px solid rgba(228, 218, 195, 0.1)" }}>
        <div
          className="container-site"
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            fontSize: "0.75rem",
            fontFamily: "'JetBrains Mono', monospace",
            color: "rgba(248, 242, 228, 0.5)",
          }}
        >
          <span>© 2026 The Intelliverse. All rights reserved.</span>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            <button
              onClick={toggleCursor}
              data-cursor="link"
              aria-label="Toggle custom cursor system"
              style={{
                background: "transparent",
                border: "1px solid rgba(228, 218, 195, 0.2)",
                borderRadius: "999px",
                padding: "0.25rem 0.75rem",
                color: isEnabled ? "var(--orange)" : "rgba(248, 242, 228, 0.4)",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "all 0.2s ease",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: isEnabled ? "var(--orange)" : "rgba(248, 242, 228, 0.25)",
                }}
              />
              Custom cursor: {isEnabled ? "on" : "off"}
            </button>
            <button
              onClick={backToTop}
              data-cursor="link"
              style={{
                background: "none",
                border: "none",
                color: "var(--cream)",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
