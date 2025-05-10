'use client';

import { useState, FormEvent } from 'react';
import { toast } from 'sonner'; // Assuming you use Sonner for toast notifications

interface ContactFormProps {
  /**
   * Optional CSS classes to apply to the form container
   */
  className?: string;
}

/**
 * Contact Form Component
 * 
 * A responsive, accessible form for the homepage that sends data to the server
 * and triggers an automatic email reply to the user
 */
const ContactForm = ({ className = '' }: ContactFormProps) => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    message: '',
  });
  
  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form submission handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.email || !formData.companyName) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Start submission
    setIsSubmitting(true);
    
    try {
      // Prepare the data to match the expected format in your API route
      const submissionData = {
        firstName: formData.firstName,
        lastName: formData.lastName || '', // Handle empty lastName
        email: formData.email,
        phone: '', // Not in this simple form, but required by the schema
        companyName: formData.companyName,
        jobTitle: '', // Not in this simple form, but required by the schema
        employeeCount: '1-10', // Default value since not in this form
        streetAddress: '', // Not in this simple form, but required by the schema
        city: '', // Not in this simple form, but required by the schema
        state: '', // Not in this simple form, but required by the schema
        zipCode: '95354', // Default to Modesto zip code
        interestedMachine: 'unsure', // Default to "not sure" option
        message: formData.message,
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
      } else {
        // Show success message
        toast.success('Thank you! Your message has been sent. Check your email for confirmation.');
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
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
  };
  
  // Split name input handler (handles first/last name in a single field)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fullName = e.target.value;
    const nameParts = fullName.split(' ');
    
    if (nameParts.length > 1) {
      // If there's a space, assume first name and last name
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      
      setFormData(prev => ({
        ...prev,
        firstName,
        lastName
      }));
    } else {
      // Otherwise, just set the first name
      setFormData(prev => ({
        ...prev,
        firstName: fullName,
        lastName: ''
      }));
    }
  };
  
  return (
    <div className={`bg-black rounded-xl shadow-xl overflow-hidden md:flex ${className}`}>
      <div className="md:w-1/2 p-8 md:p-12">
        <h2
          id="contact-heading"
          className="text-2xl md:text-3xl font-bold text-white mb-4"
        >
          Ready to Enhance Your Workplace?
        </h2>
        <p className="text-[#A5ACAF] mb-6">
          Fill out the form and our team will get back to you within 24 hours to discuss your vending needs.
        </p>
      
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-white text-sm font-medium mb-1">
              Full Name <span className="text-[#FD5A1E]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={`${formData.firstName} ${formData.lastName}`.trim()}
              onChange={handleNameChange}
              className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white"
              placeholder="Your name"
              aria-required="true"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white text-sm font-medium mb-1">
              Email Address <span className="text-[#FD5A1E]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white"
              placeholder="you@company.com"
              aria-required="true"
              required
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-white text-sm font-medium mb-1">
              Company Name <span className="text-[#FD5A1E]">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white"
              placeholder="Your company"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-white text-sm font-medium mb-1">
              Message
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-6 py-3 bg-[#FD5A1E] text-white font-medium rounded-lg hover:bg-[#FD5A1E]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Request Information'}
          </button>
        </form>
      </div>

      <div className="md:w-1/2 bg-gradient-to-br from-[#FD5A1E]/20 to-black relative p-8 md:p-12 flex flex-col justify-center">
        <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 text-[#FD5A1E] mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium">Phone</p>
              <a href="tel:+12094035450" className="text-[#A5ACAF] hover:text-[#FD5A1E]">(209) 403-5450</a>
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

        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Business Hours</h3>
          <p className="text-[#A5ACAF]">
            Monday - Friday: 9AM - 5PM<br />
            Saturday - Sunday: Closed
          </p>
          <p className="text-[#FD5A1E] mt-2">24/7 Customer Support Available</p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;