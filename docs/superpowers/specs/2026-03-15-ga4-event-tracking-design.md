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
| Failed form submission (API error) | `trackEvent('form_error', 'contact', error_message)` | `form_error` |

- `form_start` fires once per page load (use a ref flag to prevent duplicates)
- `trackConversion('contact')` fires both GA4 conversion and Meta Pixel Contact event

### Contact Link Click Events

| Element | Function Call | GA4 Event |
|---------|-------------|-----------|
| Phone link (`tel:`) | `trackEvent('click', 'contact', 'phone')` | `click` |
| Email link (`mailto:`) | `trackEvent('click', 'contact', 'email')` | `click` |
| WhatsApp link | `trackEvent('click', 'contact', 'whatsapp')` | `click` |

## Implementation Details

**File:** `src/components/sections/ContactSection.tsx`

### Form tracking

1. Import `trackEvent` and `trackConversion` from `@/config/analytics`
2. Add a `useRef<boolean>(false)` flag `formStartTracked` to fire `form_start` only once
3. Add `onFocus` handler to the `<form>` element that checks the ref and calls `trackEvent('form_start', ...)`
4. In the existing submit handler, after successful response: call `trackConversion('contact')`
5. In the existing submit handler, in the catch/error block: call `trackEvent('form_error', ...)`

### Link click tracking

1. Add `onClick` handlers to the phone, email, and WhatsApp `<a>` tags
2. Each handler calls `trackEvent('click', 'contact', '<type>')` without preventing default (link still works normally)

## Consent Handling

No changes needed. `trackEvent()` and `trackConversion()` already check `window.gtag` availability, which is gated by the cookie consent system. Events silently no-op when consent is not granted.

## GA4 Admin Setup (Manual)

After deploying, in GA4 Admin:
1. Go to Events > mark `conversion` as a Key Event
2. Verify events appear in Realtime report by submitting a test form

## Testing

1. Open site in production
2. Accept analytics cookies
3. Open GA4 Realtime report
4. Click phone/email/WhatsApp links > verify `click` events appear
5. Focus a form field > verify `form_start` event appears
6. Submit form > verify `conversion` event appears
