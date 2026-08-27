// src/components/dashboard/AnnouncementManagement.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAnnouncements } from '@/hooks/announcements/useAnnouncements';
import type { AnnouncementItem, AnnouncementType, AnnouncementPriority } from '@/types';

const ANNOUNCEMENT_TYPES: AnnouncementType[] = [
  'Public Notice',
  'Government Directive',
  'Service Update',
];
const PRIORITIES: AnnouncementPriority[] = ['high', 'medium', 'low'];

export default function AnnouncementManagement() {
  const { announcements, loading, error, fetchAll, create, update, remove } = useAnnouncements();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AnnouncementItem | null>(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<AnnouncementType>('Public Notice');
  const [priority, setPriority] = useState<AnnouncementPriority>('medium');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setExcerpt('');
    setDate(new Date().toISOString().split('T')[0]);
    setType('Public Notice');
    setPriority('medium');
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: AnnouncementItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setExcerpt(item.excerpt || '');
    setDate(item.date);
    setType(item.type);
    setPriority(item.priority);
    setImageFile(null);
    setImagePreview(item.image || null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    if (excerpt) formData.append('excerpt', excerpt);
    formData.append('date', date);
    formData.append('type', type);
    formData.append('priority', priority);
    if (imageFile) formData.append('image', imageFile);

    try {
      if (editingItem) {
        await update(editingItem.id, formData);
      } else {
        await create(formData);
      }
      setIsModalOpen(false);
      setTitle('');
      setExcerpt('');
      setDate('');
      setType('Public Notice');
      setPriority('medium');
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      // error handled in hook
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await remove(id);
      } catch (err) {
        // handled
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityBadge = (priority: string) => {
    return (
      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(priority)}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 text-slate-100">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Announcement Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Create and manage public announcements
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 rounded-lg text-sm font-medium transition-all active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Announcement
        </button>
      </div>

      {/* ─── Loading / Error ─── */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {error && (
        <div className="bg-red-950/50 border border-red-800/50 rounded-xl p-4 text-red-300 text-sm">
          Error: {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* ─── Mobile Card View (hidden on md+) ─── */}
          <div className="md:hidden space-y-4">
            {announcements.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No announcements found. Click &quot;Add Announcement&quot; to create one.
              </div>
            ) : (
              announcements.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-100 flex-1">{item.title}</h3>
                    {getPriorityBadge(item.priority)}
                  </div>
                  {item.excerpt && (
                    <p className="text-xs text-slate-400 line-clamp-2">{item.excerpt}</p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{item.type}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-28 object-cover rounded-lg border border-slate-800"
                    />
                  )}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex-1 py-1.5 text-xs font-medium text-teal-400 hover:text-teal-300 bg-teal-950/30 rounded-lg transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-950/30 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ─── Desktop / Tablet Table View (hidden on mobile) ─── */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-800/80">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-900 text-slate-300 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Type</th>
                  <th className="px-4 py-3 hidden xl:table-cell">Priority</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 hidden 2xl:table-cell">Image</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-400">
                      No announcements found.
                    </td>
                  </tr>
                ) : (
                  announcements.map((item) => (
                    <tr key={item.id} className="border-b border-slate-800/60 hover:bg-slate-900/50">
                      <td className="px-4 py-3 font-medium">{item.title}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">{item.type}</td>
                      <td className="px-4 py-3 hidden xl:table-cell">
                        {getPriorityBadge(item.priority)}
                      </td>
                      <td className="px-4 py-3">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 hidden 2xl:table-cell">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-12 object-cover rounded-md border border-slate-700"
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
        </>
      )}

      {/* ─── Modal (fully responsive) ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-800/80 p-4 sm:p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold">
                {editingItem ? 'Edit Announcement' : 'Create Announcement'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800/60 transition"
              >
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500 outline-none transition resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Date *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500 outline-none transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as AnnouncementType)}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500 outline-none transition"
                  >
                    {ANNOUNCEMENT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as AnnouncementPriority)}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500 outline-none transition"
                  >
                    {PRIORITIES.map((p) => (
                      <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Image</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700 transition"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-32 w-full object-cover rounded-lg border border-slate-700"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 transition active:scale-95"
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