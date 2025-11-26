"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const BRAND = "#F2C016";

// Linear Interpolation (Lerp)
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface ScreenItem {
  id: string;
  image: string;
  title: string;
  initialPosition: { left?: string; right?: string; top?: string; bottom?: string };
  order: number;
}

const screens: ScreenItem[] = [
  {
    id: "streaming-perps",
    image: "/Streaming Perps.png",
    title: "Streaming Perps",
    initialPosition: { left: "10%", top: "10%" },
    order: 0,
  },
  {
    id: "streaming-spot",
    image: "/Streaming Spot.png",
    title: "Streaming Spot",
    initialPosition: { right: "10%", top: "10%" },
    order: 1,
  },
  {
    id: "multiple-instruments",
    image: "/Multiple instruments multiple venues.png",
    title: "Multiple instruments multiple venues",
    initialPosition: { left: "10%", top: "55%" },
    order: 2,
  },
  {
    id: "charting",
    image: "/Charting.png",
    title: "Charting",
    initialPosition: { right: "10%", top: "55%" },
    order: 3,
  },
  {
    id: "streaming-options",
    image: "/Streaming Options.png",
    title: "Streaming Options",
    initialPosition: { left: "50%", bottom: "8%" },
    order: 4,
  },
];

export default function ScrollAnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return smoothProgress.on("change", (latest: number) => {
      setScrollProgress(latest);
    });
  }, [smoothProgress]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animation phases (slowed merge and earlier final shift)
  const APPEAR_END = 0.35;
  const STAY_END = 0.48;
  const MERGE_END = 0.75;
  const FINAL_START = 0.76;
  const FINAL_END = 0.90;

  // Convert initial positions (% or px) to pixels
  const toPixel = (value: string, axisSize: number) => {
    if (value.endsWith("%")) return (parseFloat(value) / 100) * axisSize;
    return parseFloat(value);
  };

  // Per-screen animation logic
  const getScreenState = (screen: ScreenItem) => {
    const fadeStart = (screen.order / screens.length) * APPEAR_END;
    const fadeEnd = fadeStart + (APPEAR_END / screens.length) * 0.4;

    const fade =
      scrollProgress < fadeStart
        ? 0
        : scrollProgress < fadeEnd
        ? (scrollProgress - fadeStart) / (fadeEnd - fadeStart)
        : 1;

    const viewportW = typeof window !== "undefined" ? window.innerWidth : 1920;
    const viewportH = typeof window !== "undefined" ? window.innerHeight : 1080;

    // Use inner content container dimensions (match header container)
    const contentRect = contentRef.current?.getBoundingClientRect();
    const containerW = contentRect?.width ?? viewportW;
    const containerH = contentRect?.height ?? viewportH;

    const paddingX = 80;
    const paddingY = 170;

    const baseW = Math.min(containerW * 0.9, 560);
    const maskH = Math.round(baseW * 0.48);
    const TILE_W = 280;
    const TILE_HALF_W = TILE_W / 2;
    const TILE_HALF_H = 80; // approximate

    // Per-image horizontal offsets per previous request
    const LEFT_GAP_PX = 590;  // left column exact position
    const RIGHT_GAP_PX = 360; // right column exact position
    const OPTIONS_X_PX = -70; // 5th image offset

    const initialOffsets: Record<string, { x: number; y: number }> = {
      "streaming-perps": { x: -LEFT_GAP_PX, y: -110 },
      "streaming-spot": { x: +RIGHT_GAP_PX, y: -110 },
      "multiple-instruments": { x: -LEFT_GAP_PX, y: 50 },
      "charting": { x: +RIGHT_GAP_PX, y: 50 },
      "streaming-options": { x: OPTIONS_X_PX, y: 20 },
    };

    const init = initialOffsets[screen.id];

    // Clamp within a central vertical band to prevent drift (slightly tighter)
    const centerClampHalfH = Math.round(maskH * 1.1);
    const xInitialAbs = containerW / 2 + init.x;
    const yInitialAbs = Math.max(
      containerH / 2 - centerClampHalfH + TILE_HALF_H,
      Math.min(containerH / 2 + centerClampHalfH - TILE_HALF_H, containerH / 2 + init.y)
    );

    const targets: Record<string, { x: number; y: number; scale: number }> = {
      // Centered vertical stack inside LCD mask (requested offsets)
      "streaming-perps": { x: 0, y: -100, scale: 0.92 },
      "streaming-spot": { x: 0, y: -50, scale: 0.92 },
      "multiple-instruments": { x: 0, y: 0, scale: 0.92 },
      "charting": { x: 0, y: 50, scale: 0.92 },
      "streaming-options": { x: 0, y: 100, scale: 0.92 },
    };

    const T = targets[screen.id];

    let mergeT = 0;
    if (scrollProgress > STAY_END) {
      mergeT = Math.min((scrollProgress - STAY_END) / (MERGE_END - STAY_END), 1);
    }

    // Absolute positions relative to page center (used for calculations)
    const xAbs = lerp(xInitialAbs, containerW / 2 + T.x, mergeT);
    const yAbs = lerp(yInitialAbs, containerH / 2 + T.y, mergeT);

    // Center-relative transforms: ensure perfect middle at merge end
    const xRel = lerp(init.x, T.x, mergeT);
    const yRel = lerp(init.y, T.y, mergeT);

    const scale = lerp(0.8, T.scale, fade * (mergeT || 1));

    return { x: xAbs, y: yAbs, relX: xRel, relY: yRel, tileHalfW: TILE_HALF_W, tileHalfH: TILE_HALF_H, scale, fade };
  };

  // Calculate merge progress (0 to 1) - screens moving to center
  const mergeT = scrollProgress > STAY_END
    ? Math.min((scrollProgress - STAY_END) / (MERGE_END - STAY_END), 1)
    : 0;

  // Final layout transition progress
  const finalT =
    scrollProgress <= FINAL_START
      ? 0
      : scrollProgress >= FINAL_END
      ? 1
      : (scrollProgress - FINAL_START) / (FINAL_END - FINAL_START);

  // LCD group moves right during final
  const groupShiftX = lerp(0, 220, finalT);

  // Switch visibility to mask without fading (hard threshold)
  const maskVisible = mergeT >= 0.7;

  // Seal phase: brief unify effect then snap to single screen
  const sealStart = 0.62;
  const sealEnd = 0.74;
  const sealT = Math.max(0, Math.min(1, (mergeT - sealStart) / (sealEnd - sealStart)));
  const showUnified = mergeT >= sealEnd;
  const showTilesInMask = maskVisible && !showUnified;

  // Text motion
  const textOpacity = finalT;
  const textTranslateX = `${lerp(-60, 0, finalT)}px`;

  // Global scale boost applied to all tiles and unified image
  const SCALE_START = 0.30; // begin scale-up
  const SCALE_END = 0.80;   // reach max by 80%
  const MAX_SCALE_BOOST = 1.12; // 12% larger overall
  const scaleBoost = (() => {
    const raw = (scrollProgress - SCALE_START) / (SCALE_END - SCALE_START);
    const t = Math.max(0, Math.min(1, raw));
    return lerp(1, MAX_SCALE_BOOST, t);
  })();

  // screen.png opacity - fade in on appear, stay visible throughout (no GIF)
  const screenOpacity = 1;

  // Dynamic LCD mask sizing relative to content container width (aligns with header container)
  const rect = contentRef.current?.getBoundingClientRect();
  const containerW = rect?.width ?? (typeof window !== "undefined" ? window.innerWidth : 1920);
  const baseScreenWidth = Math.min(containerW * 0.9, 560);
  const maskWidthPx = Math.round(baseScreenWidth * 0.80);
  const maskHeightPx = Math.round(baseScreenWidth * 0.48);
  const maskTranslateYPercent = -50; // centered within bezel
  const maskOffsetXPx = Math.round(baseScreenWidth * 0.00);
  const maskOffsetYPx = Math.round(baseScreenWidth * -0.004);

  // ⭐ GIF moves center → right side ⭐
  // Removed: const gifRightShift = lerp(0, 220, finalLayoutVisible);
  // Removed: const finalGifWidth = isMobile ? "100%" : "min(90%, 560px)";

  // Mobile layout
  if (isMobile) {
    return (
      <section className="bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-6">
            {screens.map((screen) => (
              <div key={screen.id} className="rounded-xl overflow-hidden border border-white/10 bg-black/30">
                <img src={screen.image} alt={screen.title} className="w-full h-auto object-contain" />
                <p className="text-white/80 text-center py-3">
                  <span style={{ color: BRAND }}>{screen.order + 1}.</span> {screen.title}
                </p>
              </div>
            ))}
            {/* Removed final animation GIF for mobile fallback */}
            {/* <div className="rounded-xl overflow-hidden border border-white/10 bg-black/30">
              <img src="/final-animation.gif" alt="Workflow animation" className="w-full h-auto object-contain" />
            </div> */}
          </div>
        </div>
      </section>
    );
  }

  // Desktop layout
  return (
    <div ref={containerRef} className="relative bg-black" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div ref={contentRef} className="relative max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${BRAND}15 0%, transparent 70%)`,
          }}
        />

        {/* Center screen.png */}
        {false && screenOpacity > 0 && (
          <motion.img
            src="/screen.png"
            className="absolute z-10 left-1/2 top-1/2"
            style={{
              width: "min(90vw, 560px)",
              opacity: screenOpacity,
              transform: "translate(-50%, -50%)",
              willChange: "transform, opacity",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}

        {/* Floating screens at original positions before masking */}
        { !maskVisible && screens.map((screen) => {
           const state = getScreenState(screen);
           const rect = contentRef.current?.getBoundingClientRect();
           const contentW = rect?.width ?? (typeof window !== "undefined" ? window.innerWidth : 1920);
           const contentH = rect?.height ?? (typeof window !== "undefined" ? window.innerHeight : 1080);
           return (
             <motion.div
               key={screen.id}
               className="absolute z-25 left-1/2 top-1/2 flex flex-col items-center"
               style={{
                 x: state.relX - state.tileHalfW,
                 y: state.relY - state.tileHalfH,
                 scale: state.scale * scaleBoost,
                 opacity: state.fade,
                 width: "280px",
                 willChange: "transform, opacity",
               }}
             >
               <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/30 backdrop-blur-sm">
                 <img src={screen.image} className="w-full h-auto object-contain" />
               </div>
               <p className="text-white mt-3 text-center text-base" style={{ opacity: scrollProgress >= 0.60 ? 0 : Math.max(0, state.fade * (1 - finalT)), transition: 'opacity 0.2s ease-out' }}>
                  <span style={{ color: BRAND }}>{screen.order + 1}.</span> {screen.title}
                </p>
             </motion.div>
           );
         })}

        {/* LCD group: base screen + merging tiles, shifts right in final */}
        <motion.div
          className="absolute z-30 left-1/2 top-1/2"
          style={{
            transform: `translate3d(calc(-50% + ${groupShiftX}px), -50%, 0)`,
            willChange: "transform, opacity",
          }}
        >
          {/* Base LCD screen */}
          {screenOpacity > 0 && (
            <motion.img
              src="/screen.png"
              className="absolute z-10 left-1/2 top-1/2"
              style={{
                width: "min(90vw, 560px)",
                opacity: screenOpacity,
                transform: "translate(-50%, -50%)",
                willChange: "transform, opacity",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          )}

          {/* LCD viewport mask: clips tiles to the display area */}
          <div
            className="absolute z-20 left-1/2 top-1/2"
            style={{
              width: maskWidthPx,
              height: maskHeightPx,
              transform: `translate3d(calc(-50% + ${maskOffsetXPx}px), calc(${maskTranslateYPercent}% + ${maskOffsetYPx}px), 0)`,
              overflow: "hidden",
              borderRadius: "16px",
              pointerEvents: "none",
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.35)",
              willChange: "transform, opacity",
              opacity: maskVisible ? 1 : 0,
            }}
          >
            {/* Seal overlay: soft glow to unify tiles */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: sealT * 0.45,
                background:
                  'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 55%)',
              }}
            />

            {/* Unified single screen image */}
            {showUnified && (
               <motion.img
                 src="/merged-screen.png"
                 className="absolute"
                 style={{
                   left: 0,
                   top: 0,
                   width: '100%',
                   height: '100%',
                   transform: 'none',
                     objectFit: 'contain',
                     objectPosition: 'center',
                     backfaceVisibility: 'hidden',
                     imageRendering: 'auto',
                     pointerEvents: 'none',
                     willChange: 'transform',
                   }}
                   transition={{ duration: 0.18, ease: 'easeOut' }}
               />
             )}

             {/* Merging screens inside the LCD */}
             {showTilesInMask && screens.map((screen) => {
               const state = getScreenState(screen);
               const rect = contentRef.current?.getBoundingClientRect();
               const contentW = rect?.width ?? (typeof window !== "undefined" ? window.innerWidth : 1920);
               const contentH = rect?.height ?? (typeof window !== "undefined" ? window.innerHeight : 1080);
               return (
                 <motion.div
                   key={screen.id}
                   className="absolute left-1/2 top-1/2 flex flex-col items-center"
                   style={{
                     x: state.relX - state.tileHalfW,
                     y: state.relY - state.tileHalfH,
                     scale: state.scale,
                     opacity: state.fade,
                     width: "280px",
                     willChange: "transform, opacity",
                   }}
                 >
                   <div className="rounded-lg overflow-hidden border border-white/15 bg-black/30 backdrop-blur-sm">
                     <img src={screen.image} className="w-full h-auto object-contain" />
                   </div>
                   <p className="text-white mt-2 text-center text-sm" style={{ opacity: scrollProgress >= 0.60 ? 0 : Math.max(0, state.fade * (1 - finalT)), transition: 'opacity 0.2s ease-out' }}>
                      <span style={{ color: BRAND }}>{screen.order + 1}.</span> {screen.title}
                    </p>
                 </motion.div>
               );
             })}
          </div>
        </motion.div>
        </div>

        {/* Final layout (text + right GIF) */}
        <div
          className="absolute z-40 inset-0 flex items-center justify-center"
          style={{ opacity: textOpacity }}
        >
          <div className="max-w-[1280px] w-full mx-auto px-4">
            <div className="w-full flex flex-row items-center">
              {/* Text */}
              <div
                className="flex-1"
                style={{
                  transform: `translateX(${textTranslateX})`,
                  opacity: textOpacity,
                }}
              >
                <h2 className="font-bold text-white text-[56px] leading-tight">
                  Start Trading with <br /> Institutional Precision
                </h2>

                <p className="text-white/90 text-lg leading-relaxed mt-6 max-w-xl">
                  In the 24/7 market for Digital Assets, Derivatives, and Forex,
                  leverage Collybus's tools for precision, superior risk control,
                  and operational reliability.
                </p>

                <a
                  href="mailto:contact@collybus.co"
                  className="inline-flex items-center space-x-2 mt-8 bg-[#F2C016] hover:bg-[#d9ad14] text-black font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Get in Touch</span>
                </a>
              </div>

              {/* Right side intentionally left empty; LCD group shifts here */}
              <div className="flex-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
