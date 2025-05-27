import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  /**
   * Section ID for navigation links
   */
  id: string;
  
  /**
   * Section title (can include JSX)
   */
  title?: React.ReactNode;
  
  /**
   * Section subtitle text
   */
  subtitle?: string;
  
  /**
   * Children to render in the section
   */
  children: React.ReactNode;
  
  /**
   * Background style for the section
   * - 'dark': solid dark background
   * - 'gradient': gradient background
   * - 'pattern': pattern background
   */
  background?: 'dark' | 'gradient' | 'pattern';
  
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * Section Component
 * Provides consistent styling and animations for page sections
 */
const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  background = 'dark',
  className = ''
}) => {
  // Background styles based on type
  const getBgStyles = () => {
    switch (background) {
      case 'gradient':
        return 'bg-gradient-to-b from-[#121212] to-[#0a0a0a]';
      case 'pattern':
        return 'bg-[#0a0a0a] bg-pattern';
      default:
        return 'bg-[#0a0a0a]';
    }
  };
  
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <section
      id={id}
      className={`relative py-16 overflow-hidden ${getBgStyles()} ${className}`}
      aria-labelledby={title ? `${id}-heading` : undefined}
    >
      {/* Dynamic background decorations */}
      {background === 'gradient' && (
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%23FD5A1E' fill-opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: '20px 20px'
            }}
          ></div>
        </div>
      )}
      
      {background === 'pattern' && (
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60L60 0H30L0 30V60Z' fill='%23FD5A1E' fill-opacity='0.1'/%3E%3Cpath d='M60 60L0 0H30L60 30V60Z' fill='%23FD5A1E' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      )}
      
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section header */}
        {(title || subtitle) && (
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            {title && (
              <h2
                id={`${id}-heading`}
                className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4"
              >
                {title}
              </h2>
            )}
            
            {subtitle && (
              <p className="text-lg md:text-xl text-[#A5ACAF] max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        {/* Section content */}
        <motion.div variants={itemVariants}>
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Section;