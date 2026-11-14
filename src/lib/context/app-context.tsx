'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  AppearanceSettings, 
  Link, 
  Profile, 
  Project, 
  SocialLink, 
  AnalyticsSummary, 
  ThemePreset, 
  User, 
  ActivityItem,
  PageBlock,
  Product,
  Order,
  Subscriber,
  Service,
  Booking
} from '@/types';
import { LinkedTreeStore } from '@/lib/data-store';
import { THEME_PRESETS } from '@/lib/themes';

interface AppContextType {
  user: User | null;
  profile: Profile;
  links: Link[];
  blocks: PageBlock[];
  products: Product[];
  services: Service[];
  orders: Order[];
  subscribers: Subscriber[];
  bookings: Booking[];
  socialLinks: SocialLink[];
  projects: Project[];
  appearance: AppearanceSettings;
  analytics: AnalyticsSummary;
  activityLogs: ActivityItem[];
  themeMode: 'light' | 'dark';
  setThemeMode: (mode: 'light' | 'dark') => void;
  toggleThemeMode: () => void;
  timeRange: '7d' | '30d' | '90d' | '1y';
  setTimeRange: (range: '7d' | '30d' | '90d' | '1y') => void;
  isSaving: boolean;
  lastSaved: Date | null;
  isPreviewOpen: boolean;
  setIsPreviewOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'signin' | 'signup';
  setAuthModalMode: (mode: 'signin' | 'signup') => void;
  login: (email: string, password?: string) => Promise<void>;
  signup: (email: string, password?: string, username?: string, displayName?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<Profile>) => void;
  setLinks: (links: Link[]) => void;
  addLink: (link: Omit<Link, 'id' | 'profileId' | 'clickCount' | 'createdAt' | 'updatedAt'>) => void;
  updateLink: (id: string, link: Partial<Link>) => void;
  deleteLink: (id: string) => void;
  reorderLinks: (newLinks: Link[]) => void;

  // Blocks Actions (Synced with Live Preview)
  setBlocks: (blocks: PageBlock[]) => void;
  addBlock: (block: Omit<PageBlock, 'id' | 'profileId' | 'clickCount' | 'createdAt' | 'updatedAt'> & { clickCount?: number }) => void;
  updateBlock: (id: string, block: Partial<PageBlock>) => void;
  deleteBlock: (id: string) => void;
  reorderBlocks: (newBlocks: PageBlock[]) => void;

  // Commerce Products Actions
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id' | 'profileId' | 'salesCount' | 'totalRevenueInr' | 'createdAt' | 'updatedAt' | 'slug' | 'currency' | 'inventoryCount'> & {
    slug?: string;
    currency?: 'INR' | 'USD';
    inventoryCount?: number;
  }) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Bookings & Services Actions
  setServices: (services: Service[]) => void;
  addService: (service: Omit<Service, 'id' | 'profileId' | 'createdAt'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;

  // Subscribers Actions
  addSubscribers: (subscriber: Omit<Subscriber, 'id' | 'createdAt'>) => void;

  addSocialLink: (platform: SocialLink['platform'], url: string) => void;
  updateSocialLink: (id: string, url: string) => void;
  deleteSocialLink: (id: string) => void;
  addProject: (project: Omit<Project, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  updateAppearance: (appearance: Partial<AppearanceSettings>) => void;
  setThemePreset: (preset: ThemePreset) => void;
  togglePublish: (isPublished: boolean) => void;
  deleteAccount: () => void;
  seedDemoData: () => void;
  refreshState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfileState] = useState<Profile>(() => LinkedTreeStore.getProfile());
  const [links, setLinksState] = useState<Link[]>(() => LinkedTreeStore.getLinks());
  const [blocks, setBlocksState] = useState<PageBlock[]>(() => LinkedTreeStore.getBlocks());
  const [products, setProductsState] = useState<Product[]>(() => LinkedTreeStore.getProducts());
  const [services, setServicesState] = useState<Service[]>(() => LinkedTreeStore.getServices());
  const [orders, setOrdersState] = useState<Order[]>(() => LinkedTreeStore.getOrders());
  const [subscribers, setSubscribersState] = useState<Subscriber[]>(() => LinkedTreeStore.getSubscribers());
  const [bookings, setBookingsState] = useState<Booking[]>(() => LinkedTreeStore.getBookings());
  const [socialLinks, setSocialLinksState] = useState<SocialLink[]>(() => LinkedTreeStore.getSocialLinks());
  const [projects, setProjectsState] = useState<Project[]>(() => LinkedTreeStore.getProjects());
  const [appearance, setAppearanceState] = useState<AppearanceSettings>(() => LinkedTreeStore.getAppearance());
  const [timeRange, setTimeRangeState] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [analytics, setAnalyticsState] = useState<AnalyticsSummary>(() => LinkedTreeStore.getAnalytics(undefined, '30d'));
  const [activityLogs, setActivityLogsState] = useState<ActivityItem[]>(() => LinkedTreeStore.getActivityLogs());
  const [themeMode, setThemeModeState] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('webloom-theme-mode');
      if (saved === 'dark' || saved === 'light') {
        setThemeModeState(saved);
        if (saved === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  }, []);

  const setThemeMode = useCallback((mode: 'light' | 'dark') => {
    setThemeModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('webloom-theme-mode', mode);
      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleThemeMode = useCallback(() => {
    setThemeModeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('webloom-theme-mode', next);
        if (next === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return next;
    });
  }, []);
  
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Client hydration & sync
  const reloadAll = useCallback((targetProfileId?: string, range: '7d' | '30d' | '90d' | '1y' = '30d') => {
    const curUser = LinkedTreeStore.getCurrentUser();
    const curProfile = LinkedTreeStore.getProfile(targetProfileId);
    setUser(curUser);
    setProfileState(curProfile);
    setLinksState(LinkedTreeStore.getLinks(curProfile.id));
    setBlocksState(LinkedTreeStore.getBlocks(curProfile.id));
    setProductsState(LinkedTreeStore.getProducts(curProfile.id));
    setServicesState(LinkedTreeStore.getServices(curProfile.id));
    setOrdersState(LinkedTreeStore.getOrders(curProfile.id));
    setSubscribersState(LinkedTreeStore.getSubscribers(curProfile.id));
    setBookingsState(LinkedTreeStore.getBookings(curProfile.id));
    setSocialLinksState(LinkedTreeStore.getSocialLinks(curProfile.id));
    setProjectsState(LinkedTreeStore.getProjects(curProfile.id));
    setAppearanceState(LinkedTreeStore.getAppearance(curProfile.id));
    setAnalyticsState(LinkedTreeStore.getAnalytics(curProfile.id, range));
    setActivityLogsState(LinkedTreeStore.getActivityLogs(curProfile.id));
  }, []);

  useEffect(() => {
    reloadAll(undefined, timeRange);
  }, [reloadAll, timeRange]);

  const setTimeRange = useCallback((range: '7d' | '30d' | '90d' | '1y') => {
    setTimeRangeState(range);
    setAnalyticsState(LinkedTreeStore.getAnalytics(profile.id, range));
  }, [profile.id]);

  const triggerSave = useCallback(() => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 350);
  }, []);

  // --- AUTH ACTIONS ---
  const login = useCallback(async (email: string, password?: string) => {
    const res = LinkedTreeStore.login(email, password);
    setUser(res.user);
    reloadAll(res.profile.id, timeRange);
  }, [reloadAll, timeRange]);

  const signup = useCallback(async (email: string, password?: string, username?: string, displayName?: string) => {
    const res = LinkedTreeStore.signup(email, password, username, displayName);
    setUser(res.user);
    reloadAll(res.profile.id, timeRange);
  }, [reloadAll, timeRange]);

  const logout = useCallback(() => {
    LinkedTreeStore.setCurrentUser(null);
    setUser(null);
    reloadAll(undefined, timeRange);
  }, [reloadAll, timeRange]);

  // --- PROFILE ACTIONS ---
  const updateProfile = useCallback((updated: Partial<Profile>) => {
    setProfileState(prev => {
      const next: Profile = { 
        ...prev, 
        ...updated, 
        updatedAt: new Date().toISOString() 
      };
      LinkedTreeStore.setProfile(next);
      triggerSave();
      return next;
    });
  }, [triggerSave]);

  const togglePublish = useCallback((isPublished: boolean) => {
    updateProfile({ isPublished });
    LinkedTreeStore.addActivityLog(
      profile.id, 
      isPublished ? 'Published site live' : 'Unpublished site to draft', 
      'status'
    );
    setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
  }, [profile.id, updateProfile]);

  // --- LINKS ACTIONS ---
  const setLinks = useCallback((newLinks: Link[]) => {
    setLinksState(newLinks);
    LinkedTreeStore.setLinks(newLinks, profile.id);
    triggerSave();
  }, [profile.id, triggerSave]);

  const addLink = useCallback((linkData: Omit<Link, 'id' | 'profileId' | 'clickCount' | 'createdAt' | 'updatedAt'>) => {
    setLinksState(prev => {
      const newLink: Link = {
        ...linkData,
        id: `link_${Date.now()}`,
        profileId: profile.id,
        clickCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const next = [...prev, newLink];
      LinkedTreeStore.setLinks(next, profile.id);
      LinkedTreeStore.addActivityLog(profile.id, `Created link "${newLink.title}"`, 'link');
      setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const updateLink = useCallback((id: string, updated: Partial<Link>) => {
    setLinksState(prev => {
      const next = prev.map(l => l.id === id ? { ...l, ...updated, updatedAt: new Date().toISOString() } : l);
      LinkedTreeStore.setLinks(next, profile.id);
      const target = next.find(l => l.id === id);
      if (target) {
        LinkedTreeStore.addActivityLog(profile.id, `Updated link "${target.title}"`, 'link');
        setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      }
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const deleteLink = useCallback((id: string) => {
    setLinksState(prev => {
      const target = prev.find(l => l.id === id);
      const next = prev.filter(l => l.id !== id);
      LinkedTreeStore.setLinks(next, profile.id);
      if (target) {
        LinkedTreeStore.addActivityLog(profile.id, `Deleted link "${target.title}"`, 'link');
        setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      }
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const reorderLinks = useCallback((newLinks: Link[]) => {
    setLinksState(newLinks);
    LinkedTreeStore.setLinks(newLinks, profile.id);
    triggerSave();
  }, [profile.id, triggerSave]);

  // --- MODULAR BLOCKS ACTIONS (LIVE PREVIEW SYNC) ---
  const setBlocks = useCallback((newBlocks: PageBlock[]) => {
    setBlocksState(newBlocks);
    LinkedTreeStore.setBlocks(newBlocks, profile.id);
    triggerSave();
  }, [profile.id, triggerSave]);

  const addBlock = useCallback((blockData: Omit<PageBlock, 'id' | 'profileId' | 'clickCount' | 'createdAt' | 'updatedAt'> & { clickCount?: number }) => {
    setBlocksState(prev => {
      const newBlock: PageBlock = {
        clickCount: blockData.clickCount || 0,
        ...blockData,
        id: `blk_${Date.now()}`,
        profileId: profile.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const next = [...prev, newBlock];
      LinkedTreeStore.setBlocks(next, profile.id);
      LinkedTreeStore.addActivityLog(profile.id, `Added block "${newBlock.title || newBlock.blockType}"`, 'block');
      setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const updateBlock = useCallback((id: string, updated: Partial<PageBlock>) => {
    setBlocksState(prev => {
      const next = prev.map(b => b.id === id ? { ...b, ...updated, updatedAt: new Date().toISOString() } : b);
      LinkedTreeStore.setBlocks(next, profile.id);
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const deleteBlock = useCallback((id: string) => {
    setBlocksState(prev => {
      const next = prev.filter(b => b.id !== id);
      LinkedTreeStore.setBlocks(next, profile.id);
      LinkedTreeStore.addActivityLog(profile.id, `Removed block`, 'block');
      setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const reorderBlocks = useCallback((newBlocks: PageBlock[]) => {
    setBlocksState(newBlocks);
    LinkedTreeStore.setBlocks(newBlocks, profile.id);
    triggerSave();
  }, [profile.id, triggerSave]);

  // --- PRODUCTS ACTIONS ---
  const setProducts = useCallback((newProducts: Product[]) => {
    setProductsState(newProducts);
    LinkedTreeStore.setProducts(newProducts, profile.id);
    triggerSave();
  }, [profile.id, triggerSave]);

  const addProduct = useCallback((prodData: Omit<Product, 'id' | 'profileId' | 'salesCount' | 'totalRevenueInr' | 'createdAt' | 'updatedAt' | 'slug' | 'currency' | 'inventoryCount'> & {
    slug?: string;
    currency?: 'INR' | 'USD';
    inventoryCount?: number;
  }) => {
    setProductsState(prev => {
      const newProd: Product = {
        slug: prodData.slug || prodData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        currency: prodData.currency || 'INR',
        inventoryCount: prodData.inventoryCount !== undefined ? prodData.inventoryCount : -1,
        ...prodData,
        id: `prod_${Date.now()}`,
        profileId: profile.id,
        salesCount: 0,
        totalRevenueInr: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const next = [...prev, newProd];
      LinkedTreeStore.setProducts(next, profile.id);
      LinkedTreeStore.addActivityLog(profile.id, `Added product "${newProd.title}"`, 'store');
      setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const updateProduct = useCallback((id: string, updated: Partial<Product>) => {
    setProductsState(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...updated, updatedAt: new Date().toISOString() } : p);
      LinkedTreeStore.setProducts(next, profile.id);
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const deleteProduct = useCallback((id: string) => {
    setProductsState(prev => {
      const next = prev.filter(p => p.id !== id);
      LinkedTreeStore.setProducts(next, profile.id);
      LinkedTreeStore.addActivityLog(profile.id, `Removed product`, 'store');
      setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  // --- SERVICES & BOOKINGS ---
  const setServices = useCallback((newServices: Service[]) => {
    setServicesState(newServices);
    LinkedTreeStore.setServices(newServices, profile.id);
    triggerSave();
  }, [profile.id, triggerSave]);

  const addService = useCallback((srvData: Omit<Service, 'id' | 'profileId' | 'createdAt'>) => {
    setServicesState(prev => {
      const newSrv: Service = {
        ...srvData,
        id: `srv_${Date.now()}`,
        profileId: profile.id,
        createdAt: new Date().toISOString(),
      };
      const next = [...prev, newSrv];
      LinkedTreeStore.setServices(next, profile.id);
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const updateService = useCallback((id: string, updated: Partial<Service>) => {
    setServicesState(prev => {
      const next = prev.map(s => s.id === id ? { ...s, ...updated } : s);
      LinkedTreeStore.setServices(next, profile.id);
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const deleteService = useCallback((id: string) => {
    setServicesState(prev => {
      const next = prev.filter(s => s.id !== id);
      LinkedTreeStore.setServices(next, profile.id);
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const addBooking = useCallback((bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `bk_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    LinkedTreeStore.addBooking(newBooking);
    setBookingsState(LinkedTreeStore.getBookings(profile.id));
  }, [profile.id]);

  const addSubscribers = useCallback((subData: Omit<Subscriber, 'id' | 'createdAt'>) => {
    LinkedTreeStore.addSubscriber(subData);
    setSubscribersState(LinkedTreeStore.getSubscribers(profile.id));
  }, [profile.id]);

  // --- SOCIAL LINKS ACTIONS ---
  const addSocialLink = useCallback((platform: SocialLink['platform'], url: string) => {
    setSocialLinksState(prev => {
      const exists = prev.find(s => s.platform === platform);
      let next: SocialLink[];
      if (exists) {
        next = prev.map(s => s.platform === platform ? { ...s, url } : s);
      } else {
        next = [...prev, { id: `soc_${Date.now()}`, profileId: profile.id, platform, url, sortOrder: prev.length }];
      }
      LinkedTreeStore.setSocialLinks(next, profile.id);
      LinkedTreeStore.addActivityLog(profile.id, `Updated social link for ${platform}`, 'social');
      setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const updateSocialLink = useCallback((id: string, url: string) => {
    setSocialLinksState(prev => {
      const next = prev.map(s => s.id === id ? { ...s, url } : s);
      LinkedTreeStore.setSocialLinks(next, profile.id);
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const deleteSocialLink = useCallback((id: string) => {
    setSocialLinksState(prev => {
      const target = prev.find(s => s.id === id);
      const next = prev.filter(s => s.id !== id);
      LinkedTreeStore.setSocialLinks(next, profile.id);
      if (target) {
        LinkedTreeStore.addActivityLog(profile.id, `Removed social link for ${target.platform}`, 'social');
        setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      }
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  // --- PROJECTS ACTIONS ---
  const addProject = useCallback((projectData: Omit<Project, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>) => {
    setProjectsState(prev => {
      const newProj: Project = {
        ...projectData,
        id: `proj_${Date.now()}`,
        profileId: profile.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const next = [...prev, newProj];
      LinkedTreeStore.setProjects(next, profile.id);
      LinkedTreeStore.addActivityLog(profile.id, `Added portfolio project "${newProj.title}"`, 'project');
      setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const updateProject = useCallback((id: string, updated: Partial<Project>) => {
    setProjectsState(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...updated, updatedAt: new Date().toISOString() } : p);
      LinkedTreeStore.setProjects(next, profile.id);
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const deleteProject = useCallback((id: string) => {
    setProjectsState(prev => {
      const target = prev.find(p => p.id === id);
      const next = prev.filter(p => p.id !== id);
      LinkedTreeStore.setProjects(next, profile.id);
      if (target) {
        LinkedTreeStore.addActivityLog(profile.id, `Removed project "${target.title}"`, 'project');
        setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      }
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  // --- APPEARANCE ACTIONS ---
  const updateAppearance = useCallback((updated: Partial<AppearanceSettings>) => {
    setAppearanceState(prev => {
      const next: AppearanceSettings = { ...prev, ...updated, updatedAt: new Date().toISOString() };
      LinkedTreeStore.setAppearance(next, profile.id);
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const setThemePreset = useCallback((presetId: ThemePreset) => {
    const preset = THEME_PRESETS[presetId];
    if (!preset) return;

    setAppearanceState(prev => {
      const next: AppearanceSettings = {
        ...prev,
        theme: preset.id,
        backgroundType: preset.backgroundType,
        backgroundColor: preset.backgroundColor,
        backgroundGradient: preset.backgroundGradient,
        primaryColor: preset.primaryColor,
        secondaryColor: preset.secondaryColor,
        textColor: preset.textColor,
        cardColor: preset.cardColor,
        cardTextColor: preset.cardTextColor,
        buttonStyle: preset.buttonStyle,
        buttonRadius: preset.buttonRadius,
        font: preset.font,
        cardStyle: preset.cardStyle,
        animation: preset.animation,
        updatedAt: new Date().toISOString(),
      };
      LinkedTreeStore.setAppearance(next, profile.id);
      LinkedTreeStore.addActivityLog(profile.id, `Applied theme "${preset.name}"`, 'theme');
      setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const deleteAccount = useCallback(() => {
    LinkedTreeStore.deleteAccount(profile.id);
    logout();
  }, [logout, profile.id]);

  const refreshState = useCallback(() => {
    reloadAll(profile.id, timeRange);
  }, [profile.id, reloadAll, timeRange]);

  const handleSeedDemoData = useCallback(() => {
    LinkedTreeStore.seedDemoData(profile.id);
    reloadAll(profile.id, timeRange);
  }, [profile.id, reloadAll, timeRange]);

  return (
    <AppContext.Provider
      value={{
        user,
        profile,
        links,
        blocks,
        products,
        services,
        orders,
        subscribers,
        bookings,
        socialLinks,
        projects,
        appearance,
        analytics,
        activityLogs,
        themeMode,
        setThemeMode,
        toggleThemeMode,
        timeRange,
        setTimeRange,
        isSaving,
        lastSaved,
        isPreviewOpen,
        setIsPreviewOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        login,
        signup,
        logout,
        updateProfile,
        setLinks,
        addLink,
        updateLink,
        deleteLink,
        reorderLinks,
        setBlocks,
        addBlock,
        updateBlock,
        deleteBlock,
        reorderBlocks,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        setServices,
        addService,
        updateService,
        deleteService,
        addBooking,
        addSubscribers,
        addSocialLink,
        updateSocialLink,
        deleteSocialLink,
        addProject,
        updateProject,
        deleteProject,
        updateAppearance,
        setThemePreset,
        togglePublish,
        deleteAccount,
        seedDemoData: handleSeedDemoData,
        refreshState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
