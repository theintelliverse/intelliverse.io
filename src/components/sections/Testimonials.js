"use client";

import { useRef } from "react";
import audioManager from "@/lib/audioManager";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Testimonials({ data }) {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    audioManager.playClick();
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const playHover = () => {
    audioManager.playHover();
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Section Heading */}
        <ScrollReveal variant="lens-focus" playSound={true}>
          <div className="text-center mb-16">
            <div className="glassmorphic-text-bg">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase text-white">
                What Our Clients Say
              </h2>
            </div>
            <div className="w-16 h-[2px] bg-blue-500 mx-auto mt-4"></div>
          </div>
        </ScrollReveal>

        {/* Carousel Container */}
        <ScrollReveal variant="scale-in" delay={0.1}>
          <div className="relative w-full glassmorphic-card p-8 sm:p-12 rounded-3xl shadow-2xl">
            {/* Prev Button */}
            <button
              onClick={() => scrollCarousel("left")}
              onMouseEnter={playHover}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white z-20 border border-white/10 bg-black/80 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer"
              aria-label="Previous testimonials"
            >
              <i className="fas fa-chevron-left text-sm"></i>
            </button>

            {/* Testimonial Cards */}
            <div
              ref={carouselRef}
              className="testimonial-carousel-container overflow-x-auto scroll-snap-type-x mandatory -webkit-overflow-scrolling-touch scrollbar-none px-6"
            >
              <div className="testimonial-carousel gap-6 py-2">
                {data && data.map((test, index) => (
                  <div 
                    key={index} 
                    onMouseEnter={playHover}
                    onMouseMove={handleMouseMove}
                    className="testimonial-card p-6 rounded-2xl glassmorphic-card hover:bg-white/[0.04] flex flex-col justify-between transition-all duration-500 min-h-[160px] mx-2 interactive-glow-card"
                  >
                    <p className="text-gray-100 italic text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      &quot;{test.text}&quot;
                    </p>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 block text-right">
                      {"// "}{test.author}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => scrollCarousel("right")}
              onMouseEnter={playHover}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white z-20 border border-white/10 bg-black/80 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer"
              aria-label="Next testimonials"
            >
              <i className="fas fa-chevron-right text-sm"></i>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
