'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllVendingMachines, getVendingMachinesByCategory, MachineData } from '@/lib/data/vendingMachineData';
import { Loading } from '@/components/ui/Loading';

/**
 * VendingMachinesPage Component
 * 
 * Displays all available vending machines with filtering options
 */
const VendingMachinesPage = () => {
  // State for machines and active filter
  const [machines, setMachines] = useState<MachineData[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  // Load machines on component mount
  useEffect(() => {
    setIsLoading(true);
    
    // Get machines based on active filter
    let filteredMachines: MachineData[];
    
    if (activeFilter === 'all') {
      filteredMachines = getAllVendingMachines();
    } else {
      filteredMachines = getVendingMachinesByCategory(
        activeFilter as 'refrigerated' | 'non-refrigerated'
      );
    }
    
    setMachines(filteredMachines);
    setIsLoading(false);
  }, [activeFilter]);
  
  // Show loading state
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-[#000000] to-[#000000]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Premium Vending <span className="text-[#FD5A1E]">Machines</span>
          </h1>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
            Explore our range of state-of-the-art vending machines with zero cost installation 
            and maintenance-free operation for your workplace.
          </p>
          
          {/* Filter Tabs */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#FD5A1E] text-[#F5F5F5]'
                  : 'bg-[#4d4d4d]/30 text-[#A5ACAF] hover:bg-[#4d4d4d]/50'
              }`}
            >
              All Machines
            </button>
            <button
              onClick={() => setActiveFilter('refrigerated')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'refrigerated'
                  ? 'bg-[#FD5A1E] text-[#F5F5F5]'
                  : 'bg-[#4d4d4d]/30 text-[#A5ACAF] hover:bg-[#4d4d4d]/50'
              }`}
            >
              Refrigerated
            </button>
            <button
              onClick={() => setActiveFilter('non-refrigerated')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'non-refrigerated'
                  ? 'bg-[#FD5A1E] text-[#F5F5F5]'
                  : 'bg-[#4d4d4d]/30 text-[#A5ACAF] hover:bg-[#4d4d4d]/50'
              }`}
            >
              Non-Refrigerated
            </button>
          </div>
        </div>
      </section>
      
      {/* Machines Grid */}
      <section className="py-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {machines.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#A5ACAF] text-lg">No machines found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {machines.map((machine) => (
                <Link
                  key={machine.id}
                  href={`/vending-machines/${machine.id}`}
                  className="group bg-[#4d4d4d]/20 rounded-xl overflow-hidden border border-[#a4acac] hover:border-[#FD5A1E] transition-all flex flex-col transform hover:scale-[1.02]"
                >
                  {/* Machine Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={machine.images[0].src} 
                      alt={machine.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Zero Cost Badge */}
                    <div className="absolute top-4 right-4 bg-[#FD5A1E] text-[#F5F5F5] px-3 py-1 rounded-full text-xs font-medium">
                      Zero Cost
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="w-full p-4">
                        <span className="inline-block text-[#F5F5F5] font-medium px-4 py-2 bg-[#FD5A1E] rounded-full text-sm">
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Machine Info */}
                  <div className="p-5 flex-grow flex flex-col">
                    <h2 className="text-xl font-bold text-[#F5F5F5] group-hover:text-[#FD5A1E] transition-colors">
                      {machine.name}
                    </h2>
                    <p className="text-[#FD5A1E] text-sm mb-2">{machine.model}</p>
                    <p className="text-[#A5ACAF] text-sm line-clamp-2 mb-4">
                      {machine.shortDescription}
                    </p>
                    
                    {/* Key Features */}
                    <div className="mt-auto">
                      <h3 className="text-sm font-medium text-[#F5F5F5] mb-2">Key Features:</h3>
                      <ul className="space-y-1">
                        {machine.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <svg className="h-4 w-4 text-[#FD5A1E] mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[#A5ACAF]">{feature.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-[#000000] to-[#4d4d4d]/30 border-t border-[#4d4d4d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#000000] p-8 rounded-xl border border-[#FD5A1E] shadow-xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-3/4 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2">
                  Ready to Enhance Your Workplace?
                </h2>
                <p className="text-[#A5ACAF]">
                  Contact us today to discuss which vending machine is best suited for your location.
                  Our team will provide a free consultation and site assessment.
                </p>
              </div>
              <div className="md:w-1/4 flex justify-center">
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full font-medium hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendingMachinesPage;