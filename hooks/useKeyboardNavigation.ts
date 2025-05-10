import { useEffect } from 'react';

/**
 * Options for the useKeyboardNavigation hook
 */
interface KeyboardNavigationOptions {
  /**
   * Callback function for left arrow key press
   */
  onLeftArrow?: () => void;
  
  /**
   * Callback function for right arrow key press
   */
  onRightArrow?: () => void;
  
  /**
   * Callback function for up arrow key press
   */
  onUpArrow?: () => void;
  
  /**
   * Callback function for down arrow key press
   */
  onDownArrow?: () => void;
  
  /**
   * Callback function for escape key press
   */
  onEscape?: () => void;
  
  /**
   * Callback function for enter key press
   */
  onEnter?: () => void;
  
  /**
   * Callback function for space key press
   */
  onSpace?: () => void;
  
  /**
   * Whether the hook should be disabled
   */
  disabled?: boolean;
}

/**
 * A custom hook to handle keyboard navigation
 * 
 * @param options - Configuration options for keyboard handling
 * @returns void
 */
const useKeyboardNavigation = (options: KeyboardNavigationOptions): void => {
  const {
    onLeftArrow,
    onRightArrow,
    onUpArrow,
    onDownArrow,
    onEscape,
    onEnter,
    onSpace,
    disabled = false
  } = options;
  
  useEffect(() => {
    if (disabled) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          if (onLeftArrow) {
            event.preventDefault();
            onLeftArrow();
          }
          break;
        case 'ArrowRight':
          if (onRightArrow) {
            event.preventDefault();
            onRightArrow();
          }
          break;
        case 'ArrowUp':
          if (onUpArrow) {
            event.preventDefault();
            onUpArrow();
          }
          break;
        case 'ArrowDown':
          if (onDownArrow) {
            event.preventDefault();
            onDownArrow();
          }
          break;
        case 'Escape':
          if (onEscape) {
            event.preventDefault();
            onEscape();
          }
          break;
        case 'Enter':
          if (onEnter) {
            event.preventDefault();
            onEnter();
          }
          break;
        case ' ':
          if (onSpace) {
            event.preventDefault();
            onSpace();
          }
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    disabled,
    onLeftArrow,
    onRightArrow,
    onUpArrow,
    onDownArrow,
    onEscape,
    onEnter,
    onSpace
  ]);
};

export default useKeyboardNavigation;