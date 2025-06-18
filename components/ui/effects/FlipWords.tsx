/**
 * FlipWords Component - Fixed Framer Motion Type Compatibility
 * 
 * Build Process Documentation:
 * 1. Fixed Framer Motion transition type compatibility
 * 2. Enhanced accessibility with proper ARIA labels
 * 3. Optimized performance with GPU acceleration controls
 * 4. Improved TypeScript type safety
 * 5. Added proper motion preferences handling
 */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, type Transition } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Props interface for FlipWords component
 */
export interface FlipWordsProps {
  /** Array of words to cycle through */
  words: string[];
  /** Animation duration in seconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** Pause animation on hover */
  pauseOnHover?: boolean;
  /** Custom separator between words */
  separator?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

/**
 * Custom hook for managing animation preferences
 */
function useMotionPreference() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * FlipWords Component with Enhanced Accessibility and Performance
 * 
 * Creates an animated text effect that cycles through an array of words
 * with smooth transitions and proper accessibility support.
 */
export const FlipWords: React.FC<FlipWordsProps> = ({
  words,
  duration = 3000,
  className = '',
  pauseOnHover = true,
  separator = ' ',
  ariaLabel = 'Animated text'
}) => {
  // State management
  const [currentWord, setCurrentWord] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  
  // Motion preferences
  const prefersReducedMotion = useMotionPreference();

  /**
   * Move to next word in the array
   */
  const nextWord = useCallback(() => {
    if (!isAnimating || isPaused) return;
    setCurrentWord((prev) => (prev + 1) % words.length);
  }, [words.length, isAnimating, isPaused]);

  /**
   * Setup word cycling interval
   */
  useEffect(() => {
    if (words.length <= 1 || prefersReducedMotion) return;

    const interval = setInterval(nextWord, duration);
    return () => clearInterval(interval);
  }, [nextWord, duration, words.length, prefersReducedMotion]);

  /**
   * Handle mouse enter for pause functionality
   */
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  /**
   * Handle mouse leave to resume animation
   */
  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  // If no words provided, return null
  if (!words || words.length === 0) {
    return null;
  }

  // If only one word or reduced motion preferred, show static text
  if (words.length === 1 || prefersReducedMotion) {
    return (
      <span 
        className={cn("inline-block", className)}
        aria-label={ariaLabel}
      >
        {words[0]}
      </span>
    );
  }

  /**
   * Fixed Framer Motion transition configuration
   * Using proper Easing type instead of number array
   */
  const transition: Transition = {
    duration: 0.5,
    ease: [0.25, 0.46, 0.45, 0.94], // Proper cubic-bezier easing
    type: 'tween'
  };

  /**
   * Animation variants for smooth word transitions
   */
  const variants = {
    enter: {
      opacity: 0,
      y: 20,
      rotateX: 90,
      scale: 0.9,
    },
    center: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -20,
      rotateX: -90,
      scale: 0.9,
    },
  };

  return (
    <div
      className={cn(
        "relative inline-block perspective-1000",
        pauseOnHover && "cursor-pointer",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      role="text"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={`${currentWord}-${words[currentWord]}`}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className={cn(
            "inline-block whitespace-nowrap",
            prefersReducedMotion ? "" : "transform-gpu" // Use GPU acceleration when motion is enabled
          )}
          style={{
            transformOrigin: "center center",
          }}
          // Accessibility attributes
          aria-atomic="true"
          aria-relevant="text"
        >
          {words[currentWord]}{separator}
        </motion.span>
      </AnimatePresence>

      {/* Screen reader announcement for current word */}
      <span className="sr-only" aria-live="assertive">
        Current word: {words[currentWord]}
      </span>
    </div>
  );
};

/**
 * Alternative static implementation for reduced motion preferences
 */
export const StaticFlipWords: React.FC<Omit<FlipWordsProps, 'duration' | 'pauseOnHover'>> = ({
  words,
  className = '',
  separator = ' ',
  ariaLabel = 'Text'
}) => {
  if (!words || words.length === 0) return null;

  return (
    <span 
      className={cn("inline-block", className)}
      aria-label={`${ariaLabel}: ${words.join(', ')}`}
    >
      {words.join(separator)}
    </span>
  );
};

/**
 * Export with proper display name for debugging
 */
FlipWords.displayName = 'FlipWords';
StaticFlipWords.displayName = 'StaticFlipWords';

export default FlipWords;