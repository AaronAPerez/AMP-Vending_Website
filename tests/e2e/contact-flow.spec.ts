/**
 * Contact Flow E2E Tests
 * 
 * End-to-end tests for the contact form flow using Playwright.
 * These tests run in a real browser environment and test the complete
 * user journey from navigation to form submission.
 */

import { test, expect } from '@playwright/test';

test.describe('Contact Form Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the contact page before each test
    await page.goto('/contact');
  });

  test('should display contact form with all required fields', async ({ page }) => {
    // Check that the contact form is visible
    await expect(page.getByRole('heading', { name: /ready to enhance your workplace/i })).toBeVisible();
    
    // Verify all form fields are present
    await expect(page.getByLabel(/first name/i)).toBeVisible();
    await expect(page.getByLabel(/last name/i)).toBeVisible();
    await expect(page.getByLabel(/email address/i)).toBeVisible();
    await expect(page.getByLabel(/phone number/i)).toBeVisible();
    await expect(page.getByLabel(/company name/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
    
    // Check submit button
    await expect(page.getByRole('button', { name: /request information/i })).toBeVisible();
  });

  test('should show validation errors for empty required fields', async ({ page }) => {
    // Try to submit the form without filling required fields
    await page.getByRole('button', { name: /request information/i }).click();
    
    // Check for validation error messages
    await expect(page.getByText(/first name is required/i)).toBeVisible();
    await expect(page.getByText(/last name is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/company name is required/i)).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    // Fill form with invalid email
    await page.getByLabel(/first name/i).fill('John');
    await page.getByLabel(/last name/i).fill('Doe');
    await page.getByLabel(/email address/i).fill('invalid-email');
    await page.getByLabel(/company name/i).fill('Test Company');
    
    // Submit form
    await page.getByRole('button', { name: /request information/i }).click();
    
    // Check for email validation error
    await expect(page.getByText(/invalid email address/i)).toBeVisible();
  });

  test('should successfully submit form with valid data', async ({ page }) => {
    // Mock the API endpoint to avoid actual form submission during testing
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Form submitted successfully' })
      });
    });

    // Fill out the form with valid data
    await page.getByLabel(/first name/i).fill('John');
    await page.getByLabel(/last name/i).fill('Doe');
    await page.getByLabel(/email address/i).fill('john.doe@example.com');
    await page.getByLabel(/phone number/i).fill('(555) 123-4567');
    await page.getByLabel(/company name/i).fill('Test Company');
    await page.getByLabel(/message/i).fill('I am interested in your vending machine solutions for our office.');

    // Submit the form
    await page.getByRole('button', { name: /request information/i }).click();

    // Wait for success message (this depends on your toast implementation)
    // You might need to adjust this based on how your success message appears
    await expect(page.getByText(/thank you/i)).toBeVisible({ timeout: 5000 });
  });

  test('should clear validation errors when user starts typing', async ({ page }) => {
    // Submit empty form to trigger validation
    await page.getByRole('button', { name: /request information/i }).click();
    
    // Verify error appears
    await expect(page.getByText(/first name is required/i)).toBeVisible();
    
    // Start typing in the field
    await page.getByLabel(/first name/i).fill('J');
    
    // Error should disappear
    await expect(page.getByText(/first name is required/i)).not.toBeVisible();
  });

  test('should display contact information correctly', async ({ page }) => {
    // Check that contact information is displayed
    await expect(page.getByText(/contact information/i)).toBeVisible();
    await expect(page.getByText(/(209) 403-5450/i)).toBeVisible();
    await expect(page.getByText(/ampdesignandconsulting@gmail.com/i)).toBeVisible();
    await expect(page.getByText(/modesto, ca/i)).toBeVisible();
    
    // Check that phone and email links work
    const phoneLink = page.getByRole('link', { name: /(209) 403-5450/i });
    await expect(phoneLink).toHaveAttribute('href', 'tel:+12094035450');
    
    const emailLink = page.getByRole('link', { name: /ampdesignandconsulting@gmail.com/i });
    await expect(emailLink).toHaveAttribute('href', 'mailto:ampdesignandconsulting@gmail.com');
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that form is still usable on mobile
    await expect(page.getByLabel(/first name/i)).toBeVisible();
    await expect(page.getByLabel(/last name/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /request information/i })).toBeVisible();
    
    // Check that form fields are properly sized for mobile
    const firstNameField = page.getByLabel(/first name/i);
    const boundingBox = await firstNameField.boundingBox();
    expect(boundingBox?.width).toBeGreaterThan(200); // Should be wide enough for mobile use
  });

  test('should handle form submission loading state', async ({ page }) => {
    // Mock API with delay to test loading state
    await page.route('/api/contact', async route => {
      // Add delay to see loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });

    // Fill and submit form
    await page.getByLabel(/first name/i).fill('John');
    await page.getByLabel(/last name/i).fill('Doe');
    await page.getByLabel(/email address/i).fill('john@example.com');
    await page.getByLabel(/company name/i).fill('Test Company');
    
    await page.getByRole('button', { name: /request information/i }).click();
    
    // Check for loading state
    await expect(page.getByText(/sending/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sending/i })).toBeDisabled();
  });

  test('should navigate to contact page from homepage', async ({ page }) => {
    // Start from homepage
    await page.goto('/');
    
    // Find and click contact link/button (adjust selector based on your navigation)
    await page.getByRole('link', { name: /contact/i }).first().click();
    
    // Should be on contact page
    await expect(page).toHaveURL('/contact');
    await expect(page.getByRole('heading', { name: /ready to enhance your workplace/i })).toBeVisible();
  });

  test('should have proper accessibility features', async ({ page }) => {
    // Check for proper form labeling
    const firstNameInput = page.getByLabel(/first name/i);
    await expect(firstNameInput).toHaveAttribute('aria-required', 'true');
    
    const emailInput = page.getByLabel(/email address/i);
    await expect(emailInput).toHaveAttribute('aria-required', 'true');
    await expect(emailInput).toHaveAttribute('type', 'email');
    
    // Check for proper heading structure
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(firstNameInput).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.getByLabel(/last name/i)).toBeFocused();
  });
});

test.describe('Contact Page Navigation', () => {
  test('should have proper page title and meta description', async ({ page }) => {
    await page.goto('/contact');
    
    // Check page title
    await expect(page).toHaveTitle(/contact.*amp vending/i);
    
    // Check meta description (if accessible)
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', expect.stringMatching(/contact.*amp vending/i));
  });

  test('should display breadcrumb navigation', async ({ page }) => {
    await page.goto('/contact');
    
    // Check for breadcrumb navigation (adjust based on your implementation)
    await expect(page.getByRole('navigation', { name: /breadcrumb/i })).toBeVisible();
  });
});