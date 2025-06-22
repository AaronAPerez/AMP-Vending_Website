// /lib/reviews/reviewService.ts
import { ReviewCustomer, ReviewRequest, ReviewMetrics, ComplianceCheck } from '../../types/review';
import { emailTemplates } from '../email/emailTemplates';
import { emailService } from '../email/emailService';

export class ReviewService {
  private static instance: ReviewService;

  public static getInstance(): ReviewService {
    if (!ReviewService.instance) {
      ReviewService.instance = new ReviewService();
    }
    return ReviewService.instance;
  }

  /**
   * Check if a customer is eligible for a review request
   */
  async checkCompliance(customer: ReviewCustomer): Promise<ComplianceCheck> {
    const checks = {
      satisfactionThreshold: customer.satisfactionLevel >= 4,
      recentRequest: await this.checkRecentRequest(customer.email),
      maxFollowUps: await this.checkMaxFollowUps(customer.email),
      emailValidity: this.validateEmail(customer.email),
      unsubscribeStatus: await this.checkUnsubscribeStatus(customer.email)
    };

    const canSendRequest = Object.values(checks).every(check => check);
    
    const reasons: string[] = [];
    const recommendations: string[] = [];

    if (!checks.satisfactionThreshold) {
      reasons.push('Customer satisfaction level is below threshold (must be 4-5 stars)');
      recommendations.push('Only send review requests to highly satisfied customers');
    }

    if (!checks.recentRequest) {
      reasons.push('Recent review request already sent to this customer');
      recommendations.push('Wait at least 30 days between review requests');
    }

    if (!checks.maxFollowUps) {
      reasons.push('Maximum follow-up limit reached for this customer');
      recommendations.push('Do not send more than 2 follow-up emails per customer');
    }

    if (!checks.emailValidity) {
      reasons.push('Invalid email address format');
      recommendations.push('Verify the customer email address is correct');
    }

    if (!checks.unsubscribeStatus) {
      reasons.push('Customer has unsubscribed from marketing emails');
      recommendations.push('Respect customer preferences and do not send emails');
    }

    return {
      customerId: customer.id,
      checks,
      canSendRequest,
      reasons,
      recommendations
    };
  }

  /**
   * Create a new review request
   */
  async createReviewRequest(data: {
    customer: ReviewCustomer;
    sendImmediately?: boolean;
    scheduledDate?: Date;
  }): Promise<ReviewRequest> {
    const { customer, sendImmediately = false, scheduledDate } = data;

    // Generate email content
    const emailContent = this.generateEmailContent(customer);
    
    const reviewRequest: ReviewRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      customerId: customer.id,
      customer,
      templateId: this.getTemplateId(customer.serviceType),
      emailSubject: `How was your experience with AMP Vending?`,
      emailContent,
      status: sendImmediately ? 'sent' : (scheduledDate ? 'scheduled' : 'draft'),
      sentDate: sendImmediately ? new Date() : undefined,
      scheduledDate,
      followUpCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save to database (implement your database logic here)
    await this.saveReviewRequest(reviewRequest);

    return reviewRequest;
  }

  /**
   * Send review request email
   */
  async sendReviewRequestEmail(requestId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const request = await this.getReviewRequestById(requestId);
      if (!request) {
        throw new Error('Review request not found');
      }

      const reviewLink = this.generateReviewLink(request.customer);
      
      const emailData = {
        customer: request.customer,
        businessInfo: {
          name: 'AMP Vending',
          address: {
            street: '4120 Dale Rd Ste J8 1005',
            city: 'Modesto',
            state: 'CA',
            zipCode: '95354'
          },
          phone: '(209) 403-5450',
          email: 'ampdesignandconsulting@gmail.com',
          website: 'https://www.ampvendingmachines.com',
          logo: 'https://www.ampvendingmachines.com/images/logo/AMP_logo.png'
        },
        reviewLink,
        unsubscribeLink: this.generateUnsubscribeLink(request.customer.email)
      };

      const emailResult = await emailService.sendEmail({
        to: request.customer.email,
        subject: request.emailSubject,
        html: emailTemplates.reviewRequest(emailData)
      });

      if (emailResult.success) {
        // Update request status
        await this.updateReviewRequest(requestId, {
          status: 'sent',
          sentDate: new Date()
        });
      }

      return emailResult;

    } catch (error) {
      console.error('Error sending review request email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Generate review metrics
   */
  async getReviewMetrics(options: {
    timeFrame?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<ReviewMetrics> {
    // Implement your database query logic here
    // This is a mock implementation
    return {
      totalRequests: 247,
      sentRequests: 186,
      openedRequests: 146,
      clickedRequests: 89,
      reviewsReceived: 58,
      averageRating: 4.7,
      responseRate: 31.2,
      openRate: 78.5,
      clickRate: 60.9,
      conversionRate: 65.2,
      timeFrame: options.timeFrame || 'month',
      periodStart: options.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      periodEnd: options.endDate || new Date()
    };
  }

  /**
   * Handle new review received from Google
   */
  async handleNewReview(reviewData: any): Promise<void> {
    try {
      // Find the corresponding review request
      const request = await this.findRequestByCustomerEmail(reviewData.authorEmail);
      
      if (request) {
        // Update request with review information
        await this.updateReviewRequest(request.id, {
          status: 'reviewed',
          responseDate: new Date(),
          reviewRating: reviewData.rating,
          reviewContent: reviewData.comment,
          reviewUrl: reviewData.reviewUrl
        });

        // Send thank you email
        const thankYouResult = await emailService.sendEmail({
          to: request.customer.email,
          subject: `Thank you for your ${reviewData.rating}-star review!`,
          html: emailTemplates.reviewThankYou(request.customer, reviewData.rating)
        });

        if (!thankYouResult.success) {
          console.error('Failed to send thank you email:', thankYouResult.error);
        }
      }

      // Log the review for analytics
      await this.logReviewReceived(reviewData);

    } catch (error) {
      console.error('Error handling new review:', error);
    }
  }

  // Private helper methods
  private async checkRecentRequest(email: string): Promise<boolean> {
    // Check if a request was sent in the last 30 days
    // Implement your database logic here
    return true; // Mock implementation
  }

  private async checkMaxFollowUps(email: string): Promise<boolean> {
    // Check if follow-up limit has been reached
    // Implement your database logic here
    return true; // Mock implementation
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private async checkUnsubscribeStatus(email: string): Promise<boolean> {
    // Check if customer has unsubscribed
    // Implement your database logic here
    return true; // Mock implementation
  }

  private generateEmailContent(customer: ReviewCustomer): string {
    const templates = {
      installation: `Hi ${customer.firstName}!

Thank you for choosing AMP Vending for your vending machine installation${customer.companyName ? ` at ${customer.companyName}` : ''}. We hope your new machine is working perfectly!

Your feedback helps other businesses make informed decisions. If you had a positive experience, would you mind sharing a quick review?

👉 It takes less than 2 minutes and means the world to our small business.

Thank you for your support!

Best regards,
The AMP Vending Team
(209) 403-5450`,

      maintenance: `Hello ${customer.firstName},

Thank you for trusting AMP Vending with your maintenance service. We strive to provide excellent service on every visit.

If you're satisfied with our work, we'd greatly appreciate a review to help other businesses discover our services.

Your honest feedback helps us maintain our high standards!

Best regards,
AMP Vending Service Team`,

      consultation: `Hi ${customer.firstName},

Thank you for your time during our consultation. We hope we provided valuable insights for your business needs.

If you found our consultation helpful, a quick review would help other businesses find our services.

We appreciate your consideration!

AMP Vending Team`
    };

    return templates[customer.serviceType] || templates.installation;
  }

  private getTemplateId(serviceType: string): string {
    const templateMap = {
      'installation': 'template_installation',
      'maintenance': 'template_maintenance',
      'consultation': 'template_consultation',
      'repair': 'template_repair',
      'restocking': 'template_restocking'
    };
    return templateMap[serviceType] || 'template_default';
  }

  private generateReviewLink(customer: ReviewCustomer): string {
    // Replace with your actual Google Business Profile review link
    return 'https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review';
  }

  private generateUnsubscribeLink(email: string): string {
    const token = Buffer.from(email).toString('base64');
    return `https://www.ampvendingmachines.com/unsubscribe?token=${token}`;
  }

  // Database methods (implement with your chosen database)
  private async saveReviewRequest(request: ReviewRequest): Promise<void> {
    // Implement database save logic
    console.log('Saving review request:', request.id);
  }

  private async getReviewRequestById(id: string): Promise<ReviewRequest | null> {
    // Implement database retrieval logic
    console.log('Getting review request:', id);
    return null; // Mock implementation
  }

  private async updateReviewRequest(id: string, updates: Partial<ReviewRequest>): Promise<ReviewRequest> {
    // Implement database update logic
    console.log('Updating review request:', id, updates);
    return {} as ReviewRequest; // Mock implementation
  }

  private async findRequestByCustomerEmail(email: string): Promise<ReviewRequest | null> {
    // Implement database search logic
    console.log('Finding request by email:', email);
    return null; // Mock implementation
  }

  private async logReviewReceived(reviewData: any): Promise<void> {
    // Implement analytics logging
    console.log('Logging review received:', reviewData);
  }

  public async getReviewRequests(filters: any): Promise<any> {
    // Implement database query with filters
    return []; // Mock implementation
  }

  public async getReviewAnalytics(): Promise<any> {
    // Implement analytics retrieval
    return {}; // Mock implementation
  }

  public async getTrendData(options: any): Promise<any> {
    // Implement trend data retrieval
    return []; // Mock implementation
  }

  public async verifyWebhookSignature(payload: string, signature: string): Promise<boolean> {
    // Implement webhook signature verification
    return true; // Mock implementation
  }

  public async handleUpdatedReview(review: any): Promise<void> {
    // Implement updated review handling
    console.log('Handling updated review:', review);
  }
}

export const reviewService = ReviewService.getInstance();