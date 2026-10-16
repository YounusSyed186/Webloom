'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, Download, MessageCircle } from 'lucide-react';
import { XIcon, LinkedinIcon } from '@/components/ui/icons';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { Profile } from '@/types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export function ShareModal({ isOpen, onClose, profile }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const { success } = useToast();

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${profile.username}`
    : `https://linkedtree.com/${profile.username}`;

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(publicUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
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
      <div className="space-y-5 text-zinc-100">
        {/* Copy Link Bar */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Profile URL</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={publicUrl}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 font-mono select-all focus:outline-none"
            />
            <Button size="sm" onClick={handleCopy} className="gap-1.5 min-w-[90px]">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </Button>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center justify-center p-5 bg-zinc-950/60 rounded-2xl border border-zinc-800/80">
          {qrDataUrl ? (
            <div className="p-3 bg-white rounded-xl shadow-lg mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="QR Code" className="w-44 h-44 object-contain" />
            </div>
          ) : (
            <div className="w-44 h-44 bg-zinc-800 animate-pulse rounded-xl mb-3" />
          )}
          <Button variant="outline" size="sm" onClick={handleDownloadQr} className="gap-2">
            <Download className="w-3.5 h-3.5" />
            <span>Download High-Res QR Code</span>
          </Button>
        </div>

        {/* Social Share Buttons */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-2">Share directly</label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={shareToX}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/50 text-xs font-medium text-zinc-200 transition-colors"
            >
              <XIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>X (Twitter)</span>
            </button>
            <button
              onClick={shareToLinkedIn}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/50 text-xs font-medium text-zinc-200 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn</span>
            </button>
            <button
              onClick={shareToWhatsApp}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/50 text-xs font-medium text-zinc-200 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
