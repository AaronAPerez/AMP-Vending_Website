/**
 * FallbackImage Component
 * 
 * Provides a fallback image when the primary image fails to load
 * Maintains brand styling and accessibility standards
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface FallbackImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
}

const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  fallbackSrc = '/images/placeholders/vending-machine-placeholder.png',
  priority = false,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Fallback Image */}
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onError={handleError}
        priority={priority}
        className={`${hasError ? 'opacity-80' : ''}`}
      />
      
      {/* Error Indicator Overlay */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
          <div className="text-center">
            <svg 
              className="w-8 h-8 text-[#FD5A1E] mx-auto mb-2" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span className="text-[#A5ACAF] text-sm">Image unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FallbackImage;