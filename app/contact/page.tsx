import Script from 'next/script';
import { Metadata } from 'next';
import ContactForm from '@/components/sections/ContactForm';
import GoogleMapComponent from '@/components/GoogleMapComponent';


// Dynamically import the map component to avoid SSR issues
// const GoogleMapComponent = dynamic(() => import('@/components/GoogleMapComponent'), {
//   ssr: false,
//   loading: () => (
//     <div className="bg-[#4d4d4d] h-[400px] flex items-center justify-center">
//       <div className="text-center">
//         <svg className="h-12 w-12 animate-spin text-[#FD5A1E] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//         </svg>
//         <p className="text-[#F5F5F5]">Loading map...</p>
//       </div>
//     </div>
//   )
// });

// export const metadata: Metadata = {
//   title: 'Contact Us | AMP Vending',
//   description: 'Get in touch with AMP Vending for personalized vending machine solutions for your workplace.',
// };
export const metadata: Metadata = {
  title: 'Contact Us | AMP Vending',
  description: 'Get in touch with AMP Vending for personalized vending machine solutions for your workplace.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://amp-vending-website.vercel.app'}/contact`,
  },
  openGraph: {
    title: 'Contact AMP Vending',
    description: 'Reach out to our team for custom vending machine solutions for your business.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://amp-vending-website.vercel.app'}/contact`,
    siteName: 'AMP Vending',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://amp-vending-website.vercel.app'}/images/contact-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Contact AMP Vending',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <Script id="contact-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "AMP Vending Contact Page",
          "description": "Contact AMP Vending for vending machine solutions",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://amp-vending-website.vercel.app/contact"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-209-403-5450",
            "contactType": "customer service",
            "email": "ampdesignandconsulting@gmail.com",
            // "email": "contact@aaronaperez.dev",
            "areaServed": "US",
            "availableLanguage": "English"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Vending Way",
            "addressLocality": "Modesto",
            "addressRegion": "CA",
            "postalCode": "95354",
            "addressCountry": "US"
          }
        })
      }} />
      
      <div className="bg-[#000000] min-h-screen">
        {/* Hero Section */}
        <div className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {/* Background Pattern */}
            <div className="absolute inset-0">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="#A5ACAF" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#FD5A1E]/10 to-transparent"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4">
              Contact AMP Vending
            </h1>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              Have questions about our vending solutions? We&apos;re here to help. Fill out the form below and our team will get back to you soon.
            </p>
          </div>
        </div>
        
        {/* Contact Form Section */}
        <div className="pb-16">
          <ContactForm />
        </div>
        
        {/* Map Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-2xl font-bold text-[#F5F5F5] mb-8 text-center">Find Us</h2>
        <div className="rounded-lg overflow-hidden shadow-lg border border-[#a4acac]">
          <GoogleMapComponent apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} />
        </div>
      </div>
        
        {/* Additional Contact Information */}
        <div className="bg-[#4d4d4d] py-16 border-t border-[#a4acac]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="bg-[#000000] p-6 rounded-lg border border-[#a4acac] hover:border-[#FD5A1E] transition-colors">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <div className="bg-[#FD5A1E]/10 p-3 rounded-full text-[#FD5A1E]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#F5F5F5] ml-4">Our Location</h3>
                </div>
                <p className="text-[#A5ACAF]">
                  123 Vending Way<br />
                  Modesto, CA 95354<br />
                  United States
                </p>
              </div>
              
              <div className="bg-[#000000] p-6 rounded-lg border border-[#a4acac] hover:border-[#FD5A1E] transition-colors">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <div className="bg-[#FD5A1E]/10 p-3 rounded-full text-[#FD5A1E]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#F5F5F5] ml-4">Contact Info</h3>
                </div>
                <p className="text-[#A5ACAF]">
                  Email:<a href="mailto:contact@aaronaperez.dev" className="text-[#FD5A1E] hover:underline"
                  > 
                  <br></br>
                  ampdesignandconsulting@gmail.com</a>
                  {/* <a href="mailto:contact@aaronaperez.dev" className="text-[#FD5A1E] hover:underline">contact@aaronaperez.dev</a> */}
                  <br />
                  Phone: <a href="tel:+12094035450" className="text-[#FD5A1E] hover:underline">
                    <br></br>
                    (209) 403-5450</a>
                </p>
              </div>
              
              <div className="bg-[#000000] p-6 rounded-lg border border-[#a4acac] hover:border-[#FD5A1E] transition-colors">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <div className="bg-[#FD5A1E]/10 p-3 rounded-full text-[#FD5A1E]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#F5F5F5] ml-4">Business Hours</h3>
                </div>
                <p className="text-[#A5ACAF]">
                  Monday - Friday: 9AM - 5PM<br />
                  Saturday - Sunday: Closed<br />
                  <span className="text-[#FD5A1E]">24/7 Customer Support</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">How can you offer machines at zero cost?</h3>
              <p className="text-[#A5ACAF]">
              Through our innovative business model, we&quot;re able to provide premium machines at no cost to qualified locations that meet our minimum traffic requirements.
              </p>
            </div>
            
            <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">How often are machines restocked?</h3>
              <p className="text-[#A5ACAF]">
                We monitor inventory levels and typically restock weekly, though high-traffic 
                locations may be serviced more frequently to ensure products are always available.
              </p>
            </div>
            
            <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">What types of payment are accepted?</h3>
              <p className="text-[#A5ACAF]">
                Our machines accept multiple payment methods including credit/debit cards, 
                mobile payments (Apple Pay, Google Pay), as well as traditional cash and coins.
              </p>
            </div>
            
            <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">What if a machine needs service?</h3>
              <p className="text-[#A5ACAF]">
                We provide 24/7 support for service issues. Each machine has contact information 
                displayed, and we respond to service calls within 24 hours.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#000000] to-[#4d4d4d] py-16 border-t border-[#a4acac]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">Ready to transform your workplace?</h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto mb-8">
              Join the growing number of businesses enhancing employee satisfaction with our vending solutions.
            </p>
            <div className="inline-flex flex-wrap justify-center gap-4">
              <a 
                href="/contact" 
                className="px-6 py-3 bg-[#FD5A1E] text-white rounded-full font-medium shadow-md hover:bg-[#FD5A1E]/90 transition-colors"
              >
                Contact Us
              </a>
              {/* <a 
                href="tel:+12094035450" 
                className="px-6 py-3 bg-transparent border border-[#A5ACAF] text-[#F5F5F5] rounded-lg font-medium hover:bg-[#4d4d4d] transition-colors"
              >
                Call Us Now
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


