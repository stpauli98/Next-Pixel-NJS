# SEO Critical Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all critical SEO issues from the Google Search Console audit — empty blog metadata, redirect problems, hreflang misconfiguration, and schema inconsistencies.

**Architecture:** All fixes are in existing files. Blog metadata fix goes in `src/lib/blog.ts` (data extraction) and `src/app/[lang]/blog/[slug]/page.tsx` (listing). Redirect and hreflang fixes go in `next.config.js`, `src/config/metadata.ts`, and `src/app/sitemap.ts`. Schema fix in `src/config/metadata.ts`. Sitemap fix removes legal pages from sitemap since they are noindexed.

**Tech Stack:** Next.js 15, TypeScript, MDX

---

### Task 1: Fix blog post empty title and description

The most critical SEO bug. Blog posts use `export const blogData = {...}` in MDX files (no YAML frontmatter), but `getBlogPost()` and `getBlogPosts()` only read from `frontmatter.title` / `frontmatter.description` which are always empty. Must fall back to `blogData.title` and `blogData.excerpt`.

**Files:**
- Modify: `src/lib/blog.ts:105-113` (getBlogPosts return)
- Modify: `src/lib/blog.ts:182-192` (getBlogPost return)

- [ ] **Step 1: Fix `getBlogPosts()` return object (line 105-113)**

In `src/lib/blog.ts`, change the return object inside `getBlogPosts()`:

```typescript
      return {
        slug: file.replace(/\.mdx$/, ''),
        title: frontmatter.title || blogData.title || '',
        description: frontmatter.description || blogData.excerpt || '',
        date: frontmatter.date || blogData.date,
        excerpt: frontmatter.excerpt || blogData.excerpt,
        author: frontmatter.author || blogData.author,
        tags: frontmatter.tags || blogData.tags,
      } as BlogPost;
```

The key changes are on `title` (add `|| blogData.title`) and `description` (add `|| blogData.excerpt`).

- [ ] **Step 2: Fix `getBlogPost()` return object (line 182-192)**

In the same file, change the return object inside `getBlogPost()`:

```typescript
  return {
    slug,
    title: frontmatter.title || blogData.title || '',
    description: frontmatter.description || blogData.excerpt || '',
    date: frontmatter.date || blogData.date,
    content: result.content,
    author: frontmatter.author || blogData.author,
    tags: frontmatter.tags || blogData.tags,
    excerpt: frontmatter.excerpt || blogData.excerpt,
    blogData
  } as FullBlogPost;
```

Same pattern: `title` falls back to `blogData.title`, `description` falls back to `blogData.excerpt`.

- [ ] **Step 3: Verify the fix**

Run: `npm run build 2>&1 | head -50`
Expected: Build succeeds. Blog post pages should now have proper titles in the build output.

- [ ] **Step 4: Commit**

```bash
git add src/lib/blog.ts
git commit -m "fix(seo): blog post title/description fallback to blogData exports

Posts use export const blogData (not YAML frontmatter), so title and
description were empty strings. Now falls back to blogData.title and
blogData.excerpt."
```

---

### Task 2: Add trailing slash redirects

Google reports redirect validation failures for `/en/`, `/sr/`, `/de/` (with trailing slashes). Next.js treats `/en` and `/en/` as different URLs, causing a redirect chain.

**Files:**
- Modify: `next.config.js:25-57` (redirects array)

- [ ] **Step 1: Add trailing slash redirects to `next.config.js`**

Add these entries at the end of the redirects array (before the closing `]`), after the existing `/blog/:lang` redirects:

```javascript
      // Fix trailing slash redirects (Google Search Console validation failures)
      {
        source: '/:lang(sr|en|de)/',
        destination: '/:lang',
        permanent: true,
      },
```

- [ ] **Step 2: Verify the fix**

Run: `npm run build 2>&1 | tail -5`
Expected: Build succeeds without errors.

- [ ] **Step 3: Commit**

```bash
git add next.config.js
git commit -m "fix(seo): add trailing slash redirects for locale paths

Google reported redirect validation failures for /en/, /sr/, /de/.
Adds permanent redirects to strip trailing slashes."
```

---

### Task 3: Change x-default hreflang from /sr to /en

`x-default` hreflang should point to English as the international fallback language, not Serbian. This affects 5 locations across the codebase.

**Files:**
- Modify: `src/config/metadata.ts:109` (getLocaleMetadata)
- Modify: `src/config/metadata.ts:282` (getPageMetadata)
- Modify: `src/config/metadata.ts:333` (defaultMetadata)
- Modify: `src/app/sitemap.ts:13` (generateAlternates)
- Modify: `src/app/[lang]/blog/[slug]/page.tsx:34` (blog post metadata)

- [ ] **Step 1: Update `getLocaleMetadata` in `src/config/metadata.ts`**

Change line 109:
```typescript
// Before:
'x-default': `${baseUrl}/sr`,
// After:
'x-default': `${baseUrl}/en`,
```

- [ ] **Step 2: Update `getPageMetadata` in `src/config/metadata.ts`**

Change line 282:
```typescript
// Before:
'x-default': `${baseUrl}/sr${pagePath}`,
// After:
'x-default': `${baseUrl}/en${pagePath}`,
```

- [ ] **Step 3: Update `defaultMetadata` in `src/config/metadata.ts`**

Change line 333:
```typescript
// Before:
'x-default': `${siteConfig.url}/sr`,
// After:
'x-default': `${siteConfig.url}/en`,
```

- [ ] **Step 4: Update `generateAlternates` in `src/app/sitemap.ts`**

Change line 13:
```typescript
// Before:
'x-default': `${baseUrl}/sr${pagePath}`,
// After:
'x-default': `${baseUrl}/en${pagePath}`,
```

- [ ] **Step 5: Update blog post metadata in `src/app/[lang]/blog/[slug]/page.tsx`**

Change line 34:
```typescript
// Before:
alternateLanguages['x-default'] = `${baseUrl}/sr/blog/${slug}`;
// After:
alternateLanguages['x-default'] = `${baseUrl}/en/blog/${slug}`;
```

- [ ] **Step 6: Verify the fix**

Run: `npm run build 2>&1 | tail -5`
Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/config/metadata.ts src/app/sitemap.ts "src/app/[lang]/blog/[slug]/page.tsx"
git commit -m "fix(seo): change x-default hreflang from /sr to /en

English is the international fallback language, not Serbian.
Updated across all 5 locations: metadata config, sitemap, and blog posts."
```

---

### Task 4: Fix foundingDate schema mismatch

Schema markup says `foundingDate: '2025'` but the site text (in locale files) says "Since 2020". Must align schema with the actual content.

**Files:**
- Modify: `src/config/metadata.ts:685` (structuredData.localBusiness)

- [ ] **Step 1: Update foundingDate in `src/config/metadata.ts`**

Change line 685:
```typescript
// Before:
foundingDate: '2025',
// After:
foundingDate: '2020',
```

- [ ] **Step 2: Commit**

```bash
git add src/config/metadata.ts
git commit -m "fix(seo): correct foundingDate schema from 2025 to 2020

Aligns schema.org structured data with actual site content
which states 'Since 2020'."
```

---

### Task 5: Remove legal pages from sitemap

Legal pages (terms, privacy, cookie-policy, impressum) now have `noIndex` set but are still in the sitemap. Having noindexed pages in a sitemap sends conflicting signals to Google and wastes crawl budget.

**Files:**
- Modify: `src/app/sitemap.ts:35-44` (legalPages section)

- [ ] **Step 1: Remove legal pages from sitemap in `src/app/sitemap.ts`**

Delete or comment out the entire `legalPages` block (lines 35-44) and remove `...legalPages` from the return array (line 81):

```typescript
// Remove these lines (35-44):
// const legalPaths = ['/privacy-policy', '/terms', '/impressum', '/cookie-policy']
// const legalPages = legalPaths.flatMap(...)

// Change return (line 81):
// Before:
return [...mainPages, ...legalPages, ...blogIndexPages, ...blogPages]
// After:
return [...mainPages, ...blogIndexPages, ...blogPages]
```

- [ ] **Step 2: Verify the fix**

Run: `npm run build 2>&1 | tail -5`
Expected: Build succeeds. Sitemap should now have fewer entries (12 legal page entries removed).

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "fix(seo): remove noindexed legal pages from sitemap

Having noindexed pages in sitemap sends conflicting signals to Google.
Removes terms, privacy-policy, cookie-policy, impressum from sitemap."
```

---

### Task 6: Final build verification and push

- [ ] **Step 1: Run full production build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Push all commits**

Run: `git push`

---

## Notes

- **Hero image `fetchpriority`**: Already handled. `HeroImage` component in `OptimizedImage.tsx` already sets `priority={true}` which Next.js translates to `fetchPriority="high"`.
- **Blog card empty H2**: This was caused by the same root issue as Task 1 (empty `title` from `getBlogPosts()`). Fixing the data extraction fixes the cards.
- **Legal pages noIndex**: Already implemented in previous commit (noIndexPages Set in metadata.ts).
