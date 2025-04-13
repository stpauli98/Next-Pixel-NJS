import Link from 'next/link';

interface BlogLanguageSelectorProps {
  currentLang: string;
  slug?: string;
}

export const BlogLanguageSelector: React.FC<BlogLanguageSelectorProps> = ({ currentLang, slug }) => {
  const languages = [
    { code: 'sr', name: 'Srpski' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
  ];

  return (
    <div className="flex space-x-2">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={slug ? `/blog/${lang.code}/${slug}` : `/blog/${lang.code}`}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            currentLang === lang.code
              ? 'bg-nextpixel-turquoise text-white shadow-sm'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {lang.name}
        </Link>
      ))}
    </div>
  );
};
