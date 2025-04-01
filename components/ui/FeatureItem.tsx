import React from 'react';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

/**
 * FeatureItem component to display individual features with icon, title and description
 * 
 * @param icon - React node containing the feature icon
 * @param title - Feature title/heading
 * @param description - Feature description text
 * @param highlight - Whether to visually highlight this feature
 */
const FeatureItem = ({ 
  icon, 
  title, 
  description, 
  highlight = false 
}: FeatureItemProps) => {
  return (
    <div 
      className={`p-6 rounded-lg transition-all ${
        highlight 
          ? 'bg-blue-50 border border-blue-200 shadow-md' 
          : 'hover:bg-gray-50'
      }`}
      data-testid="feature-item"
    >
      <div className="flex items-start mb-4">
        <div className="mr-4 text-blue-600">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          {title}
        </h3>
      </div>
      <p className="text-gray-700 ml-10">
        {description}
      </p>
    </div>
  );
};

export default FeatureItem;