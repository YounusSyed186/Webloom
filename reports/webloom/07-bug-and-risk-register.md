# Webloom Bug, Defect & Risk Register

**Report ID**: `07-bug-and-risk-register.md`  
**Generated Date**: November 10, 2026  
**Auditor**: Senior QA Automation Engineer & Security Auditor

---

## 1. Defect Priority Register

| Defect ID | Priority | Category | Component / Route | Description | Root Cause | Remediation Plan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-01** | **P1** | User Journey | `AuthModal.tsx` | New user registration does not redirect to `/dashboard`. | `onClose()` unmounts modal before `router.push('/dashboard')` completes navigation. | Await navigation or use `window.location.href = '/dashboard'`. |
| **BUG-02** | **P1** | Commerce | `/api/store/checkout` | Checkout fails with 400 when `profileId` is omitted. | Zod schema strictly requires `profileId` instead of inferring it from `productId`. | Make `profileId` optional; lookup product owner automatically. |
| **BUG-03** | **P1** | Bookings | `/api/bookings` | Booking appointment rejects submission with 400. | Timestamp format strictness and duration coercion. | Coerce numerical duration and accept standard date strings. |
| **BUG-04** | **P1** | Audience | `/api/subscribers` | Public newsletter lead capture rejects submissions. | Fails if Supabase database is unreachable; no local fallback. | Persist to local store with graceful sync fallback. |
| **BUG-05** | **P1** | Live Preview | `live-preview.tsx` | Modular blocks and products do not update in Live Preview. | `blocks` and `products` are absent from `AppContext` state. | Add `blocks`, `products`, and sync actions into `AppContext`. |
| **BUG-06** | **P2** | Search | `/api/discovery/search` | Returns 405 Method Not Allowed on URL search queries. | Route only exports `POST` handler; rejects `GET`. | Export `GET` handler parsing search query parameters. |
| **BUG-07** | **P2** | Analytics | `/api/analytics/track` | Rejects telemetry requests when passing creator handle. | Route requires UUID `profileId`; rejects string handle. | Allow either `profileId` or `handle` in schema. |
| **BUG-08** | **P2** | AI Studio | `/api/ai/generate` | Fails on direct form submissions. | Route expects nested payload `{ type, payload: { ... } }`. | Harmonize schema to accept direct prompt inputs. |
| **BUG-09** | **P3** | Visual | `live-preview.tsx` | Mobile device simulator notch styling has low contrast in dark mode. | Static border colors on notch. | Use semantic theme-aware token styling. |

---

## 2. Security & Operational Risks

1. **Payment Amount Integrity**:
   - Status: **Mitigated**. Razorpay order amounts are computed strictly server-side in `calculatePlanAmount()` in minor units (cents/paise) based on authoritative catalog prices. Client amounts are never trusted.
2. **Payment Signature Verification**:
   - Status: **Mitigated**. Server-side HMAC-SHA256 signature verification is strictly enforced in `verifyRazorpaySignature()` before subscriptions are activated.
3. **Tenant & Data Isolation**:
   - Risk: Local storage shared across tabs if multiple users sign in on the same browser machine.
   - Mitigation: Ensure `logout()` clears `currentUser` and re-seeds cleanly.

