'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { WebloomFlowerIcon } from './webloom-logo';
import { MagneticWrapper } from './motion-primitives';
import { useApp } from '@/lib/context/app-context';

const NAV_ITEMS = [
  { label: 'Product', href: '#product' },
  { label: 'Templates', href: '#templates' },
  { label: 'Explore', href: '#explore' },
  { label: 'Pricing', href: '#pricing' },
];

export function WebloomNavbar() {
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogin = () => {
    setMobileMenuOpen(false);
    setAuthModalMode('signin');
    setIsAuthModalOpen(true);
  };

  const handleSignup = () => {
    setMobileMenuOpen(false);
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 select-none ${
        scrolled
          ? 'bg-[#FAF6EE]/88 backdrop-blur-md border-b border-[#E4D8C5]/75 shadow-[0_4px_20px_rgba(38,28,18,0.05)] h-13'
          : 'bg-transparent h-14'
      }`}
    >
      <div className="h-full flex items-center justify-between max-w-6xl mx-auto px-6 sm:px-10 text-[#1F1A16]">
        {/* Brand with rotating rosette icon on hover */}
        <Link href="/" className="group flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 90, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 240, damping: 16 }}
          >
            <WebloomFlowerIcon className="w-5 h-5 text-[#1F1A16]" />
          </motion.div>
          <span className="font-semibold text-[17px] tracking-tight text-[#1F1A16] font-sans">
            Webloom
          </span>
        </Link>

        {/* Desktop Nav Links with Animated Sliding Pill & Underline */}
        <nav
          onMouseLeave={() => setHoveredNav(null)}
          className="hidden md:flex items-center gap-2 text-[13px] font-medium text-[#221E1B]"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredNav(item.label)}
              className="relative px-3.5 py-1.5 rounded-full hover:text-black transition-colors"
            >
              {hoveredNav === item.label && (
                <motion.span
                  layoutId="webloom-nav-pill"
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  className="absolute inset-0 rounded-full bg-[#EFE4D4]/85 border border-[#DFD0BC]/80 -z-10"
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Auth Actions & Mobile Hamburger */}
        <div className="flex items-center gap-3 sm:gap-5 text-[13px] font-medium">
          <button
            onClick={handleLogin}
            className="text-[#221E1B] hover:text-black transition-colors px-1.5 py-1 font-medium"
          >
            Log in
          </button>

          <MagneticWrapper strength={0.22}>
            <button
              onClick={handleSignup}
              className="inline-flex items-center justify-center gap-1 bg-[#181614] hover:bg-black text-[#FAF6EE] px-4.5 py-1.5 rounded-full text-[12px] font-medium shadow-2xs transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>Get Started</span>
              <span className="text-[10px] font-sans">↗</span>
            </button>
          </MagneticWrapper>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden w-8 h-8 rounded-full bg-[#EFE4D4]/80 border border-[#DFD0BC] flex flex-col items-center justify-center gap-1 text-[#1F1A16]"
          >
            <span
              className={`w-3.5 h-[1.5px] bg-current transition-transform ${
                mobileMenuOpen ? 'rotate-45 translate-y-[2.5px]' : ''
              }`}
            />
            <span
              className={`w-3.5 h-[1.5px] bg-current transition-transform ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[2.5px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#FAF6EE]/96 backdrop-blur-md border-b border-[#DFD0BC] px-6 py-4 shadow-lg"
          >
            <div className="flex flex-col gap-2 text-[14px] font-medium text-[#1F1A16]">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-[#EFE4D4]/60 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
