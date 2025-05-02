'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AccessibleLensEffectImage from '../AccessibleLensEffectImage';


// Types for our vending machines
interface VendingMachine {
  id: string;
  name: string;
  model: string;
  image: string;
  features: string[];
  dimensions: string;
  best: string;
  price: string;
  description: string;
  category: 'refrigerated' | 'non-refrigerated';
}

/**
 * KoolMoreVendingShowcase Component
 * 
 * Displays premium KoolMore vending machines with advanced Amazon-inspired UI
 * and accessibility-enhanced lens zoom effect for machine images
 */
const KoolMoreVendingShowcase: React.FC = () => {
  // State for active filter category
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // State for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // State for featured machine (randomly selected on load)
  const [featuredMachine, setFeaturedMachine] = useState<string | null>(null);
  
  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);
  
  // Set a random featured machine on initial load
  useEffect(() => {
    const machineIds = vendingMachines.map(machine => machine.id);
    const randomIndex = Math.floor(Math.random() * machineIds.length);
    setFeaturedMachine(machineIds[randomIndex]);
  }, []);

  // Array of available premium vending machines
  const vendingMachines: VendingMachine[] = [
    {
      id: 'km-vmnt-50-b',
      name: 'Non-Refrigerated Snack Machine',
      model: 'KM-VMNT-50-B',
      image: '/images/machines/KM-VMNT-50-B (Non-Refrigerated Snack Machine) bg.png',
      features: [
        'Premium 21.5" Touchscreen Display',
        'Credit Card & Mobile Pay Ready',
        'Bill Acceptor with Recycling',
        'High Capacity Snack Storage',
        'Advanced Remote Monitoring',
        'Optimized LED Lighting'
      ],
      dimensions: '50"W x 30.2"D x 76.7"H',
      best: 'Ideal for offices, waiting areas, and locations requiring dry snacks',
      price: 'Zero Cost Installation',
      description: 'Advanced snack vending solution with large HD touchscreen display, featuring versatile payment options and high-capacity storage for a wide variety of non-refrigerated products.',
      category: 'non-refrigerated'
    },
    {
      id: 'km-vmr-30-b',
      name: 'Compact Refrigerated Machine',
      model: 'KM-VMR-30-B',
      image: '/images/machines/KM-VMR-30-B (Compact Refrigerated Machine) bg.png',
      features: [
        'Space-Saving Refrigerated Design',
        'Energy-Efficient Cooling System',
        'Modern Touchscreen Interface',
        'Multiple Payment Options',
        'Remote Inventory Monitoring',
        'Bright LED Interior Lighting'
      ],
      dimensions: '30"W x 28"D x 76.7"H',
      best: 'Perfect for smaller spaces requiring refrigerated products',
      price: 'Zero Cost Installation',
      description: 'Compact refrigerated vending solution perfect for limited spaces, offering cold beverages and refrigerated snacks with energy-efficient cooling technology.',
      category: 'refrigerated'
    },
    {
      id: 'km-vmr-40-b',
      name: 'Standard Refrigerated Machine',
      model: 'KM-VMR-40-B',
      image: '/images/machines/KM-VMR-40-B (Standard Refrigerated Machine) bg.png',
      features: [
        'Advanced Refrigeration System',
        'Large 60-Selection Capacity',
        'Smart Inventory Management',
        'Versatile Shelf Configuration',
        'Contactless Payment Options',
        'Energy-Efficient Operation'
      ],
      dimensions: '40.4"W x 31"D x 76.7"H',
      best: 'Versatile solution for medium to high-traffic locations',
      price: 'Zero Cost Installation',
      description: 'Versatile refrigerated vending machine designed for reliability and performance, featuring intelligent cooling technology and ample capacity for varied product selections.',
      category: 'refrigerated'
    },
    {
      id: 'km-vmrt-50-b',
      name: 'Premium Refrigerated Machine',
      model: 'KM-VMR-50-B',
      image: '/images/machines/KM-VMRT-50-B (Premium Refrigerated Machine) bg.png',
      features: [
        '21.5" HD Interactive Display',
        'Dual Temperature Zone System',
        'Advanced Payment Processing',
        'Remote Monitoring Technology',
        'High-Capacity Product Storage',
        'Premium Metal Plate Shelving'
      ],
      dimensions: '51"W x 34.3"D x 76.7"H',
      best: 'Ultimate solution for premium locations and diverse product needs',
      price: 'Zero Cost Installation',
      description: 'Our flagship vending solution with state-of-the-art technology, featuring dual temperature zones for maximum product flexibility and an immersive touchscreen interface.',
      category: 'refrigerated'
    }
  ];

  // Filter machines based on the active category
  const filteredMachines = activeCategory === 'all'
    ? vendingMachines
    : vendingMachines.filter(machine => machine.category === activeCategory);

  return (
    <section className="py-16 bg-[#000000]" aria-labelledby="vending-showcase-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            id="vending-showcase-heading"
            className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4"
          >
            Premium Vending <span className="text-[#FD5A1E]">Solutions</span>
          </h2>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
            Explore our range of state-of-the-art vending machines featuring advanced technology 
            and customizable options for your workplace needs.
          </p>
        </div>

        {/* Featured Machine (if any) */}
        {featuredMachine && (
          <div className="bg-gradient-to-r from-[#4d4d4d]/30 to-[#000000] rounded-xl mb-12 overflow-hidden">
            {vendingMachines.filter(machine => machine.id === featuredMachine).map(machine => (
              <div key={machine.id} className="flex flex-col md:flex-row">
                {/* Machine Image */}
                <div className="md:w-1/2 h-72 md:h-96 relative">
                  <AccessibleLensEffectImage
                    src={machine.image} 
                    alt={`${machine.name} - ${machine.model}`}
                    magnificationLevel={2}
                    lensSize={100}
                    ariaLabel={`Featured vending machine: ${machine.name} (${machine.model}). Use arrow keys to explore details.`}
                  />
                  <div className="absolute top-4 left-4 bg-[#FD5A1E] text-[#F5F5F5] px-3 py-1 rounded-full text-sm font-medium">
                    Featured Model
                  </div>
                </div>
                
                {/* Machine Details */}
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2">
                    {machine.name}
                  </h3>
                  <p className="text-[#FD5A1E] font-medium mb-4">{machine.model}</p>
                  
                  <p className="text-[#A5ACAF] mb-6">
                    {machine.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#000000]/50 p-3 rounded-lg">
                      <h4 className="text-[#F5F5F5] text-sm font-medium mb-2">Specifications</h4>
                      <p className="text-[#A5ACAF] text-xs">
                        <span className="block mb-1">Dimensions: {machine.dimensions}</span>
                        <span className="block">Best for: {machine.best}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex gap-3">
                    <Link 
                      href={`/vending-machines/${machine.id}`}
                      className="px-5 py-2 bg-[#FD5A1E] text-[#F5F5F5] rounded-full text-sm font-medium hover:bg-[#FD5A1E]/90 transition-colors"
                    >
                      View Details
                    </Link>
                    <Link 
                      href="/contact"
                      className="px-5 py-2 border border-[#a4acac] text-[#F5F5F5] rounded-full text-sm font-medium hover:bg-[#4d4d4d] transition-colors"
                    >
                      Request Installation
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-8" role="tablist" aria-label="Filter vending machines by category">
          <button
            role="tab"
            id="tab-all"
            aria-selected={activeCategory === 'all'}
            aria-controls="panel-all"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeCategory === 'all'
                ? 'bg-[#FD5A1E] text-[#F5F5F5]'
                : 'bg-[#4d4d4d]/30 text-[#A5ACAF] hover:bg-[#4d4d4d]/50'
            }`}
          >
            All Machines
          </button>
          <button
            role="tab"
            id="tab-refrigerated"
            aria-selected={activeCategory === 'refrigerated'}
            aria-controls="panel-refrigerated"
            onClick={() => setActiveCategory('refrigerated')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeCategory === 'refrigerated'
                ? 'bg-[#FD5A1E] text-[#F5F5F5]'
                : 'bg-[#4d4d4d]/30 text-[#A5ACAF] hover:bg-[#4d4d4d]/50'
            }`}
          >
            Refrigerated
          </button>
          <button
            role="tab"
            id="tab-non-refrigerated"
            aria-selected={activeCategory === 'non-refrigerated'}
            aria-controls="panel-non-refrigerated"
            onClick={() => setActiveCategory('non-refrigerated')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeCategory === 'non-refrigerated'
                ? 'bg-[#FD5A1E] text-[#F5F5F5]'
                : 'bg-[#4d4d4d]/30 text-[#A5ACAF] hover:bg-[#4d4d4d]/50'
            }`}
          >
            Non-Refrigerated
          </button>
        </div>

        {/* Information for screen reader users about image magnification */}
        <div className="sr-only" role="note" aria-live="polite">
          Machine images in this section can be magnified. Use Tab to focus on an image, then arrow keys to move the magnifier, space to toggle zoom, and escape to exit.
        </div>

        {/* Amazon-inspired product grid with lens effect */}
        <div 
          role="tabpanel"
          id={`panel-${activeCategory}`}
          aria-labelledby={`tab-${activeCategory}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredMachines.map((machine) => (
            <div 
              key={machine.id}
              className="rounded-xl overflow-hidden border border-[#a4acac] 
                        hover:border-[#FD5A1E] hover:shadow-lg hover:shadow-[#FD5A1E]/10 
                        transition-all flex flex-col h-full bg-[#4d4d4d]/20"
            >
              {/* Image with lens effect container */}
              <div className="relative h-72 overflow-hidden">
                {/* Accessible Lens effect image */}
                <AccessibleLensEffectImage 
                  src={machine.image} 
                  alt={`${machine.name} - ${machine.model}`}
                  magnificationLevel={prefersReducedMotion ? 1.5 : 2}
                  lensSize={prefersReducedMotion ? 60 : 80}
                />
                
                {/* "Zero Cost" badge */}
                <div className="absolute top-3 right-3 bg-[#FD5A1E] text-[#F5F5F5] px-3 py-1 rounded-full text-xs font-medium z-10">
                  Zero Cost
                </div>
                
                {/* Model label */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                  <div className="text-xs font-medium text-[#A5ACAF]">{machine.model}</div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-lg font-bold text-[#F5F5F5] mb-1 group-hover:text-[#FD5A1E] transition-colors">
                  {machine.name}
                </h3>
                
                {/* Rating stars simulation */}
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#FD5A1E]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-[#A5ACAF] ml-1">(Premium Model)</span>
                </div>
                
                {/* Short description */}
                <p className="text-[#A5ACAF] text-sm mb-4 line-clamp-2">{machine.description}</p>
                
                {/* Key features with advanced styling */}
                <div className="mb-4">
                  <h4 className="text-[#A5ACAF] text-xs uppercase tracking-wider mb-2 font-medium">Key Features</h4>
                  <ul className="space-y-1">
                    {machine.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <svg className="h-4 w-4 text-[#FD5A1E] mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#F5F5F5]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* "More features" indicator */}
                  <p className="text-xs text-[#FD5A1E] mt-1 ml-6 italic">+{machine.features.length - 3} more features</p>
                </div>
                
                {/* Dimensions spec */}
                <div className="bg-[#000000]/50 rounded p-2 text-xs mb-3">
                  <div className="flex justify-between">
                    <span className="text-[#A5ACAF]">Dimensions:</span>
                    <span className="text-[#F5F5F5] font-medium">{machine.dimensions}</span>
                  </div>
                </div>
                
                {/* Best for banner */}
                <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 p-2 rounded mb-4 text-xs">
                  <p className="text-[#F5F5F5]"><span className="font-medium">Best for:</span> {machine.best}</p>
                </div>
                
                {/* CTA Buttons */}
                <div className="mt-auto space-y-2">
                  <Link 
                    href={`/vending-machines/${machine.id}`}
                    className="block py-2 px-4 bg-[#FD5A1E] text-[#F5F5F5] rounded-lg text-center font-medium 
                              hover:bg-[#FD5A1E]/90 transition-colors"
                    aria-label={`View details of ${machine.name}`}
                  >
                    View Details
                  </Link>
                  <Link 
                    href="/contact"
                    className="block py-2 px-4 bg-[#000000] text-[#F5F5F5] border border-[#a4acac] rounded-lg text-center text-sm
                              hover:bg-[#4d4d4d] transition-colors"
                    aria-label={`Request installation of ${machine.name}`}
                  >
                    Request Installation
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Zero Cost Promise Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#FD5A1E]/20 to-[#000000] rounded-xl p-6 border border-[#FD5A1E]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              {/* Cost-free icon */}
              <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-[#FD5A1E]/20 mr-4 shrink-0">
                <svg 
                  className="w-8 h-8 text-[#FD5A1E]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2">Zero Cost Vending Solutions</h3>
                <p className="text-[#A5ACAF]">
                  All our premium machines are installed at <span className="text-[#FD5A1E] font-medium">absolutely no cost</span> to qualified locations. 
                  We handle everything from maintenance to restocking, leaving you free to enjoy the benefits.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-full shadow-lg 
                        hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors whitespace-nowrap"
              aria-label="Request your vending machine installation"
            >
              Request Your Machine
            </Link>
          </div>
        </div>
        
        {/* Key Benefits Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Benefit 1: Maintenance-Free */}
          <div className="bg-[#4d4d4d]/20 rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-colors">
            <div className="flex items-center mb-4">
              <div className="bg-[#FD5A1E]/10 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F5]">Maintenance-Free</h3>
            </div>
            <p className="text-[#A5ACAF]">
              We handle all servicing, cleaning, and repairs. Our team monitors machines remotely and proactively addresses any issues before they affect performance.
            </p>
          </div>
          
          {/* Benefit 2: Latest Technology */}
          <div className="bg-[#4d4d4d]/20 rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-colors">
            <div className="flex items-center mb-4">
              <div className="bg-[#FD5A1E]/10 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F5]">Latest Technology</h3>
            </div>
            <p className="text-[#A5ACAF]">
              Premium 21.5&quot; touchscreen interfaces and advanced payment systems including tap-to-pay make purchasing quick and convenient for everyone.
            </p>
          </div>
          
          {/* Benefit 3: Customizable Selection */}
          <div className="bg-[#4d4d4d]/20 rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-colors">
            <div className="flex items-center mb-4">
              <div className="bg-[#FD5A1E]/10 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F5]">Customizable Selection</h3>
            </div>
            <p className="text-[#A5ACAF]">
              Over 50 snack and beverage options tailored to your workplace preferences, with regular updates based on consumption patterns and feedback.
            </p>
          </div>
        </div>
        
        {/* View All Machines Link */}
        <div className="mt-12 text-center">
          <Link
            href="/vending-machines"
            className="px-6 py-3 bg-[#4d4d4d] text-[#F5F5F5] font-medium rounded-full shadow-lg 
                      hover:bg-[#4d4d4d]/80 transition-colors inline-flex items-center"
            aria-label="Explore all vending machine models available"
          >
            Explore All Machines
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KoolMoreVendingShowcase;