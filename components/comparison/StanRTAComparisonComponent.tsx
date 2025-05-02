import React from 'react';

import BeforeAfterSlider from './BeforeAfterSlider';
import FeatureComparison from './FeatureComparison';

/**
 * StanRTAComparisonComponent
 * 
 * A component that showcases the before/after transformation of
 * Stanislaus Regional Transit Authority with AMP vending machines
 */
const StanRTAComparisonComponent: React.FC = () => {
  return (
    <div className="text-[#F5F5F5]">
      <BeforeAfterSlider
        title="Break Room Transformation"
        beforeTitle="Before"
        afterTitle="After"
        beforeDescription="Limited refreshment options requiring staff to leave the premises during short breaks, creating inconvenience and lost time."
        afterDescription="State-of-the-art vending machines offering over 50 customizable snack and drink options with modern touchscreen interface and convenient payment options."
        beforeImageSrc="/images/before-vending-machine.jpg"
        afterImageSrc="/images/after-vending-machine.jpg"
        beforeImageAlt="Break room without vending machines"
        afterImageAlt="Modern break room with premium vending machines"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#4d4d4d] rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-[#FD5A1E]">Zero-Cost Installation</h3>
          <p className="text-[#F5F5F5] mb-4">AMP Vending covers all expenses related to machine installation, maintenance, and stock replenishment.</p>
          <ul className="list-disc list-inside text-[#A5ACAF] space-y-2">
            <li>No upfront investment required</li>
            <li>Full maintenance coverage</li>
            <li>Regular restocking service included</li>
          </ul>
        </div>
        
        <div className="bg-[#4d4d4d] rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-[#FD5A1E]">Advanced Technology</h3>
          <p className="text-[#F5F5F5] mb-4">Experience the latest in vending technology with user-friendly interfaces and convenient payment options.</p>
          <ul className="list-disc list-inside text-[#A5ACAF] space-y-2">
            <li>21.5&quot; touchscreen interface</li>
            <li>Tap-to-pay functionality</li>
            <li>Multiple payment methods supported</li>
          </ul>
        </div>
      </div>
      
      <section aria-labelledby="features-heading" className="mb-8">
        <h2 id="features-heading" className="text-2xl font-bold mb-6 text-[#F5F5F5] text-center">Feature Comparison</h2>
        
        <FeatureComparison
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          title="Break Time Efficiency"
          beforeDescription="Drivers needed to leave the premises for refreshments, often cutting into limited break time."
          afterDescription="Immediate access to refreshments on-site, maximizing relaxation time during short, unpredictable breaks."
        />
        
        <FeatureComparison
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          title="Refreshment Options"
          beforeDescription="Limited to whatever staff brought from home or nearby options if time allowed."
          afterDescription="Over 50 customizable snack and drink options, including healthy alternatives, tailored to staff preferences."
        />
        
        <FeatureComparison
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
          title="Payment Convenience"
          beforeDescription="Cash-only options or need to visit external stores with various payment requirements."
          afterDescription="Multiple payment options including credit card (insert, swipe, tap), mobile payments (Apple Pay, Samsung Pay), and traditional cash/coin methods."
        />
        
        <FeatureComparison
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
          title="Workplace Experience"
          beforeDescription="Basic facilities without modern amenities, creating potential job satisfaction issues."
          afterDescription="Enhanced workplace environment with modern conveniences, contributing to employee satisfaction and retention."
        />
      </section>
      
      <section aria-labelledby="benefits-heading" className="bg-[#4d4d4d] rounded-lg p-6 mb-8">
        <h2 id="benefits-heading" className="text-2xl font-bold mb-4 text-[#FD5A1E] text-center">Key Benefits</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#000000] p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-[#F5F5F5]">Maintenance-Free</h3>
            <p className="text-[#A5ACAF]">All machine upkeep, repairs, and servicing fully covered and managed.</p>
          </div>
          
          <div className="bg-[#000000] p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-[#F5F5F5]">Customer Satisfaction</h3>
            <p className="text-[#A5ACAF]">Improved amenities enhance both employee and visitor experience.</p>
          </div>
          
          <div className="bg-[#000000] p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-[#F5F5F5]">Modern Technology</h3>
            <p className="text-[#A5ACAF]">21&quot; touchscreen interface with intuitive operation and diverse payment options.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StanRTAComparisonComponent;