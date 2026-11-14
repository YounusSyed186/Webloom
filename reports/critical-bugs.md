# Critical Bugs & Vulnerabilities Report

**Project**: Webloom (Linked) — Creator Platform  
**Audit Date**: November 9, 2026  
**Auditor**: Senior QA Engineer & Production Readiness Auditor  
**Classification System**:
- **P0**: Critical security vulnerability, tenant isolation breach, or severe data loss.
- **P1**: Core business workflow broken; immediate launch blocker.
- **P2**: Major feature degraded or broken API contract; workaround required.
- **P3**: Cosmetic, minor UI discrepancy, or non-blocking edge case.

---

## Ranked Issue Registry

### [BUG-01] P1 — Registration Does Not Redirect User to Dashboard (User Stranded on Landing Page)
- **Feature**: User Onboarding & Registration
- **Route**: `/` (AuthModal) -> `/dashboard`
- **Severity**: **P1 (Launch Blocker)**
- **Reproduction Steps**:
  1. Open homepage at `http://localhost:3030`.
  2. Click "Get Started" in the header.
  3. Click "Create one for free".
  4. Fill in Display Name ("Alex Morgan"), Username ("alexmorgan_test"), Email ("alex.morgan.test@example.com"), and Password ("Password123!").
  5. Click "Create Account".
- **Expected Behavior**: The user account is created, the auth modal closes, and the browser navigates immediately to `/dashboard`.
- **Actual Behavior**: The modal closes and displays a success toast (*"Account created successfully!"*), but the browser remains at `http://localhost:3030/`. The user is left confused on the public landing page.
- **Evidence**: [`journey-b-dashboard-landed.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-b-dashboard-landed.png)
- **Likely Root Cause**: In `src/components/auth/auth-modal.tsx`, `onClose()` is called immediately followed by `router.push('/dashboard')`. Because closing the modal unmounts the modal component or triggers re-rendering of the parent client component before Next.js App Router completes the transition, the navigation is aborted.

---

### [BUG-02] P1 — Storefront Checkout API Rejects Order Submission (Missing `profileId`)
- **Feature**: Digital Commerce & Storefront
- **Route**: `POST /api/store/checkout`
- **Severity**: **P1 (Launch Blocker)**
- **Reproduction Steps**:
  1. Navigate to a creator's public profile or submit an order via the checkout modal.
  2. Provide valid customer name, customer email, and product ID.
  3. Submit order.
- **Expected Behavior**: Order is created, payment intent/mock receipt is generated, and customer receives a download token.
- **Actual Behavior**: API returns `HTTP 400 Bad Request`:
  ```json
  {
    "error": "Invalid checkout payload",
    "details": {
      "formErrors": [],
      "fieldErrors": { "profileId": ["Required"] }
    }
  }
  ```
- **Evidence**: `POST /api/store/checkout` returned 400.
- **Likely Root Cause**: `src/app/api/store/checkout/route.ts` validates with Zod requiring `profileId`, but public checkout components only submit `{ productId, customerEmail, customerName }`, expecting the backend to infer the creator from the product record.

---

### [BUG-03] P1 — Appointment Booking API Fails Schema Validation
- **Feature**: Bookings & Consultation Engine
- **Route**: `POST /api/bookings`
- **Severity**: **P1 (Launch Blocker)**
- **Reproduction Steps**:
  1. Open a creator's profile containing a booking block.
  2. Select date and time slot, fill client information, and submit.
- **Expected Behavior**: Booking appointment is confirmed and appears in creator's `/dashboard/bookings`.
- **Actual Behavior**: API returns `HTTP 400 Bad Request`:
  ```json
  {
    "success": false,
    "error": [
      { "path": ["profileId"], "message": "Invalid input: expected string, received undefined" },
      { "path": ["scheduledAt"], "message": "Invalid input: expected string, received undefined" }
    ]
  }
  ```
- **Evidence**: Network log in [`reports/network-errors.md`](file:///c:/Projects/InspriingWave/Linked/reports/network-errors.md).
- **Likely Root Cause**: Schema disconnect between frontend booking component (sending `{ serviceId, date, timeSlot }`) and backend route handler (expecting `{ profileId, scheduledAt }`).

---

### [BUG-04] P1 — Public Newsletter Lead Capture Rejects Submissions
- **Feature**: Audience CRM & Email Capture
- **Route**: `POST /api/subscribers`
- **Severity**: **P1 (Launch Blocker)**
- **Reproduction Steps**:
  1. Open a creator's public profile with a newsletter block.
  2. Enter an email address and click "Subscribe".
- **Expected Behavior**: Email is saved as a subscriber for that creator, with confirmation feedback.
- **Actual Behavior**: Endpoint returns `HTTP 400 Bad Request`.
- **Evidence**: `POST /api/subscribers` failed with 400 in test suite.
- **Likely Root Cause**: Missing `profileId` parameter in the payload sent by the public block component.

---

### [BUG-05] P2 — Semantic Discovery Endpoint Returns 405 on Standard URL Search Queries
- **Feature**: Search & Discovery
- **Route**: `/api/discovery/search`
- **Severity**: **P2 (Major Feature Defect)**
- **Reproduction Steps**:
  1. Send a GET request to `/api/discovery/search?q=minimalist+designer`.
- **Expected Behavior**: Returns matching creators and products matching the query.
- **Actual Behavior**: Returns `HTTP 405 Method Not Allowed`.
- **Evidence**: Network error log.
- **Likely Root Cause**: `src/app/api/discovery/search/route.ts` only exports a `POST` handler, refusing standard search query strings via `GET`.

---

### [BUG-06] P2 — AI Studio Endpoint Fails on Unwrapped Prompt Payloads
- **Feature**: AI Studio Assistant
- **Route**: `POST /api/ai/generate`
- **Severity**: **P2 (Major Feature Defect)**
- **Reproduction Steps**:
  1. Invoke the AI bio generator with `{ type: 'bio', prompt: '...', style: 'Editorial' }`.
- **Expected Behavior**: Returns AI-generated bio suggestions.
- **Actual Behavior**: Returns `HTTP 400 Bad Request`.
- **Evidence**: Latency 1433ms, Status 400.
- **Likely Root Cause**: Payload structure expected by `ai-prompts.ts` expects nested `{ type: 'bio', payload: { ... } }`, causing direct form submissions to be rejected.

---

### [BUG-07] P2 — Analytics Event Ingestion Schema Mismatch
- **Feature**: Analytics Ingestion Engine
- **Route**: `POST /api/analytics/track`
- **Severity**: **P2 (Analytics Discrepancy)**
- **Reproduction Steps**:
  1. Visit public profile; event tracker sends `{ eventType: 'page_view', handle: 'alexmorgan_test' }`.
- **Expected Behavior**: Event logged into analytics database table.
- **Actual Behavior**: API returns `HTTP 400 Bad Request`.
- **Evidence**: Network error log.
- **Likely Root Cause**: API route expects `profile_id` (UUID), while the frontend client script only has access to the public handle string at runtime.

---

### [BUG-08] P3 — Port Collision During Startup
- **Feature**: Local Dev Server Infrastructure
- **Route**: System / Configuration
- **Severity**: **P3 (Developer Experience / Operational)**
- **Reproduction Steps**:
  1. Start `pnpm dev` when port 3000 is occupied by another local service.
- **Expected Behavior**: Server automatically selects or prompts for an alternate port (e.g. 3030) and updates internal base URLs.
- **Actual Behavior**: Server stalls or collides unless explicitly started with `--port 3030`.
- **Evidence**: Initial QA discovery phase where PID 1400 intercepted requests.

