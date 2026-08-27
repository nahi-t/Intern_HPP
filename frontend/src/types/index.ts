export type Role = 'admin' | 'superadmin';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: Role;
}

export interface AuthResponse {
  access_token: string;
  user: Omit<User, 'password'>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export interface HeroResponse {
  id: number;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  backgroundImages: string[] | null;
}

export interface Service {
  id: number;
  image: string | null;
  title: string;
  description?: string | null;
}

export interface CreateServiceDto {
  title: string;
  description?: string;
}

export type UpdateServiceDto = Partial<CreateServiceDto>;


export interface NewsItem {
  id: number;
  title: string;
  excerpt?: string | null;
  date: string; // ISO date string
  image?: string | null; // URL or null
  category?: string | null; // e.g., "Press Release"
  featured: boolean; // default false
  type: 'news' | 'press-release' | 'event'; // or simply string if you prefer
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}

export type AnnouncementType = 'Public Notice' | 'Government Directive' | 'Service Update'|'image';
export type AnnouncementPriority = 'high' | 'medium' | 'low';

export interface AnnouncementItem {
  id: number;
  title: string;
  excerpt?: string | null;
  date: string; // ISO
  type: AnnouncementType;
  priority: AnnouncementPriority;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
    id: string | number;  // or number, depending on your backend
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // optional when fetching, required for create/update
  role: Role;
}