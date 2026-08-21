// app/(main)/page.tsx (or wherever your Home component is)
'use client';

import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import ServiceCard from '@/components/ServiceCard';
import NewsCard from '@/components/NewsCard';
import { useServices } from '@/hooks/home/useServices';
import { useNews } from '@/hooks/home/useNews';
import { SERVICES } from '@/constants/homeConstants';
import { newsData } from '@/constants/newsData';



export default function HomePage() {
  const { services, loading: servicesLoading, error: servicesError, fetchServices } = useServices();
  const { news, loading: newsLoading, error: newsError, fetchAll } = useNews();

  useEffect(() => {
    fetchServices();
    fetchAll();
  
  }, []);

// ✅ Corrected version
const displayServices = services.length > 0 ? services : SERVICES;
  const displayNews = news.length > 0 ? news : newsData;
// const  displayServices=SERVICES
// const displayNews = newsData


  return (
    <>
      <Hero />

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Services"
            subtitle="Comprehensive support for rehabilitation and reintegration"
            centered
          />

          {servicesLoading && <div className="text-center py-12 text-gray-500">Loading services...</div>}
          {servicesError && <div className="text-center py-12 text-red-500">Error: {servicesError}</div>}

          {!servicesLoading && !servicesError && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
     
            </div>
          )}
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Latest News" centered />

          {newsLoading && <div className="text-center py-12 text-gray-500">Loading news...</div>}
          {newsError && <div className="text-center py-12 text-red-500">Error: {newsError}</div>}

          {!newsLoading && !newsError && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {displayNews.map((item) => (
                <NewsCard
                  id={item.id}
                  title={item.title}
                  excerpt={item.excerpt}
                  date={item.date}
                  // image={item.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Leadership Section */}
      {/* <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-amber-400">
                {LEADERSHIP.title}
              </h2>
              <p className="mt-4 text-gray-300 text-lg leading-relaxed">
                {LEADERSHIP.message}
              </p>
              <p className="mt-4 text-amber-400 font-semibold">
                {LEADERSHIP.name}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Contact Info</h3>
              <p className="mt-2 text-gray-300 text-lg">{LEADERSHIP.contact}</p>
              <h3 className="mt-6 text-xl font-semibold text-white">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#legal" className="text-amber-400 hover:text-amber-300 transition-colors">
                    {LEADERSHIP.links.legal}
                  </a>
                </li>
                <li>
                  <a href="#prison" className="text-amber-400 hover:text-amber-300 transition-colors">
                    {LEADERSHIP.links.prison}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}