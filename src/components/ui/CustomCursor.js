"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: amber dot + ring + contextual label.
 * Falls back to system cursor on touch/mobile.
 */
export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    // Only run on pointer devices
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const label = labelRef.current;

    if (!dot || !ring || !label) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);

      dot.style.left  = mx + "px";
      dot.style.top   = my + "px";
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      if (label) {
        label.style.left = mx + "px";
        label.style.top  = my + "px";
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });

    // Contextual labels — data-cursor-label attribute on elements
    const onEnter = (e) => {
      if (!e.target || typeof e.target.closest !== "function") return;
      const el = e.target.closest("[data-cursor]");
      if (!el) return;

      const state = el.dataset.cursor;   // 'hover' | 'drag' | 'view' | 'open' | 'play'
      const lbl   = el.dataset.cursorLabel;

      document.body.classList.remove("cursor-hover", "cursor-drag");
      if (state === "drag")  document.body.classList.add("cursor-drag");
      else                    document.body.classList.add("cursor-hover");

      if (lbl && label) {
        label.textContent = lbl;
        label.classList.add("visible");
      }
    };

    const onLeave = (e) => {
      if (!e.target || typeof e.target.closest !== "function") return;
      const el = e.target.closest("[data-cursor]");
      if (!el) return;
      document.body.classList.remove("cursor-hover", "cursor-drag");
      if (label) {
        label.textContent = "";
        label.classList.remove("visible");
      }
    };

    document.addEventListener("mouseenter", onEnter, true);
    document.addEventListener("mouseleave", onLeave, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter, true);
      document.removeEventListener("mouseleave", onLeave, true);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}   className="cursor-dot"   aria-hidden="true" />
      <div ref={ringRef}  className="cursor-ring"  aria-hidden="true" />
      <div ref={labelRef} className="cursor-label" aria-hidden="true" />
    </>
  );
}
