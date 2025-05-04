'use client';

import React, { useState, useRef } from 'react';
import { useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


const ProductSection = () => {
  // Ref for scrolling container
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Categories for filtering products
  
  // Products data for the showcase with updated image paths
  
  // State for filtering products
  const [] = useState<string>('all');
  
  
  // Animation with scroll
  useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

    {/* Category Tabs */}
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {['All Products', 'Popular Snacks', 'Beverages', 'Healthy Options', 'Energy Drinks'].map((category, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-full text-sm font-medium ${index === 0
            ? 'bg-[#FD5A1E] text-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#000000]'
            : 'bg-[#000000] text-[#F5F5F5] hover:bg-[#FD5A1E]/10 border border-[#a4acac]'
            } transition-colors`}
        >
          {category}
        </button>
      ))}
    </div>

    {/* Products Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {/* Product cards - these would be dynamically generated */}
      {[
        { name: 'Coca-Cola', category: 'beverages', image: '/images/products/coke.jpg', popular: true },
        { name: 'Doritos Nacho Cheese', category: 'snacks', image: '/images/products/doritos.jpg', popular: true },
        { name: 'Monster Energy', category: 'energy', image: '/images/products/monster.jpg', popular: true },
        { name: 'Lays Classic', category: 'snacks', image: '/images/products/lays.jpg', popular: true },
        { name: 'Snickers', category: 'snacks', image: '/images/products/snickers.jpg', popular: true },
        { name: 'Just Water', category: 'beverages', image: '/images/products/justwater.jpg', healthy: true },
        { name: 'Pop Tarts', category: 'snacks', image: '/images/products/poptarts.jpg', popular: true },
        { name: 'Red Bull', category: 'energy', image: '/images/products/redbull.jpg', popular: true },
        { name: 'M&Ms', category: 'snacks', image: '/images/products/mms.jpg', popular: true },
        { name: 'Diet Coke', category: 'beverages', image: '/images/products/dietcoke.jpg', healthy: true }
      ].map((product, index) => (
        <div key={index} className="bg-[#000000] rounded-lg overflow-hidden border border-[#a4acac] hover:border-[#FD5A1E] transition-all hover:scale-105 group">
          <div className="h-36 relative overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {product.popular && (
              <div className="absolute top-2 right-2 bg-[#FD5A1E] text-[#F5F5F5] text-xs px-2 py-1 rounded-full">
                Popular
              </div>
            )}
            {product.healthy && (
              <div className="absolute top-2 right-2 bg-green-500 text-[#F5F5F5] text-xs px-2 py-1 rounded-full">
                Healthy
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="text-[#F5F5F5] font-medium text-sm">{product.name}</h3>
            <p className="text-[#A5ACAF] text-xs capitalize">{product.category}</p>
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

// Helper function to get random position for floating products

// Helper function to get human-readable category name

// Helper function to get category style classes

export default ProductSection;