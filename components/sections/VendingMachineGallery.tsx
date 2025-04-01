import React, { useState } from 'react';

interface ImageGalleryProps {
  /**
   * Array of image sources for the gallery
   */
  images: string[];
  
  /**
   * Alt text for images
   */
  alt: string;
  
  /**
   * Optional CSS class name for the gallery container
   */
  className?: string;
}

/**
 * VendingMachineGallery component displays a responsive image gallery
 * with thumbnail navigation for vending machine images
 */
function VendingMachineGallery({ images, alt, className = '' }: ImageGalleryProps): JSX.Element {
  const [activeImage, setActiveImage] = useState(0);

  // If no images provided, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-lg overflow-hidden aspect-w-4 aspect-h-3 ${className}`}>
        <div className="flex items-center justify-center w-full h-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-gray-400">
            <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Main image */}
      <div className="bg-white rounded-lg overflow-hidden aspect-w-4 aspect-h-3 mb-4">
        <img 
          src={images[activeImage]} 
          alt={`${alt} - view ${activeImage + 1}`} 
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Thumbnails - only show if more than one image */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              className={`bg-white rounded overflow-hidden aspect-w-1 aspect-h-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                activeImage === index ? 'ring-2 ring-blue-500' : 'hover:opacity-75'
              }`}
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={activeImage === index}
            >
              <img 
                src={image} 
                alt={`${alt} thumbnail ${index + 1}`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Component for displaying a fallback/placeholder when real images aren't available
 * Shows a generic vending machine icon with customizable styling
 */
interface PlaceholderProps {
  className?: string;
  width?: string;
  height?: string;
}

export function VendingMachinePlaceholder({ 
  className = '', 
  width = 'w-24', 
  height = 'h-24' 
}: PlaceholderProps): JSX.Element {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={`${width} ${height} text-gray-400`}
      >
        <path d="M4 5.25C4 4.007 5.007 3 6.25 3h11.5C18.993 3 20 4.007 20 5.25v13.5c0 1.243-1.007 2.25-2.25 2.25H6.25C5.007 21 4 19.993 4 18.75V5.25zM6.25 4.5c-.414 0-.75.336-.75.75v13.5c0 .414.336.75.75.75h11.5c.414 0 .75-.336.75-.75V5.25c0-.414-.336-.75-.75-.75H6.25z" />
        <path d="M7 8a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zM7 12a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zM7 16a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1z" />
      </svg>
    </div>
  );
}

export default VendingMachineGallery;