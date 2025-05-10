'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AuroraBackgroundProps {
  className?: string;
  spotlightSize?: number;
  children?: React.ReactNode;
}

/**
 * Aurora Background with Spotlights Effect
 * Inspired by Aceternity UI but customized for AMP Vending
 * Creates a dynamic gradient background with moving spotlight effects
 */
const AuroraBackground = ({
  className = "",
  spotlightSize = 400,
  children,
}: AuroraBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const [spotlights, setSpotlights] = useState<{ x: number; y: number; opacity: number }[]>([
    { x: 15, y: 15, opacity: 0.3 },
    { x: 85, y: 25, opacity: 0.4 },
    { x: 40, y: 80, opacity: 0.3 },
  ]);
  const mouseMoving = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  // Handle mouse/touch movement
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      mouseMoving.current = true;
      
      if (!containerRef.current) return;
      
      // Get container dimensions and position
      const rect = containerRef.current.getBoundingClientRect();
      
      // Get pointer position (mouse or touch)
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      // Calculate relative position (0-100)
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      
      setPointerPosition({ x, y });
    };
    
    // Handle pointer leaving
    const handlePointerLeave = () => {
      mouseMoving.current = false;
    };
    
    // Add event listeners
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handlePointerMove);
      container.addEventListener('touchmove', handlePointerMove);
      container.addEventListener('mouseleave', handlePointerLeave);
    }
    
    // Cleanup event listeners
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handlePointerMove);
        container.removeEventListener('touchmove', handlePointerMove);
        container.removeEventListener('mouseleave', handlePointerLeave);
      }
    };
  }, []);
  
  // Animation loop for automatic spotlight movement
  useEffect(() => {
    let previousTime = 0;
    
    const animateSpotlights = (currentTime: number) => {
      // Calculate time delta for smooth animation regardless of frame rate
      const deltaTime = previousTime ? (currentTime - previousTime) / 1000 : 0;
      previousTime = currentTime;
      
      if (!mouseMoving.current) {
        // Slowly move spotlights when mouse isn't moving
        setSpotlights(prev => prev.map((spotlight, i) => {
          // Each spotlight moves in a different pattern
          const angle = currentTime * 0.0005 * (i + 1) * 0.5;
          const radius = 20 + (i * 5);
          const centerX = 50 + i * 10;
          const centerY = 50 - i * 10;
          
          return {
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            opacity: 0.3 + 0.1 * Math.sin(currentTime * 0.001 * (i + 1))
          };
        }));
      } else {
        // When mouse is moving, the first spotlight follows the mouse
        setSpotlights(prev => [
          { x: pointerPosition.x, y: pointerPosition.y, opacity: 0.5 },
          ...prev.slice(1).map((spotlight, i) => {
            // Other spotlights slightly move toward mouse position
            const moveSpeed = 0.5 * (i + 1) * deltaTime;
            return {
              x: spotlight.x + (pointerPosition.x - spotlight.x) * moveSpeed * 0.2,
              y: spotlight.y + (pointerPosition.y - spotlight.y) * moveSpeed * 0.2,
              opacity: spotlight.opacity
            };
          })
        ]);
      }
      
      animationFrameRef.current = requestAnimationFrame(animateSpotlights);
    };
    
    animationFrameRef.current = requestAnimationFrame(animateSpotlights);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [pointerPosition]);
  
  // Custom colors for AMP Vending theme
  const backgroundBaseColor = '#000000';
  const spotlightColors = [
    'rgba(253, 90, 30, 0.8)',   // AMP Orange
    'rgba(165, 172, 175, 0.6)', // Silver
    'rgba(77, 77, 77, 0.7)'     // Dark Gray
  ];

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: backgroundBaseColor,
      }}
    >
      {/* Aurora spotlights */}
      {spotlights.map((spotlight, i) => (
        <div
          key={i}
          className="absolute opacity-0 mix-blend-normal will-change-transform"
          style={{
            top: `${spotlight.y}%`,
            left: `${spotlight.x}%`,
            width: `${spotlightSize}px`,
            height: `${spotlightSize}px`,
            background: spotlightColors[i % spotlightColors.length],
            borderRadius: '50%',
            filter: 'blur(120px)',
            transform: 'translate(-50%, -50%)',
            opacity: spotlight.opacity,
            transition: mouseMoving.current ? 'opacity 0.3s ease' : 'all 0.8s ease',
          }}
          aria-hidden="true"
        />
      ))}
      
      {/* Content overlay */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;