"use client";

import { useEffect } from "react";

export default function Stats({ data }) {
  useEffect(() => {
    const counters = document.querySelectorAll(".counter");
    const speed = 200;

    const animateCounters = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          let count = 0;

          const updateCount = () => {
            const inc = target / speed;
            if (count < target) {
              count = Math.ceil(count + inc);
              if (count > target) count = target;
              counter.innerText = count;
              setTimeout(updateCount, 10);
            } else {
              counter.innerText = target;
            }
          };

          updateCount();
          observer.unobserve(counter);
        }
      });
    };

    const counterObserver = new IntersectionObserver(animateCounters, {
      root: null,
      threshold: 0.5,
    });

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });

    return () => {
      counterObserver.disconnect();
    };
  }, [data]);

  return (
    <section id="stats" className="py-20 bg-gray-800/50 reveal-on-scroll">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-500">
              <span className="counter" data-target={data?.projects || 50}>0</span>+
            </h3>
            <p className="text-gray-400 mt-2">Projects Completed</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-500">
              <span className="counter" data-target={data?.satisfaction || 100}>0</span>%
            </h3>
            <p className="text-gray-400 mt-2">Client Satisfaction</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-500">
              <span className="counter" data-target={data?.clients || 30}>0</span>+
            </h3>
            <p className="text-gray-400 mt-2">Happy Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
}
