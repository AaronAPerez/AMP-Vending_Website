import { test, expect } from '@playwright/test';

test.describe('Vending Machines Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/vending-machines');
  });

  test('displays vending machines correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Premium Vending Machines/);
    
    // Check for machine cards
    await expect(page.locator('[data-testid="machine-card"]').first()).toBeVisible();
    
    // Check filter functionality
    await page.click('button:has-text("Refrigerated")');
    await page.waitForLoadState('networkidle');
    
    // Verify filtered results
    const machineCards = page.locator('[data-testid="machine-card"]');
    await expect(machineCards).toHaveCountGreaterThan(0);
  });

  test('machine detail navigation works', async ({ page }) => {
    // Click on first machine
    await page.click('[data-testid="machine-card"]').first();
    
    // Should navigate to detail page
    await expect(page).toHaveURL(/\/vending-machines\/[^\/]+$/);
    
    // Check for machine details
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Features')).toBeVisible();
  });

  test('filters work correctly', async ({ page }) => {
    const initialCount = await page.locator('[data-testid="machine-card"]').count();
    
    // Apply refrigerated filter
    await page.click('button:has-text("Refrigerated")');
    await page.waitForTimeout(500); // Wait for filter to apply
    
    const filteredCount = await page.locator('[data-testid="machine-card"]').count();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
    
    // Reset to all
    await page.click('button:has-text("All Machines")');
    await page.waitForTimeout(500);
    
    const resetCount = await page.locator('[data-testid="machine-card"]').count();
    expect(resetCount).toEqual(initialCount);
  });
});
