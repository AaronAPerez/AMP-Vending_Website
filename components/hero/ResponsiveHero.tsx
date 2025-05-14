// src/components/hero/ResponsiveHero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile, useIsTablet } from '@/hooks/useMediaQuery';
import Text from '../ui/typography/Text';
import Container from '../ui/Container';
import HeroParallax from './HeroParallax';
import Link from 'next/link';

interface ResponsiveHeroProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

/**
 * ResponsiveHero Component
 * 
 * A fully responsive hero section that adapts to different screen sizes
 * with consistent title positioning across all devices
 */
const ResponsiveHero = ({
  title,
  subtitle}: ResponsiveHeroProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Adjust content based on screen size
  const titleSize = 'h1'; // Use h1 for all devices
  const subtitleSize = isMobile ? 'body' : isTablet ? 'h5' : 'h4';

  // For mobile reduce parallax intensity or disable
  const parallaxProps = {
    renderHeading: false,
    renderContent: false,
    intensity: isMobile ? 0.5 : 1
  };

  return (
    <section className="relative min-h-screen">
      {/* Background Parallax - adjust rendering based on device */}
      <HeroParallax {...parallaxProps} />

      {/* Content container with consistent vertical positioning */}
      <div className="absolute inset-0 flex flex-col z-30">
        {/* Top padding to place content in the visual sweet spot consistently across devices */}
        <div className="flex-grow-0 pt-20 sm:pt-24 md:pt-32 lg:pt-36"></div>

        {/* Main content area with flex-grow to push content towards the top rather than centering */}
        <div className="flex-grow flex items-start">
          <Container>
            <motion.div
              className="text-center max-w-4xl mx-auto px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Responsive title with custom text component and consistent styling */}
              <Text
                variant={titleSize}
                element="h1"
                className="mb-6 drop-shadow-lg hero-title"
              >
                {title}
              </Text>

              {/* Responsive subtitle */}
              {subtitle && (
                <Text
                  variant={subtitleSize}
                  color="muted"
                  className="mb-8 max-w-3xl mx-auto hero-subtitle"
                >
                  {subtitle}
                </Text>
              )}

          
           <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/vending-machines"
                className="px-8 py-4 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-color"
                aria-label="View our vending machines"
              >
                View Machines
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full hover:bg-[#FD5A1E] hover:border-[#FD5A1E] transition-colors"
                aria-label="Contact us about vending machines"
              >
                Contact Us
              </Link>
            </div>
            </motion.div>
          </Container>
        </div>

        {/* Empty space to maintain visual balance */}
        <div className="flex-grow-0 flex-shrink-0 h-16 sm:h-24 md:h-32 lg:h-40"></div>
      </div>

      {/* Enhanced Scroll Indicator - shown on all devices */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 scroll-indicator"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: [0, 10, 0],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          },
          opacity: {
            delay: 1,
            duration: 0.8
          }
        }}
      >
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          aria-label="Scroll down to next section"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }
          }}
        >
          <span className="text-[#F5F5F5] text-xs uppercase tracking-widest mb-2 sm:block">Scroll Down</span>
          <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default ResponsiveHero;