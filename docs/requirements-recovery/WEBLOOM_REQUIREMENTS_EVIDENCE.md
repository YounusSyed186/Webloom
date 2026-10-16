# Webloom (Formerly Linked Tree) — Requirements Evidence & Traceability Report

> **Document Status:** Comprehensive Audit & Evidence Log  
> **Investigation Date:** October 9, 2026  
> **Target System:** Webloom / Linked Tree Codebase  
> **Corpus Location:** `c:\Projects\InspriingWave\Linked`  
> **Author:** Antigravity Audit & Requirements Discovery Subsystem  

---

## 1. Executive Traceability Overview

This document provides exhaustive, verifiable evidence backing the recovered product requirements for **Webloom** (formerly **Linked Tree**). Every requirement, architecture decision, feature, and workflow has been traced back to primary source files, accessible Antigravity conversation transcripts, external research documents, or existing application code.

### Summary of Investigated Source Classes

| Source Category | Source Identifier | Evidence Type | Significance |
| :--- | :--- | :--- | :--- |
| **Agent Conversation** | Brain `4ea247cd` | Primary Specification | Original "Linked Tree — Ultra-Detailed Product + UI Implementation Prompt" (31,130 characters, 97 sections). Formulates product vision, 21st.dev design reference, dashboard layout, theme engine, and entity models. |
| **Agent Conversation** | Brain `4ed962c4` | Primary Technical Spec | "Linked Tree — Complete Productionization Prompt" (35,256 characters, 110 sections). Mandates zero mock data, Supabase schema, RLS, auth, real analytics, and validation. |
| **Agent Conversation** | Brain `314b0e01` | Rebranding & Refinement | Brand launch of `# WEBLOOM` ("Your corner of the internet"), landing page architecture, demo account creation (`demo@webloom.site`), hero multi-device preview, and explicit removal of accidental MindFlow artifacts. |
| **Research Document** | `deep-research-report (1).md` | Design Research | Located in `C:\Users\DELL\Downloads\`. Curated UI inspiration focusing on 21st.dev (12,000+ React/Tailwind components), Spell UI, Framer Motion spring physics, and accessible form design. |
| **Research Document** | `deep-research-report.md` | Non-Project Artifact | Located in `C:\Users\DELL\Downloads\`. Analysis of criminal-investigation NLP pipelines. Determined to be **unrelated** to Webloom/Linked Tree. |
| **Repository File System** | 82 Active Files in Workspace | Implementation Artifacts | Full Next.js 15 App Router codebase, Tailwind CSS configuration, Supabase SQL schemas, client store, and UI components. |
| **Git Version Control** | Repository Root | VCS History Audit | **Finding:** The workspace `c:\Projects\InspriingWave\Linked` was not initialized as a git repository (`.git` directory absent). Version evolution is captured via sequential Antigravity conversation logs. |

---

## 2. Source-by-Source Evidence Audit

### Source 1: Conversation `4ea247cd-f007-42fa-a5c9-8089db70258f`
- **Timestamp:** 2026-10-08T04:59:13Z
- **User Prompt:** "LINKED TREE — ULTRA-DETAILED PRODUCT + UI IMPLEMENTATION PROMPT" (31,130 chars)
- **Primary Evidence Recovered:**
  - **Section 0–1:** Explicit mandate: "Transform the project into a production-quality Linktree-style portfolio/link-in-bio platform called Linked Tree." Explicit instruction to reference **21st.dev** for modern UI design patterns.
  - **Section 3 (Product Vision):** "Linked Tree is a personal portfolio + link-in-bio platform. A user creates one public URL (e.g. `linkedtree.com/younus`) that becomes the user's digital identity."
  - **Section 4 (Product Experience):** Established the core architectural dichotomy:
    - *A. Creator Dashboard:* Overview, Links, Appearance, Profile, Projects, Analytics, Settings.
    - *B. Public Profile:* `linkedtree.com/@username`, styled like a polished personal website rather than an admin tool.
  - **Section 5 (Core Entities):** Detailed entity schemas for `User`, `Profile`, `Link`, `Project`, and `AppearanceSettings`.
  - **Sections 6–46:** Specified drag-and-drop link reordering, 13 theme presets, custom typography choices (Inter, Geist, Manrope, Space Grotesk), button geometry styles (rounded, pill, brutalist), Recharts analytics, QR code generation, and live preview synchronization.

### Source 2: Conversation `4ed962c4-74ba-44fd-b302-a3acc5e4f2ca`
- **Timestamp:** 2026-10-08T05:14:30Z
- **User Prompt:** "LINKED TREE — COMPLETE PRODUCTIONIZATION PROMPT" (35,256 chars)
- **Primary Evidence Recovered:**
  - **Section 1 (Absolute Rules):** "Do NOT redesign the UI. Make every part of the existing UI actually work. Production-ready SaaS application."
  - **Section 4–6 (Database Architecture):** Strict Supabase PostgreSQL integration. Zero mock data policy. Tables: `profiles`, `links`, `social_links`, `projects`, `appearance_settings`, `analytics_events`, `activity_logs`.
  - **Sections 7–12 (Auth & RLS):** User-Profile 1:1 relationship with Supabase Auth (`auth.users`), Row-Level Security policies, and IDOR protection.
  - **Sections 15–20 (Links System):** Optimistic updates for sorting, safe URL validation protocols, click telemetry.
  - **Sections 30–36 (Analytics):** Profile view tracking, link click tracking, date range filters (`7d`, `30d`, `90d`, `1y`), top referrers, device breakdown, and country breakdown.
  - **Section 106 (32-Step E2E User Journey):** Exhaustive step-by-step verification lifecycle from signup to public profile verification and QR sharing.

### Source 3: Conversation `314b0e01-6e0e-4948-9a9a-bd1ac5ad47b8`
- **Timestamp:** 2026-10-08T05:37:12Z to 06:33:09Z
- **User Prompts:** 12 sequential interaction steps
- **Primary Evidence Recovered:**
  - **Step 0 (MindFlow Anomaly):** Prompt opened with a prompt for "MindFlow" (a mental wellness/journaling app).
  - **Step 85 (The Webloom Rebrand):** User submitted the canonical `# WEBLOOM` brand document:
    - Tagline: *"Your corner of the internet."*
    - Core Idea: *"One link → everything about you."*
    - Narrative sections: What is Webloom, Bloom Philosophy, Craft, Projects, Customization, Analytics, Pricing ($0 Free vs Pro), FAQ.
  - **Step 157 (Brand Definition Clarification):** Conversation explicitly codified the rename: *"Webloom is the name we chose for your portfolio/link-tree platform — a product where people can create a beautiful personal digital presence from a single shareable link. Think of Webloom as Linktree + personal portfolio + mini personal website..."*
  - **Step 173:** User requested brand asset generation: logos and hero showcase (`webloom_brand_logo`, `webloom_hero_showcase`, `webloom_avatar_portrait`).
  - **Step 201 & 313:** User requested demo account credentials and sample data seeding (`demo@webloom.site`, handle `younus`).
  - **Step 255 (MindFlow Purge):** User explicitly commanded: *"and remove the midflow data iform the colde and the db"*. The assistant promptly removed `mindflow_schema.sql` and all references to MindFlow.
  - **Step 471 & 560:** User directed that the landing page hero section must use the live dashboard preview component and support switching between Mobile, Tablet, and PC/Desktop viewports.

### Source 4: Research Documents in Downloads
1. **`C:\Users\DELL\Downloads\deep-research-report (1).md` (13,603 bytes, modified 10/8/2026 5:29 AM):**
   - **Type:** UI/UX Inspiration and Modern Component Architecture Report.
   - **Relevance:** Direct primary inspiration. Analyzes **21st.dev** (12,000+ Tailwind + React components), Spell UI, Framer Motion spring physics (`stiffness: 400, damping: 30`), GPU-accelerated CSS keyframe animations, card hover elevations, and accessible form conventions.
   - **Conclusion:** Used directly as the design benchmark for Linked Tree's dashboard cards, live preview frames, and theme transitions.
2. **`C:\Users\DELL\Downloads\deep-research-report.md` (41,468 bytes, modified 9/17/2026 4:15 AM):**
   - **Type:** Technical NLP Paper on Criminal Investigation NER and Graph RAG.
   - **Relevance:** Completely unrelated to Webloom / Linked Tree. Belongs to a prior project (`C:\Projects\Sih\CriminalNetwork_Analysis`).
   - **Conclusion:** Excluded from Webloom requirements synthesis.

### Source 5: Workspace Source Code & Database Artifacts
- **`supabase/schema.sql` (198 lines):**
  - Defines 7 core relational tables: `profiles`, `links`, `social_links`, `projects`, `appearance_settings`, `analytics_events`, and `activity_logs`.
  - Enables Row Level Security (RLS) on all 7 tables with explicit SELECT/INSERT/UPDATE/DELETE policies.
- **`supabase/seed.sql` (124 lines):**
  - Concrete seed data for user `younus` (`a0000000-0000-0000-0000-000000000001`), including 6 social links, 4 custom links, 3 showcase projects, and appearance settings.
- **`src/lib/data-store.ts` (741 lines):**
  - `LinkedTreeStore` class managing local state under keys `linked_tree_v2_*` while implementing async Supabase sync methods (`syncProfileToSupabase`, `syncLinksToSupabase`, `syncSocialsToSupabase`, `syncProjectsToSupabase`, `syncAppearanceToSupabase`).
- **`src/app/page.tsx` & `src/components/landing/*` (20 components):**
  - Verifiable implementation of the 20-section `# WEBLOOM` marketing specification.
- **`src/app/[username]/page.tsx` & `src/components/profile/profile-renderer.tsx` (371 lines):**
  - Production-grade public profile renderer dynamically supporting all 13 themes, responsive viewports, and interaction tracking.

---

## 3. Fact vs. Inference Matrix

To ensure absolute documentation integrity, every finding has been categorized as either an **Explicit Recovered Fact** or an **Inferred Technical Deduction**.

| Category | Finding | Evidence Reference | Nature |
| :--- | :--- | :--- | :--- |
| **Product Identity** | Original name was "Linked Tree", later rebranded to "Webloom" | Prompts `4ea247cd`, `314b0e01` (Step 85, 157) | **Recovered Fact** |
| **Product Concept** | Product is Linktree + Portfolio + Personal Website | Prompt `314b0e01` (Step 157), `src/components/landing/what-is-webloom.tsx` | **Recovered Fact** |
| **Brand Tagline** | "Your corner of the internet." | Prompt `314b0e01` (Step 85), `src/components/landing/hero/hero-section.tsx` | **Recovered Fact** |
| **Design Reference** | 21st.dev was the primary visual and component benchmark | Prompt `4ea247cd` (Section 1), `deep-research-report (1).md` | **Recovered Fact** |
| **Database Architecture** | 7 Supabase PostgreSQL tables with RLS | `supabase/schema.sql`, Prompt `4ed962c4` (Section 6) | **Recovered Fact** |
| **Theming Engine** | 13 curated presets, 7 button shapes, 7 fonts, 4 layouts | `src/lib/themes.ts`, `src/types/index.ts`, Prompt `4ea247cd` (Sec 18) | **Recovered Fact** |
| **MindFlow Context** | MindFlow was an accidental paste from another task, explicitly purged | Prompt `314b0e01` (Step 255: "remove the midflow data iform the colde and the db") | **Recovered Fact** |
| **Git Absence** | Workspace does not contain a `.git` repository folder | Terminal filesystem audit (`Test-Path .git` returned false) | **Recovered Fact** |
| **Auth Dual-Mode** | Client currently relies on LocalStorage with optional Supabase client sync | `src/lib/data-store.ts`, `src/lib/context/app-context.tsx` | **Inferred Deduction** |
| **Storage Architecture** | File upload currently converts images to Base64 Data URLs instead of Supabase Storage | `src/app/api/upload/route.ts` (Buffer.toString('base64')) | **Inferred Deduction** |
| **Custom Domains** | Custom domain field exists in UI and DB, but DNS edge routing is not yet wired | `supabase/schema.sql`, `src/app/dashboard/settings/page.tsx` | **Inferred Deduction** |

---

## 4. Conflicting Evidence & Architectural Divergences

### Divergence 1: LocalStorage Architecture vs. Supabase-Only Mandate
- **The Stated Requirement (Prompt `4ed962c4` Section 4):**
  > *"ZERO MOCK DATA POLICY: Every visible feature should be backed by real data, real persistence, real authentication/authorization in Supabase."*
- **The Codebase Reality (`src/lib/data-store.ts`):**
  The codebase implements a resilient **Dual-Mode Data Store (`LinkedTreeStore`)**. State is primarily written to browser `localStorage` (`linked_tree_v2_*`) and then asynchronously upserted to Supabase tables when network and credentials permit.
- **Resolution & Rationale:**
  This was an intentional engineering accommodation in conversation `314b0e01` (Step 201–215). It allowed local development, demo account testing (`younus`), and instant preview manipulation without crashing if Supabase was unconfigured or offline.
- **Recommended Next Step:** Wire Supabase Server Actions directly while maintaining `localStorage` as an optimistic cache.

### Divergence 2: Image Storage (Supabase S3 Buckets vs. Base64 Data URLs)
- **The Stated Requirement (Prompt `4ed962c4` Section 42):**
  Upload avatars, cover images, and project banners to a public Supabase Storage bucket (`avatars`, `projects`).
- **The Codebase Reality (`src/app/api/upload/route.ts`):**
  The route accepts images under 5MB (JPEG, PNG, WEBP, SVG) and converts them into inline `data:${type};base64,...` strings.
- **Resolution & Rationale:**
  Base64 strings allowed self-contained image uploads without provisioning Supabase Storage S3 buckets or configuring CORS policies.
- **Recommended Next Step:** Transition to Supabase Storage buckets for production scalability and database payload reduction.

### Divergence 3: Package Name & Internal Prefix Legacy
- **The Codebase Reality (`package.json`, `src/lib/data-store.ts`):**
  - `package.json` contains `"name": "linked-tree"`.
  - Storage keys are prefixed with `linked_tree_v2_`.
- **The Brand Reality (`src/components/landing/*`):**
  All public-facing branding, meta tags, and copy use **Webloom**.
- **Resolution & Rationale:**
  The rebrand to Webloom occurred after the project directory and initial package were created. The internal code retained the legacy identifier to prevent breaking existing imports.
- **Recommended Next Step:** Standardize internal package manifests and storage keys to `webloom` under an approved migration plan.

---

## 5. Traceability Evidence Matrix

| Requirement Area | Source Prompt / File | Code Location | Confidence | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **Webloom Brand & Philosophy** | `314b0e01` Step 85 | `src/components/landing/bloom-philosophy.tsx` | **High** | Fully Implemented |
| **Interactive Multi-Device Preview** | `314b0e01` Step 471, 560 | `src/components/landing/hero/hero-preview.tsx` | **High** | Fully Implemented |
| **20-Section Landing Page** | `314b0e01` Step 85 | `src/app/page.tsx` | **High** | Fully Implemented |
| **Public Profile Dynamic Slug** | `4ea247cd` Sec 27 | `src/app/[username]/page.tsx` | **High** | Fully Implemented |
| **13-Platform Social Icons** | `4ea247cd` Sec 20 | `src/components/ui/icons.tsx` | **High** | Fully Implemented |
| **13 Visual Theme Presets** | `4ea247cd` Sec 18 | `src/lib/themes.ts` | **High** | Fully Implemented |
| **Drag & Drop Link Reordering** | `4ea247cd` Sec 15 | `src/app/dashboard/links/page.tsx` | **High** | Fully Implemented |
| **Showcase Projects Manager** | `4ea247cd` Sec 24 | `src/app/dashboard/projects/page.tsx` | **High** | Fully Implemented |
| **Analytics Recharts Dashboard** | `4ea247cd` Sec 25 | `src/app/dashboard/analytics/page.tsx` | **High** | Fully Implemented |
| **QR Code Generator & PNG Download**| `4ea247cd` Sec 35 | `src/components/sharing/share-modal.tsx` | **High** | Fully Implemented |
| **Reserved Handles Protection** | `4ed962c4` Sec 9 | `src/lib/constants.ts` | **High** | Fully Implemented |
| **Postgres Database Schema (7 Tables)**| `4ed962c4` Sec 6 | `supabase/schema.sql` | **High** | Fully Implemented |
| **Demo Account Pre-Seeding** | `314b0e01` Step 201, 313 | `supabase/seed.sql`, `src/lib/mock-data.ts`| **High** | Fully Implemented |
| **Supabase Storage S3 Buckets** | `4ed962c4` Sec 42 | `src/app/api/upload/route.ts` | **Medium** | Partial (Base64 fallback) |
| **Custom Domain Edge Routing** | `4ea247cd` Sec 33 | `src/app/dashboard/settings/page.tsx` | **Medium** | Partial (UI/DB only) |
| **Strict Supabase SSR Middleware** | `4ed962c4` Sec 10 | `src/lib/supabase/client.ts` | **Medium** | Partial (Client SDK only) |
