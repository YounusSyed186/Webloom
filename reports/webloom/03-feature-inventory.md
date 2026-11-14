# Webloom Feature Inventory & Status Matrix

**Report ID**: `03-feature-inventory.md`  
**Generated Date**: November 10, 2026  
**Auditor**: Senior Product Engineering Team

---

## 1. Feature Status Classification

Every feature across Webloom has been inspected for user purpose, backend dependency, data persistence, validation, error handling, and preview synchronization:

| Feature Category | Specific Feature | Purpose | Backend Dependency | Live Preview Sync | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Identity & Public Page** | Profile Bio & Avatar | Personal branding | `LinkedTreeStore` / Supabase `profiles` | Real-time (`AppContext`) | **Fully Functional** |
| | Custom Domain & SEO | Apex/CNAME routing & OpenGraph | Settings API / `profiles` | N/A (Meta tags) | **Fully Functional** |
| | Verified Badge & Verification | Trust signal | Entitlements / `Profile` model | Real-time (`ProfileRenderer`) | **Fully Functional** |
| **Link Management** | Basic Link CRUD | Display links to social profiles & sites | `LinkedTreeStore` / `links` | Real-time (`AppContext`) | **Fully Functional** |
| | Drag-and-Drop Reordering | Custom priority curation | `@dnd-kit/core` | Real-time (`AppContext`) | **Fully Functional** |
| | Link Click Telemetry | Track click counts & engagement | `trackLinkClick` / `analytics_events` | Instant counter update | **Fully Functional** |
| **Modular Page Blocks** | Heading & Subtitle Blocks | Section division on profile | `LinkedTreeStore.blocks` | **Desynchronized** | **Partially Connected** |
| | Countdown Timer Block | Event & product launch teaser | `LinkedTreeStore.blocks` | **Desynchronized** | **Partially Connected** |
| | Newsletter Lead Magnet | Email lead collection | `LinkedTreeStore.blocks` | **Desynchronized** | **Partially Connected** |
| | Featured Product Block | Showcase digital products | `LinkedTreeStore.blocks` | **Desynchronized** | **Partially Connected** |
| | 1-on-1 Consultation Block | Book appointments directly | `LinkedTreeStore.blocks` | **Desynchronized** | **Partially Connected** |
| **Visual Appearance** | Curated Theme Presets | Instant artisanal styling | `THEME_PRESETS` | Real-time (`AppContext`) | **Fully Functional** |
| | Custom Typography & Fonts | Editorial typography selection | `AppearanceSettings.font` | Real-time (`ProfileRenderer`) | **Fully Functional** |
| | Custom Button Radii & Shadows | Button shape customization | `AppearanceSettings.buttonRadius` | Real-time (`ProfileRenderer`) | **Fully Functional** |
| **Digital Commerce** | Digital Product Catalog | Sell E-books, Presets, Audios | `LinkedTreeStore.products` | **Desynchronized** | **Partially Connected** |
| | Public Storefront Checkout | Instant download access | `POST /api/store/checkout` | N/A (Modal) | **Partially Broken** |
| | Order History & Revenue Metrics | Income tracking | `LinkedTreeStore.orders` | N/A (Dashboard only) | **Fully Functional** |
| **Bookings & Sessions** | Calendar Consultation Slots | Client appointment booking | `LinkedTreeStore.services` | **Desynchronized** | **Partially Connected** |
| | Public Appointment Booking | Visitor calendar selection | `POST /api/bookings` | N/A (Modal) | **Partially Broken** |
| **Audience CRM** | Newsletter Subscribers | Lead database | `LinkedTreeStore.subscribers` | N/A (Dashboard only) | **Fully Functional** |
| | CSV Lead Export | Email tool integration | Client Blob download | N/A | **Fully Functional** |
| | Public Lead Capture API | Public signup endpoint | `POST /api/subscribers` | N/A | **Partially Broken** |
| **AI Studio** | AI Bio Generator | Instant creative bio suggestions | Groq SDK / Gemini | N/A (Generative tool) | **Fully Functional** |
| | AI Page Layout Builder | Automated modular block generation | `AIGateway` | N/A (Generative tool) | **Fully Functional** |
| **Subscription & Billing** | Dynamic Public Tiers | Tiered pricing display | `GET /api/billing/plans` | Synchronized (Dual-Theme) | **Fully Functional** |
| | Razorpay Order & Checkout | Secure payment processing | `POST /api/billing/create-order` | N/A (Razorpay Popup) | **Fully Functional** |
| | HMAC Signature Verification | Fraud prevention | `POST /api/billing/verify` | N/A (Backend) | **Fully Functional** |
| | Dynamic Settings Billing | Dashboard upgrade trigger | `dashboard/settings/page.tsx` | Instant badge update | **Fully Functional** |
| **Analytics Engine** | Real-time Event Ingestion | Telemetry collection | `POST /api/analytics/track` | Real-time | **Partially Broken** |
| | Geographic & Device Breakdown | Visitor telemetry charts | `Recharts` / `LinkedTreeStore` | Time range switchable | **Fully Functional** |

