import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Shield, Cpu, Users, ArrowRight } from "lucide-react";

const BRAND = "#F2C016";
const hexToRgba = (hex, a) => {
  const h = hex.replace("#", "");
  const b = parseInt(h, 16);
  const r = (b >> 16) & 255, g = (b >> 8) & 255, bl = b & 255;
  return `rgba(${r}, ${g}, ${bl}, ${a})`;
};



// ===== Hero background with bubbles + tickers (from About Page) =====
const fallIn = { hidden: { opacity: 0, y: -24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const gridStagger = { hidden: {}, show: { transition: { staggerChildren: 0.2, delayChildren: 0.03 } } };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 relative z-10" style={{ fontFamily: 'Montserrat, sans-serif' }}>
  <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-[35px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-semibold tracking-tight text-white pt-8 pb-8" style={{ fontFamily: 'Montserrat, sans-serif', lineHeight: '1.1' }}>{title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="mt-5 text-white/80 max-w-3xl text-base sm:text-lg md:text-xl" style={{ fontFamily: 'Montserrat, sans-serif', lineHeight: '1.6' }}>{subtitle}</motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="mt-8 flex flex-wrap gap-3">
          <a
            href="/about"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-black"
            style={{ background: BRAND, fontFamily: 'Montserrat, sans-serif' }}
          >
            Our story <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== Section block ===== */
function Section({ eyebrow, title, children, id }) {
  return (
    <section id={id} className="border-t border-white/10" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          {eyebrow && <div className="text-[11px] uppercase tracking-[0.22em] text-white/50" style={{ fontFamily: 'Montserrat, sans-serif' }}>{eyebrow}</div>}
          {title && <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mt-2" style={{ fontFamily: 'Montserrat, sans-serif', lineHeight: '1.2' }}>{title}</h2>}
        </div>
        {children}
      </div>
    </section>
  );
}

/* ===== Team page (focused) ===== */

export default function TeamFocused() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const founders = [
    { name: "Peter Jacobson", role: "Co-Founder & Co-CEO", body: "Peter Jacobson is a seasoned professional in the foreign exchange (FX) industry, bringing over 30 years of trading expertise across global financial hubs including London, Tokyo, Singapore, and Sydney. With a sharp eye for market structure and a passion for innovation in electronic execution, Peter continues to be a thought leader in the space." },
    { name: "Greg O'Sullivan", role: "Co-Founder & Co-CEO", body: "Greg is a seasoned financial markets executive with over 20 years of experience in institutional sales, business development, and strategic leadership across Asia-Pacific. He is known for his strategic vision, strong client relationships, and deep expertise in institutional finance and electronic trading technologies. At COLLYBUS, he brings this experience to bear in shaping the future of digital asset trading." },
    { name: "Jonathan Wharton", role: "Co-Founder & CCO", body: "Jonathan brings over 20 years of expertise from Rhicon Currency Management in London and Singapore, where he oversaw Operations, Risk, and Compliance. He has extensive experience with the FCA, MAS, SEC and NFA. His work with regulators ensures that COLLYBUS operates within the legal frameworks of every jurisdiction we serve." },
    { name: "James Dalton", role: "Co-Founder & CTO", body: "With over 30 years in banking and markets, including a decade in Technology & Operations, followed by 20 years in Electronic Execution and Trading, James has deep expertise in market microstructure and product innovation." },
  ];
  const cardContainer = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.16 } } };
  const panelLeft = { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
  const panelRight = { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
  return (
    <div className="min-h-screen bg-black pt-16 md:pt-20" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <main className="bg-black text-white" style={{ position: 'relative', zIndex: 1, fontFamily: 'Montserrat, sans-serif' }}>
        <Hero title={"Meet the team"} subtitle="Decades of experience from trading, fintech, and software—focused on execution quality and customer outcomes" />

        <Section eyebrow="Our Purpose" title="A note from the Co-CEO">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 relative overflow-hidden">
            <div aria-hidden className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl" style={{ background: hexToRgba(BRAND, 0.12) }} />
            <div className="text-base sm:text-lg md:text-xl leading-relaxed text-white" style={{ lineHeight: '1.6' }}>"A trading platform is more than just software — it's the gateway through which traders access the financial markets. Our mission is to make that gateway intuitive and efficient, giving traders the visibility, tools, and confidence to express their ideas and manage risk with ease."</div>
            <div className="mt-4 text-white/60 text-sm">— Peter Jacobson</div>
          </div>
        </Section>

        <Section eyebrow="Founders" title="People building Collybus">
          <div className="space-y-12 px-2 sm:px-0">
            {founders.map((f, i) => {
              const reversed = i % 2 === 1;
              // Social/contact links for each founder
              let email = "";
              let linkedin = "";
              let telegram = "";
              if (f.name === "Peter Jacobson") {
                email = "pj@collybus.co";
                linkedin = "https://www.linkedin.com/in/peter-jacobson-4a72b0267/";
                telegram = "https://t.me/pjcollybus";
              } else if (f.name === "Greg O'Sullivan") {
                email = "gos@collybus.co";
                linkedin = "https://www.linkedin.com/in/greg-o-sullivan-123b84a/";
                telegram = "https://t.me/goscollybus";
              } else if (f.name === "Jonathan Wharton") {
                email = "jw@collybus.co";
                linkedin = "https://www.linkedin.com/in/jonathan-wharton-25374a/";
                telegram = "https://t.me/Jonathan_wharton";
              } else if (f.name === "James Dalton") {
                email = "jd@collybus.co";
                linkedin = "https://www.linkedin.com/in/james-dalton-fx/";
                telegram = "https://t.me/JDCollybus";
              }
              return (
                <motion.div
                  key={f.name}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch w-full mx-auto"
                  variants={!isMobile ? cardContainer : { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }}
                  initial={!isMobile ? "hidden" : "show"}
                  whileInView={!isMobile ? "show" : "show"}
                  viewport={{ once: true, amount: 0.01 }}
                >
                  {/* Image half */}
                  <motion.div
                    className={`rounded-2xl border border-white/10 bg-white/5 overflow-hidden ${reversed ? 'md:order-2' : ''} w-full max-w-xs sm:max-w-sm md:max-w-none mx-auto`}
                    variants={!isMobile ? (reversed ? panelRight : panelLeft) : { hidden: { opacity: 1, x: 0 }, show: { opacity: 1, x: 0 } }}
                  >
                    <div className="h-64 md:h-[420px] w-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                      <img
                        src={
                          f.name === "Peter Jacobson"
                            ? "/images/Peter Jacobson.jpg"
                            : f.name === "Greg O'Sullivan"
                            ? "/images/Greg O'Sullivan.jpg"
                            : f.name === "Jonathan Wharton"
                            ? "/images/Jonathan Wharton.jpg"
                            : f.name === "James Dalton"
                            ? "/images/James Dalton.jpg"
                            : ""
                        }
                        alt={f.name}
                        className="h-full w-full object-cover rounded-xl bg-white/10 shadow-lg max-w-full"
                        style={{ minHeight: 0, minWidth: 0 }}
                      />
                    </div>
                  </motion.div>

                  {/* Text half */}
                  <motion.div
                    className={`${reversed ? 'md:order-1' : ''} flex`}
                    variants={!isMobile ? (reversed ? panelLeft : panelRight) : { hidden: { opacity: 1, x: 0 }, show: { opacity: 1, x: 0 } }}
                  >
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col justify-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {/* Responsive adjustments for text container */}
                      <h3 className="text-2xl md:text-3xl font-semibold text-white break-words" style={{ fontFamily: 'Montserrat, sans-serif' }}>{f.name}</h3>
                      <div className="text-white/70 mt-1 text-base md:text-lg break-words" style={{ fontFamily: 'Montserrat, sans-serif' }}>{f.role}</div>
                      <p className="text-white/70 mt-4 leading-relaxed max-w-prose text-base sm:text-lg md:text-xl break-words" style={{ fontFamily: 'Montserrat, sans-serif', lineHeight: '1.6' }}>{f.body || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, nunc non fermentum iaculis, metus nibh lacinia metus, non vulputate leo nulla sit amet nunc. Aenean in augue at elit sollicitudin facilisis. Integer mattis, arcu in ultrices vehicula, dui nibh fermentum purus, a tristique velit lorem in mi."}</p>
                      <div className="flex flex-wrap gap-5 mt-6">
                        <a href={`mailto:${email}`} aria-label="Email" className="text-gray-300 hover:text-white text-2xl">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="28" height="28">
                            <path d="M1792 710v794q0 66-47 113t-113 47H160q-66 0-113-47T0 1504V710q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38T639 1015q-91-64-262-182.5T172 690q-62-42-117-115.5T0 438q0-78 41.5-130T160 256h1472q65 0 112.5 47t47.5 113z" fill="#ffffff" />
                          </svg>
                        </a>
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-300 hover:text-white text-2xl">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="28" height="28">
                            <path d="M196.064.25C88.347.25.187 88.408.187 196.127v607.841c0 107.717 88.158 195.845 195.877 195.845h607.841c107.718 0 195.845-88.127 195.845-195.845V196.127C999.75 88.41 911.623.25 803.905.25H196.064zm49.266 164.948c51.648 0 83.461 33.906 84.443 78.475 0 43.585-32.797 78.444-85.442 78.444h-.969c-50.665 0-83.412-34.857-83.412-78.444 0-44.568 33.738-78.475 85.379-78.475zm445.08 208.31c99.329 0 173.79 64.922 173.79 204.436v260.449H713.247V595.406c0-61.06-21.847-102.718-76.476-102.718-41.704 0-66.562 28.078-77.476 55.202-3.987 9.704-4.967 23.257-4.967 36.832v253.671H403.375s1.981-411.613 0-454.233h150.984v64.324c20.06-30.95 55.942-74.977 136.051-74.977zm-521.556 10.685h150.953v454.202H168.854V384.193z" fill="#ffffff" />
                          </svg>
                        </a>
                        <a href={telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-gray-300 hover:text-white text-2xl">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" fill="#ffffff"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </Section>

        <Section eyebrow="Careers" title="Got what it takes to revolutionize Digital Asset trading?" id="careers">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <p className="text-white/70 max-w-2xl text-base sm:text-lg md:text-xl" style={{ lineHeight: '1.6' }}>
              We're looking for builders who care about execution quality, reliability, and trader experience. If that's you, come help us raise the standard for digital markets.
            </p>
            <a
              href="mailto:recruitment@collybus.co"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold"
              style={{ background: BRAND, color: "black", boxShadow: `0 0 0 1px ${hexToRgba(BRAND, 0.2)}, 0 6px 16px ${hexToRgba(BRAND, 0.18)}` }}
            >
              Join our Team
            </a>
          </motion.div>
        </Section>

  {/* Footer removed, use main site footer */}
      </main>
      {/* FloatingCTA removed; use global layout FloatingCTA */}
    </div>
  );
}

/* ===== CTA + Footer ===== */
