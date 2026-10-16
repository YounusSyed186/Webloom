'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  TrendingUp, 
  ArrowRight, 
  Share2, 
  Sparkles,
  MapPin,
  CheckCircle2,
  FileText,
  FolderGit2,
  Lock
} from 'lucide-react';
import { 
  GithubIcon, 
  XIcon, 
  LinkedinIcon, 
  YoutubeIcon, 
  InstagramIcon, 
  DiscordIcon 
} from '@/components/ui/icons';
import { useToast } from '@/components/ui/toast';

type ThemeKey = 'obsidian' | 'blue' | 'green' | 'coral' | 'pink';

interface ThemeConfig {
  id: ThemeKey;
  label: string;
  dotColor: string;
  bgGradient: string;
  auroraGradient: string;
  cardBg: string;
  cardBorder: string;
  cardHover: string;
  accentColor: string;
  badgeBg: string;
  socialBg: string;
}

const THEME_STYLES: Record<ThemeKey, ThemeConfig> = {
  obsidian: {
    id: 'obsidian',
    label: 'Obsidian',
    dotColor: '#1B1433',
    bgGradient: 'from-[#0B0D14] via-[#090A0F] to-[#141024]',
    auroraGradient: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.65) 0%, rgba(59, 130, 246, 0.35) 60%, transparent 80%)',
    cardBg: 'bg-[#14161E]',
    cardBorder: 'border-white/[0.08]',
    cardHover: 'hover:bg-[#1A1D27]',
    accentColor: '#9B6BFF',
    badgeBg: 'bg-[#3B82F6]',
    socialBg: 'bg-[#181A22]',
  },
  blue: {
    id: 'blue',
    label: 'Electric Blue',
    dotColor: '#2563EB',
    bgGradient: 'from-[#06121E] via-[#09182A] to-[#0D243F]',
    auroraGradient: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.7) 0%, rgba(37, 99, 235, 0.5) 60%, transparent 80%)',
    cardBg: 'bg-[#0E223D]',
    cardBorder: 'border-sky-500/25',
    cardHover: 'hover:bg-[#132C4F]',
    accentColor: '#38BDF8',
    badgeBg: 'bg-[#0284C7]',
    socialBg: 'bg-[#0F2644]',
  },
  green: {
    id: 'green',
    label: 'Emerald Forest',
    dotColor: '#059669',
    bgGradient: 'from-[#031510] via-[#052419] to-[#082E20]',
    auroraGradient: 'radial-gradient(ellipse at center, rgba(52, 211, 153, 0.7) 0%, rgba(16, 185, 129, 0.5) 60%, transparent 80%)',
    cardBg: 'bg-[#0A2B1F]',
    cardBorder: 'border-emerald-500/25',
    cardHover: 'hover:bg-[#0E3A2A]',
    accentColor: '#34D399',
    badgeBg: 'bg-[#059669]',
    socialBg: 'bg-[#0B2E21]',
  },
  coral: {
    id: 'coral',
    label: 'Sunset Glow',
    dotColor: '#EA580C',
    bgGradient: 'from-[#1A0E1A] via-[#2A121E] to-[#3B151F]',
    auroraGradient: 'radial-gradient(ellipse at center, rgba(251, 146, 60, 0.75) 0%, rgba(244, 63, 94, 0.5) 60%, transparent 80%)',
    cardBg: 'bg-[#331825]',
    cardBorder: 'border-orange-500/25',
    cardHover: 'hover:bg-[#422030]',
    accentColor: '#FB923C',
    badgeBg: 'bg-[#EA580C]',
    socialBg: 'bg-[#351A27]',
  },
  pink: {
    id: 'pink',
    label: 'Neon Bloom',
    dotColor: '#DB2777',
    bgGradient: 'from-[#150724] via-[#230C38] to-[#2E0F49]',
    auroraGradient: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.75) 0%, rgba(168, 85, 247, 0.6) 60%, transparent 80%)',
    cardBg: 'bg-[#2E1247]',
    cardBorder: 'border-pink-500/25',
    cardHover: 'hover:bg-[#3D185D]',
    accentColor: '#F472B6',
    badgeBg: 'bg-[#DB2777]',
    socialBg: 'bg-[#30134A]',
  },
};

export function HeroPreview() {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [activeTheme, setActiveTheme] = useState<ThemeKey>('obsidian');
  const { success } = useToast();

  const currentTheme = THEME_STYLES[activeTheme];

  const handleCopyUrl = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText('https://webloom.site/younus');
      success('Copied to clipboard!', 'https://webloom.site/younus');
    }
  };

  const themeList: { id: ThemeKey; color: string }[] = [
    { id: 'obsidian', color: '#1B1433' },
    { id: 'blue', color: '#2563EB' },
    { id: 'green', color: '#059669' },
    { id: 'coral', color: '#EA580C' },
    { id: 'pink', color: '#DB2777' },
  ];

  // Dynamic responsive sizing based on Preview toolbar mode
  const getFrameDimensions = () => {
    switch (deviceMode) {
      case 'mobile':
        return {
          containerWidth: 'w-[315px] sm:w-[335px]',
          height: 'h-[610px] sm:h-[625px]',
          borderRadius: 'rounded-[48px]',
          innerRadius: 'rounded-[40px]',
          isDesktop: false,
        };
      case 'tablet':
        return {
          containerWidth: 'w-[360px] sm:w-[410px]',
          height: 'h-[610px] sm:h-[625px]',
          borderRadius: 'rounded-[38px]',
          innerRadius: 'rounded-[30px]',
          isDesktop: false,
        };
      case 'desktop':
        return {
          containerWidth: 'w-full max-w-[480px] sm:max-w-[520px]',
          height: 'h-[610px] sm:h-[625px]',
          borderRadius: 'rounded-[26px]',
          innerRadius: 'rounded-[20px]',
          isDesktop: true,
        };
    }
  };

  const frame = getFrameDimensions();

  return (
    <div className="relative w-full max-w-[580px] mx-auto flex items-center justify-center select-none py-6">
      
      {/* 🔮 Dynamic Theme Atmospheric Glow behind Phone */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[580px] rounded-full pointer-events-none opacity-60 blur-[90px] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${currentTheme.accentColor}44 0%, rgba(99, 102, 241, 0.18) 45%, transparent 75%)`,
        }}
      />

      {/* Thin orbital circle line around phone */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border pointer-events-none transition-colors duration-500" 
        style={{ borderColor: `${currentTheme.accentColor}25` }}
      />

      {/* ======================================================== */}
      {/* 📱 1. FLOATING PREVIEW CONTROLS (Top-Left of Phone) */}
      {/* ======================================================== */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute -top-3 -left-4 sm:-left-10 z-30 p-2.5 rounded-2xl bg-[#111319]/95 border border-white/[0.12] backdrop-blur-md shadow-2xl shadow-black/80"
      >
        <span className="text-[11px] font-medium text-zinc-400 block mb-2 px-1">Preview</span>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded-lg transition-all ${
              deviceMode === 'mobile'
                ? 'bg-[#9B6BFF]/25 border border-[#9B6BFF] text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4 text-[#C084FC]" />
          </button>
          <button 
            onClick={() => setDeviceMode('tablet')}
            className={`p-1.5 rounded-lg transition-all ${
              deviceMode === 'tablet'
                ? 'bg-[#9B6BFF]/25 border border-[#9B6BFF] text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded-lg transition-all ${
              deviceMode === 'desktop'
                ? 'bg-[#9B6BFF]/25 border border-[#9B6BFF] text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* 🎨 2. FLOATING THEME PRESET (Middle-Left of Phone) */}
      {/* ======================================================== */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-[36%] -left-6 sm:-left-14 z-30 p-3 rounded-2xl bg-[#111319]/95 border border-white/[0.12] backdrop-blur-md shadow-2xl shadow-black/80 w-[168px]"
      >
        <span className="text-[11px] font-medium text-zinc-300 block mb-2.5">Theme Preset</span>
        <div className="flex items-center gap-2 mb-2">
          {themeList.map((t) => {
            const isActive = activeTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTheme(t.id)}
                className={`rounded-full transition-all duration-200 ${
                  isActive 
                    ? 'w-5 h-5 border-2 border-white ring-2 ring-[#9B6BFF] scale-110 shadow-lg' 
                    : 'w-4 h-4 hover:scale-115 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: t.color }}
                title={THEME_STYLES[t.id].label}
                aria-label={`Select ${THEME_STYLES[t.id].label} theme`}
              />
            );
          })}
        </div>
        <span className="text-[11px] font-mono text-zinc-400 block transition-colors duration-200">
          {currentTheme.label}
        </span>
      </motion.div>

      {/* ======================================================== */}
      {/* 🌐 3. FLOATING PROFILE URL PILL (Top-Right of Phone) */}
      {/* ======================================================== */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        onClick={handleCopyUrl}
        className="cursor-pointer group absolute top-10 -right-4 sm:-right-10 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111319]/95 border border-white/[0.12] backdrop-blur-md shadow-2xl hover:border-[#9B6BFF]/50 transition-all"
        title="Click to copy URL"
      >
        <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
        <span className="text-[12px] font-mono text-zinc-300 group-hover:text-white transition-colors">
          webloom.site/younus
        </span>
      </motion.div>

      {/* ======================================================== */}
      {/* 📊 4. FLOATING ANALYTICS CARD (Middle-Right of Phone) */}
      {/* ======================================================== */}
      <motion.div 
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="absolute top-[34%] -right-4 sm:-right-12 z-30 flex items-center gap-3 p-3.5 rounded-2xl bg-[#111319]/95 border border-white/[0.12] backdrop-blur-md shadow-2xl shadow-black/80"
      >
        <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-white tracking-tight">14.2K Views</p>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-emerald-400 font-medium">↑ 41.6%</span>
            <span className="text-[10px] text-zinc-500 font-mono">Last 30 days</span>
          </div>
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* ✍️ 5. HANDWRITTEN SCRIPT & ARROW (Below Analytics Card) */}
      {/* ======================================================== */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="hidden sm:flex absolute top-[52%] -right-6 sm:-right-14 z-30 items-start gap-2.5 text-[#B48AFF] pointer-events-none select-none"
      >
        <svg className="w-7 h-10 text-[#A78BFA] shrink-0 mt-1" viewBox="0 0 28 36" fill="none">
          <path 
            d="M24 32 C 10 26, 4 14, 10 4" 
            stroke="currentColor" 
            strokeWidth="1.7" 
            strokeLinecap="round" 
          />
          <path 
            d="M5 8 L 10 4 L 14 9" 
            stroke="currentColor" 
            strokeWidth="1.7" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>

        <div className="font-caveat text-[22px] lg:text-[24px] leading-[1.08] text-[#B48AFF] font-medium rotate-[5deg] tracking-wide">
          Beautiful.<br />
          Customizable.<br />
          Yours.
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* 📱 6. THE SMARTPHONE / PREVIEW DEVICE FRAME */}
      {/* ======================================================== */}
      <motion.div 
        layout
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className={`relative z-20 ${frame.containerWidth} ${frame.height} ${frame.borderRadius} p-2.5 bg-gradient-to-b from-[#2E313D] via-[#1A1C24] to-[#121319] shadow-[0_30px_100px_-15px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.16] flex flex-col transition-all duration-300`}
      >
        
        {/* Inner Phone Bezel with screen — Theme Reactive Background */}
        <div 
          className={`relative w-full h-full ${frame.innerRadius} bg-gradient-to-b ${currentTheme.bgGradient} overflow-hidden flex flex-col border border-white/[0.08] transition-all duration-500`}
        >
          
          {/* Top Desktop Browser Bar or Mobile Status Bar */}
          {frame.isDesktop ? (
            <div className="w-full px-4 py-2.5 bg-[#12141A]/90 border-b border-white/[0.08] flex items-center justify-between shrink-0 z-30">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#09090B] border border-white/[0.06] text-[10px] font-mono text-zinc-300">
                <Lock className="w-2.5 h-2.5 text-[#34D399]" />
                <span style={{ color: currentTheme.accentColor }}>https://</span>
                <span>webloom.site/younus</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase">Desktop</span>
            </div>
          ) : (
            <div className="w-full h-11 px-6 flex items-center justify-between text-white text-[12px] font-semibold relative z-30 shrink-0">
              <span>9:41</span>
              
              {/* Dynamic Island Pill */}
              <div className="w-24 h-5 rounded-full bg-black border border-white/[0.06] flex items-center justify-between px-2.5 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#181822]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#121218] border border-white/[0.05]" />
              </div>

              {/* Icons: Cellular, Wifi, Battery */}
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="font-mono text-[10px]">5G</span>
                <div className="w-4 h-2.5 rounded-[3px] border border-white/80 p-0.5 flex items-center">
                  <div className="w-full h-full bg-white rounded-[1px]" />
                </div>
              </div>
            </div>
          )}

          {/* Phone Scrollable Body */}
          <div className="flex-1 overflow-y-auto scrollbar-none px-4 pt-1 pb-6 text-center flex flex-col items-center">
            
            {/* Header Aurora Waves & Top Action Buttons */}
            <div className="relative w-full pt-1 pb-3 flex items-center justify-between">
              <div className="w-7 h-7 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.1] flex items-center justify-center text-zinc-300">
                <Sparkles className="w-3.5 h-3.5" style={{ color: currentTheme.accentColor }} />
              </div>

              {/* Dynamic Theme Aurora Wave behind Avatar */}
              <div 
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-20 rounded-full opacity-70 blur-xl pointer-events-none transition-all duration-700"
                style={{
                  background: currentTheme.auroraGradient,
                }}
              />

              <div className="w-7 h-7 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.1] flex items-center justify-center text-zinc-300">
                <Share2 className="w-3.5 h-3.5 text-zinc-300" />
              </div>
            </div>

            {/* Circular Profile Avatar with Verified Badge */}
            <div className="relative w-20 h-20 mb-2.5 mt-1">
              <div 
                className="w-20 h-20 rounded-full overflow-hidden border-2 shadow-xl relative bg-zinc-800 transition-colors duration-500"
                style={{ borderColor: `${currentTheme.accentColor}80` }}
              >
                <Image
                  src="/images/avatar.jpg"
                  alt="Alex Syed"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Verified Check Badge matching theme tone */}
              <div 
                className={`absolute bottom-0 right-0 w-6 h-6 rounded-full ${currentTheme.badgeBg} border-2 border-[#090A0F] flex items-center justify-center text-white shadow-md transition-colors duration-300`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 fill-white text-transparent" />
              </div>
            </div>

            {/* Name & Handle */}
            <h3 className="text-[17px] font-bold text-white tracking-tight">
              Alex Syed
            </h3>
            <p className="text-[12px] font-mono text-zinc-400 mb-1">
              @younus
            </p>

            {/* Headline */}
            <p className="text-[12px] font-medium text-zinc-200 mb-2">
              Software Engineer & Product Builder
            </p>

            {/* Bio */}
            <p className="text-[11px] text-zinc-400 leading-relaxed max-w-[260px] font-light mb-2">
              Building developer tools, exploring generative AI systems, and crafting high-performance web applications.
            </p>

            {/* Location */}
            <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 mb-4">
              <MapPin className="w-3 h-3 transition-colors duration-300" style={{ color: currentTheme.accentColor }} />
              <span>San Francisco, CA</span>
            </div>

            {/* Social Icons Row (Theme reactive backgrounds) */}
            <div className="flex items-center justify-center gap-2 mb-5 w-full">
              {[
                { icon: GithubIcon, name: 'GitHub' },
                { icon: XIcon, name: 'X' },
                { icon: LinkedinIcon, name: 'LinkedIn' },
                { icon: YoutubeIcon, name: 'YouTube' },
                { icon: InstagramIcon, name: 'Instagram' },
                { icon: DiscordIcon, name: 'Discord' },
              ].map((soc, idx) => {
                const IconComponent = soc.icon;
                return (
                  <div 
                    key={idx}
                    className={`w-8 h-8 rounded-full ${currentTheme.socialBg} hover:opacity-80 border border-white/[0.08] flex items-center justify-center text-zinc-300 cursor-pointer transition-colors duration-300`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                );
              })}
            </div>

            {/* Links Stack — Reacting Dynamically to Theme Selection */}
            <div className="w-full flex flex-col gap-2.5">
              
              {/* Link 1: My Projects */}
              <div 
                className={`group p-2.5 rounded-xl ${currentTheme.cardBg} ${currentTheme.cardHover} border ${currentTheme.cardBorder} flex items-center justify-between transition-all duration-300 cursor-pointer`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-sm shrink-0">
                    <FolderGit2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[13px] font-semibold text-white tracking-tight">My Projects</h4>
                    <p className="text-[10px] text-zinc-400">Explore what I&apos;m building</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>

              {/* Link 2: Read My Blog */}
              <div 
                className={`group p-2.5 rounded-xl ${currentTheme.cardBg} ${currentTheme.cardHover} border ${currentTheme.cardBorder} flex items-center justify-between transition-all duration-300 cursor-pointer`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[13px] font-semibold text-white tracking-tight">Read My Blog</h4>
                    <p className="text-[10px] text-zinc-400">Thoughts on tech & more</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>

              {/* Link 3: Follow on X */}
              <div 
                className={`group p-2.5 rounded-xl ${currentTheme.cardBg} ${currentTheme.cardHover} border ${currentTheme.cardBorder} flex items-center justify-between transition-all duration-300 cursor-pointer`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-black border border-white/[0.12] flex items-center justify-center text-white shadow-sm shrink-0">
                    <XIcon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[13px] font-semibold text-white tracking-tight">Follow on X</h4>
                    <p className="text-[10px] text-zinc-400">Daily updates and thoughts</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>

            </div>

          </div>

          {/* Bottom Home Indicator Bar (Mobile & Tablet) */}
          {!frame.isDesktop && (
            <div className="w-full pb-2 flex justify-center shrink-0">
              <div className="w-28 h-1 rounded-full bg-white/30" />
            </div>
          )}

        </div>
      </motion.div>

    </div>
  );
}
