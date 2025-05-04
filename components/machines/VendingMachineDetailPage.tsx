import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MachineData } from '@/lib/data/vendingMachineData';
import { AnimatePresence, motion } from 'framer-motion';


interface VendingMachineDetailPageProps {
  machine: MachineData;
}

/**
 * VendingMachineDetailPage Component
 * 
 * Enhanced version with larger images, lens effect, and recommended features
 */
const VendingMachineDetailPage = ({ machine }: VendingMachineDetailPageProps) => {
  // State for active image in gallery
  const [activeImage, setActiveImage] = useState(0);
  
  // State for active tab in product details
  const [activeTab, setActiveTab] = useState('features');
  
  // State for whether to show lens effect
  const [, setShowLensEffect] = useState(true);
  
  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setShowLensEffect(false);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-[#F5F5F5]">
      {/* Product Header - Full Width */}
      <section className="py-8 bg-gradient-to-b from-[#000000] to-[#000000]/80 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-2">{machine.name}</h1>
          <p className="text-[#FD5A1E] text-xl mb-4">Model: {machine.model}</p>
          <p className="text-xl text-[#A5ACAF] max-w-3xl">{machine.shortDescription}</p>
        </div>
      </section>
      
      {/* Main Content - Using Grid for Better Space Utilization */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column - Images (Larger Area) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Main Image Gallery with Lens Effect */}
              <div className="bg-[#4d4d4d]/30 p-6 rounded-xl border border-[#a4acac]">
                {/* Large Main Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-4 transition-all duration-300 hover:shadow-lg hover:shadow-[#FD5A1E]/20 ">
                  {/* <div 
                    className="absolute top-4 right-4 bg-[#000000]/70 text-[#F5F5F5] px-3 py-1 rounded-full text-xs z-20 flex items-center cursor-pointer"
                    onClick={() => setShowLensEffect(!showLensEffect)}
                    role="button"
                    aria-pressed={showLensEffect}
                    aria-label={showLensEffect ? "Disable zoom effect" : "Enable zoom effect"}
                  > */}
                    {/* {showLensEffect ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M5 8a1 1 0 011-1h1V6a1 1 0 012 0v1h1a1 1 0 110 2H9v1a1 1 0 11-2 0V9H6a1 1 0 01-1-1z" />
                          <path fillRule="evenodd" d="M2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8zm6-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
                        </svg>
                        Zoom Active
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                        Enable Zoom
                      </>
                    )} */}
                    
                  {/* </div> */}
                  
                  {/* Use our lens effect component if enabled, otherwise use regular Image */}
                  {/* {showLensEffect ? (
                    <LensEffectImage 
                      src={machine.images[activeImage].src} 
                      alt={machine.images[activeImage].alt}
                      zoomFactor={2}
                      lensSize={180}
                    />
                  ) : ( */}
                    <>
                      <div className="absolute inset-0 flex items-center justify-center bg-[#000000]/80 text-[#A5ACAF] z-0">
                        {machine.images[activeImage].alt}
                      </div>
                      <Image 
                        src={machine.images[activeImage].src} 
                        alt={machine.images[activeImage].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                        className="object-contain z-10"
                        priority
                      />
                    </>
                  )
                  {/* } */}
                  
                  {/* Previous/Next Buttons */}
                  <button 
                    className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 bg-black/70 rounded-full p-2 text-white hover:bg-[#FD5A1E] transition-colors"
                    onClick={() => setActiveImage((prev) => (prev === 0 ? machine.images.length - 1 : prev - 1))}
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 bg-black/70 rounded-full p-2 text-white hover:bg-[#FD5A1E] transition-colors"
                    onClick={() => setActiveImage((prev) => (prev === machine.images.length - 1 ? 0 : prev + 1))}
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Thumbnail Navigation - Horizontal Scrolling with Larger Thumbs */}
                <div className="flex space-x-2 overflow-x-auto pb-2 pt-2 px-1">
                  {machine.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setActiveImage(index)}
                      className={`relative flex-shrink-0 w-28 h-20 rounded-md overflow-hidden transition-all duration-200 ${
                        index === activeImage 
                          ? 'border-2 border-[#FD5A1E] shadow-lg shadow-[#FD5A1E]/20 scale-105' 
                          : 'border-2 border-[#a4acac] hover:border-[#FD5A1E]/70'
                      }`}
                      aria-label={`View ${image.alt}`}
                      aria-current={index === activeImage}
                    >
                      <Image 
                        src={image.src} 
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover bg-black"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Dimensions Box - Enhanced with Icons */}
              <div className="bg-[#4d4d4d]/30 p-6 rounded-xl border border-[#a4acac]">
                <h2 className="text-xl font-bold text-[#F5F5F5] mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-[#FD5A1E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                  </svg>
                  Dimensions & Specifications
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {machine.dimensions.map((dimension, index) => (
                    <div key={index} className="bg-[#000000]/30 p-4 rounded-lg text-center transform transition-transform hover:scale-105">
                      <p className="text-[#A5ACAF] text-sm mb-1">{dimension.label}</p>
                      <p className="text-[#F5F5F5] font-medium">{dimension.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Best For Section - Enhanced with Grid Layout */}
              <div className="bg-[#FD5A1E]/10 p-6 rounded-xl border border-[#FD5A1E]">
                <h2 className="text-xl font-bold text-[#F5F5F5] mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-[#FD5A1E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Ideal Locations
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {machine.bestFor.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start bg-[#000000]/20 p-3 rounded-lg border border-[#FD5A1E]/30"
                    >
                      <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#F5F5F5]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Details */}
            <div className="lg:col-span-5 xl:col-span-4">
              {/* Description Box - With Enhanced Styling */}
              <div className="bg-[#4d4d4d]/30 p-6 rounded-xl border border-[#a4acac] mb-6">
                <h2 className="text-xl font-bold text-[#F5F5F5] mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-[#FD5A1E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Overview
                </h2>
                <div className="text-[#A5ACAF] space-y-4">
                  <p>{machine.description}</p>
                </div>
              </div>
              
              {/* Zero Cost Installation Banner */}
              <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E] rounded-xl p-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-[#FD5A1E]/20 p-3 rounded-full mr-3 shrink-0">
                    <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#F5F5F5]">Zero Cost Installation</h3>
                    <p className="text-[#A5ACAF] text-sm">Installed completely free of charge, with no ongoing costs</p>
                  </div>
                </div>
              </div>
              
              {/* Tabbed Content - Enhanced with Animation */}
              <div className="mb-6 bg-[#4d4d4d]/30 rounded-xl border border-[#a4acac] overflow-hidden">
                {/* Tab navigation */}
                <div className="flex border-b border-[#a4acac]">
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`flex-1 py-3 px-4 font-medium text-sm focus:outline-none transition-colors
                      ${activeTab === 'features' 
                        ? "bg-[#000000]/50 text-[#FD5A1E] border-b-2 border-[#FD5A1E]" 
                        : "text-[#A5ACAF] hover:text-white hover:bg-[#000000]/30"
                      }`}
                    aria-selected={activeTab === 'features'}
                    role="tab"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`flex-1 py-3 px-4 font-medium text-sm focus:outline-none transition-colors
                      ${activeTab === 'specs' 
                        ? "bg-[#000000]/50 text-[#FD5A1E] border-b-2 border-[#FD5A1E]" 
                        : "text-[#A5ACAF] hover:text-white hover:bg-[#000000]/30"
                      }`}
                    aria-selected={activeTab === 'specs'}
                    role="tab"
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`flex-1 py-3 px-4 font-medium text-sm focus:outline-none transition-colors
                      ${activeTab === 'products' 
                        ? "bg-[#000000]/50 text-[#FD5A1E] border-b-2 border-[#FD5A1E]" 
                        : "text-[#A5ACAF] hover:text-white hover:bg-[#000000]/30"
                      }`}
                    aria-selected={activeTab === 'products'}
                    role="tab"
                  >
                    Products
                  </button>
                </div>
                
                {/* Tab content with animations */}
                <div className="p-6 relative min-h-[400px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'features' && (
                      <motion.div 
                        key="features"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {machine.features.map((feature, index) => (
                          <div key={index} className="bg-[#000000]/30 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="bg-[#FD5A1E]/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                                {feature.icon ? (
                                  <span className="text-[#FD5A1E]" dangerouslySetInnerHTML={{ __html: feature.icon }} />
                                ) : (
                                  <svg className="w-5 h-5 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              <h3 className="font-medium text-white">{feature.title} 
                              </h3>
                            </div>
                            <p className="text-[#A5ACAF] text-sm pl-12">{feature.description}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                    
                    {activeTab === 'specs' && (
                      <motion.div 
                        key="specs"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        {machine.specifications.map((specGroup, groupIndex) => (
                          <div key={groupIndex} className="space-y-2">
                            <h3 className="font-medium text-white mb-2">{specGroup.category}</h3>
                            <div className="bg-[#000000]/30 rounded-lg">
                              {specGroup.items.map((item, itemIndex) => (
                                <div 
                                  key={itemIndex} 
                                  className={`flex justify-between py-2 px-4 text-sm ${
                                    itemIndex !== specGroup.items.length - 1 ? 'border-b border-[#a4acac]/30' : ''
                                  }`}
                                >
                                  <span className="text-[#A5ACAF]">{item.label}</span>
                                  <span className="text-[#F5F5F5] text-right">
                                    {Array.isArray(item.value) ? item.value.join(', ') : item.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                    
                    {activeTab === 'products' && (
                      <motion.div
                        key="products"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-[#A5ACAF] mb-4">
                          This machine can be stocked with a customized selection from our extensive product catalog:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                          {machine.productOptions.map((product, index) => (
                            <div key={index} className="flex items-start">
                              <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-[#F5F5F5]">{product}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* CTA Box - Enhanced with More Details */}
              <div className="bg-[#000000] p-6 rounded-xl border border-[#FD5A1E]">
                <div className="flex items-center mb-4">
                  <div className="bg-[#FD5A1E]/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Zero Cost Installation</h3>
                    <p className="text-[#A5ACAF] text-sm">Installed completely free of charge</p>
                  </div>
                </div>
                
                <ul className="mb-4 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">Free delivery and installation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">Included maintenance and service</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">Regular restocking service</span>
                  </li>
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Link 
                    href="/contact" 
                    className="flex-1 py-3 px-4 bg-[#FD5A1E] text-[#F5F5F5] rounded-lg font-medium hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors text-center"
                  >
                    Request This Machine
                  </Link>
                  <Link 
                    href="/proposal" 
                    className="flex-1 py-3 px-4 border-2 border-[#FD5A1E] text-[#FD5A1E] rounded-lg font-medium hover:bg-[#FD5A1E]/10 transition-colors text-center"
                  >
                    View Proposal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Maintenance Section */}
      <section className="py-12 bg-gradient-to-b from-[#000000] to-[#4d4d4d]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
              Maintenance-Free Operation
            </h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              We handle all aspects of machine operation so you can focus on your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#4d4d4d] rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-all transform hover:scale-105">
              <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Regular Restocking</h3>
              <p className="text-[#A5ACAF] text-center">
                We monitor inventory levels and proactively restock all products to ensure your machine is never empty.
              </p>
            </div>
            
            <div className="bg-[#4d4d4d] rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-all transform hover:scale-105">
              <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Maintenance & Repairs</h3>
              <p className="text-[#A5ACAF] text-center">
                All maintenance, cleaning, and repairs are handled by our technicians at no cost to you.
              </p>
            </div>
            
            <div className="bg-[#4d4d4d] rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-all transform hover:scale-105">
              <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Technical Support</h3>
              <p className="text-[#A5ACAF] text-center">
                24/7 support for any issues, with rapid response times and remote diagnostics capability.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Machines */}
      <section className="py-12 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-8 flex items-center">
            <svg className="w-6 h-6 mr-2 text-[#FD5A1E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Related Vending Machines
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {machine.relatedMachines.map((relatedMachine) => (
              <Link
                key={relatedMachine.id}
                href={`/vending-machines/${relatedMachine.id}`}
                className="group bg-[#4d4d4d]/30 rounded-xl overflow-hidden border border-[#a4acac] hover:border-[#FD5A1E] transition-all flex flex-col transform hover:scale-[1.02]"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={relatedMachine.image} 
                    alt={relatedMachine.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="text-[#F5F5F5] font-medium px-3 py-1 bg-[#FD5A1E] rounded-full text-sm">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-white group-hover:text-[#FD5A1E] transition-colors">{relatedMachine.name}</h3>
                  <p className="text-[#FD5A1E] text-sm">{relatedMachine.model}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link
              href="/vending-machines"
              className="px-6 py-3 bg-[#4d4d4d] text-[#F5F5F5] font-medium rounded-full shadow-lg 
                        hover:bg-[#4d4d4d]/80 transition-colors inline-flex items-center"
            >
              View All Machines
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-[#FD5A1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
            Ready to Enhance Your Workplace?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Join businesses enhancing employee satisfaction with our premium vending solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-[#F5F5F5] text-[#000000] font-medium rounded-full shadow-lg hover:bg-[#000000] hover:text-[#F5F5F5] hover:border-[#F5F5F5] border border-transparent transition-colors"
            >
              Contact Us Today
            </Link>
            <Link 
              href="/proposal" 
              className="px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full hover:bg-[#F5F5F5]/10 transition-colors"
            >
              View Our Proposal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendingMachineDetailPage;