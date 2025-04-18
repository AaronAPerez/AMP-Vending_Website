import React from 'react';
import Link from 'next/link';
import KoolMoreVendingShowcase from '@/components/sections/KoolMoreVendingShowcase';
import { Metadata } from 'next';
import HeroParallax from '@/components/hero/HeroParallax';
import VendingSolution from '@/components/sections/VendingSolution';
import ContactForm from '@/components/sections/ContactForm';


// Define the metadata 
export const metadata: Metadata = {
  title: 'AMP Vending | Premium Vending Solutions',
  description: 'Zero-cost vending machine solutions for workplaces with revenue sharing model.',
};



export default async function Home() {
  

  return (
    <div className="overflow-hidden">
          <section id="hero" className="relative min-h-screen bg-black/50">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-[#000000]/60 z-10" aria-hidden="true"></div>
        <HeroParallax />
      </section>
      {/* Featured Vending Machine - Show what they're getting */}
      <section id="vending-machine-display">
        <VendingSolution />
      </section>

      {/* Process Overview - How it works */}
      <section id="process-overview" className="py-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
              Getting Started Is Easy
            </h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              Our streamlined process gets your vending machines up and running with minimal effort from your team.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-[#F5F5F5] font-bold flex items-center justify-center">1</div>
              <h3 className="text-xl font-bold text-[#F5F5F5] mt-2 mb-3">Request a Consultation</h3>
              <p className="text-[#A5ACAF]">Schedule a quick call to discuss your workplace needs and machine options.</p>
            </div>

            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-[#F5F5F5] font-bold flex items-center justify-center">2</div>
              <h3 className="text-xl font-bold text-[#F5F5F5] mt-2 mb-3">Site Assessment</h3>
              <p className="text-[#A5ACAF]">We&quot;ll visit your location to identify the optimal placement for your machines.</p>
            </div>

            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-[#F5F5F5] font-bold flex items-center justify-center">3</div>
              <h3 className="text-xl font-bold text-[#F5F5F5] mt-2 mb-3">Installation</h3>
              <p className="text-[#A5ACAF]">Our team handles the complete setup with zero disruption to your workplace.</p>
            </div>

            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-[#F5F5F5] font-bold flex items-center justify-center">4</div>
              <h3 className="text-xl font-bold text-[#F5F5F5] mt-2 mb-3">Ongoing Support</h3>
              <p className="text-[#A5ACAF]">We handle all maintenance and restocking automatically. You and your team simply enjoy the convenience.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-lg shadow-lg hover:bg-[#FD5A1E]/90 transition-colors"
            >
              Schedule Your Consultation
            </Link>
          </div>
        </div>
      </section>



      {/* Why Choose AMP Vending */}
      <section id="why-choose" className="py-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
              Why Choose AMP Vending
            </h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              The difference is clear when you compare our solution to alternatives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#F5F5F5]">Traditional Vending</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#A5ACAF]">High upfront cost to purchase machines</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#A5ACAF]">You handle maintenance and repairs</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#A5ACAF]">Staff time required for restocking</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#A5ACAF]">Limited payment options</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#A5ACAF]">Basic, older machine technology</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#F5F5F5]">Food Delivery</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#A5ACAF]">Variable wait times for delivery</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#A5ACAF]">High delivery fees and minimums</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#A5ACAF]">Not available 24/7</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#A5ACAF]">Requires planning ahead</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#A5ACAF]">Disrupts workflow with deliveries</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#F5F5F5]">AMP Vending</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#F5F5F5]">Zero upfront costs or fees</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#F5F5F5]">Complete maintenance & service included</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#F5F5F5]">Automatic restocking - never empty</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#F5F5F5]">Advanced payment options (card, mobile, cash)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#F5F5F5]">Premium machine with 21.5&quot; HD touchscreen</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#F5F5F5]">Available 24/7 for employee convenience</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#F5F5F5]">Custom product selection based on feedback</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/proposal"
              className="px-6 py-3 bg-[#FD5A1E] hover:bg-[#FD5A1E]/90 text-[#F5F5F5] font-medium rounded-lg inline-flex items-center transition-colors"
            >
              See Our Complete Solution
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      <section id="vending-machine-display">
        <KoolMoreVendingShowcase />
      </section>


      <section id="faq" className="py-16 bg-gradient-to-b from-[#000000] to-[#4d4d4d]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
              Questions About Our Premium Vending
            </h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              Everything you need to know about our hassle-free solution.
            </p>
          </div>



          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">What makes your machines &quot;premium&quot;?</h3>
              <p className="text-[#A5ACAF]">Our machines feature 21.5&quot; HD touchscreens, multiple payment options including contactless, smart monitoring technology, and customizable product selections with healthy options.</p>
            </div>

            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">How can you offer machines at zero cost?</h3>
              <p className="text-[#A5ACAF]">Through our innovative business model, we&quot;re able to provide premium machines at no cost to qualified locations that meet our minimum traffic requirements.</p>
            </div>

            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">What types of products are available?</h3>
              <p className="text-[#A5ACAF]">We offer a wide selection of premium snacks, beverages, and healthy options. Our team customizes the selection based on your workplace preferences and feedback.</p>
            </div>

            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">How quickly can you install machines?</h3>
              <p className="text-[#A5ACAF]">For most locations, we can have your vending solution operational within 2-3 weeks of initial consultation, with minimal disruption to your workplace.</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="text-[#FD5A1E] hover:text-[#FD5A1E]/80 font-medium inline-flex items-center"
            >
              View all FAQs
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section id="contact-form">
        <ContactForm/>
      </section>

      {/* FAQ Section - Answer common questions */}
      {/* <section id="faq" className="py-16 bg-gradient-to-b from-[#000000] to-[#4d4d4d]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              Get answers to common questions about our vending solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">Is there really no cost to my business?</h3>
              <p className="text-[#A5ACAF]">Absolutely! We cover all costs related to the machines, installation, maintenance, and restocking. You simply provide the space.</p>
            </div>

            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">What types of products are available?</h3>
              <p className="text-[#A5ACAF]">We offer a wide selection of snacks, beverages, and healthy options. Our team customizes the selection based on your workplace preferences.</p>
            </div>

            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">How often are machines restocked?</h3>
              <p className="text-[#A5ACAF]">We monitor inventory levels remotely and typically restock weekly, though high-traffic locations may receive more frequent service.</p>
            </div>

            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">Can we request specific products?</h3>
              <p className="text-[#A5ACAF]">Yes! We customize the product selection based on your employees' preferences and can adjust offerings based on feedback.</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="text-[#FD5A1E] hover:text-[#FD5A1E]/80 font-medium inline-flex items-center"
            >
              View all FAQs
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section> */}
      {/* Testimonial Showcase */}
      {/* <section id="testimonials" className="py-16 bg-[#4d4d4d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
              Workplace Success Stories
            </h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              See how other businesses are enjoying our premium vending solutions.
            </p>
          </div>

          <div className="relative bg-[#000000] rounded-xl shadow-xl p-10 max-w-4xl mx-auto border border-[#a4acac]">
          
            <div className="absolute top-6 left-8 text-6xl text-[#FD5A1E]/20">&quot;</div>
            <div className="absolute bottom-6 right-8 text-6xl text-[#FD5A1E]/20">&quot;</div>

            <div className="relative z-10">
              <p className="text-xl text-[#F5F5F5] italic mb-8">
                Since installing AMP vending machines, our employees are happier and more productive. Having 24/7 access to quality refreshments has been a game-changer for our workplace.
              </p>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#FD5A1E] flex items-center justify-center text-[#F5F5F5] font-bold text-xl mr-4">
                  SJ
                </div>
                <div>
                  <h4 className="font-medium text-[#F5F5F5]">Sarah Johnson</h4>
                  <p className="text-[#A5ACAF] text-sm">Office Manager, TechNova Solutions</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[#F5F5F5]">Join 50+ happy workplaces enjoying our premium vending solutions</p>
          </div>
        </div>
      </section> */}


      {/* CTA Section - Final push to contact */}
      <section className="py-16 bg-[#FD5A1E] text-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Premium Refreshments, Zero Hassle
          </h2>
          <p className="text-xl text-[#F5F5F5] max-w-3xl mx-auto mb-8">
            Join leading workplaces enjoying state-of-the-art vending with no costs and no maintenance worries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#F5F5F5] text-[#000000] font-medium rounded-full shadow-lg hover:bg-[#000000] hover:text-[#F5F5F5] hover:border-[#F5F5F5] border border-transparent transition-colors"
              aria-label="Get started with our vending machine solutions"
            >
              Get Started
            </Link>
            <Link
              href="/proposal"
              className="px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full hover:bg-[#000000] transition-colors"
              aria-label="View our vending machine proposal"
            >
              View Proposal
            </Link>
          </div>
        </div>
      </section>


      {/* <section id='contact-form'>
        <ContactForm />
      </section> */}
    </div>
  );
}