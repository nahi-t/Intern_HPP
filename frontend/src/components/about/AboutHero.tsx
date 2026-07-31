// src/components/about/AboutHero.tsx
import React from 'react';
import AboutFlagDecoration from "./AboutFlagDecoration"

interface AboutHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

const AboutHero: React.FC<AboutHeroProps> = ({ title, subtitle, description }) => {
  return (
    <section className="relative bg-blue-950 text-white py-16 md:py-24 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {title}
        </h1>
        <h2 className="mt-2 text-xl md:text-2xl text-red-300 font-semibold">
          {subtitle}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-200 text-lg leading-relaxed">
          {description}
        </p>
        <AboutFlagDecoration />
      </div>
    </section>
  );
};

export default AboutHero;