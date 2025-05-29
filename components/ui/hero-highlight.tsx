import React from 'react';
import useHeroHighlight from '@/hooks/useHeroHighlight';
import { motion } from 'framer-motion';

interface HeroHighlightProps {
  /**
   * Children to render inside the highlight container
   */
  children: React.ReactNode;
  
  /**
   * CSS class names to apply to the children container
   */
  className?: string;
  
  /**
   * CSS class names to apply to the outer container
   */
  containerClassName?: string;
  
  /**
   * Options for the highlight effect
   */
  options?: {
    /**
     * Radius of the highlight effect in pixels
     * @default 650
     */
    radius?: number;
    
    /**
     * Color of the highlight effect (in rgba format)
     * @default 'rgba(253, 90, 30, 0.15)'
     */
    color?: string;
    
    /**
     * Whether to enable the highlight effect
     * @default true
     */
    enabled?: boolean;
  };
}

/**
 * HeroHighlight Component
 * 
 * Creates a highlight effect that follows the mouse cursor
 * Inspired by Aceternity UI's Hero Highlight component
 */
export const HeroHighlight: React.FC<HeroHighlightProps> = ({
  children,
  className = '',
  containerClassName = '',
  options = {}
}) => {
  // Use the hero highlight hook for mouse tracking
  const {
    ref,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    getHighlightStyle
  } = useHeroHighlight(options);

  return (
    <div 
      ref={ref}
      className={`hero-highlight ${containerClassName}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Highlight effect layer */}
      <motion.div 
        className="hero-highlight-glow"
        style={getHighlightStyle()}
      />
      
      {/* Content layer */}
      <div className={`relative z-10 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default HeroHighlight;