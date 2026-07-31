'use client';

import { useState, useCallback } from 'react';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  handleApiError,
} from '@/lib/cmsapi';
import type { Service, CreateServiceDto, UpdateServiceDto } from '@/types';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsync = useCallback(async <T>(fn: () => Promise<T>): Promise<T | undefined> => {
    setLoading(true);
    setError(null);
    try {
      return await fn();
    } catch (err) {
      setError(handleApiError(err));
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    const result = await handleAsync(getServices);
    if (result) setServices(result);
  }, [handleAsync]);

  const fetchService = useCallback(async (id: number) => {
    return await handleAsync(() => getService(id));
  }, [handleAsync]);

  const create = useCallback(async (data: CreateServiceDto, file?: File) => {
    const newService = await handleAsync(() => createService(data, file));
    if (newService) {
      setServices((prev) => [...prev, newService]);
    }
    return newService;
  }, [handleAsync]);

  const update = useCallback(async (id: number, data: UpdateServiceDto) => {
    const updated = await handleAsync(() => updateService(id, data));
    if (updated) {
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...data } : s))
      );
    }
    return updated;
  }, [handleAsync]);

  const remove = useCallback(async (id: number) => {
    await handleAsync(() => deleteService(id));
    setServices((prev) => prev.filter((s) => s.id !== id));
  }, [handleAsync]);

  return {
    services,
    loading,
    error,
    fetchServices,
    fetchService,
    create,
    update,
    remove,
  };
};
