// src/components/dashboard/NewsManagement.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useNews } from '@/hooks/home/useNews';
import type { NewsItem } from '@/types';

export default function NewsManagement() {
  const { news, loading, error, fetchAll, create, update, remove } = useNews();

  // ── Modal state ──
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);

  // ── Form state ──
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [date, setDate] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load news on mount
  useEffect(() => {
    fetchAll();
  }, []);

  // ── Open modal for create ──
  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setExcerpt('');
    setDate(new Date().toISOString().split('T')[0]);
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  // ── Open modal for edit ──
  const openEditModal = (item: NewsItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setExcerpt(item.excerpt || '');
    setDate(item.date);
    setImageFile(null);
    setImagePreview(item.image || null);
    setIsModalOpen(true);
  };

  // ── Handle file selection ──
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ── Submit form ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    if (excerpt) formData.append('excerpt', excerpt);
    formData.append('date', date);
    if (imageFile) formData.append('image', imageFile);

    try {
      if (editingItem) {
        await update(editingItem.id, formData);
      } else {
        await create(formData);
      }
      setIsModalOpen(false);
      // Reset form
      setTitle('');
      setExcerpt('');
      setDate('');
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      // error already handled in hook
    }
  };

  // ── Delete with confirmation ──
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      try {
        await remove(id);
      } catch (err) {
        // handled in hook
      }
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">News Management</h2>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-md text-sm font-medium transition-colors"
        >
          + Add News
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-slate-400">Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}

      {/* News Table */}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-xl border border-slate-800/80">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-slate-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3 hidden md:table-cell">Excerpt</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 hidden lg:table-cell">Image</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400">
                    No news articles found.
                  </td>
                </tr>
              ) : (
                news.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800/60 hover:bg-slate-900/50 transition-colors">
                    <td className="px-4 py-3 font-medium">{item.title}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-slate-300 max-w-xs truncate">
                      {item.excerpt || '—'}
                    </td>
                    <td className="px-4 py-3">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-12 object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-slate-500 text-xs">No image</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-teal-400 hover:text-teal-300 mr-3 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-rose-400 hover:text-rose-300 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── Modal ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-800/80 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">
              {editingItem ? 'Edit News' : 'Create News'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Date *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Image</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full h-32 object-cover rounded-md border border-slate-700"
                    />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 rounded-md text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}