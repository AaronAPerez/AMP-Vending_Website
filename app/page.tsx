'use client';

import LocationFinder from '@/components/business/LocationFinder';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';


// Type definitions
interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Statistic {
  value: string;
  label: string;
}

interface Client {
  name: string;
  logo?: string;
  testimonial?: string;
}

/**
 * Modern homepage component for AMP Vending
 * Showcases vending machine solutions and benefits for potential clients
 */
const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Animate elements when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Key features of vending machines
  const features: Feature[] = [
    {
      title: 'Advanced Payment Systems',
      description: 'Support for credit cards, mobile payments, and traditional cash options',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      title: 'Touchscreen Interface',
      description: '21.5" HD touchscreen for intuitive browsing and selection',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Custom Product Selection',
      description: 'Over 50 snack and drink options tailored to preferences',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    }
  ];

  // Client benefits
  const benefits: Benefit[] = [
    {
      title: 'Zero Upfront Costs',
      description: 'We cover all expenses for machine installation, maintenance, and stocking',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Passive Revenue Stream',
      description: 'Earn 5% of gross revenue through our profit-sharing model',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    },
    {
      title: 'Employee Satisfaction',
      description: 'Provide convenient access to refreshments during breaks',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Maintenance-Free',
      description: 'We handle all restocking, repairs, and technical issues',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  // Statistics
  const statistics: Statistic[] = [
    { value: '$300-$800', label: 'Monthly Revenue Per Machine' },
    { value: '3+ Years', label: 'Typical Contract Length' },
    { value: '98.5%', label: 'Machine Uptime Rate' },
    { value: '92%', label: 'Client Retention Rate' }
  ];

  // Sample clients
  const clients: Client[] = [
    { name: 'First Student, Inc.', testimonial: 'Our bus drivers love having access to snacks during their breaks.' },
    { name: 'Stanislaus Regional Transit', testimonial: 'The variety of payment options makes this a convenient solution.' },
    { name: 'Valley Transportation', testimonial: 'Zero maintenance has made this partnership truly valuable.' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Gradient Background */}
      <section className="relative text-white overflow-hidden">
  {/* Background image */}
  <div className="absolute inset-0 -z-10">
    <Image
      src="/images/vending-pic.jpg"
      alt="Vending machines background"
      fill
      priority
      className="object-cover object-center"
      sizes="100vw"
      quality={85}
    />
    {/* Overlay for better text visibility */}
    <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
  </div>
  
  {/* Gradient overlay on top of image */}
  <div className="absolute inset-0 -z-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll" data-aos="fade-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                State-of-the-Art Vending Machines
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-lg">
                Enhance your workplace with modern vending solutions at zero upfront cost.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/proposal" className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:bg-blue-50 transition-colors">
                  View Proposal
                </Link>
                <Link href="/contact" className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
            
            <div className="relative animate-on-scroll" data-aos="fade-left">
              <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl bg-blue-900/30 backdrop-blur-sm border border-white/10">
                {/* Modern vending machine illustration */}
                <div className="p-6 flex items-center justify-center">
                  <div className="w-full max-w-sm bg-gradient-to-b from-blue-900 to-blue-950 rounded-xl shadow-inner p-2">
                    {/* Screen area */}
                    <div className="bg-blue-100 h-40 mb-4 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-blue-500 font-medium">Touch Screen Interface</span>
                      </div>
                    </div>
                    
                    {/* Product display */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="aspect-w-1 aspect-h-1 bg-white/10 rounded-md"></div>
                      ))}
                    </div>
                    
                    {/* Payment area */}
                    <div className="grid grid-cols-2 gap-3 p-2 bg-blue-800 rounded-lg">
                      <div className="bg-blue-700 h-8 rounded flex items-center justify-center text-xs text-white">Card Payment</div>
                      <div className="bg-blue-700 h-8 rounded flex items-center justify-center text-xs text-white">Mobile Pay</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Feature bubbles */}
              <div className="absolute -top-4 -left-4 bg-yellow-400 text-blue-900 rounded-full px-4 py-2 font-bold shadow-lg text-sm">
                5% Profit Sharing
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-500 text-white rounded-full px-4 py-2 font-bold shadow-lg text-sm">
                Zero Upfront Cost
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-white h-12 w-full">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Modern Vending Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our state-of-the-art machines combine cutting-edge technology with user-friendly features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 animate-on-scroll" data-aos="fade-up" data-aos-delay="100">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-lg mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center animate-on-scroll" data-aos="fade-up" data-aos-delay="200">
            <Link href="/vending-machines" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Explore all vending machine options
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section with Alternating Layout */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benefits for Your Workplace
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Installing our vending machines offers substantial advantages for both management and employees.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 animate-on-scroll" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">For Management</h3>
                <ul className="space-y-5">
                  {benefits.slice(0, 2).map((benefit, index) => (
                    <li key={index} className="flex">
                      <div className="flex-shrink-0 mt-1 text-blue-600">
                        {benefit.icon}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">{benefit.title}</h4>
                        <p className="mt-1 text-gray-600">{benefit.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <p className="font-medium">
                  "Our vending machines transform a basic amenity into a valuable workplace asset."
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">For Employees</h3>
                <ul className="space-y-5">
                  {benefits.slice(2, 4).map((benefit, index) => (
                    <li key={index} className="flex">
                      <div className="flex-shrink-0 mt-1 text-blue-600">
                        {benefit.icon}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">{benefit.title}</h4>
                        <p className="mt-1 text-gray-600">{benefit.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <p className="font-medium">
                  "Quick access to refreshments during short, unpredictable breaks enhances job satisfaction."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Dark Background */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-on-scroll" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AMP Vending Performance Metrics
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Our proven business model delivers consistent results and satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll" data-aos="fade-up" data-aos-delay="100">
            {statistics.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center animate-on-scroll" data-aos="fade-up" data-aos-delay="200">
            <Link href="/proposal" className="px-8 py-4 bg-white text-blue-900 font-medium rounded-lg shadow-lg hover:bg-blue-50 transition-colors">
              View Full Proposal
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from businesses already benefiting from our vending machine solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 animate-on-scroll" data-aos="fade-up" data-aos-delay="100">
            {clients.map((client, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 relative">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <svg className="w-16 h-16 text-blue-100" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <div className="mb-6">
                  <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {client.name.charAt(0)}
                  </div>
                </div>
                <blockquote className="relative">
                  <p className="text-lg text-gray-700 mb-4">"{client.testimonial}"</p>
                  <footer className="mt-2">
                    <p className="text-base font-medium text-gray-900">{client.name}</p>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll" data-aos="fade-up">
            Ready to Enhance Your Workplace?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 animate-on-scroll" data-aos="fade-up" data-aos-delay="100">
            Contact us today to discuss how our vending solution can benefit your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-on-scroll" data-aos="fade-up" data-aos-delay="200">
            <Link href="/contact" className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:bg-blue-50 transition-colors">
              Get Started
            </Link>
            <Link href="/proposal" className="px-8 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              View Proposal
            </Link>
          </div>
        </div>
      </section>

      <section>
        <LocationFinder/>
      </section>

      {/* Final CTA with Contact Information */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-700 to-indigo-700 rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <pattern id="wave-pattern" width="200" height="50" patternUnits="userSpaceOnUse">
                    <path d="M0 25h25c12.5 0 12.5-25 25-25s12.5 25 25 25h125" fill="none" stroke="currentColor" strokeWidth="2" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#wave-pattern)" />
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl text-blue-100 mb-6">
                  Contact us today to discuss how our vending solution can benefit your workplace.
                </p>
                <div className="flex flex-wrap gap-4">
                  {/* <Link "/contact" className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg shadow-lg hover:bg-blue-50 transition-colors">
                    Contact Us
                  </Link> */}
                  <a href="tel:2094035450" className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                    Call Now
                  </a>
                </div>
              </div>
              
              <div className="md:w-1/3 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-3 text-blue-100">
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    (209) 403-5450
                  </p>
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    ampdesignandconsulting@gmail.com
                  </p>
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Serving Central California
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage; 