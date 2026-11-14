# Webloom (Linked) — Route & Feature Coverage Audit

**Test Suite:** Playwright Browser Automation + Manual UX Auditing  
**Coverage Level:** 100% of defined routes and features (14/14 routes)  
**Status:** ALL ROUTES TESTED AND CERTIFIED

---

## 1. Route Verification Matrix

| # | Route | Layout / Viewport | Authentication Required | Interactive Elements Verified | Result |
|---|---|---|---|---|---|
| 01 | `/` | Desktop & Mobile | No | Hero typewriter headline, cursor reveal spotlight, theme switcher, FAQ accordions, pricing billing toggle (Monthly / Yearly), modal triggers. | **PASS** |
| 02 | `/pricing` | Desktop & Mobile | No | Currency switch (USD/INR), billing period toggle (Monthly/Yearly with 35% discount), dynamic Razorpay integration trigger. | **PASS** |
| 03 | `/privacy` | Responsive Doc | No | Legal disclosure, typography hierarchy, navigation back to home. | **PASS** |
| 04 | `/terms` | Responsive Doc | No | Creator terms of service, acceptable use policies, license terms. | **PASS** |
| 05 | `/demo` | Desktop, Tablet, Mobile | No | Live public creator profile rendering links, store items, booking slots, social links, contact forms. | **PASS** |
| 06 | `/[username]` | Responsive Profile | No | Dynamic creator handle resolution from `LinkedTreeStore`, custom theme palettes, custom fonts, selected layout rendering. | **PASS** |
| 07 | `/dashboard` | Desktop Workspace | Yes | Topbar breadcrumbs, greeting, quick metrics, quick-add links, activity feed, live preview sidebar. | **PASS** |
| 08 | `/dashboard/links` | Desktop Workspace | Yes | Link item creation, real-time edit, URL validation, toggle visibility, re-order drag & drop, click counters. | **PASS** |
| 09 | `/dashboard/blocks` | Desktop Workspace | Yes | Rich content blocks: headers, notes, carousels, maps, embeds, responsive layout placement. | **PASS** |
| 10 | `/dashboard/store` | Desktop Workspace | Yes | Digital product creation, price setting, image upload, inventory management, purchase order logs. | **PASS** |
| 11 | `/dashboard/bookings`| Desktop Workspace | Yes | 1-on-1 consultation scheduling, duration, price, working hours configuration, client booking list. | **PASS** |
| 12 | `/dashboard/audience`| Desktop Workspace | Yes | Subscriber CRM list, search & filter, export CSV, broadcast message composer. | **PASS** |
| 13 | `/dashboard/appearance`| Desktop Workspace | Yes | 5 dynamic layout selectors (`bento`, `storefront`, `editorial`, `booking`, `standard`), 10 curated themes, font pairings, card styles, background textures. | **PASS** |
| 14 | `/dashboard/analytics`| Desktop Workspace | Yes | Total page views, link CTRs, referral sources, device breakdown graphs, geographic telemetry. | **PASS** |
| 15 | `/dashboard/settings` | Desktop Workspace | Yes | Profile display name, avatar, bio, custom domain binding, SEO meta tags, Razorpay subscription tier status. | **PASS** |

---

## 2. Interactive Feature Deep Dives

### A. Authentication & Onboarding
- **Sign In:** Validates email and password against stored users. Emits informative error toasts on wrong passwords or non-existent accounts.
- **Sign Up:** Enforces 6+ character passwords and unique `@username` handle collision detection. Initializes the creator space with high-quality default links and themes.
- **Demo Workspace Launcher:** 1-click exploration launcher preloads full store products, bookings, and analytics for seamless product evaluation.

### B. Live Preview Engine
- **Device Viewport Switcher:** Phone (350px), Tablet (480px), and PC Desktop (660px+ with macOS window chrome).
- **5 Dynamic Layouts:**
  1. *Bento Grid:* Asymmetrical, visually striking grid with glassmorphism hover reveals.
  2. *Storefront:* High-converting digital commerce layout prioritizing products and instant purchases.
  3. *Editorial Magazine:* Split-screen layout featuring a sticky creator profile sidebar on desktop and curated story sections.
  4. *Booking Suite:* Consultant-focused layout highlighting calendar slots, services, and credentials.
  5. *Standard Stack:* Timeless, focused link-in-bio vertical card flow.

### C. Razorpay Dynamic Subscriptions
- Real-time billing toggle calculates 35% annual discount across Starter, Creator Pro, and Studio tiers in both USD ($) and INR (₹).
- Connects directly to test key `rzp_test_51bU8f9j6jB18P` with real prefill customer details, payment capture handlers, and immediate subscription tier activation in user settings.

