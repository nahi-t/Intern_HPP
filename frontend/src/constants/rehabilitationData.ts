// src/lib/data/rehabilitationData.ts

export const rehabStats = [
  { value: '2,400+', label: 'Inmates Enrolled' },
  { value: '85%', label: 'Program Completion Rate' },
  { value: '92%', label: 'Positive Reintegration Rate' },
];

export interface RehabProgram {
  id: string;
  slug: string; // NEW: For dynamic routing
  title: string;
  description: string;
  fullDescription: string[]; // NEW: Detailed paragraphs
  features: string[];
  duration: string; // NEW
  coordinator: string; // NEW
  prerequisites: string[]; // NEW
  accentColor: 'green' | 'yellow' | 'red';
}

export const rehabPrograms: RehabProgram[] = [
  {
    id: 'p1',
    slug: 'psychological-social-rehabilitation',
    title: 'Psychological & Social Rehabilitation',
    description: 'Comprehensive mental health and social reintegration support designed to address the root causes of criminal behavior.',
    fullDescription: [
      "Our Psychological & Social Rehabilitation program is the cornerstone of our correctional philosophy. We believe that true change must start from within. By addressing trauma, behavioral triggers, and emotional health, we prepare inmates to rebuild their lives from the ground up.",
      "This program combines intensive one-on-one therapy, group counseling sessions, and structured restorative justice practices. Inmates work closely with certified therapists to develop emotional regulation, empathy, and a strong foundation for positive decision-making."
    ],
    features: [
      'Cognitive Behavioral Therapy (CBT) sessions',
      'Anger management and conflict resolution',
      'Family counseling and restorative justice dialogues',
      'Addiction recovery and substance abuse treatment',
    ],
    duration: '6 - 12 Months (Structured Phase)',
    coordinator: 'Dr. Alemayehu Hailu, Clinical Director',
    prerequisites: ['No severe active psychosis', 'Willingness to participate in open group settings'],
    accentColor: 'green',
  },
  {
    id: 'p2',
    slug: 'vocational-technical-training',
    title: 'Vocational & Technical Training',
    description: 'Hands-on trade skills and certification programs that equip inmates with marketable abilities to secure employment upon release.',
    fullDescription: [
      "The Vocational & Technical Training program bridges the gap between incarceration and the workforce. We partner with local industry experts and trade unions to provide high-quality, hands-on experience in the most in-demand sectors.",
      "Participants not only learn the physical skills of a trade but also receive safety certifications, business ethics training, and job placement assistance. Our goal is to ensure every graduate leaves with a genuine pathway to sustainable, legal income."
    ],
    features: [
      'Welding, carpentry, and electrical installations',
      'Agricultural farming and livestock management',
      'Computer literacy and IT support fundamentals',
      'Industry-standard certifications upon completion',
    ],
    duration: '3 - 4 Months (Intensive)',
    coordinator: 'Berhanu Assefa, Trades Supervisor',
    prerequisites: ['Basic physical fitness', 'Commitment to 40-hour weekly attendance'],
    accentColor: 'yellow',
  },
  {
    id: 'p3',
    slug: 'academic-educational-programs',
    title: 'Academic & Educational Programs',
    description: 'Structured educational pathways ranging from basic literacy to high school equivalency, empowering inmates with the academic foundation needed to rebuild.',
    fullDescription: [
      "Education is the ultimate tool for empowerment. Our Academic & Educational Programs cater to learners at every level—from those who have never received formal schooling to those seeking to complete their high school equivalency.",
      "Our dedicated teaching staff utilize adaptive learning technologies and personalized lesson plans. Inmates acquire critical thinking skills, financial literacy, and a renewed sense of purpose, proving that it is never too late to learn."
    ],
    features: [
      'Adult Basic Education (ABE) and literacy',
      'High School Equivalency (GED) preparation',
      'Post-secondary correspondence courses',
      'Financial literacy and life-skills workshops',
    ],
    duration: 'Ongoing / Self-Paced',
    coordinator: 'Sara Taddesse, Head Educator',
    prerequisites: ['Minimum reading level of grade 3'],
    accentColor: 'red',
  },
];