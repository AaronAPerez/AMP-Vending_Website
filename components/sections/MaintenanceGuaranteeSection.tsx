// import React from 'react';
// import { motion } from 'framer-motion';
// import { Shield, Zap, Smartphone, RefreshCw } from 'lucide-react';

// /**
//  * MaintenanceGuaranteeSection Component
//  * 
//  * Emphasizes the comprehensive maintenance program that comes with brand new machines
//  * Highlights zero responsibility for clients while providing premium service
//  */
// const MaintenanceGuaranteeSection = () => {
//   // Animation variants for staggered children
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         staggerChildren: 0.1
//       }
//     }
//   };
  
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
//   };

//   return (
//     <section className="py-16 bg-gradient-to-b from-[#0d0d0d] to-[#000000] relative">
//       {/* Background pattern */}
//       <div className="absolute inset-0 opacity-10" aria-hidden="true">
//         <div 
//           className="absolute inset-0" 
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%23FD5A1E' fill-opacity='0.4'/%3E%3C/svg%3E")`,
//             backgroundSize: '20px 20px'
//           }}
//         ></div>
//       </div>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <motion.div 
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4">
//             <Shield size={16} className="text-[#FD5A1E]" />
//             Worry-Free Operation
//           </span>
//           <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
//             Complete <span className="text-[#FD5A1E]">Maintenance Guarantee</span>
//           </h2>
//           <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
//             Your brand new machines are backed by our comprehensive maintenance program.
//             We handle everything so you don't have to.
//           </p>
//         </motion.div>
        
//         {/* Maintenance Guarantees Grid */}
//         <motion.div 
//           className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           {/* Regular Servicing */}
//           <motion.div 
//             variants={itemVariants} 
//             className="bg-[#111111] rounded-xl overflow-hidden border border-[#333333] hover:border-[#FD5A1E] transition-all p-6"
//           >
//             <div className="w-14 h-14 bg-[#FD5A1E]/10 rounded-full flex items-center justify-center mb-6">
//               <RefreshCw size={24} className="text-[#FD5A1E]" />
//             </div>
//             <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">Scheduled Maintenance</h3>
//             <p className="text-[#A5ACAF] mb-4">
//               Regular preventative maintenance keeps your brand new machines running at peak performance. Our technicians perform scheduled check-ups to ensure everything works flawlessly.
//             </p>
//             <ul className="space-y-2">
//               <li className="flex items-start">
//                 <span className="text-[#FD5A1E] mr-2">✓</span>
//                 <span className="text-[#A5ACAF] text-sm">Comprehensive system checks</span>
//               </li>
//               <li className="flex items-start">
//                 <span className="text-[#FD5A1E] mr-2">✓</span>
//                 <span className="text-[#A5ACAF] text-sm">Proactive part replacements</span>
//               </li>
//               <li className="flex items-start">
//                 <span className="text-[#FD5A1E] mr-2">✓</span>
//                 <span className="text-[#A5ACAF] text-sm">Software updates and improvements</span>
//               </li>
//             </ul>
//           </motion.div>
          
//           {/* Emergency Repairs */}
//           <motion.div 
//             variants={itemVariants} 
//             className="bg-[#111111] rounded-xl overflow-hidden border border-[#333333] hover:border-[#FD5A1E] transition-all p-6"
//           >
//             <div className="w-14 h-14 bg-[#FD5A1E]/10 rounded-full flex items-center justify-center mb-6">
//               <Zap size={24} className="text-[#FD5A1E]" />
//             </div>
//             <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">Rapid Response Repairs</h3>
//             <p className="text-[#A5ACAF] mb-4">
//               In the unlikely event that your brand new machine requires attention, our technicians respond quickly to resolve any issues, minimizing downtime and inconvenience.
//             </p>
//             <ul className="space-y-2">
//               <li className="flex items-start">
//                 <span className="text-[#FD5A1E] mr-2">✓</span>
//                 <span className="text-[#A5ACAF] text-sm">24-hour response for urgent issues</span>
//               </li>
//               <li className="flex items-start">
//                 <span className="text-[#FD5A1E] mr-2">✓</span>
//                 <span className="text-[#A5ACAF] text-sm">Trained technicians with factory parts</span>
//               </li>
//               <li className="flex items-start">
//                 <span className="text-[#FD5A1E] mr-2">✓</span>
//                 <span className="text-[#A5ACAF] text-sm">Zero repair costs for the duration</span>
//               </li>
//             </ul>
//           </motion.div>
          
//           {/* Remote Monitoring */}
//           <motion.div 
//             variants={itemVariants} 
//             className="bg-[#111111] rounded-xl overflow-hidden border border-[#333333] hover:border-[#FD5A1E] transition-all p-6"
//           >
//             <div className="w-14 h-14 bg-[#FD5A1E]/10 rounded-full flex items-center justify-center mb-6">
//               <Smartphone size={24} className="text-[#FD5A1E]" />
//             </div>
//             <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">Remote Monitoring</h3>
//             <p className="text-[#A5ACAF] mb-4">
//               Our advanced machines are equipped with monitoring technology that alerts us to potential issues before they become problems, ensuring continuous operation.
//             </p>
//             <ul className="space-y-2">
//               <li className="flex items-start">
//                 <span className="text-[#FD5A1E] mr-2">✓</span>
//                 <span className="text-[#A5ACAF] text-sm">Real-time machine status monitoring</span>
//               </li>
//               <li className="flex items-start">
//                 <span className="text-[#FD5A1E] mr-2">✓</span>
//                 <span className="text-[#A5ACAF] text-sm">Predictive maintenance alerts</span>
//               </li>
//               <li className="flex items-start">
//                 <span className="text-[#FD5A1E] mr-2">✓</span>
//                 <span className="text-[#A5ACAF] text-sm">Temperature and functionality checks</span>
//               </li>
//             </ul>
//           </motion.div>
//         </motion.div>
        
//         {/* Comparison - What You Don't Have To Worry About */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="bg-[#0a0a0a] rounded-xl border border-[#333333] overflow-hidden mb-12"
//         >
//           <div className="p-8">
//             <h3 className="text-2xl font-bold text-[#F5F5F5] mb-6 text-center">
//               Your New Machines, <span className="text-[#FD5A1E]">Zero Responsibilities</span>
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* What traditional vendors require */}
//               <div className="space-y-4">
//                 <h4 className="text-lg font-medium text-[#F5F5F5] mb-2 flex items-center">
//                   <span className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mr-3 flex-shrink-0">✗</span>
//                   Traditional Vending Machine Ownership
//                 </h4>
//                 <ul className="space-y-3 ml-11">
//                   <li className="text-[#A5ACAF] flex items-start">
//                     <span className="text-red-500 mr-2">✗</span>
//                     <span>Large upfront purchase costs</span>
//                   </li>
//                   <li className="text-[#A5ACAF] flex items-start">
//                     <span className="text-red-500 mr-2">✗</span>
//                     <span>Costly maintenance contracts</span>
//                   </li>
//                   <li className="text-[#A5ACAF] flex items-start">
//                     <span className="text-red-500 mr-2">✗</span>
//                     <span>Responsibility for repairs and parts</span>
//                   </li>
//                   <li className="text-[#A5ACAF] flex items-start">
//                     <span className="text-red-500 mr-2">✗</span>
//                     <span>Technology becomes outdated</span>
//                   </li>
//                   <li className="text-[#A5ACAF] flex items-start">
//                     <span className="text-red-500 mr-2">✗</span>
//                     <span>Asset depreciation concerns</span>
//                   </li>
//                 </ul>
//               </div>
              
//               {/* What we provide */}
//               <div className="space-y-4">
//                 <h4 className="text-lg font-medium text-[#F5F5F5] mb-2 flex items-center">
//                   <span className="w-8 h-8 rounded-full bg-[#FD5A1E]/20 text-[#FD5A1E] flex items-center justify-center mr-3 flex-shrink-0">✓</span>
//                   AMP Vending Solution
//                 </h4>
//                 <ul className="space-y-3 ml-11">
//                   <li className="text-[#A5ACAF] flex items-start">
//                     <span className="text-[#FD5A1E] mr-2">✓</span>
//                     <span>Zero upfront equipment costs</span>
//                   </li>
//                   <li className="text-[#A5ACAF] flex items-start">
//                     <span className="text-[#FD5A1E] mr-2">✓</span>
//                     <span>Comprehensive maintenance included</span>
//                   </li>
//                   <li className="text-[#A5ACAF] flex items-start">
//                     <span className="text-[#FD5A1E] mr-2">✓</span>
//                     <span>Repairs and parts at no cost</span>
//                   </li>
//                   <li className="text-[#A5ACAF] flex items-start">
//                     <span className="text-[#FD5A1E] mr-2">✓</span>
//                     <span>Latest touchscreen technology</span>
//                   </li>
//                   <li className="text-[#A5ACAF] flex items-start">
//                     <span className="text-[#FD5A1E] mr-2">✓</span>
//                     <span>No asset management concerns</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
          
//           {/* Highlight banner */}
//           <div className="bg-[#FD5A1E]/10 border-t border-[#FD5A1E]/30 p-4 text-center">
//             <p className="text-[#F5F5F5]">
//               <span className="font-medium">Our Promise:</span> Premium service and support for the lifetime of your vending solution at zero cost to you.
//             </p>
//           </div>
//         </motion.div>
        
//         {/* Testimonial or Final Message */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="text-center"
//         >
//           <p className="text-[#F5F5F5] text-lg font-medium italic mb-2">
//             "We don't just deliver new machines – we maintain them to the highest standards so you never have to worry."
//           </p>
//           <p className="text-[#A5ACAF]">– AMP Vending Commitment</p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default MaintenanceGuaranteeSection;