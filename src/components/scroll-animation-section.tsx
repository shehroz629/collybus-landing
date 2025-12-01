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

    // =============================
    // 1. Fade-in Animation for image-blocks (one by one) - on scroll
    // =============================
    const imageBlockTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".image-block",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
      defaults: { ease: "power2.out" }
    });

    imageBlockTl
      .to(".image-block", { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        stagger: 0.5 // One by one with 0.5s delay between each
      });

    // =============================
    // 2. Fade-in Animation for boxes
    // =============================
    // const fadeTl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".wrapper",
    //     start: "top center",
    //     end: "bottom center",
    //     scrub: false,
    //   },
    //   defaults: { ease: "power2.out" }
    // });
    
    // fadeTl
    //     .to(".box-1", { opacity: 1, scale: 0.9, duration: 0.8, x: 0 })
    //     .to(".box-2", { opacity: 1, scale: 0.9, duration: 0.8, x: 0 }, "+=0.3")
    //     .to(".box-3", { opacity: 1, scale: 0.9, duration: 0.8, x: 0 }, "+=0.3")
    //     .to(".box-4", { opacity: 1, scale: 0.9, duration: 0.8, x: 0 }, "+=0.3")
    //     .to(".box-6", { opacity: 1, scale: 0.9, duration: 0.8, x: 0 }, "+=0.3");



   // Boxes and corresponding titles
const boxes = [".box-1", ".box-2", ".box-3", ".box-4", ".box-6"];
const titles = [".title-1", ".title-2", ".title-3", ".title-4", ".title-5"];

// 1️⃣ Fade-in boxes individually on scroll
boxes.forEach((box) => {
  gsap.fromTo(
    box,
    { opacity: 0, scale: 0.7 },
    {
      opacity: 1,
      scale: 0.9,

      ease: "power1.out",
      scrollTrigger: {
        trigger: box,
        start: "top 90%",  // start a bit earlier
        end: "top 40%",    // end a bit later
        scrub: true,        // shorter scrub for noticeable zoom
      }
    }
  );
});

// 2️⃣ Fade-out titles perfectly synced with their boxes
boxes.forEach((box, i) => {
  gsap.to(titles[i], {
    opacity: 0,
    y: -20,
    x: 30,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".wrapper",       // same as box movement
      start: "top top-=100",     // match box move start
      end: "bottom-=200 bottom", // match box move end
      scrub: true,           // same scrub as box movement
    }
  });
});

        

    // =============================
    // 2. Scroll-trigger movement
    // =============================
    const mergeTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top top-=100",
        end: "bottom-=200 bottom",
        scrub: true,
      }
    });
    
    // All boxes animate together smoothly
    mergeTl.to(".box-1", {
      x: 84,
      y: 706,
      width: "465px",
      ease: "none"
    })
    .to(".box-2", {
      x: -84,
      y: 706,
      width: "465px",
      ease: "none"
    }, 0)
    .to(".box-3", {
      x: 84,
      y: 590,
      width: "465px",
      ease: "none"
    }, 0)
    .to(".box-4", {
      x: -84,
      y: 590,
      width: "465px",
      height: "180px",
      ease: "none"
    }, 0)
    .to(".box-6", {
      x: 263,
      y: 504,
      width: "913px",
      ease: "none"
    }, 0);
    

    // =============================
    // 3. Final monitor scale + text
    // =============================
    const finalTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "bottom bottom",
        end: "+=500",
        scrub: 1,
      },
    });

    finalTl
      .to(".wrapper", { x: "25%", y: "45%", scale: 0.7, duration: 2, ease: "power2.inOut" })
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
              <h2 className="font-bold text-white text-4xl leading-tight">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
          <div style={{ display: "flex", justifyContent: "center", gap: 100, padding: "20px 10px" }}>
            <div className="image-block">
              <img src="/Streaming Perps.png" className="animated-screen-image box-1" alt="" />
              <h3 className="image-title title-1"><span style={{ color: BRAND }}><strong>1.</strong></span> Streaming Perps</h3>
            </div>

            <div className="image-block">
              <img src="/Streaming Spot.png" className="animated-screen-image box-2" alt="" />
              <h3 className="image-title title-2"><span style={{ color: BRAND }}><strong>2.</strong></span> Streaming Spot</h3>
            </div>
          </div>

          {/* ROW 2 */}
          <div style={{ display: "flex", justifyContent: "center", gap: 100, padding: "20px 10px" }}>
            <div className="image-block">
              <img src="/Multiple instruments multiple venues.png" className="animated-screen-image box-3" alt="" />
              <h3 className="image-title title-3"><span style={{ color: BRAND }}><strong>3.</strong></span> Multiple instruments multiple venues</h3>
            </div>

            <div className="image-block">
              <img src="/Charting.png" className="animated-screen-image box-4" alt="" />
              <h3 className="image-title title-4"><span style={{ color: BRAND }}><strong>4.</strong></span> Charting</h3>
            </div>
          </div>

          {/* SINGLE IMAGE */}
          <div className="image-block">
            <img src="/Streaming Options.png" className="animated-screen-image box-6" alt="" />
            <h3 className="image-title title-5"><span style={{ color: BRAND }}><strong>5.</strong></span> Streaming Options</h3>
          </div>

          {/* Monitor */}
          <div className="monitor" style={{ maxWidth: 852, margin: "0 auto" }}>
            <img src="/screen.png" alt="Monitor Base" />
          </div>
        </div>

        {/* FINAL TEXT */}
        <div
          className="final-text"
          style={{
            opacity: 0,
            transform: "translateX(-50px)",
            position: "absolute",
            top: "95%",
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path  stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
           <span>Get in Touch</span> 
          </a>
        </div>
      </div>

      <div style={{ marginTop: 500, fontSize: 0 }}>Slider</div>

      {/* INTERNAL STYLES */}
      <style>{`
        body { overflow-x: hidden; background: #0d0d0d; color: #fff; }
        .image-block { display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 20px; }
        .image-title { margin-top: 10px; font-size: 18px; color: #fff; margin-left: 40px; opacity: 1; transform: translate(0,0); }
        .box-1, .box-2, .box-3, .box-4, .box-6 { opacity: 0; transform: scale(0.5); }
      `}</style>
    </div>
  );
}
