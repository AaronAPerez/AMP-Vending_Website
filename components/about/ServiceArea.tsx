// import { SEO_CONSTANTS } from '@/lib/data/seoData'
// import { motion } from 'framer-motion'
// import { MapPin, Phone, Mail } from 'lucide-react'
// import React from 'react'

// const ServiceArea = () => {
//   return (
//     <div>
        
//          {/* Service Area */}
//          <section className="py-16 bg-[#111111]" aria-labelledby="service-area-heading">
//            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//              <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <h2 id="service-area-heading" className="text-3xl font-bold text-[#F5F5F5] mb-6">
//                   Proudly Serving{' '}
//                   <span className="text-[#FD5A1E]">Central California</span>
//                 </h2>
//                 <p className="text-[#A5ACAF] mb-6 leading-relaxed">
//                   Based in Modesto, we provide comprehensive vending solutions throughout the Central Valley. 
//                   Our local presence ensures rapid response times and personalized service for all our clients.
//                 </p>
                
//                 <div className="grid grid-cols-2 gap-4 mb-8">
//                   {SEO_CONSTANTS.PRIMARY_CITIES.slice(0, 6).map((city) => (
//                     <div key={city} className="flex items-center space-x-2">
//                       <MapPin size={16} className="text-[#FD5A1E] flex-shrink-0" aria-hidden="true" />
//                       <span className="text-[#F5F5F5] text-sm">{city}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="bg-[#000000] rounded-xl p-6 border border-[#333333]">
//                   <h3 className="text-[#F5F5F5] font-bold mb-4">Contact Information</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center space-x-3">
//                       <Phone size={16} className="text-[#FD5A1E]" aria-hidden="true" />
//                       <a 
//                         href={`tel:${SEO_CONSTANTS.PHONE}`}
//                         className="text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors"
//                         aria-label={`Call us at ${SEO_CONSTANTS.PHONE_DISPLAY}`}
//                       >
//                         {SEO_CONSTANTS.PHONE_DISPLAY}
//                       </a>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <Mail size={16} className="text-[#FD5A1E]" aria-hidden="true" />
//                       <a 
//                         href={`mailto:${SEO_CONSTANTS.EMAIL}`}
//                         className="text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors break-all"
//                         aria-label={`Email us at ${SEO_CONSTANTS.EMAIL}`}
//                       >
//                         {SEO_CONSTANTS.EMAIL}
//                       </a>
//                     </div>
//                     <div className="flex items-start space-x-3">
//                       <MapPin size={16} className="text-[#FD5A1E] mt-0.5 flex-shrink-0" aria-hidden="true" />
//                       <div className="text-[#A5ACAF]">
//                         <div>{SEO_CONSTANTS.ADDRESS.STREET}</div>
//                         <div>{SEO_CONSTANTS.ADDRESS.CITY}, {SEO_CONSTANTS.ADDRESS.STATE} {SEO_CONSTANTS.ADDRESS.ZIP}</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//               >
//                 <div className="relative">
//                   <div className="bg-[#000000] rounded-2xl p-8 border border-[#333333] text-center">
//                     <div className="w-24 h-24 bg-[#FD5A1E]/20 rounded-full flex items-center justify-center mx-auto mb-6">
//                       <MapPin size={48} className="text-[#FD5A1E]" aria-hidden="true" />
//                     </div>
//                     <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
//                       Local Expertise, Professional Service
//                     </h3>
//                     <p className="text-[#A5ACAF] mb-6">
//                       Our Central California presence means faster response times, local market knowledge, 
//                       and personalized service that larger corporations simply cannot match.
//                     </p>
                    
//                     <div className="grid grid-cols-2 gap-4 text-center">
//                       <div className="bg-[#111111] rounded-lg p-4">
//                         <div className="text-2xl font-bold text-[#FD5A1E] mb-1">50+</div>
//                         <div className="text-[#A5ACAF] text-sm">Mile Service Radius</div>
//                       </div>
//                       <div className="bg-[#111111] rounded-lg p-4">
//                         <div className="text-2xl font-bold text-[#FD5A1E] mb-1">24hr</div>
//                         <div className="text-[#A5ACAF] text-sm">Response Time</div>
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

// export default ServiceArea