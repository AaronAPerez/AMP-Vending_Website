/**
 * Enhanced Image Component with all required SEO attributes
 * 
 * This component ensures all images have proper:
 * - width and height attributes for CLS prevention
 * - title attributes for accessibility and SEO
 * - proper loading strategy (eager for above-fold, lazy for below-fold)
 * - optimized alt text for screen readers and SEO
 */

import Image, { ImageProps } from 'next/image';
import { ComponentProps } from 'react';

interface SEOOptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
  title?: string;
  isAboveFold?: boolean;
  seoKeywords?: string[];
  className?: string;
}

/**
 * SEO-Optimized Image Component
 * 
 * Automatically handles all SEO requirements:
 * - Proper loading strategy based on position
 * - Required width/height for CLS prevention
 * - Title attributes for accessibility
 * - Optimized alt text with keywords
 */
export const SEOOptimizedImage = ({
  alt,
  title,
  isAboveFold = false,
  seoKeywords = [],
  width,
  height,
  className = "",
  ...props
}: SEOOptimizedImageProps) => {
  // Generate SEO-friendly title if not provided
  const imageTitle = title || `${alt} - AMP Vending ${seoKeywords.join(' ')}`.trim();
  
  // Enhanced alt text with SEO context
  const enhancedAlt = seoKeywords.length > 0 
    ? `${alt} - ${seoKeywords.slice(0, 2).join(' ')}` 
    : alt;

  return (
    <Image
      {...props}
      alt={enhancedAlt}
      title={imageTitle}
      width={width}
      height={height}
      loading={isAboveFold ? "eager" : "lazy"}
      priority={isAboveFold}
      className={className}
      // Ensure proper sizing for CLS prevention
      style={{
        width: '100%',
        height: 'auto',
        ...props.style,
      }}
      // Add decoding attribute for better performance
      decoding={isAboveFold ? "sync" : "async"}
    />
  );
};