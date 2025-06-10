// import { motion } from 'framer-motion'
// import { Award, CheckCircle, Clock, Users } from 'lucide-react';
// import React from 'react'
// import { CompanyStat } from './AboutPage';



// const CompanyStats = () => {

//      // Company statistics and achievements
//  const companyStats: CompanyStat[] = [
//     {
//       value: '5+',
//       label: 'Years of Experience',
//       description: 'Expert knowledge in vending solutions',
//       icon: <Award size={24} className="text-[#FD5A1E]" aria-hidden="true" />
//     },
//     {
//       value: '50+',
//       label: 'Product Options',
//       description: 'Customizable selections for every workplace',
//       icon: <Users size={24} className="text-[#FD5A1E]" aria-hidden="true" />
//     },
//     {
//       value: '21.5"',
//       label: 'HD Touchscreen',
//       description: 'Premium technology for better experiences',
//       icon: <CheckCircle size={24} className="text-[#FD5A1E]" aria-hidden="true" />
//     },
//     {
//       value: '24/7',
//       label: 'Customer Support',
//       description: 'Always available when you need us',
//       icon: <Clock size={24} className="text-[#FD5A1E]" aria-hidden="true" />
//     }
//   ];

    
//   return (
//     <div>
//           {/* Company Stats */}
//         <section className="py-16 bg-[#111111]" aria-labelledby="company-stats-heading">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               className="text-center mb-12"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <h2 id="company-stats-heading" className="text-3xl font-bold text-[#F5F5F5] mb-4">
//                 Our Expertise & Capabilities
//               </h2>
//               <p className="text-[#A5ACAF] max-w-2xl mx-auto">
//                 Our commitment to excellence is reflected in our advanced technology and comprehensive service offerings
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//               {companyStats.map((stat, index) => (
//                 <motion.div
//                   key={stat.label}
//                   className="text-center p-6 bg-[#000000] rounded-xl border border-[#333333] hover:border-[#FD5A1E] transition-all"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   role="article"
//                   aria-label={`${stat.value} ${stat.label}: ${stat.description}`}
//                 >
//                   <div className="flex justify-center mb-4">
//                     {stat.icon}
//                   </div>
//                   <div className="text-3xl font-bold text-[#FD5A1E] mb-2">{stat.value}</div>
//                   <div className="text-[#F5F5F5] font-semibold mb-1">{stat.label}</div>
//                   <div className="text-[#A5ACAF] text-sm">{stat.description}</div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>
//     </div>
//   )
// }

// export default CompanyStats
      