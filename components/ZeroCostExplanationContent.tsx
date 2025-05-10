'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Props for ZeroCostExplanationContent component
 */
interface ZeroCostExplanationContentProps {
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * Component that explains the zero-cost implementation model
 */
const ZeroCostExplanationContent: React.FC<ZeroCostExplanationContentProps> = ({
  className = '',
}) => {
  // Animation variants for staggered list items
  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main explanation */}
      <div className="space-y-4">
        <p className="text-whitesmoke">
          Our zero-cost vending solution eliminates all upfront expenses for your business. 
          We handle the entire process from installation to maintenance, ensuring you receive 
          all the benefits with no financial risk.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-orange font-bold mb-3">What&apos;s Covered?</h3>
            <motion.ul 
              className="list-none space-y-3"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {[
                { 
                  title: 'Machine Supply & Installation',
                  description: 'State-of-the-art vending machines with professional installation',
                  icon: 'machinery'
                },
                { 
                  title: 'Regular Maintenance',
                  description: 'Complete servicing and repairs at no cost to you',
                  icon: 'support'
                },
                { 
                  title: 'Stock Replenishment',
                  description: 'Regular restocking of products based on consumption patterns',
                  icon: 'refreshment'
                },
                { 
                  title: 'Technology Updates',
                  description: 'Software and hardware upgrades to keep machines current',
                  icon: 'technology'
                },
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  custom={i}
                  variants={listItemVariants}
                  className="flex items-start bg-dark-gray/20 p-3 rounded-lg"
                >
                  <div className="w-6 h-6 mt-0.5 mr-3 text-orange flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-whitesmoke">{item.title}</h4>
                    <p className="text-sm text-silver">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          
          <div className="flex-1 bg-primary-black/30 p-4 rounded-lg border border-dark-gray">
            <h3 className="text-orange font-bold mb-3">How It Works</h3>
            <div className="space-y-4">
              <p className="text-silver text-sm">
                Our business model is designed to align our success with yours. Instead of charging 
                for equipment and maintenance, we operate on a revenue-sharing basis:
              </p>
              
              <ol className="list-decimal ml-5 text-silver text-sm space-y-2">
                <li>
                  <span className="text-whitesmoke">We provide and install premium vending machines</span> in 
                  your workplace at zero cost to you
                </li>
                <li>
                  <span className="text-whitesmoke">Our team handles all maintenance and restocking</span>, 
                  ensuring machines are always operational and well-stocked
                </li>
                <li>
                  <span className="text-whitesmoke">Employees and visitors enjoy convenient access</span> to 
                  refreshments with multiple payment options
                </li>
                <li>
                  <span className="text-whitesmoke">Revenue from purchases is shared</span>, 
                  creating a win-win partnership
                </li>
              </ol>
              
              <div className="bg-orange/10 p-3 rounded-lg mt-4">
                <p className="text-sm italic text-whitesmoke">
                &quot;This means you receive all the benefits of premium vending machines with 
                  absolutely no investment required from your business.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits highlights */}
      <div className="bg-dark-gray/20 p-4 rounded-lg">
        <h3 className="text-whitesmoke font-bold mb-3">Key Benefits of Zero-Cost Implementation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="w-6 h-6 mt-0.5 mr-2 text-orange">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-whitesmoke text-sm">No Capital Expenditure</h4>
              <p className="text-xs text-silver">Preserve your budget for other business priorities</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-6 h-6 mt-0.5 mr-2 text-orange">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-whitesmoke text-sm">Risk-Free Implementation</h4>
              <p className="text-xs text-silver">No financial commitment or long-term obligations</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-6 h-6 mt-0.5 mr-2 text-orange">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-whitesmoke text-sm">Hassle-Free Management</h4>
              <p className="text-xs text-silver">No administrative burden or maintenance concerns</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-6 h-6 mt-0.5 mr-2 text-orange">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-whitesmoke text-sm">Enhanced Workplace Value</h4>
              <p className="text-xs text-silver">Premium amenities at no cost to your organization</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-orange/5 p-4 rounded-lg border border-orange/20">
        <p className="text-whitesmoke mb-3 sm:mb-0 sm:mr-4">
          Ready to enhance your workplace with zero-cost vending solutions?
        </p>
        <a
          href="/contact"
          className="px-4 py-2 bg-orange text-whitesmoke rounded-lg text-sm font-medium hover:bg-orange/90 transition-colors"
        >
          Schedule a Consultation
        </a>
      </div>
    </div>
  );
};

export default ZeroCostExplanationContent;