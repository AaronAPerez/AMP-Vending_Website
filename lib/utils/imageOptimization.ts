/**
 * Enhanced Image Optimization Utilities
 * 
 * Build Process Documentation:
 * 1. Optimized image quality settings for different use cases
 * 2. Responsive image sizing with proper breakpoints
 * 3. Blur placeholder implementation for smooth loading
 * 4. Modern image format support (WebP/AVIF)
 * 5. Performance-focused loading strategies
 */

/**
 * Base64-encoded blur placeholder for smooth image loading
 * Lightweight 8x6 pixel placeholder that matches the site's color scheme
 */
const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyugDYkPr3g/rNIHJnzrCE+8Z0VhkAJ3bw6rNY0sYLDMk3I2cYqWZaFrrB//9k=';

/**
 * Image use case types for different optimization strategies
 */
export type ImageUseCase = 'hero' | 'product' | 'machine' | 'background' | 'thumbnail' | 'icon';

/**
 * Responsive image sizes configuration
 * Optimized for vending machine website layout patterns
 */
const RESPONSIVE_SIZES = {
  // Hero section images (full viewport)
  hero: '100vw',
  
  // Product grid images (responsive grid)
  product: '(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw',
  
  // Machine detail images (responsive layout)
  machine: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw',
  
  // Background/decorative images
  background: '(max-width: 768px) 25vw, 20vw',
  
  // Thumbnail images
  thumbnail: '(max-width: 640px) 20vw, 15vw',
  
  // Icon-sized images
  icon: '(max-width: 640px) 10vw, 5vw',
} as const;

/**
 * Quality settings based on image use case
 * Lower quality for backgrounds, higher for product showcases
 */
const QUALITY_SETTINGS = {
  hero: 85,      // High quality for hero images
  product: 75,   // Good balance for product images
  machine: 80,   // High quality for machine showcases
  background: 60, // Lower quality for backgrounds
  thumbnail: 70,  // Moderate quality for thumbnails
  icon: 85,      // High quality for small icons
} as const;

/**
 * Enhanced image optimization properties
 * 
 * @param src - Image source URL
 * @param alt - Alt text for accessibility
 * @param useCase - The use case for optimization strategy
 * @param priority - Whether to load with high priority
 * @param customSizes - Custom sizes string if different from defaults
 * @returns Optimized image properties for Next.js Image component
 */
export const getOptimizedImageProps = (
  src: string, 
  alt: string, 
  useCase: ImageUseCase = 'product',
  priority = false,
  customSizes?: string
) => ({
  src,
  alt,
  loading: priority ? 'eager' as const : 'lazy' as const,
  sizes: customSizes || RESPONSIVE_SIZES[useCase],
  quality: QUALITY_SETTINGS[useCase],
  placeholder: 'blur' as const,
  blurDataURL: BLUR_DATA_URL,
  priority,
  // Additional optimization props
  decoding: 'async' as const,
  draggable: false,
});

/**
 * Product image optimization specifically for ProductSection
 * Addresses Lighthouse "Properly size images" recommendation
 */
export const getProductImageProps = (src: string, alt: string, priority = false) => ({
  src,
  alt,
  fill: true,
  sizes: '(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw',
  quality: 75,
  placeholder: 'blur' as const,
  blurDataURL: BLUR_DATA_URL,
  loading: priority ? 'eager' as const : 'lazy' as const,
  className: 'object-cover transition-transform duration-500 group-hover:scale-110',
});

/**
 * Machine card image optimization for MachineCard component
 * Optimized for different machine card variants
 */
export const getMachineCardImageProps = (
  src: string, 
  alt: string, 
  variant: 'showcase' | 'grid' | 'related' | 'compact' = 'grid',
  priority = false
) => {
  const sizesByVariant = {
    showcase: '(max-width: 768px) 100vw, 50vw',
    grid: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw',
    related: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw',
    compact: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw',
  };

  return {
    src,
    alt,
    fill: true,
    sizes: sizesByVariant[variant],
    quality: variant === 'showcase' ? 85 : 80,
    placeholder: 'blur' as const,
    blurDataURL: BLUR_DATA_URL,
    priority,
    className: `object-contain p-4 transition-all duration-700 scale-100 group-hover:scale-105 focus-within:scale-105`,
  };
};

/**
 * Hero background image optimization
 * Reduces DOM complexity and improves performance
 */
export const getHeroBackgroundImageProps = (src: string, alt: string, index: number) => ({
  src,
  alt: alt || '', // Empty alt for decorative images
  fill: true,
  sizes: '(max-width: 768px) 25vw, 20vw',
  quality: 60, // Lower quality for background images
  placeholder: 'blur' as const,
  blurDataURL: BLUR_DATA_URL,
  priority: index < 4, // Only prioritize first 4 images
  loading: index < 4 ? 'eager' as const : 'lazy' as const,
});

/**
 * Logo and branding image optimization
 */
export const getLogoImageProps = (src: string, alt: string, priority = true) => ({
  src,
  alt,
  quality: 90, // High quality for branding
  priority,
  sizes: '(max-width: 640px) 120px, 160px',
  placeholder: 'blur' as const,
  blurDataURL: BLUR_DATA_URL,
  decoding: 'async' as const,
});

/**
 * Image preloading utility for critical images
 * Helps improve Largest Contentful Paint (LCP)
 */
export const preloadCriticalImage = (src: string, sizes?: string) => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    if (sizes) {
      link.setAttribute('imagesizes', sizes);
      link.setAttribute('imagesrcset', `${src} 1x`);
    }
    document.head.appendChild(link);
  }
};

/**
 * Image optimization validation utility
 * Helps identify images that need optimization
 */
export const validateImageOptimization = (imageProps: any): boolean => {
  const hasOptimalSizes = imageProps.sizes && imageProps.sizes.length > 0;
  const hasQualitySetting = imageProps.quality && imageProps.quality <= 85;
  const hasPlaceholder = imageProps.placeholder === 'blur';
  const hasProperLoading = imageProps.loading === 'lazy' || imageProps.priority;

  return hasOptimalSizes && hasQualitySetting && hasPlaceholder && hasProperLoading;
};

/**
 * WebP format detection utility
 * Checks if browser supports WebP for conditional loading
 */
export const supportsWebP = (): Promise<boolean> => {
  if (typeof window === 'undefined') return Promise.resolve(false);
  
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => resolve(webP.height === 2);
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Image loading performance monitoring
 * Helps track image loading performance for optimization
 */
export const trackImagePerformance = (src: string, startTime: number) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const loadTime = performance.now() - startTime;
    
    // Log slow-loading images for optimization
    if (loadTime > 1000) {
      console.warn(`Slow image loading detected: ${src} took ${loadTime.toFixed(2)}ms`);
    }
    
    // Track with analytics if available
    if ('gtag' in window) {
      const gtag = window.gtag as (command: string, eventName: string, params: Record<string, unknown>) => void;
      gtag('event', 'image_load_time', {
        event_category: 'Performance',
        event_label: src,
        value: Math.round(loadTime),
      });
    }
  }
};

/**
 * Export all optimized configurations for easy access
 */
export {
  BLUR_DATA_URL,
  RESPONSIVE_SIZES,
  QUALITY_SETTINGS,
};