'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Plus,
  DollarSign,
  TrendingUp,
  PackageCheck,
  CreditCard,
  Download,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle2,
  X
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { LinkedTreeStore } from '@/lib/storage';
import { Product, Order, ProductType } from '@/types';
import { useToast } from '@/components/ui/toast';
import { clsx } from 'clsx';

export default function StoreManagementPage() {
  const { profile, products, orders, addProduct, updateProduct, deleteProduct, themeMode } = useApp();
  const { success, error: toastError } = useToast();
  const isDark = themeMode === 'dark';

  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [productType, setProductType] = useState<ProductType>('digital_download');
  const [priceInr, setPriceInr] = useState('499');
  const [priceUsd, setPriceUsd] = useState('7');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [downloadFileUrl, setDownloadFileUrl] = useState('');

  const totalRevenue = products.reduce((acc, p) => acc + (p.totalRevenueInr || 0), 0);
  const totalSales = products.reduce((acc, p) => acc + (p.salesCount || 0), 0);
  const avgOrderValue = totalSales > 0 ? Math.round(totalRevenue / totalSales) : 0;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toastError('Please enter a product title.');
      return;
    }

    addProduct({
      title: title.trim(),
      description: description.trim(),
      productType,
      priceInr: Number(priceInr) || 499,
      priceUsd: Number(priceUsd) || 7,
      coverImageUrl: coverImageUrl.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      downloadFileUrl: downloadFileUrl.trim() || '/downloads/sample-package.zip',
      isActive: true,
    });

    setIsAddModalOpen(false);
    setTitle('');
    setDescription('');
    setCoverImageUrl('');
    setDownloadFileUrl('');
    success(`Product "${title.trim()}" listed in store!`);
  };

  const handleToggleProduct = (id: string) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    updateProduct(id, { isActive: !p.isActive });
    success('Product status updated');
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    success('Product deleted from storefront');
  };

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className={clsx(
              "font-serif text-2xl sm:text-3xl font-bold tracking-tight",
              isDark ? "text-[#F4EFE6]" : "text-[#1F1A16]"
            )}
          >
            Digital Commerce & Storefront
          </h1>
          <p
            className={clsx(
              "text-xs sm:text-sm mt-1",
              isDark ? "text-[#C8BDB0]" : "text-[#6E6254]"
            )}
          >
            Sell digital downloads, courses, memberships, and templates with instant delivery.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className={clsx(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 shrink-0 self-start sm:self-auto",
            isDark
              ? "bg-[#E6B86A] text-[#161310] hover:bg-[#F0C57A]"
              : "bg-[#181614] text-[#FAF6EE] hover:bg-black"
          )}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, change: '+24.5% this month' },
          { label: 'Completed Orders', value: totalSales.toString(), icon: PackageCheck, change: '+18 orders' },
          { label: 'Average Order Value', value: `₹${avgOrderValue.toLocaleString()}`, icon: TrendingUp, change: 'Across all products' },
          { label: 'Active Store Items', value: products.filter(p => p.isActive).length.toString(), icon: ShoppingBag, change: 'Live in public bio' },
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className={clsx(
                "p-4 rounded-xl border flex flex-col justify-between transition-colors shadow-2xs",
                isDark ? "border-[#332B23] bg-[#1C1814]/80 text-[#F4EFE6]" : "border-[#EAE2D3] bg-white text-[#1F1A16]"
              )}
            >
              <div className="flex items-center justify-between">
                <span className={clsx("text-xs font-medium", isDark ? "text-[#A89B8C]" : "text-[#7A6E60]")}>
                  {m.label}
                </span>
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight">
                  {m.value}
                </span>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
                  {m.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={clsx(
            "px-4 py-2 text-xs font-semibold rounded-lg transition-colors",
            activeTab === 'products'
              ? isDark ? "bg-[#28211B] text-[#E6B86A]" : "bg-[#FAF6EE] text-[#967137]"
              : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
          )}
        >
          Product Catalog ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={clsx(
            "px-4 py-2 text-xs font-semibold rounded-lg transition-colors",
            activeTab === 'orders'
              ? isDark ? "bg-[#28211B] text-[#E6B86A]" : "bg-[#FAF6EE] text-[#967137]"
              : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
          )}
        >
          Customer Orders ({orders.length})
        </button>
      </div>

      {/* Tab: Products */}
      {activeTab === 'products' && (
        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className={clsx(
                "p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors shadow-2xs",
                isDark ? "border-[#332B23] bg-[#1C1814]/80 text-[#F4EFE6]" : "border-[#EAE2D3] bg-white text-[#1F1A16]",
                !p.isActive && "opacity-60"
              )}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {p.coverImageUrl && (
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-neutral-200/60 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                    <img src={p.coverImageUrl} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300">
                      {p.productType.replace('_', ' ')}
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      ₹{p.priceInr} / ${p.priceUsd}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm truncate mt-1">{p.title}</h4>
                  <p className={clsx("text-xs truncate", isDark ? "text-[#A89B8C]" : "text-[#7A6E60]")}>
                    {p.description}
                  </p>
                </div>
              </div>

              {/* Stats & Actions */}
              <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                <div className="text-right hidden sm:block">
                  <span className="font-mono text-xs font-semibold">
                    {p.salesCount || 0} sales
                  </span>
                  <p className="text-[11px] text-neutral-400">
                    ₹{(p.totalRevenueInr || 0).toLocaleString()} rev
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleToggleProduct(p.id)}
                    title={p.isActive ? "Hide product" : "Make visible"}
                    className={clsx(
                      "p-1.5 rounded-lg border transition-colors",
                      isDark ? "border-[#332B23] hover:bg-[#28211B]" : "border-[#EAE2D3] hover:bg-[#FAF6EE]"
                    )}
                  >
                    {p.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(p.id)}
                    title="Delete product"
                    className="p-1.5 rounded-lg border border-red-200 dark:border-red-900/40 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Orders */}
      {activeTab === 'orders' && (
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-[#1C1814]/80 shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider">
                <tr>
                  <th className="p-3 font-semibold">Order</th>
                  <th className="p-3 font-semibold">Customer</th>
                  <th className="p-3 font-semibold">Item</th>
                  <th className="p-3 font-semibold">Amount</th>
                  <th className="p-3 font-semibold">Provider</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Token</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {orders.map((ord) => {
                  const item = ord.items?.[0];
                  return (
                    <tr key={ord.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">
                        {ord.orderNumber}
                      </td>
                      <td className="p-3">
                        <div className="font-semibold">{ord.customerName || 'Anonymous'}</div>
                        <div className="text-[11px] text-neutral-400">{ord.customerEmail}</div>
                      </td>
                      <td className="p-3 font-medium truncate max-w-xs">
                        {item?.productTitle || 'Digital Product'}
                      </td>
                      <td className="p-3 font-mono font-bold">
                        ₹{ord.totalAmount}
                      </td>
                      <td className="p-3 capitalize">
                        {ord.paymentProvider}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3">
                        {item?.downloadToken ? (
                          <a
                            href={`/api/store/download/${item.downloadToken}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-blue-500 hover:underline font-mono"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </a>
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={clsx(
                "relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl overflow-hidden",
                isDark ? "bg-[#181411] border-[#382F26] text-[#F4EFE6]" : "bg-[#FAF6EE] border-[#DDD2BF] text-[#1F1A16]"
              )}
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-4">
                <h3 className="font-serif font-bold text-lg">Create Storefront Product</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Next.js SaaS Starter Kit"
                    className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">Description</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What will buyers receive after checkout?"
                    className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-80">Price (INR ₹)</label>
                    <input
                      type="number"
                      value={priceInr}
                      onChange={(e) => setPriceInr(e.target.value)}
                      className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-80">Price (USD $)</label>
                    <input
                      type="number"
                      value={priceUsd}
                      onChange={(e) => setPriceUsd(e.target.value)}
                      className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">Cover Image URL</label>
                  <input
                    type="url"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">Download File URL / Bundle Path</label>
                  <input
                    type="text"
                    value={downloadFileUrl}
                    onChange={(e) => setDownloadFileUrl(e.target.value)}
                    placeholder="/downloads/package-v1.zip or cloud storage link"
                    className={clsx("w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500", isDark ? "bg-[#241E19] border-[#382F26]" : "bg-white border-[#DDD2BF]")}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:opacity-80"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors"
                  >
                    Publish to Store
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

