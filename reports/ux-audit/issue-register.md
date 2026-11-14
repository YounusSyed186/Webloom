# Webloom (Linked) — UX & Usability Issue Register

**Version:** 2.0 (Post-Remediation Verification)  
**Status:** All Critical & High Priority Issues Remediated and Verified  

---

## Issue Severity Index

- **P0 (Critical):** Blocks user progression, breaks authentication, or loses user data.
- **P1 (High):** Significant usability degradation, misleading UI patterns, or security/trust anti-patterns.
- **P2 (Medium):** Sub-optimal UX, layout inconsistencies, or missing responsive adaptations.
- **P3 (Low):** Minor cosmetic polish, typography alignment, or subtle micro-interactions.

---

## Detailed Issue Tracking

| ID | Category | Severity | Description | Status | Remediation Details |
|---|---|---|---|---|---|
| **ISS-01** | Authentication / Trust | **P1** | Testing credentials debug box in `AuthModal` showed plaintext passwords (`demo123456`) to real users. | **FIXED** | Replaced with sleek commercial "Demo Workspace &rarr;" quick launcher with discrete amber badge. Removed all plaintext passwords. |
| **ISS-02** | Auth / Validation | **P0** | Silent account creation when submitting unrecognized email on Sign In form without password validation. | **FIXED** | Disentangled `login` and `signup`. Invalid credentials now return clean error toasts ("No account found with this email" or "Incorrect password"). |
| **ISS-03** | UI / Form Polish | **P2** | Hardcoded developer username `younus` as form placeholder in display name & username inputs. | **FIXED** | Replaced with neutral creator placeholders `Maya Chen` and `@mayachen`. |
| **ISS-04** | Navigation / Header | **P2** | Dashboard Topbar page title stayed stuck on "Dashboard Overview" when navigating to `/blocks`, `/store`, `/bookings`, `/audience`, or `/ai`. | **FIXED** | Updated `topbar.tsx` with comprehensive route map providing accurate dynamic titles and descriptions for all dashboard sections. |
| **ISS-05** | Appearance / Layouts | **P1** | Public profile only supported a single vertical stack, unable to showcase rich blocks, stores, or bookings optimally. | **FIXED** | Engineered 5 responsive layout architectures: `bento`, `storefront`, `editorial`, `booking`, and `standard`. Added layout picker in Appearance Studio. |
| **ISS-06** | Preview / Usability | **P1** | Live preview container had fixed 375px mobile viewport with no ability to test tablet or desktop appearances. | **FIXED** | Implemented 3-mode device switcher (Mobile 350px, Tablet 480px, Desktop 660px+ with macOS browser window frame) in `live-preview.tsx`. |
| **ISS-07** | E-Commerce / Bookings | **P2** | Store and booking management forms lacked live state synchronization into the public profile preview. | **FIXED** | Linked all product additions and calendar booking availability directly to `LinkedTreeStore` with instant reactive preview updates. |
| **ISS-08** | Accessibility | **P2** | Insufficient keyboard focus rings on custom theme radio cards in Appearance settings. | **FIXED** | Added standard `focus-visible:ring-2 focus-visible:ring-amber-500` to all theme and layout selector cards. |
| **ISS-09** | Responsive Design | **P2** | Split-screen Editorial layout on desktop broke on narrow tablet viewports without media query breakpoints. | **FIXED** | Added responsive Tailwind flex-col-to-grid (`flex flex-col md:grid md:grid-cols-12`) ensuring seamless mobile-to-desktop transitions. |

