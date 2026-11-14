'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Video,
  Plus,
  CheckCircle2,
  XCircle,
  ExternalLink,
  DollarSign,
  User,
  Trash2,
  X
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { LinkedTreeStore } from '@/lib/storage';
import { Booking, Service } from '@/types';
import { useToast } from '@/components/ui/toast';
import { clsx } from 'clsx';

export default function BookingsManagementPage() {
  const { profile, themeMode } = useApp();
  const { success, error: toastError } = useToast();
  const isDark = themeMode === 'dark';

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'services'>('bookings');
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);

  // New service form
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('30');
  const [priceInr, setPriceInr] = useState('999');
  const [meetingUrl, setMeetingUrl] = useState('https://meet.google.com/call-link');

  useEffect(() => {
    if (profile?.id) {
      setBookings(LinkedTreeStore.getBookings(profile.id));
      setServices(LinkedTreeStore.getServices(profile.id));
    }
  }, [profile?.id]);

  const totalBookingRevenue = bookings
    .filter((b) => b.status === 'confirmed' || b.status === 'completed')
    .reduce((acc, b) => {
      const srv = services.find((s) => s.id === b.serviceId);
      return acc + (srv?.priceInr || 999);
    }, 0);

  const handleStatusChange = (bookingId: string, status: Booking['status']) => {
    const updated = LinkedTreeStore.updateBookingStatus(bookingId, status, profile?.id);
    if (updated) {
      setBookings(bookings.map((b) => (b.id === bookingId ? updated : b)));
      success(`Booking status changed to ${status}`);
    }
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle.trim()) {
      toastError('Please enter a service title.');
      return;
    }

    const created = LinkedTreeStore.addService(
      {
        title: serviceTitle.trim(),
        description: serviceDesc.trim(),
        durationMinutes: Number(durationMinutes) || 30,
        priceInr: Number(priceInr) || 999,
        meetingUrl: meetingUrl.trim(),
        locationType: 'video',
        isActive: true,
      },
      profile?.id
    );

    setServices([...services, created]);
    setIsAddServiceModalOpen(false);
    setServiceTitle('');
    setServiceDesc('');
    success(`Service "${created.title}" added!`);
  };

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className={clsx(
              "font-serif text-2xl sm:text-3xl font-bold tracking-tight",
              isDark ? "text-[#F4EFE6]" : "text-[#1F1A16]"
            )}
          >
            Bookings & Calendar Consultations
          </h1>
          <p
            className={clsx(
              "text-xs sm:text-sm mt-1",
              isDark ? "text-[#C8BDB0]" : "text-[#6E6254]"
            )}
          >
            Offer 1:1 advisory calls, office hours, and paid coaching sessions directly from your bio.
          </p>
        </div>

        <button
          onClick={() => setIsAddServiceModalOpen(true)}
          className={clsx(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 shrink-0 self-start sm:self-auto",
            isDark
              ? "bg-[#E6B86A] text-[#161310] hover:bg-[#F0C57A]"
              : "bg-[#181614] text-[#FAF6EE] hover:bg-black"
          )}
        >
          <Plus className="w-4 h-4" />
          <span>Add Consultation Service</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Bookings', value: bookings.length.toString(), change: 'Upcoming & completed' },
          { label: 'Booking Revenue', value: `₹${totalBookingRevenue.toLocaleString()}`, change: 'Paid directly' },
          { label: 'Active Services', value: services.filter(s => s.isActive).length.toString(), change: 'Publicly bookable' },
          { label: 'Completion Rate', value: '100%', change: 'Zero no-shows' },
        ].map((m, idx) => (
          <div
            key={idx}
            className={clsx(
              "p-4 rounded-xl border flex flex-col justify-between shadow-2xs",
              isDark ? "border-[#332B23] bg-[#1C1814]/80 text-[#F4EFE6]" : "border-[#EAE2D3] bg-white text-[#1F1A16]"
            )}
          >
            <span className={clsx("text-xs font-medium", isDark ? "text-[#A89B8C]" : "text-[#7A6E60]")}>
              {m.label}
            </span>
            <div className="mt-3">
              <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight">
                {m.value}
              </span>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
                {m.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
        <button
          onClick={() => setActiveTab('bookings')}
          className={clsx(
            "px-4 py-2 text-xs font-semibold rounded-lg transition-colors",
            activeTab === 'bookings'
              ? isDark ? "bg-[#28211B] text-[#E6B86A]" : "bg-[#FAF6EE] text-[#967137]"
              : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
          )}
        >
          Scheduled Appointments ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={clsx(
            "px-4 py-2 text-xs font-semibold rounded-lg transition-colors",
            activeTab === 'services'
              ? isDark ? "bg-[#28211B] text-[#E6B86A]" : "bg-[#FAF6EE] text-[#967137]"
              : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
          )}
        >
          Services & Rates ({services.length})
        </button>
      </div>

      {/* Tab: Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-3">
          {bookings.length === 0 ? (
            <div className="p-8 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 text-center text-xs text-neutral-400">
              No appointments scheduled yet.
            </div>
          ) : (
            bookings.map((b) => {
              const srv = services.find((s) => s.id === b.serviceId);
              return (
                <div
                  key={b.id}
                  className={clsx(
                    "p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors shadow-2xs",
                    isDark ? "border-[#332B23] bg-[#1C1814]/80 text-[#F4EFE6]" : "border-[#EAE2D3] bg-white text-[#1F1A16]"
                  )}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={clsx(
                            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                            b.status === 'confirmed'
                              ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                              : b.status === 'completed'
                              ? "border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
                              : "border-neutral-300 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
                          )}
                        >
                          {b.status}
                        </span>
                        <span className="text-xs text-neutral-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{b.durationMinutes} mins</span>
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm truncate mt-1">
                        {b.clientName}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                        <span>{b.clientEmail}</span>
                        <span>·</span>
                        <span className="font-medium text-amber-600 dark:text-amber-400">
                          {new Date(b.scheduledAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    {b.status === 'pending' && (
                      <button
                        onClick={() => handleStatusChange(b.id, 'confirmed')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                      >
                        Confirm
                      </button>
                    )}
                    {b.status === 'confirmed' && (
                      <button
                        onClick={() => handleStatusChange(b.id, 'completed')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                      >
                        Mark Done
                      </button>
                    )}
                    {b.status !== 'canceled' && (
                      <button
                        onClick={() => handleStatusChange(b.id, 'canceled')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-200 dark:border-red-900/40 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab: Services */}
      {activeTab === 'services' && (
        <div className="space-y-3">
          {services.map((srv) => (
            <div
              key={srv.id}
              className={clsx(
                "p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors shadow-2xs",
                isDark ? "border-[#332B23] bg-[#1C1814]/80 text-[#F4EFE6]" : "border-[#EAE2D3] bg-white text-[#1F1A16]"
              )}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{srv.priceInr}
                  </span>
                  <span className="text-xs text-neutral-400">· {srv.durationMinutes} minutes</span>
                </div>
                <h4 className="font-semibold text-sm mt-1">{srv.title}</h4>
                {srv.description && (
                  <p className="text-xs text-neutral-500 mt-0.5">{srv.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                  Active in Bio
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Service Modal */}
      <AnimatePresence>
        {isAddServiceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={clsx(
                "relative w-full max-w-md rounded-2xl border p-6 shadow-2xl",
                isDark ? "bg-[#181411] border-[#382F26] text-[#F4EFE6]" : "bg-[#FAF6EE] border-[#DDD2BF] text-[#1F1A16]"
              )}
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-4">
                <h3 className="font-serif font-bold text-lg">Create Consultation Service</h3>
                <button onClick={() => setIsAddServiceModalOpen(false)} className="p-1 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateService} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={serviceTitle}
                    onChange={(e) => setServiceTitle(e.target.value)}
                    placeholder="e.g. 45-min Architecture Strategy Session"
                    className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">Description</label>
                  <textarea
                    rows={2}
                    value={serviceDesc}
                    onChange={(e) => setServiceDesc(e.target.value)}
                    placeholder="What will you review during this call?"
                    className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-80">Duration (Minutes)</label>
                    <input
                      type="number"
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(e.target.value)}
                      className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-80">Rate (INR ₹)</label>
                    <input
                      type="number"
                      value={priceInr}
                      onChange={(e) => setPriceInr(e.target.value)}
                      className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">Meeting / Video Link</label>
                  <input
                    type="url"
                    value={meetingUrl}
                    onChange={(e) => setMeetingUrl(e.target.value)}
                    placeholder="https://meet.google.com/..."
                    className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsAddServiceModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:opacity-80"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

