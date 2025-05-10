// import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
// import React from 'react'

// // Helper components 
// const HeroHighlight = ({ children, className = "", containerClassName = "" }) => {
//     const mouseX = useMotionValue(0);
//     const mouseY = useMotionValue(0);
    
//     function handleMouseMove({ currentTarget, clientX, clientY }) {
//       const { left, top } = currentTarget.getBoundingClientRect();
//       mouseX.set(clientX - left);
//       mouseY.set(clientY - top);
//     }
    
//     return (
//       <div 
//         className={`relative overflow-hidden rounded-xl border border-[#4d4d4d] bg-[#000000] ${containerClassName}`}
//         onMouseMove={handleMouseMove}
//       >
//         <motion.div 
//           className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
//           style={{
//             background: useMotionTemplate`
//               radial-gradient(
//                 650px circle at ${mouseX}px ${mouseY}px,
//                 rgba(253, 90, 30, 0.15),
//                 transparent 80%
//               )
//             `,
//           }}
//         />
//         <div className={className}>{children}</div>
//       </div>
//     );
//   };
  

// export default HeroHighlight