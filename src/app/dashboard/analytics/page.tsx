'use client';

import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  MousePointerClick, 
  Eye, 
  Users, 
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
import { clsx } from 'clsx';

export default function AnalyticsPage() {
  const { analytics, timeRange, setTimeRange, themeMode } = useApp();
  const isDark = themeMode === 'dark';

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
          <h2 className="text-xl font-serif font-bold tracking-tight">Analytics & Insights</h2>
          <p
            className={clsx(
              "text-xs mt-0.5",
              isDark ? "text-[#A89F91]" : "text-[#786E62]"
            )}
          >
            Real-time telemetry on profile impressions, link conversion rates, and audience referrers.
          </p>
        </div>

        {/* Date Filter Tabs */}
        <div
          className={clsx(
            "flex items-center border rounded-xl p-1 self-start sm:self-auto transition-colors",
            isDark ? "bg-[#181411] border-[#382F26]" : "bg-[#F6F0E4] border-[#DACBB4]"
          )}
        >
          {timeFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setTimeRange(filter.id)}
              className={clsx(
                "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer",
                timeRange === filter.id
                  ? isDark
                    ? "bg-[#E6B86A] text-[#181410] font-semibold shadow-xs"
                    : "bg-[#1F1A16] text-[#FAF6EE] font-semibold shadow-xs"
                  : isDark
                  ? "text-[#85796C] hover:text-[#F4EFE6]"
                  : "text-[#8E8272] hover:text-[#1F1A16]"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Core KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div
          className={clsx(
            "p-5 rounded-3xl border transition-colors shadow-2xs",
            isDark ? "bg-[#1E1915] border-[#382F26]" : "bg-[#F6F0E4] border-[#E5DEC9]"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={clsx("text-xs font-medium", isDark ? "text-[#85796C]" : "text-[#8E8272]")}>Profile Impressions</span>
            <div className={clsx("p-2 rounded-xl border", isDark ? "bg-[#28211B] text-[#E6B86A] border-[#3E342B]" : "bg-[#EAE2D3] text-[#967137] border-[#DACBB4]")}>
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold tracking-tight">
            {analytics.profileViews.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-500 font-medium mt-1 inline-block">
            {analytics.viewsChange || '+0%'} vs last period
          </span>
        </div>

        <div
          className={clsx(
            "p-5 rounded-3xl border transition-colors shadow-2xs",
            isDark ? "bg-[#1E1915] border-[#382F26]" : "bg-[#F6F0E4] border-[#E5DEC9]"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={clsx("text-xs font-medium", isDark ? "text-[#85796C]" : "text-[#8E8272]")}>Total Link Clicks</span>
            <div className={clsx("p-2 rounded-xl border", isDark ? "bg-[#2E1E1A] text-[#F29D7A] border-[#4A322C]" : "bg-[#F5E2DC] text-[#B2533E] border-[#E5C2BA]")}>
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold tracking-tight">
            {analytics.linkClicks.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-500 font-medium mt-1 inline-block">
            {analytics.clicksChange || '+0%'} vs last period
          </span>
        </div>

        <div
          className={clsx(
            "p-5 rounded-3xl border transition-colors shadow-2xs",
            isDark ? "bg-[#1E1915] border-[#382F26]" : "bg-[#F6F0E4] border-[#E5DEC9]"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={clsx("text-xs font-medium", isDark ? "text-[#85796C]" : "text-[#8E8272]")}>Avg Conversion (CTR)</span>
            <div className={clsx("p-2 rounded-xl border", isDark ? "bg-[#1C2820] text-[#87B99B] border-[#2E4235]" : "bg-[#E2EDE5] text-[#48735A] border-[#C4DAC9]")}>
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold tracking-tight">
            {analytics.clickThroughRate}%
          </div>
          <span className="text-[11px] text-emerald-500 font-medium mt-1 inline-block">
            {analytics.ctrChange || '+0%'} healthy benchmark
          </span>
        </div>

        <div
          className={clsx(
            "p-5 rounded-3xl border transition-colors shadow-2xs",
            isDark ? "bg-[#1E1915] border-[#382F26]" : "bg-[#F6F0E4] border-[#E5DEC9]"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={clsx("text-xs font-medium", isDark ? "text-[#85796C]" : "text-[#8E8272]")}>Audience Network</span>
            <div className={clsx("p-2 rounded-xl border", isDark ? "bg-[#282030] text-[#C4A9D8] border-[#423450]" : "bg-[#EFE8F5] text-[#7A5B96] border-[#D9CDE3]")}>
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold tracking-tight">
            {analytics.followersCount.toLocaleString()}
          </div>
          <span
            className={clsx(
              "text-[11px] font-medium mt-1 inline-block",
              isDark ? "text-[#E6B86A]" : "text-[#967137]"
            )}
          >
            Estimated reach
          </span>
        </div>
      </div>

      {/* 2. Charts Row: Views Trend & Clicks Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Views Chart */}
        <div
          className={clsx(
            "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
            isDark ? "bg-[#1E1915] border-[#382F26]" : "bg-[#F6F0E4] border-[#E5DEC9]"
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-serif font-semibold">Profile Views Over Time</h3>
              <p className={clsx("text-xs mt-0.5", isDark ? "text-[#85796C]" : "text-[#8E8272]")}>
                Daily visitor impressions ({timeRange})
              </p>
            </div>
            <span
              className={clsx(
                "text-xs font-mono px-2.5 py-1 rounded-full border",
                isDark
                  ? "text-[#E6B86A] bg-[#282015] border-[#E6B86A]/30"
                  : "text-[#865E24] bg-[#FAF2E6] border-[#C89D54]/30"
              )}
            >
              Daily Views
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.viewsChart}>
                <defs>
                  <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isDark ? "#E6B86A" : "#C89D54"} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={isDark ? "#E6B86A" : "#C89D54"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#28211B" : "#E2D8C7"} vertical={false} />
                <XAxis dataKey="date" stroke={isDark ? "#85796C" : "#8E8272"} fontSize={11} tickLine={false} />
                <YAxis stroke={isDark ? "#85796C" : "#8E8272"} fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1E1915' : '#FAF6EE',
                    borderColor: isDark ? '#382F26' : '#DACBB4',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: isDark ? '#F4EFE6' : '#1F1A16',
                  }}
                />
                <Area type="monotone" dataKey="views" stroke={isDark ? "#E6B86A" : "#C89D54"} strokeWidth={2.5} fillOpacity={1} fill="url(#viewGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Link Clicks Chart */}
        <div
          className={clsx(
            "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
            isDark ? "bg-[#1E1915] border-[#382F26]" : "bg-[#F6F0E4] border-[#E5DEC9]"
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-serif font-semibold">Link Interactions</h3>
              <p className={clsx("text-xs mt-0.5", isDark ? "text-[#85796C]" : "text-[#8E8272]")}>
                Total outgoing link clicks ({timeRange})
              </p>
            </div>
            <span
              className={clsx(
                "text-xs font-mono px-2.5 py-1 rounded-full border",
                isDark
                  ? "text-[#F29D7A] bg-[#2E1E1A] border-[#4A322C]"
                  : "text-[#B2533E] bg-[#F5E2DC] border-[#E5C2BA]"
              )}
            >
              Daily Clicks
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.clicksChart}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#28211B" : "#E2D8C7"} vertical={false} />
                <XAxis dataKey="date" stroke={isDark ? "#85796C" : "#8E8272"} fontSize={11} tickLine={false} />
                <YAxis stroke={isDark ? "#85796C" : "#8E8272"} fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1E1915' : '#FAF6EE',
                    borderColor: isDark ? '#382F26' : '#DACBB4',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: isDark ? '#F4EFE6' : '#1F1A16',
                  }}
                />
                <Bar dataKey="clicks" fill={isDark ? "#F29D7A" : "#B2533E"} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Top Links Performance Table */}
      <div
        className={clsx(
          "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
          isDark ? "bg-[#1E1915] border-[#382F26]" : "bg-[#F6F0E4] border-[#E5DEC9]"
        )}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-serif font-semibold">Top Performing Links</h3>
          <span className={clsx("text-xs", isDark ? "text-[#85796C]" : "text-[#8E8272]")}>
            Ranked by total click volume
          </span>
        </div>

        {analytics.topLinks.length === 0 ? (
          <p className={clsx("text-xs py-6 text-center", isDark ? "text-[#85796C]" : "text-[#8E8272]")}>
            No links configured or clicked yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={clsx("border-b pb-2", isDark ? "border-[#332B23] text-[#85796C]" : "border-[#EAE2D3] text-[#8E8272]")}>
                  <th className="pb-3 font-semibold">Link Title</th>
                  <th className="pb-3 font-semibold">URL Destination</th>
                  <th className="pb-3 font-semibold text-right">Clicks</th>
                  <th className="pb-3 font-semibold text-right">Conversion Rate</th>
                </tr>
              </thead>
              <tbody className={clsx("divide-y", isDark ? "divide-[#332B23]" : "divide-[#EAE2D3]")}>
                {analytics.topLinks.map(link => (
                  <tr
                    key={link.id}
                    className={clsx(
                      "transition-colors",
                      isDark ? "hover:bg-[#28211B]/60" : "hover:bg-[#EAE2D3]/60"
                    )}
                  >
                    <td className="py-3.5 font-semibold">{link.title}</td>
                    <td className={clsx("py-3.5 font-mono max-w-[200px] truncate", isDark ? "text-[#85796C]" : "text-[#8E8272]")}>
                      {link.url}
                    </td>
                    <td className="py-3.5 text-right font-mono font-semibold">
                      {(link.clicks || 0).toLocaleString()}
                    </td>
                    <td className="py-3.5 text-right">
                      <span className="font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
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
        <div
          className={clsx(
            "p-6 rounded-3xl border space-y-4 flex flex-col justify-between transition-colors shadow-2xs",
            isDark ? "bg-[#1E1915] border-[#382F26]" : "bg-[#F6F0E4] border-[#E5DEC9]"
          )}
        >
          <div>
            <h3 className="text-sm font-serif font-semibold">Devices</h3>
            <p className={clsx("text-xs mt-0.5", isDark ? "text-[#85796C]" : "text-[#8E8272]")}>Visitor platform breakdown</p>
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
                    backgroundColor: isDark ? '#1E1915' : '#FAF6EE',
                    borderColor: isDark ? '#382F26' : '#DACBB4',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: isDark ? '#F4EFE6' : '#1F1A16',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={clsx("space-y-2 pt-2 border-t", isDark ? "border-[#332B23]" : "border-[#EAE2D3]")}>
            {analytics.deviceBreakdown.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className={isDark ? "text-[#C8BDB0]" : "text-[#544B41]"}>{d.name}</span>
                </div>
                <span className="font-mono font-semibold">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Referrers */}
        <div
          className={clsx(
            "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
            isDark ? "bg-[#1E1915] border-[#382F26]" : "bg-[#F6F0E4] border-[#E5DEC9]"
          )}
        >
          <div>
            <h3 className="text-sm font-serif font-semibold">Traffic Sources</h3>
            <p className={clsx("text-xs mt-0.5", isDark ? "text-[#85796C]" : "text-[#8E8272]")}>Where your visitors arrive from</p>
          </div>

          <div className="space-y-3 pt-1">
            {analytics.topReferrers.map(r => (
              <div key={r.source} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{r.source}</span>
                  <span className={clsx("font-mono", isDark ? "text-[#85796C]" : "text-[#8E8272]")}>{r.percentage}%</span>
                </div>
                <div className={clsx("w-full h-1.5 rounded-full overflow-hidden", isDark ? "bg-[#28211B]" : "bg-[#EAE2D3]")}>
                  <div
                    className={clsx(
                      "h-full rounded-full",
                      isDark ? "bg-[#E6B86A]" : "bg-[#C89D54]"
                    )}
                    style={{ width: `${r.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div
          className={clsx(
            "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
            isDark ? "bg-[#1E1915] border-[#382F26]" : "bg-[#F6F0E4] border-[#E5DEC9]"
          )}
        >
          <div>
            <h3 className="text-sm font-serif font-semibold">Top Regions</h3>
            <p className={clsx("text-xs mt-0.5", isDark ? "text-[#85796C]" : "text-[#8E8272]")}>Global visitor reach</p>
          </div>

          <div className="space-y-2.5 pt-1">
            {analytics.topLocations.map(loc => (
              <div
                key={loc.country}
                className={clsx(
                  "flex items-center justify-between text-xs p-2 rounded-xl border transition-colors",
                  isDark ? "bg-[#181411] border-[#382F26]" : "bg-[#FAF6EE] border-[#DACBB4]"
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      "font-mono text-[10px] px-1.5 py-0.5 rounded font-bold border",
                      isDark ? "bg-[#28211B] text-[#C8BDB0] border-[#3E342B]" : "bg-[#EAE2D3] text-[#544B41] border-[#DACBB4]"
                    )}
                  >
                    {loc.code}
                  </span>
                  <span>{loc.country}</span>
                </div>
                <span className="font-mono font-semibold">
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
