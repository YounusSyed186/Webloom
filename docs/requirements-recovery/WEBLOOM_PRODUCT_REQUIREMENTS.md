# Webloom (Formerly Linked Tree) — Canonical Product Requirements Document (PRD)

> **Document Status:** Baseline Requirements Recovery (Pre-Implementation Audit)  
> **Original Working Title:** Linked Tree  
> **Current Canonical Brand:** Webloom  
> **Brand Tagline:** *Your corner of the internet.*  
> **Recovered Date:** October 2026  
> **Author:** Antigravity Audit & Requirements Discovery Subsystem  

---

## 1. Executive Summary

**Webloom** (originally conceived and developed under the working title **Linked Tree**) is a premium, modern personal digital identity platform. It is engineered to bridge the divide between simplistic "link-in-bio" tools (e.g., Linktree) and complex, heavy personal website builders (e.g., Squarespace, WordPress, Framer). 

The platform enables creators, software developers, designers, writers, artists, founders, and students to consolidate their entire digital footprint—portfolio items, GitHub repositories, social accounts, professional experience, writing, and custom links—into a single, highly customizable, blazing-fast personal URL (`webloom.site/[username]`).

Unlike traditional link aggregators that force users into generic, rigid vertical button stacks, Webloom treats personal presence as an expressive, living digital home. It couples a live, multi-viewport WYSIWYG creator dashboard with an editorial, highly responsive public profile engine featuring 13 curated themes, bespoke typography, fluid layout grids, rich multimedia cards, and real-time, privacy-first interaction analytics.

---

## 2. Product Provenance & The Vision Transition

```
+-----------------------------------------------------------------------------+
|                               ORIGIN PHASE                                  |
|   "Linked Tree" (4ea247cd)                                                  |
|   - Goal: Production-quality Linktree alternative built with 21st.dev UI   |
|   - Focus: Creator Dashboard + Public Profile + Themes + Links + Projects   |
+-----------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------+
|                           PRODUCTIONIZATION PHASE                           |
|   "Linked Tree Full Stack" (4ed962c4)                                       |
|   - Goal: Convert visual UI into full dynamic SaaS with Supabase backend    |
|   - Additions: Postgres Schema, RLS, Auth, Real Analytics, Drag-n-Drop      |
+-----------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------+
|                           BRAND EVOLUTION PHASE                             |
|   "Webloom" (314b0e01)                                                      |
|   - Rename & Rebrand: From mechanical "Linked Tree" to organic "Webloom"    |
|   - Tagline: "Your corner of the internet"                                  |
|   - Metaphor: Web + Bloom ("Designed to flourish", personal identity home)  |
|   - Additions: 20-Section Landing Page, Hero Responsive Preview Switcher,   |
|                Demo Seed Account, MindFlow accidental injection clean-up    |
+-----------------------------------------------------------------------------+
```

### 2.1 The Original Linked Tree Vision
Conceived in early October 2026 (first documented in prompt `4ea247cd-f007-42fa-a5c9-8089db70258f`), "Linked Tree" was architected to address the visual monotony of link-in-bio services. The original mandate required pairing the architectural foundations of Next.js 15 and Supabase with UI patterns inspired by **21st.dev**, shadcn/ui, and Framer Motion. The core proposition was:
> *"A personal portfolio + link-in-bio platform where a user creates one public URL that becomes their digital identity hub."*

### 2.2 Why the Name Changed to Webloom
During the landing page and brand identity development phase (documented in prompt `314b0e01-6e0e-4948-9a9a-bd1ac5ad47b8` and reflected in `src/components/landing/bloom-philosophy.tsx` and `src/components/landing/what-is-webloom.tsx`), the project underwent an intentional rebranding from "Linked Tree" to "Webloom":
1. **Escaping the "Tree" Cliché:** The name "Linked Tree" sounded like a direct clone or derivative of Linktree, anchoring user expectations to simple lists of links.
2. **Organic Synthesis ("Web" + "Bloom"):** Webloom conveys vitality, flourishing creativity, and continuous evolution. As stated in the brand philosophy:
   > *"Your identity. Your work. Your presence — in one place, designed to bloom. A digital presence should not feel like static paperwork — it should feel alive, evolving alongside everything you make."*
3. **Elevated Value Proposition:** The product expanded beyond links to encompass showcase projects, rich case studies, downloadable resumes, verified contact badges, and multi-viewport responsive portfolios.

---

## 3. Problem Statement & Market Opportunity

| Problem | Market Reality | Webloom Solution |
| :--- | :--- | :--- |
| **Fragmented Digital Identity** | Creators maintain 6–10 disconnected URLs: GitHub, LinkedIn, Substack, X/Twitter, Dribbble, personal blogs, and project sites. | **Single Identity Hub:** Consolidates all social handles, project links, portfolios, and contact methods into one canonical link. |
| **Generic Link-in-Bio Tools** | Traditional link aggregators feature rigid, boxy buttons, uniform mobile-only templates, and aggressive platform watermarks. | **Custom Web Craft:** 13 aesthetic themes, custom typography, bespoke button styles, layout options (standard, compact, grid, cards), and dark obsidian aesthetics. |
| **Portfolio Builder Overkill** | Full website builders (Squarespace, Framer, Webflow) require hours of layout tuning, expensive subscriptions, and frequent maintenance. | **Zero-Code Velocity:** From signup to published personal website in under 5 minutes with automatic responsive rendering. |
| **Opaque Visitor Engagement** | Creators lack actionable insight into what content visitors actually engage with without embedding invasive tracking scripts. | **Built-in Analytics:** Cookieless, privacy-respecting analytics tracking profile views, link click-through rates (CTR), device types, and top referral sources. |

---

## 4. Target Users & Personas

1. **Software Developers & Engineers:**
   - *Needs:* Showcase GitHub repositories, featured open-source tools, live demo links, technical skill tags, and tech blog posts.
   - *Key Features:* Project cards with technology badges, GitHub integration icons, developer/terminal theme presets.
2. **Product Designers & Creative Directors:**
   - *Needs:* Display Dribbble/Behance portfolios, case studies, visual artwork, and custom aesthetic styling.
   - *Key Features:* Visual project thumbnails, grid layouts, glassmorphism themes, custom button border-radii.
3. **Founders, Solopreneurs & Indie Hackers:**
   - *Needs:* Single link for personal brand, product launches, newsletters, investor decks, and calendar scheduling.
   - *Key Features:* Custom domains, verified profile badges, conversion-oriented link cards, social proof links.
4. **Content Creators & Writers:**
   - *Needs:* Route followers across YouTube, Substack, podcasts, TikTok, and sponsorships.
   - *Key Features:* Rich media cards, article links, video embeds, QR codes for cross-platform sharing.
5. **Students & Early Career Professionals:**
   - *Needs:* Clean, professional alternative to a PDF resume to place on LinkedIn and job applications.
   - *Key Features:* Downloadable resume link, verified education/bio information, mobile-optimized showcase.

---

## 5. Confirmed MVP Scope

The recovered MVP represents the intersection of the original specification prompts (`4ea247cd`, `4ed962c4`), the brand evolution (`314b0e01`), and the existing implementation:

```
                                  +---------------------------------------+
                                  |         WEBLOOM MVP SCOPE             |
                                  +---------------------------------------+
                                                     |
         +--------------------+----------------------+--------------------+--------------------+
         |                    |                      |                    |                    |
         v                    v                      v                    v                    v
  [1. PUBLIC ENGINE]   [2. DASHBOARD]       [3. THEME ENGINE]    [4. ANALYTICS]       [5. LANDING]
  - /[username] URL    - Overview metrics   - 13 Theme Presets   - Total page views   - 20 Sections
  - Avatar & Cover     - Drag-n-drop Links  - Custom Palette     - Link click events  - Live device
  - Bio & Badges       - Project Showcase   - 7 Button Styles    - CTR computation      switcher
  - Social Icons (13)  - Profile Metadata   - 7 Google Fonts     - Device breakdown   - Auth modal
  - Links & Projects   - Appearance studio  - 4 Layout Modes     - Top referrers      - Demo account
  - QR Code Share      - Settings & Domain  - Live Preview pane  - Date range filters   instant test
```

---

## 6. Detailed Functional Requirements

### Module 1: Public Profile Engine (`/[username]`)
- **REQ-PUB-01 (Dynamic Slug Resolution):** System must resolve `/[username]` dynamically from public database profiles.
- **REQ-PUB-02 (Identity Header):** Render avatar image, display name, professional headline, bio text, verified badge, and location tag.
- **REQ-PUB-03 (Social Link Ribbon):** Render branded icon buttons for up to 13 platforms (GitHub, X, LinkedIn, YouTube, Instagram, Discord, Spotify, TikTok, Threads, Dribbble, Behance, Medium, Facebook).
- **REQ-PUB-04 (Link Cards):** Display active links with custom icons, thumbnails, descriptions, click tracking triggers, and external tab opening (`target="_blank"`).
- **REQ-PUB-05 (Featured Projects):** Render dedicated project cards featuring project banner images, titles, descriptions, technology badges, live preview links, and GitHub links.
- **REQ-PUB-06 (Theme Execution):** Apply active theme colors, font families, background styles (gradient, solid, animated), button styles, and card elevations dynamically.
- **REQ-PUB-07 (Sharing Trigger):** Floating or header-based Share button opening the Webloom Share Modal.
- **REQ-PUB-08 (Unpublished Profile Handling):** If `is_published` is false, non-owners must receive a clean "Profile is currently private" state.
- **REQ-PUB-09 (404 Not Found):** Non-existent usernames must render a dedicated, branded 404 page with a link to claim the handle.

### Module 2: Creator Dashboard (`/dashboard`)
- **REQ-DSH-01 (Overview Metrics):** Real-time display of Total Views, Link Clicks, Average CTR, and Active Link count.
- **REQ-DSH-02 (Handle Quick Actions):** Persistent handle pill with one-click URL copy, live profile preview launch, and sharing trigger.
- **REQ-DSH-03 (Recent Activity Feed):** Chronological log of recent changes (e.g., "Added link", "Updated theme", "Profile published").
- **REQ-DSH-04 (Dual-Pane Live Preview):** Persistent right-side viewport frame in desktop view displaying live edits with Mobile (375px), Tablet (768px), and Desktop (100%) mode toggles.
- **REQ-DSH-05 (Autosave & Status Feedback):** Instant feedback indicator showing "Saving..." and "All changes saved" with timestamps.

### Module 3: Links Management (`/dashboard/links`)
- **REQ-LNK-01 (Add Link Modal):** Modal supporting title, destination URL, description, icon selection, and optional thumbnail.
- **REQ-LNK-02 (Link Types):** Support for `url`, `social`, `video`, `product`, `article`, `file`, `music`, `email`, and `phone`.
- **REQ-LNK-03 (Drag-and-Drop Reordering):** Seamless vertical reordering utilizing `@dnd-kit` with persisted sort order.
- **REQ-LNK-04 (Visibility Toggle):** Instant toggle to enable/disable links without deleting them (`is_active`).
- **REQ-LNK-05 (Link Analytics Badges):** Display individual click counts and computed CTR on each link card.
- **REQ-LNK-06 (Safe URL Validation):** Protocol validation enforcing `http://`, `https://`, `mailto:`, or `tel:` schemes.

### Module 4: Profile & Social Management (`/dashboard/profile`)
- **REQ-PRF-01 (Core Metadata Editing):** Fields for Display Name, Professional Headline, Bio (with character count guide), Location, Website, Email, and Phone.
- **REQ-PRF-02 (Avatar & Cover Image Upload):** Direct image upload with client-side image validation (size < 5MB, format: JPEG, PNG, WEBP, SVG) and live crop/preview.
- **REQ-PRF-03 (Social Link Manager):** Dedicated interface to add, edit, reorder, and remove platform-specific social links.
- **REQ-PRF-04 (Verified Status):** Verified badge rendering on public and preview pages.

### Module 5: Projects Showcase Management (`/dashboard/projects`)
- **REQ-PRJ-01 (Project CRUD):** Create, update, reorder, and delete showcase projects.
- **REQ-PRJ-02 (Project Details):** Fields for Title, Description, Featured Banner Image, Live Demo URL, GitHub Repository URL, and Tag list (comma/enter-separated technology chips).
- **REQ-PRJ-03 (Featured Flag):** Ability to star/feature priority projects for prominent display.

### Module 6: Appearance & Theming Studio (`/dashboard/appearance`)
- **REQ-THM-01 (13 Curated Presets):** Instant theme application across 13 styles: `minimal`, `midnight`, `aurora`, `ocean`, `sunset`, `paper`, `mono`, `glass`, `elegant`, `developer`, `cyberpunk`, `neon`, and `forest`.
- **REQ-THM-02 (Custom Color Controls):** Granular pickers for Background Color, Primary Accent Color, Secondary Accent Color, Text Color, and Card Background Color.
- **REQ-THM-03 (Background Modes):** Options for Solid Color, Gradient Physics, Animated Glows, and Custom Image.
- **REQ-THM-04 (Typography Palette):** Font selection across 7 modern typefaces: Inter, Geist, Manrope, DM Sans, Space Grotesk, Plus Jakarta Sans, and Playfair Display.
- **REQ-THM-05 (Button & Card Geometry):** 7 Button Styles (`rounded`, `pill`, `soft`, `outline`, `glass`, `minimal`, `brutal`) with custom corner radius sliders; 5 Card Styles (`flat`, `elevated`, `glass`, `border`, `minimal`).
- **REQ-THM-06 (Layout Engine):** Public page layout arrangements: `standard` (vertical list), `compact`, `grid` (bento layout), and `cards`.

### Module 7: Interaction Analytics Engine (`/dashboard/analytics`)
- **REQ-ANA-01 (Event Telemetry):** Silent tracking of `PROFILE_VIEW`, `LINK_CLICK`, `PROJECT_VIEW`, and `SOCIAL_CLICK`.
- **REQ-ANA-02 (Date Range Segmentation):** Filtering analytics by `7d` (7 days), `30d` (30 days), `90d` (90 days), and `1y` (1 year).
- **REQ-ANA-03 (Visual Time-Series Charts):** AreaChart of views over time and BarChart of link clicks over time using Recharts.
- **REQ-ANA-04 (Device & Browser Breakdown):** Donut/PieChart categorizing desktop, mobile, and tablet traffic.
- **REQ-ANA-05 (Referral & Geographic Insights):** Ranked lists of top traffic sources (X, GitHub, LinkedIn, Google, Direct) and visitor countries.
- **REQ-ANA-06 (Link Performance Table):** Granular table of all links ranked by clicks, unique visitors, and CTR.

### Module 8: Settings, SEO & Custom Domains (`/dashboard/settings`)
- **REQ-SET-01 (Handle Modification):** Update username with real-time availability checking and reserved handle validation.
- **REQ-SET-02 (Search Engine Indexing):** Toggle `seo_indexing` to inject `noindex, nofollow` meta tags when privacy is desired.
- **REQ-SET-03 (Publish Toggle):** Toggle profile between Live/Public and Draft/Private.
- **REQ-SET-04 (Custom Domain Mapping):** Configuration input for custom CNAME domain binding.
- **REQ-SET-05 (Account Deletion):** Secure cascade deletion of user profile, links, projects, settings, and events with confirmation modal.

### Module 9: Sharing & QR Code System
- **REQ-SHR-01 (Instant URL Copy):** One-click copy with visual toast confirmation.
- **REQ-SHR-02 (QR Code Engine):** Client-side vector/canvas QR code generation using `qrcode` library with direct PNG download.
- **REQ-SHR-03 (Social Share Direct Links):** Pre-formatted share intent URLs for X/Twitter, LinkedIn, and WhatsApp.

### Module 10: Landing Page & Marketing Portal (`/`)
- **REQ-MKT-01 (20 Narrative Sections):** Implementation of the complete `# WEBLOOM` specification:
  1. Navbar with brand logo, links, and AuthModal triggers
  2. HeroSection with interactive device switcher
  3. WhatIsWebloomSection (11 capability cards)
  4. BloomPhilosophySection (Web + Bloom origin story, 4 growth pillars)
  5. IntroSection ("More than a link in your bio")
  6. PageCraftSection ("Make the web feel like yours")
  7. LinksSection ("Everything worth sharing. In one place")
  8. ProjectsSection ("Show what you've made")
  9. CustomizationSection ("No two Weblooms should look the same")
  10. LivePreviewSection ("See it come together as you build")
  11. IdentitySection ("Build a page people remember")
  12. AnalyticsSection ("Know what people actually find")
  13. SharingSection ("One link. Everywhere")
  14. ExamplesSection (Curated creator examples)
  15. AudienceSection (Founders, Creators, Developers, Designers, Writers, Artists, Students)
  16. DifferentiationSection ("Your identity shouldn't depend on a template")
  17. SetupSection ("From nothing to your own page in minutes" - 5 steps)
  18. FeatureSummarySection (Comprehensive capability grid)
  19. PrivacySection ("Your page. Your content. Your control")
  20. PricingSection ($0 Free vs Pro plan tiers)
  21. FAQSection (9 comprehensive questions and answers)
  22. FinalCTA ("Make your corner of the internet")
  23. Footer
- **REQ-MKT-02 (Interactive Device Preview):** Hero showcase with live toggle between Mobile, Tablet, and Desktop frames rendering the real demo profile.
- **REQ-MKT-03 (Demo Account Seeding):** Instant one-click "Try Demo Account" credentials in `AuthModal` pre-populated with `demo@webloom.site` / `younus`.

---

## 7. Non-Functional Requirements

### 7.1 Performance & Responsiveness
- **NFR-PERF-01 (First Contentful Paint):** Public profile pages must achieve FCP under 600ms on standard 4G mobile connections.
- **NFR-PERF-02 (Bundle Optimization):** Strict tree-shaking for icons (`lucide-react`) and motion primitives (`framer-motion`).
- **NFR-PERF-03 (Fluid Layouts):** public profiles and landing page must render seamlessly across 320px (mobile small) up to 2560px (4K monitors).

### 7.2 Security & Data Integrity
- **NFR-SEC-01 (Row Level Security - RLS):** Postgres RLS policies must strictly isolate tenant data. Users can only mutate records where `profile.user_id = auth.uid()`.
- **NFR-SEC-02 (Open Redirect Prevention):** Validate all external destination URLs to prevent `javascript:`, `data:`, or malformed phishing protocols.
- **NFR-SEC-03 (XSS Mitigation):** React JSX default sanitization combined with strict URL protocol sanitizers for link rendering.
- **NFR-SEC-04 (Reserved Handles):** Prevent registration of system routes (`admin`, `dashboard`, `api`, `auth`, `login`, `settings`, `explore`, etc.).

### 7.3 Privacy & Tracking Ethics
- **NFR-PRV-01 (No Third-Party Trackers):** Analytics must be self-contained; no Google Analytics or invasive advertising pixels.
- **NFR-PRV-02 (Cookieless Metrics):** Event telemetry must avoid tracking personal identifiable information (PII). Visitor identification relies on anonymous session hashes.

---

## 8. User Stories & Workflows

### Story 1: Creator Account Creation & Onboarding
> **As a** creative professional,  
> **I want to** claim my unique username and set up my basic profile in minutes,  
> **So that** I have a permanent digital home for my online presence.

- **Preconditions:** User is on the Webloom landing page.
- **Main Flow:**
  1. User clicks "Create your Webloom" or "Sign In".
  2. In `AuthModal`, user enters email and desired username.
  3. System validates username availability in real-time.
  4. User enters display name and password, clicking "Complete Setup".
  5. System creates auth record, initializes default `profiles` and `appearance_settings` rows.
  6. User is redirected to `/dashboard` with an onboarding checklist.
- **Alternative Flow:** User clicks "Try Demo Account" to immediately explore a pre-seeded profile (`younus`).

### Story 2: Managing Links with Drag-and-Drop
> **As a** developer and writer,  
> **I want to** add links and drag them to reorder,  
> **So that** my most important content appears first for my visitors.

- **Preconditions:** User is authenticated on `/dashboard/links`.
- **Main Flow:**
  1. User clicks "Add Link".
  2. Dialog opens; user inputs Title ("My Latest Technical Essay"), URL ("https://..."), and selects type `article`.
  3. User clicks "Save Link".
  4. Link appears at top of the list and immediately renders in the live preview pane.
  5. User grabs the drag handle (`GripVertical`) and drags the card down 2 slots.
  6. Reorder event recalculates `sort_order` and autosaves changes.

### Story 3: Visual Theme Customization
> **As a** designer,  
> **I want to** switch theme presets and tune button shapes,  
> **So that** my profile matches my personal aesthetic brand.

- **Preconditions:** User is on `/dashboard/appearance`.
- **Main Flow:**
  1. User browses 13 theme cards and clicks "Aurora".
  2. Theme applies instantly to the Live Preview frame on the right.
  3. User changes Button Style to "Pill" and font to "Space Grotesk".
  4. Changes are reflected in real-time with zero page reload.
  5. Autosave indicator confirms changes saved.

### Story 4: Visitor Public Profile Discovery & Link Interaction
> **As a** visitor,  
> **I want to** view a creator's Webloom link and click through to their work,  
> **So that** I can explore their projects and connect with them.

- **Preconditions:** Creator has published their Webloom (`webloom.site/younus`).
- **Main Flow:**
  1. Visitor opens `webloom.site/younus`.
  2. Profile page loads with custom theme, avatar, verified badge, bio, and social ribbon.
  3. Background telemetry registers an anonymous `PROFILE_VIEW` event.
  4. Visitor clicks on "Interactive Portfolio & Work".
  5. Telemetry registers a `LINK_CLICK` event for that link ID.
  6. Target website opens safely in a new browser tab.
  7. Creator's dashboard reflects the view and click in real-time analytics.

---

## 9. Technical Architecture Overview

| Layer | Recovered Intended Stack | Current Implemented Stack | Traceability Source |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | Next.js 15 (App Router, React 19) | Next.js 15.2.1, React 19.0.0 | `package.json`, `src/app/` |
| **Styling & Design System** | Tailwind CSS v3, 21st.dev patterns | Tailwind CSS 3.4.17, Vanilla CSS tokens | `tailwind.config.ts`, `globals.css` |
| **Animation System** | Framer Motion (spring physics) | Framer Motion 12.4.7 | `hero-preview.tsx`, `package.json` |
| **Drag & Drop** | `@dnd-kit/core` & `@dnd-kit/sortable` | `@dnd-kit` v6.3.1, sortable v10.0.0 | `src/app/dashboard/links/page.tsx` |
| **Database** | Supabase PostgreSQL + RLS | Supabase Schema (7 tables) + Seed SQL | `supabase/schema.sql`, `seed.sql` |
| **Data Layer & State** | Supabase JS Client with RLS | Dual Mode: LocalStorage (`LinkedTreeStore`) + Supabase upsert fallback | `src/lib/data-store.ts`, `app-context.tsx` |
| **Authentication** | Supabase Auth (`@supabase/ssr`) | Local simulated auth + Supabase client instance | `src/components/auth/auth-modal.tsx` |
| **Data Visualization** | Recharts interactive SVG charts | Recharts 2.15.1 (Area, Bar, Pie charts) | `src/app/dashboard/analytics/page.tsx` |
| **QR Code Engine** | `qrcode` vector canvas renderer | `qrcode` 1.5.4 | `src/components/sharing/share-modal.tsx` |
| **File Storage** | Supabase Storage S3 Buckets | Base64 Data URL API (`/api/upload`) | `src/app/api/upload/route.ts` |

---

## 10. Constraints, Dependencies & Acceptance Criteria

### 10.1 Key Dependencies
- `Next.js 15.2.1` & `React 19.0.0`
- `@supabase/supabase-js 2.49.1` & `@supabase/ssr 0.5.2`
- `@dnd-kit/core 6.3.1`, `@dnd-kit/sortable 10.0.0`
- `framer-motion 12.4.7`
- `recharts 2.15.1`
- `lucide-react 1.16.0`
- `qrcode 1.5.4`

### 10.2 MVP Acceptance Criteria
1. **Public Route:** Any valid username route (`/[username]`) loads in < 1 second and faithfully renders the user's active theme, bio, links, and projects.
2. **Dashboard Synchronization:** Any mutation made in `/dashboard` (links, projects, profile, appearance) immediately updates the live preview pane without requiring a full browser refresh.
3. **Responsive Parity:** Both the public profile and the live preview frame must seamlessly adjust across Mobile (375px), Tablet (768px), and Desktop (100%) widths.
4. **Analytics Telemetry:** Every profile visit and link click must be registered in the event store and reflected on `/dashboard/analytics`.
5. **No Broken Functionality:** All modals, buttons, copy actions, QR downloads, and tabs must be wired to real logic or explicit confirmation dialogs.
