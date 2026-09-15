'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'news', href: '/news' },
  { label: 'Rehabilitation', href: '/rehabilitation' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'department', href: '/departments' },
  { label: 'contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    router.push('/');
    closeMenu();
  };

  return (
    <>
      {/* ─── Navbar ─── */}
      <nav className="bg-white border-b-4 border-amber-600 shadow-sm sticky top-0 z-50">
        <div className="w-full px-0">
          <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
            
            {/* ─── LEFT: Hamburger (mobile) + Logo (desktop) ─── */}
            <div className="flex items-center">
              {/* Mobile hamburger (visible on small screens) */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-amber-600 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-200"
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="relative w-6 h-6">
                    <span
                      className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                        isOpen ? 'rotate-45 top-2.5' : 'rotate-0 top-1'
                      }`}
                    />
                    <span
                      className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                        isOpen ? 'opacity-0' : 'opacity-100 top-2.5'
                      }`}
                    />
                    <span
                      className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                        isOpen ? '-rotate-45 top-2.5' : 'rotate-0 top-4'
                      }`}
                    />
                  </div>
                </button>
              </div>

              {/* Desktop logo (hidden on mobile) */}
              <div className="hidden md:block flex-shrink-0">
                <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
                  <Image
                    src="/images/logo.jpg"
                    alt="Harari Prison Police Logo"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                  <span className="text-lg md:text-2xl font-bold tracking-widest text-gray-800 uppercase ml-2">
                    HARARI PRISON POLICE
                  </span>
                </Link>
              </div>
            </div>

            {/* ─── CENTER: Nav Links (desktop only) ─── */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center space-x-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group ${
                        isActive
                          ? 'text-amber-700 bg-amber-50'
                          : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute inset-x-4 -bottom-1 h-0.5 bg-amber-600 transition-transform duration-200 origin-left ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ─── RIGHT: Logo (mobile) + Auth (desktop) ─── */}
            <div className="flex items-center space-x-1">
              {/* Mobile logo (visible on small screens) */}
              <div className="md:hidden flex-shrink-0">
                <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
                  <Image
                    src="/images/logo.jpg"
                    alt="Harari Prison Police Logo"
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <span className="text-sm font-bold tracking-widest text-gray-800 uppercase ml-1">
                    HPP
                  </span>
                </Link>
              </div>

              {/* Desktop auth controls (hidden on mobile) */}
              <div className="hidden md:flex items-center space-x-1">
                {isAuthenticated && user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        pathname === '/dashboard'
                          ? 'text-amber-700 bg-amber-50'
                          : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                      }`}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="ml-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="px-5 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-md transition-colors shadow-md hover:shadow-lg"
                  >
                    <i className="fas fa-sign-in-alt mr-2" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Drawer (slides from left) ─── */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={closeMenu}
        />
        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 h-full w-3/4 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full p-6 overflow-y-auto">
            {/* Close button (top right) */}
            <div className="flex justify-end">
              <button
                onClick={closeMenu}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Brand inside drawer */}
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/images/logo.jpg"
                alt="Harari Prison Police Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-lg font-bold text-gray-800 uppercase">Harari Prison Police</span>
            </div>

            {/* Nav links */}
            <nav className="flex-1 space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'text-amber-700 bg-amber-50'
                        : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Auth actions (mobile) */}
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
              {isAuthenticated && user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                >
                  <i className="fas fa-sign-in-alt mr-2" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;