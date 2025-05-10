'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import HeroParallax from './HeroParallax';


// Props interface for SplitHeroWithVideo
interface SplitHeroSectionProps {
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
const SplitHeroSection: React.FC<SplitHeroSectionProps> = ({
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
  // Refs for animations and interactions
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isHoveringPrimary, setIsHoveringPrimary] = useState(false);
  const [isHoveringSecondary, setIsHoveringSecondary] = useState(false);

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

  // Set up scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values based on scroll position
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, 30]);
  const videoScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  // Split title for character-by-character animation
  const titleWords = title.split(' ');
  const highlightedWords = highlightedTitle ? highlightedTitle.split(' ') : [];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.7
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]  // <- Customize animation curve
      }
    }
  };

  const videoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Particles animation on hover for buttons
  const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
    }));
  };

  const primaryParticles = generateParticles(12);
  const secondaryParticles = generateParticles(12);


    return (
      <section 
      ref={containerRef}
      className={`relative min-h-[85vh] overflow-hidden ${className}`}
    >
      {/* Background with HeroParallax */}
      <div className="absolute inset-0 z-0 bg-black">
        <HeroParallax />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-[#000000]/95 to-[#000000] opacity-85"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-6 pt-28 pb-16 relative z-10">
        {/* Title that spans across the top on all screen sizes */}
        {/* <motion.div 
          style={{ opacity: heroOpacity, scale: titleScale, y: titleY }}
          className="mb-12 text-center lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-4 leading-tight overflow-hidden">
            {/* Animate each word separately
            <div className="flex flex-wrap justify-center">
              {titleWords.map((word, i) => (
                <motion.span 
                  key={`title-${i}`}
                  variants={wordVariants}
                  className="inline-block mr-2 mb-2"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            
            {highlightedTitle && (
              <div className="flex flex-wrap justify-center pt-2">
                {highlightedWords.map((word, i) => (
                  <motion.span 
                    key={`highlight-${i}`}
                    variants={wordVariants}
                    className="inline-block mr-2 mb-2 text-[#FD5A1E]"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            )}
          </h1>
        </motion.div> */}
        
        {/* Content split into two sides for larger screens */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
          {/* Left side - Text content */}
          
          <motion.div 
            style={{ y: contentY }}
            className="w-full lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left"
          >
               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-4 leading-tight overflow-hidden">
            {/* Animate each word separately */}
            <div className="flex flex-wrap justify-start">
              {titleWords.map((word, i) => (
                <motion.span 
                  key={`title-${i}`}
                  variants={wordVariants}
                  className="inline-block mr-2 mb-2"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            
            {highlightedTitle && (
              <div className="flex flex-wrap justify-start pt-2">
                {highlightedWords.map((word, i) => (
                  <motion.span 
                    key={`highlight-${i}`}
                    variants={wordVariants}
                    className="inline-block mr-2 mb-2 text-[#FD5A1E]"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            )}
          </h1>
            <motion.p 
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              className="text-xl sm:text-2xl text-[#F5F5F5] mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {subtitle}
            </motion.p>
            
            <motion.div 
              variants={buttonContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {/* Enhanced primary CTA button with hover effects */}
              <motion.div
                variants={buttonVariants}
                className="relative"
                onMouseEnter={() => setIsHoveringPrimary(true)}
                onMouseLeave={() => setIsHoveringPrimary(false)}
              >
                <Link
                  href={primaryButtonHref}
                  className="relative z-10 px-8 py-4 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-full shadow-xl hover:shadow-[#FD5A1E]/30 hover:shadow-2xl inline-block text-center group overflow-hidden"
                >
                  {/* Button background effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FD5A1E] to-[#FD7A3E] group-hover:scale-105 transition-transform duration-300"></span>
                  
                  {/* Button text */}
                  <span className="relative z-10 inline-block transition-transform duration-300 group-hover:scale-105">
                    {primaryButtonText}
                  </span>
                  
                  {/* Animated particles on hover */}
                  <AnimatePresence>
                    {isHoveringPrimary && (
                      <>
                        {primaryParticles.map((particle) => (
                          <motion.span
                            key={`primary-particle-${particle.id}`}
                            className="absolute bg-white rounded-full z-0 opacity-50"
                            initial={{ 
                              x: 0, 
                              y: 0, 
                              width: `${particle.size}px`, 
                              height: `${particle.size}px`,
                              opacity: 0 
                            }}
                            animate={{ 
                              x: `${(Math.random() * 100) - 50}px`, 
                              y: `${(Math.random() * 100) - 50}px`,
                              opacity: [0, 0.6, 0] 
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 + Math.random() }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
              
              {/* Enhanced secondary CTA button with hover effects */}
              {secondaryButtonText && secondaryButtonHref && (
                <motion.div
                  variants={buttonVariants}
                  className="relative"
                  onMouseEnter={() => setIsHoveringSecondary(true)}
                  onMouseLeave={() => setIsHoveringSecondary(false)}
                >
                  <Link
                    href={secondaryButtonHref}
                    className="relative z-10 px-8 py-4 bg-transparent border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full shadow-lg hover:shadow-white/20 hover:shadow-2xl inline-block text-center group overflow-hidden"
                  >
                    {/* Button background effect */}
                    <span className="absolute inset-0 w-full h-full bg-[#F5F5F5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-20"></span>
                    
                    {/* Button text */}
                    <span className="relative z-10 inline-block group-hover:scale-105 transition-transform duration-300">
                      {secondaryButtonText}
                    </span>
                    
                    {/* Animated particles on hover */}
                    <AnimatePresence>
                      {isHoveringSecondary && (
                        <>
                          {secondaryParticles.map((particle) => (
                            <motion.span
                              key={`secondary-particle-${particle.id}`}
                              className="absolute bg-white rounded-full z-0 opacity-50"
                              initial={{ 
                                x: 0, 
                                y: 0, 
                                width: `${particle.size}px`, 
                                height: `${particle.size}px`,
                                opacity: 0 
                              }}
                              animate={{ 
                                x: `${(Math.random() * 100) - 50}px`, 
                                y: `${(Math.random() * 100) - 50}px`,
                                opacity: [0, 0.5, 0] 
                              }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1 + Math.random() }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
          
          {/* Right side - Video with enhanced animations */}
          <motion.div 
            style={{ scale: videoScale }}
            variants={videoVariants}
            initial="hidden"
            animate="visible"
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
                
                {/* Enhanced gradient overlay for better text contrast */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-[#000000]/50 to-transparent rounded-xl"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  aria-hidden="true"
                ></motion.div>
                
                {/* Animated border effect */}
                <motion.div 
                  className="absolute inset-0 rounded-xl border-2 border-[#FD5A1E]/30"
                  initial={{ opacity: 0.2, scale: 0.98 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  aria-hidden="true"
                ></motion.div>
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
              
              {/* Video overlay content */}
              <motion.div 
                className="absolute bottom-4 left-4 text-[#F5F5F5] text-sm bg-[#000000]/70 px-3 py-1 rounded-full flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FD5A1E]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Premium Vending Experience</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Animated scroll indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
        >
          <motion.div
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "loop", 
              ease: "easeInOut"
            }}
            className="flex flex-col items-center"
          >
            <span className="text-[#F5F5F5] text-sm mb-2 opacity-70">Scroll to explore</span>
            <svg 
              className="w-6 h-6 text-[#FD5A1E]" 
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SplitHeroSection;