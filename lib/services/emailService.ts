import { Resend } from 'resend';
import { ContactFormData } from '../schema/contactFormSchema';

export class EmailService {
  private resend: Resend;
  
  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }
  
  async sendContactFormEmail(data: ContactFormData): Promise<boolean> {
    try {
      // Format the email content
      const emailContent = this.formatContactEmail(data);
      
      // Split multiple recipient emails if present
      const toEmails = (process.env.TO_EMAIL || '').split(',').map(email => email.trim());
      
      // Send the email using Resend
      const result = await this.resend.emails.send({
        from: `AMP Vending <${process.env.FROM_EMAIL || 'contact@ampvending.aaronaperez.dev'}>`,
        to: toEmails,
        subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
        html: emailContent.html,
        text: emailContent.text,
      });
      
      console.log('Email sent successfully:', result);
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