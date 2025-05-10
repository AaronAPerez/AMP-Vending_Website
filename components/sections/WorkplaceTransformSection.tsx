<<<<<<< HEAD
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
=======
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import SplitCompareWithVideo from '@/components/comparison/SplitCompareWithVideo';
import ExpandableCard from '@/components/ui/ExpandableCard';
import ZeroCostExplanationContent from '../ZeroCostExplanationContent';
import Image from 'next/image';


/**
 * Props for WorkplaceTransformSection component
 */
interface WorkplaceTransformSectionProps {
  /**
   * Optional className for additional styling
   */
  className?: string;
  
  /**
   * Optional ID for anchor links
   * @default "workplace-transformation"
   */
  id?: string;
}

/**
 * Background Beams Component
 * Inspired by Aceternity UI
 */
const BackgroundBeams: React.FC<{ className?: string }> = ({ className }) => {
  // SVG paths for the beams
  const paths = [
    'M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875',
    'M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867',
    'M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859',
    'M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851',
    'M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843'
  ];

  // Random starting positions for beams
  const getRandomParams = () => ({
    x: Math.random() * 100 - 50,
    delay: Math.random() * 0.5,
    duration: 3 + Math.random() * 8
  });

  return (
    <div className={`absolute inset-0 overflow-hidden opacity-40 ${className}`}>
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 800"
        preserveAspectRatio="none"
      >
        {paths.map((path, i) => {
          const { x, delay, duration } = getRandomParams();
          
          return (
            <motion.path
              key={i}
              d={path}
              fill="none"
              stroke="url(#beam-gradient)"
              strokeWidth={2}
              strokeOpacity={0.4}
              initial={{ pathLength: 0, x }}
              animate={{ 
                pathLength: [0, 1, 0],
                x: [x, x + 20, x - 20, x]
              }}
              transition={{
                pathLength: {
                  duration,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay
                },
                x: {
                  duration: duration * 2,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  delay
                }
              }}
            />
          );
        })}
      
        <defs>
          <linearGradient id="beam-gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#FD5A1E" stopOpacity="0" />
            <stop offset="50%" stopColor="#FD5A1E" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FD5A1E" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

/**
 * Parallax Effect Component
 */
const ParallaxEffect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Create smooth motion values with spring physics
  const springConfig = { stiffness: 150, damping: 30 };
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 1], [100, -100]), 
    springConfig
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]), 
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]), 
    springConfig
  );
  
  return (
    <div ref={containerRef} className="relative">
      <motion.div
        style={{ translateY, scale, opacity }}
        className="flex-1"
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * Advanced Technology Content Component
 */
const AdvancedTechnologyContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="font-semibold text-whitesmoke">Cutting-Edge Features</h4>
          <ul className="list-disc pl-5 text-silver space-y-1 text-sm">
            <li>21.5&quot; HD Touchscreen Interface</li>
            <li>Remote Inventory Monitoring</li>
            <li>Contactless Payment Options</li>
            <li>Digital Product Information</li>
            <li>Energy-Efficient Operations</li>
          </ul>
        </div>
        
        <div className="bg-primary-black/40 rounded-lg overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src="/images/touchscreen.jpg"
              alt="Modern vending machine touchscreen interface"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Employee Benefits Content Component
 */
const EmployeeBenefitsContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <p className="text-whitesmoke">
        Premium vending machines enhance workplace satisfaction through:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="bg-dark-gray/20 p-3 rounded-lg">
          <h4 className="font-semibold text-orange mb-2">Time Efficiency</h4>
          <p className="text-sm text-silver">
            Employees save valuable break time by having refreshments available on-site.
          </p>
        </div>
        
        <div className="bg-dark-gray/20 p-3 rounded-lg">
          <h4 className="font-semibold text-orange mb-2">Personalized Options</h4>
          <p className="text-sm text-silver">
            Customized product selection based on employee preferences.
          </p>
        </div>
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c
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
// import React from 'react';
// import Link from 'next/link';
// import WorkplaceCard from './WorkplaceCard';
// import { motion } from 'framer-motion';
// import { CoinsIcon, CurrencyIcon, DollarSign, DollarSignIcon, ListEndIcon, MinusIcon, OptionIcon, TimerOffIcon } from 'lucide-react';

// // Define icons for features
// const RefreshmentIcon = () => (
//   <div className="p-2 rounded-full">
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
//   </svg>
//   </div>
// );

// const ConvenienceIcon = () => (
//   <div className="p-2 rounded-full">
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="12" r="10" />
//     <polyline points="12 6 12 12 16 14" />
//   </svg>
//   </div>
// );

// const PaymentIcon = () => (
//   <div className="p-2 rounded-full">
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="2" y="5" width="20" height="14" rx="2" />
//     <line x1="2" y1="10" x2="22" y2="10" />
//   </svg>
//   </div>
// );

// const WorkEnvironmentIcon = () => (
//   <div className="p-2 rounded-full">
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//     <polyline points="9 22 9 12 15 12 15 22" />
//   </svg>
//   </div>
// );

// interface WorkplaceTransformSectionProps {
//   className?: string;
// }

// const WorkplaceTransformSection = ({ className = "" }: WorkplaceTransformSectionProps) => {
//   // Define before and after features
//   const beforeFeatures = [
//     {
//       icon: <MinusIcon />,
//       title: "Limited Options",
//       description: "Staff must bring food from home or leave premises to find refreshments during breaks."
//     },
//     {
//       icon: <TimerOffIcon />,
//       title: "Lost Break Time",
//       description: "Short break periods wasted traveling to purchase refreshments off-site."
//     },
//     {
//       icon: <CoinsIcon />,
//       title: "Limited Payment Options",
//       description: "External vendors may have restricted payment methods or cash-only policies."
//     },
//     {
//       icon: <WorkEnvironmentIcon />,
//       title: "Basic Amenities",
//       description: "Outdated break room facilities lacking modern conveniences."
//     }
//   ];

//   const afterFeatures = [
//     {
//       icon: <ListEndIcon />,
//       title: "50+ Customizable Options",
//       description: "Wide selection of snacks and beverages tailored to staff preferences, including healthy alternatives."
//     },
//     {
//       icon: <ConvenienceIcon />,
//       title: "Maximum Break Efficiency",
//       description: "Immediate access to refreshments on-site, allowing full use of short, unpredictable breaks."
//     },
//     {
//       icon: <PaymentIcon />,
//       title: "Modern Payment Systems",
//       description: "21.5\" touchscreen interface with credit card, mobile pay, and cash payment options."
//     },
//     {
//       icon: <WorkEnvironmentIcon />,
//       title: "Enhanced Workplace",
//       description: "Zero-cost, maintenance-free premium amenities improving employee satisfaction."
//     }
//   ];

//   return (
//     <section
//       id="workplace-transformation"
//       className={`py-16 px-8 bg-[#000000] ${className}`}
//       aria-labelledby="transform-heading"
//     >
//       <motion.div
//         className="text-center mb-12"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">

//           <span className="inline-block px-3 py-1 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4">
//             Workplace Transformation
//           </span>
//           <h2
//             id="transform-heading"
//             className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4"
//           >
//             Elevate Your Workplace Experience
//           </h2>
//           <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
//             See how our premium vending solutions transform ordinary break rooms into
//             modern refreshment centers that boost employee satisfaction.
//           </p>

//         </div>

//         {/* Enhanced Environment Highlight Section */}
//         {/* <EnhancedHighlight /> */}
//       </motion.div>
//       {/* Before/After Slider */}
//       {/* <BeforeAfterSlider
//         title="See the Transformation"
//         beforeTitle="Standard Break Room"
//         afterTitle="Enhanced Break Room"
//         beforeDescription="Traditional break room with limited refreshment options, requiring staff to leave premises during short breaks."
//         afterDescription="Modern break room with premium vending machines featuring 50+ options and advanced payment technology."
//         beforeImageSrc="/images/before-vending-machine.jpg"
//         afterImageSrc="/images/after-vending-machine.jpg"
//         beforeImageAlt="Break room before vending machines installation"
//         afterImageAlt="Break room after vending machines installation"
//       /> */}

//       {/* Side-by-Side Comparison */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//         <WorkplaceCard
//           title="Standard Vending Machines"
//           imageSrc="/images/before-after/before-vending-machine.jpg"
//           imageAlt="Standard break room without vending machines"
//           description="Traditional break room setup lacking convenient refreshment options, requiring staff to leave premises during short breaks."
//           features={beforeFeatures}
//           highlighted={false}
//         />

//         <WorkplaceCard
//           title="Premium Vending Machines"
//           imageSrc="/images/before-after/after-modesto-crop.png"
//           imageAlt="Enhanced break room with premium vending machines"
//           description="Modern break room with state-of-the-art vending machines providing 50+ customizable options and convenient payment solutions."
//           features={afterFeatures}
//           highlighted={true}
//         />
//       </div>

//       {/* Benefits Summary */}
//       <div className="bg-[#4d4d4d]/20 rounded-xl p-6 border border-[#a4acac]">
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           <span className="text-[#FD5A1E]">Zero-Cost</span> Implementation Benefits
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//           <div className="bg-[#000000] p-4 rounded-lg border border-[#4d4d4d] hover:border-[#FD5A1E] transition-colors">
//             <h3 className="font-bold mb-2 text-[#F5F5F5]">Maintenance-Free</h3>
//             <p className="text-[#A5ACAF] text-sm">All machine servicing, repairs, and maintenance fully covered and managed by AMP Vending.</p>
//           </div>

//           <div className="bg-[#000000] p-4 rounded-lg border border-[#4d4d4d] hover:border-[#FD5A1E] transition-colors">
//             <h3 className="font-bold mb-2 text-[#F5F5F5]">Advanced Technology</h3>
//             <p className="text-[#A5ACAF] text-sm">21.5&quot; touchscreen interface with tap-to-pay functionality and multiple payment methods for modern convenience.</p>
//           </div>

//           <div className="bg-[#000000] p-4 rounded-lg border border-[#4d4d4d] hover:border-[#FD5A1E] transition-colors">
//             <h3 className="font-bold mb-2 text-[#F5F5F5]">Customer Satisfaction</h3>
//             <p className="text-[#A5ACAF] text-sm">Improved amenities enhance both employee and visitor experience, contributing to workplace satisfaction.</p>
//           </div>
//         </div>
//       </div>

//       {/* Call to Action */}
//       <div className="text-center mt-10">
//         <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Workplace?</h2>
//         <p className="text-[#A5ACAF] mb-6 max-w-2xl mx-auto">
//           Join other organizations enhancing their work environment with zero-cost vending solutions.
//         </p>

//         <div className="flex flex-wrap justify-center gap-4">
//           <Link
//             href="/contact"
//             className="bg-[#FD5A1E] text-[#F5F5F5] px-6 py-3 rounded-full font-medium hover:bg-[#FD5A1E]/90 transition-colors"
//           >
//             Request Installation
//           </Link>
//           <Link
//             href="/vending-machines"
//             className="border border-[#A5ACAF] text-[#F5F5F5] px-6 py-3 rounded-full font-medium hover:bg-[#4d4d4d] transition-colors"
//           >
//             Learn More
//           </Link>
//         </div>
//       </div>
//     </section >
//   );
// };

// export default WorkplaceTransformSection;
=======
 * 
 * A section container for the before/after workplace comparison with video
 * Enhanced with Aceternity UI-inspired components
 */
const WorkplaceTransformSection: React.FC<WorkplaceTransformSectionProps> = ({ 
  className = "",
  id = "workplace-transformation" 
}) => {
  return (
    <section 
      id={id}
      className={`relative py-16 md:py-32 bg-primary-black overflow-hidden ${className}`}
      aria-labelledby="workplace-transform-heading"
    >
      {/* Background Effects */}
      <BackgroundBeams />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H20V20H0V0Z' fill='none' stroke='%23A5ACAF' stroke-width='0.2'/%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px'
          }}
          aria-hidden="true"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Floating Heading with Parallax Effect */}
        <div className="mb-16">
          <ParallaxEffect>
            <div className="text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="inline-block px-3 py-1 bg-orange/10 text-orange text-sm font-medium rounded-full mb-4">
                  Workplace Transformation
                </span>
                <h2 
                  id="workplace-transform-heading"
                  className="text-4xl md:text-5xl font-bold text-whitesmoke mb-6"
                >
                  <span className="inline-block">Enhanced Work Environment</span>
                </h2>
                <p className="text-xl text-silver max-w-3xl mx-auto">
                  See how premium vending machines transform ordinary workplaces into 
                  modern, employee-focused environments with zero-cost implementation.
                </p>
              </motion.div>
            </div>
          </ParallaxEffect>
        </div>
        
        {/* Main Split Compare with Video */}
        <ParallaxEffect>
          <SplitCompareWithVideo
            beforeSrc="/images/before-vending-machine.jpg"
            beforeAlt="Break room before vending machines installation"
            afterSrc="/images/after-vending-machine.jpg"
            afterAlt="Break room after vending machines installation"
            videoSrc="/videos/premium-vending-demo.mp4"
            videoPoster="/images/vending-video-poster.jpg"
            videoDescription="See our premium vending machine with 21.5 inch touchscreen in action"
            autoplayVideo={true}
            className="mb-16"
          />
        </ParallaxEffect>
        
        {/* Expandable Feature Cards */}
        <div className="mt-16 space-y-6 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-whitesmoke mb-8">
            Premium Vending Benefits
          </h3>
          
          <ExpandableCard
            title="Zero-Cost Implementation"
            subtitle="No upfront investment required"
            iconName="payment"
            content={<ZeroCostExplanationContent />}
            defaultExpanded={true}
            className="shadow-highlight"
          />
          
          <ExpandableCard
            title="Advanced Technology"
            subtitle="Modern touchscreen interfaces with multiple payment options"
            iconName="technology"
            content={<AdvancedTechnologyContent />}
            colorTheme="orange"
          />
          
          <ExpandableCard
            title="Employee Satisfaction"
            subtitle="Enhance workplace experience and productivity"
            iconName="satisfaction"
            content={<EmployeeBenefitsContent />}
            colorTheme="silver"
          />
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-whitesmoke mb-4">Ready to Transform Your Workplace?</h3>
          <p className="text-silver mb-8 max-w-2xl mx-auto">
            Join businesses like Stanislaus Regional Transit Authority who are enhancing 
            their work environments with zero-cost vending solutions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/contact" 
              className="px-8 py-3 bg-orange text-whitesmoke rounded-full font-medium shadow-highlight hover:bg-orange/90 transition-colors"
            >
              Schedule a Consultation
            </a>
            <a 
              href="/proposal" 
              className="px-8 py-3 border border-silver text-whitesmoke rounded-full font-medium hover:bg-dark-gray transition-colors"
            >
              View Proposal
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkplaceTransformSection;
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c
