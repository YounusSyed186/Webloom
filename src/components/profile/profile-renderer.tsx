'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Globe, 
  FileText, 
  Video, 
  ShoppingBag, 
  Newspaper, 
  Mail, 
  Phone, 
  ExternalLink, 
  MapPin, 
  CheckCircle2, 
  Share2,
  FolderGit2
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
import { AppearanceSettings, Link, Profile, Project, SocialLink, SocialPlatform } from '@/types';
import { LinkedTreeStore } from '@/lib/storage';

interface ProfileRendererProps {
  profile: Profile;
  links: Link[];
  socialLinks: SocialLink[];
  projects: Project[];
  appearance: AppearanceSettings;
  isPreview?: boolean;
  onShareClick?: () => void;
}

export function ProfileRenderer({
  profile,
  links,
  socialLinks,
  projects,
  appearance,
  isPreview = false,
  onShareClick,
}: ProfileRendererProps) {
  const getSocialIcon = (platform: SocialPlatform) => {
    const props = { className: 'w-4 h-4' };
    switch (platform) {
      case 'github': return <GithubIcon {...props} />;
      case 'linkedin': return <LinkedinIcon {...props} />;
      case 'x': return <XIcon {...props} />;
      case 'youtube': return <YoutubeIcon {...props} />;
      case 'instagram': return <InstagramIcon {...props} />;
      case 'discord': return <DiscordIcon {...props} />;
      case 'spotify': return <SpotifyIcon {...props} />;
      default: return <Globe {...props} />;
    }
  };

  const getLinkIcon = (link: Link) => {
    const props = { className: 'w-4 h-4 flex-shrink-0' };
    if (link.type === 'file') return <FileText {...props} />;
    if (link.type === 'video') return <Video {...props} />;
    if (link.type === 'product') return <ShoppingBag {...props} />;
    if (link.type === 'article') return <Newspaper {...props} />;
    if (link.type === 'email') return <Mail {...props} />;
    if (link.type === 'phone') return <Phone {...props} />;
    return <Globe {...props} />;
  };

  const handleLinkClick = (link: Link) => {
    if (!isPreview) {
      LinkedTreeStore.trackLinkClick(link.id);
    }
    if (link.url) {
      window.open(link.url, link.openInNewTab ? '_blank' : '_self');
    }
  };

  // Font family selector class
  const getFontFamily = () => {
    switch (appearance.font) {
      case 'Geist': return 'font-geist';
      case 'Manrope': return 'font-manrope';
      case 'DM Sans': return 'font-dmsans';
      case 'Space Grotesk': return 'font-space';
      case 'Plus Jakarta Sans': return 'font-jakarta';
      case 'Playfair Display': return 'font-playfair';
      default: return 'font-inter';
    }
  };

  // Button Style Generator
  const getButtonClasses = () => {
    switch (appearance.buttonStyle) {
      case 'pill':
        return 'rounded-full';
      case 'outline':
        return 'border border-current bg-transparent hover:bg-white/10';
      case 'glass':
        return 'backdrop-blur-md bg-white/10 border border-white/15 hover:bg-white/15 shadow-md';
      case 'brutal':
        return 'border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1';
      case 'soft':
        return 'bg-zinc-800/70 border border-zinc-700/50 hover:bg-zinc-700/80';
      default:
        return 'rounded-xl border border-white/10';
    }
  };

  const bgStyle = appearance.backgroundType === 'gradient' && appearance.backgroundGradient
    ? { background: appearance.backgroundGradient }
    : appearance.backgroundType === 'image' && appearance.backgroundImage
    ? { backgroundImage: `url(${appearance.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: appearance.backgroundColor || '#09090B' };

  return (
    <div
      style={bgStyle}
      className={`min-h-full w-full transition-all duration-300 ${getFontFamily()} relative flex flex-col items-center p-4 sm:p-6 md:p-8 selection:bg-white/20`}
    >
      {/* Top action: Share */}
      <div className="w-full max-w-md flex justify-end mb-4">
        {onShareClick && (
          <button
            onClick={onShareClick}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all shadow-sm active:scale-90"
            title="Share profile"
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="w-full max-w-md flex flex-col items-center text-center space-y-6">
        {/* Profile Avatar & Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center space-y-3"
        >
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-white/15 shadow-2xl relative bg-zinc-800">
              {profile.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={profile.displayName}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-tr from-blue-600 to-indigo-600">
                  {profile.displayName.charAt(0)}
                </div>
              )}
            </div>
            {profile.verified && (
              <div className="absolute bottom-0 right-1 bg-blue-500 rounded-full p-1 text-white shadow-lg">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h1
              style={{ color: appearance.textColor || '#FFFFFF' }}
              className="text-xl sm:text-2xl font-bold tracking-tight"
            >
              {profile.displayName}
            </h1>
            <p
              style={{ color: appearance.secondaryColor || '#94A3B8' }}
              className="text-xs font-medium tracking-wide opacity-90"
            >
              @{profile.username}
            </p>
            {profile.headline && (
              <p
                style={{ color: appearance.textColor || '#FFFFFF' }}
                className="text-xs sm:text-sm font-medium opacity-90 max-w-sm pt-1"
              >
                {profile.headline}
              </p>
            )}
            {profile.bio && (
              <p
                style={{ color: appearance.secondaryColor || '#94A3B8' }}
                className="text-xs max-w-xs sm:max-w-sm leading-relaxed opacity-80 pt-1"
              >
                {profile.bio}
              </p>
            )}
            {profile.location && (
              <div
                style={{ color: appearance.secondaryColor || '#94A3B8' }}
                className="flex items-center justify-center gap-1 text-[11px] opacity-75 pt-1"
              >
                <MapPin className="w-3 h-3" />
                <span>{profile.location}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Social Links Row */}
        {socialLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {socialLinks.map(social => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: appearance.textColor || '#FFFFFF',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                }}
                className="p-2.5 rounded-full hover:scale-110 backdrop-blur-sm transition-all shadow-sm"
                title={social.platform}
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </motion.div>
        )}

        {/* Links Stack */}
        <div className="w-full space-y-3">
          {links.filter(l => l.isActive).map((link, idx) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => handleLinkClick(link)}
              style={{
                borderRadius: appearance.buttonRadius || '14px',
                color: appearance.cardTextColor || appearance.textColor || '#FFFFFF',
                backgroundColor: appearance.cardColor || 'rgba(24, 24, 27, 0.75)',
              }}
              className={`w-full group cursor-pointer p-3.5 sm:p-4 transition-all duration-200 flex items-center justify-between text-left shadow-md hover:scale-[1.015] active:scale-[0.99] ${getButtonClasses()}`}
            >
              <div className="flex items-center gap-3.5 min-w-0 pr-2">
                {link.thumbnail ? (
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800 border border-white/10">
                    <Image src={link.thumbnail} alt={link.title} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-white/10 flex-shrink-0">
                    {getLinkIcon(link)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-semibold truncate">
                    {link.title}
                  </div>
                  {link.description && (
                    <div className="text-[11px] opacity-75 truncate mt-0.5">
                      {link.description}
                    </div>
                  )}
                  {link.metadata?.price && (
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      {link.metadata.price}
                    </span>
                  )}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </motion.div>
          ))}
        </div>

        {/* Projects Section */}
        {projects.length > 0 && (
          <div className="w-full space-y-3 pt-2 text-left">
            <div className="flex items-center gap-2 px-1">
              <FolderGit2 className="w-4 h-4 text-blue-400" />
              <h2
                style={{ color: appearance.textColor || '#FFFFFF' }}
                className="text-xs font-bold uppercase tracking-wider opacity-90"
              >
                Featured Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  style={{
                    borderRadius: appearance.buttonRadius || '14px',
                    color: appearance.cardTextColor || appearance.textColor || '#FFFFFF',
                    backgroundColor: appearance.cardColor || 'rgba(24, 24, 27, 0.75)',
                  }}
                  className={`p-4 border border-white/10 transition-all duration-200 hover:border-white/20 shadow-md ${getButtonClasses()}`}
                >
                  {proj.image && (
                    <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3 bg-zinc-800">
                      <Image src={proj.image} alt={proj.title} fill className="object-cover" />
                    </div>
                  )}
                  <h3 className="text-sm font-bold">{proj.title}</h3>
                  <p className="text-xs opacity-75 mt-1 leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {proj.technologies.map(tech => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/10">
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium opacity-80 hover:opacity-100 flex items-center gap-1 ml-auto"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Branding Footer */}
        <div className="pt-6 pb-2">
          <a
            href="/"
            style={{ color: appearance.secondaryColor || '#94A3B8' }}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium opacity-60 hover:opacity-100 transition-opacity"
          >
            <span>Made with</span>
            <span className="font-bold text-white">Webloom</span>
          </a>
        </div>
      </div>
    </div>
  );
}
