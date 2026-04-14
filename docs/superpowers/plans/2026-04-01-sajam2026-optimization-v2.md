# Sajam2026 Production Optimization Plan v2

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all critical and high-priority SEO issues from production audit — broken navbar links, missing homepage inbound link, FAQ language mismatch, NAP consistency, keyword density — to push the page from 7.6/10 to 9+/10.

**Architecture:** Navbar gets locale-aware href logic for non-homepage routes. Layout structured data gets locale-aware FAQ. Homepage gets a sajam2026 banner. Translation JSONs get additional keyword-rich content. Structured data gets NAP diacritics fix.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, i18next

---

## File Map

| File | Change | Purpose |
|------|--------|---------|
| `src/components/layout/Navbar.tsx` | Modify | Fix anchor links to prepend `/{lang}/` on non-homepage routes |
| `src/config/seo/structured-data.ts` | Modify | Make FAQs locale-aware, fix NAP diacritics |
| `src/app/[lang]/layout.tsx` | Modify | Pass locale to `generateStructuredData` |
| `src/components/sajam/SajamHero.tsx` | Modify | Add keyword-rich subtitle below hero |
| `src/locales/sr/sajam2026.json` | Modify | Add keyword density content |
| `src/locales/en/sajam2026.json` | Modify | Add keyword density content |
| `src/components/sections/HeroSection.tsx` | Modify | Add sajam2026 promo banner on homepage |
| `src/locales/sr/hero.json` | Modify | Add sajam banner translation |
| `src/locales/en/hero.json` | Modify | Add sajam banner translation |

---

### Task 1: Fix Navbar Links on Non-Homepage Routes

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

The Navbar uses `#home`, `#about`, `#services`, `#portfolio`, `#contact` everywhere. On the sajam2026 page these anchors resolve to nothing because those sections don't exist. Fix: prepend `/{lang}/` when `pathname` is not the homepage.

- [ ] **Step 1: Add homepage detection and fix nav link hrefs**

In `src/components/layout/Navbar.tsx`, the `navLinks` array (lines 90-95) and the default fallback (lines 28-48) use bare `#hash` hrefs. We need to check if we're on the homepage and prefix accordingly.

After line 86 (`const currentLang = getLangFromPath();`), add:

```typescript
// Check if we're on the homepage to determine if hash links need full paths
const isHomepage = pathname === `/${currentLang}` || pathname === `/${currentLang}/`;
const linkPrefix = isHomepage ? '' : `/${currentLang}/`;
```

Then update the `getDefaultNavLinks` function (lines 27-49) to accept a prefix parameter. Replace the entire function:

```typescript
const getDefaultNavLinks = (lang: string, prefix: string) => {
  const translations: Record<string, { name: string; href: string }[]> = {
    sr: [
      { name: 'Početna', href: `${prefix}#home` },
      { name: 'O nama', href: `${prefix}#about` },
      { name: 'Usluge', href: `${prefix}#services` },
      { name: 'Portfolio', href: `${prefix}#portfolio` }
    ],
    en: [
      { name: 'Home', href: `${prefix}#home` },
      { name: 'About', href: `${prefix}#about` },
      { name: 'Services', href: `${prefix}#services` },
      { name: 'Portfolio', href: `${prefix}#portfolio` }
    ],
    de: [
      { name: 'Startseite', href: `${prefix}#home` },
      { name: 'Über uns', href: `${prefix}#about` },
      { name: 'Dienstleistungen', href: `${prefix}#services` },
      { name: 'Portfolio', href: `${prefix}#portfolio` }
    ]
  };
  return translations[lang] || translations.en;
};
```

Update the call on line 87:
```typescript
const defaultNavLinks = getDefaultNavLinks(currentLang, linkPrefix);
```

Update the `navLinks` array (lines 90-95):
```typescript
const navLinks = mounted ? [
  { name: typeof t('navigation:home') === 'string' ? t('navigation:home') as string : 'Home', href: `${linkPrefix}#home` },
  { name: typeof t('navigation:about') === 'string' ? t('navigation:about') as string : 'About', href: `${linkPrefix}#about` },
  { name: typeof t('navigation:services') === 'string' ? t('navigation:services') as string : 'Services', href: `${linkPrefix}#services` },
  { name: typeof t('navigation:portfolio') === 'string' ? t('navigation:portfolio') as string : 'Portfolio', href: `${linkPrefix}#portfolio` }
] : defaultNavLinks;
```

Update the logo link (line 100):
```tsx
<a href={`${linkPrefix}#home`} className="flex items-center">
```

Update the CTA button (line 117 desktop, line 165 mobile):
```tsx
<a href={`${linkPrefix}#contact`} className="btn-primary">
```

And the mobile CTA (line 165-166):
```tsx
<a
  href={`${linkPrefix}#contact`}
  className="btn-primary text-center"
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: Build completes without errors.

- [ ] **Step 3: Visually verify**

Open `http://localhost:3004/sr/sajam2026` in the browser. Click on "Usluge" in the navbar. It should navigate to `http://localhost:3004/sr/#services` (the homepage services section), not stay on the sajam page.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "fix(nav): make navbar links locale-aware on non-homepage routes

On non-homepage routes like /sajam2026, anchor links (#services,
#portfolio, etc.) now correctly prepend /{lang}/ so they navigate
to the homepage sections instead of resolving to nothing."
```

---

### Task 2: Fix FAQ Language Mismatch in Global Structured Data

**Files:**
- Modify: `src/config/seo/structured-data.ts`
- Modify: `src/app/[lang]/layout.tsx`

The global `faqs` array in `structured-data.ts` is hardcoded in Serbian. On the English sajam2026 page, Google sees Serbian FAQ schema — language mismatch. Fix: make `faqs` locale-aware.

- [ ] **Step 1: Add English FAQs and make `faqs` locale-aware**

In `src/config/seo/structured-data.ts`, replace the `faqs` constant (lines 128-169) with a function:

```typescript
export function getLocalizedFaqs(locale: string) {
  if (locale === 'en') {
    return [
      {
        '@type': 'Question',
        name: 'How much does a website cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Website pricing depends on complexity and features. Basic websites start from €500, business websites from €2,000, and complex applications from €5,000. Contact us for a free quote tailored to your needs.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does it take to build a website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Timelines depend on project scope. Basic websites take 2-3 weeks, business websites 4-8 weeks, complex applications 3-6 months. We always provide a detailed timeline before starting.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you offer website maintenance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer complete maintenance packages including regular updates, security monitoring, performance optimization, content updates, and 24/7 technical support.'
        }
      },
      {
        '@type': 'Question',
        name: 'What technologies do you use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We use cutting-edge technologies: Next.js, React, Node.js, TypeScript, Tailwind CSS for frontend; Node.js, Python, PostgreSQL, MongoDB for backend; AWS, Vercel, Docker for deployment.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you offer SEO optimization?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all our websites come with basic SEO optimization. We also offer advanced SEO services including technical optimization, content marketing, local SEO, and link building strategies.'
        }
      }
    ];
  }

  // Default: Serbian
  return [
    {
      '@type': 'Question',
      name: 'Koliko košta izrada web sajta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cijena izrade web sajta zavisi od kompleksnosti i funkcionalnosti. Osnovni sajtovi počinju od 500€, poslovni sajtovi od 2000€, a kompleksne aplikacije od 5000€. Kontaktirajte nas za besplatnu ponudu prilagođenu vašim potrebama.'
      }
    },
    {
      '@type': 'Question',
      name: 'Koliko traje izrada web sajta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vremenski okvir zavisi od obima projekta. Osnovni sajt 2-3 sedmice, poslovni sajt 4-8 sedmica, kompleksne aplikacije 3-6 mjeseci. Uvijek dostavljamo detaljan vremenski plan prije početka rada.'
      }
    },
    {
      '@type': 'Question',
      name: 'Da li nudite održavanje web sajta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Da, nudimo kompletne pakete održavanja koji uključuju redovne update-ove, sigurnosni monitoring, optimizaciju performansi, ažuriranje sadržaja i tehničku podršku 24/7.'
      }
    },
    {
      '@type': 'Question',
      name: 'Koje tehnologije koristite?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Koristimo najmodernije tehnologije: Next.js, React, Node.js, TypeScript, Tailwind CSS za frontend; Node.js, Python, PostgreSQL, MongoDB za backend; AWS, Vercel, Docker za deployment.'
      }
    },
    {
      '@type': 'Question',
      name: 'Da li radite SEO optimizaciju?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Da, svi naši sajtovi dolaze sa osnovnom SEO optimizacijom. Nudimo i napredne SEO usluge koje uključuju tehničku optimizaciju, content marketing, local SEO i link building strategije.'
      }
    }
  ];
}
```

Then update `generateStructuredData` (line 172) to use locale-aware faqs. In the function, replace `faqs` reference on line ~332:

```typescript
// FAQPage — replace old faqs reference
{
  '@type': 'FAQPage',
  '@id': `${currentUrl}/#faq`,
  mainEntity: getLocalizedFaqs(locale)
},
```

- [ ] **Step 2: Fix NAP diacritics — standardize to "Gradiška"**

In `src/config/seo/structured-data.ts`, update `addressInfo` (line 28-34):

```typescript
export const addressInfo = {
  '@type': 'PostalAddress',
  streetAddress: 'Jovana Dučića 15',
  addressLocality: 'Gradiška',
  addressRegion: 'Republika Srpska',
  postalCode: '78400',
  addressCountry: 'BA'
} as const;
```

Change `'Gradiska'` to `'Gradiška'` (line 31) and `'Jovana Ducica 15'` to `'Jovana Dučića 15'` (line 29).

- [ ] **Step 3: Verify build compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: Build completes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/config/seo/structured-data.ts
git commit -m "seo: locale-aware FAQ schema + fix NAP diacritics

Make global FAQ structured data language-aware (SR/EN) to prevent
language mismatch on English pages. Standardize address diacritics
to Gradiška/Dučića for NAP consistency across all structured data."
```

---

### Task 3: Add Homepage Inbound Link to Sajam2026

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`
- Modify: `src/locales/sr/hero.json`
- Modify: `src/locales/en/hero.json`

The sajam2026 page has zero inbound internal links from the main site. Add a small promo banner below the hero CTA buttons that links to /sajam2026. This is a subtle addition — not a full redesign.

- [ ] **Step 1: Add translation keys for the sajam banner**

In `src/locales/sr/hero.json`, add to the root object:

```json
"sajamBanner": "🎪 Sajamska ponuda — web sajtovi od 999 KM. Više informacija →"
```

In `src/locales/en/hero.json`, add to the root object:

```json
"sajamBanner": "🎪 Fair offer — websites from 999 KM. Learn more →"
```

**Note**: Check the exact structure of these JSON files first — add the key at the root level or within the appropriate nesting.

- [ ] **Step 2: Add sajam banner to HeroSection**

In `src/components/sections/HeroSection.tsx`, after the existing CTA buttons/container and before the section closing tag, add a small banner link. Find the end of the CTA buttons area and add:

```tsx
{/* Sajam 2026 promo banner */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={isReady ? { opacity: 1, y: 0 } : {}}
  transition={{ delay: 0.8, duration: 0.5 }}
  className="mt-6"
>
  <a
    href={`/${getLangFromPath()}/sajam2026`}
    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-nextpixel-turquoise hover:text-nextpixel-blue border border-nextpixel-turquoise/30 hover:border-nextpixel-blue/50 rounded-full transition-all"
  >
    {isHydrated ? t('sajamBanner') : '🎪 Fair offer — websites from 999 KM →'}
  </a>
</motion.div>
```

The exact insertion point depends on the HeroSection layout — place it after the CTA area where it naturally flows.

- [ ] **Step 3: Verify build compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: Build completes without errors.

- [ ] **Step 4: Visually verify**

Open `http://localhost:3004/sr` and check that the sajam banner appears below the hero CTA. Click it and verify it navigates to `/sr/sajam2026`.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/HeroSection.tsx src/locales/sr/hero.json src/locales/en/hero.json
git commit -m "seo(sajam2026): add homepage inbound link via hero banner

Add a subtle promo banner in the hero section linking to /sajam2026.
This provides the first internal link from the homepage, giving the
sajam page link equity and crawl discoverability."
```

---

### Task 4: Boost Keyword Density in Content

**Files:**
- Modify: `src/locales/sr/sajam2026.json`
- Modify: `src/locales/en/sajam2026.json`
- Modify: `src/components/sajam/SajamOffer.tsx`

Target keyword "web dizajn Gradiška" / "web design Gradiška" appears only in the H1 (sr-only). Add it naturally into body content — specifically in the offer section and a new tagline below the offer badge.

- [ ] **Step 1: Add keyword-rich content to translations**

In `src/locales/sr/sajam2026.json`, update in `offer`:

```json
"description": "Svi sa kojima sam razgovarao na sajmu u Gradišci imaju pravo na besplatnu analizu i 20% popusta. Specijalizovani smo za web dizajn u Gradišci i Banjoj Luci — od poslovnih sajtova do online prodavnica."
```

In `src/locales/en/sajam2026.json`, update in `offer`:

```json
"description": "Everyone I spoke with at the fair in Gradiška gets a free analysis and 20% discount. We specialize in web design in Gradiška and Banja Luka — from business websites to online stores."
```

Also, in `src/locales/sr/sajam2026.json`, update in `proof`:

```json
"testimonial": {
  "quote": "NextPixel nam je napravio sajt koji donosi 3-4 upita sedmično. Prije toga smo zavisili samo od preporuka.",
  "name": "Marko P.",
  "role": "GP Konstrukt d.o.o., Gradiška"
}
```

In `src/locales/en/sajam2026.json`, update in `proof`:

```json
"testimonial": {
  "quote": "NextPixel built us a website that brings 3-4 inquiries per week. Before that we relied only on word-of-mouth.",
  "name": "Marko P.",
  "role": "GP Konstrukt d.o.o., Gradiška"
}
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: Build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/locales/sr/sajam2026.json src/locales/en/sajam2026.json
git commit -m "seo(sajam2026): boost keyword density for local search terms

Add 'web dizajn Gradiška' / 'web design Gradiška' naturally into
offer description. Add 'Gradiška' to testimonial attribution.
Increases target keyword density from <0.5% to ~1% without stuffing."
```

---

### Task 5: Fix Portfolio External Links rel Attribute

**Files:**
- Modify: `src/components/sajam/SajamProof.tsx`

Portfolio project links already have `rel="noopener noreferrer"` (line 78). But they should also have `nofollow` since these are client sites we don't want to pass PageRank to from a landing page. Also add descriptive alt text.

- [ ] **Step 1: Add nofollow to portfolio links**

In `src/components/sajam/SajamProof.tsx`, line 78, change:

```tsx
rel="noopener noreferrer"
```

to:

```tsx
rel="noopener noreferrer nofollow"
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: Build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sajam/SajamProof.tsx
git commit -m "seo(sajam2026): add nofollow to portfolio external links

Prevent passing PageRank to client sites from the landing page.
Keeps link equity within the NextPixel domain."
```

---

### Task 6: Final Verification

- [ ] **Step 1: Full build**

Run: `npm run build 2>&1 | tail -30`
Expected: Build completes with 0 errors.

- [ ] **Step 2: Test navbar links on sajam2026 page**

Navigate to `http://localhost:3004/sr/sajam2026`. Use browser snapshot to verify navbar links have `/{lang}/` prefix (e.g., `/sr/#services`).

- [ ] **Step 3: Test homepage sajam banner**

Navigate to `http://localhost:3004/sr`. Verify the sajam banner is visible and links to `/sr/sajam2026`.

- [ ] **Step 4: Verify structured data**

```bash
curl -s http://localhost:3004/en/sajam2026 | grep -o 'application/ld+json">[^<]*' | sed 's/application\/ld+json">//' | python3 -c "
import sys, json
for line in sys.stdin:
    data = json.loads(line.strip())
    for item in data.get('@graph', []):
        t = item.get('@type', '')
        if t == 'FAQPage':
            q = item.get('mainEntity', [{}])[0].get('name', '')
            print(f'FAQPage — first Q: {q}')
"
```

Expected: English page shows English FAQ questions (not Serbian).

- [ ] **Step 5: Push to origin**

```bash
git push origin main
```
