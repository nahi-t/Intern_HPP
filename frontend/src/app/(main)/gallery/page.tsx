'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { mediaData as localMediaData, categories, MediaItem } from '@/constants/mediaData';
import { apiClient } from '@/lib/api'; // adjust path to your api.ts

// Helper to map backend "GalleryItem" to frontend "MediaItem"
function mapBackendToFrontend(item: any): MediaItem {
  return {
    id: item.id,
    title: item.title,
    description: item.description || '',
    category: item.category,
    type: item.type as 'image' | 'video',
    thumbnailUrl: item.thumbnailUrl,
    mediaUrl: item.mediaUrl,
    // use createdAt as date, or format it
    date: new Date(item.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  };
}

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  
  // State for dynamic data
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingLocalData, setUsingLocalData] = useState(false);

  // Fetch function
  const fetchGallery = async (category: string) => {
    setLoading(true);
    setError(null);
    setUsingLocalData(false);

    try {
      const params = category !== 'All' ? { category } : {};
      const response = await apiClient.get('/gallery', { params });
      const data = response.data; // assuming it returns an array

      // Map backend data to frontend format
      const mapped = data.map(mapBackendToFrontend);
      setMediaItems(mapped);
    } catch (err) {
      console.warn('Failed to fetch from API, falling back to local data:', err);
      // Fallback to local data
      const filtered = category === 'All'
        ? localMediaData
        : localMediaData.filter((item) => item.category === category);
      setMediaItems(filtered);
      setUsingLocalData(true);
      setError(null); // clear error since we have fallback
    } finally {
      setLoading(false);
    }
  };

  // Refetch when tab changes
  useEffect(() => {
    fetchGallery(activeTab);
  }, [activeTab]);

  // Derived filtered data (already filtered by fetch, but we can use mediaItems directly)
  const filteredMedia = mediaItems;

  // Lightbox helpers
  const closeLightbox = () => setSelectedMedia(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/20">
      
      {/* Hero Section (unchanged) */}
      <div className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-900/80 to-gray-900 opacity-90" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 204, 0, 0.1) 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Photo & Video <span className="text-yellow-400">Gallery</span>
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Showcasing institutional activities, rehabilitation events, training programs, and our ongoing commitment to community engagement.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 border-b border-gray-200 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                activeTab === category
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-green-700 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Indicator for local data fallback */}
        {usingLocalData && (
          <div className="mt-2 text-center text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md py-1 px-3 inline-block mx-auto">
            ⚡ Showing offline data (network unavailable)
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No media found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Thumbnail Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                     unoptimized={true}
                  />
                  
                  {/* Video Play Button Overlay */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-green-700 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-green-600/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {item.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-xs text-gray-400">{item.date}</span>
                    <span className="text-xs font-medium text-green-600">
                      {item.type === 'video' ? 'Watch Video' : 'View Full'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox (unchanged) */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div 
            className="relative w-full max-w-5xl max-h-[90vh] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === 'image' && (
              <div className="relative w-full h-full max-h-[90vh]">
                <Image
                  src={selectedMedia.mediaUrl}
                  alt={selectedMedia.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                   unoptimized={true}
                />
              </div>
            )}

            {selectedMedia.type === 'video' && (
              <div className="w-full h-[50vh] md:h-[80vh] bg-black">
                <iframe
                  src={selectedMedia.mediaUrl}
                  title={selectedMedia.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedMedia.title}</h3>
              <p className="text-gray-300 text-sm">{selectedMedia.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}