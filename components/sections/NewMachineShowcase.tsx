import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, CheckCircle, ChevronsRight } from 'lucide-react';

/**
 * NewMachineShowcase Component
 * 
 * Displays the value proposition that clients receive brand new vending machines
 */
const NewMachineShowcase = () => {
  return (
    <section className="py-16 bg-[#000000] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60L60 0M30 60L60 30M0 30L30 0' stroke='white' stroke-opacity='0.2' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        {/* <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4">
              <Package size={16} className="text-[#FD5A1E]" />
              Brand New Equipment
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
              Factory-Fresh, <span className="text-[#FD5A1E]">Zero-Cost</span> Machines
            </h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              Every client receives a brand new, state-of-the-art vending machine 
              straight from the factory – never used, never refurbished.
            </p>
          </motion.div>
        </div> */}
        
        {/* Images with Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          {/* Left side - Images */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Boxed Machine Image */}
            <div className="relative overflow-hidden rounded-xl border border-[#4d4d4d] group">
              <div className="relative h-72 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/machines/premium-vending-machines.jpg"
                  alt="Brand new vending machine in original packaging"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover bg-black"
                />
                
                {/* Overlay with caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[#F5F5F5] font-medium">Factory-Sealed Packaging</p>
                    <p className="text-[#A5ACAF] text-sm">Brand new machines arrive in original factory packaging</p>
                  </div>
                </div>
                
                {/* Step badge */}
                <div className="absolute top-4 left-4 bg-[#FD5A1E] text-[#F5F5F5] px-3 py-1 rounded-full text-sm font-medium">
                  Step 1: Delivery
                </div>
              </div>
            </div>
            
            {/* Unboxed Machine Image */}
            <div className="relative overflow-hidden rounded-xl border border-[#4d4d4d] group">
              <div className="relative h-72 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/vending-machines/new-standard-refrigerated-machine-unbox.jpg"
                  alt="Brand new vending machine being unboxed and installed"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                
                {/* Overlay with caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[#F5F5F5] font-medium">Professional Setup & Installation</p>
                    <p className="text-[#A5ACAF] text-sm">Our team handles all unpacking and installation</p>
                  </div>
                </div>
                
                {/* Step badge */}
                <div className="absolute top-4 left-4 bg-[#FD5A1E] text-[#F5F5F5] px-3 py-1 rounded-full text-sm font-medium">
                  Step 2: Installation
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-[#111111] rounded-xl border border-[#333333] p-8">
              <h3 className="text-2xl font-bold text-[#F5F5F5] mb-6">
                Why We Only Provide <span className="text-[#FD5A1E]">Brand New Machines</span>
              </h3>
              
              <div className="space-y-6">
                {/* Key points */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#FD5A1E]/10 p-2 rounded-full text-[#FD5A1E] flex-shrink-0 mt-1">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#F5F5F5] font-medium mb-1">Latest Technology</h4>
                    <p className="text-[#A5ACAF]">
                      Every machine features the latest 21.5&quot; touchscreen interface and advanced payment systems including tap-to-pay functionality.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#FD5A1E]/10 p-2 rounded-full text-[#FD5A1E] flex-shrink-0 mt-1">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#F5F5F5] font-medium mb-1">Maximum Reliability</h4>
                    <p className="text-[#A5ACAF]">
                      New machines ensure optimal performance, minimal downtime, and the most energy-efficient operation for your workplace.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#FD5A1E]/10 p-2 rounded-full text-[#FD5A1E] flex-shrink-0 mt-1">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#F5F5F5] font-medium mb-1">Professional Installation</h4>
                    <p className="text-[#A5ACAF]">
                      Our expert team handles the entire delivery, unboxing, and installation process at zero cost to you.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#FD5A1E]/10 p-2 rounded-full text-[#FD5A1E] flex-shrink-0 mt-1">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#F5F5F5] font-medium mb-1">Premium Customer Experience</h4>
                    <p className="text-[#A5ACAF]">
                      Factory-fresh machines create a more impressive visual impact and enhance the overall workplace environment.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* CTA button */}
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors font-medium"
                >
                  Schedule Your Free Installation
                  <ChevronsRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Commitment Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-[#FD5A1E]/10 to-transparent rounded-xl border border-[#FD5A1E]/30 p-6 text-center"
        >
          <p className="text-[#F5F5F5] text-lg">
            <span className="font-medium">Our Quality Promise:</span> Every AMP Vending client receives a brand new, 
            factory-sealed machine with zero upfront costs and no maintenance responsibilities.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewMachineShowcase;