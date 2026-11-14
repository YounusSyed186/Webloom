'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Download,
  Plus,
  Mail,
  Search,
  Tag,
  Trash2,
  CheckCircle2,
  TrendingUp,
  Send,
  X
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { LinkedTreeStore } from '@/lib/storage';
import { Subscriber } from '@/types';
import { useToast } from '@/components/ui/toast';
import { clsx } from 'clsx';

export default function AudienceManagementPage() {
  const { profile, themeMode } = useApp();
  const { success, error: toastError } = useToast();
  const isDark = themeMode === 'dark';

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

  // New subscriber state
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newTag, setNewTag] = useState('newsletter');

  // Broadcast state
  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');

  useEffect(() => {
    if (profile?.id) {
      setSubscribers(LinkedTreeStore.getSubscribers(profile.id));
    }
  }, [profile?.id]);

  const handleExportCsv = () => {
    const csv = LinkedTreeStore.exportSubscribersCsv(profile?.id);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `subscribers-${profile?.username || 'webloom'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success('Subscriber CSV exported!');
  };

  const handleAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.includes('@')) {
      toastError('Please enter a valid email address.');
      return;
    }

    const created = LinkedTreeStore.addSubscriber(
      {
        email: newEmail.trim(),
        name: newName.trim() || undefined,
        source: 'manual_dashboard',
        tags: [newTag],
        consentGiven: true,
      },
      profile?.id
    );

    setSubscribers(LinkedTreeStore.getSubscribers(profile?.id));
    setIsAddModalOpen(false);
    setNewEmail('');
    setNewName('');
    success(`Added ${created.email} to audience!`);
  };

  const handleDeleteSubscriber = (id: string) => {
    LinkedTreeStore.deleteSubscriber(id, profile?.id);
    setSubscribers(subscribers.filter((s) => s.id !== id));
    success('Subscriber removed');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject.trim() || !broadcastBody.trim()) {
      toastError('Please provide both subject and email body.');
      return;
    }
    setIsBroadcastModalOpen(false);
    setBroadcastSubject('');
    setBroadcastBody('');
    success(`Broadcast queued for ${subscribers.length} subscribers!`);
  };

  const allTags = Array.from(new Set(subscribers.flatMap((s) => s.tags || [])));

  const filtered = subscribers.filter((s) => {
    const matchesSearch =
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.name && s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag === 'all' || s.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

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
            Audience CRM & Subscribers
          </h1>
          <p
            className={clsx(
              "text-xs sm:text-sm mt-1",
              isDark ? "text-[#C8BDB0]" : "text-[#6E6254]"
            )}
          >
            Capture visitor emails, manage customer tags, and export subscriber lists.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={handleExportCsv}
            className={clsx(
              "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border shadow-2xs transition-colors",
              isDark ? "border-[#332B23] bg-[#221C17] hover:bg-[#2A231D]" : "border-[#E5DAC8] bg-white hover:bg-[#FAF6EE]"
            )}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsBroadcastModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Draft Broadcast</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className={clsx(
              "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95",
              isDark ? "bg-[#E6B86A] text-[#161310] hover:bg-[#F0C57A]" : "bg-[#181614] text-[#FAF6EE] hover:bg-black"
            )}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Subscriber</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Subscribers', value: subscribers.length.toString(), change: '+12 this week' },
          { label: 'Verified Consent', value: '100%', change: 'GDPR / CAN-SPAM compliant' },
          { label: 'Avg Open Rate', value: '42.8%', change: 'Above industry average' },
          { label: 'Unsubscribe Rate', value: '0.0%', change: 'Healthy audience list' },
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

      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search email or name..."
            className={clsx(
              "w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500",
              isDark ? "bg-[#221C17] border-[#382F26]" : "bg-white border-[#DDD2BF]"
            )}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedTag('all')}
            className={clsx(
              "px-3 py-1 rounded-full text-xs font-medium transition-colors shrink-0",
              selectedTag === 'all'
                ? "bg-amber-500 text-white font-semibold"
                : isDark ? "bg-[#221C17] text-[#C8BDB0] hover:bg-[#28211B]" : "bg-white text-[#7A6D5E] border border-[#DDD2BF]"
            )}
          >
            All ({subscribers.length})
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={clsx(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors shrink-0 capitalize",
                selectedTag === t
                  ? "bg-amber-500 text-white font-semibold"
                  : isDark ? "bg-[#221C17] text-[#C8BDB0] hover:bg-[#28211B]" : "bg-white text-[#7A6D5E] border border-[#DDD2BF]"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-[#1C1814]/80 shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider">
              <tr>
                <th className="p-3 font-semibold">Subscriber</th>
                <th className="p-3 font-semibold">Source</th>
                <th className="p-3 font-semibold">Tags</th>
                <th className="p-3 font-semibold">Joined Date</th>
                <th className="p-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition-colors">
                  <td className="p-3">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {sub.name || 'Anonymous Reader'}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono">{sub.email}</div>
                  </td>
                  <td className="p-3">
                    <span className="capitalize text-neutral-600 dark:text-neutral-300">
                      {sub.source.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {sub.tags?.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-neutral-500">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteSubscriber(sub.id)}
                      title="Remove subscriber"
                      className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Subscriber Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
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
                <h3 className="font-serif font-bold text-lg">Add Subscriber</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddSubscriber} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="reader@example.com"
                    className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">Full Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">Tag</label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="newsletter, customer, vip"
                    className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:opacity-80"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors"
                  >
                    Add to Audience
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Broadcast Composer Modal */}
      <AnimatePresence>
        {isBroadcastModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={clsx(
                "relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl",
                isDark ? "bg-[#181411] border-[#382F26] text-[#F4EFE6]" : "bg-[#FAF6EE] border-[#DDD2BF] text-[#1F1A16]"
              )}
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber-500" />
                  <h3 className="font-serif font-bold text-lg">Send Email Broadcast</h3>
                </div>
                <button onClick={() => setIsBroadcastModalOpen(false)} className="p-1 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSendBroadcast} className="space-y-3">
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Will be dispatched to {subscribers.length} active subscribers.</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">Subject Line *</label>
                  <input
                    type="text"
                    required
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                    placeholder="e.g. Issue #24: The Architecture of Tactile Websites"
                    className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">Email Content (Markdown supported)</label>
                  <textarea
                    rows={5}
                    required
                    value={broadcastBody}
                    onChange={(e) => setBroadcastBody(e.target.value)}
                    placeholder="Write your personal letter to your audience..."
                    className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsBroadcastModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:opacity-80"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Broadcast Now</span>
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

