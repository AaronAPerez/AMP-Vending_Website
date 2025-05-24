import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MapPin, Settings, HeadphonesIcon } from 'lucide-react';
import { GlareCard } from '../ui/aceternity/glare-card';

/**
 * ProcessSection Component
 * Displays the step-by-step process of implementing vending machines
 * Updated with enhanced styling and visual elements
 * Fixed centering for responsive layouts
 */
const ProcessSection = () => {
  // Define process steps with icons and descriptions
  const processSteps = [
    {
      number: 1,
      title: "Request a Consultation",
      description: "Schedule a quick call to discuss your workplace needs and machine options.",
      icon: <Phone size={24} />,
      color: "from-pink-500 to-orange-500"
    },
    {
      number: 2,
      title: "Site Assessment",
      description: "We'll visit your location to identify the optimal placement for your machines.",
      icon: <MapPin size={24} />,
      color: "from-orange-500 to-amber-500"
    },
    {
      number: 3,
      title: "Installation",
      description: "Our team handles the complete setup with zero disruption to your workplace.",
      icon: <Settings size={24} />,
      color: "from-amber-500 to-yellow-500"
    },
    {
      number: 4,
      title: "Ongoing Support",
      description: "We handle all maintenance and restocking automatically. You simply enjoy the convenience.",
      icon: <HeadphonesIcon size={24} />,
      color: "from-yellow-500 to-green-500"
    }
  ];

  return (
    // Fixed container with proper centering
    <div className="w-full mx-auto">
      {/* Process Steps - Fixed grid with proper centering */}
      <div className="grid grid-cols-1z sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16 mx-auto justify-start">
        {processSteps.map((step, index) => (
          <GlareCard key={step.number} className="flex flex-col items-center justify-center w-10/12 mx-auto">
            <motion.div
              className="relative bg-[#111111] rounded-xl overflow-hidden border border-[#333333] shadow-lg w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              {/* Step number with gradient background */}
              <div className="relative h-40 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-80`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">{step.number}</span>
                </div>

                {/* Icon circle overlapping the top and bottom sections */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#111111] w-16 h-16 rounded-full border-4 border-[#111111] flex items-center justify-center shadow-lg">
                    <div className={`bg-gradient-to-r ${step.color} w-full h-full rounded-full flex items-center justify-center text-white`}>
                      {step.icon}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content section */}
              <div className="p-6 pt-8 text-center">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">{step.title}</h3>
                <p className="text-[#A5ACAF]">{step.description}</p>
              </div>

              {/* Connecting line between cards (visible on desktop only) - Adjusted positioning */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-12 right-0 w-8 h-0.5 bg-[#FD5A1E]/60 translate-x-full z-10"></div>
              )}
            </motion.div>
          </GlareCard>
        ))}
      </div>

      {/* Process Timeline (mobile and tablet only) */}
      <div className="block lg:hidden relative mb-8">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 via-amber-500 to-green-500 transform -translate-x-1/2"></div>
      </div>

      {/* Testimonial/Featured Content - Added responsive centering */}
      <motion.div
        className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#333333] mb-16 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="p-6 md:p-8 lg:p-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Right side - Content */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#F5F5F5] mb-4 text-center md:text-left">
                Zero-Cost Implementation Guarantee
              </h3>
              <p className="text-[#A5ACAF] mb-4 text-center md:text-left">
                Our commitment is simple - you receive premium vending machines with zero upfront costs,
                zero ongoing maintenance responsibilities, and zero hassle. We handle everything from
                installation to regular servicing so you can focus on enjoying the benefits.
              </p>
              
              {/* Key Benefits - Improved responsive layout */}
              <div className="mb-2">
                <motion.div 
                  className="flex items-center justify-center md:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-[#FD5A1E] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#F5F5F5] text-sm sm:text-base">No Installation Fees</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-[#FD5A1E] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#F5F5F5] text-sm sm:text-base">No Maintenance Costs</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-[#FD5A1E] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#F5F5F5] text-sm sm:text-base">Regular Restocking</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action - Improved centering */}
      <motion.div
        className="text-center mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Link
          href="/contact"
          className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#FD5A1E] text-white font-medium rounded-full shadow-lg hover:bg-[#FD5A1E]/90 transition-colors"
        >
          <span>Schedule Your Consultation</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>

        <p className="mt-4 text-[#A5ACAF] text-sm">
          Most installations can be completed within 5-7 business days after assessment.
        </p>
      </motion.div>
    </div>
  );
};

export default ProcessSection;