# Webloom Data Flow & State Synchronization Audit

**Report ID**: `06-data-flow-audit.md`  
**Generated Date**: November 10, 2026  
**Auditor**: Senior Full-Stack Engineer & Database Architect

---

## 1. Data Store Analysis (`LinkedTreeStore` & `AppContext`)

Webloom operates a dual-mode persistence architecture:

1. **Client Store (`LinkedTreeStore`)**:
   - Manages LocalStorage keys with prefix `linked_tree_v2_`:
     - `current_user`, `users`, `profiles`, `links`, `blocks`, `products`, `orders`, `subscribers`, `services`, `bookings`, `appearance`, `analytics_events`, `activity_logs`.
   - Provides immediate synchronous reads and writes so the editor interface is responsive without waiting for network latency.
   - Synchronizes background writes to Supabase when reachable.

2. **React Context (`AppContext`)**:
   - Manages live in-memory React state for:
     - `user`, `profile`, `links`, `socialLinks`, `projects`, `appearance`, `analytics`, `activityLogs`, `themeMode`, `timeRange`.
   - **Gaps Identified**:
     - `blocks`, `products`, `services`, `bookings`, and `subscribers` were NOT included in `AppContext` state!
     - When components modify blocks or products, they only update `LinkedTreeStore`, leaving `AppContext` and `LivePreview` unaware of changes until a browser refresh.

---

## 2. API Data Flow & Contract Verification

```mermaid
flowchart LR
    subgraph Client State
        A[Editor Pages] -->|Direct Write| B[LinkedTreeStore]
        A -.->|Missing Hook| C[AppContext Live State]
        C -->|Props| D[LivePreview Simulator]
    end

    subgraph Server & Database
        B -->|Background Sync| E[Supabase PostgreSQL]
        F[Public Visitor] -->|Checkout POST| G[/api/store/checkout]
        F -->|Booking POST| H[/api/bookings]
        F -->|Subscriber POST| I[/api/subscribers]
        F -->|Analytics POST| J[/api/analytics/track]
    end
```

### Identified Payload Contract Mismatches:

1. **/api/store/checkout**:
   - Expected: `{ profileId, productId, customerEmail, customerName, paymentProvider }`
   - Problem: If `profileId` is omitted, the endpoint throws a 400 validation error instead of looking up `profile_id` from the `products` record.
   - Solution: Make `profileId` optional in the schema; if omitted, automatically derive it from the `productId`.

2. **/api/bookings**:
   - Expected: `{ profileId, serviceId, clientName, clientEmail, scheduledAt, durationMinutes }`
   - Problem: Rejects dates that are not ISO strings or if `durationMinutes` is passed as a string.
   - Solution: Add Zod pre-processing to parse date strings and coerce numerical strings for `durationMinutes`.

3. **/api/analytics/track**:
   - Expected: `{ profileId, eventType, ... }`
   - Problem: Public profile tracking script often sends `{ handle, eventType, ... }` before `profileId` UUID is resolved.
   - Solution: Accept either `profileId` or `handle`; resolve `handle` to `profileId` dynamically.

4. **/api/discovery/search**:
   - Problem: Only accepts `POST` requests; browser URL search bars and GET query requests receive `405 Method Not Allowed`.
   - Solution: Add `GET` request handler parsing query parameters `?q=...&target=...`.

