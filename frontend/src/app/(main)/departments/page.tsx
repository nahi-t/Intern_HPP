// src/app/departments/page.tsx
import Link from 'next/link';
import { departments } from '@/constants/departments'

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Departments & Structure
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Explore our organizational units dedicated to maintaining safety, order, and rehabilitation within our facility.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <Link 
              key={dept.id} 
              href={`/departments/${dept.slug}`}
              className="block group"
            >
              <div className="relative bg-white rounded-lg shadow-md border-2 border-gray-100 transition-all duration-300 group-hover:border-amber-600/50 group-hover:shadow-lg overflow-hidden h-full p-6 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                    {dept.title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                    {dept.shortDesc}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm font-medium text-amber-600 group-hover:text-amber-700">
                  <span>Learn more</span>
                  <span aria-hidden="true">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}