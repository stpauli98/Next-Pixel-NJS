// /src/components/blog/BlogImage.tsx
import Image from 'next/image';

interface BlogImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
  imageClassName?: string;
}

export const BlogImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  caption, 
  className,
  imageClassName 
}: BlogImageProps) => {
  return (
    <figure className={`my-6 ${className || ''}`}>
      <div className="rounded-xl overflow-hidden shadow-md">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-auto object-cover ${imageClassName || ''}`}
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
