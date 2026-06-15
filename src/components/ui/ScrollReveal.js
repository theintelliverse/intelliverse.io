"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.8,
  distance = 40,
  once = true, // Set to true by default for zero-lag subsequent scrolls
  threshold = 0.05,
  className = "",
  staggerChildren = 0.1,
  playSound = false,
}) {
  const [deviceConfig, setDeviceConfig] = useState({
    distance: 20,
    duration: 0.5,
    enable3D: false,
    enableBlur: false,
    delayMultiplier: 0.8,
    threshold: 0.05,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 340) {
        // Fold phone (folded) - compact, ultra-snappy scroll animation
        setDeviceConfig({
          distance: 4,
          duration: 0.35,
          enable3D: false,
          enableBlur: false,
          delayMultiplier: 0.5,
          threshold: 0.01, // trigger early for small viewports
        });
      } else if (w < 768) {
        // Standard phone - mobile fluid layout, fast and smooth
        setDeviceConfig({
          distance: 6,
          duration: 0.4,
          enable3D: false,
          enableBlur: false,
          delayMultiplier: 0.6,
          threshold: 0.02,
        });
      } else if (w < 1024) {
        // Tablet / Unfolded fold phone - medium scale, smooth
        setDeviceConfig({
          distance: 8,
          duration: 0.45,
          enable3D: false,
          enableBlur: false,
          delayMultiplier: 0.7,
          threshold: 0.03,
        });
      } else if (w < 1440) {
        // Laptop - high quality, light 3D and blur
        setDeviceConfig({
          distance: 12,
          duration: 0.55,
          enable3D: true,
          enableBlur: true,
          delayMultiplier: 0.8,
          threshold: 0.04,
        });
      } else {
        // PC / Desktop / Ultrawide - maximum fidelity, deep perspective & blur
        setDeviceConfig({
          distance: 16,
          duration: 0.65,
          enable3D: true,
          enableBlur: true,
          delayMultiplier: 0.9,
          threshold: 0.05,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeDistance = distance !== 40 ? distance : deviceConfig.distance;
  const activeDuration = duration !== 0.8 ? duration : deviceConfig.duration;
  const activeDelay = delay * deviceConfig.delayMultiplier;
  const activeThreshold = threshold !== 0.05 ? threshold : deviceConfig.threshold;

  // 8-step keyframes timeline distribution for extreme smoothness (times has 8 values)
  const stepTimes = [0, 0.12, 0.28, 0.45, 0.62, 0.78, 0.9, 1];

  // Easing function intervals (7 segments between 8 keyframes)
  // Decelerating cubic-bezier curve to give a premium inertia-scrolling aesthetic
  const premiumEasings = [
    "cubic-bezier(0.16, 1, 0.3, 1)", // easeOutExpo
    "cubic-bezier(0.16, 1, 0.3, 1)",
    "cubic-bezier(0.16, 1, 0.3, 1)",
    "cubic-bezier(0.16, 1, 0.3, 1)",
    "cubic-bezier(0.16, 1, 0.3, 1)",
    "cubic-bezier(0.16, 1, 0.3, 1)",
    "cubic-bezier(0.16, 1, 0.3, 1)",
  ];

  const variants = {
    hidden: {
      opacity: 0,
      y:
        variant === "fade-up"
          ? activeDistance
          : variant === "bounce-up"
          ? activeDistance * 1.3
          : variant === "fade-down"
          ? -activeDistance
          : variant === "perspective-3d"
          ? activeDistance * 1.2
          : variant === "lens-focus"
          ? 8
          : 0,
      x: variant === "fade-left" ? activeDistance : variant === "fade-right" ? -activeDistance : 0,
      scale:
        variant === "scale-in"
          ? 0.95
          : variant === "bounce-up"
          ? 0.94
          : variant === "lens-focus"
          ? 1.04
          : 1,
      rotateX: variant === "perspective-3d" && deviceConfig.enable3D ? 12 : 0,
      rotate:
        variant === "fade-left" && deviceConfig.enable3D
          ? 2
          : variant === "fade-right" && deviceConfig.enable3D
          ? -2
          : 0,
      filter: variant === "lens-focus" && deviceConfig.enableBlur ? "blur(12px)" : "none",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      rotateX: 0,
      filter: variant === "lens-focus" && deviceConfig.enableBlur ? "blur(0px)" : "none",
      transition: {
        duration: activeDuration,
        delay: activeDelay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo for premium fluid deceleration
        y:
          variant === "bounce-up"
            ? {
                type: "spring",
                stiffness: 70,
                damping: 15,
                mass: 0.8,
              }
            : {
                type: "spring",
                stiffness: 40,
                damping: 18,
                mass: 0.8,
              },
        scale:
          variant === "bounce-up"
            ? {
                type: "spring",
                stiffness: 75,
                damping: 15,
                mass: 0.8,
              }
            : {
                type: "spring",
                stiffness: 45,
                damping: 18,
                mass: 0.8,
              },
        filter: {
          duration: activeDuration * 0.9,
          ease: "easeOut",
        },
        staggerChildren: staggerChildren,
        delayChildren: activeDelay,
      },
    },
  };

  const handleViewportEnter = () => {};

  // Build high-performance style declaration promoting properties to GPU compositing layers
  const containerStyle = {
    willChange: `transform, opacity${deviceConfig.enableBlur && variant === "lens-focus" ? ", filter" : ""}`,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transformStyle: "preserve-3d",
  };

  if (variant === "stagger-container") {
    const containerVariants = {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: activeDelay,
          staggerChildren: staggerChildren,
        },
      },
    };

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: activeThreshold, margin: "0px 0px -8% 0px" }}
        variants={containerVariants}
        onViewportEnter={handleViewportEnter}
        className={className}
        style={containerStyle}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: activeThreshold, margin: "0px 0px -8% 0px" }}
      variants={variants}
      onViewportEnter={handleViewportEnter}
      className={className}
      style={containerStyle}
    >
      {children}
    </motion.div>
  );
}
