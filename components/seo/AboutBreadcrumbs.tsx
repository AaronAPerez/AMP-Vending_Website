
// /**
//  * About Breadcrumbs Component
//  * 
//  * Provides accessible breadcrumb navigation for the About page
//  * with proper ARIA labels and semantic markup for screen readers.
//  */

// import React from 'react';

// /**
//  * AboutBreadcrumbs Component
//  * 
//  * Renders breadcrumb navigation specifically for the About page.
//  * Includes proper accessibility attributes and semantic HTML structure.
//  */
// export const AboutBreadcrumbs: React.FC = () => {
//   return (
//     <nav 
//       aria-label="Breadcrumb navigation for About page" 
//       className="sr-only" // Hidden visually but available to screen readers
//     >
//       <ol className="flex items-center space-x-2 text-sm">
//         <li>
//           <a 
//             href="/" 
//             className="text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors"
//             aria-label="Navigate to homepage"
//           >
//             Home
//           </a>
//         </li>
//         <li aria-hidden="true" className="text-[#4d4d4d]">/</li>
//         <li>
//           <span 
//             className="text-[#F5F5F5]" 
//             aria-current="page"
//             aria-label="Current page: About AMP Vending"
//           >
//             About
//           </span>
//         </li>
//       </ol>
//     </nav>
//   );
// };

