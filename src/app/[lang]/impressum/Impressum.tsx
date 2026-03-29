"use client";

import React, { useState, useEffect } from 'react';
import { useTranslate } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Impressum() {
  const { t } = useTranslate();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const currentLang = pathname?.split('/')[1] || 'sr';

  useEffect(() => {
    setMounted(true);
  }, []);

  const tr = (key: string, fallback: string): string => {
    if (!mounted) return fallback;
    const result = t(`legal:impressum.${key}`);
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-nextpixel-blue font-heading">
            {tr('title', 'Legal Notice')}
          </h1>

          <div className="space-y-8">
            {/* Company Information */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('company.title', '1. Company Information')}
              </h2>
              <div className="text-nextpixel-gray leading-relaxed space-y-1">
                <p className="font-semibold text-nextpixel-dark">NextPixel</p>
                <p>{tr('company.type', 'Digital Agency / Web Development')}</p>
                <p>Jovana Ducica 15</p>
                <p>78400 Gradiska</p>
                <p>Republika Srpska, {tr('company.country', 'Bosnia and Herzegovina')}</p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('contact.title', '2. Contact')}
              </h2>
              <div className="text-nextpixel-gray leading-relaxed space-y-1">
                <p>{tr('contact.phone', 'Phone')}: <a href="tel:+38766603900" className="text-nextpixel-blue hover:underline">+387 66 603 900</a></p>
                <p>{tr('contact.email', 'Email')}: <a href="mailto:info@nextpixel.dev" className="text-nextpixel-blue hover:underline">info@nextpixel.dev</a></p>
                <p>{tr('contact.website', 'Website')}: <a href="https://nextpixel.dev" className="text-nextpixel-blue hover:underline">https://nextpixel.dev</a></p>
              </div>
            </section>

            {/* Responsible Person */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('responsible.title', '3. Responsible for Content')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed">
                {tr('responsible.content', 'Responsible for the content according to § 55 Abs. 2 RStV:')}
              </p>
              <div className="text-nextpixel-gray mt-2 space-y-1">
                <p className="font-semibold text-nextpixel-dark">NextPixel</p>
                <p>Jovana Ducica 15, 78400 Gradiska</p>
                <p>Republika Srpska, {tr('company.country', 'Bosnia and Herzegovina')}</p>
              </div>
            </section>

            {/* EU Dispute Resolution */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('dispute.title', '4. EU Dispute Resolution')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed">
                {tr('dispute.content', 'The European Commission provides a platform for online dispute resolution (ODR):')}
              </p>
              <p className="mt-2">
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nextpixel-blue hover:underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p className="text-nextpixel-gray mt-2 leading-relaxed">
                {tr('dispute.note', 'We are not obligated and not willing to participate in dispute resolution proceedings before a consumer arbitration board.')}
              </p>
            </section>

            {/* Content Liability */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('contentLiability.title', '5. Liability for Content')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed">
                {tr('contentLiability.content', 'The contents of our pages were created with the greatest care. However, we cannot guarantee the accuracy, completeness, and timeliness of the content. As a service provider, we are responsible for our own content on these pages according to general laws. However, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.')}
              </p>
            </section>

            {/* Links Liability */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('linksLiability.title', '6. Liability for Links')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed">
                {tr('linksLiability.content', 'Our website contains links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any liability for this third-party content. The respective provider or operator of the pages is always responsible for the content of the linked pages.')}
              </p>
            </section>

            {/* Copyright */}
            <section>
              <h2 className="text-xl font-bold mb-3 text-nextpixel-blue">
                {tr('copyright.title', '7. Copyright')}
              </h2>
              <p className="text-nextpixel-gray leading-relaxed">
                {tr('copyright.content', 'The content and works created by the site operators on these pages are subject to copyright law. Duplication, processing, distribution, and any form of exploitation beyond the scope of copyright law require the written consent of the respective author or creator.')}
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
