// /src/components/blogComponents/BlogLayout.tsx

interface BlogLayoutProps {
  children: React.ReactNode
}

export const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Improved typography and spacing for blog content */}
      <div className="
        text-base sm:text-lg
        leading-relaxed sm:leading-loose
        text-gray-800 dark:text-gray-200

        [&>h1]:text-3xl [&>h1]:sm:text-4xl [&>h1]:md:text-5xl
        [&>h1]:font-bold [&>h1]:text-nextpixel-dark [&>h1]:dark:text-white
        [&>h1]:mb-6 [&>h1]:leading-tight

        [&>h2]:text-2xl [&>h2]:sm:text-3xl
        [&>h2]:font-semibold [&>h2]:text-nextpixel-dark [&>h2]:dark:text-white
        [&>h2]:mt-12 [&>h2]:mb-6

        [&>h3]:text-xl [&>h3]:sm:text-2xl
        [&>h3]:font-semibold [&>h3]:text-nextpixel-dark [&>h3]:dark:text-white
        [&>h3]:mt-8 [&>h3]:mb-4

        [&>p]:mb-6

        [&>ul]:mb-6 [&>ul]:pl-6 [&>ul]:list-disc
        [&>ol]:mb-6 [&>ol]:pl-6 [&>ol]:list-decimal
        [&>li]:mb-2

        [&>blockquote]:border-l-4 [&>blockquote]:border-nextpixel-turquoise
        [&>blockquote]:pl-6 [&>blockquote]:py-2 [&>blockquote]:my-6
        [&>blockquote]:bg-gray-50 [&>blockquote]:dark:bg-gray-800/50
        [&>blockquote]:rounded-r-lg
        [&>blockquote]:italic

        [&>pre]:bg-gray-900 [&>pre]:text-gray-100
        [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto
        [&>pre]:my-6

        [&>code]:bg-gray-100 [&>code]:dark:bg-gray-800
        [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded
        [&>code]:text-sm [&>code]:font-mono

        [&>a]:text-nextpixel-turquoise [&>a]:hover:underline

        [&>hr]:my-8 [&>hr]:border-gray-200 [&>hr]:dark:border-gray-700

        [&>img]:rounded-xl [&>img]:shadow-lg [&>img]:my-8
        [&>figure]:my-8
      ">
        {children}
      </div>
    </div>
  )
}
