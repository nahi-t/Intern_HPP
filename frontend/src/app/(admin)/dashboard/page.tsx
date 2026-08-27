// src/app/(admin)/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import HeroSettings from '@/components/dashboard/Home/HeroSettings';
import ServiceManagement from '@/components/dashboard/Home/ServiceManagement';
import AdminSidebar from '@/components/dashboard/AdminSidebar';
import { ActiveView, NAV_ITEMS } from '@/constants/adminNavItems';
import NewsManagement from '@/components/dashboard/Home/ NewsManagement';
import AnnouncementManagement from '@/components/dashboard/Home/AnnouncementManagement';
import AdminGalleryPage from '@/components/dashboard/gallery/gallery';
import { useAuth } from '@/contexts/AuthContext'; 
import UserManager from '@/components/dashboard/user/UserManager';

export default function DashboardPage() {
    const { user } = useAuth(); 
  const [activeView, setActiveView] = useState<ActiveView>('hero-settings');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsSidebarOpen(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsSidebarOpen(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
  const currentNav = NAV_ITEMS.find(item => item.key === activeView);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex antialiased relative">
      {/* Sidebar */}
      <AdminSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        userName={user?.firstName || 'Guest'}
        userRole={user?.role || 'Staff'}
      />

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div
        className={`
          flex-1 flex flex-col min-h-screen bg-slate-950
          transition-all duration-300
          ml-0
          md:ml-64
          pt-16 md:pt-20
        `}
      >
        {/* Header */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-950 sticky top-0 md:top-20 z-30 px-4 md:px-6 flex items-center justify-between">
          {/* Left side – hidden on mobile */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xl text-teal-400">{currentNav?.icon}</span>
            <div>
              <h1 className="text-sm font-semibold text-slate-100">
                {currentNav?.label || 'Dashboard'}
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                CMS Control Center • Active Environment
              </p>
            </div>
          </div>

          {/* Right side – always visible */}
          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            {/* Status indicator – hidden on very small screens if needed */}
            <span className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-800/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">System Online</span>
            </span>
            {/* Hamburger – only on mobile */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-slate-950">
          {activeView === 'hero-settings' && <HeroSettings />}
          {activeView === 'services' && <ServiceManagement />}
          {activeView === 'news' && <NewsManagement />}
          {activeView === 'announcement' && <AnnouncementManagement />}
          {activeView === 'gallery' && <AdminGalleryPage />}
            {activeView === 'user' && <UserManager />}
          {activeView === 'leadership' && (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/50 border border-slate-800/80 rounded-2xl max-w-5xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl mb-4">👥</div>
              <h3 className="text-lg font-bold text-slate-100">Leadership Board</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1">Team member management coming soon.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}