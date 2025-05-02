'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LensEffect from './LensEffect';


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
 * Interactive showcase of vending machines with lens effect
 * Allows users to explore machine details with an engaging zoom effect
 */
function VendingMachineLensShowcase() {
  // State for active machine
  const [activeMachine, setActiveMachine] = useState<string>('');
  // State to track if any machine has been hovered
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  
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
        'Premium Metal Plate Shelving'
      ],
      price: 'Zero Cost Installation',
      tagline: 'Our flagship solution with state-of-the-art technology'
    },
    {
      id: 'km-vmnt-50-b',
      name: 'Non-Refrigerated Snack Machine',
      model: 'KM-VMNT-50-B',
      image: '/images/machines/KM-VMNT-50-B (Non-Refrigerated Snack Machine) bg.png',
      features: [
        'Premium 22" Touchscreen Display',
        'Advanced Payment Processing',
        'High-Capacity Snack Storage',
        'Remote Monitoring Technology'
      ],
      price: 'Zero Cost Installation',
      tagline: 'Advanced snack vending with premium display'
    },
    {
      id: 'km-vmr-40-b',
      name: 'Standard Refrigerated Machine',
      model: 'KM-VMR-40-B',
      image: '/images/machines/KM-VMR-40-B (Standard Refrigerated Machine) bg.png',
      features: [
        'Advanced Refrigeration System',
        'Versatile Payment Options',
        'Smart Inventory Management',
        'Energy-Efficient Operation'
      ],
      price: 'Zero Cost Installation',
      tagline: 'Reliable performance for all environments'
    }
  ];
  
  // Set default active machine on component mount
  useEffect(() => {
    setActiveMachine(vendingMachines[0].id);
  }, []);
  
  // Get the currently active machine object
  const currentMachine = vendingMachines.find(m => m.id === activeMachine) || vendingMachines[0];

  return (
    <section className="py-16 bg-[#000000] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Advanced Vending <span className="text-[#FD5A1E]">Technology</span>
          </h2>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
            Explore our premium machines with zero upfront costs and maintenance-free operation
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Lens Effect Display */}
          <div className="lg:w-1/2 w-full">
            <div className={`transition-all duration-500 ${hasInteracted ? 'opacity-100' : 'opacity-90'}`}>
              <LensEffect
                imageSrc={currentMachine.image}
                imageAlt={`${currentMachine.name} - ${currentMachine.model}`}
                lensSize={180}
                zoomLevel={2.5}
                className="border-2 border-[#4d4d4d] hover:border-[#FD5A1E] transition-colors"
                lensBorderColor="#FD5A1E"
                onHover={() => setHasInteracted(true)}
              />
              
              {/* Machine Selection Tabs */}
              <div className="flex overflow-x-auto space-x-2 mt-4 pb-2">
                {vendingMachines.map((machine) => (
                  <button
                    key={machine.id}
                    className={`px-3 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${
                      machine.id === activeMachine
                        ? 'bg-[#FD5A1E] text-[#F5F5F5]'
                        : 'bg-[#4d4d4d]/50 text-[#A5ACAF] hover:bg-[#4d4d4d]'
                    }`}
                    onClick={() => {
                      setActiveMachine(machine.id);
                      setHasInteracted(true);
                    }}
                    aria-pressed={machine.id === activeMachine}
                    aria-label={`View ${machine.name}`}
                  >
                    {machine.model}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Machine Details */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-[#4d4d4d]/20 rounded-xl p-6 border border-[#a4acac]">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-[#F5F5F5]">{currentMachine.name}</h3>
                <p className="text-[#FD5A1E] font-medium">{currentMachine.model}</p>
              </div>
              
              <p className="text-[#A5ACAF] mb-6">{currentMachine.tagline}</p>
              
              {/* Zero Cost Banner */}
              <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E] rounded-lg p-4 mb-6 flex items-center">
                <div className="bg-[#FD5A1E]/20 p-2 rounded-full mr-3">
                  <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-[#F5F5F5]">Zero Cost Installation</h4>
                  <p className="text-sm text-[#A5ACAF]">No upfront costs or monthly fees</p>
                </div>
              </div>
              
              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-[#F5F5F5] mb-3">Premium Features</h4>
                <ul className="space-y-2">
                  {currentMachine.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#F5F5F5]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Maintenance-Free Banner */}
              <div className="bg-[#4d4d4d]/50 rounded-lg p-4 mb-6 flex items-center">
                <div className="bg-[#4d4d4d] p-2 rounded-full mr-3">
                  <svg className="w-6 h-6 text-[#F5F5F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-[#F5F5F5]">Maintenance-Free Operation</h4>
                  <p className="text-sm text-[#A5ACAF]">We handle all servicing and restocking</p>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/vending-machines/${currentMachine.id}`}
                  className="px-5 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-lg text-center font-medium hover:bg-[#FD5A1E]/90 transition-colors flex-1"
                >
                  View Details
                </Link>
                <Link
                  href="/contact"
                  className="px-5 py-3 border border-[#a4acac] text-[#F5F5F5] rounded-lg text-center font-medium hover:border-[#FD5A1E] hover:text-[#FD5A1E] transition-colors flex-1"
                >
                  Request Installation
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* View All Machines Button */}
        <div className="mt-12 text-center">
          <Link
            href="/vending-machines"
            className="inline-flex items-center px-6 py-3 bg-[#4d4d4d] text-[#F5F5F5] rounded-full font-medium hover:bg-[#4d4d4d]/80 transition-colors"
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

export default VendingMachineLensShowcase;