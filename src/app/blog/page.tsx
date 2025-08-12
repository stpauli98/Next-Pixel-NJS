import React from 'react';
import { Metadata } from 'next';
import BlogNavbar from '@/components/blogComponents/BlogNavbar';
import BlogFooter from '@/components/blogComponents/BlogFooter';
import BlogCard from '@/components/blogComponents/BlogCard';
import { getBlogPosts } from '@/lib/blog';
import { pageMetadata } from '@/config/metadata';
import Link from 'next/link';

export const metadata: Metadata = pageMetadata.blog;

export default async function BlogPage() {
  // Get posts for all languages
  const srPosts = await getBlogPosts('sr');
  const enPosts = await getBlogPosts('en');
  const dePosts = await getBlogPosts('de');
  
  // Combine all posts with language info
  const allPosts = [
    ...srPosts.map(post => ({ ...post, lang: 'sr', langName: 'Srpski' })),
    ...enPosts.map(post => ({ ...post, lang: 'en', langName: 'English' })),
    ...dePosts.map(post => ({ ...post, lang: 'de', langName: 'Deutsch' }))
  ];
  
  // Sort by date
  allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col min-h-screen">
      <BlogNavbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="mt-20 text-4xl font-bold mb-4 text-center">NextPixel Blog</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Najnoviji članci o web razvoju i digitalnim rješenjima / Latest articles about web development
          </p>
          
          {/* Language filter links */}
          <div className="flex justify-center gap-4 mb-8">
            <Link 
              href="/blog/sr" 
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-nextpixel-turquoise hover:text-white transition-colors"
            >
              🇷🇸 Srpski
            </Link>
            <Link 
              href="/blog/en" 
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-nextpixel-turquoise hover:text-white transition-colors"
            >
              🇬🇧 English
            </Link>
            <Link 
              href="/blog/de" 
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-nextpixel-turquoise hover:text-white transition-colors"
            >
              🇩🇪 Deutsch
            </Link>
          </div>
          
          {allPosts.length === 0 ? (
            <p className="text-center text-gray-500">No blog posts available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map((post) => {
                const readMoreText = 
                  post.lang === 'sr' ? 'Pročitaj više' :
                  post.lang === 'de' ? 'Weiterlesen' : 'Read more';
                
                return (
                  <BlogCard
                    key={`${post.lang}-${post.slug}`}
                    title={post.title}
                    summary={post.excerpt || post.description}
                    slug={post.slug}
                    date={new Date(post.date).toLocaleDateString(
                      post.lang === 'sr' ? 'sr-Latn-RS' : 
                      post.lang === 'de' ? 'de-DE' : 'en-US',
                      { day: 'numeric', month: 'long', year: 'numeric' }
                    )}
                    readTime="5 min"
                    readMoreText={readMoreText}
                    lang={post.lang}
                    category={post.langName}
                    image={
                      post.slug === 'why-website-2025' ? {
                        src: '/blogImages/image1.png',
                        alt: 'Website importance'
                      } : undefined
                    }
                  />
                );
              })}
            </div>
          )}
          
          {/* Also show legacy blog post if it exists */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-center">Stariji članci / Older posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BlogCard
                title="Zašto je potrebna Web Stranica u 2025. godini?"
                summary="Saznajte zašto je web stranica neophodna za uspjeh vašeg poslovanja u digitalnom dobu."
                slug="why_web_site"
                image={{
                  src: '/blogImages/image1.png',
                  alt: 'Image 1'
                }}
                date="2025-04-13"
                readTime="5 min"
                readMoreText="Pročitaj više"
              />
            </div>
          </div>
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}