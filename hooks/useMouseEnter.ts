/**
 * useMouseEnter Custom Hook - SSR Safe Implementation
 * 
 * Build Process Documentation:
 * 1. Implements proper SSR safety with client-side only execution
 * 2. Provides mouse enter/leave state management for interactive components
 * 3. Includes cleanup and memory leak prevention
 * 4. Follows React best practices for custom hooks
 * 5. Includes TypeScript support with proper typing
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Interface for mouse enter hook options
 */
interface UseMouseEnterOptions {
  /** Delay before triggering mouse enter state (in milliseconds) */
  delay?: number;
  /** Delay before triggering mouse leave state (in milliseconds) */
  leaveDelay?: number;
  /** Whether to track mouse position */
  trackPosition?: boolean;
  /** Callback when mouse enters */
  onMouseEnter?: () => void;
  /** Callback when mouse leaves */
  onMouseLeave?: () => void;
}

/**
 * Interface for mouse position data
 */
interface MousePosition {
  x: number;
  y: number;
}

/**
 * Return type for useMouseEnter hook
 */
interface UseMouseEnterReturn {
  /** Whether mouse is currently hovering over the element */
  isHovered: boolean;
  /** Current mouse position (if trackPosition is enabled) */
  mousePosition: MousePosition | null;
  /** Ref to attach to the target element */
  ref: React.RefObject<HTMLElement | null>;
  /** Manual trigger functions for programmatic control */
  trigger: {
    enter: () => void;
    leave: () => void;
  };
}

/**
 * Custom hook for safe client-side detection
 * Prevents SSR issues by ensuring we're on the client
 */
function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * useMouseEnter Hook - Enhanced mouse interaction tracking
 * 
 * Provides SSR-safe mouse enter/leave state management with optional
 * position tracking and configurable delays.
 * 
 * @param options Configuration options for the hook
 * @returns Object containing hover state, position, ref, and trigger functions
 * 
 * @example
 * ```tsx
 * function HoverCard() {
 *   const { isHovered, ref } = useMouseEnter({
 *     delay: 100,
 *     onMouseEnter: () => console.log('Mouse entered'),
 *   });
 * 
 *   return (
 *     <div ref={ref} className={isHovered ? 'hovered' : ''}>
 *       Hover me!
 *     </div>
 *   );
 * }
 * ```
 */
export function useMouseEnter(options: UseMouseEnterOptions = {}): UseMouseEnterReturn {
  const {
    delay = 0,
    leaveDelay = 0,
    trackPosition = false,
    onMouseEnter,
    onMouseLeave,
  } = options;

  // Client-side safety check
  const isClient = useIsClient();

  // State management
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(null);

  // Refs for cleanup and element reference
  const elementRef = useRef<HTMLElement>(null);
  const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Clear any pending timeouts to prevent memory leaks
   */
  const clearTimeouts = useCallback(() => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  }, []);

  /**
   * Handle mouse enter with optional delay
   */
  const handleMouseEnter = useCallback((event?: MouseEvent) => {
    // Clear any pending leave timeout
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    // Set mouse position if tracking is enabled
    if (trackPosition && event) {
      const rect = elementRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    }

    // Handle delayed enter
    if (delay > 0) {
      enterTimeoutRef.current = setTimeout(() => {
        setIsHovered(true);
        onMouseEnter?.();
      }, delay);
    } else {
      setIsHovered(true);
      onMouseEnter?.();
    }
  }, [delay, trackPosition, onMouseEnter]);

  /**
   * Handle mouse leave with optional delay
   */
  const handleMouseLeave = useCallback(() => {
    // Clear any pending enter timeout
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }

    // Reset mouse position
    if (trackPosition) {
      setMousePosition(null);
    }

    // Handle delayed leave
    if (leaveDelay > 0) {
      leaveTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
        onMouseLeave?.();
      }, leaveDelay);
    } else {
      setIsHovered(false);
      onMouseLeave?.();
    }
  }, [leaveDelay, trackPosition, onMouseLeave]);

  /**
   * Handle mouse move for position tracking
   */
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!trackPosition || !isHovered) return;

    const rect = elementRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  }, [trackPosition, isHovered]);

  /**
   * Manual trigger functions for programmatic control
   */
  const trigger = {
    enter: useCallback(() => handleMouseEnter(), [handleMouseEnter]),
    leave: useCallback(() => handleMouseLeave(), [handleMouseLeave]),
  };

  /**
   * Set up event listeners when client-side and element is available
   */
  useEffect(() => {
    if (!isClient || !elementRef.current) return;

    const element = elementRef.current;

    // Add event listeners
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    if (trackPosition) {
      element.addEventListener('mousemove', handleMouseMove);
    }

    // Cleanup function
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      
      if (trackPosition) {
        element.removeEventListener('mousemove', handleMouseMove);
      }

      // Clear any pending timeouts
      clearTimeouts();
    };
  }, [isClient, handleMouseEnter, handleMouseLeave, handleMouseMove, trackPosition, clearTimeouts]);

  /**
   * Cleanup timeouts on unmount
   */
  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, [clearTimeouts]);

  return {
    isHovered,
    mousePosition,
    ref: elementRef,
    trigger,
  };
}

/**
 * Extended hook for hover with touch support
 * Useful for mobile devices where mouse events don't exist
 */
export function useHoverWithTouch(options: UseMouseEnterOptions = {}) {
  const mouseEnterResult = useMouseEnter(options);
  const [isTouched, setIsTouched] = useState(false);
  const isClient = useIsClient();

  const handleTouchStart = useCallback(() => {
    setIsTouched(true);
    mouseEnterResult.trigger.enter();
  }, [mouseEnterResult.trigger]);

  const handleTouchEnd = useCallback(() => {
    setIsTouched(false);
    mouseEnterResult.trigger.leave();
  }, [mouseEnterResult.trigger]);

  useEffect(() => {
    if (!isClient || !mouseEnterResult.ref.current) return;

    const element = mouseEnterResult.ref.current;

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isClient, mouseEnterResult.ref, handleTouchStart, handleTouchEnd]);

  return {
    ...mouseEnterResult,
    isHovered: mouseEnterResult.isHovered || isTouched,
    isTouched,
  };
}

/**
 * Hook for detecting hover intent (reduced false positives)
 * Useful for tooltips and dropdowns that should only show on intentional hover
 */
export function useHoverIntent(options: UseMouseEnterOptions & {
  /** Minimum time mouse must be still before triggering hover */
  intentDelay?: number;
}) {
  const { intentDelay = 300, ...restOptions } = options;
  
  const mouseEnterResult = useMouseEnter({
    ...restOptions,
    delay: intentDelay,
    trackPosition: true,
  });

  const [hasIntent, setHasIntent] = useState(false);
  const lastPositionRef = useRef<MousePosition | null>(null);
  const intentTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check for mouse movement to determine intent
  useEffect(() => {
    if (!mouseEnterResult.mousePosition) {
      setHasIntent(false);
      return;
    }

    const currentPosition = mouseEnterResult.mousePosition;
    const lastPosition = lastPositionRef.current;

    // If mouse hasn't moved much, consider it intentional hover
    if (lastPosition) {
      const deltaX = Math.abs(currentPosition.x - lastPosition.x);
      const deltaY = Math.abs(currentPosition.y - lastPosition.y);
      const hasMovedSignificantly = deltaX > 5 || deltaY > 5;

      if (hasMovedSignificantly) {
        setHasIntent(false);
        if (intentTimeoutRef.current) {
          clearTimeout(intentTimeoutRef.current);
        }
      }
    }

    lastPositionRef.current = currentPosition;

    // Set intent after delay if mouse stays still
    intentTimeoutRef.current = setTimeout(() => {
      setHasIntent(true);
    }, intentDelay);

    return () => {
      if (intentTimeoutRef.current) {
        clearTimeout(intentTimeoutRef.current);
      }
    };
  }, [mouseEnterResult.mousePosition, intentDelay]);

  // Reset intent when hover ends
  useEffect(() => {
    if (!mouseEnterResult.isHovered) {
      setHasIntent(false);
      lastPositionRef.current = null;
    }
  }, [mouseEnterResult.isHovered]);

  return {
    ...mouseEnterResult,
    hasIntent,
    isIntentionalHover: mouseEnterResult.isHovered && hasIntent,
  };
}

// Export default as the main hook
export default useMouseEnter;