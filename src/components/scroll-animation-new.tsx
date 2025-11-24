"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BRAND = "#F2C016";

const ScrollAnimationNew = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- 1. Image Opacities (Appear one by one) ---
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.1], [0, 1]); // Perps
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]); // Spot
  const opacity3 = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]); // Instruments
  const opacity4 = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]); // Charting
  const opacity5 = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]); // Options

  // --- 2. Monitor Frame Opacity (Fades in) ---
  const monitorOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);

  // --- 3. Convergence (Move to grid inside monitor) ---
  // Range: 0.55 -> 0.75
  const convergenceProgress = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);

  // Initial Positions (Scatter)
  // Perps: Top Left
  // Spot: Top Right
  // Instruments: Bottom Left
  // Charting: Bottom Right
  // Options: Bottom Center
  
  // We use transforms to interpolate from Initial -> Final (Grid)
  
  // Helper to create transform for each image
  const createTransform = (
    initial: { x: string; y: string; scale: number },
    final: { x: string; y: string; scale: number }
  ) => {
    const x = useTransform(convergenceProgress, [0, 1], [initial.x, final.x]);
    const y = useTransform(convergenceProgress, [0, 1], [initial.y, final.y]);
    const scale = useTransform(convergenceProgress, [0, 1], [initial.scale, final.scale]);
    return { x, y, scale };
  };

  // Final Grid Positions (Relative to the monitor center)
  // Using the 3-row layout established previously
  const finalScale = 0.55;
  const t1 = createTransform({ x: "-40vw", y: "-30vh", scale: 1 }, { x: "-50%", y: "-60%", scale: finalScale }); // Perps
  const t2 = createTransform({ x: "40vw", y: "-30vh", scale: 1 }, { x: "50%", y: "-60%", scale: finalScale });  // Spot
  const t3 = createTransform({ x: "-40vw", y: "10vh", scale: 1 }, { x: "-50%", y: "0%", scale: finalScale });   // Instruments
  const t4 = createTransform({ x: "40vw", y: "10vh", scale: 1 }, { x: "50%", y: "0%", scale: finalScale });    // Charting
  const t5 = createTransform({ x: "0vw", y: "40vh", scale: 1 }, { x: "-50%", y: "60%", scale: finalScale });    // Options

  // --- 4. Desktop Frame Movement (Slide Right) ---
  // Range: 0.8 -> 1.0
  const desktopX = useTransform(scrollYProgress, [0.8, 1.0], ["0%", "35%"]);
  
  // --- 5. Text Opacity (Fade in Left) ---
  const textOpacity = useTransform(scrollYProgress, [0.85, 1.0], [0, 1]);

  return (
    <div ref={containerRef} style={{ height: "500vh", background: "black", position: "relative" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${BRAND}15 0%, transparent 70%)`,
          }}
        />

        {/* Left Side Text Panel */}
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
                color: BRAND,
              }}
            >
              Unparalleled Execution
            </h2>
            
            <div className="space-y-6">
              {[
                "Institutional-grade liquidity aggregation",
                "Advanced order routing and execution",
                "Real-time market data and analytics",
                "Seamless integration with existing systems",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ background: BRAND }} />
                  <p className="text-white/90 text-xl leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Desktop Frame Container (Moves Right) */}
        <motion.div
          style={{
            x: desktopX,
            position: "absolute",
            width: "100%", // Container width
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
        >
          {/* The Monitor Frame Image */}
          <motion.div
            style={{
              opacity: monitorOpacity,
              position: "absolute",
              width: "800px", // Adjust size as needed
              zIndex: 10,
            }}
          >
             <img src="/screen.png" alt="Monitor Frame" className="w-full h-auto" />
          </motion.div>

          {/* Images Container - Centered in the monitor */}
          {/* We apply the transforms to the images directly, treating the center of this container as the origin */}
          
          {/* Image 1: Streaming Perps */}
          <motion.div style={{ position: "absolute", x: t1.x, y: t1.y, scale: t1.scale, opacity: opacity1, width: "350px", zIndex: 20 }}>
             <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/30 backdrop-blur-sm">
                <img src="/Streaming Perps.png" alt="Streaming Perps" className="w-full h-auto" />
             </div>
          </motion.div>

          {/* Image 2: Streaming Spot */}
          <motion.div style={{ position: "absolute", x: t2.x, y: t2.y, scale: t2.scale, opacity: opacity2, width: "350px", zIndex: 20 }}>
             <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/30 backdrop-blur-sm">
                <img src="/Streaming Spot.png" alt="Streaming Spot" className="w-full h-auto" />
             </div>
          </motion.div>

          {/* Image 3: Multiple Instruments */}
          <motion.div style={{ position: "absolute", x: t3.x, y: t3.y, scale: t3.scale, opacity: opacity3, width: "350px", zIndex: 20 }}>
             <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/30 backdrop-blur-sm">
                <img src="/Multiple instruments multiple venues.png" alt="Multiple Instruments" className="w-full h-auto" />
             </div>
          </motion.div>

          {/* Image 4: Charting */}
          <motion.div style={{ position: "absolute", x: t4.x, y: t4.y, scale: t4.scale, opacity: opacity4, width: "350px", zIndex: 20 }}>
             <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/30 backdrop-blur-sm">
                <img src="/Charting.png" alt="Charting" className="w-full h-auto" />
             </div>
          </motion.div>

          {/* Image 5: Streaming Options */}
          <motion.div style={{ position: "absolute", x: t5.x, y: t5.y, scale: t5.scale, opacity: opacity5, width: "350px", zIndex: 20 }}>
             <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/30 backdrop-blur-sm">
                <img src="/Streaming Options.png" alt="Streaming Options" className="w-full h-auto" />
             </div>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
};

export default ScrollAnimationNew;
