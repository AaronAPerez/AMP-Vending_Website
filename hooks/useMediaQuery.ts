import { useState, useEffect } from 'react';

/**
 * Hook to detect if a media query matches
 * 
 * @param query - CSS media query to match against
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Default to false on server
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Set initial value
      setMatches(media.matches);
      
      // Add listener for changes
      const listener = () => setMatches(media.matches);
      
      // Newer browsers
      if (media.addEventListener) {
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
      } 
      // Legacy browsers
      else {
        media.addListener(listener);
        return () => media.removeListener(listener);
      }
    }
  }, [query]);
  
  return matches;
}

/**
 * Predefined breakpoint hooks
 * Based on your tailwind breakpoint configuration
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 639px)');
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

export function useIsDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}