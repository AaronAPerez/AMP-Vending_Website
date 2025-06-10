// 'use client';

// import { motion } from 'framer-motion'
// import { Users } from 'lucide-react';
// import React from 'react'


// /**
//  * Team Member Interface
//  */
// interface TeamMember {
//   name: string;
//   title: string;
//   bio: string;
//   image: string;
//   expertise: string[];
// }


// const TeamSection = () => {

//      // Team members (you can expand this based on actual team)
//   const teamMembers: TeamMember[] = [
//     {
//       name: 'Andrew Perez',
//       title: 'Founder & CEO',
//       bio: 'With extensive experience in business operations and customer service, Andrew founded AMP Vending to bring premium workplace solutions to Central California businesses.',
//       image: '/images/team/andrew-perez.jpg',
//       expertise: [
//         'Business Development',
//         'Customer Relations',
//         'Strategic Planning',
//         'Operations Management'
//       ]
//     }
//     // Add more team members as needed
//   ];

//   return (
//     <div>        
//         {/* Team Section */}
//          <section className="py-16" aria-labelledby="team-heading">
//            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//              <motion.div
//               className="text-center mb-16"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <h2 id="team-heading" className="text-3xl font-bold text-[#F5F5F5] mb-4">
//                 Meet Our Team
//               </h2>
//               <p className="text-[#A5ACAF] max-w-3xl mx-auto">
//                 Dedicated professionals committed to delivering exceptional vending solutions and service
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {teamMembers.map((member, index) => (
//                 <motion.div
//                   key={member.name}
//                   className="bg-[#111111] rounded-xl overflow-hidden border border-[#333333] hover:border-[#FD5A1E] transition-all"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   role="article"
//                   aria-labelledby={`team-member-${index}-name`}
//                 >
//                   <div className="relative h-64 bg-[#4d4d4d] flex items-center justify-center">
//                     {/* Placeholder for team member photo */}
//                     <div className="w-24 h-24 bg-[#FD5A1E]/20 rounded-full flex items-center justify-center">
//                       <Users size={48} className="text-[#FD5A1E]" aria-hidden="true" />
//                     </div>
//                     {/* When you have actual photos, replace the above with:
//                     <Image
//                       src={member.image}
//                       alt={`${member.name}, ${member.title} at AMP Vending`}
//                       fill
//                       className="object-cover"
//                     />
//                     */}
//                   </div>
                  
//                   <div className="p-6">
//                     <h3 id={`team-member-${index}-name`} className="text-xl font-bold text-[#F5F5F5] mb-1">
//                       {member.name}
//                     </h3>
//                     <p className="text-[#FD5A1E] font-medium mb-4">{member.title}</p>
//                     <p className="text-[#A5ACAF] text-sm mb-4 leading-relaxed">{member.bio}</p>
                    
//                     <div>
//                       <h4 className="text-[#F5F5F5] font-semibold mb-2 text-sm">Expertise:</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {member.expertise.map((skill, skillIndex) => (
//                           <span
//                             key={skillIndex}
//                             className="px-2 py-1 bg-[#FD5A1E]/10 text-[#FD5A1E] text-xs rounded-full"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//     </div>
//   )
// }

// export default TeamSection