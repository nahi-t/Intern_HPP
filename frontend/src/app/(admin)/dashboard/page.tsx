// src/app/(admin)/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import HeroSettings from '@/components/dashboard/Home/HeroSettings';
import ServiceManagement from '@/components/dashboard/Home/ServiceManagement';
import AdminSidebar from '@/components/dashboard/AdminSidebar';
import { ActiveView, NAV_ITEMS } from '@/constants/adminNavItems';
import NewsManagement from '@/components/dashboard/Home/ NewsManagement';
import AnnouncementManagement from '@/components/dashboard/Home/AnnouncementManagement';

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<ActiveView>('hero-settings');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const currentNav = NAV_ITEMS.find((item) => item.key === activeView);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex antialiased">
      {/* Sidebar */}
      <AdminSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col min-h-screen bg-slate-950 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        } pt-20`}
      >
        {/* Top Header – sticky below public navbar */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-950 sticky top-20 z-30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl text-teal-400">{currentNav?.icon}</span>
            <div>
              <h1 className="text-sm font-semibold text-slate-100">
                {currentNav?.label || 'Dashboard'}
              </h1>
              <p className="text-[11px] text-slate-400">
                CMS Control Center &bull; Active Environment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-800/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              System Online
            </span>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 p-6 md:p-8 bg-slate-950">
          {activeView === 'hero-settings' && <HeroSettings />}
          {activeView === 'services' && <ServiceManagement />}
          {activeView === 'news' && <NewsManagement />}
           {activeView === 'announcement' && <AnnouncementManagement />
}

          {/* {activeView === 'Ledership' && (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/50 border border-slate-800/80 rounded-2xl max-w-5xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl mb-4">
                📰
              </div>
              <h3 className="text-lg font-bold text-slate-100">News &amp; Media Module</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                This feature module is scheduled for Phase 2 deployment.
              </p>
            </div>
          )} */}
          {activeView === 'leadership' && (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/50 border border-slate-800/80 rounded-2xl max-w-5xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl mb-4">
                👥
              </div>
              <h3 className="text-lg font-bold text-slate-100">Leadership Board</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Team member management and roster tools coming soon.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}