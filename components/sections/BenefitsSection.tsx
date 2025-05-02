'use client';

import { motion } from 'framer-motion'
import React from 'react'

const BenefitsSection = () => {
  return (
    <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              id="benefits-heading"
              className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4"
            >
              Premium Vending, Zero Hassle
            </h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              Our vending machines bring convenience and satisfaction to your workplace without any of the traditional headaches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <motion.div 
              className="bg-[#4d4d4d] rounded-xl p-8 border border-[#a4acac] hover:border-[#FD5A1E] transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">Zero Cost Installation</h3>
              <p className="text-[#A5ACAF]">
                Our vending machines are installed completely free of charge. No upfront costs, no monthly fees, and no hidden charges.
              </p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div 
              className="bg-[#4d4d4d] rounded-xl p-8 border border-[#a4acac] hover:border-[#FD5A1E] transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">Maintenance-Free Operation</h3>
              <p className="text-[#A5ACAF]">
                We handle all servicing, restocking, and repairs. Your team never has to worry about the machines - we take care of everything.
              </p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div 
              className="bg-[#4d4d4d] rounded-xl p-8 border border-[#a4acac] hover:border-[#FD5A1E] transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">Latest Technology</h3>
              <p className="text-[#A5ACAF]">
                Featuring 21.5&quot; HD touchscreens and modern payment options including credit card, mobile pay, and tap-to-pay functionality.
              </p>
            </motion.div>
          </div>
        </div>
    </>
  )
}

export default BenefitsSection;