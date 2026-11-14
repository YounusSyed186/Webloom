'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileRenderer } from '@/components/profile/profile-renderer';
import { LinkedTreeStore } from '@/lib/data-store';
import { PublicProfileData, Product, Service } from '@/types';
import { ShareModal } from '@/components/sharing/share-modal';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Layers,
  ArrowLeft,
  Plus,
  ShoppingBag,
  Calendar,
  X,
  CheckCircle2,
  Download,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicProfilePage() {
  const params = useParams();
  const username = (params?.username as string) || '';

  const [profileData, setProfileData] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Commerce Modal State
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [downloadToken, setDownloadToken] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  // Booking Modal State
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-11-20T14:00');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    if (username) {
      // Fetch public profile
      const data = LinkedTreeStore.getPublicProfileData(username);
      setProfileData(data);
      setLoading(false);

      // Record telemetry impression event
      if (data && data.profile.isPublished !== false) {
        LinkedTreeStore.trackProfileView(data.profile.id);
      }
    }
  }, [username]);

  const handleProductClick = (productId: string) => {
    if (!profileData) return;
    const products = profileData.products || LinkedTreeStore.getProducts(profileData.profile.id);
    const prod = products.find(p => p.id === productId) || products[0];
    if (prod) {
      setActiveProduct(prod);
      setDownloadToken(null);
      setOrderNumber(null);
    }
  };

  const handleBookingClick = (serviceId: string) => {
    if (!profileData) return;
    const services = LinkedTreeStore.getServices(profileData.profile.id);
    const srv = services.find(s => s.id === serviceId) || services[0];
    if (srv) {
      setActiveService(srv);
      setBookingConfirmed(false);
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProduct || !checkoutEmail.includes('@')) return;

    setCheckoutLoading(true);
    try {
      // Pure client-side order creation and instant digital fulfillment
      const localOrder = LinkedTreeStore.createOrder({
        profileId: profileData?.profile.id,
        customerEmail: checkoutEmail.trim(),
        customerName: checkoutName.trim() || 'Valued Customer',
        totalAmount: activeProduct.priceInr,
        currency: 'INR',
        paymentStatus: 'paid',
        items: [
          {
            id: `item_${Date.now()}`,
            orderId: `ord_local_${Date.now()}`,
            productId: activeProduct.id,
            productTitle: activeProduct.title,
            quantity: 1,
            unitPrice: activeProduct.priceInr,
            totalPrice: activeProduct.priceInr,
            downloadToken: `tok_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
          },
        ],
      });
      setOrderNumber(localOrder.orderNumber);
      setDownloadToken(localOrder.items[0]?.downloadToken || `tok_${Date.now()}`);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeService || !bookingEmail.includes('@')) return;

    setBookingLoading(true);
    try {
      LinkedTreeStore.createBooking({
        profileId: profileData?.profile.id,
        serviceId: activeService.id,
        clientName: bookingName.trim(),
        clientEmail: bookingEmail.trim(),
        scheduledAt: new Date(bookingDate).toISOString(),
        durationMinutes: activeService.durationMinutes,
        status: 'confirmed',
      });
      setBookingConfirmed(true);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] dark:bg-[#161310] flex flex-col items-center justify-center p-6 space-y-4">
        <Skeleton className="w-24 h-24 rounded-full" />
        <Skeleton className="w-48 h-6 rounded-xl" />
        <Skeleton className="w-64 h-4 rounded-lg" />
        <div className="w-full max-w-md space-y-3 pt-4">
          <Skeleton className="w-full h-14 rounded-2xl" />
          <Skeleton className="w-full h-14 rounded-2xl" />
          <Skeleton className="w-full h-14 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!profileData || profileData.profile.isPublished === false) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] dark:bg-[#161310] flex flex-col items-center justify-center p-6 text-center text-[#1F1A16] dark:text-[#F4EFE6] font-serif">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-300 mb-4 shadow-sm text-2xl">
          ✿
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          This corner hasn't bloomed yet
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#7A6D5E] dark:text-[#C8BDB0] max-w-sm mb-6 leading-relaxed">
          The handle <code className="font-mono bg-amber-100/60 dark:bg-amber-900/40 px-1.5 py-0.5 rounded">@{username}</code> is either available or currently private.
        </p>
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back Home</span>
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="primary" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              <span>Claim Handle</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <ProfileRenderer
        profile={profileData.profile}
        links={profileData.links}
        blocks={profileData.blocks}
        products={profileData.products || LinkedTreeStore.getProducts(profileData.profile.id)}
        services={LinkedTreeStore.getServices(profileData.profile.id)}
        socialLinks={profileData.socialLinks}
        projects={profileData.projects}
        appearance={profileData.appearance}
        isPreview={false}
        onShareClick={() => setIsShareOpen(true)}
        onProductClick={handleProductClick}
        onBookingClick={handleBookingClick}
      />

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        profile={profileData.profile}
      />

      {/* Product Checkout Modal */}
      <AnimatePresence>
        {activeProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#181411] border border-neutral-200 dark:border-[#382F26] p-6 shadow-2xl text-neutral-900 dark:text-[#F4EFE6]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-serif font-bold text-lg">Instant Checkout</h3>
                </div>
                <button
                  onClick={() => setActiveProduct(null)}
                  className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {downloadToken ? (
                <div className="text-center py-4 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xl text-neutral-900 dark:text-neutral-100">
                      Payment Confirmed!
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Order: <span className="font-mono font-semibold">{orderNumber}</span>
                    </p>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    Your digital download link is active. A copy has also been dispatched to <strong>{checkoutEmail}</strong>.
                  </p>
                  <a
                    href={`/api/store/download/${downloadToken}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-md transition-all hover:scale-102"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Files Immediately</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                    <h4 className="font-semibold text-sm">{activeProduct.title}</h4>
                    <p className="text-xs text-neutral-500 mt-0.5 line-clamp-2">{activeProduct.description}</p>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
                      <span className="text-xs text-neutral-500">Amount Due:</span>
                      <span className="font-mono font-bold text-base text-amber-600 dark:text-amber-400">
                        ₹{activeProduct.priceInr}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-80">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-80">
                      Delivery Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={checkoutEmail}
                      onChange={(e) => setCheckoutEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={checkoutLoading}
                    className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    {checkoutLoading ? 'Securing Order...' : `Pay ₹${activeProduct.priceInr} & Get Access ↗`}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {activeService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#181411] border border-neutral-200 dark:border-[#382F26] p-6 shadow-2xl text-neutral-900 dark:text-[#F4EFE6]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-serif font-bold text-lg">Schedule Session</h3>
                </div>
                <button
                  onClick={() => setActiveService(null)}
                  className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {bookingConfirmed ? (
                <div className="text-center py-4 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xl text-neutral-900 dark:text-neutral-100">
                      Booking Confirmed!
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Time: {new Date(bookingDate).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    A calendar invitation with video conference coordinates has been dispatched to <strong>{bookingEmail}</strong>.
                  </p>
                  <button
                    onClick={() => setActiveService(null)}
                    className="w-full py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-xs"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                    <h4 className="font-semibold text-sm">{activeService.title}</h4>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60 text-xs">
                      <span>Duration: {activeService.durationMinutes} mins</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">₹{activeService.priceInr}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-80">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-80">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-80">
                      Select Date & Preferred Time *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    {bookingLoading ? 'Confirming...' : 'Lock In Appointment ↗'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
