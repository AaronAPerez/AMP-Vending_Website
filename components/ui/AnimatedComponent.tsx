/**
 * AnimatedComponent - Wrapper for Clean Animations
 * 
 * Use this component to wrap elements that need animations without
 * triggering Tailwind CSS dynamic class warnings.
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedComponentProps {
  /** Child elements to animate */
  children: React.ReactNode;
  
  /** Animation duration in milliseconds */
  duration?: number;
  
  /** Animation delay in milliseconds */
  delay?: number;
  
  /** CSS easing function */
  easing?: string;
  
  /** Whether animation is enabled */
  enabled?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Animation type */
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  
  /** Whether to animate on mount */
  animateOnMount?: boolean;
  
  /** HTML element type */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * AnimatedComponent provides clean animations without dynamic Tailwind classes
 * 
 * Example usage:
 * ```tsx
 * <AnimatedComponent 
 *   animation="fade" 
 *   duration={300} 
 *   delay={100}
 *   className="bg-black rounded-lg"
 * >
 *   <YourContent />
 * </AnimatedComponent>
 * ```
 */
export const AnimatedComponent = ({
  children,
  duration = 300,
  delay = 0,
  easing = 'ease-out',
  enabled = true,
  className = '',
  animation = 'fade',
  animateOnMount = true,
  as: Component = 'div' as keyof JSX.IntrinsicElements,
}: AnimatedComponentProps) => {
  const [isVisible, setIsVisible] = React.useState(!animateOnMount);

  // Trigger animation on mount if enabled
  React.useEffect(() => {
    if (animateOnMount && enabled) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [animateOnMount, enabled, delay]);

  /**
   * Get base styles that work with all animations
   */
  const getBaseStyles = (): React.CSSProperties => {
    if (!enabled) return {};

    return {
      transitionProperty: 'all',
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: easing,
      transitionDelay: `${delay}ms`,
    };
  };

  /**
   * Get animation-specific styles
   */
  const getAnimationStyles = (): React.CSSProperties => {
    if (!enabled) return {};

    const baseStyles = getBaseStyles();

    switch (animation) {
      case 'fade':
        return {
          ...baseStyles,
          opacity: isVisible ? 1 : 0,
        };

      case 'slide':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          opacity: isVisible ? 1 : 0,
        };

      case 'scale':
        return {
          ...baseStyles,
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          opacity: isVisible ? 1 : 0,
        };

      case 'none':
      default:
        return baseStyles;
    }
  };

  /**
   * Get CSS classes that don't cause Tailwind warnings
   */
  const getStaticClasses = () => {
    return cn(
      // Base transition class (safe to use)
      'transition-all',
      // Custom classes
      className
    );
  };

  return React.createElement(
    Component,
    {
      className: getStaticClasses(),
      style: getAnimationStyles(),
    },
    children
  );
};

/**
 * Preset animated components for common use cases
 */

/** Fade-in animation component */
export const FadeIn = ({ children, ...props }: Omit<AnimatedComponentProps, 'animation'>) => (
  <AnimatedComponent animation="fade" {...props}>
    {children}
  </AnimatedComponent>
);

/** Slide-in animation component */
export const SlideIn = ({ children, ...props }: Omit<AnimatedComponentProps, 'animation'>) => (
  <AnimatedComponent animation="slide" {...props}>
    {children}
  </AnimatedComponent>
);

/** Scale animation component */
export const ScaleIn = ({ children, ...props }: Omit<AnimatedComponentProps, 'animation'>) => (
  <AnimatedComponent animation="scale" {...props}>
    {children}
  </AnimatedComponent>
);

/**
 * Staggered animation container for multiple children
 */
interface StaggeredContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  baseDelay?: number;
  animation?: 'fade' | 'slide' | 'scale';
  className?: string;
}

export const StaggeredContainer = ({
  children,
  staggerDelay = 100,
  baseDelay = 0,
  animation = 'fade',
  className = '',
}: StaggeredContainerProps) => {
  const childArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childArray.map((child, index) => (
        <AnimatedComponent
          key={index}
          animation={animation}
          delay={baseDelay + (index * staggerDelay)}
          duration={300}
        >
          {child}
        </AnimatedComponent>
      ))}
    </div>
  );
};

export default AnimatedComponent;