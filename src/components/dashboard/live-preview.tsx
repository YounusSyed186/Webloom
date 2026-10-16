'use client';

import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Smartphone, Tablet, Monitor, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { ProfileRenderer } from '@/components/profile/profile-renderer';
import { useToast } from '@/components/ui/toast';

export function LivePreview() {
  const { profile, links, socialLinks, projects, appearance } = useApp();
  const { success } = useToast();
  const [copied, setCopied] = useState(false);
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet'>('mobile');

  const publicUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/${profile.username}`
    : `https://webloom.site/${profile.username}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    success('Public profile URL copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const openPublic = () => {
    window.open(`/${profile.username}`, '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950/60 border-l border-zinc-800/80 p-6 overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">Live Preview</span>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              deviceMode === 'mobile' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Mobile preview"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              deviceMode === 'tablet' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Compact preview"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* URL pill bar */}
      <div className="flex items-center justify-between bg-zinc-900/80 border border-zinc-800 rounded-xl px-3 py-1.5 mb-6 text-xs">
        <span className="text-zinc-400 truncate max-w-[190px] font-mono text-[11px]">
          /{profile.username}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={copyUrl}
            className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
            title="Copy URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={openPublic}
            className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Phone Simulator Frame */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div
          className={`transition-all duration-300 relative rounded-[40px] border-[6px] border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden flex flex-col ${
            deviceMode === 'mobile' ? 'w-[320px] h-[640px]' : 'w-[380px] h-[640px]'
          }`}
        >
          {/* Speaker / Dynamic island notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-zinc-800 rounded-full z-20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-zinc-900 mr-2" />
            <div className="w-8 h-1 rounded-full bg-zinc-900" />
          </div>

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto pt-6 scrollbar-none">
            <ProfileRenderer
              profile={profile}
              links={links}
              socialLinks={socialLinks}
              projects={projects}
              appearance={appearance}
              isPreview={true}
              onShareClick={copyUrl}
            />
          </div>

          {/* Home indicator bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full z-20 pointer-events-none" />
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-[11px] text-zinc-500">
          Edits update in real time • Instant autosave enabled
        </p>
      </div>
    </div>
  );
}
