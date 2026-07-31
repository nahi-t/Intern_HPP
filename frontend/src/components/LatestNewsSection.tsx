// src/components/LatestNewsSection.tsx
import { newsData } from '@/constants/newsData';
import newscard from '@/components/NewsCard';
import Newscard from '@/components/NewsCard';

export default function LatestNewsSection() {
  // Filter for 'news', sort by newest date, take only the first 2
  const latestNews = newsData
    .filter((item) => item.type === 'news')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  if (latestNews.length === 0) {
    return <p className="text-gray-500 text-center py-8">No recent news available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {latestNews.map((item) => (
        <Newscard
          key={item.id}
          id={item.id}
          title={item.title}
          excerpt={item.excerpt}
          date={item.date}
          image={item.image}
          category={item.category}
          // slug={item.slug} // Uncomment if your data has a 'slug' property
        />
      ))}
    </div>
  );
}