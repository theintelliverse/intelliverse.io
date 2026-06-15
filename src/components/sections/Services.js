"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import ScrollParallax from "@/components/ui/ScrollParallax";

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const playHoverSound = () => {};

  const servicesList = [
    {
      icon: "fa-laptop-code",
      title: "Web Development",
      description: "Crafting beautiful, responsive, and high-performing web platforms tailored to your business ecosystem.",
      details: [
        "Custom React & Next.js Applications",
        "Progressive Web Apps (PWA)",
        "E-Commerce & SaaS Platforms",
        "Performance Optimization & SEO"
      ],
      accent: "from-blue-500 to-cyan-500",
      accentBg: "from-blue-500/10 to-cyan-500/5",
      iconColor: "text-blue-400",
      glowColor: "rgba(0, 123, 255, 0.35)",
      borderHover: "hover:border-blue-500/40"
    },
    {
      icon: "fa-cogs",
      title: "Software Engineering",
      description: "Building custom full-stack solutions and reliable architectures to streamline operations and scale workflows.",
      details: [
        "Full-Stack Architecture Design",
        "API Development & Integration",
        "Cloud-Native Solutions (AWS/GCP)",
        "CI/CD & DevOps Pipelines"
      ],
      accent: "from-slate-400 to-blue-500",
      accentBg: "from-slate-400/10 to-blue-500/5",
      iconColor: "text-slate-400",
      glowColor: "rgba(180, 180, 190, 0.35)",
      borderHover: "hover:border-slate-400/40"
    },
    {
      icon: "fa-shield-alt",
      title: "IT Architecture & Support",
      description: "Providing secure IT infrastructure, reliable support, and robust systems architecture to keep business running smoothly.",
      details: [
        "Infrastructure Design & Migration",
        "Cybersecurity & Compliance",
        "24/7 Monitoring & Support",
        "Disaster Recovery Planning"
      ],
      accent: "from-cyan-500 to-blue-600",
      accentBg: "from-cyan-500/10 to-blue-600/5",
      iconColor: "text-cyan-400",
      glowColor: "rgba(0, 229, 255, 0.35)",
      borderHover: "hover:border-cyan-500/40"
    }
  ];

  return (
    <section id="services" className="py-28 relative overflow-hidden">
      {/* Background drifting text */}
      <div className="absolute left-0 right-0 top-16 select-none pointer-events-none -z-10 flex justify-center overflow-hidden">
        <ScrollParallax speed={-0.28} className="text-white/[0.012] font-black text-8xl md:text-[13vw] tracking-widest font-sans uppercase whitespace-nowrap">
          SERVICES
        </ScrollParallax>
      </div>

      {/* Sterile ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/[0.015] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Heading */}
        <ScrollReveal variant="lens-focus" playSound={true}>
          <div className="text-center mb-20">
            <div className="glassmorphic-text-bg">
              <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-blue-400/60 mb-2">
                {"// "}What We Do
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase text-white">
                Our Services
              </h2>
            </div>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-blue-500/60"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-blue-500/60"></div>
            </div>
          </div>
        </ScrollReveal>

        {/* Services Cards Grid */}
        <ScrollReveal variant="stagger-container" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {servicesList.map((service, index) => (
            <ScrollReveal key={index} variant="fade-up" className="flex">
              <TiltCard
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  playHoverSound();
                }}
                className={`group relative p-8 pb-6 rounded-2xl glassmorphic-card ${service.borderHover} hover:bg-white/[0.04] flex flex-col justify-between overflow-hidden cursor-default w-full transition-all duration-500`}
              >
                {/* Top gradient glow on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${service.accentBg} opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`}
                />

                {/* Animated top accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 transition-all duration-500`}
                  style={{ boxShadow: `0 0 20px ${service.glowColor}` }}
                />

                <div>
                  {/* Floating Icon Badge */}
                  <div className="relative mb-8">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.accent} flex items-center justify-center text-xl text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}
                      style={{
                        boxShadow: hoveredIndex === index ? `0 8px 30px ${service.glowColor}` : "none",
                        transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                      }}
                    >
                      <i className={`fas ${service.icon}`} aria-hidden="true"></i>
                    </div>
                    {/* Subtle ring pulse behind icon */}
                    <div
                      className={`absolute inset-0 w-14 h-14 rounded-xl bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-700 blur-md`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-3 font-mono">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-normal mb-6">
                    {service.description}
                  </p>

                  {/* Detail List — slides in on hover */}
                  <ul className="space-y-2.5 mb-2 overflow-hidden transition-all duration-500" style={{ maxHeight: hoveredIndex === index ? "200px" : "0px", opacity: hoveredIndex === index ? 1 : 0 }}>
                    {service.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[11px] text-gray-400 font-mono"
                        style={{
                          transform: hoveredIndex === index ? "translateX(0)" : "translateX(-10px)",
                          opacity: hoveredIndex === index ? 1 : 0,
                          transition: `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.07}s`
                        }}
                      >
                        <span className={`mt-0.5 w-1 h-1 rounded-full bg-gradient-to-r ${service.accent} flex-shrink-0`} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Monospace bottom line */}
                <div className="border-t border-white/[0.06] pt-4 mt-6 text-[10px] font-mono text-gray-500 flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.accent} group-hover:animate-pulse`}></span>
                    SYSTEM // ACTIVE0{index + 1}
                  </span>
                  <span className="text-gray-600">0{index + 1}</span>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
