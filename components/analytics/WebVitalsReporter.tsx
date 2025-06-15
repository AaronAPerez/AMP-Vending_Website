'use client';

import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/analytics/webVitals';

export default function WebVitalsReporter() {
  useEffect(() => {
    // Dynamically import web-vitals library
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(reportWebVitals);
      getFID(reportWebVitals);
      getFCP(reportWebVitals);
      getLCP(reportWebVitals);
      getTTFB(reportWebVitals);
    }).catch(error => {
      console.warn('Failed to load web-vitals:', error);
    });
  }, []);

  return null; // This component doesn't render anything
}