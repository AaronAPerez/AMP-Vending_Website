'use client';

import { MessageCircleQuestion } from 'lucide-react';
import Link from 'next/link';


export default function FeedbackWidget() {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Feedback Button */}
      <Link
        href="/feedback"    
        className="flex items-center justify-center bg-[#FD5A1E] text-white p-2 rounded-full shadow-lg hover:bg-[#FD5A1E]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2"
        role="button"
        aria-label="Share Feedback"
        title="Share Feedback"
      >
        <MessageCircleQuestion width={28} height={28} />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
          />
      </Link>
    </div>
  );
}
