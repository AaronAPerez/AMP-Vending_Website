'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface LensEffectImageProps {
  src: string;
  alt: string;
  zoomFactor?: number;
  lensSize?: number;
  className?: string;
}

/**
 * LensEffectImage Component
 * 
 * Creates a magnifying lens effect on hover over an image
 * with accessibility considerations
 */
export const LensEffectImage: React.FC<LensEffectImageProps> = ({ 
  src, 
  alt, 
  zoomFactor = 2, 
  lensSize = 160,
  className = '' 
}) => {
  // State for lens position
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Ref for container element
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate lens position based on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      // Calculate cursor position relative to container
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      
      setPosition({ x, y });
      setCursorPosition({ x: e.clientX - left, y: e.clientY - top });
    }
  };
  
  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!containerRef.current || !showLens) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    let newX = cursorPosition.x;
    let newY = cursorPosition.y;
    const moveStep = 10; // pixels to move per key press
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newY = Math.max(0, cursorPosition.y - moveStep);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newY = Math.min(height, cursorPosition.y + moveStep);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newX = Math.max(0, cursorPosition.x - moveStep);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newX = Math.min(width, cursorPosition.x + moveStep);
        break;
      case 'Escape':
        e.preventDefault();
        setShowLens(false);
        return;
      default:
        return;
    }
    
    setCursorPosition({ x: newX, y: newY });
    setPosition({
      x: (newX / width) * 100,
      y: (newY / height) * 100
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="img"
      aria-label={`${alt} - Interactive image with zoom capability. Use arrow keys to navigate when focused.`}
    >
      {/* Background fallback */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#000000] text-[#A5ACAF]">
        {alt}
      </div>
      
      {/* Base image */}
      <Image 
        src={src} 
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover"
        priority
      />
      
      {/* Lens instruction overlay - only shown when focused but not hovered */}
      {!showLens && document.activeElement === containerRef.current && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white z-30">
          <div className="bg-[#000000]/80 p-3 rounded-lg text-center max-w-xs">
            <p className="font-medium mb-1">Keyboard Navigation Active</p>
            <p className="text-sm text-[#A5ACAF]">Press arrow keys to move the zoom lens. Press Escape to exit.</p>
          </div>
        </div>
      )}
      
      {/* Lens effect overlay */}
      {showLens && (
        <div 
          className="absolute w-full h-full top-0 left-0 pointer-events-none z-10"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: `${zoomFactor * 100}%`,
            backgroundRepeat: 'no-repeat',
            opacity: 0.9,
            mixBlendMode: 'normal',
            filter: 'contrast(1.1)',
            clipPath: `circle(${lensSize/2}px at ${cursorPosition.x}px ${cursorPosition.y}px)`,
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Lens circle indicator */}
      {showLens && (
        <div 
          className="absolute pointer-events-none border-2 border-[#FD5A1E]/70 rounded-full z-20"
          style={{
            top: `${cursorPosition.y}px`,
            left: `${cursorPosition.x}px`,
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 15px rgba(253, 90, 30, 0.3)',
            backdropFilter: 'blur(2px)',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default LensEffectImage;