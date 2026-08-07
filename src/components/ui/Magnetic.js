"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Awwwards-grade Magnetic Button Wrapper
 * Uses Framer Motion useMotionValue & useSpring physics for 60 FPS GPU performance.
 */
export default function Magnetic({ children, className = "", onClick, onMouseEnter, strength = 0.35 }) {
  const ref = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // High-precision spring physics for fluid magnetic pull and elastic release
  const x = useSpring(rawX, { stiffness: 180, damping: 14, mass: 0.1 });
  const y = useSpring(rawY, { stiffness: 180, damping: 14, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Pull element towards cursor offset
    rawX.set((clientX - centerX) * strength);
    rawY.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={{ x, y }}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}
