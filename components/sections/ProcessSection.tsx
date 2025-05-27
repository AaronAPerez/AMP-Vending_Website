'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Settings, HeadphonesIcon } from 'lucide-react';
import { GlareCard } from '../ui/effects/glare-card';

import { 
  PhoneIcon, 
  CalendarIcon, 
  WrenchIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  ClipboardListIcon,
  TruckIcon,
  CogIcon
} from 'lucide-react';
import Link from 'next/link';

/**
 * ProcessSection Component
 * 
 * Displays the step-by-step process of implementing vending machines with enhanced
 * responsive design and improved GlareCard layout. Features:
 * - Fully responsive grid system with proper breakpoints
 * - Enhanced accessibility with proper ARIA labels and semantic HTML
 * - Smooth animations with reduced motion support
 * - Improved mobile experience with stacked layout
 * - Better visual hierarchy and spacing
 * 
 * Displays the simple 4-step process for getting started with AMP Vending
 * Updated to align with professional service model without cost references
 */
const ProcessSection = () => {
  // Define process steps with icons, descriptions, and accessibility labels
  // Process steps data - updated content
  const processSteps = [
    {
      number: 1,
      title: "Request a Consultation",
      description: "Schedule a quick call to discuss your workplace needs and machine options.",
      icon: <Phone size={24} aria-hidden="true" />,
      color: "from-pink-500 to-orange-500",
      ariaLabel: "Step 1: Request a consultation for vending machine assessment"
      id: 1,
      title: "Initial Consultation",
      description: "Contact our team to discuss your workplace needs, employee count, and location requirements. We'll assess the best vending solution for your business.",
      icon: <PhoneIcon size={32} />,
      details: [
        "Workplace assessment",
        "Employee preference analysis",
        "Location evaluation",
        "Custom solution design"
      ],
      timeframe: "24-48 hours",
      color: "from-blue-500/20 to-blue-600/10"
    },
    {
      number: 2,
      title: "Site Assessment",
      description: "We'll visit your location to identify the optimal placement for your machines.",
      icon: <MapPin size={24} aria-hidden="true" />,
      color: "from-orange-500 to-amber-500",
      ariaLabel: "Step 2: Professional site assessment for optimal machine placement"
      id: 2,
      title: "Site Evaluation & Planning",
      description: "Our specialists visit your location to determine optimal machine placement, electrical requirements, and product selection customization.",
      icon: <ClipboardListIcon size={32} />,
      details: [
        "On-site inspection",
        "Electrical assessment",
        "Space optimization",
        "Product planning"
      ],
      timeframe: "1-3 days",
      color: "from-purple-500/20 to-purple-600/10"
    },
    {
      number: 3,
      title: "Installation",
      description: "Our team handles the complete setup with zero disruption to your workplace.",
      icon: <Settings size={24} aria-hidden="true" />,
      color: "from-amber-500 to-yellow-500",
      ariaLabel: "Step 3: Professional installation with zero workplace disruption"
      id: 3,
      title: "Professional Installation",
      description: "Certified technicians handle complete installation, setup, and testing. All electrical work and machine configuration included in our service package.",
      icon: <WrenchIcon size={32} />,
      details: [
        "Certified installation",
        "Electrical connections",
        "System testing",
        "Staff training"
      ],
      timeframe: "2-4 hours",
      color: "from-orange-500/20 to-orange-600/10"
    },
    {
      number: 4,
      title: "Ongoing Support",
      description: "We handle all maintenance and restocking automatically. You simply enjoy the convenience.",
      icon: <HeadphonesIcon size={24} aria-hidden="true" />,
      color: "from-yellow-500 to-green-500",
      ariaLabel: "Step 4: Ongoing maintenance and support services"
    }
  ];
      id: 4,
      title: "Ongoing Service & Support",
      description: "Enjoy comprehensive maintenance, regular restocking, and 24/7 support. Our smart monitoring ensures your machine is always operational and well-stocked.",
      icon: <CheckCircleIcon size={32} />,
      details: [
        "Regular restocking",
        "Preventive maintenance",
        "24/7 monitoring",
        "Technical support"
      ],
      timeframe: "Ongoing",
      color: "from-green-500/20 to-green-600/10"
    }
  ];

  // Service features that differentiate AMP Vending
  const serviceFeatures = [
    {
      icon: <TruckIcon size={24} />,
      title: "Professional Installation",
      description: "Certified technicians handle all setup"
    },
    {
      icon: <CogIcon size={24} />,
      title: "Complete Maintenance",
      description: "All service and repairs included"
    },
    {
      icon: <CalendarIcon size={24} />,
      title: "Regular Restocking",
      description: "Weekly inventory management"
    },
    {
      icon: <PhoneIcon size={24} />,
      title: "24/7 Support",
      description: "Always available when you need us"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      className="w-full mx-auto"
      aria-labelledby="process-heading"
    >
      {/* Process Steps Grid - Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 max-w-7xl mx-auto px-4">
        {processSteps.map((step, index) => (
          <div 
            key={step.number}
            className="flex justify-center"
          >
            <GlareCard className="w-full max-w-[320px] h-auto">
              <motion.div
                className="relative bg-[#111111] rounded-xl overflow-hidden border border-[#333333] shadow-lg w-full h-full min-h-[280px] flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 * index,
                  ease: "easeOut"
                }}
                aria-label={step.ariaLabel}
                role="article"
              >
                {/* Step number with gradient background */}
                <div className="relative h-32 sm:h-36 lg:h-40 overflow-hidden flex-shrink-0">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-80`}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-4xl sm:text-5xl font-bold text-white"
                      aria-label={`Step ${step.number}`}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Icon circle overlapping sections */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-[#111111] w-16 h-16 rounded-full border-4 border-[#111111] flex items-center justify-center shadow-lg">
                      <div 
                        className={`bg-gradient-to-r ${step.color} w-full h-full rounded-full flex items-center justify-center text-white transition-transform hover:scale-105`}
                        aria-hidden="true"
                      >
                        {step.icon}
                      </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Service Features Overview */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {serviceFeatures.map((feature) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            className="text-center p-6 bg-[#111111] rounded-xl border border-[#333333] hover:border-[#FD5A1E]/50 transition-all"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#FD5A1E]/20 to-[#FD5A1E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-[#FD5A1E]">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">{feature.title}</h3>
            <p className="text-[#A5ACAF] text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Process Timeline */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Timeline Line - Desktop */}
        <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#333333] via-[#FD5A1E] to-[#333333]"></div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + (index * 0.2) }}
              className="relative"
            >
              {/* Timeline Connector - Mobile */}
              {index < processSteps.length - 1 && (
                <div className="lg:hidden absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-[#FD5A1E] to-[#333333]"></div>
              )}

              {/* Step Card */}
              <div className="relative bg-[#111111] rounded-xl border border-[#333333] overflow-hidden hover:border-[#FD5A1E]/50 transition-all group">
                {/* Header */}
                <div className={`bg-gradient-to-r ${step.color} p-6 border-b border-[#333333]`}>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-[#FD5A1E] rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                      {step.id}
                    </div>
                    <div className="text-[#FD5A1E] group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                  </div>

                  {/* Title & Timeframe */}
                  <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">{step.title}</h3>
                  <div className="inline-flex items-center px-3 py-1 bg-[#FD5A1E]/20 rounded-full">
                    <span className="text-[#FD5A1E] text-sm font-medium">{step.timeframe}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-[#A5ACAF] mb-4 leading-relaxed">{step.description}</p>

                  {/* Details List */}
                  <div className="space-y-2">
                    <h4 className="text-[#F5F5F5] font-semibold text-sm mb-3">What&apos;s Included:</h4>
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-[#FD5A1E] rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-[#A5ACAF]">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow for Desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-6 bg-[#FD5A1E] rounded-full flex items-center justify-center">
                      <ArrowRightIcon size={14} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Zero-Cost Implementation Feature */}
      {/* Timeline Summary */}
      <motion.div
        className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#333333] mb-16 max-w-5xl mx-auto"
        className="mt-16 bg-gradient-to-r from-[#FD5A1E]/10 to-transparent rounded-xl p-8 border border-[#FD5A1E]/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="p-6 md:p-8 lg:p-10">
          {/* Header section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-4">
              <svg 
                className="w-5 h-5 text-[#FD5A1E] mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[#FD5A1E] font-medium text-sm">Zero-Cost Guarantee</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-4">
              Zero-Cost Implementation Guarantee
            </h3>
            <p className="text-[#A5ACAF] max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Our commitment is simple - you receive premium vending machines with zero upfront costs,
              zero ongoing maintenance responsibilities, and zero hassle. We handle everything from
              installation to regular servicing so you can focus on enjoying the benefits.
            </p>
          </div>
              
          {/* Benefits Grid - Responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { 
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "No Installation Fees",
                description: "Complete setup at zero cost"
              },
              { 
                icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
                title: "No Maintenance Costs",
                description: "All servicing included"
              },
              { 
                icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
                title: "Regular Restocking",
                description: "Automatic inventory management"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="flex flex-col items-center text-center p-4 bg-[#000000]/40 rounded-lg border border-[#333333]/50 hover:border-[#FD5A1E]/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#FD5A1E]/20 to-[#FD5A1E]/10 rounded-full flex items-center justify-center mb-3">
                  <svg 
                    className="w-6 h-6 text-[#FD5A1E]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                  </svg>
                </div>
                <h4 className="text-[#F5F5F5] font-semibold mb-2 text-sm sm:text-base">
                  {benefit.title}
                </h4>
                <p className="text-[#A5ACAF] text-xs sm:text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-[#F5F5F5] mb-4">
              From Consultation to Operation
            </h3>
            <p className="text-[#A5ACAF] mb-6 leading-relaxed">
              Our streamlined process ensures your workplace gets the perfect vending solution with minimal 
              disruption to your business operations. Professional service from start to finish.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-[#0a0a0a] rounded-lg border border-[#333333]">
                <div className="text-2xl font-bold text-[#FD5A1E] mb-1">1-2</div>
                <div className="text-[#A5ACAF] text-sm">Weeks to Install</div>
              </div>
              <div className="text-center p-4 bg-[#0a0a0a] rounded-lg border border-[#333333]">
                <div className="text-2xl font-bold text-[#FD5A1E] mb-1">24/7</div>
                <div className="text-[#A5ACAF] text-sm">Ongoing Support</div>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-right">
            <div className="inline-block p-6 bg-[#000000]/50 rounded-xl border border-[#FD5A1E]/20">
              <div className="text-3xl font-bold text-[#FD5A1E] mb-2">Complete</div>
              <div className="text-[#F5F5F5] font-semibold mb-1">Service Package</div>
              <div className="text-[#A5ACAF] text-sm mb-4">Installation through maintenance</div>
              
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-white rounded-full font-medium hover:bg-[#FD5A1E]/90 transition-colors"
              >
                Start Your Process
                <ArrowRightIcon size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action - Enhanced accessibility */}
      {/* Additional Support Information */}
      <motion.div
        className="text-center mb-8 max-w-2xl mx-auto px-4"
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <div className="bg-[#0a0a0a] rounded-xl p-8 border border-[#333333]">
          <h4 className="text-xl font-bold text-[#F5F5F5] mb-4">
            Questions About Our Process?
          </h4>
          <p className="text-[#A5ACAF] max-w-2xl mx-auto mb-6">
            Our team is ready to walk you through each step and answer any questions about 
            installation, service, or ongoing support for your workplace vending solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-[#FD5A1E]/10 text-[#FD5A1E] border border-[#FD5A1E]/30 rounded-full font-medium hover:bg-[#FD5A1E]/20 transition-colors"
            >
              <PhoneIcon size={16} className="mr-2" />
              Schedule Consultation
            </Link>
            <Link
              href="/vending-machines"
              className="inline-flex items-center px-6 py-3 bg-transparent text-[#F5F5F5] border border-[#333333] rounded-full font-medium hover:bg-[#111111] transition-colors"
            >
              View Our Machines
              <ArrowRightIcon size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

