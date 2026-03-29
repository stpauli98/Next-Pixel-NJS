"use client";

import React, { useState, useEffect } from 'react';
import { useTranslate } from '@/context/LanguageContext';
import { useCookieConsent } from '@/context/CookieConsentContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CookiePolicy() {
  const { t } = useTranslate();
  const { resetConsent } = useCookieConsent();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const currentLang = pathname?.split('/')[1] || 'sr';

  useEffect(() => {
    setMounted(true);
  }, []);

  const tr = (key: string, fallback: string): string => {
    if (!mounted) return fallback;
    const result = t(`legal:cookiePolicy.${key}`);
    return typeof result === 'string' ? result : fallback;
  };

  const sections = [
    'whatAreCookies',
    'howWeUse',
    'thirdPartyCookies',
    'manageCookies',
    'changes',
    'contact',
  ];

  const sectionFallbacks: Record<string, { title: string; content: string }> = {
    whatAreCookies: {
      title: '1. What Are Cookies',
      content: 'Cookies are small text files that are stored on your device when you visit a website. They are used to remember your preferences and provide a better browsing experience.',
    },
    howWeUse: {
      title: '2. How We Use Cookies',
      content: 'We use cookies for essential website functionality, analytics, and marketing purposes. You can manage your preferences at any time.',
    },
    thirdPartyCookies: {
      title: '5. Third-Party Cookies',
      content: 'Some cookies are set by third-party services that appear on our pages. We do not control these cookies.',
    },
    manageCookies: {
      title: '6. Managing Your Cookie Preferences',
      content: 'You can change your cookie preferences at any time by clicking the button below or through your browser settings.',
    },
    changes: {
      title: '7. Changes to This Policy',
      content: 'We may update this Cookie Policy from time to time. Any changes will be posted on this page.',
    },
    contact: {
      title: '8. Contact Us',
      content: 'If you have any questions about our use of cookies, please contact us at info@nextpixel.dev.',
    },
  };

  const cookieTable = [
    { name: 'i18nextLng', type: tr('typeNecessary', 'Necessary'), duration: tr('duration1Year', '1 year'), provider: 'NextPixel (First-party)', purpose: tr('purposeLanguage', 'Saves your language preference') },
    { name: 'cookie_consent', type: tr('typeNecessary', 'Necessary'), duration: tr('duration1Year', '1 year'), provider: 'NextPixel (First-party)', purpose: tr('purposeConsent', 'Stores your cookie consent preferences') },
    { name: '_ga, _ga_*', type: tr('typeAnalytics', 'Analytics'), duration: tr('duration2Years', '2 years'), provider: 'Google LLC', purpose: tr('purposeGA', 'Google Analytics - tracks website usage and performance') },
    { name: '_fbp', type: tr('typeMarketing', 'Marketing'), duration: tr('duration90Days', '90 days'), provider: 'Meta Platforms Inc.', purpose: tr('purposeFB', 'Meta Pixel - tracks ad campaign effectiveness') },
  ];

  return (
    <div className="bg-nextpixel-light py-16 md:py-24 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-nextpixel-blue font-heading">
            {tr('title', 'Cookie Policy')}
          </h1>
          <p className="text-sm text-center text-nextpixel-gray mb-8">
            {tr('lastUpdated', 'Last updated')}: 20.02.2026
          </p>

          <div className="space-y-8">
            {/* What Are Cookies */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('whatAreCookies.title', sectionFallbacks.whatAreCookies.title)}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed">
                {tr('whatAreCookies.content', sectionFallbacks.whatAreCookies.content)}
              </p>
            </section>

            {/* How We Use */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('howWeUse.title', sectionFallbacks.howWeUse.title)}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed">
                {tr('howWeUse.content', sectionFallbacks.howWeUse.content)}
              </p>
            </section>

            {/* Cookie Table */}
            <section>
              <h2 className="text-xl font-bold mb-4 text-nextpixel-blue">
                {tr('cookieTable.title', '3. Cookies We Use')}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-nextpixel-blue text-white">
                      <th className="p-3 text-left font-medium">{tr('cookieTable.name', 'Cookie')}</th>
                      <th className="p-3 text-left font-medium">{tr('cookieTable.type', 'Type')}</th>
                      <th className="p-3 text-left font-medium">{tr('cookieTable.duration', 'Duration')}</th>
                      <th className="p-3 text-left font-medium">{tr('cookieTable.provider', 'Provider')}</th>
                      <th className="p-3 text-left font-medium">{tr('cookieTable.purpose', 'Purpose')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieTable.map((cookie, index) => (
                      <tr key={cookie.name} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="p-3 font-mono text-xs text-nextpixel-dark">{cookie.name}</td>
                        <td className="p-3 text-nextpixel-gray">{cookie.type}</td>
                        <td className="p-3 text-nextpixel-gray">{cookie.duration}</td>
                        <td className="p-3 text-nextpixel-gray">{cookie.provider}</td>
                        <td className="p-3 text-nextpixel-gray">{cookie.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Categories explanation */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('categories.title', '4. Cookie Categories')}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-nextpixel-dark">{tr('categories.necessary', 'Necessary Cookies')}</h3>
                  <p className="text-nextpixel-gray text-sm leading-relaxed">
                    {tr('categories.necessaryDesc', 'These cookies are essential for the website to function properly. They enable basic functions such as page navigation and access to secure areas. The website cannot function properly without these cookies.')}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-nextpixel-dark">{tr('categories.analytics', 'Analytics Cookies')}</h3>
                  <p className="text-nextpixel-gray text-sm leading-relaxed">
                    {tr('categories.analyticsDesc', 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website.')}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-nextpixel-dark">{tr('categories.marketing', 'Marketing Cookies')}</h3>
                  <p className="text-nextpixel-gray text-sm leading-relaxed">
                    {tr('categories.marketingDesc', 'These cookies are used to track visitors across websites to display relevant advertisements. They are set by third-party advertising networks with our permission.')}
                  </p>
                </div>
              </div>
            </section>

            {/* Third-party */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('thirdPartyCookies.title', sectionFallbacks.thirdPartyCookies.title)}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed">
                {tr('thirdPartyCookies.content', sectionFallbacks.thirdPartyCookies.content)}
              </p>
              <ul className="list-disc list-inside text-nextpixel-gray mt-2 space-y-1 text-sm">
                <li>Google Analytics - <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-nextpixel-blue hover:underline">Google Privacy Policy</a></li>
                <li>Meta Pixel - <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-nextpixel-blue hover:underline">Meta Privacy Policy</a></li>
              </ul>
            </section>

            {/* Manage Preferences */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('manageCookies.title', sectionFallbacks.manageCookies.title)}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed mb-4">
                {tr('manageCookies.content', sectionFallbacks.manageCookies.content)}
              </p>
              <button
                onClick={() => resetConsent()}
                className="px-6 py-2.5 bg-nextpixel-turquoise text-nextpixel-dark font-medium rounded-lg hover:opacity-90 transition-opacity text-sm"
              >
                {tr('manageCookies.button', 'Change Cookie Preferences')}
              </button>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('changes.title', sectionFallbacks.changes.title)}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed">
                {tr('changes.content', sectionFallbacks.changes.content)}
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('contact.title', sectionFallbacks.contact.title)}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed">
                {tr('contact.content', sectionFallbacks.contact.content)}
              </p>
            </section>
          </div>

          {/* Back to Home */}
          <div className="mt-10 text-center">
            <Link
              href={`/${currentLang}`}
              className="inline-block px-6 py-3 bg-nextpixel-blue text-white font-medium rounded-md hover:opacity-90 transition-opacity"
            >
              {mounted ? (typeof t('common:backToHome') === 'string' ? t('common:backToHome') as string : 'Back to Home') : 'Back to Home'}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
