# GA4 Event Tracking for Contact Conversions

## Problem

Google Analytics shows `form_start = 1` and `key_events = 0` over 28 days. The `trackEvent()` and `trackConversion()` helpers exist in `src/config/analytics/index.tsx` but are never called from any component. No contact form submissions, phone clicks, email clicks, or WhatsApp clicks are tracked.

## Scope

Add event tracking to `ContactSection.tsx` only. No new files, no new components, no new dependencies.

## Events to Track

### Contact Form Events

| Trigger | Function Call | GA4 Event |
|---------|-------------|-----------|
| First focus on any form field | `trackEvent('form_start', 'contact', 'contact_form')` | `form_start` |
| Successful form submission (API returns 200) | `trackConversion('contact')` | `conversion` (type: contact) |
| Failed form submission (non-200 response OR network error) | `trackEvent('form_error', 'contact', error_message)` | `form_error` |

- `form_start` fires once per page load (use a ref flag to prevent duplicates); reset the ref after successful submission so repeat interactions are tracked
- `trackConversion('contact')` fires both GA4 conversion and Meta Pixel Contact event
- `form_error` must fire in BOTH the `!response.ok` branch AND the `catch` block

### Contact Link Click Events

| Element | Function Call | GA4 Event |
|---------|-------------|-----------|
| Phone link (`tel:`) | `trackEvent('contact_click', 'contact', 'phone')` | `contact_click` |
| Email link (`mailto:`) | `trackEvent('contact_click', 'contact', 'email')` | `contact_click` |
| WhatsApp link | `trackEvent('contact_click', 'contact', 'whatsapp')` | `contact_click` |

Note: Uses `contact_click` instead of `click` to avoid collision with GA4's automatically collected `click` event (enhanced measurement outbound clicks).

## Implementation Details

**File:** `src/components/sections/ContactSection.tsx`

### Form tracking

1. Import `trackEvent` and `trackConversion` from `@/config/analytics`
2. Add a `useRef<boolean>(false)` flag `formStartTracked` to fire `form_start` only once
3. Add `onFocus` handler to the `<form>` element that checks the ref and calls `trackEvent('form_start', ...)`
4. In the existing submit handler, after successful response (`response.ok`): call `trackConversion('contact')` and reset `formStartTracked.current = false`
5. In the existing submit handler, in the `else` branch (non-ok response): call `trackEvent('form_error', 'contact', statusText_or_message)`
6. In the existing submit handler, in the `catch` block: call `trackEvent('form_error', 'contact', error_message)`

### Link click tracking

Contact links are rendered from a `contactInfo` array via `.map()`. The array contains 4 items: phone, email, WhatsApp, and address (Google Maps).

1. Add a `trackingType` field to each item in the `contactInfo` array: `'phone'`, `'email'`, `'whatsapp'`, `'address'`
2. Inside the `.map()` render, add an `onClick` handler on each `<a>` tag that calls `trackEvent('contact_click', 'contact', item.trackingType)`
3. Do not prevent default — the link still works normally
4. Address/Maps clicks are also tracked for completeness

## Consent Handling

No changes needed. `trackEvent()` and `trackConversion()` already check `window.gtag` availability, which is gated by the cookie consent system. Events silently no-op when consent is not granted.

## GA4 Admin Setup (Manual)

After deploying, in GA4 Admin:
1. Go to Events > mark `conversion` as a Key Event
2. Verify events appear in Realtime report by submitting a test form

## Testing

Use a Vercel preview deployment or production. Analytics is gated to `NODE_ENV === 'production'` so local dev won't fire events.

1. Open the deployed site
2. Accept analytics cookies
3. Open GA4 Realtime report (or GA4 DebugView)
4. Click phone/email/WhatsApp links > verify `contact_click` events appear
5. Focus a form field > verify `form_start` event appears
6. Submit form > verify `conversion` event appears
7. Test error path: disconnect network or trigger API error > verify `form_error` appears
