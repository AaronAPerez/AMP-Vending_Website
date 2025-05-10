import React from 'react';

import BeforeAfterSlider from './BeforeAfterSlider';
import FeatureComparison from './FeatureComparison';

/**
 * StanRTAComparison
 * 
 * 
 * A component that showcases the before/after transformation of
 * Stanislaus Regional Transit Authority with AMP vending machines
 */
const StanRTAComparison
: React.FC = () => {
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

export default StanRTAComparison;

// 'use client';

// import React from "react";
// import EnhancedHighlight from "./EnhancedHighlight";
// import WorkplaceCard from "./WorkplaceCard";


// // Icons for features
// const RefreshmentIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
//   </svg>
// );

// const ConvenienceIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="12" r="10" />
//     <polyline points="12 6 12 12 16 14" />
//   </svg>
// );

// const PaymentIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="2" y="5" width="20" height="14" rx="2" />
//     <line x1="2" y1="10" x2="22" y2="10" />
//   </svg>
// );

// const WorkEnvironmentIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//     <polyline points="9 22 9 12 15 12 15 22" />
//   </svg>
// );

// // Main component
// const StanRTAComparison = () => {
//   // Define before and after features
//   const beforeFeatures = [
//     {
//       id: 1,
//       iconName: "RefreshmentIcon",
//       icon: <RefreshmentIcon />,
//       title: "Limited Options",
//       description: "Staff must bring food from home or leave premises to find refreshments during breaks."
//     },
//     {
//       id: 2,
//       iconName: "ConvenienceIcon",
//       icon: <ConvenienceIcon />,
//       title: "Lost Break Time",
//       description: "Short break periods wasted traveling to purchase refreshments off-site."
//     },
//     {
//       id: 3,
//       iconName: "PaymentIcon",
//       icon: <PaymentIcon />,
//       title: "Limited Payment Options",
//       description: "External vendors may have restricted payment methods or cash-only policies."
//     },
//     {
//       id: 4,
//       iconName: "WorkEnvironmentIcon",
//       icon: <WorkEnvironmentIcon />,
//       title: "Basic Amenities",
//       description: "Outdated break room facilities lacking modern conveniences."
//     }
//   ];
  
//   const afterFeatures = [
//     {
//       id: 1,
//       iconName: "RefreshmentIcon",
//       icon: <RefreshmentIcon />,
//       title: "50+ Customizable Options",
//       description: "Wide selection of snacks and beverages tailored to staff preferences, including healthy alternatives."
//     },
//     {
//       id: 2,
//       iconName: "ConvenienceIcon",
//       icon: <ConvenienceIcon />,
//       title: "Maximum Break Efficiency",
//       description: "Immediate access to refreshments on-site, allowing full use of short, unpredictable breaks."
//     },
//     {
//       id: 3,
//       iconName: "PaymentIcon",
//       icon: <PaymentIcon />,
//       title: "Modern Payment Systems",
//       description: "21.5 touchscreen interface with credit card, mobile pay, and cash payment options."
//     },
//     {
//       id: 4,
//       iconName: "WorkEnvironmentIcon",
//       icon: <WorkEnvironmentIcon />,
//       title: "Enhanced Workplace",
//       description: "Zero-cost, maintenance-free premium amenities improving employee satisfaction."
//     }
//   ];
  
//   return (
//     <div className="min-h-screen text-[#F5F5F5] p-6">
//       {/* Enhanced Environment Highlight Section */}
//       <EnhancedHighlight />
      
//       {/* Side-by-Side Comparison */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//         <WorkplaceCard
//           title="Standard Break Room"
//           imageSrc="images/before-after/before-breakroom.jpg"
//           imageAlt="Standard break room without vending machines"
//           description="Traditional break room setup lacking convenient refreshment options, requiring staff to leave premises during short breaks."
//           highlighted={false}
//           beforeFeatures={beforeFeatures} features={[]}      
//         />
        
//         <WorkplaceCard
//           title="Enhanced Break Room"
//           imageSrc=""
//           imageAlt="Enhanced break room with premium vending machines"
//           description="Modern break room with state-of-the-art vending machines providing 50+ customizable options and convenient payment solutions."
//           highlighted={true}
//           afterFeatures={afterFeatures} features={[]}        />
//       </div>
      
//       {/* Benefits Summary */}
//       <div className="bg-[#4d4d4d]/20 rounded-xl p-6 border border-[#a4acac]">
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           <span className="text-[#FD5A1E]">Zero-Cost</span> Implementation Benefits
//         </h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//           <div className="bg-[#000000] p-4 rounded-lg border border-[#4d4d4d] hover:border-[#FD5A1E] transition-colors">
//             <h3 className="font-bold mb-2 text-[#F5F5F5]">Maintenance-Free</h3>
//             <p className="text-[#A5ACAF] text-sm">All machine servicing, repairs, and maintenance fully covered and managed by AMP Vending.</p>
//           </div>
          
//           <div className="bg-[#000000] p-4 rounded-lg border border-[#4d4d4d] hover:border-[#FD5A1E] transition-colors">
//             <h3 className="font-bold mb-2 text-[#F5F5F5]">Advanced Technology</h3>
//             <p className="text-[#A5ACAF] text-sm">21.5&quot; touchscreen interface with tap-to-pay functionality and multiple payment methods for modern convenience.</p>
//           </div>
          
//           <div className="bg-[#000000] p-4 rounded-lg border border-[#4d4d4d] hover:border-[#FD5A1E] transition-colors">
//             <h3 className="font-bold mb-2 text-[#F5F5F5]">Customer Satisfaction</h3>
//             <p className="text-[#A5ACAF] text-sm">Improved amenities enhance both employee and visitor experience, contributing to workplace satisfaction.</p>
//           </div>
//         </div>
//       </div>
      
//       {/* Call to Action */}
//       <div className="text-center mt-10">
//         <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Workplace?</h2>
//         <p className="text-[#A5ACAF] mb-6 max-w-2xl mx-auto">
//           Join Stanislaus Regional Transit Authority and other organizations enhancing their work environment with zero-cost vending solutions.
//         </p>
        
//         <div className="flex flex-wrap justify-center gap-4">
//           <button className="bg-[#FD5A1E] text-[#F5F5F5] px-6 py-3 rounded-full font-medium hover:bg-[#FD5A1E]/90 transition-colors">
//             Request Installation
//           </button>
//           <button className="border border-[#A5ACAF] text-[#F5F5F5] px-6 py-3 rounded-full font-medium hover:bg-[#4d4d4d] transition-colors">
//             Learn More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StanRTAComparison;