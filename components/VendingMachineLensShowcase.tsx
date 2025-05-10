'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ExpandableCard from './ExpandableCard';

// Types for our vending machine data
interface VendingMachine {
  id: string;
  name: string;
  model: string;
  image: string;
  features: string[];
  price: string;
  tagline: string;
}

/**
 * VendingMachineLensShowcase Component
 * 
 * Interactive showcase of vending machines with expandable cards and lens effect
 * Cards are displayed side-by-side with image on the left and details on the right
 */
function VendingMachineLensShowcase() {
  // State for active machine
  const [activeMachine, setActiveMachine] = useState<string | null>(null);
  
  // Array of premium vending machines
  const vendingMachines: VendingMachine[] = [
    {
      id: 'km-vmrt-50-b',
      name: 'Premium Refrigerated Machine',
      model: 'KM-VMRT-50-B',
      image: '/images/machines/KM-VMRT-50-B (Premium Refrigerated Machine) bg.png',
      features: [
        '21.5" HD Interactive Touchscreen',
        'Dual Temperature Zone System',
        'Credit Card & Mobile Pay',
        'Premium Metal Plate Shelving',
        'Remote Monitoring Technology',
        'Advanced Payment Processing'
      ],
      price: 'Zero Cost Installation',
      tagline: 'Our flagship solution with state-of-the-art technology featuring dual temperature zones for maximum product flexibility and an immersive touchscreen interface.'
    },
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
      price: 'Zero Cost Installation',
      tagline: 'Advanced snack vending solution with large HD touchscreen display, featuring versatile payment options and high-capacity storage for a wide variety of non-refrigerated products.'
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
      price: 'Zero Cost Installation',
      tagline: 'Versatile refrigerated vending machine designed for reliability and performance, featuring intelligent cooling technology and ample capacity for varied product selections.'
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
      price: 'Zero Cost Installation',
      tagline: 'Compact refrigerated vending solution perfect for limited spaces, offering cold beverages and refrigerated snacks with energy-efficient cooling technology.'
    }
  ];
  
  // Toggle card expansion
  const toggleCard = (id: string) => {
    setActiveMachine(prev => prev === id ? null : id);
  };

  return (
    <section className="py-16 bg-[#000000] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Premium Vending <span className="text-[#FD5A1E]">Solutions</span>
          </h2>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
            Explore our range of state-of-the-art vending machines featuring advanced technology
            and customizable options for your workplace needs.
          </p>
        </motion.div>
        
        {/* Expandable Cards Grid */}
        <div className="space-y-6">
          {vendingMachines.map((machine) => (
            <ExpandableCard
              key={machine.id}
              id={machine.id}
              title={machine.name}
              subtitle={machine.model}
              imageSrc={machine.image}
              imageAlt={`${machine.name} - ${machine.model}`}
              description={machine.tagline}
              features={machine.features}
              isActive={activeMachine === machine.id}
              onClick={() => toggleCard(machine.id)}
              detailsUrl="/vending-machines/"
              contactUrl="/contact"
            />
          ))}
        </div>
        
        {/* Zero Cost Promise Banner */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-[#FD5A1E]/20 to-[#000000] rounded-xl p-6 border border-[#FD5A1E]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
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
        </motion.div>
        
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
}

export default VendingMachineLensShowcase;