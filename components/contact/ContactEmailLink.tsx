
'use client';

import EmailLink from "./EmailLink";

// Contact Page Email Link
const ContactEmailLink = () => (
  <EmailLink
    email="ampdesignandconsulting@gmail.com"
    subject="Contact Form Inquiry - AMP Vending"
    body="Hello AMP Vending team, I am interested in learning more about your vending machine solutions."
    className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#FD5A1E]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
    aria-label="Email us about vending machine solutions"
  >
    <svg 
      className="w-5 h-5 mr-2" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
      />
    </svg>
    Email Us
  </EmailLink>
);

export default ContactEmailLink;