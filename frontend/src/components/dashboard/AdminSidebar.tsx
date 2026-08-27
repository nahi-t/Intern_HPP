// src/components/dashboard/AdminSidebar.tsx
'use client';

import React from 'react';
import { ActiveView, NAV_ITEMS } from '@/constants/adminNavItems';

interface AdminSidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  // Real login data passed from JWT Auth Context
  userName: string; 
  userRole: string;
}

export default function AdminSidebar({
  activeView,
  setActiveView,
  isSidebarOpen,
  toggleSidebar,
  userName, 
  userRole,
}: AdminSidebarProps) {
  const handleNavClick = (key: ActiveView) => {
    setActiveView(key);
    if (window.innerWidth < 768) toggleSidebar();
  };

  // Generate dynamic initials (e.g., "John Doe" -> "JD")
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'U';

  return (
    <aside
      className={`
        fixed left-0 z-50
        w-64 bg-slate-900/95 backdrop-blur-md border-r border-slate-800/80
        flex flex-col transition-transform duration-300 ease-in-out
        top-20 h-[calc(100vh-5rem)]        
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >
      {/* Header with HPP CMS */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl text-teal-400">⚡</span>
          <span className="font-bold text-sm text-slate-100 tracking-tight">
            HPP<span className="text-teal-400">CMS</span>
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-slate-800/60 transition"
          aria-label="Close sidebar"
        >
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Real Login Profile Section */}
      <div className="px-4 py-6 border-b border-slate-800/80 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {initials}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-100 truncate">{userName}</p>
            <p className="text-xs text-teal-400 font-medium">{userRole}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.key;
          return (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.key)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                transition-all duration-200
                ${isActive
                  ? 'bg-teal-600/20 text-teal-300 border border-teal-600/30 shadow-lg shadow-teal-600/10'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                }
              `}
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              <span className="font-medium truncate">{item.label}</span>
              {isActive && <span className="ml-auto w-2 h-2 rounded-full bg-teal-400 animate-pulse" />}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-800/80 p-4 text-xs text-slate-500 shrink-0">
        <p>v2.0.1 • Logged in as {userRole}</p>
      </div>
    </aside>
  );
}