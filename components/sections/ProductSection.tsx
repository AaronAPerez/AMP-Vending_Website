'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, Info, Tag, ShoppingBag, Star, Check } from 'lucide-react';

/**
 * Product data interface for type safety
 */
interface Product {
  id: string;
  name: string;
  price: number;
  category: 'chips' | 'candy' | 'protein' | 'pastries' | 'nuts' | 'snacks' | 'beverages' | 'energy' | 'healthy';
  image: string;
  popular?: boolean;
  healthy?: boolean;
  details?: string;
}

/**
 * Product Card Component with Modern Design
 */
const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <motion.div
      className="relative group h-[280px] rounded-xl overflow-hidden shadow-lg border border-[#333333] hover:border-[#FD5A1E]/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * (index % 6) }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/products/placeholder.jpg';
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Tags */}
      <div className="absolute top-3 left-3 right-3 flex justify-between">
        {product.popular && (
          <div className="px-3 py-1 bg-[#FD5A1E] text-white text-xs rounded-full backdrop-blur-sm flex items-center">
            <Star className="w-3 h-3 mr-1" />
            Popular
          </div>
        )}
        {product.healthy && (
          <div className="ml-auto px-3 py-1 bg-green-500 text-white text-xs rounded-full backdrop-blur-sm flex items-center">
            <Check className="w-3 h-3 mr-1" />
            Healthy
          </div>
        )}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <h3 className="text-lg font-bold mb-1 text-white">{product.name}</h3>
        <div className="flex items-center mb-2">
          {/* <span className="text-sm text-gray-300 capitalize mr-2">{product.category}</span> */}
          {product.details && (
            <div className="relative group/tooltip">
              <Info className="w-4 h-4 text-[#FD5A1E]" />
              <div className="absolute bottom-full left-0 mb-2 p-2 bg-[#111111] text-xs text-[#A5ACAF] rounded shadow-lg w-48 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all">
                {product.details}
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom section with price and add button */}
        <div className="relative mt-2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#444444] to-transparent mb-3" />
          <div className="flex justify-between items-center">
            <span className="text-[#FD5A1E] font-bold text-md">
              {product.category}</span>
            {/* <span className="text-[#FD5A1E] font-bold text-lg">{formatPrice(product.price)}</span> */}
            <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs font-medium transition-colors text-white flex items-center">
              <ShoppingBag className="w-3 h-3 mr-1" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Hover Effect Glow */}
      <div className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FD5A1E]/20 to-transparent blur-md" />
      </div>
    </motion.div>
  );
};

/**
 * ProductSection component that displays the vending machine product catalog
 * Updated with modern styling and improved user experience
 */
const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  
  // Define products per row and initial rows to show
  const PRODUCTS_PER_ROW = 6; // For desktop view
  const INITIAL_ROWS = 2;

  // Reset animation when changing categories
  useEffect(() => {
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 100);
  }, [activeCategory]);

  /**
   * Complete product catalog with 50+ products
   */
  const productCatalog: Product[] = [
    // Chips & Savory Snacks ($1.75)
    { id: 'lays-classic', name: 'Lays Classic', price: 1.75, category: 'chips', image: '/images/products/lays.jpg', popular: true },
    { id: 'doritos-nacho', name: 'Doritos Nacho Cheese', price: 1.75, category: 'chips', image: '/images/products/doritos.jpg', popular: true },
    { id: 'cheetos', name: 'Cheetos', price: 1.75, category: 'chips', image: '/images/products/cheetos.jpg' },
    { id: 'lays-sour-cream', name: 'Lays Sour Cream & Onion', price: 1.75, category: 'chips', image: '/images/products/placeholder.jpg' },
    { id: 'fritos-original', name: 'Fritos Original', price: 1.75, category: 'chips', image: '/images/products/placeholder.jpg' },
    { id: 'doritos-cool-ranch', name: 'Doritos Cool Ranch', price: 1.75, category: 'chips', image: '/images/products/placeholder.jpg' },
    { id: 'ruffles-cheddar', name: 'Ruffles Cheddar & Sour Cream', price: 1.75, category: 'chips', image: '/images/products/placeholder.jpg' },
    { id: 'lays-bbq', name: 'Lays BBQ', price: 1.75, category: 'chips', image: '/images/products/placeholder.jpg' },
    { id: 'funyuns', name: 'Funyuns Onion Rings', price: 1.75, category: 'chips', image: '/images/products/placeholder.jpg' },
    { id: 'cheetos-flamin-hot', name: 'Cheetos Flamin Hot', price: 1.75, category: 'chips', image: '/images/products/placeholder.jpg', popular: true },
  
    // Candy & Chocolate ($1.75)
    { id: 'snickers', name: 'Snickers', price: 1.75, category: 'candy', image: '/images/products/snickers.jpg', popular: true },
    { id: 'kitkat', name: 'Kit Kat', price: 1.75, category: 'candy', image: '/images/products/placeholder.jpg' },
    { id: 'threemusketeers', name: '3 Musketeers', price: 1.75, category: 'candy', image: '/images/products/threemusketeers.jpg' },
    { id: 'mms', name: 'M&Ms', price: 1.75, category: 'candy', image: '/images/products/mms.jpg', popular: true },
    { id: 'skittles', name: 'Skittles', price: 1.75, category: 'candy', image: '/images/products/skittles.jpg' },
    { id: 'starburst', name: 'Starburst', price: 1.75, category: 'candy', image: '/images/products/starburst.jpg' },
    { id: 'twix', name: 'Twix', price: 1.75, category: 'candy', image: '/images/products/placeholder.jpg' },
    { id: 'milky-way', name: 'Milky Way', price: 1.75, category: 'candy', image: '/images/products/placeholder.jpg' },
    { id: 'hershey', name: 'Hershey Bar', price: 1.75, category: 'candy', image: '/images/products/placeholder.jpg' },
    { id: 'butterfinger', name: 'Butterfinger', price: 1.75, category: 'candy', image: '/images/products/placeholder.jpg' },
  
    // Protein & Energy Bars ($1.75-$2.25)
    { id: 'kind-bar', name: 'KIND Bar', price: 2.25, category: 'protein', image: '/images/products/placeholder.jpg', healthy: true },
    { id: 'cliff-bar', name: 'Cliff Bar', price: 2.25, category: 'protein', image: '/images/products/placeholder.jpg', healthy: true, details: '9g protein per bar' },
    { id: 'rxbar', name: 'RXBAR', price: 2.25, category: 'protein', image: '/images/products/placeholder.jpg', healthy: true, details: 'Whole food protein bar' },
    { id: 'quest-bar', name: 'Quest Bar', price: 2.25, category: 'protein', image: '/images/products/placeholder.jpg', healthy: true, details: '20g protein, low sugar' },
    { id: 'pure-protein', name: 'Pure Protein Bar', price: 2.25, category: 'protein', image: '/images/products/placeholder.jpg', healthy: true, details: '21g protein per bar' },
  
    // Pastries & Cookies ($1.75-$2.25)
    { id: 'poptarts', name: 'Pop Tarts', price: 1.75, category: 'pastries', image: '/images/products/poptarts.jpg', popular: true },
    { id: 'oreos', name: 'Oreo Cookies', price: 1.75, category: 'pastries', image: '/images/products/placeholder.jpg', popular: true },
    { id: 'hostess-cupcakes', name: 'Hostess Cupcakes', price: 2.25, category: 'pastries', image: '/images/products/placeholder.jpg' },
    { id: 'donut-packs', name: '6 Mini Donut Packs', price: 2.25, category: 'pastries', image: '/images/products/placeholder.jpg' },
    { id: 'choc-chip-cookies', name: 'Chocolate Chip Cookies', price: 2.25, category: 'pastries', image: '/images/products/placeholder.jpg' },
    { id: 'honey-bun', name: 'Honey Bun', price: 1.75, category: 'pastries', image: '/images/products/placeholder.jpg' },
  
    // Nuts & Crackers ($1.75)
    { id: 'ritz-peanut', name: 'Ritz Crackers w/ Peanut Butter', price: 1.75, category: 'nuts', image: '/images/products/ritz.jpg' },
    { id: 'planters', name: 'Planters Peanuts', price: 1.75, category: 'nuts', image: '/images/products/planters.jpg' },
    { id: 'blue-diamond', name: 'Blue Diamond Almonds', price: 1.75, category: 'nuts', image: '/images/products/placeholder.jpg', healthy: true, details: '100 calories per pack' },
    { id: 'trail-mix', name: 'Trail Mix', price: 1.75, category: 'nuts', image: '/images/products/placeholder.jpg', healthy: true },
    { id: 'cashews', name: 'Roasted Cashews', price: 1.75, category: 'nuts', image: '/images/products/placeholder.jpg', healthy: true },
  
    // Other Snacks ($1.75-$2.25)
    { id: 'beef-jerky', name: 'Beef Jerky', price: 2.25, category: 'snacks', image: '/images/products/placeholder.jpg' },
    { id: 'slim-jim', name: 'Slim Jim', price: 1.75, category: 'snacks', image: '/images/products/placeholder.jpg' },
    { id: 'rice-krispies', name: 'Rice Krispies Treat', price: 1.75, category: 'snacks', image: '/images/products/placeholder.jpg' },
    { id: 'fruit-snacks', name: 'Fruit Snacks', price: 1.75, category: 'snacks', image: '/images/products/placeholder.jpg' },
  
    // Beverages ($2.50)
    { id: 'coca-cola', name: 'Coca-Cola', price: 2.50, category: 'beverages', image: '/images/products/coke.jpg', popular: true },
    { id: 'coca-cola-zero', name: 'Coca-Cola Zero', price: 2.50, category: 'beverages', image: '/images/products/cocacolazero.jpg', popular: true },
    { id: 'diet-coke', name: 'Diet Coke', price: 2.50, category: 'beverages', image: '/images/products/dietcoke.jpg', healthy: true },
    { id: 'dr-pepper', name: 'Dr Pepper', price: 2.50, category: 'beverages', image: '/images/products/drpepper.jpg' },
    { id: 'mountain-dew', name: 'Mountain Dew', price: 2.50, category: 'beverages', image: '/images/products/mountaindew.jpg', popular: true },
    { id: 'orange-crush', name: 'Orange Crush', price: 2.50, category: 'beverages', image: '/images/products/orangecrush.jpg', popular: true },
    { id: 'gatorade', name: 'Gatorade', price: 2.50, category: 'beverages', image: '/images/products/gatorade.jpg' },
    { id: 'just-water', name: 'Just Water', price: 2.50, category: 'beverages', image: '/images/products/justwater.jpg', healthy: true },
    { id: 'sprite', name: 'Sprite', price: 2.50, category: 'beverages', image: '/images/products/placeholder.jpg' },
    { id: 'pepsi', name: 'Pepsi', price: 2.50, category: 'beverages', image: '/images/products/placeholder.jpg' },
    { id: 'diet-pepsi', name: 'Diet Pepsi', price: 2.50, category: 'beverages', image: '/images/products/placeholder.jpg' },
    { id: 'fanta', name: 'Fanta Orange', price: 2.50, category: 'beverages', image: '/images/products/placeholder.jpg' },
  
    // Energy Drinks ($3.25-$4.00)
    { id: 'red-bull-sf', name: 'Sugar Free Red Bull', price: 3.25, category: 'energy', image: '/images/products/redbull-sf.jpg', healthy: true, details: '8.4 oz sugar free' },
    { id: 'red-bull-12oz', name: 'Red Bull', price: 4.00, category: 'energy', image: '/images/products/redbull.jpg', details: '12 fl oz sugar free' },
    { id: 'monster', name: 'Monster Energy', price: 4.00, category: 'energy', image: '/images/products/monster.jpg', popular: true },
    { id: 'monster-zero', name: 'Monster Zero Ultra', price: 4.00, category: 'energy', image: '/images/products/placeholder.jpg', healthy: true },
    { id: 'bang', name: 'Bang Energy Drink', price: 4.00, category: 'energy', image: '/images/products/placeholder.jpg' },
    { id: 'rockstar', name: 'Rockstar Energy', price: 4.00, category: 'energy', image: '/images/products/placeholder.jpg' },
  
    // Healthy Options
    { id: 'baked-lays', name: 'Baked Lays', price: 1.75, category: 'healthy', image: '/images/products/placeholder.jpg', healthy: true },
    { id: 'veggie-chips', name: 'Veggie Chips', price: 2.25, category: 'healthy', image: '/images/products/placeholder.jpg', healthy: true },
    { id: 'skinny-pop', name: 'Skinny Pop Popcorn', price: 1.75, category: 'healthy', image: '/images/products/placeholder.jpg', healthy: true },
    { id: 'dried-fruit', name: 'Dried Fruit Mix', price: 2.25, category: 'healthy', image: '/images/products/placeholder.jpg', healthy: true }
  ];

  /**
   * Product categories with labels and actual counts
   */
  const productCategories = [
    { id: 'all', label: 'All Products', count: productCatalog.length },
    { id: 'popular', label: 'Popular', count: productCatalog.filter(p => p.popular).length },
    { id: 'healthy', label: 'Healthy Options', count: productCatalog.filter(p => p.healthy).length },
    { id: 'chips', label: 'Chips', count: productCatalog.filter(p => p.category === 'chips').length },
    { id: 'candy', label: 'Candy & Chocolate', count: productCatalog.filter(p => p.category === 'candy').length },
    { id: 'protein', label: 'Protein Bars', count: productCatalog.filter(p => p.category === 'protein').length },
    { id: 'pastries', label: 'Pastries & Cookies', count: productCatalog.filter(p => p.category === 'pastries').length },
    { id: 'nuts', label: 'Nuts & Crackers', count: productCatalog.filter(p => p.category === 'nuts').length },
    { id: 'beverages', label: 'Beverages', count: productCatalog.filter(p => p.category === 'beverages').length },
    { id: 'energy', label: 'Energy Drinks', count: productCatalog.filter(p => p.category === 'energy').length }
  ];

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
   * Limit products displayed based on expand/collapse state
   */
  const displayProducts = isExpanded 
    ? filteredProducts 
    : filteredProducts.slice(0, PRODUCTS_PER_ROW * INITIAL_ROWS);
  
  const hasMoreProducts = filteredProducts.length > PRODUCTS_PER_ROW * INITIAL_ROWS;

  /**
   * Toggle expand/collapse
   */
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    
    // Scroll to "See More" button position when collapsing
    if (isExpanded) {
      setTimeout(() => {
        const expandButton = document.getElementById('expand-button');
        if (expandButton) {
          expandButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4">
          <Tag size={16} />
          Product Selection
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
          <span className="text-[#FD5A1E]">50+</span> Premium Products
        </h2>
        <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
          Customizable selection of snacks and beverages to meet your workplace needs
        </p>
      </motion.div>

      {/* Category Filters - Styled Tabs */}
      <motion.div 
        className="mb-12 overflow-x-auto pb-4 -mx-4 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative">
          {/* Background Track */}
          <div className="absolute h-10 inset-x-0 top-1/2 -translate-y-1/2 bg-[#111111] rounded-full"></div>
          
          {/* Scrollable Categories */}
          <div className="relative flex flex-nowrap gap-2 justify-start md:justify-center md:flex-wrap">
            {productCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setIsExpanded(false); // Collapse when changing category
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-[#FD5A1E] text-white shadow-lg shadow-[#FD5A1E]/25'
                    : 'bg-[#1a1a1a] text-[#F5F5F5] hover:bg-[#333333]'
                }`}
                aria-pressed={activeCategory === category.id}
                aria-label={`Filter by ${category.label}. ${category.count} items.`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
                <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                  activeCategory === category.id ? 'bg-white/20' : 'bg-[#FD5A1E]/10 text-[#FD5A1E]'
                }`}>
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="relative">
        {/* Category Title */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-xl font-bold text-[#F5F5F5]">
            {productCategories.find(c => c.id === activeCategory)?.label || 'All Products'}
            <span className="ml-2 text-[#A5ACAF]">
              ({filteredProducts.length} items)
            </span>
          </h3>
        </motion.div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {animateCards && displayProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-[#A5ACAF] mb-4">No products found in this category.</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="px-4 py-2 bg-[#FD5A1E]/10 text-[#FD5A1E] rounded-full text-sm font-medium transition-colors hover:bg-[#FD5A1E]/20"
            >
              View All Products
            </button>
          </div>
        )}
      </div>

      {/* Expand/Collapse Button */}
      {hasMoreProducts && (
        <motion.div 
          id="expand-button" 
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={toggleExpand}
            className="group flex items-center gap-2 px-6 py-3 bg-[#111111] border border-[#333333] hover:border-[#FD5A1E] rounded-full transition-all hover:bg-[#1a1a1a]"
            aria-expanded={isExpanded}
            aria-controls="product-grid"
          >
            <span className="text-[#F5F5F5]">
              {isExpanded ? 'Show Less' : `Show ${filteredProducts.length - displayProducts.length} More Products`}
            </span>
            <ChevronDown 
              className={`h-5 w-5 text-[#FD5A1E] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </motion.div>
      )}

      {/* Product Features Section */}
      <motion.div 
        className="mt-16 grid md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {/* Feature 1 */}
        <div className="bg-[#111111] p-6 rounded-xl border border-[#333333] hover:border-[#FD5A1E] transition-all">
          <div className="bg-[#FD5A1E]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Star className="h-6 w-6 text-[#FD5A1E]" />
          </div>
          <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">Premium Selection</h3>
          <p className="text-[#A5ACAF]">
            Curated collection of over 50 premium snacks and beverages, including popular brands and healthy alternatives.
          </p>
        </div>
        
        {/* Feature 2 */}
        <div className="bg-[#111111] p-6 rounded-xl border border-[#333333] hover:border-[#FD5A1E] transition-all">
          <div className="bg-[#FD5A1E]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">Customizable Options</h3>
          <p className="text-[#A5ACAF]">
            Tailor the product selection to your workplace preferences with regular updates based on consumption patterns and feedback.
          </p>
        </div>
        
        {/* Feature 3 */}
        <div className="bg-[#111111] p-6 rounded-xl border border-[#333333] hover:border-[#FD5A1E] transition-all">
          <div className="bg-[#FD5A1E]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
           </svg>
         </div>
         <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">Regular Restocking</h3>
         <p className="text-[#A5ACAF]">
           We handle all inventory management and restocking, ensuring your favorite products are always available when you need them.
         </p>
       </div>
     </motion.div>

     {/* Customization Banner */}
     {/* <motion.div 
       className="mt-12 rounded-xl overflow-hidden border border-[#333333]"
       initial={{ opacity: 0, y: 30 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, delay: 0.6 }}
     >
       <div className="bg-gradient-to-r from-[#111111] to-[#1a1a1a] p-8">
         <div className="flex flex-col md:flex-row items-center gap-8">
           {/* Image side 
           <div className="relative w-full md:w-1/3 aspect-video md:aspect-square rounded-lg overflow-hidden">
             <Image 
               src="/images/products/product-selection.jpg" 
               alt="Product customization illustration" 
               fill 
               className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
             <div className="absolute bottom-4 left-4 bg-[#FD5A1E] text-white px-3 py-1 rounded-full text-sm">
               Customizable
             </div>
           </div>
           
           {/* Content side 
           <div className="w-full md:w-2/3">
             <h3 className="text-2xl font-bold text-[#F5F5F5] mb-4">
               Tailor Your Product Selection
             </h3>
             <p className="text-[#A5ACAF] mb-6">
               Product selection can be customized based on your workplace preferences and regularly 
               updated based on consumption patterns and feedback. We work with you to ensure your 
               vending machines offer the perfect mix of options for your team.
             </p>
             
             {/* Feature list 
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
               <div className="flex items-start">
                 <Check className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5 flex-shrink-0" />
                 <span className="text-[#F5F5F5]">Popular brand-name products</span>
               </div>
               <div className="flex items-start">
                 <Check className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5 flex-shrink-0" />
                 <span className="text-[#F5F5F5]">Healthy and dietary options</span>
               </div>
               <div className="flex items-start">
                 <Check className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5 flex-shrink-0" />
                 <span className="text-[#F5F5F5]">Seasonal and rotating selections</span>
               </div>
               <div className="flex items-start">
                 <Check className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5 flex-shrink-0" />
                 <span className="text-[#F5F5F5]">Data-driven product optimization</span>
               </div>
             </div>
             
             {/* CTA button 
             <Link
               href="/contact"
               className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-white font-medium rounded-full hover:bg-[#FD5A1E]/90 transition-colors shadow-lg shadow-[#FD5A1E]/20"
             >
               <span>Customize Your Selection</span>
               <ArrowRight className="ml-2 h-5 w-5" />
             </Link>
           </div>
         </div>
       </div>
     </motion.div> */}
   </div>
 );
};

export default ProductSection;