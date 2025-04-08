// /src/components/blog/ShareButtons.tsx
"use client"

import { Facebook, Twitter, Linkedin } from "lucide-react"

interface ShareButtonsProps {
  url: string
  title: string
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="flex gap-3 mt-6">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        <Facebook />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
      >
        <Twitter />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        <Linkedin />
      </a>
    </div>
  )
}
