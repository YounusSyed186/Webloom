'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Wand2,
  FileText,
  TrendingUp,
  Palette,
  Check,
  Copy,
  ArrowRight,
  Bot,
  Lightbulb,
  Zap,
  RefreshCw
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { LinkedTreeStore } from '@/lib/storage';
import { useToast } from '@/components/ui/toast';
import { clsx } from 'clsx';

export default function AICreatorStudioPage() {
  const { profile, updateProfile, themeMode } = useApp();
  const { success, error: toastError } = useToast();
  const isDark = themeMode === 'dark';

  const [activeTab, setActiveTab] = useState<'profile' | 'bio' | 'copy' | 'analytics'>('profile');
  const [prompt, setPrompt] = useState('Architect & design educator specializing in tactile materials and Scandinavian furniture.');
  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toastError('Please describe your creative focus or prompt.');
      return;
    }

    setLoading(true);
    setGeneratedData(null);

    const featureTypeMap: Record<string, string> = {
      profile: 'profile_builder',
      bio: 'bio_writer',
      copy: 'copy_assistant',
      analytics: 'analytics_advisor',
    };

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          featureType: featureTypeMap[activeTab],
          prompt: prompt.trim(),
          context: {
            username: profile.username,
            currentBio: profile.bio,
            headline: profile.headline,
          },
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setGeneratedData(json.data);
        success('AI suggestions generated successfully!');
      } else {
        toastError(json.error || 'Failed to generate suggestions.');
      }
    } catch {
      toastError('Error connecting to AI Gateway.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToProfile = () => {
    if (!generatedData) return;

    const updates: Partial<any> = {};
    if (generatedData.headline) updates.headline = generatedData.headline;
    if (generatedData.bio) updates.bio = generatedData.bio;
    if (generatedData.displayName) updates.displayName = generatedData.displayName;

    updateProfile(updates);
    success('Applied AI profile suggestions to your live page!');
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    success('Copied to clipboard');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl border relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border-amber-500/20 shadow-sm">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-300 mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Gemini 2.5 Flash Creator Engine</span>
            </div>
            <h1
              className={clsx(
                "font-serif text-2xl sm:text-3xl font-bold tracking-tight",
                isDark ? "text-[#F4EFE6]" : "text-[#1F1A16]"
              )}
            >
              AI Creator Studio
            </h1>
            <p
              className={clsx(
                "text-xs sm:text-sm mt-1 max-w-xl",
                isDark ? "text-[#C8BDB0]" : "text-[#6E6254]"
              )}
            >
              Generate high-conversion bios, craft click-worthy link titles, and optimize your creator brand in seconds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-white/80 dark:bg-black/40 border border-amber-400/30 text-amber-700 dark:text-amber-300">
              ⚡ Unlimited Generations
            </span>
          </div>
        </div>
      </div>

      {/* Feature Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { id: 'profile', label: 'Profile Builder', icon: Wand2, desc: 'Complete identity & blocks' },
          { id: 'bio', label: 'Bio Rewriter', icon: FileText, desc: '4 targeted bio variants' },
          { id: 'copy', label: 'CTA Optimizer', icon: Zap, desc: 'High-CTR link headlines' },
          { id: 'analytics', label: 'Growth Advisor', icon: TrendingUp, desc: 'Audience action plan' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSel = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setGeneratedData(null);
              }}
              className={clsx(
                "p-3 rounded-xl border text-left transition-all flex flex-col justify-between shadow-2xs",
                isSel
                  ? "border-amber-500 bg-amber-500/10 text-amber-800 dark:text-amber-300 font-semibold"
                  : isDark
                  ? "border-[#332B23] bg-[#1C1814]/80 text-[#C8BDB0] hover:bg-[#241E19]"
                  : "border-[#EAE2D3] bg-white text-[#7A6D5E] hover:bg-[#FAF6EE]"
              )}
            >
              <Icon className="w-4 h-4 mb-2 text-amber-500" />
              <div>
                <span className="text-xs font-bold block">{tab.label}</span>
                <span className="text-[10px] opacity-75 font-normal block">{tab.desc}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Generation Prompt Box */}
      <div
        className={clsx(
          "p-5 rounded-xl border space-y-4 shadow-2xs",
          isDark ? "border-[#332B23] bg-[#1C1814]/80 text-[#F4EFE6]" : "border-[#EAE2D3] bg-white text-[#1F1A16]"
        )}
      >
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider opacity-80 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {activeTab === 'profile' && 'Describe Your Creative Niche & Audience'}
              {activeTab === 'bio' && 'Your Current Focus or Topic'}
              {activeTab === 'copy' && 'Link Destination & Core Offer'}
              {activeTab === 'analytics' && 'Current Goal or Growth Bottleneck'}
            </span>
          </label>
        </div>

        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Visual designer creating brand systems for sustainable architecture startups..."
          className={clsx(
            "w-full p-3 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors",
            isDark ? "bg-[#241E19] border-[#382F26]" : "bg-neutral-50 border-[#DDD2BF]"
          )}
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-neutral-400">
            Powered by Google Gemini with deterministic fallback
          </span>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Crafting Suggestions...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Recommendations</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Results Area */}
      <AnimatePresence>
        {generatedData && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className={clsx(
              "p-6 rounded-2xl border space-y-5 shadow-md",
              isDark ? "border-[#382F26] bg-[#181411] text-[#F4EFE6]" : "border-[#DDD2BF] bg-[#FAF6EE] text-[#1F1A16]"
            )}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-amber-500" />
                <h3 className="font-serif font-bold text-lg">AI Generated Strategy</h3>
              </div>

              {activeTab === 'profile' && (
                <button
                  onClick={handleApplyToProfile}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply to Live Profile</span>
                </button>
              )}
            </div>

            {/* Render Tab Specific Output */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/30">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Display Name</span>
                    <span className="font-semibold text-sm">{generatedData.displayName || profile.displayName}</span>
                  </div>
                  <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/30">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Headline</span>
                    <span className="font-semibold text-sm">{generatedData.headline}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/30">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Editorial Bio</span>
                  <p className="font-serif italic text-sm sm:text-base leading-relaxed text-neutral-800 dark:text-neutral-200">
                    "{generatedData.bio}"
                  </p>
                </div>

                {generatedData.suggestedBlocks && (
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">Recommended Page Blocks</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {generatedData.suggestedBlocks.map((blk: any, i: number) => (
                        <div key={i} className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-black/20 text-xs">
                          <span className="font-semibold text-amber-600 dark:text-amber-400 block">{blk.title}</span>
                          <span className="text-neutral-500 text-[11px]">{blk.subtitle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bio' && generatedData.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {generatedData.options.map((opt: any, i: number) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/30 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block mb-1">
                        {opt.style || `Style 0${i + 1}`}
                      </span>
                      <p className="text-xs sm:text-sm leading-relaxed">{opt.bio}</p>
                    </div>
                    <button
                      onClick={() => {
                        updateProfile({ bio: opt.bio });
                        success('Bio updated!');
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white self-start"
                    >
                      <span>Use this bio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'copy' && generatedData.variations && (
              <div className="space-y-3">
                {generatedData.variations.map((v: any, i: number) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/30 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="font-semibold text-sm">{v.title}</h4>
                      <p className="text-xs text-neutral-500">{v.description}</p>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 shrink-0">
                      {v.expectedCtr || '+18% CTR'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'analytics' && generatedData.recommendations && (
              <div className="space-y-3">
                {generatedData.recommendations.map((rec: any, i: number) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/30"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center justify-center">
                        {i + 1}
                      </span>
                      <h4 className="font-semibold text-sm">{rec.title}</h4>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 pl-7">{rec.action}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
