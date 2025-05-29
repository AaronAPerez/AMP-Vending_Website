'use client';

import { useState } from 'react';

/**
 * ResponsiveDebugger component
 * 
 * Development tool to show the current breakpoint and help test responsive designs
 * Only use during development
 */
const ResponsiveDebugger = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return (
    <button
      onClick={() => setIsVisible(true)}
      className="fixed bottom-4 left-4 z-50 bg-black text-white p-2 rounded-full"
      aria-label="Show responsive debugger"
    >
      📱
    </button>
  );
  
  return (
    <div className="fixed bottom-4 left-4 z-50 p-3 bg-black/80 text-white rounded-lg shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium">Responsive Debugger</p>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 text-gray-400 hover:text-white"
          aria-label="Hide responsive debugger"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-1 text-sm">
        <p className="xs:hidden">Current: default (&lt;480px)</p>
        <p className="hidden xs:block sm:hidden">Current: xs (480px+)</p>
        <p className="hidden sm:block md:hidden">Current: sm (640px+)</p>
        <p className="hidden md:block lg:hidden">Current: md (768px+)</p>
        <p className="hidden lg:block xl:hidden">Current: lg (1024px+)</p>
        <p className="hidden xl:block 2xl:hidden">Current: xl (1280px+)</p>
        <p className="hidden 2xl:block">Current: 2xl (1536px+)</p>
      </div>
      
      <div className="flex items-center gap-2 text-xs mt-2 text-gray-300">
        <span className="block w-3 h-3 bg-green-500 rounded-full"></span>
        <span>Width: {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px</span>
      </div>
    </div>
  );
};

export default ResponsiveDebugger;