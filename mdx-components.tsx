import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'

// Primjer komponente koju možemo koristiti u MDX datotekama
export function BlogCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 my-4 border border-gray-200">
      <h3 className="text-xl font-bold text-nextpixel-dark mb-2">{title}</h3>
      <p className="text-nextpixel-gray">{description}</p>
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Koristimo postojeće komponente
    ...components,
    // Boje usklađene sa sekcijama (text-nextpixel-gray, bg-white/bg-nextpixel-light)
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4 text-nextpixel-dark">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-6 mb-3 text-nextpixel-dark">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-4 mb-2 text-nextpixel-dark">{children}</h3>,
    p: ({ children }) => <p className="my-4 text-nextpixel-gray leading-relaxed">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
    li: ({ children }) => <li className="text-nextpixel-gray">{children}</li>,
    a: ({ href, children }) => <a href={href} className="text-nextpixel-turquoise hover:underline">{children}</a>,
    img: ({ src, alt }) => src ? <Image src={src} alt={alt || ''} width={800} height={400} className="rounded-lg my-6" /> : null,
    // Dodajemo našu komponentu
    BlogCard: BlogCard,
  }
}
