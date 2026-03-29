# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev              # Start dev server (hides PWA manifest)
npm run build            # Production build
npm run build:prod       # Full prod build (restores manifest + generates sitemap)
npm run lint             # ESLint
npm run analyze          # Bundle analyzer (sets ANALYZE=true)
npm run siteMap          # Generate sitemap via next-sitemap
```

**Critical rule:** Always build frontend first, and don't stop fixing until `npm run build` passes without errors.

## Architecture

**Stack:** Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS 3, i18next

### Routing & i18n

Three locales: `sr` (default), `en`, `de`. All user-facing routes are under `/[lang]/`. Middleware (`src/middleware.ts`) detects locale from URL, cookies, or Accept-Language header and injects `x-locale` header for server components. Non-localized URLs get 301 redirected.

Booking subdomain (`booking.nextpixel.dev`) is rewritten internally to `/booking/[lang]/` via middleware + next.config.js rewrites. Booking defaults to `de` locale.

Translation files live in `src/locales/{sr,en,de}/*.json` with ~15 namespaces. Use `useClientTranslation()` hook (SSR-safe) or `useTranslate()` from LanguageContext.

### Blog (File-based MDX)

Blog posts are MDX files in `content/blog/{lang}/{slug}.mdx` with frontmatter metadata. `src/lib/blog.ts` handles compilation via `next-mdx-remote`. Routes are statically generated via `generateStaticParams`.

### API Routes

- `POST /api/send` - Contact form email via Resend API. Has rate limiting, 10KB size limit, IP-based throttling. Falls back to dev simulation if no API key.
- `/api/booking-robots` and `/api/booking-sitemap` - SEO files for booking subdomain.

### Key Directories

- `src/config/` - i18n config, metadata/SEO config, subdomain config, analytics config
- `src/components/sections/` - Homepage sections (Hero, About, Services, Portfolio, Contact)
- `src/components/booking/` - Booking subdomain components
- `src/components/blogComponents/` - Blog-specific components
- `src/context/` - LanguageContext, CookieConsentContext
- `src/hooks/` - useClientTranslation, useClientTranslationWithFallback
- `src/lib/` - blog.ts (MDX compilation), validation.ts (form validation)
- `src/types/` - common.ts, blog.ts

### Performance Patterns

- `LazySection` component uses Intersection Observer for below-fold sections
- Portfolio and Contact sections are lazy-loaded on homepage
- Images use `OptimizedImage` wrapper around next/image (AVIF + WebP)

### SEO

Metadata is locale-aware and configured in `src/config/metadata.ts` with `getPageMetadata()` and `getLocaleMetadata()`. Structured data (JSON-LD) is injected in the locale layout. Dynamic OG images for blog via `@vercel/og`.

## Environment Variables

- `RESEND_API_KEY` - Server-side only, for email sending
- `RECIPIENT_EMAIL` - Email recipient (defaults to info@nextpixel.dev)

## Conventions

- Next.js 15 async params: `params` is a Promise — always `await params` before accessing `.lang`, `.slug` etc.
- Path alias: `@/*` maps to `./src/*`
- Server Components by default; `"use client"` only when needed
- Fonts: Montserrat (headings), Poppins (body) via next/font/google
- Brand colors defined as CSS variables: `--color-navy`, `--color-teal`, `--color-dark`, `--color-cream`

## Agent-First Workflow

**Critical rule:** For every task, ALWAYS follow the agent-first workflow:

1. **Analyze first**: Before doing any work, analyze which specialized agents are best suited for the task. Consider: `Explore`, `Plan`, `backend-architect`, `frontend-architect`, `security-engineer`, `performance-engineer`, `quality-engineer`, `refactoring-expert`, `system-architect`, `seo-geo-optimizer`, `devops-architect`, `root-cause-analyst`, `technical-writer`, `python-expert`, and `superpowers:code-reviewer`.
2. **Delegate to agents**: Use the Agent tool to dispatch work to the best-fit agents. Each agent starts with a fresh context (no prior conversation leakage).
3. **Parallel when possible**: If tasks are independent, launch multiple agents in a single message for parallel execution.
4. **Isolate when needed**: Use `isolation: "worktree"` for agents that modify files, so each works on an isolated copy.
5. **Review results**: After agents complete, synthesize their outputs and present a unified result.

**Agent selection criteria:**
- Codebase exploration/search → `Explore`
- Planning/architecture → `Plan` or `system-architect`
- Backend work → `backend-architect`
- Frontend/UI work → `frontend-architect`
- Bug investigation → `root-cause-analyst`
- Performance issues → `performance-engineer`
- Security concerns → `security-engineer`
- Testing → `quality-engineer`
- Refactoring → `refactoring-expert`
- SEO → `seo-geo-optimizer`
- Code review → `superpowers:code-reviewer`
- Documentation → `technical-writer`
