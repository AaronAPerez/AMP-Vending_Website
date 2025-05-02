/**
 * AccessibleLensEffectImage Component
 * 
 * An accessibility-enhanced version of the LensEffectImage component that:
 * 1. Ensures keyboard navigation compatibility
 * 2. Provides appropriate ARIA attributes for screen readers
 * 3. Allows disabling animation effects based on user preferences
 * 4. Supports alternative interaction methods
 */

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface AccessibleLensEffectImageProps {
  src: string;
  alt: string;
  className?: string;
  magnificationLevel?: number;
  lensSize?: number;
  ariaLabel?: string;
}

const AccessibleLensEffectImage: React.FC<AccessibleLensEffectImageProps> = ({ 
  src, 
  alt, 
  className = '',
  magnificationLevel = 2,
  lensSize = 80,
  ariaLabel,
}) => {
  // State for lens position and activation
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hasFocus, setHasFocus] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // References
  const imageRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Calculate lens position based on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      
      // Calculate cursor position relative to image
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      
      setPosition({ x, y });
      setCursorPosition({ x: e.clientX - left, y: e.clientY - top });
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!imageRef.current || !showLens) return;
    
    const { width, height } = imageRef.current.getBoundingClientRect();
    const moveStep = 10; // pixels to move per key press
    
    // Calculate new position based on key press
    let newPosX = cursorPosition.x;
    let newPosY = cursorPosition.y;
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newPosY = Math.max(0, cursorPosition.y - moveStep);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newPosY = Math.min(height, cursorPosition.y + moveStep);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newPosX = Math.max(0, cursorPosition.x - moveStep);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newPosX = Math.min(width, cursorPosition.x + moveStep);
        break;
      case 'Escape':
        e.preventDefault();
        setShowLens(false);
        break;
      case ' ':
      case 'Enter':
        // Toggle lens on/off with space or enter
        e.preventDefault();
        setShowLens(!showLens);
        break;
      default:
        return; // Exit for other keys
    }
    
    // Update cursor position
    setCursorPosition({ x: newPosX, y: newPosY });
    
    // Update lens position
    setPosition({
      x: (newPosX / width) * 100,
      y: (newPosY / height) * 100
    });
  };

  // Image loaded handler
  const handleImageLoad = () => {
    // Set initial position to center of image if focused
    if (hasFocus && imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      setCursorPosition({ x: width / 2, y: height / 2 });
      setPosition({ x: 50, y: 50 });
    }
  };

  // Helper to determine actual lens size based on preferences
  const effectiveSize = prefersReducedMotion ? lensSize * 0.75 : lensSize;

  return (
    <div 
      ref={imageContainerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => !prefersReducedMotion && setShowLens(true)}
      onMouseLeave={() => !hasFocus && setShowLens(false)}
      onMouseMove={handleMouseMove}
      onFocus={() => setHasFocus(true)}
      onBlur={() => {
        setHasFocus(false);
        setShowLens(false);
      }}
      tabIndex={0}
      role="img"
      aria-label={ariaLabel || `Image of ${alt} with magnification capability. Use arrow keys to move the magnifier, space to toggle zoom.`}
      onKeyDown={handleKeyDown}
    >
      {/* Instructions for keyboard users - only visible when focused */}
      {hasFocus && (
        <div className="absolute top-0 left-0 right-0 bg-black/70 text-white text-xs p-2 z-20">
          Use arrow keys to move, space to toggle zoom, escape to exit
        </div>
      )}
      
      {/* Background fallback */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#000000] text-[#A5ACAF]">
        {alt}
      </div>
      
      {/* Base image */}
      <div ref={imageRef} className="w-full h-full">
        <Image 
          src={src} 
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
          onLoadingComplete={handleImageLoad}
        />
      </div>
      
      {/* Lens effect overlay - conditional based on state and preferences */}
      {showLens && (
        <div 
          className="absolute w-full h-full top-0 left-0 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: `${magnificationLevel * 100}%`,
            backgroundRepeat: 'no-repeat',
            opacity: 0.8,
            mixBlendMode: 'hard-light',
            filter: prefersReducedMotion ? 'none' : 'contrast(1.1)',
            clipPath: `circle(${effectiveSize}px at ${cursorPosition.x}px ${cursorPosition.y}px)`,
            transition: prefersReducedMotion ? 'none' : 'clip-path 0.1s ease-out',
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Lens circle indicator */}
      {showLens && (
        <div 
          className={`absolute pointer-events-none border-2 border-[#FD5A1E]/60 rounded-full -mt-${effectiveSize/2} -ml-${effectiveSize/2}`}
          style={{
            top: `${cursorPosition.y}px`,
            left: `${cursorPosition.x}px`,
            width: `${effectiveSize * 2}px`,
            height: `${effectiveSize * 2}px`,
            boxShadow: prefersReducedMotion ? 'none' : '0 0 15px rgba(253, 90, 30, 0.3)',
            backdropFilter: prefersReducedMotion ? 'none' : 'blur(2px)',
            transition: prefersReducedMotion ? 'none' : 'top 0.1s ease-out, left 0.1s ease-out',
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Screen reader only description */}
      <span className="sr-only">
        {alt}. This image has a magnification feature. Use keyboard controls to explore details.
      </span>
    </div>
  );
};

export default AccessibleLensEffectImage;