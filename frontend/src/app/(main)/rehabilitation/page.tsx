// src/app/rehabilitation/page.tsx
'use client'; // ✅ Required for state and click events

import React, { useState } from 'react';
import Link from 'next/link';
import { rehabStats, rehabPrograms } from '@/constants/rehabilitationData';

// Helper to map accent colors to Tailwind classes
const accentMap = {
  green: {
    border: 'border-green-600',
    bgLight: 'bg-green-50',
    text: 'text-green-700',
    button: 'bg-green-600 hover:bg-green-700',
    star: 'text-green-600',
  },
  yellow: {
    border: 'border-yellow-400',
    bgLight: 'bg-yellow-50',
    text: 'text-yellow-700',
    button: 'bg-yellow-500 hover:bg-yellow-600',
    star: 'text-yellow-500',
  },
  red: {
    border: 'border-red-600',
    bgLight: 'bg-red-50',
    text: 'text-red-700',
    button: 'bg-red-600 hover:bg-red-700',
    star: 'text-red-600',
  },
};

export default function RehabilitationPage() {
  // State to handle the Referral Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    inmateId: '',
    program: '',
    message: '',
  });

  // Handle smooth scroll to programs grid
  const handleExplorePrograms = () => {
    const element = document.getElementById('programs-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle modal input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Referral Submitted:', formData);
    // Show success state (optional, but good for UX)
    setIsModalOpen(false);
    alert('Referral submitted successfully! You will be contacted within 24 hours.');
    setFormData({ name: '', inmateId: '', program: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/20">
      
      {/* 1. Hero Section */}
      <div className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
        {/* Background Overlay with Harari Flag Accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-900/80 to-gray-900 opacity-90" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 204, 0, 0.1) 0%, transparent 50%)' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Rehabilitation & <span className="text-yellow-400">Reintegration</span> Programs
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Empowering inmates with psychological support, vocational skills, and education to break the cycle of recidivism and build a brighter, lawful future.
          </p>
          
          {/* ✅ Interactive Hero Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button 
              onClick={handleExplorePrograms}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
            >
              Explore Programs
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 border border-yellow-400 text-yellow-400 hover:text-white hover:bg-yellow-400/20 font-bold rounded-lg transition-all"
            >
              Refer a Participant
            </button>
          </div>
        </div>
      </div>

      {/* 2. Impact Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rehabStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-xl p-6 text-center border-b-4 border-green-600 hover:shadow-2xl transition-shadow">
              <p className="text-4xl font-extrabold text-gray-900">{stat.value}</p>
              <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Programs Grid Section (Added ID for smooth scrolling) */}
      <div id="programs-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Core Rehabilitation Pillars
          </h2>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
            A holistic approach combining mental well-being, practical trades, and lifelong learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {rehabPrograms.map((program) => {
            const styles = accentMap[program.accentColor];
            return (
              <div
                key={program.id}
                className="relative group bg-white rounded-2xl shadow-lg border-t-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-2 ${styles.border}`} />
                <div className="p-8 flex-1 flex flex-col">
                  <div className={`w-14 h-14 rounded-full ${styles.bgLight} flex items-center justify-center mb-4 mx-auto`}>
                    <svg className={`w-8 h-8 ${styles.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {program.accentColor === 'green' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
                      {program.accentColor === 'yellow' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 112 2v2a2 2 0 112 2v2a2 2 0 112 2v4a2 2 0 11-4 0v-4a2 2 0 11-4 0v-4a2 2 0 11-4 0v-4a2 2 0 112-2z" />}
                      {program.accentColor === 'red' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 text-center mt-2">{program.title}</h3>
                  <p className="mt-3 text-gray-600 text-center text-sm leading-relaxed">{program.description}</p>
                  <div className="mt-6 flex-1">
                    <ul className="space-y-2 text-sm text-gray-700">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className={`mr-2 mt-0.5 flex-shrink-0 ${styles.star}`}>✦</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <Link href={`/rehabilitation/${program.slug}`} className={`block w-full py-2.5 text-center text-white font-medium rounded-lg shadow-md transition-colors ${styles.button}`}>
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ Interactive Referral Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Refer a Participant</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="Inmate or staff name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inmate ID (if applicable)</label>
                <input 
                  type="text" 
                  name="inmateId" 
                  value={formData.inmateId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="#12345"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program Interest</label>
                <select 
                  name="program" 
                  required
                  value={formData.program}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                >
                  <option value="">Select a program...</option>
                  {rehabPrograms.map((p) => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea 
                  name="message" 
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                  placeholder="Any specific needs or requirements..."
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-4 flex gap-3 justify-end border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-colors"
                >
                  Submit Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}