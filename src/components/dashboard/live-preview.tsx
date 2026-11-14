'use client';

import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Smartphone, Tablet, Monitor } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { ProfileRenderer } from '@/components/profile/profile-renderer';
import { LinkedTreeStore } from '@/lib/storage';
import { useToast } from '@/components/ui/toast';
import { clsx } from 'clsx';

export function LivePreview() {
  const { profile, links, blocks, products, services, socialLinks, projects, appearance, themeMode } = useApp();
  const { success } = useToast();
  const [copied, setCopied] = useState(false);
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const isDark = themeMode === 'dark';

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
    <div
      className={clsx(
        "flex flex-col h-full border-l p-4 sm:p-6 overflow-hidden transition-colors duration-200",
        isDark
          ? "bg-[#181411]/60 border-[#332B23]"
          : "bg-[#F6F0E4]/60 border-[#EAE2D3]"
      )}
    >
      {/* Header bar */}
      <div
        className={clsx(
          "flex items-center justify-between pb-3.5 mb-3.5 border-b transition-colors",
          isDark ? "border-[#332B23]" : "border-[#EAE2D3]"
        )}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span
            className={clsx(
              "text-xs font-semibold tracking-wider uppercase",
              isDark ? "text-[#C8BDB0]" : "text-[#6E6254]"
            )}
          >
            Live Preview
          </span>
        </div>

        {/* Device Switcher (Mobile, Tablet, Desktop) */}
        <div
          className={clsx(
            "flex items-center border rounded-lg p-0.5",
            isDark ? "bg-[#221C17] border-[#382F26]" : "bg-[#EAE2D3] border-[#DACBB4]"
          )}
        >
          <button
            onClick={() => setDeviceMode('mobile')}
            className={clsx(
              "p-1.5 rounded-md text-xs transition-colors cursor-pointer",
              deviceMode === 'mobile'
                ? isDark
                  ? "bg-[#332B23] text-[#F4EFE6] shadow-xs"
                  : "bg-[#FAF6EE] text-[#1F1A16] shadow-xs"
                : isDark
                ? "text-[#85796C] hover:text-[#C8BDB0]"
                : "text-[#8E8272] hover:text-[#1F1A16]"
            )}
            title="Mobile phone view"
            aria-label="Switch to Mobile phone preview"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={clsx(
              "p-1.5 rounded-md text-xs transition-colors cursor-pointer",
              deviceMode === 'tablet'
                ? isDark
                  ? "bg-[#332B23] text-[#F4EFE6] shadow-xs"
                  : "bg-[#FAF6EE] text-[#1F1A16] shadow-xs"
                : isDark
                ? "text-[#85796C] hover:text-[#C8BDB0]"
                : "text-[#8E8272] hover:text-[#1F1A16]"
            )}
            title="Tablet view"
            aria-label="Switch to Tablet preview"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode('desktop')}
            className={clsx(
              "p-1.5 rounded-md text-xs transition-colors cursor-pointer",
              deviceMode === 'desktop'
                ? isDark
                  ? "bg-[#332B23] text-[#F4EFE6] shadow-xs"
                  : "bg-[#FAF6EE] text-[#1F1A16] shadow-xs"
                : isDark
                ? "text-[#85796C] hover:text-[#C8BDB0]"
                : "text-[#8E8272] hover:text-[#1F1A16]"
            )}
            title="PC / Desktop view"
            aria-label="Switch to PC Desktop preview"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* URL pill bar */}
      <div
        className={clsx(
          "flex items-center justify-between border rounded-xl px-3 py-1.5 mb-4 text-xs transition-colors",
          isDark
            ? "bg-[#221C17] border-[#382F26] text-[#A89F91]"
            : "bg-[#FAF6EE] border-[#EAE2D3] text-[#6E6254]"
        )}
      >
        <span className="truncate max-w-[190px] font-mono text-[11px]">
          /{profile.username}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={copyUrl}
            className={clsx(
              "p-1 rounded transition-colors cursor-pointer",
              isDark
                ? "text-[#A89F91] hover:text-[#F4EFE6] hover:bg-[#2C241E]"
                : "text-[#6E6254] hover:text-[#1F1A16] hover:bg-[#EAE2D3]"
            )}
            title="Copy URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={openPublic}
            className={clsx(
              "p-1 rounded transition-colors cursor-pointer",
              isDark
                ? "text-[#A89F91] hover:text-[#F4EFE6] hover:bg-[#2C241E]"
                : "text-[#6E6254] hover:text-[#1F1A16] hover:bg-[#EAE2D3]"
            )}
            title="Open in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Responsive Device Simulator Frame */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div
          className={clsx(
            "transition-all duration-300 relative shadow-2xl overflow-hidden flex flex-col",
            deviceMode === 'mobile' 
              ? 'w-[320px] sm:w-[350px] h-[640px] rounded-[40px] border-[6px]' 
              : deviceMode === 'tablet' 
              ? 'w-[480px] h-[640px] rounded-[28px] border-[6px]'
              : 'w-full max-w-[660px] h-[640px] rounded-[20px] border-[4px]',
            isDark
              ? "border-[#2E2721] bg-[#161310] shadow-black/50"
              : "border-[#DDD2BF] bg-[#FAF6EE] shadow-stone-800/10"
          )}
        >
          {/* Header notch or Browser Chrome */}
          {deviceMode !== 'desktop' ? (
            <div
              className={clsx(
                "absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full z-20 flex items-center justify-center pointer-events-none",
                isDark ? "bg-[#2E2721]" : "bg-[#DDD2BF]"
              )}
            >
              <div
                className={clsx(
                  "w-3 h-3 rounded-full mr-2",
                  isDark ? "bg-[#181411]" : "bg-[#C4B7A0]"
                )}
              />
              <div
                className={clsx(
                  "w-8 h-1 rounded-full",
                  isDark ? "bg-[#181411]" : "bg-[#C4B7A0]"
                )}
              />
            </div>
          ) : (
            <div
              className={clsx(
                "w-full h-7 px-3 flex items-center gap-1.5 border-b select-none z-20",
                isDark ? "bg-[#241F1A] border-[#382F26]" : "bg-[#EAE2D3] border-[#DACBB4]"
              )}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <div
                className={clsx(
                  "mx-auto text-[10px] font-mono px-3 py-0.5 rounded-md max-w-xs truncate opacity-70",
                  isDark ? "bg-[#181411] text-[#A89F91]" : "bg-[#FAF6EE] text-[#6E6254]"
                )}
              >
                webloom.site/{profile.username}
              </div>
            </div>
          )}

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto pt-4 scrollbar-none">
            <ProfileRenderer
              profile={profile}
              links={links}
              blocks={blocks}
              products={products}
              services={services}
              socialLinks={socialLinks}
              projects={projects}
              appearance={appearance}
              isPreview
            />
          </div>
        </div>
      </div>
    </div>
  );
}
