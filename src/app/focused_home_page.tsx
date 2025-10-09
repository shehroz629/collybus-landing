import React, { useEffect, useState, useRef } from "react";
import FoundersSection from "../components/founders-section";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import TradingViewWidget from "../components/TradingViewWidget";
import TradingViewCryptoTicker from "../components/TradingViewCryptoTicker";
import { ArrowRight, BarChart3, Shield, Zap, LineChart, Users, BookOpen, Layers, Cpu, Activity, Handshake, Target, Compass, Mail } from "lucide-react";
import FloatingCTA from "@/components/floating-cta-new";

const BRAND = "#F2C016";
// Inlined video (works inside canvas, no network needed)
const ANIM_MP4_DATA = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNGEAAAPKam9JUCAgICAAAAAAAG1vb3YAAABsbXZoZAAAAABwb1oKcG9aCgAAABAAABAAABAAAABAAABAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAB0cmFrAAAAXHRraGQAAAABcG9aCnBvWgoAAAAQAAAQAAAEAAAAQAAAAQAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAG1kaWEAAAAgbWRoZAAAAABwb1oKcG9aCgAAABAAABAAABAAAABAAABhAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABpbWRoYXQAAACVZGluZgAAAGJpc28yYXZjMQAAAEJzZHRwAAAAiMzFxWBAQG2m4b0wff6pM0J3Y8fmlQmE4pHkDg7y4tQeJ0B2s1A9Oa0v3w1w2h8b4sJEqCqYFzN2fV0Cw2d7zH0dJYQ1Wk4FmDzfPz7qH3Lx7y6qjYpS6p8U5mWcHnGQZ+4JQ1RDU8wZahqB8x+fYgqX1kE6K0q0t1uFZpZ3J3b2RzYXRm1o0tN1y6F0SmT3GQK2fV2B2RUhrZm9KX3m6YB9HFXqvW3l/9aHh7AVc7o3h2aU9bU8fIYk5xvYb4gP3QNk4Oa7w1W8eFvG1sJ3d1E0mHj+YzLk3u4oGwTn0kC1g1GZ+0b5bYVQ3Vn2nQp/e3o6h1Y3aXQz3jJxg7s6Y1q0z0e0c0bW1QwNwAAAHhtZHRhAAAAIG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABtZGlyYXBwbAAAAAAAAAABAAAB9GR1cmF0aW9uAAAAAAA1QAAAbHN0YmwAAAAAAAAAAQAAAABzdHNkAAAAAAAAAAEAAAABAAAC2G1wNGEAAAAAAAAAAQAAADBtZGlhAAAAIG1pbmYAAAAUdm1oZGRoZAAAAABwb1oKcG9aCgAAAAEAAQABAAAAAAACAAAAR21oZGEAAABWbWRoZAAAAABwb1oKcG9aCgAAABAAABAAABAAAABAAABTAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABoZGxyAAAAAAAAAABtZGludHJhYwAAAHh0cml0AAAAXG1ldGEAAAAIZGluZgAAAGVpc28yYXZjMQAAAGhpc2YAAAAWdm1oZGRoZAAAAABwb1oKcG9aCgAAAAEAAQABAAAAAAADAAAAZG1oZGEAAAAXdmlkZQAAAAAAAAAAAAAAAG1wNGEAAAAAAAAAAAAAAAAAAAAAAABkdGFhAAAADGRyZWYAAAAAAAAAABIBAAABdXJsIAAAAB1odHRwczovL3d3dy5kcm9wYm94LmNvbS8AAAAAZG1kYXRhAAAAIG1ldGEAAAAAAAAAK2lsc3QAAAAgbXBlZ2FjAAAAAAAAAAEAAAACAAAAAAABAAAAAABzb3VybmFjdwAAACBpc28yYXZjMQAAAAABAAAACAAAAAEAAAAAAAAAAG1kYXQAAAAiZGF0YQAAAQAAAABMYXZmNjEuNy4xMDA=";
const ANIM_WEBM_DATA = "data:video/webm;base64,GkXfo59ChoEBQveBAULWAoB9QoaBAULyA0KssDxBug9oQgEAAAAAAAI/bW9vdm0AAABsbXZoZAAAAABCaQABQmkAAACAAACsAAACC2F2MDFtYXRyb3NrYQAAAC9kYXRhAAAAAQAAAGppbmZvAAAAAQAAAC9pc29tAAABPGRhdGEAAAAAqG1haW4AAAAAAAEAAABDaGFuZWwAAABDb2RlYy1TdHJlYW0AAABWUEk5AAAACG1lZGlhAAAAAAABAAAAJmJpc28yYXZjMQAAAAEAAABwZGF0YQAAAABDb2xseWJ1c19jcnlwdG9fYW5pbWF0aW9uX3NtYWxsX3ZlcnNpb24ud2VibS5tcDQAAAAAAQAAABJtZGZyAAAAAQAAAEhkbGIAAAAAAAEAAAAtbWluZgAAABZ2bWhkAAAAAEJpAAFCaQAAAAAAAQAAAAAAAG1kYXQAAAAiZGF0YQAAAQAAAABIv7f+o0S3h7lJr9A/OI1YTcTxI7PPk+LTSkn4E06MN3oDIvI/nJSkv3gt9YdZrT/82eZ2z6IsxR8e7JmDkoEYr7vV+fXH1lZC0x0j3gQF5skFJX5h7DCS0z6sUPbV3V2t7lJrJgU2d+z+2+2zvJr2pDAGp7ZQh2LyJXjR2iuR1S+Lh1z1+qekmZsQq8kHdR9y4kGP8LQiYJmE2KcCz9tT5S19q1q1Vd1UubVKz5p2LrZr6xw6F0k1nVB8l7l9C9pZrMZiQv1N8m6R1s+OQ6y+Y8O5r8gYfZ8zZt7yW7z8d2nx8fP8b35XJqz9gAA==";

const hexToRgba = (hex: string, a: number) => {
  const h = hex.replace("#", "");
  const b = parseInt(h, 16);
  const r = (b >> 16) & 255, g = (b >> 8) & 255, bl = b & 255;
  return `rgba(${r}, ${g}, ${bl}, ${a})`;
};
// moved founders section to a client component to avoid hydration mismatch
      const founders = [
        { name: "PJ", role: "Co-Founder & CEO", photo: "/images/Peter Jacobson.jpg" },
        { name: "GO'S", role: "Co-Founder & CRO", photo: "/images/Greg O'Sullivan.jpg" },
        { name: "Johnny", role: "Co-Founder & CCO", photo: "/images/Jonathan Wharton.jpg" },
        { name: "JD", role: "Co-Founder & CTO", photo: "/images/James Dalton.jpg" },
      ];
/* ===== Hero Background (tickers + glow) ===== */
function HeroBackground() {
  const glow1 = `radial-gradient(circle at 50% 50%, ${hexToRgba(BRAND,0.2)}, ${hexToRgba(BRAND,0)} 60%)`;
  const glow2 = `radial-gradient(circle at 50% 50%, ${hexToRgba(BRAND,0.12)}, ${hexToRgba(BRAND,0)} 60%)`;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* soft aurora glows */}
      <motion.div className="absolute -top-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full blur-3xl" style={{ background: glow1 }} animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}/>
      <motion.div className="absolute -bottom-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full blur-3xl" style={{ background: glow2 }} animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}/>

      {/* floating bubbles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{ width: 6, height: 6, background: BRAND, left: `${5 + i * 7}%` }}
            initial={{ y: 320, opacity: 0 }}
            animate={{ y: [320, 210, 260, 190, 320], opacity: [0, 0.9, 0.8, 0.9, 0] }}
            transition={{ duration: 8 + (i % 4), delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* mid sparkline */}
      <svg className="absolute inset-x-0 top-1/3 w-full h-40 opacity-30" viewBox="0 0 1200 200" preserveAspectRatio="none">
        {[
          { stroke: hexToRgba(BRAND, 0.6), keyframes: ["M0 140 C150 120, 300 160, 450 110 S750 100, 900 140 S1050 180, 1200 120", "M0 120 C150 160, 300 130, 450 150 S750 80, 900 110 S1050 160, 1200 140"], width: 2 },
          { stroke: "rgba(255,255,255,0.55)", keyframes: ["M0 100 C120 80, 300 120, 480 90 S780 110, 960 80 S1080 120, 1200 100", "M0 90 C120 120, 300 95, 480 130 S780 90, 960 120 S1080 80, 1200 110"], width: 1 },
        ].map((p, i) => (
          <motion.path key={i} d={p.keyframes[0]} animate={{ d: p.keyframes }} transition={{ duration: 10 + i * 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} stroke={p.stroke} strokeWidth={p.width} fill="none" />
        ))}
      </svg>

      {/* Tickers */}
      <div className="pointer-events-none">
        {/* TradingView ticker at top */}
        <div className="absolute left-0 right-0 w-full" style={{ top: "4%" }}>
          <TradingViewWidget />
        </div>
        {/* TradingView ticker at bottom */}
        <div className="absolute left-0 right-0 w-full" style={{ bottom: "0rem" }}>
          <TradingViewCryptoTicker />
        </div>
      </div>
    </div>
  );
}

interface HeroProps {
  title: React.ReactNode;
  subtitle: string;
  ctaPrimary?: React.ReactNode;
  ctaSecondary?: React.ReactNode;
}
function Hero({ title, subtitle, ctaPrimary = null, ctaSecondary = "See product" }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 relative z-10">
  <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white pt-8 pb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="mt-5 text-white/80 max-w-2xl text-lg">{subtitle}</motion.p>
        {(ctaPrimary || ctaSecondary) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="mt-8 flex flex-wrap gap-3">
            {ctaPrimary && (
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold" style={{ background: BRAND, color: "black" }}>
                {ctaPrimary} <ArrowRight size={16} />
              </button>
            )}
            {ctaSecondary && (
              <a
                href="/product"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold"
                style={{ background: BRAND, color: "black" }}
              >
                {ctaSecondary}
                <ArrowRight size={16} />
              </a>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

interface PillProps {
  icon?: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  text: string;
}
function Pill({ icon: Icon, title, text }: PillProps) {
  return (
    <motion.div 
      initial="rest"
      whileHover="hover"
      animate="rest"
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 10
      }}
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.02 }
      }}
      className="relative rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.08] transition-all duration-300 group"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#F2C016]/0 via-[#F2C016]/10 to-[#F2C016]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"/>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-9 h-9 rounded-lg flex items-center justify-center" 
            style={{ background: hexToRgba(BRAND, 0.15) }}
          >
            {Icon ? <Icon size={24} color={BRAND} /> : null}
          </div>
          <div className="text-white font-medium">{title}</div>
        </div>
        <div className="text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">{text}</div>
      </div>
    </motion.div>
  );
}

interface FlipValueCardProps {
  icon?: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  desc: string;
}
function FlipValueCard({ icon: Icon, title, desc }: FlipValueCardProps) {
  return (
    <div className="relative [perspective:1000px]">
      <motion.div initial="front" whileHover="back" className="relative h-36 z-10" style={{ transformStyle: "preserve-3d" }}>
        <motion.div variants={{ front: { rotateY: 0 }, back: { rotateY: 180 } }} transition={{ duration: 0.5, ease: "easeInOut" }} className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col items-center justify-center gap-3 text-center" style={{ backfaceVisibility: "hidden" }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: hexToRgba(BRAND, 0.15) }}>{Icon ? <Icon size={24} color={BRAND} /> : null}</div>
          <div className="text-white font-medium leading-tight">{title}</div>
        </motion.div>
        <motion.div variants={{ front: { rotateY: -180 }, back: { rotateY: 0 } }} transition={{ duration: 0.5, ease: "easeInOut" }} className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 p-6 flex items-center justify-center text-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <p className="text-sm text-white/70 leading-relaxed text-center">{desc}</p>
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0.18, scaleX: 1, y: 0 }} whileHover={{ opacity: 0.34, scaleX: 1.15, y: 2 }} transition={{ duration: 0.35, ease: "easeOut" }} className="pointer-events-none absolute inset-x-6 -bottom-2 h-6 rounded-full blur-xl" style={{ background: `radial-gradient(ellipse at center, ${hexToRgba(BRAND, 0.32)} 0%, rgba(0,0,0,0) 70%)` }} />
    </div>
  );
}

interface SectionProps {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  subdued?: boolean;
  id?: string;
}
function Section({ eyebrow, title, children, subdued = false, id }: SectionProps) {
  return (
    <section id={id} className={`${subdued ? "bg-white/[0.02]" : ""} border-t border-white/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          {eyebrow && <div className="text-[11px] uppercase tracking-[0.22em] text-white/50">{eyebrow}</div>}
          {title && (
            <h2
              className="text-2xl sm:text-3xl font-semibold text-white mt-2 pt-6 pb-6"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {title}
            </h2>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

interface PlaceholderShotProps {
  label?: string;
}
function PlaceholderShot({ label = "Product screenshot" }: PlaceholderShotProps) {
  return (<div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] h-64 md:h-80 flex items-center justify-center text-white/50 text-sm">{label}</div>);
}

function HowItWorksVideo() {
  return (
    <div className="relative rounded-2xl  h-64 md:h-80 overflow-hidden flex items-center justify-center">
      <video
        src="/images/collybus_crypto_animation.mp4"
        className="h-full w-auto object-contain rounded-xl"
        
        autoPlay
        muted
        loop
      >
        Sorry, your browser does not support embedded videos.
      </video>
    </div>
  );
}

/* ===== Animated mini-icons (used in Why Collybus) ===== */
function AnimatedBarChartIcon({ size = 24, color = BRAND }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.rect x="5.5" rx="0.9" width="3" fill={color} variants={{rest:{y:13,height:6},hover:{y:[13,10,12,13],height:[6,9,7,6],transition:{duration:1.6,repeat:Infinity,ease:"easeInOut"}}}}/>
      <motion.rect x="10.5" rx="0.9" width="3" fill={hexToRgba(color,0.85)} variants={{rest:{y:11,height:8},hover:{y:[11,14,9,11],height:[8,5,10,8],transition:{duration:1.6,repeat:Infinity,ease:"easeInOut",delay:0.15}}}}/>
      <motion.rect x="15.5" rx="0.9" width="3" fill={hexToRgba(color,0.7)} variants={{rest:{y:12,height:7},hover:{y:[12,9,13,12],height:[7,10,6,7],transition:{duration:1.6,repeat:Infinity,ease:"easeInOut",delay:0.3}}}}/>
    </svg>
  );
}
function AnimatedLayersIcon({ size = 24, color = BRAND }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="14" width="14" height="3" rx="1.2" fill={hexToRgba(color,0.35)} />
      <rect x="6.5" y="10.5" width="11" height="3" rx="1.2" fill={hexToRgba(color,0.55)} />
      <motion.rect x="8" width="8" height="3" rx="1.2" fill={color} variants={{rest:{y:6,rotate:0},hover:{y:[6,11,6],rotate:[0,-4,0],transition:{duration:1.1,repeat:Infinity,ease:"easeInOut"}}}}/>
    </svg>
  );
}
function AnimatedFundingIcon({ size = 24, color = BRAND }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.path d="M2 12 H7 L9 8 L12 16 L14 12 H22" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40 40" variants={{rest:{strokeDashoffset:0},hover:{strokeDashoffset:[40,0],transition:{duration:1.6,repeat:Infinity,ease:"linear"}}}}/>
      <motion.circle cx="22" cy="12" r="1.5" fill={color} variants={{rest:{scale:1,opacity:0.9},hover:{scale:[1,1.2,1],opacity:[0.9,1,0.9],transition:{duration:1.2,repeat:Infinity,ease:"easeInOut"}}}}/>
    </svg>
  );
}

/* ===== Small building blocks ===== */
// ...existing code...

/* ===== CONNEX Fade Show (static) ===== */
// ...existing code...

/* ===== Animated UI Loop (How it works) ===== */
// ...existing code...

/* ===== How It Works — Video (replaces AnimatedUILoop) ===== */
// ...existing code...

/* ===== Home Page (focused) ===== */
// ...existing code...

/* ===== CTA + Footer ===== */
// function FloatingCTA() {
//   return (
//     <a
//       className="fixed bottom-6 right-6 z-50 bg-yellow-400 text-black px-6 py-3 rounded-2xl shadow-lg font-semibold flex items-center gap-2 hover:bg-yellow-300 transition-colors"
//       href="mailto:contact@collybus.co"
//       aria-label="Get in touch"
//     >
//       <Mail size={16} /> Get in Touch
//     </a>
//   );
// }
const outcomesStagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.06 } } };
const outcomesItem: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 320, damping: 28 } }
};

function HomeFocused() {
  return (
    <main className="bg-black text-white">
      <Hero title={<><span style={{ color: BRAND }} className="block text-4xl sm:text-5xl lg:text-6xl">FX-grade Precision</span><span className="block text-2xl sm:text-3xl lg:text-4xl">Trade Digital Assets and Derivatives, Foreign Exchange and Precious Metals</span></>} subtitle="Multi-venue visibility, execution algos & order types (TWAP/VWAP/IOC/FOK), normalised contract sizing, funding & ADL alerts, and real-time P&L/margin/exposure—built for institutional desks." />

      <Section eyebrow="Why Collybus" title="Execution that matches your process">
        <div className="grid md:grid-cols-3 gap-5">
          <Pill icon={AnimatedBarChartIcon} title="Multi-venue visibility" text="See depth and prices across venues in one location—act quickly when liquidity rotates." />
          <Pill icon={AnimatedLayersIcon} title="Normalised sizing" text="Size consistently across contracts and venues; compare risk apples-to-apples." />
          <Pill icon={AnimatedFundingIcon} title="Funding-rate awareness" text="Stream funding trends and alerts to avoid paying the crowd and manage carry." />
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <div className="mb-8">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/50">How it works</div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-2 pt-6 pb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Connect → Configure → Execute
              </h2>
            </div>
            <div className="space-y-6 text-white/80 text-lg md:text-2xl leading-7 md:leading-8 lg:leading-9">
              <div className="flex gap-3 text-sm md:text-base"><span style={{ color: BRAND }}>01</span> Connect venues, custody, and data feeds securely.</div>
              <div className="flex gap-3 text-sm md:text-base"><span style={{ color: BRAND }}>02</span> Set contract sizing, risk limits, and alerts (funding, margin, exposure).</div>
              <div className="flex gap-3 text-sm md:text-base"><span style={{ color: BRAND }}>03</span> Execute with TWAP/VWAP/IOC/FOK; monitor P&L/margin in real time.</div>
            </div>
          </div>
          <div className="flex items-center justify-center h-full">
            <HowItWorksVideo />
          </div>
        </div>
      </Section>

      <Section eyebrow="CONNEX" title="The institutional trading workspace" id="connex">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="justify-self-start">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 md:p-4 max-w-[520px] md:max-w-[560px]">
              <img src="/images/Trading Screen.png" alt="CONNEX platform screenshot" className="w-full h-auto object-contain" />
            </div>
          </div>
          <div className="space-y-5 text-white/80">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed">CONNEX unifies cross-venue depth, disciplined execution, and real-time risk so traders can act with FX-grade precision</p>
            <ul className="space-y-2 list-disc pl-5 text-white/70 text-sm md:text-base leading-relaxed">
              <li>Consolidated depth & quotes across venues</li>
              <li>Order ticket with TWAP/VWAP/IOC/FOK & conditional exits</li>
              <li>Normalised sizing for consistent risk per trade</li>
              <li>Live funding, P&L, margin & exposure</li>
            </ul>
            <a
              href="/product"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-black"
              style={{ background: BRAND }}
            >
              Learn more <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </Section>

      <Section eyebrow="Outcomes" title="What desks gain" subdued>
        <motion.div className="grid md:grid-cols-3 gap-5" variants={outcomesStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <motion.div variants={outcomesItem} custom={0}><Pill icon={LineChart} title="Better fills" text="Cut slippage with disciplined execution around levels and deeper visibility." /></motion.div>
          <motion.div variants={outcomesItem} custom={1}><Pill icon={Zap} title="Faster idea → trade" text="Reduce clicks and context switches with FX-familiar workflows." /></motion.div>
          <motion.div variants={outcomesItem} custom={2}><Pill icon={Shield} title="Tighter risk" text="24/7 visibility into P&L, margin, and exposure with alerting." /></motion.div>
        </motion.div>
      </Section>

      {/* Founders Section */}
      <Section eyebrow="Founders" title="Meet our founders" subdued>
        <FoundersSection />
      </Section>

      <Section eyebrow="Values" title="Our values">
        <div className="grid md:grid-cols-3 gap-5">
          <FlipValueCard icon={Handshake} title="Client-first" desc="We measure success by desk outcomes and long-term trust." />
          <FlipValueCard icon={Shield} title="Security" desc="Encrypted Keys, permissions, and audit trails." />
          <FlipValueCard icon={Activity} title="Reliability" desc="Dependable systems for 24/7 markets." />
          <FlipValueCard icon={Compass} title="Transparency" desc="Plain language, visible risk, and explainable behaviour." />
          <FlipValueCard icon={Target} title="Discipline" desc="Process-driven execution beats crowd heat." />
          <FlipValueCard icon={BookOpen} title="Development" desc="We work with customers to improve every release." />
        </div>
      </Section>

      <Section eyebrow="Integrations" title="Venues • Data • Custody • OMS/PMS" id="integrations">
  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 opacity-80">
          {/* Existing logos */}
          <a href="https://www.kc.com/" target="_blank" rel="noopener noreferrer" className="ku-coin rounded-lg bg-white/5 border border-white/10 flex items-center justify-center h-15 md:h-20 p-3">
            <img src="https://assets.staticimg.com/web-domain-relation/1.9.13/kc/logo.svg" alt="KC" className="max-h-full w-auto object-contain" />
          </a>
          <a href="https://www.binance.com/" target="_blank" rel="noopener noreferrer" className="binance rounded-lg bg-white/5 border border-white/10 flex items-center justify-center h-15 md:h-20 p-3">
            <img src="data:image/png;base64,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" alt="Binance" className="max-h-full w-auto object-contain" style={{height:'3.5rem'}} />
          </a>
          <a href="https://www.bitmex.com/" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/5 border border-white/10 flex items-center justify-center h-15 md:h-20 p-3">
            <img src="/images/bitmex-fav.png" alt="BitMEX" className="max-h-full w-auto object-contain" style={{height:'2.5rem'}} />
          </a>
          <a href="https://www.deribit.com/" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/5 border border-white/10 flex items-center justify-center h-15 md:h-20 p-3">
            <img src="https://cdn.brandfetch.io/idCB3UIXIk/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1755240691674" alt="Deribit" className="max-h-full w-auto object-contain" />
          </a>
          <a href="https://www.logo.com/" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/5 border border-white/10 flex items-center justify-center h-15 md:h-20 p-3">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAABICAQAAADSOpYzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAHdElNRQfmBwMNKhI4Vg/yAAABMklEQVR42u3aQW6DMBBAUZyT5eSFE/RInS5psOKx8Scq0n9ZNXjA+VE3VpZFkiRJkiShYo0rrYPPWyf3+3VYXZL138nTuudLxLVfVCmHrcXY+uqjteejPF7/XH5G1teXe+ebt1E/Q0IMCTEkxJAQQ0IMCTEkxJAQQ0IMCTEkxJCQ+4XcBq+Orj87n54oPlv3iWc2Xk3A55tzZs8rd+l55OT54PB5ZLrhMjd/2M3keeXufv/a/5QhIYaEGBJiSIghIYaEGBJiSIghIYaEGBJiSEgaMjtG+/B+tw/f8eVqlPq1X7xYlX5wfTXfPj/095Hv1tdfRPLJ/X3kvRkSYkiIISGGhBgSYkiIISGGhBgSYkiIISGGhDwuOOH7a+t4p//qmflticYrf946OS9JkiRJkk75BUgSur6QrNyYAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTA3LTAzVDEzOjQyOjE4KzAwOjAwKpbwNQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wNy0wM1QxMzo0MjoxOCswMDowMFvLSIkAAAAASUVORK5CYII=" alt="Logo" className="max-h-full w-auto object-contain" />
          </a>
          <a href="https://www.kraken.com/" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/5 border border-white/10 flex items-center justify-center h-15 md:h-20 p-3">
            <img src="https://cdn.worldvectorlogo.com/logos/kraken-4.svg" alt="Kraken" className="max-h-full w-auto object-contain" />
          </a>
          {/* BitGo logo */}
          <a href="https://www.bitgo.com/" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/5 border border-white/10 flex items-center justify-center h-15 md:h-20 p-3">
            <img src="/images/bitgo-fav.svg" alt="BitGo" className="max-h-full w-auto object-contain" style={{height:'2.5rem'}} />
          </a>
        </div>
      </Section>

      {/*
      <Section eyebrow="Case study" title="How an FX playbook captured both legs in ETH">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <PlaceholderShot label="Chart placeholder / carousel slot" />
          <div className="space-y-3 text-white/80">
            <p>Attention spiked → reversal → rebound. Using normalised sizing, funding alerts, and disciplined entries/exits, the desk harvested the dip and the push higher without feeding slippage.</p>
            <button className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold" style={{ background: BRAND, color: "black" }}>
              Read the 1-pager <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </Section>
      */}

    </main>
  );
}

function FocusedHomePage() {
  React.useEffect(() => {
    // Check if there's a section parameter in the URL
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-black pt-16 md:pt-20">
      <FloatingCTA />
      <HomeFocused />
    </div>
  );
}

export default FocusedHomePage;
