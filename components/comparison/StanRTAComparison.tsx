// 'use client';

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
//           beforefeatures={[]} 
      
//         />
        
//         <WorkplaceCard 
//           title="Enhanced Break Room"
//           imageSrc=""
//           imageAlt="Enhanced break room with premium vending machines"
//           description="Modern break room with state-of-the-art vending machines providing 50+ customizable options and convenient payment solutions."
//           highlighted={true} 
//           afterFeatures={afterFeatures} 
//         />
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