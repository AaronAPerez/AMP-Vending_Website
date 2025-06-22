// lib/email/emailTemplates.ts
export const BUSINESS_INFO = {
  name: 'AMP Vending',
  phone: '(209) 403-5450',
  email: 'ampdesignandconsulting@gmail.com',
  website: 'https://www.ampvendingmachines.com',
  address: '4120 Dale Rd Ste J8 1005, Modesto, CA 95354',
  googleReviewUrl: process.env.GOOGLE_REVIEW_URL
};

// if [ ! -f "lib/email/emailTemplates.ts" ]; then
// cat > lib/email/emailTemplates.ts << 'EOF'
/**
 * Basic Email Templates
 */

export const emailTemplates = {
  contactConfirmation: (data: any) => {
    return `
      <h1>Thank you for contacting AMP Vending!</h1>
      <p>Dear ${data.firstName},</p>
      <p>We have received your inquiry and will respond within 24 hours.</p>
      <p>Best regards,<br>AMP Vending Team</p>
    `;
  },

  feedbackConfirmation: (data: any) => {
    return `
      <h1>Thank you for your feedback!</h1>
      <p>Dear ${data.name},</p>
      <p>We appreciate your ${data.category.toLowerCase()} and will respond within 48 hours.</p>
      <p>Best regards,<br>AMP Vending Team</p>
    `;
  },

  contactNotification: (data: any) => {
    return `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.companyName}</p>
      ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
    `;
  },

  feedbackNotification: (data: any) => {
    return `
      <h1>New Feedback Received</h1>
      <p><strong>From:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Category:</strong> ${data.category}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `;
  }
};