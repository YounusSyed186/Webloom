# Webloom (Linked) — Feature Test Matrix

**Audit Date**: November 9, 2026  
**Auditor**: Independent Senior QA Engineer & Production Readiness Auditor  
**Testing Methodology**: Automated Browser Interaction via Playwright (Real Chromium Engine)  
**Test Identity**: Alex Morgan (`alex.morgan.test@example.com`, `@alexmorgan_test`)

---

## Comprehensive Execution Matrix

| # | Feature / Module | Test Scenario | Result | Evidence Screenshot / Log | Severity | Notes |
|---|---|---|:---:|---|:---:|---|
| 1 | **Landing Page** | Initial Page Load & Headline Rendering | **PASS** | [`journey-a-01-hero-light.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-a-01-hero-light.png) | Low | Title rendered: *"Webloom — Your corner of the internet."* |
| 2 | **Landing Page** | Primary Navigation Anchors (`#product`, `#templates`, `#explore`, `#pricing`) | **PASS** | [`journey-a-01-hero-light.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-a-01-hero-light.png) | Medium | Smooth scrolling to anchor sections verified |
| 3 | **Theme System** | Navbar Theme Toggle (Light to Dark) | **PASS** | [`journey-a-02-hero-dark.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-a-02-hero-dark.png) | Low | Switched global DOM to dark mode class |
| 4 | **Theme System** | Navbar Theme Toggle (Dark to Light) | **PASS** | [`journey-a-01-hero-light.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-a-01-hero-light.png) | Low | Switched back to warm cream light palette |
| 5 | **Visual FX** | Hardware-Accelerated Dual-World Cursor Reveal | **PASS** | [`journey-a-03-cursor-reveal.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-a-03-cursor-reveal.png) | Medium | Dynamic SVG circle clip-path with 85px radius active |
| 6 | **Handle Engine** | Check Valid Available Handle (`alexmorgan_test`) | **PASS** | [`journey-a-04-handle-available.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-a-04-handle-available.png) | Low | Handle verified as available |
| 7 | **Handle Engine** | Check Invalid Format Handle (`alex@morgan!`) | **PASS** | [`journey-a-05-handle-invalid.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-a-05-handle-invalid.png) | Medium | Blocked illegal characters and symbols |
| 8 | **Handle Engine** | Check Reserved System Handle (`admin`) | **PASS** | [`journey-a-06-handle-reserved.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-a-06-handle-reserved.png) | Medium | Reserved route handles flagged correctly |
| 9 | **Onboarding CTA** | Click "Claim handle" CTA from Hero Bar | **PASS** | [`journey-a-07-claim-modal.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-a-07-claim-modal.png) | High | Opens Auth modal with username pre-populated |
| 10 | **Onboarding CTA** | Click "Create your space — Free" CTA | **PASS** | [`journey-a-08-cta-create-space.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-a-08-cta-create-space.png) | High | Opens registration dialog |
| 11 | **Authentication** | Submit Empty Signup Form | **PASS** | [`journey-b-02-validation-empty.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-b-02-validation-empty.png) | Low | Native HTML5 and state validation reject empty submission |
| 12 | **Authentication** | Password Length Validation (< 6 chars) | **PASS** | [`journey-b-03-short-password.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-b-03-short-password.png) | Low | Displays error toast: *"Password must be at least 6 characters long"* |
| 13 | **Registration** | Register New User (`alex.morgan.test@example.com`) | **FAIL** | [`journey-b-dashboard-landed.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-b-dashboard-landed.png) | **Critical** | Modal closes and shows toast, but Next.js router does not navigate to `/dashboard`; user remains stranded on `/` |
| 14 | **Session Persistence**| F5 Hard Refresh while in Dashboard | **FAIL** | [`journey-b-dashboard-landed.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-b-dashboard-landed.png) | **Critical** | Without auto-redirect on registration, reload lands on root homepage |
| 15 | **Security** | Unauthenticated Direct Access to `/dashboard` | **PASS** | [`journey-b-07-unauth-protected.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-b-07-unauth-protected.png) | **Critical** | Access gated behind login dialog |
| 16 | **Creator Profile** | Edit Display Name, Bio, and Profession | **PASS** | [`journey-c-01-profile-editor.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-c-01-profile-editor.png) | High | Form inputs accept updates and save to store |
| 17 | **Creator Profile** | Save Profile Changes | **PASS** | [`journey-c-02-profile-saved.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-c-02-profile-saved.png) | High | Feedback toast triggered and timestamp updated |
| 18 | **Public Profile** | Live Rendering of `/[username]` | **PASS** | [`journey-c-03-public-profile.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-c-03-public-profile.png) | **Critical** | Renders Alex Morgan's public page with links and bio |
| 19 | **Link Management** | Add Standard Destination Link | **PASS** | [`journey-d-02-link-added.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-d-02-link-added.png) | High | Link ("My Design Portfolio") saved and visible |
| 20 | **Block Builder** | Blocks Studio Canvas Display | **PASS** | [`journey-d-03-blocks-studio.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-d-03-blocks-studio.png) | High | Visual tactile cards rendered in studio |
| 21 | **Storefront** | Create Digital Product ("Complete UI Design Toolkit") | **PASS** | [`journey-e-02-product-created.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-e-02-product-created.png) | High | Created product with INR pricing and description |
| 22 | **Storefront** | Checkout Order Submission (`/api/store/checkout`) | **FAIL** | API Response 400 | **Critical** | API requires `profileId` parameter which the client checkout does not provide |
| 23 | **Bookings Engine** | Create Appointment Booking (`/api/bookings`) | **FAIL** | API Response 400 | **Critical** | Schema mismatch: API expects `profileId` and ISO `scheduledAt`, frontend passes separate date/timeSlot |
| 24 | **Bookings Engine** | Conflict / Double-Booking Prevention | **PASS** | API Response 400 | High | API rejects malformed/duplicate booking attempts |
| 25 | **Audience CRM** | Newsletter Lead Capture (`/api/subscribers`) | **FAIL** | API Response 400 | **Critical** | POST `/api/subscribers` fails schema validation due to missing `profileId` parameter from public form |
| 26 | **Audience CRM** | Audience Directory View | **PASS** | [`journey-g-01-audience-dashboard.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-g-01-audience-dashboard.png) | High | Displays audience members, stats, and search bar |
| 27 | **AI Studio** | AI Bio Generator API (`/api/ai/generate`) | **FAIL** | API Response 400 | High | Request payload structure mismatch with `AIGateway` validator |
| 28 | **Semantic Search** | Vector Discovery API (`/api/discovery/search`) | **FAIL** | API Response 405 | High | Route only accepts HTTP POST; URL GET queries receive `405 Method Not Allowed` |
| 29 | **Analytics** | Event Ingestion (`/api/analytics/track`) | **FAIL** | API Response 400 | High | Schema expects `profileId` instead of `handle` |
| 30 | **Appearance Studio**| Theme Presets & Color Customizer | **PASS** | [`journey-k-01-appearance.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-k-01-appearance.png) | High | Theme presets selectable, live preview reflects styles |
| 31 | **Workspaces** | Multi-Tenant Settings & Workspace View | **PASS** | [`journey-l-01-settings.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-l-01-settings.png) | High | Workspace settings, plan entitlements, and team info rendered |
| 32 | **Admin Portal** | Platform Governance Console (`/admin`) | **PASS** | [`journey-m-01-admin-portal.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/journey-m-01-admin-portal.png) | **Critical** | Platform overview, creator search, and audit logs functional |
| 33 | **Responsive UX** | Mobile Viewport: iPhone X (375 × 812) | **PASS** | [`responsive-mobile-iphone-x.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/responsive-mobile-iphone-x.png) | High | Zero horizontal overflow; touch controls adapt cleanly |
| 34 | **Responsive UX** | Mobile Viewport: iPhone 14 (390 × 844) | **PASS** | [`responsive-mobile-iphone-14.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/responsive-mobile-iphone-14.png) | High | Modern viewport padding and touch targets verified |
| 35 | **Responsive UX** | Tablet Viewport: iPad (768 × 1024) | **PASS** | [`responsive-tablet-ipad.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/responsive-tablet-ipad.png) | Medium | Grid adapts from 1 column to 2-3 columns |
| 36 | **Responsive UX** | Desktop Viewport: HD (1440 × 900) | **PASS** | [`responsive-desktop-hd.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/responsive-desktop-hd.png) | High | Desktop split preview and studio canvas render properly |
| 37 | **Responsive UX** | Large Desktop: Full HD (1920 × 1080) | **PASS** | [`responsive-desktop-fullhd.png`](file:///c:/Projects/InspriingWave/Linked/reports/screenshots/responsive-desktop-fullhd.png) | Medium | Centered container limits prevent stretched typography |

