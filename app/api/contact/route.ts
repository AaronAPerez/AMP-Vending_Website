import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define expected request body type
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  company?: string;
  subject?: string;
}

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST handler for contact form submissions
export async function POST(req: Request) {
  try {
    // Parse the request body
    const formData: ContactFormData = await req.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }
    
    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER, // Destination email
      subject: formData.subject || `New Contact from ${formData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
        ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
        <h3>Message:</h3>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      `,
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    
    // Return error response
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
// import { NextRequest, NextResponse } from 'next/server';
// import { contactFormSchema } from '@/lib/schema/contactFormSchema';
// import { emailService } from '@/lib/services/emailService';

// /**
//  * API route handler for contact form submissions
//  */
// export async function POST(req: NextRequest) {
//   try {
//     // Validate SMTP configuration
//     const isSmtpConfigured = await emailService.verifyConnection();
//     if (!isSmtpConfigured) {
//       console.error('SMTP is not properly configured');
//       return NextResponse.json(
//         { error: 'Server configuration error. Please try again later.' }, 
//         { status: 500 }
//       );
//     }
    
//     // Parse and validate request body
//     const body = await req.json();
    
//     // Validate with Zod schema
//     const validationResult = contactFormSchema.safeParse(body);
    
//     if (!validationResult.success) {
//       // Return validation errors
//       return NextResponse.json(
//         { 
//           error: 'Invalid form data', 
//           details: validationResult.error.format() 
//         }, 
//         { status: 400 }
//       );
//     }
    
//     // Send email with validated data
//     await emailService.sendContactFormEmail(validationResult.data);
    
//     // Optional: Save to database
//     // await saveContactToDatabase(validationResult.data);
    
//     // Return success response
//     return NextResponse.json(
//       { success: true, message: 'Form submitted successfully' }, 
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error processing contact form:', error);
    
//     // Return error response
//     return NextResponse.json(
//       { error: 'Failed to process form submission. Please try again later.' }, 
//       { status: 500 }
//     );
//   }
// }

// /**
//  * Handle OPTIONS requests for CORS preflight
//  */
// export async function OPTIONS() {
//   return new NextResponse(null, {
//     status: 204,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'POST, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     },
//   });
// }