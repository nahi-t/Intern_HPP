'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { newsData, NewsItem, AnnouncementItem } from '@/constants/newsData';
import { useNews } from '@/hooks/home/useNews';
import { useAnnouncements } from '@/hooks/announcements/useAnnouncements'; // new hook

// Helper to separate static data into news and announcements
const staticNews = newsData.filter((item) => item.type === 'news') as NewsItem[];
const staticAnnouncements = newsData.filter(
  (item) => item.type !== 'news'
) as AnnouncementItem[];

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<'news' | 'announcements'>('news');
  
  // Fetch news
  const { news, loading: newsLoading, error: newsError, fetchAll: fetchNews } = useNews();
  // Fetch announcements
  const { announcements, loading: annLoading, error: annError, fetchAll: fetchAnnouncements } = useAnnouncements();

  useEffect(() => {
    fetchNews();
    fetchAnnouncements();
  }, []);

  // Determine data source with fallback to static
  const newsItems = (news && news.length > 0) ? news : staticNews;
  const announcementItems = (announcements && announcements.length > 0) ? announcements : staticAnnouncements;

  // Combine into a single array with a discriminator 'kind'
  const allItems = [
    ...newsItems.map((item) => ({ ...item, kind: 'news' as const })),
    ...announcementItems.map((item) => ({ ...item, kind: 'announcement' as const })),
  ];

  // Filter based on active tab
  const filteredItems = allItems.filter((item) =>
    activeTab === 'news' ? item.kind === 'news' : item.kind === 'announcement'
  );

  const featuredNews = filteredItems.find(
    (item) => item.kind === 'news' && item.featured === true
  ) as (NewsItem & { kind: 'news' }) | undefined;
  
  const regularItems = filteredItems.filter(
    (item) => !(item.kind === 'news' && item.featured === true)
  );

  // Share functionality
  const handleShare = async (title: string, excerpt: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        alert('Failed to copy link.');
      }
    }
  };

  // Badge styles for announcements
  const getAnnouncementBadge = (type: string) => {
    switch (type) {
      case 'Public Notice':
        return { text: 'text-blue-700', bg: 'bg-blue-100', border: 'border-blue-500' };
      case 'Government Directive':
        return { text: 'text-red-700', bg: 'bg-red-100', border: 'border-red-500' };
      case 'Service Update':
        return { text: 'text-amber-700', bg: 'bg-amber-100', border: 'border-amber-500' };
      default:
        return { text: 'text-gray-700', bg: 'bg-gray-100', border: 'border-gray-500' };
    }
  };

  // Loading state
  if (newsLoading || annLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading news…</p>
        </div>
      </div>
    );
  }

  // Determine if we are using fallback data
  const usingFallback = (newsError && news?.length === 0) || (annError && announcements?.length === 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            News & Announcements
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest institutional updates, public notices, and government directives from the Harari Prison Police Department.
          </p>
          {usingFallback && (
            <p className="mt-2 text-sm text-amber-600 bg-amber-50 inline-block px-4 py-2 rounded-lg">
              ⚠️ Using offline data – some updates may be delayed.
            </p>
          )}
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('news')}
            className={`pb-4 px-6 text-sm font-semibold transition-colors duration-200 border-b-2 ${
              activeTab === 'news'
                ? 'border-green-600 text-green-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            News & Updates
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`pb-4 px-6 text-sm font-semibold transition-colors duration-200 border-b-2 ${
              activeTab === 'announcements'
                ? 'border-green-600 text-green-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Announcements & Notices
          </button>
        </div>

        {/* ─── Tab Content: News ─── */}
        {activeTab === 'news' && (
          <div className="space-y-12">
            {featuredNews ? (
              <div className="relative bg-white rounded-xl shadow-xl border-2 border-green-600/20 overflow-hidden group hover:border-green-600/50 transition-colors">
                <div className="relative h-96 w-full">
                  <Image
                    src={featuredNews.image || '/placeholder-news.jpg'}
                    alt={featuredNews.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <span className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {featuredNews.category} • Featured
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {featuredNews.title}
                    </h2>
                    <p className="text-gray-200 line-clamp-2 max-w-2xl">
                      {featuredNews.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <span className="text-gray-300 text-sm">{featuredNews.date}</span>
                      <button
                        onClick={() => handleShare(featuredNews.title, featuredNews.excerpt || '')}
                        className="flex items-center gap-2 text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">No featured news at the moment.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularItems.filter((item) => item.kind === 'news').length === 0 ? (
                <p className="col-span-full text-center text-gray-500">No news articles available.</p>
              ) : (
                regularItems
                  .filter((item) => item.kind === 'news')
                  .map((item) => {
                    const news = item as NewsItem & { kind: 'news' };
                    return (
                      <div
                        key={news.id}
                        className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col group"
                      >
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={news.image || '/placeholder-news.jpg'}
                            alt={news.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold bg-yellow-500/10 text-yellow-700 px-2 py-1 rounded">
                              {news.category}
                            </span>
                            <span className="text-xs text-gray-400">{news.date}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {news.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                            {news.excerpt}
                          </p>
                          <button
                            onClick={() => handleShare(news.title, news.excerpt || '')}
                            className="mt-2 text-sm font-medium text-gray-500 hover:text-green-600 transition-colors flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Share
                          </button>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        )}

        {/* ─── Tab Content: Announcements ─── */}
        {activeTab === 'announcements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularItems.filter((item) => item.kind === 'announcement').length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-2xl font-semibold text-gray-400">📢 Coming Soon</p>
                <p className="text-gray-500 mt-2">We will post official announcements here.</p>
              </div>
            ) : (
              regularItems
                .filter((item) => item.kind === 'announcement')
                .map((item) => {
                  const ann = item as AnnouncementItem & { kind: 'announcement' };
                  const badgeStyle = getAnnouncementBadge(ann.type);
                  const priorityBorder = ann.priority === 'high' ? 'border-l-4 border-red-500' : 'border-l-4 border-gray-300';
                  return (
                    <div
                      key={ann.id}
                      className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col ${priorityBorder} hover:shadow-lg transition-shadow`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeStyle.bg} ${badgeStyle.text}`}>
                          {ann.type}
                        </span>
                        <span className="text-xs text-gray-400">{ann.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {ann.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {ann.excerpt}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-400">Official Notice</span>
                        <button
                          onClick={() => handleShare(ann.title, ann.excerpt || '')}
                          className="text-sm font-medium text-gray-500 hover:text-green-600 transition-colors flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          Share
                        </button>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        )}
      </div>
    </div>
  );
}