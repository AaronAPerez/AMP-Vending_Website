'use client';

import Image from 'next/image';
import React, { useState } from 'react';

// Image slider component for showcasing the machine from different angles
const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Placeholder for machine images
  const images = [
    { id: 1, alt: "Front view of vending machine", src: "/images/machines/premium_combo.png" },
    { id: 2, alt: "Side view of vending machine", src: "/placeholder-2.jpg" },
    { id: 3, alt: "Touchscreen interface close-up", src: "/placeholder-3.jpg" },
    { id: 4, alt: "Payment system close-up", src: "/placeholder-4.jpg" },
  ];
  
  return (
    <div className="relative rounded-xl overflow-hidden border border-[#a4acac]">
      {/* Main image display */}
      <div className="aspect-[4/3] relative">
        {/* Fallback display if images aren't available */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#4d4d4d] text-[#A5ACAF]">
          {images[activeIndex].alt}
        </div>
        <Image
          src={images[activeIndex].src} 
          alt={images[activeIndex].alt} 
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `scale(1.05)` }} // Slight zoom effect on active image
          fill          
            />
        {/* Actual image would be used here */}
      </div>
      
      {/* Thumbnail navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? "bg-[#FD5A1E]" : "bg-[#A5ACAF]/50"
            }`}
            aria-label={`View ${image.alt}`}
            aria-current={index === activeIndex ? "true" : "false"}
          />
        ))}
      </div>
      
      {/* Previous/Next buttons */}
      <button 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-[#FD5A1E] transition-colors"
        onClick={() => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-[#FD5A1E] transition-colors"
        onClick={() => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default ImageSlider;