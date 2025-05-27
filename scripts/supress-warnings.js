/**
 * Suppress Source Map Warnings Script
 * 
 * This script helps suppress console warnings for missing source maps
 * from third-party libraries that we can't control.
 * 
 * Run this in development to clean up console output.
 */

// Store the original console methods
const originalWarn = console.warn;
const originalError = console.error;

/**
 * Filter function to determine if a warning should be suppressed
 */
function shouldSuppressWarning(message) {
  if (typeof message !== 'string') return false;
  
  const suppressPatterns = [
    'Failed to parse source map',
    'rsuite-no-reset.min.css.map',
    'source-map-loader',
    '.css.map',
    'DevTools failed to load SourceMap',
    'Could not load content for',
  ];
  
  return suppressPatterns.some(pattern => 
    message.includes(pattern)
  );
}

/**
 * Filter function for errors we want to suppress
 */
function shouldSuppressError(message) {
  if (typeof message !== 'string') return false;
  
  const suppressPatterns = [
    'net::ERR_FILE_NOT_FOUND',
    '.css.map',
    'DevTools failed to load SourceMap',
  ];
  
  return suppressPatterns.some(pattern => 
    message.includes(pattern)
  );
}

// Override console.warn
console.warn = function(message, ...args) {
  if (shouldSuppressWarning(message)) {
    return; // Suppress the warning
  }
  originalWarn.call(console, message, ...args);
};

// Override console.error for source map errors
console.error = function(message, ...args) {
  if (shouldSuppressError(message)) {
    return; // Suppress the error
  }
  originalError.call(console, message, ...args);
};

// Export for potential use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    suppressWarnings: true,
    originalWarn,
    originalError,
  };
}

// Log that the suppression is active (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('🔇 Source map warning suppression active');
}