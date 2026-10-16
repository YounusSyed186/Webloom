'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ProfileRenderer } from '@/components/profile/profile-renderer';
import { LinkedTreeStore } from '@/lib/data-store';
import { PublicProfileData } from '@/types';
import { ShareModal } from '@/components/sharing/share-modal';
import { Skeleton } from '@/components/ui/skeleton';
import { Layers, ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicProfilePage() {
  const params = useParams();
  const username = (params?.username as string) || '';

  const [profileData, setProfileData] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    if (username) {
      // Fetch public profile
      const data = LinkedTreeStore.getPublicProfileData(username);
      setProfileData(data);
      setLoading(false);

      // Record telemetry impression event
      if (data && data.profile.isPublished !== false) {
        LinkedTreeStore.trackProfileView(data.profile.id);
      }
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 space-y-4">
        <Skeleton className="w-24 h-24 rounded-full" />
        <Skeleton className="w-48 h-6 rounded-xl" />
        <Skeleton className="w-64 h-4 rounded-lg" />
        <div className="w-full max-w-md space-y-3 pt-4">
          <Skeleton className="w-full h-14 rounded-2xl" />
          <Skeleton className="w-full h-14 rounded-2xl" />
          <Skeleton className="w-full h-14 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!profileData || profileData.profile.isPublished === false) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center text-zinc-100 font-geist">
        <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 shadow-xl">
          <Layers className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          Profile Not Found
        </h1>
        <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
          The username <code className="font-mono text-zinc-300">@{username}</code> is either not registered or is currently set to private.
        </p>
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back Home</span>
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="primary" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              <span>Claim this Handle</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <ProfileRenderer
        profile={profileData.profile}
        links={profileData.links}
        socialLinks={profileData.socialLinks}
        projects={profileData.projects}
        appearance={profileData.appearance}
        isPreview={false}
        onShareClick={() => setIsShareOpen(true)}
      />

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        profile={profileData.profile}
      />
    </div>
  );
}
