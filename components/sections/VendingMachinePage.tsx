import useVendingMachines from '@/hooks/useVendingMachines';
import React, { JSX, useState } from 'react';
import { Link } from 'react-router-dom';


/**
 * VendingMachinesPage serves as the main landing page for browsing all vending machine options
 */
function VendingMachinesPage(): JSX.Element {
  const { machinesByCategory } = useVendingMachines();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // All category options
  const categoryOptions = [
    { value: 'all', label: 'All Machines' },
    { value: 'snack', label: 'Snack Machines' },
    { value: 'beverage', label: 'Beverage Machines' },
    { value: 'combo', label: 'Combo Machines' },
    { value: 'food', label: 'Food Machines' }
  ];
  
  // Get machines based on selected category
  const displayedMachines = activeCategory === 'all'
    ? Object.values(machinesByCategory).flat()
    : machinesByCategory[activeCategory as keyof typeof machinesByCategory] || [];
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vending Machine Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our range of state-of-the-art vending machines, designed to enhance the workplace experience at First Student Inc.
          </p>
        </div>
        
        {/* Category filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 space-x-1 bg-gray-100 rounded-lg">
            {categoryOptions.map((category) => (
              <button
                key={category.value}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeCategory === category.value
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                onClick={() => setActiveCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Machines grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedMachines.map((machine) => (
            <div key={machine.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                <div className="flex items-center justify-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 text-gray-400">
                    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                  </svg>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{machine.name}</h2>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      machine.category === 'snack' ? 'bg-green-100 text-green-800' :
                      machine.category === 'beverage' ? 'bg-blue-100 text-blue-800' :
                      machine.category === 'combo' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {machine.category.charAt(0).toUpperCase() + machine.category.slice(1)}
                    </span>
                  </div>
                </div>
                
                <p className="mt-3 text-gray-600 line-clamp-3">{machine.description}</p>
                
                <div className="mt-4 text-sm text-gray-500">
                  <p>{machine.dimensions}</p>
                  <p>{machine.capacity}</p>
                </div>
                
                <div className="mt-6 space-y-2">
                  <Link
                    to={`/vending-machines/${machine.id}`}
                    className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/vending-machines/compare?selected=${machine.id}`}
                    className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Compare
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Find the Perfect Vending Solution</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-8">
            Not sure which machine is right for your needs? Our team can help you find the perfect solution for your facility.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Contact Our Team
            </Link>
            <Link 
              to="/vending-machines/compare" 
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Compare All Models
            </Link>
          </div>
        </div>
        
        {/* Benefits section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Vending Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance the workplace experience at First Student Inc. with our modern and user-friendly vending machines.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Zero Upfront Costs',
                description: 'We cover all expenses related to machine installation, maintenance, and stock replenishment.',
                icon: (
                  <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Advanced Technology',
                description: '21.5" touchscreen interface with diverse payment options including credit card, mobile, and cash.',
                icon: (
                  <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: 'Custom Selection',
                description: 'Over 50 snack and drink options tailored to employee preferences to maximize satisfaction.',
                icon: (
                  <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                )
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-5">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Common questions about our vending machine solutions.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {[
              {
                question: 'What are the upfront costs for installing vending machines?',
                answer: 'There are no upfront costs! We cover all expenses related to machine installation, maintenance, and stock replenishment. The only cost to your facility is the minimal utility expense for machine operation.'
              },
              {
                question: 'How are the machines maintained and restocked?',
                answer: 'Our team handles all aspects of maintenance and restocking. We monitor inventory levels and schedule regular visits to ensure the machines are always well-stocked and in perfect working order.'
              },
              {
                question: 'What types of payment are accepted?',
                answer: 'Our vending machines support multiple payment options, including credit/debit cards, mobile payments (Apple Pay, Google Pay, Samsung Pay), cash, and coins. We can also integrate with employee ID/badge systems upon request.'
              },
              {
                question: 'Can we customize the products offered?',
                answer: 'Absolutely! We offer a customizable selection of over 50 snack and drink options. We work with you to ensure the vending machines cater to your employees\' preferences and dietary needs.'
              },
              {
                question: 'How does the profit-sharing model work?',
                answer: 'Building owners receive a 5% share of gross revenue from each vending machine. This passive income comes with no responsibilities for management or maintenance.'
              }
            ].map((faq, index) => (
              <div key={index} className="py-6">
                <dt className="text-lg font-medium text-gray-900">{faq.question}</dt>
                <dd className="mt-2 text-gray-600">{faq.answer}</dd>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-700 mb-4">Have more questions about our vending machine solutions?</p>
            <Link 
              to="/contact" 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendingMachinesPage;