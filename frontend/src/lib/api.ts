import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://intern-hpp.onrender.com/api';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    });

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('accessToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error: unknown) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: unknown) => {
        // Just clean up tokens on 401 – let the component handle the error.
        if (typeof window !== 'undefined' && axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
        }
        return Promise.reject(error);
      }
    );
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient().getInstance();