import React from 'react';

type TextVariants = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'body' 
  | 'body-sm' 
  | 'caption';

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariants;
  className?: string;
  element?: string; // Changed from 'as' to avoid reserved prop name conflicts
  color?: 'default' | 'muted' | 'accent' | 'white';
}

/**
 * Text Component
 * 
 * Provides consistent typography with responsive sizes
 * and appropriate semantic elements
 */
const Text = ({ 
  children, 
  variant = 'body', 
  className = '',
  element,
  color = 'default'
}: TextProps) => {
  // Map variants to style classes with responsive sizing
  const variantClasses = {
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight',
  h2: 'text-3xl sm:text-4xl md:text-5xl font-bold leading-tight',
  h3: 'text-2xl sm:text-3xl md:text-4xl font-bold leading-tight',
  h4: 'text-xl sm:text-2xl md:text-3xl font-bold leading-tight',
  h5: 'text-lg sm:text-xl font-medium leading-snug',
  body: 'text-base sm:text-lg leading-relaxed',
  'body-sm': 'text-sm leading-relaxed',
  caption: 'text-xs leading-normal'
};

  // Map color variants to color classes
  const colorClasses = {
    default: 'text-[#F5F5F5]',
    muted: 'text-[#A5ACAF]',
    accent: 'text-[#FD5A1E]',
    white: 'text-white'
  };

  // Determine the HTML element based on variant or override with 'element' prop
  const getComponent = () => {
    if (element) {
      return element;
    }
    
    switch (variant) {
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'h4': return 'h4';
      case 'h5': return 'h5';
      default: return 'p';
    }
  };

  const Component = getComponent();
  
  const combinedClassName = `${variantClasses[variant]} ${colorClasses[color]} ${className}`;
  
  return React.createElement(Component, { className: combinedClassName }, children);
};

export default Text;