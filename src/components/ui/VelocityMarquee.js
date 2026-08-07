"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useAnimationFrame,
  useMotionValue
} from "framer-motion";

/**
 * Velocity-Skewed Infinite Running Marquee
 * Dynamically skews text on high scroll velocity and uses spring physics to smoothly return to 0deg when stopped.
 */
export default function VelocityMarquee({
  textItems = [
    "// Innovation",
    "// Create",
    "// Grow",
    "// Software Engineering",
    "// Web Applications",
    "// IT Infrastructure",
    "// DevOps Pipelines",
    "// Cloud Architectures"
  ],
  baseVelocity = -2,
  className = ""
}) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth scroll velocity value
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Map scroll velocity (-3000 to 3000) to skewX (-12deg to 12deg)
  const skewXRaw = useTransform(smoothVelocity, [-3000, 0, 3000], [-12, 0, 12]);
  const skewX = useSpring(skewXRaw, { stiffness: 300, damping: 30 });

  const baseX = useMotionValue(0);

  // Animation frame loop for continuous marquee wrap (-20% to 0%)
  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000) * 20;

    // Accelerate marquee movement slightly with scroll speed
    const velocityFactor = smoothVelocity.get();
    if (velocityFactor !== 0) {
      moveBy += (velocityFactor / 1000) * moveBy;
    }

    baseX.set(baseX.get() + moveBy);
  });

  // Wrap percentage logic
  const x = useTransform(baseX, (v) => `${(v % 50)}%`);

  return (
    <div className={`py-6 border-y border-white/5 bg-[#080415]/30 overflow-hidden whitespace-nowrap flex select-none pointer-events-none relative z-10 ${className}`}>
      <motion.div
        style={{ x, skewX }}
        className="flex gap-12 text-[10px] sm:text-xs font-mono font-extrabold uppercase tracking-widest text-indigo-400/30 will-change-transform"
      >
        {/* Render duplicate arrays for seamless looping */}
        {[...textItems, ...textItems, ...textItems, ...textItems].map((item, idx) => (
          <span key={idx} className="inline-block shrink-0">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
