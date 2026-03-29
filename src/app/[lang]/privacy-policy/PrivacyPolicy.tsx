"use client";

import React, { useState, useEffect } from 'react';
import { useTranslate } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PrivacyPolicy() {
  const { t } = useTranslate();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const currentLang = pathname?.split('/')[1] || 'sr';

  useEffect(() => {
    setMounted(true);
  }, []);

  const tr = (key: string, fallback: string): string => {
    if (!mounted) return fallback;
    const result = t(`legal:privacy.${key}`);
    return typeof result === 'string' ? result : fallback;
  };

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
            {tr('title', 'Privacy Policy')}
          </h1>
          <p className="text-sm text-center text-nextpixel-gray mb-8">
            {tr('lastUpdated', 'Last updated: February 20, 2026')}
          </p>

          <div className="space-y-8">
            {/* 1. Data Controller */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('controller.title', '1. Data Controller')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed mb-3">
                {tr('controller.content', 'The data controller responsible for the processing of your personal data is:')}
              </p>
              <div className="text-nextpixel-gray leading-relaxed space-y-1">
                <p className="font-semibold text-nextpixel-dark">{tr('controller.name', 'NextPixel')}</p>
                <p>{tr('controller.address', 'Jovana Ducica 15, 78400 Gradiska, Republika Srpska, Bosnia and Herzegovina')}</p>
                <p>Email: <a href="mailto:info@nextpixel.dev" className="text-nextpixel-blue hover:underline">{tr('controller.email', 'info@nextpixel.dev')}</a></p>
                <p>Tel: <a href="tel:+38766603900" className="text-nextpixel-blue hover:underline">{tr('controller.phone', '+387 66 603 900')}</a></p>
              </div>
            </section>

            {/* 2. Legal Basis */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('legalBasis.title', '2. Legal Basis for Processing')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed mb-3">
                {tr('legalBasis.content', 'We process your personal data based on the following legal grounds under Article 6(1) of the GDPR:')}
              </p>
              <ul className="list-disc list-inside text-nextpixel-gray space-y-2 text-sm leading-relaxed">
                <li>{tr('legalBasis.consent', 'Consent (Art. 6(1)(a) GDPR): For analytics cookies, marketing cookies, and newsletter subscriptions. You may withdraw your consent at any time.')}</li>
                <li>{tr('legalBasis.contract', 'Contract Performance (Art. 6(1)(b) GDPR): For processing contact form submissions to respond to your inquiries about our services.')}</li>
                <li>{tr('legalBasis.legitimate', 'Legitimate Interest (Art. 6(1)(f) GDPR): For website security, fraud prevention, and essential website functionality (e.g., language preference cookies).')}</li>
              </ul>
            </section>

            {/* 3. Data We Collect */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('dataCollected.title', '3. Data We Collect')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed mb-3">
                {tr('dataCollected.content', 'We collect the following categories of personal data:')}
              </p>
              <ul className="list-disc list-inside text-nextpixel-gray space-y-2 text-sm leading-relaxed">
                <li>{tr('dataCollected.contactForm', 'Contact Form Data: Name, email address, phone number (optional), subject, and message content.')}</li>
                <li>{tr('dataCollected.analytics', 'Analytics Data: IP address (anonymized), browser type and version, operating system, pages visited, time of visit, and session duration.')}</li>
                <li>{tr('dataCollected.cookies', 'Cookie Data: Language preference and consent preferences - stored in cookies on your device.')}</li>
                <li>{tr('dataCollected.technical', 'Technical Data: Server logs including IP address, browser type, and access times.')}</li>
              </ul>
            </section>

            {/* 4. Purposes of Processing */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('purposes.title', '4. Purposes of Processing')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed mb-3">
                {tr('purposes.content', 'We process your personal data for the following purposes:')}
              </p>
              <p className="text-nextpixel-gray text-sm leading-relaxed">
                {tr('purposes.list', 'To respond to your contact form inquiries and provide information about our services; To analyze website traffic and improve our website (with your consent); To measure the effectiveness of marketing campaigns (with your consent); To ensure the technical functionality and security of our website; To comply with legal obligations.')}
              </p>
            </section>

            {/* 5. Third-Party Services */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('thirdParties.title', '5. Third-Party Services')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed mb-3">
                {tr('thirdParties.content', 'We use the following third-party services that may process your personal data:')}
              </p>
              <ul className="list-disc list-inside text-nextpixel-gray space-y-2 text-sm leading-relaxed">
                <li>{tr('thirdParties.ga', 'Google Analytics (Google LLC, USA): Website analytics service.')}</li>
                <li>{tr('thirdParties.meta', 'Meta Pixel (Meta Platforms Inc., USA): Marketing analytics service.')}</li>
                <li>{tr('thirdParties.vercel', 'Vercel Analytics (Vercel Inc., USA): First-party, privacy-friendly website analytics.')}</li>
                <li>{tr('thirdParties.resend', 'Resend (Resend Inc.): Email delivery service used to process contact form submissions.')}</li>
              </ul>
            </section>

            {/* 6. International Data Transfers */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('dataTransfers.title', '6. International Data Transfers')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed">
                {tr('dataTransfers.content', 'Some of our third-party service providers are located in the United States. These transfers are protected by the EU-US Data Privacy Framework.')}
              </p>
            </section>

            {/* 7. Data Retention */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('retention.title', '7. Data Retention')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed mb-3">
                {tr('retention.content', 'We retain your personal data only for as long as necessary for the purposes for which it was collected:')}
              </p>
              <ul className="list-disc list-inside text-nextpixel-gray space-y-2 text-sm leading-relaxed">
                <li>{tr('retention.contactData', 'Contact form data: Retained for 12 months after your inquiry, then deleted.')}</li>
                <li>{tr('retention.analyticsCookies', 'Analytics cookies (_ga, _ga_*): Up to 2 years, set by Google Analytics.')}</li>
                <li>{tr('retention.marketingCookies', 'Marketing cookies (_fbp): 90 days, set by Meta Pixel.')}</li>
                <li>{tr('retention.consentCookie', 'Consent preferences cookie: 1 year.')}</li>
                <li>{tr('retention.languageCookie', 'Language preference cookie: 1 year.')}</li>
              </ul>
            </section>

            {/* 8. Your Rights Under GDPR */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('rights.title', '8. Your Rights Under GDPR')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed mb-3">
                {tr('rights.content', 'Under the General Data Protection Regulation (GDPR), you have the following rights regarding your personal data:')}
              </p>
              <ul className="list-disc list-inside text-nextpixel-gray space-y-2 text-sm leading-relaxed">
                <li>{tr('rights.access', 'Right of Access (Art. 15 GDPR): You have the right to request information about the personal data we hold about you.')}</li>
                <li>{tr('rights.rectification', 'Right to Rectification (Art. 16 GDPR): You have the right to request correction of inaccurate personal data.')}</li>
                <li>{tr('rights.erasure', 'Right to Erasure (Art. 17 GDPR): You have the right to request deletion of your personal data.')}</li>
                <li>{tr('rights.restriction', 'Right to Restriction (Art. 18 GDPR): You have the right to request restriction of processing.')}</li>
                <li>{tr('rights.portability', 'Right to Data Portability (Art. 20 GDPR): You have the right to receive your personal data in a structured, commonly used format.')}</li>
                <li>{tr('rights.objection', 'Right to Object (Art. 21 GDPR): You have the right to object to the processing of your personal data.')}</li>
                <li>{tr('rights.withdrawConsent', 'Right to Withdraw Consent (Art. 7(3) GDPR): You can withdraw your consent at any time.')}</li>
                <li>{tr('rights.complaint', 'Right to Lodge a Complaint: You have the right to lodge a complaint with a supervisory authority.')}</li>
              </ul>
            </section>

            {/* 9. Cookies */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('cookies.title', '9. Cookies')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed">
                {tr('cookies.content', 'For detailed information about the cookies we use, their purposes, and how to manage them, please see our Cookie Policy.')}
              </p>
              <p className="mt-2">
                <Link
                  href={`/${currentLang}/cookie-policy`}
                  className="text-nextpixel-blue hover:underline font-medium"
                >
                  {tr('cookies.link', 'View Cookie Policy')}
                </Link>
              </p>
            </section>

            {/* 10. Children's Privacy */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('children.title', '10. Children\'s Privacy')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed">
                {tr('children.content', 'Our website and services are not directed to children under the age of 16. We do not knowingly collect personal data from children under 16.')}
              </p>
            </section>

            {/* 11. Changes */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('changes.title', '11. Changes to This Privacy Policy')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed">
                {tr('changes.content', 'We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors.')}
              </p>
            </section>

            {/* 12. Contact Us */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('contact.title', '12. Contact Us')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed mb-3">
                {tr('contact.content', 'If you have any questions about this Privacy Policy, wish to exercise your data protection rights, or have concerns about how we handle your personal data, please contact us:')}
              </p>
              <p className="text-nextpixel-gray text-sm leading-relaxed">
                {tr('contact.details', 'NextPixel, Jovana Ducica 15, 78400 Gradiska, Republika Srpska, Bosnia and Herzegovina. Email: info@nextpixel.dev, Phone: +387 66 603 900')}
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
