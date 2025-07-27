// /src/components/blogComponents/ShareButtons.tsx
"use client"

import React from 'react';
import { Facebook, Twitter, Linkedin } from "lucide-react"
import { logError } from '@/utils/logger';

interface ShareButtonsProps {
  url: string
  title: string
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  try {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const handleShareClick = (platform: string, shareUrl: string) => {
      try {
        // For better accessibility and error handling
        if (typeof window !== 'undefined') {
          window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
        }
      } catch (error) {
        logError(`Share button error for ${platform}`, error as Error, {
          component: 'ShareButtons',
          platform,
          url,
          title
        });
        // Fallback to direct navigation
        window.location.href = shareUrl;
      }
    };

    return (
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => handleShareClick('Facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)}
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
          aria-label="Share on Facebook"
          type="button"
        >
          <Facebook size={20} />
        </button>
        <button
          onClick={() => handleShareClick('Twitter', `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`)}
          className="text-blue-400 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
          aria-label="Share on Twitter"
          type="button"
        >
          <Twitter size={20} />
        </button>
        <button
          onClick={() => handleShareClick('LinkedIn', `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}`)}
          className="text-blue-700 hover:text-blue-900 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
          aria-label="Share on LinkedIn"
          type="button"
        >
          <Linkedin size={20} />
        </button>
      </div>
    );
  } catch (error) {
    logError('ShareButtons render error', error as Error, {
      component: 'ShareButtons',
      url,
      title
    });
    
    // Fallback UI
    return (
      <div className="flex gap-3 mt-6">
        <p className="text-sm text-gray-500">Share buttons temporarily unavailable</p>
      </div>
    );
  }
}
