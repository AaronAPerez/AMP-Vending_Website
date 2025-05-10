<<<<<<< HEAD
'use client';

import React from 'react';
import StanRTAComparison from '../comparison/StanRTAComparison';



interface BeforeAfterSectionProps {
  /**
   * Optional className for additional styling
   */
  className?: string;
  
  /**
   * Optional ID for anchor links
   */
  id?: string;
}

/**
 * BeforeAfterSection Component
 * 
 * A section that showcases before/after comparison of workplace environments
 * with premium vending machine installations
 */
const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
  className = '',
  id = 'workplace-transformation',
}) => {
  return (
    <section 
      id={id}
      className={`py-16 md:py-24 bg-[#000000] ${className}`}
      aria-labelledby="before-after-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            id="before-after-heading"
            className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4"
          >
            Transform Your Workplace
          </h2>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
            See how our premium vending solutions enhance employee satisfaction and workspace experience with zero cost and maintenance-free operation.
          </p>
        </div>
        
        {/* Case Study Highlight - can be customized per client */}
        <div className="mb-10 bg-[#4d4d4d]/20 p-6 rounded-lg border border-[#a4acac]">
          <p className="text-[#F5F5F5] font-bold text-lg text-center">
            Stanislaus Regional Transit Authority Success Story
          </p>
        </div>
        
        {/* Import the StanRTA comparison component */}
        <StanRTAComparison/>
        
        {/* Call to action */}
        <div className="mt-12 text-center">
          <a 
            href="/contact" 
            className="inline-block px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full font-medium hover:bg-[#FD5A1E]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-[#000000]"
            aria-label="Contact us to transform your workplace with premium vending machines"
          >
            Transform Your Workplace Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
=======
// In components/comparison/BeforeAfterSlider.tsx
// Fix unused variable and convert img to Image

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  aspectRatio = "16/9",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Removed the unused toggleView function
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const position = (x / rect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const position = (x / rect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden rounded-lg shadow-lg border border-[#4d4d4d]"
      style={{ aspectRatio }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={afterImage}
          alt={afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>
      
      {/* Before Image (Foreground Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image 
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>
      
      {/* Slider Control */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        <div className="absolute w-8 h-8 bg-white rounded-full -ml-4 top-1/2 -mt-4 flex items-center justify-center shadow-md">
          <div className="flex items-center justify-center text-[#000000]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 12h8M8 17h8" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-[#000000]/70 text-[#F5F5F5] px-3 py-1 rounded-full text-sm">
        Before
      </div>
      <div className="absolute bottom-4 right-4 bg-[#000000]/70 text-[#F5F5F5] px-3 py-1 rounded-full text-sm">
        After
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c
