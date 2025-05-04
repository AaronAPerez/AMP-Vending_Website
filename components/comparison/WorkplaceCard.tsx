import React from 'react';
import Image from 'next/image';
import { HeroHighlight } from '../ui/hero-highlight';
import FeatureItem from './FeatureItem';
import { FeatureItem as FeatureItemType } from '@/lib/compareData';

// Define component props interface
interface WorkplaceCardProps {
  /**
   * Title of the workplace state
   */
  title: string;
  
  /**
   * Source URL for the image
   */
  imageSrc: string;
  
  /**
   * Alt text for the image
   */
  imageAlt: string;
  
  /**
   * Description of the workplace state
   */
  description: string;
  
  /**
   * Array of feature items to display
   */
  features: FeatureItemType[];
  
  /**
   * Whether this card should be highlighted (e.g., "after" state)
   * @default false
   */
  highlighted?: boolean;
}

/**
 * WorkplaceCard Component
 * 
 * Displays information about a workplace state (before or after)
 * with an image, description, and key features
 */
const WorkplaceCard: React.FC<WorkplaceCardProps> = ({
  title,
  imageSrc,
  imageAlt,
  description,
  features,
  highlighted = false
}) => {
  // Define style variations based on highlighted state
  const styles = {
    container: `p-5 ${highlighted ? 'bg-gradient-to-b from-dark-gray/40 to-primary-black' : 'bg-primary-black'}`,
    title: `text-xl font-bold mb-3 ${highlighted ? 'text-orange-500' : 'text-whitesmoke'}`,
    imageBorder: `rounded-lg overflow-hidden mb-4 border ${highlighted ? 'border-orange-500/30' : 'border-dark-gray'}`,
    featuresTitle: `text-lg font-medium mb-3 ${highlighted ? 'text-orange-500' : 'text-whitesmoke'}`
  };

  return (
    <HeroHighlight containerClassName="h-full flex flex-col group transition-all duration-300 hover:shadow-highlight">
      <div className="comparison-card">
        <div className={styles.container}>
          <h2 className={styles.title}>
            {title}
          </h2>
          
          <div className={styles.imageBorder}>
            {/* Use Next.js Image component for better performance */}
            <div className="relative w-full h-48">
              <Image 
                src={imageSrc || "/images/before-vending-machine.jpg"} 
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover" 
                priority={highlighted} // Prioritize loading the "after" image
              />
            </div>
          </div>
          
          <p className="text-silver mb-4">{description}</p>
        </div>
        
        <div className="flex-grow p-5 bg-primary-black/50">
          <h3 className={styles.featuresTitle}>
            Key Features
          </h3>
          
          <div className="space-y-3">
            {features.map((feature) => (
              <FeatureItem
                key={feature.id} // Use the unique id from the feature
                icon={feature.iconName}
                title={feature.title}
                description={feature.description}
                highlighted={highlighted}
              />
            ))}
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default WorkplaceCard;