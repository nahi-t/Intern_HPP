// src/app/rehabilitation/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { rehabPrograms, RehabProgram } from '@/constants/rehabilitationData';

// Generate static paths for all programs (Faster builds + instant loads)
export async function generateStaticParams() {
  return rehabPrograms.map((program) => ({
    slug: program.slug,
  }));
}

// Helper to get accent colors for the detail page
const getAccentStyles = (color: string) => {
  switch (color) {
    case 'green': return { bgHero: 'from-green-950 via-green-900/80', text: 'text-green-600', badge: 'bg-green-600' };
    case 'yellow': return { bgHero: 'from-yellow-950 via-yellow-900/80', text: 'text-yellow-500', badge: 'bg-yellow-500' };
    case 'red': return { bgHero: 'from-red-950 via-red-900/80', text: 'text-red-600', badge: 'bg-red-600' };
    default: return { bgHero: 'from-gray-900', text: 'text-gray-900', badge: 'bg-gray-600' };
  }
};

export default async function RehabilitationProgramPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params; // Next.js 15 async params
  const program = rehabPrograms.find((p) => p.slug === slug);

  // If program not found, show 404
  if (!program) notFound();

  const styles = getAccentStyles(program.accentColor);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-r ${styles.bgHero} to-gray-900 py-16 md:py-24 overflow-hidden`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <Link 
            href="/rehabilitation" 
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-6"
          >
            <span className="mr-2">&larr;</span> Back to Programs
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-4xl">
            {program.title}
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl">
            {program.description}
          </p>
          <div className={`mt-6 inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white ${styles.badge}`}>
            {program.accentColor === 'green' ? 'Mental Health & Social' : 
             program.accentColor === 'yellow' ? 'Hands-on Trades' : 'Academic Learning'}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Description and Prerequisites */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-green-600 pl-4">
                Full Program Breakdown
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {program.fullDescription.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-green-600 pl-4">
                Program Features
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                    <span className={`mr-3 mt-1 flex-shrink-0 ${styles.text}`}>✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-green-600 pl-4">
                Prerequisites & Requirements
              </h2>
              <ul className="space-y-2 text-gray-700 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                {program.prerequisites.map((req, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-3 mt-1 text-yellow-500">●</span>
                    <span>{req}</span>
                  </li>
                ))}
                <li className="flex items-start border-t border-gray-100 pt-3 mt-3">
                  <span className="mr-3 mt-1 text-yellow-500">●</span>
                  <span>Strong motivation to participate and complete the curriculum</span>
                </li>
              </ul>
            </section>
          </div>

          {/* Right Column: Metadata Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border-t-8 border-green-600 p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Program Details</h3>
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Duration</p>
                  <p className="text-gray-900 font-medium mt-1">{program.duration}</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Program Coordinator</p>
                  <p className="text-gray-900 font-medium mt-1">{program.coordinator}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Service Type</p>
                  <p className="text-gray-900 font-medium mt-1">
                    {program.accentColor === 'green' ? 'Therapy / Health' : 
                     program.accentColor === 'yellow' ? 'Vocational Trade' : 'Educational'}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-green-800 font-medium">Refer an Inmate</p>
                    <button className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg shadow transition-colors">
                      Submit Referral
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}