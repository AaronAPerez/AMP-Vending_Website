
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Enhanced KoolMoreVendingShowcase Component
 * 
 * A premium showcase for the KoolMore KM-VMRT-50-BR Vending Machine with
 * interactive features, image carousel, and product selection.
 * Implements accessibility-compliant Raiders-inspired color scheme.
 */
const KoolMoreVendingShowcase = () => {
  // State for active feature and animations
  const [activeFeature, setActiveFeature] = useState('touchscreen');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<Record<string, boolean>>({});
  const showcaseRef = useRef<HTMLDivElement>(null);

  // Product specifications
  const specifications = [
    { name: 'Model', value: 'KM-VMRT-50-BR' },
    { name: 'Dimensions', value: '72" H x 39" W x 33" D' },
    { name: 'Weight', value: '800 lbs' },
    { name: 'Power', value: '110-120V, 60Hz' },
    { name: 'Capacity', value: '400+ items (varied sizes)' },
    { name: 'Temperature', value: '36°F to 41°F (refrigerated section)' }
  ];

  // Array of available machine images
  const machineImages = [
    {
      src: "/images/vending-machines/front-Bg-Transparent.png",
      alt: "KoolMore Vending Machine Front View",
      description: "Front view of KoolMore KM-VMRT-50-BR Vending Machine"
    },
    {
      src: "/images/vending-machines/left.jpg",
      alt: "KoolMore Vending Machine Left Side View",
      description: "Left side profile view"
    },
    {
      src: "/images/vending-machines/right.jpg",
      alt: "KoolMore Vending Machine Right Side View",
      description: "Right side profile view"
    },
    {
      src: "/images/vending-machines/measurements.jpg",
      alt: "KoolMore Vending Machine Measurements",
      description: "Detailed measurements and specifications"
    },
    {
      src: "/images/Vending_Bill-Insert.jpg",
      alt: "Bill Acceptor Close-up",
      description: "Bill validator and payment interface"
    },
    {
      src: "/images/Vending-coin.jpg",
      alt: "Coin Mechanism Close-up",
      description: "Coin insertion and change return mechanism"
    },
    {
      src: "/images/Vending-Screen.jpg",
      alt: "Touchscreen Interface",
      description: "21.5\" HD touchscreen display interface"
    },
    {
      src: "/images/Vending-Push-Door.jpg",
      alt: "Product Delivery Door",
      description: "Product delivery mechanism and door"
    },
    {
      src: "/images/Vending-Back.jpg",
      alt: "Back View of Machine",
      description: "Rear view showing service access panel"
    }
  ];

  // Key features with icons, descriptions and details
  const features = useMemo(() => [
    {
      id: 'touchscreen',
      title: '21.5" HD Touchscreen',
      description: 'Intuitive interface for easy product selection with multilingual support and digital advertising capabilities.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
          <path fillRule="evenodd" d="M8.625 5.625H3a1.5 1.5 0 0 0-1.5 1.5v.75c0 .414.336.75.75.75h.75v10.5A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5V8.625h.75a.75.75 0 0 0 .75-.75v-.75a1.5 1.5 0 0 0-1.5-1.5h-5.625V3a1.5 1.5 0 0 0-1.5-1.5h-3a1.5 1.5 0 0 0-1.5 1.5v2.625Zm0 0V3.75h3V5.625h-3Z" clipRule="evenodd" />
        </svg>
      ),
      imageIndex: 6, // Index of the touchscreen image
      details: [
        'Full HD 1080p resolution for crisp product images',
        'Capacitive touchscreen with anti-glare coating',
        'Support for promotional videos and advertisements',
        'ADA-compliant with accessibility features'
      ]
    },
    {
      id: 'payment',
      title: 'Advanced Payment System',
      description: 'Accept multiple payment methods including credit cards, mobile payments, cash, and coins.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
          <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
        </svg>
      ),
      imageIndex: 4, // Index of the payment system image
      details: [
        'EMV-compliant credit/debit card reader (tap, insert, swipe)',
        'NFC support for Apple Pay, Google Pay, and Samsung Pay',
        'High-capacity bill validator with $1-$20 acceptance',
        'Coin mechanism with change dispensing capabilities'
      ]
    },
    {
      id: 'refrigeration',
      title: 'Dual Temperature Zones',
      description: 'Refrigerated and ambient temperature sections for versatile product offerings.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M11.25 3v4.046a3 3 0 00-4.277 4.204H1.5v-6A2.25 2.25 0 013.75 3h7.5zM12.75 3v4.011a3 3 0 014.239 4.239H22.5v-6A2.25 2.25 0 0020.25 3h-7.5zM22.5 12.75h-8.983a4.125 4.125 0 004.108 3.75.75.75 0 010 1.5 5.623 5.623 0 01-4.875-2.817.75.75 0 01-.75 0 5.623 5.623 0 01-4.875 2.817.75.75 0 010-1.5 4.126 4.126 0 004.108-3.75H1.5v6A2.25 2.25 0 003.75 21h7.5v-4.046a3.001 3.001 0 104.5 0V21h7.5a2.25 2.25 0 002.25-2.25v-6z" />
        </svg>
      ),
      imageIndex: 0, // Default to front view for refrigeration
      details: [
        'Energy-efficient compressor for optimal cooling',
        'Separate digital temperature controls for each zone',
        'Automatic defrost system with condensate evaporation',
        'Food-safety certified for perishable items'
      ]
    },
    {
      id: 'storage',
      title: 'High-Capacity Storage',
      description: 'Configurable shelving for up to 400+ items with varying sizes and packaging.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
          <path fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        </svg>
      ),
      imageIndex: 3, // Index of the measurements image
      details: [
        'Adjustable shelving with 6-8 trays based on configuration',
        'Spiral delivery system with individual motors',
        'Guaranteed vend detection with product drop sensor',
        'Large delivery bin with automatic opening door'
      ]
    },
    {
      id: 'monitoring',
      title: 'Remote Monitoring',
      description: 'Cloud-based system for inventory tracking, sales data, and machine status.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      ),
      imageIndex: 8, // Back panel view
      details: [
        'Cellular connectivity with automatic fallback systems',
        'Real-time sales and inventory analytics dashboard',
        'Automated alert system for maintenance needs',
        'Remote price and planogram updates'
      ]
    },
    {
      id: 'security',
      title: 'Enhanced Security',
      description: 'Anti-theft drop sensor and durable construction protect your investment.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
        </svg>
      ),
      imageIndex: 7, // Product delivery door
      details: [
        'Anti-theft drop sensor guarantees product delivery or refund',
        'Reinforced steel cabinet with multi-point locking system',
        'Cashbox protection with separate secure access',
        'Optional security camera integration for monitoring'
      ]
    },
    // ... other feature objects
  ], []); // Empty dependency array since features don't depend on any state or props



  // Products that can be displayed in the machine
  const products = [
    {
      id: 'coke',
      name: 'Coca-Cola',
      price: '$2.00',
      type: 'beverage',
      position: { row: 1, col: 1 },
      image: '/images/beverages/coke.jpg'
    },
    {
      id: 'redbull',
      name: 'Red Bull',
      price: '$3.25',
      type: 'energy',
      position: { row: 1, col: 2 },
      image: '/images/beverages/RedBull.jpg'
    },
    {
      id: 'lays',
      name: 'Lays Chips',
      price: '$1.75',
      type: 'snack',
      position: { row: 2, col: 1 },
      image: '/images/snacks/lays.jpg'
    },
    {
      id: 'doritos',
      name: 'Doritos',
      price: '$1.75',
      type: 'snack',
      position: { row: 2, col: 2 },
      image: '/images/snacks/doritos.jpg'
    },
    {
      id: 'monster',
      name: 'Monster Energy',
      price: '$3.00',
      type: 'energy',
      position: { row: 3, col: 1 },
      image: '/images/beverages/monster.jpg'
    },
    {
      id: 'snickers',
      name: 'Snickers',
      price: '$1.75',
      type: 'candy',
      position: { row: 3, col: 2 },
      image: '/images/snacks/snickers.jpg'
    }
  ];

  // Auto-rotate through features
  useEffect(() => {
    if (!isFullscreen) {
      const timer = setTimeout(() => {
        // Find the index of the current active feature
        const currentIndex = features.findIndex(f => f.id === activeFeature);
        // Move to the next feature, or back to the first if at the end
        const nextIndex = (currentIndex + 1) % features.length;
        setActiveFeature(features[nextIndex].id);
        setActiveImageIndex(features[nextIndex].imageIndex || 0);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [activeFeature, features, isFullscreen]);

  // Handle feature selection
  const handleFeatureSelect = (featureId: string) => {
    setActiveFeature(featureId);

    // If clicking on already expanded feature, collapse it, otherwise expand it
    setExpandedFeature(expandedFeature === featureId ? null : featureId);

    // Update active image to match feature
    const feature = features.find(f => f.id === featureId);
    if (feature && feature.imageIndex !== undefined) {
      setActiveImageIndex(feature.imageIndex);
    }
  };

  // Handle image zoom
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Navigate to previous image
  const goToPreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering fullscreen toggle
    setActiveImageIndex((prev) => (prev === 0 ? machineImages.length - 1 : prev - 1));
  };

  // Navigate to next image
  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering fullscreen toggle
    setActiveImageIndex((prev) => (prev === machineImages.length - 1 ? 0 : prev + 1));
  };

  // Handle product selection
  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId === selectedProduct ? null : productId);
  };

  return (
    <div ref={showcaseRef} className="bg-[#000000] text-[#F5F5F5]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="#A5ACAF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
            Premium Vending Solution
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#F5F5F5]">
            KoolMore <span className="text-[#FD5A1E]">KM-VMRT-50-BR</span> Vending Machine
          </h1>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
            State-of-the-art refrigerated vending machine with touchscreen interface and multi-payment system.
          </p>
        </div>

        {/* Machine Showcase */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-stretch">
          {/* Machine Image Carousel */}
          <div className="relative flex flex-col h-full">
            <div className="bg-[#4d4d4d] rounded-xl overflow-hidden border border-[#a4acac] shadow-2xl relative flex-grow">
              {/* Main Image Container */}
              <div className="min-h-[600px] bg-[#000000] rounded-lg relative">
                {/* Main Image with click to fullscreen */}
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={toggleFullscreen}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFullscreen();
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label="Click to view image fullscreen"
                >
                  <div className="relative w-full h-[500px]">
                    <Image
                      src={machineImages[activeImageIndex].src}
                      alt={machineImages[activeImageIndex].alt}
                      fill
                      className={`object-contain transition-opacity duration-500 ${isLoaded[machineImages[activeImageIndex].src] ? 'opacity-100' : 'opacity-0'
                        }`}
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      onLoad={() => setIsLoaded(prev => ({ ...prev, [machineImages[activeImageIndex].src]: true }))}
                    />

                    {/* Loading skeleton */}
                    {!isLoaded[machineImages[activeImageIndex].src] && (
                      <div className="absolute inset-0 bg-[#4d4d4d] animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Carousel Controls */}
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-[#000000]/70 text-[#F5F5F5] hover:bg-[#000000]/90 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E]"
                  onClick={goToPreviousImage}
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-[#000000]/70 text-[#F5F5F5] hover:bg-[#000000]/90 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E]"
                  onClick={goToNextImage}
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Product selection overlay if product is selected */}
                {selectedProduct && !isFullscreen && (
                  <div className="absolute inset-0 bg-[#000000] bg-opacity-80 flex items-center justify-center z-10">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-[#4d4d4d] p-6 rounded-lg shadow-lg max-w-xs border border-[#a4acac]"
                    >
                      {/* Product image */}
                      <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                        <Image
                          src={products.find(p => p.id === selectedProduct)?.image || ''}
                          alt={products.find(p => p.id === selectedProduct)?.name || ''}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 240px"
                          onError={(e) => {
                            // Fallback if image doesn't load
                            e.currentTarget.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'absolute inset-0 bg-[#4d4d4d] flex items-center justify-center';
                            fallback.innerHTML = `<div class="text-[#A5ACAF] text-sm">${products.find(p => p.id === selectedProduct)?.name}</div>`;
                            e.currentTarget.parentNode?.appendChild(fallback);
                          }}
                        />
                      </div>

                      <h3 className="font-bold text-lg mb-1 text-[#F5F5F5]">
                        {products.find(p => p.id === selectedProduct)?.name}
                      </h3>
                      <p className="text-[#A5ACAF] text-sm mb-4">
                        {products.find(p => p.id === selectedProduct)?.price}
                      </p>
                      <div className="flex justify-between">
                        <button
                          className="px-4 py-2 bg-[#FD5A1E] text-[#F5F5F5] rounded hover:bg-[#FD5A1E]/90 focus:ring-2 focus:ring-[#F5F5F5] focus:outline-none transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            // In a real app, this would trigger the purchase flow
                            alert(`You selected: ${products.find(p => p.id === selectedProduct)?.name}`);
                            setSelectedProduct(null);
                          }}
                        >
                          Purchase
                        </button>
                        <button
                          className="px-4 py-2 bg-[#000000] text-[#F5F5F5] rounded hover:bg-[#4d4d4d] focus:ring-2 focus:ring-[#A5ACAF] focus:outline-none transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(null);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Fullscreen indicator */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                  Click to {isFullscreen ? 'exit fullscreen' : 'view fullscreen'}
                </div>
              </div>
              {/* Image Description */}
              <div className="mt-2 text-center text-[#FD5A1E] text-md pb-2">
                {machineImages[activeImageIndex].description}
              </div>

              {/* Thumbnail Gallery */}
              <div className="my-2 flex flex-wrap space-x-2 overflow-x-auto pb-2 px-4">
                {machineImages.map((image, index) => (
                  <button
                    key={index}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${activeImageIndex === index
                        ? 'border-[#FD5A1E] scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`View ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={`Thumbnail for ${image.alt}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Image Description */}
              {/* <div className="mt-2 text-center text-[#A5ACAF] text-sm pb-4">
                {machineImages[activeImageIndex].description}
              </div> */}
            </div>

            {/* Special tags */}
            <div className="absolute -top-4 -right-4 bg-[#FD5A1E] text-[#F5F5F5] py-2 px-4 rounded-full shadow-lg transform rotate-12 font-bold z-10">
              <div className="text-xs">Starting at</div>
              <div className="text-xl">$0</div>
              <div className="text-xs">No upfront cost</div>
            </div>

            {/* <div className="absolute -bottom-4 -left-4 bg-[#000000] text-[#F5F5F5] py-2 px-4 rounded-full shadow-lg border border-[#FD5A1E] transform -rotate-12 z-10">
              <div className="text-xs">Earn</div>
              <div className="text-xl text-[#FD5A1E]">5%</div>
              <div className="text-xs">Revenue share</div>
            </div> */}

            {/* Machine specifications */}
            <div className="bg-[#4d4d4d] rounded-lg border border-[#a4acac] p-4 mt-4">
              <h3 className="text-lg font-medium text-[#F5F5F5] mb-3">Specifications</h3>
              <div className="grid grid-cols-2 gap-3">
                {specifications.map((spec, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-[#A5ACAF]">{spec.name}:</span>{' '}
                    <span className="font-medium text-[#F5F5F5]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features and Call-to-Action */}
          <div className="space-y-6 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-[#F5F5F5] mb-6">Advanced Features</h2>

            {/* Feature buttons with expandable content */}
            <div className="space-y-3 overflow-y-auto flex-grow">
              {features.map((feature) => (
                <div key={feature.id} className="transition-all duration-300">
                  <button
                    className={`w-full text-left p-4 rounded-lg transition-all ${activeFeature === feature.id
                        ? 'bg-[#FD5A1E] text-white shadow-lg'
                        : 'bg-[#4d4d4d] hover:bg-[#4d4d4d]/80 text-[#F5F5F5] border border-[#a4acac]'
                      }`}
                    onClick={() => handleFeatureSelect(feature.id)}
                    aria-expanded={expandedFeature === feature.id}
                    aria-controls={`feature-details-${feature.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`mr-4 ${activeFeature === feature.id ? 'text-[#F5F5F5]' : 'text-[#FD5A1E]'
                          }`}>
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{feature.title}</h3>
                          <p className={`text-sm mt-1 ${activeFeature === feature.id ? 'text-[#F5F5F5]/80' : 'text-[#A5ACAF]'
                            }`}>
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 transition-transform ${expandedFeature === feature.id ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expandable feature details */}
                  <AnimatePresence>
                    {expandedFeature === feature.id && (
                      <motion.div
                        id={`feature-details-${feature.id}`}
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-[#000000] rounded-lg shadow-lg border border-[#a4acac] p-5">
                          <ul className="space-y-2 text-[#A5ACAF]">
                            {feature.details.map((detail, index) => (
                              <li key={index} className="flex items-start">
                                <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Call to action buttons */}
            <div className="mt-8 space-y-3">
              <Link
                href="/contact"
                className="block w-full bg-[#FD5A1E] hover:bg-[#FD5A1E]/90 text-[#F5F5F5] py-3 px-6 rounded-lg font-medium text-center shadow-lg transition-colors"
              >
                Get a Quote
              </Link>
              <Link
                href="/proposal"
                className="block w-full bg-transparent hover:bg-[#4d4d4d] text-[#F5F5F5] py-3 px-6 rounded-lg font-medium text-center border border-[#A5ACAF] transition-colors"
              >
                View Proposal
              </Link>
            </div>
          </div>
        </div>

        {/* Available Products Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-[#F5F5F5] mb-8 text-center">
            Available Products
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                className="bg-[#4d4d4d] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleProductSelect(product.id)}
              >
                <div className="relative h-32">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.currentTarget.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'absolute inset-0 bg-[#000000] flex items-center justify-center';
                      fallback.innerHTML = `<div class="text-[#A5ACAF] text-xs">${product.name}</div>`;
                      e.currentTarget.parentNode?.appendChild(fallback);
                    }}
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-[#F5F5F5] text-sm">{product.name}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[#FD5A1E] font-bold">{product.price}</span>
                    <span className="text-xs text-[#A5ACAF] bg-[#000000] px-2 py-0.5 rounded-full">{product.type}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>


      {/* Fullscreen image view */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={toggleFullscreen}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-[#000000]/70 text-[#F5F5F5] hover:bg-[#000000] focus:outline-none"
              onClick={toggleFullscreen}
              aria-label="Close fullscreen view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative w-full max-w-5xl h-[80vh]">
              <Image
                src={machineImages[activeImageIndex].src}
                alt={machineImages[activeImageIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              {/* Fullscreen navigation controls */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-[#000000]/70 text-[#F5F5F5] hover:bg-[#000000]/90 focus:outline-none"
                onClick={goToPreviousImage}
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-[#000000]/70 text-[#F5F5F5] hover:bg-[#000000]/90 focus:outline-none"
                onClick={goToNextImage}
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Caption in fullscreen */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#000000]/80 text-[#F5F5F5] p-4 text-center">
                <p className="text-lg">{machineImages[activeImageIndex].description}</p>
                <p className="text-[#A5ACAF] mt-1">Image {activeImageIndex + 1} of {machineImages.length}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KoolMoreVendingShowcase;