// import Image from 'next/image';
// import React, { useState, useCallback, useRef, useEffect } from 'react';

// interface CompareProps {
//   beforeImage: string;
//   afterImage: string;
//   beforeAlt: string;
//   afterAlt: string;
//   aspectRatio?: string;
// }

// const Compare: React.FC<CompareProps> = ({
//   beforeImage,
//   afterImage,
//   beforeAlt,
//   afterAlt,
//   aspectRatio = "16/9"
// }) => {
//   const [position, setPosition] = useState(50);
//   const [isDragging, setIsDragging] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
  
//   // Functions to handle dragging state
//   const handleStart = useCallback((clientX?: number) => {
//       setIsDragging(true);
//       // If you need to use clientX for initial position tracking
//       // you can now do so here
//       if (clientX !== undefined) {
//         // Handle clientX if needed
//       }
//     }, []);
  
//   const handleEnd = useCallback(() => {
//     setIsDragging(false);
//   }, []);
  
//   // Handle movement when dragging
//   const handleMove = useCallback(
//     (clientX: number) => {
//       if (!isDragging || !containerRef.current) return;
      
//       const rect = containerRef.current.getBoundingClientRect();
//       const containerWidth = rect.width;
//       const offsetX = clientX - rect.left;
      
//       // Calculate percentage position
//       let newPosition = (offsetX / containerWidth) * 100;
      
//       // Clamp value between 0 and 100
//       newPosition = Math.max(0, Math.min(100, newPosition));
      
//       // Update position state
//       setPosition(newPosition);
//     },
//     [isDragging]
//   );
  
//   // Mouse event handlers
//   const handleMouseDown = useCallback(
//     (e: React.MouseEvent) => handleStart(e.clientX),
//     [handleStart]
//   );
  
//   const handleMouseUp = useCallback(
//     () => handleEnd(),
//     [handleEnd]
//   );
  
//   const handleMouseMove = useCallback(
//     (e: React.MouseEvent) => handleMove(e.clientX),
//     [handleMove]
//   );
  
//   // Touch event handlers
//   const handleTouchStart = useCallback(
//     (e: React.TouchEvent) => {
//       const touch = e.touches[0];
//       handleStart(touch.clientX);
//     },
//     [handleStart]
//   );
  
//   const handleTouchEnd = useCallback(
//     () => handleEnd(),
//     [handleEnd]
//   );
  
//   const handleTouchMove = useCallback(
//     (e: React.TouchEvent) => {
//       const touch = e.touches[0];
//       handleMove(touch.clientX);
//     },
//     [handleMove]
//   );
  
//   // Add and remove global event listeners
//   useEffect(() => {
//     if (isDragging) {
//       // Add global mouse/touch event listeners when dragging
//       document.addEventListener('mousemove', handleMouseMoveGlobal);
//       document.addEventListener('mouseup', handleMouseUp);
//       document.addEventListener('touchmove', handleTouchMoveGlobal);
//       document.addEventListener('touchend', handleTouchEnd);
//     }
    
//     return () => {
//       // Clean up event listeners
//       document.removeEventListener('mousemove', handleMouseMoveGlobal);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.removeEventListener('touchmove', handleTouchMoveGlobal);
//       document.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [isDragging, handleMouseUp, handleTouchEnd]);
  
//   // Global event handlers (outside component)
//   const handleMouseMoveGlobal = (e: MouseEvent) => {
//     handleMove(e.clientX);
//   };
  
//   const handleTouchMoveGlobal = (e: TouchEvent) => {
//     const touch = e.touches[0];
//     handleMove(touch.clientX);
//   };

//   return (
//     <div 
//       ref={containerRef}
//       className="relative overflow-hidden rounded-lg border border-[#4d4d4d]"
//       style={{ aspectRatio }}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       {/* After image (background) */}
//       <div className="absolute inset-0 w-full h-full">
//         <Image
//           src={afterImage} 
//           alt={afterAlt}
//           className="object-cover w-full h-full"
//         />
//       </div>
      
//       {/* Before image (foreground with clip) */}
//       <div 
//         className="absolute inset-0 overflow-hidden"
//         style={{ width: `${position}%` }}
//       >
//         <Image
//           src={beforeImage} 
//           alt={beforeAlt}
//           className="object-cover w-full h-full"
//         />
//       </div>
      
//       {/* Slider control */}
//       <div 
//         className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-10"
//         style={{ left: `${position}%` }}
//       >
//         <div className="absolute w-8 h-8 bg-white rounded-full -ml-4 top-1/2 -mt-4 flex items-center justify-center shadow-md">
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             className="h-5 w-5 text-[#000000]" 
//             fill="none" 
//             viewBox="0 0 24 24" 
//             stroke="currentColor"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth={2} 
//               d="M8 7h8M8 12h8M8 17h8" 
//             />
//           </svg>
//         </div>
//       </div>
      
//       {/* Labels */}
//       <div className="absolute bottom-4 left-4 bg-[#000000]/70 text-[#F5F5F5] px-3 py-1 rounded-full text-sm">
//         Before
//       </div>
//       <div className="absolute bottom-4 right-4 bg-[#000000]/70 text-[#F5F5F5] px-3 py-1 rounded-full text-sm">
//         After
//       </div>
//     </div>
//   );
// };

// export default Compare;