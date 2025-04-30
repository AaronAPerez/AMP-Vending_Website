'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

// Define feedback categories
const FEEDBACK_CATEGORIES = [
  'Question',
  'Suggestion',
  'Compliment',
  'Complaint',
  'Technical Issue',
  'Product Request'
] as const;

// Define the schema for form validation
const feedbackFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  category: z.enum(FEEDBACK_CATEGORIES),
  locationName: z.string().optional(),
  machineId: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  contactConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to be contacted'
  })
});

// Define the type for our form data
type FeedbackFormData = z.infer<typeof feedbackFormSchema>;

// Define props for the component
interface FeedbackFormProps {
  className?: string;
  onSubmitSuccess?: () => void;
}

/**
 * FeedbackForm Component
 * 
 * A responsive, accessible form for collecting customer feedback about vending machines
 */
export default function FeedbackForm({ className = '', onSubmitSuccess }: FeedbackFormProps) {
  // Form state
  const [formData, setFormData] = useState<Partial<FeedbackFormData>>({
    category: 'Question',
    contactConsent: false
  });
  
  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    try {
      feedbackFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Show loading toast
      const loadingToast = toast.loading('Submitting your feedback...');
      
      // Submit form data to API
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // Handle response
      const result = await response.json();
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (!response.ok) {
        // Show error toast
        toast.error(result.error || 'Failed to submit feedback. Please try again.');
        setSubmissionStatus('error');
      } else {
        // Show success toast
        toast.success('Thank you! Your feedback has been submitted successfully.');
        setSubmissionStatus('success');
        
        // Reset form
        setFormData({
          category: 'Question',
          contactConsent: false
        });
        
        // Call success callback if provided
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Something went wrong. Please try again later.');
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset submission status after delay
      setTimeout(() => {
        setSubmissionStatus('idle');
      }, 5000);
    }
  };

  return (
    <div className={`bg-[#000000] text-[#F5F5F5] ${className}`}>
      <div className="max-w-3xl mx-auto p-6 rounded-lg border border-[#a4acac] bg-[#4d4d4d]/30">
        {/* Form Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-[#F5F5F5]" id="feedback-form-heading">
            Share Your Feedback
          </h2>
          <p className="text-[#A5ACAF]">
            We value your input about our vending machines and service
          </p>
        </div>
        
        {/* Submission status messages */}
        {submissionStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
            <p className="font-medium">Thank you for your feedback!</p>
            <p>We appreciate your input and will use it to improve our vending machine services.</p>
          </div>
        )}
        
        {submissionStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            <p className="font-medium">Something went wrong.</p>
            <p>We couldn&apos;t process your submission. Please try again or contact us directly at ampdesignandconsulting@gmail.com</p>
          </div>
        )}
        
        {/* Feedback Form */}
        <form 
          onSubmit={handleSubmit}
          aria-labelledby="feedback-form-heading"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-[#F5F5F5] mb-1">
                Your Name <span className="text-[#FD5A1E]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name || ''}
                onChange={handleChange}
                className={`w-full rounded-md bg-[#000000] border ${
                  errors.name ? 'border-red-500' : 'border-[#a4acac]'
                } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E]`}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-red-500 text-sm">
                  {errors.name}
                </p>
              )}
            </div>
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-[#F5F5F5] mb-1">
                Email Address <span className="text-[#FD5A1E]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                className={`w-full rounded-md bg-[#000000] border ${
                  errors.email ? 'border-red-500' : 'border-[#a4acac]'
                } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E]`}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-red-500 text-sm">
                  {errors.email}
                </p>
              )}
            </div>
            
            {/* Feedback Category */}
            <div>
              <label htmlFor="category" className="block text-[#F5F5F5] mb-1">
                Feedback Type <span className="text-[#FD5A1E]">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category || 'Question'}
                onChange={handleChange}
                className="w-full rounded-md bg-[#000000] border border-[#a4acac] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E]"
                aria-required="true"
              >
                {FEEDBACK_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Machine Location (Optional) */}
            <div>
              <label htmlFor="locationName" className="block text-[#F5F5F5] mb-1">
                Vending Machine Location
              </label>
              <input
                id="locationName"
                name="locationName"
                type="text"
                value={formData.locationName || ''}
                onChange={handleChange}
                placeholder="e.g., Company name or building"
                className="w-full rounded-md bg-[#000000] border border-[#a4acac] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E]"
              />
              <p className="mt-1 text-[#A5ACAF] text-xs">
                Optional: Help us identify the location of the machine
              </p>
            </div>
          </div>
          
          {/* Machine ID (Optional) */}
          <div>
            <label htmlFor="machineId" className="block text-[#F5F5F5] mb-1">
              Machine ID Number
            </label>
            <input
              id="machineId"
              name="machineId"
              type="text"
              value={formData.machineId || ''}
              onChange={handleChange}
              placeholder="e.g., AMP-123 (found on the front of the machine)"
              className="w-full rounded-md bg-[#000000] border border-[#a4acac] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E]"
            />
            <p className="mt-1 text-[#A5ACAF] text-xs">
              Optional: The ID number helps us identify the specific machine
            </p>
          </div>
          
          {/* Feedback Message */}
          <div>
            <label htmlFor="message" className="block text-[#F5F5F5] mb-1">
              Your Feedback <span className="text-[#FD5A1E]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message || ''}
              onChange={handleChange}
              className={`w-full rounded-md bg-[#000000] border ${
                errors.message ? 'border-red-500' : 'border-[#a4acac]'
              } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E]`}
              placeholder="Please share your experience, suggestion, or question..."
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            ></textarea>
            {errors.message && (
              <p id="message-error" className="mt-1 text-red-500 text-sm">
                {errors.message}
              </p>
            )}
          </div>
          
          {/* Consent Checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="contactConsent"
                name="contactConsent"
                type="checkbox"
                checked={formData.contactConsent || false}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-[#FD5A1E] bg-[#000000] border-[#a4acac] rounded focus:ring-[#FD5A1E]"
                aria-required="true"
                aria-invalid={!!errors.contactConsent}
                aria-describedby={errors.contactConsent ? "consent-error" : undefined}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="contactConsent" className="text-[#F5F5F5]">
                I consent to being contacted regarding my feedback <span className="text-[#FD5A1E]">*</span>
              </label>
              {errors.contactConsent && (
                <p id="consent-error" className="text-red-500">
                  {errors.contactConsent}
                </p>
              )}
            </div>
          </div>
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-[#FD5A1E] text-[#F5F5F5] rounded-full font-medium hover:bg-[#FD5A1E]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
          
          {/* Privacy Note */}
          <div className="text-center text-[#A5ACAF] text-sm">
            Your feedback helps us improve. We&apos;ll only use your contact information to respond to your feedback.
          </div>
        </form>
      </div>
    </div>
  );
}