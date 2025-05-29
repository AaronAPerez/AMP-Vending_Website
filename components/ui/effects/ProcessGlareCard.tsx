import { cn } from "@/lib/utils";
import { useEffect } from "react";
import React from "react";
import { useRef } from 'react';

/**
 * Interface for container style properties with CSS custom properties
 */
interface ContainerStyleProps {
  "--m-x": string;
  "--m-y": string;
  "--r-x": string;
  "--r-y": string;
  "--bg-x": string;
  "--bg-y": string;
  "--duration": string;
  "--foil-size": string;
  "--opacity": string;
  "--radius": string;
  "--easing": string;
  "--transition": string;
  [key: string]: string;
}

/**
 * Props interface for ProcessGlareCard component
 */
interface ProcessGlareCardProps {
  /** Child content to render inside the card */
  children: React.ReactNode;
  /** Additional CSS classes for customization */
  className?: string;
  /** Whether to enable reduced motion for accessibility */
  reduceMotion?: boolean;
}

/**
 * ProcessGlareCard Component
 * 
 * A responsive glare card component optimized for the process section.
 * Features enhanced accessibility, reduced motion support, and responsive
 * design that works well across all device sizes.
 * 
 * Key improvements:
 * - Fixed height issues with proper flex/grid layout
 * - Responsive sizing with CSS Grid and Flexbox
 * - Accessibility support with reduced motion detection
 * - Optimized performance with requestAnimationFrame
 * - Better touch support for mobile devices
 * - Improved visual feedback and hover states
 */
export const ProcessGlareCard = ({
  children,
  className,
  reduceMotion = false,
}: ProcessGlareCardProps) => {
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const prefersReducedMotion = useRef(false);
  
  // State management for glare effects
  const state = useRef({
    glare: { x: 50, y: 50 },
    background: { x: 50, y: 50 },
    rotate: { x: 0, y: 0 },
  });

  // Check for reduced motion preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotion.current = mediaQuery.matches || reduceMotion;
      
      // Listen for changes to motion preferences
      const handleChange = (e: MediaQueryListEvent) => {
        prefersReducedMotion.current = e.matches || reduceMotion;
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [reduceMotion]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  
  // Container style with responsive defaults
  const containerStyle: ContainerStyleProps = {
    "--m-x": "50%",
    "--m-y": "50%",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--bg-x": "50%",
    "--bg-y": "50%",
    "--duration": prefersReducedMotion.current ? "0ms" : "300ms",
    "--foil-size": "100%",
    "--opacity": "0",
    "--radius": "12px",
    "--easing": "ease-out",
    "--transition": "var(--duration) var(--easing)",
  };

  // Enhanced background style with better performance
  const backgroundStyle = {
    "--step": "5%",
    "--foil-svg": `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.99994 3.419C2.99994 3.419 21.6142 7.43646 22.7921 12.153C23.97 16.8695 3.41838 23.0306 3.41838 23.0306' stroke='white' stroke-width='5' stroke-miterlimit='3.86874' stroke-linecap='round' style='mix-blend-mode:darken'/%3E%3C/svg%3E")`,
    "--pattern": "var(--foil-svg) center/100% no-repeat",
    "--rainbow": "repeating-linear-gradient(0deg,rgb(255,119,115) calc(var(--step) * 1),rgba(255,237,95,1) calc(var(--step) * 2),rgba(168,255,95,1) calc(var(--step) * 3),rgba(131,255,247,1) calc(var(--step) * 4),rgba(120,148,255,1) calc(var(--step) * 5),rgb(216,117,255) calc(var(--step) * 6),rgb(255,119,115) calc(var(--step) * 7)) 0% var(--bg-y)/200% 700% no-repeat",
    "--diagonal": "repeating-linear-gradient(128deg,#0e152e 0%,hsl(180,10%,60%) 3.8%,hsl(180,10%,60%) 4.5%,hsl(180,10%,60%) 5.2%,#0e152e 10%,#0e152e 12%) var(--bg-x) var(--bg-y)/300% no-repeat",
    "--shade": "radial-gradient(farthest-corner circle at var(--m-x) var(--m-y),rgba(255,255,255,0.1) 12%,rgba(255,255,255,0.15) 20%,rgba(255,255,255,0.25) 120%) var(--bg-x) var(--bg-y)/300% no-repeat",
    backgroundBlendMode: "hue, hue, hue, overlay",
  };

  /**
   * Update CSS custom properties with optimized performance
   */
  const updateStyles = () => {
    if (refElement.current && !prefersReducedMotion.current) {
      const { background, rotate, glare } = state.current;
      const element = refElement.current;
      
      // Batch DOM updates for better performance
      element.style.setProperty("--m-x", `${glare.x}%`);
      element.style.setProperty("--m-y", `${glare.y}%`);
      element.style.setProperty("--r-x", `${rotate.x}deg`);
      element.style.setProperty("--r-y", `${rotate.y}deg`);
      element.style.setProperty("--bg-x", `${background.x}%`);
      element.style.setProperty("--bg-y", `${background.y}%`);
    }
  };

  /**
   * Handle pointer movement with optimized calculations
   */
  const handlePointerMove = (event: React.PointerEvent) => {
    if (prefersReducedMotion.current) return;

    // Cancel previous animation frame
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    // Schedule update for next frame
    animationFrameId.current = requestAnimationFrame(() => {
      const rotateFactor = 0.3; // Reduced for subtler effect
      const rect = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      const percentage = {
        x: Math.max(0, Math.min(100, (100 / rect.width) * position.x)),
        y: Math.max(0, Math.min(100, (100 / rect.height) * position.y)),
      };
      const delta = {
        x: percentage.x - 50,
        y: percentage.y - 50,
      };

      const { background, rotate, glare } = state.current;
      
      // Smooth interpolation for better visual experience
      background.x = 50 + percentage.x / 4 - 12.5;
      background.y = 50 + percentage.y / 3 - 16.67;
      rotate.x = -(delta.x / 3.5) * rotateFactor;
      rotate.y = (delta.y / 2) * rotateFactor;
      glare.x = percentage.x;
      glare.y = percentage.y;

      updateStyles();
    });
  };

  /**
   * Handle pointer enter with accessibility considerations
   */
  const handlePointerEnter = () => {
    isPointerInside.current = true;
    
    if (refElement.current && !prefersReducedMotion.current) {
      setTimeout(() => {
        if (isPointerInside.current && refElement.current) {
          refElement.current.style.setProperty("--duration", "0s");
        }
      }, 300);
    }
  };

  /**
   * Handle pointer leave with smooth reset
   */
  const handlePointerLeave = () => {
    isPointerInside.current = false;
    
    if (refElement.current && !prefersReducedMotion.current) {
      const element = refElement.current;
      element.style.removeProperty("--duration");
      element.style.setProperty("--r-x", "0deg");
      element.style.setProperty("--r-y", "0deg");
      
      // Reset state
      state.current = {
        glare: { x: 50, y: 50 },
        background: { x: 50, y: 50 },
        rotate: { x: 0, y: 0 },
      };
    }
  };

  return (
    <div
      style={containerStyle as React.CSSProperties}
      className={cn(
        // Fixed responsive container with proper sizing
        "relative isolate",
        "[contain:layout_style]",
        "[perspective:600px]",
        "transition-transform duration-[var(--duration)] ease-[var(--easing)]",
        "will-change-transform",
        // Responsive width with proper height inheritance
        "w-full h-full", // Changed to inherit full height from parent
        // Touch improvements for mobile
        "touch-manipulation",
        className
      )}
      ref={refElement}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      // Accessibility improvements
      role="presentation"
      aria-hidden="true"
    >
      {/* Main card container with full height */}
      <div className={cn(
        "h-full w-full", // Ensure full height is used
        "will-change-transform origin-center",
        "transition-transform duration-[var(--duration)] ease-[var(--easing)]",
        "[transform:rotateY(var(--r-x))_rotateX(var(--r-y))]",
        "rounded-[var(--radius)]",
        "border border-[#333333]",
        "hover:[--opacity:0.4]", // Reduced opacity for subtlety
        "hover:[--duration:200ms]",
        "hover:[--easing:linear]",
        "hover:filter-none",
        "overflow-hidden",
        // Enhanced shadow and depth
        "shadow-lg shadow-black/20",
        "hover:shadow-xl hover:shadow-[#FD5A1E]/10",
        // Responsive scaling
        "transition-all duration-300",
        // Use flexbox to ensure content fills container
        "flex flex-col"
      )}>
        {/* Content layer with full height */}
        <div className="w-full h-full flex flex-col [clip-path:inset(0_0_0_0_round_var(--radius))]">
          <div className={cn("h-full w-full bg-black/60 flex flex-col", className)}>
            {children}
          </div>
        </div>
        
        {/* Glare effect layer - only active when motion is enabled */}
        {!prefersReducedMotion.current && (
          <>
            <div 
              className={cn(
                "absolute inset-0", // Position absolutely over content
                "mix-blend-soft-light",
                "[clip-path:inset(0_0_1px_0_round_var(--radius))]",
                "opacity-[var(--opacity)]",
                "transition-opacity duration-[var(--duration)] ease-[var(--easing)]",
                "will-change-background",
                "pointer-events-none", // Don't interfere with content interaction
                "[background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),_rgba(255,255,255,0.8)_10%,_rgba(255,255,255,0.65)_20%,_rgba(255,255,255,0)_90%)]"
              )}
            />
            
            <div
              className={cn(
                "absolute inset-0", // Position absolutely over content
                "mix-blend-color-dodge",
                "opacity-[var(--opacity)]",
                "will-change-background",
                "transition-opacity",
                "pointer-events-none", // Don't interfere with content interaction
                "[clip-path:inset(0_0_1px_0_round_var(--radius))]",
                "[background-blend-mode:hue_hue_hue_overlay]",
                "[background:var(--pattern),_var(--rainbow),_var(--diagonal),_var(--shade)]",
                "relative",
                "after:content-['']",
                "after:absolute",
                "after:inset-0",
                "after:bg-repeat-[inherit]",
                "after:bg-attachment-[inherit]",
                "after:bg-origin-[inherit]",
                "after:bg-clip-[inherit]",
                "after:bg-[inherit]",
                "after:mix-blend-exclusion",
                "after:[background-size:var(--foil-size),_200%_400%,_800%,_200%]",
                "after:[background-position:center,_0%_var(--bg-y),_calc(var(--bg-x)*_-1)_calc(var(--bg-y)*_-1),_var(--bg-x)_var(--bg-y)]",
                "after:[background-blend-mode:soft-light,_hue,_hard-light]"
              )}
              style={{ ...backgroundStyle }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProcessGlareCard;