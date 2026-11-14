# Webloom Architecture Audit Report

**Report ID**: `01-architecture-audit.md`  
**Generated Date**: November 10, 2026  
**Auditor**: Senior Product Engineering Team (Principal Architect, Full-Stack Lead, Security Lead)

---

## 1. System Overview & Technology Stack

Webloom (Linked) is a high-performance, creator-focused Link-in-Bio, Digital Commerce, and Personal Web Space platform built on Next.js App Router and PostgreSQL / Supabase, with Razorpay payment processing and hybrid offline-first client persistence.

### Core Stack Components:
- **Framework**: Next.js 15.2.1 (App Router, Server Actions, API Route Handlers)
- **Language**: TypeScript 5.8.2 (Strict mode enabled)
- **UI / Styling**: Tailwind CSS 3.4.17 with custom stationery design tokens, Framer Motion 12.4.7 for tactile spring animations, Lucide React 1.16.0 icons
- **State Management**: React 19 Context (`AppContext`), Zustand-style LocalStorage persistence (`LinkedTreeStore`), dual-theme sync context (`WebloomDualThemeContext`)
- **Database & Storage**: PostgreSQL via Supabase (`@supabase/supabase-js` 2.49.1, `@supabase/ssr` 0.5.2) with pgvector extension for semantic discovery
- **Payment Processing**: Official Razorpay Node SDK 2.9.8 with server-side HMAC-SHA256 signature verification and client-side modal loader (`checkout.razorpay.com/v1/checkout.js`)
- **AI Engine**: Provider-agnostic gateway supporting Google Gemini (`@google/genai` 2.32.0) and Groq LLMs (`groq-sdk` 1.6.0) for copywriting, bio variations, and embeddings
- **Validation**: Zod 4.6.7 and React Hook Form 7.91.0

---

## 2. Architecture Map & Component Hierarchy

```mermaid
graph TD
    Client[Web Browser Client] --> Edge[Next.js App Router / Edge Middleware]
    
    subgraph Frontend Architecture
        Edge --> PublicLanding[Landing Page & Cursor Reveal Canvas]
        Edge --> PublicProfile[Public Profile: /[username]]
        Edge --> DashLayout[Dashboard Shell: /dashboard/*]
        
        DashLayout --> AppContext[AppContext Provider]
        AppContext --> LivePreview[Live Preview Simulator]
        AppContext --> FeaturePages[Links, Blocks, Store, Bookings, Analytics, AI, Settings]
    end

    subgraph Dual-Mode Persistence Layer
        AppContext --> LocalStore[LinkedTreeStore LocalStorage]
        FeaturePages --> APIHandlers[/api Routes]
        APIHandlers --> SupabaseClient[Supabase PostgreSQL / RLS]
        APIHandlers --> RazorpayGateway[Razorpay Payment API]
        APIHandlers --> AIGateway[Gemini & Groq AI Gateway]
    end
```

---

## 3. Discovered Architectural Disconnects & Flaws

1. **Live Preview Decoupling from Modular Blocks & Commerce**:
   - `LivePreview` only subscribes to `profile`, `links`, `socialLinks`, `projects`, and `appearance` from `AppContext`.
   - Dynamic modular blocks (`blocks`), digital store products (`products`), consultation services (`services`), and bookings (`bookings`) are saved directly to `LinkedTreeStore` in their respective dashboard tabs without updating `AppContext`.
   - As a result, changes made in `/dashboard/blocks` or `/dashboard/store` do not trigger re-rendering of `LivePreview`.

2. **Dual-Mode Persistence Inconsistency**:
   - Some API routes (e.g. `/api/subscribers`, `/api/bookings`) write directly to Supabase and return HTTP 400 if the Supabase container is unreachable, failing to fallback to local storage or sync queues.
   - Conversely, components like `block-renderer.tsx` write subscriber leads exclusively to `LinkedTreeStore` without dispatching to `/api/subscribers`.

3. **Authentication Navigation Lifecycle**:
   - In `AuthModal.tsx`, `onClose()` triggers parent re-rendering and unmounts the modal component before `router.push('/dashboard')` completes the navigation transition, stranding users on the landing page after registration.

4. **API Route Parameter Mismatches**:
   - `/api/discovery/search` only exported `POST`, rejecting standard browser `GET` requests with query parameters (`405 Method Not Allowed`).
   - `/api/analytics/track` strictly required `profileId`, failing when the client provided a public creator `handle`.

---

## 4. Architectural Recommendations

1. **Expand `AppContext` into a Unified Store**:
   - Add `blocks`, `products`, `services`, `orders`, `subscribers`, and `bookings` into `AppContext` so that updates in any dashboard editor instantly propagate to `LivePreview`.
2. **Standardize API Payloads**:
   - Update API schemas to accept flexible identifiers (`profileId` or `handle`).
   - Support both `GET` and `POST` for search and discovery endpoints.
3. **Resilient Dual-Sync**:
   - Ensure all write actions update `LinkedTreeStore` synchronously for instantaneous UI feedback and trigger background synchronization to Supabase with graceful fallback.

