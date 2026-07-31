
// src/lib/data/departments.ts

import {Department} from "../types/department"

export const departments: Department[] = [
  {
    id: '1',
    slug: 'prison-administration',
    title: 'Prison Administration',
    shortDesc: 'Managing daily operations, inmate records, and court coordination.',
    description: 'The Prison Administration department ensures the smooth operation of the facility through strict adherence to protocols. We manage inmate intake, classification, record-keeping, and maintain direct communication with judicial authorities to facilitate court appearances and legal proceedings.',
    responsibilities: [
      'Overseeing daily facility operations and inmate management',
      'Maintaining accurate inmate records and case files',
      'Coordinating with courts for inmate transport and appearances',
      'Enforcing facility policies and disciplinary measures',
    ],
    contact: {
      phone: '+1 (555) 012-3456',
      email: 'admin@corrections.gov',
      office: 'Block A, Administration Wing, Floor 2',
    },
  },
  {
    id: '2',
    slug: 'rehabilitation-programs',
    title: 'Rehabilitation Programs',
    shortDesc: 'Offering education, counseling, and reintegration support.',
    description: 'Our Rehabilitation Programs department is dedicated to reducing recidivism. We provide inmates with the psychological support, vocational training, and educational courses necessary to successfully reintegrate into society upon their release.',
    responsibilities: [
      'Developing educational workshops and vocational training courses',
      'Providing psychological counseling and cognitive behavioral therapy',
      'Creating personalized reentry plans for soon-to-be-released individuals',
      'Partnering with external NGOs for continued support post-release',
    ],
    contact: {
      phone: '+1 (555) 012-7890',
      email: 'rehab@corrections.gov',
      office: 'Block C, Education Center, Floor 1',
    },
  },
  {
    id: '3',
    slug: 'security-division',
    title: 'Security Division',
    shortDesc: 'Perimeter control, surveillance, and incident response.',
    description: 'The Security Division is responsible for maintaining the safety of staff, inmates, and visitors. We deploy advanced surveillance technology, manage perimeter defenses, and execute rapid response strategies for any security breaches or emergency situations.',
    responsibilities: [
      'Monitoring CCTV networks and intruder detection systems',
      'Conducting regular perimeter patrols and security sweeps',
      'Managing tactical responses to disturbances or riots',
      'Securing inmate transport vehicles during external movements',
    ],
    contact: {
      phone: '+1 (555) 012-1111',
      email: 'security@corrections.gov',
      office: 'Block B, Security Command Center, Floor 0',
    },
  },
  {
    id: '4',
    slug: 'human-resources',
    title: 'Human Resources',
    shortDesc: 'Staffing, payroll, benefits, and employee relations.',
    description: 'Human Resources ensures the facility is adequately staffed with highly trained professionals. We manage recruitment, payroll processing, benefits administration, and provide support for employee welfare and union relations.',
    responsibilities: [
      'Recruiting, screening, and onboarding new staff',
      'Managing payroll, benefits, and leave requests',
      'Handling staff grievances and upholding labor relations',
      'Coordinating staff performance reviews and recognition programs',
    ],
    contact: {
      phone: '+1 (555) 012-2222',
      email: 'hr@corrections.gov',
      office: 'Block A, HR Suite, Floor 1',
    },
  },
  {
    id: '5',
    slug: 'training-division',
    title: 'Training Division',
    shortDesc: 'New officer orientation and continuous professional development.',
    description: 'The Training Division ensures every staff member is equipped with the skills and knowledge to perform their duties safely and legally. We design curricula for both new cadets and tenured staff to keep them up-to-date with modern correctional techniques.',
    responsibilities: [
      'Delivering new recruit orientation and basic training',
      'Facilitating annual refresher courses in defensive tactics',
      'Coordinating specialized certifications (firearms, crisis intervention)',
      'Hosting emergency response drills and scenario simulations',
    ],
    contact: {
      phone: '+1 (555) 012-3333',
      email: 'training@corrections.gov',
      office: 'Block D, Training Academy, Floor 3',
    },
  },
  {
    id: '6',
    slug: 'medical-services',
    title: 'Medical Services',
    shortDesc: 'Primary healthcare, emergency medicine, and mental health support.',
    description: 'Medical Services is dedicated to the physical and mental well-being of both inmates and staff. We provide comprehensive primary care, emergency trauma response, mental health services, and manage chronic health conditions within the facility.',
    responsibilities: [
      'Providing routine health screenings and primary care',
      'Managing emergency medical responses and trauma stabilization',
      'Offering psychiatric evaluations and mental health therapy',
      'Distributing and monitoring prescription medications',
    ],
    contact: {
      phone: '+1 (555) 012-4444',
      email: 'medical@corrections.gov',
      office: 'Block E, Medical Wing, Floor 1',
    },
  },
];