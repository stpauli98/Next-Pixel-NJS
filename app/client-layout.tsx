"use client";

import React from 'react';
import { LanguageProvider } from '../src/context/LanguageContext';
import '../src/i18n'; // Import i18n configuration

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
