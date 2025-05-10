'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

// Define types for the lens effect component props
interface LensEffectProps {
  /**
   * The image source URL
   */
  imageSrc: string;
  
  /**
   * Alt text for the image (for accessibility)
   */
  imageAlt: string;
  
  /**
   * The size of the lens effect
   */
  lensSize?: number;
  
  /**
   * The zoom level of the lens
   */
  zoomLevel?: number;
  
  /**
   * Optional CSS class for the container
   */
  className?: string;

  /**
   * Optional border color for the lens
   */
  lensBorderColor?: string;
  
  /**
   * Whether to show a cursor indicator
   */
  showCursor?: boolean;
  
  /**
   * Optional callback when hovering over the image
   */
  onHover?: () => void;
}

/**
 * LensEffect Component
 * 
 * Creates a magnifying glass effect on hover for product images
 * Enhances product visualization with interactive zoom
 */
const LensEffect: React.FC<LensEffectProps> = ({
  imageSrc,
  imageAlt,
  lensSize = 150,
  zoomLevel = 2.5,
  className = '',
  lensBorderColor = '#FD5A1E',
  showCursor = true,
  onHover
}) => {
  // State for lens position
  const [lensPosition, setLensPosition] = useState<{ x: number; y: number } | null>(null);
  
  // Refs for container and image elements
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Calculate background position based on mouse coordinates
  const calculateBackgroundPosition = (mouseX: number, mouseY: number) => {
    if (!containerRef.current || !imageRef.current) return null;
    
    // Get container and image dimensions and positions
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calculate relative position within the container
    const relativeX = mouseX - containerRect.left;
    const relativeY = mouseY - containerRect.top;
    
    // Calculate the background position for the lens
    const bgX = relativeX * zoomLevel - lensSize / 2;
    const bgY = relativeY * zoomLevel - lensSize / 2;
    
    return {
      x: relativeX,
      y: relativeY,
      bgX,
      bgY
    };
  };
  
  // Handle mouse move to update lens position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onHover && !lensPosition) {
      onHover();
    }
    
    const position = calculateBackgroundPosition(e.clientX, e.clientY);
    if (position) {
      setLensPosition({ x: position.x, y: position.y });
    }
  };
  
  // Handle mouse leave to hide lens
  const handleMouseLeave = () => {
    setLensPosition(null);
  };
  
  // Handle touch events for mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const position = calculateBackgroundPosition(touch.clientX, touch.clientY);
      if (position) {
        setLensPosition({ x: position.x, y: position.y });
      }
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      aria-label={`Interactive image of ${imageAlt} with zoom capability`}
      style={{ cursor: showCursor ? 'crosshair' : 'default' }}
    >
      {/* Base Image */}
      <div className="relative w-full aspect-[4/3]">
        <Image
          ref={imageRef}
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
          priority
        />
      </div>
      
      {/* Magnifying Lens */}
      {lensPosition && (
        <div
          className="absolute pointer-events-none rounded-full shadow-lg"
          style={{
            width: lensSize,
            height: lensSize,
            top: lensPosition.y - lensSize / 2,
            left: lensPosition.x - lensSize / 2,
            border: `2px solid ${lensBorderColor}`,
            backgroundImage: `url(${imageSrc})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${100 * zoomLevel}% ${100 * zoomLevel}%`,
            backgroundPosition: `-${lensPosition.x * zoomLevel - lensSize / 2}px -${lensPosition.y * zoomLevel - lensSize / 2}px`,
            zIndex: 10
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Instruction Overlay - only shown initially */}
      {!lensPosition && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity hover:opacity-0 text-center p-4">
          <p className="text-white text-sm md:text-base bg-black/70 rounded-lg p-2">
            Hover or touch to zoom
          </p>
        </div>
      )}
    </div>
  );
};

export default LensEffect;