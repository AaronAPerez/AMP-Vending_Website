/**
 * Google Authentication Implementation Helper
 * 
 * Build Process Documentation:
 * 1. Provides secure Google Service Account authentication
 * 2. Handles JSON credential parsing and validation
 * 3. Implements proper error handling for authentication
 * 4. Supports both local development and production environments
 * 5. Includes rate limiting and security best practices
 * 6. Provides debugging utilities for troubleshooting
 */

// lib/google-auth.ts

/**
 * Google Service Account Credentials Interface
 */
interface ServiceAccountCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

/**
 * Google Auth Response Interface
 */
interface GoogleAuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope?: string;
}

/**
 * Rate limiting interface
 */
interface RateLimitInfo {
  allowed: boolean;
  resetTime?: number;
  requestsRemaining?: number;
}

/**
 * Google Authentication Manager Class
 * 
 * Handles all Google API authentication with comprehensive error handling,
 * rate limiting, and security features for production use.
 */
export class GoogleAuthManager {
  private credentials: ServiceAccountCredentials | null = null;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  private readonly scopes = [
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/indexing'
  ];
    substring: any;

  /**
   * Initialize authentication with service account credentials
   */
  async initialize(): Promise<void> {
    try {
      const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
      
      if (!serviceAccountKey) {
        throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set');
      }

      // Parse and validate credentials
      this.credentials = this.parseCredentials(serviceAccountKey);
      
      // Validate required fields
      this.validateCredentials(this.credentials);
      
      console.log(`✅ Google Auth initialized for: ${this.credentials.client_email}`);
      
    } catch (error) {
      console.error('❌ Failed to initialize Google Auth:', error);
      throw error;
    }
  }

  /**
   * Parse service account credentials from environment variable
   */
  private parseCredentials(credentialsString: string): ServiceAccountCredentials {
    try {
      const parsed = JSON.parse(credentialsString);
      
      // Handle base64 encoded credentials (some deployment platforms)
      if (typeof parsed === 'string') {
        return JSON.parse(Buffer.from(parsed, 'base64').toString());
      }
      
      return parsed;
    } catch (error) {
      throw new Error('Invalid JSON format in GOOGLE_SERVICE_ACCOUNT_KEY. Ensure it\'s properly formatted JSON.');
    }
  }

  /**
   * Validate service account credentials
   */
  private validateCredentials(credentials: any): asserts credentials is ServiceAccountCredentials {
    const requiredFields = [
      'type', 'project_id', 'private_key_id', 'private_key',
      'client_email', 'client_id', 'auth_uri', 'token_uri'
    ];

    for (const field of requiredFields) {
      if (!credentials[field]) {
        throw new Error(`Missing required field in service account credentials: ${field}`);
      }
    }

    if (credentials.type !== 'service_account') {
      throw new Error('Invalid credential type. Expected "service_account".');
    }

    if (!credentials.client_email.includes('@')) {
      throw new Error('Invalid client_email format in service account credentials.');
    }
  }

  /**
   * Get valid access token (refresh if expired)
   */
  async getAccessToken(): Promise<string> {
    try {
      // Initialize if not already done
      if (!this.credentials) {
        await this.initialize();
      }

      // Return cached token if still valid
      if (this.accessToken && Date.now() < this.tokenExpiry) {
        return this.accessToken;
      }

      // Get new access token
      const tokenResponse = await this.requestAccessToken();
      
      // Cache token with buffer time (5 minutes before expiry)
      this.accessToken = tokenResponse.access_token;
      this.tokenExpiry = Date.now() + ((tokenResponse.expires_in - 300) * 1000);
      
      console.log(`✅ Access token obtained, expires in ${tokenResponse.expires_in} seconds`);
      
      return this.accessToken;
      
    } catch (error) {
      console.error('❌ Failed to get access token:', error);
      throw error;
    }
  }

  /**
   * Request new access token from Google OAuth2
   */
  private async requestAccessToken(): Promise<GoogleAuthResponse> {
    if (!this.credentials) {
      throw new Error('Credentials not initialized');
    }

    // Create JWT assertion
    const jwt = await this.createJWTAssertion();
    
    // Request access token
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OAuth2 token request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  }

  /**
   * Create JWT assertion for service account authentication
   */
  private async createJWTAssertion(): Promise<string> {
    if (!this.credentials) {
      throw new Error('Credentials not initialized');
    }

    const now = Math.floor(Date.now() / 1000);
    
    const header = {
      alg: 'RS256',
      typ: 'JWT',
    };

    const payload = {
      iss: this.credentials.client_email,
      scope: this.scopes.join(' '),
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600, // 1 hour
      iat: now,
    };

    // Encode header and payload
    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    const signingInput = `${encodedHeader}.${encodedPayload}`;

    // Sign with private key
    const signature = await this.signRS256(signingInput, this.credentials.private_key);
    const encodedSignature = this.base64UrlEncode(signature);

    return `${signingInput}.${encodedSignature}`;
  }

  /**
   * Sign data using RS256 algorithm
   */
  private async signRS256(data: string, privateKey: string): Promise<string> {
    // Import the private key
    const key = await crypto.subtle.importKey(
      'pkcs8',
      this.pemToArrayBuffer(privateKey),
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['sign']
    );

    // Sign the data
    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      key,
      new TextEncoder().encode(data)
    );

    return Buffer.from(signature).toString('base64');
  }

  /**
   * Convert PEM private key to ArrayBuffer
   */
  private pemToArrayBuffer(pem: string): ArrayBuffer {
    const pemHeader = '-----BEGIN PRIVATE KEY-----';
    const pemFooter = '-----END PRIVATE KEY-----';
    
    let pemContents = pem;
    if (pem.includes(pemHeader)) {
      pemContents = pem
        .replace(pemHeader, '')
        .replace(pemFooter, '')
        .replace(/\s/g, '');
    }

    return Buffer.from(pemContents, 'base64').buffer;
  }

  /**
   * Base64 URL encode
   */
  private base64UrlEncode(data: string): string {
    return Buffer.from(data)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  /**
   * Check if authentication is properly configured
   */
  async checkConfiguration(): Promise<{
    configured: boolean;
    issues: string[];
    serviceAccountEmail?: string;
    projectId?: string;
  }> {
    const issues: string[] = [];
    
    try {
      await this.initialize();
      
      if (!this.credentials) {
        issues.push('Service account credentials not loaded');
        return { configured: false, issues };
      }

      // Test token generation
      try {
        await this.getAccessToken();
      } catch (error) {
        issues.push(`Token generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      return {
        configured: issues.length === 0,
        issues,
        serviceAccountEmail: this.credentials.client_email,
        projectId: this.credentials.project_id,
      };
      
    } catch (error) {
      issues.push(error instanceof Error ? error.message : 'Unknown configuration error');
      return { configured: false, issues };
    }
  }

  /**
   * Get service account info for debugging
   */
  getServiceAccountInfo(): { email?: string; projectId?: string } | null {
    if (!this.credentials) {
      return null;
    }

    return {
      email: this.credentials.client_email,
      projectId: this.credentials.project_id,
    };
  }
}

// Singleton instance
let googleAuthInstance: GoogleAuthManager | null = null;

/**
 * Get singleton Google Auth Manager instance
 */
export function getGoogleAuthManager(): GoogleAuthManager {
  if (!googleAuthInstance) {
    googleAuthInstance = new GoogleAuthManager();
  }
  return googleAuthInstance;
}

/**
 * Convenience function to get access token
 */
export async function getGoogleAccessToken(): Promise<string> {
  const authManager = getGoogleAuthManager();
  return await authManager.getAccessToken();
}

/**
 * Rate limiter for Google API requests
 */
class GoogleAPIRateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequestsPerMinute = 200; // Google's limit
  private readonly windowMs = 60000; // 1 minute

  checkRateLimit(identifier: string = 'global'): RateLimitInfo {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    // Get existing requests for this identifier
    const requests = this.requests.get(identifier) || [];
    
    // Filter to only include requests within the current window
    const recentRequests = requests.filter(time => time > windowStart);
    
    // Check if we can make another request
    const allowed = recentRequests.length < this.maxRequestsPerMinute;
    
    if (allowed) {
      // Add this request to the list
      recentRequests.push(now);
      this.requests.set(identifier, recentRequests);
    }

    return {
      allowed,
      resetTime: windowStart + this.windowMs,
      requestsRemaining: Math.max(0, this.maxRequestsPerMinute - recentRequests.length),
    };
  }
}

// Global rate limiter instance
const rateLimiter = new GoogleAPIRateLimiter();

/**
 * Check rate limit for Google API requests
 */
export function checkGoogleAPIRateLimit(identifier?: string): RateLimitInfo {
  return rateLimiter.checkRateLimit(identifier);
}

/**
 * Debugging utility for Google Auth setup
 */
export async function debugGoogleAuth(): Promise<void> {
  console.log('🔍 Debugging Google Authentication Setup...\n');
  
  const authManager = getGoogleAuthManager();
  const config = await authManager.checkConfiguration();
  
  console.log('Configuration Status:', config.configured ? '✅ Valid' : '❌ Invalid');
  
  if (config.serviceAccountEmail) {
    console.log('Service Account Email:', config.serviceAccountEmail);
  }
  
  if (config.projectId) {
    console.log('Project ID:', config.projectId);
  }
  
  if (config.issues.length > 0) {
    console.log('\n❌ Issues found:');
    config.issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue}`);
    });
  }
  
  if (config.configured) {
    console.log('\n✅ Google Authentication is properly configured!');
    console.log('Next steps:');
    console.log('1. Ensure the service account email is added to Google Search Console');
    console.log('2. Test the indexing API endpoint');
  }
}

// Export default instance for convenience
export default getGoogleAuthManager;

/**
 * Google Authentication Setup Script
 * 
 * Interactive script to guide through Google Service Account setup
 * and validate the configuration for AMP Vending website.
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';


// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

/**
 * Console logging utilities
 */
const log = {
  info: (msg: string) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg: string) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  warning: (msg: string) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg: string) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  step: (msg: string) => console.log(`${colors.cyan}🔧${colors.reset} ${msg}`),
  header: (msg: string) => console.log(`\n${colors.bold}${colors.magenta}${msg}${colors.reset}\n`),
};

/**
 * Main setup function
 */
async function setupGoogleAuth(): Promise<void> {
  log.header('🚀 Google Service Account Setup for AMP Vending');
  
  console.log('This script will help you set up Google Service Account authentication');
  console.log('for Google Search Console API integration.\n');

  // Step 1: Check environment
  await checkEnvironment();
  
  // Step 2: Validate credentials
  await validateCredentials();
  
  // Step 3: Test authentication
  await testAuthentication();
  
  // Step 4: Provide next steps
  provideNextSteps();
}

/**
 * Check current environment setup
 */
async function checkEnvironment(): Promise<void> {
  log.header('Step 1: Environment Check');
  
  // Check for .env.local file
  const envLocalPath = join(process.cwd(), '.env.local');
  if (existsSync(envLocalPath)) {
    log.success('.env.local file found');
  } else {
    log.warning('.env.local file not found');
    log.info('Create .env.local file in your project root for local development');
  }
  
  // Check for Google Service Account Key
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (serviceAccountKey) {
    log.success('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is set');
    
    // Check if it looks like valid JSON
    try {
      const parsed = JSON.parse(serviceAccountKey);
      if (parsed.type === 'service_account') {
        log.success('Service account key appears to be valid JSON');
      } else {
        log.warning('Service account key JSON does not have expected structure');
      }
    } catch {
      log.error('Service account key is not valid JSON');
    }
  } else {
    log.error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set');
    
    console.log('\nTo set up the environment variable:');
    console.log('1. Copy your service account JSON key');
    console.log('2. Add to .env.local:');
    console.log('   GOOGLE_SERVICE_ACCOUNT_KEY=\'{"type":"service_account",...}\'');
    console.log('3. For production, add to your deployment platform secrets\n');
  }
  
  // Check required dependencies
  await checkDependencies();
}

/**
 * Check if required dependencies are installed
 */
async function checkDependencies(): Promise<void> {
  log.step('Checking dependencies...');
  
  const packageJsonPath = join(process.cwd(), 'package.json');
  if (!existsSync(packageJsonPath)) {
    log.error('package.json not found');
    return;
  }
  
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    // Check for required dependencies
    const requiredDeps = ['google-auth-library'];
    const missingDeps = requiredDeps.filter(dep => !dependencies[dep]);
    
    if (missingDeps.length === 0) {
      log.success('All required dependencies are installed');
    } else {
      log.warning(`Missing dependencies: ${missingDeps.join(', ')}`);
      console.log('Install with: npm install ' + missingDeps.join(' '));
    }
  } catch (error) {
    log.error('Could not read package.json');
  }
}

/**
 * Validate service account credentials
 */
async function validateCredentials(): Promise<void> {
  log.header('Step 2: Credential Validation');
  
  try {
    const authManager = getGoogleAuthManager();
    const config = await authManager.checkConfiguration();
    
    if (config.configured) {
      log.success('Service account credentials are valid');
      log.info(`Service Account Email: ${config.serviceAccountEmail}`);
      log.info(`Project ID: ${config.projectId}`);
    } else {
      log.error('Service account credentials have issues:');
      config.issues.forEach((issue, index) => {
        console.log(`   ${index + 1}. ${issue}`);
      });
    }
  } catch (error) {
    log.error(`Credential validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Test authentication with Google APIs
 */
async function testAuthentication(): Promise<void> {
  log.header('Step 3: Authentication Test');
  
  try {
    const authManager = getGoogleAuthManager();
    
    log.step('Testing access token generation...');
    const accessToken = await authManager.getAccessToken();
    
    if (accessToken) {
      log.success('Access token generated successfully');
      log.info(`Token preview: ${accessToken.substring(0, 20)}...`);
      
      // Test Google Search Console API access
      await testSearchConsoleAPI(accessToken);
      
      // Test Indexing API access
      await testIndexingAPI(accessToken);
    }
  } catch (error) {
    log.error(`Authentication test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Test Google Search Console API access
 */
async function testSearchConsoleAPI(accessToken: string): Promise<void> {
  try {
    log.step('Testing Search Console API access...');
    
    const response = await fetch('https://searchconsole.googleapis.com/webmasters/v3/sites', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      log.success('Search Console API access confirmed');
      
      if (data.siteEntry && data.siteEntry.length > 0) {
        log.info('Properties found in Search Console:');
        data.siteEntry.forEach((site: any) => {
          console.log(`   - ${site.siteUrl} (${site.permissionLevel})`);
        });
        
        // Check if our site is in the list
        const ampVendingSite = data.siteEntry.find((site: any) => 
          site.siteUrl.includes('ampvendingmachines.com')
        );
        
        if (ampVendingSite) {
          log.success('AMP Vending website found in Search Console');
          if (ampVendingSite.permissionLevel === 'siteOwner') {
            log.success('Service account has Owner permissions');
          } else {
            log.warning(`Service account has ${ampVendingSite.permissionLevel} permissions (Owner required for API access)`);
          }
        } else {
          log.warning('AMP Vending website not found in Search Console properties');
        }
      } else {
        log.warning('No properties found in Search Console');
      }
    } else {
      const errorText = await response.text();
      log.error(`Search Console API test failed: ${response.status} ${response.statusText}`);
      console.log('Response:', errorText);
    }
  } catch (error) {
    log.error(`Search Console API test error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Test Indexing API access
 */
async function testIndexingAPI(accessToken: string): Promise<void> {
  try {
    log.step('Testing Indexing API access...');
    
    // Test with a simple metadata request (doesn't actually submit for indexing)
    const testUrl = 'https://www.ampvendingmachines.com/';
    
    const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: testUrl,
        type: 'URL_UPDATED',
      }),
    });
    
    if (response.ok) {
      log.success('Indexing API access confirmed');
      log.info('Ready to submit indexing requests');
    } else if (response.status === 403) {
      log.warning('Indexing API access denied - may need to enable the API in Google Cloud Console');
    } else {
      const errorText = await response.text();
      log.error(`Indexing API test failed: ${response.status} ${response.statusText}`);
      console.log('Response:', errorText);
    }
  } catch (error) {
    log.error(`Indexing API test error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Provide next steps and recommendations
 */
function provideNextSteps(): void {
  log.header('Next Steps');
  
  console.log('🎯 To complete your Google Search Console integration:\n');
  
  console.log('1. 📋 Add Service Account to Search Console:');
  console.log('   • Go to https://search.google.com/search-console');
  console.log('   • Select your property (https://www.ampvendingmachines.com)');
  console.log('   • Go to Settings > Users and permissions');
  console.log('   • Add your service account email as Owner\n');
  
  console.log('2. 🗺️ Submit Your Sitemap:');
  console.log('   • In Search Console, go to Sitemaps');
  console.log('   • Submit: https://www.ampvendingmachines.com/sitemap.xml\n');
  
  console.log('3. 🚀 Test Your Implementation:');
  console.log('   • Run: npm run request-indexing');
  console.log('   • Check: curl https://www.ampvendingmachines.com/sitemap.xml');
  console.log('   • Test: POST to /api/request-indexing\n');
  
  console.log('4. 🔧 Production Deployment:');
  console.log('   • Add GOOGLE_SERVICE_ACCOUNT_KEY to GitHub Secrets');
  console.log('   • Add to Vercel/your hosting platform environment variables');
  console.log('   • Test production deployment\n');
  
  console.log('5. 📊 Monitor Results:');
  console.log('   • Check Google Search Console Coverage reports');
  console.log('   • Monitor indexing status');
  console.log('   • Review crawl statistics\n');
  
  log.success('Setup complete! Your Google Search Console integration is ready.');
}

/**
 * Check GitHub repository configuration
 */
async function checkGitHubSetup(): Promise<void> {
  log.header('GitHub Configuration Check');
  
  // Check if .github/workflows directory exists
  const workflowsPath = join(process.cwd(), '.github', 'workflows');
  if (existsSync(workflowsPath)) {
    log.success('.github/workflows directory found');
  } else {
    log.warning('.github/workflows directory not found');
    log.info('Create this directory to add GitHub Actions for automated indexing');
  }
  
  // Check for existing workflow files
  const workflowFiles = ['request-indexing.yml', 'seo-check.yml'];
  workflowFiles.forEach(file => {
    const filePath = join(workflowsPath, file);
    if (existsSync(filePath)) {
      log.success(`Workflow file found: ${file}`);
    } else {
      log.info(`Consider adding workflow: ${file}`);
    }
  });
  
  console.log('\nTo set up GitHub Secrets:');
  console.log('1. Go to your repository on GitHub');
  console.log('2. Click Settings > Secrets and variables > Actions');
  console.log('3. Add GOOGLE_SERVICE_ACCOUNT_KEY secret');
  console.log('4. Paste your entire service account JSON as the value\n');
}

/**
 * Interactive credential setup helper
 */
async function setupCredentialsInteractively(): Promise<void> {
  log.header('Interactive Credential Setup');
  
  console.log('This will help you format your service account JSON correctly.\n');
  
  // Check if user has the JSON file
  console.log('Do you have your service account JSON file? (y/n)');
  
  // In a real interactive script, you'd use readline for input
  console.log('\nIf you have the JSON file:');
  console.log('1. Copy the entire content of the JSON file');
  console.log('2. Add it to .env.local as a single line:');
  console.log('   GOOGLE_SERVICE_ACCOUNT_KEY=\'{"type":"service_account",...}\'');
  console.log('3. Make sure to escape any quotes properly\n');
  
  console.log('If you need to create a service account:');
  console.log('1. Go to https://console.cloud.google.com/');
  console.log('2. Create or select a project');
  console.log('3. Enable Search Console API and Indexing API');
  console.log('4. Create a service account');
  console.log('5. Download the JSON key file');
  console.log('6. Add the service account email to Google Search Console\n');
}

/**
 * Verify production environment
 */
async function verifyProductionEnvironment(): Promise<void> {
  log.header('Production Environment Verification');
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com';
  
  try {
    // Test sitemap accessibility
    log.step('Testing sitemap accessibility...');
    const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
    if (sitemapResponse.ok) {
      log.success('Sitemap is accessible');
    } else {
      log.error(`Sitemap not accessible: ${sitemapResponse.status}`);
    }
    
    // Test robots.txt
    log.step('Testing robots.txt...');
    const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
    if (robotsResponse.ok) {
      log.success('Robots.txt is accessible');
      
      const robotsContent = await robotsResponse.text();
      if (robotsContent.includes('Sitemap:')) {
        log.success('Robots.txt includes sitemap reference');
      } else {
        log.warning('Robots.txt missing sitemap reference');
      }
    } else {
      log.error(`Robots.txt not accessible: ${robotsResponse.status}`);
    }
    
    // Test indexing API endpoint
    log.step('Testing indexing API endpoint...');
    try {
      const indexingResponse = await fetch(`${baseUrl}/api/request-indexing`, {
        method: 'GET',
      });
      
      if (indexingResponse.status === 400) {
        log.success('Indexing API endpoint is responding (expected 400 for GET request)');
      } else {
        log.info(`Indexing API endpoint response: ${indexingResponse.status}`);
      }
    } catch (error) {
      log.error('Indexing API endpoint not accessible');
    }
    
  } catch (error) {
    log.error(`Production verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Main CLI interface
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0] || 'setup';
  
  try {
    switch (command) {
      case 'setup':
        await setupGoogleAuth();
        break;
        
      case 'debug':
        await debugGoogleAuth();
        break;
        
      case 'check-github':
        await checkGitHubSetup();
        break;
        
      case 'interactive':
        await setupCredentialsInteractively();
        break;
        
      case 'verify':
        await verifyProductionEnvironment();
        break;
        
      case 'full':
        await setupGoogleAuth();
        await checkGitHubSetup();
        await verifyProductionEnvironment();
        break;
        
      default:
        console.log('Google Authentication Setup Script\n');
        console.log('Usage: npx tsx scripts/setup-google-auth.ts [command]\n');
        console.log('Commands:');
        console.log('  setup       - Run complete setup process (default)');
        console.log('  debug       - Debug current configuration');
        console.log('  check-github - Check GitHub Actions setup');
        console.log('  interactive - Interactive credential setup');
        console.log('  verify      - Verify production environment');
        console.log('  full        - Run all checks and setup');
        process.exit(1);
    }
  } catch (error) {
    log.error(`Setup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { setupGoogleAuth, checkGitHubSetup, verifyProductionEnvironment };