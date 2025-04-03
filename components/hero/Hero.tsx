import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react'
 

/**
 * Hero section component for the landing page
 * Showcases the main value proposition of the vending machine solution
 */
const Hero = () => {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  const colorPattern = useMemo(() => {
    // Define your color classes
    const colors = [
      'bg-blue-500/60',
      'bg-green-500/60',
      'bg-red-500/60',
      'bg-yellow-500/60',
    ];
    
    // Create a fixed pattern - for example, rotating through the colors
    // This ensures server and client render the same colors
    const pattern = [];
    const rows = 6;
    const cols = 4;
    
    for (let i = 0; i < rows * cols; i++) {
      // Use a deterministic pattern instead of Math.random()
      // This example uses a simple rotation through the color array
      pattern.push(colors[i % colors.length]);
    }
    
    return pattern;
  }, []);

 


  return (
    <div className='min-h-screen'>
    <section 
      className="relative text-white py-20 lg:py-28" 
      aria-labelledby="hero-heading"
    >
       {/* Background image with Next.js Image */}
     <div className="absolute inset-0 z-0">
     <Image
      src="/images/vending-pic.jpg" // Ensure no spaces here
      alt="Vending Machine"
      width={1720}
      height={880} // You'll likely need to adjust the height as well
     aria-hidden="true"
      /> 
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
    </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-2 md:px-4 lg:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
        
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              State-of-the-Art Vending Machines
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Enhance the workplace experience with convenient access to snacks and beverages during breaks.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/proposal" 
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
              >
                View Proposal
              </a>
              <a 
                href="/contact" 
                className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Get Started
              </a>
            </div>
       
          
       {/* Main vending machine image */}
       <div className="relative">
            <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden shadow-2xl">
              {/* Replace the placeholder with an actual vending machine image*/} 
              <div className="relative w-full h-full">
                <Image
                  src="/images/vending.jpg" // Path to your image in the public folder
                  alt="Modern vending machine with touchscreen interface"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority // Loads the image immediately as it's above the fold
                  className="rounded-lg"
                />
            </div>
        </div> 

              {/* Feature highlight bubbles */}
              <div className="absolute -top-4 -left-4 bg-yellow-400 text-blue-900 rounded-full px-4 py-2 font-bold shadow-lg">
                5% Profit Sharing
              </div>
              <div className="absolute -bottom-4 -right-0 mr-8 bg-green-500 text-white rounded-full px-4 py-2 font-bold shadow-lg">
                Zero Upfront Cost
              </div>
            </div>
          </div>
        </div>
        
        {/* Key benefits summary */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto px-8 sm:px-2 md:px-4 lg:px-6">
          {[
            {
              title: 'Advanced Features',
              description: '21.5" touchscreen with diverse payment options including credit card, mobile, and cash',
            },
            {
              title: 'Custom Selection',
              description: 'Over 50 snack and drink options tailored to employee preferences',
            },
            {
              title: 'Zero Maintenance',
              description: 'We handle all restocking, maintenance, and servicing at no cost to you',
            },
          ].map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-blue-100">{benefit.description}</p>
            </div>
          ))}
          </section>
          </section>
        </div>
  );
};


export default Hero;


// 'use client';

// import Link from 'next/link';
// import Button from '../ui/Button';
// import Image from 'next/image';
// import { useState, useEffect } from 'react'
 

// /**
//  * Hero section component for the landing page
//  * Showcases the main value proposition of the vending machine solution
//  */
// const Hero = () => {
//   const [isClient, setIsClient] = useState(false)
 
//   useEffect(() => {
//     setIsClient(true)
//   }, [])

  
 


//   return (
//     <section className="relative overflow-hidden min-h-[600px]" aria-labelledby="hero-heading">
//       <h1>{isClient ? 'This is never prerendered' : 'Prerendered'}</h1>
//     {/* Background image with Next.js Image */}
//     <div className="absolute inset-0 z-0">
//       <Image
//         src="/images/Hero-Vending.jpg"
//         alt=""
//         fill
//         priority
//         quality={85}
//         sizes="100vw"
//         style={{ objectFit: 'cover', objectPosition: 'center' }}
//         aria-hidden="true"
//       />
//       {/* Overlay for better text visibility */}
//       <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
//     </div>

//     <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
//         <div className="grid md:grid-cols-12 gap-12 items-center">
//           <div className="md:col-span-7 lg:col-span-6 text-white">
//             <h1 
//               id="hero-heading" 
//               className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
//             >
//               State-of-the-Art<br />
//               <span className="text-blue-200">Vending Machines</span>
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light leading-relaxed">
//               Enhance the workplace experience with convenient access to refreshments during breaks. No upfront costs with our revenue-sharing model.
//             </p>
//             <div className="flex flex-wrap gap-4 text-lg">
//               <Button 
//                 as={Link} 
//                 href="/proposal" 
//                 size="lg"
//                 variant="light"
//                 className="bg-white px-4 rounded-lg text-blue-600 hover:bg-blue-50"
//               >
//                 View Proposal
//               </Button>
//               <Button 
//                 as={Link} 
//                 href="/contact" 
//                 size="lg"
//                 variant="outline"
//                 className="border-white text-white hover:bg-white/10"
//               >
//                 Get Started
//               </Button>
//             </div>
            
//             {/* Key benefits tags */}
//             <div className="mt-12 flex flex-wrap gap-3">
//               {[
//                 '5% Profit Sharing', 
//                 'Zero Upfront Cost', 
//                 'Full Maintenance',
//                 'Custom Selection'
//               ].map((benefit, index) => (
//                 <span 
//                   key={index} 
//                   className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-800/50 text-blue-100 backdrop-blur-sm"
//                 >
//                   {benefit}
//                 </span>
//               ))}
//             </div>
//           </div>
          
//           <div className="md:col-span-5 lg:col-span-6">
//             <div className="relative">
//               {/* Main vending machine image */}
//               <div className="relative">
//             <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden shadow-2xl">
//               {/* Replace the placeholder with an actual vending machine image */}
//               <div className="relative w-full h-full">
//                 <Image
//                   src="/images/vending-machine.jpg" // Path to your image in the public folder
//                   alt="Modern vending machine with touchscreen interface"
//                   fill
//                   style={{ objectFit: 'cover' }}
//                   priority // Loads the image immediately as it's above the fold
//                   className="rounded-lg"
//                 />
//               </div>
//             </div>
//                 <div className="absolute inset-0 flex flex-col">
//                   {/* Machine screen */}
//                   <div className="mx-6 mt-6 mb-2 h-24 bg-blue-400/30 rounded-lg flex items-center justify-center">
//                     <div className="text-white text-lg font-medium">AMP Vending</div>
//                   </div>
                  
//                   {/* Product rows */}
//                   {[...Array(6)].map((_, rowIndex) => (
//                     <div key={rowIndex} className="flex-1 mx-6 mb-2 grid grid-cols-4 gap-2">
//                       {[...Array(4)].map((_, colIndex) => {
//                         const colors = ['bg-red-500/60', 'bg-green-500/60', 'bg-yellow-500/60', 'bg-blue-500/60'];
//                         const randomColor = colors[Math.floor(Math.random() * colors.length)];
//                         return (
//                           <div key={colIndex} className={`rounded ${randomColor} flex items-center justify-center`}>
//                             <div className="w-4 h-4 bg-white/30 rounded-sm"></div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   ))}
                  
//                   {/* Machine bottom */}
//                   <div className="h-20 mx-6 mb-6 bg-gray-700/50 rounded-lg flex items-center justify-center">
//                     <div className="w-20 h-8 bg-gray-600/80 rounded"></div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Decorative elements */}
//               <div className="absolute top-1/4 -left-8 w-16 h-16 bg-yellow-400 rounded-full blur-xl opacity-70"></div>
//               <div className="absolute bottom-1/3 -right-10 w-20 h-20 bg-blue-400 rounded-full blur-xl opacity-70"></div>
              
//               {/* Feature highlight bubbles */}
//               <div className="absolute -top-4 -left-4 bg-yellow-400 text-blue-900 rounded-full px-4 py-2 font-bold shadow-lg transform -rotate-6">
//                 5% Profit Sharing
//               </div>
//               <div className="absolute -bottom-4 -right-4 bg-green-500 text-white rounded-full px-4 py-2 font-bold shadow-lg transform rotate-3">
//                 Zero Upfront Cost
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;