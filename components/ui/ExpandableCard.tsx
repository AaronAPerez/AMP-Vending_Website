'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/ui/Icons';


/**
 * Props for the ExpandableCard component
 */
interface ExpandableCardProps {
  /**
   * Title of the card
   */
  title: string;
  
  /**
   * Optional subtitle shown below the title
   */
  subtitle?: string;
  
  /**
   * Content to show when the card is expanded
   */
  content: React.ReactNode;
  
  /**
   * Optional initial expanded state
   * @default false
   */
  defaultExpanded?: boolean;
  
  /**
   * Optional className for additional styling
   */
  className?: string;
  
  /**
   * Optional icon name to display next to the title
   */
  iconName?: string;
  
  /**
   * Optional color theme for the card
   * @default "orange"
   */
  colorTheme?: 'orange' | 'silver' | 'dark';
}

/**
 * ExpandableCard Component
 * 
 * A card that can be expanded to reveal more content
 * Includes animation and accessibility features
 */
const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  subtitle,
  content,
  defaultExpanded = false,
  className = '',
  iconName,
  colorTheme = 'orange',
}) => {
  // State to track expanded state
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Color theme styles
  const themeStyles = {
    orange: {
      headerBg: 'bg-orange/10',
      headerBorder: 'border-orange/30',
      titleColor: 'text-orange',
      iconColor: 'text-orange',
      expandedBg: 'bg-dark-gray/20',
    },
    silver: {
      headerBg: 'bg-silver/10',
      headerBorder: 'border-silver/30',
      titleColor: 'text-silver',
      iconColor: 'text-silver',
      expandedBg: 'bg-dark-gray/10',
    },
    dark: {
      headerBg: 'bg-dark-gray/30',
      headerBorder: 'border-dark-gray',
      titleColor: 'text-whitesmoke',
      iconColor: 'text-silver',
      expandedBg: 'bg-primary-black/80',
    },
  };

  const currentTheme = themeStyles[colorTheme];

  // Toggle expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`rounded-xl overflow-hidden border border-edward-gray ${className}`}
    >
      {/* Header/Title section (always visible) */}
      <motion.button
        className={`w-full flex justify-between items-center p-4 ${currentTheme.headerBg} ${currentTheme.headerBorder} cursor-pointer text-left transition-colors hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-primary-black`}
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        whileTap={{ scale: 0.98 }}
        initial={false}
      >
        <div className="flex items-center">
          {iconName && (
            <div className={`mr-3 ${currentTheme.iconColor}`}>
              <Icon name={iconName} size={24} />
            </div>
          )}
          <div>
            <h3 className={`font-bold text-lg ${currentTheme.titleColor}`}>{title}</h3>
            {subtitle && (
              <p className="text-sm text-silver">{subtitle}</p>
            )}
          </div>
        </div>
        
        {/* Chevron icon that rotates */}
        <motion.div
          className={`flex-shrink-0 ${currentTheme.iconColor}`}
          initial={false}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </motion.button>
      
      {/* Expandable content area */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`p-4 border-t border-edward-gray ${currentTheme.expandedBg}`}>
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
};

export default ExpandableCard;