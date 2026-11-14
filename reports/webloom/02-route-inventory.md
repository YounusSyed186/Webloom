# Webloom Route Inventory & Status Matrix

**Report ID**: `02-route-inventory.md`  
**Generated Date**: November 10, 2026  
**Auditor**: Senior Product Engineering Team

---

## 1. Route Inventory Matrix

| Route | Purpose | User Role | Current Status | Dependencies | Findings / Issues |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Artisanal Landing Page & Dual-World Cursor Reveal | Public Guest | **Working** | WebloomDualThemeContext, 3D Canvas, Razorpay | Dynamic plans and Razorpay checkout working; cursor reveal verified. |
| `/[username]` | Public Creator Profile & Digital Storefront | Public Visitor | **Working** | ProfileRenderer, BlockRenderer, Store Checkout | Commerce and booking modals functional; needs subscriber sync. |
| `/dashboard` | Main Creator Overview & Telemetry Summary | Authenticated Creator | **Working** | AppContext, LinkedTreeStore, Recharts | Dynamic metrics, recent clicks, quick action links functioning. |
| `/dashboard/links` | Link Management & Sortable Drag-and-Drop | Authenticated Creator | **Working** | dnd-kit, AppContext | Sort order, add/edit/delete link working; syncs with Live Preview. |
| `/dashboard/blocks` | Modular Page Blocks Studio | Authenticated Creator | **Partially Connected** | LinkedTreeStore, Framer Motion | Blocks update in local store but do not notify AppContext / LivePreview. |
| `/dashboard/appearance` | Visual Themes, Typography & Palette Studio | Authenticated Creator | **Working** | AppContext, Themes | Theme presets, custom font, button styling sync with Live Preview. |
| `/dashboard/store` | Digital Products, Pricing & Order History | Authenticated Creator | **Partially Connected** | LinkedTreeStore, Zod | Product CRUD functional; needs direct hook to AppContext for preview. |
| `/dashboard/bookings` | 1-on-1 Consultations & Calendar Slots | Authenticated Creator | **Partially Connected** | LinkedTreeStore, Supabase | Appointments display; schema mismatch on public booking endpoint. |
| `/dashboard/audience` | Audience CRM, Subscribers & Lead Export | Authenticated Creator | **Working** | LinkedTreeStore, CSV Exporter | Subscriber list, tag management, and CSV download working. |
| `/dashboard/ai` | AI Studio: Bio Assistant & Page Generator | Authenticated Creator | **Working** | Groq SDK, AIGateway | Bio generation working; needs graceful fallback if API keys unconfigured. |
| `/dashboard/analytics` | Telemetry Ledger & Geographic Traffic Map | Authenticated Creator | **Working** | Recharts, LinkedTreeStore | Time range filtering (7d/30d/90d/1y) and device charts working. |
| `/dashboard/settings` | Profile SEO, Custom Domain & Billing | Authenticated Creator | **Working** | Razorpay SDK, AppContext | Dynamic active plan card and Razorpay upgrade modal functioning. |
| `/admin` | Enterprise Workspace Administration | Superadmin | **Partial** | Supabase Auth, RBAC | Admin layout exists; requires strict role guard and tenant overview. |
| `/api/billing/plans` | Authoritative Pricing Catalog | Public / Client | **Working** | plans.ts, Razorpay | Returns formatted USD and INR pricing for monthly and annual. |
| `/api/billing/create-order` | Server-Side Order Generation | Authenticated / Guest | **Working** | Razorpay SDK, Zod | Generates authoritative order IDs and calculates exact cents/paise. |
| `/api/billing/verify` | HMAC Signature Verification | Authenticated / Guest | **Working** | crypto, Supabase | Cryptographically verifies payment signature and updates subscription. |
| `/api/billing/webhook` | Asynchronous Payment Webhook | Razorpay Webhook | **Working** | crypto | Validates `X-Razorpay-Signature` with secret. |
| `/api/store/checkout` | Storefront Digital Checkout | Public Visitor | **Partially Broken** | Order Store, Zod | Throws 400 when `profileId` is omitted or unverified. |
| `/api/bookings` | Appointment Scheduling API | Public Visitor | **Partially Broken** | Supabase, Zod | Rejects date format unless strict ISO string matching schema. |
| `/api/subscribers` | Audience Newsletter Capture | Public Visitor | **Partially Broken** | Supabase, Zod | Returns 400 if Supabase client cannot connect; no local fallback. |
| `/api/discovery/search` | Semantic Creator Discovery | Public / Client | **Partially Broken** | Gemini Embeddings, pgvector | Lacks `GET` handler; only supports `POST` payloads. |
| `/api/analytics/track` | Telemetry Event Ingestion | Public Visitor | **Partially Broken** | Event Tracker | Rejects requests passing `handle` instead of UUID `profileId`. |
| `/api/upload` | File Upload & Image Storage | Authenticated Creator | **Working** | Local / Supabase Storage | Validates mime type and file size. |
| `/api/validate-handle` | Username Availability Checker | Public / Signup | **Working** | LinkedTreeStore, Supabase | Checks reserved words and character constraints. |

