const nextJest = require('next/jest');

/**
 * Enhanced Jest Configuration for AMP Vending Website
 * 
 * This configuration provides comprehensive testing setup with:
 * - TypeScript support with proper path mapping
 * - React Testing Library integration
 * - Coverage reporting with detailed thresholds
 * - Accessibility testing with jest-axe
 * - Performance monitoring capabilities
 * - Proper mocking for Next.js components
 */

const createJestConfig = nextJest({
  // Path to Next.js app for loading next.config.js and .env files
  dir: './',
});

// Enhanced Jest configuration with comprehensive testing capabilities
const customJestConfig = {
  // Test environment - jsdom for React component testing
  testEnvironment: 'jsdom',
  
  // Setup files for global test configuration
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.tsx',
    '<rootDir>/tests/jest-axe-setup.js'
  ],
  
  // Test file patterns - comprehensive coverage
  testMatch: [
    '<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/tests/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/tests/unit/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/components/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/lib/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/hooks/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/app/**/*.test.{js,jsx,ts,tsx}',
  ],
  
  // Files to ignore during testing
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/e2e/',           // Exclude Playwright E2E tests
    '<rootDir>/tests/**/*.spec.ts',   // Exclude Playwright spec files
    '<rootDir>/tests/**/*.spec.tsx',
    '<rootDir>/.vercel/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
  ],
  
  // Module name mapping for imports and assets
  moduleNameMapper: {
    // Path aliases from tsconfig.json
    '^@/(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    
    // Static asset mocks
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(mp4|webm|ogg|mp3|wav|flac|aac)$': '<rootDir>/tests/__mocks__/fileMock.js',
    
    // Mock problematic modules
    '^next-auth/react$': '<rootDir>/tests/__mocks__/next-auth.js',
    '^framer-motion$': '<rootDir>/tests/__mocks__/framer-motion.js',
  },
  
  // Transform configuration for different file types
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  // Files to skip transformation
  transformIgnorePatterns: [
    '/node_modules/(?!(.*\\.mjs$))',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  
  // Coverage collection configuration
  collectCoverageFrom: [
    // Include source files
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    'types/**/*.{js,jsx,ts,tsx}',
    
    // Exclude specific files and patterns
    '!**/*.d.ts',
    '!**/*.stories.{js,jsx,ts,tsx}',
    '!**/*.config.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/dist/**',
    '!**/public/**',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/tests/**',
    
    // Exclude specific component patterns that are hard to test
    '!components/**/index.{js,jsx,ts,tsx}', // Re-export files
    '!app/**/layout.tsx', // Layout files
    '!app/**/loading.tsx', // Loading components
    '!app/**/error.tsx', // Error boundaries
    '!app/**/not-found.tsx', // 404 pages
  ],
  
  // Coverage thresholds - enforce quality standards
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 80,
      statements: 80,
    },
    // Specific thresholds for critical components
    './components/contact/': {
      branches: 85,
      functions: 85,
      lines: 90,
      statements: 90,
    },
    './components/feedback/': {
      branches: 85,
      functions: 85,
      lines: 90,
      statements: 90,
    },
    './lib/services/': {
      branches: 80,
      functions: 80,
      lines: 85,
      statements: 85,
    },
  },
  
  // Coverage reporting
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'json',
    'clover',
  ],
  
  // Coverage directory
  coverageDirectory: '<rootDir>/coverage',
  
  // Test timeout (10 seconds for integration tests)
  testTimeout: 10000,
  
  // Global test setup
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
  
  // Error handling
  errorOnDeprecated: true,
  
  // Watch mode configuration
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
  ],
  
  // Test results processing
  verbose: true,
  
  // Snapshot testing
  snapshotSerializers: [
    '@emotion/jest/serializer',
  ],
  
  // Global variables available in tests
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
      },
    },
  },
  
  // Module directories for resolution
  moduleDirectories: ['node_modules', '<rootDir>/'],
  
  // File extensions to consider
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Additional test environment options
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  
  // Reporter configuration for CI/CD
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/test-results',
        outputName: 'junit.xml',
        ancestorSeparator: ' › ',
        uniqueOutputName: 'false',
        suiteNameTemplate: '{filepath}',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
      },
    ],
    [
      'jest-html-reporters',
      {
        publicPath: '<rootDir>/test-results',
        filename: 'test-report.html',
        openReport: process.env.NODE_ENV !== 'ci',
      },
    ],
  ],
  
  // Performance monitoring
  maxWorkers: '50%',
  
  // Bail configuration - stop on first failure in CI
  bail: process.env.CI ? 1 : 0,
  
  // Cache configuration
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
  
  // Notification configuration for development
  notify: process.env.NODE_ENV === 'development',
  notifyMode: 'failure-change',
};

// Export the enhanced configuration
module.exports = createJestConfig(customJestConfig);