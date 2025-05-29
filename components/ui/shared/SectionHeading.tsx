'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  /**
   * Main heading text
   */
  title: string;
  
  /**
   * Optional subtitle text
   */
  subtitle?: string;
  
  /**
   * Text portion to highlight in the title (will be colored with brand orange)
   */
  highlight?: string;
  
  /**
   * Optional badge text to display above the title
   */
  badge?: string;
  
  /**
   * Optional ID for the heading (for anchor links)
   */
  id?: string;
  
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * SectionHeading Component
 * 
 * A consistent, animated heading component for page sections
 * with support for highlighted text, badges, and subtitles
 */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  highlight = "",
  badge = "",
  id,
  className = ""
}) => {
  return (
    <motion.div
      className={`text-center mb-16 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {badge && (
        <span className="inline-block px-3 py-1 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4">
          {badge}
        </span>
      )}
      
      <h2 
        id={id}
        className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4"
      >
        {highlight ? (
          <>
            {title.split(highlight)[0]}
            <span className="text-[#FD5A1E]">{highlight}</span>
            {title.split(highlight)[1]}
          </>
        ) : (
          title
        )}
      </h2>
      
      {subtitle && (
        <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;