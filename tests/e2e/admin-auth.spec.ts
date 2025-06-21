// tests/e2e/admin-auth.spec.ts
import { test, expect } from '@playwright/test';

/**
 * End-to-End Authentication Tests
 * Build Process: Validates complete authentication flow with real browser interactions
 */
test.describe('Admin Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the admin login page
    await page.goto('/admin/login');
  });

  test('should redirect unauthenticated users to login page', async ({ page }) => {
    await page.goto('/admin');
    
    // Should be redirected to login
    await expect(page).toHaveURL(/\/admin\/login/);
    expect(await page.textContent('h1')).toContain('Admin Login');
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Fill in login form
    await page.fill('[name="email"]', process.env.TEST_ADMIN_EMAIL || 'admin@ampvending.com');
    await page.fill('[name="password"]', process.env.TEST_ADMIN_PASSWORD || 'testpassword123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Should redirect to admin dashboard
    await expect(page).toHaveURL('/admin');
    await expect(page.locator('h1')).toContainText('Admin Dashboard');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.fill('[name="email"]', 'invalid@example.com');
    await page.fill('[name="password"]', 'wrongpassword');
    
    await page.click('button[type="submit"]');
    
    // Should show error message
    await expect(page.locator('[role="alert"]')).toBeVisible();
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });

  test('should implement rate limiting after multiple failed attempts', async ({ page }) => {
    // Attempt login 5 times with wrong credentials
    for (let i = 0; i < 5; i++) {
      await page.fill('[name="email"]', 'test@example.com');
      await page.fill('[name="password"]', 'wrongpassword');
      await page.click('button[type="submit"]');
      
      if (i >= 2) {
        await expect(page.locator('text=Multiple failed attempts')).toBeVisible();
      }
      
      // Clear fields for next attempt
      await page.fill('[name="email"]', '');
      await page.fill('[name="password"]', '');
    }
    
    // After 5 attempts, should show lockout message
    await expect(page.locator('text=Too many failed attempts')).toBeVisible();
  });

  test('should persist login with remember me option', async ({ page, context }) => {
    await page.fill('[name="email"]', process.env.TEST_ADMIN_EMAIL || 'admin@ampvending.com');
    await page.fill('[name="password"]', process.env.TEST_ADMIN_PASSWORD || 'testpassword123');
    await page.check('[name="rememberMe"]');
    
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/admin');
    
    // Close and reopen browser
    await page.close();
    const newPage = await context.newPage();
    await newPage.goto('/admin');
    
    // Should still be logged in
    await expect(newPage).toHaveURL('/admin');
    await expect(newPage.locator('h1')).toContainText('Admin Dashboard');
  });

  test('should successfully logout', async ({ page }) => {
    // Login first
    await page.fill('[name="email"]', process.env.TEST_ADMIN_EMAIL || 'admin@ampvending.com');
    await page.fill('[name="password"]', process.env.TEST_ADMIN_PASSWORD || 'testpassword123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/admin');
    
    // Click user menu
    await page.click('[aria-label="User menu"]');
    
    // Click logout
    await page.click('text=Sign Out');
    
    // Should redirect to login page
    await expect(page).toHaveURL('/admin/login');
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab'); // Email field
    await expect(page.locator('[name="email"]')).toBeFocused();
    
    await page.keyboard.press('Tab'); // Password field
    await expect(page.locator('[name="password"]')).toBeFocused();
    
    await page.keyboard.press('Tab'); // Remember me checkbox
    await expect(page.locator('[name="rememberMe"]')).toBeFocused();
    
    await page.keyboard.press('Tab'); // Submit button
    await expect(page.locator('button[type="submit"]')).toBeFocused();
  });
});