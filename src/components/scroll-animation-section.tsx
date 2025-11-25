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
  const STAY_END = 0.4;
  const MERGE_END = 0.5;
  const GIF_START = MERGE_END + 0.04; // Delay after merge completes before GIF shows
  const FINAL_START = 0.65;
  const FINAL_END = 0.77;

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

    const paddingX = 80;
    const paddingY = 170;

    const effectiveWidth = viewportW - paddingX * 2;
    const effectiveHeight = viewportH - paddingY * 2;

    const xInitial =
      screen.initialPosition.left
        ? paddingX + toPixel(screen.initialPosition.left, effectiveWidth)
        : viewportW - paddingX - toPixel(screen.initialPosition.right!, effectiveWidth);

    const yInitial =
      screen.initialPosition.top
        ? paddingY + toPixel(screen.initialPosition.top, effectiveHeight)
        : viewportH - paddingY - toPixel(screen.initialPosition.bottom!, effectiveHeight);

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

    return { x, y, scale, fade };
  };

  // Calculate merge progress (0 to 1) - screens moving to center
  const mergeT = scrollProgress > STAY_END
    ? Math.min((scrollProgress - STAY_END) / (MERGE_END - STAY_END), 1)
    : 0;

  const centerGifOpacity =
    scrollProgress >= GIF_START
      ? Math.min((scrollProgress - GIF_START) / (FINAL_START - GIF_START), 1)
      : 0;

  const finalT =
    scrollProgress <= FINAL_START
      ? 0
      : scrollProgress >= FINAL_END
      ? 1
      : (scrollProgress - FINAL_START) / (FINAL_END - FINAL_START);

  const centeredGifVisible = centerGifOpacity * (1 - finalT);
  const finalLayoutVisible = finalT;

  const textOpacity = finalLayoutVisible;
  const textTranslateX = `${lerp(-60, 0, finalLayoutVisible)}px`;

  // screen.png opacity - hide when GIF starts showing
  const screenOpacity =
    finalLayoutVisible > 0 || scrollProgress >= GIF_START
      ? 0
      : scrollProgress < APPEAR_END
      ? 0
      : scrollProgress < STAY_END
      ? (scrollProgress - APPEAR_END) / (STAY_END - APPEAR_END)
      : 1;

  // ⭐ GIF moves center → right side ⭐
  const gifRightShift = lerp(0, 220, finalLayoutVisible);

  const finalGifWidth = isMobile ? "100%" : "min(90%, 560px)";

  // Mobile layout
  if (isMobile) {
    return <div>Mobile layout here… (unchanged)</div>;
  }

  // Desktop layout
  return (
    <div ref={containerRef} className="relative bg-black" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${BRAND}15 0%, transparent 70%)`,
          }}
        />

        {/* Center screen.png */}
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

        {/* Individual merging screens - hide before GIF shows */}
        {scrollProgress < GIF_START &&
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
                  opacity: state.fade,
                  translateX: "-50%",
                  translateY: "-50%",
                  width: "320px",
                }}
              >
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/30 backdrop-blur-sm">
                  <img src={screen.image} className="w-full h-auto object-contain" />
                  
                </div>
                <p className="text-white mt-3 text-center text-base opacity-80">
                  <span style={{ color: BRAND }}>{screen.order + 1}.</span> {screen.title}
                </p>
              </motion.div>
            );
          })}

        {/* ⭐ GIF that moves to the right ⭐ */}
        <motion.div
          className="absolute z-30 left-1/2 top-1/2"
          style={{
            opacity: centeredGifVisible,
            width: finalGifWidth,
            maxWidth: "700px",
            transform: `translate(calc(-50% + ${gifRightShift}px), -50%)`,
          }}
        >
          <img src="/final-animation.gif" className="w-full h-auto object-contain" />
        </motion.div>

        {/* Final layout (text + right GIF) */}
        <div
          className="absolute z-40 inset-0 flex items-center justify-center"
          style={{ opacity: finalLayoutVisible }}
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

              {/* Final right GIF */}
              <div className="flex-1 flex justify-center">
                <img src="/final-animation.gif" style={{ width: "520px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
