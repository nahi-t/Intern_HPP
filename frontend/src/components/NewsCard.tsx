// src/components/newscard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NewsCardProps {
  id: string | number;
  title: string;
  excerpt?: string | null;
  date: string;
 image?: string;
  category?: string;
  slug?: string;
}

const newscard: React.FC<NewsCardProps> = ({ 
  id, 
  title, 
  excerpt, 
  date, 
  image, 
  category = 'Update', 
  slug 
}) => {
  const fallbackImage = '/images/news-fallback.jpg'; // Ensure this exists in /public/

  return (
    <div className="group bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      
    
     {/* Image Section */}
<div className="relative h-48 w-full overflow-hidden flex-shrink-0">
  <Image
    src={image || fallbackImage}
    alt={title}
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-500"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
  {/* Category Badge */}
  <div className="absolute top-3 left-3 bg-green-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
    {category}
  </div>
</div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">
            {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
          {excerpt || 'Stay updated with the latest institutional updates.'}
        </p>
        
        {/* Footer: Read More - Now points directly to the main News page */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
          <Link 
            href="/news" // 👈 Updated: Directly to the main News page
            className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default newscard;