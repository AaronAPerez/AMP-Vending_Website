'use client';

import ResponsiveGrid from '@/components/layout/ResponsiveGrid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getProductImageProps } from '@/lib/utils/imageOptimization';

/**
 * Enhanced Background Overlay Card Component - Lighthouse Optimized
 * 
 * Performance Improvements:
 * - Optimized image sizing and quality settings
 * - Proper blur placeholder implementation
 * - Reduced unnecessary re-renders
 * - Better responsive image handling
 */
const BackgroundOverlayCard = ({ product }: { product: Product }) => {
  return (
    <div className="relative group h-60 sm:h-72 overflow-hidden rounded-xl shadow-xl">
      <div className="absolute inset-0">
        <Image
          {...getProductImageProps(
            product.image,
            `${product.name} - Available in AMP Vending machines`,
            false // Not priority since these are below the fold
          )}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/products/placeholder.jpg';
          }}
        />
      </div>

      {/* Gradient Overlay - Ensure visibility on all screens */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Tags with Improved Contrast */}
      <div className="absolute top-2 left-2 right-2 flex justify-between">
        {product.popular && (
          <div className="px-2 py-1 bg-[#FD5A1E] text-[#000000] text-xs font-medium rounded-full backdrop-blur-sm shadow-sm">
            Popular
          </div>
        )}
        {product.healthy && (
          <div className="ml-auto px-2 py-1 bg-green-700 text-white text-xs font-medium rounded-full backdrop-blur-sm shadow-sm">
            Healthy
          </div>
        )}
      </div>

      {/* Content - Enhanced for Better Accessibility */}
      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 text-white">
        <h3 className="text-base sm:text-lg font-bold mb-0.5 sm:mb-1" id={`product-${product.id}`}>
          {product.name}
        </h3>

        {product.details && (
          <p className="text-xs text-gray-300 italic mb-1 sm:mb-2 line-clamp-2" aria-describedby={`product-${product.id}`}>
            {product.details}
          </p>
        )}

        {/* Bottom section with category */}
        <div className="relative mt-1 sm:mt-2">
          <div
            className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-2"
            aria-hidden="true"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs sm:text-sm text-gray-300 capitalize">
              {product.category} snacks
            </p>
          </div>
        </div>
      </div>

      {/* Hover Effect Glow - Optimized for Performance */}
      <div
        className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FD5A1E]/20 to-transparent blur-md" />
      </div>
    </div>
  );
};

export interface Product {
  id: string;
  name: string;
  category: 'chips' | 'candy' | 'protein' | 'pastries' | 'nuts' | 'snacks' | 'beverages' | 'energy' | 'healthy';
  image: string;
  popular?: boolean;
  healthy?: boolean;
  details?: string;
}

/**
 * ProductSection Component - Enhanced Performance & Accessibility
 * 
 * Lighthouse Optimizations:
 * - Reduced DOM complexity by limiting initial products shown
 * - Better image optimization and loading strategies
 * - Enhanced accessibility with proper ARIA labels
 * - Improved semantic markup for SEO
 * - Performance-optimized animations and state management
 */
const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const [, setAnimateCards] = useState(false);

  // Reduced products per row for better performance
  const PRODUCTS_PER_ROW = 4; // Reduced from 5 to 4 for better performance
  const INITIAL_ROWS = 2;

  // Reset animation when changing categories
  useEffect(() => {
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 100);
  }, [activeCategory]);

  /**
   * Optimized product catalog - Reduced for better performance
   * Focus on most popular and essential products
   */
  const productCatalog: Product[] = [
    // Most Popular Chips & Savory Snacks
    { id: 'lays-classic', name: 'Lays Classic', category: 'chips', image: '/images/products/lays.jpg', popular: true },
    { id: 'doritos-nacho', name: 'Doritos Nacho Cheese', category: 'chips', image: '/images/products/doritos-nacho-cheese.jpg', popular: true },
    { id: 'cheetos', name: 'Cheetos', category: 'chips', image: '/images/products/cheetos.jpg' },
    { id: 'lays-sour-cream', name: 'Lays Sour Cream & Onion', category: 'chips', image: '/images/products/layssourcream.jpg' },
    { id: 'doritos-cool-ranch', name: 'Doritos Cool Ranch', category: 'chips', image: '/images/products/doritos-cool-ranch.jpg' },
    { id: 'lays-bbq', name: 'Lays BBQ', category: 'chips', image: '/images/products/lays-bbq.jpg' },

    // Most Popular Candy & Chocolate
    { id: 'snickers', name: 'Snickers', category: 'candy', image: '/images/products/snickers.jpg', popular: true },
    { id: 'kitkat', name: 'Kit Kat', category: 'candy', image: '/images/products/kitkat.jpg' },
    { id: 'threemusketeers', name: '3 Musketeers', category: 'candy', image: '/images/products/threemusketeers.jpg' },
    { id: 'mms', name: 'M&Ms', category: 'candy', image: '/images/products/mms.jpg', popular: true },
    { id: 'skittles', name: 'Skittles', category: 'candy', image: '/images/products/skittles.jpg' },
    { id: 'starburst', name: 'Starburst', category: 'candy', image: '/images/products/starburst.jpg' },

    // Essential Pastries & Cookies
    { id: 'poptarts', name: 'Pop Tarts', category: 'pastries', image: '/images/products/poptarts.jpg', popular: true },
    { id: 'oreos', name: 'Oreo Cookies', category: 'pastries', image: '/images/products/oreo.jpg', popular: true },

    // Popular Nuts & Crackers
    { id: 'ritz-peanut', name: 'Ritz Crackers w/ Peanut Butter', category: 'nuts', image: '/images/products/ritz.jpg' },
    { id: 'planters', name: 'Planters Peanuts', category: 'nuts', image: '/images/products/planters.jpg' },

    // Essential Beverages
    { id: 'coca-cola', name: 'Coca-Cola', category: 'beverages', image: '/images/products/coke.jpg', popular: true },
    { id: 'coca-cola-zero', name: 'Coca-Cola Zero', category: 'beverages', image: '/images/products/cocacolazero.jpg', popular: true },
    { id: 'diet-coke', name: 'Diet Coke', category: 'beverages', image: '/images/products/dietcoke.jpg', healthy: true },
    { id: 'dr-pepper', name: 'Dr Pepper', category: 'beverages', image: '/images/products/drpepper.jpg' },
    { id: 'mountain-dew', name: 'Mountain Dew', category: 'beverages', image: '/images/products/mountaindew.jpg', popular: true },
    { id: 'orange-crush', name: 'Orange Crush', category: 'beverages', image: '/images/products/orangecrush.jpg', popular: true },
    { id: 'gatorade', name: 'Gatorade', category: 'beverages', image: '/images/products/gatorade.jpg' },
    { id: 'just-water', name: 'Just Water', category: 'beverages', image: '/images/products/justwater.jpg', healthy: true },
    { id: 'sprite', name: 'Sprite', category: 'beverages', image: '/images/products/Sprite.jpg' },
    { id: 'pepsi', name: 'Pepsi', category: 'beverages', image: '/images/products/pepsi.jpg' },
    { id: 'fanta', name: 'Fanta Orange', category: 'beverages', image: '/images/products/fanta.jpg' },

    // Popular Energy Drinks
    { id: 'red-bull-sf', name: 'Sugar Free Red Bull', category: 'energy', image: '/images/products/redbull-sf.jpg', healthy: true, details: '8.4 oz sugar free' },
    { id: 'red-bull-12oz', name: 'Red Bull', category: 'energy', image: '/images/products/redbull.jpg', details: '12 fl oz' },
    { id: 'monster', name: 'Monster Energy', category: 'energy', image: '/images/products/monster.jpg', popular: true },
  ];

  /**
   * Product categories with accurate counts
   */
  const productCategories = [
    { id: 'all', label: 'All Products', count: productCatalog.length },
    { id: 'popular', label: 'Popular', count: productCatalog.filter(p => p.popular).length },
    { id: 'healthy', label: 'Healthy Options', count: productCatalog.filter(p => p.healthy).length },
    { id: 'chips', label: 'Chips', count: productCatalog.filter(p => p.category === 'chips').length },
    { id: 'candy', label: 'Candy & Chocolate', count: productCatalog.filter(p => p.category === 'candy').length },
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
   * Enhanced toggle expand/collapse with accessibility
   */
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);

    // Announce to screen readers
    const announcement = isExpanded
      ? 'Product grid collapsed'
      : `Showing ${filteredProducts.length - displayProducts.length} additional products`;

    // Create temporary announcement element for screen readers
    if (typeof window !== 'undefined') {
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.style.position = 'absolute';
      announcer.style.left = '-10000px';
      announcer.textContent = announcement;
      document.body.appendChild(announcer);
      setTimeout(() => document.body.removeChild(announcer), 1000);
    }

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

  /**
   * Handle category filter with analytics tracking
   */
  const handleCategoryFilter = (categoryId: string) => {
    setActiveCategory(categoryId);
    setIsExpanded(false);

    // Track filter usage for analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = window.gtag as (command: string, eventName: string, params: Record<string, unknown>) => void;
      gtag('event', 'filter_products', {
        event_category: 'Product Selection',
        event_label: categoryId,
        value: 1
      });
    }
  };

  return (
    <>
      {/* Enhanced Product Category Filters with Better Accessibility */}
      <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4">
        <div
          className="flex flex-nowrap gap-2 justify-start md:justify-center md:flex-wrap"
          role="tablist"
          aria-label="Product category filters"
        >
          {productCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm whitespace-nowrap ${activeCategory === category.id
                ? 'bg-[#FD5A1E] text-[#000000] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors'
                : 'bg-[#000000]/60 text-[#F5F5F5] border border-[#a4acac] hover:border-[#FD5A1E] hover:bg-[#FD5A1E]/10'
                }`}
              aria-pressed={activeCategory === category.id}
              aria-label={`Filter by ${category.label}. ${category.count} items available.`}
              role="tab"
              aria-selected={activeCategory === category.id}
            >
              {category.label}
              <span
                className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${activeCategory === category.id ? 'bg-black/50 text-[#F5F5F5]' : 'bg-[#FD5A1E]/10 text-[#FD5A1E]'
                  }`}
                aria-label={`${category.count} products`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid with Enhanced Accessibility */}
      <div
        role="tabpanel"
        aria-label={`${activeCategory} products - ${filteredProducts.length} items`}
        aria-live="polite"
      >
        <ResponsiveGrid
          cols={{ xs: 2, sm: 3, md: 4, lg: 4 }}
          gap="gap-4 sm:gap-6"
        >
          {displayProducts.map((product, index) => (
            <div
              key={product.id}
              role="article"
              aria-labelledby={`product-${product.id}`}
            >
              <BackgroundOverlayCard product={product} />
            </div>
          ))}
        </ResponsiveGrid>

        {/* Expand/Collapse Button */}
        {hasMoreProducts && (
          <div id="expand-button" className="flex justify-center mt-8">
            <button
              onClick={toggleExpand}
              className="group flex items-center gap-2 px-6 py-3 bg-[#4d4d4d]/30 border border-[#a4acac] hover:border-[#FD5A1E] rounded-full transition-all hover:bg-[#FD5A1E]/10"
              aria-expanded={isExpanded}
              aria-controls="product-grid"
            >
              <span className="text-[#F5F5F5]">
                {isExpanded ? 'Show Less' : `Show More (${filteredProducts.length - displayProducts.length} items)`}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-[#FD5A1E] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}


export default ProductSection;