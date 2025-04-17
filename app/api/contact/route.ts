import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/schema/contactFormSchema';
import { emailService } from '@/lib/services/emailService';

/* API route handler for contact form submissions */
export async function POST(req: NextRequest) {
  try {
    // Add debugging
    console.log("Email settings:", {
      resendApiKey: process.env.RESEND_API_KEY ? "Present (not showing)" : "MISSING",
      fromEmail: process.env.FROM_EMAIL || "Using default",
      toEmail: process.env.TO_EMAIL || "Using default"
    });
    
    // Validate configuration
    const isConfigured = await emailService.verifyConnection();
    if (!isConfigured) {
      console.error('Email service is not properly configured');
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' }, 
        { status: 500 }
      );
    }
    
    // Parse and validate request body
    const body = await req.json();
    console.log("Received form data:", body);
    
    // Validate with Zod schema
    const validationResult = contactFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      // Return validation errors
      console.error("Validation errors:", validationResult.error.format());
      return NextResponse.json(
        { 
          error: 'Invalid form data', 
          details: validationResult.error.format() 
        }, 
        { status: 400 }
      );
    }
    
    // Send email with validated data
    try {
      await emailService.sendContactFormEmail(validationResult.data);
      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' }, 
        { status: 500 }
      );
    }
    
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
