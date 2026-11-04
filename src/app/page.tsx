'use client';

import React from 'react';
import { WebloomPreloader } from '@/components/landing/reconstruction/preloader';
import { ScrollProgressThread } from '@/components/landing/reconstruction/motion-primitives';
import {
  CursorRevealBackground,
  useCanRenderDarkReplica,
} from '@/components/landing/reconstruction/cursor-reveal-background';
import {
  WebloomSyncStateProvider,
  WebloomThemeProvider,
  useWebloomSyncState,
} from '@/components/landing/reconstruction/webloom-dual-theme-context';
import { Webloom3DStudioCanvas } from '@/components/landing/reconstruction/webloom-3d-canvas';
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

/**
 * Shared narrative document flow rendered identically in both the Light base
 * layer and the synchronized Dark replica layer so every section, card, 3D
 * window, typography block, and illustration aligns to the exact pixel.
 */
function WebloomLandingBody() {
  return (
    <>
      <main className="relative z-[2] w-full flex flex-col items-center">
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
    </>
  );
}

function WebloomHomeContent() {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalMode } = useApp();
  const { themeMode } = useWebloomSyncState();
  const canRenderDarkReplica = useCanRenderDarkReplica();

  const isDarkMode = themeMode === 'dark';
  const baseTheme = isDarkMode ? 'dark' : 'light';
  const overlayTheme = isDarkMode ? 'light' : 'dark';

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 flex flex-col items-center justify-start overflow-x-hidden ${
        isDarkMode
          ? 'bg-[#161310] text-[#F4EFE6] selection:bg-[#F7DC6F]/20 selection:text-[#F4EFE6]'
          : 'bg-[#FAF6EE] text-[#1F1A16] selection:bg-[#FDE68A] selection:text-[#1F1A16]'
      }`}
    >
      {/* 0. Branded Preloader, Synchronized Cursor Reveal Controller, Golden Thread & 3D Camera Layer */}
      <WebloomPreloader />
      <ScrollProgressThread />
      <CursorRevealBackground
        revealRadius={85}
        smoothing={0.55}
      />
      <Webloom3DStudioCanvas />

      {/* ===================================================================
          DUAL-WORLD SYNCHRONIZED CONTAINER
          - Layer 1 (Base): Selected theme (Light or Dark), 100% interactive.
          - Layer 2 (Overlay): Inverted theme revealed inside the crisp cursor circle.
         =================================================================== */}
      <div className="relative w-full">
        {/* LAYER 1: Base Website */}
        <WebloomThemeProvider theme={baseTheme} isOverlay={false}>
          <WebloomNavbar />
          <div className="relative z-10 w-full">
            <WebloomLandingBody />
          </div>
        </WebloomThemeProvider>

        {/* LAYER 2: Synchronized Alternate Theme in Cursor Circle */}
        {canRenderDarkReplica && (
          <WebloomThemeProvider theme={overlayTheme} isOverlay={true}>
            {/* Fixed Navbar in cursor circle */}
            <div
              aria-hidden="true"
              data-webloom-dark-navbar="true"
              className="webloom-dark-navbar-mask fixed inset-0 z-[55] pointer-events-none select-none"
            >
              <WebloomNavbar />
            </div>

            {/* Full-Page Body in cursor circle */}
            <div
              aria-hidden="true"
              data-webloom-dark-replica="true"
              className={`webloom-dark-replica-mask absolute inset-0 z-20 w-full pointer-events-none select-none overflow-hidden ${
                isDarkMode ? 'bg-[#FAF6EE] text-[#1F1A16]' : 'bg-[#161310] text-[#F4EFE6]'
              }`}
            >
              <WebloomLandingBody />
            </div>
          </WebloomThemeProvider>
        )}
      </div>

      {/* Auth Modal for Login / Signup */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <WebloomSyncStateProvider>
      <WebloomHomeContent />
    </WebloomSyncStateProvider>
  );
}
