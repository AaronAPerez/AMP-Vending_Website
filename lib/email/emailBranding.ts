/**
 * Updated Professional Email Templates for AMP Vending
 * Consistent branding and professional appearance across all communications
 */

import { BusinessInfo, ReviewEmailData, ReviewCustomer } from '../types/review';

// Brand Constants
export const BRAND_COLORS = {
  primary: '#FD5A1E',      // AMP Orange
  secondary: '#F5F5F5',    // Light Gray
  dark: '#000000',         // Black
  accent: '#4d4d4d',       // Dark Gray
  success: '#22c55e',      // Green
  warning: '#eab308',      // Yellow
  error: '#ef4444'         // Red
} as const;

export const BUSINESS_INFO: BusinessInfo = {
  name: 'AMP Vending',
  legalName: 'AMP Design and Consulting LLC',
  address: {
    street: '4120 Dale Rd Ste J8 1005',
    city: 'Modesto',
    state: 'CA',
    zipCode: '95354'
  },
  phone: '(209) 403-5450',
  email: 'ampdesignandconsulting@gmail.com',
  website: 'https://www.ampvendingmachines.com',
  logo: 'https://www.ampvendingmachines.com/images/logo/AMP_logo.png',
  socialMedia: {
    // Add when available
    // facebook: 'https://facebook.com/ampvending',
    // linkedin: 'https://linkedin.com/company/amp-vending'
  }
};

/**
 * Base Email Template with Professional Branding
 */
export const generateEmailHTML = (
  content: string,
  preheader?: string,
  ctaButton?: { text: string; url: string; color?: string }
): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <title>${BUSINESS_INFO.name}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            outline: none;
            text-decoration: none;
        }
        
        /* Base styles */
        body {
            margin: 0 !important;
            padding: 0 !important;
            background-color: #f4f4f4;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        /* Header styles */
        .header {
            background: linear-gradient(135deg, ${BRAND_COLORS.dark} 0%, ${BRAND_COLORS.accent} 100%);
            padding: 30px 20px;
            text-align: center;
        }
        
        .logo {
            max-width: 150px;
            height: auto;
        }
        
        /* Content styles */
        .content {
            padding: 40px 30px;
            line-height: 1.6;
            color: #333333;
        }
        
        .content h1 {
            color: ${BRAND_COLORS.dark};
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 20px 0;
            line-height: 1.2;
        }
        
        .content h2 {
            color: ${BRAND_COLORS.primary};
            font-size: 22px;
            font-weight: 600;
            margin: 30px 0 15px 0;
        }
        
        .content p {
            margin: 0 0 16px 0;
            font-size: 16px;
            color: #555555;
        }
        
        /* CTA Button */
        .cta-container {
            text-align: center;
            margin: 30px 0;
        }
        
        .cta-button {
            display: inline-block;
            padding: 16px 32px;
            background-color: ${BRAND_COLORS.primary};
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: background-color 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .cta-button:hover {
            background-color: #e54d1a;
        }
        
        /* Info boxes */
        .info-box {
            background-color: #f8f9fa;
            border-left: 4px solid ${BRAND_COLORS.primary};
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        
        /* Footer */
        .footer {
            background-color: ${BRAND_COLORS.dark};
            color: ${BRAND_COLORS.secondary};
            padding: 30px 20px;
            text-align: center;
        }
        
        .footer p {
            margin: 8px 0;
            font-size: 14px;
            color: #cccccc;
        }
        
        .footer a {
            color: ${BRAND_COLORS.primary};
            text-decoration: none;
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        .contact-info {
            margin: 20px 0;
        }
        
        .contact-info a {
            color: ${BRAND_COLORS.primary};
            text-decoration: none;
            font-weight: 600;
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            
            .content {
                padding: 30px 20px !important;
            }
            
            .content h1 {
                font-size: 24px !important;
            }
            
            .cta-button {
                padding: 14px 24px !important;
                font-size: 15px !important;
            }
        }
    </style>
</head>
<body>
    ${preheader ? `
    <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #ffffff;">
        ${preheader}
    </div>
    ` : ''}
    
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <img src="${BUSINESS_INFO.logo}" alt="${BUSINESS_INFO.name}" class="logo">
        </div>
        
        <!-- Content -->
        <div class="content">
            ${content}
            
            ${ctaButton ? `
            <div class="cta-container">
                <a href="${ctaButton.url}" class="cta-button" style="background-color: ${ctaButton.color || BRAND_COLORS.primary};">
                    ${ctaButton.text}
                </a>
            </div>
            ` : ''}
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="contact-info">
                <p><strong>${BUSINESS_INFO.name}</strong></p>
                <p>${BUSINESS_INFO.address.street}<br>
                ${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state} ${BUSINESS_INFO.address.zipCode}</p>
                
                <p>📞 <a href="tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}">${BUSINESS_INFO.phone}</a></p>
                <p>✉️ <a href="mailto:${BUSINESS_INFO.email}">${BUSINESS_INFO.email}</a></p>
                <p>🌐 <a href="${BUSINESS_INFO.website}">${BUSINESS_INFO.website}</a></p>
            </div>
            
            <p style="margin-top: 30px; font-size: 12px; color: #999999;">
                © ${new Date().getFullYear()} ${BUSINESS_INFO.legalName}. All rights reserved.<br>
                Premium Vending Solutions for Modern Workplaces
            </p>
            
            <p style="font-size: 11px; color: #888888; margin-top: 20px;">
                You received this email because you are a valued customer of ${BUSINESS_INFO.name}.<br>
                <a href="{{unsubscribe_link}}" style="color: #888888;">Unsubscribe</a> | 
                <a href="${BUSINESS_INFO.website}/privacy" style="color: #888888;">Privacy Policy</a>
            </p>
        </div>
    </div>
</body>
</html>`;
};

/**
 * Contact Form Confirmation Email (Updated)
 */
export const generateContactConfirmationEmail = (customerData: any): string => {
  const content = `
    <h1>Thank You for Contacting AMP Vending!</h1>
    
    <p>Dear ${customerData.firstName} ${customerData.lastName},</p>
    
    <p>Thank you for your interest in our premium vending solutions! We've received your inquiry and one of our vending specialists will contact you within <strong>24 hours</strong>.</p>
    
    <div class="info-box">
        <h2>📋 Your Inquiry Details</h2>
        <p><strong>Name:</strong> ${customerData.firstName} ${customerData.lastName}</p>
        <p><strong>Company:</strong> ${customerData.companyName}</p>
        <p><strong>Email:</strong> ${customerData.email}</p>
        ${customerData.phone ? `<p><strong>Phone:</strong> ${customerData.phone}</p>` : ''}
        ${customerData.message ? `<p><strong>Message:</strong><br>${customerData.message}</p>` : ''}
    </div>
    
    <h2>🚀 What Happens Next?</h2>
    <p>Our team will:</p>
    <ul>
        <li>Review your specific workplace needs</li>
        <li>Recommend the best vending machine solution</li>
        <li>Provide a detailed proposal with pricing</li>
        <li>Schedule a free on-site consultation if needed</li>
    </ul>
    
    <h2>⭐ Why Choose AMP Vending?</h2>
    <ul>
        <li><strong>Advanced Technology:</strong> 21.5" touchscreen interfaces</li>
        <li><strong>Multiple Payment Options:</strong> Credit cards, mobile payments, cash</li>
        <li><strong>Professional Service:</strong> Complete installation and maintenance</li>
        <li><strong>Local Expertise:</strong> Serving Central California businesses</li>
    </ul>
    
    <p>Have questions in the meantime? Don't hesitate to call us at <strong>${BUSINESS_INFO.phone}</strong>.</p>
    
    <p>Best regards,<br>
    <strong>The AMP Vending Team</strong><br>
    <em>Premium Vending Solutions for Modern Workplaces</em></p>
  `;

  return generateEmailHTML(
    content,
    `Thank you for contacting AMP Vending! We'll respond within 24 hours.`,
    {
      text: 'View Our Vending Machines',
      url: `${BUSINESS_INFO.website}/vending-machines`
    }
  );
};

/**
 * Feedback Confirmation Email (Updated)
 */
export const generateFeedbackConfirmationEmail = (feedbackData: any): string => {
  const categoryEmojis = {
    'Question': '❓',
    'Suggestion': '💡',
    'Compliment': '👏',
    'Complaint': '⚠️',
    'Technical Issue': '🔧',
    'Product Request': '📦'
  };

  const content = `
    <h1>Thank You for Your Feedback!</h1>
    
    <p>Dear ${feedbackData.name},</p>
    
    <p>We sincerely appreciate you taking the time to share your feedback with us. Your input helps us continuously improve our vending solutions and service quality.</p>
    
    <div class="info-box">
        <h2>${categoryEmojis[feedbackData.category] || '📝'} Your Feedback Summary</h2>
        <p><strong>Category:</strong> ${feedbackData.category}</p>
        ${feedbackData.locationName ? `<p><strong>Location:</strong> ${feedbackData.locationName}</p>` : ''}
        <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
    </div>
    
    <h2>🎯 Our Response Commitment</h2>
    <p>We will:</p>
    <ul>
        <li><strong>Review your feedback within 24 hours</strong></li>
        <li>Respond personally within <strong>48 hours</strong></li>
        <li>Take appropriate action to address your concerns</li>
        <li>Follow up to ensure your satisfaction</li>
    </ul>
    
    <p>Your feedback directly contributes to:</p>
    <ul>
        <li>Improving our vending machine technology</li>
        <li>Enhancing our customer service</li>
        <li>Expanding our product offerings</li>
        <li>Better serving the Central California business community</li>
    </ul>
    
    <p>If you need immediate assistance, please don't hesitate to call us at <strong>${BUSINESS_INFO.phone}</strong>.</p>
    
    <p>Thank you for helping us serve you better!</p>
    
    <p>Best regards,<br>
    <strong>The AMP Vending Team</strong><br>
    <em>Your feedback matters to us</em></p>
  `;

  return generateEmailHTML(
    content,
    `Thank you for your feedback! We'll respond within 48 hours.`,
    {
      text: 'Visit Our Website',
      url: BUSINESS_INFO.website
    }
  );
};

/**
 * Review Request Email Templates
 */
export const generateReviewRequestEmail = (data: ReviewEmailData): string => {
  const { customer, reviewLink } = data;
  
  const serviceEmojis = {
    'installation': '🔧',
    'maintenance': '⚙️',
    'consultation': '💬',
    'repair': '🛠️',
    'restocking': '📦',
    'upgrade': '⬆️',
    'training': '🎓'
  };

  const content = `
    <h1>How was your experience with AMP Vending?</h1>
    
    <p>Hi ${customer.firstName},</p>
    
    <p>Thank you for choosing AMP Vending for your recent ${customer.serviceType}! We hope everything is working perfectly and meeting your expectations.</p>
    
    <p>Your opinion matters to us and helps other businesses discover our services. If you had a positive experience, would you mind taking just <strong>2 minutes</strong> to share a quick review?</p>
    
    <div class="info-box">
        <h2>${serviceEmojis[customer.serviceType] || '⭐'} Share Your Experience</h2>
        <p>Your honest feedback helps other businesses in Central California make informed decisions about their vending needs.</p>
    </div>
    
    <p><strong>Why your review matters:</strong></p>
    <ul>
        <li>Helps other businesses find quality vending solutions</li>
        <li>Supports our local, family-owned business</li>
        <li>Guides our continuous improvement efforts</li>
        <li>Takes less than 2 minutes to complete</li>
    </ul>
    
    <p>We're committed to providing exceptional service to every customer, and your feedback helps us maintain our high standards.</p>
    
    <p>Thank you for your time and for choosing AMP Vending!</p>
    
    <p>Best regards,<br>
    <strong>The AMP Vending Team</strong><br>
    <em>Premium Vending Solutions for Modern Workplaces</em></p>
  `;

  return generateEmailHTML(
    content,
    `Quick favor: Share your AMP Vending experience`,
    {
      text: '⭐ Leave a Quick Review',
      url: reviewLink,
      color: BRAND_COLORS.success
    }
  );
};

/**
 * Follow-up Review Request Email
 */
export const generateFollowUpReviewEmail = (data: ReviewEmailData): string => {
  const { customer, reviewLink } = data;
  
  const content = `
    <h1>Quick Follow-up: Your AMP Vending Review</h1>
    
    <p>Hi ${customer.firstName},</p>
    
    <p>We hope your vending machine is still serving your team well! A few weeks ago, we reached out about sharing your experience with AMP Vending.</p>
    
    <p>If you haven't had a chance yet, we'd still greatly appreciate your feedback. Your review helps other businesses in Central California discover our services and helps us continue improving.</p>
    
    <div class="info-box">
        <h2>⏰ Just 2 Minutes</h2>
        <p>A quick review on Google helps our small business grow and serves as a guide for other companies considering vending solutions.</p>
    </div>
    
    <p><strong>What makes your review valuable:</strong></p>
    <ul>
        <li>Real experiences from actual business customers</li>
        <li>Honest feedback about our service quality</li>
        <li>Insights about our vending machine performance</li>
        <li>Support for a local Central California business</li>
    </ul>
    
    <p>If you experienced any issues or have suggestions for improvement, we'd love to hear about those too. Your honest feedback - positive or constructive - helps us serve all our customers better.</p>
    
    <p>Thank you for considering this request!</p>
    
    <p>Best regards,<br>
    <strong>The AMP Vending Team</strong></p>
  `;

  return generateEmailHTML(
    content,
    `Final reminder: Share your AMP Vending experience`,
    {
      text: '⭐ Leave Your Review',
      url: reviewLink,
      color: BRAND_COLORS.success
    }
  );
};

/**
 * Thank You for Review Email
 */
export const generateReviewThankYouEmail = (customer: ReviewCustomer, rating: number): string => {
  const content = `
    <h1>Thank You for Your Review! ⭐</h1>
    
    <p>Hi ${customer.firstName},</p>
    
    <p>Thank you so much for taking the time to leave us a ${rating}-star review! Your feedback means the world to our team and helps other businesses in Central California discover our vending solutions.</p>
    
    ${rating >= 4 ? `
    <div class="info-box">
        <h2>🙏 We're Thrilled!</h2>
        <p>Your positive review not only makes our day but also helps other businesses find quality vending solutions. Thank you for supporting our local business!</p>
    </div>
    ` : `
    <div class="info-box">
        <h2>🔧 We're Listening</h2>
        <p>Thank you for your honest feedback. We take all reviews seriously and are committed to addressing your concerns and improving our service.</p>
    </div>
    `}
    
    <p><strong>How your review helps:</strong></p>
    <ul>
        <li>Guides other businesses in making informed decisions</li>
        <li>Helps us identify areas for improvement</li>
        <li>Supports our team's dedication to excellence</li>
        <li>Strengthens our local business community</li>
    </ul>
    
    ${rating < 4 ? `
    <p>We'd love the opportunity to make things right. Please don't hesitate to contact us directly at <strong>${BUSINESS_INFO.phone}</strong> so we can address any concerns and improve your experience.</p>
    ` : `
    <p>We're honored to serve your vending needs and look forward to continuing our partnership. If you ever need additional machines, upgrades, or have friends who could benefit from our services, we're here to help!</p>
    `}
    
    <p>Thank you again for choosing AMP Vending and for taking the time to share your experience.</p>
    
    <p>Best regards,<br>
    <strong>The AMP Vending Team</strong><br>
    <em>Grateful for customers like you</em></p>
  `;

  return generateEmailHTML(
    content,
    `Thank you for your ${rating}-star review!`,
    rating >= 4 ? {
      text: 'Refer a Friend',
      url: `${BUSINESS_INFO.website}/contact?ref=review`
    } : {
      text: 'Contact Our Team',
      url: `${BUSINESS_INFO.website}/contact?ref=feedback`
    }
  );
};

/**
 * Internal Notification Emails
 */

export const generateContactNotificationEmail = (customerData: any): string => {
  const content = `
    <h1>🔔 New Contact Form Submission</h1>
    
    <div class="info-box">
        <h2>Customer Information</h2>
        <p><strong>Name:</strong> ${customerData.firstName} ${customerData.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${customerData.email}">${customerData.email}</a></p>
        <p><strong>Company:</strong> ${customerData.companyName}</p>
        ${customerData.phone ? `<p><strong>Phone:</strong> <a href="tel:${customerData.phone.replace(/[^0-9]/g, '')}">${customerData.phone}</a></p>` : ''}
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    </div>
    
    ${customerData.message ? `
    <h2>💬 Customer Message</h2>
    <div class="info-box">
        <p>${customerData.message}</p>
    </div>
    ` : ''}
    
    <h2>📋 Recommended Actions</h2>
    <ul>
        <li>Respond within 24 hours</li>
        <li>Schedule consultation if appropriate</li>
        <li>Prepare customized proposal</li>
        <li>Add to CRM system</li>
    </ul>
    
    <p><strong>Response Template Suggestions:</strong></p>
    <ul>
        <li>Thank them for their interest</li>
        <li>Ask about specific needs and timeline</li>
        <li>Offer free consultation</li>
        <li>Provide relevant case studies</li>
    </ul>
  `;

  return generateEmailHTML(
    content,
    `New contact form submission from ${customerData.firstName} ${customerData.lastName}`,
    {
      text: 'Reply to Customer',
      url: `mailto:${customerData.email}?subject=Re: Your AMP Vending Inquiry`
    }
  );
};

export const generateFeedbackNotificationEmail = (feedbackData: any): string => {
  const urgencyColors = {
    'Complaint': BRAND_COLORS.error,
    'Technical Issue': BRAND_COLORS.warning,
    'Question': BRAND_COLORS.primary,
    'Suggestion': BRAND_COLORS.success,
    'Compliment': BRAND_COLORS.success,
    'Product Request': BRAND_COLORS.primary
  };

  const content = `
    <h1>📝 New Feedback Received</h1>
    
    <div class="info-box" style="border-left-color: ${urgencyColors[feedbackData.category]};">
        <h2>Feedback Details</h2>
        <p><strong>From:</strong> ${feedbackData.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${feedbackData.email}">${feedbackData.email}</a></p>
        <p><strong>Category:</strong> <span style="color: ${urgencyColors[feedbackData.category]}; font-weight: bold;">${feedbackData.category}</span></p>
        ${feedbackData.locationName ? `<p><strong>Location:</strong> ${feedbackData.locationName}</p>` : ''}
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    </div>
    
    <h2>💬 Customer Message</h2>
    <div class="info-box">
        <p>${feedbackData.message}</p>
    </div>
    
    <h2>⚡ Priority Level</h2>
    <p>Based on the category "<strong>${feedbackData.category}</strong>", this feedback should be addressed with 
    ${feedbackData.category === 'Complaint' || feedbackData.category === 'Technical Issue' ? '<strong style="color: ' + BRAND_COLORS.error + ';">HIGH PRIORITY</strong>' : 
      feedbackData.category === 'Question' ? '<strong style="color: ' + BRAND_COLORS.warning + ';">MEDIUM PRIORITY</strong>' : 
      '<strong style="color: ' + BRAND_COLORS.success + ';">STANDARD PRIORITY</strong>'}</p>
    
    <h2>📋 Recommended Response Actions</h2>
    <ul>
        ${feedbackData.category === 'Complaint' ? '<li><strong>Immediate response required</strong> - Contact within 4 hours</li>' : ''}
        ${feedbackData.category === 'Technical Issue' ? '<li><strong>Technical assessment needed</strong> - Schedule service call</li>' : ''}
        <li>Send personalized response acknowledging their feedback</li>
        <li>Address specific concerns mentioned</li>
        <li>Follow up within 48-72 hours to ensure satisfaction</li>
        <li>Document feedback for service improvement tracking</li>
    </ul>
    
    ${feedbackData.contactConsent ? `
    <p><strong>✅ Customer consented to follow-up contact</strong></p>
    ` : `
    <p><strong>⚠️ Customer did not explicitly consent to follow-up</strong> - Use judgment on response approach</p>
    `}
  `;

  return generateEmailHTML(
    content,
    `${feedbackData.category} feedback from ${feedbackData.name} - Action required`,
    {
      text: 'Reply to Customer',
      url: `mailto:${feedbackData.email}?subject=Re: Your AMP Vending Feedback`,
      color: urgencyColors[feedbackData.category]
    }
  );
};

/**
 * Text-only versions for better deliverability
 */
export const generateTextEmail = (
  customerName: string,
  content: string,
  ctaText?: string,
  ctaUrl?: string
): string => {
  return `
${BUSINESS_INFO.name}
Premium Vending Solutions for Modern Workplaces

---

${content}

${ctaText && ctaUrl ? `
${ctaText}: ${ctaUrl}

` : ''}

Best regards,
The AMP Vending Team

---

${BUSINESS_INFO.name}
${BUSINESS_INFO.address.street}
${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state} ${BUSINESS_INFO.address.zipCode}

Phone: ${BUSINESS_INFO.phone}
Email: ${BUSINESS_INFO.email}
Website: ${BUSINESS_INFO.website}

© ${new Date().getFullYear()} ${BUSINESS_INFO.legalName}. All rights reserved.

Unsubscribe: {{unsubscribe_link}}
Privacy Policy: ${BUSINESS_INFO.website}/privacy
  `.trim();
};

/**
 * Email Template Utility Functions
 */
export const replaceVariables = (template: string, variables: Record<string, string>): string => {
  let result = template;
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  });
  return result;
};

export const validateEmailTemplate = (template: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Check for required elements
  if (!template.includes('{{customer_name}}')) {
    errors.push('Template must include {{customer_name}} variable');
  }
  
  if (!template.includes('{{unsubscribe_link}}')) {
    errors.push('Template must include {{unsubscribe_link}} for compliance');
  }
  
  // Check for basic HTML structure in HTML templates
  if (template.includes('<html>') && !template.includes('</html>')) {
    errors.push('HTML template is missing closing tags');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Export all template generators
 */
export const emailTemplates = {
  contactConfirmation: generateContactConfirmationEmail,
  feedbackConfirmation: generateFeedbackConfirmationEmail,
  reviewRequest: generateReviewRequestEmail,
  reviewFollowUp: generateFollowUpReviewEmail,
  reviewThankYou: generateReviewThankYouEmail,
  contactNotification: generateContactNotificationEmail,
  feedbackNotification: generateFeedbackNotificationEmail,
  textEmail: generateTextEmail
};

export const emailUtils = {
  replaceVariables,
  validateEmailTemplate,
  generateEmailHTML
};