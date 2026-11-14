'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  ShoppingBag,
  Calendar,
  Mail,
  Clock,
  Sparkles,
  Play,
  Volume2,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PageBlock, AppearanceSettings, AnalyticsEvent } from '@/types';
import { LinkedTreeStore } from '@/lib/storage';

interface BlockRendererProps {
  block: PageBlock;
  appearance: AppearanceSettings;
  isPreview?: boolean;
  onProductClick?: (productId: string) => void;
  onBookingClick?: (serviceId: string) => void;
}

export function BlockRenderer({
  block,
  appearance,
  isPreview = false,
  onProductClick,
  onBookingClick,
}: BlockRendererProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(true);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    if (block.blockType !== 'countdown') return;
    const targetStr = block.config?.targetDate || '2026-12-31T23:59:59Z';
    const target = new Date(targetStr).getTime();

    const calculateTime = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      if (diff === 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [block.blockType, block.config?.targetDate]);

  const handleBlockClick = () => {
    if (!isPreview) {
      // Track block interaction
      try {
        const events: AnalyticsEvent[] = LinkedTreeStore['getStored']?.('linked_tree_v2_analytics_events', []) || [];
        events.push({
          id: `evt_blk_${Date.now()}`,
          profileId: block.profileId,
          blockId: block.id,
          eventType: 'LINK_CLICK',
          timestamp: new Date().toISOString(),
          device: 'desktop',
        });
        localStorage.setItem('linked_tree_v2_analytics_events', JSON.stringify(events));
      } catch {}
    }

    if (block.blockType === 'product' && block.config?.productId && onProductClick) {
      onProductClick(block.config.productId);
      return;
    }

    if (block.blockType === 'booking' && block.config?.serviceId && onBookingClick) {
      onBookingClick(block.config.serviceId);
      return;
    }

    if (block.config?.url) {
      window.open(block.config.url, block.config.openInNewTab ? '_blank' : '_self');
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      setNewsletterMessage('Please provide a valid email address.');
      return;
    }

    setNewsletterStatus('loading');
    try {
      if (!isPreview) {
        LinkedTreeStore.addSubscriber({
          profileId: block.profileId,
          email: newsletterEmail.trim(),
          source: `block_${block.id}`,
          tags: ['newsletter'],
          consentGiven: newsletterConsent,
        });
      }
      setNewsletterStatus('success');
      setNewsletterMessage('Thank you for subscribing! Check your inbox soon.');
      setNewsletterEmail('');
    } catch {
      setNewsletterStatus('error');
      setNewsletterMessage('Unable to subscribe right now. Please try again.');
    }
  };

  // Button style class generator
  const getButtonShape = () => {
    switch (appearance.buttonStyle) {
      case 'pill': return 'rounded-full';
      case 'soft': return 'rounded-xl';
      case 'outline': return 'rounded-lg border-2 bg-transparent';
      case 'glass': return 'rounded-xl backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20';
      default: return 'rounded-lg';
    }
  };

  // ==========================================================================
  // 1. HEADING BLOCK
  // ==========================================================================
  if (block.blockType === 'heading') {
    const alignClass = block.config?.align === 'center' ? 'text-center' : block.config?.align === 'right' ? 'text-right' : 'text-left';
    const isSerif = block.config?.serif !== false;

    return (
      <div className={`w-full py-2.5 ${alignClass}`}>
        <h3 className={`text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 ${isSerif ? 'font-serif' : ''}`}>
          {block.title}
        </h3>
        {block.subtitle && (
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {block.subtitle}
          </p>
        )}
      </div>
    );
  }

  // ==========================================================================
  // 2. TEXT / CALLOUT BLOCK
  // ==========================================================================
  if (block.blockType === 'text') {
    return (
      <div className="w-full p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/60 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {block.title && <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">{block.title}</h4>}
        <p>{block.subtitle || block.config?.content}</p>
      </div>
    );
  }

  // ==========================================================================
  // 3. DIVIDER / FLORAL SEPARATOR
  // ==========================================================================
  if (block.blockType === 'divider') {
    return (
      <div className="w-full flex items-center justify-center gap-3 py-3 select-none opacity-60">
        <div className="h-px bg-neutral-300 dark:bg-neutral-800 flex-1" />
        <span className="text-xs text-amber-600 dark:text-amber-400">✿</span>
        <div className="h-px bg-neutral-300 dark:bg-neutral-800 flex-1" />
      </div>
    );
  }

  // ==========================================================================
  // 4. DIGITAL PRODUCT CARD BLOCK
  // ==========================================================================
  if (block.blockType === 'product') {
    const price = block.config?.priceInr ? `₹${block.config.priceInr}` : block.config?.priceUsd ? `$${block.config.priceUsd}` : 'Free';
    const badge = block.config?.badge;
    const coverImage = block.config?.coverImageUrl;

    return (
      <motion.div
        whileHover={{ scale: 1.015, y: -2 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleBlockClick}
        className="group relative w-full overflow-hidden rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/90 shadow-sm hover:shadow-md transition-all cursor-pointer p-3 sm:p-4 flex gap-3.5 items-center"
      >
        {coverImage && (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-100 dark:bg-neutral-800">
            <Image src={coverImage} alt={block.title || 'Product'} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {badge && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                {badge}
              </span>
            )}
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Digital Product</span>
          </div>
          <h4 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 truncate mt-0.5">
            {block.title}
          </h4>
          {block.subtitle && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
              {block.subtitle}
            </p>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100 font-mono">
              {price}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Get Access</span>
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // ==========================================================================
  // 5. COUNTDOWN TIMER BLOCK
  // ==========================================================================
  if (block.blockType === 'countdown') {
    return (
      <div className="w-full rounded-xl border border-amber-200/70 dark:border-amber-900/40 bg-gradient-to-br from-amber-50/60 to-orange-50/30 dark:from-amber-950/20 dark:to-neutral-900/60 p-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100/80 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 mb-2">
          <Clock className="w-3 h-3" />
          <span>Limited Time</span>
        </div>
        <h4 className="font-serif font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100">
          {block.title}
        </h4>
        {block.subtitle && (
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 mb-3">
            {block.subtitle}
          </p>
        )}

        {timeLeft && (
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-3">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Mins', val: timeLeft.minutes },
              { label: 'Secs', val: timeLeft.seconds },
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center p-2 rounded-lg bg-white/90 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 shadow-2xs">
                <span className="font-mono font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100">
                  {String(unit.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{unit.label}</span>
              </div>
            ))}
          </div>
        )}

        {block.config?.buttonText && (
          <button
            onClick={handleBlockClick}
            type="button"
            className="w-full max-w-xs mx-auto py-2 px-4 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
          >
            <span>{block.config.buttonText}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  // ==========================================================================
  // 6. NEWSLETTER / LEAD CAPTURE BLOCK
  // ==========================================================================
  if (block.blockType === 'newsletter') {
    return (
      <div className="w-full rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/80 p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <h4 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
            {block.title || 'Stay in the loop'}
          </h4>
        </div>
        {block.subtitle && (
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3.5">
            {block.subtitle}
          </p>
        )}

        {newsletterStatus === 'success' ? (
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{newsletterMessage}</span>
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={block.config?.placeholder || 'Enter your email...'}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />
              <button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-black text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 transition-colors shrink-0"
              >
                {newsletterStatus === 'loading' ? 'Joining...' : (block.config?.buttonText || 'Subscribe')}
              </button>
            </div>
            {newsletterStatus === 'error' && (
              <p className="text-[11px] text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{newsletterMessage}</span>
              </p>
            )}
            <p className="text-[10px] text-neutral-400">
              {block.config?.privacyNotice || 'We respect your inbox. Unsubscribe at any time.'}
            </p>
          </form>
        )}
      </div>
    );
  }

  // ==========================================================================
  // 7. BOOKING & APPOINTMENT BLOCK
  // ==========================================================================
  if (block.blockType === 'booking') {
    const duration = block.config?.durationMinutes ? `${block.config.durationMinutes} mins` : '30 mins';
    const price = block.config?.priceInr ? `₹${block.config.priceInr}` : block.config?.priceUsd ? `$${block.config.priceUsd}` : 'Free';

    return (
      <motion.div
        whileHover={{ scale: 1.015, y: -2 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleBlockClick}
        className="group relative w-full overflow-hidden rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/90 shadow-sm hover:shadow-md transition-all cursor-pointer p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-200/50 dark:border-emerald-800/40">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 truncate">
              {block.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
              <span>{duration}</span>
              <span>·</span>
              <span className="font-mono font-medium text-neutral-700 dark:text-neutral-300">{price}</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shrink-0 group-hover:scale-105 transition-transform"
        >
          Book Now
        </button>
      </motion.div>
    );
  }

  // ==========================================================================
  // 8. MEDIA / VIDEO / AUDIO / DEFAULT LINK BLOCK
  // ==========================================================================
  return (
    <motion.div
      whileHover={{ scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={handleBlockClick}
      className={`group relative w-full overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/90 shadow-sm hover:shadow-md transition-all cursor-pointer p-3.5 sm:p-4 flex items-center justify-between gap-3 ${getButtonShape()}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {block.config?.thumbnail && (
          <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-neutral-200/60 dark:border-neutral-800 bg-neutral-100">
            <Image src={block.config.thumbnail} alt={block.title || 'Link'} fill className="object-cover" />
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            {block.isPinned && (
              <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Pinned
              </span>
            )}
            <h4 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 truncate">
              {block.title}
            </h4>
          </div>
          {block.subtitle && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
              {block.subtitle}
            </p>
          )}
        </div>
      </div>

      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 group-hover:translate-x-0.5 transition-all shrink-0" />
    </motion.div>
  );
}
