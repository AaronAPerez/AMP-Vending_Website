// import { MetadataRoute } from 'next';

// /**
//  * Web App Manifest Configuration for AMP Vending
//  * 
//  * This file generates the web app manifest that enables Progressive Web App (PWA) features
//  * for the AMP Vending website. The manifest provides metadata about the web application
//  * and defines how it should behave when installed on a user's device.
//  * 
//  * Features:
//  * - PWA installation support
//  * - Custom app icons for different platforms
//  * - Branded theme colors matching AMP Vending design
//  * - Standalone app display mode
//  * - Optimized for mobile and desktop installation
//  */

// /**
//  * Default export function that returns the web app manifest
//  * Next.js automatically serves this at /manifest.webmanifest
//  */
// export default function manifest(): MetadataRoute.Manifest {
//   return {
//     // Basic App Information
//     name: 'AMP Vending - Premium Workplace Vending Solutions',
//     short_name: 'AMP Vending',
//     description: 'Zero-cost, maintenance-free vending machines with touchscreen technology for enhanced workplace satisfaction.',
    
//     // PWA Configuration
//     start_url: '/',
//     display: 'standalone',
//     orientation: 'portrait-primary',
    
//     // Theme and Color Configuration
//     // Using AMP Vending's brand colors for consistent experience
//     theme_color: '#000000',        // Primary black background
//     background_color: '#000000',   // Black background for app loading
    
//     // App Icons for Different Platforms and Sizes
//     // Ensures proper display across all devices and contexts
//     icons: [
//       // Standard PWA Icons
//       {
//         src: '/icons/icon-72x72.png',
//         sizes: '72x72',
//         type: 'image/png',
//         purpose: 'any',
//       },
//       {
//         src: '/icons/icon-96x96.png',
//         sizes: '96x96',
//         type: 'image/png',
//         purpose: 'any',
//       },
//       {
//         src: '/icons/icon-128x128.png',
//         sizes: '128x128',
//         type: 'image/png',
//         purpose: 'any',
//       },
//       {
//         src: '/icons/icon-144x144.png',
//         sizes: '144x144',
//         type: 'image/png',
//         purpose: 'any',
//       },
//       {
//         src: '/icons/icon-152x152.png',
//         sizes: '152x152',
//         type: 'image/png',
//         purpose: 'any',
//       },
//       {
//         src: '/icons/icon-192x192.png',
//         sizes: '192x192',
//         type: 'image/png',
//         purpose: 'any maskable',
//       },
//       {
//         src: '/icons/icon-384x384.png',
//         sizes: '384x384',
//         type: 'image/png',
//         purpose: 'any',
//       },
//       {
//         src: '/icons/icon-512x512.png',
//         sizes: '512x512',
//         type: 'image/png',
//         purpose: 'any maskable',
//       },
      
//       // Apple Touch Icons
//       {
//         src: '/icons/apple-touch-icon.png',
//         sizes: '180x180',
//         type: 'image/png',
//         purpose: 'any',
//       },
      
//       // Favicon
//       {
//         src: '/favicon.ico',
//         sizes: '16x16 32x32',
//         type: 'image/x-icon',
//         purpose: 'any',
//       },
//     ],
    
//     // App Scope and Navigation
//     scope: '/',
    
//     // App Categories
//     categories: ['business', 'productivity', 'food'],
    
//     // Language and Internationalization
//     lang: 'en-US',
//     dir: 'ltr',
    
//     // Platform-specific Features
//     prefer_related_applications: false,
    
//     // Shortcuts for Quick Actions (appears in app launcher context menu)
//     shortcuts: [
//       {
//         name: 'Contact Us',
//         short_name: 'Contact',
//         description: 'Get in touch for zero-cost vending machine installation',
//         url: '/contact',
//         icons: [
//           {
//             src: '/icons/shortcut-contact.png',
//             sizes: '192x192',
//             type: 'image/png',
//           },
//         ],
//       },
//       {
//         name: 'View Machines',
//         short_name: 'Machines',
//         description: 'Browse our premium vending machine collection',
//         url: '/vending-machines',
//         icons: [
//           {
//             src: '/icons/shortcut-machines.png',
//             sizes: '192x192',
//             type: 'image/png',
//           },
//         ],
//       },
//       {
//         name: 'Share Feedback',
//         short_name: 'Feedback',
//         description: 'Share your experience with our vending solutions',
//         url: '/feedback',
//         icons: [
//           {
//             src: '/icons/shortcut-feedback.png',
//             sizes: '192x192',
//             type: 'image/png',
//           },
//         ],
//       },
//     ],
    
//     // Additional PWA Features
//     edge_side_panel: {
//       preferred_width: 400,
//     },
    
//     // Protocol Handlers (if needed for future features)
//     protocol_handlers: [
//       {
//         protocol: 'mailto',
//         url: '/contact?email=%s',
//       },
//     ],
//   };
// }