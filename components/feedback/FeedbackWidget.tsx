'use client';

import { MessageCircleQuestion } from 'lucide-react';
import Link from 'next/link';


export default function FeedbackWidget() {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Feedback Button */}
      <Link
        href="/feedback"    
        className="flex-1 p-2 bg-[#FD5A1E] text-[#000000] font-medium rounded-full text-center shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors active:bg-[#FD5A1E]/80 duration-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black touch-manipulation"
        role="button"
        aria-label="Share Feedback"
        title="Share Feedback"
      >
        <MessageCircleQuestion width={28} height={28} className='shadow-md' />
       
      </Link>
    </div>
  );
}
