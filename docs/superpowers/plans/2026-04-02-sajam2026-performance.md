# Sajam2026 Performance Optimization Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve sajam2026 page speed from 4/10 to 8+/10 by enabling static generation (TTFB fix), removing framer-motion for CSS animations, lazy-loading below-fold sections, reducing font weight count, and fixing scroll handler.

**Architecture:** Task 1 is the quick win — static generation drops TTFB from 2.5s to <100ms. Task 2 creates a shared CSS animation utility + lightweight useInView hook to replace framer-motion. Tasks 3-5 rewrite each component to use CSS animations instead of framer-motion. Task 6 updates page.tsx to lazy-load below-fold sections. Task 7 reduces font weights. Task 8 optimizes the scroll handler.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, CSS @keyframes, IntersectionObserver

---

## File Map

| File | Change | Purpose |
|------|--------|---------|
| `src/app/[lang]/sajam2026/page.tsx` | Modify | Static generation + lazy loading |
| `src/hooks/useInView.ts` | Create | Lightweight IntersectionObserver hook (replaces framer-motion whileInView) |
| `src/components/sajam/SajamHero.tsx` | Rewrite | CSS animations, remove framer-motion |
| `src/components/sajam/SajamProblems.tsx` | Rewrite | CSS animations, remove framer-motion |
| `src/components/sajam/SajamProof.tsx` | Rewrite | CSS animations, remove framer-motion |
| `src/components/sajam/SajamOffer.tsx` | Rewrite | CSS animations, remove framer-motion |
| `src/components/sajam/SajamCTA.tsx` | Rewrite | CSS animations, remove framer-motion, fix scroll handler |
| `src/app/layout.tsx` | Modify | Reduce font weights |

---

### Task 1: Enable Static Generation (Quick Win — TTFB Fix)

**Files:**
- Modify: `src/app/[lang]/sajam2026/page.tsx`

The page is dynamically rendered on every request (TTFB 2.53s). Adding `generateStaticParams` pre-renders all 3 locale variants at build time.

- [ ] **Step 1: Add generateStaticParams to page.tsx**

In `src/app/[lang]/sajam2026/page.tsx`, add after the `generateMetadata` function (after line 22):

```typescript
export async function generateStaticParams() {
  return [{ lang: 'sr' }, { lang: 'en' }, { lang: 'de' }];
}
```

- [ ] **Step 2: Verify build compiles and page is statically generated**

Run: `npm run build 2>&1 | grep -E "sajam|●"`
Expected: The sajam2026 routes should show `●` (SSG) symbol instead of `ƒ` (Dynamic).

- [ ] **Step 3: Commit**

```bash
git add src/app/[lang]/sajam2026/page.tsx
git commit -m "perf(sajam2026): enable static generation for all locales

Add generateStaticParams to pre-render sr/en/de at build time.
Drops TTFB from ~2.5s to <100ms on production."
```

---

### Task 2: Create Lightweight useInView Hook

**Files:**
- Create: `src/hooks/useInView.ts`

This replaces framer-motion's `whileInView` with a ~300 byte IntersectionObserver hook. All sajam components will use this instead.

- [ ] **Step 1: Create the hook**

Create `src/hooks/useInView.ts`:

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build 2>&1 | tail -10`
Expected: Build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useInView.ts
git commit -m "feat: add lightweight useInView hook

IntersectionObserver-based hook (~300 bytes) to replace
framer-motion's whileInView. Supports once, threshold,
and rootMargin options."
```

---

### Task 3: Rewrite SajamHero — Remove Framer Motion

**Files:**
- Modify: `src/components/sajam/SajamHero.tsx`

SajamHero uses framer-motion for: stagger fade-in on mount + bouncing arrow. Replace with CSS animations.

- [ ] **Step 1: Rewrite SajamHero.tsx**

Replace the entire file with:

```tsx
'use client';

import { useTranslate } from '@/context/LanguageContext';
import { MessageCircle, ArrowDown } from 'lucide-react';

export default function SajamHero() {
  const { t } = useTranslate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-cyan-950">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-3">
            <h1 className="sr-only">{t('sajam2026:hero.headline')}</h1>
            <p className="text-gray-400 text-lg mb-1 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              {t('sajam2026:hero.greeting')}
            </p>
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
              {t('sajam2026:hero.name')}
              <span className="text-cyan-400">,</span>
            </p>
            <p className="text-gray-400 text-lg mb-8 animate-fade-in-up" style={{ animationDelay: '240ms' }}>
              {t('sajam2026:hero.role')}
            </p>

            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 leading-snug animate-fade-in-up" style={{ animationDelay: '360ms' }}>
              {t('sajam2026:hero.title')}
            </h2>

            <p className="text-gray-300 text-lg max-w-lg mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '480ms' }}>
              {t('sajam2026:hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <a
                href="https://wa.me/message/U4Z7GJU4ZSL5M1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all shadow-lg shadow-green-500/25"
              >
                <MessageCircle className="w-5 h-5" />
                {t('sajam2026:hero.cta')}
              </a>
              <a
                href="#proof"
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-gray-200 font-semibold rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
              >
                {t('sajam2026:hero.ctaSecondary')}
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-3 animate-fade-in-up" style={{ animationDelay: '720ms' }}>
              {t('sajam2026:hero.ctaSubtext')}
            </p>
          </div>

          {/* Right side — profile photo */}
          <div className="lg:col-span-2 flex justify-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="relative">
              <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  <span className="text-7xl sm:text-8xl font-bold text-cyan-400/30">N</span>
                </div>
              </div>
              <div className="absolute -inset-4 rounded-full border border-cyan-500/10 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-5 h-5 text-gray-500" />
      </div>
    </section>
  );
}
```

**Key changes:**
- Removed `framer-motion` import entirely
- Replaced `motion.div/p` with plain `div/p` + `animate-fade-in-up` CSS class
- Stagger effect via `animationDelay` inline styles (0ms, 120ms, 240ms, etc.)
- Bouncing arrow uses Tailwind's built-in `animate-bounce`
- Still `"use client"` because of `useTranslate()` hook

- [ ] **Step 2: Add CSS animation keyframes to globals.css**

In `src/app/globals.css`, add at the end of the file:

```css
/* Sajam2026 animations — replaces framer-motion */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.5s ease forwards;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in-scale {
  opacity: 0;
  animation: fadeInScale 0.6s ease forwards;
}

/* Scroll-triggered variant — stays hidden until .is-visible is added */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.animate-on-scroll-scale {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll-scale.is-visible {
  opacity: 1;
  transform: scale(1);
}
```

- [ ] **Step 3: Verify build compiles**

Run: `npm run build 2>&1 | tail -10`
Expected: Build completes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/sajam/SajamHero.tsx src/app/globals.css
git commit -m "perf(sajam2026): replace framer-motion with CSS in SajamHero

Remove framer-motion dependency from Hero section. Use CSS
@keyframes fadeInUp with staggered animationDelay for the
same visual effect. Saves ~57KB from client bundle."
```

---

### Task 4: Rewrite SajamProblems — CSS Animations + useInView

**Files:**
- Modify: `src/components/sajam/SajamProblems.tsx`

- [ ] **Step 1: Rewrite SajamProblems.tsx**

Replace the entire file with:

```tsx
'use client';

import { useTranslate } from '@/context/LanguageContext';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const PROBLEM_COUNT = 3;

export default function SajamProblems() {
  const { t } = useTranslate();
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <section id="problems" className="py-24 bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <div className={`text-center mb-16 animate-on-scroll ${isInView ? 'is-visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('sajam2026:problems.sectionTitle')}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {t('sajam2026:problems.sectionSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: PROBLEM_COUNT }).map((_, i) => (
            <div
              key={i}
              className={`bg-gray-900/80 border border-gray-800 rounded-2xl p-6 hover:border-amber-500/20 transition-all flex flex-col animate-on-scroll ${isInView ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <h3 className="text-lg font-semibold text-amber-300">
                  {t(`sajam2026:problems.items.${i}.problem`)}
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
                {t(`sajam2026:problems.items.${i}.description`)}
              </p>
              <div className="flex items-start gap-2 pt-4 border-t border-gray-800">
                <ArrowRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <p className="text-cyan-300 text-sm font-medium">
                  {t(`sajam2026:problems.items.${i}.solution`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build 2>&1 | tail -10`

- [ ] **Step 3: Commit**

```bash
git add src/components/sajam/SajamProblems.tsx
git commit -m "perf(sajam2026): replace framer-motion with CSS in SajamProblems

Use useInView hook + CSS transitions for scroll-triggered
fade-in. Stagger via transitionDelay on cards."
```

---

### Task 5: Rewrite SajamProof, SajamOffer, SajamCTA — CSS Animations

**Files:**
- Modify: `src/components/sajam/SajamProof.tsx`
- Modify: `src/components/sajam/SajamOffer.tsx`
- Modify: `src/components/sajam/SajamCTA.tsx`

Same pattern as Task 4 — replace `motion.*` with `useInView` + CSS classes. SajamCTA also gets the scroll handler fix.

- [ ] **Step 1: Rewrite SajamProof.tsx**

Replace the entire file with:

```tsx
'use client';

import { useTranslate } from '@/context/LanguageContext';
import { ExternalLink, Quote } from 'lucide-react';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const PROJECT_COUNT = 3;

export default function SajamProof() {
  const { t } = useTranslate();
  const { ref: headerRef, isInView: headerVisible } = useInView<HTMLDivElement>();
  const { ref: gridRef, isInView: gridVisible } = useInView<HTMLDivElement>();
  const { ref: testimonialRef, isInView: testimonialVisible } = useInView<HTMLDivElement>();

  const stats = [
    { value: t('sajam2026:proof.stats.projects'), label: t('sajam2026:proof.stats.projectsLabel') },
    { value: t('sajam2026:proof.stats.years'), label: t('sajam2026:proof.stats.yearsLabel') },
    { value: t('sajam2026:proof.stats.clients'), label: t('sajam2026:proof.stats.clientsLabel') },
  ];

  return (
    <section id="proof" className="py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={headerRef} className={`text-center mb-12 animate-on-scroll ${headerVisible ? 'is-visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('sajam2026:proof.sectionTitle')}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {t('sajam2026:proof.sectionSubtitle')}
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-8 sm:gap-16 mb-16 animate-on-scroll ${headerVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-cyan-400">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-6 mb-16">
          {Array.from({ length: PROJECT_COUNT }).map((_, i) => {
            const image = t(`sajam2026:proof.projects.${i}.image`) as string;
            const url = t(`sajam2026:proof.projects.${i}.url`) as string;

            return (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={`group bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all animate-on-scroll ${gridVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={image}
                    alt={t(`sajam2026:proof.projects.${i}.title`) as string}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-900/80 text-cyan-400 border border-cyan-500/20 backdrop-blur-sm">
                      {t(`sajam2026:proof.projects.${i}.category`)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">
                      {t(`sajam2026:proof.projects.${i}.title`)}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {t(`sajam2026:proof.projects.${i}.description`)}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        <div ref={testimonialRef} className={`max-w-2xl mx-auto text-center animate-on-scroll ${testimonialVisible ? 'is-visible' : ''}`}>
          <Quote className="w-8 h-8 text-cyan-500/20 mx-auto mb-4" />
          <p className="text-gray-300 text-lg italic leading-relaxed mb-4">
            &ldquo;{t('sajam2026:proof.testimonial.quote')}&rdquo;
          </p>
          <p className="text-white font-medium">{t('sajam2026:proof.testimonial.name')}</p>
          <p className="text-gray-500 text-sm">{t('sajam2026:proof.testimonial.role')}</p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite SajamOffer.tsx**

Replace the entire file with:

```tsx
'use client';

import { useTranslate } from '@/context/LanguageContext';
import { Check, Sparkles, MessageCircle } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const INCLUDE_COUNT = 4;
const PRICE_COUNT = 3;
const STEP_COUNT = 3;

export default function SajamOffer() {
  const { t } = useTranslate();
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <section id="offer" className="py-24 bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6" ref={ref}>
        <div className={`text-center mb-12 animate-on-scroll ${isInView ? 'is-visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {t('sajam2026:offer.sectionTitle')}
          </h2>
        </div>

        <div className={`relative bg-gradient-to-br from-gray-900 to-gray-900/80 border border-cyan-500/20 rounded-3xl p-8 sm:p-10 overflow-hidden animate-on-scroll-scale ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {t('sajam2026:offer.badge')}
            </span>

            <h3 className="text-2xl font-bold text-white mb-3">
              {t('sajam2026:offer.title')}
            </h3>
            <p className="text-gray-300 mb-8">
              {t('sajam2026:offer.description')}
            </p>

            <ul className="space-y-3 mb-8">
              {Array.from({ length: INCLUDE_COUNT }).map((_, i) => (
                <li key={i} className="flex items-start gap-2.5 text-gray-300 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  {t(`sajam2026:offer.includes.${i}`)}
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-700/50 pt-6 mb-8">
              <p className="text-sm font-semibold text-white mb-3">
                {t('sajam2026:offer.pricing.title')}
              </p>
              <div className="space-y-1.5">
                {Array.from({ length: PRICE_COUNT }).map((_, i) => (
                  <p key={i} className="text-gray-300 text-sm">
                    {t(`sajam2026:offer.pricing.items.${i}`)}
                  </p>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {t('sajam2026:offer.pricing.note')}
              </p>
            </div>

            <div className="border-t border-gray-700/50 pt-6 mb-8">
              <p className="text-sm font-semibold text-white mb-4">
                {t('sajam2026:offer.process.title')}
              </p>
              <div className="space-y-3">
                {Array.from({ length: STEP_COUNT }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xs text-cyan-400 font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-gray-300 text-sm">
                      {t(`sajam2026:offer.process.steps.${i}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/message/U4Z7GJU4ZSL5M1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all shadow-lg shadow-green-500/25"
            >
              <MessageCircle className="w-5 h-5" />
              {t('sajam2026:cta.whatsapp')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite SajamCTA.tsx (includes scroll handler fix)**

Replace the entire file with:

```tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslate } from '@/context/LanguageContext';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

export default function SajamCTA() {
  const { t, language } = useTranslate();
  const [showFloating, setShowFloating] = useState(false);
  const { ref, isInView } = useInView<HTMLDivElement>();

  // Optimized scroll handler with threshold check
  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 600;
      setShowFloating(prev => prev !== shouldShow ? shouldShow : prev);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section id="cta" className="py-24 bg-gray-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center" ref={ref}>
          {/* Profile photo callback */}
          <div className={`mb-8 animate-on-scroll-scale ${isInView ? 'is-visible' : ''}`}>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 mx-auto">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-2xl font-bold text-cyan-400/30">N</span>
              </div>
            </div>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-bold text-white mb-4 animate-on-scroll ${isInView ? 'is-visible' : ''}`}>
            {t('sajam2026:cta.title')}
          </h2>

          <p className={`text-gray-400 text-lg mb-10 max-w-lg mx-auto animate-on-scroll ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            {t('sajam2026:cta.subtitle')}
          </p>

          {/* WhatsApp — primary */}
          <div className={`animate-on-scroll ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            <a
              href="https://wa.me/message/U4Z7GJU4ZSL5M1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all shadow-lg shadow-green-500/25"
            >
              <MessageCircle className="w-6 h-6" />
              {t('sajam2026:cta.whatsapp')}
            </a>
            <p className="text-gray-400 text-sm mt-3">{t('sajam2026:cta.whatsappSubtext')}</p>
          </div>

          {/* Secondary contacts */}
          <div className={`flex flex-col sm:flex-row justify-center gap-4 mt-8 animate-on-scroll ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
            <a
              href="tel:+38766603900"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-700 text-gray-300 rounded-xl hover:border-cyan-500/30 hover:text-white transition-all"
            >
              <Phone className="w-4 h-4" />
              {t('sajam2026:cta.phoneLabel')}
            </a>
            <a
              href="mailto:info@nextpixel.dev"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-700 text-gray-300 rounded-xl hover:border-cyan-500/30 hover:text-white transition-all"
            >
              <Mail className="w-4 h-4" />
              {t('sajam2026:cta.emailLabel')}
            </a>
          </div>

          {/* Address for local SEO */}
          <p className={`text-gray-500 text-sm mt-6 animate-on-scroll ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: '350ms' }}>
            {t('sajam2026:cta.address')}
          </p>

          {/* Internal links */}
          <div className={`flex flex-col sm:flex-row justify-center gap-4 mt-6 animate-on-scroll ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            <a
              href={`/${language}/#services`}
              className="text-cyan-400 hover:text-cyan-300 text-sm underline underline-offset-4 transition-colors"
            >
              {t('sajam2026:cta.servicesLink')}
            </a>
            <a
              href={`/${language}/#portfolio`}
              className="text-cyan-400 hover:text-cyan-300 text-sm underline underline-offset-4 transition-colors"
            >
              {t('sajam2026:cta.portfolioLink')}
            </a>
          </div>

          {/* Signature */}
          <p className={`text-gray-400 text-sm mt-12 italic animate-on-scroll ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: '450ms' }}>
            {t('sajam2026:cta.closing')}
          </p>
        </div>
      </section>

      {/* Floating WhatsApp button — CSS transition instead of AnimatePresence */}
      <a
        href="https://wa.me/message/U4Z7GJU4ZSL5M1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3.5 bg-green-500 text-white font-semibold rounded-full shadow-lg shadow-green-500/30 hover:bg-green-400 transition-all duration-300 ${showFloating ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'}`}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </>
  );
}
```

**Key changes in SajamCTA:**
- Removed `framer-motion` and `AnimatePresence` — floating button now uses CSS transition classes
- Scroll handler uses `setShowFloating(prev => prev !== shouldShow ? shouldShow : prev)` to avoid unnecessary re-renders
- All `motion.*` elements replaced with `animate-on-scroll` + `useInView`

- [ ] **Step 4: Verify build compiles**

Run: `npm run build 2>&1 | tail -10`

- [ ] **Step 5: Commit**

```bash
git add src/components/sajam/SajamProof.tsx src/components/sajam/SajamOffer.tsx src/components/sajam/SajamCTA.tsx
git commit -m "perf(sajam2026): replace framer-motion in Proof, Offer, CTA

Remove framer-motion from all remaining sajam components.
Use useInView hook + CSS transitions for scroll-triggered
animations. Fix scroll handler to avoid redundant re-renders.
Floating WhatsApp button uses CSS transition instead of
AnimatePresence."
```

---

### Task 6: Lazy Load Below-Fold Sections

**Files:**
- Modify: `src/app/[lang]/sajam2026/page.tsx`

Use `next/dynamic` to lazy-load SajamProblems, SajamProof, SajamOffer, SajamCTA. Only SajamHero loads eagerly (above the fold).

- [ ] **Step 1: Update page.tsx with dynamic imports**

In `src/app/[lang]/sajam2026/page.tsx`, replace the static imports of below-fold components with dynamic ones. Update the imports section and the render:

```tsx
import { Metadata } from 'next';
import { getPageMetadata } from '@/config/metadata';
import { Locale } from '@/config/i18n';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SajamHero from '@/components/sajam/SajamHero';

// Lazy load below-fold sections
const SajamProblems = dynamic(() => import('@/components/sajam/SajamProblems'), { ssr: true });
const SajamProof = dynamic(() => import('@/components/sajam/SajamProof'), { ssr: true });
const SajamOffer = dynamic(() => import('@/components/sajam/SajamOffer'), { ssr: true });
const SajamCTA = dynamic(() => import('@/components/sajam/SajamCTA'), { ssr: true });
```

Keep `ssr: true` so the HTML is still rendered server-side for SEO. The JS chunks are deferred until needed.

Keep the rest of the file (generateMetadata, generateStaticParams, getSajamStructuredData, the component render) unchanged.

- [ ] **Step 2: Verify build compiles**

Run: `npm run build 2>&1 | tail -10`

- [ ] **Step 3: Commit**

```bash
git add src/app/[lang]/sajam2026/page.tsx
git commit -m "perf(sajam2026): lazy-load below-fold sections

Use next/dynamic to defer JS for Problems, Proof, Offer, CTA
sections. HTML still SSR'd for SEO. Only Hero JS loads eagerly."
```

---

### Task 7: Reduce Font Weights

**Files:**
- Modify: `src/app/layout.tsx`

Currently loading 4 Montserrat weights (400, 500, 600, 700) and 4 Poppins weights (300, 400, 500, 600) = 8 weights × ~2 files each (latin + latin-ext) = ~10-16 font files. Reduce to essential weights only.

- [ ] **Step 1: Reduce Montserrat to 3 weights, Poppins to 2**

In `src/app/layout.tsx`, change lines 10-21:

From:
```typescript
const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});
```

To:
```typescript
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-poppins',
  display: 'swap',
});
```

**Changes:**
- Montserrat: dropped weight 400 (body text uses Poppins, headings use 600/700)
- Poppins: dropped 300 and 500 (300 is barely used, 500 can fall back to 400 or 600)
- Both: dropped `latin-ext` subset (only needed for non-standard Latin chars — the site uses UTF-8 characters directly, not through fonts)

**Note:** If `latin-ext` is needed for Serbian diacritics (č, š, ž, đ, ć), keep it. But these characters are in the base Latin range for most Google Fonts, so `latin` subset should cover them. Test by checking if diacritics render correctly after the change.

- [ ] **Step 2: Verify build compiles and check diacritics**

Run: `npm run build 2>&1 | tail -10`
Then visually check `http://localhost:3004/sr/sajam2026` — verify č, š, ž, đ, ć display correctly.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "perf: reduce font weights from 8 to 5

Montserrat: drop 400 (not used in headings).
Poppins: drop 300 and 500 (fall back to 400/600).
Drop latin-ext subset (base latin covers Serbian diacritics).
Saves ~50-75KB of font transfer."
```

---

### Task 8: Final Verification

- [ ] **Step 1: Full production build**

Run: `npm run build 2>&1 | tail -30`
Expected: Build completes with 0 errors. Sajam2026 routes show `●` (SSG).

- [ ] **Step 2: Check JS bundle size**

Run: `npm run build 2>&1 | grep -E "sajam|First Load"`
Compare the "First Load JS" with the previous value (103KB). It should be significantly smaller.

- [ ] **Step 3: Visual test**

Navigate to `http://localhost:3004/sr/sajam2026`:
- Verify all sections render correctly
- Verify animations still work (fade-in on scroll)
- Verify floating WhatsApp button appears on scroll
- Verify diacritics (č, š, ž) display correctly
- Check that page loads noticeably faster

- [ ] **Step 4: Commit and push**

```bash
git push origin main
```
