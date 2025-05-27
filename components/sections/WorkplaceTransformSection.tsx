import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRightIcon, ClockIcon, CreditCardIcon, HomeIcon, ListIcon, ShoppingBagIcon, ZapIcon } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';

/**
 * Feature component for comparison cards
 * Displays a single feature with icon, title, and description
 */
const Feature = ({
  icon,
  title,
  description,
  highlighted = false
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlighted?: boolean;
}) => {
  return (
    <div className={`flex gap-3 p-3 rounded-lg ${highlighted ? 'bg-[#FD5A1E]/10' : 'bg-[#333333]/20'
      }`}>
      <div className={`flex-shrink-0 p-2 rounded-full ${highlighted ? 'bg-[#FD5A1E]/20 text-[#FD5A1E]' : 'bg-[#444444] text-[#A5ACAF]'
        }`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className={`font-medium mb-1 ${highlighted ? 'text-[#FD5A1E]' : 'text-[#F5F5F5]'
          }`}>
          {title}
        </h4>
        <p className="text-[#A5ACAF] text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

/**
 * WorkplaceTransformSection Component
<<<<<<< HEAD
 * Showcases the transformation from standard to premium vending solutions
 * Styled to match the updated VendingMachineShowcase component
 */
const WorkplaceTransformSection = () => {
  // Features for standard vending machines
  const standardFeatures = [
    {
      icon: <ListIcon size={20} />,
      title: "Limited Options",
      description: "Staff must bring food from home or leave premises to find refreshments during breaks."
    },
    {
      icon: <ClockIcon size={20} />,
      title: "Lost Break Time",
      description: "Short break periods wasted traveling to purchase refreshments off-site."
    },
    {
      icon: <CreditCardIcon size={20} />,
      title: "Limited Payment Options",
      description: "External vendors may have restricted payment methods or cash-only policies."
    },
    {
      icon: <HomeIcon size={20} />,
      title: "Basic Amenities",
      description: "Outdated break room facilities lacking modern conveniences."
    }
  ];

  // Features for premium vending machines
  const premiumFeatures = [
    {
      icon: <ListIcon size={20} />,
      title: "50+ Customizable Options",
      description: "Wide selection of snacks and beverages tailored to staff preferences, including healthy alternatives."
    },
    {
      icon: <ClockIcon size={20} />,
      title: "Maximum Break Efficiency",
      description: "Immediate access to refreshments on-site, allowing full use of short, unpredictable breaks."
    },
    {
      icon: <CreditCardIcon size={20} />,
      title: "Modern Payment Systems",
      description: "21.5\" touchscreen interface with credit card, mobile pay, and cash payment options."
    },
    {
      icon: <HomeIcon size={20} />,
      title: "Enhanced Workplace",
      description: "Zero-cost, maintenance-free premium amenities improving employee satisfaction."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header with 3D effect */}
      <CardContainer className="px-8 py-2 pb-12">
        <CardBody className="bg-transparent border-none relative group w-full h-auto py-8">
          <CardItem translateZ={50} className="w-full text-center">
            <span className="inline-block px-4 py-2 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4">
              Workplace Transformation
            </span>
          </CardItem>
          <CardItem translateZ={80} className="w-full text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
              Elevate Your <span className="text-[#FD5A1E]">Work Environment</span>
            </h2>
          </CardItem>
          <CardItem translateZ={60} className="w-full text-center">
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              See how our premium vending solutions transform ordinary break rooms into
              modern refreshment centers that boost employee satisfaction.
            </p>
          </CardItem>
        </CardBody>
      </CardContainer>
      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
        {/* Standard Vending Card */}
        <motion.div
          className="rounded-xl overflow-hidden border border-[#333333] bg-[#111111]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Card Header */}
          <div className="p-6 border-b border-[#333333]">
            <h3 className="text-2xl font-bold text-[#F5F5F5] mb-1">
              Standard Vending Experience
            </h3>
            <p className="text-[#A5ACAF]">
              Traditional setup with limited convenient options
            </p>
          </div>

          {/* Card Image */}
          <div className="relative h-40 sm:h-40 md:h-46 lg:h-70 overflow-hidden bg-[#333333]">
            <Image
              src="/images/before-after/before-vending-machine.jpg"
              alt="Standard break room vending setup"
              quality={100}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-xl px-6"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent opacity-50"></div>
            <div className="absolute bottom-4 left-4 bg-[#000000]/80 px-3 py-1 rounded-full text-sm text-[#A5ACAF]">
              Before
            </div>
          </div>

          {/* Card Description */}
          <div className="p-6 border-b border-[#333333]">
            <p className="text-[#A5ACAF]">
              Traditional break room setup lacking convenient refreshment options, requiring staff to leave premises during short breaks.
            </p>
          </div>

          {/* Card Features */}
          <div className="p-6">
            <h4 className="text-[#F5F5F5] font-bold mb-4 flex items-center">
              <span className="p-1 bg-[#333333] rounded-full mr-2">
                <ChevronRightIcon size={16} />
              </span>
              Key Limitations
            </h4>

            <div className="space-y-3">
              {standardFeatures.map((feature, index) => (
                <Feature
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  highlighted={false}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Premium Vending Card */}
        <CardContainer>
          <CardBody className="p-6 border-b border-[#FD5A1E]/70 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] h-auto rounded-xl border">
            <CardItem
              translateZ="80"
              className="text-2xl font-bold text-[#FD5A1E] mb-1"
            >
              Premium Vending Experience
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-[#A5ACAF] text-md max-w-sm mt-2 dark:text-neutral-300
                pb-2"
            >
              State-of-the-art machines with advanced features
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="/images/before-after/after-vending-machine.jpg"
                height="1000"
                width="1000"
                className="w-full h-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
                
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent opacity-50"></div>
              <div className="absolute bottom-4 left-4 bg-[#FD5A1E] px-3 py-1 rounded-full text-sm text-[#000000] z-20">
                After
              </div>
              <div className="absolute top-4 right-4 bg-[#FD5A1E] px-3 py-1 rounded-full text-sm text-[#000000] z-20">
                Zero Cost
              </div>
            </CardItem>
            <div className="text-[#A5ACAF]">




              <CardItem
                as="p"
                translateZ="60"
                className="text-[#A5ACAF] pt-8"
              >
                Modern break room with state-of-the-art vending machines providing 50+ customizable options and convenient payment solutions.
              </CardItem>
              <div className="p-2 border-b border-[#FD5A1E]/20">

              </div>

              {/* Card Features */}
              <div>
                <h4 className="text-[#FD5A1E] font-bold mb-4 flex items-center">
                  <span className="p-1 bg-[#FD5A1E]/20 rounded-full mr-2">
                    <ChevronRightIcon size={16} className="text-[#FD5A1E]" />
                  </span>
                  Key Benefits
                </h4>

                <div className="space-y-3">
                  {premiumFeatures.map((feature, index) => (
                    <Feature
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      highlighted={true}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </CardContainer>
      </div>

      {/* Implementation Benefits Section */}
      <motion.div
        className="bg-[#111111] rounded-xl overflow-hidden border border-[#333333] mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold text-[#F5F5F5] mb-6">
            <span className="text-[#FD5A1E]">Zero-Cost</span> Implementation Benefits
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Maintenance-Free */}
            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#333333] hover:border-[#FD5A1E] transition-all">
              <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ZapIcon size={28} className="text-[#FD5A1E]" />
              </div>
              <h4 className="text-[#F5F5F5] font-bold text-lg mb-2">Maintenance-Free</h4>
              <p className="text-[#A5ACAF]">
                All machine servicing, repairs, and maintenance fully covered and managed by AMP Vending.
              </p>
            </div>

            {/* Advanced Technology */}
            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#333333] hover:border-[#FD5A1E] transition-all">
              <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCardIcon size={28} className="text-[#FD5A1E]" />
              </div>
              <h4 className="text-[#F5F5F5] font-bold text-lg mb-2">Advanced Technology</h4>
              <p className="text-[#A5ACAF]">
                21.5&quot; touchscreen interface with tap-to-pay functionality and multiple payment methods for modern convenience.
              </p>
            </div>

            {/* Customer Satisfaction */}
            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#333333] hover:border-[#FD5A1E] transition-all">
              <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBagIcon size={28} className="text-[#FD5A1E]" />
              </div>
              <h4 className="text-[#F5F5F5] font-bold text-lg mb-2">Customer Satisfaction</h4>
              <p className="text-[#A5ACAF]">
                Improved amenities enhance both employee and visitor experience, contributing to workplace satisfaction.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        className="bg-gradient-to-r from-[#FD5A1E]/20 to-transparent rounded-xl p-8 border border-[#FD5A1E]/30 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-[#F5F5F5] mb-4">
          Ready to Transform Your Workplace?
        </h3>
        <p className="text-[#A5ACAF] max-w-2xl mx-auto mb-8">
          Join other organizations enhancing their work environment with zero-cost vending solutions.
          Get started today with our hassle-free implementation process.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-4 bg-[#FD5A1E] text-white font-medium rounded-full shadow-lg 
                      hover:bg-[#FD5A1E]/90 transition-colors"
          >
            Request Installation
          </Link>
          <Link
            href="/vending-machines"
            className="px-8 py-4 border-2 border-[#A5ACAF] text-[#F5F5F5] rounded-full 
                      font-medium hover:bg-[#333333] transition-colors"
          >
            Explore Our Machines
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkplaceTransformSection;
