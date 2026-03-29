# SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix SEO bugs and implement high-impact improvements to increase Google ranking and AI search visibility.

**Architecture:** Changes span robots.txt (AI bots), root layout (resource hints), blog pages (breadcrumbs + reading time), structured data (foundingDate fix), and metadata cleanup (remove deprecated keywords + fake AI meta tags). All changes are additive or corrective — no breaking changes.

**Tech Stack:** Next.js 15, TypeScript, next-mdx-remote, Schema.org JSON-LD

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/robots.ts` | Modify | Add AI bot crawling rules |
| `src/app/layout.tsx` | Modify | Add resource hints (dns-prefetch) |
| `src/app/[lang]/blog/page.tsx` | Modify | Add BreadcrumbList schema |
| `src/app/[lang]/blog/[slug]/page.tsx` | Modify | Add BreadcrumbList schema + reading time display |
| `src/lib/blog.ts` | Modify | Add `calculateReadingTime()` function, return readingTime in posts |
| `src/types/blog.ts` | No change | Already has `readTime?: number` on BlogPost |
| `src/components/blogComponents/BlogList.tsx` | Modify | Use dynamic readingTime instead of hardcoded "5 min" |
| `src/config/seo/structured-data.ts` | Modify | Fix foundingDate from '2025' to '2020' |
| `src/config/metadata.ts` | Modify | Remove deprecated keywords + fake AI meta tags |

---

### Task 1: Fix foundingDate Bug in structured-data.ts

**Files:**
- Modify: `src/config/seo/structured-data.ts:12`

- [ ] **Step 1: Fix the foundingDate value**

In `src/config/seo/structured-data.ts`, line 12, change:

```typescript
foundingDate: '2025',
```

to:

```typescript
foundingDate: '2020',
```

This aligns with `src/config/metadata.ts:685` which already has the correct value `'2020'`.

- [ ] **Step 2: Verify consistency**

Run:
```bash
grep -rn "foundingDate" src/config/
```

Expected: All occurrences should show `'2020'`.

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: Build passes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/config/seo/structured-data.ts
git commit -m "fix(seo): correct foundingDate from 2025 to 2020 in structured-data"
```

---

### Task 2: Add AI Bot Crawling Rules to robots.ts

**Files:**
- Modify: `src/app/robots.ts:73-85`

- [ ] **Step 1: Add AI bot rules**

In `src/app/robots.ts`, after the Bingbot rules block (after line 73) and before the spam bots block (line 74), insert these new rule blocks:

```typescript
      // AI Search Engine Bots — allow for AI search visibility (GEO optimization)
      {
        userAgent: 'GPTBot',
        allow: ['/', '/sr/', '/en/', '/de/'],
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', '/sr/', '/en/', '/de/'],
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/sr/', '/en/', '/de/'],
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: ['/', '/sr/', '/en/', '/de/'],
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/sr/', '/en/', '/de/'],
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Bytespider',
        allow: ['/', '/sr/', '/en/', '/de/'],
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
```

The complete rules array should now be: `*` → `Googlebot` → `Bingbot` → AI bots → spam bots.

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build passes without errors.

- [ ] **Step 3: Verify output**

Run:
```bash
curl -s http://localhost:3000/robots.txt | head -80
```

Expected: AI bot rules appear between Bingbot and spam bot sections.

- [ ] **Step 4: Commit**

```bash
git add src/app/robots.ts
git commit -m "feat(seo): add AI bot crawling rules for GEO optimization"
```

---

### Task 3: Add Resource Hints to Root Layout

**Files:**
- Modify: `src/app/layout.tsx:80-82`

- [ ] **Step 1: Add dns-prefetch links**

In `src/app/layout.tsx`, inside the `<head>` block, after the line `<meta name="distribution" content="global" />` (line 80) and before the closing `</head>` (line 82), add:

```tsx
        {/* Resource Hints for Performance — reduces DNS lookup time for external origins */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
```

Note: `next/font/google` already handles preconnect to Google Fonts at build time, so no font preconnects are needed. Only add dns-prefetch for analytics origins that load on most pages. If you are NOT using Google Analytics/Tag Manager, skip this step entirely.

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build passes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "perf(seo): add dns-prefetch resource hints for external origins"
```

---

### Task 4: Add Reading Time Calculation to Blog

**Files:**
- Modify: `src/lib/blog.ts:20` (add function after line 20)
- Modify: `src/lib/blog.ts:106-114` (add readingTime to return)
- Modify: `src/components/blogComponents/BlogList.tsx:118` (use dynamic readingTime)

- [ ] **Step 1: Add calculateReadingTime function**

In `src/lib/blog.ts`, after line 20 (`const BLOG_DIR = ...`) and before line 22 (`// Re-export tipova`), add:

```typescript

/**
 * Calculate estimated reading time for MDX content.
 * Strips MDX syntax before counting. Uses 200 words/minute.
 */
export function calculateReadingTime(content: string): number {
  const cleanContent = content
    .replace(/import\s+.*?from\s+['"].*?['"]/g, '')
    .replace(/export\s+(const|default|function)\s+.*?[={]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\{[^}]*\}/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/[#*_~`>-]/g, '')
    .trim();

  const wordCount = cleanContent.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}
```

- [ ] **Step 2: Add readingTime to getBlogPosts return object**

In `src/lib/blog.ts`, inside `getBlogPosts()`, modify the return object (lines 106-114). Change:

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

to:

```typescript
      return {
        slug: file.replace(/\.mdx$/, ''),
        title: frontmatter.title || blogData.title || '',
        description: frontmatter.description || blogData.excerpt || '',
        date: frontmatter.date || blogData.date,
        excerpt: frontmatter.excerpt || blogData.excerpt,
        author: frontmatter.author || blogData.author,
        tags: frontmatter.tags || blogData.tags,
        readTime: calculateReadingTime(fileContent),
      } as BlogPost;
```

- [ ] **Step 3: Update BlogList to use dynamic readingTime**

In `src/components/blogComponents/BlogList.tsx`, change line 118:

```tsx
                  readTime="5 min"
```

to:

```tsx
                  readTime={`${post.readTime || 5} min`}
```

Note: The `BlogPost` interface defined locally in `BlogList.tsx` (lines 8-16) needs `readTime` added. Change:

```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
}
```

to:

```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  readTime?: number;
}
```

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: Build passes without errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/blog.ts src/components/blogComponents/BlogList.tsx
git commit -m "feat(seo): add dynamic reading time calculation for blog posts"
```

---

### Task 5: Add BreadcrumbList Schema to Blog Index Page

**Files:**
- Modify: `src/app/[lang]/blog/page.tsx`

- [ ] **Step 1: Add siteConfig import and breadcrumb schema**

In `src/app/[lang]/blog/page.tsx`, change the imports at the top (line 7) from:

```typescript
import { getPageMetadata } from '@/config/metadata';
```

to:

```typescript
import { getPageMetadata, siteConfig } from '@/config/metadata';
```

Then, inside `BlogPage`, after line 30 (`const posts = await getBlogPosts(currentLang);`) and before the return, add:

```typescript

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteConfig.url}/${currentLang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteConfig.url}/${currentLang}/blog`,
      },
    ],
  };
```

- [ ] **Step 2: Inject schema into JSX**

Change the return block from:

```tsx
  return (
    <div className="flex flex-col min-h-screen">
      <BlogNavbar />
      <main className="flex-grow">
        <BlogList posts={posts} currentLang={currentLang} />
      </main>
      <BlogFooter />
    </div>
  );
```

to:

```tsx
  return (
    <div className="flex flex-col min-h-screen">
      <BlogNavbar />
      <main className="flex-grow">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <BlogList posts={posts} currentLang={currentLang} />
      </main>
      <BlogFooter />
    </div>
  );
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: Build passes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/[lang]/blog/page.tsx
git commit -m "feat(seo): add BreadcrumbList schema to blog index page"
```

---

### Task 6: Add BreadcrumbList Schema to Blog Post Page

**Files:**
- Modify: `src/app/[lang]/blog/[slug]/page.tsx:97-124`

- [ ] **Step 1: Add breadcrumb schema**

In `src/app/[lang]/blog/[slug]/page.tsx`, after the `articleSchema` object (after line 124) and before the return (line 126), add:

```typescript

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${baseUrl}/${lang}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${baseUrl}/${lang}/blog/${slug}`,
      },
    ],
  };
```

- [ ] **Step 2: Inject into JSX**

After the existing `articleSchema` script tag (line 134-135), add:

```tsx
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
```

So the article block becomes:

```tsx
          <article>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {post.date && (
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: Build passes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/[lang]/blog/[slug]/page.tsx
git commit -m "feat(seo): add BreadcrumbList schema to blog post pages"
```

---

### Task 7: Remove Deprecated Keywords Meta Tags

**Files:**
- Modify: `src/config/metadata.ts`

- [ ] **Step 1: Remove keywords from getLocaleMetadata()**

In `src/config/metadata.ts`, line 101, remove the `keywords` line inside `getLocaleMetadata()`:

Change:
```typescript
  return {
    title: localeData.title,
    description: localeData.description,
    keywords: localeData.keywords,
    metadataBase: new URL(baseUrl),
```

to:
```typescript
  return {
    title: localeData.title,
    description: localeData.description,
    metadataBase: new URL(baseUrl),
```

- [ ] **Step 2: Remove keywords from defaultMetadata**

In `src/config/metadata.ts`, line 341, remove the `keywords` line:

Change:
```typescript
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
```

to:
```typescript
  description: siteConfig.description,
  authors: [
```

- [ ] **Step 3: Remove fake AI meta tags from defaultMetadata**

In `src/config/metadata.ts`, lines 403-407, remove the `other` block:

Change:
```typescript
  other: {
    'chatgpt-bot': 'index,follow',
    'claude-web': 'index,follow',
    'bard-bot': 'index,follow',
  },
```

to: (remove the entire `other` property)

These meta tag names are not recognized by any AI bot. The actual bots (GPTBot, ClaudeBot) read robots.txt, which we configured in Task 2.

- [ ] **Step 4: Remove keywords from createPageMetadata()**

In `src/config/metadata.ts`, line 434, remove the keywords line:

Change:
```typescript
    title,
    description: description || siteConfig.description,
    keywords: keywords ? [...siteConfig.keywords, ...keywords] : siteConfig.keywords,
    openGraph: {
```

to:
```typescript
    title,
    description: description || siteConfig.description,
    openGraph: {
```

- [ ] **Step 5: Remove keywords from createBlogMetadata()**

In `src/config/metadata.ts`, lines 489-500, remove the allKeywords variable and keywords property:

Change:
```typescript
  const allKeywords = [
    ...siteConfig.keywords,
    ...(keywords || []),
    ...tags,
    'blog',
    'članak'
  ];

  return {
    title,
    description: description || siteConfig.description,
    keywords: allKeywords,
    authors: [
```

to:
```typescript
  return {
    title,
    description: description || siteConfig.description,
    authors: [
```

- [ ] **Step 6: Build check**

Run: `npm run build`
Expected: Build passes without errors.

- [ ] **Step 7: Commit**

```bash
git add src/config/metadata.ts
git commit -m "fix(seo): remove deprecated keywords meta tags and fake AI bot meta tags"
```

---

### Task 8: Final Verification

- [ ] **Step 1: Full production build**

Run:
```bash
npm run build
```

Expected: Build passes without errors.

- [ ] **Step 2: Verify structured data**

Run dev server and check JSON-LD output:
```bash
npm run dev &
sleep 3
curl -s http://localhost:3000/sr | grep -o 'application/ld+json' | wc -l
curl -s http://localhost:3000/sr/blog | grep -o 'application/ld+json' | wc -l
```

Expected:
- Homepage: at least 1 `application/ld+json` block
- Blog index: at least 1 `application/ld+json` block (the new BreadcrumbList)

- [ ] **Step 3: Verify robots.txt**

```bash
curl -s http://localhost:3000/robots.txt | grep -E "GPTBot|ClaudeBot|PerplexityBot"
```

Expected: All three bot names appear in the output.

- [ ] **Step 4: Verify no keywords meta**

```bash
curl -s http://localhost:3000/sr | grep -i 'name="keywords"'
```

Expected: No output (keywords meta tag removed).

- [ ] **Step 5: Commit final state (if any fixes needed)**

```bash
git add -A
git commit -m "chore(seo): final verification and cleanup"
```

---

## Summary of SEO Impact

| Change | Impact | Google Signal |
|--------|--------|---------------|
| AI bot rules | AI search visibility | GEO (Generative Engine Optimization) |
| Resource hints | LCP improvement ~100-300ms | Core Web Vitals |
| BreadcrumbList schema | Rich results in SERPs (+20-30% CTR) | Structured Data |
| Reading time | Better UX, lower bounce rate | User Engagement |
| foundingDate fix | Correct business info | Schema accuracy |
| Remove keywords meta | Cleaner HTML, don't leak strategy | Cleanup |
| Remove fake AI meta | Cleaner HTML | Cleanup |
