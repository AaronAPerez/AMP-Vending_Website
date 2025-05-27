'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import ContactForm from '@/components/contact/ContactForm';
import Container from '../components/ui/layout/Container';

/**
 * Interface for business information passed from server component
 */
interface BusinessInfo {
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  hours: {
    weekdays: string;
    weekends: string;
  };
}

/**
 * Interface for page data passed from server component
 */
interface PageData {
  title: string;
  subtitle: string;
  businessInfo: BusinessInfo;
}

/**
 * Props for ContactPageClient component
 */
interface ContactPageClientProps {
  pageData: PageData;
}

/**
 * Contact Page Client Component
 * 
 * This client component handles all the interactive functionality
 * for the contact page while receiving static data from the server component.
 * This separation fixes the prerender error by maintaining clear boundaries.
 */
export default function ContactPageClient({ pageData }: ContactPageClientProps) {
  const { title, subtitle, businessInfo } = pageData;

  return (
    <PageLayout>
      {/* Structured Data - Client Side */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "AMP Vending Contact Page",
            "description": "Contact AMP Vending for premium vending machine solutions",
            "url": "https://www.ampvendingmachines.com/contact",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "AMP Vending",
              "telephone": "+12094035450",
              "email": "ampdesignandconsulting@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": businessInfo.address.street,
                "addressLocality": businessInfo.address.city,
                "addressRegion": businessInfo.address.state,
                "postalCode": businessInfo.address.zip,
                "addressCountry": "US"
              }
            }
          })
        }}
      />

      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-black via-black/95 to-black py-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="#A5ACAF" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#contact-grid)" />
            </svg>
          </div>

          {/* Gradient Accents */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#FD5A1E]/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#FD5A1E]/10 to-transparent rounded-full blur-3xl"></div>

          <Container>
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Page Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
                <svg
                  className="w-5 h-5 text-[#FD5A1E] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[#FD5A1E] font-medium text-sm">Get In Touch</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6">
                {title}
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-[#A5ACAF] mb-12 leading-relaxed">
                {subtitle}
              </p>

              {/* Quick Contact Options */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <a
                  href={`tel:+1${businessInfo.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 px-4 py-3 bg-[#111111] text-[#F5F5F5] rounded-full hover:bg-[#222222] transition-colors border border-[#333333]"
                  aria-label={`Call us at ${businessInfo.phone}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {businessInfo.phone}
                </a>

                <a
                  href={`mailto:${businessInfo.email}`}
                  className="flex items-center gap-2 px-4 py-3 bg-[#111111] text-[#F5F5F5] rounded-full hover:bg-[#222222] transition-colors border border-[#333333]"
                  aria-label={`Email us at ${businessInfo.email}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {businessInfo.email}
                </a>

                <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] text-[#F5F5F5] rounded-full border border-[#333333]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {businessInfo.address.city}, {businessInfo.address.state}
                </div>

                <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] text-[#F5F5F5] rounded-full border border-[#333333]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">8AM - 8PM Daily</span>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-black">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <ContactForm />
            </motion.div>
          </Container>
        </section>

        {/* Business Information Section */}
        <section className="py-16 bg-gradient-to-b from-black to-[#111111]">
          <Container>
            <motion.div
              className="bg-[#111111] rounded-xl overflow-hidden border border-[#333333]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold text-[#F5F5F5] mb-6">
                  Our Commitment to Excellence
                </h2>
                <p className="text-[#A5ACAF] max-w-3xl mx-auto mb-8">
                  When you reach out to AMP Vending, you can expect a prompt response within 24 hours.
                  We&apos;re dedicated to providing exceptional service from the first contact through ongoing support.
                </p>

                {/* Business Hours */}
                <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-8">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-[#F5F5F5] mb-2">Business Hours</h3>
                    <p className="text-[#A5ACAF] text-sm">{businessInfo.hours.weekdays}</p>
                    <p className="text-[#A5ACAF] text-sm">{businessInfo.hours.weekends}</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-[#F5F5F5] mb-2">Service Area</h3>
                    <p className="text-[#A5ACAF] text-sm">Central California</p>
                    <p className="text-[#A5ACAF] text-sm">Professional Installation & Support</p>
                  </div>
                </div>

                {/* Feature badges */}
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-[#0a0a0a] px-4 py-2 rounded-full border border-[#FD5A1E]/30 text-[#F5F5F5] text-sm">
                    <span className="text-[#FD5A1E] mr-2">✓</span> 24-Hour Response Time
                  </div>
                  <div className="bg-[#0a0a0a] px-4 py-2 rounded-full border border-[#FD5A1E]/30 text-[#F5F5F5] text-sm">
                    <span className="text-[#FD5A1E] mr-2">✓</span> Premium Consultation
                  </div>
                  <div className="bg-[#0a0a0a] px-4 py-2 rounded-full border border-[#FD5A1E]/30 text-[#F5F5F5] text-sm">
                    <span className="text-[#FD5A1E] mr-2">✓</span> Ongoing Support
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Privacy Notice */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="text-sm text-[#A5ACAF]">
                We value your privacy. Information submitted through this form will only be used to respond to your inquiry.
              </p>
            </motion.div>
          </Container>
        </section>
      </main>
    </PageLayout>
  );
}