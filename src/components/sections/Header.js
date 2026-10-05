"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Magnetic from "@/components/ui/Magnetic";

const NAV_LINKS = [
  { label: "Services",  href: "/#services" },
  { label: "Work",      href: "/#projects" },
  { label: "Process",   href: "/#process" },
  { label: "Estimator", href: "/#estimator" },
  { label: "About",     href: "/#about" },
  { label: "Contact",   href: "/#contact" },
];

export default function Header() {
  const router = useRouter();
  const [scrolled,  setScrolled]  = useState(false);
  const [hidden,    setHidden]    = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 120 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <>
      {/* ── Full-screen nav overlay (mobile) ──────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="nav-overlay"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="nav-overlay"
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-text-muted hover:text-text-light transition-colors"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
              aria-label="Close navigation"
            >
              Close ✕
            </button>

            {/* Links */}
            <nav className="flex flex-col mt-auto">
              {NAV_LINKS.map((link, i) => {
                const id = link.href.replace("/#", "");
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => scrollTo(e, id)}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.08 * i + 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="nav-overlay-link"
                    data-cursor="link"
                  >
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5625rem", color: "var(--blue)", letterSpacing: "0.2em", marginRight: "1rem", verticalAlign: "middle" }}>
                      0{i + 1}
                    </span>
                    {link.label}
                  </motion.a>
                );
              })}
              <motion.a
                href="/contact"
                onClick={(e) => scrollTo(e, "contact")}
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.08 * NAV_LINKS.length + 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="nav-overlay-link"
                style={{ color: "var(--blue-deep)" }}
                data-cursor="link"
                data-cursor-magnetic
              >
                Let&apos;s Talk →
              </motion.a>
            </nav>

            {/* Footer of overlay */}
            <div style={{ position: "absolute", bottom: "2rem", left: "clamp(1.5rem,8vw,6rem)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5625rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,243,240,0.2)" }}>
              Ahmedabad, India · theintelliverse@gmail.com
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header bar ──────────────────────────────────────────────── */}
      <motion.header
        className={`site-header${scrolled ? " scrolled" : ""}${hidden ? " hidden" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          style={{ textDecoration: "none" }}
          aria-label="The Intelliverse — home"
          data-cursor="link"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/the-intelliverse-logo.jpg"
            alt="The Intelliverse"
            width={32}
            height={32}
            style={{ borderRadius: "4px", border: "1px solid rgba(255,255,255,0.1)" }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.625rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(244,243,240,0.7)",
              display: "none",
            }}
            className="sm:inline"
          >
            The Intelliverse
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("/#", "");
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => scrollTo(e, id)}
                className="nav-link"
                data-cursor="link"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Magnetic strength={0.4}>
            <Link
              href="/#contact"
              onClick={(e) => scrollTo(e, "contact")}
              className="btn-primary hidden sm:inline-flex"
              data-cursor="link"
              data-cursor-magnetic
            >
              <span>Let&apos;s Talk</span>
            </Link>
          </Magnetic>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            data-cursor="link"
          >
            <span style={{ display: "block", width: "22px", height: "1px", background: "var(--ink)" }} />
            <span style={{ display: "block", width: "14px", height: "1px", background: "var(--blue)" }} />
          </button>
        </div>
      </motion.header>
    </>
  );
}
