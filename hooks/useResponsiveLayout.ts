import { useState, useEffect } from 'react';

/**
 * Breakpoint configuration matching Tailwind CSS defaults
 */
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Responsive layout configuration for different screen sizes
 */
interface ResponsiveLayoutConfig {
  /** Current active breakpoint */
  breakpoint: Breakpoint | 'xs';
  /** Whether the screen is mobile size (< sm) */
  isMobile: boolean;
  /** Whether the screen is tablet size (sm to lg) */
  isTablet: boolean;
  /** Whether the screen is desktop size (>= lg) */
  isDesktop: boolean;
  /** Current window width */
  width: number;
  /** Grid columns for the current breakpoint */
  gridCols: number;
  /** Gap size for the current breakpoint */
  gap: string;
}

/**
 * useResponsiveLayout Hook
 * 
 * A custom hook for managing responsive layout configurations.
 * Provides breakpoint detection, grid column calculations, and
 * responsive utilities for building adaptive layouts.
 * 
 * Features:
 * - Real-time breakpoint detection
 * - Automatic grid column calculation
 * - Performance optimized with debouncing
 * - SSR-safe with proper hydration handling
 * - Configurable responsive behaviors
 */
export function useResponsiveLayout(): ResponsiveLayoutConfig {
  const [layoutConfig, setLayoutConfig] = useState<ResponsiveLayoutConfig>({
    breakpoint: 'lg',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: 1024,
    gridCols: 4,
    gap: 'gap-8',
  });

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;

    /**
     * Calculate layout configuration based on current window width
     */
    const calculateLayout = (width: number): ResponsiveLayoutConfig => {
      let breakpoint: Breakpoint | 'xs' = 'xs';
      let gridCols = 1;
      let gap = 'gap-4';

      // Determine current breakpoint
      if (width >= BREAKPOINTS['2xl']) {
        breakpoint = '2xl';
        gridCols = 4;
        gap = 'gap-8';
      } else if (width >= BREAKPOINTS.xl) {
        breakpoint = 'xl';
        gridCols = 4;
        gap = 'gap-8';
      } else if (width >= BREAKPOINTS.lg) {
        breakpoint = 'lg';
        gridCols = 4;
        gap = 'gap-8';
      } else if (width >= BREAKPOINTS.md) {
        breakpoint = 'md';
        gridCols = 2;
        gap = 'gap-6';
      } else if (width >= BREAKPOINTS.sm) {
        breakpoint = 'sm';
        gridCols = 2;
        gap = 'gap-6';
      } else {
        breakpoint = 'xs';
        gridCols = 1;
        gap = 'gap-4';
      }

      const isMobile = width < BREAKPOINTS.sm;
      const isTablet = width >= BREAKPOINTS.sm && width < BREAKPOINTS.lg;
      const isDesktop = width >= BREAKPOINTS.lg;

      return {
        breakpoint,
        isMobile,
        isTablet,
        isDesktop,
        width,
        gridCols,
        gap,
      };
    };

    /**
     * Handle window resize with debouncing for performance
     */
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newConfig = calculateLayout(window.innerWidth);
        setLayoutConfig(newConfig);
      }, 16); // ~60fps
    };

    // Set initial layout
    const initialConfig = calculateLayout(window.innerWidth);
    setLayoutConfig(initialConfig);

    // Add resize listener
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return layoutConfig;
}

/**
 * useBreakpoint Hook
 * 
 * A simpler hook for basic breakpoint detection
 */
export function useBreakpoint(): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: Breakpoint | 'xs';
} {
  const { isMobile, isTablet, isDesktop, breakpoint } = useResponsiveLayout();
  return { isMobile, isTablet, isDesktop, breakpoint };
}

/**
 * Utility function to get responsive class names based on breakpoint
 */
export function getResponsiveClasses(config: ResponsiveLayoutConfig) {
  const { isMobile, isTablet, isDesktop, gridCols, gap } = config;

  return {
    container: `max-w-7xl mx-auto px-4 ${isMobile ? 'sm:px-6' : 'sm:px-6 lg:px-8'}`,
    grid: `grid ${gap} ${
      isMobile 
        ? 'grid-cols-1' 
        : isTablet 
        ? 'grid-cols-2' 
        : `grid-cols-${gridCols}`
    }`,
    card: `${
      isMobile 
        ? 'max-w-sm mx-auto' 
        : isTablet 
        ? 'max-w-md mx-auto' 
        : 'max-w-[320px] mx-auto'
    }`,
    text: {
      heading: isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl',
      subheading: isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl',
      body: isMobile ? 'text-sm' : 'text-base',
    },
    spacing: {
      section: isMobile ? 'py-8' : isTablet ? 'py-12' : 'py-16',
      component: isMobile ? 'mb-8' : isTablet ? 'mb-12' : 'mb-16',
    },
  };
}