'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { WebloomFlowerLogo } from '@/components/ui/webloom-logo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Your Page', href: '#your-page' },
    { label: 'Projects', href: '#projects' },
    { label: 'Customization', href: '#customization' },
    { label: 'Analytics', href: '#analytics' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090B]/90 backdrop-blur-md border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Left: Webloom Logo & Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-white transition-opacity hover:opacity-95"
        >
          <div className="flex items-center justify-center w-7 h-7">
            <WebloomFlowerLogo className="w-6 h-6 group-hover:scale-105 transition-transform" />
          </div>
          <span className="font-semibold tracking-tight text-[18px] text-white">
            Webloom
          </span>
        </Link>

        {/* Center: Editorial Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 text-[14px] text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 hover:text-white transition-colors duration-200 tracking-normal font-normal text-[14px]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-[14px]">
          <button
            onClick={() => handleOpenAuth('signin')}
            className="text-zinc-300 hover:text-white transition-colors tracking-normal px-2 py-1.5 focus:outline-none font-medium"
          >
            Sign in
          </button>
          
          {/* White button matching the screenshot */}
          <button
            onClick={() => handleOpenAuth('signup')}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-zinc-100 text-[#09090B] font-medium text-[14px] transition-all duration-200 active:translate-y-[1px] shadow-sm focus:outline-none"
          >
            <span>Create your Webloom</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Actions & Hamburger */}
        <div className="flex lg:hidden items-center gap-2.5">
          <button
            onClick={() => handleOpenAuth('signup')}
            className="md:hidden px-3.5 py-1.5 rounded-lg bg-white text-black text-[13px] font-medium shadow-sm"
          >
            Create
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white focus:outline-none rounded-lg"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[#08090B]/98 border-b border-white/[0.08] px-6 py-6 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[16px] text-zinc-300 hover:text-white py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-white/[0.08] flex flex-col gap-3">
                <button
                  onClick={() => handleOpenAuth('signin')}
                  className="w-full text-left py-2 text-zinc-300 hover:text-white text-[15px]"
                >
                  Sign in
                </button>
                <button
                  onClick={() => handleOpenAuth('signup')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white text-black font-medium text-[14px] shadow-lg"
                >
                  <span>Create your Webloom</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
