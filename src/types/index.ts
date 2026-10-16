export type LinkType = 
  | 'url' 
  | 'social' 
  | 'video' 
  | 'product' 
  | 'article' 
  | 'file' 
  | 'music'
  | 'email' 
  | 'phone';

export type SocialPlatform = 
  | 'instagram' 
  | 'x' 
  | 'linkedin' 
  | 'github' 
  | 'youtube' 
  | 'tiktok' 
  | 'discord' 
  | 'facebook' 
  | 'threads' 
  | 'dribbble' 
  | 'behance' 
  | 'medium' 
  | 'spotify';

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  headline?: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  location?: string;
  website?: string;
  email?: string;
  phone?: string;
  verified?: boolean;
  isPublished?: boolean;
  seoIndexing?: boolean;
  customDomain?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SocialLink {
  id: string;
  profileId: string;
  platform: SocialPlatform;
  url: string;
  sortOrder: number;
  createdAt?: string;
}

export interface Link {
  id: string;
  profileId: string;
  title: string;
  description?: string;
  url: string;
  icon?: string;
  thumbnail?: string;
  type: LinkType;
  isActive: boolean;
  sortOrder: number;
  clickCount: number;
  openInNewTab?: boolean;
  metadata?: {
    price?: string;
    publisher?: string;
    embedUrl?: string;
    fileSize?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  profileId: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type ThemePreset = 
  | 'minimal' 
  | 'midnight' 
  | 'aurora' 
  | 'ocean' 
  | 'sunset' 
  | 'paper' 
  | 'mono' 
  | 'glass' 
  | 'elegant' 
  | 'developer'
  | 'cyberpunk'
  | 'neon'
  | 'forest';

export type ButtonStyle = 'rounded' | 'pill' | 'soft' | 'outline' | 'glass' | 'minimal' | 'brutal';
export type CardStyle = 'flat' | 'elevated' | 'glass' | 'border' | 'minimal';
export type FontChoice = 'Inter' | 'Geist' | 'Manrope' | 'DM Sans' | 'Space Grotesk' | 'Plus Jakarta Sans' | 'Playfair Display';
export type BackgroundType = 'solid' | 'gradient' | 'animated' | 'image';
export type AnimationPreset = 'none' | 'subtle' | 'smooth' | 'bounce' | 'slide';

export interface AppearanceSettings {
  id: string;
  profileId: string;
  theme: ThemePreset;
  backgroundType: BackgroundType;
  backgroundColor: string;
  backgroundGradient?: string;
  backgroundImage?: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  cardColor?: string;
  cardTextColor?: string;
  buttonStyle: ButtonStyle;
  buttonRadius: string;
  font: FontChoice;
  layout: 'standard' | 'compact' | 'grid' | 'cards';
  cardStyle: CardStyle;
  animation: AnimationPreset;
  createdAt?: string;
  updatedAt?: string;
}

export interface AnalyticsEvent {
  id: string;
  profileId: string;
  linkId?: string;
  eventType: 'PROFILE_VIEW' | 'LINK_CLICK' | 'PROJECT_VIEW' | 'SOCIAL_CLICK';
  timestamp: string;
  referrer?: string;
  country?: string;
  device?: 'desktop' | 'mobile' | 'tablet';
  browser?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  time: string;
  type: 'link' | 'project' | 'profile' | 'theme' | 'view' | 'publish';
  timestamp: string;
}

export interface AnalyticsSummary {
  profileViews: number;
  linkClicks: number;
  clickThroughRate: number;
  viewsChange?: string;
  clicksChange?: string;
  ctrChange?: string;
  followersCount: number;
  viewsChart: { date: string; views: number }[];
  clicksChart: { date: string; clicks: number }[];
  deviceBreakdown: { name: string; value: number; color: string }[];
  topReferrers: { source: string; visits: number; percentage: number }[];
  topLocations: { country: string; code: string; visitors: number }[];
  topLinks: { id: string; title: string; url: string; clicks: number; ctr: number }[];
}

export interface PublicProfileData {
  profile: Profile;
  links: Link[];
  socialLinks: SocialLink[];
  projects: Project[];
  appearance: AppearanceSettings;
}
