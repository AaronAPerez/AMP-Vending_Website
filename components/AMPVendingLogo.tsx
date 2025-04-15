import React from 'react';

type LogoVariant = 'default' | 'horizontal' | 'mini';
type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  withText?: boolean;
  alt?: string;
}

/* Size mapping for different logo variants */
const sizeMap: Record<LogoVariant, Record<LogoSize, { width: number; height: number }>> = {
  default: {
    xs: { width: 40, height: 30 },
    sm: { width: 80, height: 60 },
    md: { width: 120, height: 90 },
    lg: { width: 160, height: 120 },
    xl: { width: 240, height: 180 },
  },
  horizontal: {
    xs: { width: 60, height: 20 },
    sm: { width: 120, height: 40 },
    md: { width: 180, height: 60 },
    lg: { width: 290, height: 80 },
    xl: { width: 360, height: 120 },
  },
  mini: {
    xs: { width: 24, height: 24 },
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 96, height: 96 },
  },
};

/**
 * AMPVendingLogo component
 * Renders the AMP Vending logo in various formats
 */
const AMPVendingLogo = ({
  variant = 'default',
  size = 'md',
  className = '',
  withText = true,
  alt = 'AMP Vending Logo',
}: LogoProps) => {
  // Get dimensions from size map
  const dimensions = sizeMap[variant][size];

  // Render appropriate logo variant
  const renderLogo = () => {
    switch (variant) {
      case 'horizontal':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 400 100" 
            width={dimensions.width} 
            height={dimensions.height}
            aria-label={alt}
            className={className}
          >
            <defs>
              <linearGradient id="bgGradientH" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4d4d4d" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
              <linearGradient id="aGradientH" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FD5A1E" />
                <stop offset="100%" stopColor="#FD5A1E" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glowH" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Logo mark (left side) */}
            <circle cx="50" cy="50" r="45" fill="url(#bgGradientH)" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#A5ACAF" strokeWidth="1" strokeOpacity="0.3" />
            
            {/* Simplified vending machine in the circle */}
            <path d="M35 20 H65 V80 H35 Z" fill="#000000" stroke="#A5ACAF" strokeWidth="1.5" />
            <rect x="40" y="25" width="20" height="10" rx="1" fill="#000000" stroke="#A5ACAF" strokeWidth="0.75" />
            <rect x="40" y="40" width="20" height="20" rx="1" fill="#000000" stroke="#A5ACAF" strokeWidth="0.75" />
            <line x1="50" y1="40" x2="50" y2="60" stroke="#A5ACAF" strokeWidth="0.75" />
            <line x1="40" y1="50" x2="60" y2="50" stroke="#A5ACAF" strokeWidth="0.75" />
            <rect x="43" y="70" width="14" height="3" rx="1" fill="#A5ACAF" opacity="0.8" />
  
            {/* The "A" letter highlighted in the circle */}
            <text x="50" y="55" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" textAnchor="middle" fill="url(#aGradientH)" filter="url(#glowH)">A</text>
            
            {/* Only render text if withText is true */}
            {withText && (
              <>
                {/* Company name text to the right */}
                <text x="120" y="45" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="bold" fill="#F5F5F5">AMP</text>
                <text x="120" y="75" fontFamily="Arial, sans-serif" fontSize="24" letterSpacing="1" fill="#A5ACAF">VENDING</text>
                
                {/* Orange accent line */}
                <line x1="120" y1="50" x2="230" y2="50" stroke="#FD5A1E" strokeWidth="2" opacity="0.8" />
              </>
            )}
          </svg>
        );
      
      case 'mini':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 100 100" 
            width={dimensions.width} 
            height={dimensions.height}
            aria-label={alt}
            className={className}
          >
            <defs>
              <linearGradient id="bgGradientMini" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4d4d4d" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
              <linearGradient id="aGradientMini" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FD5A1E" />
                <stop offset="100%" stopColor="#FD5A1E" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glowMini" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Main circle */}
            <circle cx="50" cy="50" r="48" fill="url(#bgGradientMini)" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#A5ACAF" strokeWidth="1" strokeOpacity="0.3" />
            
            {/* Simplified vending machine silhouette */}
            <rect x="35" y="25" width="30" height="50" rx="2" fill="#000000" stroke="#A5ACAF" strokeWidth="1.5" />
            
            {/* The "A" letter highlighted in the center */}
            <text x="50" y="58" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" textAnchor="middle" fill="url(#aGradientMini)" filter="url(#glowMini)">A</text>
          </svg>
        );
        
      default: // Standard logo
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 300 200" 
            width={dimensions.width} 
            height={dimensions.height}
            aria-label={alt}
            className={className}
          >
            <defs>
              <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4d4d4d" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
              <linearGradient id="aGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FD5A1E" />
                <stop offset="100%" stopColor="#FD5A1E" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Main logo circle */}
            <circle cx="150" cy="100" r="90" fill="url(#bgGradient)" />
            <circle cx="150" cy="100" r="85" fill="none" stroke="#A5ACAF" strokeWidth="1" strokeOpacity="0.3" />
            
            {/* Vending machine silhouette */}
            <path d="M115 40 H185 V160 H115 Z" fill="#000000" stroke="#A5ACAF" strokeWidth="2" />
            
            {/* Machine display */}
            <rect x="125" y="50" width="50" height="25" rx="3" fill="#000000" stroke="#A5ACAF" strokeWidth="1" />
            
            {/* Product windows */}
            <rect x="125" y="85" width="50" height="45" rx="2" fill="#000000" stroke="#A5ACAF" strokeWidth="1" />
            <line x1="150" y1="85" x2="150" y2="130" stroke="#A5ACAF" strokeWidth="1" />
            <line x1="125" y1="107" x2="175" y2="107" stroke="#A5ACAF" strokeWidth="1" />
            
            {/* Coin slot */}
            <rect x="142" y="140" width="16" height="2" rx="1" fill="#A5ACAF" />
            
            {/* Dispenser tray */}
            <rect x="130" y="150" width="40" height="5" rx="2" fill="#A5ACAF" opacity="0.8" />
            
            {/* The "A" letter highlighted in the center */}
            <text x="150" y="107" fontFamily="Arial, sans-serif" fontSize="38" fontWeight="bold" textAnchor="middle" fill="url(#aGradient)" filter="url(#glow)">A</text>
            
            {/* Company name - only render if withText is true */}
            {withText && (
              <text x="150" y="190" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#F5F5F5">AMP VENDING</text>
            )}
            
            {/* M and P subtly incorporated */}
            <path d="M125 107 L130 97 L135 107 L140 97 L145 107" fill="none" stroke="#F5F5F5" strokeWidth="0.5" opacity="0.6" />
            <path d="M160 107 Q170 95 175 107" fill="none" stroke="#F5F5F5" strokeWidth="0.5" opacity="0.6" />
          </svg>
        );
    }
  };

  return renderLogo();
};

export default AMPVendingLogo;