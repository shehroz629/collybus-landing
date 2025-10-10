"use client";
import React, { useState } from "react";

const founders = [
  { name: "Peter Jacobson", role: "Co-Founder & CEO", photo: "/images/Peter Jacobson.jpg" },
  { name: "Greg O'Sullivan", role: "Co-Founder & CRO", photo: "/images/Greg O'Sullivan.jpg" },
  { name: "Jonathan Wharton", role: "Co-Founder & CCO", photo: "/images/Jonathan Wharton.jpg" },
  { name: "James Dalton", role: "Co-Founder & CTO", photo: "/images/James Dalton.jpg" },
];

const FoundersSection = () => {
  const [pjOpen, setPjOpen] = useState(false);
  const [goOpen, setGoOpen] = useState(false);
  const [johnnyOpen, setJohnnyOpen] = useState(false);
  const [jdOpen, setJdOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {founders.map((f, i) => {
          if (f.name === "Peter Jacobson") {
            return (
              <button
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center focus:outline-none w-full"
                onClick={() => setPjOpen(true)}
                aria-label="View PJ bio"
                type="button"
              >
                <div className="relative mx-auto mb-4 h-50 w-50 rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
                  <img src={f.photo} alt={`${f.name} headshot`} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="text-white font-medium">{f.name}</div>
                <div className="text-white/60 text-xs">{f.role}</div>
              </button>
            );
          } else if (f.name === "Greg O'Sullivan") {
            return (
              <button
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center focus:outline-none w-full"
                onClick={() => setGoOpen(true)}
                aria-label="View GO bio"
                type="button"
              >
                <div className="relative mx-auto mb-4 h-50 w-50 rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
                  <img src={f.photo} alt={`${f.name} headshot`} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="text-white font-medium">{f.name}</div>
                <div className="text-white/60 text-xs">{f.role}</div>
              </button>
            );
          } else if (f.name === "Jonathan Wharton") {
            return (
              <button
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center focus:outline-none w-full"
                onClick={() => setJohnnyOpen(true)}
                aria-label="View Johnny bio"
                type="button"
              >
                <div className="relative mx-auto mb-4 h-50 w-50 rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
                  <img src={f.photo} alt={`${f.name} headshot`} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="text-white font-medium">{f.name}</div>
                <div className="text-white/60 text-xs">{f.role}</div>
              </button>
            );
          } else if (f.name === "James Dalton") {
            return (
              <button
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center focus:outline-none w-full"
                onClick={() => setJdOpen(true)}
                aria-label="View JD bio"
                type="button"
              >
                <div className="relative mx-auto mb-4 h-50 w-50 rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
                  <img src={f.photo} alt={`${f.name} headshot`} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="text-white font-medium">{f.name}</div>
                <div className="text-white/60 text-xs">{f.role}</div>
              </button>
            );
          } else {
            return (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center w-full">
                <div className="relative mx-auto mb-4 h-50 w-50 rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
                  <img src={f.photo} alt={`${f.name} headshot`} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="text-white font-medium">{f.name}</div>
                <div className="text-white/60 text-xs">{f.role}</div>
              </div>
            );
          }
        })}
      </div>

      {/* PJ Modal */}
      {pjOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setPjOpen(false)}
        >
          <div
            className="bg-[#18181b] rounded-2xl shadow-2xl max-w-2xl w-full relative animate-fadeInUp flex flex-col overflow-auto"
            style={{ maxHeight: "90vh" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-6 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
              onClick={() => setPjOpen(false)}
              aria-label="Close PJ bio"
              type="button"
              style={{ zIndex: 2 }}
            >
              &times;
            </button>
            <div className="flex flex-col items-center w-full">
              <div className="w-full bg-black" style={{ height: "500px", overflow: "hidden" }}>
                <img
                  src="/images/Peter Jacobson.jpg"
                  alt="PJ headshot"
                  className="object-cover w-full h-full"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                />
              </div>
              <div className="w-full px-8 py-8">
                <div className="text-2xl font-semibold text-white mb-1 text-left">Peter Jacobson</div>
                <div className="text-base text-gray-400 mb-4 text-left">Co-Founder & CEO</div>
                <div className="text-gray-200 text-sm mb-6 text-left leading-relaxed">
                  Peter Jacobson is a seasoned professional in the foreign exchange (FX) industry, bringing over 30 years of
                  trading expertise across global financial hubs including London, Tokyo, Singapore, and Sydney. He began his
                  career at top-tier sell-side institutions such as Swiss Bank and Goldman Sachs, where he cultivated a deep
                  knowledge in FX markets and electronic trading. Peter went on to found Rhicon Currency Management, where he
                  played an instrumental role in shaping the firm's vision and direction. His contributions spanned the full
                  spectrum of the business - from portfolio management and overseeing execution platforms to managing
                  day-to-day functions. He also served as a core member of both the investment and risk committees. With a sharp
                  eye for market structure and a passion for innovation in electronic execution, Peter continues to be a thought
                  leader in the space.
                </div>
                <div className="flex gap-6 mt-4 justify-start items-center">
                  <a
                    href="https://www.linkedin.com/in/peter-jacobson-4a72b0267/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-gray-300 hover:text-white text-2xl transform transition-transform hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="mailto:pj@collybus.co" aria-label="Email" className="text-gray-300 hover:text-white text-2xl">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                  <a
                    href="https://t.me/pjcollybus"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="text-gray-300 hover:text-white text-2xl"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" fill="#ffffff"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Johnny Modal */}
      {johnnyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setJohnnyOpen(false)}
        >
          <div
            className="bg-[#18181b] rounded-2xl shadow-2xl max-w-2xl w-full relative animate-fadeInUp flex flex-col overflow-auto"
            style={{ maxHeight: "90vh" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-6 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
              onClick={() => setJohnnyOpen(false)}
              aria-label="Close Johnny bio"
              type="button"
              style={{ zIndex: 2 }}
            >
              &times;
            </button>
            <div className="flex flex-col items-center w-full">
              <div className="w-full bg-black flex-shrink-0" style={{ height: "500px", overflow: "hidden" }}>
                <img
                  src="/images/Jonathan Wharton.jpg"
                  alt="Johnny headshot"
                  className="object-cover w-full h-full"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div className="w-full px-8 py-8">
                <div className="text-2xl font-semibold text-white mb-1 text-left">Jonathan Wharton</div>
                <div className="text-base text-gray-400 mb-4 text-left">Co-Founder & CCO</div>
                <div className="text-gray-200 text-sm mb-6 text-left leading-relaxed">
                  Jonathan brings over 20 years of expertise from Rhicon Currency Management in London and Singapore, where he
                  oversaw Operations, Risk, and Compliance. He has extensive experience with the FCA, MAS, SEC and NFA. Prior
                  to joining Rhicon, Jonathan started his career at Goldman Sachs in London. Since mid-2020, Jonathan has led
                  the Singapore office at the investment manager, and as well as serving on its fund's board has been head of
                  the risk and operations management committee. His work with regulators ensures that COLLYBUS operates within
                  the legal frameworks of every jurisdiction we serve.
                </div>
                <div className="flex gap-6 mt-4 justify-start items-center">
                  <a
                    href="https://www.linkedin.com/in/jonathan-wharton-25374a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-gray-300 hover:text-white text-2xl transform transition-transform hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="mailto:jw@collybus.co" aria-label="Email" className="text-gray-300 hover:text-white text-2xl">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                  <a
                    href="https://t.me/Jonathan_wharton"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="text-gray-300 hover:text-white text-2xl"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" fill="#ffffff"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GO Modal */}
      {goOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setGoOpen(false)}
        >
          <div
            className="bg-[#18181b] rounded-2xl shadow-2xl max-w-2xl w-full relative animate-fadeInUp flex flex-col overflow-auto"
            style={{ maxHeight: "90vh" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-6 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
              onClick={() => setGoOpen(false)}
              aria-label="Close GO bio"
              type="button"
              style={{ zIndex: 2 }}
            >
              &times;
            </button>
            <div className="flex flex-col items-center w-full">
              <div className="w-full bg-black flex-shrink-0" style={{ height: "500px", overflow: "hidden" }}>
                <img
                  src="/images/Greg O'Sullivan.jpg"
                  alt="GO headshot"
                  className="object-cover w-full h-full"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div className="w-full px-8 py-8">
                <div className="text-2xl font-semibold text-white mb-1 text-left">Greg O'Sullivan</div>
                <div className="text-base text-gray-400 mb-4 text-left">Co-Founder & CRO</div>
                <div className="text-gray-200 text-sm mb-6 text-left leading-relaxed">
                  Greg is a seasoned financial markets executive with over 20 years of experience in institutional sales,
                  business development, and strategic leadership across Asia-Pacific. Before co-founding COLLYBUS, he led 360T's
                  operations in Australia and New Zealand, driving institutional market expansion across the region. Prior to
                  that, Greg spent nearly 15 years at State Street Bank, where he served as Vice President and Head of Business
                  Development for Australia and New Zealand — successfully leading growth initiatives and securing key
                  institutional partnerships. Based in Sydney, Greg is known for his strategic vision, strong client
                  relationships, and deep expertise in institutional finance and electronic trading technologies. At COLLYBUS, he
                  brings this experience to bear in shaping the future of digital asset trading.
                </div>
                <div className="flex gap-6 mt-4 justify-start items-center">
                  <a
                    href="https://www.linkedin.com/in/greg-o-sullivan-123b84a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-gray-300 hover:text-white text-2xl transform transition-transform hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="mailto:gos@collybus.co" aria-label="Email" className="text-gray-300 hover:text-white text-2xl">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                  <a
                    href="https://t.me/goscollybus"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="text-gray-300 hover:text-white text-2xl"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" fill="#ffffff"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* JD Modal */}
      {jdOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setJdOpen(false)}
        >
          <div
            className="bg-[#18181b] rounded-2xl shadow-2xl max-w-2xl w-full relative animate-fadeInUp flex flex-col overflow-auto"
            style={{ maxHeight: "90vh" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-6 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
              onClick={() => setJdOpen(false)}
              aria-label="Close JD bio"
              type="button"
              style={{ zIndex: 2 }}
            >
              &times;
            </button>
            <div className="flex flex-col items-center w-full">
              <div className="w-full bg-black flex-shrink-0" style={{ height: "500px", overflow: "hidden" }}>
                <img
                  src="/images/James Dalton.jpg"
                  alt="JD headshot"
                  className="object-cover w-full h-full"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div className="w-full px-8 py-8">
                <div className="text-2xl font-semibold text-white mb-1 text-left">James Dalton</div>
                <div className="text-base text-gray-400 mb-4 text-left">Co-Founder & CTO</div>
                <div className="text-gray-200 text-sm mb-6 text-left leading-relaxed">
                  With over 30 years in banking and markets, including a decade in Technology & Operations, followed by 20 years
                  in Electronic Execution and Trading, James has deep expertise in market microstructure and product innovation.
                  At Citibank in the Foreign Exchange business, he built and ran the first Major Bank FX Algorithmic Execution
                  Service that combined internal liquidity with sophisticated DMA smart order routing, driven by some of the
                  earliest real-time predictive liquidity models in currency markets. He also ran all Digital Products and
                  Strategy for NAB FICC.
                </div>
                <div className="flex gap-6 mt-4 justify-start items-center">
                  <a
                    href="https://www.linkedin.com/in/james-dalton-fx/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-gray-300 hover:text-white text-2xl transform transition-transform hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="mailto:jd@collybus.co" aria-label="Email" className="text-gray-300 hover:text-white text-2xl">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                  <a
                    href="https://t.me/JDCollybus"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="text-gray-300 hover:text-white text-2xl"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" fill="#ffffff"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoundersSection;
