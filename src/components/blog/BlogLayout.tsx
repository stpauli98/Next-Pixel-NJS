// /src/components/blog/BlogLayout.tsx

interface BlogLayoutProps {
    children: React.ReactNode
  }
  
  export const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-base leading-relaxed">
        {children}
      </div>
    )
  }
  