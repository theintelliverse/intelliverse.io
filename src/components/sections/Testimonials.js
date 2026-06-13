"use client";

import { useRef } from "react";

export default function Testimonials({ data }) {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="testimonials" className="py-20 reveal-on-scroll">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
        <div className="relative w-full bg-gray-900 bg-opacity-75 p-8 rounded-lg">
          {/* Prev Button */}
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white z-20 carousel-btn cursor-pointer"
            aria-label="Previous testimonials"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div
            ref={carouselRef}
            className="testimonial-carousel-container overflow-x-auto scroll-snap-type-x mandatory -webkit-overflow-scrolling-touch scrollbar-none px-6"
          >
            <div className="testimonial-carousel">
              {data && data.map((test, index) => (
                <div key={index} className="testimonial-card glass-card p-6 rounded-lg shadow-lg mx-4 flex flex-col justify-between">
                  <p className="text-gray-300 italic text-sm mb-4 leading-relaxed">
                    "{test.text}"
                  </p>
                  <span className="text-xs font-semibold text-blue-400 block text-right">
                    - {test.author}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white z-20 carousel-btn cursor-pointer"
            aria-label="Next testimonials"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
