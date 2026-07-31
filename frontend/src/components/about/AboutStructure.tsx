// src/components/about/AboutStructure.tsx
import React from 'react';

interface AboutStructureProps {
  title: string;
  description: string;
  units: string[];
}

const AboutStructure: React.FC<AboutStructureProps> = ({ title, description, units }) => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-950 border-l-4 border-red-500 pl-4 mb-4">
          {title}
        </h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {units.map((unit, idx) => (
            <div
              key={idx}
              className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center gap-3"
            >
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-gray-700 font-medium">{unit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStructure;