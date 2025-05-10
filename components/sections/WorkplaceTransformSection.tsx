'use client';

import { motion } from "framer-motion";
import WorkplaceCard from "./WorkplaceCard";
import Link from "next/link";
import Highlight from "./Highlight";
import BeforeAfterSlider from "../comparison/BeforeAfterSlider";
import Spotlight from "../ui/aceternity/Spotlight";



// Define icons for features
const RefreshmentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);

const ConvenienceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PaymentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

const WorkEnvironmentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

interface WorkplaceTransformSectionProps {
  className?: string;
}

const WorkplaceTransformSection = ({ className = "" }: WorkplaceTransformSectionProps) => {
  // Define before and after features
  const beforeFeatures = [
    {
      icon: <RefreshmentIcon />,
      title: "Limited Options",
      description: "Staff must bring food from home or leave premises to find refreshments during breaks."
    },
    {
      icon: <ConvenienceIcon />,
      title: "Lost Break Time",
      description: "Short break periods wasted traveling to purchase refreshments off-site."
    },
    {
      icon: <PaymentIcon />,
      title: "Limited Payment Options",
      description: "External vendors may have restricted payment methods or cash-only policies."
    },
    {
      icon: <WorkEnvironmentIcon />,
      title: "Basic Amenities",
      description: "Outdated break room facilities lacking modern conveniences."
    }
  ];

  const afterFeatures = [
    {
      icon: <RefreshmentIcon />,
      title: "50+ Customizable Options",
      description: "Wide selection of snacks and beverages tailored to staff preferences, including healthy alternatives."
    },
    {
      icon: <ConvenienceIcon />,
      title: "Maximum Break Efficiency",
      description: "Immediate access to refreshments on-site, allowing full use of short, unpredictable breaks."
    },
    {
      icon: <PaymentIcon />,
      title: "Modern Payment Systems",
      description: "21.5\" touchscreen interface with credit card, mobile pay, and cash payment options."
    },
    {
      icon: <WorkEnvironmentIcon />,
      title: "Enhanced Workplace",
      description: "Zero-cost, maintenance-free premium amenities improving employee satisfaction."
    }
  ];

  return (
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4">
              Workplace Transformation
            </span>
            <h2
              id="transform-heading"
              className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4"
            >
              Elevate Your Workplace Experience
            </h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              See how our premium vending solutions transform ordinary break rooms into
              modern refreshment centers that boost employee satisfaction.
            </p>
          </div> 

          {/* Before/After Slider */}
          <BeforeAfterSlider
          title="See the Transformation"
          beforeTitle="Standard Break Room"
          afterTitle="Enhanced Break Room"
          beforeDescription="Traditional break room with limited refreshment options, requiring staff to leave premises during short breaks."
          afterDescription="Modern break room with premium vending machines featuring 50+ options and advanced payment technology."
          beforeImageSrc="/images/before-vending-machine.jpg"
          afterImageSrc="/images/after-vending-machine-crop.jpg"
          // beforeImageSrc="/images/before-vending-machine.jpg"
          // afterImageSrc="/images/after-vending-machine.jpg"
          beforeImageAlt="Break room before vending machines installation"
          afterImageAlt="Break room after vending machines installation" beforeAlt={""} afterAlt={""} />

          {/* Side-by-Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <WorkplaceCard
              title="Standard Break Room"
              imageSrc="/images/before-vending-machine.jpg"
              imageAlt="Standard break room without vending machines"
              description="Traditional break room setup lacking convenient refreshment options, requiring staff to leave premises during short breaks."
              features={beforeFeatures}
              highlighted={false}
            />

            <Spotlight
              className="rounded-xl z-30"
              spotlightSize={800}
            >
              <WorkplaceCard
                title="Enhanced Break Room"
                imageSrc="/images/after-vending-machine-crop.jpg"
                imageAlt="Enhanced break room with premium vending machines"
                description="Modern break room with state-of-the-art vending machines providing 50+ customizable options and convenient payment solutions."
                features={afterFeatures}
                highlighted={true}
              />
            </Spotlight>
          </div>


          {/* Benefits Summary */}
          <div className="bg-[#4d4d4d]/20 rounded-xl p-6 border border-[#a4acac]">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">
              <span className="text-[#FD5A1E]">Zero-Cost</span> Implementation Benefits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-[#000000] p-4 rounded-lg border border-[#4d4d4d] hover:border-[#FD5A1E] transition-colors">
                <h3 className="font-bold mb-2 text-[#F5F5F5]">Maintenance-Free</h3>
                <p className="text-[#A5ACAF] text-sm">All machine servicing, repairs, and maintenance fully covered and managed by AMP Vending.</p>
              </div>

              <div className="bg-[#000000] p-4 rounded-lg border border-[#4d4d4d] hover:border-[#FD5A1E] transition-colors">
                <h3 className="font-bold mb-2 text-[#F5F5F5]">Advanced Technology</h3>
                <p className="text-[#A5ACAF] text-sm">21.5&quot; touchscreen interface with tap-to-pay functionality and multiple payment methods for modern convenience.</p>
              </div>

              <div className="bg-[#000000] p-4 rounded-lg border border-[#4d4d4d] hover:border-[#FD5A1E] transition-colors">
                <h3 className="font-bold mb-2 text-[#F5F5F5]">Customer Satisfaction</h3>
                <p className="text-[#A5ACAF] text-sm">Improved amenities enhance both employee and visitor experience, contributing to workplace satisfaction.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-10">
            <h2 className="text-2xl font-bold mb-4 text-white">Ready to Transform Your Workplace?</h2>
            <p className="text-[#A5ACAF] mb-6 max-w-2xl mx-auto">
              Join other organizations enhancing their work environment with zero-cost vending solutions.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#FD5A1E] text-[#F5F5F5] px-6 py-3 rounded-full font-medium hover:bg-[#FD5A1E]/90 transition-colors"
              >
                Request Installation
              </Link>
              <Link
                href="/vending-machines"
                className="border border-[#A5ACAF] text-[#F5F5F5] px-6 py-3 rounded-full font-medium hover:bg-[#4d4d4d] transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>     
      </motion.div>
  );
};

export default WorkplaceTransformSection;