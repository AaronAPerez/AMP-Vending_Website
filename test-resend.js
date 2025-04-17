
const { Resend } = require('resend');
require('dotenv').config({ path: '.env.local' }); // This loads your .env.local variables

async function testResend() {
  try {
    console.log("Testing Resend with the following configuration:");
    console.log("API Key present:", !!process.env.RESEND_API_KEY);
    console.log("From email:", process.env.FROM_EMAIL || "onboarding@resend.dev (default)");
    console.log("To email:", process.env.TO_EMAIL || "undefined");
    
    if (!process.env.RESEND_API_KEY) {
      console.error("ERROR: No RESEND_API_KEY found in environment variables");
      console.log("Make sure you've created a .env.local file with RESEND_API_KEY=your_key_here");
      return;
    }
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from: `Test <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: [process.env.TO_EMAIL || 'your-email@example.com'], // Update this if TO_EMAIL isn't set
      subject: 'Testing Resend Integration',
      html: '<h1>This is a test email from Resend</h1><p>If you received this, your Resend configuration is working correctly!</p>',
      text: 'This is a test email from Resend. If you received this, your Resend configuration is working correctly!',
    });
    
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Success! Email sent with ID:", data.id);
      console.log("Check your inbox at:", process.env.TO_EMAIL || "your-email@example.com");
    }
    
  } catch (error) {
    console.error("Exception occurred:", error);
  }
}

testResend();