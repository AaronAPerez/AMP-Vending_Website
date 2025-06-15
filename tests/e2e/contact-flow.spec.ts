import { test, expect } from '@playwright/test';

test.describe('Contact Form E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
  });

  test('complete contact form submission flow', async ({ page }) => {
    // Mock the API endpoint
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Form submitted successfully' })
      });
    });

    // Fill out the form
    await page.fill('[name="firstName"]', 'John');
    await page.fill('[name="lastName"]', 'Doe');
    await page.fill('[name="email"]', 'john.doe@example.com');
    await page.fill('[name="phone"]', '(555) 123-4567');
    await page.fill('[name="companyName"]', 'Test Company');
    await page.fill('[name="message"]', 'Interested in vending machine solutions');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for success message (adjust based on your toast implementation)
    await expect(page.locator('text=Thank you')).toBeVisible({ timeout: 5000 });
  });

  test('validates form fields properly', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Check for validation errors
    await expect(page.locator('text=First name is required')).toBeVisible();
    await expect(page.locator('text=Last name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Company name is required')).toBeVisible();
  });

  test('handles network errors gracefully', async ({ page }) => {
    // Mock network failure
    await page.route('/api/contact', async route => {
      await route.abort('failed');
    });

    // Fill and submit form
    await page.fill('[name="firstName"]', 'John');
    await page.fill('[name="lastName"]', 'Doe');
    await page.fill('[name="email"]', 'john@example.com');
    await page.fill('[name="companyName"]', 'Test Company');
    
    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.locator('text=Something went wrong')).toBeVisible({ timeout: 5000 });
  });

  test('form is accessible via keyboard navigation', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[name="firstName"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[name="lastName"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[name="email"]')).toBeFocused();
  });

  test('displays contact information correctly', async ({ page }) => {
    await expect(page.locator('text=(209) 403-5450')).toBeVisible();
    await expect(page.locator('text=ampdesignandconsulting@gmail.com')).toBeVisible();
    await expect(page.locator('text=Modesto, CA')).toBeVisible();
  });
});