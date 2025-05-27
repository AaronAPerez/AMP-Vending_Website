import { Metadata } from 'next';
import ContactPageClient from '@/app/ContactPageClient';

/**
 * Contact Page - Server Component
 * 
 * This is the main contact page that renders on the server.
 * It only handles metadata and passes static data to the client component.
 * This separation fixes the prerender error by keeping server/client boundaries clear.
 */

// Static metadata for SEO
import Script from 'next/script';
import { Metadata, Viewport } from 'next';
import ContactForm from '@/components/contact/ContactForm';
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

export const metadata: Metadata = {
  title: 'Contact AMP Vending | Premium Vending Machine Solutions',
  description: 'Contact AMP Vending for premium vending machine solutions with 21.5" touchscreen technology. Enhance workplace satisfaction with customizable snack and beverage options.',
  keywords: 'contact vending machine company, premium vending solutions, touchscreen vending, workplace satisfaction, Modesto vending',
  openGraph: {
    title: 'Contact AMP Vending - Premium Vending Solutions',
    description: 'Get in touch for premium vending machine solutions with latest technology and customizable options.',
    url: 'https://www.ampvendingmachines.com/contact',
    siteName: 'AMP Vending',
    images: [{
      url: 'https://www.ampvendingmachines.com/images/og/contact.jpg',
      width: 1200,
      height: 630,
      alt: 'Contact AMP Vending for workplace solutions',
    }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact AMP Vending - Premium Vending Solutions',
    description: 'Premium vending machine solutions with touchscreen technology',
    images: ['https://www.ampvendingmachines.com/images/og/contact.jpg'],
  },
  alternates: {
    canonical: 'https://www.ampvendingmachines.com/contact',
  },
};

/**
 * Contact Page Component
 * 
 * Server component that renders the contact page.
 * All interactive functionality is handled in the ClientPage component.
 */
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};


export default function ContactPage() {
  // Static data that can be safely passed to client components
  const pageData = {
    title: "Contact AMP Vending",
    subtitle: "Get in touch for premium vending solutions with the latest technology",
    businessInfo: {
      phone: "(209) 403-5450",
      email: "ampdesignandconsulting@gmail.com",
      address: {
        street: "4120 Dale Rd ste j8 1005",
        city: "Modesto",
        state: "CA",
        zip: "95354"
      },
      hours: {
        weekdays: "Monday - Friday: 8AM - 8PM",
        weekends: "Saturday - Sunday: 8AM - 8PM"
      }
    }
  };

  return <ContactPageClient pageData={pageData} />
}