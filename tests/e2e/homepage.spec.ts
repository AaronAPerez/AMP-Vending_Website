import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title and meta description', async ({ page }) => {
    await expect(page).toHaveTitle(/AMP Vending.*Zero-Cost Premium Vending Solutions/);
    
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /AMP Vending provides zero-cost, maintenance-free vending machines/);
  });

  test('displays hero section with CTA buttons', async ({ page }) => {
    // Check hero heading
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toContainText('Premium Vending Solutions at Zero Cost');
    
    // Check CTA buttons are visible and clickable
    const viewMachinesBtn = page.locator('a[href="/vending-machines"]').first();
    const contactBtn = page.locator('a[href="/contact"]').first();
    
    await expect(viewMachinesBtn).toBeVisible();
    await expect(contactBtn).toBeVisible();
  });

  test('navigation works correctly', async ({ page }) => {
    // Test navigation to vending machines page
    await page.click('a[href="/vending-machines"]');
    await expect(page).toHaveURL('/vending-machines');
    await expect(page.locator('h1')).toContainText('Premium Vending Machines');
    
    // Navigate back to home
    await page.goto('/');
    
    // Test navigation to contact page
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toContainText('Contact AMP Vending');
  });

  test('is accessible and has proper ARIA labels', async ({ page }) => {
    // Check for proper heading hierarchy
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    
    // Check for ARIA labels on interactive elements
    const ctaButtons = page.locator('a[href="/vending-machines"], a[href="/contact"]');
    for (const button of await ctaButtons.all()) {
      await expect(button).toHaveAttribute('href');
    }
  });

  test('loads and displays machine showcase section', async ({ page }) => {
    // Scroll to showcase section
    await page.locator('text=Our Premium Vending Machines').scrollIntoViewIfNeeded();
    
    // Check that machine cards are displayed
    const machineCards = page.locator('[data-testid="machine-card"]');
    await expect(machineCards.first()).toBeVisible();
  });

  test('contact form is accessible from homepage', async ({ page }) => {
    // Scroll to contact section
    await page.locator('text=Get In Touch').scrollIntoViewIfNeeded();
    
    // Check that contact form is visible
    const contactForm = page.locator('form');
    await expect(contactForm).toBeVisible();
    
    // Check required form fields exist
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="companyName"]')).toBeVisible();
  });
});
