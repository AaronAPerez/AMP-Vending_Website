import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlighted' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card Component
 * 
 * Responsive card with consistent styling and variants
 */
const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md'
}: CardProps) => {
  // Variant styles
  const variantClasses = {
    default: 'bg-[#111111] border border-[#333333]',
    highlighted: 'bg-[#111111] border border-[#FD5A1E]/70 shadow-lg shadow-[#FD5A1E]/10',
    outlined: 'bg-transparent border border-[#333333]'
  };

  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  return (
    <div 
      className={`rounded-xl overflow-hidden ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;