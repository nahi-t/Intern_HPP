// src/components/dashboard/AdminSidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { NAV_ITEMS, NavItem, ActiveView } from '@/constants/adminNavItems';

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
  const { user, logout } = useAuth();

  // Toggle for the "Home" dropdown
  const [isHomeOpen, setIsHomeOpen] = useState(true);

  return (
    <aside
      className={`fixed left-0 bottom-0 z-40 bg-slate-900 border-r border-slate-800/80 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      } top-20`}
    >
      {/* Top section */}
      <div>
        {/* Brand / Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/80 bg-slate-900">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-teal-500/20 shrink-0">
              🌊
            </div>
            {isSidebarOpen && (
              <span className="font-semibold tracking-tight text-slate-100 whitespace-nowrap">
                CMS Suite
              </span>
            )}
          </div>

          {/* Toggle button */}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* User Account Card */}
        {isSidebarOpen && (
          <div className="p-4 mx-3 mt-4 rounded-xl bg-slate-950 border border-slate-800/80">
            <p className="text-xs font-semibold text-slate-200 truncate">
              {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Administrator'}
            </p>
            <span className="inline-block mt-1 text-[10px] uppercase font-semibold tracking-wider text-teal-400 bg-teal-950/60 border border-teal-800/50 px-2 py-0.5 rounded-md">
              {user?.role || 'Super Admin'}
            </span>
          </div>
        )}

        {/* --- "Home" DROPDOWN (collapsible) --- */}
        <nav className="p-3 space-y-1.5 mt-2">
          {/* Section header with toggle */}
          <div className="flex items-center justify-between px-3 mb-1">
            <p
              className={`text-[10px] font-semibold uppercase tracking-wider text-slate-500 ${
                !isSidebarOpen && 'hidden'
              }`}
            >
              Home
            </p>
            {isSidebarOpen && (
              <button
                onClick={() => setIsHomeOpen(!isHomeOpen)}
                className="text-slate-500 hover:text-slate-300 transition-colors"
              >
                <span className="text-sm font-bold">{isHomeOpen ? '−' : '+'}</span>
              </button>
            )}
          </div>

          {/* Nav items – shown only when expanded */}
          {(isHomeOpen || !isSidebarOpen) &&
            NAV_ITEMS.map((item) => {
              const isActive = activeView === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveView(item.key)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}
                    >
                      {item.icon}
                    </span>
                    {isSidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
                  </div>

                  {isSidebarOpen && item.badge && (
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-teal-500/40 text-white border border-teal-400/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
        </nav>

        {/* --- Separate link to public site --- */}
        <div className="px-3 pb-2">
          <Link
            href="/"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all ${
              !isSidebarOpen && 'justify-center'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {isSidebarOpen && <span>Visit Public Site</span>}
          </Link>
        </div>
      </div>

      {/* Logout button */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900">
        <button
          onClick={logout}
          className={`w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-200 hover:bg-rose-950/30 border border-rose-900/30 transition-all ${
            !isSidebarOpen && 'p-2'
          }`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4-4H7m6 4v1" />
          </svg>
          {isSidebarOpen && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}