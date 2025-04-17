import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/schema/contactFormSchema';
import { emailService } from '@/lib/services/emailService';
import { databaseService } from '@/lib/services/databaseService';

export async function POST(req: NextRequest) {
  try {
    // Validate configuration (existing code)
    const isConfigured = await emailService.verifyConnection();
    if (!isConfigured) {
      console.error('Email service is not properly configured');
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' }, 
        { status: 500 }
      );
    }
    
    // Parse and validate request body (existing code)
    const body = await req.json();
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
    
    // Save to database
    try {
      const saved = await databaseService.saveContactSubmission(validationResult.data);
      if (!saved) {
        console.warn('Failed to save submission to database, but will still send email');
      }
    } catch (dbError) {
      console.error('Error saving to database:', dbError);
      // Continue with email sending even if database save fails
    }
    
    // Send email (existing code)
    try {
      await emailService.sendContactFormEmail(validationResult.data);
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