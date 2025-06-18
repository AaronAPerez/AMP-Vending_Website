import { test, expect } from '@playwright/test';

test.describe('Visual Regression Testing', () => {
  const viewports = [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1920, height: 1080, name: 'desktop' },
  ];

  viewports.forEach(({ width, height, name }) => {
    test(`Homepage visual test - ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Hide dynamic elements
      await page.addStyleTag({
        content: `
          .animate-spin { animation: none !important; }
          .animate-pulse { animation: none !important; }
        `
      });
      
      await expect(page).toHaveScreenshot(`homepage-${name}.png`);
    });

    test(`Contact form visual test - ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/contact');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('form')).toHaveScreenshot(`contact-form-${name}.png`);
    });
  });

  test('Form error states', async ({ page }) => {
    await page.goto('/contact');
    
    // Trigger validation errors
    await page.click('button[type="submit"]');
    await page.waitForSelector('[role="alert"]');
    
    await expect(page.locator('form')).toHaveScreenshot('contact-form-errors.png');
  });
});