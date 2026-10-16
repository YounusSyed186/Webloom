'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();

  const handleSelectPlan = (plan: 'free' | 'pro') => {
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  const freeFeatures = [
    'Personal Webloom page & URL',
    'Unlimited links & social profiles',
    'Featured projects & portfolio section',
    'Curated theme presets',
    'Core view & click analytics',
    'Vector QR code generator',
  ];

  const proFeatures = [
    'Everything in Free',
    'Custom domain support (yourdomain.com)',
    'Advanced typography & color palette editor',
    'Deep referral source & conversion analytics',
    'Remove all Webloom badges & branding',
    'Priority indexing & SEO metadata controls',
  ];

  return (
    <section id="pricing" className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            PRICING
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
              Start free. <br />
              <span className="text-[#A6A7AE] font-serif italic">Make it yours.</span>
            </h2>
            <p className="text-[17px] text-[#A6A7AE] font-light mt-4">
              Begin with everything you need. Upgrade whenever you want custom domains and deep analytics.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center bg-[#12141A] p-1 rounded-lg border border-white/[0.08] w-fit">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3.5 py-1.5 rounded-md text-[13px] font-mono transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#08090B] text-[#F4F3F0] border border-white/[0.1]'
                  : 'text-[#6F7179] hover:text-[#A6A7AE]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3.5 py-1.5 rounded-md text-[13px] font-mono transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-[#08090B] text-[#F4F3F0] border border-white/[0.1]'
                  : 'text-[#6F7179] hover:text-[#A6A7AE]'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] text-[#A78BFA] font-sans font-medium px-1.5 py-0.2 rounded bg-[#A78BFA]/10">
                Save 30%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Free Tier */}
          <div className="bg-[#0D0F12] border border-white/[0.08] rounded-2xl p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-[22px] font-normal text-[#F4F3F0]">Free</h3>
                  <p className="text-[14px] text-[#A6A7AE] mt-1">
                    Everything you need to create your personal Webloom.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[34px] font-normal text-[#F4F3F0]">$0</span>
                  <span className="text-[12px] font-mono text-[#6F7179] block">forever</span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#6F7179] block">
                  INCLUDED
                </span>
                {freeFeatures.map((feat) => (
                  <div key={feat} className="flex items-start gap-3 text-[14px] text-[#A6A7AE]">
                    <Check className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleSelectPlan('free')}
              className="w-full py-3 rounded-lg bg-[#12141A] text-[#F4F3F0] border border-white/[0.12] hover:border-white/[0.24] text-[14px] font-medium transition-colors"
            >
              Create your Webloom &rarr;
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-[#12141A] border border-[#A78BFA]/30 rounded-2xl p-8 flex flex-col justify-between space-y-8 relative">
            <div className="absolute -top-3 right-6 bg-[#A78BFA] text-[#08090B] text-[11px] font-mono uppercase font-semibold px-3 py-0.5 rounded-full">
              Pro Member
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-[22px] font-normal text-[#F4F3F0]">Webloom Pro</h3>
                  <p className="text-[14px] text-[#A6A7AE] mt-1">
                    For people who want full control over domain & analytics.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[34px] font-normal text-[#F4F3F0]">
                    {billingCycle === 'annual' ? '$5' : '$8'}
                  </span>
                  <span className="text-[12px] font-mono text-[#6F7179] block">
                    {billingCycle === 'annual' ? '/mo, billed yearly' : '/month'}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#A78BFA] block">
                  EVERYTHING IN FREE PLUS
                </span>
                {proFeatures.map((feat) => (
                  <div key={feat} className="flex items-start gap-3 text-[14px] text-[#F4F3F0]">
                    <Check className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleSelectPlan('pro')}
              className="w-full py-3 rounded-lg bg-[#F4F3F0] text-[#08090B] hover:bg-white text-[14px] font-medium transition-colors shadow-sm"
            >
              Upgrade to Pro &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
