# GA4 Event Tracking Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add GA4 event tracking for contact form submissions and contact link clicks in ContactSection.tsx

**Architecture:** Import existing `trackEvent` and `trackConversion` from analytics config. Add a `useRef` for form_start dedup, `onFocus` on form, tracking calls in submit handler, and `onClick` handlers on contact links rendered via `.map()`.

**Tech Stack:** React (existing), GA4 gtag (existing helpers)

**Spec:** `docs/superpowers/specs/2026-03-15-ga4-event-tracking-design.md`

---

## Chunk 1: Implementation

### Task 1: Add GA4 tracking to ContactSection

**Files:**
- Modify: `src/components/sections/ContactSection.tsx`

- [ ] **Step 1: Add imports and ref**

At line 2, add `useRef` to the React import. Add analytics import after line 9:

```tsx
import React, { useState, useEffect, useRef } from 'react';
```

```tsx
import { trackEvent, trackConversion } from '@/config/analytics';
```

- [ ] **Step 2: Add formStartTracked ref**

Inside the component, after the `submitSuccess` state (line 24), add:

```tsx
const formStartTracked = useRef(false);
```

- [ ] **Step 3: Add form onFocus handler**

Add a handler function after the `handleSubmit` function (after line 85):

```tsx
const handleFormFocus = () => {
  if (!formStartTracked.current) {
    formStartTracked.current = true;
    trackEvent('form_start', 'contact', 'contact_form');
  }
};
```

Then change the `<form>` tag at line 198 from:

```tsx
<form onSubmit={handleSubmit} className="w-full">
```

to:

```tsx
<form onSubmit={handleSubmit} onFocus={handleFormFocus} className="w-full">
```

- [ ] **Step 4: Add tracking to successful form submission**

In the `handleSubmit` function, after `setSubmitSuccess(true)` (line 62) and before the `logInfo` call, add:

```tsx
trackConversion('contact');
formStartTracked.current = false;
```

- [ ] **Step 5: Add tracking to failed form submission (non-200 response)**

In the `else` branch (line 68), after `setSubmitError(...)`, add:

```tsx
trackEvent('form_error', 'contact', data.error || 'API error');
```

- [ ] **Step 6: Add tracking to catch block (network error)**

In the `catch` block (line 76), after `setSubmitError(...)`, add:

```tsx
trackEvent('form_error', 'contact', error instanceof Error ? error.message : 'Network error');
```

- [ ] **Step 7: Add trackingType to contactInfo array**

Update the `ContactInfoItem` interface (line 88) to include:

```tsx
interface ContactInfoItem {
  icon: typeof FaEnvelope | typeof FaPhone | typeof FaWhatsapp | typeof FaLocationDot;
  titleKey: string;
  info?: string;
  infoKey?: string;
  link: string;
  trackingType: 'email' | 'phone' | 'whatsapp' | 'address';
}
```

Add `trackingType` to each item in the `contactInfo` array:

```tsx
{ icon: FaEnvelope, titleKey: 'contact:info.email', info: 'pixelnext9@gmail.com', link: 'mailto:pixelnext9@gmail.com', trackingType: 'email' },
{ icon: FaPhone, titleKey: 'contact:info.phone', info: '+387 66 603 900', link: 'tel:+38766603900', trackingType: 'phone' },
{ icon: FaWhatsapp, titleKey: 'contact:info.whatsapp', info: '+387 66 603 900', link: 'https://wa.me/message/U4Z7GJU4ZSL5M1', trackingType: 'whatsapp' },
{ icon: FaLocationDot, titleKey: 'contact:info.address', infoKey: 'contact:info.addressDetails', link: 'https://maps.google.com/?q=Gradiska', trackingType: 'address' },
```

- [ ] **Step 8: Add onClick handler to contact links**

In the `.map()` render (line 356), change the `<a>` tag from:

```tsx
<a
  href={item.link}
  className="text-nextpixel-gray hover:text-nextpixel-blue transition-colors block"
>
```

to:

```tsx
<a
  href={item.link}
  className="text-nextpixel-gray hover:text-nextpixel-blue transition-colors block"
  onClick={() => trackEvent('contact_click', 'contact', item.trackingType)}
>
```

- [ ] **Step 9: Build and verify**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 10: Commit**

```bash
git add src/components/sections/ContactSection.tsx
git commit -m "feat(analytics): add GA4 event tracking for contact form and links"
```
