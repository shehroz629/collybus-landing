import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Cpu, Users, Mail, ArrowRight } from "lucide-react";

const BRAND = "#F2C016";
const hexToRgba = (hex, a) => {
  const h = hex.replace("#", "");
  const b = parseInt(h, 16);
  const r = (b >> 16) & 255, g = (b >> 8) & 255, bl = b & 255;
  return `rgba(${r}, ${g}, ${bl}, ${a})`;
};

// Scroll-triggered staggered fall-in variants
const fallIn = { hidden: { opacity: 0, y: -24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const gridStagger = { hidden: {}, show: { transition: { staggerChildren: 0.2, delayChildren: 0.03 } } };


/* ===== Hero background with bubbles + tickers ===== */
function HeroBackground() {
  const glow1 = `radial-gradient(circle at 50% 50%, ${hexToRgba(BRAND,0.2)}, ${hexToRgba(BRAND,0)} 60%)`;
  const glow2 = `radial-gradient(circle at 50% 50%, ${hexToRgba(BRAND,0.12)}, ${hexToRgba(BRAND,0)} 60%)`;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* aurora glows */}
      <motion.div className="absolute -top-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full blur-3xl" style={{ background: glow1 }} animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}/>
      <motion.div className="absolute -bottom-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full blur-3xl" style={{ background: glow2 }} animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}/>
      {/* floating bubbles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.span key={i} className="absolute rounded-full" style={{ width: 6, height: 6, background: BRAND, left: `${5 + i * 7}%` }} initial={{ y: 320, opacity: 0 }} animate={{ y: [320, 210, 260, 190, 320], opacity: [0, 0.9, 0.8, 0.9, 0] }} transition={{ duration: 8 + (i % 4), delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }} />
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
    </div>
  );
}

/* ===== Hero ===== */
function Hero({ title, subtitle }) {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 relative z-10">
  <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white pt-8 pb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="mt-5 text-white/80 max-w-3xl text-lg">{subtitle}</motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="mt-8 flex flex-wrap gap-3">
          <a
            href="/team"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-black"
            style={{ background: BRAND }}
          >
            Our Team <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== building blocks ===== */
function Section({ eyebrow, title, children, subdued=false }) {
  return (
    <section className={`${subdued ? "bg-white/[0.02]" : ""} border-t border-white/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          {eyebrow && <div className="text-[11px] uppercase tracking-[0.22em] text-white/50">{eyebrow}</div>}
          {title && <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h2>}
        </div>
        {children}
      </div>
    </section>
  );
}
function Pill({ icon: Icon, title, text }) {
  return (
    <div className="group [perspective:1000px]" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div
        className="relative rounded-3xl border border-white/10 p-6 h-48 md:h-52 ring-1 ring-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"
        style={{
          background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat",
        }}
        tabIndex={0}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center [backface-visibility:hidden]">
          <div className="w-16 h-16 flex items-center justify-center mb-4 exc-img">
            {Icon ? <Icon size={48} color={BRAND} /> : null}
          </div>
          <div className="text-center leading-tight" style={{ fontSize: '20px', color: '#F2C016', fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
            {title}
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-sm text-white/70 leading-relaxed text-center px-3">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}
function PlaceholderShot({ label = "Timeline / milestones" }) {
  return (<div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] h-64 md:h-80 flex items-center justify-center text-white/50 text-sm">{label}</div>);
}

/* ===== About page (focused) ===== */

export default function AboutFocused() {
  return (
    <div className="min-h-screen bg-black pt-16 md:pt-20">
      <main className="bg-black text-white" style={{ position: 'relative', zIndex: 1 }}>
        <Hero title={"Bringing FX discipline to digital assets"} subtitle="Collybus has built an institutional-grade tooling for digital assets and derivatives trading—precision, risk control, and reliability in a 24/7 market." />
        <Section eyebrow="Mission" title="Our purpose">
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
            <div className="pointer-events-none absolute -left-px top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-amber-400/60 via-amber-400/20 to-transparent" aria-hidden></div>
            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              Professionals need institutional grade workflows to operate confidently in financial markets. We focus on execution quality, risk transparency, and operational assurance.
            </p>
            <p className="mt-4 text-lg md:text-xl leading-relaxed text-white/80">
              Our team blends experience from trading, execution technology, and enterprise software. We develop thoughtfully, integrate deeply, and support desks end-to-end.
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </Section>

        <Section eyebrow="Principles" title="How we build">
          <motion.div className="grid md:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={gridStagger}
          >
            <motion.div variants={fallIn}><Pill icon={Users} title="Client-obsessed" text="We co-design and collaborate in the open with direct lines to the desk" /></motion.div>
            <motion.div variants={fallIn}><Pill icon={Cpu} title="Cutting-edge engineering" text="Dependable systems with a bias to reliability and consistency" /></motion.div>
            <motion.div variants={fallIn}><Pill icon={Shield} title="Compliance-focused" text="Controls, auditability, and separation of duties by design." /></motion.div>
          </motion.div>
        </Section>

        <Section eyebrow="Reg & Security" title="Built for institutions">
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
            <div className="pointer-events-none absolute -left-px top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-amber-400/60 via-amber-400/20 to-transparent" aria-hidden></div>
            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              With decades of experience in regulated trading, we prioritise governance and security.
            </p>
            <p className="mt-4 text-lg md:text-xl leading-relaxed text-white/80">
              Institutional-grade, our robust technology maintains a strong regulatory posture supported by comprehensive AML measures and advanced safeguards.
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </Section>

  {/* Footer removed, use main site footer */}
      </main>
    </div>
  );
}

/* ===== CTA + Footer ===== */

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-8 text-sm text-white/70">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="https://collybus.co/images/collybus-logo.svg" alt="Collybus" className="h-[1.95rem] w-auto opacity-90"/>
          </div>
          <p className="max-w-xs">Institutional execution for crypto perpetuals—built with FX discipline.</p>
        </div>
        <div>
          <div className="text-white/90 font-medium mb-2">Product</div>
          <ul className="space-y-1">
            <li><a className="hover:text-white/90" href="#">CONNEX</a></li>
            <li><a className="hover:text-white/90" href="#">Integrations</a></li>
            <li><a className="hover:text-white/90" href="#">Security</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white/90 font-medium mb-2">Company</div>
          <ul className="space-y-1">
            <li><a className="hover:text-white/90" href="#">About</a></li>
            <li><a className="hover:text-white/90" href="#">Team</a></li>
            <li><a className="hover:text-white/90" href="#">Careers</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white/90 font-medium mb-2">Get in touch</div>
          <ul className="space-y-1">
            <li><a className="hover:text-white/90" href="#">Book a demo</a></li>
            <li><a className="hover:text-white/90" href="#">hello@collybus.co</a></li>
            <li><a className="hover:text-white/90" href="#">Legal & compliance</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-white/40 py-6 border-t border-white/10">© {new Date().getFullYear()} Collybus. All rights reserved.</div>
    </footer>
  );
}
