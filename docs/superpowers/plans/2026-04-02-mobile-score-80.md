# Mobile PageSpeed Score 71→80+ Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Push mobile PageSpeed score from 71 to 80+ by fixing LCP (3.5s→<2.5s) through removing animation delay from LCP element, skipping SplashScreen on sajam2026, and removing framer-motion from Navbar shared bundle.

**Architecture:** Three surgical fixes targeting the 3 biggest LCP contributors: (1) remove opacity:0 animation from above-fold hero elements (saves ~620ms LCP), (2) skip SplashScreen on sajam2026 route (saves 800ms LCP for new visitors), (3) replace Navbar's framer-motion mobile menu with CSS transition (removes ~54KB from shared JS bundle). Total estimated LCP improvement: ~1.5-2s.

**Tech Stack:** Next.js 15, CSS transitions, Tailwind CSS

---

## File Map

| File | Change | Purpose |
|------|--------|---------|
| `src/components/sajam/SajamHero.tsx` | Modify | Remove animate-fade-in-up from LCP elements |
| `src/app/globals.css` | Modify | Add above-fold animation variant |
| `src/components/SplashScreen.tsx` | Modify | Skip on sajam2026 routes |
| `src/components/layout/Navbar.tsx` | Modify | Replace framer-motion with CSS transition for mobile menu |

---

### Task 1: Remove Animation Delay from LCP Elements

**Files:**
- Modify: `src/components/sajam/SajamHero.tsx`

The LCP element is the large name text (line 25: `text-4xl sm:text-5xl md:text-6xl font-bold`). It has `animate-fade-in-up` which starts at `opacity: 0` with `animationDelay: 120ms`. Browser cannot report LCP until the element is visible — this adds ~620ms to LCP.

Fix: Remove animation from above-fold hero content (first 3 elements: greeting, name, role). Keep animations on below-fold elements.

- [ ] **Step 1: Remove animation from above-fold hero elements**

In `src/components/sajam/SajamHero.tsx`, change lines 22-30 from:

```tsx
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
```

To (remove `animate-fade-in-up` and `style` from these 3 elements):

```tsx
<p className="text-gray-400 text-lg mb-1">
  {t('sajam2026:hero.greeting')}
</p>
<p className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
  {t('sajam2026:hero.name')}
  <span className="text-cyan-400">,</span>
</p>
<p className="text-gray-400 text-lg mb-8">
  {t('sajam2026:hero.role')}
</p>
```

Also remove animation from the profile photo (line 63) — it's above the fold on desktop:

```tsx
<div className="lg:col-span-2 flex justify-center">
```

Keep `animate-fade-in-up` on H2 title (line 33), description (line 37), CTA buttons (line 41), and subtext (line 58) — these are below the fold on mobile.

- [ ] **Step 2: Verify build compiles**

Run: `npm run build 2>&1 | tail -10`
Expected: Build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sajam/SajamHero.tsx
git commit -m "perf(sajam2026): remove animation delay from LCP elements

Above-fold hero elements (greeting, name, role, photo) now render
instantly without opacity:0 animation. Saves ~620ms on LCP
measurement. Below-fold elements keep fade-in animations."
```

---

### Task 2: Skip SplashScreen on Sajam2026 Routes

**Files:**
- Modify: `src/components/SplashScreen.tsx`

SplashScreen covers the viewport with `z-[9999]` for 800ms minimum on first visit. This directly delays LCP. Fix: check pathname and skip the splash on `/sajam2026` routes (landing pages should load instantly).

- [ ] **Step 1: Add pathname check to SplashScreen**

In `src/components/SplashScreen.tsx`, add `usePathname` import and early return for sajam routes.

After line 3 (`import { motion, AnimatePresence } from 'framer-motion';`), add:

```typescript
import { usePathname } from 'next/navigation';
```

Inside the component, after line 14 (`const [documentReady, setDocumentReady] = useState(false);`), add:

```typescript
const pathname = usePathname();
```

After line 16 (`const MIN_ANIMATION_TIME = 800;`), add:

```typescript
// Skip splash on landing pages — they need instant LCP
const isLandingPage = pathname?.includes('/sajam2026');
```

Then update line 64 (the SSR null return) to also skip for landing pages:

Change:
```typescript
if (!mounted) return null;
if (!isVisible && !hasAnimated) return null;
```

To:
```typescript
if (!mounted) return null;
if (isLandingPage) return null;
if (!isVisible && !hasAnimated) return null;
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build 2>&1 | tail -10`
Expected: Build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/SplashScreen.tsx
git commit -m "perf(sajam2026): skip SplashScreen on landing pages

Landing pages like /sajam2026 skip the 800ms splash overlay
so LCP content is visible immediately. Regular pages still
show the splash on first visit."
```

---

### Task 3: Remove Framer Motion from Navbar (Shared Bundle Reduction)

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

Navbar imports `motion` from framer-motion (line 6) but only uses it for the mobile menu open/close animation (lines 148-179). Since framer-motion is also used in SplashScreen, it stays in the shared bundle. But removing it from Navbar reduces one of the two import points, and future SplashScreen lazy-loading would then fully eliminate it from the critical path.

Replace the `<motion.div>` mobile menu with a CSS transition.

- [ ] **Step 1: Replace framer-motion with CSS in Navbar**

In `src/components/layout/Navbar.tsx`:

**a)** Remove the framer-motion import (line 6):
```typescript
// DELETE: import { motion } from 'framer-motion';
```

**b)** Replace the mobile menu `<motion.div>` (lines 146-178) with a CSS-transitioned `<div>`:

Change from:
```tsx
{isOpen && (
  <motion.div
    id="mobile-menu"
    role="menu"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="md:hidden bg-white shadow-lg absolute left-0 right-0 w-full"
  >
```

To:
```tsx
{isOpen && (
  <div
    id="mobile-menu"
    role="menu"
    className="md:hidden bg-white shadow-lg absolute left-0 right-0 w-full animate-fade-in-up"
    style={{ animationDuration: '0.2s' }}
  >
```

And change the closing tag from `</motion.div>` to `</div>`.

The `animate-fade-in-up` class from `globals.css` provides the same fade-in-from-top effect.

- [ ] **Step 2: Verify build compiles**

Run: `npm run build 2>&1 | tail -10`
Expected: Build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "perf: remove framer-motion from Navbar

Replace motion.div mobile menu animation with CSS animate-fade-in-up.
Removes one of two framer-motion import points in the shared bundle.
Combined with future SplashScreen lazy-loading, this eliminates
~54KB from the critical JS path."
```

---

### Task 4: Lazy-load SplashScreen to Remove Framer Motion from Shared Bundle

**Files:**
- Modify: `src/app/client-layout.tsx`

SplashScreen is the remaining framer-motion import. Lazy-loading it with `next/dynamic` moves framer-motion out of the shared JS bundle into a separate async chunk. Since SplashScreen already returns `null` on SSR and on landing pages, lazy-loading it has zero visual impact.

- [ ] **Step 1: Lazy-load SplashScreen in client-layout.tsx**

In `src/app/client-layout.tsx`, replace line 6:

```typescript
import SplashScreen from '@/components/SplashScreen';
```

With:

```typescript
import dynamic from 'next/dynamic';
const SplashScreen = dynamic(() => import('@/components/SplashScreen'), { ssr: false });
```

Keep line 54 (`<SplashScreen />`) unchanged — it will now load asynchronously.

- [ ] **Step 2: Verify build compiles and check bundle**

Run: `npm run build 2>&1 | grep "First Load"`
Expected: The "First Load JS shared by all" should decrease from 103KB since framer-motion is no longer in the shared chunk.

- [ ] **Step 3: Commit**

```bash
git add src/app/client-layout.tsx
git commit -m "perf: lazy-load SplashScreen to remove framer-motion from shared bundle

SplashScreen is now dynamically imported with ssr:false. This moves
framer-motion (~54KB gz) out of the critical shared JS bundle into
an async chunk. Combined with Navbar framer-motion removal, the
shared bundle should drop significantly."
```

---

### Task 5: Final Verification

- [ ] **Step 1: Full production build**

Run: `npm run build 2>&1 | grep -E "First Load|sajam"`
Expected: First Load JS shared should be notably smaller than 103KB. Sajam2026 should still show `●` (SSG).

- [ ] **Step 2: Compare bundle sizes**

Previous: `First Load JS shared by all: 103 kB`
New: Should be ~50-60 kB (framer-motion removed from shared).

- [ ] **Step 3: Push**

```bash
git push origin main
```

**Expected result:** Mobile LCP drops from 3.5s to ~2.0-2.5s. Combined with reduced JS bundle, the mobile score should rise from 71 to 80+. Re-test on pagespeed.web.dev after deployment.
