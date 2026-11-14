'use client';

import React, { useState } from 'react';
import { Shield, Globe, AlertTriangle, Trash2, Eye, EyeOff, Sparkles, RefreshCw, Settings, CreditCard, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { clsx } from 'clsx';
import { PLANS } from '@/lib/billing/plans';
import { loadRazorpayScript } from '@/lib/billing/razorpay';
import { LinkedTreeStore } from '@/lib/data-store';
import { PlanId } from '@/types';

export default function SettingsPage() {
  const { profile, updateProfile, togglePublish, deleteAccount, seedDemoData, themeMode } = useApp();
  const { success } = useToast();
  const isDark = themeMode === 'dark';

  const [customDomain, setCustomDomain] = useState(profile.customDomain || '');
  const [enableSeoIndex, setEnableSeoIndex] = useState(profile.seoIndexing !== false);
  const [isPublished, setIsPublished] = useState(profile.isPublished !== false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Dynamic Subscription Management & Razorpay
  const currentPlanId = (profile.plan as PlanId) || 'free';
  const currentPlan = PLANS[currentPlanId] || PLANS.free;
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState<PlanId>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('USD');
  const [isProcessingUpgrade, setIsProcessingUpgrade] = useState(false);
  const [upgradeError, setUpgradeError] = useState<string | null>(null);

  const handleUpgradeRazorpay = async () => {
    setIsProcessingUpgrade(true);
    setUpgradeError(null);
    try {
      const res = await fetch('/api/billing/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedUpgradePlan,
          billingCycle,
          currency,
          customerEmail: profile.email || 'creator@webloom.site',
          customerName: profile.displayName || 'Webloom Creator',
          profileId: profile.id,
        }),
      });
      const orderData = await res.json();
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        throw new Error('Could not load Razorpay checkout script');
      }
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Webloom Creator Platform',
        description: `${orderData.planName} (${billingCycle})`,
        order_id: orderData.orderId,
        prefill: {
          name: profile.displayName,
          email: profile.email || 'creator@webloom.site',
        },
        theme: {
          color: isDark ? '#E6B86A' : '#181614',
        },
        handler: async (resp: any) => {
          try {
            const vRes = await fetch('/api/billing/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_signature: resp.razorpay_signature,
                planId: selectedUpgradePlan,
                billingCycle,
                profileId: profile.id,
                customerEmail: profile.email,
              }),
            });
            const vData = await vRes.json();
            if (vData.success) {
              updateProfile({ plan: selectedUpgradePlan });
              LinkedTreeStore.updateProfile(profile.id, { plan: selectedUpgradePlan });
              setUpgradeModalOpen(false);
              success(`Upgraded to ${orderData.planName}!`, 'Your subscription is now active with Razorpay.');
            } else {
              setUpgradeError(vData.error || 'Signature verification failed');
            }
          } catch (err: any) {
            setUpgradeError(err.message || 'Verification error');
          } finally {
            setIsProcessingUpgrade(false);
          }
        },
        modal: {
          ondismiss: () => setIsProcessingUpgrade(false),
        },
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setIsProcessingUpgrade(false);
      setUpgradeError(err.message || 'Payment failed to initialize');
    }
  };

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
        <h2 className="text-xl font-serif font-bold tracking-tight">Account & Platform Settings</h2>
        <p
          className={clsx(
            "text-xs mt-0.5",
            isDark ? "text-[#A89F91]" : "text-[#786E62]"
          )}
        >
          Configure security, SEO discovery, custom domains, and platform preferences for your Webloom.
        </p>
      </div>

      {/* 1. Account Security & Plan */}
      <div
        className={clsx(
          "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
          isDark ? "bg-[#1E1915] border-[#382F26]" : "bg-[#F6F0E4] border-[#E5DEC9]"
        )}
      >
        <div className="flex items-center gap-2">
          <Shield className={clsx("w-4 h-4", isDark ? "text-[#E6B86A]" : "text-[#967137]")} />
          <h3 className="text-sm font-serif font-semibold">Account & Authentication</h3>
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

        <div
          className={clsx(
            "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border mt-2 transition-colors",
            isDark ? "bg-[#181411] border-[#382F26]" : "bg-[#FAF6EE] border-[#DACBB4]"
          )}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold block">{currentPlan.name} Plan</span>
              <span
                className={clsx(
                  "text-[10.5px] font-semibold px-2 py-0.5 rounded-full border",
                  currentPlanId === 'free'
                    ? isDark
                      ? "text-[#A89F91] bg-[#221D18] border-[#3E332A]"
                      : "text-[#5A4F41] bg-[#EFE6D6] border-[#D0C2AE]"
                    : isDark
                      ? "text-[#E6B86A] bg-[#282015] border-[#E6B86A]/40"
                      : "text-[#865E24] bg-[#FAF2E6] border-[#C89D54]/40"
                )}
              >
                {currentPlanId === 'free' ? 'Seed Active' : 'Paid Subscription'}
              </span>
            </div>
            <span
              className={clsx(
                "text-[11px] block mt-0.5",
                isDark ? "text-[#85796C]" : "text-[#8E8272]"
              )}
            >
              {currentPlan.tagline || currentPlan.description}
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSelectedUpgradePlan(currentPlanId === 'pro' ? 'business' : 'pro');
                setUpgradeModalOpen(true);
              }}
              className="text-xs gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{currentPlanId === 'free' ? 'Upgrade to Pro' : 'Change Plan'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Seed / Sample Showcase Data */}
      <div
        className={clsx(
          "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
          isDark
            ? "bg-gradient-to-br from-[#241E18] via-[#1E1915] to-[#181411] border-[#382F26]"
            : "bg-gradient-to-br from-[#FAF6EE] via-[#F6F0E4] to-[#EFE7DA] border-[#E5DEC9]"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className={clsx("w-4 h-4", isDark ? "text-[#E6B86A]" : "text-[#967137]")} />
            <h3 className="text-sm font-serif font-semibold">Demo Account & Sample Data</h3>
          </div>
          <span
            className={clsx(
              "text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border",
              isDark
                ? "text-[#E6B86A] bg-[#282015] border-[#E6B86A]/30"
                : "text-[#865E24] bg-[#FAF2E6] border-[#C89D54]/30"
            )}
          >
            Instant Seed
          </span>
        </div>
        <p
          className={clsx(
            "text-xs",
            isDark ? "text-[#A89F91]" : "text-[#786E62]"
          )}
        >
          Populate your account with 6 realistic showcase links, 4 portfolio projects, custom social channels, 30 days of analytics graphs, and activity history.
        </p>

        <div
          className={clsx(
            "flex items-center justify-between p-4 rounded-2xl border transition-colors",
            isDark ? "bg-[#181411] border-[#382F26]" : "bg-[#FAF6EE] border-[#DACBB4]"
          )}
        >
          <div className="space-y-0.5">
            <span className="text-xs font-medium block">Seed Webloom Sample Data</span>
            <span
              className={clsx(
                "text-[11px]",
                isDark ? "text-[#85796C]" : "text-[#8E8272]"
              )}
            >
              Instantly restores portfolio projects, curated links, and click telemetry
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleSeedDemo}
            disabled={isSeeding}
            className="gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
            <span>{isSeeding ? 'Seeding...' : 'Seed Sample Data'}</span>
          </Button>
        </div>
      </div>

      {/* 3. Profile Visibility & Publish Toggle */}
      <div
        className={clsx(
          "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
          isDark ? "bg-[#1E1915] border-[#382F26]" : "bg-[#F6F0E4] border-[#E5DEC9]"
        )}
      >
        <div className="flex items-center gap-2">
          {isPublished ? (
            <Eye className="w-4 h-4 text-emerald-500" />
          ) : (
            <EyeOff className={clsx("w-4 h-4", isDark ? "text-[#85796C]" : "text-[#8E8272]")} />
          )}
          <h3 className="text-sm font-serif font-semibold">Profile Visibility Status</h3>
        </div>

        <div
          className={clsx(
            "flex items-center justify-between p-4 rounded-2xl border transition-colors",
            isDark ? "bg-[#181411] border-[#382F26]" : "bg-[#FAF6EE] border-[#DACBB4]"
          )}
        >
          <div>
            <span className="text-xs font-semibold block">
              {isPublished ? 'Live on Public Web' : 'Private / Draft Mode'}
            </span>
            <span
              className={clsx(
                "text-[11px]",
                isDark ? "text-[#85796C]" : "text-[#8E8272]"
              )}
            >
              {isPublished 
                ? 'Your public Webloom is active and accessible to anyone via your handle URL.' 
                : 'Your Webloom is unlisted and visitors will see a private message.'}
            </span>
          </div>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={e => handleTogglePublish(e.target.checked)}
            className="w-5 h-5 rounded cursor-pointer accent-[#C89D54]"
          />
        </div>
      </div>

      {/* 4. Custom Domain Configuration */}
      <div
        className={clsx(
          "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
          isDark ? "bg-[#1E1915] border-[#382F26]" : "bg-[#F6F0E4] border-[#E5DEC9]"
        )}
      >
        <div className="flex items-center gap-2">
          <Globe className={clsx("w-4 h-4", isDark ? "text-[#E6B86A]" : "text-[#967137]")} />
          <h3 className="text-sm font-serif font-semibold">Custom Domain Mapping</h3>
        </div>
        <p
          className={clsx(
            "text-xs",
            isDark ? "text-[#A89F91]" : "text-[#786E62]"
          )}
        >
          Connect your custom domain (e.g. <code className="font-mono">younus.dev</code> or <code className="font-mono">links.yourbrand.com</code>) to point directly to your Webloom.
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
      <div
        className={clsx(
          "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
          isDark ? "bg-[#1E1915] border-[#382F26]" : "bg-[#F6F0E4] border-[#E5DEC9]"
        )}
      >
        <div className="flex items-center gap-2">
          <Settings className={clsx("w-4 h-4", isDark ? "text-[#E6B86A]" : "text-[#967137]")} />
          <h3 className="text-sm font-serif font-semibold">Search Engine Discovery (SEO)</h3>
        </div>

        <div
          className={clsx(
            "flex items-center justify-between p-4 rounded-2xl border transition-colors",
            isDark ? "bg-[#181411] border-[#382F26]" : "bg-[#FAF6EE] border-[#DACBB4]"
          )}
        >
          <div>
            <span className="text-xs font-semibold block">Allow Search Engines to Index Profile</span>
            <span
              className={clsx(
                "text-[11px]",
                isDark ? "text-[#85796C]" : "text-[#8E8272]"
              )}
            >
              Includes OpenGraph meta tags, sitemap entries, and rich previews
            </span>
          </div>
          <input
            type="checkbox"
            checked={enableSeoIndex}
            onChange={e => handleToggleSeo(e.target.checked)}
            className="w-5 h-5 rounded cursor-pointer accent-[#C89D54]"
          />
        </div>
      </div>

      {/* 6. Danger Zone */}
      <div
        className={clsx(
          "p-6 rounded-3xl border space-y-4 transition-colors",
          isDark ? "bg-[#281512] border-red-900/40" : "bg-red-50 border-red-200"
        )}
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <h3 className="text-sm font-serif font-semibold text-red-600 dark:text-red-400">Danger Zone</h3>
        </div>
        <p
          className={clsx(
            "text-xs",
            isDark ? "text-[#A89F91]" : "text-[#786E62]"
          )}
        >
          Permanent actions that affect your digital identity URL, links, and analytics data.
        </p>

        <div
          className={clsx(
            "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border",
            isDark ? "bg-[#1E1915] border-red-900/30" : "bg-white border-red-200"
          )}
        >
          <div>
            <span className="text-xs font-semibold block">Delete Webloom Profile</span>
            <span
              className={clsx(
                "text-[11px]",
                isDark ? "text-[#85796C]" : "text-[#8E8272]"
              )}
            >
              Permanently delete profile data, all link clicks, and analytics logs
            </span>
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

      {/* Razorpay Subscription Modal */}
      {upgradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className={clsx(
              "w-full max-w-lg rounded-3xl border p-6 sm:p-7 shadow-2xl relative",
              isDark
                ? "bg-[#221B16] border-[#3E3228] text-[#F4EFE6]"
                : "bg-[#FAF6EE] border-[#D8CCBA] text-[#1F1A16]"
            )}
          >
            <button
              type="button"
              onClick={() => {
                if (!isProcessingUpgrade) setUpgradeModalOpen(false);
              }}
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-xs opacity-75 hover:opacity-100"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Sparkles className={clsx("w-4 h-4", isDark ? "text-[#E6B86A]" : "text-[#967137]")} />
              <h3 className="font-serif font-bold text-lg">Choose Your Webloom Tier</h3>
            </div>
            <p className={clsx("text-xs mb-4", isDark ? "text-[#A89F91]" : "text-[#786E62]")}>
              Connect with your global audience and unlock professional creator features with Razorpay.
            </p>

            {/* Cadence & Currency Selectors */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl border mb-4 bg-black/5 dark:bg-white/5">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={clsx(
                    "px-3 py-1 rounded-full text-xs font-medium transition-all",
                    billingCycle === 'annual'
                      ? isDark
                        ? "bg-[#332A22] text-[#F4EFE6] shadow-xs"
                        : "bg-[#FAF6EE] text-[#1F1A16] shadow-xs"
                      : "opacity-70 hover:opacity-100"
                  )}
                >
                  Yearly (Save 35%)
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={clsx(
                    "px-3 py-1 rounded-full text-xs font-medium transition-all",
                    billingCycle === 'monthly'
                      ? isDark
                        ? "bg-[#332A22] text-[#F4EFE6] shadow-xs"
                        : "bg-[#FAF6EE] text-[#1F1A16] shadow-xs"
                      : "opacity-70 hover:opacity-100"
                  )}
                >
                  Monthly
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={clsx(
                    "px-2.5 py-1 rounded-full text-xs font-medium transition-all",
                    currency === 'USD'
                      ? isDark
                        ? "bg-[#332A22] text-[#F4EFE6] shadow-xs"
                        : "bg-[#FAF6EE] text-[#1F1A16] shadow-xs"
                      : "opacity-70 hover:opacity-100"
                  )}
                >
                  $ USD
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('INR')}
                  className={clsx(
                    "px-2.5 py-1 rounded-full text-xs font-medium transition-all",
                    currency === 'INR'
                      ? isDark
                        ? "bg-[#332A22] text-[#F4EFE6] shadow-xs"
                        : "bg-[#FAF6EE] text-[#1F1A16] shadow-xs"
                      : "opacity-70 hover:opacity-100"
                  )}
                >
                  ₹ INR
                </button>
              </div>
            </div>

            {/* Plan Options */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {(['pro', 'business'] as PlanId[]).map((pid) => {
                const planObj = PLANS[pid];
                const isSelected = selectedUpgradePlan === pid;
                const price =
                  currency === 'USD'
                    ? billingCycle === 'annual'
                      ? `$${Math.round(planObj.priceUsdAnnual / 12)}/mo`
                      : `$${planObj.priceUsdMonthly}/mo`
                    : billingCycle === 'annual'
                      ? `₹${Math.round(planObj.priceInrAnnual / 12)}/mo`
                      : `₹${planObj.priceInrMonthly}/mo`;

                return (
                  <div
                    key={pid}
                    onClick={() => setSelectedUpgradePlan(pid)}
                    className={clsx(
                      "p-3.5 rounded-2xl border cursor-pointer transition-all",
                      isSelected
                        ? isDark
                          ? "border-[#E6B86A] bg-[#282015] shadow-sm"
                          : "border-[#967137] bg-[#F6EDE0] shadow-sm"
                        : isDark
                          ? "border-white/10 bg-white/5 opacity-80 hover:opacity-100"
                          : "border-black/10 bg-black/5 opacity-80 hover:opacity-100"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif font-bold text-sm">{planObj.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>
                    <span className="font-serif text-lg font-bold block">{price}</span>
                    <span className="text-[10px] opacity-75 block mt-1 line-clamp-2">
                      {planObj.tagline || planObj.description}
                    </span>
                  </div>
                );
              })}
            </div>

            {upgradeError && (
              <div className="p-3 rounded-lg text-xs bg-red-500/10 border border-red-500/30 text-red-500 mb-4">
                {upgradeError}
              </div>
            )}

            {/* Pay Button */}
            <Button
              variant="primary"
              size="md"
              disabled={isProcessingUpgrade}
              onClick={handleUpgradeRazorpay}
              className="w-full text-xs font-semibold py-3 gap-2"
            >
              {isProcessingUpgrade ? (
                <span>Connecting to Razorpay...</span>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>
                    Pay with Razorpay · Upgrade to {PLANS[selectedUpgradePlan].name}
                  </span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
