'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


const ProposalPage: React.FC = () => {
  // State to track which sections are currently expanded (primarily for mobile)
  const [activeSections, setActiveSections] = useState({
    summary: true,
    solution: false,
    benefits: false,
    financial: false,
    steps: false
  });

  // Function to toggle section visibility
  const toggleSection = (section: keyof typeof activeSections) => {
    setActiveSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Helper function to check if a section is active
  const isSectionActive = (section: keyof typeof activeSections) => {
    return activeSections[section];
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-[#4d4d4d]">
        <div className="absolute inset-0 opacity-20">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="#A5ACAF" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#FD5A1E]/10 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4">
            AMP Vending Proposal
          </h1>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
            Our comprehensive solution for enhancing your workplace with premium vending machines at zero cost.
          </p>
        </div>
      </section>
      
      {/* Main Proposal Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Document Header */}
        <div className="bg-[#4d4d4d]/30 rounded-xl p-6 md:p-8 mb-8 border border-[#a4acac]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#F5F5F5]">Premium Vending Solution</h2>
              <p className="text-[#A5ACAF]">Prepared For: Your Business</p>
              <p className="text-[#A5ACAF]">Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <Image 
                src="/images/logo/AMP_logo.png" 
                alt="AMP Vending Logo" 
                width={150} 
                height={100}
                className="h-18 w-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Proposal Navigation */}
        <div className="hidden md:flex mb-8 border-b border-[#4d4d4d] sticky top-16 bg-[#000000] z-30">
          <button
            onClick={() => toggleSection('summary')}
            className={`px-4 py-3 font-medium text-sm transition-colors ${
              isSectionActive('summary') 
                ? 'border-b-2 border-[#FD5A1E] text-[#FD5A1E]' 
                : 'text-[#A5ACAF] hover:text-white'
            }`}
            aria-expanded={isSectionActive('summary')}
            aria-controls="summary-content"
          >
            Executive Summary
          </button>
          <button
            onClick={() => toggleSection('solution')}
            className={`px-4 py-3 font-medium text-sm transition-colors ${
              isSectionActive('solution') 
                ? 'border-b-2 border-[#FD5A1E] text-[#FD5A1E]' 
                : 'text-[#A5ACAF] hover:text-white'
            }`}
            aria-expanded={isSectionActive('solution')}
            aria-controls="solution-content"
          >
            Vending Solution
          </button>
          <button
            onClick={() => toggleSection('benefits')}
            className={`px-4 py-3 font-medium text-sm transition-colors ${
              isSectionActive('benefits') 
                ? 'border-b-2 border-[#FD5A1E] text-[#FD5A1E]' 
                : 'text-[#A5ACAF] hover:text-white'
            }`}
            aria-expanded={isSectionActive('benefits')}
            aria-controls="benefits-content"
          >
            Benefits
          </button>
          <button
            onClick={() => toggleSection('financial')}
            className={`px-4 py-3 font-medium text-sm transition-colors ${
              isSectionActive('financial') 
                ? 'border-b-2 border-[#FD5A1E] text-[#FD5A1E]' 
                : 'text-[#A5ACAF] hover:text-white'
            }`}
            aria-expanded={isSectionActive('financial')}
            aria-controls="financial-content"
          >
            Financial Model
          </button>
          <button
            onClick={() => toggleSection('steps')}
            className={`px-4 py-3 font-medium text-sm transition-colors ${
              isSectionActive('steps') 
                ? 'border-b-2 border-[#FD5A1E] text-[#FD5A1E]' 
                : 'text-[#A5ACAF] hover:text-white'
            }`}
            aria-expanded={isSectionActive('steps')}
            aria-controls="steps-content"
          >
            Next Steps
          </button>
        </div>
        
        {/* Executive Summary Section */}
        <section id="summary" className="mb-12">
          <div className="md:hidden mb-4">
            <button
              onClick={() => toggleSection('summary')}
              className="w-full flex items-center justify-between bg-[#4d4d4d]/30 p-4 rounded-lg border border-[#a4acac]"
              aria-expanded={isSectionActive('summary')}
              aria-controls="summary-content"
            >
              <h2 className="text-xl font-bold text-[#F5F5F5]">Executive Summary</h2>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-[#FD5A1E] transition-transform ${isSectionActive('summary') ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          <div 
            id="summary-content"
            className={`space-y-6 ${!isSectionActive('summary') && 'hidden md:block'}`}
          >
            <h2 className="text-2xl font-bold text-[#F5F5F5] mb-4 hidden md:block">Executive Summary</h2>
            
            <p className="text-[#A5ACAF]">
              This business proposal presents an exceptional opportunity to enhance the workplace
              experience for your employees and customers through the installation of state-of-the-art
              vending machines. Our solution addresses the unique challenges faced in your environment
              while offering significant benefits at zero cost to your organization.
            </p>
            
            <div className="bg-[#4d4d4d]/30 rounded-lg p-5 border-l-4 border-[#FD5A1E]">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">Key advantages of our vending machine service include:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#F5F5F5]">
                    <strong className="font-medium">Fully covered costs</strong> for machine supply, maintenance, and servicing
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#F5F5F5]">
                    <strong className="font-medium">Advanced technology features</strong>, including 21.5&quot; touchscreen interface and versatile payment options
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#F5F5F5]">
                    <strong className="font-medium">Customizable selection</strong> of over 50 snack and drink options tailored to preferences
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#F5F5F5]">
                    <strong className="font-medium">Convenient access</strong> to refreshments during breaks, eliminating the need to leave the premises
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#F5F5F5]">
                    <strong className="font-medium">Healthy options</strong> to support employee well-being and maintain energy levels
                  </span>
                </li>
              </ul>
            </div>
            
            <p className="text-[#A5ACAF]">
              Our vending solution combines cutting-edge technology with user-friendly features to transform
              the snack and beverage experience at your facility. By addressing the specific needs of your
              location, we create a win-win scenario that enhances the workplace environment without
              adding any operational costs or management burden.
            </p>
          </div>
        </section>
        
        {/* Vending Solution Section */}
        <section id="solution" className="mb-12">
          <div className="md:hidden mb-4">
            <button
              onClick={() => toggleSection('solution')}
              className="w-full flex items-center justify-between bg-[#4d4d4d]/30 p-4 rounded-lg border border-[#a4acac]"
              aria-expanded={isSectionActive('solution')}
              aria-controls="solution-content"
            >
              <h2 className="text-xl font-bold text-[#F5F5F5]">Our Vending Solution</h2>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-[#FD5A1E] transition-transform ${isSectionActive('solution') ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          <div 
            id="solution-content"
            className={`space-y-6 ${!isSectionActive('solution') && 'hidden md:block'}`}
          >
            <h2 className="text-2xl font-bold text-[#F5F5F5] mb-4 hidden md:block">Our Vending Solution</h2>
            
            <p className="text-[#A5ACAF]">
              Our state-of-the-art vending machines are designed to revolutionize the snack and beverage
              experience at your workplace. Combining cutting-edge technology with user-friendly features,
              these machines offer unparalleled convenience and satisfaction for everyone on your premises.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#4d4d4d]/30 p-5 rounded-lg border border-[#a4acac]">
                <h3 className="text-lg font-bold text-[#F5F5F5] mb-4">Advanced Technology</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">21.5&quot; Touchscreen Interface</strong> - Intuitive, high-definition display for browsing products
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Versatile Payment Options</strong> - Credit card, mobile pay, and cash acceptance
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Remote Monitoring</strong> - Real-time inventory tracking for proactive restocking
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Energy Efficiency</strong> - LED lighting and optimized refrigeration systems
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-[#4d4d4d]/30 p-5 rounded-lg border border-[#a4acac]">
                <h3 className="text-lg font-bold text-[#F5F5F5] mb-4">Product Selection</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Customizable Options</strong> - Selection tailored to your workplace preferences
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Healthy Alternatives</strong> - Nutritious options to support well-being
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Diverse Selection</strong> - Over 50 different snack and beverage options
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Regular Updates</strong> - Periodic refreshing of options based on consumption patterns
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#FD5A1E]/10 p-5 rounded-lg border border-[#FD5A1E]">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3">Vending Machine Models</h3>
              <p className="text-[#A5ACAF] mb-4">
                We offer multiple vending machine models to suit your specific needs and space constraints. 
                All machines are equipped with premium features and zero upfront costs.
              </p>
              <Link href="/vending-machines" className="text-[#FD5A1E] font-medium hover:underline inline-flex items-center">
                View Available Machines
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section id="benefits" className="mb-12">
          <div className="md:hidden mb-4">
            <button
              onClick={() => toggleSection('benefits')}
              className="w-full flex items-center justify-between bg-[#4d4d4d]/30 p-4 rounded-lg border border-[#a4acac]"
              aria-expanded={isSectionActive('benefits')}
              aria-controls="benefits-content"
            >
              <h2 className="text-xl font-bold text-[#F5F5F5]">Benefits for Your Workplace</h2>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-[#FD5A1E] transition-transform ${isSectionActive('benefits') ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          <div 
            id="benefits-content"
            className={`space-y-6 ${!isSectionActive('benefits') && 'hidden md:block'}`}
          >
            <h2 className="text-2xl font-bold text-[#F5F5F5] mb-4 hidden md:block">Benefits for Your Workplace</h2>
            
            <p className="text-[#A5ACAF]">
              Installing our vending machines in your workplace offers substantial advantages for both
              management and employees. This solution addresses specific challenges while providing
              value-added services that enhance the work environment.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#4d4d4d]/30 p-5 rounded-lg border border-[#a4acac]">
                <h3 className="text-lg font-bold text-[#F5F5F5] mb-4">Benefits for Employees</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Convenient Access</strong> - 24/7 availability of refreshments without leaving the premises
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Diverse Options</strong> - Wide selection of snacks and beverages to suit all preferences
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Healthy Choices</strong> - Nutritious options for maintaining energy and focus
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Multiple Payment Options</strong> - Convenience of paying with cash, card, or mobile
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-[#4d4d4d]/30 p-5 rounded-lg border border-[#a4acac]">
                <h3 className="text-lg font-bold text-[#F5F5F5] mb-4">Benefits for Management</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Zero Cost Implementation</strong> - No capital investment or ongoing expenses
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Maintenance-Free Operation</strong> - All servicing and restocking handled by our team
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Enhanced Workplace Satisfaction</strong> - Improved employee morale and productivity
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A5ACAF]">
                      <strong className="text-[#F5F5F5]">Modern Workplace Amenity</strong> - Enhanced workplace image and employee experience
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#FD5A1E]/10 p-5 rounded-lg border border-[#FD5A1E] mt-6">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3">Solving Common Workplace Challenges</h3>
              <p className="text-[#A5ACAF] mb-4">
                Our vending solution specifically addresses the challenge of providing convenient refreshment 
                options for employees with unpredictable schedules or limited break times. By offering 
                on-site, 24/7 access to quality snacks and beverages, we eliminate the need for
                employees to leave the premises during short breaks.
              </p>
              <p className="text-[#A5ACAF]">
                This leads to increased workplace satisfaction, better time management, and 
                improved overall productivity—all without any cost or administrative burden to your organization.
              </p>
            </div>
          </div>
        </section>
        
        {/* Financial Model Section */}
        <section id="financial" className="mb-12">
          <div className="md:hidden mb-4">
            <button
              onClick={() => toggleSection('financial')}
              className="w-full flex items-center justify-between bg-[#4d4d4d]/30 p-4 rounded-lg border border-[#a4acac]"
              aria-expanded={isSectionActive('financial')}
              aria-controls="financial-content"
            >
              <h2 className="text-xl font-bold text-[#F5F5F5]">Financial Model</h2>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-[#FD5A1E] transition-transform ${isSectionActive('financial') ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          <div 
            id="financial-content"
            className={`space-y-6 ${!isSectionActive('financial') && 'hidden md:block'}`}
          >
            <h2 className="text-2xl font-bold text-[#F5F5F5] mb-4 hidden md:block">Financial Model</h2>
            
            <p className="text-[#A5ACAF]">
              Our vending machine solution offers a compelling financial proposition for your workplace,
              combining zero-cost implementation with hassle-free operation. This arrangement is designed
              to benefit your organization while providing valuable services to your employees and customers.
            </p>
            
            <div className="bg-[#4d4d4d]/30 p-5 rounded-lg border border-[#a4acac]">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-4">Zero-Cost Implementation</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">
                    <strong className="text-[#F5F5F5]">No Upfront Costs</strong> - Our company covers all expenses related to machine installation
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">
                    <strong className="text-[#F5F5F5]">Maintenance Included</strong> - All maintenance, repairs, and servicing are fully covered
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">
                    <strong className="text-[#F5F5F5]">Regular Restocking</strong> - Inventory management and restocking handled by our team
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">
                    <strong className="text-[#F5F5F5]">Minimal Utility Cost</strong> - The only expense to your facility is the minimal electricity usage
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#4d4d4d]/30 p-5 rounded-lg border border-[#a4acac]">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-4">Industry-Standard Pricing</h3>
              <p className="text-[#A5ACAF] mb-4">
                Products in our vending machines are priced competitively with retail stores and other vending 
                solutions, offering excellent value for employees and customers. We maintain transparent 
                pricing practices with no hidden fees or surcharges.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">
                    <strong className="text-[#F5F5F5]">Snacks</strong> - Competitively priced selection of popular and healthy options
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">
                    <strong className="text-[#F5F5F5]">Beverages</strong> - Standard market pricing for water, soft drinks, and energy drinks
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">
                    <strong className="text-[#F5F5F5]">Premium Items</strong> - Fair pricing on specialty and premium products
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#FD5A1E]/10 p-5 rounded-lg border border-[#FD5A1E] mt-6">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3">Benefits of Our Zero-Cost Model</h3>
              <p className="text-[#A5ACAF]">
                With our model, your organization gets all the benefits of premium vending machines
                without any capital outlay or ongoing responsibilities. We handle everything from
                installation to maintenance, allowing you to provide this valuable amenity to your
                employees and customers at absolutely no cost to your organization.
              </p>
            </div>
          </div>
        </section>
        
        {/* Next Steps Section */}
        <section id="steps" className="mb-12">
          <div className="md:hidden mb-4">
            <button
              onClick={() => toggleSection('steps')}
              className="w-full flex items-center justify-between bg-[#4d4d4d]/30 p-4 rounded-lg border border-[#a4acac]"
              aria-expanded={isSectionActive('steps')}
              aria-controls="steps-content"
            >
              <h2 className="text-xl font-bold text-[#F5F5F5]">Next Steps</h2>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-[#FD5A1E] transition-transform ${isSectionActive('steps') ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          <div 
            id="steps-content"
            className={`space-y-6 ${!isSectionActive('steps') && 'hidden md:block'}`}
          >
            <h2 className="text-2xl font-bold text-[#F5F5F5] mb-4 hidden md:block">Next Steps</h2>
            
            <p className="text-[#A5ACAF]">
              To move forward with the vending machine installation at your workplace, we propose
              the following action plan:
            </p>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-[#4d4d4d]/30 p-5 rounded-lg border border-[#a4acac] relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-[#F5F5F5] font-bold flex items-center justify-center">1</div>
                <h3 className="text-lg font-bold text-[#F5F5F5] mt-2 mb-3">Review and Approval</h3>
                <p className="text-[#A5ACAF]">
                  Review this proposal and discuss any questions or concerns with our team.
                </p>
              </div>
              <div className="bg-[#4d4d4d]/30 p-5 rounded-lg border border-[#a4acac] relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-[#F5F5F5] font-bold flex items-center justify-center">2</div>
                <h3 className="text-lg font-bold text-[#F5F5F5] mt-2 mb-3">Site Assessment</h3>
                <p className="text-[#A5ACAF]">
                  Our team will conduct a thorough site assessment to determine optimal machine locations.
                </p>
              </div>
              <div className="bg-[#4d4d4d]/30 p-5 rounded-lg border border-[#a4acac] relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-[#F5F5F5] font-bold flex items-center justify-center">3</div>
                <h3 className="text-lg font-bold text-[#F5F5F5] mt-2 mb-3">Customization</h3>
                <p className="text-[#A5ACAF]">
                  We&quot;ll finalize product selection based on your preferences and workplace needs.
                </p>
              </div>
              <div className="bg-[#4d4d4d]/30 p-5 rounded-lg border border-[#a4acac] relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-[#F5F5F5] font-bold flex items-center justify-center">4</div>
                <h3 className="text-lg font-bold text-[#F5F5F5] mt-2 mb-3">Installation</h3>
                <p className="text-[#A5ACAF]">
                  We&quot;ll schedule and complete the installation with minimal disruption to your operations.
                </p>
              </div>
            </div>
            
            <div className="bg-[#4d4d4d]/30 p-5 rounded-lg border border-[#a4acac] mt-6">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3">Installation Timeline</h3>
              <p className="text-[#A5ACAF] mb-4">
                Once the contract is signed, we&quot;ll set a proposed timeline for completing the installation. 
                This typically involves:
              </p>
              <ul className="space-y-2 text-[#A5ACAF]">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Coordinating with your facilities team for any necessary preparations</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Scheduling the machine delivery and setup during off-peak hours</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Arranging for the initial stocking of products</span>
                </li>
              </ul>
              <p className="text-[#A5ACAF] mt-4">
                For most locations, we can have your vending solution operational within 2-3 weeks
                of the initial agreement.
              </p>
            </div>
            
            <div className="bg-[#FD5A1E]/10 p-6 rounded-lg border border-[#FD5A1E] text-center">
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">Ready to Get Started?</h3>
              <p className="text-[#A5ACAF] mb-6 max-w-2xl mx-auto">
                Contact us today to schedule a consultation and begin the process of bringing premium,
                zero-cost vending solutions to your workplace.
              </p>
              <Link 
                href="/contact" 
                className="px-8 py-3 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-full inline-flex items-center hover:bg-[#FD5A1E]/90 transition-colors"
              >
                Contact Us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Approval Section */}
        <section className="mb-12 border-t border-[#4d4d4d] pt-8">
          <div className="bg-[#4d4d4d]/30 p-6 rounded-lg border border-[#a4acac]">
            <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">Proposal Approval</h3>
            <p className="text-[#A5ACAF] mb-6">
              If you&quot;re ready to move forward with this proposal, please contact us to schedule a consultation
              and begin the implementation process.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[#A5ACAF] mb-2">For Questions Please Contact:</p>
                <p className="text-[#F5F5F5] font-medium">Andrew Perez</p>
                <p className="text-[#F5F5F5]">
                  <a href="tel:+12094035450" className="text-[#FD5A1E] hover:underline">Phone: (209) 403-5450</a>
                </p>
                <p className="text-[#F5F5F5]">
                  <a href="mailto:ampdesignandconsulting@gmail.com" className="text-[#FD5A1E] hover:underline">
                    ampdesignandconsulting@gmail.com
                  </a>
                </p>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-[#a4acac] pt-4 md:pt-0 md:pl-6">
                <p className="text-[#A5ACAF] mb-4">
                  Ready to enhance your workplace with our premium vending solution?
                </p>
                <Link 
                  href="/contact" 
                  className="px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-full inline-flex items-center hover:bg-[#FD5A1E]/90 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Bottom CTA */}
      <section className="py-12 bg-[#FD5A1E] text-[#F5F5F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Enhance Your Workplace Today
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join leading workplaces enjoying state-of-the-art vending with zero costs and no maintenance worries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#F5F5F5] text-[#000000] font-medium rounded-full shadow-lg hover:bg-[#000000] hover:text-[#F5F5F5] hover:border-[#F5F5F5] border border-transparent transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/vending-machines"
              className="px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full hover:bg-[#000000] transition-colors"
            >
              View Machines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProposalPage;