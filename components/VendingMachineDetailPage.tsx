'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Types for our vending machine data
interface VendingMachineImage {
  id: number;
  src: string;
  alt: string;
}

interface VendingMachineDimension {
  label: string;
  value: string;
}

interface VendingMachineFeature {
  title: string;
  description: string;
  icon?: string;
}

interface VendingMachineSpec {
  category: string;
  items: {
    label: string;
    value: string | string[];
  }[];
}

interface VendingMachineProps {
  id: string;
  name: string;
  model: string;
  shortDescription: string;
  description: string;
  images: VendingMachineImage[];
  dimensions: VendingMachineDimension[];
  features: VendingMachineFeature[];
  specifications: VendingMachineSpec[];
  productOptions: string[];
  bestFor: string[];
  relatedMachines: {
    id: string;
    name: string;
    model: string;
    image: string;
  }[];
}

/**
 * ImageGallery Component
 * Displays a main image with thumbnails for navigation
 */
const ImageGallery: React.FC<{ images: VendingMachineImage[] }> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <div className="space-y-4">
      {/* Main image display */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#a4acac] bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(165,172,175,1)_50%,rgba(253,90,30,1)_100%)]">
        {/* Fallback display if image isn't available */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#000000]/50 text-[#A5ACAF] z-0">
          {images[activeIndex].alt}
        </div>
        
        {/* Actual image */}
        <div className="relative w-full h-full">
          <Image 
            src={images[activeIndex].src} 
            alt={images[activeIndex].alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain z-10"
            priority
          />
        </div>
        
        {/* Previous/Next buttons */}
        <button 
          className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-[#FD5A1E] transition-colors"
          onClick={() => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-[#FD5A1E] transition-colors"
          onClick={() => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Thumbnail navigation */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(index)}
            className={`relative aspect-[4/3] rounded-lg overflow-hidden border  bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(165,172,175,1)_50%,rgba(253,90,30,1)_100%)] ${
              index === activeIndex ? 'border-[#FD5A1E]' : 'border-[#a4acac]'
            }`}
            aria-label={`View ${image.alt}`}
            aria-current={index === activeIndex ? "true" : "false"}
          >
            <Image 
              src={image.src} 
              alt=""
              fill
              sizes="(max-width: 768px) 25vw, 10vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * FeaturesList Component
 * Displays key features with icons and descriptions
 */
const FeaturesList: React.FC<{ features: VendingMachineFeature[] }> = ({ features }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="bg-[#4d4d4d]/50 p-5 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="bg-[#FD5A1E]/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              {feature.icon ? (
                <span className="text-[#FD5A1E]" dangerouslySetInnerHTML={{ __html: feature.icon }} />
              ) : (
                <svg className="w-5 h-5 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <h3 className="font-medium text-white">{feature.title}</h3>
          </div>
          <p className="text-[#A5ACAF]">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

/**
 * SpecificationsTable Component
 * Displays technical specifications in an organized format
 */
const SpecificationsTable: React.FC<{ specifications: VendingMachineSpec[] }> = ({ specifications }) => {
  return (
    <div className="space-y-6">
      {specifications.map((spec, index) => (
        <div key={index} className="bg-[#4d4d4d]/50 p-4 rounded-lg">
          <h3 className="font-medium text-white mb-3">{spec.category}</h3>
          <ul className="space-y-2">
            {spec.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex justify-between text-[#A5ACAF] py-1 border-b border-[#a4acac]/30">
                <span className="font-medium">{item.label}:</span>
                <span className="text-[#F5F5F5]">
                  {Array.isArray(item.value) ? (
                    item.value.join(', ')
                  ) : (
                    item.value
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

/**
 * RelatedMachines Component
 * Shows other vending machines that might interest the user
 */
const RelatedMachines: React.FC<{ machines: VendingMachineProps['relatedMachines'] }> = ({ machines }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {machines.map((machine) => (
        <Link 
          key={machine.id}
          href={`/vending-machines/${machine.id}`}
          className="bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(165,172,175,1)_50%,rgba(253,90,30,1)_100%)] rounded-lg overflow-hidden border border-[#a4acac] hover:border-[#FD5A1E] transition-all block"
        >
          <div className="relative aspect-[4/3]">
            <Image 
              src={machine.image} 
              alt={machine.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-black">{machine.name}</h3>
            <p className="text-gray-700 text-sm">{machine.model}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

/**
 * VendingMachineDetailPage Component
 * Main component that assembles the complete product detail page
 */
const VendingMachineDetailPage: React.FC<{ machine: VendingMachineProps }> = ({ machine }) => {
  // State for active tab in the tabbed content section
  const [activeTab, setActiveTab] = useState('features');
  
  const tabs = [
    { id: 'features', label: 'Features' },
    { id: 'specs', label: 'Specifications' },
    { id: 'products', label: 'Product Options' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#000000]/50 border-b border-[#4d4d4d]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-sm text-[#A5ACAF]">
          <Link href="/" className="hover:text-[#FD5A1E]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/vending-machines" className="hover:text-[#FD5A1E]">Vending Machines</Link>
          <span className="mx-2">/</span>
          <span className="text-[#F5F5F5]">{machine.model}</span>
        </div>
      </div>
      
      {/* Product Header */}
      <section className="py-8 bg-gradient-to-b from-[#000000] to-[#000000]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-2">{machine.name}</h1>
            <p className="text-[#FD5A1E] text-xl mb-4">Model: {machine.model}</p>
            <p className="text-xl text-[#A5ACAF] max-w-3xl">{machine.shortDescription}</p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Left Column - Images */}
            <div>
              <ImageGallery images={machine.images} />
              
              {/* Dimensions Box */}
              <div className="mt-6 bg-[#4d4d4d]/50 p-5 rounded-xl border border-[#a4acac]">
                <h3 className="text-lg font-medium text-white mb-3">Dimensions & Capacity</h3>
                <div className="grid grid-cols-2 gap-4">
                  {machine.dimensions.map((dimension, index) => (
                    <div key={index} className="bg-[#000000]/30 p-3 rounded-lg text-center">
                      <p className="text-[#A5ACAF] text-sm mb-1">{dimension.label}</p>
                      <p className="text-[#F5F5F5] font-medium">{dimension.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Best For / Use Cases */}
              <div className="mt-6 bg-[#FD5A1E]/10 p-5 rounded-xl border border-[#FD5A1E]">
                <h3 className="text-lg font-medium text-white mb-3">Best For</h3>
                <ul className="space-y-2">
                  {machine.bestFor.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#F5F5F5]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Right Column - Details */}
            <div>
              {/* Description */}
              <div className="bg-[#4d4d4d]/30 p-6 rounded-xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <div className="text-[#A5ACAF] space-y-4">
                  <p>{machine.description}</p>
                </div>
              </div>
              
              {/* Tabbed Content */}
              <div className="mb-8">
                {/* Tab navigation */}
                <div className="flex flex-wrap border-b border-[#a4acac]">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 px-5 font-medium text-sm focus:outline-none transition-colors
                        ${activeTab === tab.id 
                          ? "border-b-2 border-[#FD5A1E] text-[#FD5A1E]" 
                          : "text-[#A5ACAF] hover:text-white"
                        }`}
                      aria-selected={activeTab === tab.id}
                      role="tab"
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                
                {/* Tab content */}
                <div className="py-6">
                  {/* Features Tab */}
                  {activeTab === 'features' && (
                    <FeaturesList features={machine.features} />
                  )}
                  
                  {/* Specifications Tab */}
                  {activeTab === 'specs' && (
                    <SpecificationsTable specifications={machine.specifications} />
                  )}
                  
                  {/* Products Tab */}
                  {activeTab === 'products' && (
                    <div className="bg-[#4d4d4d]/50 p-5 rounded-lg">
                      <h3 className="font-medium text-white mb-4">Available Product Options</h3>
                      <p className="text-[#A5ACAF] mb-4">
                        This machine can be stocked with a customized selection from our extensive product catalog, including:
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {machine.productOptions.map((product, index) => (
                          <li key={index} className="flex items-center">
                            <svg className="h-5 w-5 text-[#FD5A1E] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[#F5F5F5]">{product}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact" 
                  className="px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full font-medium hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors"
                >
                  Request This Machine
                </Link>
                <Link 
                  href="/proposal" 
                  className="px-6 py-3 border-2 border-[#FD5A1E] text-[#FD5A1E] rounded-full font-medium hover:bg-[#FD5A1E]/10 transition-colors"
                >
                  View Proposal
                </Link>
              </div>
              
              {/* Zero Cost Reminder */}
              <div className="mt-6 bg-[#000000] p-4 rounded-lg border border-[#FD5A1E] flex items-center">
                <svg className="w-10 h-10 text-[#FD5A1E] mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-white">Zero Cost Installation</h3>
                  <p className="text-[#A5ACAF]">Our machines are installed completely free of charge with no monthly fees.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Maintenance & Service Section */}
      <section className="py-16 bg-gradient-to-b from-[#000000] to-[#4d4d4d]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
              Maintenance-Free Operation
            </h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              We handle all aspects of machine operation so you can focus on your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#4d4d4d] rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-all">
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
            
            <div className="bg-[#4d4d4d] rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-all">
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
            
            <div className="bg-[#4d4d4d] rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-all">
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
      
      {/* Related Machines Section */}
      <section className="py-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-8">
            Related Vending Machines
          </h2>
          
          <RelatedMachines machines={machine.relatedMachines} />
          
          <div className="mt-10 text-center">
            <Link
              href="/vending-machines"
              className="px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors inline-flex items-center"
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
      <section className="py-16 bg-[#FD5A1E] text-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Enhance Your Workplace?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Schedule a free consultation today and see how our zero-cost vending solutions can benefit your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-[#F5F5F5] text-[#000000] font-medium rounded-full shadow-lg hover:bg-[#000000] hover:text-[#F5F5F5] transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link 
              href="/proposal" 
              className="px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full hover:bg-[#000000] transition-colors"
            >
              View Proposal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendingMachineDetailPage;