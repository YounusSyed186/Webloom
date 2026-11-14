# Webloom (Linked) — Initial Frontend UX & Usability Audit

**Auditor:** Senior Product Designer & QA Automation Engineer  
**Date:** November 2026  
**Platform:** Webloom (Linked) — Creator Link-in-Bio, Storefront, Booking & Audience Studio  
**Target Environment:** Next.js 14 App Router, TypeScript, Tailwind CSS, LocalStorage Data-Store Engine  
**Live URL:** `http://localhost:3000`

---

## 1. Executive Summary & Audit Scope

Webloom was audited against commercial production standards across 14 public, authenticated, and administrative routes. While the core visual identity (artisanal deckle-edge paper stationery, warm neutral amber accents, botanical motifs) is distinctive and aesthetically compelling, the initial audit identified critical friction points, prototype artifacts, and usability flaws that broke user confidence:

1. **Testing Credentials & Prototype Artifacts in Auth Modal:**  
   The primary authentication modal featured a bright yellow debug box titled "TESTING CREDENTIALS" revealing plaintext passwords (`demo123456`) and an auto-fill button. This degraded user trust and broke commercial SaaS credibility.
2. **Silent Account Creation on Invalid Login:**  
   Users entering incorrect email addresses on sign-in were silently provisioned new empty accounts without validation or error feedback, confusing users who made typos.
3. **Hardcoded Form Placeholders:**  
   Signup inputs hardcoded developer personal usernames (`younus`) instead of illustrative creator placeholders (`mayachen`).
4. **Topbar Route Desynchronization:**  
   Navigating to newly added features (`/dashboard/blocks`, `/dashboard/store`, `/dashboard/bookings`, `/dashboard/audience`, `/dashboard/ai`) left the dashboard topbar heading permanently stuck displaying "Dashboard Overview".
5. **Static Preview Constraints:**  
   Prior live preview lacked realistic viewport device emulation (mobile vs. tablet vs. desktop) and did not support multi-layout composition (Bento, Storefront, Editorial, Booking).

---

## 2. Route Inventory & Classification

| Route | Classification | Primary Purpose | Initial UX Quality |
|---|---|---|---|
| `/` | Public Landing | Value proposition, interactive demo, pricing, testimonials | High (stationery aesthetic, cursor reveal) |
| `/pricing` | Public Marketing | Tier matrix, billing toggle (Monthly / Yearly), Razorpay CTA | Moderate (now synchronized with dashboard) |
| `/privacy` | Legal / Compliance | Privacy policy & data ownership terms | Good (clean typography) |
| `/terms` | Legal / Compliance | Terms of service & creator acceptable use | Good (clean typography) |
| `/demo` | Public Profile | Live creator space demonstrating active blocks, store & bookings | High |
| `/[username]` | Dynamic Public Profile | Personalized creator page for any registered handle | High (layout-responsive) |
| `/dashboard` | Authenticated Core | Creator workspace home, quick metrics, quick actions | High |
| `/dashboard/links` | Authenticated Management | Add, reorder, toggle, and delete external links | High |
| `/dashboard/blocks` | Authenticated Management | Rich content blocks: headers, notes, carousels, maps, embeds | High |
| `/dashboard/store` | Authenticated Commerce | Digital products, pricing, inventory, order tracking | High |
| `/dashboard/bookings` | Authenticated Scheduling | 1-on-1 consultation calendar, duration, pricing | High |
| `/dashboard/audience` | Authenticated CRM | Subscriber directory, export CSV, broadcast messages | High |
| `/dashboard/appearance`| Authenticated Studio | 5 dynamic layouts, themes, fonts, card styles, backgrounds | Outstanding |
| `/dashboard/analytics` | Authenticated Metrics | Referrals, device breakdowns, CTR tracking | High |
| `/dashboard/settings`  | Authenticated Admin | Account profiles, handle management, billing plan status | High |

---

## 3. Evaluated User Personas

1. **The Solo Creator / Independent Maker:**  
   Needs rapid link curation, portfolio showcases, newsletter capture, and a distinctive aesthetic that stands out from generic Linktree clones.
2. **The Digital Merchant / Educator:**  
   Sells downloadable digital goods (PDF guides, Lightroom presets, Notion templates) directly from their bio link with zero transaction friction.
3. **The Consultant / 1-on-1 Coach:**  
   Needs clients to view availability and book paid 30/60-minute strategy sessions directly inside the profile.
4. **The Mobile Visitor:**  
   Browses creator profiles on iOS Safari or Android Chrome with varying screen sizes and touch ergonomics.

