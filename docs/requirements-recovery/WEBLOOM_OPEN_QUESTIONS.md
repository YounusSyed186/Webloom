# Webloom (Formerly Linked Tree) — Unresolved Decisions & Open Questions

> **Document Status:** Actionable Decision Matrix for Project Stakeholder  
> **Target System:** Webloom Platform  
> **Author:** Antigravity Audit & Requirements Discovery Subsystem  

---

## 1. Architectural Decisions Requiring User Confirmation

### Question 1: Authentication & Session Strategy
- **Current State:** The application currently operates in a resilient **Dual-Mode**: user authentication is simulated locally in `LinkedTreeStore` with `localStorage` persistence, while also initializing the Supabase JS client (`src/lib/supabase/client.ts`). A pre-seeded demo account (`demo@webloom.site` / `younus`) is accessible without network credentials.
- **Original Specification (Prompt `4ed962c4`):** Stated a strict mandate for pure Supabase Auth using `@supabase/ssr` server-side session cookies and route-guard middleware.
- **Decision Needed from You:**
  - **Option A (Recommended for Production):** Transition to strict Supabase Auth with server-side cookie middleware (`middleware.ts`), email magic links / passwords, and OAuth providers (GitHub, Google), while retaining the demo account as a dedicated sandbox.
  - **Option B (Hybrid / Fast Preview):** Retain the current dual-mode to allow offline/local testing without active Supabase credentials, syncing to Supabase only when valid environment credentials are provided.

---

### Question 2: Image & Asset Storage Strategy
- **Current State:** `/api/upload` validates image type and file size (<5MB), converts files to base64 Data URLs (`data:image/jpeg;base64,...`), and saves them directly into profile and project state records.
- **Original Specification (Prompt `4ed962c4`):** Stated that avatar, cover, and project images must be stored in Supabase Storage S3 buckets (`avatars`, `projects`, `covers`) with CDN public URLs.
- **Decision Needed from You:**
  - **Option A (Recommended):** Provision Supabase Storage buckets and update `/api/upload` to upload to S3, returning clean CDN URLs to reduce database payload size.
  - **Option B:** Keep base64 data URLs for local development simplicity until cloud deployment.

---

### Question 3: Custom Domain Implementation
- **Current State:** The `custom_domain` column exists in `public.profiles` (`supabase/schema.sql`), and a custom domain input field is present on `/dashboard/settings`. However, there is no DNS verification or edge hostname routing configured.
- **Original Specification (Prompt `4ea247cd` Section 33):** Mentioned custom domain support for Pro users (e.g. `alex.design` pointing to `webloom.site/alex`).
- **Decision Needed from You:**
  - **Option A:** Integrate the **Vercel Domains API** to enable programmatic CNAME verification and automatic SSL certificate issuance.
  - **Option B:** Keep custom domain as a placeholder/upcoming Pro feature and omit edge DNS routing from the MVP.

---

### Question 4: Codebase Identifier Standardization (Linked Tree -> Webloom)
- **Current State:**
  - Public branding, marketing copy, and UI text use **Webloom**.
  - `package.json` contains `"name": "linked-tree"`.
  - LocalStorage keys use `linked_tree_v2_*`.
  - The workspace directory is named `Linked`.
- **Decision Needed from You:**
  - Should we rename internal identifiers (package name to `webloom`, storage prefix to `webloom_v1_`) in the next refactoring phase, or preserve them for legacy continuity?

---

### Question 5: Monetization & Pro Tier Configuration
- **Current State:** The landing page features a Pricing section showing **Free ($0)** vs **Pro ([PRICE] / month)** with placeholders as directed in prompt `314b0e01` Step 85.
- **Original Specification:** Pro features include custom domains, advanced analytics, and custom branding removal.
- **Decision Needed from You:**
  - What are the target pricing points (e.g., $9/month, $12/month, or $79/year)?
  - Should Stripe Checkout and Customer Portal integration be included in the immediate roadmap or deferred to Post-MVP?

---

### Question 6: Public Profile Dynamic Open Graph (OG) Images
- **Current State:** Static metadata tags are defined in `src/app/layout.tsx`.
- **Original Specification (Prompt `4ea247cd` Section 30):** Public profile links shared on iMessage, Twitter/X, and WhatsApp should generate dynamic social cards featuring the creator's avatar, name, and bio.
- **Decision Needed from You:**
  - Should we implement `@vercel/og` (`ImageResponse`) in `src/app/[username]/opengraph-image.tsx` to automatically generate personalized social preview cards for each creator?

---

## 2. Summary of Priority Decisions

| Decision Topic | Technical Impact | Complexity | Recommendation |
| :--- | :--- | :--- | :--- |
| **Auth Mode** | Security & Session Management | Medium | Implement Option A (Strict Supabase SSR Auth with demo sandbox) |
| **Asset Storage** | Database Size & Performance | Low-Medium | Implement Option A (Supabase Storage S3 Buckets) |
| **Custom Domains** | Edge Routing & DNS | High | Option B (Defer DNS automation to post-MVP; retain DB schema) |
| **Package Rebrand** | Code Consistency | Low | Standardize package.json and storage keys to `webloom` |
| **Stripe Billing** | Monetization & Webhooks | Medium | Defer to Milestone 2 (Post-MVP) |
| **Dynamic OG Images** | Viral Social Sharing | Low | Implement `@vercel/og` dynamic image generator |
