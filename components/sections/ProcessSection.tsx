'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
 * Displays the simple 4-step process for getting started with AMP Vending
 * Updated to align with professional service model without cost references
 */
const ProcessSection = () => {
  // Process steps data - updated content
  const processSteps = [
    {
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

      {/* Timeline Summary */}
      <motion.div
        className="mt-16 bg-gradient-to-r from-[#FD5A1E]/10 to-transparent rounded-xl p-8 border border-[#FD5A1E]/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
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

      {/* Additional Support Information */}
      <motion.div
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
    </div>
  );
};

export default ProcessSection;