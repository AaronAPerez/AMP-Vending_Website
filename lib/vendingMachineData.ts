/**
 * Interface for vending machine data
 */
export interface VendingMachine {
    id: string;
    name: string;
    description: string;
    features: string[];
    imageUrl: string;
    category: 'snack' | 'beverage' | 'combo' | 'food';
    dimensions?: string;
    capacity?: string;
    price?: string;
    paymentOptions?: string[];
  }
  
  /**
   * Central data store for vending machines
   * This can be exported and used by both client and server components
   */
  export const machines: VendingMachine[] = [
    {
      id: 'snack-3566',
      name: 'AMS 35 Snack Machine',
      description: 'A versatile snack vending machine with adjustable shelving to accommodate various product sizes.',
      features: [
        'LED illumination for better product visibility',
        'iVend® guaranteed product delivery sensor system',
        'Up to 35 selections with adjustable shelving',
        'Energy-saving LED lighting',
        'ADA compliant'
      ],
      imageUrl: '/images/vending-machines/ams-35-snack.jpg',
      category: 'snack',
      dimensions: '72"H x 29.5"W x 36"D',
      capacity: 'Up to 450 items',
      paymentOptions: ['Credit Card', 'Cash', 'Mobile Payment']
    },
    {
      id: 'snack-3573',
      name: 'AMS 39 Snack Machine',
      description: 'Larger capacity snack machine with expanded selections and dual spiral delivery system.',
      features: [
        'Dual spiral delivery system for reliable vending',
        'Adjustable shelving configurations',
        'Enhanced delivery bin for easy product retrieval',
        'Touch screen interface option available',
        'Cashless payment compatible'
      ],
      
      imageUrl: '/images/vending-machines/ams-35-snack.jpg',
      // imageUrl: '/images/vending-machines/ams-39-snack.jpg',
      category: 'snack',
      dimensions: '72"H x 35.5"W x 36"D',
      capacity: 'Up to 630 items',
      paymentOptions: ['Credit Card', 'Cash', 'Mobile Payment']
    },
    {
      id: 'beverage-3612',
      name: 'Royal 650 Beverage Machine',
      description: 'High capacity cold beverage vending machine with multiple selections.',
      features: [
        'Can accommodate various bottle and can sizes',
        'Adjustable temperature control',
        'Live product display',
        'Energy-saving features with sleep mode',
        'Lighted product display with customizable branding'
      ],
      imageUrl: '/images/vending-machines/royal-650-beverage.jpg',
      category: 'beverage',
      dimensions: '72"H x 37"W x 32"D',
      capacity: 'Up to 650 bottles/cans',
      paymentOptions: ['Credit Card', 'Cash']
    },
    {
      id: 'combo-3674',
      name: 'AMS Combi 39 Machine',
      description: 'Combination snack and beverage machine offering maximum variety in a single footprint.',
      features: [
        'Snack and beverage options in one machine',
        'Customizable planograms for product variety',
        'Separate temperature zones',
        'Advanced touchscreen interface option',
        'Multiple payment system compatibility'
      ],
      imageUrl: '/images/vending-machines/ams-combi-39.jpg',
      category: 'combo',
      dimensions: '72"H x 39"W x 36"D', 
      capacity: 'Up to 400 snacks and 180 beverages',
      paymentOptions: ['Credit Card', 'Cash', 'Mobile Payment', 'Employee Badge']
    },
    {
      id: 'food-3695',
      name: 'AMS Fresh Food Machine',
      description: 'Temperature-controlled vending machine for fresh food items.',
      features: [
        'Health lock feature for food safety',
        'Maintains proper food storage temperature',
        'Flexible shelf configurations',
        'NAMA certified for perishable food',
        'Refrigeration monitoring system'
      ],
      imageUrl: '/images/vending-machines/ams-fresh-food.jpg',
      category: 'food',
      dimensions: '72"H x 35"W x 36"D',
      capacity: 'Up to 400 items',
      paymentOptions: ['Credit Card', 'Cash', 'Mobile Payment']
    },
    {
      id: 'beverage-3645',
      name: 'Vendo Vue Beverage Machine',
      description: 'Modern glass-front beverage vendor with enhanced merchandising capabilities.',
      features: [
        'Glass front for maximum product visibility',
        'Energy efficient LED lighting',
        'First-in, first-out loading system',
        'Climate-friendly refrigeration system',
        'High capacity with space-saving design'
      ],
      imageUrl: '/images/vending-machines/vendo-vue-beverage.jpg',
      category: 'beverage',
      dimensions: '72"H x 35"W x 34"D',
      capacity: 'Up to 500 bottles/cans',
      paymentOptions: ['Credit Card', 'Cash', 'Mobile Payment']
    },
    {
      id: 'combo-3680',
      name: 'Market Express Combo',
      description: 'Premium all-in-one vending solution with touchscreen interface and multiple product categories.',
      features: [
        '21.5" HD touchscreen interface',
        'Multiple temperature zones',
        'Supports snacks, beverages, and fresh food',
        'Real-time inventory monitoring capability',
        'Enhanced merchandising with digital product displays'
      ],
      imageUrl: '/images/Vending1.png',
      category: 'combo',
      dimensions: '72"H x 41"W x 38"D',
      capacity: 'Customizable configuration for up to 700 total items',
      paymentOptions: ['Credit Card', 'Cash', 'Mobile Payment', 'Employee Badge']
    }
  ];
  
  /**
   * Group machines by category for easy access
   */
  export const machinesByCategory = {
    snack: machines.filter(machine => machine.category === 'snack'),
    beverage: machines.filter(machine => machine.category === 'beverage'),
    combo: machines.filter(machine => machine.category === 'combo'),
    food: machines.filter(machine => machine.category === 'food')
  };
  
  /**
   * Get a machine by ID
   */
  export function getMachineById(id: string): VendingMachine | undefined {
    return machines.find(machine => machine.id === id);
  }