'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { apiClient } from '@/lib/api';
import { CATEGORIES, Category } from '@/constants/mediaData';

// Types
interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'image' | 'video';
  thumbnailUrl: string;
  mediaUrl: string;
  createdAt: string;
}

type FormMode = 'create' | 'edit';

export default function AdminGalleryPage() {
  // ----- State -----
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: Category;
    file: File | null;
  }>({
    title: '',
    description: '',
    category: CATEGORIES[1] as Category,
    file: null,
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ----- Fetch items -----
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get('/gallery');
      setItems(res.data);
    } catch (err) {
      setError('Failed to load gallery items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ----- Reset form -----
  const resetForm = () => {
    setFormMode('create');
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      category: CATEGORIES[1] as Category,
      file: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ----- Handle form input changes -----
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'category' ? (value as Category) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  // ----- Submit -----
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }
    if (formMode === 'create' && !formData.file) {
      alert('Please select a file to upload');
      return;
    }

    setUploading(true);
    try {
      if (formMode === 'create') {
        const fd = new FormData();
        fd.append('title', formData.title);
        fd.append('description', formData.description || '');
        fd.append('category', formData.category);
        fd.append('file', formData.file!);
        await apiClient.post('/gallery', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        const payload: any = {
          title: formData.title,
          description: formData.description,
          category: formData.category,
        };
        await apiClient.patch(`/gallery/${editingId}`, payload);
      }
      await fetchItems();
      resetForm();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Operation failed');
    } finally {
      setUploading(false);
    }
  };

  // ----- Delete -----
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item permanently?')) return;
    try {
      await apiClient.delete(`/gallery/${id}`);
      await fetchItems();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  // ----- Edit -----
  const handleEdit = (item: GalleryItem) => {
    setFormMode('edit');
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category as Category,
      file: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => resetForm();

  // ----- Render -----
  const displayCategories = CATEGORIES.filter((c) => c !== 'All');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Gallery Management</h1>

        {/* ---- Form Section ---- */}
        <div
          id="form-section"
          className="bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700 p-6 mb-10"
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            {formMode === 'create' ? 'Upload New Media' : 'Edit Media'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 w-full border border-slate-600 bg-slate-900/80 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 w-full border border-slate-600 bg-slate-900/80 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 w-full border border-slate-600 bg-slate-900/80 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {displayCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {formMode === 'create' && (
              <div>
                <label className="block text-sm font-medium text-slate-300">File (image/video)</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-900/50 file:text-blue-300 hover:file:bg-blue-800/70 transition"
                  required={formMode === 'create'}
                />
                <p className="text-xs text-slate-500 mt-1">Accepted: images and videos</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {uploading
                  ? 'Saving...'
                  : formMode === 'create'
                  ? 'Upload'
                  : 'Update'}
              </button>
              {formMode === 'edit' && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-2 border border-slate-600 text-slate-300 rounded-md hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ---- List Section ---- */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Existing Gallery Items</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-400 text-center py-8">{error}</div>
          ) : items.length === 0 ? (
            <div className="text-slate-400 text-center py-8">No items yet. Upload some!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-slate-700 hover:shadow-blue-900/30 hover:border-blue-600 transition"
                >
                  <div className="relative h-48 w-full bg-slate-900">
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                       unoptimized={true}
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white truncate">{item.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2">{item.description}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="inline-block bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 px-3 py-1.5 text-sm bg-blue-900/30 text-blue-300 rounded hover:bg-blue-800/40 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 px-3 py-1.5 text-sm bg-red-900/30 text-red-300 rounded hover:bg-red-800/40 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}