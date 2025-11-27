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
    // Set initial state for image-blocks
    gsap.set(".image-block", { opacity: 0, y: 20 });

    // =============================
    // 1. Fade-in Animation for image-blocks (one by one) - on scroll
    // =============================
    const imageBlockTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top center", // Start when wrapper reaches center of viewport
        end: "top center",
        toggleActions: "play none none none",
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
    const fadeTl = gsap.timeline({ defaults: { ease: "power2.out" } });

    fadeTl
      .to(".box-1", { opacity: 1, scale: 1, duration: 0.8 })
      .to(".box-2", { opacity: 1, scale: 1, duration: 0.8 }, "-=0.3")
      .to(".box-3", { opacity: 1, scale: 1, duration: 0.8 }, "-=0.3")
      .to(".box-4", { opacity: 1, scale: 1, duration: 0.8 }, "-=0.3")
      .to(".box-6", { opacity: 1, scale: 1, duration: 0.8 }, "-=0.3");

    // =============================
    // 2. Scroll-trigger movement
    // =============================
    gsap.utils.toArray<Element>(".box-1, .box-2, .box-3, .box-4, .box-6").forEach((box) => {
      gsap.to(box, {
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top top-=40",
          end: "bottom-=200 bottom",
          scrub: true,
        },
        y: () => {
          if (box.classList.contains("box-1") || box.classList.contains("box-2")) return 718;
          if (box.classList.contains("box-3") || box.classList.contains("box-4")) return 620;
          if (box.classList.contains("box-6")) return 522;
          return 0;
        },
        x: () => {
          if (box.classList.contains("box-1") || box.classList.contains("box-3")) return 54;
          if (box.classList.contains("box-2") || box.classList.contains("box-4")) return -54;
          if (box.classList.contains("box-6")) return 261;
          return 0;
        },
        width: box.classList.contains("box-6") ? "919px" : "465px",
        height: () => (box.classList.contains("box-4") ? "180px" : "auto"),
        ease: "none",
      });
    });

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

    // =============================
    // 4. Hide titles on scroll
    // =============================
    gsap.utils.toArray<Element>(".image-title").forEach((title) => {
      gsap.to(title, {
        y: -20,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top top+=50",
          end: "top top+=0",
          scrub: true,
        },
      });
    });
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
          <div className="monitor" style={{ maxWidth: 955, margin: "0 auto" }}>
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
           <span>Get in Touch</span> 
          </a>
        </div>
      </div>

      <div style={{ marginTop: 500, fontSize: 0 }}>Slider</div>

      {/* INTERNAL STYLES */}
      <style>{`
        body { overflow-x: hidden; background: #0d0d0d; color: #fff; }
        .image-block { display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 20px; }
        .image-title { margin-top: 10px; font-size: 18px; color: #fff; }
        .box-1, .box-2, .box-3, .box-4, .box-6 { opacity: 0; transform: scale(0.5); }
      `}</style>
    </div>
  );
}
