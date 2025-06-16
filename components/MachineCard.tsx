'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon, 
  MonitorIcon, 
  CreditCardIcon, 
  WifiIcon,
  ZapIcon,
  StarIcon,
  CheckCircleIcon 
} from 'lucide-react';

/**
 * Enhanced Machine Data Interface
 * Supports both old and new data structures for backward compatibility
 */
export interface MachineCardProps {
  id: string;
  name: string;
  image: string;
  shortDescription?: string;
  description?: string;
  category: 'refrigerated' | 'non-refrigerated';
  dimensions?: string | Array<{ label: string; value: string }>;
  highlights?: string[];
  bestFor?: string | string[];
  model?: string;
  features?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  // SEO-enhanced fields
  keywords?: string[];
  localKeywords?: string[];
  businessKeywords?: string[];
}

/**
 * Supported card variants for different display contexts
 */
export type MachineCardVariant = 'grid' | 'showcase' | 'related' | 'compact' | 'feature';

/**
 * Props for individual machine cards
 */
interface MachineCardComponentProps {
  machine: MachineCardProps;
  variant?: MachineCardVariant;
  priority?: boolean;
  className?: string;
  showTechIndicators?: boolean;
}

/**
 * Props for machine grid component
 */
interface MachineGridProps {
  machines: MachineCardProps[];
  variant?: MachineCardVariant;
  className?: string;
  ariaLabel?: string;
  showTechIndicators?: boolean;
}

/**
 * Optimized image properties generator with enhanced variant support
 * 
 * @param src - Image source URL
 * @param alt - Alt text for accessibility
 * @param variant - Card variant to optimize sizing for
 * @param priority - Whether to prioritize loading this image
 * @returns Optimized image properties for Next.js Image component
 */
function getOptimizedImageProps(
  src: string, 
  alt: string, 
  variant: MachineCardVariant = 'grid', 
  priority = false
) {
  // Define responsive sizes based on variant for optimal loading
  const sizesByVariant = {
    grid: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',
    showcase: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw',
    related: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    compact: '(max-width: 768px) 100vw, 50vw',
    feature: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  };

  return {
    src,
    alt,
    fill: true,
    sizes: sizesByVariant[variant],
    className: 'object-cover transition-transform duration-300 group-hover:scale-105',
    priority,
    quality: priority ? 90 : 75, // Higher quality for priority images
  };
}

/**
 * Technology indicators component for displaying machine capabilities
 */
const TechIndicators = memo(({ features, variant }: { 
  features: MachineCardProps['features'], 
  variant: MachineCardVariant 
}) => {
  if (!features || variant === 'compact') return null;

  // Extract technology indicators from features
  const indicators = [
    { 
      icon: MonitorIcon, 
      label: 'Touchscreen', 
      present: features.some(f => f.title.toLowerCase().includes('touchscreen')) 
    },
    { 
      icon: CreditCardIcon, 
      label: 'Mobile Pay', 
      present: features.some(f => f.title.toLowerCase().includes('payment')) 
    },
    { 
      icon: WifiIcon, 
      label: 'Smart', 
      present: features.some(f => f.title.toLowerCase().includes('monitoring') || f.title.toLowerCase().includes('inventory')) 
    },
    { 
      icon: ZapIcon, 
      label: 'Efficient', 
      present: features.some(f => f.title.toLowerCase().includes('energy')) 
    }
  ].filter(indicator => indicator.present);

  if (indicators.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {indicators.slice(0, variant === 'related' ? 2 : 4).map((indicator, index) => (
        <div
          key={index}
          className="flex items-center px-2 py-1 bg-[#FD5A1E]/10 rounded-full text-xs"
          title={indicator.label}
        >
          <indicator.icon size={12} className="text-[#FD5A1E] mr-1" aria-hidden="true" />
          <span className="text-[#FD5A1E] font-medium">{indicator.label}</span>
        </div>
      ))}
    </div>
  );
});

TechIndicators.displayName = 'TechIndicators';

/**
 * Enhanced Machine Card Component
 * 
 * Reusable card component with multiple variants for different display contexts.
 * Features accessibility improvements, SEO optimization, and performance enhancements.
 * 
 * Build Process Documentation:
 * 1. Optimized image loading with responsive sizing
 * 2. Semantic HTML structure for accessibility
 * 3. SEO-friendly internal linking
 * 4. Performance-optimized animations
 * 5. Comprehensive ARIA labels and descriptions
 */
const MachineCard = memo(({ 
  machine, 
  variant = 'grid', 
  priority = false, 
  className = '',
  showTechIndicators = false 
}: MachineCardComponentProps) => {
  // Determine card dimensions and layout based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case 'showcase':
        return {
          container: 'group relative bg-[#111111] rounded-2xl overflow-hidden border border-[#333333] hover:border-[#FD5A1E]/50 transition-all duration-300 shadow-lg hover:shadow-2xl',
          imageContainer: 'relative aspect-[4/3] overflow-hidden',
          content: 'p-6'
        };
      case 'related':
        return {
          container: 'group relative bg-[#111111] rounded-xl overflow-hidden border border-[#333333] hover:border-[#FD5A1E]/30 transition-all duration-300',
          imageContainer: 'relative aspect-[5/4] overflow-hidden',
          content: 'p-4'
        };
      case 'compact':
        return {
          container: 'group relative bg-[#111111] rounded-lg overflow-hidden border border-[#333333] hover:border-[#FD5A1E]/30 transition-all duration-300',
          imageContainer: 'relative aspect-[3/2] overflow-hidden',
          content: 'p-3'
        };
      case 'feature':
        return {
          container: 'group relative bg-[#111111] rounded-2xl overflow-hidden border border-[#333333] hover:border-[#FD5A1E]/50 transition-all duration-300 shadow-xl hover:shadow-2xl',
          imageContainer: 'relative aspect-[4/3] overflow-hidden',
          content: 'p-8'
        };
      default: // 'grid'
        return {
          container: 'group relative bg-[#111111] rounded-xl overflow-hidden border border-[#333333] hover:border-[#FD5A1E]/30 transition-all duration-300 shadow-lg hover:shadow-xl',
          imageContainer: 'relative aspect-[4/3] overflow-hidden',
          content: 'p-6'
        };
    }
  };

  const variantClasses = getVariantClasses();
  
  // Generate optimized image properties
  const imageProps = getOptimizedImageProps(
    machine.image,
    `${machine.name} commercial vending machine`,
    variant,
    priority
  );

  // SEO-optimized card title and description
  const cardTitle = `${machine.name} - Commercial ${machine.category === 'refrigerated' ? 'Refrigerated' : 'Snack'} Vending Machine`;
  const cardDescription = machine.shortDescription || machine.description || `Professional ${machine.category} vending machine for your business needs`;

  return (
    <motion.article
      className={`${variantClasses.container} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      role="article"
      aria-labelledby={`machine-${machine.id}-title`}
      aria-describedby={`machine-${machine.id}-description`}
    >
      <Link
        href={`/vending-machines/${machine.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
        aria-label={`View details for ${cardTitle}`}
      >
        {/* Machine Image with Category Badge */}
        <div className={variantClasses.imageContainer}>
          <Image {...imageProps} />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg ${
              machine.category === 'refrigerated' ? 'bg-blue-600' : 'bg-green-600'
            }`}>
              {machine.category === 'refrigerated' ? 'Refrigerated' : 'Non-Refrigerated'}
            </span>
          </div>

          {/* Professional Service Badge for feature variant */}
          {variant === 'feature' && (
            <div className="absolute top-3 right-3">
              <span className="bg-[#FD5A1E] text-[#000000] px-3 py-1 rounded-full font-semibold text-xs shadow-lg flex items-center">
                <CheckCircleIcon size={12} className="mr-1" />
                Professional Service
              </span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" aria-hidden="true" />
        </div>

        {/* Card Content */}
        <div className={variantClasses.content}>
          {/* Machine Name and Model */}
          <div className="mb-3">
            <h3 
              id={`machine-${machine.id}-title`}
              className={`font-bold text-[#F5F5F5] group-hover:text-[#FD5A1E] transition-colors ${
                variant === 'feature' ? 'text-xl mb-2' : 
                variant === 'compact' ? 'text-base' : 'text-lg'
              }`}
            >
              {machine.name}
            </h3>
            
            {machine.model && variant !== 'compact' && (
              <p className="text-[#A5ACAF] text-sm font-medium">
                Model: {machine.model}
              </p>
            )}
          </div>

          {/* Description */}
          {cardDescription && variant !== 'compact' && (
            <p 
              id={`machine-${machine.id}-description`}
              className={`text-[#A5ACAF] leading-relaxed mb-4 ${
                variant === 'feature' ? 'text-base' : 'text-sm'
              }`}
            >
              {cardDescription.length > (variant === 'related' ? 120 : 180) 
                ? `${cardDescription.substring(0, variant === 'related' ? 120 : 180)}...`
                : cardDescription
              }
            </p>
          )}

          {/* Key Features/Highlights */}
          {machine.highlights && variant !== 'compact' && variant !== 'related' && (
            <div className="mb-4">
              <ul className="space-y-1" role="list">
                {machine.highlights.slice(0, variant === 'feature' ? 4 : 3).map((highlight, index) => (
                  <li key={index} className="flex items-center text-xs text-[#F5F5F5]">
                    <CheckCircleIcon size={12} className="text-[#FD5A1E] mr-2 flex-shrink-0" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Indicators */}
          {showTechIndicators && (
            <TechIndicators features={machine.features} variant={variant} />
          )}

          {/* Dimensions (for grid and feature variants) */}
          {machine.dimensions && (variant === 'grid' || variant === 'feature') && (
            <div className="mt-3 pt-3 border-t border-[#333333]">
              <p className="text-[#A5ACAF] text-xs">
                <span className="font-medium">Dimensions:</span> {' '}
                {typeof machine.dimensions === 'string' 
                  ? machine.dimensions 
                  : machine.dimensions.map(d => `${d.label}: ${d.value}`).join(', ')
                }
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className={`flex items-center justify-between mt-4 ${variant === 'feature' ? 'mt-6' : ''}`}>
            <span className="text-[#FD5A1E] font-semibold text-sm group-hover:text-[#F5F5F5] transition-colors">
              {variant === 'feature' ? 'Learn More & Get Quote' : 'View Details'}
            </span>
            <ArrowRightIcon 
              size={variant === 'feature' ? 20 : 16} 
              className="text-[#FD5A1E] group-hover:translate-x-1 transition-transform" 
              aria-hidden="true" 
            />
          </div>

          {/* Star Rating for feature variant */}
          {variant === 'feature' && (
            <div className="flex items-center mt-3 pt-3 border-t border-[#333333]">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    size={14}
                    className="text-yellow-400 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-[#A5ACAF] text-xs ml-2">
                Professional Installation Included
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
});

MachineCard.displayName = 'MachineCard';

/**
 * Machine Grid Component
 * 
 * Responsive grid layout for displaying multiple machine cards.
 * Supports different variants and accessibility features.
 * 
 * Build Process Documentation:
 * 1. Responsive grid system with CSS Grid
 * 2. Accessibility-compliant ARIA labels
 * 3. Performance-optimized rendering with priority loading
 * 4. SEO-friendly semantic structure
 */
export const MachineGrid = memo(({ 
  machines, 
  variant = 'grid', 
  className = '',
  ariaLabel = 'Commercial vending machines collection',
  showTechIndicators = false 
}: MachineGridProps) => {
  // Define grid classes based on variant
  const getGridClasses = () => {
    switch (variant) {
      case 'showcase':
        return 'grid grid-cols-1 md:grid-cols-2 gap-8';
      case 'related':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'compact':
        return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4';
      case 'feature':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12';
      default: // 'grid'
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8';
    }
  };

  if (!machines || machines.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#A5ACAF] text-lg">No vending machines available at this time.</p>
      </div>
    );
  }

  return (
    <section
      className={`${getGridClasses()} ${className}`}
      aria-label={ariaLabel}
      role="region"
    >
      {machines.map((machine, index) => (
        <MachineCard
          key={machine.id}
          machine={machine}
          variant={variant}
          priority={index < 2} // Prioritize first two images for LCP optimization
          showTechIndicators={showTechIndicators}
        />
      ))}
    </section>
  );
});

MachineGrid.displayName = 'MachineGrid';

// Default export for convenience
export default MachineCard;

/**
 * Additional utility function for machine card data normalization
 * Helps maintain backward compatibility with different data structures
 */
export const normalizeMachineCardData = (machine: any): MachineCardProps => {
  return {
    id: machine.id || '',
    name: machine.name || 'Commercial Vending Machine',
    image: machine.image || '/images/vending-machines/placeholder.jpg',
    shortDescription: machine.shortDescription || machine.description,
    description: machine.description,
    category: machine.category || 'non-refrigerated',
    dimensions: machine.dimensions,
    highlights: machine.highlights || [],
    bestFor: machine.bestFor,
    model: machine.model,
    features: machine.features || [],
    keywords: machine.keywords,
    localKeywords: machine.localKeywords,
    businessKeywords: machine.businessKeywords,
  };
};

/**
 * Hook for machine card animations
 * Provides consistent animation timing across all card variants
 */
export const useMachineCardAnimation = (index: number) => {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.5, 
      delay: Math.min(index * 0.1, 0.5) // Cap delay at 0.5s for performance
    }
  };
};