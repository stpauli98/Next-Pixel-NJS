'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface SmoothScrollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({ href, children, className }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Check if it's a hash link
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      
      // If we're navigating to a different page
      if (path && path !== window.location.pathname) {
        // Navigate to the new page with hash
        router.push(href);
      } else {
        // Same page, just scroll
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // Regular navigation
      router.push(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default SmoothScrollLink;