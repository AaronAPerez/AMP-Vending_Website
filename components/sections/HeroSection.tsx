'use client';

import { HeroParallax } from "@/components/ui/aceternity/hero-parallax";
import { SparklesCore } from "@/components/ui/effects/sparkles";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import FlipWords from '../ui/effects/FlipWords';

/**
 * HeroSection Component
 * 
 * An innovative, engaging hero section featuring:
 * - Container text flip animation highlighting advanced technology benefits
 * - Responsive design optimized for all devices
 * - SEO-optimized trending keywords
 * - Enhanced visual hierarchy and user engagement
 * - Performance-optimized animations with reduced motion support
 */
const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const layoutConfig = useResponsiveLayout();
  const { scrollY } = useScroll();

  // Parallax effects for enhanced visual appeal
  const parallaxY = useTransform(scrollY, [0, 300], [0, -50]);
  const fadeOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  // Check if component is mounted (for SSR safety)
  useEffect(() => {
    setMounted(true);
  }, []);

  // SEO-optimized trending words for flip animation - emphasizing technology and modern features
  const flipWords = [
    "Advanced",
    "Smart",
    "Touchscreen",
    "Contactless",
    "Modern",
    "Premium"
  ];

  // Product showcase for parallax background
  const products = [
    {
      title: "Premium Refrigerated Machine",
      thumbnail: "/images/machines/amp-premium-non-refrigerated-vending-machine-front.png",
      link: "/vending-machines/km-vmr-40-b"
    },
    {
      title: "Touchscreen Interface",
      thumbnail: "/images/machines/Vending-Screen.jpg",
      link: "/vending-machines"
    },
    {
      title: "Contactless Payments",
      thumbnail: "/images/machines/vending-payment.jpg",
      link: "/vending-machines"
    },
    {
      title: "Fresh Snack Options",
      thumbnail: "/images/snacks/lays.jpg",
      link: "/vending-machines"
    },
    {
      title: "Healthy Choices",
      thumbnail: "/images/products/planters.jpg",
      link: "/vending-machines"
    },
    {
      title: "Energy Beverages",
      thumbnail: "/images/beverages/monster.jpg",
      link: "/vending-machines"
    },
    {
      title: "Non-Refrigerated Machine",
      thumbnail: "/images/machines/amp-premium-non-refrigerated-vending-machine-front.png",
      link: "/vending-machines/km-vmnt-50-b"
    },
    {
      title: "Candy Selection",
      thumbnail: "/images/snacks/mms.jpg",
      link: "/vending-machines"
    },
    {
      title: "Compact Solutions",
      thumbnail: "/images/machines/amp-standard-refrigerated-vending-machine-front.jpg",
      link: "/vending-machines/km-vmr-30-b"
    },
    {
      title: "Modern Payment System",
      thumbnail: "/images/vending_bill.jpg",
      link: "/vending-machines"
    },
    {
      title: "Easy Access Design",
      thumbnail: "/images/Vending-Push-Door.jpg",
      link: "/vending-machines"
    },
    {
      title: "Professional Installation",
      thumbnail: "/images/Vending-Screen.jpg",
      link: "/contact"
    }
  ];

  // Key benefits for improved engagement (focused on technology and service)
  const keyBenefits = [
    {
      icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25",
      title: "21.5\" HD Touchscreen",
      description: "Latest technology interface"
    },
    {
      icon: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z",
      title: "Tap-to-Pay Technology",
      description: "Modern contactless payments"
    },
    {
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      title: "50+ Product Options",
      description: "Customized for your workplace"
    },
    {
      icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
      title: "Full-Service Support",
      description: "Complete maintenance & restocking"
    }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FD5A1E]" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 z-10" />

      {/* Sparkles Background - Reduced for better performance */}
      <SparklesCore
        id="hero-sparkles"
        className="absolute inset-0 w-full h-full"
        background="transparent"
        minSize={0.6}
        maxSize={1.2}
        particleDensity={layoutConfig.isMobile ? 30 : 60}
        particleColor="#FD5A1E"
        speed={0.5}
      />

      {/* Parallax Background */}
      <motion.div
        style={{ y: parallaxY, opacity: fadeOpacity }}
        className="absolute inset-0"
      >
        <HeroParallax products={products} />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          {/* Hero Content Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Main Headline with Flip Animation */}
            <div className="mb-8">
              <h1 className={`font-bold leading-tight ${layoutConfig.isMobile
                  ? 'text-3xl sm:text-4xl'
                  : 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
                }`}>
                <span className="text-[#F5F5F5] block mb-4">
                  Transform Your Workplace with
                </span>
                <div className="relative">
                  <FlipWords
                    words={flipWords}
                    duration={3000}
                    className="text-[#FD5A1E] font-bold"
                  />
                  <span className="text-[#F5F5F5] ml-2">
                    Vending Solutions
                  </span>
                </div>
              </h1>

              <div className="max-w-2xl mx-auto">
                {/* Subtitle with SEO keywords */}
                <motion.p
                  className={`text-[#A5ACAF] mt-6 max-w-3xl mx-auto leading-relaxed ${layoutConfig.isMobile ? 'text-lg' : 'text-xl lg:text-2xl'
                    }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Advanced workplace vending with 21.5&quot; touchscreen technology, contactless payments,
                  and customizable product selections. Boost employee satisfaction with the latest vending innovation.
                </motion.p>
              </div>

              {/* Call-to-Action Buttons */}
              <motion.div
                className={`flex ${layoutConfig.isMobile ? 'flex-col gap-4' : 'flex-row justify-center gap-6'
                  } mb-12`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#FD5A1E] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#FD5A1E]/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Get workplace vending consultation"
                >
                  <span className="relative z-10 flex items-center">
                    Get Consultation
                    <svg
                      className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FD5A1E] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                <Link
                  href="/vending-machines"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-semibold rounded-full hover:bg-[#F5F5F5] hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F5F5F5] focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="View our vending machine models"
                >
                  View Machines
                </Link>
              </motion.div>
            </div>

            {/* Benefits Grid - Redesigned for better engagement */}
            <motion.div
              className={`grid ${layoutConfig.isMobile
                  ? 'grid-cols-1 gap-6'
                  : 'grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'
                } mb-16`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {keyBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="group relative p-6 bg-black/40 backdrop-blur-sm border border-[#333333] rounded-xl hover:border-[#FD5A1E]/50 transition-all duration-300 hover:transform hover:scale-105"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                  whileHover={{ y: -5 }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FD5A1E]/20 to-[#FD5A1E]/10 rounded-lg flex items-center justify-center mb-4 group-hover:from-[#FD5A1E]/30 group-hover:to-[#FD5A1E]/20 transition-all duration-300">
                    <svg
                      className="w-6 h-6 text-[#FD5A1E]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                    </svg>
                  </div>

                  {/* Content */}
                  <h3 className="text-[#F5F5F5] font-semibold mb-2 text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-[#A5ACAF] text-sm leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FD5A1E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>

            {/* Video Demo Section - Enhanced */}
            {!layoutConfig.isMobile && (
              <motion.div
                className="relative max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#4d4d4d] shadow-2xl group">
                  <video
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={() => setIsVideoLoaded(true)}
                    aria-label="Vending machine demonstration video"
                  >
                    <source src="/videos/vending-machine-demo.mp4" type="video/mp4" />
                  </video>

                  {/* Video loading state */}
                  {!isVideoLoaded && (
                    <div className="absolute inset-0 bg-[#000000] flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FD5A1E]" />
                    </div>
                  )}

                  {/* Video overlay with call-to-action */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                    <Link
                      href="/vending-machines"
                      className="px-6 py-3 bg-[#FD5A1E] text-white font-medium rounded-full hover:bg-[#FD5A1E]/90 transition-colors"
                    >
                      See All Features
                    </Link>
                  </div>
                </div>

                {/* Video caption */}
                <p className="text-center text-[#A5ACAF] mt-4 text-sm">
                  Watch how our touchscreen technology transforms the vending experience
                </p>
              </motion.div>
            )}
        </motion.div>
      </div>

      {/* Scroll indicator - Enhanced */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { duration: 0.8, delay: 1.5 }, 
          y: { duration: 2, repeat: Infinity } 
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-[#A5ACAF] text-xs mb-2">Scroll to explore</span>
          <svg
            className="w-6 h-6 text-[#FD5A1E]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </div>
  </div>
  );
};

export default HeroSection;