import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Shield, LineChart, Layers, Activity, Cpu, Mail } from "lucide-react";

import TradingViewWidget from "./src/components/TradingViewWidget";
import TradingViewCryptoTicker from "./src/components/TradingViewCryptoTicker";

const BRAND = "#F2C016";
const hexToRgba = (hex, a) => {
  const h = hex.replace("#", "");
  const b = parseInt(h, 16);
  const r = (b >> 16) & 255, g = (b >> 8) & 255, bl = b & 255;
  return `rgba(${r}, ${g}, ${bl}, ${a})`;
};


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
      {/* TradingViewWidget tickers overlayed like homepage */}
      <div className="pointer-events-none">
        <div className="absolute left-0 right-0 w-full" style={{ top: "4%" }}>
          <TradingViewCryptoTicker />
        </div>
        <div className="absolute left-0 right-0 w-full" style={{ bottom: 0 }}>
           <TradingViewWidget />
        </div>
      </div>
      {/* upper & lower tickers */}
      {/* {(() => {
        const Row = ({ text, top, reverse = false, speed = 50 }) => (
          <div className="absolute left-0 right-0" style={{ top, WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)", maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
            <motion.div className="flex whitespace-nowrap will-change-transform" animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }} transition={{ duration: speed, repeat: Infinity, ease: "linear" }} style={{ fontSize: 12, letterSpacing: 0.3, opacity: 0.55, color: "#F8F8F8" }}>
              <span className="pr-10 shrink-0"><span style={{ color: BRAND }}>▸</span> {text} &nbsp;•&nbsp; {text} &nbsp;•&nbsp; {text}</span>
              <span className="pr-10 shrink-0" aria-hidden><span style={{ color: BRAND }}>▸</span> {text} &nbsp;•&nbsp; {text} &nbsp;•&nbsp; {text}</span>
            </motion.div>
          </div>
        );
        const t1 = "BTC‑PERP 64,120 ▲0.8%  ETH‑PERP 3,420 ▼1.2%  SOL‑PERP 189 ▲2.1%  Funding +0.012%  OI 12.4B";
        const t2 = "FX VOL ↓  EURUSD 5.2  USDJPY 6.1  GBPUSD 5.8  Carry ↑  Crypto 24/7: tape > talk";
        return (<>
          <Row text={t1} top="12%" speed={55} />
          <Row text={t2} top="86%" reverse speed={65} />
        </>);
      })()} */}
    </div>
  );
}

/* ===== Hero ===== */
function Hero({ title, subtitle }) {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 relative z-10" style={{ fontFamily: 'Montserrat, sans-serif' }}>
  <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white pt-8 pb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="mt-5 text-white/80 max-w-3xl text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>{subtitle}</motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="mt-8 flex flex-wrap gap-3">
          <a href="/about" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-black" style={{ background: BRAND }}>
            About Us <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== building blocks ===== */
function Section({ eyebrow, title, children, subdued=false }) {
  return (
    <section className={`${subdued ? "bg-white/[0.02]" : ""} border-t border-white/10`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          {eyebrow && <div className="text-[11px] uppercase tracking-[0.22em] text-white/50" style={{ fontFamily: 'Montserrat, sans-serif' }}>{eyebrow}</div>}
          {title && <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h2>}
        </div>
        {children}
      </div>
    </section>
  );
}
function Pill({ icon: Icon, title, text }) {
  return (
    <div className="group [perspective:1000px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div
        className="relative rounded-2xl border border-white/10 bg-white/5 p-5 h-36 md:h-40 transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"
        tabIndex={0}
      >
        {/* Front: icon + title only */}
        <div className="absolute inset-0 flex flex-col items-center justify-center [backface-visibility:hidden]">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
            style={{ background: hexToRgba(BRAND, 0.15) }}
          >
            {Icon ? <Icon size={24} color={BRAND} /> : null}
          </div>
          <div className="text-white font-medium text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</div>
        </div>

        {/* Back: body text */}
        <div className="absolute inset-0 flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-sm text-white/80 leading-relaxed text-center px-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{text}</div>
        </div>
      </div>
    </div>
  );
}
function PlaceholderShot({ label = "Product screenshot" }) {
  return (<div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] h-64 md:h-80 flex items-center justify-center text-white/50 text-sm">{label}</div>);
}

/* ===== Product page (focused) ===== */
export default function ProductFocused() {
  return (
    <div className="min-h-screen bg-black pt-16 md:pt-20" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <main className="bg-black text-white" style={{ position: 'relative', zIndex: 1, fontFamily: 'Montserrat, sans-serif' }}>
        <Hero title={<><span style={{ color: BRAND }}>CONNEX</span> — the institutional trading <span style={{ color: BRAND }}>workspace</span></>} subtitle="See cross‑venue depth, set normalised sizes, use execution algos/order types (TWAP/VWAP/IOC/FOK), track funding in real time, and manage risk 24/7. APIs for integration and white‑label options." />
        <Section eyebrow="Modules" title="Everything a pro desk expects—built for traders">
          <div className="grid md:grid-cols-3 gap-5">
            <Pill icon={BarChart3} title="Visibility" text="Consolidated book view and price discovery across venues." />
            <Pill icon={Layers} title="Order tickets" text="TWAP/VWAP/IOC/FOK, conditional exits, and level‑aware execution patterns." />
            <Pill icon={LineChart} title="Sizing" text="Normalise contract units so 1 is always 1" />
            <Pill icon={Activity} title="Risk" text="PnL, funding, ADL, cash balances, and much more—trade consciously." />
            <Pill icon={Cpu} title="APIs" text="Integrate with OMS/PMS, data, and custody solutions; enable white‑label flows." />
            <Pill icon={Shield} title="Security" text="Encrypted key management, IP allow‑listing, audit trails, and permissions." />
          </div>
        </Section>
        {/* <Section eyebrow="Screens" title="Product surfaces">
          <div className="grid md:grid-cols-2 gap-6">
            <PlaceholderShot label="Depth + quotes consolidated" />
            <PlaceholderShot label="Order ticket + execution algos" />
            <PlaceholderShot label="Risk panel: P&L / margin / exposure" />
            <PlaceholderShot label="Funding trends + alerts" />
          </div>
        </Section> */}
        <Section eyebrow="Our Solutions" title="Choose the engagement that fits">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Core GUI Solution */}
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 h-full flex flex-col justify-between group hover:bg-white/[0.08] transition-all duration-300"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#F2C016]/0 via-[#F2C016]/10 to-[#F2C016]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
              <div className="relative z-10">
                <div className="text-white font-semibold mb-1 text-xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>Core GUI</div>
                <div className="text-white/70 text-sm mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Institutional desktop. Execution, risk, and funding on one screen.
                </div>
              </div>
            </motion.div>
            {/* API Solution */}
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 h-full flex flex-col justify-between group hover:bg-white/[0.08] transition-all duration-300"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#F2C016]/0 via-[#F2C016]/10 to-[#F2C016]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
              <div className="relative z-10">
                <div className="text-white font-semibold mb-1 text-xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>API</div>
                <div className="text-white/70 text-sm mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Programmatic access. REST/WebSocket with reporting built in.
                </div>
              </div>
            </motion.div>
            {/* White-label Solution */}
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 h-full flex flex-col justify-between group hover:bg-white/[0.08] transition-all duration-300"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#F2C016]/0 via-[#F2C016]/10 to-[#F2C016]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
              <div className="relative z-10">
                <div className="text-white font-semibold mb-1 text-xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>White-label</div>
                <div className="text-white/70 text-sm mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Branded front-end. Themes, SSO, and SLAs under your brand.
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
        {/* <Footer /> */}
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
          <p className="max-w-xs">Institutional execution for trading—built with FX discipline.</p>
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
