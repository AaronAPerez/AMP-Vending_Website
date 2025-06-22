import { emailTemplates } from '@/lib/email/emailBranding';
import { emailService } from '@/lib/services/emailService';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';


const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required').max(100, 'Company name is too long'),
  message: z.string().optional().default(''),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📧 Contact form submission received:', body);

    // Validate the form data
    const validatedData = contactFormSchema.parse(body);
    
    const timestamp = new Date().toISOString();
    const customerData = {
      ...validatedData,
      submittedAt: timestamp,
      source: 'website_contact_form',
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    // Prepare emails
    const emailPromises = [];

    // 1. Send confirmation email to customer
    try {
      const customerConfirmationEmail = {
        to: customerData.email,
        subject: `Thank you for contacting AMP Vending, ${customerData.firstName}!`,
        html: emailTemplates.contactConfirmation(customerData),
        from: 'AMP Vending <ampdesignandconsulting@gmail.com>'
      };

      emailPromises.push(
        emailService.sendEmail(customerConfirmationEmail)
          .then(result => ({ type: 'customer_confirmation', result }))
          .catch(error => ({ type: 'customer_confirmation', error }))
      );
    } catch (error) {
      console.error('Error preparing customer confirmation email:', error);
    }

    // 2. Send notification email to business
    try {
      const businessNotificationEmail = {
        to: 'ampdesignandconsulting@gmail.com',
        subject: `🔔 New Contact Form: ${customerData.firstName} ${customerData.lastName} - ${customerData.companyName}`,
        html: emailTemplates.contactNotification(customerData),
        from: 'AMP Vending Website <ampdesignandconsulting@gmail.com>'
      };

      emailPromises.push(
        emailService.sendEmail(businessNotificationEmail)
          .then(result => ({ type: 'business_notification', result }))
          .catch(error => ({ type: 'business_notification', error }))
      );
    } catch (error) {
      console.error('Error preparing business notification email:', error);
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
        console.log('✅ Customer confirmation email sent successfully');
      } else {
        console.error('❌ Customer confirmation email failed:', 'error' in customerEmailResult ? customerEmailResult.error : customerEmailResult.result?.error);
      }
    }

    if (businessEmailResult) {
      if ('result' in businessEmailResult && businessEmailResult.result?.success) {
        businessEmailSuccess = true;
        console.log('✅ Business notification email sent successfully');
      } else {
        console.error('❌ Business notification email failed:', 'error' in businessEmailResult ? businessEmailResult.error : businessEmailResult.result?.error);
      }
    }

    // Log the submission for analytics (implement your logging service)
    await logContactSubmission(customerData, {
      customerEmailSuccess,
      businessEmailSuccess
    });

    // Determine response based on email results
    if (customerEmailSuccess && businessEmailSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Thank you for your inquiry! We\'ve sent a confirmation email and will respond within 24 hours.',
        submissionId: `contact_${Date.now()}`,
        emailStatus: {
          customerConfirmation: 'sent',
          businessNotification: 'sent'
        }
      }, { status: 200 });
    } 
    else if (customerEmailSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Thank you for your inquiry! We\'ve sent a confirmation email and will respond within 24 hours.',
        submissionId: `contact_${Date.now()}`,
        emailStatus: {
          customerConfirmation: 'sent',
          businessNotification: 'failed'
        },
        warning: 'Internal notification had issues, but your message was received.'
      }, { status: 200 });
    }
    else {
      // Even if emails fail, we should accept the submission
      console.error('⚠️ Both emails failed, but submission is still recorded');
      return NextResponse.json({
        success: true,
        message: 'Thank you for your inquiry! We have received your message and will respond within 24 hours.',
        submissionId: `contact_${Date.now()}`,
        emailStatus: {
          customerConfirmation: 'failed',
          businessNotification: 'failed'
        },
        fallbackContact: {
          phone: '(209) 403-5450',
          email: 'ampdesignandconsulting@gmail.com'
        }
      }, { status: 200 });
    }

  } catch (error) {
    console.error('❌ Contact form error:', error);

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
      error: 'Failed to process contact form submission',
      message: 'An unexpected error occurred. Please try again or contact us directly.',
      fallbackContact: {
        phone: '(209) 403-5450',
        email: 'ampdesignandconsulting@gmail.com'
      }
    }, { status: 500 });
  }
}

// Helper function to log contact submissions
async function logContactSubmission(data: any, emailStatus: any) {
  try {
    // Implement your analytics/logging service here
    console.log('📊 Contact submission logged:', {
      timestamp: new Date().toISOString(),
      customer: `${data.firstName} ${data.lastName}`,
      company: data.companyName,
      emailStatus
    });
    
    // You could save to database, send to analytics service, etc.
    // await analyticsService.track('contact_form_submission', data);
    
  } catch (error) {
    console.error('Failed to log contact submission:', error);
  }
}
