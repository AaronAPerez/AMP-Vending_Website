'use client';

import Link from 'next/link';


export default function FeedbackWidget() {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Feedback Button */}
      <Link
        href="/feedback"    
        className="flex items-center justify-center bg-[#FD5A1E] text-white p-3 rounded-full shadow-lg hover:bg-[#FD5A1E]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2"
        role="button"
        aria-label="Share Feedback"
        title="Share Feedback"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
          />
        </svg>
      </Link>
    </div>
  );
}
