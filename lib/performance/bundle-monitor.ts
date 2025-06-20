// lib/performance/bundle-monitor.ts - Bundle Size Monitoring

/**
 * Bundle size monitoring utilities
 * Tracks and reports on bundle performance
 */

interface BundleInfo {
  name: string;
  size: number;
  type: 'critical' | 'lazy' | 'deferred';
  loadTime?: number;
}

class BundleMonitor {
  private bundles: BundleInfo[] = [];
  private thresholds = {
    critical: 50000,  // 50KB max for critical bundle
    lazy: 100000,     // 100KB max for lazy chunks
    deferred: 50000   // 50KB max for deferred chunks
  };

  /**
   * Track bundle loading
   */
  trackBundle(bundle: BundleInfo): void {
    this.bundles.push({
      ...bundle,
      loadTime: performance.now()
    });

    // Check thresholds
    this.checkThresholds(bundle);
  }

  /**
   * Check if bundle exceeds size thresholds
   */
  private checkThresholds(bundle: BundleInfo): void {
    const threshold = this.thresholds[bundle.type];
    
    if (bundle.size > threshold) {
      console.warn(
        `📦 Bundle Warning: ${bundle.name} (${(bundle.size / 1024).toFixed(2)}KB) ` +
        `exceeds ${bundle.type} threshold (${(threshold / 1024).toFixed(2)}KB)`
      );
      
      // Provide optimization suggestions
      this.suggestOptimizations(bundle);
    }
  }

  /**
   * Suggest optimizations for oversized bundles
   */
  private suggestOptimizations(bundle: BundleInfo): void {
    const suggestions = [
      '• Consider code splitting this component further',
      '• Check for unused dependencies',
      '• Implement tree shaking',
      '• Use dynamic imports for heavy libraries'
    ];

    console.group(`🎯 Optimization suggestions for ${bundle.name}:`);
    suggestions.forEach(suggestion => console.log(suggestion));
    console.groupEnd();
  }

  /**
   * Generate bundle report
   */
  generateReport(): void {
    console.group('📊 Bundle Performance Report');
    
    const totalSize = this.bundles.reduce((sum, bundle) => sum + bundle.size, 0);
    console.log(`Total Bundle Size: ${(totalSize / 1024).toFixed(2)}KB`);
    
    // Group by type
    const byType = this.bundles.reduce((acc, bundle) => {
      if (!acc[bundle.type]) acc[bundle.type] = [];
      acc[bundle.type].push(bundle);
      return acc;
    }, {} as Record<string, BundleInfo[]>);

    Object.entries(byType).forEach(([type, bundles]) => {
      console.group(`${type.toUpperCase()} Bundles:`);
      bundles.forEach(bundle => {
        console.log(`${bundle.name}: ${(bundle.size / 1024).toFixed(2)}KB`);
      });
      console.groupEnd();
    });

    console.groupEnd();
  }
}

export const bundleMonitor = new BundleMonitor();