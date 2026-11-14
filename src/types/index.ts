// ============================================================================
// WEBLOOM ENTERPRISE TYPES & DATA MODELS
// ============================================================================

export type UserRole = 'owner' | 'admin' | 'editor' | 'analyst' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  role: UserRole;
  createdAt: string;
}

export interface Workspace {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  role: UserRole;
  createdAt: string;
}

// ============================================================================
// PLANS & ENTITLEMENTS
// ============================================================================

export type PlanId = 'free' | 'starter' | 'pro' | 'business' | 'agency';
export type PlanTier = PlanId;

export type FeatureKey =
  | 'max_profiles'
  | 'max_links'
  | 'custom_domain'
  | 'remove_branding'
  | 'digital_store'
  | 'ai_assistant'
  | 'smart_routing'
  | 'analytics_retention_days'
  | 'team_collaboration'
  | 'instagram_automation';

export interface PlanEntitlement {
  featureKey: FeatureKey;
  type: 'boolean' | 'limit' | 'unlimited';
  limitValue?: number;
  description: string;
}

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  tagline?: string;
  features?: string[];
  ctaLabel?: string;
  priceInrMonthly: number;
  priceInrAnnual: number;
  priceUsdMonthly: number;
  priceUsdAnnual: number;
  entitlements: Record<FeatureKey, PlanEntitlement>;
  badge?: string;
  isPopular?: boolean;
}

export interface Subscription {
  id: string;
  organizationId: string;
  planId: PlanId;
  status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
  billingCycle: 'monthly' | 'annual';
  currency: 'INR' | 'USD';
  amount: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  paymentProvider?: 'razorpay' | 'stripe' | 'manual';
  externalSubscriptionId?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// PROFILES & CUSTOMIZATION
// ============================================================================

export interface Profile {
  id: string;
  workspaceId?: string;
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
  seoTitle?: string;
  seoDescription?: string;
  ogImageUrl?: string;
  customDomain?: string;
  themeId?: string;
  plan?: PlanId;
  createdAt?: string;
  updatedAt?: string;
}

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

export interface SocialLink {
  id: string;
  profileId: string;
  platform: SocialPlatform;
  url: string;
  sortOrder: number;
  createdAt?: string;
}

// ============================================================================
// MODULAR PAGE BLOCKS (Block-Based Architecture)
// ============================================================================

export type BlockType =
  | 'link'
  | 'heading'
  | 'text'
  | 'image'
  | 'gallery'
  | 'video'
  | 'youtube'
  | 'spotify'
  | 'music_player'
  | 'product'
  | 'booking'
  | 'contact_form'
  | 'newsletter'
  | 'countdown'
  | 'map'
  | 'faq'
  | 'testimonials'
  | 'pricing'
  | 'tip_jar'
  | 'divider'
  | 'spacer'
  | 'custom_html';

export interface PageBlock {
  id: string;
  profileId: string;
  blockType: BlockType;
  title?: string;
  subtitle?: string;
  config: Record<string, any>;
  sortOrder: number;
  isActive: boolean;
  isPinned?: boolean;
  scheduleStart?: string;
  scheduleEnd?: string;
  visibilityRule?: 'all' | 'mobile_only' | 'desktop_only' | 'members_only';
  clickCount: number;
  createdAt: string;
  updatedAt: string;
}

// Backward-compatible Link interface
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

// ============================================================================
// COMMERCE & STOREFRONT
// ============================================================================

export type ProductType = 
  | 'digital_download' 
  | 'course' 
  | 'membership' 
  | 'service' 
  | 'booking' 
  | 'physical';

export interface Product {
  id: string;
  profileId: string;
  title: string;
  slug: string;
  description: string;
  productType: ProductType;
  priceInr: number;
  priceUsd: number;
  compareAtPriceInr?: number;
  currency: 'INR' | 'USD';
  coverImageUrl?: string;
  galleryUrls?: string[];
  downloadFileUrl?: string;
  redirectUrl?: string;
  isActive: boolean;
  inventoryCount: number; // -1 = unlimited
  salesCount: number;
  totalRevenueInr: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  profileId: string;
  orderNumber: string;
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
  subtotalAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  paymentStatus: 'pending' | 'processing' | 'paid' | 'failed' | 'refunded';
  fulfillmentStatus: 'unfulfilled' | 'fulfilled' | 'partially_fulfilled';
  paymentProvider: 'razorpay' | 'stripe' | 'manual';
  externalPaymentId?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productTitle: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  downloadToken?: string;
  downloadExpiresAt?: string;
}

// ============================================================================
// AUDIENCE CRM & MARKETING
// ============================================================================

export interface Subscriber {
  id: string;
  profileId: string;
  email: string;
  name?: string;
  phone?: string;
  source: string;
  tags: string[];
  isActive: boolean;
  consentGiven: boolean;
  createdAt: string;
}

export interface EmailCampaign {
  id: string;
  profileId: string;
  title: string;
  subject: string;
  contentHtml: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'canceled';
  scheduledAt?: string;
  sentAt?: string;
  recipientsCount: number;
  openedCount: number;
  clickedCount: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// BOOKINGS & SERVICES
// ============================================================================

export interface Service {
  id: string;
  profileId: string;
  title: string;
  description?: string;
  durationMinutes: number;
  priceInr: number;
  currency: string;
  locationType: 'video' | 'phone' | 'in_person';
  meetingUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  profileId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  scheduledAt: string;
  durationMinutes: number;
  status: 'pending' | 'confirmed' | 'rescheduled' | 'completed' | 'canceled';
  notes?: string;
  createdAt: string;
}

// ============================================================================
// AI SUBSYSTEM
// ============================================================================

export type AIFeatureType =
  | 'profile_builder'
  | 'bio_writer'
  | 'copy_assistant'
  | 'analytics_advisor'
  | 'conversion_optimizer'
  | 'design_suggester';

export interface AIGenerationRequest {
  featureType: AIFeatureType;
  prompt: string;
  context?: Record<string, any>;
}

export interface AIGenerationResponse {
  success: boolean;
  featureType: AIFeatureType;
  data: any;
  tokensConsumed?: number;
  error?: string;
}

// ============================================================================
// THEMES & STYLING
// ============================================================================

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
export type ProfileLayout = 'standard' | 'bento' | 'storefront' | 'editorial' | 'booking' | 'compact' | 'grid' | 'cards';

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
  layout: ProfileLayout;
  cardStyle: CardStyle;
  animation: AnimationPreset;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// ANALYTICS & TELEMETRY
// ============================================================================

export interface AnalyticsEvent {
  id: string;
  profileId: string;
  linkId?: string;
  blockId?: string;
  eventType: 'PROFILE_VIEW' | 'LINK_CLICK' | 'PROJECT_VIEW' | 'SOCIAL_CLICK' | 'PRODUCT_VIEW' | 'CHECKOUT_START';
  timestamp: string;
  referrer?: string;
  country?: string;
  device?: 'desktop' | 'mobile' | 'tablet';
  browser?: string;
}

export type ActivityType = 'link' | 'project' | 'profile' | 'theme' | 'view' | 'publish' | 'order' | 'subscriber' | 'booking' | 'block' | 'store' | 'social' | 'status';

export interface ActivityItem {
  id: string;
  title: string;
  time: string;
  type: ActivityType;
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
  blocks?: PageBlock[];
  socialLinks: SocialLink[];
  projects: Project[];
  products?: Product[];
  appearance: AppearanceSettings;
}
