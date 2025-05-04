import useKeyboardNavigation from '@/hook/useKeyboardNavigation';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';


/**
 * Props for BeforeAfterSlider component
 */
interface BeforeAfterSliderProps {
  /**
   * Title for the slider section
   */
  title: string;
  
  /**
   * Label for the "before" state
   */
  beforeTitle: string;
  
  /**
   * Label for the "after" state
   */
  afterTitle: string;
  
  /**
   * Description text for the "before" state
   */
  beforeDescription: string;
  
  /**
   * Description text for the "after" state
   */
  afterDescription: string;
  
  /**
   * Image source URL for the "before" state
   */
  beforeImageSrc: string;
  
  /**
   * Image source URL for the "after" state
   */
  afterImageSrc: string;
  
  /**
   * Alt text for the "before" image (important for accessibility)
   */
  beforeImageAlt: string;
  
  /**
   * Alt text for the "after" image (important for accessibility)
   */
  afterImageAlt: string;
}

/**
 * BeforeAfterSlider Component
 * 
 * A toggle component that allows users to compare before and after states
 * with accessible keyboard navigation
 */
const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  title,
  beforeTitle,
  afterTitle,
  beforeDescription,
  afterDescription,
  beforeImageSrc,
  afterImageSrc,
  beforeImageAlt,
  afterImageAlt
}) => {
  // State to track whether we're showing the "after" state
  const [showAfter, setShowAfter] = useState(false);

  // Use custom hook for keyboard navigation
  useKeyboardNavigation({
    onLeftArrow: () => setShowAfter(false),
    onRightArrow: () => setShowAfter(true)
  });

  return (
    <div className="mx-auto max-w-4xl mb-8">
      <h2 className="text-2xl font-bold mb-4 text-[#F5F5F5] text-center">{title}</h2>
      
      {/* Toggle buttons for accessibility */}
      <div className="flex justify-center mb-4 gap-2">
        <button
          onClick={() => setShowAfter(false)}
          className={`px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] ${
            !showAfter ? 'bg-[#FD5A1E] text-[#F5F5F5]' : 'bg-[#4d4d4d] text-[#A5ACAF]'
          }`}
          aria-pressed={!showAfter}
          aria-label="Show before image"
        >
          {beforeTitle}
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className={`px-4 py-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] ${
            showAfter ? 'bg-[#FD5A1E] text-[#F5F5F5]' : 'bg-[#4d4d4d] text-[#A5ACAF]'
          }`}
          aria-pressed={showAfter}
          aria-label="Show after image"
        >
          {afterTitle}
        </button>
      </div>
      
      {/* Image comparison container */}
      <div className="relative w-full h-96 overflow-hidden rounded-lg border-2 border-[#A5ACAF]">
        {/* Before image */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-[#4d4d4d] flex justify-center items-center transition-opacity duration-500"
          style={{ opacity: showAfter ? 0 : 1 }}
          aria-hidden={showAfter}
        >
          <div className="p-6 text-center">
            <div className="bg-[#4d4d4d] p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-[#A5ACAF]">Standard Break Room</h3>
              <div className="border-2 border-[#a4acac] rounded-lg p-4 mb-4 bg-[#000000]">
                <Image
                  src={beforeImageSrc} 
                  alt={beforeImageAlt} 
                  className="mx-auto max-h-48"
                />
              </div>
              <p className="text-[#F5F5F5] mb-4">{beforeDescription}</p>
            </div>
          </div>
        </div>
        
        {/* After image */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-[#4d4d4d] flex justify-center items-center transition-opacity duration-500"
          style={{ opacity: showAfter ? 1 : 0 }}
          aria-hidden={!showAfter}
        >
          <div className="p-6 text-center">
            <div className="bg-[#000000] p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-[#FD5A1E]">Enhanced Break Room</h3>
              <div className="bg-[#4d4d4d] p-2 rounded-lg">
                <Image 
                  src={afterImageSrc} 
                  alt={afterImageAlt}
                  className="mx-auto max-h-48" 
                />
              </div>
              <p className="text-[#F5F5F5] mt-4">{afterDescription}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation arrows for mobile */}
        <button 
          onClick={() => setShowAfter(false)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#000000] bg-opacity-50 p-2 rounded-full text-[#F5F5F5] z-10 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E]"
          aria-label="View before state"
          style={{ display: showAfter ? 'block' : 'none' }}
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={() => setShowAfter(true)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#000000] bg-opacity-50 p-2 rounded-full text-[#F5F5F5] z-10 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E]"
          aria-label="View after state"
          style={{ display: !showAfter ? 'block' : 'none' }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Screen reader text explaining keyboard navigation */}
      <div className="sr-only">
        Use left and right arrow keys to switch between before and after views.
      </div>
      
      {/* Visible keyboard navigation hint */}
      <div className="flex items-center justify-center mt-2 text-[#A5ACAF] text-sm">
        <Info size={16} className="mr-1" />
        <span>Use left/right arrow keys to toggle views</span>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;