import React, { useEffect, useState, useRef } from "react";
import FoundersSection from "../components/founders-section";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import TradingViewWidget from "../components/TradingViewWidget";
import TradingViewCryptoTicker from "../components/TradingViewCryptoTicker";
import { ArrowRight, BarChart3, Shield, Zap, LineChart, Users, BookOpen, Layers, Cpu, Activity, Handshake, Target, Compass, Mail } from "lucide-react";
import FloatingCTA from "@/components/floating-cta-new";
import ScrollAnimationSection from "@/components/scroll-animation-section";



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
      <motion.div className="absolute -top-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-40" style={{ background: glow1 }} animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}/>
      
      {/* Left side yellow shade image */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] pointer-events-none" style={{ backgroundImage: 'url(/uploaded_image_1.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'top left', opacity: 0.6 }} />

      {/* World Map Background - Animated */}
      <div className="absolute top-0 bottom-0 left-0 w-[40%] pointer-events-none overflow-hidden" style={{ maskImage: 'linear-gradient(to right, black 0%, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 0%, black 40%, transparent 100%)' }}>
        <motion.div 
          className="flex h-full w-[300%]"
          initial={{ x: "0%" }} 
          animate={{ x: "-66.666%" }} 
          transition={{ repeat: Infinity, ease: "linear", duration: 15, repeatType: "loop" }}
        >
          <div className="w-1/3 h-full" style={{ backgroundImage: 'url(/map.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25, mixBlendMode: 'screen' }} />
          <div className="w-1/3 h-full" style={{ backgroundImage: 'url(/map.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25, mixBlendMode: 'screen' }} />
          <div className="w-1/3 h-full" style={{ backgroundImage: 'url(/map.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25, mixBlendMode: 'screen' }} />
        </motion.div>
      </div>
      






      {/* Tickers removed as per request */}
      <div className="pointer-events-none">
      </div>
    </div>
  );
}

interface HeroProps {
  title: React.ReactNode;
  subtitle: string;
  text: string;
  ctaPrimary?: React.ReactNode;
  ctaSecondary?: React.ReactNode;
}
function Hero({ title, subtitle, text }: HeroProps) {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center z-0">
      <HeroBackground />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10 w-full flex flex-col items-center text-center">
        
          <motion.h1 
            initial={{ opacity: 0, y: 16 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            className="font-semibold tracking-tight text-white mb-6" 
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '96px', lineHeight: '1.1' }}
          >
            <span style={{ color: BRAND }}>COLLYBUS:</span> The Institutional<br />Trading Workspace
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 16 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1, duration: 0.5 }} 
            className="font-medium mb-8"
            style={{ fontSize: '56px', lineHeight: '1.2', color: '#FFFFFF99' }}
          >
            {subtitle}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.5 }} 
            className="text-white/80 max-w-4xl mx-auto"
            style={{ fontSize: '18px', lineHeight: '1.6' }}
          >
            {text}
          </motion.p>
        
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

interface ValueFlipCardProps {
  imageSrc: string;
  title: string;
  desc: string;
}
function ValueFlipCard({ imageSrc, title, desc }: ValueFlipCardProps) {
  return (
    <div className="relative [perspective:1000px] h-64 w-full">
      <motion.div initial="front" whileHover="back" className="relative h-full w-full z-10" style={{ transformStyle: "preserve-3d" }}>
        {/* Front Side */}
        <motion.div 
          variants={{ front: { rotateY: 0 }, back: { rotateY: 180 } }} 
          transition={{ duration: 0.6, ease: "easeInOut" }} 
          className="absolute inset-0 rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col items-center justify-center gap-6 text-center" 
          style={{ backfaceVisibility: "hidden", background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat" }}
        >
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={imageSrc} alt={title} className="w-12 h-12 object-contain" />
          </div>
          <div className="text-white font-medium leading-tight" style={{ fontSize: '28px', color: '#F2C016' }}>{title}</div>
        </motion.div>
        
        {/* Back Side */}
        <motion.div 
          variants={{ front: { rotateY: -180 }, back: { rotateY: 0 } }} 
          transition={{ duration: 0.6, ease: "easeInOut" }} 
          className="absolute inset-0 rounded-3xl border border-white/10 bg-white/5 p-8 flex items-center justify-center text-center" 
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat" }}
        >
          <p className="text-lg text-white/80 leading-relaxed">{desc}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

interface ExecutionFlipCardProps {
  iconSrc: string;
  title: string;
  desc: string;
}
function ExecutionFlipCard({ iconSrc, title, desc }: ExecutionFlipCardProps) {
  return (
    <div className="relative [perspective:1000px] h-80 w-full">
      <motion.div initial="front" whileHover="back" className="relative h-full w-full z-10" style={{ transformStyle: "preserve-3d" }}>
        {/* Front Side */}
        <motion.div 
          variants={{ front: { rotateY: 0 }, back: { rotateY: 180 } }} 
          transition={{ duration: 0.6, ease: "easeInOut" }} 
          className="absolute inset-0 rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col items-center justify-center gap-6 text-center" 
          style={{ backfaceVisibility: "hidden", background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat" }}
        >
          <div className="w-16 h-16 flex items-center justify-center exc-img">
            <img src={iconSrc} alt={title} className="w-12 h-12 object-contain" />
          </div>
          <div className="text-white font-medium leading-tight" style={{ fontSize: '28px', color: '#F2C016' }}>{title}</div>
        </motion.div>
        
        {/* Back Side */}
        <motion.div 
          variants={{ front: { rotateY: -180 }, back: { rotateY: 0 } }} 
          transition={{ duration: 0.6, ease: "easeInOut" }} 
          className="absolute inset-0 rounded-3xl border border-white/10 bg-white/5 p-8 flex items-center justify-center text-center bg-neutral-900" 
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat" }}
        >
          <p className="text-lg text-white/80 leading-relaxed">{desc}</p>
        </motion.div>
      </motion.div>
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
      <Hero 
        title="" // Title is now hardcoded in Hero component for specific layout
        subtitle="Unifying the efficiency of TradFi with the innovation of Defi"
        text="Multi-venue visibility, execution algos & order types (TWAP/VWAP/IOC/FOK), normalised contract sizing, funding & ADL alerts, and real-time P&L/margin/exposure—built for institutional desks."
      />

      <section className="border-t execute border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-16">
            <h2
              className="font-semibold text-white leading-tight"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '60px' }}
            >
              Execution That Matches<br />Your Process
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ExecutionFlipCard 
             
              iconSrc="/multi-venue-visibility.png" 
              title="Multi-Venue Visibility" 
              desc="See depth and prices across venues in one location—act quickly when liquidity rotates." 
            />
            <ExecutionFlipCard 
              iconSrc="/Normalised-sizing.png" 
              title="Normalised Sizing" 
              desc="Size consistently across contracts and venues; compare risk apples-to-apples." 
            />
            <ExecutionFlipCard 
              iconSrc="/Funding-rate-awareness.png" 
              title="Funding-Rate Awareness" 
              desc="Stream funding trends and alerts to avoid paying the crowd and manage carry." 
            />
          </div>
        </div>
      </section>

      {/* Scroll Animation Section */}
      <ScrollAnimationSection />

      {/* Founders Section */}
      <section className="bg-white/[0.02] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="mb-8">
            <h2
              className="font-semibold text-white pt-6 pb-6"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '60px' }}
            >
              Meet our founders
            </h2>
          </div>
          <FoundersSection />
        </div>
      </section>

      {/* How it works section - HIDDEN
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
        </motion.div>
      </Section>

      {/* Values Section */}
      <section className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="mb-8">
            <h2
              className="font-semibold text-white pt-6 pb-6"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '60px' }}
            >
              Our Values
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ValueFlipCard imageSrc="/client-first.png" title="Client-First" desc="We measure success by desk outcomes and long-term trust." />
            <ValueFlipCard imageSrc="/Security.png" title="Security" desc="Encrypted Keys, permissions, and audit trails." />
            <ValueFlipCard imageSrc="/reliability.png" title="Reliability" desc="Dependable systems for 24/7 markets." />
            <ValueFlipCard imageSrc="/transparency.png" title="Transparency" desc="Plain language, visible risk, and explainable behaviour." />
            <ValueFlipCard imageSrc="/discipline.png" title="Discipline" desc="Process-driven execution beats crowd heat." />
            <ValueFlipCard imageSrc="/development.png" title="Development" desc="We work with customers to improve every release." />
          </div>
        </div>
      </section>



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
    <div className="min-h-screen bg-black">
      <FloatingCTA />
      <HomeFocused />
    </div>
  );
}

export default FocusedHomePage;
