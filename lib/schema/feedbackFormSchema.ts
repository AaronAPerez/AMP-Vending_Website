import { z } from 'zod';

// Define feedback categories
export const FEEDBACK_CATEGORIES = [
  'Question',
  'Suggestion',
  'Compliment',
  'Complaint',
  'Technical Issue',
  'Product Request'
] as const;

// Define the schema for feedback validation
export const feedbackFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  category: z.enum(FEEDBACK_CATEGORIES),
  locationName: z.string().optional(),
  // machineId: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  contactConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to be contacted'
  })
});

// Export type based on the schema
export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;