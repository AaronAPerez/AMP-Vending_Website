# Performance optimization guide

📊 PERFORMANCE IMPACT BY FOLDER:

🔴 CRITICAL PATH (Load Immediately - ~41KB):
├── app/layout.tsx                       # Root layout
├── app/page.tsx                         # Homepage entry
├── components/hero/ResponsiveHero.tsx   # Above-the-fold content
├── components/ui/shared/Section.tsx     # Layout wrapper
├── components/ui/shared/ClientOnly.tsx  # SSR safety
├── components/seo/MetaTags.tsx          # SEO metadata
└── lib/performance/lazy-loading.ts     # Lazy loading utilities

🟡 VIEWPORT LAZY (Load on Scroll - ~150KB total):
├── components/landing/WorkplaceTransformSection.tsx
├── components/landing/VendingMachineShowcase.tsx
├── components/landing/ProductSection.tsx
├── components/landing/ProcessSection.tsx
├── components/landing/ServiceAreaSection.tsx
├── components/landing/FAQSection.tsx
└── components/landing/HomeContactSection.tsx

🟢 INTERACTION LAZY (Load on Click - ~70KB total):
├── components/forms/ContactForm.tsx
├── components/forms/FeedbackForm.tsx
├── components/machines/MachineDetail.tsx
└── components/ui/core/Modal.tsx

🔵 DEFERRED (Load After 2s - ~30KB total):
├── components/analytics/AnalyticsProvider.tsx
├── components/analytics/PerformanceMonitor.tsx
└── lib/services/analyticsService.ts


📈 EXPECTED BUNDLE BREAKDOWN:

Before Optimization:
└── vendors-chunk.js: 270KB (everything together)

After Optimization:
├── main-bundle.js: 41KB (critical path)
├── chunk-landing.js: 60KB (viewport sections)
├── chunk-forms.js: 40KB (interaction forms)
├── chunk-machines.js: 35KB (machine components)
├── chunk-analytics.js: 25KB (deferred analytics)
└── chunk-vendor.js: 65KB (shared dependencies)


🎯 KEY IMPLEMENTATION FILES:

1. lib/performance/lazy-loading.ts      # Main lazy loading strategy
2. next.config.js                       # Bundle splitting configuration
3. app/page.tsx                         # Optimized homepage implementation
4. components/landing/HomePage.tsx      # Lazy loading integration
5. lighthouse.config.js                 # Performance monitoring

This structure reduces initial bundle from 270KB to 41KB (85% reduction)
while maintaining excellent user experience through progressive loading.