/**
 * Lighthouse CI Configuration
 * AMP Vending Website Performance Monitoring
 * 
 * Build Process Documentation:
 * 1. Configures performance budgets for key metrics
 * 2. Sets up automated performance testing
 * 3. Defines thresholds for Core Web Vitals
 * 4. Monitors bundle size and resource loading
 * 5. Ensures accessibility and SEO compliance
 */

module.exports = {
  ci: {
    collect: {
      // URLs to test
      url: [
        'http://localhost:3000',
        'http://localhost:3000/vending-machines',
        'http://localhost:3000/contact',
        'http://localhost:3000/feedback'
      ],
      
      // Collection settings
      numberOfRuns: 3,
      settings: {
        chromeFlags: [
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--headless'
        ],
        
        // Performance-focused presets
        preset: 'perf',
        
        // Throttling for realistic conditions
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0
        },
        
        // Form factor testing
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 667,
          deviceScaleRatio: 2,
          disabled: false
        }
      }
    },
    
    assert: {
      assertions: {
        // Core Web Vitals Thresholds
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 3400 }],
        
        // Performance Score Thresholds
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        
        // Resource Optimization
        'unused-javascript': ['error', { maxNumericValue: 50000 }], // 50KB max unused JS
        'unused-css-rules': ['error', { maxNumericValue: 20000 }], // 20KB max unused CSS
        'unminified-javascript': ['error', { maxNumericValue: 0 }],
        'unminified-css': ['error', { maxNumericValue: 0 }],
        
        // Network Efficiency
        'uses-responsive-images': 'error',
        'uses-optimized-images': 'error',
        'uses-webp-images': 'warn',
        'uses-text-compression': 'error',
        'uses-rel-preconnect': 'warn',
        
        // JavaScript Optimization
        'legacy-javascript': 'warn',
        'modern-image-formats': 'warn',
        'offscreen-images': 'warn',
        'render-blocking-resources': ['error', { maxNumericValue: 500 }],
        
        // Accessibility Requirements
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        'meta-viewport': 'error',
        
        // SEO Requirements
        'document-title': 'error',
        'meta-description': 'error',
        'http-status-code': 'error',
        'crawlable-anchors': 'error',
        
        // Best Practices
        'is-on-https': 'error',
        'uses-http2': 'warn',
        'no-vulnerable-libraries': 'error'
      }
    },
    
    upload: {
      target: 'temporary-public-storage'
    },
    
    server: {
      port: 9009,
      storage: './lighthouse-reports'
    }
  },
  
  // Performance budgets for different page types
  budgets: [
    {
      // Homepage budget
      path: '/',
      resourceSizes: [
        { resourceType: 'script', budget: 200 }, // 200KB JavaScript
        { resourceType: 'stylesheet', budget: 50 }, // 50KB CSS
        { resourceType: 'image', budget: 300 }, // 300KB Images
        { resourceType: 'font', budget: 100 }, // 100KB Fonts
        { resourceType: 'total', budget: 800 } // 800KB Total
      ],
      resourceCounts: [
        { resourceType: 'script', budget: 10 },
        { resourceType: 'stylesheet', budget: 5 },
        { resourceType: 'image', budget: 20 },
        { resourceType: 'font', budget: 3 },
        { resourceType: 'third-party', budget: 10 }
      ],
      timings: [
        { metric: 'first-contentful-paint', budget: 1800 },
        { metric: 'largest-contentful-paint', budget: 2500 },
        { metric: 'interactive', budget: 3800 },
        { metric: 'max-potential-fid', budget: 130 }
      ]
    },
    
    {
      // Product pages budget
      path: '/vending-machines/*',
      resourceSizes: [
        { resourceType: 'script', budget: 250 },
        { resourceType: 'stylesheet', budget: 60 },
        { resourceType: 'image', budget: 500 }, // More images on product pages
        { resourceType: 'total', budget: 900 }
      ],
      timings: [
        { metric: 'first-contentful-paint', budget: 2000 },
        { metric: 'largest-contentful-paint', budget: 2800 }
      ]
    },
    
    {
      // Form pages budget
      path: '/contact',
      resourceSizes: [
        { resourceType: 'script', budget: 180 },
        { resourceType: 'stylesheet', budget: 40 },
        { resourceType: 'total', budget: 600 }
      ],
      timings: [
        { metric: 'first-contentful-paint', budget: 1600 },
        { metric: 'interactive', budget: 3200 }
      ]
    }
  ]
};