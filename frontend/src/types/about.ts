// src/types/about.ts
export interface LeadershipProfile {
  id: number;
  name: string;
  title: string;
  bio: string;
  image?: string;
}

export interface CoreValue {
  id: number;
  title: string;
  description: string;
  icon?: string; // optional icon name/class
}