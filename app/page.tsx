import React from 'react';
import { Metadata } from 'next';
import '@/styles/globals.css'
import CTASection from '@/components/sections/CTASection';
import FAQSection from '@/components/sections/FAQSection';
import HeroParallax from '@/components/hero/HeroParallax';
import VendingMachineShowcase from '@/components/vending-machines/VendingMachineShowcase ';
import BenefitsSection from '@/components/sections/BenefitsSection';
import WorkplaceTransformSection from '@/components/sections/WorkplaceTransformSection';
import ProductSection from '@/components/sections/ProductSection';
import VendingMachineVisualizer from '@/components/machines/VendingMachineVisualizer';
import Image from 'next/image';
import Link from 'next/link';
import MachineLensShowcase from '@/components/vending-machines/MachineLensShowcase';
import { LensDemoThird } from '@/components/LensDemoThird';
import ShowcaseLensEffect from '@/components/sections/ShowcaseLensEffect';



// Define the metadata 
export const metadata: Metadata = {
  title: 'AMP Vending | Premium Vending Solutions',
  description: 'Zero-cost vending machine solutions for workplaces with revenue sharing model.',
};



export default async function Home() {
  

  return (
   
 
 <div className="overflow-hidden">
      {/* Hero Section with semi-transparent background */}
      <section id="hero" className="relative min-h-screen bg-black/50">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-[#000000]/60 z-10" aria-hidden="true"></div>
        <HeroParallax />
      </section>

      {/* Transition element */}
      <div className="h-32 bg-gradient-to-b from-transparent to-[#000000] -mt-32 relative z-20"></div>

            {/* Key Benefits Section */}
      <section id="benefits-section"
        className="py-16 bg-[#000000]"
        aria-labelledby="benefits-heading"
      >
        <BenefitsSection/>
        </section>
      
      <section id="vending-machine-showcase" className="bg-black py-16">
     
      </section>
   
      {/* Features Section */}
      {/* <FeatureTabs/> */}
     
<ShowcaseLensEffect/>
      <LensDemoThird/>

      <section id="workplace-transformation" className="bg-black py-16">
        <div className="container mx-auto">
          <WorkplaceTransformSection/>
        </div>
      </section>
      {/* Before/After Transformation Section */}
      {/* <BeforeAfterSection /> */}

      <section id='vending-machine-visualizer'>
        <VendingMachineVisualizer/>
      </section>
      
      {/* Testimonials Section */}
      {/* <Testimonials/> */}

      {/* Products Showcase Section */}
      <section id="products-showcase" className="py-16 bg-[#4d4d4d]/20" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
              Product Selection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
              50+ Premium Products
            </h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              Customizable selection of snacks and beverages to meet your workplace needs
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['All Products', 'Popular Snacks', 'Beverages', 'Healthy Options', 'Energy Drinks'].map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium ${index === 0
                  ? 'bg-[#FD5A1E] text-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#000000]'
                  : 'bg-[#000000] text-[#F5F5F5] hover:bg-[#FD5A1E]/10 border border-[#a4acac]'
                  } transition-colors`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Product cards - these would be dynamically generated */}
            {[
              { name: 'Coca-Cola', category: 'beverages', image: '/images/products/coke.jpg', popular: true },
              { name: 'Doritos Nacho Cheese', category: 'snacks', image: '/images/products/doritos.jpg', popular: true },
              { name: 'Monster Energy', category: 'energy', image: '/images/products/monster.jpg', popular: true },
              { name: 'Lays Classic', category: 'snacks', image: '/images/products/lays.jpg', popular: true },
              { name: 'Snickers', category: 'snacks', image: '/images/products/snickers.jpg', popular: true },
              { name: 'Just Water', category: 'beverages', image: '/images/products/justwater.jpg', healthy: true },
              { name: 'Pop Tarts', category: 'snacks', image: '/images/products/poptarts.jpg', popular: true },
              { name: 'Red Bull', category: 'energy', image: '/images/products/redbull.jpg', popular: true },
              { name: 'M&Ms', category: 'snacks', image: '/images/products/mms.jpg', popular: true },
              { name: 'Diet Coke', category: 'beverages', image: '/images/products/dietcoke.jpg', healthy: true }
            ].map((product, index) => (
              <div key={index} className="bg-[#000000] rounded-lg overflow-hidden border border-[#a4acac] hover:border-[#FD5A1E] transition-all hover:scale-105 group">
                <div className="h-36 relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.popular && (
                    <div className="absolute top-2 right-2 bg-[#FD5A1E] text-[#F5F5F5] text-xs px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  {product.healthy && (
                    <div className="absolute top-2 right-2 bg-green-500 text-[#F5F5F5] text-xs px-2 py-1 rounded-full">
                      Healthy
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-[#F5F5F5] font-medium text-sm">{product.name}</h3>
                  <p className="text-[#A5ACAF] text-xs capitalize">{product.category}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Product Rotation Banner */}
          <div className="mt-10 bg-[#FD5A1E]/10 border border-[#FD5A1E] rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-[#F5F5F5]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Product selection can be customized based on your workplace preferences and regularly updated based on feedback.</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors font-medium"
            >
              Customize Your Selection
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        className="py-16 bg-black"
        aria-labelledby="process-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="process-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Getting Started Is Simple
            </h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              Our streamlined process gets your vending machines up and running with minimal effort.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-white font-bold flex items-center justify-center">1</div>
              <h3 className="text-xl font-bold text-white mt-2 mb-3">Request a Consultation</h3>
              <p className="text-[#A5ACAF]">Schedule a quick call to discuss your workplace needs and machine options.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-white font-bold flex items-center justify-center">2</div>
              <h3 className="text-xl font-bold text-white mt-2 mb-3">Site Assessment</h3>
              <p className="text-[#A5ACAF]">We`&apos;ll visit your location to identify the optimal placement for your machines.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-white font-bold flex items-center justify-center">3</div>
              <h3 className="text-xl font-bold text-white mt-2 mb-3">Installation</h3>
              <p className="text-[#A5ACAF]">Our team handles the complete setup with zero disruption to your workplace.</p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-white font-bold flex items-center justify-center">4</div>
              <h3 className="text-xl font-bold text-white mt-2 mb-3">Ongoing Support</h3>
              <p className="text-[#A5ACAF]">We handle all maintenance and restocking automatically. You simply enjoy the convenience.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#FD5A1E] text-white font-medium rounded-full shadow-lg hover:bg-[#FD5A1E]/90 transition-colors"
            >
              Schedule Your Consultation
            </Link>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <FAQSection/>
      
      {/* Call to Action Section */}
      <CTASection/> 
 

      {/* <section id='contact-form'>
        <ContactForm />
      </section> */}
    </div>
  );
}