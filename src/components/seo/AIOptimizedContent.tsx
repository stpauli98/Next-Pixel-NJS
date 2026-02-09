'use client';

import React from 'react';

/**
 * AI-Optimized Content Component
 * Provides structured data for better AI tool understanding
 */

interface AIOptimizedContentProps {
  title: string;
  description: string;
  services: string[];
  location?: string;
  keywords?: string[];
}

export default function AIOptimizedContent({
  title,
  description,
  services,
  location = 'Gradiska, Republika Srpska, BiH',
  keywords = []
}: AIOptimizedContentProps) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What services does NextPixel offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `NextPixel offers comprehensive web development services including ${services.join(', ')}. We serve clients in ${location} and internationally with professional, modern, and scalable solutions.`
        }
      },
      {
        '@type': 'Question',
        name: 'Why choose NextPixel for web development?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NextPixel uses modern technologies like React, Next.js, and Node.js to deliver professional web development, with local presence in Bosnia and Herzegovina and competitive pricing with European quality standards.'
        }
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to build a website with NextPixel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Website development costs vary based on project requirements. Basic websites start from 500 EUR, business websites from 2000 EUR, and e-commerce platforms from 5000 EUR. We offer free consultations and detailed quotes.'
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
}
