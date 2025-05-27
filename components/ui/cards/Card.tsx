import React from 'react';
import { motion } from 'framer-motion';

type CardVariant = 'default' | 'accent' | 'dark' | 'transparent';
type PaddingSize = 'sm' | 'md' | 'lg';

interface CardProps {
  /**
   * Card visual variant
   * - default: standard card with border
   * - accent: card with accent color
   * - dark: darker background card
   * - transparent: transparent background with border
   */
  variant?: CardVariant;
  
  /**
   * Card padding size
   */
  padding?: PaddingSize;
  
  /**
   * Whether to animate the card on scroll
   */
  animate?: boolean;
  
  /**
   * Children to render in the card
   */
  children: React.ReactNode;
  
  /**
   * Optional className for additional styling
   */
  className?: string;
  
  /**
   * Optional onClick handler
   */
  onClick?: () => void;
}

/**
 * Card Component
 * A versatile card component with different style variants
 */
const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  animate = true,
  children,
  className = '',
  onClick
}) => {
  // Get card styles based on variant
  const getCardStyles = (): string => {
    switch (variant) {
      case 'accent':
        return 'bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 hover:border-[#FD5A1E]';
      case 'dark':
        return 'bg-[#0a0a0a] border border-[#333333] hover:border-[#a4acac]';
      case 'transparent':
        return 'bg-transparent border border-[#a4acac] hover:border-[#FD5A1E]';
      default:
        return 'bg-[#4d4d4d]/20 border border-[#a4acac] hover:border-[#FD5A1E]';
    }
  };
  
  // Get padding styles based on size
  const getPaddingStyles = (): string => {
    switch (padding) {
      case 'sm': return 'p-4';
      case 'lg': return 'p-8';
      default: return 'p-6'; // medium padding
    }
  };
  
  // Base card styles
  const cardStyles = `rounded-lg overflow-hidden transition-all duration-300 ${getCardStyles()} ${getPaddingStyles()} ${className}`;
  
  // Animate the card if animate prop is true
  if (animate) {
    return (
      <motion.div
        className={cardStyles}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }
  
  // Return a static card if animate prop is false
  return (
    <div className={cardStyles} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;