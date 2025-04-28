'use client';

import React, { useState } from 'react';
import { ContactFormData, FormErrors } from './formTypes';
import { validateForm, formatPhoneNumber } from './formValidation';

interface ContactFormProps {
  onSubmitSuccess?: (data: ContactFormData) => void;
  onSubmitError?: (errors: FormErrors) => void;
  className?: string;
}

const ContactForm = ({ onSubmitSuccess,
    onSubmitError, className=''}: ContactFormProps) => {
  // Initial form state
  const initialFormData: Partial<ContactFormData> = {
    name: '',
    email: '',
    phone: '',
    companyName: '',
    employeeCount: '',
    businessType: '',
    message: '',
    preferredContact: 'email',
    interests: [],
    hearAboutUs: '',
    currentVending: false,
    bestTimeToCall: '',
    urgency: 'medium'
  };
  
  // Form state
  const [formData, setFormData] = useState<Partial<ContactFormData>>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formStage, setFormStage] = useState<number>(1);
  
  // Business type options
  const businessTypes = [
    { value: 'office', label: 'Office Space' },
    { value: 'manufacturing', label: 'Manufacturing/Industrial' },
    { value: 'healthcare', label: 'Healthcare Facility' },
    { value: 'education', label: 'Educational Institution' },
    { value: 'retail', label: 'Retail' },
    { value: 'transportation', label: 'Transportation Hub' },
    { value: 'fitness', label: 'Fitness Center' },
    { value: 'other', label: 'Other' }
  ];
  
  // Employee count options
  const employeeCounts = [
    { value: 'under_25', label: 'Under 25' },
    { value: '25_50', label: '25-50' },
    { value: '51_100', label: '51-100' },
    { value: '101_250', label: '101-250' },
    { value: 'over_250', label: 'Over 250' }
  ];
  
  // Interest options
  const interestOptions = [
    { value: 'snacks', label: 'Snack Vending' },
    { value: 'beverages', label: 'Beverage Vending' },
    { value: 'combo', label: 'Combo Machines' },
    { value: 'healthy', label: 'Healthy Options' },
    { value: 'coffee', label: 'Coffee Services' },
    { value: 'revenue', label: 'Revenue Sharing' }
  ];
  
  // How did you hear about us options
  const hearAboutUsOptions = [
    { value: 'search', label: 'Search Engine' },
    { value: 'social', label: 'Social Media' },
    { value: 'referral', label: 'Referral' },
    { value: 'email', label: 'Email' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'other', label: 'Other' }
  ];
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for phone numbers
    if (name === 'phone') {
      setFormData({
        ...formData,
        [name]: formatPhoneNumber(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error for this field if it exists
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
    const { name, value, checked } = e.target;
    
    if (name === 'interests') {
      const currentInterests = [...(formData.interests || [])];
      
      if (checked) {
        currentInterests.push(value);
      } else {
        const index = currentInterests.indexOf(value);
        if (index > -1) {
          currentInterests.splice(index, 1);
        }
      }
      
      setFormData({
        ...formData,
        interests: currentInterests
      });
    } else {
      setFormData({
        ...formData,
        [name]: checked
      });
    }
  };
  
  // Handle radio button changes
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Move to next form stage
  const handleNextStage = () => {
    // Validate current stage fields
    const stageErrors: FormErrors = {};
    
    if (formStage === 1) {
      // Validate basic info
      if (!formData.name?.trim()) stageErrors.name = 'Name is required';
      if (!formData.email?.trim()) stageErrors.email = 'Email is required';
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        stageErrors.email = 'Invalid email address';
      }
      if (!formData.phone?.trim()) stageErrors.phone = 'Phone number is required';
    }
    
    if (Object.keys(stageErrors).length > 0) {
      setErrors(stageErrors);
      return;
    }
    
    // Proceed to next stage
    setFormStage(prevStage => prevStage + 1);
  };
  
  // Move to previous form stage
  const handlePrevStage = () => {
    setFormStage(prevStage => Math.max(1, prevStage - 1));
  };
  
  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all form fields
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      if (onSubmitError) onSubmitError(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Send data to your API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Error submitting form');
      }
      
      
      // Success
      setSubmitSuccess(true);
      if (onSubmitSuccess) onSubmitSuccess(formData as ContactFormData);
      
      // Reset form
      setFormData(initialFormData);
      setFormStage(1);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('There was an error submitting your request. Please try again.');
      if (onSubmitError) onSubmitError({ form: 'Submission failed' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={`bg-[#000000] rounded-lg overflow-hidden border border-[#4d4d4d] ${className}`}>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">Request Free Consultation</h3>
        
        {submitSuccess ? (
          // Success message
          <div className="bg-green-900/20 border border-green-500 text-green-300 rounded-lg p-4 mb-4">
            <h4 className="font-bold mb-2">Thank You!</h4>
            <p>Your consultation request has been submitted successfully. One of our representatives will contact you shortly.</p>
            <button 
              className="mt-4 px-4 py-2 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors text-sm"
              onClick={() => setSubmitSuccess(false)}
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          // Form
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error message */}
            {submitError && (
              <div className="bg-red-900/20 border border-red-500 text-red-300 rounded-lg p-4 mb-4">
                {submitError}
              </div>
            )}
            
            {/* Stage indicator */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-full bg-[#4d4d4d] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#FD5A1E] h-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${(formStage / 3) * 100}%` }}
                />
              </div>
              <span className="ml-4 text-[#A5ACAF] text-sm whitespace-nowrap">Step {formStage} of 3</span>
            </div>
            
            {/* Stage 1: Basic Information */}
            {formStage === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                    Name <span className="text-[#FD5A1E]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-[#4d4d4d] border ${errors.name ? 'border-red-500' : 'border-[#a4acac]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                    Email <span className="text-[#FD5A1E]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-[#4d4d4d] border ${errors.email ? 'border-red-500' : 'border-[#a4acac]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                    Phone <span className="text-[#FD5A1E]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-[#4d4d4d] border ${errors.phone ? 'border-red-500' : 'border-[#a4acac]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]`}
                    placeholder="(123) 456-7890"
                  />
                  {errors.phone && <p className="mt-1 text-red-500 text-xs">{errors.phone}</p>}
                </div>
                
                <div>
                  <label className="block text-[#F5F5F5] text-sm font-medium mb-1">
                    Preferred Contact Method <span className="text-[#FD5A1E]">*</span>
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleRadioChange}
                        className="form-radio text-[#FD5A1E]"
                      />
                      <span className="ml-2 text-[#A5ACAF]">Email</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleRadioChange}
                        className="form-radio text-[#FD5A1E]"
                      />
                      <span className="ml-2 text-[#A5ACAF]">Phone</span>
                    </label>
                  </div>
                  {errors.preferredContact && <p className="mt-1 text-red-500 text-xs">{errors.preferredContact}</p>}
                </div>
                
                {formData.preferredContact === 'phone' && (
                  <div>
                    <label htmlFor="bestTimeToCall" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                      Best Time to Call
                    </label>
                    <select
                      id="bestTimeToCall"
                      name="bestTimeToCall"
                      value={formData.bestTimeToCall}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]"
                    >
                      <option value="">Select a time</option>
                      <option value="morning">Morning (9am-12pm)</option>
                      <option value="afternoon">Afternoon (12pm-3pm)</option>
                      <option value="evening">Evening (3pm-5pm)</option>
                    </select>
                  </div>
                )}
              </div>
            )}
            
            {/* Stage 2: Business Information */}
            {formStage === 2 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="companyName" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                    Company Name <span className="text-[#FD5A1E]">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-[#4d4d4d] border ${errors.companyName ? 'border-red-500' : 'border-[#a4acac]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]`}
                    placeholder="Your company name"
                  />
                  {errors.companyName && <p className="mt-1 text-red-500 text-xs">{errors.companyName}</p>}
                </div>
                
                <div>
                  <label htmlFor="businessType" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                    Business Type <span className="text-[#FD5A1E]">*</span>
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-[#4d4d4d] border ${errors.businessType ? 'border-red-500' : 'border-[#a4acac]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]`}
                  >
                    <option value="">Select business type</option>
                    {businessTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  {errors.businessType && <p className="mt-1 text-red-500 text-xs">{errors.businessType}</p>}
                </div>
                
                <div>
                  <label htmlFor="employeeCount" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                    Employee Count <span className="text-[#FD5A1E]">*</span>
                  </label>
                  <select
                    id="employeeCount"
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-[#4d4d4d] border ${errors.employeeCount ? 'border-red-500' : 'border-[#a4acac]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]`}
                  >
                    <option value="">Select employee count</option>
                    {employeeCounts.map(count => (
                      <option key={count.value} value={count.value}>{count.label}</option>
                    ))}
                  </select>
                  {errors.employeeCount && <p className="mt-1 text-red-500 text-xs">{errors.employeeCount}</p>}
                </div>
                
                <div>
                  <label htmlFor="propertyType" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]"
                  >
                    <option value="">Select property type</option>
                    <option value="owned">Owned Property</option>
                    <option value="leased">Leased Property</option>
                    <option value="shared">Shared Office Space</option>
                  </select>
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      id="currentVending"
                      name="currentVending"
                      checked={formData.currentVending}
                      onChange={handleCheckboxChange}
                      className="form-checkbox text-[#FD5A1E] rounded"
                    />
                    <label htmlFor="currentVending" className="ml-2 text-[#F5F5F5] text-sm">
                      We currently have vending machines
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {/* Stage 3: Vending Needs */}
            {formStage === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[#F5F5F5] text-sm font-medium mb-2">
                    What are you interested in? <span className="text-[#FD5A1E]">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map(option => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`interest_${option.value}`}
                          name="interests"
                          value={option.value}
                          checked={formData.interests?.includes(option.value)}
                          onChange={handleCheckboxChange}
                          className="form-checkbox text-[#FD5A1E] rounded"
                        />
                        <label htmlFor={`interest_${option.value}`} className="ml-2 text-[#A5ACAF] text-sm">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.interests && <p className="mt-1 text-red-500 text-xs">{errors.interests}</p>}
                </div>
                
                <div>
                  <label htmlFor="urgency" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                    How soon are you looking to get started?
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]"
                  >
                    <option value="immediate">As soon as possible</option>
                    <option value="medium">Within the next month</option>
                    <option value="planning">Just planning ahead</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="hearAboutUs" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                    How did you hear about us?
                  </label>
                  <select
                    id="hearAboutUs"
                    name="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]"
                  >
                    <option value="">Select an option</option>
                    {hearAboutUsOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-[#F5F5F5] text-sm font-medium mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-[#F5F5F5]"
                    placeholder="Tell us about any specific requirements or questions you have"
                  />
                  {errors.message && <p className="mt-1 text-red-500 text-xs">{errors.message}</p>}
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {formStage > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStage}
                  className="px-4 py-2 bg-transparent border border-[#a4acac] text-[#F5F5F5] rounded-full hover:bg-[#4d4d4d] transition-colors"
                >
                  Back
                </button>
              ) : (
                <div></div> // Empty div for spacing
              )}
              
              {formStage < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStage}
                  className="px-4 py-2 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              )}
            </div>
            
            {/* Form Privacy Notice */}
            <div className="mt-6 text-xs text-[#A5ACAF] text-center">
              <p>
                By submitting this form, you agree to our{' '}
                <a href="/privacy-policy" className="text-[#FD5A1E] hover:underline">Privacy Policy</a>.
                We&apos;ll only use your information to respond to your inquiry and provide relevant updates.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default 
ContactForm;