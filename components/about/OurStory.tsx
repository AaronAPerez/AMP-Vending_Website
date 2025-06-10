// import { motion } from 'framer-motion'
// import { Star } from 'lucide-react'
// import React from 'react'

// const OurStory = () => {
//   return (
//     <div>
//         {/* Our Story Section */}
//         <section className="py-16" aria-labelledby="our-story-heading">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <h2 id="our-story-heading" className="text-3xl font-bold text-[#F5F5F5] mb-6">
//                   Our Story
//                 </h2>
//                 <div className="space-y-4 text-[#A5ACAF] leading-relaxed">
//                   <p>
//                     AMP Vending was founded with a simple but powerful vision: to transform workplace 
//                     refreshment experiences through innovative vending technology and exceptional service. 
//                     What started as a recognition of the outdated vending solutions in many workplaces 
//                     has evolved into a comprehensive service offering that puts customer satisfaction first.
//                   </p>
//                   <p>
//                     Based in Modesto, California, we've built our reputation by focusing on quality over quantity. 
//                     Every consultation reflects our commitment to understanding unique workplace needs and 
//                     providing customized solutions. We believe that exceptional service begins with listening 
//                     to our clients and designing solutions that enhance employee satisfaction and workplace productivity.
//                   </p>
//                   <p>
//                     Today, AMP Vending brings cutting-edge vending technology and genuine partnership to Central 
//                     California businesses. Our approach emphasizes building long-term relationships based on trust, 
//                     reliability, and continuous innovation in workplace vending solutions.
//                   </p>
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//               >
//                 <div className="relative">
//                   <div className="bg-[#111111] rounded-2xl p-8 border border-[#333333]">
//                     <h3 className="text-xl font-bold text-[#F5F5F5] mb-6">Our Mission</h3>
//                     <blockquote className="text-[#A5ACAF] italic text-lg leading-relaxed mb-6">
//                       "To enhance workplace satisfaction and productivity by providing premium vending 
//                       solutions that combine cutting-edge technology with reliable, professional service."
//                     </blockquote>
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <div className="text-[#F5F5F5] font-semibold">Andrew Perez</div>
//                         <div className="text-[#FD5A1E] text-sm">Founder & CEO</div>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         {[...Array(5)].map((_, i) => (
//                           <Star key={i} size={16} className="text-[#FD5A1E] fill-current" aria-hidden="true" />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//     </div>
//   )
// }

// export default OurStory