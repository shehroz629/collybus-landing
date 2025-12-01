"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Product", href: "/product" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
  ];

  return (
    <div
      className={`main-head fixed border-b border-white/0 top-0 left-0 right-0 z-[9] transition-all duration-300 pt-2 ${isScrolled ? "backdrop-blur-md bg-black/30 border-b border-white/10" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Collybus home">
          <img
            src="https://collybus.co/images/collybus-logo.svg"
            alt="Collybus"
            className="h-8 w-auto md:h-12 md:w-auto transform scale-100 origin-left"
          />
        </Link>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(({ label, href }) => {
            const currentPath = pathname || "";
            const isActive = href === "/" ? currentPath === "/" : currentPath.startsWith(href);
            return (
              <Link
                key={label}
                href={href}
                className={`px-5 py-2 rounded-xl text-[18px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect y="5" width="24" height="2.5" rx="1.2" fill="#fff" />
            <rect y="11" width="24" height="2.5" rx="1.2" fill="#fff" />
            <rect y="17" width="24" height="2.5" rx="1.2" fill="#fff" />
          </svg>
        </button>

        {/* Mobile menu overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center min-h-screen transition-all duration-300 visible opacity-100"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="relative w-11/12 max-w-sm mx-auto flex items-center justify-center min-h-screen">
              <div className="bg-[#18181b] rounded-2xl shadow-2xl p-8 pt-16 flex flex-col items-center animate-fadeInUp border border-white/10 relative w-full">
                <button
                  className="absolute top-4 right-4 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" width="28" height="28">
                    <path d="M70.7 64.3c1.8 1.8 1.8 4.6 0 6.4-.9.9-2 1.3-3.2 1.3-1.2 0-2.3-.4-3.2-1.3L46 52.4 27.7 70.7c-.9.9-2 1.3-3.2 1.3s-2.3-.4-3.2-1.3c-1.8-1.8-1.8-4.6 0-6.4L39.6 46 21.3 27.7c-1.8-1.8-1.8-4.6 0-6.4 1.8-1.8 4.6-1.8 6.4 0L46 39.6l18.3-18.3c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4L52.4 46l18.3 18.3z" fill="#ffffff" />
                  </svg>
                </button>
                <nav className="w-full flex flex-col gap-4 mt-4">
                  {navItems.map(({ label, href }) => {
                    const currentPath = pathname || "";
                    const isActive = href === "/" ? currentPath === "/" : currentPath.startsWith(href);
                    return (
                      <Link
                        key={label}
                        href={href}
                        className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 ${
                          isActive
                            ? "text-white bg-white/10"
                            : "text-white/70 hover:text-white/90 hover:bg-white/10"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setMobileOpen(false)}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

<style>
  {
    `
    .main-head {
      border-bottom: 1px solid #ffffff00;
    }

    .main-head.border-b {
      border-bottom: 1px solid #ffffff1f;
    }
    `
  }
</style>
export default Header;
