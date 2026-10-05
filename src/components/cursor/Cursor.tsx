"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useCursorContext } from "./CursorProvider";

function subscribeSupported(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(hover: hover) and (pointer: fine)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSupportedSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getSupportedServerSnapshot() {
  return false;
}

/**
 * Overlapping Minds Custom Cursor
 * - Main dot: 10px Solid Blue (#3D7BF7)
 * - Trailing circles: 28px Orange (#FDB347), 20px Coral (#FF6B7B)
 * - Physics: gsap.quickTo with velocity squash/stretch & idle breathing
 * - Theme-aware mix-blend-mode: multiply on cream, screen on night
 */
export default function Cursor() {
  const {
    variant,
    label,
    theme,
    isEnabled,
    reducedMotion,
    setVariant,
    resetCursor,
    setTheme,
  } = useCursorContext();

  const supported = useSyncExternalStore(
    subscribeSupported,
    getSupportedSnapshot,
    getSupportedServerSnapshot
  );
  const [idleHintPos, setIdleHintPos] = useState<{ x: number; y: number } | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const coralRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const idleHintRef = useRef<HTMLDivElement>(null);

  // Position and velocity trackers
  const posRef = useRef({ x: -100, y: -100, lastX: -100, lastY: -100, vx: 0, vy: 0 });
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeMagneticRef = useRef<{ el: HTMLElement; strength: number } | null>(null);

  // QuickTo animators
  const quickDotX = useRef<gsap.QuickToFunc | null>(null);
  const quickDotY = useRef<gsap.QuickToFunc | null>(null);
  const quickOrangeX = useRef<gsap.QuickToFunc | null>(null);
  const quickOrangeY = useRef<gsap.QuickToFunc | null>(null);
  const quickCoralX = useRef<gsap.QuickToFunc | null>(null);
  const quickCoralY = useRef<gsap.QuickToFunc | null>(null);

  // 2. Section Theme Detection via IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined" || !supported) return;

    const sections = document.querySelectorAll("[data-theme]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionTheme = entry.target.getAttribute("data-theme");
            if (sectionTheme === "night" || sectionTheme === "cream") {
              setTheme(sectionTheme);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [supported, setTheme]);

  // 3. Setup GSAP QuickTo handlers and mouse tracking
  useEffect(() => {
    if (!supported || !isEnabled) return;

    const dot = dotRef.current;
    const orange = orangeRef.current;
    const coral = coralRef.current;
    const root = rootRef.current;

    if (!dot || !orange || !coral || !root) return;

    // Set initial centered coordinates using GSAP
    gsap.set([dot, orange, coral], {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "center center",
      force3D: true,
    });

    // Create fast quickTo tweens
    quickDotX.current = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    quickDotY.current = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    quickOrangeX.current = gsap.quickTo(orange, "x", { duration: 0.25, ease: "power3.out" });
    quickOrangeY.current = gsap.quickTo(orange, "y", { duration: 0.25, ease: "power3.out" });

    quickCoralX.current = gsap.quickTo(coral, "x", { duration: 0.4, ease: "power3.out" });
    quickCoralY.current = gsap.quickTo(coral, "y", { duration: 0.4, ease: "power3.out" });

    const handlePointerMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const prev = posRef.current;

      // Velocity calculation
      const dx = x - prev.x;
      const dy = y - prev.y;
      prev.vx = dx;
      prev.vy = dy;
      prev.x = x;
      prev.y = y;

      // Move targets
      quickDotX.current?.(x);
      quickDotY.current?.(y);
      quickOrangeX.current?.(x);
      quickOrangeY.current?.(y);
      quickCoralX.current?.(x);
      quickCoralY.current?.(y);

      // Velocity squash & stretch (unless reduced motion or in special variant)
      if (!reducedMotion && variant === "default") {
        const speed = Math.hypot(dx, dy);
        if (speed > 2) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const stretch = Math.min(1 + speed * 0.008, 1.25);
          const squash = Math.max(1 - speed * 0.004, 0.85);
          gsap.to(dot, {
            scaleX: stretch,
            scaleY: squash,
            rotation: angle,
            duration: 0.15,
            overwrite: "auto",
          });
        } else {
          gsap.to(dot, { scaleX: 1, scaleY: 1, rotation: 0, duration: 0.2, overwrite: "auto" });
        }
      }

      // Handle magnetic element pull if active
      if (activeMagneticRef.current) {
        const { el, strength } = activeMagneticRef.current;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (x - centerX) * strength;
        const deltaY = (y - centerY) * strength;
        // Limit max pull to 8px
        const dist = Math.hypot(deltaX, deltaY);
        const maxDist = 8;
        const factor = dist > maxDist ? maxDist / dist : 1;
        gsap.to(el, {
          x: deltaX * factor,
          y: deltaY * factor,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Reset idle timer (3s)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      setIdleHintPos(null);

      idleTimerRef.current = setTimeout(() => {
        // Idle animation: gentle breathe
        if (!reducedMotion) {
          gsap.to([orange, coral], {
            scale: 1.1,
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        // Homepage "psst, scroll" hint once per session
        try {
          const isHome = window.location.pathname === "/" || window.location.pathname === "";
          const hasShown = sessionStorage.getItem("iv-idle-hint-shown");
          if (isHome && !hasShown) {
            setIdleHintPos({ x: posRef.current.x + 18, y: posRef.current.y + 24 });
            sessionStorage.setItem("iv-idle-hint-shown", "1");
          }
        } catch {
          // Ignore
        }
      }, 3000);
    };

    // Fade out when cursor leaves window, fade in on enter
    const handleMouseLeave = () => {
      gsap.to(root, { opacity: 0, duration: 0.25 });
    };

    const handleMouseEnter = () => {
      gsap.to(root, { opacity: 1, duration: 0.25 });
    };

    // Press & Ripple handlers
    const handleMouseDown = (e: MouseEvent) => {
      // Scale down dot
      gsap.to(dot, { scale: 0.8, duration: 0.15 });

      // Spawn ripple ring
      if (!reducedMotion && rippleRef.current) {
        const ripple = rippleRef.current;
        gsap.killTweensOf(ripple);
        gsap.set(ripple, {
          x: e.clientX,
          y: e.clientY,
          scale: 0.2,
          opacity: 0.85,
        });
        gsap.to(ripple, {
          scale: 1.6,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    const handleMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "back.out(2)" });
    };

    // Document visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        gsap.to(root, { opacity: 0, duration: 0.1 });
      } else {
        gsap.to(root, { opacity: 1, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [supported, isEnabled, reducedMotion, variant]);

  // 4. Document-level event delegation for declarative data attributes
  useEffect(() => {
    if (!supported || !isEnabled) return;

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;

      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl) {
        const dataVariant = (cursorEl.getAttribute("data-cursor") || "default") as any;
        const dataLabel = cursorEl.getAttribute("data-cursor-label") || undefined;
        const dataIcon = cursorEl.getAttribute("data-cursor-icon") || undefined;

        setVariant(dataVariant, { label: dataLabel, icon: dataIcon });

        // Magnetic support
        if (cursorEl.hasAttribute("data-cursor-magnetic")) {
          const strengthAttr = cursorEl.getAttribute("data-magnet-strength");
          const strength = strengthAttr ? parseFloat(strengthAttr) : 0.3;
          activeMagneticRef.current = { el: cursorEl, strength };
        }
      } else {
        // Check if cursor was on magnetic element and left
        if (activeMagneticRef.current) {
          gsap.to(activeMagneticRef.current.el, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto",
          });
          activeMagneticRef.current = null;
        }
      }
    };

    const handlePointerOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;

      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl) {
        resetCursor();
        if (activeMagneticRef.current) {
          gsap.to(activeMagneticRef.current.el, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto",
          });
          activeMagneticRef.current = null;
        }
      }
    };

    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });

    return () => {
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, [supported, isEnabled, setVariant, resetCursor]);

  // 5. Variant GSAP Timeline transitions
  useEffect(() => {
    if (!supported || !isEnabled) return;

    const dot = dotRef.current;
    const orange = orangeRef.current;
    const coral = coralRef.current;
    const labelEl = labelRef.current;

    if (!dot || !orange || !coral) return;

    const tl = gsap.timeline({ defaults: { duration: 0.35, ease: "power3.out" } });

    switch (variant) {
      case "link":
        // Dot expands to 56px blue-deep, trailing circles tuck behind
        tl.to(dot, {
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "var(--cursor-blue-deep)",
          opacity: 0.9,
          scale: 1,
        })
          .to(orange, { scale: 0.3, opacity: 0 }, 0)
          .to(coral, { scale: 0.3, opacity: 0 }, 0);
        break;

      case "view":
        // 96px Blue circle with cream handwritten label "View", slight rotation -6deg
        tl.to(dot, {
          width: 96,
          height: 96,
          borderRadius: "50%",
          backgroundColor: "var(--cursor-blue)",
          opacity: 0.95,
          rotation: -6,
          scale: 1,
        })
          .to(orange, { scale: 0, opacity: 0 }, 0)
          .to(coral, { scale: 0, opacity: 0 }, 0);
        break;

      case "drag":
        // 96px Orange circle with label "Drag" and left/right arrows
        tl.to(dot, {
          width: 96,
          height: 96,
          borderRadius: "50%",
          backgroundColor: "var(--cursor-orange)",
          opacity: 0.95,
          scale: 1,
        })
          .to(orange, { scale: 0, opacity: 0 }, 0)
          .to(coral, { scale: 0, opacity: 0 }, 0);
        break;

      case "pencil":
        // Dot becomes hidden/transparent; pencil icon shows
        tl.to(dot, {
          width: 32,
          height: 32,
          borderRadius: "0%",
          backgroundColor: "transparent",
          opacity: 1,
          scale: 1,
        })
          .to(orange, { scale: 0, opacity: 0 }, 0)
          .to(coral, { scale: 0.5, opacity: 0.6 }, 0); // tiny coral dot trail
        break;

      case "bulb":
        // 56px circle with bulb SVG icon in cream on blue-deep
        tl.to(dot, {
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "var(--cursor-blue-deep)",
          opacity: 0.95,
          scale: 1,
        })
          .to(orange, { scale: 0.5, opacity: 0.4 }, 0)
          .to(coral, { scale: 0, opacity: 0 }, 0);
        break;

      case "text":
        // 2px x 24px vertical bar
        tl.to(dot, {
          width: 2,
          height: 24,
          borderRadius: "1px",
          backgroundColor: theme === "night" ? "var(--cursor-cream)" : "var(--ink)",
          opacity: 0.9,
          scale: 1,
        })
          .to(orange, { scale: 0, opacity: 0 }, 0)
          .to(coral, { scale: 0, opacity: 0 }, 0);
        break;

      case "hide":
        // Fade out custom cursor
        tl.to([dot, orange, coral], { opacity: 0, scale: 0 });
        break;

      case "loupe":
        // Thin 2px blue-deep ring matching loupe diameter (~96px), dot hidden
        tl.to(dot, {
          width: 96,
          height: 96,
          borderRadius: "50%",
          backgroundColor: "transparent",
          border: "2px solid var(--cursor-blue-deep)",
          opacity: 1,
          scale: 1,
        })
          .to(orange, { scale: 0, opacity: 0 }, 0)
          .to(coral, { scale: 0, opacity: 0 }, 0);
        break;

      case "default":
      default:
        // Default: 10px blue dot, 28px orange circle, 20px coral circle
        tl.to(dot, {
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: theme === "night" ? "var(--cursor-cream)" : "var(--cursor-blue)",
          border: "none",
          rotation: 0,
          opacity: 1,
          scale: 1,
        })
          .to(orange, { scale: 1, opacity: 0.75, width: 28, height: 28 }, 0)
          .to(coral, { scale: 1, opacity: 0.65, width: 20, height: 20 }, 0);
        break;
    }
  }, [variant, theme, supported, isEnabled]);

  // Don't render anything on touch devices or if disabled by user
  if (!supported || !isEnabled) return null;

  const isNight = theme === "night";

  return (
    <div
      ref={rootRef}
      className={`iv-cursor-root ${isNight ? "iv-cursor-theme-night" : "iv-cursor-theme-cream"}`}
      aria-hidden="true"
    >
      {/* 1. Trailing Circle 2: Coral (20px) — follows with slowest spring */}
      <div
        ref={coralRef}
        className="iv-cursor-circle-coral iv-cursor-blend"
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "var(--cursor-coral)",
          opacity: 0.65,
        }}
      />

      {/* 2. Trailing Circle 1: Orange (28px) — medium lag */}
      <div
        ref={orangeRef}
        className="iv-cursor-circle-orange iv-cursor-blend"
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          backgroundColor: "var(--cursor-orange)",
          opacity: 0.75,
        }}
      />

      {/* 3. Main Pointer Dot / Interactive Capsule */}
      <div
        ref={dotRef}
        className="iv-cursor-dot iv-cursor-blend"
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: isNight ? "var(--cursor-cream)" : "var(--cursor-blue)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
        }}
      >
        {/* Variant: View */}
        {variant === "view" && (
          <span
            style={{
              fontFamily: "var(--font-handwritten)",
              fontSize: "1.25rem",
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              transform: "rotate(-4deg)",
              userSelect: "none",
            }}
          >
            {label || "View"}
          </span>
        )}

        {/* Variant: Drag */}
        {variant === "drag" && (
          <span
            style={{
              fontFamily: "var(--font-handwritten)",
              fontSize: "1.1rem",
              color: "#0E1B3D",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "4px",
              userSelect: "none",
            }}
          >
            <span>←</span>
            <span>{label || "Drag"}</span>
            <span>→</span>
          </span>
        )}

        {/* Variant: Pencil */}
        {variant === "pencil" && (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isNight ? "#FFFFFF" : "#0E1B3D"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: "translate(4px, -12px) rotate(-35deg)",
              transformOrigin: "bottom left",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
            }}
          >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        )}

        {/* Variant: Bulb */}
        {variant === "bulb" && (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
          </svg>
        )}
      </div>

      {/* 4. One-Shot Ripple Ring Container */}
      <div
        ref={rippleRef}
        className="iv-cursor-ripple"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: `2px solid ${isNight ? "var(--cursor-orange)" : "var(--cursor-blue)"}`,
          opacity: 0,
          pointerEvents: "none",
          transform: "translate3d(-50%, -50%, 0)",
        }}
      />

      {/* 5. Contextual Label Bubble (if label provided for link or default) */}
      {label && variant !== "view" && variant !== "drag" && (
        <div
          ref={labelRef}
          className="iv-cursor-label"
          style={{
            transform: "translate3d(18px, -24px, 0)",
            fontFamily: "var(--font-handwritten)",
            fontSize: "1rem",
            color: isNight ? "var(--cursor-cream)" : "var(--ink)",
            backgroundColor: isNight ? "rgba(11, 21, 48, 0.85)" : "rgba(255, 255, 255, 0.9)",
            border: "1px solid var(--hairline)",
            padding: "2px 8px",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      )}

      {/* 6. Idle "psst, scroll" hint (once per session on homepage) */}
      {idleHintPos && (
        <div
          ref={idleHintRef}
          style={{
            position: "absolute",
            top: idleHintPos.y,
            left: idleHintPos.x,
            fontFamily: "var(--font-handwritten)",
            fontSize: "1.125rem",
            color: isNight ? "var(--orange)" : "var(--blue-deep)",
            transform: "rotate(-3deg)",
            letterSpacing: "0.02em",
            animation: "iv-cursor-ripple-fade 0.4s ease-out forwards",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          psst, scroll ✦
        </div>
      )}
    </div>
  );
}
