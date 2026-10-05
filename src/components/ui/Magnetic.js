"use client";

import { useEffect, useRef } from "react";

/**
 * Magnetic button wrapper.
 * Wraps any child and applies a gentle magnetic pull on hover.
 * Strength: 0.35 = subtle, not jittery.
 */
export default function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    let raf;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
      el.style.transform  = "translate(0, 0)";
      setTimeout(() => { el.style.transition = ""; }, 500);
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
