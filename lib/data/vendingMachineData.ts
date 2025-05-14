/**
 * Vending machine data types
 */
export interface MachineImage {
  id: number;
  src: string;
  alt: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface SpecificationGroup {
  category: string;
  items: {
    label: string;
    value: string | string[];
  }[];
}

export interface MachineData {
  id: string;
  name: string;
  model: string;
  shortDescription: string;
  description: string;
  images: MachineImage[];
  dimensions: { label: string; value: string }[];
  features: FeatureItem[];
  specifications: SpecificationGroup[];
  productOptions: string[];
  bestFor: string[];
  relatedMachines: {
    id: string;
    name: string;
    model: string;
    image: string;
  }[];
  category: 'refrigerated' | 'non-refrigerated';
}

/**
 * Vending machine data collection
 * Contains detailed information about each machine model
 */
const vendingMachineData: Record<string, MachineData> = {
  // Premium Refrigerated Machine
  'km-vmrt-50-b': {
  id: 'km-vmrt-50-b',
  name: 'Premium Refrigerated Machine',
  model: 'KM-VMRT-50-B',
  shortDescription: 'Zero-cost premium refrigerated vending machine with 21.5" HD touchscreen interface, tap-to-pay technology, and maintenance-free operation for high-traffic workplaces.',
  description: 'The KM-VMRT-50-B is our most advanced zero-cost vending solution, combining state-of-the-art technology with maximum flexibility. Featuring an eye-catching 21.5" HD touchscreen display and 50+ customizable product options, this machine creates an engaging purchase experience while accommodating both refrigerated and non-refrigerated items. Its dual temperature zones allow for mixed product offerings, from beverages and fresh food to snacks and non-food items. With complimentary installation and complete maintenance service included, this premium machine enhances workplace satisfaction without adding operational burden.',
  images: [
    { 
      id: 1, 
      src: '/images/products/placeholder.jpg', 
      alt: 'Premium Refrigerated Vending Machine with 21.5-inch touchscreen interface - Front View' 
    },
    { 
      id: 2, 
      src: '/images/products/placeholder.jpg', 
      alt: 'Premium Refrigerated Vending Machine with zero-cost installation - Side View' 
    },
      { 
        id: 3, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Angle view of Premium Refrigerated Machine KM-VMRT-50-B' 
      },
      { 
        id: 4, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Touchscreen interface of Premium Refrigerated Machine KM-VMRT-50-B' 
      },
      { 
        id: 5, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Interior detail of Premium Refrigerated Machine KM-VMRT-50-B' 
      }
    ],
    dimensions: [
      { label: 'Width', value: '51 inches (130 cm)' },
      { label: 'Depth', value: '34.3 inches (87 cm)' },
      { label: 'Height', value: '76.7 inches (195 cm)' },
      { label: 'Weight', value: '800 lbs (363 kg)' },
      { label: 'Capacity', value: '60 product selections' },
      { label: 'Power', value: '120V / 60Hz' }
    ],
    features: [
      {
        title: '21.5" HD Touchscreen Interface',
        description: 'Modern high-definition touchscreen with intuitive navigation enhances workplace refreshment experience. Improves employee satisfaction with easy product selection and dynamic content display.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" /></svg>'
      },
      {
        title: 'Anti-Fog Double-Paned Glass',
        description: 'Heated double-paned glass with anti-fog technology ensures clear visibility of products in all conditions, even in environments with changing temperatures or humidity.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>'
      },
      {
        title: 'Dual Temperature Zones',
        description: 'Features separate temperature controls for different sections of the machine, allowing for both refrigerated and non-refrigerated products in a single unit for maximum flexibility.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" /></svg>'
      },
      {
        title: 'Advanced Payment Systems',
        description: 'Supports multiple payment methods including credit/debit cards with EMV chip reader, mobile payments (Apple Pay, Google Pay), and traditional cash with bill recycler technology.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>'
      },
      {
        title: 'Metal Plate Shelving',
        description: 'Six heavy-duty metal plate shelves with configurable spacing to accommodate products of various sizes and shapes, providing maximum flexibility and durability.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>'
      },
      {
        title: 'ADA Compliant Design',
        description: 'Fully compliant with Americans with Disabilities Act requirements, ensuring accessibility for all users regardless of physical capabilities.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>'
      }
    ],
    specifications: [
      {
        category: 'Physical Specifications',
        items: [
          { label: 'Dimensions', value: '51"W x 34.3"D x 76.7"H' },
          { label: 'Weight', value: '800 lbs (363 kg)' },
          { label: 'Cabinet Construction', value: 'Powder-coated steel' },
          { label: 'Front Glass', value: 'Anti-fog double-paned heated glass' },
          { label: 'Insulation', value: 'High-efficiency, environmentally friendly' }
        ]
      },
      {
        category: 'Capacity & Configuration',
        items: [
          { label: 'Product Selections', value: 'Up to 60 different products' },
          { label: 'Shelving', value: '6 adjustable metal plate shelves' },
          { label: 'Shelf Spacing', value: 'Configurable for various product sizes' },
          { label: 'Maximum Products', value: 'Up to 450+ items depending on size' },
        ]
      },
      {
        category: 'Technology Features',
        items: [
          { label: 'Display', value: '21.5" HD touchscreen' },
          { label: 'Controller', value: 'Advanced microprocessor control system' },
          { label: 'Operating System', value: 'Proprietary vending OS with remote updates' },
          { label: 'Connectivity', value: '4G LTE, Wi-Fi, Ethernet' },
          { label: 'Remote Monitoring', value: 'Real-time inventory and sales tracking' }
        ]
      },
      {
        category: 'Payment Systems',
        items: [
          { label: 'Card Reader', value: 'EMV compliant for chip cards' },
          { label: 'Contactless', value: 'NFC for Apple Pay, Google Pay, Samsung Pay' },
          { label: 'Cash Handling', value: 'Bill acceptor for $1-$100 bills with recycler' },
          { label: 'Coin Mechanism', value: 'Multi-coin acceptor with change dispensing' }
        ]
      },
      {
        category: 'Refrigeration',
        items: [
          { label: 'Cooling System', value: 'Energy-efficient compressor with R290 refrigerant' },
          { label: 'Temperature Range', value: '35°F to 41°F (1.7°C to 5°C)' },
          { label: 'Temperature Zones', value: 'Dual independent temperature control' },
          { label: 'Defrost System', value: 'Automatic electronic defrost' }
        ]
      },
      {
        category: 'Electrical',
        items: [
          { label: 'Power Requirements', value: '120V AC, 60Hz' },
          { label: 'Power Consumption', value: 'Average 8.5 kWh/day' },
          { label: 'Lighting', value: 'Energy-efficient LED interior lighting' },
          { label: 'Certifications', value: 'UL, Energy Star qualified' }
        ]
      }
    ],
    productOptions: [
      'Bottled water (still and sparkling)',
      'Soft drinks and sodas',
      'Energy drinks',
      'Sports drinks',
      'Milk and dairy-based beverages',
      'Yogurt and dairy items',
      'Fresh sandwiches and wraps',
      'Fresh salads',
      'Fruit cups and fresh produce',
      'Protein bars and nutritional bars',
      'Chips and savory snacks',
      'Candy and chocolate bars',
      'Pastries and cookies',
      'Nuts and trail mixes',
      'Gluten-free snack options',
      'Vegan food and beverage options',
      'Premium coffee beverages',
      'Tea varieties',
      'Healthy snack alternatives',
      'Personal care items'
    ],
    bestFor: [
      'Corporate offices and workplaces',
      'University and college campuses',
      'Healthcare facilities',
      'Transportation hubs',
      'Premium retail locations',
      'Fitness centers and gyms',
      'Conference centers',
      'Technology company break rooms',
      'High-traffic public areas',
      'Locations where food service is limited'
    ],
    relatedMachines: [
      {
        id: 'km-vmnt-50-b',
        name: 'Non-Refrigerated Snack Machine',
        model: 'KM-VMNT-50-B',
        image: '/images/products/placeholder.jpg'
      },
      {
        id: 'km-vmr-40-b',
        name: 'Standard Refrigerated Machine',
        model: 'KM-VMR-40-B',
        image: '/images/products/placeholder.jpg'
      },
      {
        id: 'km-vmr-30-b',
        name: 'Compact Refrigerated Machine',
        model: 'KM-VMR-30-B',
        image: '/images/products/placeholder.jpg'
      }
    ],
    category: 'refrigerated'
  },

  // Standard Refrigerated Machine
  'km-vmr-40-b': {
    id: 'km-vmr-40-b',
    name: 'Standard Refrigerated Machine',
    model: 'KM-VMR-40-B',
    shortDescription: 'A versatile refrigerated vending machine designed for reliability and performance in medium to high-traffic locations.',
    description: 'The KM-VMR-40-B is our standard refrigerated vending solution that balances capacity with space efficiency. This machine offers reliable performance for mid-sized locations, featuring modern payment systems and energy-efficient cooling technology. With a capacity for 40+ product selections and a sleek design, it provides a robust option for locations where a full-sized machine may not be required but substantial variety is still needed. As with all our machines, it comes with zero cost installation and complete maintenance service.',
    images: [
      { 
        id: 1, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Front view of Standard Refrigerated Machine KM-VMR-40-B' 
      },
      { 
        id: 2, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Side view of Standard Refrigerated Machine KM-VMR-40-B' 
      },
      { 
        id: 3, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Angle view of Standard Refrigerated Machine KM-VMR-40-B' 
      },
      { 
        id: 4, 
        src: '/images/products/placeholder.jpg', 
        alt: 'User interface of Standard Refrigerated Machine KM-VMR-40-B' 
      }
    ],
    dimensions: [
      { label: 'Width', value: '40.4 inches (103 cm)' },
      { label: 'Depth', value: '31 inches (79 cm)' },
      { label: 'Height', value: '76.7 inches (195 cm)' },
      { label: 'Weight', value: '650 lbs (295 kg)' },
      { label: 'Capacity', value: '40+ product selections' },
      { label: 'Power', value: '120V / 60Hz' }
    ],
    features: [
      {
        title: 'Energy-Efficient Cooling',
        description: 'Advanced refrigeration system that maintains optimal temperature while minimizing power consumption and environmental impact.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>'
      },
      {
        title: 'Smart Inventory Tracking',
        description: 'Real-time monitoring system that tracks product levels and purchase patterns to optimize restocking and product selection.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>'
      },
      {
        title: 'Multiple Payment Options',
        description: 'Accepts credit/debit cards, mobile payments, and cash, providing convenience for all customers regardless of preferred payment method.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.75c.414 0 .75.336.75.75v.75m0 0H18a2.25 2.25 0 002.25-2.25V4.5a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 4.5m10.5-1.5h.75c.414 0 .75.336.75.75v.75M3 18.75v.75c0 .414.336.75.75.75h.75M3.75 18h16.5m-16.5 0h-.75a.75.75 0 01-.75-.75v-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25" /></svg>'
      },
      {
        title: 'Adjustable Shelving',
        description: 'Configurable shelf system that can be adapted to accommodate various product sizes and maximize the selection available to customers.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>'
      },
      {
        title: 'Remote Diagnostics',
        description: 'Advanced monitoring system that alerts our technicians to potential issues before they become problems, ensuring minimal downtime.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>'
      },
      {
        title: 'Energy-Saving Mode',
        description: 'Intelligent power management system that reduces energy consumption during periods of low usage while maintaining product freshness.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>'
      }
    ],
    specifications: [
      {
        category: 'Physical Specifications',
        items: [
          { label: 'Dimensions', value: '40.4"W x 31"D x 76.7"H' },
          { label: 'Weight', value: '650 lbs (295 kg)' },
          { label: 'Cabinet Construction', value: 'Powder-coated steel' },
          { label: 'Front Glass', value: 'Tempered safety glass' },
          { label: 'Insulation', value: 'Energy-efficient foam insulation' }
        ]
      },
      {
        category: 'Capacity & Configuration',
        items: [
          { label: 'Product Selections', value: '40+ different products' },
          { label: 'Shelving', value: '5 adjustable shelves' },
          { label: 'Maximum Products', value: 'Up to 360 items depending on size' }
        ]
      },
      {
        category: 'Technology Features',
        items: [
          { label: 'Display', value: '7" LCD screen' },
          { label: 'Controller', value: 'Microprocessor control system' },
          { label: 'Connectivity', value: '4G LTE, Wi-Fi option' },
          { label: 'Remote Monitoring', value: 'Inventory tracking and alerts' }
        ]
      },
      {
        category: 'Payment Systems',
        items: [
          { label: 'Card Reader', value: 'EMV compliant' },
          { label: 'Contactless', value: 'NFC payment capability' },
          { label: 'Cash Handling', value: 'Bill acceptor ($1-$20)' },
          { label: 'Coin Mechanism', value: 'Multi-coin with change dispensing' }
        ]
      },
      {
        category: 'Refrigeration',
        items: [
          { label: 'Cooling System', value: 'Energy-efficient compressor' },
          { label: 'Temperature Range', value: '35°F to 41°F (1.7°C to 5°C)' },
          { label: 'Defrost System', value: 'Automatic cycle defrost' },
          { label: 'Refrigerant', value: 'R290 environmentally friendly refrigerant' }
        ]
      },
      {
        category: 'Electrical',
        items: [
          { label: 'Power Requirements', value: '120V AC, 60Hz' },
          { label: 'Power Consumption', value: 'Average 7.2 kWh/day' },
          { label: 'Lighting', value: 'LED interior lighting' },
          { label: 'Certifications', value: 'UL, Energy Star qualified' }
        ]
      }
    ],
    productOptions: [
      'Bottled water and sparkling water',
      'Soft drinks and sodas',
      'Energy drinks and coffee beverages',
      'Sports drinks',
      'Milk-based beverages',
      'Yogurt cups',
      'Sandwiches and wraps',
      'Fresh salads',
      'Ready-to-eat meals',
      'Protein bars',
      'Healthy snack options',
      'Chips and savory snacks',
      'Candy and chocolate',
      'Pastries and cookies',
      'Dried fruits and nuts',
      'Fresh fruit cups'
    ],
    bestFor: [
      'Medium-sized offices',
      'Educational facilities',
      'Healthcare waiting areas',
      'Small retail locations',
      'Fitness centers',
      'Hotel lobbies',
      'Community centers',
      'Mid-traffic public areas',
      'Small to medium break rooms',
      'Locations with moderate foot traffic'
    ],
    relatedMachines: [
      {
        id: 'km-vmrt-50-b',
        name: 'Premium Refrigerated Machine',
        model: 'KM-VMRT-50-B',
        image: '/images/products/placeholder.jpg'
      },
      {
        id: 'km-vmr-30-b',
        name: 'Compact Refrigerated Machine',
        model: 'KM-VMR-30-B',
        image: '/images/products/placeholder.jpg'
      },
      {
        id: 'km-vmnt-50-b',
        name: 'Non-Refrigerated Snack Machine',
        model: 'KM-VMNT-50-B',
        image: '/images/products/placeholder.jpg'
      }
    ],
    category: 'refrigerated'
  },

  // Compact Refrigerated Machine
  'km-vmr-30-b': {
    id: 'km-vmr-30-b',
    name: 'Compact Refrigerated Machine',
    model: 'KM-VMR-30-B',
    shortDescription: 'A space-efficient refrigerated vending solution designed for smaller locations while still offering premium features and product variety.',
    description: 'The KM-VMR-30-B is our compact refrigerated vending machine, engineered specifically for locations where space is at a premium but quality refreshment options are still essential. Despite its smaller footprint, this machine delivers the same advanced technology and reliability as our larger models. It features energy-efficient cooling, versatile payment options, and can accommodate a surprising variety of refrigerated products. The space-saving design makes it perfect for smaller offices, break rooms, or spaces with limited floor area.',
    images: [
      { 
        id: 1, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Front view of Compact Refrigerated Machine KM-VMR-30-B' 
      },
      { 
        id: 2, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Side view of Compact Refrigerated Machine KM-VMR-30-B' 
      },
      { 
        id: 3, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Angle view of Compact Refrigerated Machine KM-VMR-30-B' 
      },
      { 
        id: 4, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Interior view of Compact Refrigerated Machine KM-VMR-30-B' 
      }
    ],
    dimensions: [
      { label: 'Width', value: '30 inches (76 cm)' },
      { label: 'Depth', value: '28 inches (71 cm)' },
      { label: 'Height', value: '76.7 inches (195 cm)' },
      { label: 'Weight', value: '550 lbs (250 kg)' },
      { label: 'Capacity', value: '30+ product selections' },
      { label: 'Power', value: '120V / 60Hz' }
    ],
    features: [
      {
        title: 'Space-Saving Design',
        description: 'Optimized dimensions for installation in smaller areas while maintaining substantial product capacity and selection variety.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" /></svg>'
      },
      {
        title: 'Energy-Efficient Cooling',
        description: 'Advanced refrigeration system that maintains proper temperature while minimizing power consumption for eco-friendly operation.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>'
      },
      {
        title: 'Modern Payment Interface',
        description: 'Integrated payment system accepting credit/debit cards, mobile payments, and cash, ensuring maximum convenience for users.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>'
      },
      {
        title: 'Optimized Product Layout',
        description: 'Specially designed interior configuration that maximizes product variety despite the compact external dimensions.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>'
      },
      {
        title: 'Intelligent Inventory Management',
        description: 'Remote monitoring system that tracks product levels in real-time to ensure timely restocking and minimize out-of-stock situations.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>'
      },
      {
        title: 'LED Illumination',
        description: 'Energy-efficient LED lighting system that attractively showcases products while consuming minimal power and generating less heat.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>'
      }
    ],
    specifications: [
      {
        category: 'Physical Specifications',
        items: [
          { label: 'Dimensions', value: '30"W x 28"D x 76.7"H' },
          { label: 'Weight', value: '550 lbs (250 kg)' },
          { label: 'Cabinet Construction', value: 'Powder-coated steel' },
          { label: 'Front Glass', value: 'Tempered safety glass' },
          { label: 'Insulation', value: 'High-density foam insulation' }
        ]
      },
      {
        category: 'Capacity & Configuration',
        items: [
          { label: 'Product Selections', value: '30+ different products' },
          { label: 'Shelving', value: '4 adjustable shelves' },
          { label: 'Maximum Products', value: 'Up to 240 items depending on size' }
        ]
      },
      {
        category: 'Technology Features',
        items: [
          { label: 'Display', value: '7" LCD screen' },
          { label: 'Controller', value: 'Microprocessor control system' },
          { label: 'Connectivity', value: '4G LTE, Wi-Fi option' },
          { label: 'Remote Monitoring', value: 'Inventory tracking and alerts' }
        ]
      },
      {
        category: 'Payment Systems',
        items: [
          { label: 'Card Reader', value: 'EMV compliant' },
          { label: 'Contactless', value: 'NFC payment capability' },
          { label: 'Cash Handling', value: 'Bill acceptor ($1-$20)' },
          { label: 'Coin Mechanism', value: 'Multi-coin with change dispensing' }
        ]
      },
      {
        category: 'Refrigeration',
        items: [
          { label: 'Cooling System', value: 'Compact energy-efficient compressor' },
          { label: 'Temperature Range', value: '35°F to 41°F (1.7°C to 5°C)' },
          { label: 'Defrost System', value: 'Automatic cycle defrost' },
          { label: 'Refrigerant', value: 'R290 environmentally friendly refrigerant' }
        ]
      },
      {
        category: 'Electrical',
        items: [
          { label: 'Power Requirements', value: '120V AC, 60Hz' },
          { label: 'Power Consumption', value: 'Average 6.5 kWh/day' },
          { label: 'Lighting', value: 'LED interior lighting' },
          { label: 'Certifications', value: 'UL, Energy Star qualified' }
        ]
      }
    ],
    productOptions: [
      'Bottled water and sparkling water',
      'Soft drinks and sodas',
      'Energy drinks',
      'Sports drinks',
      'Yogurt cups',
      'Sandwiches and wraps',
      'Protein bars',
      'Healthy snack options',
      'Chips and savory snacks',
      'Candy and chocolate',
      'Pastries and cookies',
      'Fresh fruit cups',
      'Ready-to-eat salads',
      'Cheese and cracker packs',
      'Hummus and veggie packs'
    ],
    bestFor: [
      'Small offices',
      'Limited space environments',
      'Boutique retail locations',
      'Small break rooms',
      'Medical waiting areas',
      'Small fitness centers',
      'Beauty salons and spas',
      'Small educational facilities',
      'Narrow corridors and alcoves',
      'Locations with space constraints'
    ],
    relatedMachines: [
      {
        id: 'km-vmrt-50-b',
        name: 'Premium Refrigerated Machine',
        model: 'KM-VMRT-50-B',
        image: '/images/products/placeholder.jpg'
      },
      {
        id: 'km-vmr-40-b',
        name: 'Standard Refrigerated Machine',
        model: 'KM-VMR-40-B',
        image: '/images/products/placeholder.jpg'
      },
      {
        id: 'km-vmnt-50-b',
        name: 'Non-Refrigerated Snack Machine',
        model: 'KM-VMNT-50-B',
        image: '/images/products/placeholder.jpg'
      }
    ],
    category: 'refrigerated'
  },

  // Non-Refrigerated Snack Machine
  'km-vmnt-50-b': {
    id: 'km-vmnt-50-b',
    name: 'Non-Refrigerated Snack Machine',
    model: 'KM-VMNT-50-B',
    shortDescription: 'Advanced snack vending solution with large HD touchscreen display, featuring versatile payment options and high-capacity storage for a wide variety of non-refrigerated products.',
    description: 'The KM-VMNT-50-B is our premium non-refrigerated vending machine designed specifically for snacks, confectionery, and shelf-stable products. Featuring a modern 21.5" HD touchscreen interface and multiple payment options, this machine provides an engaging purchase experience for users. With a substantial capacity for up to 50 different product selections and adjustable spirals to accommodate items of various sizes, it offers excellent variety and flexibility. Perfect for locations where refrigeration isn\'t required but a diverse selection of quality snacks is desired.',
    images: [
      { 
        id: 1, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Front view of Non-Refrigerated Snack Machine KM-VMNT-50-B' 
      },
      { 
        id: 2, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Side view of Non-Refrigerated Snack Machine KM-VMNT-50-B' 
      },
      { 
        id: 3, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Angle view of Non-Refrigerated Snack Machine KM-VMNT-50-B' 
      },
      { 
        id: 4, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Touchscreen interface of Non-Refrigerated Snack Machine KM-VMNT-50-B' 
      },
      { 
        id: 5, 
        src: '/images/products/placeholder.jpg', 
        alt: 'Interior view of Non-Refrigerated Snack Machine KM-VMNT-50-B' 
      }
    ],
    dimensions: [
      { label: 'Width', value: '50 inches (127 cm)' },
      { label: 'Depth', value: '30.2 inches (77 cm)' },
      { label: 'Height', value: '76.7 inches (195 cm)' },
      { label: 'Weight', value: '700 lbs (318 kg)' },
      { label: 'Capacity', value: '50+ product selections' },
      { label: 'Power', value: '120V / 60Hz' }
    ],
    features: [
      {
        title: '21.5" HD Touchscreen',
        description: 'Interactive high-definition display with intuitive navigation for enhanced user experience and easy product selection.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>'
      },
      {
        title: 'Versatile Payment Options',
        description: 'Integrated payment system accepting credit/debit cards, mobile payments (Apple Pay, Google Pay), and traditional cash methods.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>'
      },
      {
        title: 'Bill Recycler Technology',
        description: 'Advanced cash handling system that uses accepted bills for change, reducing the need for frequent coin refills.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.75c.414 0 .75.336.75.75v.75m0 0H18a2.25 2.25 0 002.25-2.25V4.5a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 4.5m10.5-1.5h.75c.414 0 .75.336.75.75v.75M3 18.75v.75c0 .414.336.75.75.75h.75M3.75 18h16.5m-16.5 0h-.75a.75.75 0 01-.75-.75v-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25" /></svg>'
      },
      {
        title: 'Adjustable Spiral System',
        description: 'Customizable product spirals that can be configured to accommodate various product sizes for maximum flexibility.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>'
      },
      {
        title: 'Remote Monitoring',
        description: 'Cloud-based inventory tracking system that provides real-time data on product levels, sales patterns, and machine status.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>'
      },
      {
        title: 'Energy-Efficient Design',
        description: 'Optimized power consumption with energy-saving LED lighting and standby mode that reduces electrical usage during low-traffic periods.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>'
      }
    ],
    specifications: [
      {
        category: 'Physical Specifications',
        items: [
          { label: 'Dimensions', value: '50"W x 30.2"D x 76.7"H' },
          { label: 'Weight', value: '700 lbs (318 kg)' },
          { label: 'Cabinet Construction', value: 'Powder-coated steel' },
          { label: 'Front Glass', value: 'Tempered safety glass' },
          { label: 'Capacity', value: '50+ product selections, 400+ items' }
        ]
      },
      {
        category: 'Vending Mechanism',
        items: [
          { label: 'Delivery System', value: 'Spiral-based product dispensing' },
          { label: 'Spiral Sizes', value: 'Multiple sizes available for different products' },
          { label: 'Anti-Theft', value: 'Drop sensor technology' },
          { label: 'Product Retrieval', value: 'Automatic delivery door with sensor' }
        ]
      },
      {
        category: 'Technology Features',
        items: [
          { label: 'Display', value: '21.5" HD touchscreen' },
          { label: 'Controller', value: 'Advanced microprocessor control system' },
          { label: 'Operating System', value: 'Proprietary vending OS with remote updates' },
          { label: 'Connectivity', value: '4G LTE, Wi-Fi, Ethernet' },
          { label: 'Remote Monitoring', value: 'Real-time inventory and sales tracking' }
        ]
      },
      {
        category: 'Payment Systems',
        items: [
          { label: 'Card Reader', value: 'EMV compliant for chip cards' },
          { label: 'Contactless', value: 'NFC for Apple Pay, Google Pay, Samsung Pay' },
          { label: 'Cash Handling', value: 'Bill acceptor for $1-$100 bills with recycler' },
          { label: 'Coin Mechanism', value: 'Multi-coin acceptor with change dispensing' }
        ]
      },
      {
        category: 'User Interface',
          items: [
            { label: 'Selection Method', value: 'Touchscreen with digital keypad' },
            { label: 'Product Display', value: 'Digital product images and information' },
            { label: 'Accessibility', value: 'ADA compliant, multi-language support' },
            { label: 'User Assistance', value: 'Digital help menu and support contact' }
          ]
        },
        {
          category: 'Electrical',
          items: [
            { label: 'Power Requirements', value: '120V AC, 60Hz' },
            { label: 'Power Consumption', value: 'Average 4.5 kWh/day' },
            { label: 'Lighting', value: 'Energy-efficient LED interior lighting' },
            { label: 'Certifications', value: 'UL, Energy Star qualified' }
          ]
        }
      ],
      productOptions: [
        'Chips and savory snacks',
        'Pretzels and popcorn',
        'Trail mix and nuts',
        'Cookies and baked goods',
        'Candy and chocolate bars',
        'Energy bars and protein bars',
        'Crackers and cheese snacks',
        'Dried fruit and jerky',
        'Granola bars and breakfast bars',
        'Gum and mints',
        'Meal replacement bars',
        'Rice cakes and healthy crisps',
        'Vegan snack options',
        'Gluten-free snacks',
        'Low-sugar alternatives',
        'Organic snack options',
        'Small packaged pastries',
        'Nutritional supplements',
        'Single-serve coffee packets',
        'Tea bags and hot chocolate packets'
      ],
      bestFor: [
        'Office break rooms',
        'Educational facilities',
        'Waiting areas',
        'Hotel lobbies and corridors',
        'Transit stations',
        'Shopping malls',
        'Entertainment venues',
        'Sports facilities',
        'Community centers',
        'Locations without refrigeration needs'
      ],
      relatedMachines: [
        {
          id: 'km-vmrt-50-b',
          name: 'Premium Refrigerated Machine',
          model: 'KM-VMRT-50-B',
          image: '/images/products/placeholder.jpg'
        },
        {
          id: 'km-vmr-40-b',
          name: 'Standard Refrigerated Machine',
          model: 'KM-VMR-40-B',
          image: '/images/products/placeholder.jpg'
        },
        {
          id: 'km-vmr-30-b',
          name: 'Compact Refrigerated Machine',
          model: 'KM-VMR-30-B',
          image: '/images/products/placeholder.jpg'
        }
      ],
      category: 'non-refrigerated'
    }
  };
  
  /**
   * Utility functions for accessing vending machine data
   */
  
  /**
   * Get all vending machines
   * @returns Array of all vending machine data
   */
  export const getAllVendingMachines = (): MachineData[] => {
    return Object.values(vendingMachineData);
  };
  
  /**
   * Get a specific vending machine by ID
   * @param id Machine ID
   * @returns Machine data or undefined if not found
   */
  export const getVendingMachineById = (id: string): MachineData | undefined => {
    return vendingMachineData[id];
  };
  
  /**
   * Get vending machines by category
   * @param category Machine category ('refrigerated' or 'non-refrigerated')
   * @returns Array of matching vending machines
   */
  export const getVendingMachinesByCategory = (category: 'refrigerated' | 'non-refrigerated'): MachineData[] => {
    return Object.values(vendingMachineData).filter(machine => machine.category === category);
  };
  
  /**
   * Get featured vending machines (can be customized based on business needs)
   * @param count Number of featured machines to return
   * @returns Array of featured vending machines
   */
  export const getFeaturedVendingMachines = (count: number = 2): MachineData[] => {
    // Based on popularity, newest models, or business priority
    // Return the Premium Refrigerated and Non-Refrigerated models
    const featuredIds = ['km-vmrt-50-b', 'km-vmnt-50-b'];
    return featuredIds.map(id => vendingMachineData[id]).slice(0, count);
  };
  
  export default vendingMachineData;