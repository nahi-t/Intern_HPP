'use client';

import React, { useState, useEffect } from 'react';
import { useHeroData } from '@/hooks/home/useHeroData';

const Hero: React.FC = () => {
  const { data, loading } = useHeroData();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    if (!data?.backgroundImages || data.backgroundImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  if (loading) return null;

  const { titleLine1, titleLine2, subtitle, primaryButton, secondaryButton } = data;

  const currentImage = data.backgroundImages[currentIndex];

  return (
    <section
      className="relative w-full h-screen flex items-center bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${currentImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            <span className="block">{titleLine1}</span>
            <span className="block text-amber-400">{titleLine2}</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="#rehabilitation" className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-md transition-all">
              {primaryButton}
            </a>
            <a href="#visit-inmate" className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-md border border-white/30 transition-all">
              {secondaryButton}
            </a>
          </div>
        </div>
      </div>

      {/* Slider Indicators (Dots) */}
      {data.backgroundImages.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {data.backgroundImages.map((_: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-amber-500 w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
