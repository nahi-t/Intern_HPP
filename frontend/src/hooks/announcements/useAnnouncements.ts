// src/hooks/announcements/useAnnouncements.ts
import { useState, useCallback } from 'react';
import { AnnouncementItem } from '@/types';
    import {apiClient} from '@/lib/api'; // your axios/API instance

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get('/announcements');
      setAnnouncements(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch announcements');
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await apiClient.post('/announcements', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnnouncements((prev) => [res.data, ...prev]);
      return res.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create announcement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: number, formData: FormData) => {
    setLoading(true);
    try {
      const res = await apiClient.patch(`/announcements/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnnouncements((prev) =>
        prev.map((item) => (item.id === id ? res.data : item))
      );
      return res.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update announcement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await apiClient.delete(`/announcements/${id}`);
      setAnnouncements((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete announcement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { announcements, loading, error, fetchAll, create, update, remove };
}