/**
 * Centralized Asset Mapping & Design Token System for the Dual-World
 * Light & Dark Webloom Experience.
 */

export type WebloomThemeMode = 'light' | 'dark';

/**
 * Direct Light Asset Path -> Art-Directed Dark Asset Path Mapping
 */
export const WEBLOOM_ASSET_MAP: Record<string, string> = {
  // A. Hero Studio & Workspace Assets
  '/generated/hero-studio-bg.jpg': '/generated/dark/hero-studio-bg-dark.jpg',
  '/generated/photo-mountain.jpg': '/generated/dark/photo-mountain-dark.jpg',
  '/generated/photo-sunset.jpg': '/generated/dark/photo-sunset-dark.jpg',

  // B. Scrapbook & Editorial Assets
  '/generated/photo-coastal.jpg': '/generated/dark/photo-coastal-dark.jpg',
  '/generated/card-sage-hd.png': '/generated/dark/card-sage-dark.png',
  '/generated/card-peach-hd.png': '/generated/dark/card-peach-dark.png',
  '/generated/card-lavender-hd.png': '/generated/dark/card-lavender-dark.png',
  '/generated/card-sand-hd.png': '/generated/dark/card-sand-dark.png',

  // C. Website Previews & Template Showcase Assets
  '/generated/villa-courtyard.jpg': '/generated/dark/villa-courtyard-dark.jpg',
  '/generated/botanical-leaves-dark.jpg': '/generated/dark/botanical-leaves-night.jpg',
  '/generated/thumb-landscape.jpg': '/generated/dark/thumb-landscape-dark.jpg',
  '/generated/thumb-monogram.jpg': '/generated/dark/thumb-monogram-dark.jpg',
  '/generated/thumb-daisy.jpg': '/generated/dark/thumb-daisy-dark.jpg',
  '/generated/thumb-wave.jpg': '/generated/dark/thumb-wave-dark.jpg',

  // D. 5-Plane 3D Watercolor Countryside Diorama Assets
  '/generated/audience-hills-authentic.jpg': '/generated/dark/audience-hills-dark.jpg',
  '/generated/diorama-cottage-cutout.png': '/generated/dark/diorama-cottage-cutout-dark.png',
  '/generated/diorama-right-grove-cutout.png': '/generated/dark/diorama-right-grove-cutout-dark.png',

  // E. Finale Handmade Lavender Botanical Banner
  '/generated/lavender-ribbon-clean.png': '/generated/dark/lavender-ribbon-dark.png',
};

/**
 * Semantic Asset Registry (hero-light -> hero-dark, workspace-light -> workspace-dark, etc.)
 */
export const WEBLOOM_SEMANTIC_ASSETS = {
  hero: {
    light: '/generated/hero-studio-bg.jpg',
    dark: '/generated/dark/hero-studio-bg-dark.jpg',
  },
  workspace: {
    light: '/generated/villa-courtyard.jpg',
    dark: '/generated/dark/villa-courtyard-dark.jpg',
  },
  portfolio: {
    light: '/generated/botanical-leaves-dark.jpg',
    dark: '/generated/dark/botanical-leaves-night.jpg',
  },
  landscape: {
    light: '/generated/audience-hills-authentic.jpg',
    dark: '/generated/dark/audience-hills-dark.jpg',
  },
  landscapeCottageCutout: {
    light: '/generated/diorama-cottage-cutout.png',
    dark: '/generated/dark/diorama-cottage-cutout-dark.png',
  },
  landscapeGroveCutout: {
    light: '/generated/diorama-right-grove-cutout.png',
    dark: '/generated/dark/diorama-right-grove-cutout-dark.png',
  },
  pricingCardSage: {
    light: '/generated/card-sage-hd.png',
    dark: '/generated/dark/card-sage-dark.png',
  },
  pricingCardPeach: {
    light: '/generated/card-peach-hd.png',
    dark: '/generated/dark/card-peach-dark.png',
  },
  pricingCardLavender: {
    light: '/generated/card-lavender-hd.png',
    dark: '/generated/dark/card-lavender-dark.png',
  },
  pricingCardSand: {
    light: '/generated/card-sand-hd.png',
    dark: '/generated/dark/card-sand-dark.png',
  },
  footerRibbon: {
    light: '/generated/lavender-ribbon-clean.png',
    dark: '/generated/dark/lavender-ribbon-dark.png',
  },
} as const;

/**
 * Resolves a light asset path to its synchronized art-directed dark counterpart
 * when rendering inside the dark replica layer.
 */
export function getThemeAsset(
  lightAssetPath: string,
  theme: WebloomThemeMode
): string {
  if (theme === 'light') return lightAssetPath;
  return WEBLOOM_ASSET_MAP[lightAssetPath] ?? lightAssetPath;
}

