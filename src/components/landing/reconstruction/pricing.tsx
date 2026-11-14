'use client';

import React, { useRef, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useApp } from '@/lib/context/app-context';
import { SparkleStar } from './sparkle';
import {
  Tilt3DCard,
  MagneticWrapper,
  CinematicCameraScene,
} from './motion-primitives';
import {
  useWebloomTheme,
  useWebloomSyncState,
  useIsWebloomOverlay,
} from './webloom-dual-theme-context';
import { getPublicPricingPlans, FormattedPricingTier } from '@/lib/billing/plans';
import { loadRazorpayScript } from '@/lib/billing/razorpay';
import { LinkedTreeStore } from '@/lib/data-store';

export function PricingReconstructed() {
  const theme = useWebloomTheme();
  const isOverlay = useIsWebloomOverlay();
  const isDark = theme === 'dark';
  const router = useRouter();

  const {
    billingCycle: billing,
    setBillingCycle: setBilling,
    currency,
    setCurrency,
  } = useWebloomSyncState();

  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { user, profile, updateProfile, setAuthModalMode, setIsAuthModalOpen } = useApp();

  // Dynamic public plans from authoritative catalog
  const plans = useMemo(() => {
    return getPublicPricingPlans(currency, billing);
  }, [currency, billing]);

  // Checkout modal & payment states (only relevant on base interactive layer)
  const [selectedPlan, setSelectedPlan] = useState<FormattedPricingTier | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState(profile?.email || user?.email || '');
  const [checkoutName, setCheckoutName] = useState(profile?.displayName || user?.name || '');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Success celebration modal state
  const [successData, setSuccessData] = useState<{
    planName: string;
    paymentId: string;
    amount: string;
    billingCycle: string;
  } | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 26,
  });

  const leftTierRotateY = useTransform(smoothScroll, [0.08, 0.45], [10, 0]);
  const rightTierRotateY = useTransform(smoothScroll, [0.08, 0.45], [-10, 0]);
  const centerTierZ = useTransform(smoothScroll, [0.08, 0.48, 0.9], [0, 26, 18]);

  const handlePlanAction = useCallback((plan: FormattedPricingTier) => {
    if (plan.id === 'free') {
      if (user || profile?.id) {
        router.push('/dashboard');
      } else {
        setAuthModalMode('signup');
        setIsAuthModalOpen(true);
      }
      return;
    }

    // Set defaults for checkout modal
    setSelectedPlan(plan);
    setCheckoutEmail(profile?.email || user?.email || '');
    setCheckoutName(profile?.displayName || user?.name || '');
    setPaymentError(null);
    setCheckoutModalOpen(true);
  }, [user, profile, router, setAuthModalMode, setIsAuthModalOpen]);

  // Trigger Razorpay payment gateway
  const handleInitiateRazorpay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    const emailToUse = checkoutEmail.trim();
    if (!emailToUse || !emailToUse.includes('@')) {
      setPaymentError('Please enter a valid email address to link your subscription.');
      return;
    }

    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      // 1. Create order on authoritative server endpoint
      const orderRes = await fetch('/api/billing/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan.id,
          billingCycle: billing,
          currency,
          customerEmail: emailToUse,
          customerName: checkoutName.trim() || 'Webloom Creator',
          profileId: profile?.id,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway order');
      }

      // 2. Load official Razorpay checkout script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Unable to reach Razorpay secure payment script. Please check your connection.');
      }

      // 3. Launch Razorpay Checkout Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Webloom Creator Platform',
        description: `${selectedPlan.name} (${billing === 'annual' ? 'Billed Yearly · Save 35%' : 'Monthly'})`,
        image: 'https://webloom.site/favicon.ico',
        order_id: orderData.orderId,
        prefill: {
          name: checkoutName.trim() || profile?.displayName || 'Webloom Creator',
          email: emailToUse,
        },
        theme: {
          color: isDark ? '#E6B86A' : '#181614',
          backdrop_color: 'rgba(0, 0, 0, 0.75)',
        },
        modal: {
          backdropclose: true,
          ondismiss: () => {
            setIsProcessingPayment(false);
          },
        },
        handler: async function (response: any) {
          try {
            // 4. Verify payment signature on backend
            const verifyRes = await fetch('/api/billing/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                planId: selectedPlan.id,
                billingCycle: billing,
                profileId: profile?.id,
                customerEmail: emailToUse,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              // 5. Update local state & persistent profile
              const activePlanId = selectedPlan.id as any;
              updateProfile({ plan: activePlanId });
              if (profile?.id) {
                LinkedTreeStore.updateProfile(profile.id, { plan: activePlanId });
              }

              setCheckoutModalOpen(false);
              setSuccessData({
                planName: selectedPlan.name,
                paymentId: response.razorpay_payment_id,
                amount: selectedPlan.displayPrice,
                billingCycle: billing,
              });
            } else {
              setPaymentError(verifyData.error || 'Payment signature could not be verified.');
            }
          } catch (verErr: any) {
            console.error('Signature verification error:', verErr);
            setPaymentError(verErr.message || 'Error communicating with verification server.');
          } finally {
            setIsProcessingPayment(false);
          }
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on('payment.failed', function (failure: any) {
        setIsProcessingPayment(false);
        setPaymentError(failure.error?.description || 'Payment was declined or cancelled.');
      });

      razorpayInstance.open();
    } catch (err: any) {
      console.error('Payment initialization error:', err);
      setIsProcessingPayment(false);
      setPaymentError(err.message || 'Unable to open payment modal. Please try again.');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative w-full py-14 sm:py-18 md:py-22 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <CinematicCameraScene enterRotateX={6.5} exitRotateX={-3.5}>
          {/* Section Header */}
          <motion.div
            initial={isOverlay ? false : { opacity: 0, y: 14, rotateX: 10 }}
            animate={isOverlay ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
            whileInView={isOverlay ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: 'translateZ(20px)' }}
            className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 md:mb-12 relative"
          >
            <SparkleStar className="absolute -top-2 left-6 sm:left-16 w-4 sm:w-5 h-4 sm:h-5 opacity-70 hidden xs:block" />
            <SparkleStar className="absolute top-6 right-6 sm:right-14 w-4 sm:w-5 h-4 sm:h-5 opacity-70 hidden xs:block" />

            <div
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[11px] sm:text-[12px] font-medium tracking-wide shadow-2xs mb-3 ${
                isDark
                  ? 'bg-[#26201B] border-[#3E332A] text-[#E6D8C5]'
                  : 'bg-[#EFE4D4] border-[#DFD0BC] text-[#4E3E30]'
              }`}
            >
              <span className={`text-[10px] ${isDark ? 'text-[#E6B86A]' : 'text-[#9C7248]'}`}>
                ✦
              </span>
              <span>Simple, honest pricing</span>
            </div>

            <h2
              className={`font-serif text-[34px] sm:text-[42px] md:text-[48px] leading-[1.08] font-normal tracking-tight ${
                isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
              }`}
            >
              Start{' '}
              <span className="relative inline-block italic px-1">
                <span className="relative z-10">free.</span>
                <svg
                  className="absolute -inset-x-1.5 bottom-0.5 top-2.5 w-[calc(100%+12px)] h-[72%] -z-0 pointer-events-none"
                  viewBox="0 0 120 40"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M4 14C28 9 88 7 114 11C118 12 118 22 115 26C112 30 116 34 111 36C82 39 28 39 6 36C2 35 2 22 4 14Z"
                    fill={isDark ? '#A87424' : '#F7DC6F'}
                    fillOpacity={isDark ? '0.68' : '0.88'}
                  />
                </svg>
              </span>{' '}
              Grow when ready.
            </h2>

            <p
              className={`mt-2.5 text-[14.5px] sm:text-[16px] leading-relaxed max-w-md ${
                isDark ? 'text-[#C8BDB0]' : 'text-[#4A4138]'
              }`}
            >
              Build and publish your personal corner for free forever. Upgrade anytime for custom domains and deeper tools.
            </p>

            {/* Tactile Stationery Dual Toggles (Billing Cycle + Currency Switcher) */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {/* Monthly / Yearly Billing Toggle */}
              <div
                className={`inline-flex items-center p-1 rounded-full border shadow-2xs ${
                  isDark
                    ? 'bg-[#231D18] border-[#3C3128]'
                    : 'bg-[#EFE6D6] border-[#DCD0BC]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setBilling('monthly')}
                  className={`px-4 py-1.5 rounded-full text-[12.5px] sm:text-[13px] font-medium transition-all ${
                    billing === 'monthly'
                      ? isDark
                        ? 'bg-[#332A22] text-[#F4EFE6] shadow-xs border border-[#4C3F33]'
                        : 'bg-[#FAF6EE] text-[#1F1A16] shadow-xs border border-[#DFD2BD]'
                      : isDark
                        ? 'text-[#A89B8C] hover:text-[#F4EFE6]'
                        : 'text-[#65594D] hover:text-[#1F1A16]'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBilling('annual')}
                  className={`px-4 py-1.5 rounded-full text-[12.5px] sm:text-[13px] font-medium transition-all flex items-center gap-1.5 ${
                    billing === 'annual'
                      ? isDark
                        ? 'bg-[#332A22] text-[#F4EFE6] shadow-xs border border-[#4C3F33]'
                        : 'bg-[#FAF6EE] text-[#1F1A16] shadow-xs border border-[#DFD2BD]'
                      : isDark
                        ? 'text-[#A89B8C] hover:text-[#F4EFE6]'
                        : 'text-[#65594D] hover:text-[#1F1A16]'
                  }`}
                >
                  <span>Yearly</span>
                  <span
                    className={`text-[10.5px] border px-2 py-0.2 rounded-full font-semibold ${
                      isDark
                        ? 'bg-[#22301F] text-[#B8D8A8] border-[#364D31]'
                        : 'bg-[#DCE5CE] text-[#2D3B22] border-[#C2CFAF]'
                    }`}
                  >
                    Save 35%
                  </span>
                </button>
              </div>

              {/* Seamless Currency Switcher ($ USD / ₹ INR) */}
              <div
                className={`inline-flex items-center p-1 rounded-full border shadow-2xs ${
                  isDark
                    ? 'bg-[#231D18] border-[#3C3128]'
                    : 'bg-[#EFE6D6] border-[#DCD0BC]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3.5 py-1.5 rounded-full text-[12.5px] sm:text-[13px] font-medium transition-all ${
                    currency === 'USD'
                      ? isDark
                        ? 'bg-[#332A22] text-[#F4EFE6] shadow-xs border border-[#4C3F33]'
                        : 'bg-[#FAF6EE] text-[#1F1A16] shadow-xs border border-[#DFD2BD]'
                      : isDark
                        ? 'text-[#A89B8C] hover:text-[#F4EFE6]'
                        : 'text-[#65594D] hover:text-[#1F1A16]'
                  }`}
                >
                  $ USD
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('INR')}
                  className={`px-3.5 py-1.5 rounded-full text-[12.5px] sm:text-[13px] font-medium transition-all ${
                    currency === 'INR'
                      ? isDark
                        ? 'bg-[#332A22] text-[#F4EFE6] shadow-xs border border-[#4C3F33]'
                        : 'bg-[#FAF6EE] text-[#1F1A16] shadow-xs border border-[#DFD2BD]'
                      : isDark
                        ? 'text-[#A89B8C] hover:text-[#F4EFE6]'
                        : 'text-[#65594D] hover:text-[#1F1A16]'
                  }`}
                >
                  ₹ INR
                </button>
              </div>
            </div>
          </motion.div>

          {/* 3 Handmade Paper Dynamic Pricing Cards */}
          <motion.div
            initial={isOverlay ? false : "hidden"}
            animate={isOverlay ? "visible" : undefined}
            whileInView={isOverlay ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            variants={
              isOverlay
                ? undefined
                : {
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } },
                  }
            }
            style={{ transformStyle: 'preserve-3d' }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-7 max-w-5xl mx-auto items-stretch"
          >
            {plans.map((plan, idx) => {
              const price = plan.displayPrice;

              const dynamic3DStyle = prefersReducedMotion
                ? undefined
                : idx === 0
                  ? { rotateY: leftTierRotateY, transformStyle: 'preserve-3d' as const }
                  : idx === 1
                    ? { z: centerTierZ, transformStyle: 'preserve-3d' as const }
                    : { rotateY: rightTierRotateY, transformStyle: 'preserve-3d' as const };

              return (
                <motion.div
                  key={plan.id}
                  initial={isOverlay ? false : undefined}
                  animate={isOverlay ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
                  variants={
                    isOverlay
                      ? undefined
                      : {
                          hidden: { opacity: 0, y: 24, rotateX: 8 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                          },
                        }
                  }
                  style={dynamic3DStyle}
                  className="flex"
                >
                  <Tilt3DCard
                    maxTilt={5.5}
                    scaleOnHover={1.018}
                    className={`w-full relative rounded-[16px] p-6 sm:p-7 flex flex-col justify-between ${
                      plan.featured ? 'lg:-translate-y-2' : ''
                    }`}
                    style={{
                      background: isDark ? plan.darkBgStyle : plan.bgStyle,
                      border: `1px solid ${
                        isDark ? plan.darkBorderColor : plan.borderColor
                      }`,
                      boxShadow: isDark
                        ? plan.featured
                          ? '0 22px 44px -8px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 248, 235, 0.08)'
                          : '0 12px 28px -6px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 248, 235, 0.05)'
                        : plan.featured
                          ? '0 22px 44px -8px rgba(38, 28, 18, 0.18), 0 4px 10px -2px rgba(38, 28, 18, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.65)'
                          : '0 10px 24px -6px rgba(38, 28, 18, 0.1), 0 2px 6px -1px rgba(38, 28, 18, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.55)',
                    }}
                  >
                    {/* Top Masking Tape Strip */}
                    <div
                      className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 shadow-2xs border ${
                        isDark
                          ? 'bg-[#9A7E52]/80 border-[#846B43]/50'
                          : 'bg-[#E2C88A]/85 border-[#D4B878]/50'
                      } ${plan.tapeRotate}`}
                    />

                    {/* Perforated Botanical Stamp & 'Most Popular' Badge on Featured Pro Card */}
                    {plan.featured && (
                      <>
                        <div
                          className={`absolute -top-3.5 right-5 text-[10.5px] font-medium tracking-wide px-3 py-0.5 rounded-full shadow-sm ${
                            isDark
                              ? 'bg-[#E6B86A] text-[#181410]'
                              : 'bg-[#181614] text-[#FAF6EE]'
                          }`}
                        >
                          ✦ Most Popular
                        </div>
                        <div
                          className={`hidden sm:flex absolute top-5 right-5 w-11 h-13 p-1 shadow-sm rotate-6 border items-center justify-center pointer-events-none ${
                            isDark
                              ? 'bg-[#2C231C] border-[#4A3B30]'
                              : 'bg-[#FAF3E4] border-[#D9CCB6]'
                          }`}
                          style={{
                            backgroundImage: isDark
                              ? 'radial-gradient(circle, transparent 68%, #4A3B30 70%)'
                              : 'radial-gradient(circle, transparent 68%, #D8CBB4 70%)',
                            backgroundSize: '5px 5px',
                          }}
                        >
                          <div
                            className={`w-full h-full border flex items-center justify-center ${
                              isDark
                                ? 'bg-[#1E1813] border-[#524235]'
                                : 'bg-[#EFE6D5] border-[#C8B9A2]'
                            }`}
                          >
                            <svg className="w-6 h-7" viewBox="0 0 32 36" fill="none">
                              <path d="M16 18V33" stroke="#6E9458" strokeWidth="1.6" strokeLinecap="round" />
                              <circle cx="16" cy="12" r="5" fill="#E3969E" />
                              <circle cx="12" cy="10" r="3.2" fill="#ECA8B0" />
                              <circle cx="20" cy="10" r="3.2" fill="#ECA8B0" />
                              <circle cx="16" cy="12.5" r="2.2" fill="#E6B84C" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}

                    <div>
                      {/* Card Top Header */}
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className={`w-9 h-9 rounded-lg border flex items-center justify-center shadow-2xs ${
                            isDark
                              ? 'bg-[#181410]/70 border-white/10'
                              : 'bg-[#FAF6EE]/70 border-black/10'
                          }`}
                        >
                          {plan.id === 'free' && (
                            <svg
                              className={`w-6 h-6 fill-none ${
                                isDark ? 'stroke-[#EAE0D2]' : 'stroke-[#2B231D]'
                              }`}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 22v-9" />
                              <path
                                d="M12 13C8.5 13 6 10.5 6 7c3.5 0 6 2.5 6 6Z"
                                fill={isDark ? '#32462D' : '#DCE5CE'}
                              />
                              <path
                                d="M12 16c3.5 0 6-2.5 6-6-3.5 0-6 2.5-6 6Z"
                                fill={isDark ? '#32462D' : '#DCE5CE'}
                              />
                            </svg>
                          )}
                          {plan.id === 'pro' && (
                            <svg
                              className={`w-6 h-6 fill-none ${
                                isDark ? 'stroke-[#EAE0D2]' : 'stroke-[#2B231D]'
                              }`}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="3"
                                fill={isDark ? '#E6B86A' : '#F7DC6F'}
                              />
                              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12" />
                            </svg>
                          )}
                          {(plan.id === 'business' || (plan.id as any) === 'studio') && (
                            <svg
                              className={`w-6 h-6 fill-none ${
                                isDark ? 'stroke-[#EAE0D2]' : 'stroke-[#2B231D]'
                              }`}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="3"
                                y="3"
                                width="7.5"
                                height="7.5"
                                rx="1.2"
                                fill={isDark ? '#3D3146' : '#E3D6E7'}
                              />
                              <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.2" />
                              <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.2" />
                              <rect
                                x="13.5"
                                y="13.5"
                                width="7.5"
                                height="7.5"
                                rx="1.2"
                                fill={isDark ? '#3D3146' : '#E3D6E7'}
                              />
                            </svg>
                          )}
                        </div>
                        <h3
                          className={`font-serif font-bold text-[22px] leading-tight ${
                            isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                          }`}
                        >
                          {plan.name}
                        </h3>
                      </div>

                      <p
                        className={`text-[12.5px] sm:text-[13px] leading-relaxed min-h-[38px] ${
                          isDark ? 'text-[#C8BDB0]' : 'text-[#4E443A]'
                        }`}
                      >
                        {plan.tagline}
                      </p>

                      {/* Animated Price Block */}
                      <div
                        className={`my-5 pb-5 border-b flex items-baseline gap-2 ${
                          isDark ? 'border-white/10' : 'border-[#1F1A16]/12'
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={`${price}-${currency}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18 }}
                            className={`font-serif text-[40px] sm:text-[44px] leading-none font-normal tracking-tight inline-block ${
                              isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                            }`}
                          >
                            {price}
                          </motion.span>
                        </AnimatePresence>
                        <div
                          className={`flex flex-col text-[11.5px] ${
                            isDark ? 'text-[#B8AEA2]' : 'text-[#5A5044]'
                          }`}
                        >
                          <span className="font-medium">{plan.periodLabel}</span>
                          {plan.id !== 'free' && (
                            <span className="text-[11px] opacity-80">
                              {billing === 'annual' ? 'billed yearly' : 'billed monthly'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Hand-Drawn Style Checklist Features */}
                      <ul className="space-y-2.5 mb-7">
                        {plan.features.map((feat, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-2.5 text-[12.5px] sm:text-[13px] leading-snug ${
                              isDark ? 'text-[#E6DDD0]' : 'text-[#2B231D]'
                            }`}
                          >
                            <span
                              className={`inline-flex items-center justify-center w-4 h-4 rounded-[3px] border text-[10px] leading-none shrink-0 mt-0.5 ${
                                plan.featured
                                  ? isDark
                                    ? 'border-[#E6B86A] bg-[#E6B86A]/25 text-[#E6B86A] font-bold'
                                    : 'border-[#3A2E21] bg-[#F7DC6F]/65 text-[#1F1A16] font-bold'
                                  : isDark
                                    ? 'border-[#6E6052] bg-[#181410]/60 text-[#E6DDD0]'
                                    : 'border-[#5E5246] bg-[#FAF6EE]/60 text-[#2B231D]'
                              }`}
                            >
                              ✓
                            </span>
                            <span className={i === 0 && plan.id !== 'free' ? 'font-semibold' : ''}>
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Magnetic Action Button connected to Razorpay checkout */}
                    <MagneticWrapper strength={0.18} className="w-full">
                      <button
                        type="button"
                        onClick={() => handlePlanAction(plan)}
                        className={`w-full h-[40px] sm:h-[42px] rounded-full text-[13px] sm:text-[13.5px] font-medium inline-flex items-center justify-center gap-1.5 transition-all hover:scale-[1.01] active:scale-[0.99] ${
                          plan.featured
                            ? isDark
                              ? 'bg-[#F4EFE6] hover:bg-white text-[#181410] shadow-md'
                              : 'bg-[#181614] hover:bg-black text-[#FAF6EE] shadow-md'
                            : isDark
                              ? 'bg-[#181410]/90 hover:bg-[#28211B] text-[#F4EFE6] border border-[#4A3E33] shadow-2xs'
                              : 'bg-[#FAF6EE]/90 hover:bg-white text-[#1F1A16] border border-[#B8AC99] shadow-2xs'
                        }`}
                      >
                        <span>{plan.ctaLabel}</span>
                        <span className="text-[11.5px] font-sans">↗</span>
                      </button>
                    </MagneticWrapper>
                  </Tilt3DCard>
                </motion.div>
              );
            })}
          </motion.div>
        </CinematicCameraScene>
      </div>

      {/* Razorpay Subscription Checkout Dialog (Interactive Base Only) */}
      {!isOverlay && checkoutModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md rounded-2xl border p-6 sm:p-7 shadow-2xl relative ${
              isDark
                ? 'bg-[#221B16] border-[#3E3228] text-[#F4EFE6]'
                : 'bg-[#FAF6EE] border-[#D8CCBA] text-[#1F1A16]'
            }`}
          >
            {/* Top Tape Strip */}
            <div
              className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4.5 border shadow-2xs rotate-1 ${
                isDark
                  ? 'bg-[#9A7E52]/80 border-[#846B43]/50'
                  : 'bg-[#E2C88A]/85 border-[#D4B878]/50'
              }`}
            />

            <button
              type="button"
              onClick={() => {
                if (!isProcessingPayment) setCheckoutModalOpen(false);
              }}
              className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-xs opacity-70 hover:opacity-100 ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
              }`}
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className={`text-sm ${isDark ? 'text-[#E6B86A]' : 'text-[#967137]'}`}>✦</span>
              <h3 className="font-serif font-bold text-xl">
                Activate {selectedPlan.name}
              </h3>
            </div>

            <p className={`text-xs leading-relaxed mb-5 ${isDark ? 'text-[#C4B7A5]' : 'text-[#5C5042]'}`}>
              Securely upgrade your creator workspace with Razorpay. Includes instant custom domain activation and creator toolkit.
            </p>

            {/* Plan Summary Card */}
            <div
              className={`p-4 rounded-xl border mb-5 flex items-center justify-between ${
                isDark
                  ? 'bg-[#18130F] border-[#362C23]'
                  : 'bg-[#EFE7D8] border-[#D4C6B1]'
              }`}
            >
              <div>
                <span className="font-serif font-semibold text-sm block">
                  {selectedPlan.name}
                </span>
                <span className={`text-[11.5px] ${isDark ? 'text-[#9C8F7E]' : 'text-[#7A6D5E]'}`}>
                  {billing === 'annual' ? 'Billed annually (35% saved)' : 'Billed monthly'}
                </span>
              </div>
              <div className="text-right">
                <span className="font-serif font-bold text-lg block">
                  {selectedPlan.displayPrice}
                </span>
                <span className={`text-[10px] ${isDark ? 'text-[#8C7F6E]' : 'text-[#827566]'}`}>
                  {billing === 'annual' ? '/mo billed yearly' : '/mo'}
                </span>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleInitiateRazorpay} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1 opacity-90">
                  Account Email
                </label>
                <input
                  type="email"
                  required
                  value={checkoutEmail}
                  onChange={(e) => setCheckoutEmail(e.target.value)}
                  placeholder="creator@yourname.com"
                  className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-hidden transition-colors ${
                    isDark
                      ? 'bg-[#18130F] border-[#3E3228] text-white focus:border-[#E6B86A]'
                      : 'bg-white border-[#D0C2AE] text-[#1F1A16] focus:border-[#3D3123]'
                  }`}
                />
                <span className={`text-[10.5px] block mt-1 ${isDark ? 'text-[#8C7F6E]' : 'text-[#7A6D5E]'}`}>
                  Subscription will be linked to this account email
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 opacity-90">
                  Creator Name (Optional)
                </label>
                <input
                  type="text"
                  value={checkoutName}
                  onChange={(e) => setCheckoutName(e.target.value)}
                  placeholder="Your Name / Studio"
                  className={`w-full px-3 py-2 rounded-lg text-sm border focus:outline-hidden transition-colors ${
                    isDark
                      ? 'bg-[#18130F] border-[#3E3228] text-white focus:border-[#E6B86A]'
                      : 'bg-white border-[#D0C2AE] text-[#1F1A16] focus:border-[#3D3123]'
                  }`}
                />
              </div>

              {paymentError && (
                <div className="p-3 rounded-lg text-xs bg-red-500/10 border border-red-500/30 text-red-500 font-medium">
                  {paymentError}
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className={`w-full h-11 rounded-full font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                    isDark
                      ? 'bg-[#E6B86A] hover:bg-[#F2C57B] text-[#181410]'
                      : 'bg-[#1F1A16] hover:bg-black text-[#FAF6EE]'
                  } disabled:opacity-60 cursor-pointer`}
                >
                  {isProcessingPayment ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Connecting to Razorpay...
                    </span>
                  ) : (
                    <>
                      <span>Proceed to Razorpay Checkout</span>
                      <span>↗</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 mt-3 text-[10.5px] opacity-70">
                  <span>🔒 256-Bit SSL Encrypted</span>
                  <span>•</span>
                  <span>Powered by Razorpay</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subscription Success Celebration Modal */}
      {!isOverlay && successData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-300">
          <div
            className={`w-full max-w-md rounded-2xl border p-7 sm:p-8 text-center shadow-2xl relative ${
              isDark
                ? 'bg-[#221B16] border-[#3E3228] text-[#F4EFE6]'
                : 'bg-[#FAF6EE] border-[#D8CCBA] text-[#1F1A16]'
            }`}
          >
            {/* Top Tape Strip */}
            <div
              className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4.5 border shadow-2xs rotate-1 ${
                isDark
                  ? 'bg-[#9A7E52]/80 border-[#846B43]/50'
                  : 'bg-[#E2C88A]/85 border-[#D4B878]/50'
              }`}
            />

            <div className="w-14 h-14 rounded-full mx-auto mb-4 border flex items-center justify-center text-2xl shadow-sm bg-[#E6B86A]/20 border-[#E6B86A]/40 text-[#E6B86A]">
              ✦
            </div>

            <h3 className="font-serif font-bold text-2xl tracking-tight mb-2">
              Welcome to {successData.planName}!
            </h3>

            <p className={`text-xs sm:text-sm leading-relaxed mb-6 max-w-xs mx-auto ${
              isDark ? 'text-[#C4B7A5]' : 'text-[#5C5042]'
            }`}>
              Your subscription is active and verified. Custom domains, branding removal, and pro creator studio tools are unlocked.
            </p>

            <div
              className={`p-3.5 rounded-xl border mb-6 text-left text-xs space-y-1 ${
                isDark
                  ? 'bg-[#18130F] border-[#362C23]'
                  : 'bg-[#EFE7D8] border-[#D4C6B1]'
              }`}
            >
              <div className="flex justify-between">
                <span className="opacity-70">Payment ID:</span>
                <span className="font-mono">{successData.paymentId.slice(0, 16)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Billing Cadence:</span>
                <span className="capitalize">{successData.billingCycle}</span>
              </div>
              <div className="flex justify-between font-semibold pt-1 border-t border-black/5 dark:border-white/5">
                <span>Status:</span>
                <span className="text-emerald-500">Active · Paid</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setSuccessData(null);
                  router.push('/dashboard');
                }}
                className={`w-full h-11 rounded-full font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  isDark
                    ? 'bg-[#E6B86A] hover:bg-[#F2C57B] text-[#181410]'
                    : 'bg-[#1F1A16] hover:bg-black text-[#FAF6EE]'
                }`}
              >
                <span>Open Creator Dashboard</span>
                <span>↗</span>
              </button>

              <button
                type="button"
                onClick={() => setSuccessData(null)}
                className={`w-full py-2 text-xs font-medium opacity-70 hover:opacity-100 transition-opacity`}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}