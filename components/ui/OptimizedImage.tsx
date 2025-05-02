import React from 'react';
import Image from 'next/image';

/**
 * Props for OptimizedImage component
 */
interface OptimizedImageProps {
  /**
   * Image source URL
   */
  src: string;
  
  /**
   * Alt text for the image (important for accessibility)
   */
  alt: string;
  
  /**
   * Width of the image in pixels (for Next.js optimization)
   */
  width?: number;
  
  /**
   * Height of the image in pixels (for Next.js optimization)
   */
  height?: number;
  
  /**
   * CSS class names to apply to the image
   */
  className?: string;
  
  /**
   * Whether to prioritize loading this image
   */
  priority?: boolean;
  
  /**
   * Image fill mode (object-fit)
   */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  
  /**
   * Optional onClick handler
   */
  onClick?: () => void;
}

/**
 * OptimizedImage Component
 * 
 * A wrapper around Next.js Image component with sensible defaults
 * and better handling of fallback and loading states
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  objectFit = 'cover',
  onClick
}) => {
  // Handle empty or invalid src
  if (!src) {
    return (
      <div 
        className={`bg-[#4d4d4d] flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt || 'Image placeholder'}
      >
        <span className="text-[#A5ACAF]">Image not available</span>
      </div>
    );
  }
  
  // For external URLs that can't be optimized by Next.js
  if (src.startsWith('http') && !src.includes(process.env.NEXT_PUBLIC_BASE_URL || '')) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${objectFit ? `object-${objectFit}` : ''}`}
        loading={priority ? 'eager' : 'lazy'}
        onClick={onClick}
      />
    );
  }
  
  // Use Next.js Image for local images
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      style={{ objectFit }}
      onClick={onClick}
    />
  );
};

export default OptimizedImage;