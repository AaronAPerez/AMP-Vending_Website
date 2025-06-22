// /lib/utils/reviewTemplates.ts
export const REVIEW_EMAIL_TEMPLATES = {
  installation: {
    subject: "How's your new vending machine working out?",
    template: `Hi {{customer_name}}!

Thank you for choosing AMP Vending for your vending machine installation{{#if company_name}} at {{company_name}}{{/if}}. We hope your new machine is working perfectly and your team is enjoying the convenience!

Your feedback helps other businesses make informed decisions about their workplace solutions. If you had a positive experience with our installation team and service, would you mind taking 2 minutes to share a quick review?

👉 Leave a review: {{review_link}}

Your honest feedback helps our local business grow and guides other companies in Central California who are considering vending solutions.

Thank you for your support!

Best regards,
The AMP Vending Team
(209) 403-5450
ampdesignandconsulting@gmail.com`
  },

  maintenance: {
    subject: "Thank you for trusting AMP Vending",
    template: `Hello {{customer_name}},

Thank you for trusting AMP Vending with your ongoing maintenance service{{#if company_name}} for {{company_name}}{{/if}}. We strive to provide excellent service on every visit.

If you're satisfied with our maintenance work and the performance of your vending machine, we'd greatly appreciate a review to help other businesses discover our services.

⭐ Quick review link: {{review_link}}

Your feedback helps us maintain our high service standards and assists other businesses in making informed decisions about their vending needs.

Best regards,
AMP Vending Maintenance Team`
  },

  consultation: {
    subject: "Thank you for your time with AMP Vending",
    template: `Hi {{customer_name}},

Thank you for your time during our consultation about vending solutions{{#if company_name}} for {{company_name}}{{/if}}. We hope we provided valuable insights and recommendations for your business needs.

If you found our consultation helpful and professional, a quick review would help other businesses find our services when they're researching vending solutions.

📝 Share your experience: {{review_link}}

We appreciate your consideration and look forward to serving your vending needs!

AMP Vending Team`
  }
};

export function generateReviewEmailContent(
  template: keyof typeof REVIEW_EMAIL_TEMPLATES,
  variables: Record<string, string>
): { subject: string; content: string } {
  const emailTemplate = REVIEW_EMAIL_TEMPLATES[template];
  
  let subject = emailTemplate.subject;
  let content = emailTemplate.template;

  // Replace variables in both subject and content
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    subject = subject.replace(regex, value);
    content = content.replace(regex, value);
  });

  // Handle conditional blocks (simple implementation)
  content = content.replace(/{{#if\s+(\w+)}}(.*?){{\/if}}/g, (match, condition, text) => {
    return variables[condition] ? text : '';
  });

  return { subject, content };
}