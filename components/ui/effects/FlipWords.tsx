"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Props interface for FlipWords component
 */
interface FlipWordsProps {
  /** Array of words to flip through */
  words: string[];
  /** Duration between word changes in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * FlipWords Component
 * 
 * An engaging text animation component that cycles through words with smooth
 * flip transitions. Optimized for accessibility and performance.
 * 
 * Features:
 * - Smooth flip animations between words
 * - Accessibility support with reduced motion detection
 * - SEO-friendly with proper text content
 * - Customizable timing and styling
 * - Memory leak prevention with proper cleanup
 */
export const FlipWords: React.FC<FlipWordsProps> = ({
  words,
  duration = 3000,
  className
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Animation variants for smooth transitions
  const variants = {
    enter: {
      rotateX: prefersReducedMotion ? 0 : 90,
      opacity: 0,
      y: prefersReducedMotion ? 0 : -30,
    },
    center: {
      rotateX: 0,
      opacity: 1,
      y: 0,
    },
    exit: {
      rotateX: prefersReducedMotion ? 0 : -90,
      opacity: 0,
      y: prefersReducedMotion ? 0 : 30,
    },
  };

  // Transition configuration
  const transition = {
    duration: prefersReducedMotion ? 0.1 : 0.6,
    ease: [0.4, 0.0, 0.2, 1], // Custom easing for smooth motion
  };

  // Function to start the word rotation
  const startAnimation = useCallback(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % words.length;
        setCurrentWord(words[nextIndex]);
        return nextIndex;
      });
    }, duration);

    return interval;
  }, [words, duration]);

  useEffect(() => {
    const interval = startAnimation();
    return () => clearInterval(interval);
  }, [startAnimation]);

  return (
    <div 
      className="inline-block relative"
      style={{ perspective: "1000px" }}
      role="text"
      aria-live="polite"
      aria-label={`Animated text showing: ${words.join(', ')}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className={cn(
            "inline-block whitespace-nowrap",
            prefersReducedMotion ? "" : "transform-gpu", // Use GPU acceleration when motion is enabled
            className
          )}
          style={{
            transformOrigin: "center center",
            backfaceVisibility: "hidden", // Prevent flickering during 3D transforms
          }}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
      
      {/* Hidden text for SEO and screen readers */}
      <span className="sr-only">
        {words.join(' ')}
      </span>
    </div>
  );
};

// /**
//  * Alternative simplified version for reduced motion users
//  */
// export const SimpleFlipWords = ({
//   words,
//   duration = 3000,
//   className
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
//     }, duration);

//     return () => clearInterval(interval);
//   }, [words, duration]);

//   return (
//     <span className={cn("inline-block", className)}>
//       {words[currentIndex]}
//     </span>
//   );
// };

export default FlipWords;