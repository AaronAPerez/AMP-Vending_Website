/**
 * Interface for a single feature item in the comparison
 */
export interface FeatureItem {
    /**
     * Unique identifier for the feature
     */
    id: string;
    
    /**
     * Title of the feature
     */
    title: string;
    
    /**
     * Description of the feature
     */
    description: string;
    
    /**
     * Name of the icon to use (references Icons component)
     */
    iconName: 'refreshment' | 'convenience' | 'payment' | 'environment' | 'technology' | 'options' | 'satisfaction';
  }
  
  /**
   * Interface for the workplace comparison data
   */
  export interface WorkplaceComparisonData {
    /**
     * Title for the "before" state
     */
    beforeTitle: string;
    
    /**
     * Description of the "before" state
     */
    beforeDescription: string;
    
    /**
     * Image source for the "before" state
     */
    beforeImageSrc: string;
    
    /**
     * Alt text for the "before" image
     */
    beforeImageAlt: string;
    
    /**
     * Features in the "before" state
     */
    beforeFeatures: FeatureItem[];
    
    /**
     * Title for the "after" state
     */
    afterTitle: string;
    
    /**
     * Description of the "after" state
     */
    afterDescription: string;
    
    /**
     * Image source for the "after" state
     */
    afterImageSrc: string;
    
    /**
     * Alt text for the "after" image
     */
    afterImageAlt: string;
    
    /**
     * Features in the "after" state
     */
    afterFeatures: FeatureItem[];
    
    /**
     * Heading for the section
     */
    sectionHeading: string;
    
    /**
     * Subheading for the section
     */
    sectionSubheading: string;
  }
  
  /**
   * Interface for additional benefits displayed in the summary section
   */
  export interface BenefitItem {
    /**
     * Title of the benefit
     */
    title: string;
    
    /**
     * Description of the benefit
     */
    description: string;
    
    /**
     * Icon name for the benefit
     */
    iconName: string;
  }
  
  /**
   * Interface for call-to-action data
   */
  export interface CTAData {
    /**
     * Heading for the CTA section
     */
    heading: string;
    
    /**
     * Subheading for the CTA section
     */
    subheading: string;
    
    /**
     * Primary button text
     */
    primaryButtonText: string;
    
    /**
     * Primary button URL
     */
    primaryButtonUrl: string;
    
    /**
     * Secondary button text
     */
    secondaryButtonText: string;
    
    /**
     * Secondary button URL
     */
    secondaryButtonUrl: string;
  }
  
  /**
   * Data for Stanislaus Regional Transit Authority workplace comparison
   */
  export const stanRTAComparisonData: WorkplaceComparisonData = {
    beforeTitle: "Standard Break Room",
    beforeDescription: "Traditional break room setup lacking convenient refreshment options, requiring staff to leave premises during short breaks.",
    beforeImageSrc: "/images/before-after/before-breakroom.jpg",
    beforeImageAlt: "Standard break room without vending machines",
    beforeFeatures: [
      {
        id: "before-options",
        title: "Limited Options",
        description: "Staff must bring food from home or leave premises to find refreshments during breaks.",
        iconName: "refreshment"
      },
      {
        id: "before-time",
        title: "Lost Break Time",
        description: "Short break periods wasted traveling to purchase refreshments off-site.",
        iconName: "convenience"
      },
      {
        id: "before-payment",
        title: "Limited Payment Options",
        description: "External vendors may have restricted payment methods or cash-only policies.",
        iconName: "payment"
      },
      {
        id: "before-amenities",
        title: "Basic Amenities",
        description: "Outdated break room facilities lacking modern conveniences.",
        iconName: "environment"
      }
    ],
    
    afterTitle: "Enhanced Break Room",
    afterDescription: "Modern break room with state-of-the-art vending machines providing 50+ customizable options and convenient payment solutions.",
    afterImageSrc: "/images/before-after/after-breakroom.jpg",
    afterImageAlt: "Enhanced break room with premium vending machines",
    afterFeatures: [
      {
        id: "after-options",
        title: "50+ Customizable Options",
        description: "Wide selection of snacks and beverages tailored to staff preferences, including healthy alternatives.",
        iconName: "options"
      },
      {
        id: "after-time",
        title: "Maximum Break Efficiency",
        description: "Immediate access to refreshments on-site, allowing full use of short, unpredictable breaks.",
        iconName: "convenience"
      },
      {
        id: "after-payment",
        title: "Modern Payment Systems",
        description: "21.5' touchscreen interface with credit card, mobile pay, and cash payment options.",
        iconName: "technology"
      },
      {
        id: "after-amenities",
        title: "Enhanced Workplace",
        description: "Zero-cost, maintenance-free premium amenities improving employee satisfaction.",
        iconName: "satisfaction"
      }
    ],
    
    sectionHeading: "Enhanced Work Environment",
    sectionSubheading: "See the transformation that premium vending solutions bring to Stanislaus Regional Transit Authority's workplace environment. Zero cost installation with maintenance-free operation."
  };
  
  /**
   * Benefits data for the summary section
   */
  export const benefitsSummaryData: BenefitItem[] = [
    {
      title: "Maintenance-Free",
      description: "All machine servicing, repairs, and maintenance fully covered and managed by AMP Vending.",
      iconName: "support"
    },
    {
      title: "Advanced Technology",
      description: "21.5' touchscreen interface with tap-to-pay functionality and multiple payment methods for modern convenience.",
      iconName: "tech"
    },
    {
      title: "Customer Satisfaction",
      description: "Improved amenities enhance both employee and visitor experience, contributing to workplace satisfaction.",
      iconName: "smile"
    }
  ];
  
  /**
   * Call-to-action data
   */
  export const ctaData: CTAData = {
    heading: "Ready to Transform Your Workplace?",
    subheading: "Join Stanislaus Regional Transit Authority and other organizations enhancing their work environment with zero-cost vending solutions.",
    primaryButtonText: "Request Installation",
    primaryButtonUrl: "/contact",
    secondaryButtonText: "Learn More",
    secondaryButtonUrl: "/vending-machines"
  };