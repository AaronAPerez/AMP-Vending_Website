// /**
//  * ProductImage Component
//  * 
//  * A reusable component for displaying product images with consistent sizing,
//  * optimization, and fallback handling. Ensures all Next.js Image requirements
//  * are met while providing a clean API for product displays.
//  */

// import Image from 'next/image';
// import { useState } from 'react';

// /**
//  * Props interface for ProductImage component
//  */
// interface ProductImageProps {
//   /** Image source path */
//   src: string;
//   /** Alt text for accessibility */
//   alt: string;
//   /** Custom width - defaults to standard product image size */
//   width?: number;
//   /** Custom height - defaults to standard product image size */
//   height?: number;
//   /** Additional CSS classes */
//   className?: string;
//   /** Image priority for above-the-fold content */
//   priority?: boolean;
//   /** Custom sizes attribute for responsive images */
//   sizes?: string;
//   /** Loading strategy */
//   loading?: 'lazy' | 'eager';
//   /** Quality setting (1-100) */
//   quality?: number;
//   /** Fallback image if main image fails to load */
//   fallbackSrc?: string;
//   /** Click handler for interactive images */
//   onClick?: () => void;
// }

// /**
//  * ProductImage Component
//  * 
//  * Handles product image display with Next.js optimization, fallback support,
//  * and consistent sizing across the application.
//  * 
//  * @param props - ProductImage configuration
//  */
// export default function ProductImage({
//   src,
//   alt,
//   width = 30,
//   height = 30,
//   className = '',
//   priority = false,
//   sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
//   loading = 'lazy',
//   quality = 85,
//   fallbackSrc = '/images/products/placeholder.jpg',
//   onClick,
// }: ProductImageProps) {
//   const [imgSrc, setImgSrc] = useState(src);
//   const [hasError, setHasError] = useState(false);

//   /**
//    * Handle image load errors by switching to fallback
//    */
//   const handleError = () => {
//     if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
//       setHasError(true);
//       setImgSrc(fallbackSrc);
//     }
//   };

//   /**
//    * Handle image load success to reset error state
//    */
//   const handleLoad = () => {
//     setHasError(false);
//   };

//   // Combine default classes with custom classes
//   const imageClasses = [
//     'object-cover rounded-lg transition-all duration-300',
//     hasError ? 'opacity-75' : '',
//     onClick ? 'cursor-pointer hover:scale-105' : '',
//     className,
//   ].filter(Boolean).join(' ');

//   return (
//     <div className="relative overflow-hidden rounded-lg">
//       <Image
//         src={imgSrc}
//         alt={alt}
//         width={width}
//         height={height}
//         className={imageClasses}
//         priority={priority}
//         sizes={sizes}
//         loading={loading}
//         quality={quality}
//         onError={handleError}
//         onLoad={handleLoad}
//         onClick={onClick}
//         // Add accessibility attributes
//         role={onClick ? 'button' : 'img'}
//         tabIndex={onClick ? 0 : -1}
//         onKeyDown={onClick ? (e) => {
//           if (e.key === 'Enter' || e.key === ' ') {
//             e.preventDefault();
//             onClick();
//           }
//         } : undefined}
//       />
      
//       {/* Error indicator overlay for fallback images */}
//       {hasError && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
//           <div className="text-center">
//             <svg 
//               className="w-8 h-8 text-[#FD5A1E] mx-auto mb-2" 
//               xmlns="http://www.w3.org/2000/svg" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//               aria-hidden="true"
//             >
//               <path 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round" 
//                 strokeWidth={2} 
//                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
//               />
//             </svg>
//             <span className="text-[#A5ACAF] text-sm">Image unavailable</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /**
//  * Predefined size variants for common use cases
//  */
// export const ProductImageSizes = {
//   /** Small thumbnail size */
//   THUMBNAIL: { width: 100, height: 100 },
//   /** Standard product card size */
//   CARD: { width: 200, height: 200 },
//   /** Medium product display size */
//   MEDIUM: { width: 300, height: 300 },
//   /** Large product showcase size */
//   LARGE: { width: 400, height: 400 },
//   /** Hero/featured product size */
//   HERO: { width: 600, height: 600 },
// } as const;

// /**
//  * ProductImageGrid Component
//  * 
//  * A specialized component for displaying multiple product images in a grid layout
//  */
// interface ProductImageGridProps {
//   /** Array of product data */
//   products: Array<{
//     id: string;
//     name: string;
//     image: string;
//     category?: string;
//   }>;
//   /** Grid configuration */
//   columns?: {
//     mobile?: number;
//     tablet?: number;
//     desktop?: number;
//   };
//   /** Image size for all products */
//   imageSize?: keyof typeof ProductImageSizes;
//   /** Click handler for product selection */
//   onProductClick?: (productId: string) => void;
//   /** Custom class for the grid container */
//   className?: string;
// }

// export function ProductImageGrid({
//   products,
//   columns = { mobile: 2, tablet: 3, desktop: 4 },
//   imageSize = 'CARD',
//   onProductClick,
//   className = '',
// }: ProductImageGridProps) {
//   const { width, height } = ProductImageSizes[imageSize];
  
//   // Generate responsive grid classes
//   const gridClasses = [
//     'grid gap-4',
//     `grid-cols-${columns.mobile}`,
//     `md:grid-cols-${columns.tablet}`,
//     `lg:grid-cols-${columns.desktop}`,
//     className,
//   ].join(' ');

//   return (
//     <div className={gridClasses}>
//       {products.map((product, index) => (
//         <div
//           key={product.id}
//           className="group relative"
//         >
//           <ProductImage
//             src={product.image}
//             alt={`${product.name} - AMP Vending product option`}
//             width={width}
//             height={height}
//             priority={index < 4} // Prioritize first 4 images
//             onClick={onProductClick ? () => onProductClick(product.id) : undefined}
//             className="group-hover:shadow-lg transition-shadow duration-300"
//           />
          
//           {/* Product name overlay */}
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <h3 className="text-white text-sm font-medium truncate">
//               {product.name}
//             </h3>
//             {product.category && (
//               <p className="text-[#A5ACAF] text-xs">
//                 {product.category}
//               </p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }