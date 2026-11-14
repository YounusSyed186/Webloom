# Network & Console Errors Log

This document records all HTTP failures (status >= 400) and unhandled browser console errors encountered during the real-world browser QA evaluation.

---

### Test Suite: Journey A — Landing Page and Discovery (2026-11-09T08:45:55.794Z)

#### Console Errors
- **[2026-11-09T08:45:50.532Z]** on `http://localhost:3000/`: `Failed to load resource: the server responded with a status of 404 (Not Found)`


### Test Suite: Journey A — Landing Page and Discovery (2026-11-09T08:49:16.045Z)

*No network or console errors recorded.*


### Test Suite: Journey A — Landing Page and Discovery (2026-11-09T08:49:56.306Z)

*No network or console errors recorded.*


### Test Suite: Journey B — Registration and Authentication (2026-11-09T08:51:06.655Z)

*No network or console errors recorded.*


### Test Suite: Journey B — Registration and Authentication (2026-11-09T08:52:11.422Z)

*No network or console errors recorded.*


### Test Suite: Journey B — Registration and Authentication (2026-11-09T08:53:08.360Z)

*No network or console errors recorded.*


### Test Suite: Journey B — Registration and Authentication (2026-11-09T08:54:32.762Z)

*No network or console errors recorded.*


### Test Suite: Journey B — Registration and Authentication (2026-11-09T08:58:02.502Z)

*No network or console errors recorded.*


### Test Suite: Full End-to-End User QA Audit (2026-11-09T09:00:26.270Z)

#### Network Responses (>= 400)
| Status | Method | URL | Time |
|---|---|---|---|
| 400 | POST | `http://127.0.0.1:54521/rest/v1/profiles` | 2026-11-09T08:59:19.810Z |
| 400 | POST | `http://127.0.0.1:54521/rest/v1/profiles` | 2026-11-09T08:59:19.812Z |
| 400 | POST | `http://127.0.0.1:54521/rest/v1/appearance_settings` | 2026-11-09T09:00:13.627Z |
| 400 | POST | `http://127.0.0.1:54521/rest/v1/appearance_settings` | 2026-11-09T09:00:13.627Z |
| 400 | POST | `http://127.0.0.1:54521/rest/v1/analytics_events` | 2026-11-09T09:00:23.057Z |
| 400 | POST | `http://127.0.0.1:54521/rest/v1/analytics_events` | 2026-11-09T09:00:23.942Z |
| 400 | POST | `http://127.0.0.1:54521/rest/v1/analytics_events` | 2026-11-09T09:00:24.648Z |
| 400 | POST | `http://127.0.0.1:54521/rest/v1/analytics_events` | 2026-11-09T09:00:25.348Z |
| 400 | POST | `http://127.0.0.1:54521/rest/v1/analytics_events` | 2026-11-09T09:00:26.210Z |

#### Console Errors
- **[2026-11-09T08:59:19.169Z]** on `http://localhost:3030/dashboard/profile`: `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <RedirectErrorBoundary router={{...}}>
      <InnerLayoutRouter url="/dashboard..." tree={[...]} cacheNode={{lazyData:null, ...}} segmentPath={[...]}>
        <SegmentViewNode type="layout" pagePath="dashboard/...">
          <SegmentTrieNode>
          <ClientSegmentRoot Component={function DashboardLayout} slots={{...}} params={{}}>
            <DashboardLayout params={Promise}>
              <div className="flex h-scr...">
                <Sidebar>
                  <aside className="hidden md:...">
                    <div>
                    <div className="flex-1 py-...">
                      <p>
                      <LinkComponent>
                      <LinkComponent href="/dashboard..." className="flex items...">
                        <a className="flex items..." ref={function} onClick={function onClick} ...>
                          <div>
+                         <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#EAE2D3] text-[#6E6254]">
                      ...
                      ...
                    ...
                ...
      ...
`
- **[2026-11-09T08:59:19.810Z]** on `http://localhost:3030/dashboard/profile`: `Failed to load resource: the server responded with a status of 400 (Bad Request)`
- **[2026-11-09T08:59:19.812Z]** on `http://localhost:3030/dashboard/profile`: `Failed to load resource: the server responded with a status of 400 (Bad Request)`
- **[2026-11-09T08:59:27.789Z]** on `http://localhost:3030/dashboard/links`: `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <RedirectErrorBoundary router={{...}}>
      <InnerLayoutRouter url="/dashboard..." tree={[...]} cacheNode={{lazyData:null, ...}} segmentPath={[...]}>
        <SegmentViewNode type="layout" pagePath="dashboard/...">
          <SegmentTrieNode>
          <ClientSegmentRoot Component={function DashboardLayout} slots={{...}} params={{}}>
            <DashboardLayout params={Promise}>
              <div className="flex h-scr...">
                <Sidebar>
                  <aside className="hidden md:...">
                    <div>
                    <div className="flex-1 py-...">
                      <p>
                      <LinkComponent>
                      <LinkComponent href="/dashboard..." className="flex items...">
                        <a className="flex items..." ref={function} onClick={function onClick} ...>
                          <div>
+                         <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#E2D6C3] text-[#6E4F1F]">
                      ...
                      ...
                    ...
                ...
      ...
`
- **[2026-11-09T08:59:32.419Z]** on `http://localhost:3030/dashboard/blocks`: `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <RedirectErrorBoundary router={{...}}>
      <InnerLayoutRouter url="/dashboard..." tree={[...]} cacheNode={{lazyData:null, ...}} segmentPath={[...]}>
        <SegmentViewNode type="layout" pagePath="dashboard/...">
          <SegmentTrieNode>
          <ClientSegmentRoot Component={function DashboardLayout} slots={{...}} params={{}}>
            <DashboardLayout params={Promise}>
              <div className="flex h-scr...">
                <Sidebar>
                  <aside className="hidden md:...">
                    <div>
                    <div className="flex-1 py-...">
                      <p>
                      <LinkComponent>
                      <LinkComponent href="/dashboard..." className="flex items...">
                        <a className="flex items..." ref={function} onClick={function onClick} ...>
                          <div>
+                         <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#EAE2D3] text-[#6E6254]">
                      ...
                      ...
                    ...
                ...
      ...
`
- **[2026-11-09T08:59:35.512Z]** on `http://localhost:3030/dashboard/store`: `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <RedirectErrorBoundary router={{...}}>
      <InnerLayoutRouter url="/dashboard..." tree={[...]} cacheNode={{lazyData:null, ...}} segmentPath={[...]}>
        <SegmentViewNode type="layout" pagePath="dashboard/...">
          <SegmentTrieNode>
          <ClientSegmentRoot Component={function DashboardLayout} slots={{...}} params={{}}>
            <DashboardLayout params={Promise}>
              <div className="flex h-scr...">
                <Sidebar>
                  <aside className="hidden md:...">
                    <div>
                    <div className="flex-1 py-...">
                      <p>
                      <LinkComponent>
                      <LinkComponent href="/dashboard..." className="flex items...">
                        <a className="flex items..." ref={function} onClick={function onClick} ...>
                          <div>
+                         <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#EAE2D3] text-[#6E6254]">
                      ...
                      ...
                    ...
                ...
      ...
`
- **[2026-11-09T08:59:42.116Z]** on `http://localhost:3030/dashboard/bookings`: `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <RedirectErrorBoundary router={{...}}>
      <InnerLayoutRouter url="/dashboard..." tree={[...]} cacheNode={{lazyData:null, ...}} segmentPath={[...]}>
        <SegmentViewNode type="layout" pagePath="dashboard/...">
          <SegmentTrieNode>
          <ClientSegmentRoot Component={function DashboardLayout} slots={{...}} params={{}}>
            <DashboardLayout params={Promise}>
              <div className="flex h-scr...">
                <Sidebar>
                  <aside className="hidden md:...">
                    <div>
                    <div className="flex-1 py-...">
                      <p>
                      <LinkComponent>
                      <LinkComponent href="/dashboard..." className="flex items...">
                        <a className="flex items..." ref={function} onClick={function onClick} ...>
                          <div>
+                         <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#EAE2D3] text-[#6E6254]">
                      ...
                      ...
                    ...
                ...
      ...
`
- **[2026-11-09T08:59:48.150Z]** on `http://localhost:3030/dashboard/audience`: `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <RedirectErrorBoundary router={{...}}>
      <InnerLayoutRouter url="/dashboard..." tree={[...]} cacheNode={{lazyData:null, ...}} segmentPath={[...]}>
        <SegmentViewNode type="layout" pagePath="dashboard/...">
          <SegmentTrieNode>
          <ClientSegmentRoot Component={function DashboardLayout} slots={{...}} params={{}}>
            <DashboardLayout params={Promise}>
              <div className="flex h-scr...">
                <Sidebar>
                  <aside className="hidden md:...">
                    <div>
                    <div className="flex-1 py-...">
                      <p>
                      <LinkComponent>
                      <LinkComponent href="/dashboard..." className="flex items...">
                        <a className="flex items..." ref={function} onClick={function onClick} ...>
                          <div>
+                         <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#EAE2D3] text-[#6E6254]">
                      ...
                      ...
                    ...
                ...
      ...
`
- **[2026-11-09T08:59:54.180Z]** on `http://localhost:3030/dashboard/ai`: `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <RedirectErrorBoundary router={{...}}>
      <InnerLayoutRouter url="/dashboard/ai" tree={[...]} cacheNode={{lazyData:null, ...}} segmentPath={[...]}>
        <SegmentViewNode type="layout" pagePath="dashboard/...">
          <SegmentTrieNode>
          <ClientSegmentRoot Component={function DashboardLayout} slots={{...}} params={{}}>
            <DashboardLayout params={Promise}>
              <div className="flex h-scr...">
                <Sidebar>
                  <aside className="hidden md:...">
                    <div>
                    <div className="flex-1 py-...">
                      <p>
                      <LinkComponent>
                      <LinkComponent href="/dashboard..." className="flex items...">
                        <a className="flex items..." ref={function} onClick={function onClick} ...>
                          <div>
+                         <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#EAE2D3] text-[#6E6254]">
                      ...
                      ...
                    ...
                ...
      ...
`
- **[2026-11-09T09:00:06.671Z]** on `http://localhost:3030/dashboard/analytics`: `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <RedirectErrorBoundary router={{...}}>
      <InnerLayoutRouter url="/dashboard..." tree={[...]} cacheNode={{lazyData:null, ...}} segmentPath={[...]}>
        <SegmentViewNode type="layout" pagePath="dashboard/...">
          <SegmentTrieNode>
          <ClientSegmentRoot Component={function DashboardLayout} slots={{...}} params={{}}>
            <DashboardLayout params={Promise}>
              <div className="flex h-scr...">
                <Sidebar>
                  <aside className="hidden md:...">
                    <div>
                    <div className="flex-1 py-...">
                      <p>
                      <LinkComponent>
                      <LinkComponent href="/dashboard..." className="flex items...">
                        <a className="flex items..." ref={function} onClick={function onClick} ...>
                          <div>
+                         <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#EAE2D3] text-[#6E6254]">
                      ...
                      ...
                    ...
                ...
      ...
`
- **[2026-11-09T09:00:12.930Z]** on `http://localhost:3030/dashboard/appearance`: `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <RedirectErrorBoundary router={{...}}>
      <InnerLayoutRouter url="/dashboard..." tree={[...]} cacheNode={{lazyData:null, ...}} segmentPath={[...]}>
        <SegmentViewNode type="layout" pagePath="dashboard/...">
          <SegmentTrieNode>
          <ClientSegmentRoot Component={function DashboardLayout} slots={{...}} params={{}}>
            <DashboardLayout params={Promise}>
              <div className="flex h-scr...">
                <Sidebar>
                  <aside className="hidden md:...">
                    <div>
                    <div className="flex-1 py-...">
                      <p>
                      <LinkComponent>
                      <LinkComponent href="/dashboard..." className="flex items...">
                        <a className="flex items..." ref={function} onClick={function onClick} ...>
                          <div>
+                         <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#EAE2D3] text-[#6E6254]">
                      ...
                      ...
                    ...
                ...
      ...
`
- **[2026-11-09T09:00:13.627Z]** on `http://localhost:3030/dashboard/appearance`: `Failed to load resource: the server responded with a status of 400 (Bad Request)`
- **[2026-11-09T09:00:13.627Z]** on `http://localhost:3030/dashboard/appearance`: `Failed to load resource: the server responded with a status of 400 (Bad Request)`
- **[2026-11-09T09:00:18.115Z]** on `http://localhost:3030/dashboard/settings`: `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <RedirectErrorBoundary router={{...}}>
      <InnerLayoutRouter url="/dashboard..." tree={[...]} cacheNode={{lazyData:null, ...}} segmentPath={[...]}>
        <SegmentViewNode type="layout" pagePath="dashboard/...">
          <SegmentTrieNode>
          <ClientSegmentRoot Component={function DashboardLayout} slots={{...}} params={{}}>
            <DashboardLayout params={Promise}>
              <div className="flex h-scr...">
                <Sidebar>
                  <aside className="hidden md:...">
                    <div>
                    <div className="flex-1 py-...">
                      <p>
                      <LinkComponent>
                      <LinkComponent href="/dashboard..." className="flex items...">
                        <a className="flex items..." ref={function} onClick={function onClick} ...>
                          <div>
+                         <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#EAE2D3] text-[#6E6254]">
                      ...
                      ...
                    ...
                ...
      ...
`
- **[2026-11-09T09:00:23.057Z]** on `http://localhost:3030/alexmorgan_test`: `Failed to load resource: the server responded with a status of 400 (Bad Request)`
- **[2026-11-09T09:00:23.942Z]** on `http://localhost:3030/alexmorgan_test`: `Failed to load resource: the server responded with a status of 400 (Bad Request)`
- **[2026-11-09T09:00:24.648Z]** on `http://localhost:3030/alexmorgan_test`: `Failed to load resource: the server responded with a status of 400 (Bad Request)`
- **[2026-11-09T09:00:25.348Z]** on `http://localhost:3030/alexmorgan_test`: `Failed to load resource: the server responded with a status of 400 (Bad Request)`
- **[2026-11-09T09:00:26.210Z]** on `http://localhost:3030/alexmorgan_test`: `Failed to load resource: the server responded with a status of 400 (Bad Request)`

