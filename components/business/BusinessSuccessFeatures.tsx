'use client';

import React from 'react';
import Card from '../ui/Card';
import Link from 'next/link';

interface SuccessFeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText?: string;
  actionLink?: string;
}

/**
 * Individual success feature card component
 */
const SuccessFeature = ({ 
  title, 
  description, 
  icon, 
  actionText, 
  actionLink 
}: SuccessFeatureProps) => {
  return (
    <Card className="h-full transition-all hover:shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 h-12 w-12 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        
        {actionText && actionLink && (
          <div className="mt-auto">
            <Link 
              href={actionLink} 
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              aria-label={`${actionText} about ${title}`}
            >
              {actionText}
              <svg 
                className="ml-1 h-4 w-4" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
};

/**
 * BusinessSuccessFeatures component showcases the key features 
 * that make AMP Vending's business model successful
 */
const BusinessSuccessFeatures = () => {
  // Success features data
  const successFeatures = [
    {
      title: 'Zero Upfront Cost Model',
      description: 'Our business operates on a zero upfront cost model for clients. We cover all machine expenses, installation, maintenance, and stocking, removing any financial barrier to entry.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      actionText: 'See our financial model',
      actionLink: '/proposal#financial-proposition'
    },
    {
      title: 'Strategic Location Targeting',
      description: 'We focus on transit facilities and bus depots where drivers have limited break time and few nearby food options, creating a captive market with consistent demand.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      actionText: 'Learn about our target markets',
      actionLink: '/about#markets'
    },
    {
      title: 'Revenue Sharing Partnership',
      description: 'We share 5% of gross revenue with location owners, aligning our interests and creating a mutually beneficial partnership that encourages long-term collaboration.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      actionText: 'View revenue details',
      actionLink: '/proposal#revenue-sharing'
    },
    {
      title: 'Modern Payment Technology',
      description: 'Our machines feature advanced payment systems including credit card, mobile pay, and traditional cash options, maximizing convenience and accessibility for all users.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      actionText: 'Explore payment options',
      actionLink: '/vending-solution#payment'
    },
    {
      title: 'Data-Driven Product Selection',
      description: 'We analyze sales data to optimize product selection for each location, ensuring we stock items that match user preferences and maximize revenue potential.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      actionText: 'See our product strategy',
      actionLink: '/vending-solution#products'
    },
    {
      title: 'Proactive Maintenance System',
      description: 'Our comprehensive maintenance protocol includes weekly servicing, preventative maintenance, and 24-hour response to issues, ensuring maximum machine uptime and reliability.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      actionText: 'Learn about maintenance',
      actionLink: '/services#maintenance'
    }
  ];

  // Growth statistics
  const growthStats = [
    { label: 'Average Monthly Revenue Per Machine', value: '$300-$800' },
    { label: 'Typical Client Contract Length', value: '3+ Years' },
    { label: 'Machine Uptime Rate', value: '98.5%' },
    { label: 'Client Retention Rate', value: '92%' }
  ];

  return (
    <section className="py-16" id="business-success">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Formula for Vending Business Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven business model leverages strategic partnerships, technology, 
            and operational excellence to create a win-win solution for all stakeholders.
          </p>
        </div>

        {/* Success Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {successFeatures.map((feature, index) => (
            <SuccessFeature
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              actionText={feature.actionText}
              actionLink={feature.actionLink}
            />
          ))}
        </div>

        {/* Growth Statistics */}
        <div className="rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            AMP Vending Performance Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {growthStats.map((stat, index) => (
              <div key={index} className="text-center p-4 border border-gray-100 rounded-lg">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 rounded-lg shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Build Your Vending Machine Empire?</h3>
          <p className="text-blue-100 mb-8 max-w-3xl mx-auto">
            Join the growing network of successful AMP Vending partners. Our proven business model, 
            cutting-edge technology, and comprehensive support system provide everything you need to succeed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 hover:bg-blue-50"
            >
              Schedule a Consultation
            </Link>
            <Link 
              href="/resources/business-guide" 
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700"
            >
              Download Business Guide
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSuccessFeatures;