// src/lib/data/newsData.ts

export type NewsCategory = 'General' | 'Press Release' | 'Institutional Update' | 'Event';
export type AnnouncementType = 'Public Notice' | 'Government Directive' | 'Service Update';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string; // URL to image
  category: NewsCategory;
  date: string;
  featured: boolean;
  type: 'news';
}

export interface AnnouncementItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  type: AnnouncementType;
  priority: 'high' | 'medium' | 'low';
  typeCategory: 'announcement';
}

export const newsData: (NewsItem | AnnouncementItem)[] = [
  // Featured News
  {
    id: 'n1',
    title: 'Harari Prison Police Launches New Rehabilitation Initiative',
    excerpt: 'A pioneering program aimed at reducing recidivism through vocational training and psychological support has been officially launched today.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    category: 'Press Release',
    date: '2026-07-28',
    featured: true,
    type: 'news',
  },
  // Other News
  {
    id: 'n2',
    title: 'Annual Security Drill Conducted Successfully',
    excerpt: 'All personnel participated in the annual emergency response drill, ensuring readiness for any potential security threats.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
    category: 'Institutional Update',
    date: '2026-07-25',
    featured: false,
    type: 'news',
  },
  {
    id: 'n3',
    title: 'New Biometric Access System Installed',
    excerpt: 'The facility has upgraded its perimeter security with a state-of-the-art biometric entry system for all staff and visitors.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    category: 'General',
    date: '2026-07-20',
    featured: false,
    type: 'news',
  },
  {
    id: 'n4',
    title: 'Community Outreach: Open House Event',
    excerpt: 'An open house event is scheduled for next month to allow families and community leaders to tour the facilities.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    category: 'Event',
    date: '2026-07-18',
    featured: false,
    type: 'news',
  },
  // Announcements
  {
    id: 'a1',
    title: 'Mandatory Staff Training: Cyber Security',
    excerpt: 'All security personnel are required to attend a 2-day cyber security awareness workshop.',
    date: '2026-08-05',
    type: 'Service Update',
    priority: 'high',
    typeCategory: 'announcement',
  },
  {
    id: 'a2',
    title: 'Directorate Reorganization Directive',
    excerpt: 'Effective next month, the internal structure of the administration division will be reorganized.',
    date: '2026-07-30',
    type: 'Government Directive',
    priority: 'medium',
    typeCategory: 'announcement',
  },
  {
    id: 'a3',
    title: 'Public Notice: Visiting Hours Adjustment',
    excerpt: 'Family visiting hours have been temporarily adjusted to 2:00 PM - 5:00 PM on weekdays until further notice.',
    date: '2026-07-27',
    type: 'Public Notice',
    priority: 'medium',
    typeCategory: 'announcement',
  },
];