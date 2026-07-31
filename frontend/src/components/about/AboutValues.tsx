// src/components/about/AboutValues.tsx
import React from 'react';
import type { CoreValue } from '@/types/about';

interface AboutValuesProps {
  values: CoreValue[];
}

const AboutValues: React.FC<AboutValuesProps> = ({ values }) => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-950 border-l-4 border-red-500 pl-4 mb-8">
          Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div
              key={value.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
            >
              {value.icon && (
                <div className="text-4xl text-red-500 mb-3">
                  <i className={`fas ${value.icon}`} />
                </div>
              )}
              <h4 className="text-xl font-bold text-blue-950">{value.title}</h4>
              <p className="mt-2 text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;