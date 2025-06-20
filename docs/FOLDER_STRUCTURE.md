AMP-Vending-Website/
├── 📁 app/                              # Next.js 13+ App Router
│   ├── 📄 globals.css                   # Global styles
│   ├── 📄 layout.tsx                    # Root layout with optimized metadata
│   ├── 📄 page.tsx                      # Homepage with lazy loading
│   ├── 📄 loading.tsx                   # Global loading UI
│   ├── 📄 error.tsx                     # Global error boundary
│   ├── 📄 not-found.tsx                 # 404 page
│   ├── 📄 viewport.ts                   # Viewport configuration
│   │
│   ├── 📁 vending-machines/             # Product pages
│   │   ├── 📄 page.tsx                  # Machine listing page
│   │   ├── 📄 loading.tsx               # Machine loading UI
│   │   └── 📁 [id]/                     # Dynamic machine pages
│   │       ├── 📄 page.tsx              # Individual machine page
│   │       └── 📄 loading.tsx           # Machine detail loading
│   │
│   ├── 📁 contact/                      # Contact page
│   │   ├── 📄 page.tsx                  # Contact page with lazy form
│   │   └── 📄 loading.tsx               # Contact loading UI
│   │
│   ├── 📁 feedback/                     # Feedback page
│   │   ├── 📄 page.tsx                  # Feedback page with lazy form
│   │   └── 📄 loading.tsx               # Feedback loading UI
│   │
│   └── 📁 api/                          # API routes
│       ├── 📁 contact/
│       │   └── 📄 route.ts              # Contact form API
│       └── 📁 feedback/
│           └── 📄 route.ts              # Feedback form API
│
├── 📁 components/                       # All React components
│   │
│   ├── 📁 landing/                      # Homepage sections (lazy loaded)
│   │   ├── 📄 HomePage.tsx              # Main homepage component
│   │   ├── 📄 WorkplaceTransformSection.tsx    # Lazy: Workplace benefits
│   │   ├── 📄 VendingMachineShowcase.tsx       # Lazy: Machine showcase
│   │   ├── 📄 ProductSection.tsx               # Lazy: Product selection
│   │   ├── 📄 ProcessSection.tsx               # Lazy: Implementation process
│   │   ├── 📄 ServiceAreaSection.tsx           # Lazy: Service coverage
│   │   ├── 📄 FAQSection.tsx                   # Lazy: FAQ accordion
│   │   ├── 📄 HomeContactSection.tsx           # Lazy: Contact CTA
│   │   ├── 📄 CTASection.tsx                   # Lazy: Final CTA
│   │   └── 📄 index.ts                         # Barrel exports
│   │
│   ├── 📁 hero/                         # Hero section components
│   │   ├── 📄 ResponsiveHero.tsx        # Critical: Main hero component
│   │   ├── 📄 BackgroundImages.tsx      # Lazy: Background imagery
│   │   ├── 📄 HeroContent.tsx           # Critical: Hero text content
│   │   └── 📄 index.ts                  # Barrel exports
│   │
│   ├── 📁 forms/                        # Form components (interaction-based lazy)
│   │   ├── 📄 ContactForm.tsx           # Lazy: Heavy contact form
│   │   ├── 📄 FeedbackForm.tsx          # Lazy: Heavy feedback form
│   │   ├── 📄 FormLoadingFallback.tsx   # Loading state for forms
│   │   ├── 📄 ContactFormLazy.tsx       # Lazy wrapper for contact
│   │   ├── 📄 FeedbackFormLazy.tsx      # Lazy wrapper for feedback
│   │   └── 📄 index.ts                  # Barrel exports
│   │
│   ├── 📁 machines/                     # Machine-related components
│   │   ├── 📄 MachineCard.tsx           # Individual machine card
│   │   ├── 📄 MachineGrid.tsx           # Lazy: Machine grid layout
│   │   ├── 📄 MachineDetail.tsx         # Lazy: Detailed machine view
│   │   ├── 📄 MachineComparison.tsx     # Lazy: Machine comparison
│   │   ├── 📄 MachineLoadingFallback.tsx # Loading states
│   │   └── 📄 index.ts                  # Barrel exports
│   │
│   ├── 📁 layout/                       # Layout components
│   │   ├── 📄 ResizableNavbar.tsx       # Critical: Main navigation
│   │   ├── 📄 Footer.tsx                # Lazy: Footer content
│   │   ├── 📄 MobileMenu.tsx            # Lazy: Mobile navigation
│   │   └── 📄 index.ts                  # Barrel exports
│   │
│   ├── 📁 ui/                           # Reusable UI components
│   │   ├── 📁 shared/                   # Shared components
│   │   │   ├── 📄 Section.tsx           # Critical: Section wrapper
│   │   │   ├── 📄 ClientOnly.tsx        # Critical: Client-side wrapper
│   │   │   ├── 📄 LoadingSpinner.tsx    # Critical: Loading indicator
│   │   │   └── 📄 ErrorBoundary.tsx     # Critical: Error handling
│   │   │
│   │   ├── 📁 core/                     # Core UI primitives
│   │   │   ├── 📄 Button.tsx            # Critical: Button component
│   │   │   ├── 📄 Card.tsx              # Critical: Card component
│   │   │   ├── 📄 Modal.tsx             # Lazy: Modal component
│   │   │   └── 📄 Accordion.tsx         # Lazy: Accordion component
│   │   │
│   │   ├── 📁 feedback/                 # Feedback UI
│   │   │   ├── 📄 FeedbackWidget.tsx    # Lazy: Feedback widget
│   │   │   └── 📄 FeedbackButton.tsx    # Critical: Feedback trigger
│   │   │
│   │   └── 📁 loading/                  # Loading components
│   │       ├── 📄 SkeletonCard.tsx      # Critical: Skeleton loader
│   │       ├── 📄 SkeletonSection.tsx   # Critical: Section skeleton
│   │       └── 📄 SkeletonForm.tsx      # Critical: Form skeleton
│   │
│   ├── 📁 seo/                          # SEO components
│   │   ├── 📄 MetaTags.tsx              # Critical: Meta tag management
│   │   ├── 📄 BreadcrumbSchema.tsx      # Critical: Breadcrumb structured data
│   │   ├── 📄 StructuredData.tsx        # Critical: JSON-LD schemas
│   │   └── 📄 index.ts                  # Barrel exports
│   │
│   └── 📁 analytics/                    # Analytics components (deferred)
│       ├── 📄 AnalyticsProvider.tsx     # Lazy: Analytics context
│       ├── 📄 PerformanceMonitor.tsx    # Lazy: Performance tracking
│       └── 📄 index.ts                  # Barrel exports
│
├── 📁 lib/                              # Utility libraries and configurations
│   │
│   ├── 📁 performance/                  # Performance optimization
│   │   ├── 📄 lazy-loading.ts           # 🎯 Main lazy loading utilities
│   │   ├── 📄 performance-monitor.ts    # Performance monitoring tools
│   │   ├── 📄 bundle-analyzer.ts        # Bundle analysis utilities
│   │   ├── 📄 web-vitals.ts             # Core Web Vitals tracking
│   │   └── 📄 index.ts                  # Performance exports
│   │
│   ├── 📁 data/                         # Data management
│   │   ├── 📄 vendingMachineData.ts     # Machine data with SEO
│   │   ├── 📄 businessData.ts           # Business profile data
│   │   ├── 📄 seoData.ts                # SEO constants and utilities
│   │   └── 📄 index.ts                  # Data exports
│   │
│   ├── 📁 validation/                   # Form validation schemas
│   │   ├── 📄 contactFormSchema.ts      # Contact form validation
│   │   ├── 📄 feedbackFormSchema.ts     # Feedback form validation
│   │   └── 📄 index.ts                  # Validation exports
│   │
│   ├── 📁 services/                     # External services
│   │   ├── 📄 emailService.ts           # Email service abstraction
│   │   ├── 📄 analyticsService.ts       # Analytics service
│   │   └── 📄 index.ts                  # Service exports
│   │
│   ├── 📄 utils.ts                      # General utilities (cn, etc.)
│   ├── 📄 registry.tsx                  # Styled components registry
│   └── 📄 constants.ts                  # App constants
│
├── 📁 hooks/                            # Custom React hooks
│   ├── 📄 useVendingMachines.ts         # Machine data management
│   ├── 📄 useBusinessProfile.ts         # Business profile hook
│   ├── 📄 usePerformanceMonitoring.ts   # Performance monitoring hook
│   ├── 📄 useViewportLazyLoad.ts        # Viewport-based lazy loading
│   ├── 📄 useMouseEnter.ts              # Mouse interaction hook
│   └── 📄 index.ts                      # Hook exports
│
├── 📁 styles/                           # Styling and themes
│   ├── 📄 globals.css                   # Critical CSS (inlined)
│   ├── 📄 components.css               # Lazy: Component-specific CSS
│   └── 📄 animations.css               # Lazy: Animation styles
│
├── 📁 public/                           # Static assets
│   ├── 📁 images/                       # Optimized images
│   │   ├── 📁 machines/                 # Machine images
│   │   ├── 📁 products/                 # Product images
│   │   ├── 📁 logo/                     # Brand assets
│   │   └── 📁 og/                       # Open Graph images
│   │
│   ├── 📁 icons/                        # SVG icons
│   ├── 📄 favicon.ico                   # Favicon
│   ├── 📄 robots.txt                    # SEO robots file
│   └── 📄 sitemap.xml                   # SEO sitemap
│
├── 📁 config/                           # Configuration files
│   ├── 📄 lighthouse.config.js          # 🎯 Lighthouse CI configuration
│   ├── 📄 bundle-analyzer.config.js     # Bundle analysis config
│   └── 📄 performance.config.js         # Performance monitoring config
│
├── 📁 scripts/                          # Build and utility scripts
│   ├── 📄 analyze-bundle.js             # Bundle analysis script
│   ├── 📄 lighthouse-test.ts            # Lighthouse automation
│   ├── 📄 performance-audit.js          # Performance audit script
│   └── 📄 generate-sitemap.js           # SEO sitemap generation
│
├── 📁 tests/                            # Testing files
│   ├── 📁 __mocks__/                    # Test mocks
│   ├── 📁 e2e/                          # End-to-end tests
│   ├── 📁 performance/                  # Performance tests
│   │   ├── 📄 lighthouse.spec.ts        # Lighthouse testing
│   │   ├── 📄 bundle-size.spec.ts       # Bundle size testing
│   │   └── 📄 web-vitals.spec.ts        # Core Web Vitals testing
│   │
│   ├── 📁 unit/                         # Unit tests
│   │   ├── 📄 lazy-loading.test.ts      # Lazy loading tests
│   │   └── 📄 performance.test.ts       # Performance utility tests
│   │
│   └── 📄 setup.tsx                     # Test setup
│
├── 📁 docs/                             # Documentation
│   ├── 📄 PERFORMANCE.md                # Performance optimization guide
│   ├── 📄 CODE_SPLITTING.md             # Code splitting documentation
│   ├── 📄 LAZY_LOADING.md               # Lazy loading guide
│   └── 📄 BUNDLE_ANALYSIS.md            # Bundle analysis guide
│
├── 📄 next.config.js                    # 🎯 Next.js performance config
├── 📄 tailwind.config.js                # Tailwind CSS configuration
├── 📄 tsconfig.json                     # TypeScript configuration
├── 📄 package.json                      # 🎯 Dependencies and scripts
├── 📄 .eslintrc.json                    # ESLint configuration
├── 📄 .gitignore                        # Git ignore rules
├── 📄 README.md                         # Project documentation
└── 📄 lighthouse.config.js              # 🎯 Lighthouse configuration
