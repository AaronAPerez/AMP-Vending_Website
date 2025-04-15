import { z } from 'zod';

// Validate form data with Zod schema
export const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required'),
  jobTitle: z.string().optional(),
  employeeCount: z.string().min(1, 'Employee count is required'),
  streetAddress: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  interestedMachine: z.string().min(1, 'Please select a vending machine'),
  message: z.string().optional(),
  preferredContact: z.enum(['email', 'phone']).default('email'),
});

// Export type based on the schema
export type ContactFormData = z.infer<typeof contactFormSchema>;