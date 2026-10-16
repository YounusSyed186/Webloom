'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Eye, 
  MousePointerClick, 
  TrendingUp, 
  Users, 
  Copy, 
  Check, 
  Plus, 
  Palette, 
  User, 
  FolderGit2, 
  BarChart3, 
  Sparkles,
  ArrowUpRight,
  Clock,
  Share2,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { ShareModal } from '@/components/sharing/share-modal';

export default function DashboardOverviewPage() {
  const { profile, links, projects, analytics, activityLogs } = useApp();
  const { success } = useToast();
  const [copied, setCopied] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${profile.username}`
    : `https://webloom.site/${profile.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    success('Public profile link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate real profile completion percentage
  let completion = 0;
  if (profile.displayName && profile.displayName.trim().length > 0) completion += 15;
  if (profile.username && profile.username.trim().length > 0) completion += 15;
  if (profile.avatar && profile.avatar.trim().length > 0) completion += 15;
  if (profile.bio && profile.bio.trim().length > 0) completion += 15;
  if (links.length > 0) completion += 20;
  if (projects.length > 0) completion += 20;

  const stats = [
    {
      label: 'Profile Views',
      value: analytics.profileViews.toLocaleString(),
      change: analytics.viewsChange || '+0%',
      trend: 'up',
      icon: Eye,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      label: 'Total Link Clicks',
      value: analytics.linkClicks.toLocaleString(),
      change: analytics.clicksChange || '+0%',
      trend: 'up',
      icon: MousePointerClick,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
    },
    {
      label: 'Average CTR',
      value: `${analytics.clickThroughRate}%`,
      change: analytics.ctrChange || '+0%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      label: 'Network Reach',
      value: analytics.followersCount.toLocaleString(),
      change: '+100%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
  ];

  const quickActions = [
    { label: 'Add New Link', href: '/dashboard/links', icon: Plus, color: 'bg-blue-600 hover:bg-blue-500' },
    { label: 'Edit Profile', href: '/dashboard/profile', icon: User, color: 'bg-zinc-800 hover:bg-zinc-700' },
    { label: 'Appearance', href: '/dashboard/appearance', icon: Palette, color: 'bg-zinc-800 hover:bg-zinc-700' },
    { label: 'Add Project', href: '/dashboard/projects', icon: FolderGit2, color: 'bg-zinc-800 hover:bg-zinc-700' },
    { label: 'View Analytics', href: '/dashboard/analytics', icon: BarChart3, color: 'bg-zinc-800 hover:bg-zinc-700' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Profile Completion Banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white">Your Profile is {completion}% Complete</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              completion >= 80 
                ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30'
                : 'text-amber-400 bg-amber-500/15 border-amber-500/30'
            }`}>
              {completion >= 80 ? 'Optimal' : 'In Progress'}
            </span>
          </div>
          <div className="w-full max-w-md h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completion}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
            />
          </div>
        </div>
        <Link href="/dashboard/profile">
          <Button variant="secondary" size="sm">
            {completion < 100 ? 'Complete Profile' : 'Edit Profile'}
          </Button>
        </Link>
      </motion.div>

      {/* 2. Public Profile Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950/40 via-zinc-900/90 to-zinc-900 border border-blue-500/20 p-6 sm:p-8 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your Digital Identity Hub</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>@{profile.username}</span>
              {profile.verified && (
                <CheckCircle2 className="w-5 h-5 text-blue-400 fill-blue-400/20" />
              )}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-mono">
              {publicUrl}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button variant="primary" size="sm" onClick={handleCopy} className="gap-2">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setIsShareOpen(true)} className="gap-2">
              <Share2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Share</span>
            </Button>
            <a href={`/${profile.username}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <span>Open Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>
        </div>
      </motion.div>

      {/* 3. Quick Stats Bento */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          Performance Overview (Last 30 Days)
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="p-4 sm:p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700/80 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.border} border`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {stat.change}
                  </span>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. Quick Actions Grid */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href}>
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 transition-all flex flex-col items-center text-center gap-2 group cursor-pointer">
                  <div className={`p-2.5 rounded-xl text-white ${action.color} transition-transform group-hover:scale-110 shadow-md`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-zinc-200 group-hover:text-white">
                    {action.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 5. Real Recent Activity Feed */}
      <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800/80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-400" />
            <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
          </div>
          <Link href="/dashboard/analytics" className="text-xs text-blue-400 hover:underline">
            View Full Analytics
          </Link>
        </div>

        {activityLogs.length === 0 ? (
          <p className="text-xs text-zinc-500 py-4 text-center">No recent activity logged yet.</p>
        ) : (
          <div className="divide-y divide-zinc-800/60">
            {activityLogs.slice(0, 5).map((activity) => (
              <div key={activity.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'link' ? 'bg-indigo-400' :
                    activity.type === 'project' ? 'bg-emerald-400' :
                    activity.type === 'theme' ? 'bg-pink-400' :
                    activity.type === 'publish' ? 'bg-purple-400' : 'bg-blue-400'
                  }`} />
                  <span className="text-zinc-200">{activity.title}</span>
                </div>
                <span className="text-zinc-500 text-[11px] font-mono">{activity.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        profile={profile}
      />
    </div>
  );
}
