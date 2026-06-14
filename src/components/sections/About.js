"use client";

import { useState } from "react";
import audioManager from "@/lib/audioManager";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import ScrollParallax from "@/components/ui/ScrollParallax";

export default function About({ data }) {
  const [hoveredPillar, setHoveredPillar] = useState(null);

  const playHoverSound = () => {
    audioManager.playHover();
  };

  const pillars = [
    {
      icon: "fa-brain",
      label: "Artificial Intelligence",
      desc: "Exploring AI tools and understanding the underlying concepts to drive research and real-world applications.",
      gradient: "from-blue-500 to-cyan-600",
      gradientBg: "from-blue-500/10 to-cyan-600/5",
      glowColor: "rgba(0, 123, 255, 0.35)",
      borderHover: "border-blue-500/40",
      highlights: ["Machine Learning", "NLP & LLMs", "Computer Vision"]
    },
    {
      icon: "fa-chart-line",
      label: "Data Science",
      desc: "Leveraging data-driven insights to analyze, visualize, and solve complex problems at scale.",
      gradient: "from-cyan-500 to-blue-600",
      gradientBg: "from-cyan-500/10 to-blue-600/5",
      glowColor: "rgba(0, 229, 255, 0.35)",
      borderHover: "border-cyan-500/40",
      highlights: ["Analytics", "Visualization", "Big Data"]
    },
    {
      icon: "fa-robot",
      label: "Robotics & IoT",
      desc: "Building connected, intelligent physical systems that bridge the gap between software and the real world.",
      gradient: "from-slate-400 to-slate-600",
      gradientBg: "from-slate-400/10 to-slate-600/5",
      glowColor: "rgba(180, 180, 190, 0.35)",
      borderHover: "border-slate-400/40",
      highlights: ["Embedded Systems", "Sensors", "Automation"]
    },
    {
      icon: "fa-users",
      label: "Community & Collaboration",
      desc: "A supportive, beginner-friendly environment that fosters learning, experimentation, and meaningful connections.",
      gradient: "from-blue-600 to-cyan-500",
      gradientBg: "from-blue-600/10 to-cyan-500/5",
      glowColor: "rgba(0, 123, 255, 0.35)",
      borderHover: "border-blue-600/40",
      highlights: ["Open Source", "Mentorship", "Hackathons"]
    }
  ];

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Sterile Lab theme background coordinates/glows */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-500/[0.015] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-cyan-500/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Heading */}
        <ScrollReveal variant="lens-focus" playSound={true}>
          <div className="text-center mb-20">
            <div className="glassmorphic-text-bg">
              <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-blue-400/60 mb-2">
                {"// "}Who We Are
              </p>
              <h2
                className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase text-white"
              >
                About The Intelliverse
              </h2>
            </div>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-blue-500/60"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-blue-500/60"></div>
            </div>
          </div>
        </ScrollReveal>

        {/* Main Two-Column Content */}
        <div className="flex flex-col md:flex-row items-stretch gap-8 mb-14">
          {/* Left Card — Community Identity */}
          <ScrollReveal variant="fade-right" className="md:w-1/2 flex" delay={0.1}>
            <TiltCard
              onMouseEnter={playHoverSound}
              className="w-full rounded-2xl overflow-hidden glassmorphic-card p-8 flex flex-col justify-between hover:border-blue-500/40 transition-all duration-500 relative group"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ boxShadow: "0 0 20px rgba(0, 123, 255, 0.4)" }} />

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

              <div className="mb-4">
                <ScrollParallax speed={0.12} className="inline-block">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl text-white shadow-lg mb-6 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
                    <i className="fas fa-globe" aria-hidden="true"></i>
                  </div>
                </ScrollParallax>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-4 font-mono">
                  Who We Are
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed font-normal">
                  <strong className="text-white">The Intelliverse</strong> is a vibrant tech community of passionate beginners and early learners united by a shared curiosity for technology and innovation. We focus on exploring and solving real-world problems using emerging technologies like <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold">AI, Data Science, Robotics, and IoT</span>.
                </p>
              </div>

              {/* Bottom meta line */}
              <div className="border-t border-white/[0.06] pt-4 mt-4 text-[10px] font-mono text-gray-500 flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:animate-pulse"></span>
                  IDENTITY // CORE01
                </span>
                <span className="text-gray-600">01</span>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Right Card — Mission Statement */}
          <ScrollReveal variant="fade-left" className="md:w-1/2 flex" delay={0.2}>
            <TiltCard
              onMouseEnter={playHoverSound}
              className="w-full rounded-2xl overflow-hidden glassmorphic-card p-8 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-500 relative group"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)" }} />

              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

              <div>
                <ScrollParallax speed={0.1} className="inline-block">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xl text-white shadow-lg mb-6 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
                    <i className="fas fa-rocket" aria-hidden="true"></i>
                  </div>
                </ScrollParallax>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white mb-4 font-mono">
                  Our Mission
                </h3>
                <p id="about-p1" className="text-gray-300 text-sm leading-relaxed mb-4 font-normal">
                  {data?.p1 || "Beyond just using AI tools, we actively push ourselves to understand the underlying concepts and contribute to research and development where possible."}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed font-normal">
                  Our goal is to grow step by step within the evolving AI industry — learning together, experimenting, and building meaningful projects with a supportive, beginner-friendly environment that fosters collaboration and continuous learning.
                </p>
              </div>

              {/* Bottom meta line */}
              <div className="border-t border-white/[0.06] pt-4 mt-6 text-[10px] font-mono text-gray-500 flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 group-hover:animate-pulse"></span>
                  MISSION // ACTIVE02
                </span>
                <span className="text-gray-600">02</span>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>

        {/* Pillar Section Sub-Heading */}
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-10">
            <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-gray-500">
              {"// "}Our Focus Areas
            </p>
          </div>
        </ScrollReveal>

        {/* Four Technology Pillars — Premium Glass Cards */}
        <ScrollReveal variant="stagger-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, idx) => (
            <ScrollReveal key={idx} variant="fade-up" delay={0.06 * idx} className="flex">
              <TiltCard
                onMouseEnter={() => {
                  setHoveredPillar(idx);
                  playHoverSound();
                }}
                className={`group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-6 pb-5 cursor-default h-full w-full overflow-hidden transition-all duration-500 hover:bg-white/[0.04] pillar-card ${hoveredPillar === idx ? pillar.borderHover : "hover:border-white/15"}`}
              >
                {/* Top gradient accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`}
                  style={{ boxShadow: hoveredPillar === idx ? `0 0 15px ${pillar.glowColor}` : "none" }}
                />

                {/* Hover background glow */}
                <div className={`absolute inset-0 bg-gradient-to-b ${pillar.gradientBg} opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`} />

                {/* Gradient Icon Badge */}
                <div className="relative mb-5">
                  <div
                    className={`w-11 h-11 rounded-lg bg-gradient-to-br ${pillar.gradient} flex items-center justify-center text-white text-base shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-500`}
                    style={{
                      boxShadow: hoveredPillar === idx ? `0 6px 24px ${pillar.glowColor}` : "none",
                      transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                    }}
                  >
                    <i className={`fas ${pillar.icon}`} aria-hidden="true"></i>
                  </div>
                  {/* Subtle pulse ring */}
                  <div
                    className={`absolute inset-0 w-11 h-11 rounded-lg bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-15 group-hover:scale-[1.6] transition-all duration-700 blur-md`}
                  />
                </div>

                {/* Label */}
                <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest mb-2.5">
                  {pillar.label}
                </h4>

                {/* Description */}
                <p className="text-gray-400 text-[11px] leading-relaxed font-normal mb-4">
                  {pillar.desc}
                </p>

                {/* Highlight Tags — slide in on hover */}
                <div
                  className="flex flex-wrap gap-1.5 overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: hoveredPillar === idx ? "50px" : "0px",
                    opacity: hoveredPillar === idx ? 1 : 0,
                    marginBottom: hoveredPillar === idx ? "8px" : "0px"
                  }}
                >
                  {pillar.highlights.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/[0.06] bg-white/[0.03] text-gray-400`}
                      style={{
                        transform: hoveredPillar === idx ? "translateY(0)" : "translateY(6px)",
                        opacity: hoveredPillar === idx ? 1 : 0,
                        transition: `all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.06}s`
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom meta */}
                <div className="border-t border-white/[0.05] pt-3 mt-auto text-[9px] font-mono text-gray-600 flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${pillar.gradient} group-hover:animate-pulse`}></span>
                    PILLAR0{idx + 1}
                  </span>
                  <span>0{idx + 1}</span>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
