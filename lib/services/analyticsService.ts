/**
 * Analytics Service for AMP Vending Website
 * 
 * Handles performance monitoring, error tracking, and user analytics
 * with proper TypeScript interfaces for all data structures.
 */

// Define interface for Web Vitals metrics
interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta?: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
}

// Define interface for error information
interface ErrorInfo {
  componentStack?: string;
  errorBoundary?: string;
  eventType?: string;
  [key: string]: unknown;
}

// Define interface for custom tracking events
interface TrackingEvent {
  event_category: string;
  event_action: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, string | number | boolean>;
}

// Define interface for performance metrics
interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

/**
 * Analytics Service Class
 * Provides centralized analytics and monitoring functionality
 */
export class AnalyticsService {
  private static instance: AnalyticsService;
  private isInitialized = false;

  /**
   * Singleton pattern implementation
   */
  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  /**
   * Initialize the analytics service
   */
  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }

    this.isInitialized = true;
    console.log('Analytics service initialized');
  }

  /**
   * Track Web Vitals metrics for performance monitoring
   * @param metric - Web Vitals metric data
   */
  trackWebVitals(metric: WebVitalMetric): void {
    if (typeof window === 'undefined') return;

    try {
      // Log metric for debugging
      console.log('Web Vital:', metric);

      // Send to Google Analytics if available
      if ('gtag' in window && typeof window.gtag === 'function') {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          value: Math.round(metric.value),
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta || 0,
          metric_rating: metric.rating || 'unknown',
        });
      }

      // Send to other analytics platforms as needed
      this.trackCustomEvent({
        event_category: 'Performance',
        event_action: 'Web Vital',
        event_label: metric.name,
        value: Math.round(metric.value),
        custom_parameters: {
          metric_rating: metric.rating || 'unknown',
          metric_id: metric.id,
        },
      });
    } catch (error) {
      console.error('Error tracking Web Vitals:', error);
    }
  }

  /**
   * Track application errors for monitoring and debugging
   * @param error - Error object
   * @param errorInfo - Additional error context information
   */
  trackError(error: Error, errorInfo?: ErrorInfo): void {
    if (typeof window === 'undefined') return;

    try {
      console.error('Application Error:', error, errorInfo);

      // Prepare error data
      const errorData = {
        error_message: error.message,
        error_stack: error.stack?.substring(0, 500) || 'No stack trace',
        error_name: error.name,
        component_stack: errorInfo?.componentStack?.substring(0, 500) || '',
        error_boundary: errorInfo?.errorBoundary || '',
        event_type: errorInfo?.eventType || 'javascript_error',
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        url: window.location.href,
      };

      // Send to Google Analytics if available
      if ('gtag' in window && typeof window.gtag === 'function') {
        window.gtag('event', 'exception', {
          description: `${error.name}: ${error.message}`,
          fatal: false,
          ...errorData,
        });
      }

      // Track as custom event
      this.trackCustomEvent({
        event_category: 'Error',
        event_action: 'JavaScript Error',
        event_label: error.name,
        custom_parameters: errorData,
      });

      // Send to external error tracking service (e.g., Sentry, LogRocket)
      // if (window.Sentry) {
      //   window.Sentry.captureException(error, { extra: errorInfo });
      // }
    } catch (trackingError) {
      console.error('Error tracking failed:', trackingError);
    }
  }

  /**
   * Track custom events for user interactions and business metrics
   * @param event - Custom tracking event data
   */
  trackCustomEvent(event: TrackingEvent): void {
    if (typeof window === 'undefined') return;

    try {
      // Send to Google Analytics if available
      if ('gtag' in window && typeof window.gtag === 'function') {
        window.gtag('event', event.event_action, {
          event_category: event.event_category,
          event_label: event.event_label,
          value: event.value,
          ...event.custom_parameters,
        });
      }

      // Log for debugging in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Custom Event:', event);
      }
    } catch (error) {
      console.error('Error tracking custom event:', error);
    }
  }

  /**
   * Track page views for navigation analytics
   * @param url - Page URL
   * @param title - Page title
   */
  trackPageView(url: string, title: string): void {
    if (typeof window === 'undefined') return;

    try {
      // Send to Google Analytics if available
      if ('gtag' in window && typeof window.gtag === 'function') {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
          page_title: title,
          page_location: url,
        });
      }

      // Track as custom event
      this.trackCustomEvent({
        event_category: 'Navigation',
        event_action: 'Page View',
        event_label: url,
        custom_parameters: {
          page_title: title,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  /**
   * Track user interactions with vending machine information
   * @param machineId - Vending machine identifier
   * @param action - User action performed
   */
  trackVendingMachineInteraction(machineId: string, action: string): void {
    this.trackCustomEvent({
      event_category: 'Vending Machine',
      event_action: action,
      event_label: machineId,
      custom_parameters: {
        machine_id: machineId,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Track contact form interactions
   * @param formType - Type of form (contact, feedback, etc.)
   * @param action - Action performed (started, completed, abandoned)
   */
  trackFormInteraction(formType: string, action: string): void {
    this.trackCustomEvent({
      event_category: 'Form',
      event_action: action,
      event_label: formType,
      custom_parameters: {
        form_type: formType,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Track performance metrics beyond Web Vitals
   * @param metric - Performance metric data
   */
  trackPerformanceMetric(metric: PerformanceMetric): void {
    this.trackCustomEvent({
      event_category: 'Performance',
      event_action: 'Custom Metric',
      event_label: metric.name,
      value: Math.round(metric.value),
      custom_parameters: {
        metric_rating: metric.rating,
        timestamp: metric.timestamp,
      },
    });
  }
}

/**
 * Performance Monitor Class
 * Specialized class for tracking performance-related metrics
 */
export class PerformanceMonitor {
  private static analytics = AnalyticsService.getInstance();

  /**
   * Track Web Vitals metrics
   * @param metric - Web Vitals metric data
   */
  static trackWebVitals(metric: WebVitalMetric): void {
    this.analytics.trackWebVitals(metric);
  }

  /**
   * Track application errors
   * @param error - Error object
   * @param errorInfo - Additional error context
   */
  static trackError(error: Error, errorInfo?: ErrorInfo): void {
    this.analytics.trackError(error, errorInfo);
  }

  /**
   * Monitor page load performance
   */
  static monitorPageLoad(): void {
    if (typeof window === 'undefined') return;

    try {
      window.addEventListener('load', () => {
        // Get navigation timing
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          
          this.analytics.trackPerformanceMetric({
            name: 'page_load_time',
            value: loadTime,
            rating: loadTime < 1000 ? 'good' : loadTime < 2500 ? 'needs-improvement' : 'poor',
            timestamp: Date.now(),
          });

          this.analytics.trackPerformanceMetric({
            name: 'dom_content_loaded',
            value: domContentLoaded,
            rating: domContentLoaded < 800 ? 'good' : domContentLoaded < 1800 ? 'needs-improvement' : 'poor',
            timestamp: Date.now(),
          });
        }
      });
    } catch (error) {
      console.error('Error monitoring page load:', error);
    }
  }
}

// Export default instance
export const analyticsService = AnalyticsService.getInstance();

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export default AnalyticsService;