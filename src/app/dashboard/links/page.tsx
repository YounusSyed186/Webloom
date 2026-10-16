'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  GripVertical, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  MousePointerClick, 
  Globe, 
  FileText, 
  Video, 
  ShoppingBag, 
  Newspaper,
  Copy,
  Upload
} from 'lucide-react';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  useSortable, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, ConfirmDialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { Link, LinkType } from '@/types';
import { isSafeUrl, sanitizeUrl, validateImageFile } from '@/lib/validation';

// Sortable Link Item Component
function SortableLinkItem({
  link,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleActive,
}: {
  link: Link;
  onEdit: (link: Link) => void;
  onDuplicate: (link: Link) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, active: boolean) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getLinkIcon = () => {
    if (link.type === 'file') return <FileText className="w-4 h-4 text-emerald-400" />;
    if (link.type === 'video') return <Video className="w-4 h-4 text-red-400" />;
    if (link.type === 'product') return <ShoppingBag className="w-4 h-4 text-amber-400" />;
    if (link.type === 'article') return <Newspaper className="w-4 h-4 text-purple-400" />;
    return <Globe className="w-4 h-4 text-blue-400" />;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 rounded-2xl bg-zinc-900/80 border transition-all duration-200 flex items-center justify-between gap-3 ${
        isDragging
          ? 'border-blue-500 shadow-2xl bg-zinc-800 scale-[1.02] z-30'
          : link.isActive
          ? 'border-zinc-800 hover:border-zinc-700'
          : 'border-zinc-800/40 opacity-60 bg-zinc-950/40'
      }`}
    >
      {/* Drag handle & Thumbnail */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 text-zinc-500 hover:text-zinc-300 rounded touch-none"
          title="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {link.thumbnail ? (
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700/60 flex-shrink-0">
            <Image src={link.thumbnail} alt={link.title} fill className="object-cover" />
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700/50 flex-shrink-0">
            {getLinkIcon()}
          </div>
        )}

        {/* Title & Info */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-xs md:max-w-sm">
              {link.title}
            </h4>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase">
              {link.type}
            </span>
          </div>
          <p className="text-xs text-zinc-400 truncate max-w-[200px] sm:max-w-xs md:max-w-sm font-mono mt-0.5">
            {link.url}
          </p>
          <div className="flex items-center gap-3 text-[11px] text-zinc-500 mt-1">
            <span className="flex items-center gap-1 font-mono">
              <MousePointerClick className="w-3 h-3 text-blue-400" />
              {(link.clickCount || 0).toLocaleString()} clicks
            </span>
            <span>•</span>
            <span className={link.isActive ? 'text-emerald-400 font-medium' : 'text-zinc-500'}>
              {link.isActive ? '● Active' : '○ Hidden'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {/* Toggle Active */}
        <button
          onClick={() => onToggleActive(link.id, !link.isActive)}
          className={`p-2 rounded-xl border transition-colors ${
            link.isActive
              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20'
              : 'text-zinc-500 bg-zinc-800 border-zinc-700 hover:text-zinc-300'
          }`}
          title={link.isActive ? 'Hide link from public profile' : 'Show link on public profile'}
        >
          {link.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>

        {/* Duplicate Button */}
        <button
          onClick={() => onDuplicate(link)}
          className="p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 transition-colors hidden sm:block"
          title="Duplicate link"
        >
          <Copy className="w-4 h-4" />
        </button>

        {/* Edit Button */}
        <button
          onClick={() => onEdit(link)}
          className="p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 transition-colors"
          title="Edit link"
        >
          <Edit3 className="w-4 h-4" />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(link.id)}
          className="p-2 rounded-xl text-zinc-400 hover:text-red-400 bg-zinc-800/80 hover:bg-red-500/10 hover:border-red-500/30 border border-zinc-700/60 transition-colors"
          title="Delete link"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function LinksPage() {
  const { links, addLink, updateLink, deleteLink, reorderLinks } = useApp();
  const { success, error } = useToast();
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [deletingLinkId, setDeletingLinkId] = useState<string | null>(null);

  // Modal form states
  const [formTitle, setFormTitle] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formType, setFormType] = useState<LinkType>('url');
  const [formThumbnail, setFormThumbnail] = useState('');
  const [formOpenInNewTab, setFormOpenInNewTab] = useState(true);
  const [formIsActive, setFormIsActive] = useState(true);
  const [formPrice, setFormPrice] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex(item => item.id === active.id);
      const newIndex = links.findIndex(item => item.id === over.id);
      const reordered = arrayMove(links, oldIndex, newIndex);
      reorderLinks(reordered);
      success('Links reordered successfully');
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const check = validateImageFile(file);
    if (!check.valid) {
      error(check.error || 'Invalid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormThumbnail(reader.result);
        success('Thumbnail image uploaded!');
      }
    };
    reader.readAsDataURL(file);
  };

  const openAddModal = () => {
    setEditingLink(null);
    setFormTitle('');
    setFormUrl('');
    setFormDescription('');
    setFormType('url');
    setFormThumbnail('');
    setFormOpenInNewTab(true);
    setFormIsActive(true);
    setFormPrice('');
    setIsAddModalOpen(true);
  };

  const openEditModal = (link: Link) => {
    setEditingLink(link);
    setFormTitle(link.title);
    setFormUrl(link.url);
    setFormDescription(link.description || '');
    setFormType(link.type);
    setFormThumbnail(link.thumbnail || '');
    setFormOpenInNewTab(link.openInNewTab !== false);
    setFormIsActive(link.isActive);
    setFormPrice(link.metadata?.price || '');
    setIsAddModalOpen(true);
  };

  const handleDuplicate = (link: Link) => {
    addLink({
      title: `${link.title} (Copy)`,
      url: link.url,
      description: link.description,
      type: link.type,
      thumbnail: link.thumbnail,
      isActive: link.isActive,
      sortOrder: links.length,
      openInNewTab: link.openInNewTab,
      metadata: link.metadata,
    });
    success('Link duplicated!');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formUrl.trim()) {
      error('Title and destination URL are required');
      return;
    }

    const cleanedUrl = sanitizeUrl(formUrl);
    if (!cleanedUrl || !isSafeUrl(cleanedUrl)) {
      error('Please provide a safe, valid web URL (e.g. https://example.com)');
      return;
    }

    if (editingLink) {
      updateLink(editingLink.id, {
        title: formTitle.trim(),
        url: cleanedUrl,
        description: formDescription.trim() || undefined,
        type: formType,
        thumbnail: formThumbnail.trim() || undefined,
        openInNewTab: formOpenInNewTab,
        isActive: formIsActive,
        metadata: formPrice ? { price: formPrice } : undefined,
      });
      success('Link updated successfully!');
    } else {
      addLink({
        title: formTitle.trim(),
        url: cleanedUrl,
        description: formDescription.trim() || undefined,
        type: formType,
        thumbnail: formThumbnail.trim() || undefined,
        isActive: formIsActive,
        sortOrder: links.length,
        openInNewTab: formOpenInNewTab,
        metadata: formPrice ? { price: formPrice } : undefined,
      });
      success('New link added to your tree!');
    }

    setIsAddModalOpen(false);
  };

  const confirmDelete = () => {
    if (deletingLinkId) {
      deleteLink(deletingLinkId);
      setDeletingLinkId(null);
      success('Link removed from profile');
    }
  };

  const filteredLinks = links
    .filter(link => {
      const matchQuery = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.url.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filterType === 'all' || link.type === filterType;
      return matchQuery && matchType;
    });

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Your Links</h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Add, edit, duplicate, and drag-and-drop to reorder links on your public profile.
          </p>
        </div>
        <Button onClick={openAddModal} className="gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Add New Link</span>
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full sm:flex-1">
          <Input
            placeholder="Search links by title or URL..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'url', 'video', 'product', 'file', 'social'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                filterType === type
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Links List / DnD Container */}
      {filteredLinks.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-white">No links found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            {searchQuery
              ? 'Try changing your search query or filter settings.'
              : 'Your profile is waiting for its first link. Add your first link to get started.'}
          </p>
          <Button size="sm" onClick={openAddModal} className="gap-2 mt-2">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Link</span>
          </Button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredLinks.map(l => l.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {filteredLinks.map(link => (
                <SortableLinkItem
                  key={link.id}
                  link={link}
                  onEdit={openEditModal}
                  onDuplicate={handleDuplicate}
                  onDelete={id => setDeletingLinkId(id)}
                  onToggleActive={(id, active) => updateLink(id, { isActive: active })}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Add / Edit Link Modal */}
      <Dialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingLink ? 'Edit Link' : 'Add New Link'}
        description="Provide link details and customize preview visibility."
        maxWidth="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Title"
            placeholder="e.g. My Portfolio or GitHub Repos"
            value={formTitle}
            onChange={e => setFormTitle(e.target.value)}
            required
          />

          <Input
            label="Destination URL"
            placeholder="https://example.com"
            value={formUrl}
            onChange={e => setFormUrl(e.target.value)}
            required
          />

          <Textarea
            label="Description (Optional)"
            placeholder="Short 1-line summary displayed under the link title..."
            value={formDescription}
            onChange={e => setFormDescription(e.target.value)}
          />

          {/* Link Type Selector */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Link Type</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'url', label: 'Standard URL' },
                { type: 'video', label: 'Video Embed' },
                { type: 'product', label: 'Product / Shop' },
                { type: 'article', label: 'Article' },
                { type: 'file', label: 'Download File' },
                { type: 'social', label: 'Social Platform' },
              ].map(item => (
                <button
                  type="button"
                  key={item.type}
                  onClick={() => setFormType(item.type as LinkType)}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                    formType === item.type
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {formType === 'product' && (
            <Input
              label="Price Tag (e.g. $49 or Free)"
              placeholder="$49"
              value={formPrice}
              onChange={e => setFormPrice(e.target.value)}
            />
          )}

          <div>
            <Input
              label="Thumbnail Image URL (Optional)"
              placeholder="https://images.unsplash.com/..."
              value={formThumbnail}
              onChange={e => setFormThumbnail(e.target.value)}
            />
            <div className="flex items-center gap-2 mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => thumbnailInputRef.current?.click()}
                className="gap-1.5 text-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Thumbnail Image</span>
              </Button>
              {formThumbnail && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormThumbnail('')}
                  className="text-xs text-zinc-500 hover:text-red-400"
                >
                  Remove
                </Button>
              )}
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Options Switches */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs">
            <span className="text-zinc-300 font-medium">Open in new tab</span>
            <input
              type="checkbox"
              checked={formOpenInNewTab}
              onChange={e => setFormOpenInNewTab(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-zinc-800 border-zinc-700 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs">
            <span className="text-zinc-300 font-medium">Visible on public profile</span>
            <input
              type="checkbox"
              checked={formIsActive}
              onChange={e => setFormIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-zinc-800 border-zinc-700 cursor-pointer"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2.5 pt-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {editingLink ? 'Save Changes' : 'Create Link'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingLinkId}
        onClose={() => setDeletingLinkId(null)}
        onConfirm={confirmDelete}
        title="Delete Link?"
        message="Are you sure you want to permanently delete this link? This action cannot be undone."
        confirmText="Delete Link"
      />
    </div>
  );
}
