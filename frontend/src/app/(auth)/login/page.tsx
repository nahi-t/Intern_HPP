'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      // Redirect after successful login
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950 p-4 relative overflow-hidden">
      {/* Ambient lights */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-[130px] pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200/80 z-10">
        <div className="h-1.5 bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-600" />

        <div className="px-8 pt-10 pb-6 text-center bg-slate-50/70 border-b border-slate-100">
          <div className="flex flex-col items-center">
            <div className="p-1.5 bg-white rounded-full shadow-md border border-slate-200/60 mb-4 inline-block">
              <Image
                src="/images/logo.jpg"
                alt="Harari Prison Police Logo"
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-xl font-extrabold text-slate-800 tracking-wider uppercase">
              Harari <span className="text-cyan-700 font-bold">Prison</span> Police
            </h1>
            <p className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase mt-1.5">
              Secure Administrative Access
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
          {error && (
            <div className="text-xs text-red-700 flex items-center gap-3 bg-red-50 p-3.5 rounded-xl border border-red-200/60 transition-all">
              <i className="fas fa-exclamation-circle text-sm flex-shrink-0" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                <i className="fas fa-envelope" />
              </span>
              <input
                type="email"
                className="w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10 focus:bg-white transition duration-200 outline-none text-sm font-medium"
                placeholder="officer@hararipolice.gov.et"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                <i className="fas fa-lock" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full pl-11 pr-12 py-3.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10 focus:bg-white transition duration-200 outline-none text-sm font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition p-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-6 bg-gradient-to-r from-cyan-700 via-teal-700 to-cyan-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-900/20 hover:from-cyan-600 hover:via-teal-600 hover:to-cyan-700 active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2.5 tracking-wide uppercase"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In Securely</span>
                <i className="fas fa-shield-alt opacity-80" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-400 hover:text-cyan-700 transition group"
            >
              <i className="fas fa-arrow-left group-hover:-translate-x-1 transition duration-200" />
              Return to Public Site
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}