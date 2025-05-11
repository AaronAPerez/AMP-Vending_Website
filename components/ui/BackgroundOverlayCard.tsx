// import Image from "next/image";
// import Link from "next/link";



// interface Product {
//     id: string;
//     name: string;
//     // price: number;
//     category: 'chips' | 'candy' | 'protein' | 'pastries' | 'nuts' | 'snacks' | 'beverages' | 'energy' | 'healthy';
//     image: string;
//     popular?: boolean;
//     healthy?: boolean;
//     details?: string;
// }
// /**
//  * Background Overlay Card Component - Inspired by Aceternity
//  */
// const BackgroundOverlayCard = ({ product }: { product: Product }) => {

//     return (
//         <div className="relative group h-62 overflow-hidden rounded-xl shadow-xl">
//             {/* Background Image */}
//             <div className="absolute inset-0">
//                 <Image
//                     src={product.image}
//                     alt={product.name}
//                     fill
//                     sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
//                     className="object-cover transition-transform duration-500 group-hover:scale-110"
//                     onError={(e) => {
//                         const target = e.target as HTMLImageElement;
//                         target.src = '/images/products/placeholder.jpg';
//                     }}
//                 />
//             </div>

//             {/* Gradient Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

//             {/* Tags */}
//             <div className="absolute top-2 left-2 right-2 flex justify-between">
//                 {product.popular && (
//                     <div className="px-2 py-1 bg-[#FD5A1E] text-white text-xs rounded-full backdrop-blur-sm">
//                         Popular
//                     </div>
//                 )}
//                 {product.healthy && (
//                     <div className="ml-auto px-2 py-1 bg-green-500 text-white text-xs rounded-full backdrop-blur-sm">
//                         Healthy
//                     </div>
//                 )}
//             </div>

//             {/* Content */}
//             <div className="absolute inset-0 flex flex-col justify-end p-4 text-white shadow-">
//                 <h3 className="text-lg font-bold mb-1">{product.name}</h3>
//                 <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-2" />
//                 <p className="text-sm text-gray-300 capitalize mb-1">{product.category}</p>

//                 {product.details && (
//                     <p className="text-xs text-gray-400 italic mb-2 line-clamp-2">{product.details}</p>
//                 )}

//                 {/* Bottom section with price and gradient line */}
//                 <div className="relative mt-2">
//                     <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-2" />
//                     <div className="flex justify-between items-center">
//                         {/* <span className="text-[#FD5A1E] font-bold text-lg">{formatPrice(product.price)}</span> */}
//                         <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs font-medium transition-colors">
//                             Add
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Hover Effect Glow */}
//             <div className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
//                 <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FD5A1E]/20 to-transparent blur-md" />
//             </div>


//             {/* Category Filters */}
//             <div className="flex flex-wrap justify-center gap-3 mb-8">
//                 {productCategories.map((category) => (
//                     <button
//                         key={category.id}
//                         onClick={() => setActiveCategory(category.id)}
//                         className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id
//                             ? 'bg-[#FD5A1E] text-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#000000]'
//                             : 'bg-[#000000] text-[#F5F5F5] hover:bg-[#FD5A1E]/10 border border-[#a4acac]'
//                             }`}
//                         aria-pressed={activeCategory === category.id}
//                         aria-label={`Filter by ${category.label}. ${category.count} items.`}
//                     >
//                         {category.label} ({category.count})
//                     </button>
//                 ))}
//             </div>

//             {/* Products Grid */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                 {filteredProducts.map((product) => (
//                     <div
//                         key={product.id}
//                         className="bg-[#000000] rounded-lg overflow-hidden border border-[#a4acac] hover:border-[#FD5A1E] transition-all hover:scale-105 group"
//                     >
//                         {/* Product Image */}
//                         <div className="h-36 relative overflow-hidden bg-[#4d4d4d]">
//                             <Image
//                                 src={product.image}
//                                 alt={product.name}
//                                 fill
//                                 sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
//                                 className="object-cover group-hover:scale-110 transition-transform duration-300"
//                                 onError={(e) => {
//                                     const target = e.target as HTMLImageElement;
//                                     target.src = '/api/placeholder/400/320'; // Use Next.js placeholder
//                                 }}
//                             />

//                             <Image
//                                 src={product.image}
//                                 alt={product.name}
//                                 fill
//                                 sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
//                                 className="object-cover group-hover:scale-110 transition-transform duration-300"
//                                 onError={(e) => {
//                                     const target = e.target as HTMLImageElement;
//                                     target.src = '/images/products/placeholder.jpg';
//                                 }}
//                             />

//                             {/* Product Tags */}
//                             {product.popular && (
//                                 <div className="absolute top-2 right-2 bg-[#FD5A1E] text-[#F5F5F5] text-xs px-2 py-1 rounded-full">
//                                     Popular
//                                 </div>
//                             )}
//                             {product.healthy && (
//                                 <div className="absolute top-2 left-2 bg-green-500 text-[#F5F5F5] text-xs px-2 py-1 rounded-full">
//                                     Healthy
//                                 </div>
//                             )}
//                         </div>

//                         {/* Product Info */}
//                         <div className="p-3">
//                             <h3 className="text-[#F5F5F5] font-medium text-sm">{product.name}</h3>
//                             <p className="text-[#A5ACAF] text-xs capitalize">{product.category}</p>
//                             {product.details && (
//                                 <p className="text-[#A5ACAF] text-xs italic mt-1">{product.details}</p>
//                             )}
//                             <p className="text-[#FD5A1E] font-bold mt-2">{formatPrice(product.price)}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Product Rotation Banner */}
//             <div className="mt-10 bg-[#FD5A1E]/10 border border-[#FD5A1E] rounded-lg p-4 text-center">
//                 <div className="flex items-center justify-center space-x-2 text-[#F5F5F5]">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span>Product selection can be customized based on your workplace preferences and regularly updated based on feedback.</span>
//                 </div>
//             </div>

//             {/* Call to Action */}
//             <div className="mt-10 text-center">
//                 <Link
//                     href="/contact"
//                     className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors font-medium"
//                 >
//                     Customize Your Selection
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                 </Link>
//             </div>
//         </div>


//     );
// };

// export default BackgroundOverlayCard;