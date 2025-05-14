'use client';

import React, { useState } from 'react';
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
 * Props for WorkplaceTransformSection component
 */
interface VendingMachineShowcaseSectionProps {
  /**
   * Whether to render the section heading inside this component
   * @default true
   */
  renderHeading?: boolean;
  
  /**
   * Optional className for additional styling
   */
  className?: string;
}


/**
 * VendingMachineShowcase Component
 * Displays premium vending machines with clean, spacious card layout
 * Based on the website screenshot with improved spacing and organization
 */
const VendingMachineShowcase = ({  }: VendingMachineShowcaseSectionProps) => {
  // State for active machine (hover effect)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Array of available premium vending machines
  const vendingMachines: VendingMachine[] = [
    {
      id: 'km-vmnt-50-b',
      name: 'Non-Refrigerated Snack Machine',
      model: 'KM-VMNT-50-B',
      image: '/images/vending-machines/amp-premium-non-refrigerated-vending-machine-front.jpg',
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
    // {
    //   id: 'km-vmr-30-b',
    //   name: 'Compact Refrigerated Machine',
    //   model: 'KM-VMR-30-B',
    //   image: '/images/products/placeholder.jpg',
    //   features: [
    //     'Space-Saving Refrigerated Design',
    //     'Energy-Efficient Cooling System',
    //     'Modern Touchscreen Interface',
    //     'Multiple Payment Options',
    //     'Remote Inventory Monitoring',
    //     'Bright LED Interior Lighting'
    //   ],
    //   dimensions: '30"W x 28"D x 76.7"H',
    //   best: 'Perfect for smaller spaces requiring refrigerated products',
    //   price: 'Zero Cost Installation',
    //   description: 'Compact refrigerated vending solution perfect for limited spaces, offering cold beverages and refrigerated snacks with energy-efficient cooling technology.'
    // },
    {
      id: 'km-vmr-40-b',
      name: 'Standard Refrigerated Machine',
      model: 'KM-VMR-40-B',
      image: '/images/vending-machines/amp-standard-refrigerated-vending-machine-front.jpg',
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
    // {
    //   id: 'km-vmrt-50-b',
    //   name: 'Premium Refrigerated Machine',
    //   model: 'KM-VMR-50-B',
    //   image: '/images/products/placeholder.jpg',
    //   features: [
    //     '21.5" HD Interactive Display',
    //     'Dual Temperature Zone System',
    //     'Advanced Payment Processing',
    //     'Remote Monitoring Technology',
    //     'High-Capacity Product Storage',
    //     'Premium Metal Plate Shelving'
    //   ],
    //   dimensions: '51"W x 34.3"D x 76.7"H',
    //   best: 'Ultimate solution for premium locations and diverse product needs',
    //   price: 'Zero Cost Installation',
    //   description: 'Our flagship vending solution with state-of-the-art technology, featuring dual temperature zones for maximum product flexibility and an immersive touchscreen interface.'
    // }
  ];

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header 
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Premium Vending <span className="text-[#FD5A1E]">Solutions</span>
          </h2>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
            Explore our range of state-of-the-art vending machines featuring advanced technology and customizable options for your workplace needs.
          </p>
        {/* </div>  */}

        {/* Vending Machine Cards - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {vendingMachines.map((machine, index) => (
            <div 
              key={machine.id}
              className={`flex flex-col overflow-hidden rounded-xl bg-[#0d0d0d] hover:bg-[#111111] transition-all duration-300 ${
                activeIndex === index ? 'ring-2 ring-[#FD5A1E]' : 'ring-1 ring-[#333333]'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Machine Image - Full width at top */}
              <div className="relative h-96 overflow-hidden">
                {/* Zero Cost Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-[#FD5A1E] text-white px-4 py-2 rounded-full font-medium">
                    Zero Cost
                  </span>
                </div>
                
                {/* Machine Type Badge */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs text-white ${
                    machine.id.includes('vmnt') ? 'bg-blue-600' : 'bg-green-600'
                  }`}>
                    {machine.id.includes('vmnt') ? 'Non-Refrigerated' : 'Refrigerated'}
                  </span>
                </div>
                
                {/* Machine Image */}
                <Image 
                  src={machine.image} 
                  alt={`${machine.name} - ${machine.model}`}
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, 
                        (max-width: 768px) 50vw, 
                        (max-width: 1024px) 33vw, 
                        25vw"
                  className="object-cover w-auto h-full rounded-lg mx-auto"
                />
              </div>
              
              {/* Content Section */}
              <div className="p-8 flex-1 flex flex-col">
                {/* Machine Name and Model */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2">
                    {machine.name}
                  </h3>
                  <div className="text-[#FD5A1E] font-mono">
                    {machine.model}
                  </div>
                </div>
                
                {/* Short Description */}
                <p className="text-[#A5ACAF] mb-6 text-sm line-clamp-2">
                  {machine.description}
                </p>
                
                {/* Features Section */}
                <div className="mb-6">
                  <h4 className="text-[#F5F5F5] font-bold flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E] mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Key Features
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {machine.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <svg className="h-5 w-5 text-[#FD5A1E] mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#F5F5F5] text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Specs Section - Two columns side by side */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Dimensions */}
                  <div className="bg-[#000000] p-4 rounded-lg">
                    <div className="text-[#A5ACAF] text-xs mb-1">Dimensions</div>
                    <div className="text-[#F5F5F5] font-medium">{machine.dimensions}</div>
                  </div>
                  
                  {/* Best For */}
                  <div className="bg-[#000000] p-4 rounded-lg">
                    <div className="text-[#A5ACAF] text-xs mb-1">Best For</div>
                    <div className="text-[#F5F5F5] text-sm line-clamp-2">{machine.best}</div>
                  </div>
                </div>
                
                {/* Button Row */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Link 
                    href={`/vending-machines/${machine.id}`}
                    className="py-3 px-6 bg-[#FD5A1E] text-white font-medium rounded-full text-center hover:bg-[#FD5A1E]/90 transition-colors"
                  >
                    View Details
                  </Link>
                  <Link 
                    href="/contact"
                    className="py-3 px-6 bg-transparent text-white border border-[#333333] rounded-full text-center hover:bg-[#333333] transition-colors"
                  >
                    Request Installation
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#111111] to-[#000000] rounded-xl p-8 border border-[#333333]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-[#F5F5F5] mb-4">Zero Cost Vending Solutions</h3>
              <p className="text-[#A5ACAF] max-w-2xl">
                All our premium machines are installed at absolutely no cost to qualified locations. 
                We handle everything from maintenance to restocking, leaving you free to enjoy the benefits.
              </p>
            </div>
            <Link
              href="/contact"
              className="py-3 px-6 bg-[#FD5A1E] text-white font-medium rounded-full shadow-lg 
                        hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors whitespace-nowrap"
            >
              Request Your Machine
            </Link>
          </div>
        </div>
        
        {/* Explore All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/vending-machines"
            className="inline-flex items-center py-3 px-6 bg-[#333333] text-white font-medium rounded-full 
                      hover:bg-[#444444] transition-colors"
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

export default VendingMachineShowcase;
