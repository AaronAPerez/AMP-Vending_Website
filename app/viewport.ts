import { Viewport } from 'next'

/**
 * Viewport Configuration for AMP Vending
 * 
 * Separated from layout.tsx metadata as per Next.js 14+ requirements.
 * This file configures viewport settings for responsive design and mobile optimization.
 * 
 * Build Process Documentation:
 * - Moved from metadata export to dedicated viewport export
 * - Optimized for mobile performance and accessibility
 * - Prevents 300ms tap delay on mobile devices
 * - Ensures proper scaling and zoom behavior
 */

export const viewport: Viewport = {
  // Basic responsive configuration
  width: 'device-width',
  initialScale: 1,
  
  // Mobile optimization
  minimumScale: 1,
  maximumScale: 5, // Allow zoom up to 5x for accessibility
  
  // Disable user scaling only if absolutely necessary (not recommended for accessibility)
  userScalable: true,
  
  // Improve mobile experience
  viewportFit: 'cover',
  
  // Theme color for browser chrome (mobile browsers)
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000000' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  
  // Status bar appearance for iOS Safari
  colorScheme: 'dark light',
}