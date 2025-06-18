import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Comprehensive Accessibility Testing', () => {
  const pages = [
    { url: '/', name: 'Homepage' },
    { url: '/vending-machines', name: 'Vending Machines' },
    { url: '/contact', name: 'Contact' },
    { url: '/feedback', name: 'Feedback' },
  ];

  pages.forEach(({ url, name }) => {
    test(`${name} should not have accessibility violations`, async ({ page }) => {
      await page.goto(url);
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test(`${name} keyboard navigation`, async ({ page }) => {
      await page.goto(url);
      
      // Test tab order
      let tabCount = 0;
      const maxTabs = 20; // Prevent infinite loops
      
      while (tabCount < maxTabs) {
        await page.keyboard.press('Tab');
        
        const focusedElement = page.locator(':focus');
        const isVisible = await focusedElement.isVisible().catch(() => false);
        
        if (isVisible) {
          // Check focus is visible
          const focusedElementTag = await focusedElement.evaluate(el => el.tagName);
          expect(['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(focusedElementTag)).toBeTruthy();
        }
        
        tabCount++;
      }
    });

    test(`${name} screen reader compatibility`, async ({ page }) => {
      await page.goto(url);
      
      // Check for proper heading structure
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThanOrEqual(1);
      expect(h1Count).toBeLessThanOrEqual(1); // Should have exactly one h1
      
      // Check for alt text on images
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        const ariaLabel = await img.getAttribute('aria-label');
        const role = await img.getAttribute('role');
        
        // Images should have alt text unless they're decorative
        if (role !== 'presentation' && !alt && !ariaLabel) {
          const src = await img.getAttribute('src');
          throw new Error(`Image without alt text found: ${src}`);
        }
      }
    });
  });

  test('Form accessibility - Contact Form', async ({ page }) => {
    await page.goto('/contact');
    
    // Check form labels
    const inputs = page.locator('input[required], textarea[required]');
    const inputCount = await inputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      const ariaLabel = await input.getAttribute('aria-label');
      
      // Should have label association
      const hasLabel = id && await page.locator(`label[for="${id}"]`).count() > 0;
      const hasAriaLabel = ariaLabelledBy || ariaLabel;
      
      expect(hasLabel || hasAriaLabel).toBeTruthy();
    }
    
    // Check error announcement
    await page.click('button[type="submit"]');
    
    const errorMessages = page.locator('[role="alert"]');
    const errorCount = await errorMessages.count();
    expect(errorCount).toBeGreaterThan(0);
  });
});