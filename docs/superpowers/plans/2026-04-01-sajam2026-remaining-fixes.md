# Sajam2026 Remaining Fixes — DE Translation, Contrast, Hero Banner

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix remaining gaps: add German translation for sajam2026, add DE hero banner key, fix pricing note contrast — so all 3 locales render correct content and pass accessibility checks.

**Architecture:** Create `de/sajam2026.json` with German translations. Register it in `i18n.ts`. Add `sajamBanner` key to `de/hero.json`. Fix contrast on SajamOffer pricing note. Also add German FAQ to structured-data.ts.

**Tech Stack:** Next.js 15, TypeScript, i18next, Tailwind CSS

---

## File Map

| File | Change | Purpose |
|------|--------|---------|
| `src/locales/de/sajam2026.json` | Create | German translation for sajam2026 page |
| `src/i18n.ts` | Modify | Import and register DE sajam2026 namespace |
| `src/locales/de/hero.json` | Modify | Add `sajamBanner` key |
| `src/components/sajam/SajamOffer.tsx` | Modify | Fix contrast on pricing note |
| `src/config/seo/structured-data.ts` | Modify | Add German FAQ translations |

---

### Task 1: Create German Translation for Sajam2026

**Files:**
- Create: `src/locales/de/sajam2026.json`
- Modify: `src/i18n.ts`

- [ ] **Step 1: Create the DE translation file**

Create `src/locales/de/sajam2026.json` with this content:

```json
{
  "meta": {
    "title": "Nikola von NextPixel | Wir haben uns auf der Messe getroffen",
    "description": "Kostenlose Analyse Ihrer digitalen Präsenz. Messeangebot — Websites ab 999 KM. Schreiben Sie mir auf WhatsApp."
  },
  "hero": {
    "headline": "Webdesign & IT-Lösungen für Unternehmen | Messe Gradiška 2026",
    "greeting": "Hallo! Ich bin",
    "name": "Nikola",
    "role": "Gründer von NextPixel",
    "title": "Schön, Sie auf der Messe in Gradiška kennengelernt zu haben.",
    "description": "Wenn Sie bereit sind, darüber zu sprechen, wie Ihre digitale Präsenz Ihnen mehr Kunden in Gradiška, Banja Luka und der gesamten Republika Srpska bringen kann — melden Sie sich. Unverbindlich, ohne Druck.",
    "cta": "Schreiben Sie mir auf WhatsApp",
    "ctaSubtext": "Ich antworte innerhalb weniger Stunden",
    "ctaSecondary": "Sehen Sie unsere Arbeiten"
  },
  "problems": {
    "sectionTitle": "Erkennen Sie sich wieder?",
    "sectionSubtitle": "Das sind die Probleme, die ich am häufigsten von Unternehmern auf Messen in Gradiška und Banja Luka höre",
    "items": [
      {
        "problem": "Sie haben keine Website",
        "description": "Kunden können Sie online nicht finden. Ihre Konkurrenz mit Website bekommt Ihre potenziellen Kunden.",
        "solution": "Professionelle Website ab 999 KM — fertig in 4-6 Wochen."
      },
      {
        "problem": "Ihre Website ist veraltet",
        "description": "Die Website sieht aus wie 2015. Funktioniert nicht auf dem Handy. Ist langsam. Kunden gehen zur Konkurrenz.",
        "solution": "Redesign, das Ihr Erscheinungsbild modernisiert und die Ergebnisse verbessert."
      },
      {
        "problem": "Sie verkaufen nicht online",
        "description": "Ihre Produkte sind hervorragend, aber Sie verkaufen nur lokal. Das Internet kann ganz BiH für Sie öffnen.",
        "solution": "Online-Shop ab 2.499 KM — Ihre Produkte für alle verfügbar."
      }
    ]
  },
  "proof": {
    "sectionTitle": "Einige unserer Arbeiten",
    "sectionSubtitle": "Projekte für Kunden aus Gradiška, Banja Luka und der Region",
    "stats": {
      "projects": "50+",
      "projectsLabel": "abgeschlossene Projekte",
      "years": "5+",
      "yearsLabel": "Jahre Erfahrung",
      "clients": "40+",
      "clientsLabel": "zufriedene Kunden"
    },
    "projects": [
      {
        "title": "Šarena Čarolija",
        "category": "Online-Shop",
        "description": "Online-Shop für handgemachte Kerzen. Die Inhaberin verkauft jetzt in ganz BiH.",
        "image": "/images/SarenCarolijaHero.webp",
        "url": "https://www.sarenacarolija.com/"
      },
      {
        "title": "Global Grinding",
        "category": "Website",
        "description": "Industrieunternehmen — Website in 4 Sprachen, die internationale Kunden anzieht.",
        "image": "/images/globalgrinding.webp",
        "url": "https://www.globalgrinding.eu/"
      },
      {
        "title": "Termin Online App",
        "category": "Buchungssystem",
        "description": "SaaS-App für Online-Terminbuchung. Reduziert verpasste Termine um 80%.",
        "image": "/images/TerminiAppHero.webp",
        "url": "https://www.terminonlineapp.com/"
      }
    ],
    "viewProject": "Website ansehen",
    "testimonial": {
      "quote": "NextPixel hat uns eine Website erstellt, die 3-4 Anfragen pro Woche bringt. Vorher waren wir nur auf Empfehlungen angewiesen.",
      "name": "Marko P.",
      "role": "GP Konstrukt d.o.o., Gradiška"
    }
  },
  "offer": {
    "sectionTitle": "Messeangebot",
    "badge": "Gültig bis 30. Juni 2026.",
    "title": "Sonderkonditionen für Messebesucher",
    "description": "Alle, mit denen ich auf der Messe in Gradiška gesprochen habe, haben Anspruch auf eine kostenlose Analyse und 20% Rabatt. Wir sind spezialisiert auf Webdesign in Gradiška und Banja Luka — von Geschäftswebsites bis Online-Shops.",
    "includes": [
      "Kostenlose Analyse Ihrer aktuellen Website oder digitalen Präsenz",
      "Personalisiertes Angebot innerhalb von 48 Stunden",
      "20% Rabatt auf alle Dienstleistungen",
      "Zahlung in bis zu 6 zinslosen Raten"
    ],
    "pricing": {
      "title": "Projekte starten ab",
      "items": [
        "999 KM — Geschäftswebsite",
        "2.499 KM — Online-Shop",
        "1.499 KM — Buchungssystem"
      ],
      "note": "Preise inkl. Messerabatt. Keine versteckten Kosten."
    },
    "process": {
      "title": "Wie geht es weiter?",
      "steps": [
        "Schreiben Sie mir auf WhatsApp — sagen Sie mir, was Sie brauchen",
        "Ich sende Ihnen innerhalb von 48h ein Angebot mit Preisen und Fristen",
        "Wenn es passt — wir starten. Wenn nicht — keine Verpflichtungen."
      ]
    }
  },
  "cta": {
    "title": "Melden Sie sich, wenn Sie bereit sind.",
    "subtitle": "Unverbindlich, ohne Druck. Wir besprechen Ihre Bedürfnisse und schauen, was Sinn macht.",
    "whatsapp": "Schreiben Sie mir auf WhatsApp",
    "whatsappSubtext": "Schnellster Weg — Antwort am selben Tag",
    "phone": "+387 66 603 900",
    "phoneLabel": "Rufen Sie mich an",
    "email": "info@nextpixel.dev",
    "emailLabel": "E-Mail senden",
    "address": "Jovana Dučića 15, 78400 Gradiška, Republika Srpska",
    "servicesLink": "Alle unsere Dienstleistungen ansehen",
    "portfolioLink": "Unser komplettes Portfolio ansehen",
    "closing": "— Nikola, NextPixel"
  }
}
```

- [ ] **Step 2: Register DE sajam2026 in i18n.ts**

In `src/i18n.ts`, add the import after line 66 (after `import bookingFaqDE`):

```typescript
import deSajam2026 from './locales/de/sajam2026.json';
```

Then add to the `de` resources object (after line 130, before the closing `}`):

```typescript
    sajam2026: deSajam2026
```

So `de` block becomes:
```typescript
  de: {
    ...existing entries...,
    bookingFaq: bookingFaqDE,
    sajam2026: deSajam2026
  }
```

- [ ] **Step 3: Verify build compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: Build completes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/locales/de/sajam2026.json src/i18n.ts
git commit -m "i18n(sajam2026): add German translation

Complete DE translation for all 5 sections with geo keywords
(Gradiška, Banja Luka, Republika Srpska). Register namespace
in i18n.ts so /de/sajam2026 renders German content."
```

---

### Task 2: Add German Hero Banner + Fix Contrast

**Files:**
- Modify: `src/locales/de/hero.json`
- Modify: `src/components/sajam/SajamOffer.tsx`

- [ ] **Step 1: Add sajamBanner to DE hero.json**

In `src/locales/de/hero.json`, add before the closing `}`:

```json
"sajamBanner": "Messeangebot — Websites ab 999 KM. Mehr erfahren →"
```

- [ ] **Step 2: Fix pricing note contrast in SajamOffer**

In `src/components/sajam/SajamOffer.tsx`, line 74, change:

```tsx
<p className="text-xs text-gray-500 mt-2">
```

to:

```tsx
<p className="text-xs text-gray-400 mt-2">
```

- [ ] **Step 3: Verify build compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: Build completes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/locales/de/hero.json src/components/sajam/SajamOffer.tsx
git commit -m "fix: add DE hero banner key + fix offer pricing contrast

Add sajamBanner translation for German homepage hero.
Fix text-gray-500 to text-gray-400 on pricing note for
better contrast on dark backgrounds (a11y)."
```

---

### Task 3: Add German FAQ to Structured Data

**Files:**
- Modify: `src/config/seo/structured-data.ts`

The `getLocalizedFaqs()` function handles `en` and defaults to Serbian. German visitors see Serbian FAQ. Add German case.

- [ ] **Step 1: Add German FAQ block**

In `src/config/seo/structured-data.ts`, in the `getLocalizedFaqs` function, add a `de` case after the `en` block (before the Serbian default return):

```typescript
  if (locale === 'de') {
    return [
      {
        '@type': 'Question',
        name: 'Wie viel kostet eine Website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Die Kosten hängen von Komplexität und Funktionalität ab. Einfache Websites ab 500€, Geschäftswebsites ab 2.000€, komplexe Anwendungen ab 5.000€. Kontaktieren Sie uns für ein kostenloses, individuelles Angebot.'
        }
      },
      {
        '@type': 'Question',
        name: 'Wie lange dauert die Erstellung einer Website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Die Dauer hängt vom Projektumfang ab. Einfache Websites 2-3 Wochen, Geschäftswebsites 4-8 Wochen, komplexe Anwendungen 3-6 Monate. Wir erstellen immer einen detaillierten Zeitplan vor Beginn.'
        }
      },
      {
        '@type': 'Question',
        name: 'Bieten Sie Website-Wartung an?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, wir bieten komplette Wartungspakete mit regelmäßigen Updates, Sicherheitsüberwachung, Performance-Optimierung, Inhaltsaktualisierungen und 24/7 technischem Support.'
        }
      },
      {
        '@type': 'Question',
        name: 'Welche Technologien verwenden Sie?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wir verwenden modernste Technologien: Next.js, React, Node.js, TypeScript, Tailwind CSS für Frontend; Node.js, Python, PostgreSQL, MongoDB für Backend; AWS, Vercel, Docker für Deployment.'
        }
      },
      {
        '@type': 'Question',
        name: 'Bieten Sie SEO-Optimierung an?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, alle unsere Websites kommen mit grundlegender SEO-Optimierung. Wir bieten auch erweiterte SEO-Services wie technische Optimierung, Content-Marketing, lokales SEO und Linkbuilding-Strategien.'
        }
      }
    ];
  }
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: Build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/config/seo/structured-data.ts
git commit -m "seo: add German FAQ translations to structured data

German visitors now see German FAQ schema instead of Serbian
fallback. Completes 3-locale coverage for FAQ structured data."
```

---

### Task 4: Final Verification

- [ ] **Step 1: Full build**

Run: `npm run build 2>&1 | tail -30`
Expected: Build completes with 0 errors.

- [ ] **Step 2: Verify DE page renders German content**

```bash
curl -s http://localhost:3004/de/sajam2026 | grep -o 'Messeangebot' | head -1
```
Expected: `Messeangebot` (German text, not Serbian fallback).

- [ ] **Step 3: Verify DE FAQ structured data**

```bash
curl -s http://localhost:3004/de/sajam2026 | grep -o 'application/ld+json">[^<]*' | sed 's/application\/ld+json">//' | python3 -c "
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
Expected: `Wie viel kostet eine Website?` (German, not Serbian).

- [ ] **Step 4: Push**

```bash
git push origin main
```
