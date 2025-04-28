import React, { useState, FormEvent } from 'react';

/**
 * SimpleContactForm - A streamlined version focusing on fixing the API issue
 */
const SimpleContactForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle form submission - with detailed logging for debugging
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitError(null);

    // Temporary solution: simulate success without making API call
    // Comment this section out when API is working
    /*
    setTimeout(() => {
      console.log('Form submitted with data:', formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
    return;
    */

    // Format data for email API
    const emailData = {
      ...formData,
      destinations: [
        'contact@ampvendingmachines.com',
        'ampdesignandconsulting@gmail.com',
        'aaronperezdev@gmail.com'
      ]
    };

    try {
      console.log('Submitting form data:', emailData);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      console.log('Response status:', response.status);
      
      // Try to parse the response (helpful for debugging)
      let data;
      try {
        data = await response.json();
        console.log('Response data:', data);
      } catch (e) {
        console.error('Error parsing response:', e);
        console.log('Response text:', await response.text().catch(() => 'Could not get response text'));
      }

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
      } else {
        throw new Error(data?.message || `Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="py-16 bg-[#4d4d4d]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-xl shadow-xl overflow-hidden md:flex">
          <div className="md:w-1/2 p-8 md:p-12">
            <h2
              id="contact-heading"
              className="text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-4"
            >
              Ready to Enhance Your Workplace?
            </h2>
            <p className="text-[#A5ACAF] mb-6">
              Fill out the form and our team will get back to you within 24 hours to discuss your vending needs.
            </p>

            {/* Success message */}
            {submitSuccess && (
              <div 
                className="mb-6 bg-green-800/30 border border-green-600 text-green-100 p-4 rounded-lg"
                role="alert"
              >
                <p className="font-medium">Thank you for contacting us!</p>
                <p>We&apos;ve received your message and will get back to you soon.</p>
              </div>
            )}

            {/* Error message */}
            {submitError && (
              <div 
                className="mb-6 bg-red-800/30 border border-red-600 text-red-100 p-4 rounded-lg"
                role="alert"
              >
                <p className="font-medium">There was a problem sending your message:</p>
                <p>{submitError}</p>
                <p className="mt-2">Please try again or contact us directly at (209) 403-5450.</p>
              </div>
            )}

            {/* Contact Form */}
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]"
                  placeholder="Your name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]"
                  placeholder="you@company.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]"
                  placeholder="Your company"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]"
                  placeholder="Tell us about your location and needs"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-lg hover:bg-[#FD5A1E]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Request Information'}
              </button>
            </form>
          </div>

          <div className="md:w-1/2 bg-gradient-to-br from-[#FD5A1E]/20 to-black relative p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-[#F5F5F5] mb-6">Contact Information</h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-[#FD5A1E] mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#F5F5F5] font-medium">Phone</p>
                  <a href="tel:+12094035450" className="text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors">(209) 403-5450</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-[#FD5A1E] mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#F5F5F5] font-medium">Email</p>
                  <a 
                    href="mailto:contact@ampvendingmachines.com" 
                    className="text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors break-words"
                  >
                    contact@ampvendingmachines.com
                  </a>
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
                  <p className="text-[#F5F5F5] font-medium">Location</p>
                  <p className="text-[#A5ACAF]">Modesto, CA 95354</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">Business Hours</h3>
              <p className="text-[#A5ACAF]">
                Monday - Friday: 9AM - 5PM<br />
                Saturday - Sunday: Closed
              </p>
              <p className="text-[#FD5A1E] mt-2">24/7 Customer Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleContactForm;