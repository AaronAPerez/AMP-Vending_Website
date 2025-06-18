/**
 * Jest-axe Setup for Accessibility Testing
 * Configures accessibility testing for all unit tests
 */

import { configureAxe } from 'jest-axe';

// Configure axe for consistent accessibility testing
const axe = configureAxe({
  rules: {
    // Disable color-contrast rule for now as it may have false positives
    'color-contrast': { enabled: false },
    // Custom rules configuration
    'landmark-one-main': { enabled: true },
    'page-has-heading-one': { enabled: true },
    'region': { enabled: true }
  },
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
  // Include only relevant checks
  checks: [],
  // Custom configuration for our design system
  disableOtherRules: false
});

// Export for use in tests
global.axe = axe;