import React, { useEffect, useState, useRef } from "react";
import FoundersSection from "../components/founders-section";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import gsap from "gsap";
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
        { name: "PJ", role: "Co-Founder & Co-CEO", photo: "/images/Peter Jacobson.jpg" },
        { name: "GO'S", role: "Co-Founder & Co-CEO", photo: "/images/Greg O'Sullivan.jpg" },
        { name: "Johnny", role: "Co-Founder & CCO", photo: "/images/Jonathan Wharton.jpg" },
        { name: "JD", role: "Co-Founder & CTO", photo: "/images/James Dalton.jpg" },
      ];
/* ===== HERO SECTION START ===== */
 /* ===== Hero Background (tickers + glow) ===== */ 
function HeroBackground() { 
  const [isMobile, setIsMobile] = useState(false);
  const mapMarqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    const checkMobile = () => setIsMobile(window.innerWidth < 768); 
    checkMobile(); 
    window.addEventListener('resize', checkMobile); 
    return () => window.removeEventListener('resize', checkMobile); 
  }, []);

  // GSAP marquee animation for map
  useEffect(() => {
    if (!mapMarqueeRef.current) return;

    const mapMarquee = mapMarqueeRef.current;
    
    // Wait for layout to calculate proper widths
    const initAnimation = () => {
      // Get the first child to calculate one copy's actual width
      const firstChild = mapMarquee.firstElementChild as HTMLElement;
      if (!firstChild || firstChild.offsetWidth === 0) {
        setTimeout(initAnimation, 50);
        return;
      }

      // Use the actual width of one copy element for seamless loop
      const oneCopyWidth = firstChild.offsetWidth;
      
      // Calculate initial offset to start map at 35-40% of screen
      // Get viewport width
      const viewportWidth = window.innerWidth;
      const initialOffset = -(viewportWidth * 0.35); // Start at 35% from left

      // Set initial position to show map starting from 35% of screen
      gsap.set(mapMarquee, { x: initialOffset });

      // Create the infinite marquee animation
      // Moves from initialOffset to initialOffset - oneCopyWidth for seamless loop
      const animation = gsap.to(mapMarquee, {
        x: initialOffset - oneCopyWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      return animation;
    };

    const animation = initAnimation();

    // Cleanup on unmount
    return () => {
      if (animation) animation.kill();
    };
  }, []);

  const glow1 = `radial-gradient(circle at 50% 50%, ${hexToRgba(BRAND,0.2)}, ${hexToRgba(BRAND,0)} 60%)`; 
  const glow2 = `radial-gradient(circle at 50% 50%, ${hexToRgba(BRAND,0.12)}, ${hexToRgba(BRAND,0)} 60%)`; 
  
  return ( 
    <div className="absolute inset-0 pointer-events-none overflow-hidden"> 
      {/* soft aurora glows */} 
      <motion.div className="absolute -top-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-40" style={{ background: glow1 }} animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}/> 
      {/* Left side yellow shade image */} 
      <div className="absolute top-0 left-0 w-[800px] h-[800px] pointer-events-none" style={{ backgroundImage: 'url(/uploaded_image_1.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'top left', opacity: 0.6  }} /> 
      {/* World Map Background - Animated - Full width with gradient fade */}
      <div className="absolute top-0 bottom-0 left-0 w-full pointer-events-none overflow-hidden"> 
        <div ref={mapMarqueeRef} className="flex h-full" style={{ width: '200%' }}> 
          <div className="w-1/2 h-full flex-shrink-0" style={{ backgroundImage: 'url(/map.png)', backgroundSize: 'cover', backgroundPosition: 'left center', backgroundRepeat: 'no-repeat', opacity: 0.25, mixBlendMode: 'screen' }} />
          <div className="w-1/2 h-full flex-shrink-0" style={{ backgroundImage: 'url(/map.png)', backgroundSize: 'cover', backgroundPosition: 'left center', backgroundRepeat: 'no-repeat', opacity: 0.25, mixBlendMode: 'screen' }} />
        </div> 
        {/* Gradient overlay to fade right side */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: isMobile ? 'none' : 'linear-gradient(to right, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 70%, black 100%)' }} /> 
      </div> 
      {/* Tickers removed as per request */} 
      <div className="pointer-events-none"> </div> 
    </div> 
  ); 
} interface HeroProps { title: React.ReactNode; subtitle: string; text: string; ctaPrimary?: React.ReactNode; ctaSecondary?: React.ReactNode; } function Hero({ title, subtitle, text }: HeroProps) { return ( <section className="relative overflow-hidden hero-section flex items-center justify-center z-0"> <HeroBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24 relative z-10 w-full flex flex-col items-center text-center"> <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-semibold tracking-tight text-white mb-6 text-[35px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem]" style={{ fontFamily: 'Montserrat, sans-serif', lineHeight: '1.1' }} > <span style={{ color: BRAND }}>COLLYBUS:</span> The Institutional<br className="hidden sm:block" /> Trading Workspace </motion.h1> <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="font-medium mb-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl" style={{ lineHeight: '1.2', color: '#FFFFFF99' }} > {subtitle} </motion.h2> <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-white/80 max-w-4xl mx-auto text-base sm:text-lg md:text-xl" style={{ lineHeight: '1.6' }} > 
{text} </motion.p> </div> </section> ); } /* ===== HERO SECTION END ===== */



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
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="group [perspective:1000px]">
      <div
        className={`relative rounded-2xl border border-white/10 bg-white/5 p-6 h-24 sm:h-32 md:h-36 transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        tabIndex={0}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center [backface-visibility:hidden]">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: hexToRgba(BRAND, 0.15) }}>{Icon ? <Icon size={24} color={BRAND} /> : null}</div>
          <div className="text-white font-medium leading-tight">{title}</div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-sm text-white/70 leading-relaxed px-3">{desc}</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-6 -bottom-2 h-6 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-350" style={{ background: `radial-gradient(ellipse at center, ${hexToRgba(BRAND, 0.32)} 0%, rgba(0,0,0,0) 70%)` }} />
    </div>
  );
}

interface ValueFlipCardProps {
  imageSrc: string;
  title: string;
  desc: string;
}
function ValueFlipCard({ imageSrc, title, desc }: ValueFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="group [perspective:1000px] h-48 sm:h-56 md:h-64 w-full">
      <div
        className={`relative rounded-3xl border border-white/10 p-8 h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        style={{
          background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat",
        }}
        tabIndex={0}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center [backface-visibility:hidden]">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={imageSrc} alt={title} className="w-12 h-12 object-contain" />
          </div>
          <div className="text-white font-medium leading-tight text-base sm:text-lg md:text-xl" style={{ color: '#F2C016' }}>{title}</div>
        </div>
        
        {/* Back Side */}
        <div className="absolute inset-0 flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed px-3">{desc}</p>
        </div>
      </div>
    </div>
  );
}

interface ExecutionFlipCardProps {
  iconSrc: string;
  title: string;
  desc: string;
}
function ExecutionFlipCard({ iconSrc, title, desc }: ExecutionFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="group [perspective:1000px] h-48 sm:h-64 md:h-80 w-full">
      <div
        className={`relative rounded-3xl border border-white/10 p-4 sm:p-6 md:p-8 h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        style={{
          background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat",
        }}
        tabIndex={0}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6 text-center [backface-visibility:hidden]">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center exc-img">
            <img src={iconSrc} alt={title} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
          </div>
          <div className="text-white font-medium leading-tight text-base sm:text-lg md:text-xl" style={{ color: '#F2C016' }}>{title}</div>
          </div>
        
        {/* Back Side */}
        <div className="absolute inset-0 flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed px-3">{desc}</p>
        </div>
      </div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-14">
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

      {/* Scroll Animation Section */}
      <section className="border-t border-white/10">
        <ScrollAnimationSection />
      </section>

      <section className="border-t execute border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2
              className="font-semibold text-white leading-tight text-[35px] sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Execution That Matches<br className="hidden sm:block" />Your Process
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
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

      

      {/* Founders Section */}
      <section className="bg-white/[0.02] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-14">
          <div className="mb-8">
            <h2
              className="font-semibold text-white pt-6 pb-6 text-[35px] sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-14">
          <div className="mb-8">
            <h2
              className="font-semibold text-white pt-6 pb-6 text-[35px] sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Our Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <ValueFlipCard imageSrc="/client-first.png" title="Client-First" desc="Success is built through customer satisfaction and long term trust relationships." />
            <ValueFlipCard imageSrc="/Security.png" title="Security" desc="Controlled and Encrypted protection of your Accounts and Data." />
            <ValueFlipCard imageSrc="/reliability.png" title="Reliability" desc="Dependable systems for 24/7 markets." />
            <ValueFlipCard imageSrc="/transparency.png" title="Transparency" desc="Clear and Explainable Components and Logic." />
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
