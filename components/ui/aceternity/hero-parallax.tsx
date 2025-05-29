"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

interface Product {
  title: string;
  thumbnail: string;
  link: string;
}

/**
 * HeroParallax Component
 * 
 * Creates a stunning parallax scrolling effect with grid of products/images
 * Grid starts from the top of the hero section
 * 
 * IMPORTANT: Using named export (export { HeroParallax }) rather than default export
 */
export function HeroParallax({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Handle scroll events for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Create opacity transforms for fade effects
  const opacityTransform = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#000000]"
    >
      {/* Background grid of products - Starts from top of hero */}
      <motion.div 
        className="absolute top-0 left-0 right-0 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 p-2 z-0 min-h-screen"
        style={{ opacity: opacityTransform }}
      >
        {products.map((product, index) => {
          // Calculate parallax offset based on index and scroll position
          const offset = Math.min(scrollY * 0.1 * (index % 6 + 1) * 0.2, 100);
          const opacity = Math.max(0.3, 1 - scrollY * 0.001);
          
          return (
            <div 
              key={index}
              className="relative aspect-[3/4] rounded-lg overflow-hidden"
              style={{ 
                transform: `translateY(${offset}px)`,
                transition: 'transform 0.3s ease-out',
                opacity
              }}
              aria-hidden="true"
            >
              {/* Fallback for images */}
              <div className="absolute inset-0 bg-[#4d4d4d] flex items-center justify-center">
                <div className="text-[#A5ACAF] text-xs">
                  {product.title}
                </div>
              </div>
              
              {/* Product images */}
              <Link href={product.link} className="block absolute inset-0">
                <Image 
                  src={product.thumbnail} 
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 16vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback if image doesn't load
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </Link>

              {/* Category badge */}
              <div className="absolute top-2 left-2 z-20">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#FD5A1E] text-[#F5F5F5]">
                  {product.title}
                </span>
              </div>
            </div>
          );
        })}
      </motion.div>
      
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[#000000]/60 z-5" aria-hidden="true"></div>
      
      {/* Content container - All container elements have position: relative */}
      <div className="relative z-20 flex flex-col min-h-screen">
        {children}
      </div>
    </motion.div>
  );
}