# GSC Indexing Fixes Design

## Problem
Two Google Search Console issues on `https://www.nextpixel.dev/`:
1. **"Page with redirect"** — root URL in sitemap redirects to `/sr`; `why_web_site` uses client-side redirect
2. **"Duplicate without user-selected canonical"** — root URL and `/sr` both in sitemap with priority 1; root layout has no canonical

## Decisions
- Root URL continues redirecting to `/sr` (removed from sitemap)
- `why_web_site` page returns 410 Gone (content no longer exists)
- `/sr` is the canonical homepage

## Changes

### 1. `src/app/sitemap.ts` — Remove root URL
Remove `rootPage` from sitemap output since it always redirects.

### 2. `src/app/[lang]/blog/why_web_site/page.tsx` — Return 410 Gone
Replace client-side redirect with a server component that returns 410 status via Next.js.

### 3. `src/config/metadata.ts` — Add canonical to defaultMetadata
Add `alternates.canonical` → `https://www.nextpixel.dev/sr` and hreflang entries.

### 4. `src/middleware.ts` — Use 301 permanent redirect for root
Ensure root `/` redirect uses permanent: true (301) for faster signal consolidation.

## Not Changed
- Legal pages remain in sitemap (have proper canonicals)
- robots.txt unchanged
- Booking subdomain logic unchanged
