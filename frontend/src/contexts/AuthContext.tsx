'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/types';
import { authApi } from '@/lib/auth';
import { jwtDecode } from 'jwt-decode';

// Safe JSON parse helper
const safeJsonParse = <T,>(value: string | null): T | null => {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

// Decoded JWT structure
interface DecodedToken {
  sub: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Hydrate auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    const parsedUser = safeJsonParse<User>(storedUser);
    if (parsedUser && token) {
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    const data = response.data;

    const accessToken = data.access_token;
    if (!accessToken) {
      throw new Error('No access token received from server');
    }

    const decoded = jwtDecode<DecodedToken>(accessToken);
    const userData: User = {
      firstName: decoded.email.split('@')[0] || 'User',
      lastName: '',
      email: decoded.email,
      role: decoded.role as 'admin' | 'superadmin',
    };

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const signup = async (data: Omit<User, 'id'> & { password: string }) => {
    const response = await authApi.signup(data);
    const responseData = response.data;
    const accessToken = responseData.access_token;
    if (!accessToken) {
      throw new Error('No access token received from server');
    }

    const decoded = jwtDecode<DecodedToken>(accessToken);
    const userData: User = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: decoded.role as 'admin' | 'superadmin',
    };

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
