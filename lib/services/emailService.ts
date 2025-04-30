import { Resend } from 'resend';
import { ContactFormData } from '../schema/contactFormSchema';
import type { FeedbackFormData } from '../schema/feedbackFormSchema';

// Common email parameters
interface EmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
}

export class EmailService {
  private resend: Resend;
  
  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  /**
   * Generic method to send emails with any parameters
   */
  async sendEmail(params: EmailParams): Promise<boolean> {
    try {
      // Handle to field - could be string or array of strings
      const toEmails = typeof params.to === 'string' 
        ? params.to.split(',').map(email => email.trim())
        : params.to;
      
      // Send the email using Resend
      const result = await this.resend.emails.send({
        from: params.from || `AMP Vending <${process.env.FROM_EMAIL || 'contact@ampvendingmachines.com'}>`,
        to: toEmails,
        subject: params.subject,
        html: params.html,
        text: params.text,
        replyTo: params.replyTo
      });
      
      console.log('Email sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
  
  /**
   * Send an email for contact form submissions
   */
  async sendContactFormEmail(data: ContactFormData): Promise<boolean> {
    try {
      // Format the email content
      const emailContent = this.formatContactEmail(data);
      
      // Split multiple recipient emails if present
      const toEmails = (process.env.TO_EMAIL || 'contact@ampvendingmachines.com').split(',').map(email => email.trim());
      
      return await this.sendEmail({
        to: toEmails,
        subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
        html: emailContent.html,
        text: emailContent.text,
        replyTo: data.email
      });
    } catch (error) {
      console.error('Error sending contact form email:', error);
      throw new Error('Failed to send contact form email');
    }
  }

  /**
   * Send an email for feedback form submissions
   */
  async sendFeedbackEmail(data: FeedbackFormData): Promise<boolean> {
    try {
      // Format the email content
      const emailContent = this.formatFeedbackEmail(data);
      
      // Split multiple recipient emails if present
      const toEmails = (process.env.TO_EMAIL || 'contact@ampvendingmachines.com').split(',').map(email => email.trim());
      
      // Send email to admin
      const adminEmailSent = await this.sendEmail({
        to: toEmails,
        subject: `New Feedback: ${data.category} from ${data.name}`,
        html: emailContent.adminHtml,
        text: emailContent.adminText,
        replyTo: data.email
      });
      
      // Send confirmation email to user if they've consented
      if (data.contactConsent) {
        await this.sendEmail({
          to: data.email,
          subject: 'Thank you for your feedback - AMP Vending',
          html: emailContent.userHtml || '',
          text: emailContent.userText
        });
      }
      
      return adminEmailSent;
    } catch (error) {
      console.error('Error sending feedback email:', error);
      throw new Error('Failed to send feedback email');
    }
  }
  
  /**
   * Format contact form data into email content
   */
  private formatContactEmail(data: ContactFormData): { text: string; html: string } {
    // Plain text version
    const text = `
New Contact Form Submission

PERSONAL INFORMATION
------------------
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Preferred Contact Method: ${data.preferredContact}

COMPANY INFORMATION
-----------------
Company Name: ${data.companyName}
Job Title: ${data.jobTitle || 'Not provided'}
Employee Count: ${data.employeeCount}

WORKPLACE ADDRESS
--------------
Street Address: ${data.streetAddress}
City: ${data.city}
State: ${data.state}
ZIP Code: ${data.zipCode}

VENDING MACHINE INTEREST
---------------------
Interested Machine: ${data.interestedMachine}

MESSAGE
------
${data.message || 'No additional message provided.'}
    `;
    
    // HTML version
    const html = `
<h1>New Contact Form Submission</h1>

<h2>Personal Information</h2>
<p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
<p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
<p><strong>Phone:</strong> ${data.phone ? `<a href="tel:${data.phone}">${data.phone}</a>` : 'Not provided'}</p>
<p><strong>Preferred Contact Method:</strong> ${data.preferredContact}</p>

<h2>Company Information</h2>
<p><strong>Company Name:</strong> ${data.companyName}</p>
<p><strong>Job Title:</strong> ${data.jobTitle || 'Not provided'}</p>
<p><strong>Employee Count:</strong> ${data.employeeCount}</p>

<h2>Workplace Address</h2>
<p><strong>Street Address:</strong> ${data.streetAddress}</p>
<p><strong>City:</strong> ${data.city}</p>
<p><strong>State:</strong> ${data.state}</p>
<p><strong>ZIP Code:</strong> ${data.zipCode}</p>

<h2>Vending Machine Interest</h2>
<p><strong>Interested Machine:</strong> ${data.interestedMachine}</p>

<h2>Message</h2>
<p>${data.message ? data.message.replace(/\n/g, '<br>') : 'No additional message provided.'}</p>
    `;
    
    return { text, html };
  }
  
  /**
   * Format feedback form data into email content for admin and user
   */
  private formatFeedbackEmail(data: FeedbackFormData): { 
    adminHtml: string; 
    adminText: string;
    userHtml?: string;
    userText?: string;
  } {
    // Admin plain text version
    const adminText = `
New Feedback Submission

FEEDBACK DETAILS
--------------
Category: ${data.category}
From: ${data.name} (${data.email})
${data.locationName ? `Location: ${data.locationName}` : ''}
${data.machineId ? `Machine ID: ${data.machineId}` : ''}
Contact Consent: ${data.contactConsent ? 'Yes' : 'No'}

MESSAGE
------
${data.message}

Submitted on ${new Date().toLocaleString()}
    `;
    
    // Admin HTML version
    const adminHtml = `
<h2>New Feedback Submission</h2>
<p><strong>Category:</strong> ${data.category}</p>
<p><strong>From:</strong> ${data.name} (<a href="mailto:${data.email}">${data.email}</a>)</p>
${data.locationName ? `<p><strong>Location:</strong> ${data.locationName}</p>` : ''}
${data.machineId ? `<p><strong>Machine ID:</strong> ${data.machineId}</p>` : ''}
<p><strong>Message:</strong></p>
<p style="background-color: #f5f5f5; padding: 12px; border-radius: 4px;">${data.message.replace(/\n/g, '<br>')}</p>
<p><strong>Contact Consent:</strong> ${data.contactConsent ? 'Yes' : 'No'}</p>
<p><em>Submitted on ${new Date().toLocaleString()}</em></p>
    `;

    // Only create user email content if they've consented to contact
    if (data.contactConsent) {
      // User plain text version
      const userText = `
Thank you for your feedback

Dear ${data.name},

We've received your ${data.category.toLowerCase()} about our vending machine service. Your input is valuable to us, and we appreciate you taking the time to share your thoughts.

Here's a copy of your message:

${data.message}

Our team will review your feedback and get back to you if necessary.

Thank you for helping us improve our vending machine services!

Best regards,
AMP Vending Team
      `;
      
      // User HTML version
      const userHtml = `
<h2>Thank you for your feedback</h2>
<p>Dear ${data.name},</p>
<p>We've received your ${data.category.toLowerCase()} about our vending machine service. Your input is valuable to us, and we appreciate you taking the time to share your thoughts.</p>
<p>Here's a copy of your message:</p>
<p style="background-color: #f5f5f5; padding: 12px; border-radius: 4px; font-style: italic;">${data.message.replace(/\n/g, '<br>')}</p>
<p>Our team will review your feedback and get back to you if necessary.</p>
<p>Thank you for helping us improve our vending machine services!</p>
<p>Best regards,<br>AMP Vending Team</p>
      `;
      
      return { adminHtml, adminText, userHtml, userText };
    }
    
    return { adminHtml, adminText };
  }
  
  /**
   * Verify the email connection
   */
  async verifyConnection(): Promise<boolean> {
    try {
      // With Resend, we can just check if the API key is present
      return !!process.env.RESEND_API_KEY;
    } catch (error) {
      console.error('Email Connection Error:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();