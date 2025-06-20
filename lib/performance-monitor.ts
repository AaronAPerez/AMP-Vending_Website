// /**
//  * Performance Monitoring Script - Core Web Vitals Tracking
//  * AMP Vending Website Performance Optimization
//  * 
//  * Build Process Documentation:
//  * 1. Monitors Core Web Vitals in real-time
//  * 2. Tracks bundle size and loading performance
//  * 3. Provides actionable performance insights
//  * 4. Integrates with Lighthouse CI for automated testing
//  * 5. Alerts when performance thresholds are exceeded
//  */

// 'use client';

// import React from 'react';
// import { Metric } from 'web-vitals';

// // =============================================================================
// // PERFORMANCE THRESHOLDS
// // =============================================================================

// const PERFORMANCE_THRESHOLDS = {
//   // Core Web Vitals
//   LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
//   FID: { good: 100, needsImprovement: 300 },   // First Input Delay
//   CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  
//   // Additional Metrics
//   FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
//   TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
  
//   // Bundle Size Thresholds
//   BUNDLE_SIZE: {
//     initial: 150000,  // 150KB max initial bundle
//     vendor: 200000,   // 200KB max vendor bundle
//     total: 500000     // 500KB max total assets
//   }
// } as const;

// // =============================================================================
// // PERFORMANCE METRICS INTERFACE
// // =============================================================================

// interface PerformanceReport {
//   timestamp: number;
//   url: string;
//   metrics: {
//     LCP?: number;
//     FID?: number;
//     CLS?: number;
//     FCP?: number;
//     TTFB?: number;
//   };
//   bundleInfo: {
//     initialSize: number;
//     vendorSize: number;
//     totalSize: number;
//   };
//   userAgent: string;
//   connection?: {
//     effectiveType: string;
//     downlink: number;
//     rtt: number;
//   };
//   deviceInfo: {
//     viewport: { width: number; height: number };
//     devicePixelRatio: number;
//     hardwareConcurrency: number;
//     memory?: number;
//   };
// }

// // =============================================================================
// // PERFORMANCE MONITORING CLASS
// // =============================================================================

// class PerformanceMonitor {
//   private metrics: Partial<PerformanceReport['metrics']> = {};
//   private isMonitoring = false;
//   private reportCallback?: (report: PerformanceReport) => void;

//   constructor(reportCallback?: (report: PerformanceReport) => void) {
//     this.reportCallback = reportCallback;
//   }

//   /**
//    * Initialize performance monitoring
//    */
//   public startMonitoring(): void {
//     if (this.isMonitoring || typeof window === 'undefined') return;
    
//     this.isMonitoring = true;
//     console.log('🚀 Performance monitoring started');

//     // Monitor Core Web Vitals
//     getCLS(this.handleMetric.bind(this, 'CLS'));
//     getFID(this.handleMetric.bind(this, 'FID'));
//     getFCP(this.handleMetric.bind(this, 'FCP'));
//     getLCP(this.handleMetric.bind(this, 'LCP'));
//     getTTFB(this.handleMetric.bind(this, 'TTFB'));

//     // Monitor bundle size
//     this.monitorBundleSize();

//     // Generate report after all metrics are collected
//     setTimeout(() => {
//       this.generateReport();
//     }, 5000); // Wait 5 seconds for all metrics
//   }

//   /**
//    * Handle individual metric collection
//    */
//   private handleMetric(name: keyof PerformanceReport['metrics'], metric: Metric): void {
//     this.metrics[name] = metric.value;
    
//     const threshold = PERFORMANCE_THRESHOLDS[name as keyof typeof PERFORMANCE_THRESHOLDS];
//     if (threshold && typeof threshold === 'object') {
//       const status = this.getMetricStatus(metric.value, threshold);
//       this.logMetric(name, metric.value, status);
//     }
//   }

//   /**
//    * Determine metric status based on thresholds
//    */
//   private getMetricStatus(value: number, threshold: { good: number; needsImprovement: number }): 'good' | 'needs-improvement' | 'poor' {
//     if (value <= threshold.good) return 'good';
//     if (value <= threshold.needsImprovement) return 'needs-improvement';
//     return 'poor';
//   }

//   /**
//    * Log metric with color coding
//    */
//   private logMetric(name: string, value: number, status: string): void {
//     const emoji = status === 'good' ? '✅' : status === 'needs-improvement' ? '⚠️' : '❌';
//     const unit = name === 'CLS' ? '' : 'ms';
    
//     console.log(`${emoji} ${name}: ${value.toFixed(2)}${unit} (${status})`);
//   }

//   /**
//    * Monitor bundle size from performance entries
//    */
//   private monitorBundleSize(): void {
//     if (typeof window === 'undefined') return;

//     // Get all script resources
//     const scriptEntries = performance.getEntriesByType('resource')
//       .filter(entry => entry.name.includes('.js'))
//       .map(entry => ({
//         name: entry.name,
//         size: (entry as any).transferSize || 0
//       }));

//     const totalSize = scriptEntries.reduce((sum, entry) => sum + entry.size, 0);
//     const vendorSize = scriptEntries
//       .filter(entry => entry.name.includes('vendor') || entry.name.includes('chunk'))
//       .reduce((sum, entry) => sum + entry.size, 0);

//     console.log('📦 Bundle Analysis:');
//     console.log(`   Total JS: ${(totalSize / 1024).toFixed(2)}KB`);
//     console.log(`   Vendor: ${(vendorSize / 1024).toFixed(2)}KB`);
    
//     // Log individual chunks
//     scriptEntries.forEach(entry => {
//       if (entry.size > 10000) { // Only log chunks > 10KB
//         console.log(`   ${entry.name.split('/').pop()}: ${(entry.size / 1024).toFixed(2)}KB`);
//       }
//     });
//   }

//   /**
//    * Generate comprehensive performance report
//    */
//   private generateReport(): void {
//     const report: PerformanceReport = {
//       timestamp: Date.now(),
//       url: window.location.href,
//       metrics: this.metrics,
//       bundleInfo: this.getBundleInfo(),
//       userAgent: navigator.userAgent,
//       connection: this.getConnectionInfo(),
//       deviceInfo: this.getDeviceInfo()
//     };

//     this.displayReport(report);
//     this.reportCallback?.(report);
//   }

//   /**
//    * Get bundle size information
//    */
//   private getBundleInfo(): PerformanceReport['bundleInfo'] {
//     const scriptEntries = performance.getEntriesByType('resource')
//       .filter(entry => entry.name.includes('.js'));

//     const totalSize = scriptEntries.reduce((sum, entry) => sum + ((entry as any).transferSize || 0), 0);
//     const vendorSize = scriptEntries
//       .filter(entry => entry.name.includes('vendor'))
//       .reduce((sum, entry) => sum + ((entry as any).transferSize || 0), 0);

//     return {
//       initialSize: totalSize - vendorSize,
//       vendorSize,
//       totalSize
//     };
//   }

//   /**
//    * Get network connection information
//    */
//   private getConnectionInfo() {
//     const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
//     if (connection) {
//       return {
//         effectiveType: connection.effectiveType,
//         downlink: connection.downlink,
//         rtt: connection.rtt
//       };
//     }
//     return undefined;
//   }

//   /**
//    * Get device information
//    */
//   private getDeviceInfo(): PerformanceReport['deviceInfo'] {
//     return {
//       viewport: {
//         width: window.innerWidth,
//         height: window.innerHeight
//       },
//       devicePixelRatio: window.devicePixelRatio,
//       hardwareConcurrency: navigator.hardwareConcurrency,
//       memory: (navigator as any).deviceMemory
//     };
//   }

//   /**
//    * Display formatted performance report
//    */
//   private displayReport(report: PerformanceReport): void {
//     console.group('📊 Performance Report');
    
//     // Core Web Vitals Summary
//     console.group('🎯 Core Web Vitals');
//     Object.entries(report.metrics).forEach(([name, value]) => {
//       if (value !== undefined) {
//         const threshold = PERFORMANCE_THRESHOLDS[name as keyof typeof PERFORMANCE_THRESHOLDS];
//         if (threshold && typeof threshold === 'object') {
//           const status = this.getMetricStatus(value, threshold);
//           const emoji = status === 'good' ? '✅' : status === 'needs-improvement' ? '⚠️' : '❌';
//           const unit = name === 'CLS' ? '' : 'ms';
//           console.log(`${emoji} ${name}: ${value.toFixed(2)}${unit}`);
//         }
//       }
//     });
//     console.groupEnd();

//     // Bundle Analysis
//     console.group('📦 Bundle Analysis');
//     console.log(`Initial Bundle: ${(report.bundleInfo.initialSize / 1024).toFixed(2)}KB`);
//     console.log(`Vendor Bundle: ${(report.bundleInfo.vendorSize / 1024).toFixed(2)}KB`);
//     console.log(`Total Size: ${(report.bundleInfo.totalSize / 1024).toFixed(2)}KB`);
    
//     // Bundle warnings
//     if (report.bundleInfo.initialSize > PERFORMANCE_THRESHOLDS.BUNDLE_SIZE.initial) {
//       console.warn('⚠️ Initial bundle exceeds recommended size');
//     }
//     if (report.bundleInfo.vendorSize > PERFORMANCE_THRESHOLDS.BUNDLE_SIZE.vendor) {
//       console.warn('⚠️ Vendor bundle exceeds recommended size');
//     }
//     console.groupEnd();

//     // Device & Network Info
//     console.group('🔧 Environment');
//     console.log(`Viewport: ${report.deviceInfo.viewport.width}x${report.deviceInfo.viewport.height}`);
//     console.log(`Device Pixel Ratio: ${report.deviceInfo.devicePixelRatio}`);
//     console.log(`CPU Cores: ${report.deviceInfo.hardwareConcurrency}`);
//     if (report.deviceInfo.memory) {
//       console.log(`Device Memory: ${report.deviceInfo.memory}GB`);
//     }
//     if (report.connection) {
//       console.log(`Network: ${report.connection.effectiveType} (${report.connection.downlink}Mbps, ${report.connection.rtt}ms RTT)`);
//     }
//     console.groupEnd();

//     console.groupEnd();
//   }

//   /**
//    * Get performance score based on Core Web Vitals
//    */
//   public getPerformanceScore(): number {
//     const { LCP, FID, CLS } = this.metrics;
//     let score = 100;

//     if (LCP) {
//       if (LCP > PERFORMANCE_THRESHOLDS.LCP.needsImprovement) score -= 30;
//       else if (LCP > PERFORMANCE_THRESHOLDS.LCP.good) score -= 15;
//     }

//     if (FID) {
//       if (FID > PERFORMANCE_THRESHOLDS.FID.needsImprovement) score -= 25;
//       else if (FID > PERFORMANCE_THRESHOLDS.FID.good) score -= 10;
//     }

//     if (CLS) {
//       if (CLS > PERFORMANCE_THRESHOLDS.CLS.needsImprovement) score -= 25;
//       else if (CLS > PERFORMANCE_THRESHOLDS.CLS.good) score -= 10;
//     }

//     return Math.max(0, score);
//   }
// }

// // =============================================================================
// // PERFORMANCE OPTIMIZATION SUGGESTIONS
// // =============================================================================

// class PerformanceOptimizer {
//   private monitor: PerformanceMonitor;

//   constructor(monitor: PerformanceMonitor) {
//     this.monitor = monitor;
//   }

//   /**
//    * Analyze performance and provide optimization suggestions
//    */
//   public analyzePage(): string[] {
//     const suggestions: string[] = [];
//     const report = this.getCurrentMetrics();

//     // LCP Optimizations
//     if (report.LCP && report.LCP > PERFORMANCE_THRESHOLDS.LCP.good) {
//       suggestions.push('🎯 Optimize Largest Contentful Paint:');
//       suggestions.push('   • Preload critical images and fonts');
//       suggestions.push('   • Minimize server response times');
//       suggestions.push('   • Eliminate render-blocking resources');
//       suggestions.push('   • Use efficient image formats (WebP, AVIF)');
//     }

//     // FID Optimizations
//     if (report.FID && report.FID > PERFORMANCE_THRESHOLDS.FID.good) {
//       suggestions.push('⚡ Improve First Input Delay:');
//       suggestions.push('   • Reduce JavaScript execution time');
//       suggestions.push('   • Code split non-critical JavaScript');
//       suggestions.push('   • Use web workers for heavy computations');
//       suggestions.push('   • Minimize third-party script impact');
//     }

//     // CLS Optimizations
//     if (report.CLS && report.CLS > PERFORMANCE_THRESHOLDS.CLS.good) {
//       suggestions.push('📐 Fix Cumulative Layout Shift:');
//       suggestions.push('   • Add size attributes to images and videos');
//       suggestions.push('   • Reserve space for dynamic content');
//       suggestions.push('   • Avoid inserting content above existing content');
//       suggestions.push('   • Use transform animations instead of changing layout properties');
//     }

//     // Bundle Size Optimizations
//     const bundleInfo = this.getBundleAnalysis();
//     if (bundleInfo.totalSize > PERFORMANCE_THRESHOLDS.BUNDLE_SIZE.total) {
//       suggestions.push('📦 Reduce Bundle Size:');
//       suggestions.push('   • Implement dynamic imports for non-critical code');
//       suggestions.push('   • Remove unused dependencies');
//       suggestions.push('   • Use tree shaking to eliminate dead code');
//       suggestions.push('   • Consider lighter alternatives to heavy libraries');
//     }

//     return suggestions;
//   }

//   private getCurrentMetrics() {
//     return (this.monitor as any).metrics;
//   }

//   private getBundleAnalysis() {
//     const scriptEntries = performance.getEntriesByType('resource')
//       .filter(entry => entry.name.includes('.js'));

//     return {
//       totalSize: scriptEntries.reduce((sum, entry) => sum + ((entry as any).transferSize || 0), 0),
//       count: scriptEntries.length
//     };
//   }
// }

// // =============================================================================
// // EXPORTS
// // =============================================================================

// export { PerformanceMonitor, PerformanceOptimizer };

// /**
//  * Usage Examples:
//  * 
//  * 1. Basic monitoring:
//  * ```tsx
//  * import { usePerformanceMonitoring } from '@/lib/performance-monitor';
//  * 
//  * function App() {
//  *   const { performanceScore } = usePerformanceMonitoring();
//  *   return <div>Performance Score: {performanceScore}</div>;
//  * }
//  * ```
//  * 
//  * 2. Development widget:
//  * ```tsx
//  * import { PerformanceWidget } from '@/lib/performance-monitor';
//  * 
//  * function Layout() {
//  *   return (
//  *     <>
//  *       <YourContent />
//  *       <PerformanceWidget position="bottom-right" />
//  *     </>
//  *   );
//  * }
//  * ```
//  * 
//  * 3. Manual monitoring:
//  * ```tsx
//  * import { PerformanceMonitor } from '@/lib/performance-monitor';
//  * 
//  * const monitor = new PerformanceMonitor((report) => {
//  *   console.log('Performance report:', report);
//  * });
//  * monitor.startMonitoring();
//  * ```
//  */