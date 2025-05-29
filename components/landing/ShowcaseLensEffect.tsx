'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
}

/**
 * LensEffectImage Component
 * Creates a magnifying lens effect on hover over an image
 */
const LensEffectImage = ({ 
  src, 
  alt, 
  className 
}: { 
  src: string; 
  alt: string; 
  className?: string;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  const imageRef = useRef<HTMLDivElement>(null);

  // Calculate lens position based on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      
      // Calculate cursor position relative to image
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      
      setPosition({ x, y });
      setCursorPosition({ x: e.clientX - left, y: e.clientY - top });
    }
  };

  return (
    <div 
      ref={imageRef}
      className={`relative w-full h-full overflow-hidden ${className || ''}`}
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Background fallback */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#000000] text-[#A5ACAF]">
        {alt}
      </div>
      
      {/* Base image */}
      <Image 
        src={src} 
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover"
      />
      
      {/* Lens effect overlay */}
      {showLens && (
        <div 
          className="absolute w-full h-full top-0 left-0 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: '200%',
            backgroundRepeat: 'no-repeat',
            opacity: 0.8,
            mixBlendMode: 'hard-light',
            filter: 'contrast(1.1)',
            clipPath: `circle(80px at ${cursorPosition.x}px ${cursorPosition.y}px)`,
          }}
        />
      )}
      
      {/* Lens circle indicator */}
      {showLens && (
        <div 
          className="absolute pointer-events-none border-2 border-[#FD5A1E]/60 rounded-full w-40 h-40 -mt-20 -ml-20 backdrop-blur-sm"
          style={{
            top: `${cursorPosition.y}px`,
            left: `${cursorPosition.x}px`,
            boxShadow: '0 0 15px rgba(253, 90, 30, 0.3)',
          }}
        />
      )}
    </div>
  );
};

/**
 * ShowcaseLensEffect Component
 * Displays premium KoolMore vending machines with interactive lens zoom effect
 */
const ShowcaseLensEffect = () => {
  const [activeSection, setActiveSection] = useState('all');
  
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
      description: 'Advanced snack vending solution with large HD touchscreen display, featuring versatile payment options and high-capacity storage for a wide variety of non-refrigerated products.'
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
      description: 'Compact refrigerated vending solution perfect for limited spaces, offering cold beverages and refrigerated snacks with energy-efficient cooling technology.'
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
      description: 'Versatile refrigerated vending machine designed for reliability and performance, featuring intelligent cooling technology and ample capacity for varied product selections.'
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
      description: 'Our flagship vending solution with state-of-the-art technology, featuring dual temperature zones for maximum product flexibility and an immersive touchscreen interface.'
    }
  ];

  // Filter the machines based on active section
  const filteredMachines = activeSection === 'all' 
    ? vendingMachines 
    : vendingMachines.filter(machine => {
        if (activeSection === 'refrigerated') {
          return machine.id.includes('vmr');
        }
        return !machine.id.includes('vmr');
      });

  return (
    <section className="bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Premium Vending <span className="text-[#FD5A1E]">Solutions</span>
          </h2>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
            Explore our range of state-of-the-art vending machines featuring advanced technology 
            and customizable options for your workplace needs.
          </p>
        </div> */}

        {/* Category Filter Buttons */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeSection === 'all'
                ? 'bg-[#FD5A1E] text-[#F5F5F5]'
                : 'bg-[#4d4d4d]/30 text-[#A5ACAF] hover:bg-[#4d4d4d]/50'
            }`}
          >
            All Machines
          </button>
          <button
            onClick={() => setActiveSection('refrigerated')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeSection === 'refrigerated'
                ? 'bg-[#FD5A1E] text-[#F5F5F5]'
                : 'bg-[#4d4d4d]/30 text-[#A5ACAF] hover:bg-[#4d4d4d]/50'
            }`}
          >
            Refrigerated
          </button>
          <button
            onClick={() => setActiveSection('non-refrigerated')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeSection === 'non-refrigerated'
                ? 'bg-[#FD5A1E] text-[#F5F5F5]'
                : 'bg-[#4d4d4d]/30 text-[#A5ACAF] hover:bg-[#4d4d4d]/50'
            }`}
          >
            Non-Refrigerated
          </button>
        </div>

        {/* Amazon-inspired product grid with lens effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMachines.map((machine) => (
            <div 
              key={machine.id}
              className="rounded-xl overflow-hidden border border-[#a4acac] 
                        hover:border-[#FD5A1E] hover:shadow-lg hover:shadow-[#FD5A1E]/10 
                        transition-all flex flex-col h-full bg-[#4d4d4d]/20"
            >
              {/* Image with lens effect container */}
              <div className="relative h-72 overflow-hidden">
                {/* Lens effect image */}
                <LensEffectImage 
                  src={machine.image} 
                  alt={`${machine.name} - ${machine.model}`} 
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
                    <svg key={i} className="w-4 h-4 text-[#FD5A1E]" fill="currentColor" viewBox="0 0 20 20">
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
                        <svg className="h-4 w-4 text-[#FD5A1E] mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  >
                    View Details
                  </Link>
                  <Link 
                    href="/contact"
                    className="block py-2 px-4 bg-[#000000] text-[#F5F5F5] border border-[#a4acac] rounded-lg text-center text-sm
                              hover:bg-[#4d4d4d] transition-colors"
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
                <svg className="w-8 h-8 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          >
            Explore All Machines
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseLensEffect;