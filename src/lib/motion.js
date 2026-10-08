/**
 * THE INTELLIVERSE — Shared Motion Presets
 * Single source of truth for all Framer Motion + GSAP animation configs.
 * Import from here; never inline magic numbers in components.
 */

/* ── Spring Presets ─────────────────────────────────────────────────────── */
export const springs = {
  /** Slow, organic — hero circles, background elements */
  smooth: { type: "spring", stiffness: 40, damping: 18, mass: 0.8 },
  /** Card interactions — tilt, hover lifts */
  snappy: { type: "spring", stiffness: 280, damping: 22, mass: 0.7 },
  /** Badge pops, chip selects */
  bouncy: { type: "spring", stiffness: 350, damping: 14, mass: 0.6 },
  /** Venn circles, gentle drifts */
  gentle: { type: "spring", stiffness: 120, damping: 28, mass: 1.0 },
  /** Progress bars, width transitions */
  progress: { type: "spring", stiffness: 100, damping: 30, mass: 1.0 },
};

/* ── Easing Curves ──────────────────────────────────────────────────────── */
export const ease = {
  /** easeOutExpo — primary page transitions */
  expo: [0.16, 1, 0.3, 1],
  /** easeOutCubic — micro-interactions */
  cubic: [0.33, 1, 0.68, 1],
  /** easeIn — exit animations */
  in: [0.7, 0, 0.84, 0],
  /** Linear — marquees, looping */
  linear: [0, 0, 1, 1],
};

/* ── Viewport Configs (whileInView) ─────────────────────────────────────── */
export const viewport = {
  /** Standard reveal — fires once, 12% threshold */
  once: { once: true, amount: 0.12, margin: "0px 0px -8% 0px" },
  /** Repeated reveal — for looping elements */
  repeat: { once: false, amount: 0.12, margin: "0px 0px -8% 0px" },
  /** Eager reveal — fire at 5% visible (tall sections) */
  eager: { once: true, amount: 0.05, margin: "0px 0px -4% 0px" },
  /** Late reveal — 25% visible before triggering */
  late: { once: true, amount: 0.25, margin: "0px 0px -12% 0px" },
};

/* ── Common Reveal Variants ─────────────────────────────────────────────── */

/** Slide up from below + fade in */
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: ease.expo },
  },
};

/** Fade in only — no movement */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: ease.cubic },
  },
};

/** Scale up + fade in — cards, chips */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: ease.expo },
  },
};

/** Slide in from left */
export const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: ease.expo },
  },
};

/** Slide in from right */
export const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: ease.expo },
  },
};

/** Clip reveal — for headline lines (parent needs overflow:hidden) */
export const clipUp = {
  hidden: { y: "105%" },
  visible: {
    y: 0,
    transition: { duration: 1, ease: ease.expo },
  },
};

/* ── Stagger Container Factory ──────────────────────────────────────────── */
/**
 * Creates a stagger parent variant.
 * Children are animated by their own variants, staggered by `stagger` seconds.
 */
export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: delay,
      staggerChildren: stagger,
    },
  },
});

/* ── SVG Path Draw ──────────────────────────────────────────────────────── */
/**
 * Animate SVG stroke-dashoffset via pathLength 0→1.
 * Usage: variants={drawPath(1.2, 0.5)} on a <motion.path>
 */
export const drawPath = (duration = 1.2, delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration, ease: ease.expo, delay },
      opacity: { duration: 0.01, delay },
    },
  },
});

/* ── Hover Micro-interactions ───────────────────────────────────────────── */
export const hoverLift = {
  rest: { y: 0, boxShadow: "0 4px 20px -8px rgba(14,27,61,.15)" },
  hover: {
    y: -8,
    boxShadow: "0 40px 70px -32px rgba(14,27,61,.45)",
    transition: springs.snappy,
  },
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: springs.snappy },
  tap: { scale: 0.97, transition: springs.snappy },
};

/* ── Transition Presets ─────────────────────────────────────────────────── */
export const transition = {
  /** Default page-level transition */
  page: { duration: 0.9, ease: ease.expo },
  /** Fast UI response */
  fast: { duration: 0.25, ease: ease.cubic },
  /** Card interactions */
  card: { duration: 0.55, ease: ease.expo },
};
