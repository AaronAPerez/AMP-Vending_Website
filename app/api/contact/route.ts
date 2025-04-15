import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/schema/contactFormSchema';
import { emailService } from '@/lib/services/emailService';

/* API route handler for contact form submissions */
export async function POST(req: NextRequest) {
  try {
    // Validate SMTP configuration
    const isSmtpConfigured = await emailService.verifyConnection();
    if (!isSmtpConfigured) {
      console.error('SMTP is not properly configured');
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' }, 
        { status: 500 }
      );
    }
    
    // Parse and validate request body
    const body = await req.json();
    
    // Validate with Zod schema
    const validationResult = contactFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      // Return validation errors
      return NextResponse.json(
        { 
          error: 'Invalid form data', 
          details: validationResult.error.format() 
        }, 
        { status: 400 }
      );
    }
    
    // Send email with validated data
    await emailService.sendContactFormEmail(validationResult.data);
    
    // Optional: Save to database
    // await saveContactToDatabase(validationResult.data);
    
    // Return success response
    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    // Return error response
    return NextResponse.json(
      { error: 'Failed to process form submission. Please try again later.' }, 
      { status: 500 }
    );
  }
}

/**
 * Handle OPTIONS requests for CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}