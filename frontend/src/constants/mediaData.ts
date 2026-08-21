// src/lib/data/mediaData.ts

export const categories = [
  'All',
  'Institutional Activities',
  'Events',
  'Training Programs',
  'Community Engagement',
];
export const CATEGORIES = [
  'All',
  'Institutional Activities',
  'Events',
  'Training Programs',
  'Community Engagement',
] as const;

// 👇 Export this type
export type Category = typeof CATEGORIES[number];

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'image' | 'video';
  thumbnailUrl: string; // Preview image for both photos and videos
  mediaUrl: string; // Actual image source or YouTube embed URL
  date: string;
}

export const mediaData: MediaItem[] = [
  {
    id: 'm1',
    title: 'Annual Security Parade 2026',
    description: 'The Harari Prison Police force conducting a formal parade to demonstrate operational readiness.',
    category: 'Institutional Activities',
    type: 'image',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509382486652-86990b46a244?auto=format&fit=crop&q=80&w=800',
    mediaUrl: 'https://images.unsplash.com/photo-1509382486652-86990b46a244?auto=format&fit=crop&q=80&w=1200',
    date: '2026-07-20',
  },
  {
    id: 'm2',
    title: 'Community Outreach Program',
    description: 'Officers engaging with local youth to foster trust and awareness about legal rights and safety.',
    category: 'Community Engagement',
    type: 'image',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
    mediaUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200',
    date: '2026-07-15',
  },
  {
    id: 'm3',
    title: 'Vocational Training Workshop',
    description: 'Inmates learning essential carpentry skills as part of the rehabilitation vocational training program.',
    category: 'Training Programs',
    type: 'image',
    thumbnailUrl: 'https://images.unsplash.com/photo-1591244038621-d08816bfa0d0?auto=format&fit=crop&q=80&w=800',
    mediaUrl: 'https://images.unsplash.com/photo-1591244038621-d08816bfa0d0?auto=format&fit=crop&q=80&w=1200',
    date: '2026-07-10',
  },
  {
    id: 'm4',
    title: 'Facility Inauguration Ceremony',
    description: 'Official inauguration of the new rehabilitation wing with government officials and stakeholders.',
    category: 'Events',
    type: 'image',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800',
    mediaUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1200',
    date: '2026-07-05',
  },
  {
    id: 'm5',
    title: 'Highlights: Prison Sports Day',
    description: 'Highlights from the annual inter-block sports competition promoting fitness and camaraderie.',
    category: 'Institutional Activities',
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with your actual video URL
    date: '2026-06-28',
  },
  {
    id: 'm6',
    title: 'Community Health Checkup Drive',
    description: 'Providing free basic health screenings and medical advice to community residents.',
    category: 'Community Engagement',
    type: 'image',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    mediaUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
    date: '2026-06-20',
  },
  {
    id: 'm7',
    title: 'Defensive Tactics Training',
    description: 'Officers undergoing rigorous physical training and scenario-based defensive tactics drills.',
    category: 'Training Programs',
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?auto=format&fit=crop&q=80&w=800',
    mediaUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY', // Replace with your actual video URL
    date: '2026-06-15',
  },
];