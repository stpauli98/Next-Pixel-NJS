"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsent } from '@/context/CookieConsentContext';
import { useTranslate } from '@/context/LanguageContext';

export default function CookieConsentBanner() {
  const { consentGiven, acceptAll, rejectNonEssential, savePreferences } = useCookieConsent();
  const { t } = useTranslate();
  const pathname = usePathname();
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const currentLang = pathname?.split('/')[1] || 'sr';

  const tr = (key: string, fallback: string): string => {
    const result = t(`legal:consent.${key}`);
    return typeof result === 'string' ? result : fallback;
  };

  if (consentGiven) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="max-w-4xl mx-auto bg-nextpixel-dark border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div>
              <h3 className="text-white font-heading font-bold text-lg mb-2">
                {tr('title', 'Cookie Settings')}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {tr('description', 'We use cookies to enhance your browsing experience, analyze site traffic, and serve personalized content. You can choose which cookies you allow.')}
                {' '}
                <Link
                  href={`/${currentLang}/cookie-policy`}
                  className="text-nextpixel-turquoise hover:underline"
                >
                  {tr('cookiePolicy', 'Cookie Policy')}
                </Link>
              </p>
            </div>

            {/* Customize Panel */}
            <AnimatePresence>
              {showCustomize && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 py-3 border-t border-white/10">
                    {/* Necessary - always on */}
                    <label className="flex items-center justify-between">
                      <div>
                        <span className="text-white text-sm font-medium">
                          {tr('necessary', 'Necessary')}
                        </span>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {tr('necessaryDesc', 'Required for the website to function properly.')}
                        </p>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={true}
                          disabled
                          className="sr-only"
                        />
                        <div className="w-10 h-6 bg-nextpixel-turquoise rounded-full opacity-60 cursor-not-allowed">
                          <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                        </div>
                      </div>
                    </label>

                    {/* Analytics */}
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-white text-sm font-medium">
                          {tr('analytics', 'Analytics')}
                        </span>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {tr('analyticsDesc', 'Help us understand how visitors interact with our website.')}
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={analyticsEnabled}
                        onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                        className={`relative w-10 h-6 rounded-full transition-colors ${
                          analyticsEnabled ? 'bg-nextpixel-turquoise' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            analyticsEnabled ? 'right-0.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </label>

                    {/* Marketing */}
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-white text-sm font-medium">
                          {tr('marketing', 'Marketing')}
                        </span>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {tr('marketingDesc', 'Used to deliver relevant advertisements and track campaigns.')}
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={marketingEnabled}
                        onClick={() => setMarketingEnabled(!marketingEnabled)}
                        className={`relative w-10 h-6 rounded-full transition-colors ${
                          marketingEnabled ? 'bg-nextpixel-turquoise' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            marketingEnabled ? 'right-0.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {!showCustomize ? (
                <>
                  <button
                    onClick={acceptAll}
                    className="flex-1 px-5 py-2.5 bg-nextpixel-turquoise text-nextpixel-dark font-medium rounded-lg hover:opacity-90 transition-opacity text-sm"
                  >
                    {tr('acceptAll', 'Accept All')}
                  </button>
                  <button
                    onClick={rejectNonEssential}
                    className="flex-1 px-5 py-2.5 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors text-sm"
                  >
                    {tr('rejectNonEssential', 'Reject Non-Essential')}
                  </button>
                  <button
                    onClick={() => setShowCustomize(true)}
                    className="flex-1 px-5 py-2.5 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors text-sm"
                  >
                    {tr('customize', 'Customize')}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => savePreferences({ analytics: analyticsEnabled, marketing: marketingEnabled })}
                    className="flex-1 px-5 py-2.5 bg-nextpixel-turquoise text-nextpixel-dark font-medium rounded-lg hover:opacity-90 transition-opacity text-sm"
                  >
                    {tr('savePreferences', 'Save Preferences')}
                  </button>
                  <button
                    onClick={acceptAll}
                    className="flex-1 px-5 py-2.5 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors text-sm"
                  >
                    {tr('acceptAll', 'Accept All')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
