// import { motion } from "framer-motion";
// import {  CheckCircle, Star, Handshake, Shield, Zap } from "lucide-react";


// /**
//  * Company Value Interface
//  */
// interface CompanyValue {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   benefits: string[];
// }


//   // Core company values
//   const companyValues: CompanyValue[] = [
//     {
//       title: 'Quality & Reliability',
//       description: 'We deliver premium vending machines with proven reliability and cutting-edge technology.',
//       icon: <Star size={28} className="text-[#FD5A1E]" aria-hidden="true" />,
//       benefits: [
//         'Premium machine quality',
//         'Advanced touchscreen technology',
//         'Proven reliability record',
//         'Energy-efficient operations'
//       ]
//     },
//     {
//       title: 'Professional Service',
//       description: 'From consultation to installation and ongoing support, we maintain the highest service standards.',
//       icon: <Handshake size={28} className="text-[#FD5A1E]" aria-hidden="true" />,
//       benefits: [
//         'Expert consultation and planning',
//         'Professional installation team',
//         'Comprehensive maintenance programs',
//         'Responsive customer support'
//       ]
//     },
//     {
//       title: 'Trust & Transparency',
//       description: 'We build lasting partnerships through honest communication and transparent business practices.',
//       icon: <Shield size={28} className="text-[#FD5A1E]" aria-hidden="true" />,
//       benefits: [
//         'Clear service agreements',
//         'Transparent pricing structure',
//         'Regular communication updates',
//         'Honest recommendations'
//       ]
//     },
//     {
//       title: 'Innovation & Efficiency',
//       description: 'We continuously innovate to provide the most efficient and user-friendly vending solutions.',
//       icon: <Zap size={28} className="text-[#FD5A1E]" aria-hidden="true" />,
//       benefits: [
//         'Latest vending technology',
//         'Smart inventory management',
//         'Contactless payment options',
//         'Remote monitoring capabilities'
//       ]
//     }
//   ];

 


// import React from 'react'

// const CompanyValues = () => {
//   return (
//     <div>
        
//         {/* Company Values */}
//         <section className="py-16 bg-[#111111]" aria-labelledby="company-values-heading">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               className="text-center mb-16"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <h2 id="company-values-heading" className="text-3xl font-bold text-[#F5F5F5] mb-4">
//                 Our Core Values
//               </h2>
//               <p className="text-[#A5ACAF] max-w-3xl mx-auto">
//                 These principles guide every aspect of our business and ensure we deliver 
//                 exceptional value to our clients
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {companyValues.map((value, index) => (
//                 <motion.div
//                   key={value.title}
//                   className="bg-[#000000] rounded-xl p-8 border border-[#333333] hover:border-[#FD5A1E] transition-all"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   role="article"
//                   aria-labelledby={`value-${index}-title`}
//                 >
//                   <div className="flex items-start space-x-4 mb-6">
//                     <div className="flex-shrink-0 p-3 bg-[#FD5A1E]/10 rounded-full">
//                       {value.icon}
//                     </div>
//                     <div>
//                       <h3 id={`value-${index}-title`} className="text-xl font-bold text-[#F5F5F5] mb-2">
//                         {value.title}
//                       </h3>
//                       <p className="text-[#A5ACAF] leading-relaxed">
//                         {value.description}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     {value.benefits.map((benefit, benefitIndex) => (
//                       <div key={benefitIndex} className="flex items-center space-x-3">
//                         <CheckCircle size={16} className="text-[#FD5A1E] flex-shrink-0" aria-hidden="true" />
//                         <span className="text-[#F5F5F5] text-sm">{benefit}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//   );
// };

// export default CompanyValues