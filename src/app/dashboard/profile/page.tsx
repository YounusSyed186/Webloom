'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  User, 
  MapPin, 
  Globe, 
  Mail, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Camera, 
  Upload,
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
import { clsx } from 'clsx';

export default function ProfilePage() {
  const { 
    profile, 
    socialLinks, 
    updateProfile, 
    addSocialLink, 
    deleteSocialLink,
    isSaving,
    themeMode,
  } = useApp();
  const { success, error } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDark = themeMode === 'dark';

  const [displayName, setDisplayName] = useState(profile.displayName);
  const [username, setUsername] = useState(profile.username);
  const [headline, setHeadline] = useState(profile.headline || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [avatar, setAvatar] = useState(profile.avatar || '');
  const [location, setLocation] = useState(profile.location || '');
  const [website, setWebsite] = useState(profile.website || '');
  const [email, setEmail] = useState(profile.email || '');
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
      location: location.trim() || undefined,
      website: website.trim() || undefined,
      email: email.trim() || undefined,
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
        <h2 className="text-xl font-serif font-bold tracking-tight">Edit Profile</h2>
        <p
          className={clsx(
            "text-xs mt-0.5",
            isDark ? "text-[#A89F91]" : "text-[#786E62]"
          )}
        >
          Manage your digital bio, avatar photo, verified credentials, and linked social channels.
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* 1. Avatar Photo */}
        <div
          className={clsx(
            "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
            isDark
              ? "bg-[#1E1915] border-[#382F26]"
              : "bg-[#F6F0E4] border-[#E5DEC9]"
          )}
        >
          <h3 className="text-sm font-serif font-semibold">Profile Photo</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div
                className={clsx(
                  "w-24 h-24 rounded-full overflow-hidden border-2 shadow-sm relative",
                  isDark
                    ? "bg-[#28211B] border-[#3E342B]"
                    : "bg-[#EAE2D3] border-[#DACBB4]"
                )}
              >
                {avatar ? (
                  <Image src={avatar} alt={displayName} fill className="object-cover" />
                ) : (
                  <div
                    className={clsx(
                      "w-full h-full flex items-center justify-center text-2xl font-bold",
                      isDark ? "bg-[#E6B86A] text-[#181410]" : "bg-[#1F1A16] text-[#FAF6EE]"
                    )}
                  >
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
                    className="text-red-500 hover:text-red-600"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Core Bio Details */}
        <div
          className={clsx(
            "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
            isDark
              ? "bg-[#1E1915] border-[#382F26]"
              : "bg-[#F6F0E4] border-[#E5DEC9]"
          )}
        >
          <h3 className="text-sm font-serif font-semibold">Basic Information</h3>
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
              leftIcon={<span className={isDark ? "text-[#85796C] font-mono" : "text-[#8E8272] font-mono"}>@</span>}
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
          <div
            className={clsx(
              "flex items-center justify-between p-4 rounded-2xl border mt-2 transition-colors",
              isDark
                ? "bg-[#181411] border-[#382F26]"
                : "bg-[#FAF6EE] border-[#DACBB4]"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  "p-2 rounded-xl",
                  isDark ? "bg-[#2E241B] text-[#E6B86A]" : "bg-[#FAF2E6] text-[#967137]"
                )}
              >
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold block">Verified Profile Badge</span>
                <span
                  className={clsx(
                    "text-[11px]",
                    isDark ? "text-[#85796C]" : "text-[#8E8272]"
                  )}
                >
                  Display verified checkmark badge next to your display name
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={verified}
              onChange={e => setVerified(e.target.checked)}
              className="w-5 h-5 rounded cursor-pointer accent-[#C89D54]"
            />
          </div>
        </div>

        {/* 3. Social Profiles */}
        <div
          className={clsx(
            "p-6 rounded-3xl border space-y-4 transition-colors shadow-2xs",
            isDark
              ? "bg-[#1E1915] border-[#382F26]"
              : "bg-[#F6F0E4] border-[#E5DEC9]"
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-serif font-semibold">Social Channels</h3>
              <p
                className={clsx(
                  "text-xs mt-0.5",
                  isDark ? "text-[#A89F91]" : "text-[#786E62]"
                )}
              >
                Icons displayed at the top of your public profile
              </p>
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
            <p
              className={clsx(
                "text-xs py-3 text-center",
                isDark ? "text-[#85796C]" : "text-[#8E8272]"
              )}
            >
              No social accounts connected yet. Add one above.
            </p>
          ) : (
            <div className="space-y-2.5">
              {socialLinks.map(social => {
                const platformItem = platforms.find(p => p.id === social.platform);
                const Icon = platformItem?.icon || Globe;
                return (
                  <div
                    key={social.id}
                    className={clsx(
                      "flex items-center justify-between p-3.5 rounded-2xl border gap-3 transition-colors",
                      isDark
                        ? "bg-[#181411] border-[#382F26]"
                        : "bg-[#FAF6EE] border-[#DACBB4]"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={clsx(
                          "p-2 rounded-xl",
                          isDark ? "bg-[#28211B] text-[#F4EFE6]" : "bg-[#EAE2D3] text-[#1F1A16]"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold capitalize block">{social.platform}</span>
                        <span
                          className={clsx(
                            "text-[11px] truncate block font-mono",
                            isDark ? "text-[#85796C]" : "text-[#8E8272]"
                          )}
                        >
                          {social.url}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        deleteSocialLink(social.id);
                        success(`Removed ${social.platform} link`);
                      }}
                      className={clsx(
                        "p-1.5 rounded-lg transition-colors cursor-pointer",
                        isDark
                          ? "text-[#85796C] hover:text-red-400 hover:bg-[#28211B]"
                          : "text-[#8E8272] hover:text-red-600 hover:bg-[#EAE2D3]"
                      )}
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
            <label
              className={clsx(
                "block text-xs font-medium mb-2",
                isDark ? "text-[#C8BDB0]" : "text-[#544B41]"
              )}
            >
              Platform
            </label>
            <div className="grid grid-cols-3 gap-2">
              {platforms.map(p => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlatform(p.id)}
                    className={clsx(
                      "flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer",
                      selectedPlatform === p.id
                        ? isDark
                          ? "bg-[#33281E] border-[#E6B86A] text-[#E6B86A] font-semibold"
                          : "bg-[#FAF2E6] border-[#C89D54] text-[#865E24] font-semibold"
                        : isDark
                        ? "bg-[#181411] border-[#382F26] text-[#A89F91] hover:text-[#F4EFE6]"
                        : "bg-[#FAF6EE] border-[#DACBB4] text-[#6E6254] hover:text-[#1F1A16]"
                    )}
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
