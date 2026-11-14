'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
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
import { clsx } from 'clsx';

// Sortable Link Item Component
function SortableLinkItem({
  link,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleActive,
  isDark,
}: {
  link: Link;
  onEdit: (link: Link) => void;
  onDuplicate: (link: Link) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, active: boolean) => void;
  isDark: boolean;
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
    if (link.type === 'file') return <FileText className="w-4 h-4 text-emerald-500" />;
    if (link.type === 'video') return <Video className="w-4 h-4 text-rose-500" />;
    if (link.type === 'product') return <ShoppingBag className="w-4 h-4 text-amber-500" />;
    if (link.type === 'article') return <Newspaper className="w-4 h-4 text-purple-500" />;
    return <Globe className={clsx("w-4 h-4", isDark ? "text-[#E6B86A]" : "text-[#967137]")} />;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 shadow-2xs",
        isDragging
          ? isDark
            ? "border-[#E6B86A] shadow-2xl bg-[#28211B] scale-[1.02] z-30"
            : "border-[#C89D54] shadow-2xl bg-[#EFE7DA] scale-[1.02] z-30"
          : link.isActive
          ? isDark
            ? "bg-[#1E1915] border-[#382F26] hover:border-[#4E4135]"
            : "bg-[#F6F0E4] border-[#E5DEC9] hover:border-[#DACBB4]"
          : isDark
          ? "border-[#382F26]/40 opacity-60 bg-[#15120F]"
          : "border-[#E5DEC9]/50 opacity-60 bg-[#EAE2D3]/40"
      )}
    >
      {/* Drag handle & Thumbnail */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          {...attributes}
          {...listeners}
          className={clsx(
            "cursor-grab active:cursor-grabbing p-1 rounded touch-none transition-colors",
            isDark ? "text-[#85796C] hover:text-[#C8BDB0]" : "text-[#8E8272] hover:text-[#1F1A16]"
          )}
          title="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {link.thumbnail ? (
          <div
            className={clsx(
              "relative w-10 h-10 rounded-xl overflow-hidden border flex-shrink-0",
              isDark ? "bg-[#28211B] border-[#3E342B]" : "bg-[#EAE2D3] border-[#DACBB4]"
            )}
          >
            <Image src={link.thumbnail} alt={link.title} fill className="object-cover" />
          </div>
        ) : (
          <div
            className={clsx(
              "p-2.5 rounded-xl border flex-shrink-0",
              isDark ? "bg-[#28211B] border-[#3E342B]" : "bg-[#EAE2D3] border-[#DACBB4]"
            )}
          >
            {getLinkIcon()}
          </div>
        )}

        {/* Title & Info */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-sm">
              {link.title}
            </h4>
            <span
              className={clsx(
                "text-[10px] font-mono px-1.5 py-0.5 rounded uppercase",
                isDark ? "bg-[#28211B] text-[#85796C]" : "bg-[#EAE2D3] text-[#786E62]"
              )}
            >
              {link.type}
            </span>
          </div>
          <p
            className={clsx(
              "text-xs truncate max-w-[200px] sm:max-w-xs md:max-w-sm font-mono mt-0.5",
              isDark ? "text-[#85796C]" : "text-[#786E62]"
            )}
          >
            {link.url}
          </p>
          <div
            className={clsx(
              "flex items-center gap-3 text-[11px] mt-1",
              isDark ? "text-[#85796C]" : "text-[#8E8272]"
            )}
          >
            <span className="flex items-center gap-1 font-mono">
              <MousePointerClick className={clsx("w-3 h-3", isDark ? "text-[#E6B86A]" : "text-[#967137]")} />
              {(link.clickCount || 0).toLocaleString()} clicks
            </span>
            <span>•</span>
            <span className={link.isActive ? 'text-emerald-500 font-medium' : ''}>
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
          className={clsx(
            "p-2 rounded-xl border transition-colors cursor-pointer",
            link.isActive
              ? isDark
                ? "text-[#87B99B] bg-[#1C2820] border-[#2E4235] hover:bg-[#25362B]"
                : "text-[#48735A] bg-[#E2EDE5] border-[#C4DAC9] hover:bg-[#D4E4D8]"
              : isDark
              ? "text-[#85796C] bg-[#221C17] border-[#382F26] hover:text-[#C8BDB0]"
              : "text-[#8E8272] bg-[#EAE2D3] border-[#DACBB4] hover:text-[#1F1A16]"
          )}
          title={link.isActive ? 'Hide link from public profile' : 'Show link on public profile'}
        >
          {link.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>

        {/* Duplicate Button */}
        <button
          onClick={() => onDuplicate(link)}
          className={clsx(
            "p-2 rounded-xl border transition-colors hidden sm:block cursor-pointer",
            isDark
              ? "text-[#A89F91] hover:text-[#F4EFE6] bg-[#221C17] hover:bg-[#2C241E] border-[#382F26]"
              : "text-[#6E6254] hover:text-[#1F1A16] bg-[#FAF6EE] hover:bg-[#EFE7DA] border-[#E5DEC9]"
          )}
          title="Duplicate link"
        >
          <Copy className="w-4 h-4" />
        </button>

        {/* Edit Button */}
        <button
          onClick={() => onEdit(link)}
          className={clsx(
            "p-2 rounded-xl border transition-colors cursor-pointer",
            isDark
              ? "text-[#A89F91] hover:text-[#F4EFE6] bg-[#221C17] hover:bg-[#2C241E] border-[#382F26]"
              : "text-[#6E6254] hover:text-[#1F1A16] bg-[#FAF6EE] hover:bg-[#EFE7DA] border-[#E5DEC9]"
          )}
          title="Edit link"
        >
          <Edit3 className="w-4 h-4" />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(link.id)}
          className={clsx(
            "p-2 rounded-xl border transition-colors cursor-pointer",
            isDark
              ? "text-red-400 hover:text-red-300 bg-[#2E1815] border-[#4A2622] hover:bg-[#3D1E1A]"
              : "text-red-600 hover:text-red-700 bg-red-50 border-red-200 hover:bg-red-100"
          )}
          title="Delete link"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function DashboardLinksPage() {
  const { links, addLink, updateLink, deleteLink, reorderLinks, themeMode } = useApp();
  const { success, error } = useToast();
  const isDark = themeMode === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [deletingLinkId, setDeletingLinkId] = useState<string | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formType, setFormType] = useState<LinkType>('url');
  const [formThumbnail, setFormThumbnail] = useState('');
  const [formOpenInNewTab, setFormOpenInNewTab] = useState(true);
  const [formIsActive, setFormIsActive] = useState(true);
  const [formPrice, setFormPrice] = useState('');

  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex(i => i.id === active.id);
      const newIndex = links.findIndex(i => i.id === over.id);
      const newLinks = arrayMove(links, oldIndex, newIndex).map((item, idx) => ({
        ...item,
        sortOrder: idx,
      }));
      reorderLinks(newLinks);
      success('Link order updated');
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      error(validation.error || 'Invalid file type');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
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
          <h2 className="text-xl font-serif font-bold tracking-tight">Your Links</h2>
          <p
            className={clsx(
              "text-xs mt-0.5",
              isDark ? "text-[#A89F91]" : "text-[#786E62]"
            )}
          >
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
              className={clsx(
                "px-3 py-1.5 rounded-xl text-xs font-medium capitalize whitespace-nowrap transition-colors cursor-pointer",
                filterType === type
                  ? isDark
                    ? "bg-[#E6B86A] text-[#181410] font-semibold shadow-xs"
                    : "bg-[#1F1A16] text-[#FAF6EE] font-semibold shadow-xs"
                  : isDark
                  ? "bg-[#221C17] text-[#A89F91] hover:text-[#F4EFE6] border border-[#382F26]"
                  : "bg-[#F6F0E4] text-[#6E6254] hover:text-[#1F1A16] border border-[#E5DEC9]"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Links List / DnD Container */}
      {filteredLinks.length === 0 ? (
        <div
          className={clsx(
            "p-12 text-center rounded-3xl border space-y-3 transition-colors",
            isDark
              ? "bg-[#1E1915]/50 border-[#382F26]"
              : "bg-[#F6F0E4]/60 border-[#E5DEC9]"
          )}
        >
          <div
            className={clsx(
              "w-12 h-12 rounded-2xl border flex items-center justify-center mx-auto",
              isDark
                ? "bg-[#28211B] border-[#3E342B] text-[#E6B86A]"
                : "bg-[#EAE2D3] border-[#DACBB4] text-[#967137]"
            )}
          >
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-serif font-semibold">No links found</h3>
          <p
            className={clsx(
              "text-xs max-w-sm mx-auto",
              isDark ? "text-[#A89F91]" : "text-[#786E62]"
            )}
          >
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
                  isDark={isDark}
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
            <label
              className={clsx(
                "block text-xs font-medium mb-1.5",
                isDark ? "text-[#C8BDB0]" : "text-[#544B41]"
              )}
            >
              Link Type
            </label>
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
                  className={clsx(
                    "p-2.5 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer",
                    formType === item.type
                      ? isDark
                        ? "bg-[#33281E] border-[#E6B86A] text-[#E6B86A] font-semibold"
                        : "bg-[#FAF2E6] border-[#C89D54] text-[#865E24] font-semibold"
                      : isDark
                      ? "bg-[#181411] border-[#382F26] text-[#A89F91] hover:text-[#F4EFE6]"
                      : "bg-[#FAF6EE] border-[#DACBB4] text-[#6E6254] hover:text-[#1F1A16]"
                  )}
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
                  className="text-xs text-red-500 hover:text-red-600"
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
          <div
            className={clsx(
              "flex items-center justify-between p-3 rounded-xl border text-xs transition-colors",
              isDark
                ? "bg-[#181411] border-[#382F26]"
                : "bg-[#FAF6EE] border-[#DACBB4]"
            )}
          >
            <span className="font-medium">Open in new tab</span>
            <input
              type="checkbox"
              checked={formOpenInNewTab}
              onChange={e => setFormOpenInNewTab(e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer accent-[#C89D54]"
            />
          </div>

          <div
            className={clsx(
              "flex items-center justify-between p-3 rounded-xl border text-xs transition-colors",
              isDark
                ? "bg-[#181411] border-[#382F26]"
                : "bg-[#FAF6EE] border-[#DACBB4]"
            )}
          >
            <span className="font-medium">Visible on public profile</span>
            <input
              type="checkbox"
              checked={formIsActive}
              onChange={e => setFormIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer accent-[#C89D54]"
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
