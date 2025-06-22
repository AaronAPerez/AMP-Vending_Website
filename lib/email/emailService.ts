// lib/email/emailService.ts
import { ReviewEmailData } from '@/types/review';
import { Resend } from 'resend';
import { generateReviewRequestEmail } from './emailBranding';

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailResponse = { success: true; messageId: string } | { success: false; error: string };

export class EmailService {
  async sendReviewRequest(data: ReviewEmailData): Promise<EmailResponse> {
    try {
      const emailHtml = generateReviewRequestEmail(data);
      
      const result = await resend.emails.send({
        from: 'AMP Vending <reviews@ampvendingmachines.com>',
        to: data.customer.email,
        subject: 'How was your experience with AMP Vending?',
        html: emailHtml,
        text: generateTextVersion(emailHtml)
      });

      return { success: true, messageId: result.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}