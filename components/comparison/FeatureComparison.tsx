// components/comparison/FeatureComparison.tsx
import React from 'react';

/**
 * Props for FeatureComparison component
 */
interface FeatureComparisonProps {
  /**
   * Icon to display with the feature title
   */
  icon: React.ReactNode;
  
  /**
   * Title of the feature being compared
   */
  title: string;
  
  /**
   * Description of the feature in the "before" state
   */
  beforeDescription: string;
  
  /**
   * Description of the feature in the "after" state
   */
  afterDescription: string;
}

/**
 * FeatureComparison Component
 * 
 * Displays a side-by-side comparison of a feature before and after
 * vending machine installation
 */
const FeatureComparison: React.FC<FeatureComparisonProps> = ({
  icon,
  title,
  beforeDescription,
  afterDescription
}) => {
  return (
    <div className="bg-[#000000] rounded-lg p-4 mb-4 border border-[#a4acac]">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="ml-2 text-xl font-bold text-[#F5F5F5]">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#4d4d4d] p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2 text-[#A5ACAF]">Before</h4>
          <p className="text-[#F5F5F5]">{beforeDescription}</p>
        </div>
        <div className="bg-[#4d4d4d] p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2 text-[#FD5A1E]">After</h4>
          <p className="text-[#F5F5F5]">{afterDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureComparison;