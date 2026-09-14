// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-950 text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: About / Mission */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-red-400 border-b-2 border-red-500 inline-block pb-2 mb-4">
              About Us
            </h3>
            <p className="text-sm text-gray-100 leading-relaxed">
              The Harari Regional State Prison Police Commission is committed to fostering 
              security, justice, and rehabilitation through transparent governance 
              and community engagement.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-red-400 border-b-2 border-red-500 inline-block pb-2 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-red-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/inmate-services" className="hover:text-red-300 transition-colors">
                  Inmate Services
                </Link>
              </li>
              <li>
                <Link href="/community-programs" className="hover:text-red-300 transition-colors">
                  Community Programs
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-red-300 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-red-400 border-b-2 border-red-500 inline-block pb-2 mb-4">
              Contact
            </h3>
            <address className="not-italic text-sm space-y-2">
              <p>
                <span className="font-semibold text-red-300">Address:</span><br />
                Harari Regional State,<br />
                Harari, Ethiopia
              </p>
              <p>
                <span className="font-semibold text-red-300">Phone:</span><br />
                <a href="tel:+251-XXX-XXXX" className="hover:text-red-300 transition-colors">
                  +251-XXX-XXXX
                </a>
              </p>
              <p>
                <span className="font-semibold text-red-300">Email:</span><br />
                <a href="mailto:info@harariprison.gov.et" className="hover:text-red-300 transition-colors">
                  info@harariprison.gov.et
                </a>
              </p>
            </address>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-red-400 border-b-2 border-red-500 inline-block pb-2 mb-4">
              Connect with Us
            </h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-red-600 p-3 rounded-full transition-colors duration-300"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f text-xl text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-red-600 p-3 rounded-full transition-colors duration-300"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-red-600 p-3 rounded-full transition-colors duration-300"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-xl text-white" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-red-600 p-3 rounded-full transition-colors duration-300"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube text-xl text-white" />
              </a>
            </div>
            <p className="text-xs text-gray-200">
              Follow us for the latest updates and community news.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-red-700/50 bg-blue-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-200">
            &copy; {currentYear} Harari Regional State Prison Police Commission. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;