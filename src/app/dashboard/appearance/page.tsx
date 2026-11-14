'use client';

import React from 'react';
import { Palette, Sparkles, Type, Layers, Check, Layout, Grid, Store, BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { THEME_PRESETS } from '@/lib/themes';
import { ButtonStyle, FontChoice, ThemePreset, AnimationPreset, ProfileLayout } from '@/types';
import { useToast } from '@/components/ui/toast';
import { clsx } from 'clsx';

export default function AppearancePage() {
  const { appearance, updateAppearance, setThemePreset, themeMode } = useApp();
  const { success } = useToast();
  const isDark = themeMode === 'dark';

  const handleSelectPreset = (presetId: ThemePreset) => {
    setThemePreset(presetId);
    success(`Applied ${THEME_PRESETS[presetId].name} theme!`);
  };

  const handleSelectLayout = (layoutId: ProfileLayout) => {
    updateAppearance({ layout: layoutId });
    success(`Applied ${layoutId.toUpperCase()} layout!`);
  };

  const layouts: {
    id: ProfileLayout;
    label: string;
    tagline: string;
    badge: string;
    icon: any;
    features: string[];
    desktopDesc: string;
  }[] = [
    {
      id: 'standard',
      label: 'Classic Editorial Stack',
      tagline: 'Clean, centered vertical flow',
      badge: 'Universal',
      icon: Layout,
      features: ['Centered profile header', 'Sequential blocks & links', 'Streamlined conversion'],
      desktopDesc: 'Mobile single column (390px) & clean centered desktop stack (max-w-xl).',
    },
    {
      id: 'bento',
      label: 'Modern Creator Bento Grid',
      tagline: 'Dynamic responsive bento architecture',
      badge: 'Trending • High CTR',
      icon: Grid,
      features: ['Multi-column bento blocks', 'Live availability pill', 'Dynamic cards for store, booking & links'],
      desktopDesc: 'Fluid 1-2 col on mobile, expands to an expansive 3-4 col responsive bento on desktop.',
    },
    {
      id: 'storefront',
      label: 'Digital Commerce & Goods',
      tagline: 'Product-first shop storefront',
      badge: 'For Sellers & Products',
      icon: Store,
      features: ['Prominent catalog showcase', 'Dual currency toggle (₹/$)', 'Direct instant checkout pills'],
      desktopDesc: '2-column mobile catalog, multi-column e-commerce grid on desktop.',
    },
    {
      id: 'editorial',
      label: 'Split-Screen Magazine Studio',
      tagline: 'Desktop 2-column split with sticky profile card',
      badge: 'Designer Favorite',
      icon: BookOpen,
      features: ['Sticky left profile hero on PC', 'Scrollable right content feed', 'Bespoke magazine typography'],
      desktopDesc: 'Mobile stacked layout, desktop transforms into a bespoke 2-column editorial split.',
    },
    {
      id: 'booking',
      label: 'Consultant & 1-on-1 Suite',
      tagline: 'Appointment & consultation first',
      badge: 'Coaches & Mentors',
      icon: Calendar,
      features: ['Service packages showcase', 'Session duration & pricing', 'Direct calendar booking trigger'],
      desktopDesc: 'Direct client-booking focus with trust credentials and consultation slots.',
    },
  ];

  const fonts: { id: FontChoice; label: string; sample: string; css: string }[] = [
    { id: 'Geist', label: 'Geist (Modern Sans)', sample: 'Aa Bb Gg 123', css: 'font-sans' },
    { id: 'Inter', label: 'Inter (Clean Neutral)', sample: 'Aa Bb Gg 123', css: 'font-sans' },
    { id: 'Plus Jakarta Sans', label: 'Plus Jakarta (Geometric)', sample: 'Aa Bb Gg 123', css: 'font-sans' },
    { id: 'Manrope', label: 'Manrope (Contemporary)', sample: 'Aa Bb Gg 123', css: 'font-sans' },
    { id: 'DM Sans', label: 'DM Sans (Friendly Tech)', sample: 'Aa Bb Gg 123', css: 'font-sans' },
    { id: 'Space Grotesk', label: 'Space Grotesk (Brutalist Code)', sample: 'Aa Bb Gg 123', css: 'font-mono' },
    { id: 'Playfair Display', label: 'Newsreader / Serif (Editorial)', sample: 'Aa Bb Gg 123', css: 'font-serif' },
  ];

  const buttonStyles: { id: ButtonStyle; label: string; previewClass: string }[] = [
    {
      id: 'glass',
      label: 'Frosted Glass',
      previewClass: isDark ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white' : 'bg-black/5 backdrop-blur-md border border-black/10 rounded-xl text-black',
    },
    {
      id: 'pill',
      label: 'Pill Rounded',
      previewClass: isDark ? 'bg-[#28211B] border border-[#3E342B] rounded-full text-white' : 'bg-[#EAE2D3] border border-[#DACBB4] rounded-full text-black',
    },
    {
      id: 'rounded',
      label: 'Smooth Rounded',
      previewClass: isDark ? 'bg-[#28211B] border border-[#3E342B] rounded-xl text-white' : 'bg-[#EAE2D3] border border-[#DACBB4] rounded-xl text-black',
    },
    {
      id: 'outline',
      label: 'Minimal Outline',
      previewClass: isDark ? 'bg-transparent border border-[#3E342B] rounded-xl text-white' : 'bg-transparent border border-[#DACBB4] rounded-xl text-black',
    },
    {
      id: 'soft',
      label: 'Soft Subdued',
      previewClass: isDark ? 'bg-[#221C17] border border-[#382F26] rounded-lg text-white' : 'bg-[#FAF6EE] border border-[#E5DEC9] rounded-lg text-black',
    },
    {
      id: 'brutal',
      label: 'Tactile Stamp',
      previewClass: isDark ? 'bg-[#28211B] border-2 border-[#E6B86A] rounded-none text-[#E6B86A]' : 'bg-[#FAF6EE] border-2 border-[#1F1A16] rounded-none text-[#1F1A16]',
    },
  ];

  const animations: { id: AnimationPreset; label: string; desc: string }[] = [
    { id: 'smooth', label: 'Smooth Spring', desc: 'Fluid paper-smooth transitions' },
    { id: 'subtle', label: 'Subtle Fade', desc: 'Gentle opacity transitions' },
    { id: 'bounce', label: 'Playful Bounce', desc: 'Snappy interactive spring' },
    { id: 'slide', label: 'Slide in Left', desc: 'Directional entrance' },
    { id: 'none', label: 'Static (Reduced Motion)', desc: 'Zero movement for accessibility' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-serif font-bold tracking-tight">Appearance & Theme Studio</h2>
        <p
          className={clsx(
            "text-xs mt-0.5",
            isDark ? "text-[#A89F91]" : "text-[#786E62]"
          )}
        >
          Select from handcrafted themes or customize typography, colors, button curves, and animations.
        </p>
      </div>

      {/* 1. Dynamic Layout Architecture */}
      <div
        className={clsx(
          "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
          isDark
            ? "bg-[#1E1915] border-[#382F26]"
            : "bg-[#F6F0E4] border-[#E5DEC9]"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className={clsx("w-4 h-4", isDark ? "text-[#E6B86A]" : "text-[#967137]")} />
            <h3 className="text-sm font-serif font-semibold">Dynamic Layout & Experience Architecture</h3>
          </div>
          <span
            className={clsx(
              "text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider",
              isDark ? "bg-[#28211B] text-[#E6B86A]" : "bg-[#EFE7DA] text-[#967137]"
            )}
          >
            Mobile & PC Adaptive
          </span>
        </div>
        <p
          className={clsx(
            "text-xs",
            isDark ? "text-[#A89F91]" : "text-[#786E62]"
          )}
        >
          Select how your public profile renders across phone screens and desktop browsers. Fully compatible with digital products, booking calendars, newsletter lead capture, and modular blocks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {layouts.map(item => {
            const isSelected = appearance.layout === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectLayout(item.id)}
                className={clsx(
                  "p-4 rounded-2xl border text-left transition-all duration-200 relative group flex flex-col justify-between cursor-pointer shadow-xs",
                  isSelected
                    ? isDark
                      ? "border-[#E6B86A] bg-[#28211B] shadow-md ring-1 ring-[#E6B86A]/40"
                      : "border-[#C89D54] bg-[#EFE7DA] shadow-md ring-1 ring-[#C89D54]/40"
                    : isDark
                    ? "border-[#382F26] bg-[#181411] hover:border-[#4E4135] hover:bg-[#221C17]"
                    : "border-[#E5DEC9] bg-[#FAF6EE] hover:border-[#DACBB4] hover:bg-[#F6F0E4]"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={clsx(
                          "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
                          isSelected
                            ? isDark ? "bg-[#E6B86A] text-black" : "bg-[#1F1A16] text-[#FAF6EE]"
                            : isDark ? "bg-[#28211B] text-[#A89F91]" : "bg-[#EAE2D3] text-[#6E6254]"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold">{item.label}</h4>
                        <span
                          className={clsx(
                            "text-[10px] font-mono",
                            isDark ? "text-[#A89F91]" : "text-[#786E62]"
                          )}
                        >
                          {item.tagline}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className={clsx(
                        "rounded-full p-1 shadow",
                        isDark ? "bg-[#E6B86A] text-[#181410]" : "bg-[#1F1A16] text-[#FAF6EE]"
                      )}>
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  <p
                    className={clsx(
                      "text-[11px] leading-relaxed mb-3",
                      isDark ? "text-[#C8BDB0]" : "text-[#544B41]"
                    )}
                  >
                    {item.desktopDesc}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.features.map(feat => (
                      <span
                        key={feat}
                        className={clsx(
                          "text-[9px] font-mono px-2 py-0.5 rounded-md",
                          isDark ? "bg-[#221C17] text-[#A89F91]" : "bg-[#EAE2D3] text-[#6E6254]"
                        )}
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono">
                  <span className={clsx(isDark ? "text-[#E6B86A]" : "text-[#967137]")}>
                    {item.badge}
                  </span>
                  <span className="opacity-60 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Apply layout</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Theme Presets Grid */}
      <div
        className={clsx(
          "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
          isDark
            ? "bg-[#1E1915] border-[#382F26]"
            : "bg-[#F6F0E4] border-[#E5DEC9]"
        )}
      >
        <div className="flex items-center gap-2">
          <Palette className={clsx("w-4 h-4", isDark ? "text-[#E6B86A]" : "text-[#967137]")} />
          <h3 className="text-sm font-serif font-semibold">Curated Theme Presets</h3>
        </div>
        <p
          className={clsx(
            "text-xs",
            isDark ? "text-[#A89F91]" : "text-[#786E62]"
          )}
        >
          Click any preset to instantly apply harmonious color palettes, typography, and card treatments.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
          {(Object.keys(THEME_PRESETS) as ThemePreset[]).map(key => {
            const theme = THEME_PRESETS[key];
            const isSelected = appearance.theme === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectPreset(key)}
                className={clsx(
                  "p-3.5 rounded-2xl border text-left transition-all duration-200 relative group flex flex-col justify-between h-32 cursor-pointer",
                  isSelected
                    ? isDark
                      ? "border-[#E6B86A] bg-[#28211B] shadow-md ring-1 ring-[#E6B86A]/40"
                      : "border-[#C89D54] bg-[#EFE7DA] shadow-md ring-1 ring-[#C89D54]/40"
                    : isDark
                    ? "border-[#382F26] bg-[#181411] hover:border-[#4E4135] hover:bg-[#221C17]"
                    : "border-[#E5DEC9] bg-[#FAF6EE] hover:border-[#DACBB4] hover:bg-[#F6F0E4]"
                )}
              >
                {/* Visual Palette Preview */}
                <div
                  style={{
                    background: theme.backgroundGradient || theme.backgroundColor,
                  }}
                  className="w-full h-12 rounded-xl border border-black/10 flex items-center justify-center p-2 relative overflow-hidden shadow-inner"
                >
                  <div
                    style={{ backgroundColor: theme.primaryColor }}
                    className="w-16 h-3 rounded-full shadow-xs"
                  />
                  {isSelected && (
                    <div className={clsx(
                      "absolute top-1 right-1 rounded-full p-0.5 shadow",
                      isDark ? "bg-[#E6B86A] text-[#181410]" : "bg-[#1F1A16] text-[#FAF6EE]"
                    )}>
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-semibold truncate">{theme.name}</h4>
                  <p
                    className={clsx(
                      "text-[10px] truncate mt-0.5",
                      isDark ? "text-[#85796C]" : "text-[#8E8272]"
                    )}
                  >
                    {theme.font} • {theme.buttonStyle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Typography Studio */}
      <div
        className={clsx(
          "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
          isDark
            ? "bg-[#1E1915] border-[#382F26]"
            : "bg-[#F6F0E4] border-[#E5DEC9]"
        )}
      >
        <div className="flex items-center gap-2">
          <Type className={clsx("w-4 h-4", isDark ? "text-[#E6B86A]" : "text-[#967137]")} />
          <h3 className="text-sm font-serif font-semibold">Typography</h3>
        </div>
        <p
          className={clsx(
            "text-xs",
            isDark ? "text-[#A89F91]" : "text-[#786E62]"
          )}
        >
          Carefully tuned typefaces selected for maximum legibility on high-density mobile and retina displays.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {fonts.map(font => {
            const isSelected = appearance.font === font.id;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => updateAppearance({ font: font.id })}
                className={clsx(
                  "p-4 rounded-2xl border text-left transition-all cursor-pointer",
                  isSelected
                    ? isDark
                      ? "border-[#E6B86A] bg-[#28211B] ring-1 ring-[#E6B86A]/40"
                      : "border-[#C89D54] bg-[#EFE7DA] ring-1 ring-[#C89D54]/40"
                    : isDark
                    ? "border-[#382F26] bg-[#181411] hover:border-[#4E4135]"
                    : "border-[#E5DEC9] bg-[#FAF6EE] hover:border-[#DACBB4]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">{font.label}</span>
                  {isSelected && (
                    <Check
                      className={clsx(
                        "w-4 h-4",
                        isDark ? "text-[#E6B86A]" : "text-[#967137]"
                      )}
                    />
                  )}
                </div>
                <p className={`text-base font-bold mt-1.5 ${font.css}`}>
                  {font.sample}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Button & Card Shapes */}
      <div
        className={clsx(
          "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
          isDark
            ? "bg-[#1E1915] border-[#382F26]"
            : "bg-[#F6F0E4] border-[#E5DEC9]"
        )}
      >
        <div className="flex items-center gap-2">
          <Layers className={clsx("w-4 h-4", isDark ? "text-[#E6B86A]" : "text-[#967137]")} />
          <h3 className="text-sm font-serif font-semibold">Button & Link Card Treatment</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {buttonStyles.map(style => {
            const isSelected = appearance.buttonStyle === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => updateAppearance({ buttonStyle: style.id })}
                className={clsx(
                  "p-4 rounded-2xl border text-center transition-all cursor-pointer",
                  isSelected
                    ? isDark
                      ? "border-[#E6B86A] bg-[#28211B] ring-1 ring-[#E6B86A]/40"
                      : "border-[#C89D54] bg-[#EFE7DA] ring-1 ring-[#C89D54]/40"
                    : isDark
                    ? "border-[#382F26] bg-[#181411] hover:border-[#4E4135]"
                    : "border-[#E5DEC9] bg-[#FAF6EE] hover:border-[#DACBB4]"
                )}
              >
                <div className={`w-full py-2.5 px-3 text-xs font-medium mb-2 flex items-center justify-center ${style.previewClass}`}>
                  Link Item
                </div>
                <span
                  className={clsx(
                    "text-xs font-medium",
                    isDark ? "text-[#C8BDB0]" : "text-[#544B41]"
                  )}
                >
                  {style.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Motion & Animation */}
      <div
        className={clsx(
          "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
          isDark
            ? "bg-[#1E1915] border-[#382F26]"
            : "bg-[#F6F0E4] border-[#E5DEC9]"
        )}
      >
        <div className="flex items-center gap-2">
          <Sparkles className={clsx("w-4 h-4", isDark ? "text-[#E6B86A]" : "text-[#967137]")} />
          <h3 className="text-sm font-serif font-semibold">Micro-Interactions & Animation</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {animations.map(anim => {
            const isSelected = appearance.animation === anim.id;
            return (
              <button
                key={anim.id}
                type="button"
                onClick={() => updateAppearance({ animation: anim.id })}
                className={clsx(
                  "p-4 rounded-2xl border text-left transition-all cursor-pointer",
                  isSelected
                    ? isDark
                      ? "border-[#E6B86A] bg-[#28211B] ring-1 ring-[#E6B86A]/40"
                      : "border-[#C89D54] bg-[#EFE7DA] ring-1 ring-[#C89D54]/40"
                    : isDark
                    ? "border-[#382F26] bg-[#181411] hover:border-[#4E4135]"
                    : "border-[#E5DEC9] bg-[#FAF6EE] hover:border-[#DACBB4]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">{anim.label}</span>
                  {isSelected && (
                    <Check
                      className={clsx(
                        "w-3.5 h-3.5",
                        isDark ? "text-[#E6B86A]" : "text-[#967137]"
                      )}
                    />
                  )}
                </div>
                <p
                  className={clsx(
                    "text-[11px] mt-1",
                    isDark ? "text-[#85796C]" : "text-[#8E8272]"
                  )}
                >
                  {anim.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
