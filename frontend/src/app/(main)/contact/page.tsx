// src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import { contactInfo, mapEmbedUrl } from '@/constants/contactData';

export default function ContactPage() {
  // 1. Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Handle Form Submission (Interactive)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Form Submitted:', formData);
    alert('Thank you! Your message has been sent successfully.');
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/20">
      
      {/* 1. Hero Section */}
      <div className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-900/80 to-gray-900 opacity-90" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 204, 0, 0.1) 0%, transparent 50%)' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Contact <span className="text-yellow-400">Us</span>
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions, feedback, or need assistance? Reach out to the Harari Prison Police Department through any of the channels below.
          </p>
        </div>
      </div>

      {/* 2. Main Content: Info & Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          
          {/* --- Left Column: Contact Information --- */}
          <div className="space-y-8">
            <div className="border-l-4 border-green-600 pl-4">
              <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
              <p className="text-gray-500 mt-1">We are here to help. Reach us via any of the methods below.</p>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-green-600/30 transition-colors">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Office Address</h4>
                <p className="text-gray-600 mt-1 text-sm">
                  {contactInfo.address.street}<br />
                  {contactInfo.address.city}<br />
                  {contactInfo.address.postalCode}
                </p>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-green-600/30 transition-colors">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Phone Numbers</h4>
                <ul className="mt-1 text-sm text-gray-600 space-y-1">
                  {contactInfo.phoneNumbers.map((phone, idx) => (
                    <li key={idx}>{phone}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-green-600/30 transition-colors">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Email Address</h4>
                <ul className="mt-1 text-sm text-gray-600 space-y-1">
                  {contactInfo.emails.map((email, idx) => (
                    <li key={idx}>
                      <a href={`mailto:${email}`} className="hover:text-green-600 transition-colors underline underline-offset-2">
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Working Hours */}
            <div className="mt-2 text-sm text-gray-500 italic border-t border-gray-100 pt-4">
              ⏰ {contactInfo.workingHours}
            </div>
          </div>

          {/* --- Right Column: Interactive Contact Form --- */}
          <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Send us a Message</h3>
            <p className="text-sm text-gray-500 mb-6">We'll get back to you as soon as possible.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow"
                    placeholder="johndoe@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 text-white font-bold rounded-lg shadow-md transition-all transform hover:-translate-y-1 ${
                  isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Google Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-2xl shadow-xl border-t-8 border-green-600 overflow-hidden p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-green-600 pl-4">
              Our Location
            </h2>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-green-600 hover:text-green-700 underline"
            >
              View on Google Maps
            </a>
          </div>
          
          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Harari Prison Police Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}