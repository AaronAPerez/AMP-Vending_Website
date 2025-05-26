'use client';

import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import Text from '../ui/layout/Text';
import Card from '../ui/core/Card';

interface ZodFieldError {
  _errors: string[];
}

interface ContactFormProps {
  className?: string;
}

/**
 * Contact Form Component
 * 
 * A responsive, accessible form for the homepage that sends data to the server
 * and triggers an automatic email reply - updated to remove cost references
 */
const ContactForm = ({ }: ContactFormProps) => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    message: '',
  });

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form submission handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Basic validation
    let hasErrors = false;
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
      hasErrors = true;
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
      hasErrors = true;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      hasErrors = true;
    }

    if (!formData.companyName) {
      newErrors.companyName = 'Company name is required';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      toast.error('Please fill in all required fields');
      return;
    }

    // Start submission
    setIsSubmitting(true);

    try {
      // Prepare the data to match the expected format in your API route
      const submissionData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || '',
        companyName: formData.companyName,
        jobTitle: '',
        employeeCount: '1-10', // Default value for simplified form
        streetAddress: '4120 Dale Rd', // Default address for simplified form
        city: 'Modesto', // Default city for simplified form
        state: 'CA', // Default state for simplified form
        zipCode: '95354', // Default ZIP for simplified form
        interestedMachine: 'unsure', // Default to "not sure" option
        message: formData.message || '',
        preferredContact: 'email', // Default to email
      };

      // Show loading toast
      const loadingToast = toast.loading('Sending your message...');

      // Send data to the API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      // Parse the response
      const result = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (!response.ok) {
        // Show error message
        toast.error(result.error || 'Failed to send message. Please try again.');

        if (result.details) {
          // Set validation errors from the server response
          const serverErrors: Record<string, string> = {};
          Object.entries(result.details).forEach(([key, value]: [string, unknown]) => {
            // Type assertion to tell TypeScript what structure to expect
            const fieldError = value as ZodFieldError;
            if (fieldError && fieldError._errors && fieldError._errors[0]) {
              serverErrors[key] = fieldError._errors[0];
            }
          });
          setErrors(serverErrors);
        }
      } else {
        // Show success message
        toast.success('Thank you! Your message has been sent successfully. Check your email for confirmation.');

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          companyName: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <Card
      variant="default"
      className="overflow-hidden shadow-2xl bg-black"
    >
      <div className="flex flex-col md:flex-row">
        {/* Form Column */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12">
          <Text variant="h3" className="mb-4 text-left">
            Ready to Enhance Your Workplace?
          </Text>
          <Text variant="body" color="muted" className="mb-6 text-left">
            Fill out the form and our team will get back to you within 24 hours to discuss your vending needs.
          </Text>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Responsive form grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-white text-sm font-medium mb-1 text-left">
                  First Name <span className="text-[#FD5A1E]">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[#4d4d4d] border ${errors.firstName ? 'border-red-500' : 'border-[#a4acac]'
                    } rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white`}
                  placeholder="Your first name"
                  aria-required="true"
                  aria-invalid={!!errors.firstName}
                  required
                />
                {errors.firstName && (
                  <p className="mt-1 text-red-500 text-sm text-left">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-white text-sm font-medium mb-1 text-left">
                  Last Name <span className="text-[#FD5A1E]">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[#4d4d4d] border ${errors.lastName ? 'border-red-500' : 'border-[#a4acac]'
                    } rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white`}
                  placeholder="Your last name"
                  aria-required="true"
                  aria-invalid={!!errors.lastName}
                  required
                />
                {errors.lastName && (
                  <p className="mt-1 text-red-500 text-sm text-left">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-1 text-left">
                Email Address <span className="text-[#FD5A1E]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-[#4d4d4d] border ${errors.email ? 'border-red-500' : 'border-[#a4acac]'
                  } rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white`}
                placeholder="you@company.com"
                aria-required="true"
                aria-invalid={!!errors.email}
                required
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm text-left">{errors.email}</p>
              )}
            </div>

            {/* Phone (Optional) */}
            <div>
              <label htmlFor="phone" className="block text-white text-sm font-medium mb-1 text-left">
                Phone Number <span className="text-[#A5ACAF]">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white"
                placeholder="(123) 456-7890"
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-white text-sm font-medium mb-1 text-left">
                Company Name <span className="text-[#FD5A1E]">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-[#4d4d4d] border ${errors.companyName ? 'border-red-500' : 'border-[#a4acac]'
                  } rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white`}
                placeholder="Your company"
                aria-required="true"
                aria-invalid={!!errors.companyName}
                required
              />
              {errors.companyName && (
                <p className="mt-1 text-red-500 text-sm text-left">{errors.companyName}</p>
              )}
            </div>

            {/* Message (Optional) */}
            <div>
              <label htmlFor="message" className="block text-white text-sm font-medium mb-1 text-left">
                Message <span className="text-[#A5ACAF]">(Optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white"
                placeholder="Tell us about your location and needs"
              ></textarea>
            </div>

            {/* Submit Button - Responsive width */}
            <div className="text-left">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 bg-[#FD5A1E] text-white font-medium rounded-lg hover:bg-[#FD5A1E]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Request Information'}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info Column */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#FD5A1E]/20 to-black relative p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center text-left">
          {/* Contact content */}
          <Text variant="h3" className="mb-8 text-left">
            Contact Information
          </Text>

          <div className="space-y-6">
            {/* Contact items with responsive text */}
            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 bg-[#FD5A1E]/10 rounded-full text-[#FD5A1E] mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <Text variant="body-sm" color="default" className="font-medium">Phone</Text>
                <a
                  href="tel:+12094035450"
                  className="text-[#A5ACAF] hover:text-[#FD5A1E] text-sm sm:text-base"
                >
                  (209) 403-5450
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-[#FD5A1E] mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Email</p>
                <a href="mailto:ampdesignandconsulting@gmail.com" className="text-[#A5ACAF] hover:text-[#FD5A1E]">ampdesignandconsulting@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-[#FD5A1E] mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Location</p>
                <p className="text-[#A5ACAF]">Modesto, CA 95354</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold text-white mb-4 text-left">Business Hours</h3>
            <p className="text-[#A5ACAF]">
              Monday - Friday: 8AM - 8PM<br />
              Saturday - Sunday: 8AM - 8PM
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContactForm;