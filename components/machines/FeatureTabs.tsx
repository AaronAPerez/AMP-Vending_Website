'use client';

import { useState } from "react";

// Feature tabs component for showcasing different aspects of the machine
const FeatureTabs = () => {
  const [activeTab, setActiveTab] = useState('specs');
  
  const tabs = [
    { id: 'specs', label: 'Specifications' },
    { id: 'payment', label: 'Payment Options' },
    { id: 'products', label: 'Available Products' },
    { id: 'tech', label: 'Technology' },
  ];
  
  return (
    <div className="mt-8">
      {/* Tab navigation */}
      <div className="flex flex-wrap border-b border-[#a4acac]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-4 font-medium text-sm focus:outline-none transition-colors
              ${activeTab === tab.id 
                ? "border-b-2 border-[#FD5A1E] text-[#FD5A1E]" 
                : "text-[#A5ACAF] hover:text-white"
              }`}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab content */}
      <div className="py-6">
        {/* Specifications Tab */}
        {activeTab === 'specs' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Machine Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#4d4d4d]/50 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">Dimensions</h4>
                <ul className="space-y-2 text-[#A5ACAF]">
                  <li className="flex justify-between">
                    <span>Height:</span>
                    <span>72 inches (183 cm)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Width:</span>
                    <span>41 inches (104 cm)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Depth:</span>
                    <span>35 inches (89 cm)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Weight:</span>
                    <span>800 lbs (363 kg)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#4d4d4d]/50 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">Capacity</h4>
                <ul className="space-y-2 text-[#A5ACAF]">
                  <li className="flex justify-between">
                    <span>Product Selections:</span>
                    <span>Up to 50+ items</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Snack Capacity:</span>
                    <span>400+ items</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Beverage Capacity:</span>
                    <span>180+ bottles/cans</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#4d4d4d]/50 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">Power Requirements</h4>
                <ul className="space-y-2 text-[#A5ACAF]">
                  <li className="flex justify-between">
                    <span>Voltage:</span>
                    <span>120V AC</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Frequency:</span>
                    <span>60 Hz</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Average Consumption:</span>
                    <span>8.5 kWh/day</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#4d4d4d]/50 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">Features</h4>
                <ul className="space-y-2 text-[#A5ACAF]">
                  <li className="flex justify-between">
                    <span>Display:</span>
                    <span>21.5&quot; HD Touchscreen</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Refrigeration:</span>
                    <span>Energy-efficient cooling</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Lighting:</span>
                    <span>LED interior illumination</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Payment Options Tab */}
        {activeTab === 'payment' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Multiple Payment Options</h3>
            <p className="text-[#A5ACAF]">Our machines support a wide range of payment methods for maximum convenience:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-[#4d4d4d]/50 p-4 rounded-lg text-center">
                <div className="bg-[#FD5A1E]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h4 className="font-medium text-white mb-2">Credit/Debit Cards</h4>
                <ul className="text-[#A5ACAF] text-sm space-y-1">
                  <li>Swipe</li>
                  <li>Chip Insert</li>
                  <li>Tap-to-Pay</li>
                  <li>All major cards accepted</li>
                </ul>
              </div>
              
              <div className="bg-[#4d4d4d]/50 p-4 rounded-lg text-center">
                <div className="bg-[#FD5A1E]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-medium text-white mb-2">Mobile Payments</h4>
                <ul className="text-[#A5ACAF] text-sm space-y-1">
                  <li>Apple Pay</li>
                  <li>Google Pay</li>
                  <li>Samsung Pay</li>
                  <li>QR code payments</li>
                </ul>
              </div>
              
              <div className="bg-[#4d4d4d]/50 p-4 rounded-lg text-center">
                <div className="bg-[#FD5A1E]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-medium text-white mb-2">Cash & Coins</h4>
                <ul className="text-[#A5ACAF] text-sm space-y-1">
                  <li>Accepts bills $1-$20</li>
                  <li>Provides change</li>
                  <li>Coin acceptance</li>
                  <li>Cash recycling</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Available Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Customizable Product Selection</h3>
            <p className="text-[#A5ACAF]">Our vending machines offer a wide variety of products that can be customized to suit your workplace preferences:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-[#4d4d4d]/50 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-3">Snack Categories</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <span className="text-white">Classic Snacks:</span> Chips, Pretzels, Popcorn, Crackers
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <span className="text-white">Candy & Chocolate:</span> Candy Bars, Gum, Mints, Chocolate
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <span className="text-white">Healthy Options:</span> Protein Bars, Nuts, Trail Mix, Dried Fruit
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <span className="text-white">Pastries & Cookies:</span> Cookies, Pastries, Breakfast Bars
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-[#4d4d4d]/50 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-3">Beverage Categories</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <span className="text-white">Soft Drinks:</span> Coke, Pepsi, Sprite, Dr. Pepper, Root Beer
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <span className="text-white">Energy Drinks:</span> Red Bull, Monster, Rockstar, Bang
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <span className="text-white">Water & Sports Drinks:</span> Bottled Water, Gatorade, Powerade
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <span className="text-white">Juices & Teas:</span> Apple Juice, Orange Juice, Iced Tea
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#FD5A1E]/10 p-4 rounded-lg border border-[#FD5A1E] mt-6">
              <h4 className="font-medium text-white mb-2">Product Customization</h4>
              <p className="text-[#A5ACAF]">
                We regularly collect feedback from your employees and customers to optimize the product mix. 
                Our team updates selections based on preferences and consumption patterns to ensure 
                maximum satisfaction.
              </p>
            </div>
          </div>
        )}
        
        {/* Technology Tab */}
        {activeTab === 'tech' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Advanced Technology</h3>
            <p className="text-[#A5ACAF]">Our vending machines feature cutting-edge technology for an enhanced user experience:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-[#4d4d4d]/50 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-[#FD5A1E]/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-white">21.5&quot; HD Touchscreen</h4>
                </div>
                <p className="text-[#A5ACAF]">
                  Intuitive interface with high-resolution product images, nutritional information, 
                  and simple navigation for a seamless purchasing experience.
                </p>
              </div>
              
              <div className="bg-[#4d4d4d]/50 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-[#FD5A1E]/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-white">Remote Monitoring</h4>
                </div>
                <p className="text-[#A5ACAF]">
                  IoT-enabled inventory tracking ensures machines are never empty. 
                  Our system monitors stock levels in real-time and schedules restocking automatically.
                </p>
              </div>
              
              <div className="bg-[#4d4d4d]/50 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-[#FD5A1E]/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-white">Advanced Security</h4>
                </div>
                <p className="text-[#A5ACAF]">
                  Multi-point locking system, anti-theft drop sensors, and tamper-proof payment system 
                  ensure complete security and protection of products and cash.
                </p>
              </div>
              
              <div className="bg-[#4d4d4d]/50 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-[#FD5A1E]/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-white">Energy Efficiency</h4>
                </div>
                <p className="text-[#A5ACAF]">
                  LED lighting, smart refrigeration cycling, and energy-saving modes reduce power 
                  consumption by up to 40% compared to traditional vending machines.
                </p>
              </div>
            </div>
            
            <div className="bg-[#4d4d4d]/50 p-5 rounded-lg mt-6">
              <h4 className="font-medium text-white mb-2">Accessibility Features</h4>
              <p className="text-[#A5ACAF] mb-4">
                Our machines are designed with accessibility in mind, featuring:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">
                    ADA-compliant interface height and button placement
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">
                    High-contrast display options for visually impaired users
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">
                    Voice guidance capability for screen reader compatibility
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">
                    Braille indicators on physical buttons and product slots
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

  export default FeatureTabs;