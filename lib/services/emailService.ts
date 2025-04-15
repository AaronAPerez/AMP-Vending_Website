import nodemailer from 'nodemailer';
import { ContactFormData } from '../schema/contactFormSchema';

/**
 * Email service for sending contact form submissions
 */
export class EmailService {
  private transporter: nodemailer.Transporter;
  
  constructor() {
    // Initialize transporter with environment variables
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: parseInt(process.env.SMTP_PORT || '587') === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  
  /**
   * Sends contact form data to the specified recipient
   */
  async sendContactFormEmail(data: ContactFormData): Promise<boolean> {
    try {
      // Format the email content
      const emailContent = this.formatContactEmail(data);
      
      // Send the email
      const info = await this.transporter.sendMail({
        from: `"AMP Vending Website" <${process.env.SMTP_FROM}>`,
        to: process.env.SMTP_TO,
        subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
        text: emailContent.text,
        html: emailContent.html,
      });
      
      console.log(`Message sent: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
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
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
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
<p>${data.message || 'No additional message provided.'}</p>
    `;
    
    return { text, html };
  }
  
  /**
   * Verify the SMTP connection
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('SMTP Connection Error:', error);
      return false;
    }
  }
}

// Export a singleton instance of the email service
export const emailService = new EmailService();