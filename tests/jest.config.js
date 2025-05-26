const nextJest = require('next/jest');

/**
 * Jest Configuration for AMP Vending Website
 * 
 * This configuration sets up Jest for testing React components and utilities
 * while properly excluding e2e tests that should run with Playwright.
 * 
 * Features:
 * - Next.js integration with automatic config loading
 * - TypeScript support for test files
 * - Path mapping support (@/* imports)
 * - Proper test environment setup
 * - E2E test exclusion to prevent conflicts
 * - Custom module mapping for static assets
 */

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Test environment configuration
  testEnvironment: 'jsdom',
  
  // Setup files to run before tests
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  
  // Test file patterns - EXCLUDE e2e tests
  testMatch: [
    '<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/tests/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/tests/unit/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/components/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/lib/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/hooks/**/*.test.{js,jsx,ts,tsx}',
  ],
  
  // Explicitly ignore e2e tests and other non-Jest files
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/e2e/',           // Exclude e2e tests
    '<rootDir>/tests/**/*.spec.ts',   // Exclude Playwright spec files
    '<rootDir>/tests/**/*.spec.tsx',
    '<rootDir>/.vercel/',
    '<rootDir>/dist/',
  ],
  
  // Module name mapping for static assets and path aliases
  moduleNameMapper: {
    // Handle module aliases defined in tsconfig.json
    '^@/(.*)$': '<rootDir>/$1',
    
    // Handle static asset imports
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    
    // Handle video and audio files
    '^.+\\.(mp4|webm|ogg|mp3|wav|flac|aac)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
  
  // Transform configuration
  transform: {
    // Use next/jest transformer for JS/TS files
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  // Transform ignore patterns
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/*.stories.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // Test timeout
  testTimeout: 10000,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks after each test
  restoreMocks: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);