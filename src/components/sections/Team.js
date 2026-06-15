"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import ScrollParallax from "@/components/ui/ScrollParallax";

export default function Team({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const playHoverSound = () => {};

  const playClickSound = () => {};

  const defaultFounders = [
    {
      name: "Dhruvil Thummar",
      role: "Co-founder & CTO",
      tagline: "Engineering scalable systems & leading technical vision",
      image: "/founder_dhruvil.jpg",
      linkedin: "https://www.linkedin.com/in/dhruvilthummar",
      instagram: "",
      imageX: 50,
      imageY: 50,
      order: 1
    },
    {
      name: "Rudra Kankotiya",
      role: "Co-founder & CMO",
      tagline: "Driving brand strategy & marketing excellence",
      image: "/founder_rudra.jpg",
      linkedin: "https://www.linkedin.com/in/rudra-kankotiya-2173ab31a",
      instagram: "",
      imageX: 50,
      imageY: 50,
      order: 2
    },
    {
      name: "Jal Anghan",
      role: "Founder & Director",
      tagline: "Visionary leadership & strategic business growth",
      image: "/founder_jal.jpg",
      linkedin: "https://www.linkedin.com/in/jal-anghan-534628309",
      instagram: "",
      imageX: 50,
      imageY: 50,
      order: 3
    }
  ];

  const getThemeColors = (index) => {
    const themes = [
      {
        accent: "from-blue-500 to-cyan-500",
        glowColor: "rgba(0, 123, 255, 0.35)",
        borderHover: "border-blue-500/40"
      },
      {
        accent: "from-slate-400 to-blue-500",
        glowColor: "rgba(180, 180, 190, 0.35)",
        borderHover: "border-slate-400/40"
      },
      {
        accent: "from-cyan-500 to-blue-600",
        glowColor: "rgba(0, 229, 255, 0.35)",
        borderHover: "border-cyan-500/40"
      }
    ];
    return themes[index % themes.length];
  };

  const displayFounders = [...(data && data.length > 0 ? data : defaultFounders)]
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

  return (
    <section id="team" className="py-28 relative overflow-hidden">
      {/* Background drifting text */}
      <div className="absolute left-0 right-0 top-16 select-none pointer-events-none -z-10 flex justify-center overflow-hidden">
        <ScrollParallax speed={0.28} className="text-white/[0.012] font-black text-8xl md:text-[13vw] tracking-widest font-sans uppercase whitespace-nowrap">
          FOUNDERS
        </ScrollParallax>
      </div>

      {/* Ambient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl">
        {/* Section Heading */}
        <ScrollReveal variant="lens-focus" playSound={true}>
          <div className="text-center mb-20">
            <div className="glassmorphic-text-bg">
              <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-blue-400/60 mb-2">
                {"// "}The People Behind It
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase text-white">
                Meet Our Team
              </h2>
            </div>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-blue-500/60"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-blue-500/60"></div>
            </div>
          </div>
        </ScrollReveal>

        {/* Founders Grid */}
        <ScrollReveal variant="stagger-container" className="flex flex-wrap gap-8 justify-center">
          {displayFounders.map((founder, index) => {
            const theme = getThemeColors(index);
            const imageX = founder.imageX !== undefined ? founder.imageX : 50;
            const imageY = founder.imageY !== undefined ? founder.imageY : 50;

            return (
              <ScrollReveal key={index} variant="scale-in" className="flex">
                <TiltCard
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    playHoverSound();
                  }}
                  onClick={playClickSound}
                  className={`group relative p-7 pt-10 rounded-2xl glassmorphic-card text-center w-full sm:w-[300px] overflow-hidden transition-all duration-500 ${hoveredIndex === index ? theme.borderHover : ""} hover:bg-white/[0.04]`}
                >
                  {/* Animated top accent line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${theme.accent} opacity-0 group-hover:opacity-100 transition-all duration-500`}
                    style={{ boxShadow: hoveredIndex === index ? `0 0 20px ${theme.glowColor}` : "none" }}
                  />

                  {/* Backlit glow */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`} />

                  {/* Styled Avatar Frame */}
                  <div className="relative w-28 h-28 mx-auto mb-6">
                    {/* Outer ring gradient */}
                    <div
                      className={`absolute -inset-1 rounded-full bg-gradient-to-br ${theme.accent} opacity-0 group-hover:opacity-60 transition-all duration-700 blur-sm`}
                    />
                    {/* Image container */}
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 z-10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        src={founder.image}
                        alt={`Photo of ${founder.name}`}
                        style={{
                          objectPosition: `${imageX}% ${imageY}%`
                        }}
                      />
                    </div>
                    {/* Status dot */}
                    <div className="absolute -bottom-0.5 right-2 z-25 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#121212] group-hover:animate-pulse" />
                  </div>

                  {/* Info */}
                  <h3 className="text-lg font-bold text-white uppercase font-mono tracking-wide mb-1">
                    {founder.name}
                  </h3>
                  <p className={`text-xs font-mono uppercase tracking-wider mb-2 bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent font-semibold`}>
                    {founder.role}
                  </p>

                  {/* Tagline - appears on hover */}
                  <p
                    className="text-[11px] text-gray-400 font-normal leading-relaxed px-2 transition-all duration-500 overflow-hidden"
                    style={{
                      maxHeight: hoveredIndex === index ? "60px" : "0px",
                      opacity: hoveredIndex === index ? 1 : 0,
                      marginBottom: hoveredIndex === index ? "12px" : "0px"
                    }}
                  >
                    {founder.tagline}
                  </p>

                  {/* Connect Buttons */}
                  {(founder.linkedin || founder.instagram || (founder.customLinks && founder.customLinks.length > 0) || founder.customLinkUrl) && (
                    <div className="flex flex-wrap justify-center gap-2 border-t border-white/[0.06] pt-4 mt-2">
                      {founder.linkedin && (
                        <a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClickSound}
                          onMouseEnter={playHoverSound}
                          className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-white transition-all duration-300 font-mono group/link px-2.5 py-1 rounded-full border border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                        >
                          <i className="fab fa-linkedin-in text-[10px] group-hover/link:scale-110 transition-transform duration-300"></i>
                          <span className="tracking-wider font-bold">LINKEDIN</span>
                        </a>
                      )}
                      {founder.instagram && (
                        <a
                          href={founder.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClickSound}
                          onMouseEnter={playHoverSound}
                          className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-white transition-all duration-300 font-mono group/link px-2.5 py-1 rounded-full border border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                        >
                          <i className="fab fa-instagram text-[10px] group-hover/link:scale-110 transition-transform duration-300"></i>
                          <span className="tracking-wider font-bold">INSTAGRAM</span>
                        </a>
                      )}
                      {founder.customLinks && founder.customLinks.length > 0 ? (
                        founder.customLinks.map((link, lIdx) => (
                          <a
                            key={lIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={playClickSound}
                            onMouseEnter={playHoverSound}
                            className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-white transition-all duration-300 font-mono group/link px-2.5 py-1 rounded-full border border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                          >
                            <i className={`${link.icon || "fas fa-link"} text-[10px] group-hover/link:scale-110 transition-transform duration-300`}></i>
                            <span className="tracking-wider font-bold">{(link.name || "LINK").toUpperCase()}</span>
                          </a>
                        ))
                      ) : founder.customLinkUrl ? (
                        <a
                          href={founder.customLinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClickSound}
                          onMouseEnter={playHoverSound}
                          className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-white transition-all duration-300 font-mono group/link px-2.5 py-1 rounded-full border border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                        >
                          <i className={`${founder.customLinkIcon || "fas fa-link"} text-[10px] group-hover/link:scale-110 transition-transform duration-300`}></i>
                          <span className="tracking-wider font-bold">{founder.customLinkName ? founder.customLinkName.toUpperCase() : "LINK"}</span>
                        </a>
                      ) : null}
                    </div>
                  )}
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
