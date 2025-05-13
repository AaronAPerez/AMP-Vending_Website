import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRightIcon, CreditCardIcon, ShoppingBagIcon, ZapIcon } from 'lucide-react';
import Link from 'next/link';

/**
 * Props for WorkplaceTransformSection component
 */
interface WorkplaceTransformSectionProps {
  /**
   * Whether to render the section heading inside this component
   * @default true
   */
  renderHeading?: boolean;

  /**
   * Optional className for additional styling
   */
  className?: string;
}



/**
 * WorkplaceTransformSection Component
 * Showcases the transformation from standard to premium vending solutions
 */
const WorkplaceTransformSection = ({ renderHeading = true, className = "" }: WorkplaceTransformSectionProps) => {



  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Section Header with 3D effect - Only rendered if renderHeading is true */}
      {renderHeading && (
        <div className="px-8 py-2 pb-12">
          <div className="bg-transparent border-none relative group w-full h-auto py-8">
            <div className="w-full text-center">
              <span className="inline-block px-4 py-2 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4">
                Workplace Transformation
              </span>
            </div>
            <div className="w-full text-center">
              <h2 id="transform-heading" className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
                Enhance Your Workplace with <span className="text-[#FD5A1E]">Advanced Vending Technology</span>
              </h2>
            </div>
            <div className="w-full text-center">
              <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
                See how our premium vending solutions transform ordinary break rooms into modern refreshment centers that boost employee satisfaction.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
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
                width={800}
                height={600}
                sizes="(max-width: 640px) 100vw, 
                      (max-width: 768px) 50vw, 
                      (max-width: 1024px) 33vw, 
                      25vw"
                className="object-cover w-full h-full rounded-lg"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent opacity-50"></div>
              <div className="absolute bottom-4 left-4 bg-[#000000]/80 px-3 py-1 rounded-full text-sm text-[#A5ACAF]">
                Before
              </div>
            </div>

            {/* Card Description */}
            <div className="p-4 border-b border-[#333333]">
              {/* <p className="text-[#A5ACAF]">
                Traditional setup lacking convenient options, requiring staff to leave premises during short breaks.
              </p> */}
            </div>

            {/* Card Features */}
            <div className="p-6 flex-grow">
              <h4 className="text-[#F5F5F5] font-bold mb-4 flex items-center">
                <span className="p-1 bg-[#333333] rounded-full mr-2">
                  <ChevronRightIcon size={16} />
                </span>
                Key Limitations
              </h4>

              <div className="bg-[#4d4d4d]/20 p-6 rounded-xl border border-[#4d4d4d]">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
                  Standard Break Room
                </h3>
                <ul className="space-y-3 text-[#A5ACAF]">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Limited refreshment options for employees</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Employees leave premises during short breaks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Break time wasted traveling to purchase snacks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Outdated facilities lacking modern conveniences</span>
                  </li>
                </ul>
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
            className="w-full h-full border border-[#FD5A1E]/70 relative group/card hover:shadow-2xl hover:shadow-[#FD5A1E]/20 bg-[#111111] rounded-xl"
          >
            {/* Card Header */}
            <div className="p-6 border-b border-[#FD5A1E]/30">
              <h3 className="text-2xl font-bold text-[#FD5A1E] mb-1">
                Premium Vending Experience
              </h3>
              <p className="text-[#A5ACAF]">
                State-of-the-art machines with advanced features
              </p>
            </div>

            {/* Premium Vending Machine Image with Layered Effect */}
            <div className="relative h-84 overflow-hidden rounded-xl">
              {/* Background image */}
              <Image
                src="/images/before-after/after-vending-machine.jpg"
                alt="Premium break room environment"
                quality={100}
                width={800}
                height={600}
                sizes="(max-width: 640px) 100vw, 
                      (max-width: 768px) 50vw, 
                      (max-width: 1024px) 33vw, 
                      25vw"
                className="object-cover w-full h-full rounded-lg"
                priority
              />

              {/* Badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent opacity-50"></div>
              <div className="absolute bottom-4 left-4 bg-[#FD5A1E] px-3 py-1 rounded-full text-sm text-[#000000] z-40 font-semibold">
                After
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent opacity-50"></div>
              <div className="absolute top-4 right-4 bg-[#FD5A1E] px-3 py-1 rounded-full text-sm text-[#000000] z-40 font-semibold">
                Zero Cost
              </div>
            </div>

            {/* Card Description */}
            <div className="p-4 border-b border-[#333333]">
              {/* <p className="text-[#A5ACAF]">
                Modern break room with state-of-the-art vending machines providing 50+ customizable options and convenient payment solutions.
              </p> */}
            </div>

            {/* Card Features */}
            <div className="p-6 flex-grow">
              <h4 className="text-[#FD5A1E] font-bold flex items-center mb-4">
                <span className="p-1 bg-[#FD5A1E]/20 rounded-full mr-2">
                  <ChevronRightIcon size={16} className="text-[#FD5A1E]" />
                </span>
                Key Benefits
              </h4>
              <div className="bg-[#4d4d4d]/20 p-6 rounded-xl border border-[#4d4d4d]">
                <h3 className="text-xl font-bold text-[#FD5A1E] mb-4">
                  Enhanced Break Room
                </h3>
                <ul className="space-y-3 text-[#A5ACAF]">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>50+ customizable refreshment options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>21.5&quot; touchscreen interface with modern payment options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Immediate access during short, unpredictable breaks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Zero-cost, maintenance-free premium amenities</span>
                  </li>
                </ul>
              </div>
            </div>
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

      {/* CTA */}

      <div className="mt-16 relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FD5A1E]/20 to-transparent backdrop-blur-sm" />
        <div className="relative px-6 py-4 border border-[#FD5A1E]/30 rounded-xl bg-[#000000]/50">
          <div className="flex items-center justify-center gap-3 py-4">
            <span className="text-[#F5F5F5] text-center">
              <h3 className="text-2xl font-bold text-[#F5F5F5] mb-4">Ready to Transform Your Workplace?</h3>
              <p className="text-[#A5ACAF] mb-8 max-w-2xl mx-auto">
                Join businesses who are enhancing
                their work environments with zero-cost vending solutions.
              </p>
              <Link
                href="/contact"
                className="px-8 py-3 bg-[#FD5A1E] text-black rounded-full font-medium shadow-lg hover:bg-[#FD5A1E]/90 border border-[#333333] hover:border-[#FD5A1E] transition-all"
              >
                Schedule a Consultation
              </Link>
            </span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkplaceTransformSection;