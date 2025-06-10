import { useCallback, useRef } from 'react';

/**
 * useMouseEnter Hook
 * 
 * A reusable hook for managing mouse enter/leave interactions
 * with proper cleanup and TypeScript support.
 * 
 * @param onMouseEnter - Callback function to execute on mouse enter
 * @param onMouseLeave - Callback function to execute on mouse leave
 * @returns Object containing ref and event handlers
 */
export const useMouseEnter = <T extends HTMLElement>(
  onMouseEnter?: () => void,
  onMouseLeave?: () => void
) => {
  const elementRef = useRef<T>(null);

  const handleMouseEnter = useCallback(() => {
    if (onMouseEnter) {
      onMouseEnter();
    }
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    if (onMouseLeave) {
      onMouseLeave();
    }
  }, [onMouseLeave]);

  return {
    ref: elementRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
};

export default useMouseEnter;