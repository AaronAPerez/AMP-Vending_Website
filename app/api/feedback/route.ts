//api/feedback/route.ts
import { emailTemplates } from '@/lib/email/emailBranding';
import { emailService } from '@/lib/services/emailService';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';


const FEEDBACK_CATEGORIES = [
  'Question',
  'Suggestion', 
  'Compliment',
  'Complaint',
  'Technical Issue',
  'Product Request'
] as const;

const feedbackFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  category: z.enum(FEEDBACK_CATEGORIES),
  locationName: z.string().max(200, 'Location name is too long').optional(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long (max 2000 characters)'),
  contactConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to be contacted'
  })
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📝 Feedback submission received:', body);

    // Validate the form data
    const validatedData = feedbackFormSchema.parse(body);
    
    const timestamp = new Date().toISOString();
    const feedbackData = {
      ...validatedData,
      submittedAt: timestamp,
      source: 'website_feedback_form',
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    // Prepare emails
    const emailPromises = [];

    // 1. Send confirmation email to customer
    try {
      const customerConfirmationEmail = {
        to: feedbackData.email,
        subject: `Thank you for your feedback, ${feedbackData.name}!`,
        html: emailTemplates.feedbackConfirmation(feedbackData),
        from: 'AMP Vending <ampdesignandconsulting@gmail.com>'
      };

      emailPromises.push(
        emailService.sendEmail(customerConfirmationEmail)
          .then(result => ({ type: 'customer_confirmation', result }))
          .catch(error => ({ type: 'customer_confirmation', error }))
      );
    } catch (error) {
      console.error('Error preparing customer feedback confirmation:', error);
    }

    // 2. Send notification email to business
    try {
      // Determine urgency based on category
      const urgentCategories = ['Complaint', 'Technical Issue'];
      const isUrgent = urgentCategories.includes(feedbackData.category);
      
      const businessNotificationEmail = {
        to: 'ampdesignandconsulting@gmail.com',
        subject: `${isUrgent ? '🚨 URGENT' : '📝'} Feedback: ${feedbackData.category} from ${feedbackData.name}`,
        html: emailTemplates.feedbackNotification(feedbackData),
        from: 'AMP Vending Website <ampdesignandconsulting@gmail.com>'
      };

      emailPromises.push(
        emailService.sendEmail(businessNotificationEmail)
          .then(result => ({ type: 'business_notification', result }))
          .catch(error => ({ type: 'business_notification', error }))
      );
    } catch (error) {
      console.error('Error preparing business feedback notification:', error);
    }

    // Send emails concurrently
    const emailResults = await Promise.all(emailPromises);
    
    // Analyze results
    const customerEmailResult = emailResults.find(r => r.type === 'customer_confirmation');
    const businessEmailResult = emailResults.find(r => r.type === 'business_notification');

    let customerEmailSuccess = false;
    let businessEmailSuccess = false;

    if (customerEmailResult) {
      if ('result' in customerEmailResult && customerEmailResult.result?.success) {
        customerEmailSuccess = true;
        console.log('✅ Customer feedback confirmation sent successfully');
      } else {
        console.error(
          '❌ Customer feedback confirmation failed:',
          'error' in customerEmailResult
            ? customerEmailResult.error
            : ('result' in customerEmailResult ? customerEmailResult.result?.error : undefined)
        );
      }
    }

    if (businessEmailResult) {
      if ('result' in businessEmailResult && businessEmailResult.result?.success) {
        businessEmailSuccess = true;
        console.log('✅ Business feedback notification sent successfully');
      } else {
        console.error(
          '❌ Business feedback notification failed:',
          'error' in businessEmailResult
            ? businessEmailResult.error
            : businessEmailResult.result?.error
        );
      }
    }

    // Log the feedback for analytics
    await logFeedbackSubmission(feedbackData, {
      customerEmailSuccess,
      businessEmailSuccess
    });

    // Determine response based on email results and feedback category
    const responseMessage = getFeedbackResponseMessage(feedbackData.category, customerEmailSuccess);
    
    return NextResponse.json({
      success: true,
      message: responseMessage,
      submissionId: feedbackData.id,
      category: feedbackData.category,
      emailStatus: {
        customerConfirmation: customerEmailSuccess ? 'sent' : 'failed',
        businessNotification: businessEmailSuccess ? 'sent' : 'failed'
      },
      responseTime: getExpectedResponseTime(feedbackData.category)
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Feedback form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.errors.reduce((acc, err) => {
          const field = err.path[0];
          if (field) {
            acc[field] = { _errors: [err.message] };
          }
          return acc;
        }, {} as Record<string, { _errors: string[] }>)
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to process feedback submission',
      message: 'An unexpected error occurred. Please try again or contact us directly.',
      fallbackContact: {
        phone: '(209) 403-5450',
        email: 'ampdesignandconsulting@gmail.com'
      }
    }, { status: 500 });
  }
}

// Helper functions for feedback processing
function getFeedbackResponseMessage(category: string, emailSent: boolean): string {
  const baseMessage = emailSent 
    ? "Thank you for your feedback! We've sent a confirmation email and will respond"
    : "Thank you for your feedback! We have received your message and will respond";

  switch (category) {
    case 'Complaint':
    case 'Technical Issue':
      return `${baseMessage} within 4-6 hours to address your concerns.`;
    case 'Question':
      return `${baseMessage} within 24 hours with detailed information.`;
    case 'Suggestion':
    case 'Product Request':
      return `${baseMessage} within 48 hours to discuss your suggestions.`;
    case 'Compliment':
      return `${baseMessage} soon to thank you personally!`;
    default:
      return `${baseMessage} within 24-48 hours.`;
  }
}

function getExpectedResponseTime(category: string): string {
  switch (category) {
    case 'Complaint':
    case 'Technical Issue':
      return '4-6 hours';
    case 'Question':
      return '24 hours';
    case 'Suggestion':
    case 'Product Request':
      return '48 hours';
    case 'Compliment':
      return '24 hours';
    default:
      return '24-48 hours';
  }
}

async function logFeedbackSubmission(data: any, emailStatus: any) {
  try {
    console.log('📊 Feedback submission logged:', {
      timestamp: new Date().toISOString(),
      category: data.category,
      customer: data.name,
      location: data.locationName,
      emailStatus,
      urgent: ['Complaint', 'Technical Issue'].includes(data.category)
    });
    
    // Implement your analytics/logging service here
    // await analyticsService.track('feedback_submission', data);
    
  } catch (error) {
    console.error('Failed to log feedback submission:', error);
  }
}
