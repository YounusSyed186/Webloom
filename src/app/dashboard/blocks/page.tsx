'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Eye,
  EyeOff,
  Pin,
  Clock,
  Sparkles,
  ShoppingBag,
  Mail,
  Calendar,
  Heading,
  Link as LinkIcon,
  Minus,
  Check,
  X
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { LinkedTreeStore } from '@/lib/storage';
import { PageBlock, BlockType } from '@/types';
import { useToast } from '@/components/ui/toast';
import { clsx } from 'clsx';

export default function BlocksManagementPage() {
  const { profile, blocks, setBlocks, addBlock, updateBlock, deleteBlock, reorderBlocks, themeMode } = useApp();
  const { success, error: toastError } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<BlockType>('heading');
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('2026-12-31T23:59');
  const [newPrice, setNewPrice] = useState('999');
  const [newDuration, setNewDuration] = useState('45');
  const [newButtonText, setNewButtonText] = useState('Get Started');
  const isDark = themeMode === 'dark';

  const saveBlocks = (newBlocks: PageBlock[]) => {
    setBlocks(newBlocks);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const copy = [...blocks];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    // re-index sortOrder
    const reindexed = copy.map((b, idx) => ({ ...b, sortOrder: idx }));
    saveBlocks(reindexed);
    success('Block reordered');
  };

  const handleToggleActive = (id: string) => {
    const updated = blocks.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b));
    saveBlocks(updated);
    success('Block visibility updated');
  };

  const handleTogglePinned = (id: string) => {
    const updated = blocks.map((b) => (b.id === id ? { ...b, isPinned: !b.isPinned } : b));
    saveBlocks(updated);
    success('Pin state updated');
  };

  const handleDelete = (id: string) => {
    const updated = blocks.filter((b) => b.id !== id);
    saveBlocks(updated);
    success('Block deleted');
  };

  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() && selectedType !== 'divider') {
      toastError('Please enter a title for the block.');
      return;
    }

    const config: Record<string, any> = {};
    if (selectedType === 'countdown') {
      config.targetDate = new Date(newTargetDate).toISOString();
      config.buttonText = newButtonText || 'Learn More';
    } else if (selectedType === 'product') {
      config.priceInr = Number(newPrice) || 499;
      config.currency = 'INR';
      config.badge = 'Special Offer';
    } else if (selectedType === 'booking') {
      config.durationMinutes = Number(newDuration) || 30;
      config.priceInr = Number(newPrice) || 999;
      config.currency = 'INR';
    } else if (selectedType === 'newsletter') {
      config.placeholder = 'Enter your email...';
      config.buttonText = newButtonText || 'Subscribe';
    }

    addBlock({
      blockType: selectedType,
      title: selectedType === 'divider' ? 'Divider' : newTitle.trim(),
      subtitle: newSubtitle.trim(),
      config,
      sortOrder: blocks.length,
      isActive: true,
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewSubtitle('');
    success(`Added ${selectedType} block!`);
  };

  const getBlockTypeIcon = (type: BlockType) => {
    switch (type) {
      case 'heading': return <Heading className="w-4 h-4 text-amber-500" />;
      case 'product': return <ShoppingBag className="w-4 h-4 text-emerald-500" />;
      case 'countdown': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'newsletter': return <Mail className="w-4 h-4 text-blue-500" />;
      case 'booking': return <Calendar className="w-4 h-4 text-purple-500" />;
      case 'divider': return <Minus className="w-4 h-4 text-neutral-400" />;
      default: return <LinkIcon className="w-4 h-4 text-neutral-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className={clsx(
              "font-serif text-2xl sm:text-3xl font-bold tracking-tight",
              isDark ? "text-[#F4EFE6]" : "text-[#1F1A16]"
            )}
          >
            Modular Page Blocks
          </h1>
          <p
            className={clsx(
              "text-xs sm:text-sm mt-1",
              isDark ? "text-[#C8BDB0]" : "text-[#6E6254]"
            )}
          >
            Combine products, email capture, countdowns, bookings, and headings in any order.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className={clsx(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 shrink-0 self-start sm:self-auto",
            isDark
              ? "bg-[#E6B86A] text-[#161310] hover:bg-[#F0C57A]"
              : "bg-[#181614] text-[#FAF6EE] hover:bg-black"
          )}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Block</span>
        </button>
      </div>

      {/* Block List */}
      <div className="space-y-3">
        {blocks.length === 0 ? (
          <div
            className={clsx(
              "p-8 rounded-2xl border text-center flex flex-col items-center justify-center gap-2",
              isDark ? "border-[#332B23] bg-[#181411]/40" : "border-[#EAE2D3] bg-[#F6F0E4]/40"
            )}
          >
            <Sparkles className="w-8 h-8 text-amber-500/60 mb-1" />
            <h3 className={clsx("font-serif font-bold text-base", isDark ? "text-[#F4EFE6]" : "text-[#1F1A16]")}>
              No modular blocks yet
            </h3>
            <p className={clsx("text-xs max-w-xs", isDark ? "text-[#A89B8C]" : "text-[#7A6E60]")}>
              Add product cards, email waitlists, countdown timers, or headings to elevate your Webloom page.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-3 px-4 py-2 rounded-full text-xs font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors"
            >
              Add First Block
            </button>
          </div>
        ) : (
          blocks.map((block, idx) => (
            <motion.div
              key={block.id}
              layout
              className={clsx(
                "p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors shadow-2xs",
                isDark
                  ? "border-[#332B23] bg-[#1C1814]/80 text-[#F4EFE6]"
                  : "border-[#EAE2D3] bg-white text-[#1F1A16]",
                !block.isActive && "opacity-50"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={clsx(
                    "p-2.5 rounded-lg border shrink-0",
                    isDark ? "border-[#382F26] bg-[#241E19]" : "border-[#E8DFD1] bg-[#F9F5EC]"
                  )}
                >
                  {getBlockTypeIcon(block.blockType)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={clsx(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                        isDark ? "border-[#44382C] text-[#C8BDB0]" : "border-[#E0D4C2] text-[#7A6D5E]"
                      )}
                    >
                      {block.blockType}
                    </span>
                    {block.isPinned && (
                      <span className="text-[10px] font-semibold text-amber-500 flex items-center gap-0.5">
                        <Pin className="w-3 h-3" /> Pinned
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-sm truncate mt-1">
                    {block.title || 'Untitled Block'}
                  </h4>
                  {block.subtitle && (
                    <p className={clsx("text-xs truncate", isDark ? "text-[#A89B8C]" : "text-[#7A6E60]")}>
                      {block.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  title="Move Up"
                  className={clsx(
                    "p-1.5 rounded-lg border transition-colors disabled:opacity-30",
                    isDark ? "border-[#332B23] hover:bg-[#28211B]" : "border-[#EAE2D3] hover:bg-[#FAF6EE]"
                  )}
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === blocks.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  title="Move Down"
                  className={clsx(
                    "p-1.5 rounded-lg border transition-colors disabled:opacity-30",
                    isDark ? "border-[#332B23] hover:bg-[#28211B]" : "border-[#EAE2D3] hover:bg-[#FAF6EE]"
                  )}
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleTogglePinned(block.id)}
                  title={block.isPinned ? "Unpin block" : "Pin block to top"}
                  className={clsx(
                    "p-1.5 rounded-lg border transition-colors",
                    block.isPinned
                      ? "border-amber-400 text-amber-500 bg-amber-50/10"
                      : isDark ? "border-[#332B23] hover:bg-[#28211B]" : "border-[#EAE2D3] hover:bg-[#FAF6EE]"
                  )}
                >
                  <Pin className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleActive(block.id)}
                  title={block.isActive ? "Hide block" : "Show block"}
                  className={clsx(
                    "p-1.5 rounded-lg border transition-colors",
                    isDark ? "border-[#332B23] hover:bg-[#28211B]" : "border-[#EAE2D3] hover:bg-[#FAF6EE]"
                  )}
                >
                  {block.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(block.id)}
                  title="Delete block"
                  className="p-1.5 rounded-lg border border-red-200 dark:border-red-900/40 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Block Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={clsx(
                "relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl overflow-hidden",
                isDark
                  ? "bg-[#181411] border-[#382F26] text-[#F4EFE6]"
                  : "bg-[#FAF6EE] border-[#DDD2BF] text-[#1F1A16]"
              )}
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-4">
                <h3 className="font-serif font-bold text-lg">Add New Modular Block</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Block Type Picker */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { type: 'heading', label: 'Heading', icon: Heading },
                  { type: 'product', label: 'Product Card', icon: ShoppingBag },
                  { type: 'countdown', label: 'Countdown', icon: Clock },
                  { type: 'newsletter', label: 'Newsletter', icon: Mail },
                  { type: 'booking', label: 'Booking', icon: Calendar },
                  { type: 'divider', label: 'Divider', icon: Minus },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSel = selectedType === item.type;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setSelectedType(item.type as BlockType)}
                      className={clsx(
                        "p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-medium transition-all",
                        isSel
                          ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold"
                          : isDark
                          ? "border-[#332B23] bg-[#221C17] hover:bg-[#28211B]"
                          : "border-[#E5DAC8] bg-white hover:bg-[#F5ECE0]"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic form inputs based on selectedType */}
              <form onSubmit={handleCreateBlock} className="space-y-3">
                {selectedType !== 'divider' && (
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-80">
                      Block Title
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Next.js SaaS Boilerplate, Limited Drop, etc."
                      className={clsx(
                        "w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500",
                        isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]"
                      )}
                    />
                  </div>
                )}

                {selectedType !== 'divider' && (
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-80">
                      Subtitle / Description
                    </label>
                    <input
                      type="text"
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      placeholder="Optional supportive description"
                      className={clsx(
                        "w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500",
                        isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]"
                      )}
                    />
                  </div>
                )}

                {selectedType === 'countdown' && (
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-80">
                      Target Expiry Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={newTargetDate}
                      onChange={(e) => setNewTargetDate(e.target.value)}
                      className={clsx(
                        "w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500",
                        isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]"
                      )}
                    />
                  </div>
                )}

                {(selectedType === 'product' || selectedType === 'booking') && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold mb-1 opacity-80">
                        Price (INR ₹)
                      </label>
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className={clsx(
                          "w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500",
                          isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]"
                        )}
                      />
                    </div>
                    {selectedType === 'booking' && (
                      <div>
                        <label className="block text-xs font-semibold mb-1 opacity-80">
                          Duration (Minutes)
                        </label>
                        <input
                          type="number"
                          value={newDuration}
                          onChange={(e) => setNewDuration(e.target.value)}
                          className={clsx(
                            "w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500",
                            isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]"
                          )}
                        />
                      </div>
                    )}
                  </div>
                )}

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
                    Add Block
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

