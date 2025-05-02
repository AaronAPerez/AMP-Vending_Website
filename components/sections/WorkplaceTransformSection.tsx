import React from 'react';
import StanRTAComparison from '../comparison/StanRTAComparison';
import FeatureComparison from '../comparison/FeatureComparison';

/**
 * Props for WorkplaceTransformSection component
 */
interface WorkplaceTransformSectionProps {
  /**
   * Optional className for additional styling
   */
  className?: string;
  
  /**
   * Optional ID for anchor links
   * @default "workplace-transformation"
   */
  id?: string;
}

/**
 * WorkplaceTransformSection Component
 * 
 * A section container for the before/after workplace comparison
 * Provides proper spacing, container width, and section markup
 */
const WorkplaceTransformSection: React.FC<WorkplaceTransformSectionProps> = ({ 
  className = "",
  id = "workplace-transformation" 
}) => {
  return (
    <section 
      id={id}
      className={`py-16 md:py-24 bg-[#000000] ${className}`}
      aria-labelledby="workplace-transform-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* StanRTAComparison contains its own heading */}
        <StanRTAComparison />
        
        {/* Optional additional content can be added here */}
        <FeatureComparison icon={undefined} title={''} beforeDescription={''} afterDescription={''}/>
      </div>
      
      {/* Background Elements (Optional) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H20V20H0V0Z' fill='none' stroke='%23A5ACAF' stroke-width='0.2'/%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px'
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export default WorkplaceTransformSection;