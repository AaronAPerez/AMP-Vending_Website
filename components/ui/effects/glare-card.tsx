'use client';

import React, { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props interface for GlareCard component
 */
interface GlareCardProps {
  /** Child elements to render inside the card */
  children: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Duration of animations in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** CSS easing function for animations */
  easing?: string;
  /** Whether to enable the glare effect */
  enabled?: boolean;
}

/**
 * GlareCard Component
 * 
 * A modern card component with a subtle glare effect that follows mouse movement.
 * Provides an elegant hover interaction that enhances the visual appeal of content cards.
 * 
 * Features:
 * - Mouse-following glare effect
 * - Customizable animation timing
 * - Accessibility compliant
 * - TypeScript support
 * - Performance optimized with useCallback
 * 
 * @param props - Component configuration options
 */
export const GlareCard = ({
  children,
  className = '',
  duration = 300,
  delay = 0,
  easing = 'ease-out',
  enabled = true,
}: GlareCardProps) => {
  // State for tracking mouse position and hover status
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Ref for the card element
  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * Handle mouse movement over the card
   * Calculates relative mouse position for glare effect
   */
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  }, [enabled]);

  /**
   * Handle mouse enter event
   */
  const handleMouseEnter = useCallback(() => {
    if (enabled) {
      setIsHovered(true);
    }
  }, [enabled]);

  /**
   * Handle mouse leave event
   */
  const handleMouseLeave = useCallback(() => {
    if (enabled) {
      setIsHovered(false);
    }
  }, [enabled]);

  /**
   * Generate inline styles for animations
   * This approach avoids the Tailwind dynamic class warnings
   */
  const getCardStyles = (): React.CSSProperties => {
    return {
      '--mouse-x': `${mousePosition.x}%`,
      '--mouse-y': `${mousePosition.y}%`,
      '--duration': `${duration}ms`,
      '--delay': `${delay}ms`,
      '--easing': easing,
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: easing,
    } as React.CSSProperties;
  };

  /**
   * Generate glare overlay styles
   */
  const getGlareStyles = (): React.CSSProperties => {
    if (!enabled || !isHovered) {
      return {
        opacity: 0,
        transition: `opacity ${duration}ms ${easing}`,
      };
    }

    return {
      opacity: 0.1,
      background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(253, 90, 30, 0.4) 0%, rgba(253, 90, 30, 0.1) 50%, transparent 100%)`,
      transition: `opacity ${duration}ms ${easing}`,
    };
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        // Base card styles
        'relative overflow-hidden rounded-lg transition-all',
        // Hover effects using standard Tailwind classes
        'hover:shadow-lg hover:shadow-[#FD5A1E]/10',
        // Custom className
        className
      )}
      style={getCardStyles()}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="article"
      tabIndex={0}
      aria-label="Interactive card with glare effect"
    >
      {/* Glare overlay effect */}
      {enabled && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={getGlareStyles()}
          aria-hidden="true"
        />
      )}

      {/* Card content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

/**
 * Default export for convenience
 */
export default GlareCard;