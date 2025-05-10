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
   * Sends both admin notification and user confirmation
   */
  async sendContactFormEmail(data: ContactFormData): Promise<boolean> {
    try {
      // Format the email content for admin
      const adminEmailContent = this.formatContactEmail(data);
      
      // Format the confirmation email for user
      const userEmailContent = this.formatContactConfirmationEmail(data);
      
      // Split multiple recipient emails if present
      const toEmails = (process.env.TO_EMAIL || 'contact@ampvendingmachines.com').split(',').map(email => email.trim());
      
      // Send notification to admin
      const adminEmailSent = await this.sendEmail({
        to: toEmails,
        subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
        html: adminEmailContent.html,
        text: adminEmailContent.text,
        replyTo: data.email
      });
      
      // Send confirmation to user
      await this.sendEmail({
        to: data.email,
        subject: 'Thank you for contacting AMP Vending',
        html: userEmailContent.html,
        text: userEmailContent.text
      });
      
      return adminEmailSent;
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
   * Format contact form data into email content for admin notification
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
   * Format confirmation email for contact form submissions
   */
  private formatContactConfirmationEmail(data: ContactFormData): { text: string; html: string } {

    // Plain text version
    const text = `
Thank You for Contacting AMP Vending

Dear ${data.firstName} ${data.lastName},

Thank you for your interest in AMP Vending's premium vending machine solutions. We've received your request and our team will review your information promptly.

Here's a summary of what you shared with us:
- Company: ${data.companyName}
${data.message ? `- Your message: "${data.message}"` : ''}

What happens next?
Our team will contact you within 1-2 business days using your preferred contact method (${data.preferredContact}). We'll discuss your specific workplace needs and provide more information about how our zero-cost, maintenance-free vending solutions can benefit your business.

In the meantime, you can learn more about our vending solutions by visiting our website at https://www.ampvendingmachines.com/vending-machines

If you have any urgent questions, please contact us at:
- Phone: (209) 403-5450
- Email: ampdesignandconsulting@gmail.com

Thank you for considering AMP Vending for your workplace refreshment needs. We look forward to speaking with you soon!

Best regards,

Andrew Perez
AMP Vending
(209) 403-5450
ampdesignandconsulting@gmail.com
    `;
    
    // HTML version
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Thank You for Contacting AMP Vending</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #000000;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      color: #F5F5F5;
      margin: 0;
    }
    .content {
      padding: 20px;
      background-color: #F5F5F5;
    }
    .footer {
      background-color: #4d4d4d;
      color: #F5F5F5;
      padding: 20px;
      text-align: center;
      font-size: 14px;
    }
    .cta-button {
      display: inline-block;
      background-color: #FD5A1E;
      color: #F5F5F5;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 50px;
      margin: 20px 0;
      font-weight: bold;
    }
    .summary-box {
      background-color: #F5F5F5;
      border-left: 4px solid #FD5A1E;
      padding: 15px;
      margin: 20px 0;
    }
    .contact-info {
      margin-top: 20px;
      padding: 15px;
      background-color: #F5F5F5;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Contacting AMP Vending</h1>
    </div>
    
    <div class="content">
      <p>Dear ${data.firstName} ${data.lastName},</p>
      
      <p>Thank you for your interest in AMP Vending's premium vending solutions. We've received your request and our team will review your information promptly.</p>
      
      <div class="summary-box">
        <h3>Here's a summary of what you shared with us:</h3>
        <p><strong>Company:</strong> ${data.companyName}</p>
        ${data.message ? `<p><strong>Your message:</strong> "${data.message}"</p>` : ''}
      </div>
      
      <h3>What happens next?</h3>
      <p>Our team will contact you within 1-2 business days using your preferred contact method (${data.preferredContact}). We'll discuss your specific workplace needs and provide more information about how our zero-cost, maintenance-free vending solutions can benefit your business.</p>
      
      <div style="text-align: center;">
        <a href="https://www.ampvendingmachines.com/vending-machines" class="cta-button">View Our Vending Machines</a>
      </div>
      
      <div class="contact-info">
        <h3>Have urgent questions?</h3>
        <p>Please contact us at:</p>
        <p><strong>Phone:</strong> <a href="tel:+12094035450">(209) 403-5450</a></p>
        <p><strong>Email:</strong> <a href="mailto:ampdesignandconsulting@gmail.com">ampdesignandconsulting@gmail.com</a></p>
      </div>
      
      <p>Thank you for considering AMP Vending for your workplace refreshment needs. We look forward to speaking with you soon!</p>
      
      <p>Best regards,</p>
      <p>
        <strong>Andrew Perez</strong><br>
        AMP Vending<br>
        (209) 403-5450<br>
        <a href="mailto:ampdesignandconsulting@gmail.com">ampdesignandconsulting@gmail.com</a>
      </p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} AMP Vending Solutions. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
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
   * Helper function to get a user-friendly machine name from machine ID
   */
  private getMachineNameFromId(machineId: string): string {
    const machineMap: Record<string, string> = {
      'km-vmrt-50-b': 'Premium Refrigerated Machine (KM-VMRT-50-B)',
      'km-vmr-40-b': 'Standard Refrigerated Machine (KM-VMR-40-B)',
      'km-vmr-30-b': 'Compact Refrigerated Machine (KM-VMR-30-B)',
      'km-vmnt-50-b': 'Non-Refrigerated Snack Machine (KM-VMNT-50-B)',
      'unsure': 'Vending Machine Options'
    };
    
    return machineMap[machineId] || 'Our Vending Machines';
  }
  
  /**
   * Verify the email connection
   */
  async verifyConnection(): Promise<boolean> {
    try {
      // With Resend, check if the API key is present
      return !!process.env.RESEND_API_KEY;
    } catch (error) {
      console.error('Email Connection Error:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();