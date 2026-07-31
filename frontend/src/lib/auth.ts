import { apiClient } from './api';
import type { LoginCredentials, SignupCredentials, AuthResponse } from '../types';

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>('/auth/login', credentials),

  signup: (data: SignupCredentials) =>
    apiClient.post<AuthResponse>('/auth/user', data),

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
  },
};
