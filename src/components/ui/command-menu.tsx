'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Link as LinkIcon, Palette, User, FolderGit2, BarChart3, Settings, Eye, Plus, Sparkles, ExternalLink } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { profile } = useApp();

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
      icon: <Sparkles className="w-4 h-4 text-blue-400" />,
      action: () => { router.push('/dashboard'); setIsOpen(false); },
      group: 'Navigation',
    },
    {
      id: 'links',
      name: 'Manage Links',
      icon: <LinkIcon className="w-4 h-4 text-indigo-400" />,
      action: () => { router.push('/dashboard/links'); setIsOpen(false); },
      group: 'Navigation',
    },
    {
      id: 'appearance',
      name: 'Appearance & Themes',
      icon: <Palette className="w-4 h-4 text-pink-400" />,
      action: () => { router.push('/dashboard/appearance'); setIsOpen(false); },
      group: 'Navigation',
    },
    {
      id: 'profile',
      name: 'Edit Profile & Socials',
      icon: <User className="w-4 h-4 text-amber-400" />,
      action: () => { router.push('/dashboard/profile'); setIsOpen(false); },
      group: 'Navigation',
    },
    {
      id: 'projects',
      name: 'Portfolio Projects',
      icon: <FolderGit2 className="w-4 h-4 text-emerald-400" />,
      action: () => { router.push('/dashboard/projects'); setIsOpen(false); },
      group: 'Navigation',
    },
    {
      id: 'analytics',
      name: 'View Analytics & Insights',
      icon: <BarChart3 className="w-4 h-4 text-purple-400" />,
      action: () => { router.push('/dashboard/analytics'); setIsOpen(false); },
      group: 'Navigation',
    },
    {
      id: 'settings',
      name: 'Settings & Account',
      icon: <Settings className="w-4 h-4 text-zinc-400" />,
      action: () => { router.push('/dashboard/settings'); setIsOpen(false); },
      group: 'Navigation',
    },
    {
      id: 'public_page',
      name: `View Public Profile (@${profile.username})`,
      icon: <ExternalLink className="w-4 h-4 text-cyan-400" />,
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
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 border-b border-zinc-800/80">
              <Search className="w-4 h-4 text-zinc-400 mr-2.5" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search page... (e.g. Links, Appearance)"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-transparent py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">ESC</span>
            </div>

            {/* List */}
            <div className="max-h-72 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <p className="p-4 text-center text-xs text-zinc-500">No matching commands found.</p>
              ) : (
                filtered.map(item => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-zinc-800/80 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-xs font-medium text-zinc-200 group-hover:text-white">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-zinc-500 bg-zinc-800/60 px-2 py-0.5 rounded">
                      {item.group}
                    </span>
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-800/80 bg-zinc-950/40 text-[11px] text-zinc-500">
              <span>Navigate with quick shortcuts</span>
              <span>Press <kbd className="text-zinc-400 font-mono">⌘K</kbd> anytime</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
