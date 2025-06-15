declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: Record<string, any>[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Initialize Google Analytics
 * Call this in your root layout or _app.tsx
 */
export const initGA = () => {
  if (!GA_TRACKING_ID) {
    console.warn('Google Analytics ID not found');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // Initialize gtag function
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  
  // Set initial configuration
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

/**
 * Track custom events for SEO insights
 */
export const trackEvent = (
  action: string, 
  category: string, 
  label?: string, 
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      custom_parameter_1: 'AMP_Vending_Event'
    });
  }
};

/**
 * Track page views manually (useful for SPA navigation)
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
      page_title: title || document.title,
    });
  }
};

/**
 * Track Core Web Vitals for SEO performance monitoring
 */
export const trackWebVitals = (metric: {
  name: string;
  value: number;
  id: string;
  label?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      custom_parameter_vitals: metric.label || 'web-vital'
    });
  }
};

/**
 * Track search queries for SEO optimization
 */
export const trackSearch = (searchTerm: string, resultCount: number) => {
  trackEvent('search', 'Site Search', searchTerm, resultCount);
};

/**
 * Track machine detail views for SEO insights
 */
export const trackMachineView = (machineId: string, machineName: string) => {
  trackEvent('view_item', 'Machine Details', `${machineId}-${machineName}`);
  
  // Enhanced ecommerce tracking for product views
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'USD',
      value: 0, // Since it's a service, not a direct sale
      items: [{
        item_id: machineId,
        item_name: machineName,
        item_category: 'Vending Machine',
        item_brand: 'AMP Vending',
        quantity: 1
      }]
    });
  }
};

/**
 * Track contact form submissions
 */
export const trackContactSubmission = (formType: 'contact' | 'feedback') => {
  trackEvent('form_submit', 'Contact', formType);
  
  // Track as conversion
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GA_TRACKING_ID,
      event_category: 'Lead Generation',
      event_label: formType
    });
  }
};

/**
 * Track phone number clicks for local SEO
 */
export const trackPhoneClick = () => {
  trackEvent('click', 'Contact', 'phone_number');
};

/**
 * Track email clicks for local SEO
 */
export const trackEmailClick = () => {
  trackEvent('click', 'Contact', 'email');
};

/**
 * Track scroll depth for engagement metrics
 */
export const trackScrollDepth = (percentage: number) => {
  if (percentage > 0 && percentage % 25 === 0) { // Track at 25%, 50%, 75%, 100%
    trackEvent('scroll', 'Engagement', `${percentage}%`, percentage);
  }
};

/**
 * Track file downloads (if you have any PDFs, brochures, etc.)
 */
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('download', 'File Download', `${fileName}.${fileType}`);
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent('click', 'External Link', linkText);
};

/**
 * Track video interactions (if you add videos)
 */
export const trackVideo = (action: 'play' | 'pause' | 'complete', videoTitle: string) => {
  trackEvent(action, 'Video', videoTitle);
};

/**
 * Set user properties for better audience insights
 */
export const setUserProperties = (properties: Record<string, string>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
};

/**
 * Track location-based interactions for local SEO
 */
export const trackLocationInteraction = (action: string, location: string) => {
  trackEvent(action, 'Location', location);
};

// Example usage for your vending machine business:

/**
 * Track specific business events
 */
export const trackBusinessEvents = {
  // Track when someone views the service area
  serviceAreaView: () => trackEvent('view', 'Service Area', 'Central California'),
  
  // Track machine comparison actions
  machineComparison: (machines: string[]) => 
    trackEvent('compare', 'Machines', machines.join(' vs ')),
  
  // Track quote requests
  quoteRequest: (machineType: string) => 
    trackEvent('quote_request', 'Sales', machineType),
  
  // Track brochure/info requests
  infoRequest: (infoType: string) => 
    trackEvent('info_request', 'Marketing', infoType),
  
  // Track successful installations (server-side)
  installation: (machineId: string, location: string) => 
    trackEvent('installation_complete', 'Business', `${machineId}-${location}`)
};

// Export analytics helper functions
export const analytics = {
  init: initGA,
  trackEvent,
  trackPageView,
  trackWebVitals,
  trackSearch,
  trackMachineView,
  trackContactSubmission,
  trackPhoneClick,
  trackEmailClick,
  trackScrollDepth,
  trackDownload,
  trackExternalLink,
  trackVideo,
  setUserProperties,
  trackLocationInteraction,
  business: trackBusinessEvents
};