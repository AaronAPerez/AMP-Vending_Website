import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MachineData } from "@/lib/data/vendingMachineData";
import CTASection from "../landing/CTASection";


interface VendingMachineDetailPageProps {
  machine: MachineData;
}

/**
 * VendingMachineDetailPage Component
 * 
 * Updated version with horizontal tabs at the top instead of sidebar navigation
 */
const VendingMachineDetailPage = ({ machine }: VendingMachineDetailPageProps) => {
  // State for active image in gallery
  const [activeImage, setActiveImage] = useState(0);

  // State for active tab in product details
  const [activeTab, setActiveTab] = useState('overview');

  // State for whether to show lens effect
  const [showLensEffect, setShowLensEffect] = useState(true);

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
      {/* Product Header with Horizontal Tabs */}
      <section className="sticky top-0 z-30 bg-[#000000] border-b border-[#4d4d4d] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#F5F5F5]">{machine.name}</h1>
              <p className="text-[#FD5A1E] text-lg">Model: {machine.model}</p>
            </div>

            <div className="flex mt-4 md:mt-0">
              <Link
                href="/contact"
                className="px-4 py-2 bg-[#FD5A1E] text-[#F5F5F5] rounded-lg font-medium mr-3 hover:bg-[#FD5A1E]/90 transition-colors text-sm"
              >
                Request This Machine
              </Link>
              <Link
                href="/vending-machines"
                className="px-4 py-2 border border-[#a4acac] text-[#F5F5F5] rounded-lg font-medium hover:bg-[#4d4d4d] transition-colors text-sm"
              >
                All Machines
              </Link>
            </div>
          </div>

          {/* Horizontal Tab Navigation */}
          <div className="flex overflow-x-auto pb-px hide-scrollbar -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-5 font-medium text-sm whitespace-nowrap focus:outline-none transition-colors border-b-2 ${activeTab === 'overview'
                  ? "text-[#FD5A1E] border-[#FD5A1E]"
                  : "text-[#A5ACAF] border-transparent hover:text-white hover:border-[#a4acac]"
                }`}
              aria-selected={activeTab === 'overview'}
              role="tab"
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`py-3 px-5 font-medium text-sm whitespace-nowrap focus:outline-none transition-colors border-b-2 ${activeTab === 'features'
                  ? "text-[#FD5A1E] border-[#FD5A1E]"
                  : "text-[#A5ACAF] border-transparent hover:text-white hover:border-[#a4acac]"
                }`}
              aria-selected={activeTab === 'features'}
              role="tab"
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`py-3 px-5 font-medium text-sm whitespace-nowrap focus:outline-none transition-colors border-b-2 ${activeTab === 'specs'
                  ? "text-[#FD5A1E] border-[#FD5A1E]"
                  : "text-[#A5ACAF] border-transparent hover:text-white hover:border-[#a4acac]"
                }`}
              aria-selected={activeTab === 'specs'}
              role="tab"
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-3 px-5 font-medium text-sm whitespace-nowrap focus:outline-none transition-colors border-b-2 ${activeTab === 'products'
                  ? "text-[#FD5A1E] border-[#FD5A1E]"
                  : "text-[#A5ACAF] border-transparent hover:text-white hover:border-[#a4acac]"
                }`}
              aria-selected={activeTab === 'products'}
              role="tab"
            >
              Product Options
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className={`py-3 px-5 font-medium text-sm whitespace-nowrap focus:outline-none transition-colors border-b-2 ${activeTab === 'locations'
                  ? "text-[#FD5A1E] border-[#FD5A1E]"
                  : "text-[#A5ACAF] border-transparent hover:text-white hover:border-[#a4acac]"
                }`}
              aria-selected={activeTab === 'locations'}
              role="tab"
            >
              Ideal Locations
            </button>
            <button
              onClick={() => setActiveTab('related')}
              className={`py-3 px-5 font-medium text-sm whitespace-nowrap focus:outline-none transition-colors border-b-2 ${activeTab === 'related'
                  ? "text-[#FD5A1E] border-[#FD5A1E]"
                  : "text-[#A5ACAF] border-transparent hover:text-white hover:border-[#a4acac]"
                }`}
              aria-selected={activeTab === 'related'}
              role="tab"
            >
              Related Machines
            </button>
          </div>
        </div>
      </section>

      {/* Main Content - Updated with Tab Content */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {/* Overview Tab Content */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10"
              >
                {/* Left Column - Large Image Gallery */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                  {/* Main Image Gallery with Lens Effect */}
                  <div className="bg-[#4d4d4d]/20 p-6 rounded-xl border border-[#a4acac]">
                    {/* Large Main Image */}
                    <div className="relative aspect-[1/1] w-full overflow-hidden rounded-lg mb-4 transition-all duration-300 hover:shadow-lg hover:shadow-[#FD5A1E]/20">
                      <div
                        className="absolute top-4 right-4 bg-[#000000]/70 text-[#F5F5F5] px-3 py-1 rounded-full text-xs z-20 flex items-center cursor-pointer"
                        onClick={() => setShowLensEffect(!showLensEffect)}
                        role="button"
                        aria-pressed={showLensEffect}
                        aria-label={showLensEffect ? "Disable zoom effect" : "Enable zoom effect"}
                      >
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
                        )}
                      </div>

                      {/* Use our lens effect component if enabled, otherwise use regular Image 
                      {showLensEffect ? (
                        <LensEffectImage
                          src={machine.images[activeImage].src}
                          alt={machine.images[activeImage].alt}
                          zoomFactor={2}
                          lensSize={180}
                        />
                      ) : (
                        <> */}
                      </div>
                          <div className="absolute inset-0 flex items-center justify-center bg-[#000000]/80 text-[#A5ACAF] z-0">
                            {machine.images[activeImage].alt}
                          </div>
                          <Image
                            src={machine.images[activeImage].src}
                            alt={machine.images[activeImage].alt}
                            quality={100}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                            className="object-contain z-10
                            bg-black"
                            priority
                          />
                        {/* </> */}
            

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
                          className={`relative flex-shrink-0 w-28 h-20 rounded-md overflow-hidden transition-all duration-200 ${index === activeImage
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
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dimensions Box - Enhanced with Icons */}
                  <div className="bg-[#4d4d4d]/20 p-6 rounded-xl border border-[#a4acac]">
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
                </div>

                {/* Right Column - Details */}
                <div className="lg:col-span-5 xl:col-span-4">
                  {/* Description Box - With Enhanced Styling */}
                  <div className="bg-[#4d4d4d]/20 p-6 rounded-xl border border-[#a4acac] mb-6">
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

                  {/* Maintenance-Free Highlights */}
                  <div className="bg-[#000000] p-6 rounded-xl border border-[#a4acac]">
                    <h3 className="text-lg font-bold text-[#F5F5F5] mb-4">Maintenance-Free Operation</h3>
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
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#A5ACAF]">24/7 technical support</span>
                      </li>
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <Link
                        href="/contact"
                        className="flex-1 py-3 px-4 bg-[#FD5A1E] text-[#F5F5F5] rounded-lg font-medium hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors text-center"
                      >
                        Request This Machine
                      </Link>
                      {/* <Link
                        href="/proposal"
                        className="flex-1 py-3 px-4 border-2 border-[#FD5A1E] text-[#FD5A1E] rounded-lg font-medium hover:bg-[#FD5A1E]/10 transition-colors text-center"
                      >
                        View Proposal
                      </Link> */}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Features Tab Content */}
            {activeTab === 'features' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {machine.features.map((feature, index) => (
                  <div key={index} className="bg-[#4d4d4d]/20 p-6 rounded-xl border border-[#a4acac] hover:border-[#FD5A1E] transition-all">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#FD5A1E]/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                        {feature.icon ? (
                          <span className="text-[#FD5A1E]" dangerouslySetInnerHTML={{ __html: feature.icon }} />
                        ) : (
                          <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                    </div>
                    <p className="text-[#A5ACAF]">{feature.description}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Specifications Tab Content */}
            {activeTab === 'specs' && (
              <motion.div
                key="specs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {machine.specifications.map((specGroup, groupIndex) => (
                  <div key={groupIndex} className="bg-[#4d4d4d]/20 p-6 rounded-xl border border-[#a4acac]">
                    <h3 className="text-lg font-bold text-[#F5F5F5] mb-4">{specGroup.category}</h3>
                    <div className="space-y-2">
                      {specGroup.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex justify-between py-2 px-4 rounded-lg bg-[#000000]/40 text-sm"
                        >
                          <span className="text-[#A5ACAF] font-medium">{item.label}</span>
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

            {/* Products Tab Content */}
            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-[#4d4d4d]/20 p-6 rounded-xl border border-[#a4acac] mb-8">
                  <h2 className="text-xl font-bold text-[#F5F5F5] mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-[#FD5A1E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Customizable Product Selection
                  </h2>
                  <p className="text-[#A5ACAF] mb-6">
                    This machine can be stocked with a customized selection of over 50 products from our extensive catalog, tailored to your workplace preferences:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {machine.productOptions.map((product, index) => (
                      <div
                        key={index}
                        className="bg-[#000000]/30 p-3 rounded-lg border border-[#a4acac]/30 hover:border-[#FD5A1E]/30 transition-colors"
                      >
                        <div className="flex items-start">
                          <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-[#F5F5F5]">{product}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E] rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#FD5A1E]/20 p-3 rounded-full mr-4 shrink-0">
                      <svg className="w-6 h-6 text-[#FD5A1E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#F5F5F5]">Product Selection Benefits</h3>
                      <p className="text-[#A5ACAF]">
                        We regularly update product selections based on consumption data and customer feedback to maximize satisfaction.
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-[#000000]/30 p-4 rounded-lg">
                      <h4 className="text-[#F5F5F5] font-bold mb-2">Healthy Options</h4>
                      <p className="text-[#A5ACAF] text-sm">
                        We provide a variety of nutritious options including protein bars, fresh fruit, and low-sugar alternatives to support employee wellness.
                      </p>
                    </div>
                    <div className="bg-[#000000]/30 p-4 rounded-lg">
                      <h4 className="text-[#F5F5F5] font-bold mb-2">Special Dietary Needs</h4>
                      <p className="text-[#A5ACAF] text-sm">
                        Our selection includes gluten-free, vegan, and allergen-conscious options to accommodate diverse dietary requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Ideal Locations Tab Content */}
            {activeTab === 'locations' && (
              <motion.div
                key="locations"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-[#4d4d4d]/20 p-6 rounded-xl border border-[#a4acac] mb-8">
                  <h2 className="text-xl font-bold text-[#F5F5F5] mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-[#FD5A1E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Ideal Placement Locations
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {machine.bestFor.map((location, index) => (
                      <div
                        key={index}
                        className="bg-[#000000]/40 p-4 rounded-lg border border-[#a4acac]/40 hover:border-[#FD5A1E]/40 transition-all hover:bg-[#000000]/60"
                      >
                        <div className="flex items-start">
                          <div className="bg-[#FD5A1E]/10 w-10 h-10 rounded-full flex items-center justify-center mr-3 shrink-0">
                            <svg className="w-5 h-5 text-[#FD5A1E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-[#F5F5F5] font-medium">{location}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location Success Stories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#FD5A1E]/10 p-6 rounded-xl border border-[#FD5A1E]">
                    <h3 className="text-lg font-bold text-white mb-3">Location Requirements</h3>
                    <p className="text-[#A5ACAF] mb-4">
                      To qualify for our zero-cost vending solution, locations typically need:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#A5ACAF]">Standard electrical outlet (120V)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#A5ACAF]">Minimum 15+ employees or regular visitors</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#A5ACAF]">Space dimensions to accommodate machine</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#A5ACAF]">Ground floor access or elevator availability</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center text-[#FD5A1E] hover:text-[#FD5A1E]/80"
                      >
                        <span>Contact us to check eligibility</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
{/* 
                  <div className="bg-[#4d4d4d]/20 p-6 rounded-xl border border-[#a4acac]">
                    <h3 className="text-lg font-bold text-white mb-3">Customer Success Story</h3>
                    <div className="bg-[#000000]/40 p-4 rounded-lg mb-4">
                      <p className="italic text-[#A5ACAF]">
                      &quot;Our staff loves having access to fresh options right in our break room. The touchscreen interface and cashless payment options make it incredibly convenient, and we&apos;ve seen a boost in workplace satisfaction.&quot;
                      </p>
                      <p className="text-[#FD5A1E] mt-2 text-sm font-medium">- Office Manager, Healthcare Facility</p>
                    </div>
                    <Link
                      href="/testimonials"
                      className="inline-flex items-center text-[#F5F5F5] hover:text-[#FD5A1E]"
                    >
                      <span>Read more testimonials</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div> */}
                </div>
              </motion.div>
            )}

            {/* Related Machines Tab Content */}
            {activeTab === 'related' && (
              <motion.div
                key="related"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#F5F5F5] mb-6 flex items-center">
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
                        className="group bg-[#4d4d4d]/20 rounded-xl overflow-hidden border border-[#a4acac] hover:border-[#FD5A1E] transition-all flex flex-col transform hover:scale-[1.02]"
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
                </div>

                <div className="mt-8 mb-4 bg-[#FD5A1E]/10 p-6 rounded-xl border border-[#FD5A1E]">
                  <h3 className="text-lg font-bold text-[#F5F5F5] mb-4">Machine Combinations</h3>
                  <p className="text-[#A5ACAF] mb-6">
                    For locations with diverse needs, we recommend installing multiple machine types to provide the widest selection of options:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#000000]/30 p-4 rounded-lg">
                      <h4 className="text-[#F5F5F5] font-bold flex items-center mb-2">
                        <svg className="w-5 h-5 mr-2 text-[#FD5A1E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Complete Solution
                      </h4>
                      <p className="text-[#A5ACAF] text-sm">
                        Pair this machine with a Non-Refrigerated Snack Machine for the ultimate refreshment station that covers all options.
                      </p>
                    </div>
                    <div className="bg-[#000000]/30 p-4 rounded-lg">
                      <h4 className="text-[#F5F5F5] font-bold flex items-center mb-2">
                        <svg className="w-5 h-5 mr-2 text-[#FD5A1E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Space-Saving
                      </h4>
                      <p className="text-[#A5ACAF] text-sm">
                        For smaller locations, our Compact Refrigerated Machine offers similar benefits in a more space-efficient design.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <Link
                      href="/vending-machines"
                      className="inline-flex items-center text-[#F5F5F5] bg-[#4d4d4d] hover:bg-[#4d4d4d]/80 px-6 py-2 rounded-full transition-colors"
                    >
                      <span>View All Machines</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <CTASection/>
      </section>
    </div>
  );
};

export default VendingMachineDetailPage;