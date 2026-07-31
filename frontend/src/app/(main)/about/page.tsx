// app/(main)/about/page.tsx
import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import AboutHistory from '@/components/about/AboutHistory';
import AboutMissionVision from '@/components/about/AboutMissionVision';
import AboutValues from '@/components/about/AboutValues';
import AboutStructure from '@/components/about/AboutStructure';
import AboutLeadership from '@/components/about/AboutLeadership';
import AboutLegal from '@/components/about/AboutLegal';
import {
  ABOUT_HERO,
  HISTORY,
  MISSION_VISION,
  CORE_VALUES,
  STRUCTURE,
  LEADERSHIP,
  LEGAL_MANDATES,
} from '@/constants/aboutConstants';

export const metadata = {
  title: 'About Us | Harari Prison Police Commission',
  description: 'Learn about the Harari Regional State Prison Police Commission – history, mission, vision, values, leadership, and legal framework.',
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero
        title={ABOUT_HERO.title}
        subtitle={ABOUT_HERO.subtitle}
        description={ABOUT_HERO.description}
      />
      <AboutHistory title={HISTORY.title} content={HISTORY.content} />
      <AboutMissionVision mission={MISSION_VISION.mission} vision={MISSION_VISION.vision} />
      <AboutValues values={CORE_VALUES} />
      <AboutStructure
        title={STRUCTURE.title}
        description={STRUCTURE.description}
        units={STRUCTURE.units}
      />
      <AboutLeadership leaders={LEADERSHIP} />
      <AboutLegal title={LEGAL_MANDATES.title} items={LEGAL_MANDATES.items} />
    </main>
  );
}