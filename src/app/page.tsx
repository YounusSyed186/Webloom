'use client';

import React from 'react';
import { WebloomPreloader } from '@/components/landing/reconstruction/preloader';
import { ScrollProgressThread } from '@/components/landing/reconstruction/motion-primitives';
import { WebloomNavbar } from '@/components/landing/reconstruction/navbar';
import { HeroReconstructed } from '@/components/landing/reconstruction/hero';
import { TrustStripReconstructed } from '@/components/landing/reconstruction/trust-strip';
import { WhatYouCanBuildReconstructed } from '@/components/landing/reconstruction/what-you-can-build';
import { DesignsFeelLikeYouReconstructed } from '@/components/landing/reconstruction/designs-feel-like-you';
import { HowItWorksReconstructed } from '@/components/landing/reconstruction/how-it-works';
import { InsightsAndSharingReconstructed } from '@/components/landing/reconstruction/insights-and-sharing';
import { AudienceHomeReconstructed } from '@/components/landing/reconstruction/audience-home';
import { PricingReconstructed } from '@/components/landing/reconstruction/pricing';
import { FAQReconstructed } from '@/components/landing/reconstruction/faq-reconstructed';
import { BottomRibbonReconstructed } from '@/components/landing/reconstruction/bottom-ribbon';
import { WebloomFooter } from '@/components/landing/reconstruction/footer';
import { AuthModal } from '@/components/auth/auth-modal';
import { useApp } from '@/lib/context/app-context';

export default function HomePage() {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalMode } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1A16] flex flex-col items-center justify-start overflow-x-hidden selection:bg-[#FDE68A] selection:text-[#1F1A16]">
      {/* 0. Branded Preloader & Golden Scroll Progress Thread */}
      <WebloomPreloader />
      <ScrollProgressThread />

      {/* 1. Header / Navbar */}
      <WebloomNavbar />

      {/* 2. Main Narrative Landing Flow */}
      <main className="w-full flex flex-col items-center">
        {/* 2.1 Hero Section: Headline, CTAs, and Studio Workspace Showcase */}
        <HeroReconstructed />

        {/* 2.2 Trust Strip: Notion, Figma, Vercel, GitHub, Spotify, Adobe */}
        <TrustStripReconstructed />

        {/* 2.3 What You Can Build: 4 Handmade Deckle-Edge Feature Cards */}
        <WhatYouCanBuildReconstructed />

        {/* 2.4 Designs That Feel Like You: Portfolio Window & 4 Templates */}
        <DesignsFeelLikeYouReconstructed />

        {/* 2.5 How It Works: Interactive Handle Claim Bar & 3 Step Cards */}
        <HowItWorksReconstructed />

        {/* 2.6 Insights & Sharing: Calm Analytics Ledger & Personal QR Calling Card */}
        <InsightsAndSharingReconstructed />

        {/* 2.7 Audience Home: Panoramic Countryside Cottage & Audience Roles */}
        <AudienceHomeReconstructed />

        {/* 2.8 Pricing Section: Seed Free, Creator Pro, Studio */}
        <PricingReconstructed />

        {/* 2.9 FAQ Section: Stationery Slip Accordion */}
        <FAQReconstructed />

        {/* 2.10 Bottom CTA Ribbon: Handmade Lavender Botanical Banner */}
        <BottomRibbonReconstructed />
      </main>

      {/* 3. Footer */}
      <WebloomFooter />

      {/* Auth Modal for Login / Signup */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </div>
  );
}
