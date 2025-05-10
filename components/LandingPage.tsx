import React from 'react';
import HeroParallax from './hero/HeroParallax';
import CTASection from './sections/CTASection';
import ShowcaseLensEffect from './sections/ShowcaseLensEffect';
import ProductSection from './sections/ProductSection';
import ProcessSection from './sections/ProcessSection';
import ServiceAreaMapPreview from './previews/ServiceAreaMapPreview';
import ContactForm from './sections/ContactForm';
import Link from 'next/link';


/**
 * LandingPage Component
 * 
 * Main landing page that combines various sections for the homepage
 */
const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section with gradient background */}
      <section id="hero"
        className="relative min-h-screen bg-gradient-to-b from-[#000000] via-[#000000]/95 to-[#000000]/85"
        aria-labelledby="hero-heading">

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[#000000]/60 z-10" aria-hidden="true"></div>
        <HeroParallax />
      </section>

      {/* Transition element */}
      <div className="h-32 bg-gradient-to-b from-transparent to-[#000000] -mt-32 relative z-20"></div>

      {/* Vending Machine Showcase */}
      <section id="vending-machine-showcase"
        className="bg-[#000000] py-16">
        <ShowcaseLensEffect />
      </section>


      {/* Products Showcase */}
      <section id="products-showcase" className="bg-[#000000]" >
        <ProductSection />
      </section>

      {/* Process Section with subtle dark gray background */}
      <section
        className="bg-black py-16"
        aria-labelledby="process-heading"
      >
        <ProcessSection />
      </section>

      {/* Service Area Map Preview */}
      <section id="service-area-preview" className="py-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Service Area Map Preview Component  */}
            <div className="order-2 md:order-1">
              <ServiceAreaMapPreview className="shadow-lg" />
            </div>

            <div className="order-1 md:order-2">
              <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
                Service Coverage
              </span>
              <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
                Serving Central California
              </h2>
              <p className="text-[#A5ACAF] mb-6">
                AMP Vending provides premium vending services throughout Modesto, Stockton, Merced, and surrounding areas in Central California.
              </p>

              {/* Service areas list  */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#FD5A1E] mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">Modesto metropolitan area</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#FD5A1E] mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">Stockton and surrounding communities</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#FD5A1E] mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">Merced and Turlock regions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#FD5A1E] mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">
                    Tracy, Manteca, and Lodi areas
                  </span>
                </li>
              </ul>
              {/* Call to action  */}
              <Link
                href="/service-areas"
                className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors font-medium"
              >
                Check Your Eligibility
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section >


      {/* Service Area Map Preview with smooth transition */}
      {/* <section
        className="bg-gradient-to-b from-[#111111] via-[#0d0d0d] to-[#000000] px-4 py-16"
        aria-labelledby="service-area-map-preview"
      >
        <ServiceAreaMapPreview />
      </section>  */}

      {/* <StanRTAComparison/> */}
      {/* Before/After Transformation Section */}
      {/* <BeforeAfterSection /> */}

      {/* Testimonials Section */}
      {/* <Testimonials/> */}




      {/* Contact Form Section */}
      <section
        className="py-16 bg-black"
        aria-labelledby="contact-heading"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Contact AMP Vending
          </h1>
          <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
            Have questions about our vending solutions? We&apos;re here to help. Fill out the form below and our team will get back to you soon.
          </p>
        </div>
        <ContactForm />
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black rounded-xl shadow-xl overflow-hidden md:flex">
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

            
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-white text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white"
                     placeholder="Your name"
                     aria-required="true"
                   />
                 </div>

                 <div>
                   <label htmlFor="email" className="block text-white text-sm font-medium mb-1">
                     Email Address
                   </label>
                   <input
                     type="email"
                     id="email"
                     className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white"
                     placeholder="you@company.com"
                     aria-required="true"
                   />
                 </div>

                 <div>
                   <label htmlFor="company" className="block text-white text-sm font-medium mb-1">
                     Company Name
                   </label>
                   <input
                     type="text"
                     id="company"
                     className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white"
                     placeholder="Your company"
                   />
                 </div>

                 <div>
                   <label htmlFor="message" className="block text-white text-sm font-medium mb-1">
                     Message
                   </label>
                   <textarea
                     id="message"
                     rows={4}
                     className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white"
                     placeholder="Tell us about your location and needs"
                   ></textarea>
                 </div>

                 <button
                   type="submit"
                   className="w-full md:w-auto px-6 py-3 bg-[#FD5A1E] text-white font-medium rounded-lg hover:bg-[#FD5A1E]/90 transition-colors"
                 >
                   Request Information
                 </button>
               </form>
             </div>

             <div className="md:w-1/2 bg-gradient-to-br from-[#FD5A1E]/20 to-black relative p-8 md:p-12 flex flex-col justify-center">
               <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>

               <div className="space-y-4">
                <div className="flex items-start">
                   <div className="flex-shrink-0 h-6 w-6 text-[#FD5A1E] mr-3">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
       </div>  */}
      </section>

      {/* CTA Section with brand orange */}
      <section className="py-16 bg-[#FD5A1E] text-white">
        <CTASection />
      </section>

    </div>
  );
};

export default LandingPage;
