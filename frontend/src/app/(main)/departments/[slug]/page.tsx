// src/app/departments/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { departments } from '@/constants/departments';

// 1. Generate static paths at build time so Next.js knows these routes exist
export async function generateStaticParams() {
  return departments.map((dept) => ({
    slug: dept.slug,
  }));
}

// 2. Type params as a Promise and await it
export default async function DepartmentDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // ✅ CRITICAL FIX: Next.js 15 requires you to await params
  const { slug } = await params; 

  // Find the department using the slug
  const department = departments.find((dept) => dept.slug === slug);

  // If slug doesn't match, show the Next.js 404 page
  if (!department) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/departments" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-amber-600 transition-colors mb-6"
        >
          <span className="mr-2">&larr;</span> Back to Departments
        </Link>

        <div className="bg-white rounded-lg shadow-lg border-2 border-amber-600/20 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-50 to-white p-8 border-b-2 border-amber-600/20">
            <h1 className="text-3xl font-bold text-gray-900">{department.title}</h1>
            <p className="mt-2 text-lg text-gray-600">{department.shortDesc}</p>
          </div>
          <div className="p-8 space-y-10">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-amber-500 pl-3 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed text-base">{department.description}</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-amber-500 pl-3 mb-4">Responsibilities</h2>
              <ul className="space-y-3 text-gray-700">
                {department.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-3 mt-1 text-amber-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-amber-500 pl-3 mb-4">Contact Information</h2>
              <div className="bg-gray-50 rounded-lg p-5 space-y-3 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm">
                  <span className="font-medium text-gray-500">Phone</span>
                  <span className="text-gray-900">{department.contact.phone}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm border-t border-gray-200 pt-3">
                  <span className="font-medium text-gray-500">Email</span>
                  <a href={`mailto:${department.contact.email}`} className="text-amber-600 hover:text-amber-700 underline">
                    {department.contact.email}
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm border-t border-gray-200 pt-3">
                  <span className="font-medium text-gray-500">Office Location</span>
                  <span className="text-gray-900">{department.contact.office}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}