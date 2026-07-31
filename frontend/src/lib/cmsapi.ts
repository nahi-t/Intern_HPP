import { apiClient } from './api';
import type { HeroResponse, Service, CreateServiceDto, UpdateServiceDto } from '../types';
import axios from 'axios';
import type { AxiosError } from 'axios';

/**
 * Fetches the specific hero data record with ID 1
 */
export const getHeroData = async () => {
  return await apiClient.get<HeroResponse>('/hero');
};

/**
 * Updates the hero data using the /hero/update endpoint
 * @param formData - The FormData object containing text fields and the image file
 */
export const updateHeroData = async (formData: FormData) => {
  return await apiClient.patch('/hero/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Get all services
 */
export const getServices = async (): Promise<Service[]> => {
  const response = await apiClient.get<Service[]>('/services');
  return response.data;
};

/**
 * Get a single service by ID
 */
export const getService = async (id: number): Promise<Service> => {
  const response = await apiClient.get<Service>(`/services/${id}`);
  return response.data;
};

/**
 * Create a new service with an optional image.
 * The image field name must be 'files' (as per backend controller).
 */
export const createService = async (
  data: CreateServiceDto,
  file?: File,
): Promise<Service> => {
  const formData = new FormData();
  formData.append('title', data.title);
  if (data.description) formData.append('description', data.description);
  if (file) formData.append('files', file);

  const response = await apiClient.post<Service>('/services', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/**
 * Update a service (no image support in current backend PATCH)
 */
export const updateService = async (
  id: number,
  data: UpdateServiceDto,
): Promise<Service> => {
  const response = await apiClient.patch<Service>(`/services/${id}`, data);
  return response.data;
};

/**
 * Delete a service
 */
export const deleteService = async (id: number): Promise<void> => {
  await apiClient.delete(`/services/${id}`);
};

// ----------------------------------------------------------------------
// Error handling helper (optional)
// ----------------------------------------------------------------------

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError.response?.data?.message || axiosError.message || 'Unknown error';
  }
  return String(error);
};
