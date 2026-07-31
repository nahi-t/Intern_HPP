'use client';

import React, { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { getHeroData, updateHeroData } from '@/lib/cmsapi';
import type { HeroResponse } from '@/types';

export default function HeroSettings(): React.JSX.Element {
  // Form State
  const [titleLine1, setTitleLine1] = useState('');
  const [titleLine2, setTitleLine2] = useState('');
  const [subtitle, setSubtitle] = useState('');
  
  // Data State
  const [savedData, setSavedData] = useState<HeroResponse | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // Initial Fetch
  useEffect(() => {
    getHeroData()
      .then((res) => {
        if (res.data) {
          setSavedData(res.data);
          setTitleLine1(res.data.titleLine1 || '');
          setTitleLine2(res.data.titleLine2 || '');
          setSubtitle(res.data.subtitle || '');
          if (res.data.backgroundImages) {
            setPreviewUrls(res.data.backgroundImages);
          }
        }
      })
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  // Handle Multi-file Add
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const totalCount = selectedFiles.length + previewUrls.length + newFiles.length;

      if (totalCount > 5) {
        alert("You can only have a maximum of 5 images.");
        e.target.value = '';
        return;
      }

      setSelectedFiles((prev) => [...prev, ...newFiles]);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
      
      e.target.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    const newPreviews = previewUrls.filter((_, i) => i !== indexToRemove);
    setPreviewUrls(newPreviews);

    setSelectedFiles((prev) => prev.filter((_, i) => i !== (indexToRemove - (previewUrls.length - selectedFiles.length))));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('titleLine1', titleLine1);
    formData.append('titleLine2', titleLine2);
    formData.append('subtitle', subtitle);
    
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      await updateHeroData(formData);
      alert('Updated Successfully');
      
      const refreshed = await getHeroData();
      setSavedData(refreshed.data);
      if (refreshed.data.backgroundImages) {
        setPreviewUrls(refreshed.data.backgroundImages);
      }
      setSelectedFiles([]);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      alert(error.response?.data?.message || 'Error updating configuration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-slate-100">
      
      {/* ─── SECTION HEADER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            <span>🖼️</span> Hero Canvas Settings
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure main headlines, promotional copy, and background image assets.
          </p>
        </div>

        <span className="self-start sm:self-center text-xs font-semibold px-3 py-1 rounded-full bg-teal-950/60 text-teal-400 border border-teal-800/50">
          Live Endpoint Connected
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ─── LEFT COLUMN: TEXT CONFIGURATION ─── */}
          <div className="lg:col-span-2 space-y-5 bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-400 border-b border-slate-800/80 pb-3">
              Typography &amp; Copywriting
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Title Line 1
              </label>
              <input 
                type="text"
                placeholder="e.g. Next-Gen Web Solutions"
                className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                value={titleLine1} 
                onChange={e => setTitleLine1(e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Title Line 2
              </label>
              <input 
                type="text"
                placeholder="e.g. Engineered for Scalability"
                className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                value={titleLine2} 
                onChange={e => setTitleLine2(e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Subtitle
              </label>
              <textarea 
                rows={3}
                placeholder="Enter hero section description paragraph..."
                className="w-full p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none transition-all"
                value={subtitle} 
                onChange={e => setSubtitle(e.target.value)} 
              />
            </div>
          </div>

          {/* ─── RIGHT COLUMN: MEDIA ASSET MANAGER ─── */}
          <div className="space-y-5 bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-3 mb-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  Background Assets
                </h3>
                <span className="text-[11px] font-semibold bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-700/60">
                  {previewUrls.length} / 5
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-4">
                Upload up to 5 background slides for rotation.
              </p>

              {/* Asset Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Previews */}
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative h-24 group rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt={`Hero Slide ${index + 1}`} />
                    
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button" 
                        onClick={() => removeImage(index)} 
                        className="p-1.5 bg-rose-600 text-white rounded-lg shadow-lg hover:bg-rose-500 transition-colors"
                        title="Remove image"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Upload Trigger Tile */}
                {previewUrls.length < 5 && (
                  <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-teal-500/60 rounded-xl bg-slate-950/40 hover:bg-slate-800/40 h-24 transition-all group">
                    <svg className="w-6 h-6 text-slate-500 group-hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-[11px] text-slate-400 font-medium mt-1 group-hover:text-slate-200">Upload Image</span>
                    <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            {/* Note Footer */}
            <div className="pt-4 border-t border-slate-800/80">
              <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-teal-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Updates synchronize immediately to live frontends.
              </p>
            </div>
          </div>
        </div>

        {/* ─── ACTION SUBMIT BUTTON ─── */}
        <div className="flex justify-end pt-2">
          <button 
            type="submit" 
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-teal-600/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Syncing Changes...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Hero Configuration
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
