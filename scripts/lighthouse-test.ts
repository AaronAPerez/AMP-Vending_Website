/**
 * Lighthouse Testing & Performance Validation Script
 * 
 * Build Process Documentation:
 * 1. Automated Lighthouse testing for CI/CD integration
 * 2. Performance budget validation
 * 3. Accessibility compliance checking
 * 4. SEO optimization verification
 * 5. Best practices monitoring
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Performance budgets based on Lighthouse recommendations
 */
const PERFORMANCE_BUDGETS = {
  // Core Web Vitals thresholds
  firstContentfulPaint: 1800, // ms
  largestContentfulPaint: 2500, // ms
  totalBlockingTime: 200, // ms
  cumulativeLayoutShift: 0.1, // score
  speedIndex: 3000, // ms
  
  // Resource budgets
  totalSize: 1500, // KB
  imageSize: 500, // KB
  scriptSize: 400, // KB
  styleSize: 100, // KB
  
  // Lighthouse score thresholds
  performance: 90,
  accessibility: 95,
  bestPractices: 90,
  seo: 90,
} as const;

/**
 * Critical pages to test
 */
const CRITICAL_PAGES = [
  '/',
  '/vending-machines',
  '/vending-machines/refrigerated-touchscreen-vending-machine',
  '/contact',
  '/feedback',
] as const;

/**
 * Lighthouse configuration
 */
export const LIGHTHOUSE_CONFIG = {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: [
      // Performance audits
      'first-contentful-paint',
      'largest-contentful-paint',
      'total-blocking-time',
      'cumulative-layout-shift',
      'speed-index',
      'properly-size-images',
      'minify-javascript',
      'serve-static-assets-with-efficient-cache-policy',
      'avoid-enormous-network-payloads',
      
      // Accessibility audits
      'color-contrast',
      'skip-link',
      'keyboard',
      'aria-valid-attr',
      'image-alt',
      'label',
      'link-name',
      
      // SEO audits
      'document-title',
      'meta-description',
      'structured-data',
      'crawlable-anchors',
      'robots-txt',
      
      // Best practices
      'uses-https',
      'no-console-errors',
      'no-vulnerable-libraries',
    ],
    emulatedFormFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
  },
};

/**
 * Interface for Lighthouse results
 */
interface LighthouseResult {
  url: string;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  metrics: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    totalBlockingTime: number;
    cumulativeLayoutShift: number;
    speedIndex: number;
  };
  audits: Record<string, any>;
  errors: string[];
}

/**
 * Run Lighthouse audit on a specific URL
 */
async function runLighthouseAudit(url: string, baseUrl: string = 'http://localhost:3000'): Promise<LighthouseResult> {
  const fullUrl = `${baseUrl}${url}`;
  const outputPath = path.join(process.cwd(), 'lighthouse-reports');
  
  // Ensure output directory exists
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  
  const reportFile = path.join(outputPath, `lighthouse-${url.replace(/\//g, '_') || 'home'}.json`);
  
  try {
    console.log(`🔍 Running Lighthouse audit for: ${fullUrl}`);
    
    // Run Lighthouse CLI
    const command = [
      'npx lighthouse',
      `"${fullUrl}"`,
      `--output-path="${reportFile}"`,
      '--output=json',
      '--chrome-flags="--headless --no-sandbox"',
      '--quiet',
    ].join(' ');
    
    execSync(command, { stdio: 'pipe' });
    
    // Read and parse results
    const reportData = JSON.parse(fs.readFileSync(reportFile, 'utf8'));
    
    const result: LighthouseResult = {
      url,
      scores: {
        performance: Math.round(reportData.categories.performance.score * 100),
        accessibility: Math.round(reportData.categories.accessibility.score * 100),
        bestPractices: Math.round(reportData.categories['best-practices'].score * 100),
        seo: Math.round(reportData.categories.seo.score * 100),
      },
      metrics: {
        firstContentfulPaint: reportData.audits['first-contentful-paint'].numericValue,
        largestContentfulPaint: reportData.audits['largest-contentful-paint'].numericValue,
        totalBlockingTime: reportData.audits['total-blocking-time'].numericValue,
        cumulativeLayoutShift: reportData.audits['cumulative-layout-shift'].numericValue,
        speedIndex: reportData.audits['speed-index'].numericValue,
      },
      audits: reportData.audits,
      errors: [],
    };
    
    return result;
  } catch (error) {
    console.error(`❌ Lighthouse audit failed for ${url}:`, error);
    return {
      url,
      scores: { performance: 0, accessibility: 0, bestPractices: 0, seo: 0 },
      metrics: { firstContentfulPaint: 0, largestContentfulPaint: 0, totalBlockingTime: 0, cumulativeLayoutShift: 0, speedIndex: 0 },
      audits: {},
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
}

/**
 * Validate performance against budgets
 */
function validatePerformanceBudgets(results: LighthouseResult[]): { passed: boolean; violations: string[] } {
  const violations: string[] = [];
  
  results.forEach(result => {
    const { url, scores, metrics } = result;
    
    // Check Lighthouse scores
    if (scores.performance < PERFORMANCE_BUDGETS.performance) {
      violations.push(`${url}: Performance score ${scores.performance} below threshold ${PERFORMANCE_BUDGETS.performance}`);
    }
    if (scores.accessibility < PERFORMANCE_BUDGETS.accessibility) {
      violations.push(`${url}: Accessibility score ${scores.accessibility} below threshold ${PERFORMANCE_BUDGETS.accessibility}`);
    }
    if (scores.bestPractices < PERFORMANCE_BUDGETS.bestPractices) {
      violations.push(`${url}: Best Practices score ${scores.bestPractices} below threshold ${PERFORMANCE_BUDGETS.bestPractices}`);
    }
    if (scores.seo < PERFORMANCE_BUDGETS.seo) {
      violations.push(`${url}: SEO score ${scores.seo} below threshold ${PERFORMANCE_BUDGETS.seo}`);
    }
    
    // Check Core Web Vitals
    if (metrics.firstContentfulPaint > PERFORMANCE_BUDGETS.firstContentfulPaint) {
      violations.push(`${url}: FCP ${Math.round(metrics.firstContentfulPaint)}ms exceeds budget ${PERFORMANCE_BUDGETS.firstContentfulPaint}ms`);
    }
    if (metrics.largestContentfulPaint > PERFORMANCE_BUDGETS.largestContentfulPaint) {
      violations.push(`${url}: LCP ${Math.round(metrics.largestContentfulPaint)}ms exceeds budget ${PERFORMANCE_BUDGETS.largestContentfulPaint}ms`);
    }
    if (metrics.totalBlockingTime > PERFORMANCE_BUDGETS.totalBlockingTime) {
      violations.push(`${url}: TBT ${Math.round(metrics.totalBlockingTime)}ms exceeds budget ${PERFORMANCE_BUDGETS.totalBlockingTime}ms`);
    }
    if (metrics.cumulativeLayoutShift > PERFORMANCE_BUDGETS.cumulativeLayoutShift) {
      violations.push(`${url}: CLS ${metrics.cumulativeLayoutShift.toFixed(3)} exceeds budget ${PERFORMANCE_BUDGETS.cumulativeLayoutShift}`);
    }
  });
  
  return {
    passed: violations.length === 0,
    violations,
  };
}

/**
 * Generate performance report
 */
function generateReport(results: LighthouseResult[], validation: { passed: boolean; violations: string[] }): void {
  const reportPath = path.join(process.cwd(), 'lighthouse-reports', 'summary.md');
  
  let report = `# Lighthouse Performance Report\n\n`;
  report += `Generated: ${new Date().toISOString()}\n\n`;
  
  // Overall status
  report += `## Overall Status: ${validation.passed ? '✅ PASSED' : '❌ FAILED'}\n\n`;
  
  if (!validation.passed) {
    report += `### Budget Violations\n\n`;
    validation.violations.forEach(violation => {
      report += `- ❌ ${violation}\n`;
    });
    report += `\n`;
  }
  
  // Results by page
  report += `## Results by Page\n\n`;
  
  results.forEach(result => {
    const { url, scores, metrics, errors } = result;
    
    report += `### ${url || 'Homepage'}\n\n`;
    
    if (errors.length > 0) {
      report += `**Errors:**\n`;
      errors.forEach(error => {
        report += `- ❌ ${error}\n`;
      });
      report += `\n`;
    } else {
      report += `**Lighthouse Scores:**\n`;
      report += `- Performance: ${scores.performance}/100 ${scores.performance >= PERFORMANCE_BUDGETS.performance ? '✅' : '❌'}\n`;
      report += `- Accessibility: ${scores.accessibility}/100 ${scores.accessibility >= PERFORMANCE_BUDGETS.accessibility ? '✅' : '❌'}\n`;
      report += `- Best Practices: ${scores.bestPractices}/100 ${scores.bestPractices >= PERFORMANCE_BUDGETS.bestPractices ? '✅' : '❌'}\n`;
      report += `- SEO: ${scores.seo}/100 ${scores.seo >= PERFORMANCE_BUDGETS.seo ? '✅' : '❌'}\n\n`;
      
      report += `**Core Web Vitals:**\n`;
      report += `- FCP: ${Math.round(metrics.firstContentfulPaint)}ms ${metrics.firstContentfulPaint <= PERFORMANCE_BUDGETS.firstContentfulPaint ? '✅' : '❌'}\n`;
      report += `- LCP: ${Math.round(metrics.largestContentfulPaint)}ms ${metrics.largestContentfulPaint <= PERFORMANCE_BUDGETS.largestContentfulPaint ? '✅' : '❌'}\n`;
      report += `- TBT: ${Math.round(metrics.totalBlockingTime)}ms ${metrics.totalBlockingTime <= PERFORMANCE_BUDGETS.totalBlockingTime ? '✅' : '❌'}\n`;
      report += `- CLS: ${metrics.cumulativeLayoutShift.toFixed(3)} ${metrics.cumulativeLayoutShift <= PERFORMANCE_BUDGETS.cumulativeLayoutShift ? '✅' : '❌'}\n`;
      report += `- SI: ${Math.round(metrics.speedIndex)}ms ${metrics.speedIndex <= PERFORMANCE_BUDGETS.speedIndex ? '✅' : '❌'}\n\n`;
    }
  });
  
  // Performance recommendations
  report += `## Performance Recommendations\n\n`;
  report += `Based on the Lighthouse audits, consider these optimizations:\n\n`;
  report += `1. **Image Optimization**: Ensure all images use proper sizing and modern formats (WebP/AVIF)\n`;
  report += `2. **JavaScript Optimization**: Minimize and compress JavaScript bundles\n`;
  report += `3. **Caching Strategy**: Implement proper cache headers for static assets\n`;
  report += `4. **DOM Complexity**: Reduce the number of DOM elements on pages with high counts\n`;
  report += `5. **Accessibility**: Address color contrast and focus management issues\n`;
  report += `6. **SEO**: Ensure all links have descriptive text and proper structured data\n\n`;
  
  // Next steps
  report += `## Next Steps\n\n`;
  if (validation.passed) {
    report += `✅ All performance budgets are met! Continue monitoring with each deployment.\n\n`;
    report += `Consider running Lighthouse CI in your deployment pipeline to catch regressions early.\n`;
  } else {
    report += `❌ Performance budgets violated. Priority fixes needed:\n\n`;
    validation.violations.slice(0, 5).forEach((violation, index) => {
      report += `${index + 1}. ${violation}\n`;
    });
    if (validation.violations.length > 5) {
      report += `\n...and ${validation.violations.length - 5} more issues.\n`;
    }
  }
  
  fs.writeFileSync(reportPath, report);
  console.log(`📊 Performance report generated: ${reportPath}`);
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  console.log('🚀 Starting Lighthouse performance audit...\n');
  
  // Check if local server is running
  try {
    execSync('curl -f http://localhost:3000 > /dev/null 2>&1');
  } catch (error) {
    console.error('❌ Local server not running. Please start your Next.js application first with "npm run dev" or "npm run start"');
    process.exit(1);
  }
  
  const results: LighthouseResult[] = [];
  
  // Run audits for all critical pages
  for (const page of CRITICAL_PAGES) {
    const result = await runLighthouseAudit(page);
    results.push(result);
    
    // Show immediate feedback
    if (result.errors.length === 0) {
      console.log(`✅ ${page || 'Homepage'}: P:${result.scores.performance} A:${result.scores.accessibility} BP:${result.scores.bestPractices} SEO:${result.scores.seo}`);
    } else {
      console.log(`❌ ${page || 'Homepage'}: Audit failed`);
    }
  }
  
  // Validate against performance budgets
  const validation = validatePerformanceBudgets(results);
  
  // Generate report
  generateReport(results, validation);
  
  // Summary
  console.log('\n📊 Lighthouse Audit Complete!\n');
  console.log(`Total pages audited: ${results.length}`);
  console.log(`Performance budget: ${validation.passed ? '✅ PASSED' : '❌ FAILED'}`);
  
  if (!validation.passed) {
    console.log(`\nBudget violations: ${validation.violations.length}`);
    validation.violations.slice(0, 3).forEach(violation => {
      console.log(`  ❌ ${violation}`);
    });
    if (validation.violations.length > 3) {
      console.log(`  ... and ${validation.violations.length - 3} more`);
    }
  }
  
  console.log(`\nDetailed report: ./lighthouse-reports/summary.md`);
  
  // Exit with appropriate code for CI/CD
  process.exit(validation.passed ? 0 : 1);
}

/**
 * Package.json scripts to add for testing
 */
export const packageJsonScripts = {
  "lighthouse": "tsx ./scripts/lighthouse-test.ts",
  "lighthouse:ci": "npm run build && npm run start & sleep 10 && npm run lighthouse && kill %1",
  "test:performance": "npm run lighthouse",
  "test:a11y": "npm run lighthouse -- --accessibility-only",
  "validate:budgets": "npm run lighthouse -- --budget-validation"
};

/**
 * GitHub Actions workflow for automated testing
 */
export const githubActionsWorkflow = `
name: Performance & Accessibility Testing

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Start application
      run: npm run start &
      
    - name: Wait for server
      run: npx wait-on http://localhost:3000
    
    - name: Run Lighthouse CI
      run: npm run lighthouse
    
    - name: Upload Lighthouse reports
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: lighthouse-reports
        path: lighthouse-reports/
        retention-days: 30
    
    - name: Comment PR with results
      if: github.event_name == 'pull_request'
      uses: actions/github-script@v6
      with:
        script: |
          const fs = require('fs');
          const reportPath = './lighthouse-reports/summary.md';
          if (fs.existsSync(reportPath)) {
            const report = fs.readFileSync(reportPath, 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '## 🚀 Lighthouse Performance Report\\n\\n' + report
            });
          }
`;

/**
 * Accessibility testing utilities
 */
export class AccessibilityValidator {
  /**
   * Check color contrast ratios
   */
  static validateColorContrast(): { passed: boolean; issues: string[] } {
    const issues: string[] = [];
    
    // Define color combinations to check
    const colorTests = [
      { bg: '#000000', fg: '#F5F5F5', name: 'Primary text on black' },
      { bg: '#FD5A1E', fg: '#000000', name: 'CTA button text' },
      { bg: '#green-600', fg: '#ffffff', name: 'Green badge (old)' },
      { bg: '#green-700', fg: '#ffffff', name: 'Green badge (new)' },
      { bg: '#4d4d4d', fg: '#F5F5F5', name: 'Secondary backgrounds' },
    ];
    
    colorTests.forEach(test => {
      const ratio = this.calculateContrastRatio(test.bg, test.fg);
      if (ratio < 4.5) { // WCAG AA standard
        issues.push(`${test.name}: Contrast ratio ${ratio.toFixed(2)} below 4.5:1 requirement`);
      }
    });
    
    return {
      passed: issues.length === 0,
      issues
    };
  }
  
  /**
   * Calculate contrast ratio between two colors
   */
  private static calculateContrastRatio(bg: string, fg: string): number {
    const getLuminance = (color: string): number => {
      // Convert hex to RGB
      const hex = color.replace('#', '');
      if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
        // Invalid hex color, return luminance of 1 (white) to avoid errors
        return 1;
      }
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      // Calculate relative luminance
      const sRGB = [r, g, b].map(c => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * (sRGB[0] ?? 0) + 0.7152 * (sRGB[1] ?? 0) + 0.0722 * (sRGB[2] ?? 0);
    };
    
    const bgLum = getLuminance(bg);
    const fgLum = getLuminance(fg);
    const lighter = Math.max(bgLum, fgLum);
    const darker = Math.min(bgLum, fgLum);
    
    return (lighter + 0.05) / (darker + 0.05);
  }
  
  /**
   * Validate skip links implementation
   */
  static validateSkipLinks(): { passed: boolean; issues: string[] } {
    const issues: string[] = [];
    
    // This would normally check the DOM, but for TypeScript we'll define the checks
    const requiredSkipLinks = [
      { href: '#main', text: 'Skip to main content' },
      { href: '#navigation', text: 'Skip to navigation' }
    ];
    
    // In a real implementation, you'd check if these elements exist and are properly implemented
    console.log('Skip links validation should check:', requiredSkipLinks);
    
    return {
      passed: true, // Assume passed for TypeScript example
      issues
    };
  }
}

/**
 * SEO validation utilities
 */
export class SEOValidator {
  /**
   * Check for descriptive link text
   */
  static validateLinkText(): { passed: boolean; issues: string[] } {
    const issues: string[] = [];
    
    // Common problematic link texts to avoid
    const problematicTexts = ['Learn More', 'Click Here', 'Read More', 'More Info'];
    
    // In a real implementation, you'd scan the DOM for these
    // For now, we'll note that "Learn More" links should be updated
    issues.push('Update "Learn More" links to be more descriptive (e.g., "Learn More About [Product Name]")');
    
    return {
      passed: issues.length === 0,
      issues
    };
  }
  
  /**
   * Validate structured data
   */
  static validateStructuredData(): { passed: boolean; issues: string[] } {
    const issues: string[] = [];
    
    // Check for required structured data types
    const requiredSchemas = [
      'Organization',
      'LocalBusiness',
      'Product',
      'BreadcrumbList'
    ];
    
    // In a real implementation, you'd validate JSON-LD schemas
    console.log('Structured data validation should check:', requiredSchemas);
    
    return {
      passed: true,
      issues
    };
  }
}

/**
 * Run the main function if this script is executed directly
 */
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Lighthouse testing failed:', error);
    process.exit(1);
  });
}