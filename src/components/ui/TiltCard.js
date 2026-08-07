"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

/**
 * Awwwards-grade 3D Tilt Card Wrapper
 * Calculates cursor vectors and applies 3D perspective rotation using Framer Motion springs.
 */
export default function TiltCard({ children, className = "", maxTilt = 10, onMouseEnter, onClick }) {
  const cardRef = useRef(null);

  // Motion values for normalized cursor positions (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Map mouse delta to 3D rotation angles
  const targetRotateX = useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const targetRotateY = useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Spring physics engine for smooth inertia and tilt release
  const rotateX = useSpring(targetRotateX, { stiffness: 280, damping: 22 });
  const rotateY = useSpring(targetRotateY, { stiffness: 280, damping: 22 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative mouse coordinates inside card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update CSS variables for radial mouse spotlight glow
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);

    // Set normalized motion values
    mouseX.set(x / width - 0.5);
    mouseY.set(y / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className={`interactive-glow-card relative rounded-2xl ${className}`}
    >
      {/* 3D Depth Layer wrapper allowing elements to pop 24px off the card plane */}
      <div style={{ transform: "translateZ(24px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
