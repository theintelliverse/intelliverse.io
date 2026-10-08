"use client";

import {
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  motion,
} from "framer-motion";

/**
 * Brand Orb Separator — 4 mini colored dots representing brand colors
 */
function BrandOrbIcon() {
  return (
    <span
      className="inline-flex items-center gap-[3px] mx-4 opacity-80"
      aria-hidden="true"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#3D7BF7]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#FDB347]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#5B3FD9]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B7B]" />
    </span>
  );
}

/**
 * Editorial Velocity Marquee — infinite CSS loop + scroll-velocity skew
 * Strip 1: Large Serif phrases moving left, with brand orb separators
 * Strip 2: Technical mono tags moving right (reverse direction)
 */
export default function VelocityMarquee({
  items1,
  items2,
  /* seconds for one full cycle — increase to slow down */
  duration1 = 38,
  duration2 = 32,
}) {
  const activeItems1 = Array.isArray(items1) && items1.length > 0 ? items1 : [
    "Software in the Open",
    "Systems That Outlive Hype",
    "Zero Template Engineering",
    "Resilient Web Architecture",
    "Engineered in Ahmedabad",
    "Distributed Cloud Systems",
    "Modern Next.js & React 19",
  ];
  const activeItems2 = Array.isArray(items2) && items2.length > 0 ? items2 : [
    "Next.js App Router",
    "Microservices & Serverless",
    "TypeScript Strict",
    "PostgreSQL & Mongo",
    "AWS & GCP Cloud Native",
    "Framer Motion & GSAP",
    "Zero-Downtime CI/CD",
    "Tailored AI Workflows",
  ];

  return (
    <aside
      aria-label="Studio highlights marquee"
      className="overflow-hidden border-y border-[var(--line-2)] py-5 relative"
      style={{
        backgroundColor: "var(--night)",
        color: "#F6F7FC",
      }}
    >
      {/* Inject CSS keyframes once */}
      <style>{`
        @keyframes marquee-left  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>

      {/* Upper strip: Large editorial serif — moves left */}
      <MarqueeStrip
        items={activeItems1}
        direction="left"
        duration={duration1}
        isSerif
      />

      {/* Lower strip: Technical mono — moves right (reverse) */}
      <div style={{ marginTop: "0.85rem" }}>
        <MarqueeStrip
          items={activeItems2}
          direction="right"
          duration={duration2}
          dimmed
        />
      </div>
    </aside>
  );
}

function MarqueeStrip({ items, direction, duration, isSerif = false, dimmed = false }) {
  /* Scroll-velocity skew effect via framer-motion */
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  const skewAmt = direction === "left" ? [-3, 0, 3] : [3, 0, -3];
  const skewX = useTransform(smoothVelocity, [-2500, 0, 2500], skewAmt);
  const skewSpring = useSpring(skewX, { stiffness: 280, damping: 28 });

  /* Duplicate items once so the CSS infinite loop is seamless */
  const doubled = [...items, ...items];

  const animName   = direction === "left" ? "marquee-left" : "marquee-right";
  const animCSS    = `${animName} ${duration}s linear infinite`;

  return (
    <div
      className="overflow-hidden whitespace-nowrap flex select-none pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        style={{
          display: "flex",
          alignItems: "center",
          animation: animCSS,
          /* will-change for GPU compositing */
          willChange: "transform",
          skewX: skewSpring,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center shrink-0"
            style={{
              fontFamily: isSerif ? "var(--serif)" : "var(--mono)",
              fontSize: isSerif
                ? "clamp(1.75rem, 3.2vw, 2.75rem)"
                : "clamp(0.6875rem, 1.1vw, 0.8125rem)",
              letterSpacing: isSerif ? "-0.02em" : "0.14em",
              textTransform: isSerif ? "none" : "uppercase",
              color: dimmed ? "rgba(246, 247, 252, 0.42)" : "rgba(246, 247, 252, 0.95)",
              paddingRight: isSerif ? "2.5rem" : "1.75rem",
              fontWeight: isSerif ? 400 : 500,
            }}
          >
            {isSerif ? (
              <>
                <span>{item}</span>
                <BrandOrbIcon />
              </>
            ) : (
              <>
                <span
                  style={{
                    display: "inline-block",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: "var(--orange)",
                    marginRight: "0.85rem",
                  }}
                  aria-hidden="true"
                />
                <span>{item}</span>
              </>
            )}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

