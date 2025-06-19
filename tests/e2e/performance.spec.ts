import { test, expect } from '@playwright/test';

test.describe('Performance Testing', () => {
  test('Core Web Vitals - Homepage', async ({ page }) => {
    await page.goto('/');
    
    // Measure LCP (Largest Contentful Paint)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry?.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Fallback timeout
        setTimeout(() => resolve(null), 5000);
      });
    });
    
    if (lcp) {
      expect(lcp).toBeLessThan(2500); // LCP should be under 2.5s
    }
  });

  test('Page load performance', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000); // Page should load within 3s
  });

  test('Image optimization', async ({ page }) => {
    await page.goto('/');
    
    // Check for next/image usage (lazy loading)
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const img = images.nth(i);
      const loading = await img.getAttribute('loading');
      const sizes = await img.getAttribute('sizes');
      
      // Images should have lazy loading or be above fold
      if (i > 0) { // First image can be eager loaded
        expect(loading).toBe('lazy');
      }
      
      // Should have responsive sizes
      if (sizes) {
        expect(sizes).toContain('vw'); // Should use viewport width
      }
    }
  });
});