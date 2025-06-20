// components/landing/LazyComponents.tsx - Lazy Component Definitions

import React, { lazy } from "react";

// Critical components (load immediately)
export const ResponsiveHero = lazy(() => 
  import('../hero/ResponsiveHero').then(module => ({
    default: module.ResponsiveHero
  }))
);

// Viewport-based lazy components (load when scrolled into view)
export const WorkplaceTransformSection = lazy(() => 
  import('./WorkplaceTransformSection')
);

export const VendingMachineShowcase = lazy(() => 
  import('./VendingMachineShowcase')
);

export const ProductSection = lazy(() => 
  import('./ProductSection')
);

export const ProcessSection = lazy(() => 
  import('./ProcessSection')
);

export const ServiceAreaSection = lazy(() => 
  import('./ServiceAreaSection')
);

export const FAQSection = lazy(() => 
  import('./FAQSection')
);

export const HomeContactSection = lazy(() => 
  import('./HomeContactSection')
);

export const CTASection = lazy(() => 
  import('./CTASection')
);

// Interaction-based lazy components (load when user interacts)
export const ContactForm = lazy(() => 
  import('../forms/LazyContactForm')
);

export const FeedbackForm = lazy(() => 
  import('../feedback/FeedbackForm')
);

// Deferred components (load after delay)
export const Analytics = lazy(() => 
  import('@vercel/analytics/react').then(module => ({
    default: module.Analytics
  }))
);

export const SpeedInsights = lazy(() => 
  import('@vercel/speed-insights/next').then(module => ({
    default: module.SpeedInsights
  }))
);