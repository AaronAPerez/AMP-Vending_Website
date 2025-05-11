import React from 'react';
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
 * 3D Card Feature component for the premium card
 */
const CardFeature = ({
  icon,
  title,
  description,
  translateZ = 40
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  translateZ?: number;
}) => {
  return (
    <CardItem
      translateZ={translateZ}
      className="flex gap-3 p-3 rounded-lg bg-[#FD5A1E]/10 w-full"
    >
      <div className="flex-shrink-0 p-2 rounded-full bg-[#FD5A1E]/20 text-[#FD5A1E]">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium mb-1 text-[#FD5A1E]">
          {title}
        </h4>
        <p className="text-[#A5ACAF] text-sm">
          {description}
        </p>
      </div>
    </CardItem>
  );
};

/**
 * WorkplaceTransformSection Component
 * Showcases the transformation from standard to premium vending solutions
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
      <CardContainer className="px-8 py-2">
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
        {/* Card container for equal width and spacing */}
        <div className="flex justify-center">
          {/* Standard Vending Card */}
          <motion.div
            className="rounded-xl overflow-hidden border border-[#333333] bg-[#111111] h-full flex flex-col w-full"
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
                Traditional setup with limited options and convenience
              </p>
            </div>

            {/* Card Image */}
            <div className="relative h-84 overflow-hidden rounded-xl">
              <Image
                src="/images/before-after/before-vending-machine.jpg"
                alt="Standard break room vending setup"
                quality={100}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover p-6 rounded-xl"
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
            <div className="p-6 flex-grow">
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
        </div>

        {/* Card container for equal width and spacing */}
        <div className="flex justify-center">
          {/* Premium Vending Card with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full h-full"
          >
            <CardContainer containerClassName="h-full" className="h-full rounded-xl">
              <CardBody className="p-6 border border-[#FD5A1E]/70 relative group/card hover:shadow-2xl hover:shadow-[#FD5A1E]/20 bg-[#111111] w-full h-auto rounded-xl">
                {/* Card Header */}
                <CardItem translateZ={50} className="pb-2 border-b border-[#FD5A1E]/30 w-full">
                  <h3 className="text-2xl font-bold text-[#FD5A1E] mb-1">
                    Premium Vending Experience
                  </h3>
                  <p className="text-[#A5ACAF] pb-2">
                    State-of-the-art machines with advanced features
                  </p>
                </CardItem>

                {/* Premium Vending Machine Image with Layered Effect */}
                <div className="relative w-full h-full">
                  {/* Background image */}
                  <CardItem translateZ={60} className="w-full h-full">
                    <Image
                      src="/images/before-after/after-vending-machine2.png"
                      quality={100}
                      height={800}
                      width={800}
                      className="w-full h-90 object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="Premium break room environment"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent opacity-30"></div>
                  </CardItem>

                  {/* Foreground machine image with transparent background */}
                  <CardItem translateZ={130} className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[115%] h-[115%] relative">
                      <Image
                        src="/images/before-after/after-vending-machine-bg.png"
                        quality={100}
                        height={800}
                        width={800}
                        className="object-contain z-30"
                        alt="Premium vending machine"
                      />
                    </div>
                  </CardItem>

                  {/* Badges */}
                  <CardItem translateZ={150} className="absolute bottom-4 left-4">
                    <div className="bg-[#FD5A1E] px-3 py-1 rounded-full text-sm text-[#000000] z-40 font-semibold">
                      After
                    </div>
                  </CardItem>

                  <CardItem translateZ={150} className="absolute top-4 right-4">
                    <div className="bg-[#FD5A1E] px-3 py-1 rounded-full text-sm text-[#000000] z-40 font-semibold shadow-lg">
                      Zero Cost
                    </div>
                  </CardItem>
                </div>

                <CardItem as="p" translateZ={60} className="text-[#A5ACAF] pt-8 pb-4 border-b border-[#FD5A1E]/30 w-full">
                  Modern break room with state-of-the-art vending machines providing 50+ customizable options and convenient payment solutions.
                </CardItem>

                {/* Card Features */}
                <div className="p-6 flex-grow">
                  <CardItem translateZ={30} className="w-full mb-4">
                    <h4 className="text-[#FD5A1E] font-bold flex items-center">
                      <span className="p-1 bg-[#FD5A1E]/20 rounded-full mr-2">
                        <ChevronRightIcon size={16} className="text-[#FD5A1E]" />
                      </span>
                      Key Benefits
                    </h4>
                  </CardItem>

                  <div className="space-y-3">
                    {premiumFeatures.map((feature, index) => (
                      <CardFeature
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        translateZ={40 - index * 5}
                      />
                    ))}
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>
        </div>
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

      {/* Call to Action Section with Image */}
      {/* <CardContainer className="py-6">
        <CardBody className="bg-gradient-to-r from-[#FD5A1E]/20 to-transparent rounded-xl p-8 border border-[#FD5A1E]/30">
          <div className="flex flex-col md:flex-row items-center">
            {/* CTA Image - Vending Machine 
            <CardItem translateZ={70} className="w-full md:w-1/2 mb-8 md:mb-0 rounded-xl overflow-hidden">
              <div className="relative h-64 md:h-80 w-full">
                <Image
                  src="/images/premium-vending-machines.jpg" 
                  alt="Premium AMP Vending Machines"
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute bottom-4 right-4 bg-[#FD5A1E] px-3 py-1 rounded-full text-sm font-bold text-white shadow-lg">
                  Zero Installation Cost
                </div>
              </div>
            </CardItem> */}


      {/* CTA */}
      <div className="bg-[#0a0a0a] p-6 rounded-full p-8 border border-[#FD5A1E]/30 mt-16 text-center">
        <h3 className="text-2xl font-bold text-whitesmoke mb-4">Ready to Transform Your Workplace?</h3>
        <p className="text-silver mb-8 max-w-2xl mx-auto">
          Join businesses who are enhancing
          their work environments with zero-cost vending solutions.
        </p>


    
          <a
            href="/contact"
            className="px-8 py-3 bg-[#FD5A1E] text-black rounded-full font-medium shadow-highlight hover:bg-orange/90 border border-[#333333] hover:border-[#FD5A1E] transition-all"
          >
            Schedule a Consultation
          </a>
          {/* <a
            href="/proposal"
            className="px-8 py-3 border border-silver text-whitesmoke rounded-full font-medium hover:bg-dark-gray transition-colors"
          >
            View Proposal
          </a> */}

        </div>

    </div>
  );
};

export default WorkplaceTransformSection;