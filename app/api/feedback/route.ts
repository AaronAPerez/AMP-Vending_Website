import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { emailService } from '@/lib/services/emailService';
import { feedbackFormSchema } from '@/lib/schema/feedbackFormSchema';

/**
 * Handle POST requests for feedback submission
 */
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
    const validationResult = feedbackFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid form data', 
          details: validationResult.error.format() 
        }, 
        { status: 400 }
      );
    }
    
    const feedbackData = validationResult.data;
    
    // Save to database if Supabase is configured
    if (supabaseServer) {
      try {
        const { error } = await supabaseServer
          .from('feedback_submissions')
          .insert({
            name: feedbackData.name,
            email: feedbackData.email,
            category: feedbackData.category,
            location_name: feedbackData.locationName || null,
            // machine_id: feedbackData.machineId || null,
            message: feedbackData.message,
            contact_consent: feedbackData.contactConsent,
            status: 'new', // Initial status for all feedback
            ip_address: req.headers.get('x-forwarded-for') || null,
            user_agent: req.headers.get('user-agent') || null
          });
          
        if (error) {
          console.warn('Failed to save feedback to database:', error);
          // Continue with email sending even if database save fails
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continue with email sending even if database save fails
      }
    } else {
      console.log('Supabase not configured, skipping database save');
    }
    
    // Send email using the updated email service
    try {
      await emailService.sendFeedbackEmail(feedbackData);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return NextResponse.json(
        { error: 'Failed to process feedback. Please try again later.' }, 
        { status: 500 }
      );
    }
    
    // Return success response
    return NextResponse.json(
      { success: true, message: 'Feedback submitted successfully' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing feedback submission:', error);
    
    return NextResponse.json(
      { error: 'Failed to process feedback submission. Please try again later.' }, 
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
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