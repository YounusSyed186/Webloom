'use client';

import React from 'react';
import { Navbar } from '@/components/landing/navbar';
import { HeroSection } from '@/components/landing/hero/hero-section';
import { CreatorTrustStrip } from '@/components/landing/creator-trust-strip';
import { MoreThanLinkInBioSection } from '@/components/landing/more-than-link-in-bio';
import { WhatIsWebloomSection } from '@/components/landing/what-is-webloom';
import { BloomPhilosophySection } from '@/components/landing/bloom-philosophy';
import { PageCraftSection } from '@/components/landing/page-craft-section';
import { LinksSection } from '@/components/landing/links-section';
import { ProjectsSection } from '@/components/landing/projects-section';
import { CustomizationSection } from '@/components/landing/customization-section';
import { LivePreviewSection } from '@/components/landing/live-preview-section';
import { IdentitySection } from '@/components/landing/identity-section';
import { AnalyticsSection } from '@/components/landing/analytics-section';
import { SharingSection } from '@/components/landing/sharing-section';
import { ExamplesSection } from '@/components/landing/examples-section';
import { AudienceSection } from '@/components/landing/audience-section';
import { DifferentiationSection } from '@/components/landing/differentiation-section';
import { SetupSection } from '@/components/landing/setup-section';
import { FeatureSummarySection } from '@/components/landing/feature-summary-section';
import { PrivacySection } from '@/components/landing/privacy-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { FAQSection } from '@/components/landing/faq-section';
import { FinalCTA } from '@/components/landing/final-cta';
import { Footer } from '@/components/landing/footer';
import { AuthModal } from '@/components/auth/auth-modal';
import { useApp } from '@/lib/context/app-context';

export default function HomePage() {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalMode } = useApp();

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F4F3F0] selection:bg-[#A78BFA]/25 selection:text-[#F4F3F0]">
      {/* Webloom Navigation */}
      <Navbar />

      {/* Main Narrative Structure */}
      <main>
        {/* HERO */}
        <HeroSection />

        {/* 🤝 SECTION TWO — TRUST & CREATOR ECOSYSTEM STRIP */}
        <CreatorTrustStrip />

        {/* ⚡ SECTION THREE — MORE THAN A LINK IN BIO (4 FEATURE CARDS) */}
        <MoreThanLinkInBioSection />

        {/* 🌱 WHAT IS WEBLOOM — Linktree + Portfolio + Personal Website */}
        <WhatIsWebloomSection />

        {/* 🌸 WHY THE NAME WEBLOOM — Web + Bloom Philosophy */}
        <BloomPhilosophySection />

        {/* SECTION — YOUR PAGE — Make the web feel like yours */}
        <PageCraftSection />

        {/* SECTION — LINKS — Everything worth sharing. In one place */}
        <LinksSection />

        {/* SECTION — PROJECTS — Show what you've made */}
        <ProjectsSection />

        {/* SECTION — CUSTOMIZATION — No two Weblooms should look the same */}
        <CustomizationSection />

        {/* SECTION — LIVE PREVIEW — See it come together as you build */}
        <LivePreviewSection />

        {/* SECTION — PERSONAL IDENTITY — Build a page people remember */}
        <IdentitySection />

        {/* SECTION — ANALYTICS — Know what people actually find */}
        <AnalyticsSection />

        {/* SECTION — SHARING — One link. Everywhere */}
        <SharingSection />

        {/* SECTION — EXAMPLES — One platform. Infinite ways to make it yours */}
        <ExamplesSection />

        {/* SECTION — AUDIENCE — Made for people who make things */}
        <AudienceSection />

        {/* SECTION — DIFFERENTIATION — Your identity shouldn't depend on a template */}
        <DifferentiationSection />

        {/* SECTION — SIMPLE SETUP — From nothing to your own page in minutes */}
        <SetupSection />

        {/* SECTION — FEATURE SUMMARY — Everything you need to build your presence */}
        <FeatureSummarySection />

        {/* SECTION — PRIVACY / TRUST — Your page. Your content. Your control */}
        <PrivacySection />

        {/* SECTION — PRICING — Start free. Make it yours */}
        <PricingSection />

        {/* SECTION — FAQ — Questions, answered */}
        <FAQSection />

        {/* FINAL CTA — Make your corner of the internet */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </div>
  );
}
