'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useVendingMachines from '@/hook/useVendingMachines';



const VendingSolution = () => {
  const { toggleMachineSelection } = useVendingMachines();

  // Featured machine models to showcase prominently
  const featuredMachines = [
    {
      id: 'koolmore-b',
      name: 'KoolMore KM-VMNT-50-B',
      description: 'Non-refrigerated vending machine with advanced touchscreen interface, multiple payment options, and customizable storage.',
      image: '/images/vending-machines/kellmore-non-refrigerated/kellmore-non-refrigerated-right-bg-transparent.png',
      features: [
        '21.5" HD Touchscreen Interface',
        'Credit Card, Mobile Pay, Cash & Coin Acceptance',
        'Up to 500 Items Capacity',
        'LED Interior Lighting',
        'Anti-theft Drop Sensor',
        'Dual Zone Configuration Options'
      ],
      specs: [
        { name: 'Dimensions', value: '72"H x 39"W x 33"D' },
        { name: 'Weight', value: '680 lbs' },
        { name: 'Power', value: '110-120V, 60Hz' },
        { name: 'Temperature', value: 'Non-Refrigerated' }
      ],
      price: 'Starting at $0',
      tag: 'Best Seller',
      amazonLink: 'https://www.amazon.com/KoolMore-KM-VMNT-50-B-Vending-Acceptor-Non-Refrigerated/dp/B0CWMZTPBP'
    },
    {
      id: 'koolmore-r',
      name: 'KoolMore KM-VMNT-50-R',
      description: 'Refrigerated vending machine with cooling technology, perfect for beverages and temperature-sensitive products.',
      image: '/images/vending-machines/refrigerated-model.png',
      features: [
        '21.5" HD Touchscreen Interface',
        'Credit Card, Mobile Pay, Cash & Coin Acceptance',
        'Up to 500 Items Capacity',
        'Temperature Control System',
        'Energy-Efficient Cooling',
        'LED Interior Lighting with Display'
      ],
      specs: [
        { name: 'Dimensions', value: '72"H x 39"W x 33"D' },
        { name: 'Weight', value: '720 lbs' },
        { name: 'Power', value: '110-120V, 60Hz' },
        { name: 'Temperature', value: 'Refrigerated (34°F - 41°F)' }
      ],
      price: 'Starting at $0',
      tag: 'Most Popular',
      amazonLink: 'https://www.amazon.com/dp/B0CVYX8FBW'
    }
  ];

  // Additional machine options to showcase in a condensed format
  const additionalMachines = [
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
      image: '/images/Vending1.jpg',
      category: 'snack',
      dimensions: '72"H x 29.5"W x 36"D',
      capacity: 'Up to 450 items',
      paymentOptions: ['Credit Card', 'Cash', 'Mobile Payment']
    },
    {
      id: 'snack-3573',
      name: 'AMS 39 Snack Machine',
      description: 'Larger capacity snack machine with expanded selections and dual spiral delivery system.',
      features: [
        'Dual spiral delivery system for reliable vending',
        'Adjustable shelving configurations',
        'Enhanced delivery bin for easy product retrieval',
        'Touch screen interface option available',
        'Cashless payment compatible'
      ],
      image: '/images/Vending2.jpg',
      category: 'snack',
      dimensions: '72"H x 35.5"W x 36"D',
      capacity: 'Up to 630 items',
      paymentOptions: ['Credit Card', 'Cash', 'Mobile Payment'],
      tag: 'Popular Choice'
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
      image: '/images/Vending3.jpg',
      category: 'beverage',
      dimensions: '72"H x 37"W x 32"D',
      capacity: 'Up to 650 bottles/cans',
      paymentOptions: ['Credit Card', 'Cash']
    },
    {
      id: 'combo-3674',
      name: 'AMS Combi 39 Machine',
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
      capacity: 'Up to 400 snacks and 180 beverages',
      paymentOptions: ['Credit Card', 'Cash', 'Mobile Payment', 'Employee Badge']

    }
  ]

  // Machine premium features data
  const premiumFeatures = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
        </svg>
      ),
      title: 'Versatile Machine Options',
      description: 'Both refrigerated and non-refrigerated machines available, perfect for providing a wide array of snacks, drinks and treats.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
          <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Advanced Payment System',
      description: 'Support for credit cards, mobile payments via Samsung Pay and Apple Pay, cash, and coins for maximum flexibility.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
          <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Interactive Touchscreen',
      description: '21.5" HD display with intuitive interface for easy browsing and product selection, making the purchasing process quick and effortless.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Quality and Security',
      description: 'Bright LED interior lighting, anti-fog glass, and anti-theft drop sensor ensure product quality, visibility, and security at all times.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
          <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
          <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
        </svg>
      ),
      title: 'Dual Zone Technology',
      description: 'Flexible configuration allows for a variety of items, including refrigerated beverages and non-refrigerated snacks in a single machine.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.3c0 1.149-.385 2.253-1.066 3.122-.553.706-1.18 1.369-1.834 1.97l-2.586 2.586a1.5 1.5 0 01-2.134 0L5.744 16.5a1.5 1.5 0 010-2.121l2.586-2.586a1.5 1.5 0 012.121 0l2.586 2.586a1.5 1.5 0 010 2.121l-2.586 2.586c.94-.94 2.19-1.45 3.469-1.45.424 0 .843.037 1.25.109.511.091.994-.32.994-.842v-2.302c0-.522-.482-.933-.994-.842a5.038 5.038 0 00-1.25.109c-1.28 0-2.53-.51-3.469-1.45L5.744 7.5a1.5 1.5 0 010-2.121l2.586-2.586a1.5 1.5 0 012.121 0z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Customizable Selection',
      description: 'Over 50 snack and drink options tailored to your workplace preferences to maximize employee satisfaction and engagement.'
    }
  ];

  return (
    <section className="py-16 bg-[#000000]" id="vending-solution">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
            Premium Vending Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Our Vending Machines
          </h2>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
            State-of-the-art vending machines that revolutionize the refreshment experience for your workplace.
          </p>
        </div>

        {/* Featured Machines Showcase */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-[#F5F5F5]">Featured Models</h3>
            <Link
              href="/vending-machines"
              className="text-[#FD5A1E] hover:text-[#FD5A1E]/80 font-medium flex items-center"
            >
              All Models
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredMachines.map((machine) => (
              <div
                key={machine.id}
                className="bg-[#4d4d4d] border border-[#A5ACAF] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className="h-96 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent z-0"></div>
                  <Image
                    src={machine.image || "/images/vending-machines/front-Bg-Transparent.png"}
                    alt={machine.name}
                    fill
                    className="object-contain z-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  <div className="absolute -bottom-6 left-0 right-0 p-4 z-20">
                    <div className="bg-[#000000]/80 p-3 rounded-lg">
                      <h3 className="text-2xl font-bold text-[#F5F5F5]">{machine.name}</h3>
                      <p className="text-[#A5ACAF] text-sm pt-2">{machine.description}</p>

                    </div>
                  </div>

                  {/* Temperature badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${machine.id === 'koolmore-r'
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#FD5A1E] text-white'
                      }`}>
                      {machine.id === 'koolmore-r' ? 'Refrigerated' : 'Non-Refrigerated'}
                    </span>
                  </div>

                  {/* Price tag */}
                  <div className="absolute top-4 left-4 transform -rotate-12 bg-[#FD5A1E] text-[#F5F5F5] font-bold px-4 py-2 rounded-full shadow-lg z-20">
                    <div className="text-xs">Cost</div>
                    <div className="text-xl">$0</div>
                  </div>
                </div>

                {/* Machine details */}
                <div className="p-6 bg-black
                ">


                  <div className="grid md:grid-cols-1 gap-6 mb-6">
                    {/* Specifications
                    <div>
                      <h4 className="text-lg font-medium text-[#F5F5F5] mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FD5A1E]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        Specifications
                      </h4>
                      <ul className="space-y-2">
                        {machine.specs.map((spec, idx) => (
                          <li key={idx} className="text-sm flex justify-between">
                            <span className="text-[#A5ACAF]">{spec.name}:</span>
                            <span className="font-medium text-[#F5F5F5]">{spec.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div> */}

                    {/* Key Features */}
                    <div className='p-2 border border-[#A5ACAF] rounded-xl'>
                      <h4 className="text-lg font-medium text-[#F5F5F5] mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FD5A1E]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {machine.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start text-[#A5ACAF] text-sm">
                            <svg className="h-4 w-4 text-[#FD5A1E] mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                        {machine.features.length > 4 && (
                          <li className="text-[#FD5A1E] text-sm italic">+ {machine.features.length - 4} more features</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/vending-machines/${machine.id}`}
                      className="bg-[#FD5A1E] hover:bg-[#FD5A1E]/90 text-[#F5F5F5] px-4 py-2 rounded-lg font-medium transition-colors shadow-md flex-grow text-center"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => toggleMachineSelection(machine.id)}
                      className="bg-[#000000] border border-[#A5ACAF] hover:bg-[#4d4d4d] text-[#F5F5F5] px-4 py-2 rounded-lg font-medium transition-colors flex-grow"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Machine Options */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-[#F5F5F5]">Additional Options</h3>
            <Link
              href="/vending-machines"
              className="text-[#FD5A1E] hover:text-[#FD5A1E]/80 font-medium flex items-center"
            >
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {additionalMachines.map((machine) => (
              <Link
                key={machine.id}
                href={`/vending-machines/${machine.id}`}
                className="bg-[#4d4d4d] border border-[#A5ACAF] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all group"
              >
                {/* Machine image */}
                <div className="h-48 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent z-10"></div>
                  <Image
                    src={machine.image || "/api/placeholder/400/300"}
                    alt={machine.name}
                    fill
                    className="object-cover object-center z-0"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  {/* Machine type badge */}
                  <div className="absolute top-2 left-2 z-20">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#000000]/70 text-[#F5F5F5] border border-[#A5ACAF]/50">
                      {machine.category}
                    </span>
                  </div>

                  {/* Tag */}
                  <div className="absolute top-2 right-2 z-20 bg-[#FD5A1E]/80 text-[#F5F5F5] text-xs px-2 py-0.5 rounded-full">
                    {machine.tag}
                  </div>
                </div>

                {/* Machine details */}
                <div className="p-4">
                  <h4 className="text-[#F5F5F5] font-medium mb-1 group-hover:text-[#FD5A1E] transition-colors">{machine.name}</h4>
                  <p className="text-[#A5ACAF] text-sm line-clamp-2">{machine.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button - Mobile */}
          <div className="mt-6 text-center md:hidden">
            <Link
              href="/vending-machines"
              className="inline-block bg-[#000000] border border-[#A5ACAF] hover:bg-[#4d4d4d] text-[#F5F5F5] px-6 py-2 rounded-lg font-medium transition-colors"
            >
              View All Models
            </Link>
          </div>
        </div>

        {/* Premium Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <h3 className="md:col-span-2 lg:col-span-3 text-2xl font-bold text-[#F5F5F5] mb-4">
            Premium Features
          </h3>

          {premiumFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-[#4d4d4d] border border-[#A5ACAF] p-6 rounded-lg hover:shadow-lg transition-all"
            >
              <div className="text-[#FD5A1E] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">{feature.title}</h3>
              <p className="text-[#A5ACAF]">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Payment Options Card */}
        <div className="rounded-xl shadow-xl overflow-hidden border border-[#A5ACAF] mb-16">
          <div className="bg-[#000000] p-6 border-b border-[#A5ACAF]">
            <h3 className="text-2xl font-bold text-[#F5F5F5]">Comprehensive Payment Options</h3>
            <p className="text-[#A5ACAF] mt-2">Our machines support all major payment methods for maximum convenience</p>
          </div>

          <div className="bg-[#4d4d4d] p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { name: 'Credit/Debit', icon: '💳', description: 'Insert, tap, or swipe' },
                { name: 'Apple Pay', icon: '🍎', description: 'Quick contactless payment' },
                { name: 'Samsung Pay', icon: '📱', description: 'NFC-enabled transactions' },
                { name: 'Cash & Coins', icon: '💵', description: 'Traditional payment options' },
              ].map((option, index) => (
                <div key={index} className="p-4 border border-[#A5ACAF] rounded-lg bg-[#000000] hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <div className="font-medium text-[#F5F5F5]">{option.name}</div>
                  <p className="text-sm text-[#A5ACAF] mt-1">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="bg-gradient-to-r from-[#000000] to-[#4d4d4d] rounded-xl text-[#F5F5F5] overflow-hidden border border-[#A5ACAF]">
          <div className="md:flex">
            <div className="md:w-2/3 p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-4">Ready to enhance your workplace?</h3>
              <p className="text-[#A5ACAF] mb-6">
                Our vending solutions can be installed with zero upfront costs and generate passive income for your business through our 5% revenue-sharing model.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/contact"
                  className="bg-[#FD5A1E] hover:bg-[#FD5A1E]/90 text-[#F5F5F5] py-3 px-8 rounded-lg font-medium transition-colors shadow-md"
                >
                  Get Started Today
                </Link>
                <Link
                  href="/proposal"
                  className="bg-transparent hover:bg-[#4d4d4d] border border-[#A5ACAF] text-[#F5F5F5] py-3 px-8 rounded-lg font-medium transition-colors"
                >
                  View Proposal
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 bg-[#000000] p-6 md:p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 text-[#FD5A1E]">5%</div>
                <div className="text-xl mb-1 text-[#F5F5F5]">Revenue Share</div>
                <div className="text-sm text-[#A5ACAF]">Generate passive income</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default VendingSolution;