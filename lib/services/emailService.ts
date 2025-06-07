/**
 * Email Service for AMP Vending
 * 
 * Handles email sending with fallbacks for development and production environments.
 * Supports multiple email providers and degradation.
 */

interface EmailConfig {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Email Service Class
 * Provides abstraction over different email providers
 */
export class EmailService {
  private static instance: EmailService;
  
  private constructor() {}
  
  /**
   * Singleton pattern for email service
   */
  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  /**
   * Verify email service connection
   * Returns true if email service is properly configured
   */
  async verifyConnection(): Promise<boolean> {
    try {
      // In development, always return true (we'll use console logging)
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Email Service: Development mode - using console logging');
        return true;
      }

      // Check if any email service is configured
      const hasNodemailer = process.env.EMAIL_HOST && process.env.EMAIL_USER;
      const hasResend = process.env.RESEND_API_KEY;
      
      if (!hasNodemailer && !hasResend) {
        console.warn('⚠️ No email service configured. Using fallback mode.');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Email service verification failed:', error);
      return false;
    }
  }

  /**
   * Send email using the configured provider
   */
  async sendEmail(config: EmailConfig): Promise<EmailResponse> {
    try {
      // Development mode - log to console
      if (process.env.NODE_ENV === 'development') {
        return this.sendEmailDevelopment(config);
      }

      // Production mode - try different providers
      if (process.env.RESEND_API_KEY) {
        return await this.sendEmailResend(config);
      } else if (process.env.EMAIL_HOST) {
        return await this.sendEmailNodemailer(config);
      } else {
        return this.sendEmailFallback(config);
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown email error'
      };
    }
  }

  /**
   * Development email handler - logs to console
   */
  private sendEmailDevelopment(config: EmailConfig): EmailResponse {
    console.log('\n📧 =====================================');
    console.log('📧 EMAIL SENT (DEVELOPMENT MODE)');
    console.log('📧 =====================================');
    console.log('📧 To:', config.to);
    console.log('📧 Subject:', config.subject);
    console.log('📧 HTML Content:');
    console.log(config.html);
    console.log('📧 =====================================\n');
    
    return {
      success: true,
      messageId: `dev-${Date.now()}`
    };
  }

  /**
   * Resend email provider (recommended for production)
   */
  private async sendEmailResend(config: EmailConfig): Promise<EmailResponse> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: config.from || 'AMP Vending <noreply@ampvendingmachines.com>',
          to: [config.to],
          subject: config.subject,
          html: config.html,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Resend API error');
      }

      return {
        success: true,
        messageId: result.id
      };
    } catch (error) {
      console.error('Resend email failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Resend email failed'
      };
    }
  }


  /**
   * Nodemailer email provider (SMTP)
   */
  private async sendEmailNodemailer(config: EmailConfig): Promise<EmailResponse> {
    try {
      // Note: You'll need to install nodemailer for this to work
      // npm install nodemailer @types/nodemailer
      const nodemailer = require('nodemailer');

      const transporter = nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: config.from || process.env.EMAIL_FROM || 'noreply@ampvendingmachines.com',
        to: config.to,
        subject: config.subject,
        html: config.html,
      });

      return {
        success: true,
        messageId: info.messageId
      };
    } catch (error) {
      console.error('Nodemailer email failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'SMTP email failed'
      };
    }
  }

  /**
   * Fallback when no email service is configured
   */
  private sendEmailFallback(config: EmailConfig): EmailResponse {
    console.log('\n⚠️ =====================================');
    console.log('⚠️ EMAIL FALLBACK MODE (NO SERVICE CONFIGURED)');
    console.log('⚠️ =====================================');
    console.log('⚠️ To:', config.to);
    console.log('⚠️ Subject:', config.subject);
    console.log('⚠️ Configure an email service for production!');
    console.log('⚠️ =====================================\n');
    
    return {
      success: true,
      messageId: `fallback-${Date.now()}`
    };
  }

  /**
   * Send contact form email
   */
  async sendContactFormEmail(data: any): Promise<EmailResponse> {
    const html = this.generateContactFormHTML(data);
    
    return this.sendEmail({
      to: 'ampdesignandconsulting@gmail.com',
      subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
      html,
    });
  }

  /**
   * Send feedback form email
   */
  async sendFeedbackEmail(data: any): Promise<EmailResponse> {
    const html = this.generateFeedbackHTML(data);
    
    return this.sendEmail({
      to: 'ampdesignandconsulting@gmail.com',
      subject: `New Feedback: ${data.category} from ${data.name}`,
      html,
    });
  }

  /**
   * Generate HTML for contact form emails
   */
  private generateContactFormHTML(data: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #FD5A1E; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #FD5A1E; }
          .footer { background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>AMP Vending Website</p>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="label">Name:</span> ${data.firstName} ${data.lastName}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${data.email}
            </div>
            ${data.phone ? `<div class="field"><span class="label">Phone:</span> ${data.phone}</div>` : ''}
            <div class="field">
              <span class="label">Company:</span> ${data.companyName}
            </div>
            ${data.message ? `
              <div class="field">
                <span class="label">Message:</span><br>
                <p style="background: white; padding: 15px; border-left: 4px solid #FD5A1E; margin: 10px 0;">${data.message}</p>
              </div>
            ` : ''}
          </div>
          
          <div class="footer">
            <p>Submitted from AMP Vending website on ${new Date().toLocaleString()}</p>
            <p>AMP Vending | 4120 Dale Rd ste j8 1005, Modesto, CA 95354</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generate HTML for feedback emails
   */
  private generateFeedbackHTML(data: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Feedback Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #FD5A1E; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #FD5A1E; }
          .category { background-color: #FD5A1E; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; }
          .footer { background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Feedback Received</h1>
            <span class="category">${data.category}</span>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="label">Name:</span> ${data.name}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${data.email}
            </div>
            <div class="field">
              <span class="label">Category:</span> ${data.category}
            </div>
            ${data.locationName ? `<div class="field"><span class="label">Location:</span> ${data.locationName}</div>` : ''}
            
            <div class="field">
              <span class="label">Message:</span><br>
              <p style="background: white; padding: 15px; border-left: 4px solid #FD5A1E; margin: 10px 0; white-space: pre-line;">${data.message}</p>
            </div>
          </div>
          
          <div class="footer">
            <p>Feedback submitted from AMP Vending website on ${new Date().toLocaleString()}</p>
            <p>Contact consent: ${data.contactConsent ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance();