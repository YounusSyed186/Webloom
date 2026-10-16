'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  MousePointerClick, 
  Eye, 
  Users, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ArrowUpRight,
  Calendar,
  Filter
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useApp } from '@/lib/context/app-context';

export default function AnalyticsPage() {
  const { analytics, timeRange, setTimeRange } = useApp();

  const timeFilters: { id: '7d' | '30d' | '90d' | '1y'; label: string }[] = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Analytics & Insights</h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time telemetry on profile impressions, link conversion rates, and audience referrers.
          </p>
        </div>

        {/* Date Filter Tabs */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 self-start sm:self-auto">
          {timeFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setTimeRange(filter.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                timeRange === filter.id
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Core KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-5 rounded-3xl bg-zinc-900/70 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400 font-medium">Profile Impressions</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {analytics.profileViews.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium mt-1 inline-block">
            {analytics.viewsChange || '+0%'} vs last period
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-zinc-900/70 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400 font-medium">Total Link Clicks</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {analytics.linkClicks.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium mt-1 inline-block">
            {analytics.clicksChange || '+0%'} vs last period
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-zinc-900/70 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400 font-medium">Avg Conversion (CTR)</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {analytics.clickThroughRate}%
          </div>
          <span className="text-[11px] text-emerald-400 font-medium mt-1 inline-block">
            {analytics.ctrChange || '+0%'} healthy benchmark
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-zinc-900/70 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400 font-medium">Audience Network</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {analytics.followersCount.toLocaleString()}
          </div>
          <span className="text-[11px] text-purple-400 font-medium mt-1 inline-block">
            Estimated reach
          </span>
        </div>
      </div>

      {/* 2. Charts Row: Views Trend & Clicks Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Views Chart */}
        <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Profile Views Over Time</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Daily visitor impressions ({timeRange})</p>
            </div>
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              Daily Views
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.viewsChart}>
                <defs>
                  <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="date" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Area type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2.5} fillOpacity={1} fill="url(#viewGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Link Clicks Chart */}
        <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Link Interactions</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Total outgoing link clicks ({timeRange})</p>
            </div>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              Daily Clicks
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.clicksChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="date" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="clicks" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Top Links Performance Table */}
      <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Top Performing Links</h3>
          <span className="text-xs text-zinc-400">Ranked by total click volume</span>
        </div>

        {analytics.topLinks.length === 0 ? (
          <p className="text-xs text-zinc-500 py-6 text-center">No links configured or clicked yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 pb-2">
                  <th className="pb-3 font-semibold">Link Title</th>
                  <th className="pb-3 font-semibold">URL Destination</th>
                  <th className="pb-3 font-semibold text-right">Clicks</th>
                  <th className="pb-3 font-semibold text-right">Conversion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {analytics.topLinks.map(link => (
                  <tr key={link.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3.5 font-semibold text-white">{link.title}</td>
                    <td className="py-3.5 font-mono text-zinc-400 max-w-[200px] truncate">{link.url}</td>
                    <td className="py-3.5 text-right font-mono font-semibold text-white">{(link.clicks || 0).toLocaleString()}</td>
                    <td className="py-3.5 text-right">
                      <span className="font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {link.ctr}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Audience Distribution: Devices, Top Referrers & Top Countries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Device Breakdown */}
        <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800/80 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Devices</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Visitor platform breakdown</p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.deviceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analytics.deviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-800/80">
            {analytics.deviceBreakdown.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-zinc-300">{d.name}</span>
                </div>
                <span className="font-mono font-semibold text-white">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Referrers */}
        <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800/80 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Traffic Sources</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Where your visitors arrive from</p>
          </div>

          <div className="space-y-3 pt-1">
            {analytics.topReferrers.map(r => (
              <div key={r.source} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-medium">{r.source}</span>
                  <span className="text-zinc-400 font-mono">{r.percentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${r.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800/80 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Top Geographic Regions</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Global visitor reach</p>
          </div>

          <div className="space-y-2.5 pt-1">
            {analytics.topLocations.map(loc => (
              <div key={loc.country} className="flex items-center justify-between text-xs p-2 rounded-xl bg-zinc-950/60 border border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400 font-bold">
                    {loc.code}
                  </span>
                  <span className="text-zinc-200">{loc.country}</span>
                </div>
                <span className="font-mono font-semibold text-white">
                  {loc.visitors.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
