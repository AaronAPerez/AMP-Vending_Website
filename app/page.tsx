'use client';

import React from 'react';
import HeroParallax from '@/components/hero/HeroParallax';
import ShowcaseLensEffect from '@/components/sections/ShowcaseLensEffect';
import LandingPage from '@/components/LandingPage';



export default function Home() {



  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      
      {/* Hero Section with gradient background */}
      <section id="hero"
        className="relative min-h-screen bg-gradient-to-b from-[#000000] via-[#000000]/95 to-[#000000]/85"
        aria-labelledby="hero-heading">

        {/* Background overlay */}
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/50 to-[#000000]/70 z-10" aria-hidden="true"></div>
        <HeroParallax /> 
      </section> 

      {/* Transition element */}
       <div className="h-32 bg-gradient-to-b from-transparent to-[#000000] -mt-32 relative z-20"></div>

      {/* Vending Machine Showcase */}
      <section id="vending-machine-showcase"
        className="bg-[#000000] py-16">
        <ShowcaseLensEffect />
      </section> 

    <LandingPage/>

      {/* Products Showcase */}
      {/* <section id="products-showcase" className="py-16 bg-[#000000]" >
        <ProductSection />
      </section> */}

      {/* Process Section with subtle dark gray background */}
      {/* <section
        className="bg-gradient-to-b from-[#000000] to-[#111111]"
        aria-labelledby="process-heading"
      >
        <ProcessSection />
      </section> */}

      {/* 
      <section id="workplace-transformation" className="bg-black text-gray-100 py-16">
        <div className="container mx-auto">
          <WorkplaceTransformSection/>
        </div>
      </section> */}

      {/* Comparison Section with dark pattern overlay */}
      {/* <section
        className="relative"
        aria-labelledby="comparison-heading"
      >
        {/* Dark pattern background 
        <div className="absolute inset-0 bg-[#111111]" style={{
          backgroundImage: `radial-gradient(circle at 100% 50%, transparent 20%, rgba(255,255,255,0.03) 21%, rgba(255,255,255,0.03) 34%, transparent 35%, transparent)`,
          backgroundSize: '75px 100px'
        }}></div>
        <div className="relative z-10">
          <ComparisonSection />
        </div>
      </section> */}

      {/* FAQ Section with gradient to darker overlay */}
      {/* <section
        className="bg-gradient-to-b from-[#111111] via-[#0a0a0a] to-[#000000]"
        aria-labelledby="faq-heading"
      >
        <FAQSection />
      </section> */}

      {/* Service Area Map Preview with smooth transition */}
      {/* <section
        className="bg-gradient-to-b from-[#111111] via-[#0d0d0d] to-[#000000] px-4 py-16"
        aria-labelledby="service-area-map-preview"
      >
        <ServiceAreaMapPreview />
      </section> */}

      {/* Contact Form Section */}
      {/* <section
        className="relative mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 bg-black"
        aria-labelledby="contact-heading"
      >      
      <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
          Get In Touch
      </span>
      <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
          Contact AMP Vending
      </h1>
      <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
          Have questions about our vending solutions? We&apos;re here to help. Fill out the form below and our team will get back to you soon.
      </p>
        <ContactForm />
      </section> */}

      {/* CTA Section with brand orange */}
      {/* <section className="py-16 bg-[#FD5A1E] text-white">
        <CTASection />
      </section> */}

    </div>
  );
};