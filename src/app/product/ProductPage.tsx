"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// @ts-ignore - createPortal is available in react-dom
import { createPortal } from "react-dom";
import { ArrowRight, BarChart3, Shield, LineChart, Layers, Activity, Cpu } from "lucide-react";
import ContactForm from "@/components/contact-form";

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

function Section({ eyebrow, title, children, subdued = false, titleClassName, titleStyle, className }: { eyebrow?: string; title?: React.ReactNode; children: React.ReactNode; subdued?: boolean; titleClassName?: string; titleStyle?: React.CSSProperties; className?: string }) {
  return (
    <section className={`${subdued ? "bg-white/[0.02]" : ""} ${className || ""}`} style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          {eyebrow && (
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/50" style={{ fontFamily: "Montserrat, sans-serif" }}>
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className={titleClassName ?? "text-2xl sm:text-3xl font-semibold text-white mt-2"} style={{ fontFamily: "Montserrat, sans-serif", ...titleStyle }}>
              {title}
            </h2>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function Pill({ icon: Icon, iconSrc, title, text }: { icon?: React.ElementType | null; iconSrc?: string; title: string; text: string }) {
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
            {iconSrc ? (
              <img src={iconSrc} alt={title} className="w-12 h-12 object-contain" />
            ) : Icon ? (
              <Icon size={30} color={BRAND} />
            ) : null}
          </div>
          <div className="text-center leading-tight text-lg sm:text-xl md:text-2xl" style={{ color: '#F2C016', fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
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

function WhatDesksGainCard({ iconSrc, title, text }: { iconSrc: string; title: string; text: string }) {
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
            <img src={iconSrc} alt={title} className="w-12 h-12 object-contain" />
          </div>
          <div className="text-center leading-tight text-lg sm:text-xl md:text-2xl" style={{ color: '#F2C016', fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
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

function VenueLogoCard({ title, imgSrc, link }: { title: string; imgSrc: string; link: string }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative group"
      style={{ fontFamily: "Montserrat, sans-serif" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <div
        className="relative rounded-3xl border border-white/10 p-6 h-40 md:h-44 ring-1 ring-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:border-white/20"
        style={{
          background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat",
        }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#F2C016]/0 via-[#F2C016]/10 to-[#F2C016]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
        <div className="relative flex items-center justify-center h-full z-10">
          <img
            src={imgSrc}
            alt={`${title} logo`}
            className="h-12 md:h-14 w-28 md:w-32 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </motion.a>
  );
}

function ContactBox({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <motion.div
      className="block relative group cursor-pointer"
      style={{ fontFamily: "Montserrat, sans-serif" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      onClick={onClick}
    >
      <div
        className="relative rounded-3xl border border-white/10 p-6 h-40 md:h-44 ring-1 ring-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:border-white/20"
        style={{
          background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat",
        }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#F2C016]/0 via-[#F2C016]/10 to-[#F2C016]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
        <div className="relative flex items-center justify-center h-full z-10">
          <div className="text-center text-white/90 text-sm md:text-base font-medium px-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {title}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function VenuesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const venues = [
    { title: "KuCoin", imgSrc: "/kucoin.png", link: "https://www.kucoin.com/" },
    { title: "Binance", imgSrc: "/binance.png", link: "https://www.binance.com/" },
    { title: "BitMEX", imgSrc: "/bitmex.png", link: "https://www.bitmex.com/" },
    { title: "Deribit", imgSrc: "/deribit.png", link: "https://www.deribit.com/" },
    { title: "OKX", imgSrc: "/okx.png", link: "https://www.okx.com/" },
    { title: "Kraken", imgSrc: "/karen.png", link: "https://www.kraken.com/" },
    { title: "BitGo", imgSrc: "/bitgo.png", link: "https://www.bitgo.com/" },
  ];

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const modalContent = isModalOpen ? (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-2 sm:p-4"
      onClick={handleModalClick}
    >
      <div 
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl 
          shadow-2xl max-w-2xl w-full max-h-[90vh] relative animate-fadeInUp 
          overflow-y-auto scrollbar-thin scrollbar-thumb-[#f2c016] scrollbar-track-transparent
          hover:scrollbar-thumb-[#d9ad14]"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0))'
        }}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold z-50
            transition-colors duration-200 ease-in-out hover:scale-110 transform"
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="px-3 sm:px-6 py-6 sm:py-8">
          <ContactForm />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="space-y-5">
        {/* First row: 4 logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {venues.slice(0, 4).map((venue) => (
            <VenueLogoCard key={venue.title} title={venue.title} imgSrc={venue.imgSrc} link={venue.link} />
          ))}
        </div>
        {/* Second row: 3 logos + contact box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {venues.slice(4).map((venue) => (
            <VenueLogoCard key={venue.title} title={venue.title} imgSrc={venue.imgSrc} link={venue.link} />
          ))}
          <ContactBox 
            title="And more, get in touch now to integrate with the Collybus Ecosystem" 
            onClick={openModal}
          />
        </div>
      </div>

      {/* Modal - Rendered via Portal to ensure it's above header */}
      {isMounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}

type EngagementTabKey = "core" | "white" | "api";

function EngagementTabs() {
  const [tab, setTab] = useState<EngagementTabKey>("core");

  const tabs: { key: EngagementTabKey; label: string }[] = [
    { key: "core", label: "Core GUI" },
    { key: "white", label: "White-label" },
    { key: "api", label: "API" },
  ];

  const content: Record<
    EngagementTabKey,
    { title: string; text: string; icon: string; image: string }
  > = {
    core: {
      title: "Core GUI",
      text: "The COLLYBUS GUI delivers a fast, intuitive, and fully integrated trading experience designed for professional desks. Built with institutional workflows at its core, the platform consolidates market data, execution, and risk oversight into a single, high-performance interface.",
      icon: "/core-gui-icon.png",
      image: "/Core-GUI.png",
    },
    white: {
      title: "White-label",
      text: "Stream Your Own Liquidity. Capture More Client Flow. Fully Branded. \n\nThe COLLYBUS white-label platform empowers brokers, market makers, and trading venues to stream their own liquidity directly to clients through a premium, fully branded trading interface. Own the full execution experience, deepen client engagement, and capture a greater share of trading flow.\n\nWith multi-venue connectivity, institutional-grade execution tools, and complete brand customisation, the COLLYBUS white-label solution gives you everything needed to scale your liquidity distribution, strengthen client relationships, and compete at the highest institutional level while we manage the infrastructure, upgrades, and integrations.",
      icon: "/white-lable-icon.png",
      image: "/White-Label-new.png",
    },
    api: {
      title: "API",
      text:
        "Programmatic access to trading, risk and reporting. REST and WebSocket endpoints for orders, positions, balances, funding and market data, with built-in reporting to integrate cleanly into your systems.",
      icon: "/api-icon.png",
      image: "/API-New.png",
    },
  };

  const active = content[tab];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
        {tabs.map((t) => {
          const isActive = tab === t.key;
          return (
            <div key={t.key} className="relative w-full">
              {isActive && (
                <div
                  className="absolute -inset-2 sm:-inset-3 md:-inset-5 rounded-[1.5rem] sm:rounded-[1.75rem] md:rounded-[2rem]"
                  style={{ background: hexToRgba(BRAND, 0.12), filter: "blur(18px)" }}
                />
              )}
              <button
                onClick={() => setTab(t.key)}
                className={`relative w-full px-3 sm:px-6 md:px-10 py-3 sm:py-4 md:py-5 rounded-2xl sm:rounded-3xl border transition-all duration-200 text-xs sm:text-sm md:text-lg font-semibold flex items-center justify-center outline-none focus:outline-none focus:ring-0 ${
                  isActive
                    ? "border-2 border-[#F2C016] text-white bg-[#202020]"
                    : "border-white/10 text-white/80 bg-[#1a1a1a] hover:bg-[#202020]"
                }`}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: isActive
                    ? "0 0 18px rgba(242,192,22,0.35), 0 0 36px rgba(242,192,22,0.18)"
                    : "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 22px rgba(0,0,0,0.35)",
                }}
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
          className="rounded-3xl border border-white/10 p-6 md:p-8 grid md:grid-cols-2 gap-6 items-center shadow-[0_20px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/5 min-h-[18rem] md:min-h-[20rem]"
          style={{
            background: "linear-gradient(180deg, rgba(172, 137, 19, 0.19), rgba(20, 20, 20, 0.34)) no-repeat",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.6)",
            willChange: "transform, opacity",
          }}
        >
          <div className="space-y-3">
            <div className="w-16 h-16 flex items-center justify-center exc-img">
              <img src={active.icon} alt="" className="w-12 h-12 object-contain" />
            </div>
            <div className="leading-tight text-lg sm:text-xl md:text-2xl" style={{ color: '#F2C016', fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>{active.title}</div>
            <div className="text-white/70 text-sm leading-relaxed" style={{ whiteSpace: "pre-line" }}>
              {active.text}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl" style={{  filter: "blur(28px)" }} />
            <img
              src={active.image}
              alt={active.title}
              className="relative rounded-2xl w-full h-full md:h-full object-cover"
            />
          </div>
        </motion.div>
      </AnimatePresence>
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
              <span style={{ color: BRAND }}>CONNEX:</span> The Next Generation Institutional Trading <span style={{ color: BRAND }}>workspace</span>
            </>
          }
          subtitle="See cross‑venue depth, set normalised sizes, use execution algos/order types (TWAP/VWAP/IOC/FOK), track funding in real time, and manage risk 24/7. APIs for integration and white‑label options."
        />
        <Section title={<><span className="inline">Choose The Engagement</span><span className="block">That Fits</span></>} titleClassName="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
          <EngagementTabs />
        </Section>
        <Section title={<><span className="inline">Everything A Pro Desk</span><span className="block">Expects‑Built For Traders</span></>} titleClassName="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white" className="execute">
          <div className="grid md:grid-cols-3 gap-5">
            <Pill iconSrc="/visiblity.png" title="Visibility" text="Consolidated book view and price discovery across venues." />
            <Pill iconSrc="/order-tickets.png" title="Order Tickets" text="TWAP/VWAP/IOC/FOK, conditional exits, and level‑aware execution patterns." />
            <Pill iconSrc="/sizing.png" title="Sizing" text="Normalise contract units so 1 is always 1" />
            <Pill iconSrc="/apis.png" title="APIs" text="Integrate with OMS/PMS, data, and custody solutions; enable white‑label flows." />
            <Pill iconSrc="/risk.png" title="Risk" text="PnL, funding, ADL, cash balances, and much more—trade consciously." />
            <Pill iconSrc="/security-new.png" title="Security" text="Encrypted key management, IP allow‑listing, audit trails, and permissions." />
          </div>
        </Section>
        <Section title="What Desks Gain" titleClassName="text-white font-semibold mt-2 text-[35px] sm:text-4xl md:text-5xl lg:text-[48px]" titleStyle={{}} className="execute">
          <div className="grid md:grid-cols-3 gap-5">
            <WhatDesksGainCard
              iconSrc="/better-fill.png"
              title="Better Fills"
              text="Cut slippage with disciplined execution around levels and deeper visibility."
            />
            <WhatDesksGainCard
              iconSrc="/faster-idea.png"
              title="Faster Idea → Trade"
              text="Reduce clicks and context switches with FX-familiar workflows."
            />
            <WhatDesksGainCard
              iconSrc="/tighter-risk.png"
              title="Tighter Risk"
              text="24/7 visibility into P&L, margin, and exposure with alerting."
            />
          </div>
        </Section>
        <Section title="Venues • Data • Custody • OMS/PMS" titleClassName="text-white font-semibold mt-2 text-[35px] sm:text-4xl md:text-5xl lg:text-[48px]" titleStyle={{}}>
          <VenuesSection />
        </Section>
      </main>
    </div>
  );
}