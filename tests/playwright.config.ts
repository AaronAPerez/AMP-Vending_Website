import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for E2E Testing
 * 
 * This configuration sets up Playwright for end-to-end testing of the AMP Vending website.
 * It's completely separate from Jest and handles browser-based testing.
 * 
 * Features:
 * - Multiple browser testing (Chrome, Firefox, Safari)
 * - Mobile device testing
 * - Accessibility testing integration
 * - Screenshot and video recording on failure
 * - Parallel test execution
 * - Custom test directory for e2e tests
 */

const isCI = !!process.env.CI;

export default defineConfig({
  // Test directory - separate from Jest unit tests
  testDir: './tests/e2e',
  
  // Global test configuration
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  ...(isCI ? { workers: 1 } : {}),
  
  // Reporter configuration
  reporter: [
    ['html'],
    ['list'],
    isCI ? ['github'] : ['line'],
  ],
  
  // Global test settings
  use: {
    // Base URL for all tests
    baseURL: 'http://localhost:3000',
    
    // Trace collection for debugging
    trace: 'on-first-retry',
    
    // Screenshot settings
    screenshot: 'only-on-failure',
    
    // Video recording
    video: 'retain-on-failure',
    
    // Accessibility testing
    // Note: You can add axe-playwright for accessibility testing
  },
  
  // Browser projects for cross-browser testing
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    // Mobile testing
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  
  // Web server configuration for development
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !isCI,
    timeout: 120 * 1000,
  },
  
  // Output directory for test artifacts
  outputDir: 'test-results/',
  
  // Test timeout
  timeout: 30 * 1000,
  
  // Expect timeout for assertions
  expect: {
    timeout: 5 * 1000,
  },
});