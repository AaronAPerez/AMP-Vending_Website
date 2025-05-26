declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export class PerformanceMonitor {
  static trackWebVitals(metric: any) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.value),
        metric_id: metric.id,
      });
    }
  }

  static trackError(error: Error, errorInfo?: any) {
    console.error('Application Error:', error, errorInfo);
    // Send to monitoring service
  }
}