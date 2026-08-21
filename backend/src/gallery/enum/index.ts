export const CATEGORIES = [
  'All',
  'Institutional Activities',
  'Events',
  'Training Programs',
  'Community Engagement',
] as const;

export type Category = typeof CATEGORIES[number];

export enum GalleryCategory {
  ALL = 'All',
  INSTITUTIONAL = 'Institutional Activities',
  EVENTS = 'Events',
  TRAINING = 'Training Programs',
  COMMUNITY = 'Community Engagement',
}

export enum GalleryMediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}