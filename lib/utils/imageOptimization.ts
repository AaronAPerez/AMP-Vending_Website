export const getOptimizedImageProps = (src: string, alt: string) => ({
  src,
  alt,
  loading: 'lazy' as const,
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality: 85,
  format: ['webp', 'avif'],
});

// Convert all images to WebP/AVIF
// Add responsive image loading
// Implement blur placeholders