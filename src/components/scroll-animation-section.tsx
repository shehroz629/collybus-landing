"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import style from "styled-jsx/style";

const BRAND = "#F2C016";

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
    title: "Multiple Instruments",
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  const APPEAR_PHASE_END = 0.35;
  const SCREEN_APPEAR_PHASE_END = 0.45; // New phase: Screen fades in
  const MERGE_PHASE_END = 0.75; // Slower merge for better effect
  const MOVE_PHASE_END = 0.9;
  const TEXT_PHASE_END = 1.0;

  const getFadeInProgress = (order: number) => {
    const fadeStart = (order / screens.length) * APPEAR_PHASE_END;
    const fadeDuration = APPEAR_PHASE_END / screens.length * 0.4;
    
    if (scrollProgress < fadeStart) return 0;
    if (scrollProgress < fadeStart + fadeDuration) {
      return (scrollProgress - fadeStart) / fadeDuration;
    }
    return 1;
  };

  const getScreenState = (screen: ScreenItem) => {
    const fadeIn = getFadeInProgress(screen.order);

    // Phase 1: Zoom in with fade at initial positions
    if (scrollProgress < APPEAR_PHASE_END) {
      const yOffset = (1 - fadeIn) * 100; // Move 100px up as they fade in
      // Zoom effect: scale from 0.6 to 1.0 as it fades in
      const scaleValue = 0.6 + (fadeIn * 0.4);
      const baseTransform = screen.id === "streaming-options" ? "translate(-50%, -50%)" : "translate(0, 0)";
      
      return {
        positioning: "absolute" as const,
        ...screen.initialPosition,
        transform: `${baseTransform} translate(0, ${yOffset}px) scale(${scaleValue})`,
        opacity: fadeIn,
        zIndex: 15,
      };
    }

    // Phase 1.5: Screen Appears (Images stay still)
    if (scrollProgress < SCREEN_APPEAR_PHASE_END) {
      return {
        positioning: "absolute" as const,
        ...screen.initialPosition,
        transform: `translate(${screen.id === "streaming-options" ? "-50%, -50%" : "0, 0"}) scale(1)`,
        opacity: 1,
        zIndex: 15,
      };
    }

    // Phase 2: Move to grid positions (Stay Visible)
    // We remove the "Swap" phase. Once they move, they stay there.
    let progress = 0;
    if (scrollProgress < MERGE_PHASE_END) {
       progress = (scrollProgress - SCREEN_APPEAR_PHASE_END) / (MERGE_PHASE_END - SCREEN_APPEAR_PHASE_END);
    } else {
       progress = 1; // Fully merged
    }
      
    const frameTargets: { [key: string]: { x: string; y: string; scale: number; width: string; height: string } } = {
      "streaming-perps": { x: "-175px", y: "-180px", scale: 1, width: "325px", height: "95px" },
      "streaming-spot": { x: "175px", y: "-180px", scale: 1, width: "325px", height: "95px" },
      "multiple-instruments": { x: "-175px", y: "-70px", scale: 1, width: "325px", height: "95px" },
      "charting": { x: "175px", y: "-70px", scale: 1, width: "325px", height: "95px" },
      "streaming-options": { x: "0px", y: "40px", scale: 1, width: "660px", height: "95px" },
    };

    const target = frameTargets[screen.id];
    // Interpolate scale from 1 to target.scale (which is 1)
    const currentScale = 1; 
    
    // We need to interpolate width/height if we want smooth transition, 
    // but for now let's just switch to target dimensions in the merge phase?
    // Or better, interpolate from initial 350px/auto to target.
    
    // Since we don't have numeric interpolation for "px" strings easily here without parsing,
    // and the previous code didn't handle width/height interpolation, 
    // let's assume the user is okay with them snapping or we just set them.
    // Actually, to avoid snap, we can keep them as is until fully merged? 
    // No, the user wants them to look good.
    
    return {
      positioning: "centered" as const,
      x: target.x,
      y: target.y,
      scale: currentScale,
      width: target.width,
      height: target.height,
      opacity: 1, 
      zIndex: 20,
    };
  };

  const containerShift = scrollProgress < MERGE_PHASE_END ? "0%" :
    scrollProgress < MOVE_PHASE_END ? `${((scrollProgress - MERGE_PHASE_END) / (MOVE_PHASE_END - MERGE_PHASE_END)) * 35}%` : "35%";

  // Opacity for the empty frame
  let emptyFrameOpacity = 0;

  if (scrollProgress < APPEAR_PHASE_END) {
    // Phase 1: Just images appearing. Frame is hidden.
    emptyFrameOpacity = 0;
  } else if (scrollProgress < SCREEN_APPEAR_PHASE_END) {
    // Phase 1.5: Screen fades in BEFORE images start moving
    const progress = (scrollProgress - APPEAR_PHASE_END) / (SCREEN_APPEAR_PHASE_END - APPEAR_PHASE_END);
    emptyFrameOpacity = progress;
  } else {
    // Frame stays visible
    emptyFrameOpacity = 1;
  }

  const textOpacity = scrollProgress > MOVE_PHASE_END ? (scrollProgress - MOVE_PHASE_END) / (TEXT_PHASE_END - MOVE_PHASE_END) : 0;

  return (
    <div ref={containerRef} className="relative bg-black" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${BRAND}15 0%, transparent 70%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full relative">
          {/* Left text */}
          <motion.div
            className="absolute left-0 top-0 h-full w-1/2 flex items-center justify-start pl-8 z-40"
            style={{ opacity: textOpacity }}
          >
            <div className="max-w-xl space-y-8">
              <h2
                className="font-bold text-white"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "56px",
                  lineHeight: "1.1",
                  
                }}
              >
                Start Trading with Institutional Precision
              </h2>
              
              <p className="text-white/90 text-lg leading-relaxed">
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
          </motion.div>

          {/* Screens container */}
          <motion.div
            className="absolute inset-0"
            style={{ x: containerShift }}
            transition={{ type: "spring", stiffness: 40, damping: 30, mass: 1 }}
          >
            {scrollProgress >= MERGE_PHASE_END ? (
              /* Final GIF - Replaces frame and images once fully merged */
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                style={{
                  width: "700px",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src="/final-animation.gif" alt="Trading Dashboard" className="w-full h-auto" />
              </motion.div>
            ) : (
              <>
                {/* Empty Screen frame (Fades in BEFORE merge) */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{
                    width: "700px",
                    opacity: emptyFrameOpacity,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img src="/screen.png" alt="Screen frame" className="w-full h-auto" />
                </motion.div>

                {/* Individual Images */}
                {screens.map((screen) => {
                  const state = getScreenState(screen);

                  if (state.positioning === "absolute") {
                    return (
                      <motion.div
                        key={screen.id}
                        className="absolute"
                        style={{
                          ...state,
                          width: "450px",
                        }}
                        transition={{ type: "spring", stiffness: 30, damping: 25, mass: 0.8 }}
                      >
                        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/30 backdrop-blur-sm">
                          <img src={screen.image} alt={screen.title} className="w-full h-auto object-contain" />
                        </div>
                        
                        {state.opacity > 0.3 && (
                          <motion.div className="mt-4 text-left" style={{ opacity: state.opacity }}>
                            <p className="text-white text-[28px] font-medium">
                              <span style={{ color: BRAND }}>{screen.order + 1}. </span>
                              {screen.title}
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  } else {
                    return (
                      <motion.div
                        key={screen.id}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          x: state.x,
                          y: state.y,
                          scale: state.scale,
                          opacity: state.opacity,
                          width: (state as any).width || "450px",
                          height: (state as any).height || "auto",
                          zIndex: state.zIndex,
                        }}
                        transition={{ type: "spring", stiffness: 30, damping: 25, mass: 0.8 }}
                      >
                        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/30 backdrop-blur-sm w-full h-full">
                          <img src={screen.image} alt={screen.title} className="w-full h-full object-cover" />
                        </div>
                      </motion.div>
                    );
                  }
                })}
              </>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
