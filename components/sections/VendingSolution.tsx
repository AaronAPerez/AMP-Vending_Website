import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FeatureItem from '../ui/FeatureItem';
import Card from '../ui/Card';
import Button from '../ui/Button';

/**
 * VendingSolution section component that showcases the features
 * and capabilities of the vending machines
 */
const VendingSolution = () => {
  // Machine features data
  const machineFeatures = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
        </svg>
      ),
      title: 'Versatile Machine Options',
      description: 'Our refrigerated and non-refrigerated machines are perfect for providing a wide array of snacks, drinks and treats.'
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
      title: '21.5" Touchscreen Interface',
      description: 'Intuitive display for easy browsing and selection, making the purchasing process quick and effortless.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Quality and Security Features',
      description: 'Bright LED interior lighting, anti-fog double-paned glass, and an anti-theft drop sensor ensure product quality and security.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.679zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Dual Zone Efficiency',
      description: 'Our dual zone technology allows for a variety of items, including healthier options and small convenience items.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.3c0 1.149-.385 2.253-1.066 3.122-.553.706-1.18 1.369-1.834 1.97l-2.586 2.586a1.5 1.5 0 01-2.134 0L5.744 16.5a1.5 1.5 0 010-2.121l2.586-2.586a1.5 1.5 0 012.121 0l2.586 2.586a1.5 1.5 0 010 2.121l-2.586 2.586c.94-.94 2.19-1.45 3.469-1.45.424 0 .843.037 1.25.109.511.091.994-.32.994-.842v-2.302c0-.522-.482-.933-.994-.842a5.038 5.038 0 00-1.25.109c-1.28 0-2.53-.51-3.469-1.45L5.744 7.5a1.5 1.5 0 010-2.121l2.586-2.586a1.5 1.5 0 012.121 0z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Customizable Product Selection',
      description: 'Over 50 snack and drink options tailored to employee preferences to maximize satisfaction.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="vending-solution">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Vending Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            State-of-the-art vending machines that revolutionize the snack and beverage experience for your workplace.
          </p>
        </div>

        {/* Machine Image and Details */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative group">
            {/* Main machine image with visual effects */}
            <div className="relative z-10 overflow-hidden rounded-2xl shadow-xl">
              <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl relative">
                {/* This would be replaced with an actual image in production */}
                <div className="absolute inset-0 flex flex-col p-6">
                  {/* Machine screen */}
                  <div className="mb-4 h-20 bg-blue-400/20 rounded-lg flex items-center justify-center">
                    <div className="text-white font-medium">AMP Vending</div>
                  </div>
                  
                  {/* Product rows */}
                  <div className="flex-grow flex flex-col space-y-2">
                    {[...Array(6)].map((_, rowIndex) => (
                      <div key={rowIndex} className="grid grid-cols-4 gap-2 flex-1">
                        {[...Array(4)].map((_, colIndex) => {
                          const colors = ['bg-red-500/40', 'bg-green-500/40', 'bg-yellow-500/40', 'bg-blue-500/40'];
                          const randomColor = colors[Math.floor(Math.random() * colors.length)];
                          return (
                            <div key={colIndex} className={`rounded ${randomColor} flex items-center justify-center shadow-inner`}>
                              <div className="w-3 h-3 bg-white/20 rounded-sm"></div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  
                  {/* Machine bottom */}
                  <div className="mt-4 h-16 bg-gray-700/40 rounded-lg flex items-center justify-center">
                    <div className="w-16 h-6 bg-gray-600/60 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual effects for the image */}
            <div className="absolute inset-0 -rotate-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity"></div>
            <div className="absolute top-6 -right-4 w-24 h-24 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="absolute bottom-6 -left-4 w-24 h-24 bg-indigo-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            
            {/* Feature labels */}
            <div className="mt-4 text-center">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2">
                Refrigerated
              </span>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Non-Refrigerated Options
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Modern, Efficient, User-Friendly
            </h3>
            <p className="text-gray-700 mb-6">
              Our vending machines combine cutting-edge technology with user-friendly features to provide unparalleled convenience and satisfaction for employees and visitors alike.
            </p>
            <p className="text-gray-700 mb-6">
              Designed for high-traffic areas such as break rooms and common spaces, our machines ensure that refreshments are always within easy reach during short, unpredictable breaks.
            </p>
            
            {/* Key benefits list */}
            <ul className="mb-8 space-y-3">
              {[
                'Advanced touchscreen interface with intuitive navigation',
                'Multiple payment options including contactless and mobile',
                'Energy-efficient LED lighting and cooling systems',
                'Remote monitoring and inventory management'
              ].map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-4">
              <Button as={Link} href="/proposal" size="md">
                View Full Proposal
              </Button>
              <Button as={Link} href="/contact" variant="outline" size="md">
                Request More Information
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {machineFeatures.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              highlight={index === 1} // Highlight the advanced payment system feature
            />
          ))}
        </div>

        {/* Payment Options Card */}
        <Card 
          className="mt-16 max-w-4xl mx-auto" 
          title="Comprehensive Payment Options"
          variant="elevated"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { name: 'Credit/Debit Card', icon: '💳', description: 'Insert, tap, or swipe' },
              { name: 'Apple Pay', icon: '🍎', description: 'Quick contactless payment' },
              { name: 'Samsung Pay', icon: '📱', description: 'NFC-enabled transactions' },
              { name: 'Cash & Coins', icon: '💵', description: 'Traditional payment options' },
            ].map((option, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{option.icon}</div>
                <div className="font-medium text-gray-900">{option.name}</div>
                <p className="text-sm text-gray-500 mt-1">{option.description}</p>
              </div>
            ))}
          </div>
        </Card>
        
        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to enhance your workplace?</h3>
            <p className="text-blue-100 mb-6">
              Our vending solutions can be installed with zero upfront costs and generate passive income for your business.
            </p>
            <Button 
              as={Link} 
              href="/contact" 
              size="lg" 
              variant="light" 
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendingSolution;