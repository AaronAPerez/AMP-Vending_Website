'use client';

import Image from 'next/image';
import React, { JSX, useState } from 'react';

/* Interface for vending machine option data */
interface VendingMachineOption {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  category: 'snack' | 'beverage' | 'combo' | 'food';
  dimensions?: string;
  capacity?: string;
}


const VendingMachineOptions = (): JSX.Element => {
  // Vending machine data from vending.com
  const vendingMachines: VendingMachineOption[] = [
    {
      id: 'snack-3566',
      name: 'AMS 35 Snack Machine',
      description: 'A versatile snack vending machine with adjustable shelving to accommodate various product sizes.',
      features: [
        'LED illumination for better product visibility',
        'iVend® guaranteed product delivery sensor system',
        'Up to 35 selections with adjustable shelving',
        'Energy-saving LED lighting',
        'ADA compliant'
      ],
      image: '/images/vending-machines/kellmore-non-refrigerated/kellmore-non-refrigerated-right-bg-transparent.png',
      category: 'snack',
      dimensions: '72"H x 29.5"W x 36"D',
      capacity: 'Up to 450 items'
    },
    {
      id: 'snack-3573',
      name: 'AMS 39 Snack Machine',
      description: 'Larger capacity snack machine with expanded selections and dual spiral delivery system.',
      features: [
        'Dual spiral delivery system for reliable vending',
        'Adjustable shelving configurations',
        'Enhanced delievery bin for easy product retrieval',
        'Touch screen interface option available',
        'Cashless payment compatible'
      ],
      image: '/images/vending-machines/refrigerated-model.png',
      category: 'snack',
      dimensions: '72"H x 35.5"W x 36"D',
      capacity: 'Up to 630 items'
    },
    {
      id: 'beverage-3612',
      name: 'Royal 650 Beverage Machine',
      description: 'High capacity cold beverage vending machine with multiple selections.',
      features: [
        'Can accommodate various bottle and can sizes',
        'Adjustable temperature control',
        'Live product display',
        'Energy-saving features with sleep mode',
        'Lighted product display with customizable branding'
      ],
      image: '/images/Vending1.jpg',
      category: 'beverage',
      dimensions: '72"H x 37"W x 32"D',
      capacity: 'Up to 650 bottles/cans'
    },
    {
      id: 'combo-3674',
      name: 'AMS Combi 39 Machin',
      description: 'Combination snack and beverage machine offering maximum variety in a single footprint.',
      features: [
        'Snack and beverage options in one machine',
        'Customizable planograms for product variety',
        'Separate temperature zones',
        'Advanced touchscreen interface option',
        'Multiple payment system compatibility'
      ],
      image: '/images/Vending2.jpg',
      category: 'combo',
      dimensions: '72"H x 39"W x 36"D', 
      capacity: 'Up to 400 snacks and 180 beverages'
    },
    {
      id: 'food-3695',
      name: 'AMS Fresh Food Machine',
      description: 'Temperature-controlled vending machine for fresh food items.',
      features: [
        'Health lock feature for food safety',
        'Maintains proper food storage temperature',
        'Flexible shelf configurations',
        'NAMA certified for perishable food',
        'Refrigeration monitoring system'
      ],
      image: '/images/Vending3.jpg',
      category: 'food',
      dimensions: '72"H x 35"W x 36"D',
      capacity: 'Up to 400 items'
    },
    {
      id: 'beverage-3645',
      name: 'Vendo Vue Beverage Machine',
      description: 'Modern glass-front beverage vendor with enhanced merchandising capabilities.',
      features: [
        'Glass front for maximum product visibility',
        'Energy efficient LED lighting',
        'First-in, first-out loading system',
        'Climate-friendly refrigeration system',
        'High capacity with space-saving design'
      ],
      image: '/images/Vending3.jpg',
      category: 'beverage',
      dimensions: '72"H x 35"W x 34"D',
      capacity: 'Up to 500 bottles/cans'
    },
    {
      id: 'combo-3680',
      name: 'Market Express Combo',
      description: 'Premium all-in-one vending solution with touchscreen interface and multiple product categories.',
      features: [
        '21.5" HD touchscreen interface',
        'Multiple temperature zones',
        'Supports snacks, beverages, and fresh food',
        'Real-time inventory monitoring capability',
        'Enhanced merchandising with digital product displays'
      ],
      image: '/images/Vending3.jpg',
      category: 'combo',
      dimensions: '72"H x 41"W x 38"D',
      capacity: 'Customizable configuration for up to 700 total items'
    }
  ];

  // Group machines by category
  const categories = {
    snack: vendingMachines.filter(machine => machine.category === 'snack'),
    beverage: vendingMachines.filter(machine => machine.category === 'beverage'),
    combo: vendingMachines.filter(machine => machine.category === 'combo'),
    food: vendingMachines.filter(machine => machine.category === 'food')
  };

  // State for selected machine and active category
  const [selectedMachine, setSelectedMachine] = useState<VendingMachineOption | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('snack');

  return (
    <section className="py-16 bg-[#000000]" id="vending-machine-options">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Vending Machine Options
          </h2>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
            Explore our range of high-quality vending machines to find the perfect solution for your workplace.
          </p>
        </div>

        <div>
          {/* Custom tab navigation */}
          <div className="flex p-1 space-x-1 bg-[#4d4d4d] rounded-xl mb-8">
            {Object.keys(categories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`w-full py-3 text-sm font-medium leading-5 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-[#FD5A1E] ring-[#FD5A1E] ring-opacity-60 ${
                  activeCategory === category
                    ? 'bg-[#000000] shadow text-[#FD5A1E]'
                    : 'text-[#F5F5F5] hover:bg-[#000000]/50 hover:text-[#FD5A1E]'
                }`}
                aria-pressed={activeCategory === category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)} Machines
              </button>
            ))}
          </div>
          
          {/* Tab panels */}
          <div>
            {Object.entries(categories).map(([category, machines]) => (
              <div
                key={category}
                className={`bg-[#4d4d4d] p-3 rounded-xl focus:outline-none ${activeCategory === category ? 'block' : 'hidden'}`}
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {machines.map((machine) => (
                    <div
                      key={machine.id}
                      className={`bg-[#000000] p-4 rounded-lg border border-[#a4acac] transition-all hover:shadow-lg cursor-pointer ${
                        selectedMachine?.id === machine.id ? 'ring-2 ring-[#FD5A1E]' : ''
                      }`}
                      onClick={() => setSelectedMachine(machine)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedMachine(machine);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={selectedMachine?.id === machine.id}
                      aria-label={`Select ${machine.name}`}
                    >
                      <div className="aspect-w-4 aspect-h-3 mb-4 bg-[#4d4d4d] rounded-md overflow-hidden">
                        {machine.image && machine.image.startsWith('http') ? (
                          <Image
                            src={machine.image} 
                            alt={machine.name}
                            width={500}
                            height={500}
                            className="w-full h-full object-contain" 
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            {/* Placeholder for machines without images */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-[#A5ACAF]">
                              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">{machine.name}</h3>
                      <p className="text-[#A5ACAF] text-sm mb-3">{machine.description}</p>
                      
                      {/* Machine details */}
                      <div className="mt-auto">
                        <div className="text-xs text-[#a4a4ac] mt-2">
                          <span className="block">{machine.dimensions}</span>
                          <span className="block">{machine.capacity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected machine details */}
        {selectedMachine && (
          <div className="mt-12 bg-[#4d4d4d] p-6 rounded-xl border border-[#a4acac]">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-[#F5F5F5] mb-4">{selectedMachine.name}</h3>
                <p className="text-[#A5ACAF] mb-6">{selectedMachine.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#F5F5F5] mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {selectedMachine.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#FD5A1E] mr-2">✓</span>
                        <span className="text-[#F5F5F5]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#000000] p-3 rounded-lg border border-[#a4acac]">
                    <h4 className="text-sm font-semibold text-[#F5F5F5] mb-1">Dimensions</h4>
                    <p className="text-[#A5ACAF]">{selectedMachine.dimensions}</p>
                  </div>
                  <div className="bg-[#000000] p-3 rounded-lg border border-[#a4acac]">
                    <h4 className="text-sm font-semibold text-[#F5F5F5] mb-1">Capacity</h4>
                    <p className="text-[#A5ACAF]">{selectedMachine.capacity}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#000000] p-4 rounded-lg border border-[#a4acac]">
                <div className="aspect-w-4 aspect-h-3 bg-[#4d4d4d] rounded-md overflow-hidden">
                  {selectedMachine.image && selectedMachine.image.startsWith('http') ? (
                    <Image
                      src={selectedMachine.image} 
                      alt={selectedMachine.name}
                      className="w-full h-full object-contain" 
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      {/* Placeholder for machines without images */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-[#A5ACAF]">
                        <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-[#F5F5F5] mb-3">Perfect For:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMachine.category === 'snack' && (
                      <>
                        <span className="bg-[#4d4d4d] text-[#F5F5F5] text-xs font-semibold px-2.5 py-0.5 rounded-full">Break Rooms</span>
                        <span className="bg-[#4d4d4d] text-[#F5F5F5] text-xs font-semibold px-2.5 py-0.5 rounded-full">Waiting Areas</span>
                        <span className="bg-[#4d4d4d] text-[#F5F5F5] text-xs font-semibold px-2.5 py-0.5 rounded-full">Employee Lounges</span>
                      </>
                    )}
                    {selectedMachine.category === 'beverage' && (
                      <>
                        <span className="bg-[#4d4d4d] text-[#F5F5F5] text-xs font-semibold px-2.5 py-0.5 rounded-full">Cafeterias</span>
                        <span className="bg-[#4d4d4d] text-[#F5F5F5] text-xs font-semibold px-2.5 py-0.5 rounded-full">Break Rooms</span>
                        <span className="bg-[#4d4d4d] text-[#F5F5F5] text-xs font-semibold px-2.5 py-0.5 rounded-full">High Traffic Areas</span>
                      </>
                    )}
                    {selectedMachine.category === 'combo' && (
                      <>
                        <span className="bg-[#4d4d4d] text-[#F5F5F5] text-xs font-semibold px-2.5 py-0.5 rounded-full">Driver Lounges</span>
                        <span className="bg-[#4d4d4d] text-[#F5F5F5] text-xs font-semibold px-2.5 py-0.5 rounded-full">Limited Space Areas</span>
                        <span className="bg-[#4d4d4d] text-[#F5F5F5] text-xs font-semibold px-2.5 py-0.5 rounded-full">Multi-Purpose Rooms</span>
                      </>
                    )}
                    {selectedMachine.category === 'food' && (
                      <>
                        <span className="bg-[#4d4d4d] text-[#F5F5F5] text-xs font-semibold px-2.5 py-0.5 rounded-full">Cafeterias</span>
                        <span className="bg-[#4d4d4d] text-[#F5F5F5] text-xs font-semibold px-2.5 py-0.5 rounded-full">Lunch Rooms</span>
                        <span className="bg-[#4d4d4d] text-[#F5F5F5] text-xs font-semibold px-2.5 py-0.5 rounded-full">24/7 Facilities</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#F5F5F5] bg-[#FD5A1E] hover:bg-[#000000] hover:text-[#FD5A1E] hover:border-[#FD5A1E] border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD5A1E]"
                onClick={() => window.location.href = '/contact'}
                aria-label="Request this vending machine model"
              >
                Request This Machine
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-12 bg-[#4d4d4d] p-6 rounded-lg border border-[#a4acac]">
          <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">Custom Options Available</h3>
          <p className="text-[#A5ACAF]">
            All our vending machines can be customized with additional features to meet your specific needs:
          </p>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="bg-[#000000] p-4 rounded-lg border border-[#a4acac]">
              <h4 className="font-semibold text-[#F5F5F5] mb-2">Payment Systems</h4>
              <ul className="text-sm text-[#A5ACAF] space-y-1">
                <li>• Credit/Debit Card Readers</li>
                <li>• Mobile Payment Integration</li>
                <li>• Cashless & Traditional Cash Options</li>
                <li>• Employee ID/Badge Integration</li>
              </ul>
            </div>
            <div className="bg-[#000000] p-4 rounded-lg border border-[#a4acac]">
              <h4 className="font-semibold text-[#F5F5F5] mb-2">User Interface</h4>
              <ul className="text-sm text-[#A5ACAF] space-y-1">
                <li>• Touchscreen Displays</li>
                <li>• Customizable Graphics</li>
                <li>• Promotional Messaging</li>
                <li>• Multi-language Support</li>
              </ul>
            </div>
            <div className="bg-[#000000] p-4 rounded-lg border border-[#a4acac]">
              <h4 className="font-semibold text-[#F5F5F5] mb-2">Advanced Features</h4>
              <ul className="text-sm text-[#A5ACAF] space-y-1">
                <li>• Remote Monitoring</li>
                <li>• Usage Reports & Analytics</li>
                <li>• Temperature Control Systems</li>
                <li>• Energy Efficiency Options</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendingMachineOptions;