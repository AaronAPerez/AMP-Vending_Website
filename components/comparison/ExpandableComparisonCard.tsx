'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import LensEffect from '../LensEffect';


interface ExpandableComparisonCardProps {
  /**
   * Machine ID (for managing active state)
   */
  id: string;
  
  /**
   * Card title
   */
  title: string;
  
  /**
   * Card subtitle (model number)
   */
  subtitle: string;
  
  /**
   * Image source URL
   */
  imageSrc: string;
  
  /**
   * Image alt text
   */
  imageAlt: string;
  
  /**
   * Brief description or tagline
   */
  description: string;
  
  /**
   * List of features to display
   */
  features: string[];
  
  /**
   * Whether this card is currently active/expanded
   */
  isActive: boolean;
  
  /**
   * On click handler for the card
   */
  onClick: () => void;
  
  /**
   * URL for details page
   */
  detailsUrl?: string;
  
  /**
   * URL for contact/request page
   */
  contactUrl?: string;
}

/**
 * ExpandableComparisonCard Component
 * 
 * Side-by-side expandable card with image on left, content on right
 * When active, the card expands to show more details and actions
 */
function ExpandableComparisonCard({
  id,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  description,
  features,
  isActive,
  onClick,
  detailsUrl = '/vending-machines/',
  contactUrl = '/contact'
}: ExpandableComparisonCardProps) {
  // State to handle lens hover effect
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className={`
        w-full bg-[#151515] rounded-xl overflow-hidden flex flex-col md:flex-row
        border-2 transition-colors duration-300
        ${isActive ? 'border-[#FD5A1E]' : 'border-[#4d4d4d]'}
      `}
      layout
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: isActive ? 1 : 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Column (Left Side) */}
      <div className="md:w-2/5 relative">
        <div 
          className={`
            relative w-full aspect-square md:h-full
            ${isActive ? 'cursor-default' : 'cursor-pointer'}
          `}
        >
          {isActive ? (
            <LensEffect
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              lensSize={160}
              zoomLevel={2.2}
              className="h-full"
              lensBorderColor="#FD5A1E"
            />
          ) : (
            <div className="w-full h-full relative">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority
              />
              <div 
                className={`
                  absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent
                  md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/30
                  transition-opacity duration-300
                  ${isHovered ? 'opacity-0' : 'opacity-100'}
                `}
              />
            </div>
          )}
          
          {/* Badge overlay - only shown if not active */}
          {!isActive && (
            <div className="absolute top-4 left-4 bg-[#FD5A1E] text-white text-sm font-medium px-3 py-1 rounded-full">
              Zero Cost
            </div>
          )}
          
          {/* Mobile-only title overlay (visible only when closed on mobile) */}
          {!isActive && (
            <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-[#FD5A1E]">{subtitle}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Content Column (Right Side) */}
      <div className="md:w-3/5 p-6 flex flex-col">
        {/* Title area - hidden on mobile when closed */}
        <div className={`${!isActive ? 'hidden md:block' : ''}`}>
          <h3 className="text-2xl font-bold text-[#F5F5F5] group-hover:text-[#FD5A1E] transition-colors">
            {title}
          </h3>
          <p className="text-[#FD5A1E] font-medium">{subtitle}</p>
        </div>
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {/* Description */}
              <p className="text-[#A5ACAF] mt-4 mb-6">{description}</p>
              
              {/* Zero Cost Badge */}
              <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E] rounded-lg p-3 mb-6 flex items-center">
                <div className="bg-[#FD5A1E]/20 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-[#F5F5F5] text-sm">Zero Cost Installation</h4>
                  <p className="text-xs text-[#A5ACAF]">No upfront costs or monthly fees</p>
                </div>
              </div>
              
              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-[#F5F5F5] uppercase tracking-wider mb-3">
                  Premium Features
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#F5F5F5] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Maintenance Free Badge */}
              <div className="bg-[#4d4d4d]/50 rounded-lg p-3 mb-6 flex items-center">
                <div className="bg-[#4d4d4d] p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-[#F5F5F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-[#F5F5F5] text-sm">Maintenance-Free Operation</h4>
                  <p className="text-xs text-[#A5ACAF]">We handle all servicing and restocking</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <a
                  href={`${detailsUrl}${id}`}
                  className="px-4 py-2 bg-[#FD5A1E] text-[#F5F5F5] rounded-lg text-center font-medium text-sm hover:bg-[#FD5A1E]/90 transition-colors flex-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Details
                </a>
                <a
                  href={contactUrl}
                  className="px-4 py-2 border border-[#a4acac] text-[#F5F5F5] rounded-lg text-center font-medium text-sm hover:border-[#FD5A1E] hover:text-[#FD5A1E] transition-colors flex-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Request Installation
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Preview content when not active - desktop only */}
        {!isActive && (
          <div className="hidden md:block mt-3">
            <p className="text-[#A5ACAF] line-clamp-2 text-sm">{description}</p>
            <div className="mt-3 flex items-center text-[#FD5A1E] text-sm">
              <span>Click to explore</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ExpandableComparisonCard;