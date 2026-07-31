// src/components/about/AboutLeadership.tsx
import React from 'react';
import Image from 'next/image';
import type { LeadershipProfile } from '@/types/about';

interface AboutLeadershipProps {
  leaders: LeadershipProfile[];
}

const AboutLeadership: React.FC<AboutLeadershipProps> = ({ leaders }) => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-950 border-l-4 border-red-500 pl-4 mb-8">
          Leadership
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 relative h-48 md:h-auto">
                {leader.image ? (
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                    <i className="fas fa-user-circle text-6xl" />
                  </div>
                )}
              </div>
              <div className="p-6 md:w-2/3">
                <h3 className="text-xl font-bold text-blue-950">{leader.name}</h3>
                <p className="text-sm text-red-500 font-medium">{leader.title}</p>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutLeadership;