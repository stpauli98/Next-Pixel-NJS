'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OldBlogPostRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the new Serbian version of the blog post
    router.push('/blog/sr/why-website-2025');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-600">You are being redirected to the new blog location.</p>
      </div>
    </div>
  );
}