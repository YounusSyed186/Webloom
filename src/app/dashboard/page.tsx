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
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { ShareModal } from '@/components/sharing/share-modal';
import { clsx } from 'clsx';

export default function DashboardOverviewPage() {
  const { profile, links, projects, analytics, activityLogs, themeMode } = useApp();
  const { success } = useToast();
  const [copied, setCopied] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const isDark = themeMode === 'dark';

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
      icon: Eye,
      color: isDark ? 'text-[#E6B86A]' : 'text-[#967137]',
      bg: isDark ? 'bg-[#2E241B]' : 'bg-[#EAE2D3]',
      border: isDark ? 'border-[#44382E]' : 'border-[#DACBB4]',
    },
    {
      label: 'Total Link Clicks',
      value: analytics.linkClicks.toLocaleString(),
      change: analytics.clicksChange || '+0%',
      icon: MousePointerClick,
      color: isDark ? 'text-[#F29D7A]' : 'text-[#B2533E]',
      bg: isDark ? 'bg-[#2E1E1A]' : 'bg-[#F5E2DC]',
      border: isDark ? 'border-[#4A322C]' : 'border-[#E5C2BA]',
    },
    {
      label: 'Average CTR',
      value: `${analytics.clickThroughRate}%`,
      change: analytics.ctrChange || '+0%',
      icon: TrendingUp,
      color: isDark ? 'text-[#87B99B]' : 'text-[#48735A]',
      bg: isDark ? 'bg-[#1C2820]' : 'bg-[#E2EDE5]',
      border: isDark ? 'border-[#2E4235]' : 'border-[#C4DAC9]',
    },
    {
      label: 'Network Reach',
      value: analytics.followersCount.toLocaleString(),
      change: '+100%',
      icon: Users,
      color: isDark ? 'text-[#C4A9D8]' : 'text-[#7A5B96]',
      bg: isDark ? 'bg-[#282030]' : 'bg-[#EFE8F5]',
      border: isDark ? 'border-[#423450]' : 'border-[#D9CDE3]',
    },
  ];

  const quickActions = [
    {
      label: 'Add New Link',
      href: '/dashboard/links',
      icon: Plus,
      color: isDark ? 'bg-[#E6B86A] text-[#181410]' : 'bg-[#1F1A16] text-[#FAF6EE]',
    },
    {
      label: 'Edit Profile',
      href: '/dashboard/profile',
      icon: User,
      color: isDark ? 'bg-[#28211B] text-[#F4EFE6]' : 'bg-[#EAE2D3] text-[#1F1A16]',
    },
    {
      label: 'Appearance',
      href: '/dashboard/appearance',
      icon: Palette,
      color: isDark ? 'bg-[#28211B] text-[#F4EFE6]' : 'bg-[#EAE2D3] text-[#1F1A16]',
    },
    {
      label: 'Add Project',
      href: '/dashboard/projects',
      icon: FolderGit2,
      color: isDark ? 'bg-[#28211B] text-[#F4EFE6]' : 'bg-[#EAE2D3] text-[#1F1A16]',
    },
    {
      label: 'View Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      color: isDark ? 'bg-[#28211B] text-[#F4EFE6]' : 'bg-[#EAE2D3] text-[#1F1A16]',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Profile Completion Banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={clsx(
          "p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors",
          isDark
            ? "bg-[#1E1915] border-[#382F26]"
            : "bg-[#F6F0E4] border-[#E5DEC9]"
        )}
      >
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold">Your Profile is {completion}% Complete</span>
            <span className={clsx(
              "text-[10px] font-mono px-2 py-0.5 rounded-full border",
              completion >= 80 
                ? isDark
                  ? "text-[#87B99B] bg-[#1C2820] border-[#2E4235]"
                  : "text-[#48735A] bg-[#E2EDE5] border-[#C4DAC9]"
                : isDark
                ? "text-[#E6B86A] bg-[#2E241B] border-[#44382E]"
                : "text-[#967137] bg-[#FAF2E6] border-[#DACBB4]"
            )}>
              {completion >= 80 ? 'Optimal' : 'In Progress'}
            </span>
          </div>
          <div
            className={clsx(
              "w-full max-w-md h-2 rounded-full overflow-hidden",
              isDark ? "bg-[#28211B]" : "bg-[#EAE2D3]"
            )}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completion}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#C89D54] to-[#E6B86A] rounded-full"
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
        className={clsx(
          "relative overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-sm transition-colors",
          isDark
            ? "bg-gradient-to-br from-[#241E18] via-[#1E1915] to-[#181411] border-[#382F26]"
            : "bg-gradient-to-br from-[#FAF6EE] via-[#F6F0E4] to-[#EFE7DA] border-[#E5DEC9]"
        )}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div
              className={clsx(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium",
                isDark
                  ? "bg-[#2C241D] border-[#44382E] text-[#E6B86A]"
                  : "bg-[#EFE7DA] border-[#DFD0BC] text-[#865E24]"
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your Digital Identity Hub</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight flex items-center gap-2">
              <span>@{profile.username}</span>
              {profile.verified && (
                <CheckCircle2
                  className={clsx(
                    "w-5 h-5",
                    isDark ? "text-[#E6B86A]" : "text-[#967137]"
                  )}
                />
              )}
            </h2>
            <p
              className={clsx(
                "text-xs sm:text-sm font-mono",
                isDark ? "text-[#A89F91]" : "text-[#6E6254]"
              )}
            >
              {publicUrl}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button variant="primary" size="sm" onClick={handleCopy} className="gap-2">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setIsShareOpen(true)} className="gap-2">
              <Share2 className="w-3.5 h-3.5" />
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
        <h3
          className={clsx(
            "text-xs font-semibold uppercase tracking-wider mb-3",
            isDark ? "text-[#85796C]" : "text-[#8E8272]"
          )}
        >
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
                className={clsx(
                  "p-4 sm:p-5 rounded-2xl border transition-all group shadow-2xs",
                  isDark
                    ? "bg-[#1E1915] border-[#382F26] hover:border-[#4E4135]"
                    : "bg-[#F6F0E4] border-[#E5DEC9] hover:border-[#DACBB4]"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.border} border`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <span
                    className={clsx(
                      "text-[11px] font-semibold px-2 py-0.5 rounded-full border",
                      isDark
                        ? "text-[#87B99B] bg-[#1C2820] border-[#2E4235]"
                        : "text-[#48735A] bg-[#E2EDE5] border-[#C4DAC9]"
                    )}
                  >
                    {stat.change}
                  </span>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                    {stat.value}
                  </div>
                  <div
                    className={clsx(
                      "text-xs mt-1",
                      isDark ? "text-[#85796C]" : "text-[#786E62]"
                    )}
                  >
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
        <h3
          className={clsx(
            "text-xs font-semibold uppercase tracking-wider mb-3",
            isDark ? "text-[#85796C]" : "text-[#8E8272]"
          )}
        >
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href}>
                <div
                  className={clsx(
                    "p-3.5 rounded-2xl border transition-all flex flex-col items-center text-center gap-2 group cursor-pointer shadow-2xs",
                    isDark
                      ? "bg-[#1E1915] border-[#382F26] hover:border-[#4E4135] hover:bg-[#26201B]"
                      : "bg-[#F6F0E4] border-[#E5DEC9] hover:border-[#DACBB4] hover:bg-[#EFE7DA]"
                  )}
                >
                  <div className={`p-2.5 rounded-xl ${action.color} transition-transform group-hover:scale-105 shadow-sm`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={clsx(
                      "text-xs font-medium transition-colors",
                      isDark ? "text-[#C8BDB0] group-hover:text-[#F4EFE6]" : "text-[#544B41] group-hover:text-[#1F1A16]"
                    )}
                  >
                    {action.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 5. Real Recent Activity Feed */}
      <div
        className={clsx(
          "p-5 sm:p-6 rounded-2xl border transition-colors shadow-2xs",
          isDark
            ? "bg-[#1E1915] border-[#382F26]"
            : "bg-[#F6F0E4] border-[#E5DEC9]"
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock
              className={clsx(
                "w-4 h-4",
                isDark ? "text-[#85796C]" : "text-[#8E8272]"
              )}
            />
            <h3 className="text-sm font-serif font-semibold">Recent Activity</h3>
          </div>
          <Link
            href="/dashboard/analytics"
            className={clsx(
              "text-xs hover:underline font-medium",
              isDark ? "text-[#E6B86A]" : "text-[#967137]"
            )}
          >
            View Full Analytics
          </Link>
        </div>

        {activityLogs.length === 0 ? (
          <p
            className={clsx(
              "text-xs py-4 text-center",
              isDark ? "text-[#85796C]" : "text-[#8E8272]"
            )}
          >
            No recent activity logged yet.
          </p>
        ) : (
          <div
            className={clsx(
              "divide-y",
              isDark ? "divide-[#332B23]" : "divide-[#EAE2D3]"
            )}
          >
            {activityLogs.slice(0, 5).map((activity) => (
              <div key={activity.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className={clsx(
                    "w-2 h-2 rounded-full",
                    activity.type === 'link' ? (isDark ? 'bg-[#E6B86A]' : 'bg-[#967137]') :
                    activity.type === 'project' ? 'bg-emerald-500' :
                    activity.type === 'theme' ? 'bg-rose-500' :
                    activity.type === 'publish' ? 'bg-purple-500' : 'bg-amber-500'
                  )} />
                  <span className={isDark ? "text-[#E2D8CC]" : "text-[#3D352E]"}>{activity.title}</span>
                </div>
                <span
                  className={clsx(
                    "text-[11px] font-mono",
                    isDark ? "text-[#85796C]" : "text-[#8E8272]"
                  )}
                >
                  {activity.time}
                </span>
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
