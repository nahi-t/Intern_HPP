'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useServices } from '@/hooks/home/useServices';
import type { Service } from '@/types';

const ServiceManagement: React.FC = () => {
  const { services, loading, error, fetchServices, create, update, remove } = useServices();

  // ── Form state ──
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Edit state ──
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // ── Load data ──
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // ── Handle file selection ──
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── CRUD handlers ──
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newService = await create({ title, description }, imageFile || undefined);
    if (newService) {
      setTitle('');
      setDescription('');
      clearImage();
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      await remove(id);
    }
  };

  const startEditing = (service: Service) => {
    setEditingId(service.id);
    setEditTitle(service.title);
    setEditDescription(service.description || '');
  };

  const cancelEditing = () => setEditingId(null);

  const handleUpdateSubmit = async () => {
    if (editingId === null) return;
    const updated = await update(editingId, { title: editTitle, description: editDescription });
    if (updated) cancelEditing();
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-slate-100">
      
      {/* ─── SECTION HEADER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            <span></span> Service Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Create, manage, and remove public-facing service offerings.
          </p>
        </div>

        <span className="self-start sm:self-center text-xs font-semibold px-3 py-1 rounded-full bg-teal-950/60 text-teal-400 border border-teal-800/50">
          {services.length} Active Services
        </span>
      </div>

      {/* ─── CREATE FORM CARD ─── */}
      <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-sm space-y-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-400 border-b border-slate-800/80 pb-3">
          ➕ Add New Service
        </h3>

        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Service Title <span className="text-teal-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Enterprise Web Architecture"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Media Asset (Optional)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Description (Optional)
            </label>
            <textarea
              placeholder="Provide a short overview of this service..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none transition-all"
            />
          </div>

          {/* Image Preview Box */}
          {imagePreview && (
            <div className="flex items-center gap-4 p-3 bg-slate-950/60 border border-slate-800 rounded-xl w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Preview"
                className="w-14 h-14 object-cover rounded-lg border border-slate-800"
              />
              <button
                type="button"
                onClick={clearImage}
                className="text-xs font-semibold px-3 py-1.5 bg-rose-950/50 text-rose-400 border border-rose-800/50 rounded-lg hover:bg-rose-900/80 transition-colors"
              >
                Remove Asset
              </button>
            </div>
          )}

          {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-teal-600/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Service
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ─── SERVICES LIST ─── */}
      <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl backdrop-blur-sm overflow-hidden">
        <div className="p-5 border-b border-slate-800/80">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-400">
            📋 Service Registry
          </h3>
        </div>

        {loading && (
          <div className="p-8 text-center text-xs text-slate-400">
            Loading service records...
          </div>
        )}

        {!loading && services.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500">
            No services registered yet. Add one using the form above.
          </div>
        )}

        <ul className="divide-y divide-slate-800/60">
          {services.map((service) => (
            <li
              key={service.id}
              className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                {service.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-12 h-12 object-cover rounded-xl border border-slate-800 shrink-0 bg-slate-950"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-center text-slate-600 shrink-0 font-bold text-xs">
                    N/A
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-semibold text-slate-100">{service.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                    {service.description || 'No description provided.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => startEditing(service)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="px-3 py-1.5 bg-rose-950/50 hover:bg-rose-900/80 text-rose-400 text-xs font-medium rounded-lg border border-rose-800/50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ─── EDIT MODAL ─── */}
      {editingId !== null && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>✏️</span> Edit Service Record
              </h3>
              <button
                onClick={cancelEditing}
                className="text-slate-400 hover:text-slate-200 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Service Title"
                  className="w-full px-4 py-2.5 bg-slate-950 rounded-xl border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={4}
                  placeholder="Service Description"
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={cancelEditing}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
