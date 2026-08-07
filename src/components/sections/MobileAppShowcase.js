"use client";

import TiltCard from "@/components/ui/TiltCard";
import Magnetic from "@/components/ui/Magnetic";
import SplitTextReveal from "@/components/ui/SplitTextReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * STRATEGIC APP STORE OPTIMIZATION (ASO) CHECKLIST:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. App Title (30 Chars): Primary keyword + brand (e.g. "VRIX - Healthcare & Hospital")
 * 2. Subtitle / Short Description (30 Chars iOS / 80 Chars Android): Secondary keywords
 * 3. Keyword Field (iOS 100 Chars): Comma-separated high-volume low-competition keywords
 * 4. Screenshots: First 3 screenshots must tell a visual story with high contrast captions
 * 5. App Icon: High contrast, uncluttered glyph recognizable at 60x60px
 * 6. App Size & Performance: Keep binary under 200MB to enable cellular downloads
 * 7. In-App Reviews Prompt: Trigger SKStoreReviewController after positive user micro-conversions
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function MobileAppShowcase({
  appName = "VRIX Health App",
  subtitle = "AI Hospital Management & Care",
  categoryRank = "#1 Category Rank",
  rating = 4.9,
  downloads = "50K+ Downloads",
  keywords = [
    { word: "Hospital Management", rank: "#1", volume: "94/100" },
    { word: "Telehealth Patient App", rank: "#2", volume: "88/100" },
    { word: "Doctor Appointment Booking", rank: "#1", volume: "91/100" },
    { word: "EHR Medical Records", rank: "#3", volume: "82/100" },
  ]
}) {
  return (
    <section id="aso-showcase" className="py-24 relative bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <ScrollReveal variant="lens-focus">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400">
              {"// "}APP STORE OPTIMIZATION (ASO) FRAMEWORK
            </span>
            <SplitTextReveal
              as="h2"
              className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-white mt-2 mb-4"
            >
              Mobile App Performance & Ranking Matrix
            </SplitTextReveal>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-mono">
              Engineering top-ranking mobile applications with optimized App Store metadata & keyword architecture.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: App Preview Card */}
          <div className="lg:col-span-5">
            <TiltCard className="p-8 glassmorphic-card border border-white/10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-900 border border-white/20 flex items-center justify-center shadow-2xl mb-6">
                <i className="fas fa-hospital-user text-4xl text-white animate-pulse" />
              </div>

              <h3 className="text-2xl font-black font-mono uppercase text-white mb-1">
                {appName}
              </h3>
              <p className="text-blue-400 font-mono text-xs mb-4">
                {subtitle}
              </p>

              {/* Badges Row */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[10px] font-mono font-bold">
                  {categoryRank}
                </span>
                <span className="px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold flex items-center gap-1">
                  <i className="fas fa-star text-[8px]" /> {rating} / 5.0
                </span>
                <span className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold">
                  {downloads}
                </span>
              </div>

              <Magnetic strength={0.3}>
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono text-xs uppercase tracking-widest font-bold shadow-lg shadow-blue-500/25 hover:brightness-110 transition-all flex items-center gap-2">
                  <i className="fab fa-apple text-sm" /> App Store Preview
                </button>
              </Magnetic>
            </TiltCard>
          </div>

          {/* Right Column: Keyword Ranking Matrix */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="fade-left">
              <div className="p-8 glassmorphic-card rounded-2xl border border-white/10">
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                  <h4 className="text-white font-bold font-mono uppercase text-sm flex items-center gap-2">
                    <i className="fas fa-chart-line text-blue-400" /> ASO Keyword Ranking Matrix
                  </h4>
                  <span className="text-[10px] font-mono text-gray-500">LIVE ALGORITHM DATA</span>
                </div>

                <div className="space-y-4">
                  {keywords.map((kw, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-xs">
                      <span className="text-gray-200 font-medium">{kw.word}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500 text-[10px]">Vol: {kw.volume}</span>
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-400 font-bold">
                          {kw.rank}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-gray-400">
                  <span>Apple App Store & Google Play Sync</span>
                  <span className="text-green-400 font-bold">✓ Indexing Active</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
