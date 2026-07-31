// src/components/about/AboutHistory.tsx
import React from 'react';

interface AboutHistoryProps {
  title: string;
  content: string[];
}

const AboutHistory: React.FC<AboutHistoryProps> = ({ title, content }) => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-950 border-l-4 border-red-500 pl-4 mb-6">
          {title}
        </h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHistory;