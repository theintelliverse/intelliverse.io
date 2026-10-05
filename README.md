# The Intelliverse

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## "Overlapping Minds" Custom Cursor System

The Intelliverse features a high-performance, brand-crafted custom cursor powered by GSAP (`gsap.quickTo`) and React context.

### Brand Concept

- **Primary Dot**: 10px solid brand blue (`#3D7BF7`), moves almost instantly (`quickTo` duration 0.08s).
- **Trailing Circles**: 28px Orange (`#FDB347`) and 20px Coral (`#FF6B7B`) following with spring/lerp (0.25s and 0.4s).
- **Section-Aware Blending**: `mix-blend-mode: multiply` on cream sections, `mix-blend-mode: screen` on night sections. Overlapping geometry synthesizes new colors matching the Intelliverse identity.
- **Native Cursor Retention**: Native cursor is hidden (`cursor: none`) **strictly** on elements with active custom cursor interactions; form inputs, select tags, dialogs, iframes, and native text selections preserve native OS behavior.

### Declarative API (Zero-Code Opt-In)

Add attributes directly to any JSX or HTML element:

```html
<!-- Interactive link with magnetic pull -->
<a href="/work" data-cursor="link" data-cursor-magnetic>Case Studies</a>

<!-- Project card with custom label -->
<div data-cursor="view" data-cursor-label="View">...</div>

<!-- Sketchbook or carousel drag area -->
<div data-cursor="drag" data-cursor-label="Flip">...</div>

<!-- Service row with animated light-bulb -->
<div data-cursor="bulb" data-cursor-label="Ideas">...</div>

<!-- Drawing or drafting areas -->
<div data-cursor="pencil" data-cursor-label="Draft">...</div>

<!-- Text selection indicator -->
<input type="text" data-cursor="text" />

<!-- Native cursor safe-zone (e.g. iframes, video players) -->
<iframe src="..." data-cursor="hide" />

<!-- Declare section theme for smooth color/blend-mode switching -->
<section data-theme="cream">...</section>
<section data-theme="night">...</section>
```

### How to Add a New Cursor Variant

Follow these 4 simple steps:

1. **Register the variant type**:
   Open [`src/components/cursor/CursorProvider.tsx`](file:///src/components/cursor/CursorProvider.tsx) and append your new variant name to `CursorVariant`:

   ```typescript
   export type CursorVariant =
     | "default"
     | "link"
     | "view"
     | "drag"
     | "pencil"
     | "bulb"
     | "text"
     | "hide"
     | "press"
     | "loupe"
     | "your-new-variant"; // <-- Add here
   ```

2. **Add variant GSAP timeline animation**:
   In [`src/components/cursor/Cursor.tsx`](file:///src/components/cursor/Cursor.tsx), add a case to the `switch (variant)` block inside `useEffect`:

   ```typescript
   case "your-new-variant":
     tl.to(dot, {
       width: 64,
       height: 64,
       backgroundColor: "var(--indigo)",
       opacity: 0.95,
       duration: 0.35,
       ease: "power3.out",
     }, 0);
     tl.to(orange, { scale: 0.5, opacity: 0.4, duration: 0.3 }, 0);
     tl.to(coral, { scale: 0.3, opacity: 0.2, duration: 0.3 }, 0);
     break;
   ```

3. **Render custom icon / SVG markup (if applicable)**:
   In the JSX return of [`src/components/cursor/Cursor.tsx`](file:///src/components/cursor/Cursor.tsx), add the visual elements inside `#custom-cursor-dot`:

   ```tsx
   {variant === "your-new-variant" && (
     <svg className="your-variant-svg" width="24" height="24" viewBox="0 0 24 24">
       ...
     </svg>
   )}
   ```

4. **Use declaratively anywhere in your app**:

   ```html
   <div data-cursor="your-new-variant" data-cursor-label="Custom">...</div>
   ```

---

### Accessibility & Performance Guardrails

- **Device Capability Check**: Only activates on `(hover: hover) and (pointer: fine)`. Touch devices, tablets, and mobile browsers render zero DOM nodes and retain standard OS touch behavior.
- **Prefers Reduced Motion**: Automatically detects `(prefers-reduced-motion: reduce)`; disables trailing circles, velocity squash/stretch, magnetic pull, and ripples, falling back to a clean single dot.
- **Accessible Focus Indicators**: Every interactive button and link retains visible `:focus-visible` styling (`2px solid var(--blue-deep)` with `2px offset`).
- **User Preference Toggle**: Included in the footer (`Custom cursor: on/off`) and persisted across visits in `localStorage` under `"the-intelliverse-custom-cursor"`.
- **Dynamic Lazy Loading**: Imported via `next/dynamic` with `ssr: false` to avoid SSR hydration mismatches, layout shifts, or main-thread blocking during initial paint (LCP).
- **Background Pause**: Listens for `visibilitychange` to automatically pause all RAF animation ticks when the tab is blurred or hidden.
