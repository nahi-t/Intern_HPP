// src/constants/aboutConstants.ts
import type { LeadershipProfile, CoreValue } from '@/types/about';

export const ABOUT_HERO = {
  title: 'About the Commission',
  subtitle: 'Harari Regional State Prison Police Commission',
  description:
    'We are committed to upholding justice, ensuring security, and fostering rehabilitation within the Harari Regional State.',
};

export const HISTORY = {
  title: 'Our History',
  content: [
    'The Harari Regional State Prison Police Commission was established in [year] following the regional restructuring of Ethiopia’s federal prison system. It was created to address the unique security and rehabilitation needs of the Harari people, with a focus on community-based corrections and reintegration.',
    'Over the years, the commission has expanded its mandate to include modern correctional facilities, vocational training programs, and psychological support services, always guided by the principles of human dignity and the rule of law.',
  ],
};

export const MISSION_VISION = {
  mission: {
    title: 'Our Mission',
    text: 'To provide secure, humane, and rehabilitative correctional services that promote the reintegration of offenders as law‑abiding citizens, while safeguarding the rights and safety of the community.',
  },
  vision: {
    title: 'Our Vision',
    text: 'To be a model correctional institution in Ethiopia, recognized for excellence in security, rehabilitation, and community partnership.',
  },
};

export const CORE_VALUES: CoreValue[] = [
  {
    id: 1,
    title: 'Integrity',
    description: 'We act with honesty and transparency in all our dealings.',
    icon: 'fa-shield-halved',
  },
  {
    id: 2,
    title: 'Justice',
    description: 'We uphold the rule of law and ensure fairness in all processes.',
    icon: 'fa-scale-balanced',
  },
  {
    id: 3,
    title: 'Humanity',
    description: 'We treat every individual with dignity and respect, regardless of their background.',
    icon: 'fa-hand-holding-heart',
  },
  {
    id: 4,
    title: 'Professionalism',
    description: 'We strive for excellence through continuous learning and ethical conduct.',
    icon: 'fa-briefcase',
  },
];

export const STRUCTURE = {
  title: 'Organizational Structure',
  description: 'The Commission is led by a Commissioner, supported by deputy commissioners and directors for key functional areas.',
  // Could be a tree or list; we'll use a simple list of units.
  units: [
    'Office of the Commissioner',
    'Corrections and Rehabilitation Department',
    'Security and Intelligence Department',
    'Legal and Compliance Department',
    'Finance and Administration Department',
    'Human Resources and Training Department',
    'Community Relations and Outreach Department',
  ],
};

export const LEADERSHIP: LeadershipProfile[] = [
  {
    id: 1,
    name: 'Commissioner A. B. C.',
    title: 'Commissioner of Prisons',
    bio: 'With over 20 years of experience in correctional administration, Commissioner A.B.C. is dedicated to transforming the prison system through rehabilitation and community engagement.',
    image: '/images/leaders/commissioner.jpg',
  },
  {
    id: 2,
    name: 'Deputy Commissioner D. E. F.',
    title: 'Deputy Commissioner, Rehabilitation',
    bio: 'A certified psychologist and criminologist, Deputy Commissioner D.E.F. oversees all rehabilitation programs, including vocational training, education, and mental health services.',
    image: '/images/leaders/deputy.jpg',
  },
  // Add more as needed
];

export const LEGAL_MANDATES = {
  title: 'Legal Mandates and Framework',
  items: [
    'Proclamation No. XXX/202X – Harari Regional State Prison Police Commission Establishment Proclamation',
    'Federal Prison Administration Proclamation No. XXX/201X',
    'The Constitution of the Federal Democratic Republic of Ethiopia (Articles on Human Rights and Corrections)',
    'Regional Council Regulations on Correctional Institutions and Offender Management',
  ],
};