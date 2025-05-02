import { useRef, useState, useEffect } from 'react';
import { useMotionValue, MotionValue } from 'framer-motion';

/**
 * Options interface for the useHeroHighlight hook
 */
interface HeroHighlightOptions {
  /**
   * Whether to enable the highlight effect
   * @default true
   */
  enabled?: boolean;
  
  /**
   * Radius of the highlight effect in pixels
   * @default 600
   */
  radius?: number;
  
  /**
   * Color of the highlight effect (in rgba format)
   * @default 'rgba(253, 90, 30, 0.15)'
   */
  color?: string;
  
  /**
   * Opacity of the highlight when inactive
   * @default 0
   */
  inactiveOpacity?: number;
  
  /**
   * Opacity of the highlight when active/hovered
   * @default 1
   */
  activeOpacity?: number;
}

/**
 * Result interface returned by the useHeroHighlight hook
 */
interface HeroHighlightResult {
  /**
   * Reference to attach to the container element
   */
  ref: React.RefObject<HTMLDivElement | null>;
  
  /**
   * X position motion value for the highlight
   */
  mouseX: MotionValue<number>;
  
  /**
   * Y position motion value for the highlight
   */
  mouseY: MotionValue<number>;
  
  /**
   * Whether the element is currently being hovered
   */
  isHovered: boolean;
  
  /**
   * Handler for mouse move events
   */
  handleMouseMove: (e: React.MouseEvent) => void;
  
  /**
   * Handler for mouse enter events
   */
  handleMouseEnter: () => void;
  
  /**
   * Handler for mouse leave events
   */
  handleMouseLeave: () => void;
  
  /**
   * Get the CSS background style for the highlight effect
   */
  getHighlightStyle: () => { background: string };
  
  /**
   * Options used for the highlight effect
   */
  options: Required<HeroHighlightOptions>;
}

/**
 * Custom hook for creating a highlight effect that follows the mouse cursor
 * Inspired by Aceternity UI's Hero Highlight component
 * 
 * @param options - Configuration options for the highlight effect
 * @returns Object containing refs, handlers and values for the highlight effect
 */
const useHeroHighlight = (options: HeroHighlightOptions = {}): HeroHighlightResult => {
  // Set default options
  const defaultOptions: Required<HeroHighlightOptions> = {
    enabled: true,
    radius: 600,
    color: 'rgba(253, 90, 30, 0.15)',
    inactiveOpacity: 0,
    activeOpacity: 1,
  };
  
  // Merge provided options with defaults
  const mergedOptions: Required<HeroHighlightOptions> = {
    ...defaultOptions,
    ...options,
  };
  
  // Create ref for the container element
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Track hover state
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !mergedOptions.enabled) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  // Generate the CSS for the highlight effect
  const getHighlightStyle = () => {
    const { radius, color } = mergedOptions;
    
    return {
      background: `radial-gradient(${radius}px circle at var(--x) var(--y), ${color}, transparent 80%)`,
    };
  };
  
  // Update CSS variables when mouse position changes
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Update CSS variables
    const updateCssVariables = () => {
      if (!containerRef.current) return;
      
      containerRef.current.style.setProperty('--x', `${mouseX.get()}px`);
      containerRef.current.style.setProperty('--y', `${mouseY.get()}px`);
    };
    
    // Subscribe to motion value changes
    const unsubscribeX = mouseX.on('change', updateCssVariables);
    const unsubscribeY = mouseY.on('change', updateCssVariables);
    
    // Update CSS variables initially
    updateCssVariables();
    
    // Cleanup subscriptions
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY]);
  
  return {
    ref: containerRef,
    mouseX,
    mouseY,
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    getHighlightStyle,
    options: mergedOptions,
  };
};

export default useHeroHighlight;