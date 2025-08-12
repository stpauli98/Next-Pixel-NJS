# Google Search Console Setup - Kompletan Vodič

## Korak 1: Kreiranje naloga i dodavanje sajta

1. **Idite na Google Search Console**
   - URL: https://search.google.com/search-console
   - Ulogujte se sa Google nalogom

2. **Dodajte property (sajt)**
   - Kliknite "Add property"
   - Imate 2 opcije:

   ### Opcija A: Domain (preporučeno)
   - Unesite: `nextpixel.com` (bez https://)
   - Verifikuje sve poddomene i protokole
   - Zahteva DNS verifikaciju

   ### Opcija B: URL prefix
   - Unesite: `https://nextpixel.com`
   - Lakša verifikacija
   - Morate dodati svaku varijantu posebno

## Korak 2: Verifikacija vlasništva

### Metod 1: HTML tag (najlakši)
1. Izaberite "HTML tag" metod
2. Kopirajte meta tag (ceo tag ili samo content vrednost)
3. Već je dodat u `src/app/layout.tsx`
4. Deploy-ujte izmene
5. Kliknite "Verify" u Search Console

### Metod 2: DNS verifikacija (za Domain property)
1. Kopirajte TXT record
2. Idite na vaš domain registrar (GoDaddy, Namecheap, etc.)
3. Dodajte TXT record:
   - Name: @ ili nextpixel.com
   - Value: google-site-verification=xxxxx
4. Sačekajte 5-10 minuta
5. Kliknite "Verify"

### Metod 3: Google Analytics
- Automatski verifikovan ako imate GA4 na sajtu

## Korak 3: Dodavanje Sitemap-a

1. **U Search Console idite na "Sitemaps"**
2. **Dodajte sledeće sitemap-ove:**
   ```
   sitemap.xml
   sr/sitemap.xml
   en/sitemap.xml
   de/sitemap.xml
   ```
3. **Kliknite "Submit" za svaki**

## Korak 4: Konfiguracija

### Postavke koje treba podesiti:

1. **International Targeting**
   - Idite na Legacy tools → International Targeting
   - Language: Ne targetujte specifičan jezik (imate više jezika)
   - Country: Serbia (ako ciljate prvenstveno Srbiju)

2. **URL Parameters** 
   - Ostavite Google da automatski detektuje

3. **Crawl Stats**
   - Proverite da li Google uspešno crawl-uje sajt

4. **Mobile Usability**
   - Proverite da nema grešaka

5. **Core Web Vitals**
   - Pratite performanse

## Korak 5: Važne stvari za praćenje

### Nedeljno proveravajte:
- **Performance**: Klikovi, impresije, CTR, pozicija
- **Coverage**: Indeksirane stranice, greške
- **Mobile Usability**: Problemi sa mobilnim
- **Core Web Vitals**: LCP, FID, CLS

### Mesečno proveravajte:
- **Links**: External i internal linkovi
- **Manual Actions**: Da li ima penala
- **Security Issues**: Sigurnosni problemi

## Korak 6: Optimizacija nakon postavke

### Prve nedelje:
1. **Request Indexing** za važne stranice:
   - Homepage
   - Location pages (Belgrade, Novi Sad, Niš)
   - Services pages
   
2. **Inspect URLs** da vidite kako Google vidi stranice

3. **Fix Coverage Issues** ako ih ima

### Prvi mesec:
1. **Analizirajte Search Queries**
   - Koje ključne reči donose saobraćaj
   - Gde imate dobre pozicije
   - Gde možete da se popravite

2. **Optimize meta descriptions** za stranice sa niskim CTR

3. **Add more internal links** između povezanih stranica

## Korak 7: Integracija sa drugim alatima

### Google Analytics 4:
1. U GA4: Admin → Search Console Links
2. Kliknite "Link"
3. Izaberite Search Console property
4. Izaberite GA4 stream

### Google Ads (ako koristite):
- Automatski se povezuje preko Google naloga

## Korak 8: Napredne tehnike

### Rich Results:
1. Testirajte sa: https://search.google.com/test/rich-results
2. Proverite FAQ, LocalBusiness, BreadcrumbList schema

### PageSpeed Insights:
1. Integrisano u Search Console
2. Pratite Core Web Vitals
3. Target: sve zeleno (Good)

### Search Analytics API:
- Za automatsko praćenje podataka
- Python/Node.js skripte za analizu

## Troubleshooting

### Česte greške i rešenja:

**"Verification failed"**
- Proverite da li je meta tag tačno postavljen
- Sačekajte da se sajt deploy-uje
- Clear browser cache

**"Sitemap couldn't be read"**
- Proverite URL sitemap-a
- Testirajte: https://nextpixel.com/sitemap.xml
- Proverite robots.txt

**"Discovered - currently not indexed"**
- Normalno za nove sajtove
- Request manual indexing
- Poboljšajte kvalitet sadržaja

**"Crawled - currently not indexed"**
- Sadržaj nije dovoljno kvalitetan
- Duplicate content issues
- Dodajte više jedinstvenog sadržaja

## Korisni linkovi

- [Search Console Help](https://support.google.com/webmasters)
- [Google Search Central](https://developers.google.com/search)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [PageSpeed Insights](https://pagespeed.web.dev/)

## Checklist za NextPixel

- [ ] Verifikovati sajt
- [ ] Dodati sve sitemap-ove
- [ ] Proveriti Mobile Usability
- [ ] Request indexing za homepage
- [ ] Request indexing za location pages
- [ ] Povezati sa GA4
- [ ] Postaviti email notifikacije
- [ ] Proveriti Core Web Vitals
- [ ] Testirati Rich Results