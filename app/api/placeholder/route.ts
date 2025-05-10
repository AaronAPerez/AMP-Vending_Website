// import { ImageResponse } from 'next/og';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const width = parseInt(searchParams.get('width') || '400');
//   const height = parseInt(searchParams.get('height') || '320');

//   return new ImageResponse(
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '100%',
//         height: '100%',
//         backgroundColor: '#4d4d4d',
//         color: '#A5ACAF',
//         fontSize: '24px',
//         fontWeight: 'bold',
//       }}
//     >
//       <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
//         <rect width="100" height="100" rx="8" fill="#000000" />
//         <path d="M25 35h50v30H25V35z" stroke="#A5ACAF" strokeWidth="2" />
//         <circle cx="35" cy="45" r="3" fill="#FD5A1E" />
//         <path d="M30 55l15-10 10 8 15-12" stroke="#FD5A1E" strokeWidth="2" />
//       </svg>
//       <div style={{ marginTop: '20px' }}>No Image</div>
//     </div>,
//     {
//       width: width,
//       height: height,
//     }
//   );
// }
// If the above still gives errors, try this alternative approach:
// import { ImageResponse } from 'next/server';
// import React from 'react';

// export const runtime = 'edge';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const width = parseInt(searchParams.get('width') || '400');
//   const height = parseInt(searchParams.get('height') || '320');

//   return new ImageResponse(
//     React.createElement(
//       'div',
//       {
//         style: {
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           width: '100%',
//           height: '100%',
//           backgroundColor: '#4d4d4d',
//           color: '#A5ACAF',
//           fontSize: '24px',
//           fontWeight: 'bold',
//         },
//       },
//       React.createElement(
//         'svg',
//         {
//           width: 100,
//           height: 100,
//           viewBox: '0 0 100 100',
//           fill: 'none',
//         },
//         React.createElement('rect', {
//           width: 100,
//           height: 100,
//           rx: 8,
//           fill: '#000000',
//         }),
//         React.createElement('path', {
//           d: 'M25 35h50v30H25V35z',
//           stroke: '#A5ACAF',
//           strokeWidth: 2,
//         }),
//         React.createElement('circle', {
//           cx: 35,
//           cy: 45,
//           r: 3,
//           fill: '#FD5A1E',
//         }),
//         React.createElement('path', {
//           d: 'M30 55l15-10 10 8 15-12',
//           stroke: '#FD5A1E',
//           strokeWidth: 2,
//         })
//       ),
//       React.createElement(
//         'div',
//         { style: { marginTop: '20px' } },
//         'No Image'
//       )
//     ),
//     {
//       width: width,
//       height: height,
//     }
//   );
// }

// 2. Update ProductSection to use this placeholder
// Replace the onError handler in your Image component:

// <Image
//   src={product.image}
//   alt={product.name}
//   fill
//   sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
//   className="object-cover group-hover:scale-110 transition-transform duration-300"
//   onError={(e) => {
//     const target = e.target as HTMLImageElement;
//     target.src = '/api/placeholder/400/320'; // Use Next.js placeholder
//   }}
// />

// 3. Alternative: Create a static placeholder image using canvas
// Create this file at: lib/createPlaceholderImage.ts

// export function createPlaceholderImage(width: number = 400, height: number = 320) {
//   if (typeof window === 'undefined') return '';
  
//   const canvas = document.createElement('canvas');
//   canvas.width = width;
//   canvas.height = height;
//   const ctx = canvas.getContext('2d');
  
//   if (!ctx) return '';

//   // Background
//   ctx.fillStyle = '#4d4d4d';
//   ctx.fillRect(0, 0, width, height);

//   // Icon (simplified product box)
//   ctx.strokeStyle = '#A5ACAF';
//   ctx.lineWidth = 2;
//   ctx.strokeRect(width/4, height/3, width/2, height/3);

//   // Text
//   ctx.fillStyle = '#A5ACAF';
//   ctx.font = 'bold 24px Arial';
//   ctx.textAlign = 'center';
//   ctx.fillText('No Image', width/2, height * 0.75);

//   return canvas.toDataURL('image/png');
// }

// Usage in ProductSection:
// import { createPlaceholderImage } from '@/lib/createPlaceholderImage';

// const placeholderImage = createPlaceholderImage();

// <Image
//   src={product.image}
//   alt={product.name}
//   fill
//   placeholder="blur"
//   blurDataURL={placeholderImage}
//   onError={(e) => {
//     const target = e.target as HTMLImageElement;
//     target.src = placeholderImage;
//   }}
// />