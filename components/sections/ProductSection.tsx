'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Product data interface for type safety
 */
interface Product {
  id: string;
  name: string;
  price: number;
  category: 'chips' | 'candy' | 'protein' | 'pastries' | 'nuts' | 'snacks' | 'beverages' | 'energy';
  image: string;
  popular?: boolean;
  healthy?: boolean;
  details?: string;
}

/**
 * Complete product catalog based on the uploaded list
 */
const productCatalog: Product[] = [
  // Chips ($1.75)
  { id: 'lays-classic', name: 'Lays Classic', price: 1.75, category: 'chips', image: '/images/products/lays.jpg', popular: true },
  { id: 'doritos-nacho', name: 'Doritos Nacho Cheese', price: 1.75, category: 'chips', image: '/images/products/doritos.jpg', popular: true },
  { id: 'cheetos', name: 'Cheetos', price: 1.75, category: 'chips', image: '/images/products/cheetos.jpg' },

  // Candy & Chocolate ($1.75)
  { id: 'snickers', name: 'Snickers', price: 1.75, category: 'candy', image: '/images/products/snickers.jpg', popular: true },
  { id: 'reeses', name: 'Reese\'s', price: 1.75, category: 'candy', image: '/images/products/reeses.jpg' },
  { id: 'mms', name: 'M&Ms', price: 1.75, category: 'candy', image: '/images/products/mms.jpg', popular: true },
  { id: 'skittles', name: 'Skittles', price: 1.75, category: 'candy', image: '/images/products/skittles.jpg' },

  // Protein Bars ($1.75)
  {
    id: 'clean-protein', name: 'Clean Protein Bars', price: 1.75, category: 'protein', image: '/images/products/proteinbar.jpg',
    healthy: true, details: '15g protein, 200 calories'
  },

  // Pastries ($1.75)
  { id: 'poptarts', name: 'Pop Tarts', price: 1.75, category: 'pastries', image: '/images/products/poptarts.jpg', popular: true },

  // Nuts & Crackers ($1.75)
  { id: 'ritz-peanut', name: 'Ritz Crackers w/ Peanut Butter', price: 1.75, category: 'snacks', image: '/images/products/ritz.jpg' },
  { id: 'planters', name: 'Planters Peanuts', price: 1.75, category: 'nuts', image: '/images/products/planters.jpg' },
  {
    id: 'blue-diamond', name: 'Blue Diamond Almonds', price: 1.75, category: 'nuts', image: '/images/products/bluediamond.jpg',
    healthy: true, details: '100 calories per pack'
  },

  // Premium Snacks ($2.25)
  { id: 'beef-jerky', name: 'Beef Jerky', price: 2.25, category: 'snacks', image: '/images/products/jerky.jpg' },
  { id: 'donut-packs', name: '6 Mini Donut Packs', price: 2.25, category: 'pastries', image: '/images/products/donuts.jpg' },
  { id: 'choc-chip-cookies', name: 'Chocolate Chip Cookies', price: 2.25, category: 'pastries', image: '/images/products/cookies.jpg' },

  // Beverages
  { id: 'coca-cola', name: 'Coca-Cola', price: 2.50, category: 'beverages', image: '/images/products/coke.jpg', popular: true },
  { id: 'diet-coke', name: 'Diet Coke', price: 2.50, category: 'beverages', image: '/images/products/dietcoke.jpg', healthy: true },
  { id: 'dr-pepper', name: 'Dr Pepper', price: 2.50, category: 'beverages', image: '/images/products/drpepper.jpg' },
  { id: 'mountain-dew', name: 'Mountain-Dew', price: 2.50, category: 'beverages', image: '/images/products/mountaindew.jpg', popular: true },
  { id: 'orange-crush', name: 'Orange Crush', price: 2.50, category: 'beverages', image: '/images/products/orangecrush.jpg', popular: true },
  { id: 'gatorade', name: 'Gatorade', price: 2.50, category: 'beverages', image: '/images/products/gatorade.jpg' },
  { id: 'just-water', name: 'Just Water', price: 2.50, category: 'beverages', image: '/images/products/justwater.jpg', healthy: true },

  // Energy Drinks
  {
    id: 'red-bull-sf', name: 'Sugar Free Red Bull', price: 3.25, category: 'energy', image: '/images/products/redbull-sf.jpg',
    healthy: true, details: '8.4 oz sugar free'
  },
  {
    id: 'red-bull-12oz', name: 'Red Bull', price: 4.00, category: 'energy', image: '/images/products/redbull.jpg',
    details: '12 fl oz sugar free'
  },
  { id: 'monster', name: 'Monster Energy', price: 4.00, category: 'energy', image: '/images/products/monster.jpg', popular: true }
];

/**
 * Product categories with labels and counts
 */
const productCategories = [
  { id: 'all', label: 'All Products', count: productCatalog.length },
  { id: 'popular', label: 'Popular', count: productCatalog.filter(p => p.popular).length },
  { id: 'healthy', label: 'Healthy Options', count: productCatalog.filter(p => p.healthy).length },
  { id: 'chips', label: 'Chips', count: productCatalog.filter(p => p.category === 'chips').length },
  { id: 'candy', label: 'Candy & Chocolate', count: productCatalog.filter(p => p.category === 'candy').length },
  { id: 'beverages', label: 'Beverages', count: productCatalog.filter(p => p.category === 'beverages').length },
  { id: 'energy', label: 'Energy Drinks', count: productCatalog.filter(p => p.category === 'energy').length }
];

/**
 * ProductSection component that displays the vending machine product catalog
 */
const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  /**
   * Filter products based on active category
   */
  const getFilteredProducts = () => {
    if (activeCategory === 'all') return productCatalog;
    if (activeCategory === 'popular') return productCatalog.filter(p => p.popular);
    if (activeCategory === 'healthy') return productCatalog.filter(p => p.healthy);
    return productCatalog.filter(p => p.category === activeCategory);
  };

  const filteredProducts = getFilteredProducts();

  /**
   * Format price display
   */
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
          Product Selection
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
          50+ Premium Products
        </h2>
        <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
          Customizable selection of snacks and beverages to meet your workplace needs
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {productCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id
                ? 'bg-[#FD5A1E] text-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#000000]'
                : 'bg-[#000000] text-[#F5F5F5] hover:bg-[#FD5A1E]/10 border border-[#a4acac]'
              }`}
            aria-pressed={activeCategory === category.id}
            aria-label={`Filter by ${category.label}. ${category.count} items.`}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#000000] rounded-lg overflow-hidden border border-[#a4acac] hover:border-[#FD5A1E] transition-all hover:scale-105 group"
          >
            {/* Product Image */}
            <div className="h-36 relative overflow-hidden bg-[#4d4d4d]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/api/placeholder/400/320'; // Use Next.js placeholder
                }}
              />

              {/* <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/products/placeholder.jpg';
                }}
              /> */}

              {/* Product Tags */}
              {product.popular && (
                <div className="absolute top-2 right-2 bg-[#FD5A1E] text-[#F5F5F5] text-xs px-2 py-1 rounded-full">
                  Popular
                </div>
              )}
              {product.healthy && (
                <div className="absolute top-2 left-2 bg-green-500 text-[#F5F5F5] text-xs px-2 py-1 rounded-full">
                  Healthy
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-3">
              <h3 className="text-[#F5F5F5] font-medium text-sm">{product.name}</h3>
              <p className="text-[#A5ACAF] text-xs capitalize">{product.category}</p>
              {product.details && (
                <p className="text-[#A5ACAF] text-xs italic mt-1">{product.details}</p>
              )}
              <p className="text-[#FD5A1E] font-bold mt-2">{formatPrice(product.price)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Product Rotation Banner */}
      <div className="mt-10 bg-[#FD5A1E]/10 border border-[#FD5A1E] rounded-lg p-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-[#F5F5F5]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Product selection can be customized based on your workplace preferences and regularly updated based on feedback.</span>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-10 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors font-medium"
        >
          Customize Your Selection
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProductSection;