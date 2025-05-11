'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Define types for snack/beverage items
interface ProductItem {
  title: string;
  image: string;
  category: string;
}


const HeroParallax = () => {
  // Ref for the scrolling container
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Product items to display in the parallax grid
  const products: ProductItem[] = [
    {
      title: "Coke",
      image: "/images/beverages/coke.jpg",
      category: "Beverage"
    },
    {
      title: "Red Bull",
      image: "/images/beverages/RedBull.jpg",
      category: "Energy Drink"
    },
    {
      title: "Lays Chips",
      image: "/images/snacks/lays.jpg",
      category: "Snack"
    },
    {
      title: "Doritos",
      image: "/images/snacks/doritos.jpg",
      category: "Snack"
    },
    {
      title: "Pop Tarts",
      image: "/images/products/poptarts.jpg",
      category: "Snack"
    },
    {
      title: "Monster",
      image: "/images/beverages/monster.jpg",
      category: "Energy Drink"
    },
    {
      title: "Just Water",
      image: "/images/beverages/justwater.jpg",
      category: "Beverage"
    },
    {
      title: "M&Ms",
      image: "/images/snacks/mms.jpg",
      category: "Candy"
    },
    {
      title: "Starburst",
      image: "/images/products/starburst.jpg",
      category: "Candy"
    },
    {
      title: "Snickers",
      image: "/images/snacks/snickers.jpg",
      category: "Candy"
    },
    {
      title: "KitKat",
      image: "/images/products/kitkat.jpg",
      category: "Candy"
    },
    {
      title: "3 Musketeers",
      image: "/images/products/threemusketeers.jpg",
      category: "Candy"
    },
    {
      title: "Gatorade",
      image: "/images/products/gatorade.jpg",
      category: "Sports Drink"
    },
    {
      title: "Cheetos",
      image: "/images/snacks/cheetos.jpg",
      category: "Snack"
    },
    {
      title: "Skittles",
      image: "/images/snacks/skittles.jpg",
      category: "Snack"
    },
    {
      title: "Orange Crush",
      image: "/images/products/orangecrush.jpg",
      category: "Beverage"
    },
    {
      title: "Mountain Dew",
      image: "/images/products/mountaindew.jpg",
      category: "Beverage"
    },
    {
      title: "Dr Pepper",
      image: "/images/beverages/drpepper.jpg",
      category: "Beverage"
    },
    {
      title: "Candy Bars",
      image: "/images/products/candy.jpg",
      category: "Beverage"
    },
    {
      title: "Root Beer",
      image: "/images/products/root-beer.jpg",
      category: "Beverage"
    },
  ];


  return (

    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" ref={containerRef}>


        {/* Products grid with parallax effect */}
        <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2 z-10">
          {products.map((product, index) => {
            // Calculate parallax offset based on index and scroll position
            const offset = Math.min(scrollY * 0.1 * (index % 6 + 1) * 0.2, 100);
            const opacity = Math.max(0.3, 1 - (scrollY * 0.001));

            return (
              <div
                key={index}
                className="relative aspect-[4/3]full rounded-lg overflow-hidden"
                style={{
                  transform: `translateY(${offset}px)`,
                  transition: 'transform 0.3s ease-out',
                  opacity
                }}
                aria-hidden="true"
              >
                {/* Fallback for images that may not exist yet */}
                <div className="absolute inset-0 bg-[#4d4d4d] flex items-center justify-center">
                  <div className="text-[#A5ACAF] text-xs">
                    {product.title}
                  </div>
                </div>

                {/* Background images */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 16vw"
                    className="object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Category badge */}
                <div className="absolute top-2 left-2 z-20">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#FD5A1E] text-[#F5F5F5]">
                    {product.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hero content */}
        <div className="relative z-30 text-center px-4 max-w-5xl pb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6 drop-shadow-lg">
            Premium Workplace Vending<br />
            <span className="text-[#FD5A1E]">at Zero Cost to You</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#F5F5F5] mb-8 drop-shadow-lg max-w-3xl mx-auto">
            Enhance your workplace with state-of-the-art vending machines offering
            50+ snack options, and
            20+ beverage options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/vending-machines"
              className="px-8 py-4 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-color"
              aria-label="View our vending machines"
            >

              View Machines
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full hover:bg-[#FD5A1E] hover:border-[#FD5A1E] transition-colors"
              aria-label="Contact us about vending machines"
            >
              Contact Us
            </Link>
          </div>
        </div>
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black z-10" 
        aria-hidden="true"
        >    
      </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-[#F5F5F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroParallax;