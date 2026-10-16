'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Sparkles, Type, Sliders, Layers, Paintbrush, Check } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { THEME_PRESETS, ThemeConfig } from '@/lib/themes';
import { ButtonStyle, CardStyle, FontChoice, ThemePreset, AnimationPreset } from '@/types';
import { useToast } from '@/components/ui/toast';

export default function AppearancePage() {
  const { appearance, updateAppearance, setThemePreset } = useApp();
  const { success } = useToast();

  const handleSelectPreset = (presetId: ThemePreset) => {
    setThemePreset(presetId);
    success(`Applied ${THEME_PRESETS[presetId].name} theme!`);
  };

  const fonts: { id: FontChoice; label: string; sample: string; css: string }[] = [
    { id: 'Geist', label: 'Geist (Modern SaaS)', sample: 'Aa Bb Gg 123', css: 'font-geist' },
    { id: 'Inter', label: 'Inter (Clean Neutral)', sample: 'Aa Bb Gg 123', css: 'font-inter' },
    { id: 'Plus Jakarta Sans', label: 'Plus Jakarta (Geometric)', sample: 'Aa Bb Gg 123', css: 'font-jakarta' },
    { id: 'Manrope', label: 'Manrope (Contemporary)', sample: 'Aa Bb Gg 123', css: 'font-manrope' },
    { id: 'DM Sans', label: 'DM Sans (Friendly Tech)', sample: 'Aa Bb Gg 123', css: 'font-dmsans' },
    { id: 'Space Grotesk', label: 'Space Grotesk (Brutalist Code)', sample: 'Aa Bb Gg 123', css: 'font-space' },
    { id: 'Playfair Display', label: 'Playfair Display (Editorial Serif)', sample: 'Aa Bb Gg 123', css: 'font-playfair' },
  ];

  const buttonStyles: { id: ButtonStyle; label: string; previewClass: string }[] = [
    { id: 'glass', label: 'Frosted Glass', previewClass: 'bg-white/10 backdrop-blur-md border border-white/20 rounded-xl' },
    { id: 'pill', label: 'Pill Rounded', previewClass: 'bg-zinc-800 border border-zinc-700 rounded-full' },
    { id: 'rounded', label: 'Smooth Rounded', previewClass: 'bg-zinc-800 border border-zinc-700 rounded-xl' },
    { id: 'outline', label: 'Minimal Outline', previewClass: 'bg-transparent border border-zinc-600 rounded-xl' },
    { id: 'soft', label: 'Soft Subdued', previewClass: 'bg-zinc-850 border border-zinc-750 rounded-lg' },
    { id: 'brutal', label: 'Neo Brutalist', previewClass: 'bg-zinc-900 border-2 border-white rounded-none shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]' },
  ];

  const animations: { id: AnimationPreset; label: string; desc: string }[] = [
    { id: 'smooth', label: 'Smooth Spring', desc: 'Fluid 21st.dev style spring transitions' },
    { id: 'subtle', label: 'Subtle Fade', desc: 'Gentle opacity transitions' },
    { id: 'bounce', label: 'Playful Bounce', desc: 'Snappy interactive spring' },
    { id: 'slide', label: 'Slide in Left', desc: 'Directional entrance' },
    { id: 'none', label: 'Static (Reduced Motion)', desc: 'Zero movement for accessibility' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Appearance & Theme Studio</h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Select from handcrafted themes or customize typography, colors, button curves, and animations.
        </p>
      </div>

      {/* 1. Theme Presets Grid */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-pink-400" />
          <h3 className="text-sm font-semibold text-white">Curated Theme Presets</h3>
        </div>
        <p className="text-xs text-zinc-400">
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
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 relative group flex flex-col justify-between h-32 ${
                  isSelected
                    ? 'border-blue-500 bg-zinc-800/90 shadow-xl ring-2 ring-blue-500/20'
                    : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                {/* Visual Palette Preview */}
                <div
                  style={{
                    background: theme.backgroundGradient || theme.backgroundColor,
                  }}
                  className="w-full h-12 rounded-xl border border-white/10 flex items-center justify-center p-2 relative overflow-hidden shadow-inner"
                >
                  <div
                    style={{ backgroundColor: theme.primaryColor }}
                    className="w-16 h-3 rounded-full shadow-md"
                  />
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-0.5 text-white shadow">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-white truncate">{theme.name}</h4>
                  <p className="text-[10px] text-zinc-400 truncate mt-0.5">{theme.font} • {theme.buttonStyle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Typography Studio */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-white">Typography</h3>
        </div>
        <p className="text-xs text-zinc-400">
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
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-zinc-800/90 ring-1 ring-blue-500/30'
                    : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200">{font.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                </div>
                <p className={`text-base font-bold text-white mt-1.5 ${font.css}`}>
                  {font.sample}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Button & Card Shapes */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-white">Button & Link Card Treatment</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {buttonStyles.map(style => {
            const isSelected = appearance.buttonStyle === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => updateAppearance({ buttonStyle: style.id })}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-zinc-800/90 ring-1 ring-blue-500/30'
                    : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
                }`}
              >
                <div className={`w-full py-2.5 px-3 text-xs font-medium text-white mb-2 flex items-center justify-center ${style.previewClass}`}>
                  Link Item
                </div>
                <span className="text-xs font-medium text-zinc-300">{style.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Motion & Animation */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Micro-Interactions & Animation</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {animations.map(anim => {
            const isSelected = appearance.animation === anim.id;
            return (
              <button
                key={anim.id}
                type="button"
                onClick={() => updateAppearance({ animation: anim.id })}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-zinc-800/90 ring-1 ring-blue-500/30'
                    : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{anim.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">{anim.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
