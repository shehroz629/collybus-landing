"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const SCROLL_TRANSITION_RANGE = 50;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoState, setLogoState] = useState<"shrink" | "full">("full");

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScrollAndResize = useCallback(() => {
    const scrollY = window.scrollY;
    const progress = Math.min(1, scrollY / SCROLL_TRANSITION_RANGE);
    setLogoState(progress < 0.5 ? "full" : "shrink");
  }, []);

  useEffect(() => {
    handleScrollAndResize();

    window.addEventListener("scroll", handleScrollAndResize);
    window.addEventListener("resize", handleScrollAndResize);

    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, [handleScrollAndResize]);

  return (
    <header
      className={`bg-black sticky top-0 z-50 shadow-md transition-all duration-300 ${
        logoState === "shrink" ? "py-1 md:py-2" : "py-1/2 md:py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className={`transition-all duration-300 ${
            logoState === "shrink"
              ? "h-10 py-2 md:h-16"
              : "h-16 py-4 md:h-24"
          }`}
        >
          <img
            src="/images/collybus-logo.svg"
            alt="Collybus"
            className="h-full"
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <Link
            href="/#home"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-normal"
          >
            Home
          </Link>
          <Link
            href="/#vision"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-normal"
          >
            Vision
          </Link>
          <Link
            href="/#product"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-normal"
          >
            Product
          </Link>
          <Link
            href="/#team"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-normal"
          >
            Team
          </Link>
          <Link
            href="/#contact"
            className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-normal px-4 py-2 rounded-md transition-colors duration-300"
          >
            Contact
          </Link>
        </nav>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`bg-black pl-6 pr-6 md:hidden ${
          isMobileMenuOpen ? "" : "hidden"
        }`}
      >
        <Link
          href="/#home"
          onClick={toggleMenu}
          className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
        >
          Home
        </Link>
        <Link
          href="/#vision"
          onClick={toggleMenu}
          className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
        >
          Vision
        </Link>
        <Link
          href="/#product"
          onClick={toggleMenu}
          className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
        >
          Product
        </Link>
        <Link
          href="/#team"
          onClick={toggleMenu}
          className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
        >
          Team
        </Link>
        <Link
          href="/#contact"
          onClick={toggleMenu}
          className="block text-yellow-400 hover:text-yellow-500 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-md text-base font-semibold"
        >
          Contact
        </Link>
      </div>
    </header>
  );
};

export default Header;
