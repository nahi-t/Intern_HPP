// src/constants/adminNavItems.ts
import React from 'react';

export type ActiveView = 'hero-settings' | 'services' | 'news' | 'leadership'|'announcement'|'gallery'|'user';

export interface NavItem {
  key: ActiveView;
  label: string;
  badge?: string;
  icon: React.ReactNode; // or React.ReactElement
}

// Icons as separate constants for cleaner code
const HERO_ICON = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const SERVICES_ICON = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const NEWS_ICON = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const LEADERSHIP_ICON = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const NAV_ITEMS: NavItem[] = [
  {
    key: 'hero-settings',
    label: 'Hero Section',
    icon: HERO_ICON,
  },
  {
    key: 'services',
    label: 'Services',
    badge: 'Active',
    icon: SERVICES_ICON,
  },
  {
    key: 'news',
    label: 'News & Media',
    badge: 'Soon',
    icon: NEWS_ICON,
  },
   {
    key: 'announcement',
    label: 'announcement',
    badge: 'active',
    icon: NEWS_ICON,
  },
  {
    key: 'leadership',
    label: 'Leadership Board',
    badge: 'Soon',
    icon: LEADERSHIP_ICON,
  },
  {
    key: 'gallery',
    label: 'gallery setting',
    badge: 'Active',
    icon: LEADERSHIP_ICON,
  },
   {
    key: 'user',
    label: 'User Managemant',
    badge: 'Active',
    icon: LEADERSHIP_ICON,
  },
];