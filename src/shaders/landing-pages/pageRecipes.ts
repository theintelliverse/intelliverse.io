import {
  GEIST,
  INSTRUMENT_SERIF,
  NEWSREADER,
  type PageFont,
  type PageInlineStyleOverride,
  type PageTypographyRecipe,
} from "./pageTypography";

const n = (value: number) => Number(value.toFixed(3));
const px = (value: number) => `${n(value)}px`;
const unit = (value: number) => `calc(${n(value)} * var(--u))`;

function withAlpha(hex: string, alpha: number) {
  const [red, green, blue] = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

const INSTRUMENT_SERIF_LOADED: PageFont = {
  value: "instrument-serif",
  label: "Instrument Serif",
  stack: '"Instrument Serif", Georgia, "Times New Roman", serif',
};

const NEWSREADER_LOADED: PageFont = {
  value: "newsreader",
  label: "Newsreader",
  stack: '"Newsreader", Georgia, "Times New Roman", serif',
};

export const MENG_TO_SKETCHBOOK_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [INSTRUMENT_SERIF_LOADED, NEWSREADER_LOADED, GEIST],
  bodyFonts: [NEWSREADER_LOADED, GEIST, INSTRUMENT_SERIF_LOADED],
  headingWeights: ["300", "400", "500", "600"],
  headingWeight: "400",
  bodyWeights: ["200", "300", "400", "500", "600"],
  bodyWeight: "400",
  primaryColor: "#2b2721",
  headingSize: [20, 30, 48],
  bodySize: [14, 20, 30],
  headingLetterSpacing: [-0.06, 0.01, 0.12],
  css: (type) => `
:root {
  --ink: ${type.primary};
  --ink-soft: ${withAlpha(type.primary, 0.58)};
  --ink-faint: ${withAlpha(type.primary, 0.36)};
  --hairline: ${withAlpha(type.primary, 0.14)};
  --display: ${type.heading};
  --font: ${type.body};
}
body { font-family: ${type.body}; font-weight: ${type.bodyWeight}; }
.top .name, .plate .t { font-family: ${type.heading}; font-weight: ${type.headingWeight}; }
.top .name {
  font-size: clamp(${px((type.headingSize * 24) / 30)}, calc(${n(type.headingSize / 30)} * 2.4vw), ${px(type.headingSize)});
  letter-spacing: ${type.headingLetterSpacing}em;
}
.plate .t {
  font-size: clamp(${px((type.headingSize * 19) / 30)}, calc(${n(type.headingSize / 30)} * 2.1vw), ${px((type.headingSize * 26) / 30)});
  letter-spacing: ${n(type.headingLetterSpacing - 0.01)}em;
}
.top nav { font-size: ${px((type.bodySize * 15) / 20)}; font-weight: ${type.bodyWeight === "400" ? "300" : type.bodyWeight}; }
.hero-kicker { font-size: ${px((type.bodySize * 12) / 20)}; font-weight: ${type.bodyWeight}; }
.sb-caption { font-size: ${px((type.bodySize * 13) / 20)}; text-align: center; width: 100%; margin: 0 auto; display: block; }
.sb-hint, .section-label, .zoom-read { font-size: ${px((type.bodySize * 11) / 20)}; }
.bio {
  font-size: clamp(${px((type.bodySize * 17) / 20)}, calc(${n(type.bodySize / 20)} * 1.7vw), ${px(type.bodySize)});
  font-weight: ${type.bodyWeight === "400" ? "300" : type.bodyWeight};
}
.plate .n { font-size: ${px((type.bodySize * 12) / 20)}; }
.plate .p { font-size: ${px((type.bodySize * 12.5) / 20)}; }
.foot { font-size: ${px((type.bodySize * 11.5) / 20)}; }
::selection { background: ${withAlpha(type.primary, 0.85)}; }
.bio-link { text-decoration-color: ${withAlpha(type.primary, 0.28)}; }
@media (max-width: 640px) {
  .top .name { font-size: ${px((type.headingSize * 20) / 30)}; }
  .top nav { font-size: ${px((type.bodySize * 13) / 20)}; }
  .hero-kicker { font-size: ${px((type.bodySize * 10.5) / 20)}; text-align: center; }
  .sb-caption { font-size: ${px((type.bodySize * 11) / 20)}; text-align: center; width: 100%; margin: 0 auto; }
  .sb-hint { font-size: ${px((type.bodySize * 9.5) / 20)}; text-align: center; }
}
`,
};

// Stub exports for the other recipe objects referenced in LandingPages
export const ANTHRA_A40_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const ATTUNE_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const AURELLO_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const AXONIS_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const BESTSELLERS_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const BETAWISE_HERO_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const BETAWISE_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const COMPLETE_SHELF_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const INKBOUND_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const ECHO_VALE_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const HALVORSEN_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const KAGE_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const KAIRO_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const MK78_KEYBOARD_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const MARA_VOSS_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const NOEMA_N1_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const RENDERLAB_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const NOCTURNE_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const SYLVA_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const TIDECREST_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
export const VOLTA_ATELIER_TYPOGRAPHY = MENG_TO_SKETCHBOOK_TYPOGRAPHY;
