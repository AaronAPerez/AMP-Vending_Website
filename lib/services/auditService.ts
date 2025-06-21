/**
 * Enhanced Audit Service for AMP Vending - Fixed Method Signatures
 * 
 * Build Process Documentation:
 * 1. Fixed method signatures to match expected parameters
 * 2. Implements proper request header parsing for client IP
 * 3. Handles various proxy scenarios (Vercel, Cloudflare, etc.)
 * 4. Provides comprehensive audit logging with TypeScript safety
 * 5. Includes security-focused request tracking
 * 6. Supports both Edge and Node.js runtime environments
 */

import { NextRequest } from 'next/server';

/**
 * Audit event types for comprehensive tracking
 */
export type AuditEventType = 
  | 'page_view'
  | 'form_submission'
  | 'contact_form'
  | 'feedback_form'
  | 'machine_view'
  | 'quote_request'
  | 'phone_click'
  | 'email_click'
  | 'error_encountered'
  | 'security_event'
  | 'api_call'
  | 'file_download'
  | 'search_performed'
  | 'token_refresh'
  | 'login_attempt'
  | 'logout'
  | 'authentication'
  | 'authorization'
  | 'admin_action';

/**
 * Audit event severity levels
 */
export type AuditSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Comprehensive audit event interface
 */
export interface AuditEvent {
  id: string;
  timestamp: Date;
  type: AuditEventType;
  severity: AuditSeverity;
  description: string;
  details: Record<string, unknown>;
  userAgent?: string;
  ipAddress: string;
  sessionId?: string;
  userId?: string;
  userEmail?: string;
  path: string;
  method: string;
  referrer?: string;
  duration?: number;
  success: boolean;
  errorMessage?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Audit event parameters interface
 */
export interface AuditEventParams {
  event: string;
  userId?: string;
  userEmail?: string;
  sessionId?: string;
  details?: Record<string, unknown>;
  success?: boolean;
  duration?: number;
  severity?: AuditSeverity;
  errorMessage?: string;
}

/**
 * Client IP resolution configuration
 */
interface IPResolutionConfig {
  trustProxy: boolean;
  proxyHeaders: string[];
  fallbackIP: string;
}

/**
 * Enhanced Audit Service Class
 * 
 * Provides comprehensive audit logging for security, analytics, and debugging.
 * Fixed method signatures for proper TypeScript compatibility.
 */
export class AuditService {
  private static instance: AuditService;
  private events: AuditEvent[] = [];
  private readonly maxEvents = 10000; // Prevent memory leaks
  
  // IP resolution configuration
  private readonly ipConfig: IPResolutionConfig = {
    trustProxy: true,
    proxyHeaders: [
      'x-forwarded-for',
      'x-real-ip',
      'x-client-ip',
      'x-forwarded',
      'x-cluster-client-ip',
      'cf-connecting-ip', // Cloudflare
      'true-client-ip',   // Cloudflare Enterprise
      'x-vercel-forwarded-for', // Vercel
    ],
    fallbackIP: '127.0.0.1'
  };

  private constructor() {
    // Private constructor for singleton pattern
  }

  /**
   * Get singleton instance of AuditService
   */
  public static getInstance(): AuditService {
    if (!AuditService.instance) {
      AuditService.instance = new AuditService();
    }
    return AuditService.instance;
  }

  /**
   * Extract client IP address from NextRequest
   * Fixed implementation for Next.js 14+ compatibility
   * 
   * @param request - NextRequest object
   * @returns Client IP address string
   */
  private extractClientIP(request: NextRequest): string {
    try {
      // Method 1: Check proxy headers (most reliable for production)
      if (this.ipConfig.trustProxy) {
        for (const header of this.ipConfig.proxyHeaders) {
          const headerValue = request.headers.get(header);
          if (headerValue) {
            // Handle comma-separated IPs (x-forwarded-for can contain multiple IPs)
            const ips = headerValue.split(',').map(ip => ip.trim());
            const firstIP = ips[0];
            
            // Validate IP format
            if (this.isValidIP(firstIP)) {
              return firstIP;
            }
          }
        }
      }

      // Method 2: Extract from URL (for development/testing)
      const url = new URL(request.url);
      const urlIP = url.searchParams.get('client-ip');
      if (urlIP && this.isValidIP(urlIP)) {
        return urlIP;
      }

      // Method 3: Check for connection info in headers
      const connectionIP = request.headers.get('x-connection-ip');
      if (connectionIP && this.isValidIP(connectionIP)) {
        return connectionIP;
      }

      // Method 4: Parse from forwarded header (RFC 7239)
      const forwardedHeader = request.headers.get('forwarded');
      if (forwardedHeader) {
        const forMatch = forwardedHeader.match(/for=([^;,\s]+)/);
        if (forMatch && forMatch[1]) {
          const forwardedIP = forMatch[1].replace(/"/g, '').replace(/^\[|\]$/g, '');
          if (this.isValidIP(forwardedIP)) {
            return forwardedIP;
          }
        }
      }

      console.warn('Unable to extract client IP from request, using fallback');
      return this.ipConfig.fallbackIP;

    } catch (error) {
      console.error('Error extracting client IP:', error);
      return this.ipConfig.fallbackIP;
    }
  }

  /**
   * Validate IP address format (IPv4 and IPv6)
   * 
   * @param ip - IP address string to validate
   * @returns Boolean indicating if IP is valid
   */
  private isValidIP(ip: string): boolean {
    if (!ip || typeof ip !== 'string') return false;
    
    // IPv4 regex
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    // IPv6 regex (simplified)
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
    
    // Remove port if present
    const cleanIP = ip.split(':')[0];
    
    return ipv4Regex.test(cleanIP) || ipv6Regex.test(ip);
  }

  /**
   * Generate unique event ID
   */
  private generateEventId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * MAIN METHOD: Log an audit event (supports both new and legacy signatures)
   * 
   * @param type - Event type or audit event parameters object
   * @param description - Event description (optional if using params object)
   * @param request - NextRequest object (optional if using params object)
   * @param additionalDetails - Additional event details (optional)
   * @param severity - Event severity level (optional)
   */
  public static async logEvent(
    type: AuditEventType | AuditEventParams,
    description?: string,
    request?: NextRequest,
    additionalDetails: Record<string, unknown> = {},
    severity: AuditSeverity = 'low'
  ): Promise<void> {
    const instance = AuditService.getInstance();
    
    // Handle both parameter styles for backwards compatibility
    if (typeof type === 'object' && 'event' in type) {
      // New style: logEvent({ event: 'token_refresh', userId: '123', ... })
      await instance.logEventInternal(type, request);
    } else if (typeof type === 'string' && description && request) {
      // Legacy style: logEvent('token_refresh', 'description', request, details, severity)
      await instance.logEventInternal({
        event: type,
        details: additionalDetails,
        severity,
      }, request, description);
    } else {
      console.error('Invalid AuditService.logEvent parameters');
    }
  }

  /**
   * Internal method to handle event logging with proper parameter handling
   * 
   * @param params - Audit event parameters
   * @param request - NextRequest object (optional)
   * @param description - Event description (optional)
   */
  private async logEventInternal(
    params: AuditEventParams,
    request?: NextRequest,
    description?: string
  ): Promise<void> {
    try {
      // Create a mock request if none provided (for backwards compatibility)
      const mockRequest = request || new Request('http://localhost:3000', {
        method: 'GET',
        headers: {
          'user-agent': 'AuditService/1.0',
        }
      }) as NextRequest;

      const event: AuditEvent = {
        id: this.generateEventId(),
        timestamp: new Date(),
        type: params.event as AuditEventType,
        severity: params.severity || 'low',
        description: description || `${params.event} event`,
        details: params.details || {},
        userAgent: mockRequest.headers.get('user-agent') || 'unknown',
        ipAddress: this.extractClientIP(mockRequest),
        sessionId: params.sessionId,
        userId: params.userId,
        userEmail: params.userEmail,
        path: new URL(mockRequest.url).pathname,
        method: mockRequest.method,
        referrer: mockRequest.headers.get('referer') || undefined,
        duration: params.duration,
        success: params.success !== undefined ? params.success : true,
        errorMessage: params.errorMessage,
        metadata: {
          timestamp: Date.now(),
          environment: process.env.NODE_ENV,
          version: process.env.npm_package_version || 'unknown',
        },
      };

      // Add to memory store
      this.events.push(event);

      // Manage memory - remove old events if we exceed limit
      if (this.events.length > this.maxEvents) {
        this.events = this.events.slice(-this.maxEvents);
      }

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[AUDIT] ${params.event}:`, {
          description: event.description,
          ip: event.ipAddress,
          path: event.path,
          userId: params.userId,
          details: params.details,
        });
      }

      // In production, send to external logging service
      if (process.env.NODE_ENV === 'production') {
        await this.sendToExternalLogger(event);
      }

    } catch (error) {
      console.error('Error logging audit event:', error);
    }
  }

  /**
   * Log security-related events with higher priority
   * 
   * @param description - Security event description
   * @param request - NextRequest object
   * @param details - Security event details
   */
  public static async logSecurityEvent(
    description: string,
    request: NextRequest,
    details: Record<string, unknown> = {}
  ): Promise<void> {
    await AuditService.logEvent(
      'security_event',
      description,
      request,
      {
        ...details,
        securityFlag: true,
        alertLevel: 'high',
      },
      'high'
    );
  }

  /**
   * Log API call events for monitoring
   * 
   * @param endpoint - API endpoint
   * @param request - NextRequest object
   * @param success - Whether the API call was successful
   * @param duration - Request duration in milliseconds
   * @param details - Additional API details
   */
  public static async logAPICall(
    endpoint: string,
    request: NextRequest,
    success: boolean,
    duration?: number,
    details: Record<string, unknown> = {}
  ): Promise<void> {
    await AuditService.logEvent(
      'api_call',
      `API call to ${endpoint}`,
      request,
      {
        endpoint,
        success,
        duration,
        ...details,
      },
      success ? 'low' : 'medium'
    );
  }

  /**
   * Log form submissions
   * 
   * @param formType - Type of form submitted
   * @param request - NextRequest object
   * @param success - Whether submission was successful
   * @param details - Form submission details
   */
  public static async logFormSubmission(
    formType: string,
    request: NextRequest,
    success: boolean,
    details: Record<string, unknown> = {}
  ): Promise<void> {
    await AuditService.logEvent(
      'form_submission',
      `Form submission: ${formType}`,
      request,
      {
        formType,
        success,
        ...details,
      },
      'low'
    );
  }

  /**
   * Get events by type
   * 
   * @param type - Event type to filter by
   * @returns Array of matching events
   */
  public getEventsByType(type: AuditEventType): AuditEvent[] {
    return this.events.filter(event => event.type === type);
  }

  /**
   * Get events by severity
   * 
   * @param severity - Severity level to filter by
   * @returns Array of matching events
   */
  public getEventsBySeverity(severity: AuditSeverity): AuditEvent[] {
    return this.events.filter(event => event.severity === severity);
  }

  /**
   * Get events within time range
   * 
   * @param startTime - Start time
   * @param endTime - End time
   * @returns Array of events within time range
   */
  public getEventsInTimeRange(startTime: Date, endTime: Date): AuditEvent[] {
    return this.events.filter(
      event => event.timestamp >= startTime && event.timestamp <= endTime
    );
  }

  /**
   * Clear all events (use with caution)
   */
  public clearEvents(): void {
    this.events = [];
  }

  /**
   * Get event statistics
   * 
   * @returns Event statistics object
   */
  public getEventStats(): Record<string, unknown> {
    const stats: Record<string, unknown> = {
      total: this.events.length,
      byType: {},
      bySeverity: {},
    };

    this.events.forEach(event => {
      // Count by type
      const byType = stats.byType as Record<string, number>;
      byType[event.type] = (byType[event.type] || 0) + 1;

      // Count by severity
      const bySeverity = stats.bySeverity as Record<string, number>;
      bySeverity[event.severity] = (bySeverity[event.severity] || 0) + 1;
    });

    return stats;
  }

  /**
   * Send audit event to external logging service
   * 
   * @param event - Audit event to send
   */
  private async sendToExternalLogger(event: AuditEvent): Promise<void> {
    try {
      // Example: Send to external logging service
      if (process.env.AUDIT_WEBHOOK_URL) {
        await fetch(process.env.AUDIT_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.AUDIT_API_KEY || ''}`,
          },
          body: JSON.stringify(event),
        });
      }

      // Example: Send high-severity events to monitoring service
      if (event.severity === 'high' || event.severity === 'critical') {
        if (process.env.MONITORING_WEBHOOK_URL) {
          await fetch(process.env.MONITORING_WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              alert: `High severity audit event: ${event.type}`,
              description: event.description,
              timestamp: event.timestamp,
              details: event.details,
            }),
          });
        }
      }

    } catch (error) {
      console.error('Error sending audit event to external logger:', error);
    }
  }
}

/**
 * Export singleton instance for easy use
 */
export const auditService = AuditService.getInstance();

/**
 * Convenience function for quick audit logging
 * 
 * @param type - Event type
 * @param description - Event description
 * @param request - NextRequest object
 * @param details - Additional details
 */
export async function logAuditEvent(
  type: AuditEventType,
  description: string,
  request: NextRequest,
  details: Record<string, unknown> = {}
): Promise<void> {
  await AuditService.logEvent(type, description, request, details);
}

export default AuditService;