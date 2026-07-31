// src/hooks/useNews.ts
import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import type { NewsItem } from '@/types'; // define NewsItem type

export const useNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get<NewsItem[]>('/news');
      setNews(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (data: FormData) => {
    setLoading(true);
    try {
      const res = await apiClient.post<NewsItem>('/news', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNews(prev => [res.data, ...prev]);
      return res.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: number, data: FormData) => {
    setLoading(true);
    try {
      const res = await apiClient.patch<NewsItem>(`/news/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNews(prev => prev.map(item => item.id === id ? res.data : item));
      return res.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await apiClient.delete(`/news/${id}`);
      setNews(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { news, loading, error, fetchAll, create, update, remove };
};