'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Link as LinkIcon, Palette, User, FolderGit2, BarChart3, Settings, ExternalLink, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { clsx } from 'clsx';

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { profile, themeMode } = useApp();
  const isDark = themeMode === 'dark';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const items = [
    {
      id: 'overview',
      name: 'Dashboard Overview',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => { router.push('/dashboard'); setIsOpen(false); },
      group: 'Navigation',
    },
    {
      id: 'links',
      name: 'Manage Links',
      icon: <LinkIcon className="w-4 h-4 text-emerald-500" />,
      action: () => { router.push('/dashboard/links'); setIsOpen(false); },
      group: 'Navigation',
    },
    {
      id: 'appearance',
      name: 'Appearance & Themes',
      icon: <Palette className="w-4 h-4 text-rose-500" />,
      action: () => { router.push('/dashboard/appearance'); setIsOpen(false); },
      group: 'Navigation',
    },
    {
      id: 'profile',
      name: 'Edit Profile & Socials',
      icon: <User className="w-4 h-4 text-orange-500" />,
      action: () => { router.push('/dashboard/profile'); setIsOpen(false); },
      group: 'Navigation',
    },
    {
      id: 'projects',
      name: 'Portfolio Projects',
      icon: <FolderGit2 className="w-4 h-4 text-teal-500" />,
      action: () => { router.push('/dashboard/projects'); setIsOpen(false); },
      group: 'Navigation',
    },
    {
      id: 'analytics',
      name: 'View Analytics & Insights',
      icon: <BarChart3 className="w-4 h-4 text-indigo-500" />,
      action: () => { router.push('/dashboard/analytics'); setIsOpen(false); },
      group: 'Navigation',
    },
    {
      id: 'settings',
      name: 'Settings & Account',
      icon: <Settings className="w-4 h-4 text-stone-400" />,
      action: () => { router.push('/dashboard/settings'); setIsOpen(false); },
      group: 'Navigation',
    },
    {
      id: 'public_page',
      name: `View Public Profile (@${profile.username})`,
      icon: <ExternalLink className="w-4 h-4 text-amber-500" />,
      action: () => { window.open(`/${profile.username}`, '_blank'); setIsOpen(false); },
      group: 'Actions',
    },
  ];

  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.group.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className={clsx(
              "relative w-full max-w-lg border rounded-2xl shadow-2xl overflow-hidden z-10 transition-colors duration-200",
              isDark
                ? "bg-[#1E1915] border-[#3E342A] text-[#F4EFE6]"
                : "bg-[#FAF6EE] border-[#DACBB4] text-[#1F1A16]"
            )}
          >
            {/* Search Input */}
            <div
              className={clsx(
                "flex items-center px-4 border-b",
                isDark ? "border-[#332B23]" : "border-[#EAE2D3]"
              )}
            >
              <Search
                className={clsx(
                  "w-4 h-4 mr-2.5",
                  isDark ? "text-[#85796C]" : "text-[#8E8272]"
                )}
              />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search page... (e.g. Links, Appearance)"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className={clsx(
                  "w-full bg-transparent py-3.5 text-sm focus:outline-none",
                  isDark
                    ? "text-[#F4EFE6] placeholder-[#6E6356]"
                    : "text-[#1F1A16] placeholder-[#A49685]"
                )}
              />
              <span
                className={clsx(
                  "text-[10px] font-mono px-1.5 py-0.5 rounded border",
                  isDark
                    ? "text-[#85796C] bg-[#26201B] border-[#3E342A]"
                    : "text-[#8E8272] bg-[#EAE2D3] border-[#DACBB4]"
                )}
              >
                ESC
              </span>
            </div>

            {/* List */}
            <div className="max-h-72 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <p
                  className={clsx(
                    "p-4 text-center text-xs",
                    isDark ? "text-[#85796C]" : "text-[#8E8272]"
                  )}
                >
                  No matching commands found.
                </p>
              ) : (
                filtered.map(item => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={clsx(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors group cursor-pointer",
                      isDark
                        ? "hover:bg-[#28211B] text-[#C8BDB0] hover:text-[#F4EFE6]"
                        : "hover:bg-[#EFE7DA] text-[#544B41] hover:text-[#1F1A16]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={clsx(
                          "p-1.5 rounded-lg transition-colors",
                          isDark ? "bg-[#26201B] group-hover:bg-[#332B23]" : "bg-[#EAE2D3] group-hover:bg-[#DFD5C4]"
                        )}
                      >
                        {item.icon}
                      </div>
                      <span className="text-xs font-medium">
                        {item.name}
                      </span>
                    </div>
                    <span
                      className={clsx(
                        "text-[10px] font-medium px-2 py-0.5 rounded",
                        isDark ? "text-[#85796C] bg-[#241F1A]" : "text-[#8E8272] bg-[#E5DEC9]"
                      )}
                    >
                      {item.group}
                    </span>
                  </button>
                ))
              )}
            </div>

            <div
              className={clsx(
                "flex items-center justify-between px-4 py-2 border-t text-[11px]",
                isDark
                  ? "border-[#332B23] bg-[#181411] text-[#85796C]"
                  : "border-[#EAE2D3] bg-[#F6F0E4] text-[#8E8272]"
              )}
            >
              <span>Navigate with quick shortcuts</span>
              <span>Press <kbd className="font-mono font-semibold">⌘K</kbd> anytime</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
