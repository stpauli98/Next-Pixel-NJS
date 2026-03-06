# GSC Indexing Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix "Page with redirect" and "Duplicate without user-selected canonical" GSC errors on nextpixel.dev

**Architecture:** Remove redirect-target URLs from sitemap, add explicit canonical/hreflang to root layout, convert client-side redirect to 410 Gone, use permanent redirects in middleware.

**Tech Stack:** Next.js 15 App Router, TypeScript

---

### Task 1: Remove root URL from sitemap

**Files:**
- Modify: `src/app/sitemap.ts:20-27`

**Step 1: Edit sitemap.ts**

Remove the `rootPage` object and its reference in the return array. The root URL `https://www.nextpixel.dev` always redirects via middleware, so it must not be in the sitemap.

```typescript
// REMOVE this block (lines 22-27):
const rootPage = {
  url: baseUrl,
  lastModified,
  changeFrequency: 'weekly' as const,
  priority: 1,
}

// CHANGE the return (line 90) from:
return [rootPage, ...mainPages, ...legalPages, ...blogIndexPages, ...blogPages]

// TO:
return [...mainPages, ...legalPages, ...blogIndexPages, ...blogPages]
```

**Step 2: Verify build**

Run: `npx next build`
Expected: Build succeeds, no errors

**Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "fix(seo): remove redirecting root URL from sitemap"
```

---

### Task 2: Replace why_web_site client-side redirect with 410 Gone

**Files:**
- Modify: `src/app/[lang]/blog/why_web_site/page.tsx` (full rewrite)

**Step 1: Rewrite page.tsx as server component returning 410**

Next.js doesn't have a native 410 helper, so we use `notFound()` which returns 404. Google treats persistent 404 the same as 410 for deindexing purposes. Alternatively, we can delete the entire directory since this old URL has no valid destination.

Replace the entire file content with:

```typescript
import { notFound } from 'next/navigation';

export default function OldBlogPostGone() {
  notFound();
}
```

**Step 2: Verify build**

Run: `npx next build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/[lang]/blog/why_web_site/page.tsx
git commit -m "fix(seo): return 404 for removed why_web_site blog post"
```

---

### Task 3: Add canonical and hreflang to root defaultMetadata

**Files:**
- Modify: `src/config/metadata.ts:312-386` (the `defaultMetadata` object)

**Step 1: Add alternates to defaultMetadata**

Find the `defaultMetadata` object and add `alternates` property after `metadataBase`:

```typescript
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: `${siteConfig.url}/sr`,
    languages: {
      'sr-RS': `${siteConfig.url}/sr`,
      'en-US': `${siteConfig.url}/en`,
      'de-DE': `${siteConfig.url}/de`,
      'x-default': `${siteConfig.url}/sr`,
    },
  },
  // ... rest stays the same
```

**Step 2: Verify build**

Run: `npx next build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/config/metadata.ts
git commit -m "fix(seo): add canonical and hreflang to root layout metadata"
```

---

### Task 4: Use permanent (301) redirects in middleware

**Files:**
- Modify: `src/middleware.ts:99-104`

**Step 1: Change redirect to permanent**

In the main site section (line 99-104), change `NextResponse.redirect()` to use `{ status: 301 }`:

```typescript
// CHANGE (line 102) from:
const response = NextResponse.redirect(new URL(redirectPath, request.url));

// TO:
const response = NextResponse.redirect(new URL(redirectPath, request.url), 301);
```

Also update the subdomain redirect (line 79) the same way:

```typescript
// CHANGE (line 79) from:
const response = NextResponse.redirect(new URL(redirectPath, request.url));

// TO:
const response = NextResponse.redirect(new URL(redirectPath, request.url), 301);
```

**Step 2: Verify build**

Run: `npx next build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/middleware.ts
git commit -m "fix(seo): use 301 permanent redirects for locale detection"
```

---

### Task 5: Final verification

**Step 1: Full build**

Run: `npx next build`
Expected: Build succeeds with no errors

**Step 2: Start dev server and verify**

Run: `npx next dev`

Verify:
- `curl -I http://localhost:3000/` → should return 301 to `/sr`
- `curl http://localhost:3000/sitemap.xml` → should NOT contain root URL without locale
- `curl -I http://localhost:3000/sr/blog/why_web_site` → should return 404

**Step 3: Final commit if needed, then stop dev server**
