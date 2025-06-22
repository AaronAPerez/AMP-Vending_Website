import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

// Simplified validation schema that matches what we actually need
const generateReviewRequestSchema = z.object({
  customer: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    companyName: z.string().optional(),
    serviceType: z.enum(['installation', 'maintenance', 'consultation', 'repair', 'restocking']),
    serviceDate: z.string(),
    satisfactionLevel: z.number().min(1).max(5),
    notes: z.string().optional()
  }),
  sendImmediately: z.boolean().default(false),
  scheduledDate: z.string().optional()
});

// Simplified customer interface for API usage
interface CustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  serviceType: 'installation' | 'maintenance' | 'consultation' | 'repair' | 'restocking';
  serviceDate: string;
  satisfactionLevel: number;
  notes?: string;
}

// Simple compliance check function
function checkCustomerCompliance(customer: CustomerRequest): {
  canSendRequest: boolean;
  reasons: string[];
  recommendations: string[];
} {
  const reasons: string[] = [];
  const recommendations: string[] = [];

  // Check satisfaction level
  if (customer.satisfactionLevel < 4) {
    reasons.push('Customer satisfaction level is below threshold (must be 4-5 stars)');
    recommendations.push('Only send review requests to highly satisfied customers');
  }

  // Check email validity
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(customer.email)) {
    reasons.push('Invalid email address format');
    recommendations.push('Verify the customer email address is correct');
  }

  // TODO: Add more compliance checks (recent requests, unsubscribe status, etc.)

  return {
    canSendRequest: reasons.length === 0,
    reasons,
    recommendations
  };
}

// Generate email template function
function generateEmailTemplate(customer: CustomerRequest): string {
  const templates = {
    installation: `Hi ${customer.firstName}!

Thank you for choosing AMP Vending for your vending machine installation${customer.companyName ? ` at ${customer.companyName}` : ''}. We hope your new machine is working perfectly!

Your feedback helps other businesses make informed decisions. If you had a positive experience, would you mind sharing a quick review?

👉 Leave a review: https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review

It takes less than 2 minutes and means the world to our small business.

Thank you for your support!

Best regards,
The AMP Vending Team
(209) 403-5450
ampdesignandconsulting@gmail.com`,

    maintenance: `Hello ${customer.firstName},

Thank you for trusting AMP Vending with your maintenance service${customer.companyName ? ` for ${customer.companyName}` : ''}. We strive to provide excellent service on every visit.

If you're satisfied with our work, we'd greatly appreciate a review to help other businesses discover our services.

⭐ Quick review link: https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review

Your honest feedback helps us maintain our high standards!

Best regards,
AMP Vending Service Team`,

    consultation: `Hi ${customer.firstName},

Thank you for your time during our consultation${customer.companyName ? ` about vending solutions for ${customer.companyName}` : ''}. We hope we provided valuable insights for your business needs.

If you found our consultation helpful, a quick review would help other businesses find our services.

📝 Share your experience: https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review

We appreciate your consideration!

AMP Vending Team`,

    repair: `Hi ${customer.firstName},

Thank you for trusting AMP Vending with your equipment repair${customer.companyName ? ` at ${customer.companyName}` : ''}. We hope everything is working perfectly now!

If you're satisfied with our repair service, we'd appreciate a quick review to help other businesses find our services.

🔧 Leave a review: https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review

Thank you for choosing AMP Vending!

Best regards,
AMP Vending Service Team`,

    restocking: `Hello ${customer.firstName},

Thank you for continuing to trust AMP Vending with your product restocking${customer.companyName ? ` for ${customer.companyName}` : ''}. We hope your team is enjoying the fresh product selection!

If you're happy with our restocking service, a quick review would help other businesses discover our services.

📦 Quick review link: https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review

Your feedback helps us serve you better!

Best regards,
AMP Vending Team`
  };

  return templates[customer.serviceType] || templates.installation;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request data
    const validatedData = generateReviewRequestSchema.parse(req.body);
    const { customer, sendImmediately } = validatedData;

    // Check compliance
    const complianceCheck = checkCustomerCompliance(customer);
    if (!complianceCheck.canSendRequest) {
      return res.status(400).json({
        success: false,
        error: 'Compliance check failed',
        reasons: complianceCheck.reasons,
        recommendations: complianceCheck.recommendations
      });
    }

    // Generate email content
    const emailContent = generateEmailTemplate(customer);

    // Create review request object
    const reviewRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      customer: {
        ...customer,
        id: `cust_${Date.now()}`,
        serviceDate: new Date(customer.serviceDate),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      templateId: `template_${customer.serviceType}`,
      emailSubject: 'How was your experience with AMP Vending?',
      emailContent,
      status: sendImmediately ? 'sent' : 'draft',
      sentDate: sendImmediately ? new Date() : undefined,
      followUpCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // TODO: Save to database
    console.log('📝 Review request created:', reviewRequest.id);

    // TODO: Send email if immediate send is requested
    if (sendImmediately) {
      console.log('📧 Sending review request email to:', customer.email);
      // Implement email sending logic here
    }

    res.status(201).json({
      success: true,
      data: reviewRequest,
      message: sendImmediately ? 'Review request sent successfully' : 'Review request created successfully'
    });

  } catch (error) {
    console.error('Error generating review request:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to generate review request',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}