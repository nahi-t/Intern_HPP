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

  // Modal & form state
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
      // Reset
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
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-amber-600 bg-amber-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Announcement Management</h2>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-md text-sm font-medium"
        >
          + Add Announcement
        </button>
      </div>

      {loading && <p className="text-slate-400">Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-xl border border-slate-800/80">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-slate-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3 hidden md:table-cell">Type</th>
                <th className="px-4 py-3 hidden lg:table-cell">Priority</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 hidden xl:table-cell">Image</th>
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
                    <td className="px-4 py-3 hidden md:table-cell">{item.type}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 hidden xl:table-cell">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-16 h-12 object-cover rounded-md" />
                      ) : (
                        <span className="text-slate-500 text-xs">No image</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => openEditModal(item)} className="text-teal-400 hover:text-teal-300 mr-3">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-rose-400 hover:text-rose-300">
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-800/80">
            <h3 className="text-xl font-bold mb-4">
              {editingItem ? 'Edit Announcement' : 'Create Announcement'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Date *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as AnnouncementType)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500"
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
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                  ))}
                </select>
              </div>

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
                  <img src={imagePreview} alt="Preview" className="mt-3 h-32 object-cover rounded-md border border-slate-700" />
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 rounded-md text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50"
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