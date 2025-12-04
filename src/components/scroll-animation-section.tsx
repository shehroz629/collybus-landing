"use client"; // if using Next.js

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BRAND = "#F2C016";

export default function TradingScreens() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Don't run animations on mobile
    if (isMobile) return;

    // Wait for DOM to be ready
    const initAnimations = () => {
      // Check if elements exist
      const wrapper = document.querySelector(".wrapper");
      if (!wrapper) {
        // Retry after a short delay if elements aren't ready
        setTimeout(initAnimations, 100);
        return;
      }

      // Set initial state for image-blocks
      gsap.set(".image-block", { opacity: 0, y: 20 });

      // Set initial state for monitor - opacity 0, already positioned in center (no movement)
  

      // =============================
      // 1. Fade-in Animation for image-blocks (one by one) - on scroll
      // =============================
      const imageBlockTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".image-block",
          start: "top 80%",    // start earlier
          end: "bottom 20%",   // end later
          scrub: true,
        },
        defaults: { ease: "power2.out" }
      });

      imageBlockTl
        .to(".image-block", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.8 // One by one with 0.8s delay between each
        });

      // Boxes and corresponding titles
      const boxes = [".box-1", ".box-2", ".box-3", ".box-4", ".box-6"];
      const titles = [".title-1", ".title-2", ".title-3", ".title-4", ".title-5"];

      // 1️⃣ Fade-in boxes individually on scroll
      boxes.forEach((box) => {
        gsap.fromTo(
          box,
          { opacity: 0, scale: 0.7, y: 20 },
          {
            opacity: 1,
            scale: 0.9,
            ease: "power1.out",
            stagger: 0.6,
            scrollTrigger: {
              trigger: box,
              start: "top 90%", // start a bit earlier
              end: "bottom 10%", // end a bit later
              scrub: true,
              
            }
          }
        );
      });

      // 2️⃣ Fade-out titles perfectly synced with their boxes
      boxes.forEach((box, i) => {
        gsap.to(titles[i], {
          opacity: 0,
          y: 10,
          x: 30,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".wrapper", // same as box movement
            start: "top top-=100", // match box move start
            end: "+=1200", 
            scrub: true, // same scrub as box movement
          }
        });
      });


      // =============================
      // 2. Scroll-trigger movement
      // =============================
      let mm = gsap.matchMedia();

mm.add(
  {
    mainDesktop: "(min-width: 1600px)",
    largeDesktop: "(min-width: 1440px) and (max-width: 1599px)",
    desktop1366: "(min-width: 1366px) and (max-width: 1439px)",
    desktop1280: "(min-width: 1280px) and (max-width: 1365px)",
    tablet1024: "(min-width: 1024px) and (max-width: 1279px)",
    small: "(max-width: 1023px)",
  },
  (ctx) => {
    const conditions = ctx.conditions as {
      mainDesktop?: boolean;
      largeDesktop?: boolean;
      desktop1366?: boolean;
      desktop1280?: boolean;
      tablet1024?: boolean;
      small?: boolean;
    };
    
    let {
      mainDesktop,
      largeDesktop,
      desktop1366,
      desktop1280,
      tablet1024,
      small,
    } = conditions;

    // Default values (1440 — large desktop)
    let boxValues = {
      box1: { x: 275, y: 1087, w: "456px" },
      box2: { x: -276, y: 897, w: "456px" },
      box3: { x: 277, y: 840, w: "434px" },
      box4: { x: -275, y: 653, w: "477px" },
      box6: { x: 263, y: 600, w: "913px" },
    };

    // ⭐ 1920px MAIN DESKTOP (most important)
    if (mainDesktop) {
      boxValues = {
        box1: { x: 275, y: 1087, w: "456px" },
        box2: { x: -276, y: 897, w: "456px" },
        box3: { x: 277, y: 840, w: "434px" },
        box4: { x: -275, y: 653, w: "477px" },
        box6: { x: 263, y: 600, w: "913px" },
      };
    }

    // 1440px – 1919px
    if (largeDesktop) {
      boxValues = {
        box1: { x: 275, y: 1087, w: "456px" },
        box2: { x: -276, y: 897, w: "456px" },
        box3: { x: 277, y: 840, w: "434px" },
        box4: { x: -275, y: 653, w: "477px" },
        box6: { x: 266, y: 600, w: "896px" },
      };
    }

    // 1366 breakpoint
    if (desktop1366) {
      boxValues = {
        box1: { x: 235, y: 1087, w: "456px" },
        box2: { x: -237, y: 897, w: "456px" },
        box3: { x: 237, y: 840, w: "434px" },
        box4: { x: -236, y: 653, w: "477px" },
        box6: { x: 226, y: 602, w: "904px" },
      };
    }

    // 1280 breakpoint
    if (desktop1280) {
      boxValues = {
        box1: { x: 193, y: 1087, w: "456px" },
        box2: { x: -196, y: 897, w: "456px" },
        box3: { x: 194, y: 841, w: "434px" },
        box4: { x: -194, y: 653, w: "477px" },
        box6: { x: 183, y: 600, w: "895px" },
      };
    }

    // 1024 breakpoint
    if (tablet1024) {
      boxValues = {
        box1: { x: 150, y: 720, w: "380px" },
        box2: { x: -150, y: 600, w: "380px" },
        box3: { x: 150, y: 560, w: "360px" },
        box4: { x: -150, y: 430, w: "400px" },
        box6: { x: 140, y: 400, w: "680px" },
      };
    }

    // Mobile / small screens
    if (small) {
      boxValues = {
        box1: { x: 0, y: 420, w: "90%" },
        box2: { x: 0, y: 350, w: "90%" },
        box3: { x: 0, y: 300, w: "90%" },
        box4: { x: 0, y: 240, w: "90%" },
        box6: { x: 0, y: 220, w: "95%" },
      };
    }

    // Timeline
    const mergeTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top top-=680",
        end: "bottom+=200 bottom",
        scrub: true,
      },
    });

    mergeTl
      .to(".box-1", {
        x: boxValues.box1.x,
        y: boxValues.box1.y,
        width: boxValues.box1.w,
        opacity: 1,
        scale: 0.9,
        ease: "none",
      })
      .to(
        ".box-2",
        {
          x: boxValues.box2.x,
          y: boxValues.box2.y,
          width: boxValues.box2.w,
          opacity: 1,
          scale: 0.9,
          ease: "none",
        },
        0
      )
      .to(
        ".box-3",
        {
          x: boxValues.box3.x,
          y: boxValues.box3.y,
          width: boxValues.box3.w,
          opacity: 1,
          scale: 0.9,
          ease: "none",
        },
        0
      )
      .to(
        ".box-4",
        {
          x: boxValues.box4.x,
          y: boxValues.box4.y,
          width: boxValues.box4.w,
          height: "172px",
          opacity: 1,
          scale: 0.9,
          ease: "none",
        },
        0
      )
      .to(
        ".box-6",
        {
          x: boxValues.box6.x,
          y: boxValues.box6.y,
          width: boxValues.box6.w,
          opacity: 1,
          scale: 0.9,
          ease: "none",
        },
        0
      );
  }
);

      // =============================
      // 3. Final monitor scale + text
      // =============================
      const finalTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".wrapper",
          start: "bottom bottom",
          end: "+=400",
          scrub: 1,
        },
      });

      finalTl
        .to(".wrapper", { x: "25%", y: "45%", scale: 0.7, duration: 2, ease: "power2.inOut" })
        // Keep boxes visible - no fade-out
        .to(".box-1, .box-2, .box-3, .box-4, .box-6", {
          opacity: 1, // Maintain visibility
          scale: 0.9 // Maintain scale
        }, 0)
        .to(".final-text", { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" }, "-=0.5");

      // Refresh ScrollTrigger after all animations are set up
      ScrollTrigger.refresh();
    };

    // Initialize on mount and after a small delay to ensure DOM is ready
    let cleanup: (() => void) | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    const handleLoad = () => {
      timeoutId = setTimeout(initAnimations, 100);
    };

    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        // Small delay to ensure DOM is fully rendered
        timeoutId = setTimeout(initAnimations, 100);
      } else {
        window.addEventListener("load", handleLoad);
        cleanup = () => window.removeEventListener("load", handleLoad);
      }
    }

    // Cleanup function
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (cleanup) cleanup();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  // Mobile layout - only show GIF and text
  if (isMobile) {
    return (
      <section className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            {/* Final animation GIF */}
            <div className="rounded-xl overflow-hidden">
              <img src="/final-animation.gif" alt="Workflow animation" className="w-full h-auto object-contain" />
            </div>

            {/* Text section */}
            <div className="space-y-6">
              <h2 className="font-bold text-white text-[35px] sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                Start Trading with <br /> Institutional Precision
              </h2>

              <p className="text-white/90 text-base leading-relaxed">
                In the 24/7 market for Digital Assets, Derivatives, and Forex, leverage Collybus's tools for precision,
                superior risk control, and operational reliability.
              </p>

              <a
                href="mailto:contact@collybus.co"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 20,
                  background: "#F2C016",
                  color: "black",
                  padding: "12px 30px",
                  borderRadius: 40,
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Get in Touch</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop layout - full animations
  return (
    <div className="container" style={{ maxWidth: "1440px", margin: "0 auto" }}>
      <div className="main-wrapper" style={{ position: "relative" }}>
        <div className="wrapper" style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
        
          {/* ROW 1 */}
          <div style={{ display: "flex", justifyContent: "flex-start", gap: 100, padding: "0px 10px", transform: "translateY(20px)" }}>
            <div className="image-block">
              <img src="/Streaming Perps.png" className="animated-screen-image box-1" alt="" />
              <h3 className="image-title title-1"><span style={{ color: BRAND }}><strong>1.</strong></span> Streaming Perps</h3>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 100, padding: "0px 10px", transform: "translateY(20px)" }}>
          <div className="image-block">
              <img src="/Streaming Spot.png" className="animated-screen-image box-2" alt="" />
              <h3 className="image-title title-2"><span style={{ color: BRAND }}><strong>2.</strong></span> Streaming Spot</h3>
            </div>
          </div>

          {/* ROW 2 */}
          <div style={{ display: "flex", justifyContent: "flex-start", gap: 100, padding: "0px 10px", transform: "translateY(20px)" }}>
            <div className="image-block">
              <img src="/Multiple instruments multiple venues.png" className="animated-screen-image box-3" alt="" />
              <h3 className="image-title title-3"><span style={{ color: BRAND }}><strong>3.</strong></span> Multiple instruments multiple venues</h3>
            </div>
          </div>


          <div style={{ display: "flex", justifyContent: "flex-end", gap: 100, padding: "0px 10px" }}>
          <div className="image-block">
              <img src="/Charting.png" className="animated-screen-image box-4" alt="" />
              <h3 className="image-title title-4"><span style={{ color: BRAND }}><strong>4.</strong></span> Charting</h3>
            </div>
             </div>

          {/* SINGLE IMAGE */}
          <div className="image-block">
            <img src="/Picture66.png" className="animated-screen-image box-6" alt="" />
            <h3 className="image-title title-5"><span style={{ color: BRAND }}><strong>5.</strong></span> Streaming Options</h3>
          </div>

          {/* Monitor */}
          <div className="monitor" style={{ maxWidth: 852, margin: "0 auto" }}>
            <img src="/screen-new.png" alt="Monitor Base" />
          </div>
        </div>

        {/* FINAL TEXT */}
        <div
          className="final-text"
          style={{
            opacity: 0,
            transform: "translateX(-50px)",
            position: "absolute",
            top: "105%",
            left: 50,
            width: "40%",
          }}
        >
          <h2 className="font-bold text-white text-[56px] leading-tight">
            Start Trading with <br /> Institutional Precision
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mt-6 max-w-xl">
            In the 24/7 market for Digital Assets, Derivatives, and Forex, leverage Collybus's tools for precision,
            superior risk control, and operational reliability.
          </p>

          <a
            href="mailto:contact@collybus.co"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginTop: 20,
              background: "#F2C016",
              color: "black",
              padding: "12px 30px",
              borderRadius: 40,
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <span>Get in Touch</span>
          </a>
        </div>
        </div>


      <div style={{ marginTop: 500, fontSize: 0 }}>Slider</div>

      {/* INTERNAL STYLES */}
      <style>{`
        body { overflow-x: hidden; background: #0d0d0d; color: #fff; }
        .image-block { display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 0px; }
        .image-title { margin-top: 10px; font-size: 18px; color: #fff; margin-left: 40px; opacity: 1; transform: translate(0,0); }
        .box-1, .box-2, .box-3, .box-4, .box-6 { opacity: 0; transform: scale(0.5); }
        .monitor { z-index: -1; position: relative; transform: translate(0px, 140px);}
      `}</style>
    </div>
  );
}
