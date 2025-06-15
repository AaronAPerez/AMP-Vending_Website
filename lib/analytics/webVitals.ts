import { trackWebVitals } from './googleAnalytics';

export interface WebVitalMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  id: string;
  label: 'web-vital' | 'custom';
  navigationType?: string;
}

/**
 * Track Core Web Vitals for SEO performance
 * These metrics directly impact Google search rankings
 */
export function reportWebVitals(metric: WebVitalMetric) {
  // Send to Google Analytics
  trackWebVitals(metric);
  
  // Log in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      id: metric.id,
      label: metric.label
    });
  }
  
  // Send to other analytics services if needed
  sendToAnalytics(metric);
}

/**
 * Send metrics to additional analytics services
 */
function sendToAnalytics(metric: WebVitalMetric) {
  // Example: Send to your own analytics endpoint
  if (typeof window !== 'undefined') {
    // You can send to your own analytics API
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        id: metric.id,
        url: window.location.href,
        timestamp: Date.now(),
      }),
    }).catch(error => {
      // Silently fail to not impact user experience
      console.warn('Failed to send web vitals:', error);
    });
  }
}

/**
 * Set up performance monitoring for key business metrics
 */
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Monitor critical business pages load times
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      // Track page load performance for key pages
      if (entry.entryType === 'navigation') {
        const navEntry = entry as PerformanceNavigationTiming;
        
        // Track specific metrics for vending machine pages
        if (window.location.pathname.includes('vending-machines')) {
          trackWebVitals({
            name: 'LCP',
            value: navEntry.loadEventEnd - navEntry.loadEventStart,
            id: `machine-page-${Date.now()}`,
            label: 'custom'
          });
        }
        
        // Track contact page performance (important for conversions)
        if (window.location.pathname.includes('contact')) {
          trackWebVitals({
            name: 'FCP',
            value: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            id: `contact-page-${Date.now()}`,
            label: 'custom'
          });
        }
      }
    });
  });

  // Start observing
  observer.observe({ entryTypes: ['navigation'] });
}
