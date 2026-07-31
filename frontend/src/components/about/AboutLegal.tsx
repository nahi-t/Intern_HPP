// src/components/about/AboutLegal.tsx
import React from 'react';

interface AboutLegalProps {
  title: string;
  items: string[];
}

const AboutLegal: React.FC<AboutLegalProps> = ({ title, items }) => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-950 border-l-4 border-red-500 pl-4 mb-6">
          {title}
        </h2>
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-red-500 font-bold mt-1">•</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutLegal;