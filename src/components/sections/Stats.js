"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollParallax from "@/components/ui/ScrollParallax";

function Counter({ target, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (isInView && !hasTriggered.current) {
      hasTriggered.current = true;
      let start = 0;
      const end = parseInt(target, 10);
      if (start === end) {
        setTimeout(() => {
          setCount(end);
        }, 0);
        return;
      }
      
      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 12);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Stats({ data }) {
  const playHover = () => {};

  return (
    <section id="stats" className="py-20 relative overflow-hidden">
      {/* Background drifting text */}
      <div className="absolute left-0 right-0 top-6 select-none pointer-events-none -z-10 flex justify-center overflow-hidden">
        <ScrollParallax speed={-0.25} className="text-white/[0.012] font-black text-8xl md:text-[13vw] tracking-widest font-sans uppercase whitespace-nowrap">
          NUMBERS
        </ScrollParallax>
      </div>

      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal variant="scale-in" playSound={true}>
          <div 
            onMouseEnter={playHover}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center p-12 rounded-3xl glassmorphic-card relative shadow-2xl"
          >
            {/* Projects */}
            <div className="relative group">
              <h3 className="text-4xl sm:text-5xl font-black text-blue-400 font-mono tracking-tight">
                <Counter target={data?.projects || 50} />+
              </h3>
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mt-3">{"// "}PROJECTS COMPLETED</p>
            </div>

            {/* Happy Clients */}
            <div className="relative group border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0">
              <h3 className="text-4xl sm:text-5xl font-black text-blue-400 font-mono tracking-tight">
                <Counter target={data?.clients || 30} />+
              </h3>
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mt-3">{"// "}REPEAT CLIENTS</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
