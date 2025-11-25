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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
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

  // Animation phases
  const APPEAR_END = 0.35;
  const STAY_END = 0.45;
  const MERGE_END = 0.95;
  const FINAL_START = 0.9;
  const FINAL_END = 1.0;

  

  // Convert initial positions (% or px) to pixels
  const toPixel = (value: string, axisSize: number) => {
    if (value.endsWith("%")) {
      return (parseFloat(value) / 100) * axisSize;
    }
    return parseFloat(value);
  };

  // Calculate per-screen state
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

    // Add padding from edges (80px horizontal, 40px vertical)
    const horizontalPadding = 80;
    const verticalPadding = 190;
    const effectiveWidth = viewportW - (horizontalPadding * 2);
    const effectiveHeight = viewportH - (verticalPadding * 2);

    const xInitial =
      screen.initialPosition.left
        ? horizontalPadding + toPixel(screen.initialPosition.left, effectiveWidth)
        : viewportW - horizontalPadding - toPixel(screen.initialPosition.right!, effectiveWidth);

    const yInitial =
      screen.initialPosition.top
        ? verticalPadding + toPixel(screen.initialPosition.top, effectiveHeight)
        : viewportH - verticalPadding - toPixel(screen.initialPosition.bottom!, effectiveHeight);

    const targets: Record<string, { x: number; y: number; scale: number }> = {
      "streaming-perps": { x: -175, y: -180, scale: 1 },
      "streaming-spot": { x: 175, y: -180, scale: 1 },
      "multiple-instruments": { x: -175, y: -70, scale: 1 },
      "charting": { x: 175, y: -70, scale: 1 },
      "streaming-options": { x: 0, y: 40, scale: 1 },
    };

    const T = targets[screen.id];

    let mergeT = 0;
    if (scrollProgress > STAY_END) {
      mergeT = Math.min((scrollProgress - STAY_END) / (MERGE_END - STAY_END), 1);
    }

    const x = lerp(xInitial, viewportW / 2 + T.x, mergeT);
    const y = lerp(yInitial, viewportH / 2 + T.y, mergeT);

    const scale = lerp(0.7, T.scale, fade * (mergeT || 1));

    return {
      x,
      y,
      scale,
      fade,
    };
  };

  const centerGifOpacity =
    scrollProgress > MERGE_END ? (scrollProgress - MERGE_END) / (FINAL_START - MERGE_END) : 0;

  const finalT =
    scrollProgress <= FINAL_START
      ? 0
      : scrollProgress >= FINAL_END
      ? 1
      : (scrollProgress - FINAL_START) / (FINAL_END - FINAL_START);

  const centeredGifVisible = centerGifOpacity * (1 - finalT);
  const finalLayoutVisible = finalT;

  const textTranslateX = `${lerp(-60, 0, finalLayoutVisible)}px`;
  const textOpacity = finalLayoutVisible;

  // Screen PNG - hide immediately when text or monitors become visible
  // Hide screen.png immediately when final layout (text/GIF) starts appearing
const screenOpacity = finalLayoutVisible > 0
? 0
: scrollProgress < APPEAR_END
? 0
: scrollProgress < STAY_END
? (scrollProgress - APPEAR_END) / (STAY_END - APPEAR_END)
: 1;




  const finalGifWidth = isMobile ? "100%" : "min(90%, 560px)";

  // Mobile: Simple layout with just GIF and text
  if (isMobile) {
    return (
      <div className="relative bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-12">
            {/* GIF Animation Screen */}
            <div className="w-full max-w-[90vw]">
              <img src="/final-animation.gif" alt="Trading Dashboard" className="w-full h-auto" />
            </div>

            {/* Text Section */}
            <div className="text-center space-y-6 max-w-xl">
              <h2
                className="font-bold text-white text-[35px] sm:text-4xl"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  lineHeight: "1.1",
                }}
              >
                Start Trading with Institutional Precision
              </h2>
              
              <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                In the 24/7 market for Digital Assets, Derivatives, and Forex, leverage Collybus's tools for precision, superior risk control, and operational reliability
              </p>

              <a
                href="mailto:contact@collybus.co"
                className="inline-flex items-center space-x-2 bg-[#f2c016] hover:bg-[#d9ad14] text-black font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
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
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Full scroll animation
  return (
    <div ref={containerRef} className="relative bg-black" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${BRAND}15 0%, transparent 70%)`,
          }}
        />

        {/* --- FIXED: screen.png now fades OUT --- */}
        {screenOpacity > 0 && (
          <motion.img
            src="/screen.png"
            className="absolute z-10 left-1/2 top-1/2"
            style={{
              width: "min(90vw, 560px)",
              opacity: screenOpacity,
              transform: "translate(-50%, -50%)",
              
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}

        {/* --- Individual Screens - positioned relative to viewport --- */}
        {scrollProgress < MERGE_END &&
  screens.map((screen) => {
    const state = getScreenState(screen);
    return (
      <motion.div
        key={screen.id}
        className="absolute z-20 flex flex-col items-center"
        style={{
          left: state.x,
          top: state.y,
          scale: state.scale,
          opacity: state.fade * (finalLayoutVisible > 0 ? 0 : 1), // <-- UPDATED
          translateX: "-50%",
          translateY: "-50%",
          width: "320px",
        }}
        transition={{ type: "spring", stiffness: 30, damping: 25, mass: 0.8 }}
      >
        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/30 backdrop-blur-sm">
          <img src={screen.image} className="w-full h-auto object-contain" />
        </div>

        {/* Heading below screen */}
        {state.fade > 0.3 && scrollProgress < STAY_END && (
          <motion.div 
            className="mt-4 text-center"
            style={{ 
              opacity: scrollProgress < STAY_END 
                ? Math.max(0, state.fade * (1 - (scrollProgress - (APPEAR_END + 0.05)) / (STAY_END - APPEAR_END - 0.05)))
                : 0,
              transition: "opacity 0.3s ease-out"
            }}
          >
            <p className="text-white text-lg md:text-xl font-medium">
              <span style={{ color: BRAND }}>{screen.order + 1}. </span>
              {screen.title}
            </p>
          </motion.div>
        )}
      </motion.div>
    );
  })}


        {/* --- Centered GIF --- */}
        <motion.div
          className="absolute z-30 flex items-center justify-center left-1/2 top-1/2"
          style={{
            opacity: centeredGifVisible,
            pointerEvents: centeredGifVisible > 0 ? "auto" : "none",
            width: finalGifWidth,
            maxWidth: "700px",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img src="/final-animation.gif" alt="Trading Dashboard" className="w-full h-auto object-contain" />
        </motion.div>

        {/* --- FINAL LAYOUT --- */}
        <div
          className="absolute z-40 inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden={finalLayoutVisible === 0}
        >
          <div
            className="max-w-[1280px] w-full mx-auto px-4 pointer-events-auto"
            style={{
              opacity: finalLayoutVisible,
              transition: "opacity 200ms linear",
              display: finalLayoutVisible === 0 ? "none" : "block",
            }}
          >
            <div
              className={`w-full flex ${isMobile ? "flex-col gap-8 items-center" : "flex-row items-center"}`}
              style={{ minHeight: "420px" }}
            >
              <div
                className="flex-1"
                style={{
                  transform: `translateX(${textTranslateX})`,
                  opacity: textOpacity,
                }}
              >
                <h2
                  className="font-bold text-white text-[35px] sm:text-4xl md:text-5xl lg:text-[56px] leading-tight"
                >
                  Start Trading with <br /> Institutional Precision
                </h2>

                <p className="text-white/90 text-base sm:text-lg leading-relaxed mt-6 max-w-xl">
                  In the 24/7 market for Digital Assets, Derivatives, and Forex,
                  leverage Collybus's tools for precision, superior risk control, and
                  operational reliability.
                </p>

                <a
                  href="mailto:contact@collybus.co"
                  className="inline-flex items-center space-x-2 mt-8 bg-[#f2c016] hover:bg-[#d9ad14] text-black font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
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

              <div className="flex-1 flex justify-center">
                <div style={{ width: isMobile ? "90%" : "520px", maxWidth: "100%" }}>
                  <img src="/final-animation.gif" alt="Trading Dashboard" className="w-full h-auto object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
