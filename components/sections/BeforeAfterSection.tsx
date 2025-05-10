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