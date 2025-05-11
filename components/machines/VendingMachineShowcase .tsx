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
 * VendingMachine
 *Showcase Component
 * Displays premium KoolMore vending machines with hover zoom effect
 */
const VendingMachineShowcase = () => {
  // State for the hovered machine to enable zoom effect
  const [hoveredMachine, setHoveredMachine] = useState<string | null>(null);
  
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

  // Function to handle mouse enter for zoom effect
  const handleMouseEnter = (id: string) => {
    setHoveredMachine(id);
  };

  // Function to handle mouse leave to remove zoom effect
  const handleMouseLeave = () => {
    setHoveredMachine(null);
  };

  return (
    <section className="py-16 bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Premium Vending <span className="text-[#FD5A1E]">Solutions</span>
          </h2>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
            Explore our range of state-of-the-art vending machines featuring advanced technology 
            and customizable options for your workplace needs.
          </p>
        </div>

        {/* Amazon-inspired product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendingMachines.map((machine) => (
            <div 
              key={machine.id}
              className="rounded-xl overflow-hidden border border-[#a4acac] 
                        hover:border-[#FD5A1E] transition-all flex flex-col h-full bg-[#4d4d4d]/20"
              onMouseEnter={() => handleMouseEnter(machine.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Image with zoom effect container */}
              <div className="relative h-72 overflow-hidden">
                {/* Fallback display if image isn't available */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#000000] text-[#A5ACAF]">
                  {machine.model}
                </div>
                
                {/* Machine image with zoom effect */}
                <div className="relative w-full h-full">
                  <Image 
                    src={machine.image} 
                    alt={`${machine.name} - ${machine.model}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className={`object-cover transition-transform duration-500 ${
                      hoveredMachine === machine.id ? 'scale-110' : 'scale-100'
                    }`}
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                
                {/* "Zero Cost" badge */}
                <div className="absolute top-3 right-3 bg-[#FD5A1E] text-[#F5F5F5] px-3 py-1 rounded-full text-sm font-medium z-10">
                  Zero Cost
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-lg font-bold text-[#F5F5F5] mb-1">{machine.name}</h3>
                <p className="text-[#FD5A1E] text-sm font-semibold mb-2">{machine.model}</p>
                
                {/* Short description */}
                <p className="text-[#A5ACAF] text-sm mb-4 line-clamp-2">{machine.description}</p>
                
                {/* Key features */}
                <div className="mb-4 flex-1">
                  <h4 className="text-[#A5ACAF] text-xs mb-2 uppercase font-medium">Key Features:</h4>
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
                </div>
                
                {/* Dimensions and best for */}
                <div className="text-sm text-[#A5ACAF] mb-4">
                  <div className="flex justify-between text-xs">
                    <span>Dimensions:</span>
                    <span className="text-[#F5F5F5]">{machine.dimensions}</span>
                  </div>
                </div>
                
                {/* Best for banner */}
                <div className="bg-[#4d4d4d]/50 p-2 rounded mb-4 text-xs">
                  <p className="text-[#F5F5F5]"><span className="font-medium">Best for:</span> {machine.best}</p>
                </div>
                
                {/* CTA Button */}
                <Link 
                  href={`/vending-machines/${machine.id}`}
                  className="py-2 px-4 bg-[#FD5A1E] text-[#F5F5F5] rounded-full text-center font-medium 
                            hover:bg-[#FD5A1E]/90 transition-colors mt-auto w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Premium Showcase Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#FD5A1E]/20 to-[#000000] rounded-xl p-6 border border-[#FD5A1E]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2">Zero Cost Vending Solutions</h3>
              <p className="text-[#A5ACAF] max-w-2xl">
                All our premium machines are installed at absolutely no cost to qualified locations. 
                We handle everything from maintenance to restocking, leaving you free to enjoy the benefits.
              </p>
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

export default VendingMachineShowcase;