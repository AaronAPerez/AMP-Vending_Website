'use client';

import React from 'react';
import ContactForm from './ContactForm';

/**
 * HomePage Contact Section Component
 * 
 * A full-width contact section that includes the contact form and surrounding UI elements
 */
const HomeContactSection = () => {
  return (
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
          Get In Touch
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
          Contact AMP Vending
        </h1>
        <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto mb-8">
          Have questions about our vending solutions? We&apos;re here to help. Fill out the form below and our team will get back to you soon.
        </p>
        
        {/* Contact Form Component */}
        <ContactForm />
      </div>
  );
};

export default HomeContactSection;