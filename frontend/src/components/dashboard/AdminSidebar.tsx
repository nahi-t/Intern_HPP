// src/components/dashboard/AdminSidebar.tsx
'use client';

import React from 'react';
import { ActiveView, NAV_ITEMS } from '@/constants/adminNavItems';

interface AdminSidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function AdminSidebar({
  activeView,
  setActiveView,
  isSidebarOpen,
  toggleSidebar,
}: AdminSidebarProps) {
  const handleNavClick = (key: ActiveView) => {
    setActiveView(key);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <aside
      className={`
        fixed md:relative inset-y-0 left-0 z-50
        h-full w-64 bg-slate-900/95 backdrop-blur-md border-r border-slate-800/80
        flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >
      {/* Sidebar header with close button (mobile only) */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl text-teal-400">⚡</span>
          <span className="font-bold text-sm text-slate-100 tracking-tight">
            Admin<span className="text-teal-400">CMS</span>
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
        <p>v2.0.1 • Logged in</p>
      </div>
    </aside>
  );
}