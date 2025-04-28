// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import { 
//   Card, 
//   CardContent 
// } from '@/components/ui/card';

// // Define the testimonial type
// interface Testimonial {
//   id: string;
//   quote: string;
//   author: string;
//   position: string;
//   company: string;
//   image?: string;
//   rating: number;
//   category: 'office' | 'manufacturing' | 'healthcare' | 'education' | 'retail' | 'transportation';
//   machineType?: string;
//   location?: string;
// }

// // Props for the testimonial showcase
// interface TestimonialShowcaseProps {
//   title?: string;
//   description?: string;
//   filterByCategory?: boolean;
// }

// /**
//  * Testimonial Showcase Component
//  * 
//  * Displays customer testimonials with filtering capabilities
//  * and a responsive design to build trust with potential clients.
//  */
// const TestimonialShowcase: React.FC<TestimonialShowcaseProps> = ({
//   title = "What Our Clients Say",
//   description = "Hear from businesses throughout Central California who are enjoying the benefits of AMP Vending solutions",
//   filterByCategory = true
// }) => {
//   // State for testimonials
//   const [activeTestimonial, setActiveTestimonial] = useState(0);
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');
//   const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const testimonialRef = useRef<HTMLDivElement>(null);

//   // Sample testimonial data
//   const testimonials: Testimonial[] = [
//     {
//       id: 'test1',
//       quote: "Since installing AMP vending machines, our employees are happier and more productive. Having 24/7 access to quality refreshments has been a game-changer, and the revenue sharing provides a nice bonus to our office budget.",
//       author: "Sarah Johnson",
//       position: "Office Manager",
//       company: "TechNova Solutions",
//       rating: 5,
//       category: 'office',
//       machineType: "Premium Combo Machine",
//       location: "Modesto"
//     },
//     {
//       id: 'test2',
//       quote: "The advanced payment options and touchscreen interface make these machines a perfect fit for our manufacturing facility. Our workers appreciate the variety of energy drinks and healthy options during shift changes.",
//       author: "Michael Rodriguez",
//       position: "Facility Director",
//       company: "Precision Manufacturing Inc.",
//       rating: 5,
//       category: 'manufacturing',
//       machineType: "Snack Deluxe Machine & Beverage Pro Machine",
//       location: "Stockton"
//     },
//     {
//       id: 'test3',
//       quote: "Our hospital staff works around the clock, and having reliable, well-stocked vending machines has been essential. The healthy options and fresh food selections align perfectly with our wellness initiatives.",
//       author: "Dr. Emily Chen",
//       position: "Administrative Director",
//       company: "Central Valley Medical Center",
//       rating: 5,
//       category: 'healthcare',
//       machineType: "Health Focus Machine",
//       location: "Turlock"
//     },
//     {
//       id: 'test4',
//       quote: "The students and faculty love the modern machines with touchscreen interfaces. The service has been exceptional, and the machines are always fully stocked with a great variety of options.",
//       author: "Robert Williams",
//       position: "Campus Services Director",
//       company: "Valley Community College",
//       rating: 4,
//       category: 'education',
//       machineType: "Premium Combo Machine",
//       location: "Merced"
//     },
//     {
//       id: 'test5',
//       quote: "Our transit center serves thousands of travelers daily, and the AMP vending machines have become a reliable amenity. The 24/7 availability and diverse product options meet the needs of our diverse customer base.",
//       author: "Jennifer Martinez",
//       position: "Operations Manager",
//       company: "Central Transit Authority",
//       rating: 5,
//       category: 'transportation',
//       machineType: "Premium Combo Machine",
//       location: "Modesto"
//     },
//     {
//       id: 'test6',
//       quote: "We've tried other vending companies in the past, but AMP Vending's zero-cost model and revenue sharing make it a no-brainer. The machines look professional and enhance our retail environment.",
//       author: "David Thompson",
//       position: "Store Manager",
//       company: "Urban Outfitters",
//       rating: 5,
//       category: 'retail',
//       machineType: "Compact Combo Machine",
//       location: "Tracy"
//     },
//     {
//       id: 'test7',
//       quote: "The maintenance-free aspect of AMP's service is what impressed us most. We never have to worry about restocking or repairs - they handle everything professionally and promptly.",
//       author: "Amanda Nguyen",
//       position: "HR Director",
//       company: "Integrated Systems",
//       rating: 5,
//       category: 'office',
//       machineType: "Snack Deluxe Machine",
//       location: "Lodi"
//     },
//     {
//       id: 'test8',
//       quote: "Our hospital cafeteria closes at night, but our staff still needs access to food and beverages. The AMP vending machines have filled this gap perfectly with their healthy options and reliable service.",
//       author: "James Wilson",
//       position: "Night Shift Supervisor",
//       company: "Mercy Hospital",
//       rating: 4,
//       category: 'healthcare',
//       machineType: "Health Focus Machine",
//       location: "Manteca"
//     }
//   ];

//   // Categories for filtering
//   const categories = [
//     { id: 'all', name: 'All Categories' },
//     { id: 'office', name: 'Office Spaces' },
//     { id: 'manufacturing', name: 'Manufacturing' },
//     { id: 'healthcare', name: 'Healthcare' },
//     { id: 'education', name: 'Education' },
//     { id: 'retail', name: 'Retail' },
//     { id: 'transportation', name: 'Transportation' }
//   ];
  
//   // Filter testimonials when category changes
//   useEffect(() => {
//     if (selectedCategory === 'all') {
//       setFilteredTestimonials(testimonials);
//     } else {
//       setFilteredTestimonials(
//         testimonials.filter(t => t.category === selectedCategory)
//       );
//     }
//     // Reset to first testimonial when changing categories
//     setActiveTestimonial(0);
//   }, [selectedCategory]);

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isAnimating) {
//         navigateTestimonial('next');
//       }
//     }, 8000);
    
//     return () => clearInterval(interval);
//   }, [activeTestimonial, filteredTestimonials, isAnimating]);

//   // Initialize filtered testimonials
//   useEffect(() => {
//     setFilteredTestimonials(testimonials);
//   }, []);

//   // Handle testimonial navigation
//   const navigateTestimonial = (direction: 'prev' | 'next') => {
//     if (filteredTestimonials.length <= 1) return;
    
//     setIsAnimating(true);
    
//     if (direction === 'next') {
//       setActiveTestimonial(
//         (prev) => (prev + 1) % filteredTestimonials.length
//       );
//     } else {
//       setActiveTestimonial(
//         (prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length
//       );
//     }
    
//     // Reset animation flag after transition
//     setTimeout(() => {
//       setIsAnimating(false);
//     }, 500);
//   };

//   // Render star rating
//   const renderStarRating = (rating: number) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <svg 
//           key={i} 
//           xmlns="http://www.w3.org/2000/svg" 
//           viewBox="0 0 24 24" 
//           fill={i <= rating ? '#FD5A1E' : '#4d4d4d'}
//           className="w-5 h-5" 
//           aria-hidden="true"
//         >
//           <path 
//             fillRule="evenodd" 
//             d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
//             clipRule="evenodd" 
//           />
//         </svg>
//       );
//     }
//     return (
//       <div className="flex" aria-label={`Rated ${rating} out of 5 stars`}>
//         {stars}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#000000]">
//       {/* Section Header */}
//       <div className="text-center mb-10">
//         <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
//           {title}
//         </h2>
//         <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
//           {description}
//         </p>
//       </div>
      
//       {/* Category Filters */}
//       {filterByCategory && (
//         <div className="flex flex-wrap justify-center gap-3 mb-12">
//           {categories.map((category) => (
//             <Button 
//               key={category.id} 
//               variant={selectedCategory === category.id ? "default" : "outline"} 
//               onClick={() => setSelectedCategory(category.id)}
//               className={`
//                 rounded-full px-4 py-2 
//                 ${selectedCategory === category.id 
//                   ? 'bg-[#FD5A1E] text-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#000000]' 
//                   : 'border-[#4d4d4d] text-[#A5ACAF] hover:bg-[#4d4d4d] hover:text-[#F5F5F5] hover:border-[#4d4d4d]'}
//               `}
//               aria-pressed={selectedCategory === category.id}
//             >
//               {category.name}
//             </Button>
//           ))}
//         </div>
//       )}
      
//       {/* Testimonial Display */}
//       <div className="relative">
//         {filteredTestimonials.length > 0 ? (
//           <>
//             {/* Current Testimonial */}
//             <div 
//               ref={testimonialRef}
//               className="transition-opacity duration-500"
//               aria-live="polite"
//               role="region"
//               aria-label="Customer testimonial"
//             >
//               <Card className="bg-[#4d4d4d] border-[#a4acac] text-[#F5F5F5] shadow-xl max-w-4xl mx-auto">
//                 <CardContent className="p-8">
//                   {/* Quote */}
//                   <div className="mb-6 relative">
//                     <svg 
//                       className="absolute -top-6 -left-6 h-12 w-12 text-[#FD5A1E]/20" 
//                       viewBox="0 0 24 24" 
//                       fill="currentColor" 
//                       aria-hidden="true"
//                     >
//                       <path 
//                         fillRule="evenodd" 
//                         d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm9 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4.5 1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM7.5 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4.5 1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" 
//                         clipRule="evenodd" 
//                       />
//                     </svg>
//                     <blockquote className="text-xl italic text-[#F5F5F5] leading-relaxed relative z-10">
//                       "{filteredTestimonials[activeTestimonial].quote}"
//                     </blockquote>
//                   </div>
                  
//                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                     {/* Author Info */}
//                     <div className="flex items-center">
//                       {filteredTestimonials[activeTestimonial].image ? (
//                         <div className="mr-4 h-14 w-14 relative rounded-full overflow-hidden">
//                           <Image 
//                             src={filteredTestimonials[activeTestimonial].image}
//                             alt={filteredTestimonials[activeTestimonial].author}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>
//                       ) : (
//                         <div className="mr-4 h-14 w-14 bg-[#FD5A1E] rounded-full flex items-center justify-center text-[#F5F5F5] font-bold text-lg">
//                           {filteredTestimonials[activeTestimonial].author.split(' ').map(name => name[0]).join('')}
//                         </div>
//                       )}
//                       <div>
//                         <p className="font-bold text-[#F5F5F5]">
//                           {filteredTestimonials[activeTestimonial].author}
//                         </p>
//                         <p className="text-[#A5ACAF] text-sm">
//                           {filteredTestimonials[activeTestimonial].position}
//                         </p>
//                         <p className="text-[#A5ACAF] text-sm">
//                           {filteredTestimonials[activeTestimonial].company}
//                         </p>
//                       </div>
//                     </div>
                    
//                     {/* Additional Info */}
//                     <div className="space-y-1">
//                       {/* Star Rating */}
//                       <div className="flex items-center justify-end">
//                         {renderStarRating(filteredTestimonials[activeTestimonial].rating)}
//                       </div>
                      
//                       {/* Machine Type */}
//                       {filteredTestimonials[activeTestimonial].machineType && (
//                         <p className="text-[#A5ACAF] text-sm text-right">
//                           Using: <span className="text-[#FD5A1E]">{filteredTestimonials[activeTestimonial].machineType}</span>
//                         </p>
//                       )}
                      
//                       {/* Location */}
//                       {filteredTestimonials[activeTestimonial].location && (
//                         <p className="text-[#A5ACAF] text-sm text-right">
//                           Location: {filteredTestimonials[activeTestimonial].location}, CA
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
              
//               {/* Navigation Indicators */}
//               {filteredTestimonials.length > 1 && (
//                 <div className="flex justify-center mt-6 space-x-2">
//                   {filteredTestimonials.map((_, index) => (
//                     <button
//                       key={index}
//                       className={`h-2 w-2 rounded-full ${
//                         index === activeTestimonial ? 'bg-[#FD5A1E]' : 'bg-[#4d4d4d]'
//                       }`}
//                       onClick={() => setActiveTestimonial(index)}
//                       aria-label={`Go to testimonial ${index + 1}`}
//                       aria-current={index === activeTestimonial ? 'true' : 'false'}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
            
//             {/* Navigation Buttons */}
//             {filteredTestimonials.length > 1 && (
//               <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between pointer-events-none">
//                 <Button
//                   onClick={() => navigateTestimonial('prev')}
//                   className="bg-[#000000]/40 hover:bg-[#000000]/60 text-[#F5F5F5] h-10 w-10 rounded-full flex items-center justify-center pointer-events-auto"
//                   aria-label="Previous testimonial"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </Button>
//                 <Button
//                   onClick={() => navigateTestimonial('next')}
//                   className="bg-[#000000]/40 hover:bg-[#000000]/60 text-[#F5F5F5] h-10 w-10 rounded-full flex items-center justify-center pointer-events-auto"
//                   aria-label="Next testimonial"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </Button>
//               </div>
//             )}
//           </>
//         ) : (
//           // No testimonials for selected category
//           <div className="bg-[#4d4d4d] rounded-lg p-8 text-center">
//             <p className="text-[#F5F5F5]">No testimonials available for this category.</p>
//             <Button 
//               onClick={() => setSelectedCategory('all')}
//               className="mt-4 bg-[#FD5A1E] text-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#000000]"
//             >
//               View All Testimonials
//             </Button>
//           </div>
//         )}
//       </div>
      
//       {/* CTA Section */}
//       <div className="mt-16 text-center">
//         <h3 className="text-2xl font-bold text-[#F5F5F5] mb-4">
//           Join Our Satisfied Clients
//         </h3>
//         <p className="text-[#A5ACAF] max-w-2xl mx-auto mb-6">
//           Experience the same benefits these businesses are enjoying with AMP Vending's premium solutions. Zero upfront costs, quality products, and exceptional service.
//         </p>
//         <Button 
//           onClick={() => window.location.href = '/contact'}
//           className="bg-[#FD5A1E] text-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#000000] px-6 py-3 rounded-full text-lg"
//         >
//           Schedule Your Free Consultation
//         </Button>
//       </div>
      
//       {/* Trust Indicators */}
//       <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
//         <div className="flex flex-col items-center">
//           <div className="text-[#FD5A1E] mb-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//           </div>
//           <p className="text-3xl font-bold text-[#F5F5F5]">50+</p>
//           <p className="text-[#A5ACAF] text-center">Happy Clients</p>
//         </div>
//         <div className="flex flex-col items-center">
//           <div className="text-[#FD5A1E] mb-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//           </div>
//           <p className="text-3xl font-bold text-[#F5F5F5]">7+</p>
//           <p className="text-[#A5ACAF] text-center">Service Areas</p>
//         </div>
//         <div className="flex flex-col items-center">
//           <div className="text-[#FD5A1E] mb-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
//             </svg>
//           </div>
//           <p className="text-3xl font-bold text-[#F5F5F5]">97%</p>
//           <p className="text-[#A5ACAF] text-center">Satisfaction Rate</p>
//         </div>
//         <div className="flex flex-col items-center">
//           <div className="text-[#FD5A1E] mb-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <p className="text-3xl font-bold text-[#F5F5F5]">$0</p>
//           <p className="text-[#A5ACAF] text-center">Upfront Cost</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestimonialShowcase;