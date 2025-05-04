'use client';

import React from 'react';
import ExpandableCard from '@/components/ui/ExpandableCard';
import Image from 'next/image';

/**
 * Example component for showing the zero-cost implementation details
 */
const ZeroCostExplanationContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <p className="text-whitesmoke">
        Our zero-cost vending solution eliminates all upfront expenses for your business. 
        We cover 100% of the costs for:
      </p>
      
      <ul className="list-disc pl-5 text-silver space-y-2">
        <li>Machine purchase and installation</li>
        <li>Regular maintenance and repairs</li>
        <li>Inventory restocking and management</li>
        <li>Smart monitoring technology</li>
      </ul>
      
      <div className="mt-4 p-3 bg-primary-black/40 rounded-lg text-sm text-silver">
        <p className="font-bold text-whitesmoke mb-1">How is this possible?</p>
        <p>
          We operate on a revenue-sharing model where we handle all operational aspects and 
          share profits from sales. This means you get premium vending services with 
          absolutely no investment required from your business.
        </p>
      </div>
    </div>
  );
};

/**
 * Example component for showing technology details
 */
const AdvancedTechnologyContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="font-semibold text-whitesmoke">Cutting-Edge Features</h4>
          <ul className="list-disc pl-5 text-silver space-y-1 text-sm">
            <li>21.5&quot; HD Touchscreen Interface</li>
            <li>Remote Inventory Monitoring</li>
            <li>Contactless Payment Options</li>
            <li>Digital Product Information</li>
            <li>Energy-Efficient Operations</li>
          </ul>
        </div>
        
        <div className="bg-primary-black/40 rounded-lg overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src="/images/touchscreen-interface.jpg"
              alt="Modern vending machine touchscreen interface"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center bg-orange/10 p-3 rounded-lg">
        <svg 
          className="w-6 h-6 text-orange mr-2 flex-shrink-0" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <span className="text-sm text-whitesmoke">
          Our machines are regularly updated with the latest software to ensure optimal performance.
        </span>
      </div>
    </div>
  );
};

/**
 * Example component for showing workplace benefits
 */
const EmployeeBenefitsContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <p className="text-whitesmoke">
        Premium vending machines significantly enhance workplace satisfaction and 
        productivity through several key benefits:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="bg-dark-gray/20 p-3 rounded-lg">
          <h4 className="font-semibold text-orange mb-2">Time Efficiency</h4>
          <p className="text-sm text-silver">
            Employees save valuable break time by having refreshments available on-site, 
            eliminating the need to leave the premises.
          </p>
        </div>
        
        <div className="bg-dark-gray/20 p-3 rounded-lg">
          <h4 className="font-semibold text-orange mb-2">Personalized Options</h4>
          <p className="text-sm text-silver">
            Customized product selection based on employee preferences ensures everyone 
            finds options they enjoy.
          </p>
        </div>
        
        <div className="bg-dark-gray/20 p-3 rounded-lg">
          <h4 className="font-semibold text-orange mb-2">Wellness Support</h4>
          <p className="text-sm text-silver">
            Healthy snack alternatives promote employee wellbeing and sustained energy 
            throughout the workday.
          </p>
        </div>
        
        <div className="bg-dark-gray/20 p-3 rounded-lg">
          <h4 className="font-semibold text-orange mb-2">Modern Amenities</h4>
          <p className="text-sm text-silver">
            State-of-the-art machines reflect a commitment to quality workplace amenities 
            and employee comfort.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Example implementation of ExpandableCard usage
 */
const ExpandableCardExample: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-whitesmoke text-center mb-6">
        Key Benefits of AMP Vending Solutions
      </h2>
      
      <ExpandableCard
        title="Zero-Cost Implementation"
        subtitle="No upfront investment required"
        iconName="payment"
        content={<ZeroCostExplanationContent />}
        defaultExpanded={true}
        className="shadow-highlight"
      />
      
      <ExpandableCard
        title="Advanced Technology"
        subtitle="Modern touchscreen interfaces with multiple payment options"
        iconName="technology"
        content={<AdvancedTechnologyContent />}
        colorTheme="orange"
      />
      
      <ExpandableCard
        title="Employee Satisfaction"
        subtitle="Enhance workplace experience and productivity"
        iconName="satisfaction"
        content={<EmployeeBenefitsContent />}
        colorTheme="silver"
      />
    </div>
  );
};

export default ExpandableCardExample;