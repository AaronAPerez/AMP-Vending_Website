'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

// Props interface for SplitHeroWithVideo
interface SplitHeroWithVideoProps {
  /**
   * Main headline text
   */
  title: string;
  
  /**
   * Highlighted part of the title (displays in accent color)
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
 * SplitHeroWithVideo Component
 * 
 * A modern hero section with content on the left side and a background video
 * on the right side. The title spans across the top on mobile.
 */
const SplitHeroWithVideo: React.FC<SplitHeroWithVideoProps> = ({
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
}) => {
  // Ref for the container element
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  
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
  
  // Particles effect for background
  const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  };
  
  const particles = generateParticles(20);
  
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const videoVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3
      }
    }
  };


  
  return (
    <section 
      ref={containerRef}
      className={`relative min-h-[85vh] overflow-hidden ${className}`}
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#000000]/95 to-[#000000]/85 z-0">
        {/* Particle background */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-[#FD5A1E]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 lg:px-6 pt-28 pb-16 relative z-10">
        {/* Title that spans across the top on all screen sizes */}
        <div className="mb-12 text-center lg:mb-16">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-4 leading-tight"
          >
            {title}
            {highlightedTitle && (
              <>
                <br className="hidden sm:block" />
                <span className="text-[#FD5A1E]">{highlightedTitle}</span>
              </>
            )}
          </motion.h1>
        </div>
        
        {/* Content split into two sides for larger screens */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
          {/* Left side - Text content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="w-full lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left"
          >
            <p className="text-xl sm:text-2xl text-[#F5F5F5] mb-8 max-w-2xl mx-auto lg:mx-0">
              {subtitle}
            </p>
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href={primaryButtonHref}
                className="px-8 py-4 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors inline-block text-center"
              >
                {primaryButtonText}
              </Link>
              
              {secondaryButtonText && secondaryButtonHref && (
                <Link
                  href={secondaryButtonHref}
                  className="px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors inline-block text-center"
                >
                  {secondaryButtonText}
                </Link>
              )}
            </motion.div>
          </motion.div>
          
          {/* Right side - Video */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={videoVariants}
            className="w-full lg:w-1/2 relative rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="relative w-full aspect-video">
              {/* Video background */}
              <div className={`absolute inset-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={posterSrc}
                  className="absolute object-cover w-full h-full rounded-xl"
                  aria-hidden="true"
                >
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Gradient overlay for better text contrast */}
                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-[#000000]/50 to-transparent rounded-xl"
                  aria-hidden="true"
                ></div>
              </div>
              
              {/* Fallback/poster image shown until video loads */}
              {posterSrc && (
                <div className={`absolute inset-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'} rounded-xl`}>
                  <div 
                    className="absolute inset-0 bg-cover bg-center rounded-xl" 
                    style={{ backgroundImage: `url(${posterSrc})` }}
                    aria-hidden="true"
                  ></div>
                  <div 
                    className="absolute inset-0 bg-gradient-to-tr from-[#000000]/50 to-transparent rounded-xl"
                    aria-hidden="true"
                  ></div>
                </div>
              )}
              
              {/* Optional: Video overlay content like a play button or caption */}
              <div className="absolute bottom-4 left-4 text-[#F5F5F5] text-sm bg-[#000000]/50 px-3 py-1 rounded-full">
                Premium Vending Experience
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce hidden md:block"
        >
          <svg 
            className="w-6 h-6 text-[#F5F5F5]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
          <span className="sr-only">Scroll down</span>
        </motion.div>
      </div>
    </section>
  );
};

export default SplitHeroWithVideo;