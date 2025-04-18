import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/schema/contactFormSchema';
import { emailService } from '@/lib/services/emailService';
import { supabaseServer } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    // Validate email configuration
    const isEmailConfigured = await emailService.verifyConnection();
    if (!isEmailConfigured) {
      console.error('Email service is not properly configured');
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' }, 
        { status: 500 }
      );
    }
    
    // Parse and validate request body
    const body = await req.json();
    const validationResult = contactFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid form data', 
          details: validationResult.error.format() 
        }, 
        { status: 400 }
      );
    }
    
    // Save to database if Supabase is configured
    if (supabaseServer) {
      try {
        const { error } = await supabaseServer
          .from('contact_submissions')
          .insert({
            // Map form data to database fields
            first_name: validationResult.data.firstName,
            last_name: validationResult.data.lastName,
            email: validationResult.data.email,
            phone: validationResult.data.phone || null,
            // Other fields...
          });
          
        if (error) {
          console.warn('Failed to save to database:', error);
          // Continue with email sending even if database save fails
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continue with email sending even if database save fails
      }
    } else {
      console.log('Supabase not configured, skipping database save');
    }
    
    // Send email
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
    
    return NextResponse.json(
      { error: 'Failed to process form submission. Please try again later.' }, 
      { status: 500 }
    );
  }
}