'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Camera, 
  Sparkles,
  Upload,
  Layers
} from 'lucide-react';
import { 
  GithubIcon, 
  XIcon, 
  LinkedinIcon, 
  YoutubeIcon, 
  InstagramIcon, 
  DiscordIcon, 
  SpotifyIcon 
} from '@/components/ui/icons';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { SocialPlatform } from '@/types';
import { validateImageFile, validateUsername, normalizeUsername } from '@/lib/validation';

export default function ProfilePage() {
  const { 
    profile, 
    socialLinks, 
    updateProfile, 
    addSocialLink, 
    deleteSocialLink,
    isSaving 
  } = useApp();
  const { success, error } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState(profile.displayName);
  const [username, setUsername] = useState(profile.username);
  const [headline, setHeadline] = useState(profile.headline || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [avatar, setAvatar] = useState(profile.avatar || '');
  const [coverImage, setCoverImage] = useState(profile.coverImage || '');
  const [location, setLocation] = useState(profile.location || '');
  const [website, setWebsite] = useState(profile.website || '');
  const [email, setEmail] = useState(profile.email || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [verified, setVerified] = useState(profile.verified || false);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  // Social Modal
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('github');
  const [socialUrl, setSocialUrl] = useState('');

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const check = validateImageFile(file);
    if (!check.valid) {
      error(check.error || 'Invalid file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result);
        success('Avatar image uploaded!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError(null);

    const cleanUsername = normalizeUsername(username);
    const check = validateUsername(cleanUsername);
    if (!check.valid) {
      setUsernameError(check.error || 'Invalid username');
      error(check.error || 'Invalid username');
      return;
    }

    updateProfile({
      displayName: displayName.trim(),
      username: cleanUsername,
      headline: headline.trim() || undefined,
      bio: bio.trim() || undefined,
      avatar: avatar.trim() || undefined,
      coverImage: coverImage.trim() || undefined,
      location: location.trim() || undefined,
      website: website.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      verified,
    });
    success('Profile updated successfully!');
  };

  const handleAddSocial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialUrl.trim()) return;
    addSocialLink(selectedPlatform, socialUrl.trim());
    setSocialUrl('');
    setIsSocialModalOpen(false);
    success(`Added ${selectedPlatform} account!`);
  };

  const platforms: { id: SocialPlatform; label: string; icon: any }[] = [
    { id: 'github', label: 'GitHub', icon: GithubIcon },
    { id: 'x', label: 'X (Twitter)', icon: XIcon },
    { id: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon },
    { id: 'youtube', label: 'YouTube', icon: YoutubeIcon },
    { id: 'discord', label: 'Discord', icon: DiscordIcon },
    { id: 'instagram', label: 'Instagram', icon: InstagramIcon },
    { id: 'spotify', label: 'Spotify', icon: SpotifyIcon },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Edit Profile</h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Manage your digital bio, avatar photo, verified credentials, and linked social channels.
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* 1. Avatar and Cover */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
          <h3 className="text-sm font-semibold text-white">Profile Photo</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-700/80 shadow-xl relative">
                {avatar ? (
                  <Image src={avatar} alt={displayName} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white bg-blue-600">
                    {displayName.charAt(0)}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Upload Photo"
              >
                <Camera className="w-6 h-6 text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>

            <div className="space-y-3 flex-1 w-full">
              <Input
                label="Avatar Image URL"
                placeholder="https://images.unsplash.com/photo-..."
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
                hint="Paste an image URL or click the button below to upload directly from your device."
              />
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image File</span>
                </Button>
                {avatar && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setAvatar('')}
                    className="text-zinc-500 hover:text-red-400"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Core Bio Details */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
          <h3 className="text-sm font-semibold text-white">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Display Name"
              placeholder="e.g. Younus Syed"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              required
            />
            <Input
              label="Username (Public handle)"
              placeholder="younus"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
                setUsernameError(null);
              }}
              leftIcon={<span className="text-zinc-500 font-mono">@</span>}
              error={usernameError || undefined}
              required
            />
          </div>

          <Input
            label="Headline / Professional Title"
            placeholder="e.g. Software Engineer & Product Builder"
            value={headline}
            onChange={e => setHeadline(e.target.value)}
          />

          <Textarea
            label="Bio (Short Summary)"
            placeholder="Tell your story, what you are building, or what excites you..."
            value={bio}
            onChange={e => setBio(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <Input
              label="Location"
              placeholder="San Francisco, CA"
              value={location}
              onChange={e => setLocation(e.target.value)}
              leftIcon={<MapPin className="w-4 h-4" />}
            />
            <Input
              label="Personal Website"
              placeholder="https://younus.dev"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              leftIcon={<Globe className="w-4 h-4" />}
            />
            <Input
              label="Contact Email"
              placeholder="hello@younus.dev"
              value={email}
              onChange={e => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />
          </div>

          {/* Verified Badge switch */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 mt-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Verified Profile Badge</span>
                <span className="text-[11px] text-zinc-400">Display verified checkmark badge next to your display name</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={verified}
              onChange={e => setVerified(e.target.checked)}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 bg-zinc-800 border-zinc-700 cursor-pointer"
            />
          </div>
        </div>

        {/* 3. Social Profiles */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Social Channels</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Icons displayed at the top of your public profile</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsSocialModalOpen(true)}
              className="gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Social</span>
            </Button>
          </div>

          {socialLinks.length === 0 ? (
            <p className="text-xs text-zinc-500 py-3 text-center">No social accounts connected yet. Add one above.</p>
          ) : (
            <div className="space-y-2.5">
              {socialLinks.map(social => {
                const platformItem = platforms.find(p => p.id === social.platform);
                const Icon = platformItem?.icon || Globe;
                return (
                  <div
                    key={social.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800 gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-zinc-800 text-zinc-200">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-white capitalize block">{social.platform}</span>
                        <span className="text-[11px] text-zinc-400 truncate block font-mono">{social.url}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        deleteSocialLink(social.id);
                        success(`Removed ${social.platform} link`);
                      }}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                      title="Delete social link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" size="md" isLoading={isSaving}>
            Save Profile Changes
          </Button>
        </div>
      </form>

      {/* Add Social Account Modal */}
      <Dialog
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
        title="Add Social Channel"
        description="Select a platform and paste your profile link."
        maxWidth="md"
      >
        <form onSubmit={handleAddSocial} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2">Platform</label>
            <div className="grid grid-cols-3 gap-2">
              {platforms.map(p => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      selectedPlatform === p.id
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Input
            label="Profile URL"
            placeholder={`https://${selectedPlatform}.com/your-username`}
            value={socialUrl}
            onChange={e => setSocialUrl(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsSocialModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Add Link
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
