
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Home, Phone, Search } from 'lucide-react';

/**
 * Metadata for the 404 page
 */
export const metadata: Metadata = {
  title: '404 - Page Not Found | AMP Vending',
  description: 'The page you are looking for could not be found. Return to AMP Vending homepage for premium vending machine solutions.',
  robots: 'noindex, nofollow', // Prevent 404 pages from being indexed
};

/**
 * Custom 404 Not Found Page
 * 
 * Provides a user-friendly 404 experience with:
 * - Clear messaging about the error
 * - Helpful navigation options
 * - Consistent branding with the main site
 * - Accessibility features
 * - SEO considerations (noindex)
 */
 * Custom 404 Not Found page for AMP Vending
 * 
 * This page appears when users navigate to a non-existent page
 * Provides helpful navigation options and maintains brand styling
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | AMP Vending',
  description: 'The page you are looking for does not exist.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="404-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="#A5ACAF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#404-grid)" />
        </svg>
      </div>

      {/* Gradient Accents */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#FD5A1E]/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#FD5A1E]/10 to-transparent rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-[#FD5A1E] mb-4 tracking-tight">
            404
          </h1>
          <div className="w-24 h-1 bg-[#FD5A1E] mx-auto mb-6"></div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-[#A5ACAF] mb-6 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. The page may have been moved, 
            deleted, or you may have entered an incorrect URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="group inline-flex items-center justify-center px-6 py-3 bg-[#FD5A1E] text-white font-medium rounded-lg hover:bg-[#FD5A1E]/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Return to homepage"
          >
            <Home size={20} className="mr-2" />
            Go to Homepage
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-[#A5ACAF] text-[#F5F5F5] font-medium rounded-lg hover:bg-[#4d4d4d] hover:border-[#FD5A1E] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A5ACAF] focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Go back to previous page"
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="bg-[#111111] rounded-xl p-6 border border-[#333333]">
          <h3 className="text-lg font-semibold text-[#F5F5F5] mb-4">
            Looking for something specific?
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/vending-machines"
              className="group flex items-center p-3 bg-[#0a0a0a] rounded-lg border border-[#333333] hover:border-[#FD5A1E] transition-all duration-300"
            >
              <div className="w-10 h-10 bg-[#FD5A1E]/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#FD5A1E]/20 transition-colors">
                <Search size={20} className="text-[#FD5A1E]" />
              </div>
              <div className="text-left">
                <div className="text-[#F5F5F5] font-medium">Vending Machines</div>
                <div className="text-[#A5ACAF] text-sm">View our premium machines</div>
              </div>
            </Link>

            <Link
              href="/contact"
              className="group flex items-center p-3 bg-[#0a0a0a] rounded-lg border border-[#333333] hover:border-[#FD5A1E] transition-all duration-300"
            >
              <div className="w-10 h-10 bg-[#FD5A1E]/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#FD5A1E]/20 transition-colors">
                <Phone size={20} className="text-[#FD5A1E]" />
              </div>
              <div className="text-left">
                <div className="text-[#F5F5F5] font-medium">Contact Us</div>
                <div className="text-[#A5ACAF] text-sm">Get in touch with our team</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-[#A5ACAF] text-sm mb-2">
            Need immediate assistance?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a
              href="tel:+12094035450"
              className="text-[#FD5A1E] hover:text-[#FD5A1E]/80 transition-colors focus:outline-none focus:underline"
              aria-label="Call us at (209) 403-5450"
            >
              Call: (209) 403-5450
            </a>
            <span className="hidden sm:inline text-[#A5ACAF]">•</span>
            <a
              href="mailto:ampdesignandconsulting@gmail.com"
              className="text-[#FD5A1E] hover:text-[#FD5A1E]/80 transition-colors focus:outline-none focus:underline"
              aria-label="Email us at ampdesignandconsulting@gmail.com"
            >
              Email: ampdesignandconsulting@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}