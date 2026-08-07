"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";

/**
 * Cursor-Attached Floating Image Reveal List Component
 * Hovering over an item reveals a floating image preview that follows the mouse with spring velocity skew.
 */
export default function HoverImageReveal({ items = [] }) {
  const [activeImage, setActiveImage] = useState(null);
  const containerRef = useRef(null);

  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for floating image movement
  const springX = useSpring(mouseX, { stiffness: 350, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 25 });

  // Calculate mouse X velocity to apply dynamic skew
  const xVelocity = useVelocity(mouseX);
  const rawSkew = useTransform(xVelocity, [-1500, 1500], [-15, 15]);
  const skewX = useSpring(rawSkew, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveImage(null)}
      className="relative w-full"
    >
      {/* Floating Image Preview Container */}
      {activeImage && (
        <motion.div
          style={{
            x: springX,
            y: springY,
            skewX,
            translateX: "-50%",
            translateY: "-50%"
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="pointer-events-none absolute top-0 left-0 z-30 w-64 h-44 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-gray-950/80 backdrop-blur-md hidden md:block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* List Items */}
      <div className="flex flex-col border-t border-white/10">
        {items.map((item, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setActiveImage(item.image)}
            className="group flex justify-between items-center py-6 border-b border-white/10 cursor-pointer transition-colors hover:bg-white/[0.02] px-4"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-gray-500">0{idx + 1}</span>
              <h3 className="text-xl sm:text-3xl font-mono font-bold text-white uppercase group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
            </div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest hidden sm:inline-block">
              {item.category || item.tagline}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
