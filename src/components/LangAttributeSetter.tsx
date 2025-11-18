'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Client component that dynamically sets the HTML lang attribute
 * based on the current route language parameter
 */
export default function LangAttributeSetter() {
  const pathname = usePathname();

  useEffect(() => {
    // Extract language from pathname (e.g., /de/blog -> de)
    const pathParts = pathname.split('/').filter(Boolean);
    const lang = pathParts[0];

    // Validate and set lang attribute
    if (lang && ['sr', 'en', 'de'].includes(lang)) {
      document.documentElement.lang = lang;
    } else {
      // Default to Serbian if no valid language detected
      document.documentElement.lang = 'sr';
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}
