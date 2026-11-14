'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  DollarSign,
  TrendingUp,
  ShieldAlert,
  Server,
  Activity,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Zap,
  Lock
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { useToast } from '@/components/ui/toast';
import { clsx } from 'clsx';
import { PlanTier } from '@/types';

interface AdminUser {
  id: string;
  name: string;
  username: string;
  email: string;
  plan: PlanTier;
  status: 'active' | 'suspended' | 'flagged';
  viewsCount: number;
  joinedAt: string;
}

const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr_1',
    name: 'Younus Syed',
    username: 'younus',
    email: 'demo@webloom.site',
    plan: 'agency',
    status: 'active',
    viewsCount: 14280,
    joinedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'usr_2',
    name: 'Elena Rostova',
    username: 'elena',
    email: 'elena.rostova@atelierstudio.art',
    plan: 'pro',
    status: 'active',
    viewsCount: 8940,
    joinedAt: '2026-02-04T12:00:00Z',
  },
  {
    id: 'usr_3',
    name: 'Mira Laurent',
    username: 'mira',
    email: 'mira.laurent@editorialhouse.fr',
    plan: 'business',
    status: 'active',
    viewsCount: 12410,
    joinedAt: '2026-02-18T16:20:00Z',
  },
  {
    id: 'usr_4',
    name: 'Sora Takahashi',
    username: 'sora',
    email: 'sora.takahashi@tokyolab.jp',
    plan: 'pro',
    status: 'active',
    viewsCount: 6810,
    joinedAt: '2026-03-01T09:10:00Z',
  },
  {
    id: 'usr_5',
    name: 'Crypto Pump Alert',
    username: 'fastpump',
    email: 'anon9912@protonmail.com',
    plan: 'free',
    status: 'flagged',
    viewsCount: 120,
    joinedAt: '2026-10-04T18:00:00Z',
  },
  {
    id: 'usr_6',
    name: 'Devon Hayes',
    username: 'devon',
    email: 'devon.hayes@soundwaves.fm',
    plan: 'starter',
    status: 'active',
    viewsCount: 3410,
    joinedAt: '2026-03-22T14:45:00Z',
  },
];

const AUDIT_LOGS = [
  { id: 'aud_1', time: '4 mins ago', event: 'Plan Override', details: 'User @younus upgraded to Agency tier by Superuser', severity: 'info' },
  { id: 'aud_2', time: '18 mins ago', event: 'Payment Webhook', details: 'Razorpay order ORD-2026-0891 confirmed (₹999)', severity: 'success' },
  { id: 'aud_3', time: '42 mins ago', event: 'Content Flag', details: 'Automated filter flagged @fastpump for suspicious financial claims', severity: 'warning' },
  { id: 'aud_4', time: '2 hours ago', event: 'AI Gateway Batch', details: 'Gemini 2.5 Flash processed 42 brand generation requests', severity: 'info' },
  { id: 'aud_5', time: '4 hours ago', event: 'Database Snapshot', details: 'Automated PostgreSQL WAL backup completed in 420ms', severity: 'success' },
];

export default function AdminOverviewPage() {
  const { themeMode } = useApp();
  const { success } = useToast();
  const isDark = themeMode === 'dark';

  const [users, setUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');

  const handlePlanChange = (userId: string, newPlan: PlanTier) => {
    setUsers(users.map(u => u.id === userId ? { ...u, plan: newPlan } : u));
    success(`Updated user subscription tier to ${newPlan.toUpperCase()}`);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'suspended' : 'active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    success('User moderation status updated');
  };

  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === 'all' || u.plan === filterPlan;
    return matchSearch && matchPlan;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Platform Level Metrics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className={clsx("font-serif text-xl sm:text-2xl font-bold tracking-tight", isDark ? "text-[#F4EFE6]" : "text-[#1F1A16]")}>
            Platform Operations & Telemetry
          </h2>
          <span className="text-xs text-neutral-400 font-mono">Live Sync: Active</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {[
            { label: 'Monthly Recurring Revenue', value: '₹84,200', change: '+32.4% MoM', icon: DollarSign },
            { label: 'Total Creators', value: '1,248', change: '+94 this week', icon: Users },
            { label: 'Public Profile Views', value: '142.8k', change: '+18.2% conversion', icon: TrendingUp },
            { label: 'AI Generations (Tokens)', value: '1.84M', change: 'Gemini 2.5 Flash', icon: Zap },
            { label: 'Storage & Media Vault', value: '14.2 GB', change: 'Supabase Storage', icon: Server },
          ].map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className={clsx(
                  "p-4 rounded-xl border flex flex-col justify-between shadow-2xs",
                  isDark ? "border-[#332B23] bg-[#1C1814]/80 text-[#F4EFE6]" : "border-[#EAE2D3] bg-white text-[#1F1A16]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={clsx("text-xs font-medium", isDark ? "text-[#A89B8C]" : "text-[#7A6E60]")}>
                    {m.label}
                  </span>
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="font-mono text-lg sm:text-xl font-bold tracking-tight">{m.value}</span>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">{m.change}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* User Moderation & Subscription Entitlements Engine */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className={clsx("font-serif text-lg sm:text-xl font-bold", isDark ? "text-[#F4EFE6]" : "text-[#1F1A16]")}>
              Creator Account Moderation & Subscription Overrides
            </h3>
            <p className={clsx("text-xs mt-0.5", isDark ? "text-[#A89B8C]" : "text-[#7A6E60]")}>
              Server-side role-based access control and plan tier entitlements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search user, email, handle..."
                className={clsx(
                  "pl-8 pr-3 py-1.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500",
                  isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]"
                )}
              />
            </div>

            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className={clsx(
                "px-2.5 py-1.5 text-xs rounded-lg border focus:outline-none",
                isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]"
              )}
            >
              <option value="all">All Plans</option>
              <option value="free">Free</option>
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="business">Business</option>
              <option value="agency">Agency</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-[#1C1814]/80 shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider">
                <tr>
                  <th className="p-3 font-semibold">User Identity</th>
                  <th className="p-3 font-semibold">Public Handle</th>
                  <th className="p-3 font-semibold">Plan Entitlement</th>
                  <th className="p-3 font-semibold">Profile Views</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition-colors">
                    <td className="p-3">
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">{u.name}</div>
                      <div className="text-[11px] text-neutral-400 font-mono">{u.email}</div>
                    </td>
                    <td className="p-3 font-mono font-medium text-amber-600 dark:text-amber-400">
                      <a href={`/${u.username}`} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                        <span>@{u.username}</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    </td>
                    <td className="p-3">
                      <select
                        value={u.plan}
                        onChange={(e) => handlePlanChange(u.id, e.target.value as PlanTier)}
                        className={clsx(
                          "px-2 py-1 rounded text-xs font-semibold uppercase border focus:outline-none cursor-pointer",
                          u.plan === 'agency'
                            ? "border-purple-300 bg-purple-50 text-purple-800 dark:border-purple-800 dark:bg-purple-950/40 dark:text-purple-300"
                            : u.plan === 'business'
                            ? "border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
                            : u.plan === 'pro'
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "border-neutral-300 bg-neutral-50 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                        )}
                      >
                        <option value="free">FREE (₹0)</option>
                        <option value="starter">STARTER (₹199)</option>
                        <option value="pro">PRO (₹499)</option>
                        <option value="business">BUSINESS (₹999)</option>
                        <option value="agency">AGENCY (₹2499)</option>
                      </select>
                    </td>
                    <td className="p-3 font-mono text-neutral-600 dark:text-neutral-300">
                      {u.viewsCount.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={clsx(
                          "px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider",
                          u.status === 'active'
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : u.status === 'flagged'
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300"
                            : "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300"
                        )}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className={clsx(
                          "px-2.5 py-1 rounded text-xs font-semibold border transition-colors",
                          u.status === 'active'
                            ? "border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/30"
                            : "border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-900/50 dark:hover:bg-emerald-950/30"
                        )}
                      >
                        {u.status === 'active' ? 'Suspend Account' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Security Telemetry & System Audit Stream */}
      <div className="space-y-3">
        <h3 className={clsx("font-serif text-lg font-bold", isDark ? "text-[#F4EFE6]" : "text-[#1F1A16]")}>
          Security Audit Logs & Webhook Stream
        </h3>
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-[#1C1814]/80 shadow-2xs">
          {AUDIT_LOGS.map((log) => (
            <div key={log.id} className="p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span
                  className={clsx(
                    "w-2 h-2 rounded-full shrink-0",
                    log.severity === 'success' ? "bg-emerald-500" : log.severity === 'warning' ? "bg-orange-500" : "bg-blue-500"
                  )}
                />
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">{log.event}</span>
                <span className="text-neutral-500">{log.details}</span>
              </div>
              <span className="text-neutral-400 text-[11px] font-mono shrink-0">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

