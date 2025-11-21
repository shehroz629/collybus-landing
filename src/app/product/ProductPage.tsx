"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BarChart3, Shield, LineChart, Layers, Activity, Cpu, Monitor, Zap } from "lucide-react";

const BRAND = "#F2C016";
const hexToRgba = (hex: string, a: number) => {
  const h = hex.replace("#", "");
  const b = parseInt(h, 16);
  const r = (b >> 16) & 255,
    g = (b >> 8) & 255,
    bl = b & 255;
  return `rgba(${r}, ${g}, ${bl}, ${a})`;
};

function HeroBackground() {
  const glow1 = `radial-gradient(circle at 50% 50%, ${hexToRgba(BRAND, 0.2)}, ${hexToRgba(BRAND, 0)} 60%)`;
  const glow2 = `radial-gradient(circle at 50% 50%, ${hexToRgba(BRAND, 0.12)}, ${hexToRgba(BRAND, 0)} 60%)`;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full blur-3xl"
        style={{ background: glow1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full blur-3xl"
        style={{ background: glow2 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
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
      <svg className="absolute inset-x-0 top-1/3 w-full h-40 opacity-30" viewBox="0 0 1200 200" preserveAspectRatio="none">
        {[
          {
            stroke: hexToRgba(BRAND, 0.6),
            keyframes: [
              "M0 140 C150 120, 300 160, 450 110 S750 100, 900 140 S1050 180, 1200 120",
              "M0 120 C150 160, 300 130, 450 150 S750 80, 900 110 S1050 160, 1200 140",
            ],
            width: 2,
          },
          {
            stroke: "rgba(255,255,255,0.55)",
            keyframes: [
              "M0 100 C120 80, 300 120, 480 90 S780 110, 960 80 S1080 120, 1200 100",
              "M0 90 C120 120, 300 95, 480 130 S780 90, 960 120 S1080 80, 1200 110",
            ],
            width: 1,
          },
        ].map((p, i) => (
          <motion.path
            key={i}
            d={p.keyframes[0]}
            animate={{ d: p.keyframes }}
            transition={{ duration: 10 + i * 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            stroke={p.stroke}
            strokeWidth={p.width}
            fill="none"
          />
        ))}
      </svg>
      
    </div>
  );
}

function Hero({ title, subtitle }: { title: React.ReactNode; subtitle: string }) {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 relative z-10" style={{ fontFamily: "Montserrat, sans-serif" }}>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white pt-8 pb-8"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-5 text-white/80 max-w-3xl text-lg"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a href="/about" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-black" style={{ background: BRAND }}>
            About Us <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Section({ eyebrow, title, children, subdued = false, titleClassName }: { eyebrow?: string; title?: React.ReactNode; children: React.ReactNode; subdued?: boolean; titleClassName?: string }) {
  return (
    <section className={`${subdued ? "bg-white/[0.02]" : ""} border-t border-white/10`} style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          {eyebrow && (
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/50" style={{ fontFamily: "Montserrat, sans-serif" }}>
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className={titleClassName ?? "text-2xl sm:text-3xl font-semibold text-white mt-2"} style={{ fontFamily: "Montserrat, sans-serif" }}>
              {title}
            </h2>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function Pill({ icon: Icon, title, text }: { icon: React.ElementType | null; title: string; text: string }) {
  return (
    <div className="group [perspective:1000px]" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div
        className="relative rounded-3xl border border-white/10 p-6 h-48 md:h-52 ring-1 ring-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.45)] bg-gradient-to-b from-[#222] to-[#0f0f0f] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"
        tabIndex={0}
      >
        <div className="absolute inset-0 rounded-3xl" style={{ background: `linear-gradient(180deg, ${hexToRgba(BRAND,0.12)} 0%, ${hexToRgba(BRAND,0.06)} 35%, rgba(0,0,0,0) 60%)` }} />
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center [backface-visibility:hidden]">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: hexToRgba(BRAND, 0.12), boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)" }}>
            {Icon ? <Icon size={22} color={BRAND} /> : null}
          </div>
          <div className="font-semibold text-center text-lg md:text-xl" style={{ color: BRAND }}>
            {title}
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-sm text-white/85 leading-relaxed text-center px-3">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoCard({ title, imgSrc }: { title: string; imgSrc: string }) {
  return (
    <div className="relative" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="relative rounded-3xl border border-white/10 p-6 h-40 md:h-44 ring-1 ring-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.45)] bg-gradient-to-b from-[#222] to-[#0f0f0f]">
        <div className="absolute inset-0 rounded-3xl" style={{ background: `linear-gradient(180deg, ${hexToRgba(BRAND,0.12)} 0%, ${hexToRgba(BRAND,0.06)} 35%, rgba(0,0,0,0) 60%)` }} />
        <div className="relative flex items-center justify-center h-full">
          <img src={imgSrc} alt={`${title} logo`} className="h-12 md:h-14 w-28 md:w-32 object-contain" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-black pt-16 md:pt-20" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <main className="bg-black text-white" style={{ position: "relative", zIndex: 1, fontFamily: "Montserrat, sans-serif" }}>
        <Hero
          title={
            <>
              <span style={{ color: BRAND }}>CONNEX</span> — the institutional trading <span style={{ color: BRAND }}>workspace</span>
            </>
          }
          subtitle="See cross‑venue depth, set normalised sizes, use execution algos/order types (TWAP/VWAP/IOC/FOK), track funding in real time, and manage risk 24/7. APIs for integration and white‑label options."
        />
        <Section title={<><span className="inline">Choose The Engagement</span><span className="block">That Fits</span></>} titleClassName="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
          <EngagementTabs />
        </Section>
        <Section title={<><span className="inline">Everything A Pro Desk</span><span className="block">Expects‑Built For Traders</span></>} titleClassName="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
          <div className="grid md:grid-cols-3 gap-5">
            <Pill icon={BarChart3} title="Visibility" text="Consolidated book view and price discovery across venues." />
            <Pill icon={Layers} title="Order Tickets" text="TWAP/VWAP/IOC/FOK, conditional exits, and level‑aware execution patterns." />
            <Pill icon={LineChart} title="Sizing" text="Normalise contract units so 1 is always 1" />
            <Pill icon={Cpu} title="APIs" text="Integrate with OMS/PMS, data, and custody solutions; enable white‑label flows." />
            <Pill icon={Activity} title="Risk" text="PnL, funding, ADL, cash balances, and much more—trade consciously." />
            <Pill icon={Shield} title="Security" text="Encrypted key management, IP allow‑listing, audit trails, and permissions." />
          </div>
        </Section>
        <Section title={<><span className="inline">What Desks Gain</span></>} titleClassName="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
          <div className="grid md:grid-cols-3 gap-5">
            <Pill icon={BarChart3} title="Better Fills" text="Smarter sizing and cross‑venue execution improves average fill quality." />
            <Pill icon={Zap} title="Faster Idea → Trade" text="Streamlined tickets and normalised sizes reduce time‑to‑execution." />
            <Pill icon={Shield} title="Tighter Risk" text="Real‑time funding and PnL awareness lower operational risk." />
          </div>
        </Section>
        <Section title={<><span className="inline">Venues • Data • Custody • OMS/PMS</span></>} titleClassName="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              { title: "KuCoin", imgSrc: "https://logo.clearbit.com/kucoin.com" },
              { title: "Binance", imgSrc: "https://logo.clearbit.com/binance.com" },
              { title: "BitMEX", imgSrc: "https://logo.clearbit.com/bitmex.com" },
              { title: "Deribit", imgSrc: "https://logo.clearbit.com/deribit.com" },
              { title: "OKX", imgSrc: "https://logo.clearbit.com/okx.com" },
              { title: "Kraken", imgSrc: "https://logo.clearbit.com/kraken.com" },
              { title: "BitGo", imgSrc: "https://logo.clearbit.com/bitgo.com" },
            ].map((p) => (
              <LogoCard key={p.title} title={p.title} imgSrc={p.imgSrc} />
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}

function EngagementTabs() {
  const [tab, setTab] = useState<"core" | "white" | "api">("core");
  const tabs = [
    { key: "core" as const, label: "Core GUI" },
    { key: "white" as const, label: "White-Label" },
    { key: "api" as const, label: "API" },
  ];
  const content = {
    core: {
      title: "Core GUI",
      text:
        "Institutional desktop. Execution, risk, and funding on one screen.",
      icon: Monitor,
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    },
    white: {
      title: "White-Label",
      text: "Branded front-end. Themes, SSO, and SLAs under your brand.",
      icon: Layers,
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
    },
    api: {
      title: "API",
      text: "Programmatic access to trading, risk and reporting. REST and WebSocket endpoints for orders, positions, balances, funding and market data, with built-in reporting to integrate cleanly into your systems.",
      icon: Cpu,
      image:
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    },
  } as const;

  const active = content[tab];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {tabs.map((t) => {
          const isActive = tab === t.key;
          return (
            <div key={t.key} className="relative w-full">
              {isActive && (
                <div
                  className="absolute -inset-5 rounded-[2rem]"
                  style={{ background: hexToRgba(BRAND, 0.12), filter: "blur(18px)" }}
                />
              )}
              <button
                onClick={() => setTab(t.key)}
                className={`relative w-full px-10 py-5 rounded-3xl border transition-all duration-200 text-lg font-semibold flex items-center justify-center outline-none focus:outline-none focus:ring-0 ${
                  isActive
                    ? "border-2 border-[#F2C016] text-white bg-[#202020]"
                    : "border-white/10 text-white/80 bg-[#1a1a1a] hover:bg-[#202020]"
                }`}
                style={{ fontFamily: "Montserrat, sans-serif", boxShadow: isActive ? "0 0 18px rgba(242,192,22,0.35), 0 0 36px rgba(242,192,22,0.18)" : "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 22px rgba(0,0,0,0.35)" }}
              >
                {t.label}
              </button>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100, transition: { duration: 0.22, ease: "easeIn" } }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-3xl border border-white/10 bg-[#121212] p-6 md:p-8 grid md:grid-cols-2 gap-6 items-center shadow-[0_20px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/5 min-h-[18rem] md:min-h-[20rem]"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.6)', willChange: 'transform, opacity' }}
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: hexToRgba(BRAND, 0.15) }}>
              {active.icon ? <active.icon size={24} color={BRAND} /> : null}
            </div>
            <div className="text-white text-xl font-semibold">{active.title}</div>
            <div className="text-white/70 text-sm md:text-base leading-relaxed" style={{ whiteSpace: 'pre-line' }}>{active.text}</div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl" style={{ background: hexToRgba(BRAND, 0.2), filter: 'blur(28px)' }} />
            <img
              src={active.image}
              alt={active.title}
              className="relative rounded-2xl w-full h-56 md:h-64 object-cover border border-white/10"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}