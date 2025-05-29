'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/**
 * Props interface for ImmersiveHeroSection component
 */
interface ImmersiveHeroSectionProps {
  /**
   * Title text for the hero section
   */
  title: string;
  
  /**
   * Highlighted part of the title (displayed in accent color)
   */
  highlightedTitle?: string;
  
  /**
   * Subtitle or description text
   */
  subtitle: string;
  
  /**
   * Path to the video file
   */
  videoSrc: string;
  
  /**
   * Path to the poster image (shown before video loads)
   */
  posterSrc?: string;
  
  /**
   * Primary CTA button text
   */
  primaryButtonText: string;
  
  /**
   * Primary CTA button link
   */
  primaryButtonHref: string;
  
  /**
   * Secondary CTA button text
   */
  secondaryButtonText?: string;
  
  /**
   * Secondary CTA button link
   */
  secondaryButtonHref?: string;
  
  /**
   * Optional CSS class name for additional styling
   */
  className?: string;
}

/**
 * ImmersiveHeroSection Component
 * 
 * A full-width hero section with background video and overlaid text content.
 * Responsive design adapts for mobile devices by placing text on top of the video.
 */
const ImmersiveHeroSection = ({
  title,
  highlightedTitle,
  subtitle,
  videoSrc,
  posterSrc,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  className = '',
}: ImmersiveHeroSectionProps) => {
  // State to track if the video has loaded
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  // Ref for the video element
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle video load event
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  // Setup video element once component mounts
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Add event listeners
      videoElement.addEventListener('loadeddata', handleVideoLoaded);
      
      // Check if video is already loaded
      if (videoElement.readyState >= 3) {
        setIsVideoLoaded(true);
      }
      
      // Play video and handle autoplay issues
      const playVideo = async () => {
        try {
          await videoElement.play();
        } catch (error) {
          console.log('Autoplay prevented. User interaction required.', error);
        }
      };
      
      playVideo();
      
      // Cleanup
      return () => {
        videoElement.removeEventListener('loadeddata', handleVideoLoaded);
      };
    }
  }, []);

  return (
    <section 
      className={`relative w-full min-h-[80vh] overflow-hidden bg-[#000000] ${className}`}
      aria-labelledby="hero-heading"
    >
      {/* Background video with overlay */}
      <div className="absolute inset-0 w-full h-full">
        {/* Video background */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-70' : 'opacity-0'}`}>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={posterSrc}
            className="absolute object-cover w-full h-full"
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Gradient overlay - darker on mobile for better text contrast */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/50 to-transparent md:bg-gradient-to-r md:from-[#000000] md:via-[#000000]/40 md:to-transparent"
            aria-hidden="true"
          ></div>
        </div>
        
        {/* Fallback/poster image shown until video loads */}
        {posterSrc && (
          <div className={`absolute inset-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-70'}`}>
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${posterSrc})` }}
              aria-hidden="true"
            ></div>
            <div 
              className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/50 to-transparent md:bg-gradient-to-r md:from-[#000000] md:via-[#000000]/40 md:to-transparent"
              aria-hidden="true"
            ></div>
          </div>
        )}
      </div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 py-16 md:py-0 md:px-8">
        {/* Full-width title section at the top */}
        <div className="w-full max-w-7xl mx-auto mb-8 md:mb-12 mt-4 md:mt-16">
          <h1 
            id="hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] text-center leading-tight"
          >
            {title}
            {highlightedTitle && (
              <>
                <br />
                <span className="text-[#FD5A1E]">{highlightedTitle}</span>
              </>
            )}
          </h1>
        </div>

        {/* Main content area */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:min-h-[60vh]">
          {/* Text content - centered on mobile, left-aligned on desktop */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <p className="text-xl md:text-2xl text-[#F5F5F5] mb-8 max-w-xl mx-auto md:mx-0">
              {subtitle}
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href={primaryButtonHref}
                className="px-8 py-4 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors inline-block text-center"
                aria-label={primaryButtonText}
              >
                {primaryButtonText}
              </Link>
              
              {secondaryButtonText && secondaryButtonHref && (
                <Link
                  href={secondaryButtonHref}
                  className="px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors inline-block text-center"
                  aria-label={secondaryButtonText}
                >
                  {secondaryButtonText}
                </Link>
              )}
            </div>
          </div>
          
          {/* Empty space on the right side for desktop to balance the video */}
          <div className="hidden md:block md:w-1/2"></div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce hidden md:block">
        <svg 
          className="w-6 h-6 text-[#F5F5F5]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
        <span className="sr-only">Scroll down</span>
      </div>
    </section>
  );
};

export default ImmersiveHeroSection;