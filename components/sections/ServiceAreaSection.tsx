import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * ServiceAreaSection Component
 * Displays the company's service area with visual map and location information
 */
const ServiceAreaSection = () => {
  // List of service areas - you can modify this based on your actual coverage
  const serviceCities = [
    { name: 'Modesto', isPrimary: true },
    { name: 'Stockton', isPrimary: false },
    { name: 'Turlock', isPrimary: false },
    { name: 'Manteca', isPrimary: false },
    { name: 'Tracy', isPrimary: false },
    { name: 'Merced', isPrimary: false },
    { name: 'Riverbank', isPrimary: false },
    { name: 'Oakdale', isPrimary: false },
    { name: 'Ceres', isPrimary: false },
    { name: 'Patterson', isPrimary: false },
  ];
  
  // Group cities into columns for better display
  const columnCount = 2;
  const citiesPerColumn = Math.ceil(serviceCities.length / columnCount);
  const columns = [];
  
  for (let i = 0; i < columnCount; i++) {
    columns.push(serviceCities.slice(i * citiesPerColumn, (i + 1) * citiesPerColumn));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
          Our Service Area
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
          Serving Central California
        </h2>
        <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
          AMP Vending provides premium vending solutions throughout Central California. 
          Our service area includes Modesto and surrounding communities.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Service Area Map */}
        <div className="bg-[#4d4d4d]/20 rounded-xl overflow-hidden border border-[#a4acac] shadow-lg h-[400px] relative">
          {/* Static map image - replace with your actual map image */}
          <div className="absolute inset-0">
            <Image 
              src="/images/central-california-map.jpg" 
              alt="Central California service area map" 
              fill
              className="object-cover"
              priority
            />
            {/* Fallback if image doesn't load */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#000000]/70 text-[#F5F5F5]">
              Central California Service Area
            </div>
          </div>
          
          {/* Map overlay with location pin */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Modesto marker/pin */}
              <div className="absolute w-6 h-6 bg-[#FD5A1E] rounded-full -ml-3 -mt-3 animate-pulse">
                <div className="absolute inset-0 bg-[#FD5A1E] rounded-full animate-ping opacity-75"></div>
              </div>
              
              {/* Pulse effect */}
              <div className="absolute w-16 h-16 -ml-8 -mt-8 rounded-full border-2 border-[#FD5A1E] opacity-60"></div>
              <div className="absolute w-24 h-24 -ml-12 -mt-12 rounded-full border border-[#FD5A1E] opacity-40"></div>
              
              {/* City label */}
              <div className="absolute -ml-[30px] mt-4 bg-[#000000]/80 text-[#F5F5F5] px-2 py-1 rounded text-sm whitespace-nowrap">
                Modesto, CA
              </div>
            </div>
          </div>
          
          {/* Map information overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#000000] to-transparent p-4">
            <p className="text-[#F5F5F5] text-sm">
              Based in Modesto, CA, serving all of Central California
            </p>
          </div>
        </div>
        
        {/* Service Areas List */}
        <div className="bg-[#4d4d4d]/20 rounded-xl p-6 border border-[#a4acac] shadow-lg">
          <h3 className="text-xl font-bold text-[#F5F5F5] mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Areas We Serve
          </h3>
          
          <p className="text-[#A5ACAF] mb-6">
            Our zero-cost vending machines are available throughout these Central California locations:
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {columns.map((column, columnIndex) => (
              <ul key={columnIndex} className="space-y-3">
                {column.map((city) => (
                  <li key={city.name} className="flex items-center">
                    <span 
                      className={`w-2 h-2 rounded-full mr-2 ${city.isPrimary ? 'bg-[#FD5A1E]' : 'bg-[#A5ACAF]'}`}
                    ></span>
                    <span 
                      className={city.isPrimary ? 'text-[#F5F5F5] font-medium' : 'text-[#A5ACAF]'}
                    >
                      {city.name}
                    </span>
                    {city.isPrimary && (
                      <span className="ml-2 text-xs text-[#FD5A1E]">(Headquarters)</span>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#a4acac]">
            <p className="text-[#A5ACAF] text-sm mb-4">
              Don't see your location? We're continuously expanding our service area.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center text-[#FD5A1E] hover:text-[#F5F5F5] transition-colors"
            >
              Check availability in your area
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Additional Service Information */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-[#4d4d4d]/10 p-5 rounded-lg border border-[#4d4d4d] hover:border-[#FD5A1E] transition-colors">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-[#FD5A1E]/10 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F5]">Fast Response Times</h3>
          </div>
          <p className="text-[#A5ACAF] text-sm">
            We provide prompt service throughout our coverage area with technicians ready to respond quickly to maintenance needs.
          </p>
        </div>
        
        <div className="bg-[#4d4d4d]/10 p-5 rounded-lg border border-[#4d4d4d] hover:border-[#FD5A1E] transition-colors">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-[#FD5A1E]/10 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F5]">Premium Service Guarantee</h3>
          </div>
          <p className="text-[#A5ACAF] text-sm">
            All locations receive the same high-quality service and zero-cost vending machines with our maintenance guarantee.
          </p>
        </div>
        
        <div className="bg-[#4d4d4d]/10 p-5 rounded-lg border border-[#4d4d4d] hover:border-[#FD5A1E] transition-colors">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-[#FD5A1E]/10 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F5]">Consistent Pricing</h3>
          </div>
          <p className="text-[#A5ACAF] text-sm">
            We maintain consistent product pricing across all service areas with no additional fees based on location.
          </p>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="mt-12 text-center">
        <Link 
          href="/contact" 
          className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] shadow-lg"
        >
          Check Service Availability
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceAreaSection;