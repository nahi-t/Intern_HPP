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
  date: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
