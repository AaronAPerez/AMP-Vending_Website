import React from 'react';

/**
 * Interface for FeatureItem props
 */
interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
  className?: string;
  onClick?: () => void;
  testId?: string;
}

/**
 * FeatureItem component to display individual features with icon, title and description
 * 
 * @param icon - React node containing the feature icon
 * @param title - Feature title/heading
 * @param description - Feature description text
 * @param highlight - Whether to visually highlight this feature
 * @param className - Additional CSS classes
 * @param onClick - Optional click handler
 * @param testId - Test ID for testing
 */
const FeatureItem = ({ 
  icon, 
  title, 
  description, 
  highlight = false,
  className = '',
  onClick,
  testId = 'feature-item',
}: FeatureItemProps) => {
  const isClickable = !!onClick;
  
  const baseClasses = "p-6 rounded-lg transition-all";
  const highlightClasses = highlight
    ? "bg-blue-50 border border-blue-200 shadow-md" 
    : "hover:bg-gray-50";
  const clickableClasses = isClickable ? "cursor-pointer" : "";
  
  const combinedClasses = `
    ${baseClasses}
    ${highlightClasses}
    ${clickableClasses}
    ${className}
  `;

  return (
    <div 
      className={combinedClasses}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      data-testid={testId}
    >
      <div className="flex items-start mb-4">
        <div className="mr-4 text-blue-600 flex-shrink-0">
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