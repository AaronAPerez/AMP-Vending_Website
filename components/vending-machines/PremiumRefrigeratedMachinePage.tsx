// 'use client';

// import React from 'react';
// import VendingMachineDetailPage from './VendingMachineDetailPage';


// /**
//  * Page component for the KM-VMRT-50-B Premium Refrigerated Machine
//  */
// const PremiumRefrigeratedMachinePage = () => {
//   // Machine data for the KM-VMRT-50-B model
//   const machineData = {
//     id: 'km-vmrt-50-b',
//     name: 'Premium Refrigerated Machine',
//     model: 'KM-VMRT-50-B',
//     shortDescription: 'Our flagship refrigerated vending machine with a premium 21.5" HD touchscreen interface, perfect for high-traffic environments that demand the best.',
//     description: 'The KM-VMRT-50-B is our most advanced refrigerated vending solution, combining state-of-the-art technology with maximum flexibility. Featuring an eye-catching 21.5" HD touchscreen display and versatile product configuration options, this machine creates an engaging purchase experience while accommodating both refrigerated and non-refrigerated items. Its dual temperature zones allow for mixed product offerings, from beverages and fresh food to snacks and non-food items. With zero cost installation and complete maintenance service included, this premium machine enhances any workplace environment without adding operational burden.',
//     images: [
//       { 
//         id: 1, 
//         src: '/images/machines/KM-VMRT-50-B (Premium Refrigerated Machine) bg.png', 
//         alt: 'Front view of Premium Refrigerated Machine KM-VMRT-50-B' 
//       },
//       { 
//         id: 2, 
//         src: '/images/machines/KM-VMRT-50-B (Premium Refrigerated Machine) Left bg.png', 
//         alt: 'Side view of Premium Refrigerated Machine KM-VMRT-50-B' 
//       },
//       { 
//         id: 3, 
//         src: '/images/machines/KM-VMRT-50-B (Premium Refrigerated Machine) Right bg.png', 
//         alt: 'Side view of Premium Refrigerated Machine KM-VMRT-50-B' 
//       },
//       { 
//         id: 4, 
//         src: '/images/machines/KM-VMRT-50-B (Premium Refrigerated Machine) Screen bg.png', 
//         alt: 'Touchscreen interface of Premium Refrigerated Machine KM-VMRT-50-B' 
//       },
//       { 
//         id: 5, 
//         src: '/images/machines/km-vmrt-50-b-detail.png', 
//         alt: 'Interior detail of Premium Refrigerated Machine KM-VMRT-50-B' 
//       }
//     ],
//     dimensions: [
//       { label: 'Width', value: '51 inches (130 cm)' },
//       { label: 'Depth', value: '34.3 inches (87 cm)' },
//       { label: 'Height', value: '76.7 inches (195 cm)' },
//       { label: 'Weight', value: '800 lbs (363 kg)' },
//       { label: 'Capacity', value: '60 product selections' },
//       { label: 'Power', value: '120V / 60Hz' }
//     ],
//     features: [
//       {
//         title: '21.5" HD Touchscreen',
//         description: 'High-definition touchscreen display with intuitive interface for easy product selection and a premium user experience. Supports dynamic content and product information display.',
//         icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" /></svg>'
//       },
//       {
//         title: 'Anti-Fog Double-Paned Glass',
//         description: 'Heated double-paned glass with anti-fog technology ensures clear visibility of products in all conditions, even in environments with changing temperatures or humidity.',
//         icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>'
//       },
//       {
//         title: 'Dual Temperature Zones',
//         description: 'Features separate temperature controls for different sections of the machine, allowing for both refrigerated and non-refrigerated products in a single unit for maximum flexibility.',
//         icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" /></svg>'
//       },
//       {
//         title: 'Advanced Payment Systems',
//         description: 'Supports multiple payment methods including credit/debit cards with EMV chip reader, mobile payments (Apple Pay, Google Pay), and traditional cash with bill recycler technology.',
//         icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>'
//       },
//       {
//         title: 'Metal Plate Shelving',
//         description: 'Six heavy-duty metal plate shelves with configurable spacing to accommodate products of various sizes and shapes, providing maximum flexibility and durability.',
//         icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>'
//       },
//       {
//         title: 'ADA Compliant Design',
//         description: 'Fully compliant with Americans with Disabilities Act requirements, ensuring accessibility for all users regardless of physical capabilities.',
//         icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>'
//       }
//     ],
//     specifications: [
//       {
//         category: 'Physical Specifications',
//         items: [
//           { label: 'Dimensions', value: '51"W x 34.3"D x 76.7"H' },
//           { label: 'Weight', value: '800 lbs (363 kg)' },
//           { label: 'Cabinet Construction', value: 'Powder-coated steel' },
//           { label: 'Front Glass', value: 'Anti-fog double-paned heated glass' },
//           { label: 'Insulation', value: 'High-efficiency, environmentally friendly' }
//         ]
//       },
//       {
//         category: 'Capacity & Configuration',
//         items: [
//           { label: 'Product Selections', value: 'Up to 60 different products' },
//           { label: 'Shelving', value: '6 adjustable metal plate shelves' },
//           { label: 'Shelf Spacing', value: 'Configurable for various product sizes' },
//           { label: 'Maximum Products', value: 'Up to 450+ items depending on size' },
//         ]
//       },
//       {
//         category: 'Technology Features',
//         items: [
//           { label: 'Display', value: '21.5" HD touchscreen' },
//           { label: 'Controller', value: 'Advanced microprocessor control system' },
//           { label: 'Operating System', value: 'Proprietary vending OS with remote updates' },
//           { label: 'Connectivity', value: '4G LTE, Wi-Fi, Ethernet' },
//           { label: 'Remote Monitoring', value: 'Real-time inventory and sales tracking' }
//         ]
//       },
//       {
//         category: 'Payment Systems',
//         items: [
//           { label: 'Card Reader', value: 'EMV compliant for chip cards' },
//           { label: 'Contactless', value: 'NFC for Apple Pay, Google Pay, Samsung Pay' },
//           { label: 'Cash Handling', value: 'Bill acceptor for $1-$100 bills with recycler' },
//           { label: 'Coin Mechanism', value: 'Multi-coin acceptor with change dispensing' }
//         ]
//       },
//       {
//         category: 'Refrigeration',
//         items: [
//           { label: 'Cooling System', value: 'Energy-efficient compressor with R290 refrigerant' },
//           { label: 'Temperature Range', value: '35°F to 41°F (1.7°C to 5°C)' },
//           { label: 'Temperature Zones', value: 'Dual independent temperature control' },
//           { label: 'Defrost System', value: 'Automatic electronic defrost' }
//         ]
//       },
//       {
//         category: 'Electrical',
//         items: [
//           { label: 'Power Requirements', value: '120V AC, 60Hz' },
//           { label: 'Power Consumption', value: 'Average 8.5 kWh/day' },
//           { label: 'Lighting', value: 'Energy-efficient LED interior lighting' },
//           { label: 'Certifications', value: 'UL, Energy Star qualified' }
//         ]
//       }
//     ],
//     productOptions: [
//       'Bottled beverages (water, soda, juice)',
//       'Energy drinks',
//       'Sports drinks',
//       'Milk products',
//       'Yogurt and dairy items',
//       'Fresh sandwiches and wraps',
//       'Fresh salads',
//       'Fresh fruit cups',
//       'Packaged meals',
//       'Protein bars and nutritional bars',
//       'Chips and savory snacks',
//       'Candy and chocolate',
//       'Pastries and cookies',
//       'Nuts and trail mixes',
//       'Gluten-free options',
//       'Vegan options',
//       'Specialty coffee beverages',
//       'Premium tea varieties',
//       'Health supplements',
//       'Personal care items'
//     ],
//     bestFor: [
//       'Corporate offices and workplaces',
//       'University and college campuses',
//       'Healthcare facilities',
//       'Transportation hubs',
//       'Premium retail locations',
//       'Fitness centers and gyms',
//       'Conference centers',
//       'Tech company break rooms',
//       'High-traffic public areas',
//       'Locations where food service is limited'
//     ],
//     relatedMachines: [
//       {
//         id: 'km-vmnt-50-b',
//         name: 'Non-Refrigerated Snack Machine',
//         model: 'KM-VMNT-50-B',
//         image: '/images/machines/KM-VMNT-50-B (Non-Refrigerated Snack Machine) bg.png'
//       },
//       {
//         id: 'km-vmr-40-b',
//         name: 'Standard Refrigerated Machine',
//         model: 'KM-VMR-40-B',
//         image: '/images/machines/KM-VMR-40-B (Standard Refrigerated Machine) bg.png'
//       },
//       {
//         id: 'km-vmr-30-b',
//         name: 'Compact Refrigerated Machine',
//         model: 'KM-VMR-30-B',
//         image: '/images/machines/KM-VMR-30-B (Compact Refrigerated Machine) bg.png'
//       }
//     ]
//   };

//   return (
//     <VendingMachineDetailPage machine={machineData} />
//   );
// };

// export default PremiumRefrigeratedMachinePage;