'use client';

import React, { useState, useRef, useEffect } from 'react';

interface SpotlightProps {
  /**
   * Children to render inside the spotlight container
   */
  children: React.ReactNode;
  
  /**
   * Optional CSS class name for additional styling
   */
  className?: string;
  
  /**
   * Size of the spotlight in pixels
   * @default 600
   */
  spotlightSize?: number;
  
  /**
   * Color of the spotlight
   * @default "rgba(253, 90, 30, 0.1)" (Orange accent with low opacity)
   */
  spotlightColor?: string;
  
  /**
   * Background color of the component
   * @default "#000000"
   */
  backgroundColor?: string;
  
  /**
   * Enable spotlight glow effect
   * @default true
   */
  enableGlow?: boolean;
}

/**
 * Spotlight Component
 * 
 * Creates a realistic spotlight effect that follows cursor movement
 * Inspired by Aceternity UI's Spotlight component
 */
const Spotlight: React.FC<SpotlightProps> = ({
  children,
  className = "",
  spotlightSize = 600,
  spotlightColor = "rgba(253, 90, 30, 0.03)",
  backgroundColor = "#000000",
  enableGlow = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Handle mouse movement to update spotlight position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });
  };

  // Handle mouse enter/leave events
  const handleMouseEnter = () => {
    setIsHovering(true);
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setOpacity(0);
  };

  // Handle focus for accessibility
  const handleFocus = () => {
    setOpacity(0.5);
  };

  const handleBlur = () => {
    if (!isHovering) {
      setOpacity(0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ background: backgroundColor }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      role="region"
      aria-label="Interactive spotlight section"
    >
      {/* Radial gradient spotlight overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent)`,
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      
      {/* Additional glow effect overlay */}
      {enableGlow && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(${spotlightSize * 0.6}px circle at ${position.x}px ${position.y}px, rgba(253, 90, 30, 0.07), transparent 70%)`,
            zIndex: 1,
            mixBlendMode: 'overlay'
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Bright center spot */}
      <div
        className="pointer-events-none absolute -inset-px mix-blend-overlay transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize * 0.05}px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.9), transparent 70%)`,
          zIndex: 2,
          filter: 'blur(8px)'
        }}
        aria-hidden="true"
      />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
        aria-hidden="true"
      />
      
      {/* Children content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Spotlight;