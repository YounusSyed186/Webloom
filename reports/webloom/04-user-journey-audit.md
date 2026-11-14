# Webloom User Journey Audit & Friction Report

**Report ID**: `04-user-journey-audit.md`  
**Generated Date**: November 10, 2026  
**Auditor**: Senior UX/UI Designer & User Journey Architect

---

## 1. Journey Stage Evaluation

| Stage | User Intention | Current User Experience | Friction / Break Point | Severity |
| :--- | :--- | :--- | :--- | :--- |
| **1. First Visit & Landing** | Understand value proposition & claim handle | Tactile stationery page, interactive handle input, 3D studio diorama. | Very high initial engagement; cursor reveal delight. | None |
| **2. Registration** | Create an account and enter the creator dashboard | User enters email, password, username, clicks "Create Account". | Success toast appears, modal closes, but user remains on landing page. Navigation does not occur. | **P1 (Critical)** |
| **3. First Meaningful Action** | Add primary social link or project | User navigates to `/dashboard/links` and adds a link. | Smooth interaction; link appears immediately in Live Preview. | None |
| **4. Modular Block Creation** | Add a newsletter lead magnet or countdown timer | User opens `/dashboard/blocks`, configures countdown or newsletter. | Block is saved in the editor table, but Live Preview simulator does NOT update until manual page refresh. | **P1 (High)** |
| **5. Store Product Creation** | Add a digital preset or e-book for sale | User opens `/dashboard/store`, creates product with ₹499 price. | Product is created in store ledger, but doesn't immediately reflect in Live Preview. | **P2 (Medium)** |
| **6. Visitor Checkout** | Public visitor clicks "Buy Product" on creator page | Checkout dialog opens; user enters name and email, clicks pay. | API endpoint throws 400 Bad Request due to missing `profileId` parameter. Order fails. | **P1 (Critical)** |
| **7. Visitor Consultation Booking** | Public visitor books a calendar slot | Calendar slot chosen; user enters contact details and submits. | API rejects timestamp with 400 Bad Request due to format mismatch. Booking fails. | **P1 (Critical)** |
| **8. Visitor Newsletter Subscription** | Visitor submits email on public profile | Visitor types email in newsletter block and clicks "Subscribe". | Block updates locally in visitor's browser localStorage; no server-side sync occurs. | **P1 (High)** |
| **9. Upgrading Subscription** | Creator upgrades to Creator Pro or Studio | Creator clicks "Upgrade to Pro" in Settings or on Landing Page. | Smooth Razorpay order creation, payment dialog, and cryptographic verification working. | None |
| **10. Analytics Review** | Creator checks visitor clicks and sources | Creator visits `/dashboard/analytics`. | Dynamic charts display data smoothly across 7d/30d/90d/1y ranges. | None |

---

## 2. Root Cause Analysis of User Frustration

1. **The "Stranded User" Paradox (Registration)**:
   - When a first-time user commits to signing up, they expect an immediate transition into their personal creator space. Getting dumped back onto the marketing landing page after seeing "Account created successfully" shatters trust and creates confusion.

2. **The "Ghost Editor" Problem (Live Preview Disconnect)**:
   - The standout feature of Webloom's dashboard is the real-time mobile simulator on the right. When adding a Link works in the simulator, but adding a modular Block or Product does nothing, the user assumes the feature is broken.

3. **Public Visitor Transaction Failure**:
   - Creators use Webloom to monetize. If their audience cannot complete a ₹499 digital checkout or book a consultation call because of a Zod payload schema error, the platform fails its primary business objective.

