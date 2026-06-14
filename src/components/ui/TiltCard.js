"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function TiltCard({ children, className = "", onMouseEnter, onClick }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coords relative to card bounds
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update CSS variables for Vercel-like hover radial glow
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // Calculate rotation angles (max 8 degrees tilt)
    const mouseX = x - width / 2;
    const mouseY = y - height / 2;
    
    const rY = (mouseX / (width / 2)) * 8;
    const rX = -(mouseY / (height / 2)) * 8;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={`interactive-glow-card ${className}`}
    >
      {/* 3D Depth Layer wrapper for contents to pop out of surface */}
      <div className="w-full h-full flex flex-col justify-between" style={{ transform: "translateZ(18px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}
