
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Logout user and clear authentication data
   */
  const logout = () => {
    // Remove authentication data from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    // Clear React state
    setUser(null);

    // Call backend logout if your API supports it
    try {
      authApi.logout();
    } catch (error) {
      console.error('Logout request failed:', error);
    }
  };

  /**
   * Check JWT expiration and automatically logout
   */
  const setupTokenExpiration = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);

      if (!decoded.exp) {
        console.error('JWT does not contain an expiration time');
        logout();
        return;
      }

      // JWT exp is in seconds.
      // JavaScript Date.now() is in milliseconds.
      const expirationTime = decoded.exp * 1000;
      const currentTime = Date.now();

      const remainingTime = expirationTime - currentTime;

      // Token has already expired
      if (remainingTime <= 0) {
        console.log('JWT has already expired');
        logout();
        return;
      }

      console.log(
        `JWT expires in ${Math.round(remainingTime / 1000)} seconds`
      );

      // Automatically logout when token expires
      const timer = setTimeout(() => {
        console.log('JWT expired. Logging out...');
        logout();
      }, remainingTime);

      // Return cleanup function
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Invalid JWT:', error);
      logout();
    }
  };

  /**
   * Hydrate auth state from localStorage on mount
   */
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');

    const parsedUser = safeJsonParse<User>(storedUser);

    if (parsedUser && token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);

        // Check if token is already expired
        if (decoded.exp * 1000 <= Date.now()) {
          console.log('Stored JWT has expired');

          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');

          setUser(null);
        } else {
          // Token is valid
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Invalid stored JWT:', error);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');

        setUser(null);
      }
    }

    setIsLoading(false);
  }, []);

  /**
   * Setup expiration timer whenever authentication state changes
   */
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token || !user) {
      return;
    }

    const cleanup = setupTokenExpiration(token);

    return cleanup;
  }, [user]);

  /**
   * Login
   */
  const login = async (email: string, password: string) => {
    const response = await authApi.login({
      email,
      password,
    });

    const data = response.data;
    const accessToken = data.access_token;

    if (!accessToken) {
      throw new Error('No access token received from server');
    }

    const decoded = jwtDecode<DecodedToken>(accessToken);

    // Check expiration immediately
    if (!decoded.exp || decoded.exp * 1000 <= Date.now()) {
      throw new Error('Received JWT is already expired');
    }

    const userData: User = {
      id: decoded.sub,
      firstName: decoded.email.split('@')[0] || 'User',
      lastName: '',
      email: decoded.email,
      role: decoded.role as 'admin' | 'superadmin',
    };

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData);
  };

  /**
   * Signup
   */
  const signup = async (
    data: Omit<User, 'id'> & { password: string }
  ) => {
    const response = await authApi.signup(data);
    const responseData = response.data;
    const accessToken = responseData.access_token;

    if (!accessToken) {
      throw new Error('No access token received from server');
    }

    const decoded = jwtDecode<DecodedToken>(accessToken);

    // Check expiration immediately
    if (!decoded.exp || decoded.exp * 1000 <= Date.now()) {
      throw new Error('Received JWT is already expired');
    }

    const userData: User = {
      id: decoded.sub,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: decoded.role as 'admin' | 'superadmin',
    };

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

