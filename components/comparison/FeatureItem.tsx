import React from 'react';
import { Icon } from '../ui/Icons';


// Define component props interface
interface FeatureItemProps {
  /**
   * Icon name to display (corresponds to icon in Icons component)
   */
  icon: string;
  
  /**
   * Title of the feature
   */
  title: string;
  
  /**
   * Description of the feature
   */
  description: string;
  
  /**
   * Whether this feature should be highlighted (e.g., in "after" state)
   * @default false
   */
  highlighted?: boolean;
}

/**
 * FeatureItem Component
 * 
 * Displays a single feature with an icon, title, and description
 * Used within the WorkplaceCard component
 */
const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
  highlighted = false
}) => {
  // Define style variations based on highlighted state
  const styles = {
    container: `feature-item ${highlighted ? 'bg-dark-gray/30' : 'bg-dark-gray/10'}`,
    iconContainer: `feature-item-icon ${highlighted ? 'bg-orange-500/20 text-orange-500' : 'bg-dark-gray/20 text-silver'}`,
    title: `feature-item-title ${highlighted ? 'text-orange-500' : 'text-whitesmoke'}`
  };

  return (
    <div className={styles.container}>
      <div className="flex items-center mb-2">
        <div className={styles.iconContainer}>
          <Icon name={icon} size={20} />
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className="feature-item-description">{description}</p>
    </div>
  );
};

export default FeatureItem;