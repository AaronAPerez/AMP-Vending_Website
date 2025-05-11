
import React, { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Spotlight from '../ui/aceternity/Spotlight';

interface PremiumVendingShowcaseProps {
    className?: string;
}

const PremiumVendingShowcase: React.FC<PremiumVendingShowcaseProps> = ({
    className = ""
}) => {
    // State for image gallery
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoaded, setIsLoaded] = useState<Record<string, boolean>>({});
    const showcaseRef = useRef<HTMLDivElement>(null);

    // Array of available machine images
    const machineImages = [
        {
            src: "/images/machines/premium-touchscreen-vending-machine.jpg",
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

    // Product specifications
    const specifications = [
        { name: 'Model', value: 'KM-VMRT-50-B' },
        { name: 'Dimensions', value: '51"W x 34.3"D x 76.7"H' },
        { name: 'Weight', value: '800 lbs (363 kg)' },
        { name: 'Power', value: '120V / 60Hz' },
        { name: 'Capacity', value: '60+ product selections' },
        { name: 'Temperature', value: '36°F to 41°F (refrigerated section)' }
    ];

    // Key features for the machine
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

    return (
        <div ref={showcaseRef} className={`mt-16 ${className}`}>
            <h3 className="text-2xl font-bold text-center text-[#F5F5F5] mb-6">
                Experience Our Premium Vending Technology
            </h3>

            <Spotlight
                className="rounded-xl p-6 md:p-10 border border-[#a4acac]"
                spotlightSize={1000}
                spotlightColor="rgba(253, 90, 30, 0.03)"
                backgroundColor="#000000"
                enableGlow={true}
            >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                    {/* Enhanced Image Gallery with carousel */}
                    <div className="flex items-center justify-center">
                        <div className="relative w-full bg-[#4d4d4d] rounded-xl overflow-hidden border border-[#a4acac] shadow-xl">
                            {/* Main Image Container */}
                            <div className="min-h-[400px] lg:min-h-[500px] bg-[#000000] rounded-lg relative">
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
                                    <div className="relative w-full h-[400px]">
                                        <Image
                                            src={machineImages[activeImageIndex].src}
                                            alt={machineImages[activeImageIndex].alt}
                                            fill
                                            className={`object-contain transition-opacity duration-500 ${isLoaded[machineImages[activeImageIndex].src] ? 'opacity-100' : 'opacity-0'}`}
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

                                {/* Fullscreen indicator */}
                                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                                    Click to {isFullscreen ? 'exit fullscreen' : 'view fullscreen'}
                                </div>
                            </div>

                            {/* Image Description */}
                            <div className="mt-2 text-center text-[#FD5A1E] text-md py-2">
                                {machineImages[activeImageIndex].description}
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="my-2 flex flex-wrap justify-center space-x-2 overflow-x-auto pb-2 px-4">
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
                        </div>

                        {/* Special Zero-Cost tag */}
                        <div className="absolute -top-4 -right-4 bg-[#FD5A1E] text-[#F5F5F5] py-2 px-4 rounded-full shadow-lg transform rotate-12 font-bold z-10">
                            <div className="text-xs">Starting at</div>
                            <div className="text-xl">$0</div>
                            <div className="text-xs">No upfront cost</div>
                        </div>
                    </div>

                    {/* Machine features with enhanced styling */}
                    <div className="flex flex-col justify-center">
                        <div className="p-1">
                            <h4 className="text-xl font-bold text-[#FD5A1E] mb-4">
                                KM-VMRT-50-B Premium Refrigerated Machine
                            </h4>

                            <ul className="space-y-4">
                                {features.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex bg-[#000000] p-3 rounded-lg border border-[#4d4d4d] hover:border-[#FD5A1E] transition-colors"
                                        whileHover={{ scale: 1.02, borderColor: '#FD5A1E' }}
                                    >
                                        <div className="mr-3 mt-1">
                                            <div className="bg-[#FD5A1E]/20 p-2 rounded-full">
                                                {feature.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-[#F5F5F5]">{feature.title}</h5>
                                            <p className="text-[#A5ACAF] text-sm">{feature.description}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Quick Specifications */}
                            <div className="mt-4 bg-[#4d4d4d]/20 p-4 rounded-lg border border-[#a4acac]">
                                <h5 className="text-sm font-semibold text-[#F5F5F5] mb-2">
                                    Quick Specifications
                                </h5>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    {specifications.map((spec, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span className="text-[#A5ACAF]">{spec.name}:</span>
                                            <span className="text-[#F5F5F5] font-medium">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    href="/vending-machines/km-vmrt-50-b"
                                    className="inline-flex items-center px-5 py-2 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#FD5A1E]/90 transition-colors"
                                >
                                    View Details
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hover prompt for desktop users */}
                <div className="text-center mt-4 text-[#A5ACAF] text-sm hidden md:block">
                    <span>Move your cursor over the showcase to explore with the spotlight effect</span>
                </div>
            </Spotlight>

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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToPreviousImage(e);
                                }}
                                aria-label="Previous image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-[#000000]/70 text-[#F5F5F5] hover:bg-[#000000]/90 focus:outline-none"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToNextImage(e);
                                }}
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

export default PremiumVendingShowcase;