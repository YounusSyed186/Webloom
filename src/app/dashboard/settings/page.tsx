'use client';

import React, { useState } from 'react';
import { Settings, Shield, Globe, AlertTriangle, Trash2, Eye, EyeOff, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';

export default function SettingsPage() {
  const { profile, updateProfile, togglePublish, deleteAccount, seedDemoData } = useApp();
  const { success, info } = useToast();

  const [customDomain, setCustomDomain] = useState(profile.customDomain || '');
  const [enableSeoIndex, setEnableSeoIndex] = useState(profile.seoIndexing !== false);
  const [isPublished, setIsPublished] = useState(profile.isPublished !== false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSaveDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDomain.trim()) return;
    updateProfile({ customDomain: customDomain.trim().toLowerCase() });
    success('Custom domain saved!', 'Add a CNAME DNS record pointing to cname.webloom.site');
  };

  const handleToggleSeo = (checked: boolean) => {
    setEnableSeoIndex(checked);
    updateProfile({ seoIndexing: checked });
    success(checked ? 'SEO indexing enabled' : 'SEO indexing disabled');
  };

  const handleTogglePublish = (checked: boolean) => {
    setIsPublished(checked);
    togglePublish(checked);
    success(checked ? 'Webloom published live!' : 'Webloom is now private (draft mode)');
  };

  const handleSeedDemo = () => {
    setIsSeeding(true);
    setTimeout(() => {
      seedDemoData();
      setIsSeeding(false);
      success('Sample Data Seeded!', 'Your Webloom is populated with 6 showcase links, 4 projects, socials, and 30-day analytics.');
    }, 400);
  };

  const handleDeleteConfirm = () => {
    deleteAccount();
    setIsDeletingAccount(false);
    success('Account and all associated links successfully deleted.');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Account & Platform Settings</h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Configure security, SEO discovery, custom domains, and platform preferences for your Webloom.
        </p>
      </div>

      {/* 1. Account Security & Plan */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#A78BFA]" />
          <h3 className="text-sm font-semibold text-white">Account & Authentication</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <Input
            label="Email Address"
            readOnly
            value={profile.email || 'demo@webloom.site'}
            disabled
            hint="Connected via Webloom / Supabase Auth"
          />
          <Input
            label="Current Username"
            readOnly
            value={`@${profile.username}`}
            disabled
            hint="Public link: webloom.site/yourname"
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 mt-2">
          <div>
            <span className="text-xs font-semibold text-white block">Webloom Pro Creator Plan</span>
            <span className="text-[11px] text-zinc-400">Unlimited links, custom themes, portfolio blocks, and full analytics telemetry</span>
          </div>
          <span className="text-xs font-semibold text-[#A78BFA] bg-[#A78BFA]/10 border border-[#A78BFA]/20 px-3 py-1 rounded-full">
            Active
          </span>
        </div>
      </div>

      {/* 2. Seed / Sample Showcase Data */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-900/80 via-zinc-900/40 to-[#161324]/50 border border-[#A78BFA]/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#A78BFA]" />
            <h3 className="text-sm font-semibold text-white">Demo Account & Sample Data</h3>
          </div>
          <span className="text-[11px] font-mono text-[#A78BFA] uppercase tracking-wider bg-[#A78BFA]/10 border border-[#A78BFA]/20 px-2.5 py-0.5 rounded-full">
            Instant Seed
          </span>
        </div>
        <p className="text-xs text-zinc-400">
          Populate your account with 6 realistic showcase links, 4 portfolio projects, custom social channels, 30 days of analytics graphs, and activity history.
        </p>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950/70 border border-white/[0.08]">
          <div className="space-y-0.5">
            <span className="text-xs font-medium text-white block">Seed Webloom Sample Data</span>
            <span className="text-[11px] text-zinc-400">Instantly restores portfolio projects, curated links, and click telemetry</span>
          </div>
          <Button
            size="sm"
            onClick={handleSeedDemo}
            disabled={isSeeding}
            className="gap-2 bg-[#A78BFA] hover:bg-[#906EF7] text-zinc-950 font-medium"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
            <span>{isSeeding ? 'Seeding...' : 'Seed Sample Data'}</span>
          </Button>
        </div>
      </div>

      {/* 3. Profile Visibility & Publish Toggle */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
        <div className="flex items-center gap-2">
          {isPublished ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-zinc-400" />}
          <h3 className="text-sm font-semibold text-white">Profile Visibility Status</h3>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800">
          <div>
            <span className="text-xs font-semibold text-white block">
              {isPublished ? 'Live on Public Web' : 'Private / Draft Mode'}
            </span>
            <span className="text-[11px] text-zinc-400">
              {isPublished 
                ? 'Your public Webloom is active and accessible to anyone via your handle URL.' 
                : 'Your Webloom is unlisted and visitors will see a private message.'}
            </span>
          </div>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={e => handleTogglePublish(e.target.checked)}
            className="w-5 h-5 rounded text-[#A78BFA] focus:ring-[#A78BFA] bg-zinc-800 border-zinc-700 cursor-pointer"
          />
        </div>
      </div>

      {/* 4. Custom Domain Configuration */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-white">Custom Domain Mapping</h3>
        </div>
        <p className="text-xs text-zinc-400">
          Connect your custom domain (e.g. <code className="font-mono text-[#A78BFA]">younus.dev</code> or <code className="font-mono text-[#A78BFA]">links.yourbrand.com</code>) to point directly to your Webloom.
        </p>

        <form onSubmit={handleSaveDomain} className="flex flex-col sm:flex-row gap-3 pt-1">
          <div className="flex-1">
            <Input
              placeholder="e.g. links.younus.dev"
              value={customDomain}
              onChange={e => setCustomDomain(e.target.value)}
            />
          </div>
          <Button type="submit" size="md">
            Connect Domain
          </Button>
        </form>
      </div>

      {/* 5. SEO & Discovery */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Search Engine Discovery (SEO)</h3>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800">
          <div>
            <span className="text-xs font-semibold text-white block">Allow Search Engines to Index Profile</span>
            <span className="text-[11px] text-zinc-400">Includes OpenGraph meta tags, sitemap entries, and rich previews</span>
          </div>
          <input
            type="checkbox"
            checked={enableSeoIndex}
            onChange={e => handleToggleSeo(e.target.checked)}
            className="w-5 h-5 rounded text-[#A78BFA] focus:ring-[#A78BFA] bg-zinc-800 border-zinc-700 cursor-pointer"
          />
        </div>
      </div>

      {/* 6. Danger Zone */}
      <div className="p-6 rounded-3xl bg-red-950/20 border border-red-500/20 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <h3 className="text-sm font-semibold text-red-400">Danger Zone</h3>
        </div>
        <p className="text-xs text-zinc-400">
          Permanent actions that affect your digital identity URL, links, and analytics data.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950 border border-red-500/20">
          <div>
            <span className="text-xs font-semibold text-white block">Delete Webloom Profile</span>
            <span className="text-[11px] text-zinc-400">Permanently delete profile data, all link clicks, and analytics logs</span>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsDeletingAccount(true)}
            className="gap-2 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Profile</span>
          </Button>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeletingAccount}
        onClose={() => setIsDeletingAccount(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Account & Profile?"
        message="This action will delete your public profile and cannot be undone. All incoming links and click analytics will be wiped."
        confirmText="Yes, Permanently Delete"
      />
    </div>
  );
}
