'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
  FolderGit2,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Tag,
  Star,
  Download,
  CreditCard,
  Check,
  Layers,
  Grid,
  Layout,
  Store,
  BookOpen,
  DollarSign,
  Video as VideoIcon
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
import { 
  AppearanceSettings, 
  Link, 
  Profile, 
  Project, 
  SocialLink, 
  SocialPlatform, 
  PageBlock, 
  Product, 
  Service, 
  ProfileLayout 
} from '@/types';
import { LinkedTreeStore } from '@/lib/storage';
import { BlockRenderer } from '@/components/blocks/block-renderer';

interface ProfileRendererProps {
  profile: Profile;
  links: Link[];
  blocks?: PageBlock[];
  products?: Product[];
  services?: Service[];
  socialLinks: SocialLink[];
  projects: Project[];
  appearance: AppearanceSettings;
  isPreview?: boolean;
  onShareClick?: () => void;
  onProductClick?: (productId: string) => void;
  onBookingClick?: (serviceId: string) => void;
}

export function ProfileRenderer({
  profile,
  links,
  blocks,
  products,
  services,
  socialLinks,
  projects,
  appearance,
  isPreview = false,
  onShareClick,
  onProductClick,
  onBookingClick,
}: ProfileRendererProps) {
  // Currency toggle state: INR (₹) or USD ($)
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  // Newsletter lead capture state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Fallback data if not passed
  const activeProducts = (products && products.length > 0)
    ? products.filter(p => p.isActive)
    : LinkedTreeStore.getProducts(profile.id).filter(p => p.isActive);

  const activeServices = (services && services.length > 0)
    ? services.filter(s => s.isActive)
    : LinkedTreeStore.getServices(profile.id).filter(s => s.isActive);

  const activeBlocks = (blocks && blocks.length > 0)
    ? blocks.filter(b => b.isActive)
    : LinkedTreeStore.getBlocks(profile.id).filter(b => b.isActive);

  const activeLinks = links.filter(l => l.isActive);

  const activeLayout: ProfileLayout = (appearance.layout as ProfileLayout) || 'standard';

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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterError('Please enter a valid email address');
      return;
    }

    setNewsletterLoading(true);
    try {
      // Pure frontend local store persistence
      LinkedTreeStore.addSubscriber({
        profileId: profile.id,
        email: newsletterEmail.trim(),
        source: 'public_profile',
      });
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    } catch (err: any) {
      setNewsletterError('Could not process subscription. Please try again.');
    } finally {
      setNewsletterLoading(false);
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

  // Common Header Section
  const renderProfileHeader = (isSplit = false) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center ${isSplit ? 'md:items-start text-center md:text-left' : 'text-center'} space-y-3.5`}
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
            <div className="w-full h-full flex items-center justify-center text-3xl font-serif font-bold text-white bg-gradient-to-tr from-amber-700 via-stone-800 to-amber-900">
              {profile.displayName ? profile.displayName.charAt(0) : 'W'}
            </div>
          )}
        </div>
        {profile.verified && (
          <div className="absolute bottom-0 right-1 bg-amber-500 rounded-full p-1 text-black shadow-lg" title="Verified Creator">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="space-y-1.5 w-full">
        <div className={`flex items-center gap-2 ${isSplit ? 'justify-center md:justify-start' : 'justify-center'}`}>
          <h1
            style={{ color: appearance.textColor || '#FFFFFF' }}
            className="text-xl sm:text-2xl font-bold tracking-tight"
          >
            {profile.displayName}
          </h1>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        </div>

        <p
          style={{ color: appearance.secondaryColor || '#94A3B8' }}
          className="text-xs font-mono tracking-wide opacity-90"
        >
          @{profile.username}
        </p>

        {profile.headline && (
          <p
            style={{ color: appearance.textColor || '#FFFFFF' }}
            className="text-xs sm:text-sm font-medium opacity-90 max-w-sm pt-0.5"
          >
            {profile.headline}
          </p>
        )}

        {profile.bio && (
          <p
            style={{ color: appearance.secondaryColor || '#94A3B8' }}
            className="text-xs max-w-xs sm:max-w-sm leading-relaxed opacity-80 pt-0.5"
          >
            {profile.bio}
          </p>
        )}

        {profile.location && (
          <div
            style={{ color: appearance.secondaryColor || '#94A3B8' }}
            className={`flex items-center gap-1 text-[11px] opacity-75 pt-1 ${isSplit ? 'justify-center md:justify-start' : 'justify-center'}`}
          >
            <MapPin className="w-3 h-3" />
            <span>{profile.location}</span>
          </div>
        )}
      </div>

      {/* Social Links Row */}
      {socialLinks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex flex-wrap items-center gap-2 pt-1 ${isSplit ? 'justify-center md:justify-start' : 'justify-center'}`}
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
              className="p-2.5 rounded-full hover:scale-110 backdrop-blur-sm transition-all shadow-sm border border-white/10"
              title={social.platform}
            >
              {getSocialIcon(social.platform)}
            </a>
          ))}
        </motion.div>
      )}
    </motion.div>
  );

  // Modular Commerce Storefront Showcase
  const renderProductsSection = () => {
    if (activeProducts.length === 0) return null;

    return (
      <div className="w-full space-y-3.5 pt-2 text-left">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <h2
              style={{ color: appearance.textColor || '#FFFFFF' }}
              className="text-xs font-bold uppercase tracking-wider opacity-90"
            >
              Digital Store & Goods
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono bg-white/10 p-0.5 rounded-md">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-1.5 py-0.5 rounded ${currency === 'INR' ? 'bg-amber-400 text-black font-bold' : 'opacity-70 text-white'}`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-1.5 py-0.5 rounded ${currency === 'USD' ? 'bg-amber-400 text-black font-bold' : 'opacity-70 text-white'}`}
            >
              $ USD
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activeProducts.map(prod => {
            const price = currency === 'INR' ? `₹${prod.priceInr}` : `$${prod.priceUsd}`;
            return (
              <div
                key={prod.id}
                onClick={() => onProductClick && onProductClick(prod.id)}
                style={{
                  borderRadius: appearance.buttonRadius || '16px',
                  color: appearance.cardTextColor || appearance.textColor || '#FFFFFF',
                  backgroundColor: appearance.cardColor || 'rgba(24, 24, 27, 0.75)',
                }}
                className="group relative border border-white/10 hover:border-amber-400/40 p-4 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  {prod.coverImageUrl && (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 bg-zinc-800">
                      <Image src={prod.coverImageUrl} alt={prod.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 font-semibold">
                      {prod.productType.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold font-mono text-emerald-400">
                      {price}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold tracking-tight line-clamp-1">{prod.title}</h3>
                  <p className="text-[11px] opacity-75 mt-1 line-clamp-2 leading-relaxed">{prod.description}</p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] opacity-70 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Instant access
                  </span>
                  <button
                    type="button"
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-black text-xs font-medium transition-all flex items-center gap-1"
                  >
                    <span>Get</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Modular Bookings & 1-on-1 Services
  const renderBookingsSection = () => {
    if (activeServices.length === 0) return null;

    return (
      <div className="w-full space-y-3.5 pt-2 text-left">
        <div className="flex items-center gap-2 px-1">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <h2
            style={{ color: appearance.textColor || '#FFFFFF' }}
            className="text-xs font-bold uppercase tracking-wider opacity-90"
          >
            1-on-1 Consultations & Sessions
          </h2>
        </div>

        <div className="space-y-2.5">
          {activeServices.map(srv => {
            const price = currency === 'INR' ? `₹${srv.priceInr}` : `$${Math.round(srv.priceInr / 80)}`;
            return (
              <div
                key={srv.id}
                onClick={() => onBookingClick && onBookingClick(srv.id)}
                style={{
                  borderRadius: appearance.buttonRadius || '16px',
                  color: appearance.cardTextColor || appearance.textColor || '#FFFFFF',
                  backgroundColor: appearance.cardColor || 'rgba(24, 24, 27, 0.75)',
                }}
                className="group border border-white/10 hover:border-emerald-400/40 p-4 transition-all duration-200 cursor-pointer shadow-md flex items-center justify-between gap-4 hover:-translate-y-0.5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-medium font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center gap-1 border border-emerald-500/25">
                      <Clock className="w-3 h-3" />
                      {srv.durationMinutes} mins
                    </span>
                    <span className="text-[10px] font-medium font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 flex items-center gap-1 border border-blue-500/25">
                      <VideoIcon className="w-3 h-3" />
                      Google Meet
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold tracking-tight truncate">{srv.title}</h3>
                  {srv.description && (
                    <p className="text-[11px] opacity-75 mt-0.5 line-clamp-1">{srv.description}</p>
                  )}
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-xs sm:text-sm font-bold font-mono text-emerald-400 mb-1">{price}</div>
                  <button
                    type="button"
                    className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-all shadow-xs"
                  >
                    Schedule
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Modular Audience Lead Magnet Widget
  const renderNewsletterCard = () => (
    <div
      style={{
        borderRadius: appearance.buttonRadius || '16px',
        color: appearance.cardTextColor || appearance.textColor || '#FFFFFF',
        backgroundColor: appearance.cardColor || 'rgba(24, 24, 27, 0.75)',
      }}
      className="w-full border border-white/10 p-4 sm:p-5 text-left shadow-lg relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider opacity-90">Newsletter & Updates</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300">
          ✨ 1,200+ Readers
        </span>
      </div>

      <h3 className="text-sm font-bold mb-1">Stay in the loop with {profile.displayName}</h3>
      <p className="text-xs opacity-75 mb-3 leading-relaxed">
        Receive curated notes, new product releases, and private insights delivered directly to your inbox.
      </p>

      {newsletterSuccess ? (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>You're subscribed! Welcome to the inner circle.</span>
        </div>
      ) : (
        <form onSubmit={handleNewsletterSubmit} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email..."
              required
              className="flex-1 bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all"
            />
            <button
              type="submit"
              disabled={newsletterLoading}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs transition-all shadow-xs disabled:opacity-50 flex items-center gap-1.5"
            >
              {newsletterLoading ? 'Joining...' : 'Subscribe'}
            </button>
          </div>
          {newsletterError && (
            <p className="text-[11px] text-rose-400 pl-1">{newsletterError}</p>
          )}
        </form>
      )}
    </div>
  );

  // Modular Links Stack
  const renderLinksStack = () => (
    <div className="w-full space-y-2.5">
      {activeLinks.map((link, idx) => (
        <motion.div
          key={link.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.03 }}
          onClick={() => handleLinkClick(link)}
          style={{
            borderRadius: appearance.buttonRadius || '14px',
            color: appearance.cardTextColor || appearance.textColor || '#FFFFFF',
            backgroundColor: appearance.cardColor || 'rgba(24, 24, 27, 0.75)',
          }}
          className={`w-full group cursor-pointer p-3.5 sm:p-4 transition-all duration-200 flex items-center justify-between text-left shadow-md hover:scale-[1.01] active:scale-[0.99] border border-white/10 hover:border-white/20 ${getButtonClasses()}`}
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
  );

  // Modular Blocks Renderer
  const renderBlocksStack = () => {
    if (activeBlocks.length === 0) return null;
    return (
      <div className="w-full space-y-3">
        {activeBlocks.map((block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            appearance={appearance}
            isPreview={isPreview}
            onProductClick={onProductClick}
            onBookingClick={onBookingClick}
          />
        ))}
      </div>
    );
  };

  // Modular Projects
  const renderProjectsSection = () => {
    if (projects.length === 0) return null;
    return (
      <div className="w-full space-y-3 pt-2 text-left">
        <div className="flex items-center gap-2 px-1">
          <FolderGit2 className="w-4 h-4 text-blue-400" />
          <h2
            style={{ color: appearance.textColor || '#FFFFFF' }}
            className="text-xs font-bold uppercase tracking-wider opacity-90"
          >
            Featured Portfolio
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.map((proj) => (
            <div
              key={proj.id}
              style={{
                borderRadius: appearance.buttonRadius || '14px',
                color: appearance.cardTextColor || appearance.textColor || '#FFFFFF',
                backgroundColor: appearance.cardColor || 'rgba(24, 24, 27, 0.75)',
              }}
              className="p-4 border border-white/10 hover:border-white/20 transition-all duration-200 shadow-md flex flex-col justify-between"
            >
              <div>
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
              </div>
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
    );
  };

  // =========================================================================
  // 1. CLASSIC / STANDARD LAYOUT (Clean Vertical Editorial Stream)
  // =========================================================================
  const renderClassicLayout = () => (
    <div className="w-full max-w-md md:max-w-xl flex flex-col items-center space-y-6">
      {renderProfileHeader(false)}
      {renderNewsletterCard()}
      {renderProductsSection()}
      {renderBookingsSection()}
      {renderBlocksStack()}
      {renderLinksStack()}
      {renderProjectsSection()}
    </div>
  );

  // =========================================================================
  // 2. MODERN CREATOR BENTO GRID LAYOUT (Multi-Column Dynamic Responsive)
  // =========================================================================
  const renderBentoLayout = () => (
    <div className="w-full max-w-4xl lg:max-w-5xl space-y-6">
      {/* Top Banner Bento Header */}
      <div
        style={{
          borderRadius: appearance.buttonRadius || '24px',
          color: appearance.cardTextColor || appearance.textColor || '#FFFFFF',
          backgroundColor: appearance.cardColor || 'rgba(24, 24, 27, 0.75)',
        }}
        className="p-6 sm:p-8 border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-white/15 shadow-2xl relative bg-zinc-800">
              {profile.avatar ? (
                <Image src={profile.avatar} alt={profile.displayName} fill className="object-cover" priority />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-serif font-bold text-white bg-gradient-to-tr from-amber-600 to-stone-900">
                  {profile.displayName.charAt(0)}
                </div>
              )}
            </div>
            {profile.verified && (
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-black rounded-full p-1 shadow-md">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 style={{ color: appearance.textColor || '#FFFFFF' }} className="text-2xl sm:text-3xl font-bold tracking-tight">
                {profile.displayName}
              </h1>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Projects
              </span>
            </div>

            <p style={{ color: appearance.secondaryColor || '#94A3B8' }} className="text-xs font-mono">
              @{profile.username} {profile.location && `• ${profile.location}`}
            </p>

            {profile.headline && (
              <p style={{ color: appearance.textColor || '#FFFFFF' }} className="text-sm font-medium opacity-90 max-w-xl">
                {profile.headline}
              </p>
            )}

            {socialLinks.length > 0 && (
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                {socialLinks.map(s => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-white hover:scale-105"
                  >
                    {getSocialIcon(s.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Bento Item: Newsletter Magnet (Full Width or 2-col) */}
        <div className="md:col-span-2">
          {renderNewsletterCard()}
        </div>

        {/* Bento Item: Quick Stats / Bio Tile */}
        <div
          style={{
            borderRadius: appearance.buttonRadius || '16px',
            color: appearance.cardTextColor || appearance.textColor || '#FFFFFF',
            backgroundColor: appearance.cardColor || 'rgba(24, 24, 27, 0.75)',
          }}
          className="border border-white/10 p-5 flex flex-col justify-between shadow-md text-left"
        >
          <div>
            <div className="flex items-center gap-2 mb-2 text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Creator Bio</span>
            </div>
            <p className="text-xs opacity-80 leading-relaxed">
              {profile.bio || 'Crafting digital experiences, tools, and written thoughts.'}
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono opacity-70">
            <span>Verified Creator</span>
            <span>Webloom Studio</span>
          </div>
        </div>

        {/* Bento Item: Digital Products (2 Cols) */}
        {activeProducts.length > 0 && (
          <div className="md:col-span-2">
            {renderProductsSection()}
          </div>
        )}

        {/* Bento Item: Bookings */}
        {activeServices.length > 0 && (
          <div className={activeProducts.length > 0 ? 'md:col-span-1' : 'md:col-span-2'}>
            {renderBookingsSection()}
          </div>
        )}

        {/* Bento Item: Polymorphic Blocks */}
        {activeBlocks.length > 0 && (
          <div className="md:col-span-3">
            {renderBlocksStack()}
          </div>
        )}

        {/* Bento Item: Links */}
        <div className="md:col-span-3">
          <div className="text-left mb-2 px-1 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-amber-400" />
            <h2 style={{ color: appearance.textColor || '#FFFFFF' }} className="text-xs font-bold uppercase tracking-wider opacity-90">
              Essential Bookmarks
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeLinks.map(link => (
              <div
                key={link.id}
                onClick={() => handleLinkClick(link)}
                style={{
                  borderRadius: appearance.buttonRadius || '14px',
                  color: appearance.cardTextColor || appearance.textColor || '#FFFFFF',
                  backgroundColor: appearance.cardColor || 'rgba(24, 24, 27, 0.75)',
                }}
                className="p-3.5 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between cursor-pointer shadow-sm hover:-translate-y-0.5 text-left"
              >
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold truncate">{link.title}</div>
                  {link.description && <div className="text-[10px] opacity-70 truncate mt-0.5">{link.description}</div>}
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Bento Item: Projects */}
        {projects.length > 0 && (
          <div className="md:col-span-3">
            {renderProjectsSection()}
          </div>
        )}
      </div>
    </div>
  );

  // =========================================================================
  // 3. STOREFRONT FIRST LAYOUT (Optimized for Commerce Creators)
  // =========================================================================
  const renderStorefrontLayout = () => (
    <div className="w-full max-w-4xl space-y-6">
      {renderProfileHeader(false)}

      {/* Featured Products Prominent Hero */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-5 sm:p-6 text-left">
        <div className="flex items-center gap-2 mb-1">
          <Store className="w-5 h-5 text-amber-400" />
          <h2 className="text-sm sm:text-base font-bold text-amber-300">Creator Official Digital Storefront</h2>
        </div>
        <p className="text-xs opacity-80 mb-4 max-w-lg">
          Explore exclusive digital products, course downloads, and templates. Secure instant fulfillment.
        </p>
        {renderProductsSection()}
      </div>

      {renderBookingsSection()}
      {renderNewsletterCard()}
      {renderBlocksStack()}
      {renderLinksStack()}
      {renderProjectsSection()}
    </div>
  );

  // =========================================================================
  // 4. EDITORIAL SPLIT-SCREEN LAYOUT (PC Split Screen / Mobile Stacked)
  // =========================================================================
  const renderEditorialLayout = () => (
    <div className="w-full max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Sticky Profile Card on Desktop */}
        <div className="md:col-span-5 md:sticky md:top-8 self-start space-y-6">
          <div
            style={{
              borderRadius: appearance.buttonRadius || '24px',
              color: appearance.cardTextColor || appearance.textColor || '#FFFFFF',
              backgroundColor: appearance.cardColor || 'rgba(24, 24, 27, 0.75)',
            }}
            className="p-6 border border-white/10 shadow-xl backdrop-blur-md"
          >
            {renderProfileHeader(true)}
            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  const el = document.getElementById('editorial-store');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs transition-all shadow-xs"
              >
                Browse Shop & Services
              </button>
            </div>
          </div>

          {renderNewsletterCard()}
        </div>

        {/* Right Scrollable Column */}
        <div className="md:col-span-7 space-y-6">
          <div id="editorial-store">
            {renderProductsSection()}
          </div>
          {renderBookingsSection()}
          {renderBlocksStack()}
          {renderLinksStack()}
          {renderProjectsSection()}
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // 5. CONSULTANT & BOOKING FIRST LAYOUT
  // =========================================================================
  const renderBookingLayout = () => (
    <div className="w-full max-w-4xl space-y-6">
      {renderProfileHeader(false)}

      {/* Prominent Consultation Banner */}
      <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-3xl p-5 sm:p-6 text-left shadow-xl">
        <div className="flex items-center gap-2 mb-1.5">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm sm:text-base font-bold text-emerald-300">
            Book a 1-on-1 Consultation
          </h2>
        </div>
        <p className="text-xs opacity-80 mb-4 max-w-lg">
          Reserve private mentoring, strategy calls, or portfolio reviews directly on the calendar.
        </p>
        {renderBookingsSection()}
      </div>

      {renderProductsSection()}
      {renderNewsletterCard()}
      {renderBlocksStack()}
      {renderLinksStack()}
      {renderProjectsSection()}
    </div>
  );

  // Master Layout Switcher
  const renderLayoutContent = () => {
    switch (activeLayout) {
      case 'bento':
      case 'grid':
        return renderBentoLayout();
      case 'storefront':
        return renderStorefrontLayout();
      case 'editorial':
        return renderEditorialLayout();
      case 'booking':
        return renderBookingLayout();
      case 'standard':
      case 'compact':
      case 'cards':
      default:
        return renderClassicLayout();
    }
  };

  return (
    <div
      style={bgStyle}
      className={`min-h-full w-full transition-all duration-300 ${getFontFamily()} relative flex flex-col items-center p-4 sm:p-6 md:p-8 selection:bg-white/20`}
    >
      {/* Top action: Share */}
      <div className="w-full max-w-5xl flex justify-end mb-4">
        {onShareClick && (
          <button
            onClick={onShareClick}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white transition-all shadow-sm active:scale-90"
            title="Share profile"
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Render Active Dynamic Layout */}
      {renderLayoutContent()}

      {/* Branding Footer */}
      <div className="pt-10 pb-4 text-center">
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
  );
}
