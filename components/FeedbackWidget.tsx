'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * FeedbackWidget Component
 * 
 * A compact floating widget that provides quick access to the feedback form
 * Can be placed on various pages throughout the site
 */
export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center bg-[#FD5A1E] text-white p-3 rounded-full shadow-lg hover:bg-[#FD5A1E]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-controls="feedback-options"
        aria-label={isOpen ? "Close feedback options" : "Open feedback options"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
      
      {/* Feedback Options */}
      {isOpen && (
        <div
          id="feedback-options"
          className="mb-3 bg-[#000000] text-[#F5F5F5] p-4 rounded-lg shadow-lg border border-[#a4acac] flex flex-col space-y-3 animate-fade-in-up"
          role="menu"
        >
          <span className="text-sm font-medium text-center">How can we help?</span>
          
          <Link
            href="/feedback"
            className="flex items-center space-x-2 text-[#F5F5F5] hover:text-[#FD5A1E] transition-colors"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span>Share Feedback</span>
          </Link>
          
          <a
            href="tel:+12094035450"
            className="flex items-center space-x-2 text-[#F5F5F5] hover:text-[#FD5A1E] transition-colors"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Call Support</span>
          </a>
          
          <a
            href="mailto:ampdesignandconsulting@gmail.com"
            className="flex items-center space-x-2 text-[#F5F5F5] hover:text-[#FD5A1E] transition-colors"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Email Us</span>
          </a>
        </div>
      )}
    </div>
  );
}

