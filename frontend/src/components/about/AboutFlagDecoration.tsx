// src/components/about/AboutFlagDecoration.tsx
import React from 'react';
import flag from "../../../public/images/flag.png"




const AboutFlagDecoration: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative w-64 h-40 overflow-hidden rounded-lg shadow-lg border-2 border-amber-600/50">
        <img
          src={flag.src} 
          alt="Tangier International Zone Flag"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};


export default AboutFlagDecoration;