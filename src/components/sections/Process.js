"use client";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PROCESS / HOW WE WORK SECTION (#how, .process-pinsec)
 * ─────────────────────────────────────────────────────────────────────────────
 * High-performance scroll-driven pinned architecture flywheel engineered with
 * GSAP 3 + ScrollTrigger + @gsap/react useGSAP, synced with Lenis smooth scrolling.
 *
 * Core Features:
 *  A) Viewport entry sequence with staggered typography and panel scale-in.
 *  B) 3-phase pinned master scrub timeline (300% scroll distance):
 *     - Phase 1: Problem map (nodes 1-2, edge 1 draw, "1-hr call" label)
 *     - Phase 2: Decision log (node 3, edge 2, "you approve", 3 decision callouts)
 *     - Phase 3: Ship & journal (edges 3-5, nodes 4-6, animated infinite dashed loop)
 *     - Real-time left-column step active state & progress bar syncing (10% to 100%)
 *  C) Tab cross-fading (Architecture / Shipped Products / Studio Telemetry) with
 *     animated sliding pill indicator and product card entrance stagger.
 *  D) Micro-interactions:
 *     - QuickTo-driven node lift (y: -3) and pulsing status bead on hover
 *     - Subtle 3D tilt (max 6deg) and floating background glyph on product cards
 *  E) Performance & responsive standards:
 *     - Dynamic stroke-dasharray calculated via path.getTotalLength()
 *     - gsap.matchMedia for desktop-only pinned scrub (>= 1024px)
 *     - Respectful prefers-reduced-motion fallback
 *     - Zero layout shift with upfront gsap.set initializations
 *     - Automatic context cleanup on unmount
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import StudioTelemetryCard from "@/components/ui/StudioTelemetryCard";

// Register core plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const DEFAULT_STAGES = [
  {
    num: "01",
    tag: "DISCOVER",
    title: "Map the problem",
    description:
      "Who touches what, and where it hurts. We audit architectural bottlenecks, map critical edge cases, and clarify system specs on one sheet before committing a single line of code.",
    deliverables: ["Architectural Spec", "System Map", "1-Hour Brief"],
    color: "#5B3FD9",
  },
  {
    num: "02",
    tag: "ARCHITECT",
    title: "Log every decision",
    description:
      "Each call gets a number and a reason, so you can read why it was built this way. Modular services progress in synchronized sprints with type-safe APIs and weekly playable demos.",
    deliverables: ["Decision Log", "Next.js & APIs", "Weekly Demos"],
    color: "#3D7BF7",
  },
  {
    num: "03",
    tag: "SHIP & SCALE",
    title: "Ship, then keep the journal",
    description:
      "Weekly demos, an automated zero-downtime launch, and a public log of what changed. Post-launch telemetry monitors Core Web Vitals and edge latency percentiles in real time.",
    deliverables: ["Zero-Downtime Pipeline", "Public Journal", "24/7 Telemetry"],
    color: "#FF6B7B",
  },
];

export default function Process({ data }) {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  // Left column elements
  const eyebrowRef = useRef(null);
  const h2Ref = useRef(null);
  const descRef = useRef(null);
  const stepsListRef = useRef(null);
  const progBarRef = useRef(null);

  // Right column stage elements
  const stageRef = useRef(null);
  const gridBgRef = useRef(null);
  const statusDotRef = useRef(null);
  const statusLabelRef = useRef(null);

  // Tab views
  const dgRef = useRef(null);
  const shipvRef = useRef(null);
  const telemRef = useRef(null);

  // Tab switcher buttons & sliding pill
  const tabPillRef = useRef(null);
  const tabBtnArchRef = useRef(null);
  const tabBtnShipRef = useRef(null);
  const tabBtnTelemRef = useRef(null);

  // Active tab state
  const [activeTab, setActiveTab] = useState("diagram"); // "diagram" | "products" | "telemetry"
  const scrollTriggerRef = useRef(null);

  // ───────────────────────────────────────────────────────────────────────────
  // MASTER GSAP & SCROLLTRIGGER INITIALIZATION VIA useGSAP
  // ───────────────────────────────────────────────────────────────────────────
  useGSAP(
    () => {
      if (!sectionRef.current || !pinRef.current) return;

      const mm = gsap.matchMedia();

      // ───────────────────────────────────────────────────────────────────────
      // 1. DESKTOP PINNED SCRUB TIMELINE (min-width: 1024px)
      // ───────────────────────────────────────────────────────────────────────
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions;

          const dg = dgRef.current;
          if (!dg) return;

          // Gather SVG elements
          const edge0 = dg.querySelector(".edge-0");
          const edge1 = dg.querySelector(".edge-1");
          const edge2 = dg.querySelector(".edge-2");
          const edge3 = dg.querySelector(".edge-3");
          const edge4 = dg.querySelector(".edge-4");
          const loopEdge = dg.querySelector(".edge-loop");

          const elab0 = dg.querySelector(".elab-0");
          const elab1 = dg.querySelector(".elab-1");
          const elab2 = dg.querySelector(".elab-2");
          const elab3 = dg.querySelector(".elab-3");
          const elab4 = dg.querySelector(".elab-4");
          const elab5 = dg.querySelector(".elab-5");

          const node1 = dg.querySelector(".node-1");
          const node2 = dg.querySelector(".node-2");
          const node3 = dg.querySelector(".node-3");
          const node4 = dg.querySelector(".node-4");
          const node5 = dg.querySelector(".node-5");
          const node6 = dg.querySelector(".node-6");

          const dec1Paths = dg.querySelectorAll(".dec-1 path");
          const dec1Text = dg.querySelector(".dec-1 .txt");

          const dec2Paths = dg.querySelectorAll(".dec-2 path");
          const dec2Text = dg.querySelector(".dec-2 .txt");

          const dec3Paths = dg.querySelectorAll(".dec-3 path");
          const dec3Text = dg.querySelector(".dec-3 .txt");

          const allNodes = [node1, node2, node3, node4, node5, node6].filter(Boolean);
          const allEdges = [edge0, edge1, edge2, edge3, edge4].filter(Boolean);
          const allElabs = [elab0, elab1, elab2, elab3, elab4, elab5].filter(Boolean);
          const allDecPaths = [...dec1Paths, ...dec2Paths, ...dec3Paths];
          const allDecTexts = [dec1Text, dec2Text, dec3Text].filter(Boolean);

          // Calculate path lengths dynamically
          allEdges.forEach((p) => {
            const len = p.getTotalLength();
            p._totalLen = len;
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
          });

          allDecPaths.forEach((p) => {
            const len = p.getTotalLength();
            p._totalLen = len;
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
          });

          // ── REDUCED MOTION BRANCH ──────────────────────────────────────────
          if (reduceMotion) {
            gsap.set([eyebrowRef.current, h2Ref.current, descRef.current, stageRef.current, gridBgRef.current], {
              opacity: 1,
              y: 0,
              scale: 1,
            });
            gsap.set(allNodes, { opacity: 1, scale: 1, transformOrigin: "50% 50%" });
            gsap.set(allEdges, { strokeDashoffset: 0 });
            gsap.set(allElabs, { opacity: 1, y: 0 });
            gsap.set(allDecPaths, { strokeDashoffset: 0 });
            gsap.set(allDecTexts, { opacity: 1, y: 0 });
            if (loopEdge) gsap.set(loopEdge, { opacity: 1 });
            if (progBarRef.current) progBarRef.current.style.width = "100%";
            if (statusLabelRef.current) statusLabelRef.current.textContent = "Complete";
            if (statusDotRef.current) statusDotRef.current.style.backgroundColor = "var(--live)";
            return;
          }

          if (!isDesktop) return;

          // ── INITIAL STATES (ZERO LAYOUT SHIFT / FLICKER) ───────────────────
          gsap.set(allNodes, {
            opacity: 0,
            scale: 0.8,
            transformOrigin: "50% 50%",
            force3D: true,
          });
          gsap.set(allElabs, { opacity: 0, y: 4 });
          gsap.set(allDecTexts, { opacity: 0, y: 4 });
          if (loopEdge) gsap.set(loopEdge, { opacity: 0 });

          // Position sliding tab pill on initial tab
          if (tabPillRef.current && tabBtnArchRef.current) {
            gsap.set(tabPillRef.current, {
              x: tabBtnArchRef.current.offsetLeft,
              width: tabBtnArchRef.current.offsetWidth,
            });
          }

          // Subtle moving dash tween on loopEdge
          const dashLoopTween = gsap.to(loopEdge, {
            strokeDashoffset: -24,
            duration: 1.6,
            repeat: -1,
            ease: "none",
            paused: true,
          });

          // ── A) VIEWPORT ENTRY ANIMATION (ON ENTER VIEWPORT ONCE) ────────────
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              const entryTl = gsap.timeline({ defaults: { ease: "power3.out" } });
              entryTl
                .fromTo(eyebrowRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
                .fromTo(h2Ref.current, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75 }, "-=0.4")
                .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.45")
                .fromTo(stageRef.current, { scale: 0.98, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.85, ease: "expo.out" }, "-=0.55")
                .fromTo(gridBgRef.current, { opacity: 0 }, { opacity: 0.75, duration: 0.8 }, "-=0.6");
            },
          });

          // ── B) PINNED MASTER SCRUB TIMELINE (DURATION: 10 UNITS) ───────────
          const masterTl = gsap.timeline({ paused: true });

          // ── PHASE 1: Step 01 "Map the problem" (t: 0.0 -> 3.0) ─────────────
          masterTl
            .to([node1, node2], { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)", stagger: 0.15 }, 0.0)
            .to(edge0, { strokeDashoffset: 0, duration: 1.4, ease: "none" }, 0.4)
            .to(elab0, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.8);

          // ── PHASE 2: Step 02 "Log every decision" (t: 3.0 -> 6.2) ──────────
          masterTl
            .to(node3, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" }, 3.0)
            .to(edge1, { strokeDashoffset: 0, duration: 1.2, ease: "none" }, 3.4)
            .to(elab1, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 3.8)
            // Decision Callout 1 (Coral)
            .to(dec1Paths, { strokeDashoffset: 0, duration: 0.7, ease: "none" }, 4.3)
            .to(dec1Text, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 4.7)
            // Decision Callout 2 (Indigo)
            .to(dec2Paths, { strokeDashoffset: 0, duration: 0.7, ease: "none" }, 4.9)
            .to(dec2Text, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 5.3)
            // Decision Callout 3 (Deep Blue)
            .to(dec3Paths, { strokeDashoffset: 0, duration: 0.7, ease: "none" }, 5.5)
            .to(dec3Text, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 5.9);

          // ── PHASE 3: Step 03 "Ship, then keep the journal" (t: 6.2 -> 10.0) ─
          masterTl
            // Sprints & Weekly Demos
            .to(edge2, { strokeDashoffset: 0, duration: 0.8, ease: "none" }, 6.2)
            .to(elab2, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 6.5)
            .to(node4, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" }, 6.7)
            // Launch
            .to(edge3, { strokeDashoffset: 0, duration: 0.8, ease: "none" }, 7.1)
            .to(elab3, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 7.4)
            .to(node5, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" }, 7.6)
            // Public Journal
            .to(edge4, { strokeDashoffset: 0, duration: 0.8, ease: "none" }, 8.0)
            .to(elab4, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 8.3)
            .to(node6, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" }, 8.5)
            // Dashed Loop Edge & "next iteration"
            .to(loopEdge, { opacity: 1, duration: 0.6, ease: "power2.out" }, 9.0)
            .to(elab5, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 9.2);

          // ── ATTACH SCROLLTRIGGER TO PINNED CONTAINER ───────────────────────
          const st = ScrollTrigger.create({
            trigger: sectionRef.current,
            pin: pinRef.current,
            scrub: 0.6,
            start: "top top",
            end: "+=300%",
            anticipatePin: 1,
            invalidateOnRefresh: true,
            animation: masterTl,
            onUpdate: (self) => {
              const p = self.progress;

              // 1. Interpolate progress bar width: 10% to 100%
              if (progBarRef.current) {
                progBarRef.current.style.width = `${Math.min(100, 10 + p * 90)}%`;
              }

              // 2. Sync left column 3 steps
              let currentStep = 0;
              if (p >= 0.64) {
                currentStep = 2;
              } else if (p >= 0.32) {
                currentStep = 1;
              } else {
                currentStep = 0;
              }

              const lis = stepsListRef.current?.querySelectorAll("li");
              if (lis) {
                lis.forEach((li, idx) => {
                  if (idx === currentStep) {
                    if (!li.classList.contains("on")) li.classList.add("on");
                  } else {
                    if (li.classList.contains("on")) li.classList.remove("on");
                  }
                });
              }

              // 3. Status label update: "Drawing…" vs "Complete"
              if (statusLabelRef.current && statusDotRef.current) {
                if (p >= 0.98) {
                  statusLabelRef.current.textContent = "Complete";
                  statusLabelRef.current.style.color = "var(--live, #22A55B)";
                  statusDotRef.current.style.backgroundColor = "var(--live, #22A55B)";
                } else {
                  statusLabelRef.current.textContent = "Drawing…";
                  statusLabelRef.current.style.color = "var(--blue-deep, #2F63E0)";
                  statusDotRef.current.style.backgroundColor = "var(--blue, #3D7BF7)";
                }
              }

              // 4. Subtle loop dash animation trigger
              if (p >= 0.88) {
                if (dashLoopTween.paused()) dashLoopTween.play();
              } else {
                if (!dashLoopTween.paused()) dashLoopTween.pause();
              }
            },
          });

          scrollTriggerRef.current = st;

          // ── D) MICRO-INTERACTIONS: QUICKTO FOR NODE HOVER ──────────────────
          allNodes.forEach((node) => {
            const yQuick = gsap.quickTo(node, "y", { duration: 0.25, ease: "power2.out" });
            const dot = node.querySelector("circle");

            node.addEventListener("mouseenter", () => {
              yQuick(-3);
              if (dot) {
                gsap.to(dot, {
                  scale: 1.4,
                  duration: 0.3,
                  yoyo: true,
                  repeat: 1,
                  transformOrigin: "center center",
                  ease: "power1.inOut",
                });
              }
            });

            node.addEventListener("mouseleave", () => {
              yQuick(0);
            });
          });

          // ── D) MICRO-INTERACTIONS: PRODUCT CARDS 3D TILT ───────────────────
          const prodCards = shipvRef.current?.querySelectorAll(".process-prod");
          if (prodCards) {
            prodCards.forEach((card) => {
              const gl = card.querySelector(".gl");

              const handleMouseMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                const tiltX = -y * 6; // max 6deg
                const tiltY = x * 6;

                gsap.to(card, {
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformPerspective: 800,
                  duration: 0.3,
                  ease: "power2.out",
                });

                if (gl) {
                  gsap.to(gl, {
                    x: x * 14,
                    y: y * 14,
                    duration: 0.4,
                    ease: "power2.out",
                  });
                }
              };

              const handleMouseLeave = () => {
                gsap.to(card, {
                  rotateX: 0,
                  rotateY: 0,
                  duration: 0.5,
                  ease: "power2.out",
                });
                if (gl) {
                  gsap.to(gl, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                  });
                }
              };

              card.addEventListener("mousemove", handleMouseMove);
              card.addEventListener("mouseleave", handleMouseLeave);
            });
          }
        }
      );

      // Refresh ScrollTrigger once fonts and images are ready
      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });
      }

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  // ───────────────────────────────────────────────────────────────────────────
  // C) TAB CROSS-FADE CONTROLLER (Architecture / Shipped / Telemetry)
  // ───────────────────────────────────────────────────────────────────────────
  const handleTabSwitch = (targetTab) => {
    setActiveTab(targetTab);

    // 1. Animate sliding pill background
    const pill = tabPillRef.current;
    const btnMap = {
      diagram: tabBtnArchRef.current,
      products: tabBtnShipRef.current,
      telemetry: tabBtnTelemRef.current,
    };
    const activeBtn = btnMap[targetTab];
    if (pill && activeBtn) {
      gsap.to(pill, {
        x: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        duration: 0.35,
        ease: "power3.out",
      });
    }

    // 2. Animate button text colors
    [tabBtnArchRef.current, tabBtnShipRef.current, tabBtnTelemRef.current].forEach((btn) => {
      if (!btn) return;
      const isTarget = btn === activeBtn;
      gsap.to(btn, {
        color: isTarget ? "#ffffff" : "var(--ink-2)",
        duration: 0.25,
        ease: "power2.out",
      });
    });

    // 3. Cross-fade stage panels (opacity + y:12, 0.4s, power2.out)
    const views = [
      { id: "diagram", el: dgRef.current },
      { id: "products", el: shipvRef.current },
      { id: "telemetry", el: telemRef.current },
    ];

    views.forEach(({ id, el }) => {
      if (!el) return;
      if (id === targetTab) {
        el.style.visibility = "visible";
        el.style.pointerEvents = "auto";
        gsap.fromTo(
          el,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );

        // Stagger product cards if entering Shipped Products
        if (id === "products") {
          const cards = el.querySelectorAll(".process-prod");
          if (cards.length) {
            gsap.fromTo(
              cards,
              { y: 24, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.45, stagger: 0.12, ease: "power3.out" }
            );
          }
        }
      } else {
        gsap.to(el, {
          opacity: 0,
          y: -8,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            el.style.visibility = "hidden";
            el.style.pointerEvents = "none";
          },
        });
      }
    });
  };

  // ───────────────────────────────────────────────────────────────────────────
  // CLICKING A LEFT-COLUMN STEP: JUMP TO THE CORRESPONDING TIMELINE PROGRESS
  // ───────────────────────────────────────────────────────────────────────────
  const handleStepClick = (index) => {
    if (activeTab !== "diagram") {
      handleTabSwitch("diagram");
    }

    const st = scrollTriggerRef.current;
    if (!st) return;

    const targetProgress = index === 0 ? 0.05 : index === 1 ? 0.45 : 0.85;
    const targetScroll = st.start + (st.end - st.start) * targetProgress;

    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef}>
      {/* ── DESKTOP PINNED EXPERIENCE (Sticky 300% GSAP Pin Track) ─────────── */}
      <section
        id="how"
        ref={sectionRef}
        className="hidden lg:block process-pinsec"
        style={{
          backgroundColor: "var(--bg-2, #F6F7FC)",
          color: "var(--ink, #0E1B3D)",
          borderTop: "1px solid var(--line, rgba(14,27,61,0.1))",
          borderBottom: "1px solid var(--line, rgba(14,27,61,0.1))",
        }}
      >
        <div ref={pinRef} className="process-pin">
          <div
            className="container-site w-full"
            style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 2.5rem" }}
          >
            <div className="process-sys">
              {/* ── LEFT COLUMN: Methodology Steps & Dynamic Progress ──────── */}
              <div className="process-sys-l">
                <div>
                  {/* Eyebrow tag */}
                  <div
                    ref={eyebrowRef}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      color: "var(--ink-2)",
                      fontFamily: "var(--mono)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                    }}
                  >
                    <span style={{ color: "var(--blue-deep)", fontWeight: 700 }}>02</span>
                    <span>How we work · Every project</span>
                    <span className="pulse-dot" />
                  </div>

                  {/* Headline */}
                  <h2 ref={h2Ref}>Every project starts on the same sheet.</h2>
                  <p
                    ref={descRef}
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: "1.05rem",
                      color: "var(--ink-2)",
                      lineHeight: 1.55,
                      marginTop: "0.75rem",
                      maxWidth: "23rem",
                    }}
                  >
                    Execution Flywheel &amp; System Architecture. From discovery to scale.
                  </p>
                </div>

                {/* The 3 Sequential Steps */}
                <div>
                  <ol ref={stepsListRef} className="process-steps">
                    {/* Step 01 */}
                    <li className="on" onClick={() => handleStepClick(0)}>
                      <span className="no">01</span>
                      <div>
                        <h4>Map the problem</h4>
                        <p>Who touches what, and where it hurts. One sheet, before any code.</p>
                      </div>
                    </li>

                    {/* Step 02 */}
                    <li onClick={() => handleStepClick(1)}>
                      <span className="no">02</span>
                      <div>
                        <h4>Log every decision</h4>
                        <p>Each call gets a number and a reason, so you can read why it was built this way.</p>
                      </div>
                    </li>

                    {/* Step 03 */}
                    <li onClick={() => handleStepClick(2)}>
                      <span className="no">03</span>
                      <div>
                        <h4>Ship, then keep the journal</h4>
                        <p>Weekly demos, a launch, and a public log of what changed.</p>
                      </div>
                    </li>
                  </ol>

                  {/* Multi-colored Progress Bar */}
                  <div className="process-prog">
                    <i ref={progBarRef} style={{ width: "10%" }} />
                  </div>

                  {/* Quick CTAs */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.25rem",
                      marginTop: "1.5rem",
                      fontFamily: "var(--mono)",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                    }}
                  >
                    <a
                      href="#projects"
                      style={{
                        color: "var(--blue-deep)",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      Read the journals <span>↓</span>
                    </a>
                    <span>·</span>
                    <a
                      href="#estimator"
                      style={{
                        color: "var(--ink)",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      Open a brief <span>→</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN: Technical Stage (Interactive SVG & Views) ── */}
              <div ref={stageRef} className="process-stage">
                <div ref={gridBgRef} className="grid-bg" />

                {/* Stage Header */}
                <div className="process-stage-h">
                  <div className="flex items-center gap-3">
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        color: "var(--ink)",
                      }}
                    >
                      Sheet 00 / The Intelliverse way
                    </span>
                  </div>

                  {/* Mode switcher tabs with sliding pill indicator */}
                  <div className="relative flex items-center bg-[rgba(14,27,61,0.06)] p-1 rounded-full border border-[var(--line)]">
                    <div ref={tabPillRef} className="process-tab-pill" />
                    <button
                      ref={tabBtnArchRef}
                      type="button"
                      onClick={() => handleTabSwitch("diagram")}
                      style={{
                        position: "relative",
                        zIndex: 2,
                        fontFamily: "var(--mono)",
                        fontSize: "0.625rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "999px",
                        backgroundColor: "transparent",
                        color: "#fff",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Architecture
                    </button>
                    <button
                      ref={tabBtnShipRef}
                      type="button"
                      onClick={() => handleTabSwitch("products")}
                      style={{
                        position: "relative",
                        zIndex: 2,
                        fontFamily: "var(--mono)",
                        fontSize: "0.625rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "999px",
                        backgroundColor: "transparent",
                        color: "var(--ink-2)",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Shipped Products
                    </button>
                    <button
                      ref={tabBtnTelemRef}
                      type="button"
                      onClick={() => handleTabSwitch("telemetry")}
                      style={{
                        position: "relative",
                        zIndex: 2,
                        fontFamily: "var(--mono)",
                        fontSize: "0.625rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "999px",
                        backgroundColor: "transparent",
                        color: "var(--ink-2)",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Studio Telemetry
                    </button>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2">
                    <span
                      ref={statusDotRef}
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "var(--blue, #3D7BF7)",
                        transition: "background-color 0.3s ease",
                      }}
                    />
                    <span
                      ref={statusLabelRef}
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.06em",
                        color: "var(--blue-deep, #2F63E0)",
                        fontWeight: 600,
                        transition: "color 0.3s ease",
                      }}
                    >
                      Drawing…
                    </span>
                  </div>
                </div>

                {/* ── VIEW 1: Interactive SVG Flywheel Diagram ─────────────── */}
                <svg
                  ref={dgRef}
                  className="process-dg"
                  viewBox="0 0 800 520"
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {/* Connecting Edges */}
                  <path className="edge edge-0" d="M200 108 L 312 108" />
                  <path className="edge edge-1" d="M482 108 L 594 108" />
                  <path className="edge edge-2" d="M680 145 L 680 330" />
                  <path className="edge edge-3" d="M594 368 L 482 368" />
                  <path className="edge edge-4" d="M312 368 L 200 368" />
                  <path className="edge dash edge-loop" d="M115 330 L 115 145" />

                  {/* Flow Milestone Labels */}
                  <text className="elab elab-0" x="222" y="98">
                    1-hr call
                  </text>
                  <text className="elab elab-1" x="506" y="98">
                    you approve
                  </text>
                  <text className="elab elab-2" x="692" y="242">
                    sprints
                  </text>
                  <text className="elab elab-3" x="500" y="358">
                    every friday
                  </text>
                  <text className="elab elab-4" x="226" y="358">
                    go live
                  </text>
                  <text className="elab elab-5" x="126" y="242">
                    next iteration
                  </text>

                  {/* ── 6 SYSTEM NODES ── */}
                  {/* Node 1: Your Problem */}
                  <g className="node node-1">
                    <rect x="30" y="72" width="170" height="74" rx="10" />
                    <circle cx="182" cy="90" r="7" fill="#5B3FD9" />
                    <text className="lab" x="46" y="97">
                      STEP 1
                    </text>
                    <text className="nm" x="46" y="125">
                      Your problem
                    </text>
                  </g>

                  {/* Node 2: System Map */}
                  <g className="node node-2">
                    <rect x="312" y="72" width="170" height="74" rx="10" />
                    <circle cx="464" cy="90" r="7" fill="#3D7BF7" />
                    <text className="lab" x="328" y="97">
                      STEP 2
                    </text>
                    <text className="nm" x="328" y="125">
                      System map
                    </text>
                  </g>

                  {/* Node 3: Decision Log */}
                  <g className="node node-3">
                    <rect x="594" y="72" width="170" height="74" rx="10" />
                    <circle cx="746" cy="90" r="7" fill="#FF6B7B" />
                    <text className="lab" x="610" y="97">
                      STEP 3
                    </text>
                    <text className="nm" x="610" y="125">
                      Decision log
                    </text>
                  </g>

                  {/* Node 4: Weekly Demos */}
                  <g className="node node-4">
                    <rect x="594" y="332" width="170" height="74" rx="10" />
                    <circle cx="746" cy="350" r="7" fill="#FDB347" />
                    <text className="lab" x="610" y="357">
                      STEP 4
                    </text>
                    <text className="nm" x="610" y="385">
                      Weekly demos
                    </text>
                  </g>

                  {/* Node 5: Launch */}
                  <g className="node node-5">
                    <rect x="312" y="332" width="170" height="74" rx="10" />
                    <circle cx="464" cy="350" r="7" fill="#5B3FD9" />
                    <text className="lab" x="328" y="357">
                      STEP 5
                    </text>
                    <text className="nm" x="328" y="385">
                      Launch
                    </text>
                  </g>

                  {/* Node 6: Public Journal */}
                  <g className="node node-6">
                    <rect x="30" y="332" width="170" height="74" rx="10" />
                    <circle cx="182" cy="350" r="7" fill="#3D7BF7" />
                    <text className="lab" x="46" y="357">
                      STEP 6
                    </text>
                    <text className="nm" x="46" y="385">
                      Public journal
                    </text>
                  </g>

                  {/* ── 3 HANDWRITTEN DECISION ANNOTATIONS ── */}
                  {/* Annotation 1 (Coral) */}
                  <g className="dec dec-1">
                    <path d="M640 160 C 610 210, 560 220, 520 222" stroke="#FF6B7B" />
                    <path d="M528 214 L 518 222 L 530 229" stroke="#FF6B7B" />
                    <text className="txt" x="320" y="228" fill="#FF6B7B">
                      you see why, not just what
                    </text>
                  </g>

                  {/* Annotation 2 (Indigo) */}
                  <g className="dec dec-2">
                    <path d="M690 420 C 690 450, 650 470, 610 472" stroke="#5B3FD9" />
                    <path d="M618 465 L 608 472 L 619 479" stroke="#5B3FD9" />
                    <text className="txt" x="420" y="478" fill="#5B3FD9">
                      no 3-month silences
                    </text>
                  </g>

                  {/* Annotation 3 (Deep Blue) */}
                  <g className="dec dec-3">
                    <path d="M115 420 C 115 450, 150 470, 190 472" stroke="#2F63E0" />
                    <path d="M182 465 L 192 472 L 181 479" stroke="#2F63E0" />
                    <text className="txt" x="198" y="478" fill="#2F63E0">
                      every project gets one
                    </text>
                  </g>
                </svg>

                {/* ── VIEW 2: Shipped Products ("Sheets that became products") ─ */}
                <div ref={shipvRef} className="process-shipv">
                  <div className="hd">
                    <h3>Sheets that became products.</h3>
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.08em",
                        color: "var(--ink-3)",
                        textTransform: "uppercase",
                      }}
                    >
                      2 live · more on the bench
                    </span>
                  </div>

                  <div className="process-prods">
                    {/* Product 1: Appointory */}
                    <a className="process-prod" href="#projects">
                      <div className="top process-ap">
                        <span className="gl">A</span>
                        <div className="mk">A</div>
                        <div>
                          <h4>Appointory</h4>
                          <p>Care without the waiting room.</p>
                        </div>
                      </div>
                      <div className="bt">
                        <span>Healthcare · own</span>
                        <b>Journal →</b>
                      </div>
                    </a>

                    {/* Product 2: Vrix Jewellery */}
                    <a className="process-prod" href="#projects">
                      <div className="top process-vx">
                        <span className="gl" style={{ color: "#C8A46A", opacity: 0.18 }}>
                          V
                        </span>
                        <div className="mk">V</div>
                        <div>
                          <h4>
                            Vrix <em>Jewellery</em>
                          </h4>
                          <p>Luxury, priced for every country.</p>
                        </div>
                      </div>
                      <div className="bt">
                        <span>E-commerce · client</span>
                        <b>Journal →</b>
                      </div>
                    </a>

                    {/* Product 3: Your Sheet */}
                    <a className="process-prod you" href="#estimator">
                      <span className="hand">
                        Your sheet
                        <br />
                        goes here
                      </span>
                      <span className="mono">Open a brief →</span>
                    </a>
                  </div>
                </div>

                {/* ── VIEW 3: Live Studio Telemetry Card Overlay ───────────── */}
                <div ref={telemRef} className="process-telemetry-view">
                  <div style={{ maxWidth: "480px", width: "100%" }}>
                    <StudioTelemetryCard initialCount={302} showFullLogs={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE / TABLET EXPERIENCE (< lg) ─────────────────────────────── */}
      <section
        className="block lg:hidden py-16 px-6"
        style={{
          backgroundColor: "var(--bg-2, #F6F7FC)",
          color: "var(--ink, #0E1B3D)",
          borderTop: "1px solid var(--line, rgba(14,27,61,0.1))",
          borderBottom: "1px solid var(--line, rgba(14,27,61,0.1))",
        }}
      >
        <div className="max-w-xl mx-auto">
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--mono)",
              fontSize: "0.6875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--blue-deep)",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            <span>02 · How we work</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(2.25rem, 6vw, 3rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "0.75rem",
            }}
          >
            Every project starts on the same sheet.
          </h2>

          <p
            style={{
              fontFamily: "var(--sans)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--ink-2)",
              marginBottom: "1.75rem",
            }}
          >
            Execution Flywheel &amp; System Architecture. From discovery to scale.
          </p>

          {/* Interactive Mobile Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("diagram")}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                padding: "0.4rem 0.85rem",
                borderRadius: "999px",
                border: "1px solid var(--line)",
                backgroundColor: activeTab === "diagram" ? "var(--ink)" : "var(--card)",
                color: activeTab === "diagram" ? "#fff" : "var(--ink-2)",
                fontWeight: 600,
              }}
            >
              The System
            </button>
            <button
              onClick={() => setActiveTab("products")}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                padding: "0.4rem 0.85rem",
                borderRadius: "999px",
                border: "1px solid var(--line)",
                backgroundColor: activeTab === "products" ? "var(--ink)" : "var(--card)",
                color: activeTab === "products" ? "#fff" : "var(--ink-2)",
                fontWeight: 600,
              }}
            >
              Shipped Products
            </button>
            <button
              onClick={() => setActiveTab("telemetry")}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                padding: "0.4rem 0.85rem",
                borderRadius: "999px",
                border: "1px solid var(--line)",
                backgroundColor: activeTab === "telemetry" ? "var(--ink)" : "var(--card)",
                color: activeTab === "telemetry" ? "#fff" : "var(--ink-2)",
                fontWeight: 600,
              }}
            >
              Telemetry
            </button>
          </div>

          {/* Mobile Tab Content */}
          {activeTab === "diagram" && (
            <div className="space-y-4">
              <div
                style={{
                  border: "1px solid var(--line-2)",
                  borderRadius: "16px",
                  backgroundColor: "#fff",
                  padding: "1rem",
                  boxShadow: "0 10px 30px -15px rgba(14,27,61,0.1)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.625rem",
                    color: "var(--ink-3)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Sheet 00 / The Intelliverse Way</span>
                  <span style={{ color: "var(--blue-deep)", fontWeight: 600 }}>Architecture</span>
                </div>
                <svg viewBox="0 0 800 520" className="w-full h-auto">
                  <path className="edge" d="M200 108 L 312 108" stroke="var(--ink)" strokeWidth="1.6" fill="none" />
                  <path className="edge" d="M482 108 L 594 108" stroke="var(--ink)" strokeWidth="1.6" fill="none" />
                  <path className="edge" d="M680 145 L 680 330" stroke="var(--ink)" strokeWidth="1.6" fill="none" />
                  <path className="edge" d="M594 368 L 482 368" stroke="var(--ink)" strokeWidth="1.6" fill="none" />
                  <path className="edge" d="M312 368 L 200 368" stroke="var(--ink)" strokeWidth="1.6" fill="none" />
                  <path className="edge dash" d="M115 330 L 115 145" stroke="var(--ink)" strokeWidth="1.6" strokeDasharray="6 6" fill="none" />

                  <text className="elab" x="222" y="98" fontFamily="var(--mono)" fontSize="11" fill="var(--ink-2)">
                    1-hr call
                  </text>
                  <text className="elab" x="506" y="98" fontFamily="var(--mono)" fontSize="11" fill="var(--ink-2)">
                    you approve
                  </text>
                  <text className="elab" x="692" y="242" fontFamily="var(--mono)" fontSize="11" fill="var(--ink-2)">
                    sprints
                  </text>
                  <text className="elab" x="500" y="358" fontFamily="var(--mono)" fontSize="11" fill="var(--ink-2)">
                    every friday
                  </text>
                  <text className="elab" x="226" y="358" fontFamily="var(--mono)" fontSize="11" fill="var(--ink-2)">
                    go live
                  </text>

                  <g className="node">
                    <rect x="30" y="72" width="170" height="74" rx="10" fill="#fff" stroke="var(--ink)" strokeWidth="1.6" />
                    <circle cx="182" cy="90" r="7" fill="#5B3FD9" />
                    <text x="46" y="97" fontFamily="var(--mono)" fontSize="11" fill="var(--ink-3)">
                      STEP 1
                    </text>
                    <text x="46" y="125" fontFamily="var(--sans)" fontWeight="700" fontSize="17" fill="var(--ink)">
                      Your problem
                    </text>
                  </g>
                  <g className="node">
                    <rect x="312" y="72" width="170" height="74" rx="10" fill="#fff" stroke="var(--ink)" strokeWidth="1.6" />
                    <circle cx="464" cy="90" r="7" fill="#3D7BF7" />
                    <text x="328" y="97" fontFamily="var(--mono)" fontSize="11" fill="var(--ink-3)">
                      STEP 2
                    </text>
                    <text x="328" y="125" fontFamily="var(--sans)" fontWeight="700" fontSize="17" fill="var(--ink)">
                      System map
                    </text>
                  </g>
                  <g className="node">
                    <rect x="594" y="72" width="170" height="74" rx="10" fill="#fff" stroke="var(--ink)" strokeWidth="1.6" />
                    <circle cx="746" cy="90" r="7" fill="#FF6B7B" />
                    <text x="610" y="97" fontFamily="var(--mono)" fontSize="11" fill="var(--ink-3)">
                      STEP 3
                    </text>
                    <text x="610" y="125" fontFamily="var(--sans)" fontWeight="700" fontSize="17" fill="var(--ink)">
                      Decision log
                    </text>
                  </g>
                  <g className="node">
                    <rect x="594" y="332" width="170" height="74" rx="10" fill="#fff" stroke="var(--ink)" strokeWidth="1.6" />
                    <circle cx="746" cy="350" r="7" fill="#FDB347" />
                    <text x="610" y="357" fontFamily="var(--mono)" fontSize="11" fill="var(--ink-3)">
                      STEP 4
                    </text>
                    <text x="610" y="385" fontFamily="var(--sans)" fontWeight="700" fontSize="17" fill="var(--ink)">
                      Weekly demos
                    </text>
                  </g>
                  <g className="node">
                    <rect x="312" y="332" width="170" height="74" rx="10" fill="#fff" stroke="var(--ink)" strokeWidth="1.6" />
                    <circle cx="464" cy="350" r="7" fill="#5B3FD9" />
                    <text x="328" y="357" fontFamily="var(--mono)" fontSize="11" fill="var(--ink-3)">
                      STEP 5
                    </text>
                    <text x="328" y="385" fontFamily="var(--sans)" fontWeight="700" fontSize="17" fill="var(--ink)">
                      Launch
                    </text>
                  </g>
                  <g className="node">
                    <rect x="30" y="332" width="170" height="74" rx="10" fill="#fff" stroke="var(--ink)" strokeWidth="1.6" />
                    <circle cx="182" cy="350" r="7" fill="#3D7BF7" />
                    <text x="46" y="357" fontFamily="var(--mono)" fontSize="11" fill="var(--ink-3)">
                      STEP 6
                    </text>
                    <text x="46" y="385" fontFamily="var(--sans)" fontWeight="700" fontSize="17" fill="var(--ink)">
                      Public journal
                    </text>
                  </g>
                </svg>
              </div>

              {/* 3 Step cards */}
              {DEFAULT_STAGES.map((s) => (
                <div
                  key={s.num}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid var(--line-2)",
                    borderRadius: "14px",
                    padding: "1.25rem",
                  }}
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <span
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: "2rem",
                        color: s.color,
                      }}
                    >
                      {s.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.08em",
                        color: "var(--ink-3)",
                      }}
                    >
                      {s.tag}
                    </span>
                  </div>
                  <h4 style={{ fontFamily: "var(--serif)", fontSize: "1.45rem", marginBottom: "0.5rem" }}>
                    {s.title}
                  </h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--ink-2)", lineHeight: 1.5 }}>
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-4">
              <a
                href="#projects"
                className="block p-5 rounded-2xl text-white"
                style={{ background: "linear-gradient(160deg, #0F7A57, #0B5A40)" }}
              >
                <div className="w-10 h-10 rounded-xl bg-white text-[#0F7A57] flex items-center justify-center font-serif text-2xl mb-3">
                  A
                </div>
                <h4 className="font-serif text-2xl font-normal">Appointory</h4>
                <p className="text-sm opacity-90 mt-1">Care without the waiting room.</p>
                <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.2)] flex justify-between text-xs font-mono">
                  <span>Healthcare · own</span>
                  <b>Journal →</b>
                </div>
              </a>

              <a
                href="#projects"
                className="block p-5 rounded-2xl text-white"
                style={{ background: "linear-gradient(160deg, #25211C, #14120F)" }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#C8A46A] text-[#14120F] flex items-center justify-center font-serif text-2xl mb-3">
                  V
                </div>
                <h4 className="font-serif text-2xl font-normal">
                  Vrix <em>Jewellery</em>
                </h4>
                <p className="text-sm opacity-90 mt-1">Luxury, priced for every country.</p>
                <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.2)] flex justify-between text-xs font-mono">
                  <span>E-commerce · client</span>
                  <b style={{ color: "#E4C892" }}>Journal →</b>
                </div>
              </a>

              <a
                href="#estimator"
                className="block p-6 rounded-2xl text-center"
                style={{
                  border: "1.5px dashed var(--line-2)",
                  backgroundColor: "rgba(255,255,255,0.9)",
                }}
              >
                <span className="font-hand text-3xl text-[var(--ink)] block">Your sheet goes here</span>
                <span className="font-mono text-xs text-[var(--blue-deep)] mt-2 block">
                  Open a brief →
                </span>
              </a>
            </div>
          )}

          {activeTab === "telemetry" && (
            <StudioTelemetryCard initialCount={302} showFullLogs={true} />
          )}
        </div>
      </section>
    </div>
  );
}
