'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, Download, MessageCircle } from 'lucide-react';
import { XIcon, LinkedinIcon } from '@/components/ui/icons';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { Profile } from '@/types';
import { useApp } from '@/lib/context/app-context';
import { clsx } from 'clsx';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export function ShareModal({ isOpen, onClose, profile }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const { success } = useToast();
  const { themeMode } = useApp();
  const isDark = themeMode === 'dark';

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${profile.username}`
    : `https://webloom.site/${profile.username}`;

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(publicUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#1F1A16',
          light: '#FAF6EE',
        },
      }).then(url => {
        setQrDataUrl(url);
      }).catch(err => {
        console.error(err);
      });
    }
  }, [isOpen, publicUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    success('Profile link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `${profile.username}-webloom-qr.png`;
    link.click();
    success('QR Code downloaded!');
  };

  const shareToX = () => {
    const text = encodeURIComponent(`Check out my digital portfolio and links on Webloom:`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(publicUrl)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicUrl)}`, '_blank');
  };

  const shareToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out my Webloom: ${publicUrl}`)}`, '_blank');
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Share Your Webloom" maxWidth="md">
      <div className="space-y-5">
        {/* Copy Link Bar */}
        <div>
          <label
            className={clsx(
              "block text-xs font-medium mb-1.5",
              isDark ? "text-[#C8BDB0]" : "text-[#544B41]"
            )}
          >
            Profile URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={publicUrl}
              className={clsx(
                "flex-1 border rounded-xl px-3 py-2 text-xs font-mono select-all focus:outline-none transition-colors",
                isDark
                  ? "bg-[#181411] border-[#3E342A] text-[#F4EFE6]"
                  : "bg-[#F6F0E4] border-[#DACBB4] text-[#1F1A16]"
              )}
            />
            <Button size="sm" onClick={handleCopy} className="gap-1.5 min-w-[90px]">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </Button>
          </div>
        </div>

        {/* QR Code Section */}
        <div
          className={clsx(
            "flex flex-col items-center justify-center p-5 rounded-2xl border transition-colors",
            isDark
              ? "bg-[#181411]/60 border-[#382F26]"
              : "bg-[#F6F0E4]/60 border-[#EAE2D3]"
          )}
        >
          {qrDataUrl ? (
            <div
              className={clsx(
                "p-3 rounded-xl shadow-md mb-3 border",
                isDark ? "bg-[#FAF6EE] border-[#DACBB4]" : "bg-white border-[#E5DEC9]"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="QR Code" className="w-44 h-44 object-contain" />
            </div>
          ) : (
            <div
              className={clsx(
                "w-44 h-44 animate-pulse rounded-xl mb-3",
                isDark ? "bg-[#28211B]" : "bg-[#EAE2D3]"
              )}
            />
          )}
          <Button variant="outline" size="sm" onClick={handleDownloadQr} className="gap-2">
            <Download className="w-3.5 h-3.5" />
            <span>Download High-Res QR Code</span>
          </Button>
        </div>

        {/* Social Share Buttons */}
        <div>
          <label
            className={clsx(
              "block text-xs font-medium mb-2",
              isDark ? "text-[#C8BDB0]" : "text-[#544B41]"
            )}
          >
            Share directly
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={shareToX}
              className={clsx(
                "flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer",
                isDark
                  ? "bg-[#241F1A] hover:bg-[#2F2720] border-[#3E342A] text-[#F4EFE6]"
                  : "bg-[#FAF6EE] hover:bg-[#EFE7DA] border-[#DACBB4] text-[#1F1A16]"
              )}
            >
              <XIcon className="w-3.5 h-3.5 text-sky-500" />
              <span>X (Twitter)</span>
            </button>
            <button
              onClick={shareToLinkedIn}
              className={clsx(
                "flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer",
                isDark
                  ? "bg-[#241F1A] hover:bg-[#2F2720] border-[#3E342A] text-[#F4EFE6]"
                  : "bg-[#FAF6EE] hover:bg-[#EFE7DA] border-[#DACBB4] text-[#1F1A16]"
              )}
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-500" />
              <span>LinkedIn</span>
            </button>
            <button
              onClick={shareToWhatsApp}
              className={clsx(
                "flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer",
                isDark
                  ? "bg-[#241F1A] hover:bg-[#2F2720] border-[#3E342A] text-[#F4EFE6]"
                  : "bg-[#FAF6EE] hover:bg-[#EFE7DA] border-[#DACBB4] text-[#1F1A16]"
              )}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
