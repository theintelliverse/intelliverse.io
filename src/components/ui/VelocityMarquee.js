"use client";

import { useEffect, useRef } from "react";
import {
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useAnimationFrame,
  useMotionValue,
  motion,
} from "framer-motion";

/**
 * Dual-strip velocity marquee.
 * Strip 1 moves left, Strip 2 moves right.
 * Speed reacts to scroll velocity with spring physics.
 */
export default function VelocityMarquee({
  items1 = [
    "Software Engineering",
    "Web Applications",
    "Mobile Apps",
    "IT Infrastructure",
    "DevOps",
    "Cloud",
    "AI Solutions",
  ],
  items2 = [
    "Next.js",
    "React",
    "Node.js",
    "AWS",
    "GCP",
    "Figma",
    "TypeScript",
    "Python",
  ],
}) {
  return (
    <div className="marquee-section overflow-hidden">
      <MarqueeStrip items={items1} baseVelocity={-1.8} />
      <div style={{ marginTop: "0.625rem" }}>
        <MarqueeStrip items={items2} baseVelocity={1.8} dimmed />
      </div>
    </div>
  );
}

function MarqueeStrip({ items, baseVelocity, dimmed = false }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewX = useTransform(smoothVelocity, [-3000, 0, 3000], [baseVelocity > 0 ? 6 : -6, 0, baseVelocity > 0 ? -6 : 6]);
  const skewSpring = useSpring(skewX, { stiffness: 300, damping: 30 });
  const baseX = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    let move = baseVelocity * (delta / 1000) * 24;
    const v = smoothVelocity.get();
    if (Math.abs(v) > 10) move += (v / 800) * move;
    baseX.set(baseX.get() + move);
  });

  const x = useTransform(baseX, (v) => `${v % 50}%`);
  const allItems = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap flex select-none pointer-events-none">
      <motion.div style={{ x, skewX: skewSpring }} className="marquee-inner">
        {allItems.map((item, i) => (
          <span key={i} className={`marquee-item ${dimmed ? "opacity-50" : ""}`}>
            <span className="marquee-diamond" aria-hidden="true" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
