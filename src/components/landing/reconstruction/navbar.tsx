'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { WebloomFlowerIcon } from './webloom-logo';
import { MagneticWrapper } from './motion-primitives';
import {
  useWebloomTheme,
  useWebloomSyncState,
} from './webloom-dual-theme-context';
import { useApp } from '@/lib/context/app-context';

const NAV_ITEMS = [
  { label: 'Product', href: '#product' },
  { label: 'Templates', href: '#templates' },
  { label: 'Explore', href: '#explore' },
  { label: 'Pricing', href: '#pricing' },
];

export function WebloomNavbar() {
  const theme = useWebloomTheme();
  const isDark = theme === 'dark';
  const { hoveredNav, setHoveredNav, themeMode, toggleThemeMode } =
    useWebloomSyncState();
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
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
          ? isDark
            ? 'bg-[#161310]/90 backdrop-blur-md border-b border-[#332B23]/85 shadow-[0_4px_20px_rgba(0,0,0,0.35)] h-13'
            : 'bg-[#FAF6EE]/88 backdrop-blur-md border-b border-[#E4D8C5]/75 shadow-[0_4px_20px_rgba(38,28,18,0.05)] h-13'
          : 'bg-transparent h-14'
      }`}
    >
      <div
        className={`h-full flex items-center justify-between max-w-6xl mx-auto px-6 sm:px-10 ${
          isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
        }`}
      >
        {/* Brand with rotating rosette icon on hover */}
        <Link href="/" className="group flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 90, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 240, damping: 16 }}
          >
            <WebloomFlowerIcon
              className="w-5 h-5"
              strokeColor={isDark ? '#F4EFE6' : '#1F1A16'}
            />
          </motion.div>
          <span
            className={`font-semibold text-[17px] tracking-tight font-sans ${
              isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
            }`}
          >
            Webloom
          </span>
        </Link>

        {/* Desktop Nav Links with Animated Sliding Pill */}
        <nav
          onMouseLeave={() => setHoveredNav(null)}
          className={`hidden md:flex items-center gap-2 text-[13px] font-medium ${
            isDark ? 'text-[#DFD5C7]' : 'text-[#221E1B]'
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredNav(item.label)}
              className={`relative px-3.5 py-1.5 rounded-full transition-colors ${
                isDark ? 'hover:text-white' : 'hover:text-black'
              }`}
            >
              {hoveredNav === item.label && (
                <motion.span
                  layoutId={isDark ? 'webloom-nav-pill-dark' : 'webloom-nav-pill'}
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  className={`absolute inset-0 rounded-full -z-10 ${
                    isDark
                      ? 'bg-[#2A221C]/95 border border-[#44382E]'
                      : 'bg-[#EFE4D4]/85 border border-[#DFD0BC]/80'
                  }`}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Auth Actions, Theme Toggle & Mobile Hamburger */}
        <div className="flex items-center gap-2.5 sm:gap-4 text-[13px] font-medium">
          {/* Dark / Light Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleThemeMode}
            aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
            className={`p-1.5 sm:p-2 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
              isDark
                ? 'bg-[#26201B] hover:bg-[#342B24] border-[#3E332A] text-[#F7DC6F]'
                : 'bg-[#EFE4D4]/80 hover:bg-[#E5D7BE] border-[#DFD0BC] text-[#4E3E30]'
            }`}
          >
            {themeMode === 'light' ? (
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            )}
          </button>

          <button
            onClick={handleLogin}
            className={`transition-colors px-1.5 py-1 font-medium ${
              isDark
                ? 'text-[#DFD5C7] hover:text-white'
                : 'text-[#221E1B] hover:text-black'
            }`}
          >
            Log in
          </button>

          <MagneticWrapper strength={0.22}>
            <button
              onClick={handleSignup}
              className={`inline-flex items-center justify-center gap-1 px-4.5 py-1.5 rounded-full text-[12px] font-medium shadow-2xs transition-all hover:scale-[1.03] active:scale-[0.97] ${
                isDark
                  ? 'bg-[#F4EFE6] hover:bg-white text-[#161310]'
                  : 'bg-[#181614] hover:bg-black text-[#FAF6EE]'
              }`}
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
            className={`md:hidden w-8 h-8 rounded-full flex flex-col items-center justify-center gap-1 ${
              isDark
                ? 'bg-[#26201B] border border-[#3E332A] text-[#F4EFE6]'
                : 'bg-[#EFE4D4]/80 border border-[#DFD0BC] text-[#1F1A16]'
            }`}
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
            className={`md:hidden backdrop-blur-md border-b px-6 py-4 shadow-lg ${
              isDark
                ? 'bg-[#161310]/96 border-[#332B23] text-[#F4EFE6]'
                : 'bg-[#FAF6EE]/96 border-[#DFD0BC] text-[#1F1A16]'
            }`}
          >
            <div className="flex flex-col gap-2 text-[14px] font-medium">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-[#26201B]' : 'hover:bg-[#EFE4D4]/60'
                  }`}
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
