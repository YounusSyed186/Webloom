'use client';

import { 
  AppearanceSettings, 
  Link, 
  Profile, 
  Project, 
  SocialLink, 
  AnalyticsSummary, 
  PublicProfileData, 
  AnalyticsEvent, 
  ActivityItem,
  User,
  PageBlock,
  Product,
  Order,
  Subscriber,
  Service,
  Booking
} from '@/types';
import { DEFAULT_APPEARANCE, THEME_PRESETS } from './themes';
import { 
  INITIAL_ANALYTICS, 
  INITIAL_APPEARANCE, 
  INITIAL_LINKS, 
  INITIAL_PROFILE, 
  INITIAL_PROJECTS, 
  INITIAL_SOCIAL_LINKS,
  INITIAL_BLOCKS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_SUBSCRIBERS,
  INITIAL_SERVICES,
  INITIAL_BOOKINGS
} from './mock-data';
import { supabase } from './supabase/client';
import { aggregateAnalytics } from './analytics';
import { normalizeUsername, validateUsername } from './validation';

const STORAGE_PREFIX = 'linked_tree_v2_';

const KEYS = {
  CURRENT_USER: `${STORAGE_PREFIX}current_user`,
  USERS: `${STORAGE_PREFIX}users`,
  PROFILES: `${STORAGE_PREFIX}profiles`,
  LINKS: `${STORAGE_PREFIX}links`,
  BLOCKS: `${STORAGE_PREFIX}blocks`,
  PRODUCTS: `${STORAGE_PREFIX}products`,
  ORDERS: `${STORAGE_PREFIX}orders`,
  SUBSCRIBERS: `${STORAGE_PREFIX}subscribers`,
  SERVICES: `${STORAGE_PREFIX}services`,
  BOOKINGS: `${STORAGE_PREFIX}bookings`,
  SOCIAL_LINKS: `${STORAGE_PREFIX}social_links`,
  PROJECTS: `${STORAGE_PREFIX}projects`,
  APPEARANCE: `${STORAGE_PREFIX}appearance`,
  EVENTS: `${STORAGE_PREFIX}analytics_events`,
  ACTIVITY: `${STORAGE_PREFIX}activity_logs`,
};

export class LinkedTreeStore {
  private static isClient = typeof window !== 'undefined';

  // Helper for localStorage with safety
  private static getStored<T>(key: string, fallback: T): T {
    if (!this.isClient) return fallback;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private static setStored<T>(key: string, value: T): void {
    if (!this.isClient) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Storage write error:', err);
    }
  }

  // --- INITIALIZATION ---
  public static ensureInitialized(): void {
    if (!this.isClient) return;

    // Check if initial profile exists, if not populate seed data
    const profiles = this.getStored<Record<string, Profile>>(KEYS.PROFILES, {});
    const users = this.getStored<Record<string, User>>(KEYS.USERS, {});

    if (Object.keys(profiles).length === 0 || !users[INITIAL_PROFILE.userId]) {
      const defaultUser: User = {
        id: INITIAL_PROFILE.userId,
        email: INITIAL_PROFILE.email || 'demo@webloom.site',
        name: INITIAL_PROFILE.displayName,
        username: INITIAL_PROFILE.username,
        avatar: INITIAL_PROFILE.avatar,
        createdAt: INITIAL_PROFILE.createdAt || new Date().toISOString(),
        updatedAt: INITIAL_PROFILE.updatedAt || new Date().toISOString(),
      };

      const demoUser: User = {
        id: 'user_demo_1',
        email: 'demo@webloom.site',
        name: 'Younus Syed',
        username: 'younus',
        avatar: INITIAL_PROFILE.avatar,
        createdAt: '2026-01-15T10:00:00Z',
        updatedAt: '2026-10-08T04:00:00Z',
      };

      const allUsers: Record<string, User> = { 
        ...users,
        [defaultUser.id]: defaultUser,
        [demoUser.id]: demoUser 
      };

      profiles[INITIAL_PROFILE.id] = { ...INITIAL_PROFILE, isPublished: true, seoIndexing: true };

      const linksMap = this.getStored<Record<string, Link[]>>(KEYS.LINKS, {});
      linksMap[INITIAL_PROFILE.id] = INITIAL_LINKS;

      const socialsMap = this.getStored<Record<string, SocialLink[]>>(KEYS.SOCIAL_LINKS, {});
      socialsMap[INITIAL_PROFILE.id] = INITIAL_SOCIAL_LINKS;

      const projectsMap = this.getStored<Record<string, Project[]>>(KEYS.PROJECTS, {});
      projectsMap[INITIAL_PROFILE.id] = INITIAL_PROJECTS;

      const appearanceMap = this.getStored<Record<string, AppearanceSettings>>(KEYS.APPEARANCE, {});
      appearanceMap[INITIAL_PROFILE.id] = INITIAL_APPEARANCE;

      const blocksMap = this.getStored<Record<string, PageBlock[]>>(KEYS.BLOCKS, {});
      blocksMap[INITIAL_PROFILE.id] = INITIAL_BLOCKS;

      const productsMap = this.getStored<Record<string, Product[]>>(KEYS.PRODUCTS, {});
      productsMap[INITIAL_PROFILE.id] = INITIAL_PRODUCTS;

      const ordersMap = this.getStored<Record<string, Order[]>>(KEYS.ORDERS, {});
      ordersMap[INITIAL_PROFILE.id] = INITIAL_ORDERS;

      const subscribersMap = this.getStored<Record<string, Subscriber[]>>(KEYS.SUBSCRIBERS, {});
      subscribersMap[INITIAL_PROFILE.id] = INITIAL_SUBSCRIBERS;

      const servicesMap = this.getStored<Record<string, Service[]>>(KEYS.SERVICES, {});
      servicesMap[INITIAL_PROFILE.id] = INITIAL_SERVICES;

      const bookingsMap = this.getStored<Record<string, Booking[]>>(KEYS.BOOKINGS, {});
      bookingsMap[INITIAL_PROFILE.id] = INITIAL_BOOKINGS;

      // Seed initial analytics events over 30 days
      const events: AnalyticsEvent[] = [];
      const now = Date.now();
      for (let i = 30; i >= 0; i--) {
        const dayTime = now - i * 24 * 60 * 60 * 1000;
        const countViews = Math.floor(25 + Math.random() * 45);
        for (let v = 0; v < countViews; v++) {
          events.push({
            id: `evt_view_${i}_${v}`,
            profileId: INITIAL_PROFILE.id,
            eventType: 'PROFILE_VIEW',
            timestamp: new Date(dayTime + v * 28000).toISOString(),
            referrer: ['X / Twitter', 'GitHub', 'LinkedIn', 'Direct / Bio Link', 'Google Search'][v % 5],
            device: v % 3 === 0 ? 'desktop' : v % 3 === 1 ? 'mobile' : 'tablet',
            country: ['United States', 'United Kingdom', 'Germany', 'Canada', 'India'][v % 5],
          });
        }
        const countClicks = Math.floor(countViews * 0.42);
        for (let c = 0; c < countClicks; c++) {
          const targetLink = INITIAL_LINKS[c % INITIAL_LINKS.length];
          events.push({
            id: `evt_click_${i}_${c}`,
            profileId: INITIAL_PROFILE.id,
            linkId: targetLink?.id,
            eventType: 'LINK_CLICK',
            timestamp: new Date(dayTime + c * 42000).toISOString(),
            referrer: ['X / Twitter', 'GitHub', 'LinkedIn', 'Direct / Bio Link'][c % 4],
            device: c % 2 === 0 ? 'mobile' : 'desktop',
            country: ['United States', 'United Kingdom', 'Germany'][c % 3],
          });
        }
      }

      const initialActivities: ActivityItem[] = [
        { id: 'act_1', title: 'Theme updated to "Midnight Obsidian"', time: '2 hours ago', type: 'theme', timestamp: new Date(now - 7200000).toISOString() },
        { id: 'act_2', title: 'Added project "PropertyLedge SaaS"', time: '1 day ago', type: 'project', timestamp: new Date(now - 86400000).toISOString() },
        { id: 'act_3', title: 'New link "Interactive Portfolio & Work" published', time: '3 days ago', type: 'link', timestamp: new Date(now - 259200000).toISOString() },
        { id: 'act_4', title: 'Added project "Agentic Studio AI"', time: '4 days ago', type: 'project', timestamp: new Date(now - 345600000).toISOString() },
      ];

      this.setStored(KEYS.CURRENT_USER, defaultUser);
      this.setStored(KEYS.USERS, allUsers);
      this.setStored(KEYS.PROFILES, profiles);
      this.setStored(KEYS.LINKS, linksMap);
      this.setStored(KEYS.BLOCKS, blocksMap);
      this.setStored(KEYS.PRODUCTS, productsMap);
      this.setStored(KEYS.ORDERS, ordersMap);
      this.setStored(KEYS.SUBSCRIBERS, subscribersMap);
      this.setStored(KEYS.SERVICES, servicesMap);
      this.setStored(KEYS.BOOKINGS, bookingsMap);
      this.setStored(KEYS.SOCIAL_LINKS, socialsMap);
      this.setStored(KEYS.PROJECTS, projectsMap);
      this.setStored(KEYS.APPEARANCE, appearanceMap);
      this.setStored(KEYS.EVENTS, events);
      this.setStored(KEYS.ACTIVITY, { [INITIAL_PROFILE.id]: initialActivities });
    }
  }

  // --- USER & AUTH ---
  public static getCurrentUser(): User | null {
    this.ensureInitialized();
    return this.getStored<User | null>(KEYS.CURRENT_USER, null);
  }

  public static setCurrentUser(user: User | null): void {
    this.setStored(KEYS.CURRENT_USER, user);
  }

  public static seedDemoData(targetProfileId?: string): void {
    const profile = this.getProfile(targetProfileId);
    const linksMap = this.getStored<Record<string, Link[]>>(KEYS.LINKS, {});
    const socialsMap = this.getStored<Record<string, SocialLink[]>>(KEYS.SOCIAL_LINKS, {});
    const projectsMap = this.getStored<Record<string, Project[]>>(KEYS.PROJECTS, {});
    const appearanceMap = this.getStored<Record<string, AppearanceSettings>>(KEYS.APPEARANCE, {});

    linksMap[profile.id] = INITIAL_LINKS.map(l => ({ ...l, profileId: profile.id }));
    socialsMap[profile.id] = INITIAL_SOCIAL_LINKS.map(s => ({ ...s, profileId: profile.id }));
    projectsMap[profile.id] = INITIAL_PROJECTS.map(p => ({ ...p, profileId: profile.id }));
    appearanceMap[profile.id] = { ...INITIAL_APPEARANCE, profileId: profile.id };

    this.setStored(KEYS.LINKS, linksMap);
    this.setStored(KEYS.SOCIAL_LINKS, socialsMap);
    this.setStored(KEYS.PROJECTS, projectsMap);
    this.setStored(KEYS.APPEARANCE, appearanceMap);
  }

  // --- AUTHENTICATION & SESSIONS ---
  public static login(email: string, password?: string): { user: User; profile: Profile } {
    this.ensureInitialized();
    const cleanEmail = email.trim().toLowerCase();
    const users = this.getStored<Record<string, User>>(KEYS.USERS, {});
    const profiles = this.getStored<Record<string, Profile>>(KEYS.PROFILES, {});

    // Check for demo account
    if (cleanEmail === 'demo@webloom.site') {
      if (password && password !== 'demo123456') {
        throw new Error('Incorrect password for demo account. Please use "demo123456" or click Launch Demo.');
      }
      return this.loginDemo();
    }

    // Check existing registered users
    const existingUser = Object.values(users).find(u => u.email.toLowerCase() === cleanEmail);
    if (!existingUser) {
      throw new Error(`No account found for "${email}". Please check your email or click "Create your Webloom" to register.`);
    }

    let userProfile = Object.values(profiles).find(p => p.userId === existingUser.id);
    if (!userProfile) {
      userProfile = { ...INITIAL_PROFILE, userId: existingUser.id };
      profiles[userProfile.id] = userProfile;
      this.setStored(KEYS.PROFILES, profiles);
    }

    this.setCurrentUser(existingUser);
    return { user: existingUser, profile: userProfile };
  }

  public static signup(email: string, password?: string, username?: string, displayName?: string): { user: User; profile: Profile } {
    this.ensureInitialized();
    const cleanEmail = email.trim().toLowerCase();
    const users = this.getStored<Record<string, User>>(KEYS.USERS, {});
    const profiles = this.getStored<Record<string, Profile>>(KEYS.PROFILES, {});

    // Prevent duplicate email registration
    const existingUser = Object.values(users).find(u => u.email.toLowerCase() === cleanEmail);
    if (existingUser) {
      throw new Error(`An account with email "${email}" already exists. Please sign in instead.`);
    }

    const cleanHandle = normalizeUsername(username || cleanEmail.split('@')[0]);

    // Prevent duplicate username
    const existingProfile = Object.values(profiles).find(p => p.username.toLowerCase() === cleanHandle.toLowerCase());
    if (existingProfile) {
      throw new Error(`The handle "@${cleanHandle}" is already taken. Please choose another username.`);
    }

    const name = displayName || cleanHandle.charAt(0).toUpperCase() + cleanHandle.slice(1);
    const userId = `user_${Date.now()}`;

    const newUser: User = {
      id: userId,
      email: cleanEmail,
      name,
      username: cleanHandle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newProfile: Profile = {
      id: `prof_${Date.now()}`,
      userId: newUser.id,
      username: cleanHandle,
      displayName: name,
      headline: 'Digital Creator & Builder',
      bio: 'Welcome to my Webloom! Explore my latest projects, creations, and links below.',
      email: newUser.email,
      verified: false,
      isPublished: true,
      seoIndexing: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newAppearance: AppearanceSettings = {
      ...DEFAULT_APPEARANCE,
      id: `app_${Date.now()}`,
      profileId: newProfile.id,
    };

    const appearanceMap = this.getStored<Record<string, AppearanceSettings>>(KEYS.APPEARANCE, {});
    appearanceMap[newProfile.id] = newAppearance;

    const socialsMap = this.getStored<Record<string, SocialLink[]>>(KEYS.SOCIAL_LINKS, {});
    socialsMap[newProfile.id] = [
      { id: `soc_${Date.now()}_1`, profileId: newProfile.id, platform: 'github', url: 'https://github.com/' + cleanHandle, sortOrder: 0 },
      { id: `soc_${Date.now()}_2`, profileId: newProfile.id, platform: 'x', url: 'https://x.com/' + cleanHandle, sortOrder: 1 }
    ];

    const projectsMap = this.getStored<Record<string, Project[]>>(KEYS.PROJECTS, {});
    projectsMap[newProfile.id] = [];

    users[newUser.id] = newUser;
    profiles[newProfile.id] = newProfile;
    this.setStored(KEYS.USERS, users);
    this.setStored(KEYS.PROFILES, profiles);
    this.setStored(KEYS.APPEARANCE, appearanceMap);
    this.setStored(KEYS.SOCIAL_LINKS, socialsMap);
    this.setStored(KEYS.PROJECTS, projectsMap);

    // Initial links for new creator
    const linksMap = this.getStored<Record<string, Link[]>>(KEYS.LINKS, {});
    linksMap[newProfile.id] = [
      {
        id: `link_${Date.now()}_1`,
        profileId: newProfile.id,
        title: 'My Latest Project',
        description: 'Explore my featured work and updates',
        url: 'https://github.com',
        type: 'url',
        isActive: true,
        sortOrder: 0,
        clickCount: 0,
        openInNewTab: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    this.setStored(KEYS.LINKS, linksMap);

    this.setCurrentUser(newUser);
    return { user: newUser, profile: newProfile };
  }

  public static loginDemo(): { user: User; profile: Profile } {
    this.ensureInitialized();
    const users = this.getStored<Record<string, User>>(KEYS.USERS, {});
    const profiles = this.getStored<Record<string, Profile>>(KEYS.PROFILES, {});

    const demoUser: User = {
      id: 'user_demo_1',
      email: 'demo@webloom.site',
      name: 'Demo Creator',
      username: 'demo',
      avatar: INITIAL_PROFILE.avatar,
      createdAt: '2026-01-15T10:00:00Z',
      updatedAt: '2026-10-08T04:00:00Z',
    };

    const demoProfile: Profile = {
      ...INITIAL_PROFILE,
      id: 'profile_demo_1',
      userId: demoUser.id,
      username: 'demo',
      displayName: 'Demo Creator',
      email: 'demo@webloom.site',
      headline: 'Product Designer & Independent Builder',
      bio: 'Welcome to my interactive Webloom space! Explore my digital tools, store templates, and consultation slots.',
      isPublished: true,
      seoIndexing: true,
    };

    users[demoUser.id] = demoUser;
    profiles[demoProfile.id] = demoProfile;
    this.setStored(KEYS.USERS, users);
    this.setStored(KEYS.PROFILES, profiles);
    this.seedDemoData(demoProfile.id);
    this.setCurrentUser(demoUser);
    return { user: demoUser, profile: demoProfile };
  }

  public static signupOrLogin(email: string, username?: string, displayName?: string): { user: User; profile: Profile } {
    try {
      return this.login(email);
    } catch {
      return this.signup(email, undefined, username, displayName);
    }
  }

  // --- PROFILE CRUD ---
  public static getProfile(profileIdOrUserId?: string): Profile {
    this.ensureInitialized();
    const profiles = this.getStored<Record<string, Profile>>(KEYS.PROFILES, {});
    const currentUser = this.getCurrentUser();

    if (profileIdOrUserId) {
      if (profiles[profileIdOrUserId]) return profiles[profileIdOrUserId];
      const byUser = Object.values(profiles).find(p => p.userId === profileIdOrUserId || p.id === profileIdOrUserId);
      if (byUser) return byUser;
    }

    if (currentUser) {
      const userProfile = Object.values(profiles).find(p => p.userId === currentUser.id);
      if (userProfile) return userProfile;
    }

    return Object.values(profiles)[0] || INITIAL_PROFILE;
  }

  public static setProfile(profile: Profile): void {
    this.ensureInitialized();
    const profiles = this.getStored<Record<string, Profile>>(KEYS.PROFILES, {});
    profiles[profile.id] = { ...profile, updatedAt: new Date().toISOString() };
    this.setStored(KEYS.PROFILES, profiles);

    // Sync to Supabase in background
    this.syncProfileToSupabase(profile);
  }

  public static updateProfile(profileId: string, partial: Partial<Profile>): Profile {
    const cur = this.getProfile(profileId);
    const updated = { ...cur, ...partial, updatedAt: new Date().toISOString() };
    this.setProfile(updated);
    return updated;
  }

  // --- LINKS CRUD ---
  public static getLinks(profileId?: string): Link[] {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const linksMap = this.getStored<Record<string, Link[]>>(KEYS.LINKS, {});
    return (linksMap[pid] || []).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public static setLinks(links: Link[], profileId?: string): void {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const linksMap = this.getStored<Record<string, Link[]>>(KEYS.LINKS, {});
    linksMap[pid] = links;
    this.setStored(KEYS.LINKS, linksMap);

    this.syncLinksToSupabase(links, pid);
  }

  // --- SOCIAL LINKS CRUD ---
  public static getSocialLinks(profileId?: string): SocialLink[] {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const socialsMap = this.getStored<Record<string, SocialLink[]>>(KEYS.SOCIAL_LINKS, {});
    return (socialsMap[pid] || []).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public static setSocialLinks(socials: SocialLink[], profileId?: string): void {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const socialsMap = this.getStored<Record<string, SocialLink[]>>(KEYS.SOCIAL_LINKS, {});
    socialsMap[pid] = socials;
    this.setStored(KEYS.SOCIAL_LINKS, socialsMap);

    this.syncSocialsToSupabase(socials, pid);
  }

  // --- PROJECTS CRUD ---
  public static getProjects(profileId?: string): Project[] {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const projectsMap = this.getStored<Record<string, Project[]>>(KEYS.PROJECTS, {});
    return (projectsMap[pid] || []).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public static setProjects(projects: Project[], profileId?: string): void {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const projectsMap = this.getStored<Record<string, Project[]>>(KEYS.PROJECTS, {});
    projectsMap[pid] = projects;
    this.setStored(KEYS.PROJECTS, projectsMap);

    this.syncProjectsToSupabase(projects, pid);
  }

  // --- APPEARANCE CRUD ---
  public static getAppearance(profileId?: string): AppearanceSettings {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const appearanceMap = this.getStored<Record<string, AppearanceSettings>>(KEYS.APPEARANCE, {});
    return appearanceMap[pid] || { ...DEFAULT_APPEARANCE, profileId: pid };
  }

  public static setAppearance(appearance: AppearanceSettings, profileId?: string): void {
    this.ensureInitialized();
    const pid = profileId || appearance.profileId || this.getProfile().id;
    const appearanceMap = this.getStored<Record<string, AppearanceSettings>>(KEYS.APPEARANCE, {});
    appearanceMap[pid] = { ...appearance, profileId: pid, updatedAt: new Date().toISOString() };
    this.setStored(KEYS.APPEARANCE, appearanceMap);

    this.syncAppearanceToSupabase(appearanceMap[pid]);
  }

  // --- BLOCKS CRUD (Block-Based Architecture) ---
  public static getBlocks(profileId?: string): PageBlock[] {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const blocksMap = this.getStored<Record<string, PageBlock[]>>(KEYS.BLOCKS, {});
    return (blocksMap[pid] || []).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public static setBlocks(blocks: PageBlock[], profileId?: string): void {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const blocksMap = this.getStored<Record<string, PageBlock[]>>(KEYS.BLOCKS, {});
    blocksMap[pid] = blocks;
    this.setStored(KEYS.BLOCKS, blocksMap);
  }

  public static addBlock(blockData: Partial<PageBlock>, profileId?: string): PageBlock {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const currentBlocks = this.getBlocks(pid);
    const newBlock: PageBlock = {
      id: blockData.id || `blk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      profileId: pid,
      blockType: blockData.blockType || 'link',
      title: blockData.title || 'New Block',
      subtitle: blockData.subtitle || '',
      config: blockData.config || {},
      sortOrder: blockData.sortOrder !== undefined ? blockData.sortOrder : currentBlocks.length,
      isActive: blockData.isActive !== undefined ? blockData.isActive : true,
      isPinned: blockData.isPinned || false,
      scheduleStart: blockData.scheduleStart,
      scheduleEnd: blockData.scheduleEnd,
      visibilityRule: blockData.visibilityRule || 'all',
      clickCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...currentBlocks, newBlock];
    this.setBlocks(updated, pid);
    this.addActivityLog(pid, `Added ${newBlock.blockType} block "${newBlock.title}"`, 'link');
    return newBlock;
  }

  public static updateBlock(id: string, updates: Partial<PageBlock>, profileId?: string): PageBlock | null {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const currentBlocks = this.getBlocks(pid);
    const idx = currentBlocks.findIndex(b => b.id === id);
    if (idx === -1) return null;

    currentBlocks[idx] = {
      ...currentBlocks[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.setBlocks(currentBlocks, pid);
    return currentBlocks[idx];
  }

  public static deleteBlock(id: string, profileId?: string): void {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const currentBlocks = this.getBlocks(pid).filter(b => b.id !== id);
    this.setBlocks(currentBlocks, pid);
  }

  // --- COMMERCE & STOREFRONT CRUD ---
  public static getProducts(profileId?: string): Product[] {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const productsMap = this.getStored<Record<string, Product[]>>(KEYS.PRODUCTS, {});
    return productsMap[pid] || [];
  }

  public static setProducts(products: Product[], profileId?: string): void {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const productsMap = this.getStored<Record<string, Product[]>>(KEYS.PRODUCTS, {});
    productsMap[pid] = products;
    this.setStored(KEYS.PRODUCTS, productsMap);
  }

  public static addProduct(productData: Partial<Product>, profileId?: string): Product {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const currentProducts = this.getProducts(pid);
    const newProduct: Product = {
      id: productData.id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      profileId: pid,
      title: productData.title || 'New Product',
      slug: productData.slug || (productData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'new-product'),
      description: productData.description || '',
      productType: productData.productType || 'digital_download',
      priceInr: productData.priceInr ?? 499,
      priceUsd: productData.priceUsd ?? 7,
      compareAtPriceInr: productData.compareAtPriceInr,
      currency: productData.currency || 'INR',
      coverImageUrl: productData.coverImageUrl || '',
      galleryUrls: productData.galleryUrls || [],
      downloadFileUrl: productData.downloadFileUrl || '',
      redirectUrl: productData.redirectUrl,
      isActive: productData.isActive !== undefined ? productData.isActive : true,
      inventoryCount: productData.inventoryCount ?? -1,
      salesCount: 0,
      totalRevenueInr: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newProduct, ...currentProducts];
    this.setProducts(updated, pid);
    this.addActivityLog(pid, `Created product "${newProduct.title}"`, 'project');
    return newProduct;
  }

  public static updateProduct(id: string, updates: Partial<Product>, profileId?: string): Product | null {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const currentProducts = this.getProducts(pid);
    const idx = currentProducts.findIndex(p => p.id === id);
    if (idx === -1) return null;

    currentProducts[idx] = {
      ...currentProducts[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.setProducts(currentProducts, pid);
    return currentProducts[idx];
  }

  public static deleteProduct(id: string, profileId?: string): void {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const currentProducts = this.getProducts(pid).filter(p => p.id !== id);
    this.setProducts(currentProducts, pid);
  }

  // --- ORDERS & TRANSACTIONS ---
  public static getOrders(profileId?: string): Order[] {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const ordersMap = this.getStored<Record<string, Order[]>>(KEYS.ORDERS, {});
    return ordersMap[pid] || [];
  }

  public static createOrder(orderData: Partial<Order>, profileId?: string): Order {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const currentOrders = this.getOrders(pid);
    const newOrder: Order = {
      id: orderData.id || `ord_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      profileId: pid,
      orderNumber: orderData.orderNumber || `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      customerEmail: orderData.customerEmail || 'customer@example.com',
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      subtotalAmount: orderData.subtotalAmount || 0,
      discountAmount: orderData.discountAmount || 0,
      totalAmount: orderData.totalAmount || 0,
      currency: orderData.currency || 'INR',
      paymentStatus: orderData.paymentStatus || 'paid',
      fulfillmentStatus: orderData.fulfillmentStatus || 'fulfilled',
      paymentProvider: orderData.paymentProvider || 'razorpay',
      externalPaymentId: orderData.externalPaymentId,
      items: orderData.items || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newOrder, ...currentOrders];
    const ordersMap = this.getStored<Record<string, Order[]>>(KEYS.ORDERS, {});
    ordersMap[pid] = updated;
    this.setStored(KEYS.ORDERS, ordersMap);

    this.addActivityLog(pid, `New order ${newOrder.orderNumber} received (₹${newOrder.totalAmount})`, 'order');
    return newOrder;
  }

  // --- AUDIENCE & SUBSCRIBERS ---
  public static getSubscribers(profileId?: string): Subscriber[] {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const subscribersMap = this.getStored<Record<string, Subscriber[]>>(KEYS.SUBSCRIBERS, {});
    return subscribersMap[pid] || [];
  }

  public static addSubscriber(subData: Partial<Subscriber>, profileId?: string): Subscriber {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const currentSubscribers = this.getSubscribers(pid);
    const cleanEmail = (subData.email || '').trim().toLowerCase();

    // Check duplicate
    const existing = currentSubscribers.find(s => s.email.toLowerCase() === cleanEmail);
    if (existing) return existing;

    const newSub: Subscriber = {
      id: subData.id || `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      profileId: pid,
      email: cleanEmail,
      name: subData.name,
      phone: subData.phone,
      source: subData.source || 'profile',
      tags: subData.tags || ['lead'],
      isActive: true,
      consentGiven: subData.consentGiven !== undefined ? subData.consentGiven : true,
      createdAt: new Date().toISOString(),
    };

    const updated = [newSub, ...currentSubscribers];
    const subscribersMap = this.getStored<Record<string, Subscriber[]>>(KEYS.SUBSCRIBERS, {});
    subscribersMap[pid] = updated;
    this.setStored(KEYS.SUBSCRIBERS, subscribersMap);

    this.addActivityLog(pid, `New subscriber joined: ${newSub.email}`, 'subscriber');
    return newSub;
  }

  public static deleteSubscriber(id: string, profileId?: string): void {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const current = this.getSubscribers(pid).filter(s => s.id !== id);
    const subscribersMap = this.getStored<Record<string, Subscriber[]>>(KEYS.SUBSCRIBERS, {});
    subscribersMap[pid] = current;
    this.setStored(KEYS.SUBSCRIBERS, subscribersMap);
  }

  public static exportSubscribersCsv(profileId?: string): string {
    const subs = this.getSubscribers(profileId);
    const headers = ['Email', 'Name', 'Phone', 'Source', 'Tags', 'Joined At'];
    const rows = subs.map(s => [
      s.email,
      s.name || '',
      s.phone || '',
      s.source,
      s.tags.join('; '),
      s.createdAt,
    ]);
    return [headers.join(','), ...rows.map(r => r.map(f => `"${f.replace(/"/g, '""')}"`).join(','))].join('\n');
  }

  // --- SERVICES & BOOKINGS ---
  public static getServices(profileId?: string): Service[] {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const servicesMap = this.getStored<Record<string, Service[]>>(KEYS.SERVICES, {});
    return servicesMap[pid] || [];
  }

  public static setServices(services: Service[], profileId?: string): void {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const servicesMap = this.getStored<Record<string, Service[]>>(KEYS.SERVICES, {});
    servicesMap[pid] = services;
    this.setStored(KEYS.SERVICES, servicesMap);
  }

  public static addService(serviceData: Partial<Service>, profileId?: string): Service {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const currentServices = this.getServices(pid);
    const newService: Service = {
      id: serviceData.id || `srv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      profileId: pid,
      title: serviceData.title || 'New Service',
      description: serviceData.description,
      durationMinutes: serviceData.durationMinutes || 30,
      priceInr: serviceData.priceInr ?? 999,
      currency: serviceData.currency || 'INR',
      locationType: serviceData.locationType || 'video',
      meetingUrl: serviceData.meetingUrl || 'https://meet.google.com/call',
      isActive: serviceData.isActive !== undefined ? serviceData.isActive : true,
      createdAt: new Date().toISOString(),
    };

    const updated = [...currentServices, newService];
    this.setServices(updated, pid);
    return newService;
  }

  public static getBookings(profileId?: string): Booking[] {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const bookingsMap = this.getStored<Record<string, Booking[]>>(KEYS.BOOKINGS, {});
    return bookingsMap[pid] || [];
  }

  public static createBooking(bookingData: Partial<Booking>, profileId?: string): Booking {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const currentBookings = this.getBookings(pid);
    const newBooking: Booking = {
      id: bookingData.id || `bkg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      serviceId: bookingData.serviceId || '',
      profileId: pid,
      clientName: bookingData.clientName || 'Client',
      clientEmail: bookingData.clientEmail || 'client@example.com',
      clientPhone: bookingData.clientPhone,
      scheduledAt: bookingData.scheduledAt || new Date(Date.now() + 86400000 * 2).toISOString(),
      durationMinutes: bookingData.durationMinutes || 30,
      status: bookingData.status || 'pending',
      notes: bookingData.notes,
      createdAt: new Date().toISOString(),
    };

    const updated = [newBooking, ...currentBookings];
    const bookingsMap = this.getStored<Record<string, Booking[]>>(KEYS.BOOKINGS, {});
    bookingsMap[pid] = updated;
    this.setStored(KEYS.BOOKINGS, bookingsMap);

    this.addActivityLog(pid, `New booking scheduled with ${newBooking.clientName}`, 'booking');
    return newBooking;
  }

  public static addBooking(bookingData: Partial<Booking>, profileId?: string): Booking {
    return this.createBooking(bookingData, profileId);
  }

  public static updateBookingStatus(bookingId: string, status: Booking['status'], profileId?: string): Booking | null {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const currentBookings = this.getBookings(pid);
    const idx = currentBookings.findIndex(b => b.id === bookingId);
    if (idx === -1) return null;

    currentBookings[idx] = {
      ...currentBookings[idx],
      status,
    };

    const bookingsMap = this.getStored<Record<string, Booking[]>>(KEYS.BOOKINGS, {});
    bookingsMap[pid] = currentBookings;
    this.setStored(KEYS.BOOKINGS, bookingsMap);
    return currentBookings[idx];
  }

  // --- ACTIVITY LOGS ---
  public static getActivityLogs(profileId?: string): ActivityItem[] {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const activityMap = this.getStored<Record<string, ActivityItem[]>>(KEYS.ACTIVITY, {});
    const list = activityMap[pid] || [];
    return list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public static addActivityLog(
    profileId: string, 
    title: string, 
    type: ActivityItem['type']
  ): void {
    this.ensureInitialized();
    const activityMap = this.getStored<Record<string, ActivityItem[]>>(KEYS.ACTIVITY, {});
    const list = activityMap[profileId] || [];
    const item: ActivityItem = {
      id: `act_${Date.now()}`,
      title,
      type,
      time: 'Just now',
      timestamp: new Date().toISOString(),
    };
    activityMap[profileId] = [item, ...list.slice(0, 19)];
    this.setStored(KEYS.ACTIVITY, activityMap);
  }

  // --- ANALYTICS TRACKING & COMPUTATION ---
  public static trackProfileView(profileId?: string, meta?: { referrer?: string; device?: string; country?: string }): void {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const events = this.getStored<AnalyticsEvent[]>(KEYS.EVENTS, []);

    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isMobile = /mobile|iphone|android|ipad/i.test(userAgent);
    const isTablet = /ipad|tablet/i.test(userAgent);
    const detectedDevice = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

    const documentReferrer = typeof document !== 'undefined' ? document.referrer : '';
    let parsedReferrer = 'Direct / Bio Link';
    if (documentReferrer.includes('twitter.com') || documentReferrer.includes('t.co') || documentReferrer.includes('x.com')) {
      parsedReferrer = 'X / Twitter';
    } else if (documentReferrer.includes('github.com')) {
      parsedReferrer = 'GitHub';
    } else if (documentReferrer.includes('linkedin.com')) {
      parsedReferrer = 'LinkedIn';
    } else if (documentReferrer.includes('google.com')) {
      parsedReferrer = 'Google Search';
    } else if (documentReferrer.includes('youtube.com')) {
      parsedReferrer = 'YouTube';
    } else if (documentReferrer.includes('instagram.com')) {
      parsedReferrer = 'Instagram';
    }

    const event: AnalyticsEvent = {
      id: `evt_v_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      profileId: pid,
      eventType: 'PROFILE_VIEW',
      timestamp: new Date().toISOString(),
      referrer: meta?.referrer || parsedReferrer,
      device: (meta?.device as any) || detectedDevice,
      country: meta?.country || 'United States',
    };

    events.push(event);
    this.setStored(KEYS.EVENTS, events);

    // Sync to Supabase analytics_events table
    try {
      supabase.from('analytics_events').insert({
        profile_id: event.profileId,
        event_type: event.eventType,
        referrer: event.referrer,
        device: event.device,
        country: event.country,
        timestamp: event.timestamp,
      }).then(() => {});
    } catch {}
  }

  public static trackLinkClick(linkId: string, profileId?: string): void {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const links = this.getLinks(pid);

    // Increment click count in link entity
    const updatedLinks = links.map(l => l.id === linkId ? { ...l, clickCount: (l.clickCount || 0) + 1 } : l);
    this.setLinks(updatedLinks, pid);

    const events = this.getStored<AnalyticsEvent[]>(KEYS.EVENTS, []);
    const event: AnalyticsEvent = {
      id: `evt_c_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      profileId: pid,
      linkId,
      eventType: 'LINK_CLICK',
      timestamp: new Date().toISOString(),
      referrer: 'Direct / Bio Link',
      device: 'mobile',
      country: 'United States',
    };

    events.push(event);
    this.setStored(KEYS.EVENTS, events);

    // Sync to Supabase
    try {
      supabase.from('analytics_events').insert({
        profile_id: pid,
        link_id: linkId,
        event_type: 'LINK_CLICK',
        timestamp: event.timestamp,
      }).then(() => {});
      supabase.rpc('increment_link_clicks', { link_id: linkId }).then(() => {});
    } catch {}
  }

  public static getAnalytics(profileId?: string, range: '7d' | '30d' | '90d' | '1y' = '30d'): AnalyticsSummary {
    this.ensureInitialized();
    const pid = profileId || this.getProfile().id;
    const allEvents = this.getStored<AnalyticsEvent[]>(KEYS.EVENTS, []);
    const profileEvents = allEvents.filter(e => e.profileId === pid);
    const links = this.getLinks(pid);

    return aggregateAnalytics(profileEvents, links, range);
  }

  // --- PUBLIC PROFILE RESOLUTION ---
  public static getPublicProfileData(username: string): PublicProfileData | null {
    this.ensureInitialized();
    const profiles = this.getStored<Record<string, Profile>>(KEYS.PROFILES, {});
    const cleanReq = normalizeUsername(username);

    const targetProfile = Object.values(profiles).find(p => {
      const pHandle = normalizeUsername(p.username);
      return pHandle === cleanReq;
    });

    if (!targetProfile) {
      // If demo handle requested and not present, fallback to first profile
      if (cleanReq === 'younus' || cleanReq === 'demo') {
        const first = Object.values(profiles)[0];
        if (first) {
          return {
            profile: first,
            links: this.getLinks(first.id).filter(l => l.isActive),
            blocks: this.getBlocks(first.id).filter(b => b.isActive),
            products: this.getProducts(first.id).filter(p => p.isActive),
            socialLinks: this.getSocialLinks(first.id),
            projects: this.getProjects(first.id),
            appearance: this.getAppearance(first.id),
          };
        }
      }
      return null;
    }

    return {
      profile: targetProfile,
      links: this.getLinks(targetProfile.id).filter(l => l.isActive),
      blocks: this.getBlocks(targetProfile.id).filter(b => b.isActive),
      products: this.getProducts(targetProfile.id).filter(p => p.isActive),
      socialLinks: this.getSocialLinks(targetProfile.id),
      projects: this.getProjects(targetProfile.id),
      appearance: this.getAppearance(targetProfile.id),
    };
  }

  // --- ACCOUNT DELETION ---
  public static deleteAccount(profileId: string): void {
    this.ensureInitialized();
    const profiles = this.getStored<Record<string, Profile>>(KEYS.PROFILES, {});
    const users = this.getStored<Record<string, User>>(KEYS.USERS, {});
    const linksMap = this.getStored<Record<string, Link[]>>(KEYS.LINKS, {});
    const socialsMap = this.getStored<Record<string, SocialLink[]>>(KEYS.SOCIAL_LINKS, {});
    const projectsMap = this.getStored<Record<string, Project[]>>(KEYS.PROJECTS, {});
    const appearanceMap = this.getStored<Record<string, AppearanceSettings>>(KEYS.APPEARANCE, {});

    const target = profiles[profileId];
    if (target) {
      delete profiles[profileId];
      if (target.userId && users[target.userId]) {
        delete users[target.userId];
      }
      delete linksMap[profileId];
      delete socialsMap[profileId];
      delete projectsMap[profileId];
      delete appearanceMap[profileId];

      const blocksMap = this.getStored<Record<string, PageBlock[]>>(KEYS.BLOCKS, {});
      delete blocksMap[profileId];

      const productsMap = this.getStored<Record<string, Product[]>>(KEYS.PRODUCTS, {});
      delete productsMap[profileId];

      const ordersMap = this.getStored<Record<string, Order[]>>(KEYS.ORDERS, {});
      delete ordersMap[profileId];

      const subscribersMap = this.getStored<Record<string, Subscriber[]>>(KEYS.SUBSCRIBERS, {});
      delete subscribersMap[profileId];

      const servicesMap = this.getStored<Record<string, Service[]>>(KEYS.SERVICES, {});
      delete servicesMap[profileId];

      const bookingsMap = this.getStored<Record<string, Booking[]>>(KEYS.BOOKINGS, {});
      delete bookingsMap[profileId];

      this.setStored(KEYS.PROFILES, profiles);
      this.setStored(KEYS.USERS, users);
      this.setStored(KEYS.LINKS, linksMap);
      this.setStored(KEYS.BLOCKS, blocksMap);
      this.setStored(KEYS.PRODUCTS, productsMap);
      this.setStored(KEYS.ORDERS, ordersMap);
      this.setStored(KEYS.SUBSCRIBERS, subscribersMap);
      this.setStored(KEYS.SERVICES, servicesMap);
      this.setStored(KEYS.BOOKINGS, bookingsMap);
      this.setStored(KEYS.SOCIAL_LINKS, socialsMap);
      this.setStored(KEYS.PROJECTS, projectsMap);
      this.setStored(KEYS.APPEARANCE, appearanceMap);

      this.setCurrentUser(null);
    }
  }

  // --- SUPABASE BACKGROUND SYNC WITH RESILIENT ERROR TOLERANCE ---
  private static async syncProfileToSupabase(profile: Profile) {
    try {
      await supabase.from('profiles').upsert({
        id: profile.id,
        user_id: profile.userId,
        username: profile.username,
        display_name: profile.displayName,
        headline: profile.headline,
        bio: profile.bio,
        avatar: profile.avatar,
        cover_image: profile.coverImage,
        location: profile.location,
        website: profile.website,
        email: profile.email,
        phone: profile.phone,
        verified: profile.verified,
        is_published: profile.isPublished !== false,
        seo_indexing: profile.seoIndexing !== false,
        custom_domain: profile.customDomain,
        updated_at: new Date().toISOString(),
      });
    } catch {}
  }

  private static async syncLinksToSupabase(links: Link[], profileId: string) {
    try {
      const records = links.map(l => ({
        id: l.id,
        profile_id: profileId,
        title: l.title,
        description: l.description,
        url: l.url,
        icon: l.icon,
        thumbnail: l.thumbnail,
        type: l.type,
        is_active: l.isActive,
        sort_order: l.sortOrder,
        click_count: l.clickCount,
        open_in_new_tab: l.openInNewTab,
        metadata: l.metadata,
        updated_at: new Date().toISOString(),
      }));
      if (records.length > 0) {
        await supabase.from('links').upsert(records);
      }
    } catch {}
  }

  private static async syncSocialsToSupabase(socials: SocialLink[], profileId: string) {
    try {
      const records = socials.map(s => ({
        id: s.id,
        profile_id: profileId,
        platform: s.platform,
        url: s.url,
        sort_order: s.sortOrder,
      }));
      if (records.length > 0) {
        await supabase.from('social_links').upsert(records);
      }
    } catch {}
  }

  private static async syncProjectsToSupabase(projects: Project[], profileId: string) {
    try {
      const records = projects.map(p => ({
        id: p.id,
        profile_id: profileId,
        title: p.title,
        description: p.description,
        image: p.image,
        url: p.url,
        github_url: p.githubUrl,
        technologies: p.technologies,
        featured: p.featured,
        sort_order: p.sortOrder,
        updated_at: new Date().toISOString(),
      }));
      if (records.length > 0) {
        await supabase.from('projects').upsert(records);
      }
    } catch {}
  }

  private static async syncAppearanceToSupabase(appearance: AppearanceSettings) {
    try {
      await supabase.from('appearance_settings').upsert({
        id: appearance.id,
        profile_id: appearance.profileId,
        theme: appearance.theme,
        background_type: appearance.backgroundType,
        background_color: appearance.backgroundColor,
        background_gradient: appearance.backgroundGradient,
        background_image: appearance.backgroundImage,
        primary_color: appearance.primaryColor,
        secondary_color: appearance.secondaryColor,
        text_color: appearance.textColor,
        card_color: appearance.cardColor,
        card_text_color: appearance.cardTextColor,
        button_style: appearance.buttonStyle,
        button_radius: appearance.buttonRadius,
        font: appearance.font,
        layout: appearance.layout,
        card_style: appearance.cardStyle,
        animation: appearance.animation,
        updated_at: new Date().toISOString(),
      });
    } catch {}
  }
}
