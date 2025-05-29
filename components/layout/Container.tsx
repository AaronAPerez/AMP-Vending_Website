import React from 'react';

/**
 * Props for Container component
 */
interface ContainerProps {
  /**
   * Content to be contained
   */
  children: React.ReactNode;
  
  /**
   * Container size variant
   * @default 'lg'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Whether to center the container content
   * @default true
   */
  center?: boolean;
}

/**
 * Container Component
 * 
 * Provides consistent max-width containers with responsive padding
 * for different content sections across the application.
 * 
 * Features:
 * - Multiple size variants for different use cases
 * - Responsive padding that adapts to screen size
 * - Automatic centering with optional override
 * - Accessible semantic structure
 */
const Container = ({ 
  children, 
  size = 'lg', 
  className = '', 
  center = true 
}: ContainerProps) => {
  
  /**
   * Size variant class mappings
   * Each size provides appropriate max-width for its use case
   */
  const sizeClasses = {
    sm: 'max-w-2xl',      // ~672px - For small content blocks
    md: 'max-w-4xl',      // ~896px - For medium content sections  
    lg: 'max-w-7xl',      // ~1280px - For main page content
    xl: 'max-w-screen-2xl', // ~1536px - For large layouts
    full: 'max-w-none'    // No max-width constraint
  };

  /**
   * Base classes for the container
   * Includes responsive padding and optional centering
   */
  const baseClasses = [
    sizeClasses[size],
    'w-full',
    'px-4 sm:px-6 lg:px-8', // Responsive horizontal padding
    center ? 'mx-auto' : '', // Center horizontally if enabled
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
};

export default Container;