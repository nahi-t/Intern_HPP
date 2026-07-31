// src/components/about/AboutMissionVision.tsx
import React from 'react';

interface MissionVisionProps {
  mission: { title: string; text: string };
  vision: { title: string; text: string };
}

const AboutMissionVision: React.FC<MissionVisionProps> = ({ mission, vision }) => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-red-500">
            <h3 className="text-2xl font-bold text-blue-950">{mission.title}</h3>
            <p className="mt-3 text-gray-700">{mission.text}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-amber-500">
            <h3 className="text-2xl font-bold text-blue-950">{vision.title}</h3>
            <p className="mt-3 text-gray-700">{vision.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMissionVision;