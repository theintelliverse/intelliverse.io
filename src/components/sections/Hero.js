"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import audioManager from "@/lib/audioManager";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero({ data }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef = useRef(null);

  // Parallax scroll for the giant background text
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 180]);
  const scaleParallax = useTransform(scrollY, [0, 800], [1, 1.15]);

  useEffect(() => {
    if (!titleRef.current) return;

    // Detect mobile viewport (width < 768px)
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      // Split title into characters
      const text = titleRef.current.innerText;
      titleRef.current.innerHTML = "";

      // Create spans for characters
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char === " " ? "\u00A0" : char;
        span.className = "inline-block char-span opacity-0 translate-y-12 select-none";
        titleRef.current.appendChild(span);
      });
      // Ensure the parent container is visible for span animations
      gsap.set(titleRef.current, { opacity: 1 });
    }

    // Staggered GSAP Entry Timeline
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    if (!isMobile) {
      tl.to(".char-span", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.04,
      });
    } else {
      // On mobile, fade in and slide up the entire h1 smoothly
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2 }
      );
    }

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0 },
      "-=0.6"
    )
      .fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8 },
        "-=0.8"
      )
      .fromTo(
        ".hero-line",
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 1.5, transformOrigin: "top", stagger: 0.2 },
        "-=1.0"
      );

    // Subtle floating animation for background elements
    gsap.to(".hero-big-bg-text", {
      y: -20,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Subtle float loop for CTA Button
    gsap.to(btnRef.current, {
      y: -6,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2.2
    });
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    audioManager.playClick();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const playHoverSound = () => {
    audioManager.playHover();
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent py-20"
    >
      {/* Massive Background Decorative Text */}
      <motion.h2
        style={{ y: yParallax, scale: scaleParallax }}
        className="hero-big-bg-text absolute select-none text-[12vw] font-black tracking-widest text-white/[0.015] pointer-events-none uppercase font-sans text-center leading-none"
        aria-hidden="true"
      >
        INTELLIVERSE
      </motion.h2>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[80vh]">
        {/* Floating Holographic/Glassmorphic Panel (Left side) */}
        <div 
          className="w-full lg:w-6/12 text-left p-8 md:p-12 rounded-3xl glassmorphic-card glassmorphic-glow-blue relative overflow-hidden group"
          style={{
            borderLeft: "4px solid var(--accent-primary)" // Left electric blue accent bar
          }}
        >
          {/* Subtle inner grid design */}
          <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />

          {/* Holographic Systems Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[9px] font-mono tracking-widest uppercase text-blue-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            SYSTEMS // OPERATIONAL
          </div>

          {/* Title Stagger */}
          <h1
            ref={titleRef}
            id="hero-title"
            style={{ opacity: 0 }} // Pre-set invisible to prevent FOUC, GSAP will fade in
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight uppercase font-sans leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-200"
          >
            innovation create & grow
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            id="hero-subtitle"
            className="text-xs sm:text-sm md:text-base text-gray-300 font-medium mb-10 tracking-wider uppercase leading-relaxed max-w-xl font-mono"
          >
            {data?.subtitle || "YOUR ONE-STOP SOLUTION FOR SOFTWARE DEVELOPMENT, WEB DEVELOPMENT, AND IT SERVICES."}
          </p>

          {/* Action Button */}
          <div ref={btnRef} className="flex justify-start">
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                onMouseEnter={playHoverSound}
                className="group relative px-8 py-3.5 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xl overflow-hidden cursor-pointer"
              >
                {/* Hover sliding bg */}
                <span className="absolute inset-0 w-full h-full bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-10" />
                Get in Touch
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Holographic Diagnostic Panel (Right side) - Visible on Desktop only to balance layout */}
        <div 
          className="w-full lg:w-5/12 p-8 rounded-3xl relative overflow-hidden hidden lg:flex flex-col h-[460px] font-mono text-xs text-gray-300 border border-white/5"
          style={{
            borderRight: "4px solid var(--accent-secondary)", // Right cyan accent bar
            backgroundColor: "rgba(10, 10, 15, 0.12)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 123, 255, 0.05)"
          }}
        >
          {/* Diagnostic Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
            <span className="font-bold uppercase tracking-widest text-[10px] text-blue-400">SYS DIAGNOSTICS</span>
            <span className="text-[9px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 animate-pulse">LIVE</span>
          </div>

          {/* Real-time System Load Bars */}
          <div className="space-y-4 mb-8">
            <div>
              <div className="flex justify-between mb-1.5 uppercase text-[9px] tracking-wider text-gray-400">
                <span>CPU Load</span>
                <span className="text-blue-400">42.8%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "42.8%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5 uppercase text-[9px] tracking-wider text-gray-400">
                <span>Robotic Kinematics</span>
                <span className="text-cyan-400">Operational</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  className="h-full bg-cyan-400"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5 uppercase text-[9px] tracking-wider text-gray-400">
                <span>Memory Allocation</span>
                <span className="text-white">1.24 GB / 4.0 GB</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "31%" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                  className="h-full bg-white/40"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Scrolling Diagnostic Logs */}
          <div className="flex-1 flex flex-col justify-end">
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-3">Core logs //</span>
            <div className="space-y-2.5 max-h-[160px] overflow-hidden">
              <div className="flex gap-2 text-gray-400 border-l border-blue-500/20 pl-2 text-[10px]">
                <span className="text-blue-500">[00:01]</span>
                <span>SYSTEM INIT: SUCCESS</span>
              </div>
              <div className="flex gap-2 text-gray-400 border-l border-blue-500/20 pl-2 text-[10px]">
                <span className="text-blue-500">[00:02]</span>
                <span>PINS CONNECTED: OK</span>
              </div>
              <div className="flex gap-2 text-gray-400 border-l border-blue-500/20 pl-2 text-[10px]">
                <span className="text-blue-500">[00:03]</span>
                <span>ACTUATORS CALIBRATED</span>
              </div>
              <div className="flex gap-2 text-white border-l border-cyan-500/30 pl-2 text-[10px]">
                <span className="text-cyan-400">[LIVE]</span>
                <span className="animate-pulse">LASER SCANNING ACTIVE...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative vertical lines */}
      <div className="hero-line absolute left-10 top-0 bottom-0 w-[1px] bg-white/[0.02] hidden lg:block" />
      <div className="hero-line absolute right-10 top-0 bottom-0 w-[1px] bg-white/[0.02] hidden lg:block" />
    </section>
  );
}
