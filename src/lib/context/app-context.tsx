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
  ActivityItem 
} from '@/types';
import { LinkedTreeStore } from '@/lib/data-store';
import { THEME_PRESETS } from '@/lib/themes';

interface AppContextType {
  user: User | null;
  profile: Profile;
  links: Link[];
  socialLinks: SocialLink[];
  projects: Project[];
  appearance: AppearanceSettings;
  analytics: AnalyticsSummary;
  activityLogs: ActivityItem[];
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
  const [socialLinks, setSocialLinksState] = useState<SocialLink[]>(() => LinkedTreeStore.getSocialLinks());
  const [projects, setProjectsState] = useState<Project[]>(() => LinkedTreeStore.getProjects());
  const [appearance, setAppearanceState] = useState<AppearanceSettings>(() => LinkedTreeStore.getAppearance());
  const [timeRange, setTimeRangeState] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [analytics, setAnalyticsState] = useState<AnalyticsSummary>(() => LinkedTreeStore.getAnalytics(undefined, '30d'));
  const [activityLogs, setActivityLogsState] = useState<ActivityItem[]>(() => LinkedTreeStore.getActivityLogs());
  
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
  const login = useCallback(async (email: string) => {
    const res = LinkedTreeStore.signupOrLogin(email);
    setUser(res.user);
    reloadAll(res.profile.id, timeRange);
  }, [reloadAll, timeRange]);

  const signup = useCallback(async (email: string, _password?: string, username?: string, displayName?: string) => {
    const res = LinkedTreeStore.signupOrLogin(email, username, displayName);
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
      LinkedTreeStore.addActivityLog(next.id, 'Updated profile information', 'profile');
      setActivityLogsState(LinkedTreeStore.getActivityLogs(next.id));
      triggerSave();
      return next;
    });
  }, [triggerSave]);

  const togglePublish = useCallback((isPublished: boolean) => {
    updateProfile({ isPublished });
    LinkedTreeStore.addActivityLog(
      profile.id, 
      isPublished ? 'Public profile published live' : 'Profile unpublished (private)', 
      'publish'
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
    const newLink: Link = {
      ...linkData,
      id: `link_${Date.now()}`,
      profileId: profile.id,
      clickCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLinksState(prev => {
      const next = [newLink, ...prev];
      LinkedTreeStore.setLinks(next, profile.id);
      LinkedTreeStore.addActivityLog(profile.id, `Added link "${linkData.title}"`, 'link');
      setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const updateLink = useCallback((id: string, updated: Partial<Link>) => {
    setLinksState(prev => {
      const next = prev.map(item => item.id === id ? { ...item, ...updated, updatedAt: new Date().toISOString() } : item);
      LinkedTreeStore.setLinks(next, profile.id);
      const target = next.find(i => i.id === id);
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
      const target = prev.find(i => i.id === id);
      const next = prev.filter(item => item.id !== id);
      LinkedTreeStore.setLinks(next, profile.id);
      if (target) {
        LinkedTreeStore.addActivityLog(profile.id, `Removed link "${target.title}"`, 'link');
        setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      }
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const reorderLinks = useCallback((newLinks: Link[]) => {
    const updated = newLinks.map((item, index) => ({ ...item, sortOrder: index }));
    setLinksState(updated);
    LinkedTreeStore.setLinks(updated, profile.id);
    triggerSave();
  }, [profile.id, triggerSave]);

  // --- SOCIAL LINKS ACTIONS ---
  const addSocialLink = useCallback((platform: SocialLink['platform'], url: string) => {
    const newSocial: SocialLink = {
      id: `soc_${Date.now()}`,
      profileId: profile.id,
      platform,
      url,
      sortOrder: socialLinks.length,
      createdAt: new Date().toISOString(),
    };
    setSocialLinksState(prev => {
      const next = [...prev, newSocial];
      LinkedTreeStore.setSocialLinks(next, profile.id);
      LinkedTreeStore.addActivityLog(profile.id, `Connected ${platform} channel`, 'profile');
      setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      triggerSave();
      return next;
    });
  }, [profile.id, socialLinks.length, triggerSave]);

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
      const next = prev.filter(s => s.id !== id);
      LinkedTreeStore.setSocialLinks(next, profile.id);
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  // --- PROJECTS ACTIONS ---
  const addProject = useCallback((projectData: Omit<Project, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj_${Date.now()}`,
      profileId: profile.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjectsState(prev => {
      const next = [newProject, ...prev];
      LinkedTreeStore.setProjects(next, profile.id);
      LinkedTreeStore.addActivityLog(profile.id, `Featured project "${projectData.title}"`, 'project');
      setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const updateProject = useCallback((id: string, updated: Partial<Project>) => {
    setProjectsState(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...updated, updatedAt: new Date().toISOString() } : p);
      LinkedTreeStore.setProjects(next, profile.id);
      const target = next.find(i => i.id === id);
      if (target) {
        LinkedTreeStore.addActivityLog(profile.id, `Updated project "${target.title}"`, 'project');
        setActivityLogsState(LinkedTreeStore.getActivityLogs(profile.id));
      }
      triggerSave();
      return next;
    });
  }, [profile.id, triggerSave]);

  const deleteProject = useCallback((id: string) => {
    setProjectsState(prev => {
      const target = prev.find(i => i.id === id);
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
        socialLinks,
        projects,
        appearance,
        analytics,
        activityLogs,
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
