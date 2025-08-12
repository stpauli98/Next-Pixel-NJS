# Google Analytics Verifikacija i Setup

## ✅ **Google Analytics je IMPLEMENTIRAN!**

Vaš Google Analytics kod `G-K5TQSBLLQF` je pravilno postavljen u sajtu.

## 📊 **Kako da proverite da li radi:**

### **1. Real-Time Test (ODMAH)**

1. **Otvorite Google Analytics**: https://analytics.google.com
2. Idite na **Reports** → **Real-time**
3. **U drugom tabu otvorite vaš sajt**: https://nextpixel.dev
4. **Vratite se na GA Real-time** - trebalo bi da vidite:
   - **1 active user** (to ste vi)
   - **Page views** pokazuje koju stranicu gledate
   - **Geographic** pokazuje vašu lokaciju

### **2. Google Tag Assistant (Chrome Extension)**

1. **Instalirajte**: [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. **Otvorite vaš sajt**: https://nextpixel.dev
3. **Kliknite na extension ikonu** - trebalo bi da vidite:
   - ✅ Google Analytics GA4 - `G-K5TQSBLLQF`
   - Status: "Tag fired successfully"

### **3. Browser Developer Tools**

1. Otvorite sajt: https://nextpixel.dev
2. Pritisnite **F12** → **Network** tab
3. U filter ukucajte: `gtag`
4. Refresh stranicu
5. Trebalo bi da vidite:
   - `gtag/js?id=G-K5TQSBLLQF` - Status 200
   - `collect` request sa vašim GA ID

## 🔧 **Šta je implementirano:**

### **Next.js Script komponenta**
```jsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-K5TQSBLLQF"
  strategy="afterInteractive"
/>
```
- ✅ Učitava se **nakon** što se stranica renderuje
- ✅ Ne usporava initial load
- ✅ Optimizovano za performanse

### **gtag konfiguracija**
```javascript
gtag('config', 'G-K5TQSBLLQF', {
  page_path: window.location.pathname,
});
```
- ✅ Trackuje sve stranice
- ✅ Dinamički pathname tracking
- ✅ Radi sa client-side navigation

## 📈 **Šta ćete videti u GA4:**

### **Posle 24 sata:**
- **Users**: Broj jedinstvenih posetilaca
- **Sessions**: Broj sesija
- **Page views**: Koje stranice su najposećenije
- **Average engagement time**: Koliko ljudi ostaju
- **Traffic source**: Odakle dolaze (Google, direktno, social)

### **Posle 7 dana:**
- **User demographics**: Zemlje, gradovi, jezici
- **Technology**: Devices (mobile/desktop), browsers
- **Pages and screens**: Najpopularnije stranice
- **Events**: Scroll, clicks, form submissions

### **Posle 30 dana:**
- **Trends**: Da li saobraćaj raste
- **User retention**: Koliko se ljudi vraća
- **Conversions**: Ako postavite goals
- **User flow**: Kako se kreću kroz sajt

## 🎯 **Sledeći koraci (OPCIONO):**

### **1. Postavite Conversion Events**
U GA4 idite na **Configure** → **Events** → **Create event**:
- Contact form submission
- Phone number click
- Email click
- Location page views

### **2. Povežite sa Search Console**
U GA4: **Admin** → **Search Console links** → povezuje se automatski

### **3. Enhanced Measurement**
Admin → Data Streams → vaš stream → Enhanced measurement → uključite sve:
- Page views ✅
- Scrolls ✅
- Outbound clicks ✅
- Site search ✅
- Video engagement ✅
- File downloads ✅

### **4. Audiences**
Configure → Audiences → Create:
- "Belgrade visitors" - ljudi koji posećuju Belgrade location page
- "Engaged users" - >2 min na sajtu
- "Potential clients" - posećuju Contact page

## ⚠️ **Troubleshooting:**

### **Ako NE vidite podatke:**

1. **Proverite da li je sajt deploy-ovan**
   - Mora biti live na https://nextpixel.dev
   - Ne radi na localhost

2. **Proverite AdBlocker**
   - Isključite AdBlocker i uBlock
   - Ili testirajte u Incognito

3. **Čekajte 24h**
   - Ponekad treba do 24h da se pojave prvi podaci
   - Real-time bi trebalo da radi odmah

4. **Proverite Measurement ID**
   - Mora biti `G-K5TQSBLLQF` svuda
   - Ne GA-XXXXXXXXX ili UA-XXXXXXX

## ✅ **Status vaše implementacije:**

- ✅ **GA4 script**: Pravilno učitan
- ✅ **Measurement ID**: G-K5TQSBLLQF (ispravljen)
- ✅ **Page tracking**: Automatski za sve stranice
- ✅ **Performance**: Optimizovan sa afterInteractive
- ✅ **Next.js 13+**: Koristi Script component

**Vaš Google Analytics je 100% spreman!**

Samo deploy-ujte izmene:
```bash
git add .
git commit -m "Fix Google Analytics measurement ID"
git push
```

Posle deploy-a, posetite sajt i proverite Real-time u GA4!